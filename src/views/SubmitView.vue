<template>
  <div style="padding: 20px">
    <h1 style="margin-bottom: 15px">SUBMIT TO MODA ARCHIVES</h1>
    <el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="180px"
      style="max-width: 750px">
      <el-form-item label="Artwork title" style="max-width: 550px" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Artist name" style="max-width: 550px" prop="artist">
        <el-input v-model="form.artist" />
      </el-form-item>
      <el-form-item label="Blockchain">
        <el-radio-group v-model="form.blockchain">
          <el-radio label="ethereum">Ethereum</el-radio>
          <el-radio label="off_chain">Off-chain</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.blockchain == 'ethereum'" label="Asset Contract Address" style="max-width: 550px;"
        prop="asset_contract_address">
        <el-input v-model="form.asset_contract_address" />
      </el-form-item>
      <el-form-item v-if="form.blockchain == 'ethereum'" label="Token ID" style="max-width: 550px;" prop="token_id">
        <el-input v-model="form.token_id" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="form.description" type="textarea" rows="3" />
      </el-form-item>
      <el-form-item label="Public Link" prop="public_link">
        <el-input v-model="form.public_link" />
      </el-form-item>
      <el-form-item>
        <el-upload class="upload-demo" :auto-upload="false" action="" :on-remove="handleRemove"
          :before-remove="beforeRemove" :limit="1" drag :file-list="file_list">
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit(formRef)" :loading="loading">
          <template #loading>
            <el-icon class="is-loading" style="margin-right: 4px">
              <Loading />
            </el-icon>
            {{ loading_progress }}
          </template>

          <div>SUBMIT</div>

        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { createTokenMeta } from "@/api/token-meta";
import { uploadFile } from "@/api/storage";
import type { TokenMeta } from "@/types/types";
import { useRouter } from 'vue-router';
import { useAccountStore } from "@/stores/account"

import type { UploadProps, UploadUserFile, UploadRequestOptions } from "element-plus";
import { Timestamp } from "firebase/firestore"
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'

const formRef = ref<FormInstance>();
const file_uid = ref<string>();
const form = reactive<TokenMeta>({
  name: "",
  artist: "",
  description: "",
  public_link: "",
  created_at: Timestamp.now(),
  updated_at: Timestamp.now(),
  media_id: "",
  media_type: "",
  account_id: "",
  blockchain: "ethereum",
  asset_contract_address: "",
  token_id: ""

});
const file_list = ref<UploadUserFile[]>([]);
const rules = reactive<FormRules>({
  name: [{ required: true, message: "Required", trigger: "blur" }],
  artist: [{ required: true, message: "Required", trigger: "blur" }],
  asset_contract_address: [{ required: true, message: "Required", trigger: "blur" }],
  token_id: [{ required: true, message: "Required", trigger: "blur" }],
});
const loading = ref(false);
const loading_progress = ref("0%");
const router = useRouter();
const account_store = useAccountStore();

onMounted(async () => {

  const address = window.localStorage.getItem("account_address")
  const signature = window.localStorage.getItem("account_signature")

  if (address == null || signature == null) {
    router.push({ name: "login" })
    return
  }
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  try {
    await account_store.loadAccount(address, signature);
    form.account_id = account_store.get_account.id
  } catch (err) {
    ElMessage({ message: `Error loading moda archive account - ${err}`, type: 'error', showClose: true, duration: 12000 });
  } finally {
    loading.close()
  }
})

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`Cancel the upload of ${uploadFile.name} ?`).then(
    () => true,
    () => false
  );
};
const handleRemove = () => {

}

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    console.log("SubmitView.vue Submit - formRef is null");
    return;
  }
  const valid = await formEl.validate((v) => v);
  if (!valid) {
    return;
  }
  loading.value = true;


  if (file_list?.value?.length !== 1) {
    console.log("file_list error", file_list.value)
    return;
  }
  const file = file_list.value[0]

  const progressCallback = (progress: number) => {
    console.log("Progress", progress)
    loading_progress.value = `${Math.round(progress * 100)}%`
  }

  const successCallback = () => {
    uploadSuccess(formEl, file)
  }

  uploadFile(`${file.uid || ""}`, file.raw as File, progressCallback, successCallback)
    .catch(err => {
      console.error(err)
    })
};

const uploadSuccess = (formEl: FormInstance, file: UploadUserFile) => {
  form.media_id = `${file?.uid || ""}`
  form.media_type = `.${file.name.split(".").pop() || ""}`
  console.log("upload success, sending form: ", form);
  createTokenMeta(form)
    .then((r) => {
      formEl.resetFields();
      file_list.value = [];
      ElMessage({
        type: 'success',
        message: 'Successfully submitted token',
      })
    })
    .catch((err) => {
      ElMessage({ message: `Error uploading to moda archive - ${err}`, type: 'error', showClose: true, duration: 12000 });
    })
    .finally(() => (loading.value = false))

}
</script>

<style>
.el-upload {
  --el-upload-dragger-padding-horizontal: 4px;
  --el-upload-dragger-padding-vertical: 10px;
}

.el-upload-dragger .el-icon--upload {
  margin-bottom: 0px;
}
</style>
