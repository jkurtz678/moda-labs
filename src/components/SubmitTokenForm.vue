<template>
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
        <el-form-item v-if="!props.token_meta_id">
            <el-upload class="upload-demo" :auto-upload="false" action="" :on-remove="handleRemove"
                :before-remove="beforeRemove" :limit="1" drag v-model:file-list="file_list">
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
                <div>{{ loading ? "UPLOADING" : "SUBMIT" }}</div>
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { createTokenMeta, updateTokenMeta } from "@/api/token-meta";
import { uploadFile } from "@/api/storage";
import { type TokenMeta, Blockchain, TokenPlatform } from "@/types/types";
import { useAccountStore } from "@/stores/account"
import { useTokenMetaStore } from "@/stores/token-meta"
import { showError } from "@/util/util";

import type { UploadProps, UploadUserFile } from "element-plus";
import { Timestamp } from "firebase/firestore"
import { ElMessage, ElMessageBox } from 'element-plus'

interface SubmitTokenFormProps {
    token_meta_id?: string;
}
const props = defineProps<SubmitTokenFormProps>();

const formRef = ref<FormInstance>();
const file_uid = ref<string>();
const form = ref<TokenMeta>({
    name: "",
    artist: "",
    description: "",
    public_link: "",
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
    media_id: "",
    media_type: "",
    wallet_address: "",
    blockchain: Blockchain.Ethereum,
    asset_contract_address: "",
    token_id: "",
    platform: TokenPlatform.Archive
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
const account_store = useAccountStore();
const token_meta_store = useTokenMetaStore();

onMounted(() => {
    if (props.token_meta_id) {
        form.value = { ...token_meta_store.all_token_metas[props.token_meta_id].entity }
    }
})

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(`Cancel the upload of ${uploadFile.name} ?`).then(
        () => true,
        () => false
    );
};

const handleRemove = () => {
    // TODO
}

const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        showError(`Error finding form element`);
        return;
    }
    const valid = await formEl.validate((v) => v);
    if (!valid) {
        return;
    }
    // make sure wallet address is added
    form.value.wallet_address = account_store.get_account.entity.wallet_address

    // clear out asset contract and token_id if off chain
    if (form.value.blockchain != 'ethereum') {
        form.value.asset_contract_address = ""
        form.value.token_id = ""
    }

    if (props.token_meta_id) {
        updateToken(props.token_meta_id);
        return
    }

    // continue to file upload
    if (file_list?.value?.length !== 1) {
        showError(`Please add a file to upload`);
        return;
    }

    startFileUpload(formEl);
};

const startFileUpload = (formEl: FormInstance) => {
    const file = file_list.value[0]

    const progressCallback = (progress: number) => {
        loading_progress.value = `${Math.round(progress * 100)}%`
    }

    const successCallback = () => {
        uploadSuccess(formEl, file)
    }

    loading.value = true;

    const file_uri = `${file.uid}.${file.name.split(".").pop()}`;
    uploadFile(file_uri, file.raw as File, progressCallback, successCallback)
        .catch(err => {
            console.error(err)
            loading.value = false;
            showError(`Error uploading file to moda archive - ${err}`);
        });
}

const uploadSuccess = (formEl: FormInstance, file: UploadUserFile) => {
    form.value.media_id = `${file.uid}`
    form.value.media_type = `.${file.name.split(".").pop()}`
    console.log("upload success, sending form: ", form);
    createTokenMeta(form.value)
        .then((r) => {
            formEl.resetFields();
            file_list.value = [];
            ElMessage({
                type: 'success',
                message: 'Successfully submitted token',
            })
        })
        .catch((err) => {
            showError(`Error uploading metadata to moda archive - ${err}`);
        })
        .finally(() => (loading.value = false))
}

const updateToken = (token_meta_id: string) => {
    loading.value = true;
    updateTokenMeta(token_meta_id, form.value).then(() => {
        ElMessage({
            type: 'success',
            message: 'Successfully updated token',
        })
    }).catch((err) => {
        showError(`Error updating token metadata - ${err}`);
    }).finally(() => (loading.value = false))
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