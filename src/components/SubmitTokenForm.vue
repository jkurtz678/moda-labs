<template>
    <el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="180px" style="max-width: 750px">
        <el-form-item label="Artwork Title" style="max-width: 550px" prop="name">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Artist Name" style="max-width: 550px" prop="artist">
            <el-input v-model="form.artist" />
        </el-form-item>
        <el-form-item label="Artist Social Media Link" style="max-width: 550px" prop="artist_social_link">
            <el-input v-model="form.artist_social_link" />
        </el-form-item>
        <el-form-item label="Link to Blockchain">
            <el-radio-group v-model="form.blockchain">
                <el-radio label="off_chain">Off-chain</el-radio>
                <el-radio label="ethereum">Ethereum</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.blockchain == 'ethereum'" label="Asset Contract Address" style="max-width: 550px;"
            prop="asset_contract_address">
            <el-input v-model="form.asset_contract_address" />
        </el-form-item>
        <el-form-item v-if="form.blockchain == 'ethereum'" label="Token ID" style="max-width: 550px;" prop="token_id">
            <el-input v-model="form.token_id" />
        </el-form-item>
        <el-form-item label="Plaque Description" prop="description">
            <el-input v-model="form.description" type="textarea" rows="3" />
        </el-form-item>
        <el-form-item label="Plaque QR Code Link" prop="public_link">
            <el-input v-model="form.public_link" />
        </el-form-item>
        <el-form-item v-if="!props.token_meta_id" label="Add to Gallery">
            <el-select v-model="selected_galleries" multiple placeholder="N/A" filterable>
                <el-option v-for="gallery in gallery_list" :key="gallery.id" :label="`${gallery.entity.name}`"
                    :value="gallery.id" />
            </el-select>
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
            <el-button @click="submit(formRef)" :loading="loading" color="#000000">
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
import { createGalleryTokenMetaList } from "@/api/gallery-token";
import { createTokenMetaWithReference, getTokenMetaDocumentRef, updateTokenMeta } from "@/api/token-meta";
import { uploadFile } from "@/api/storage";
import { type TokenMeta, Blockchain, TokenPlatform, type FirestoreDocument, type Gallery, type GalleryTokenMeta } from "@/types/types";
import { useAccountStore } from "@/stores/account"
import { useTokenMetaStore } from "@/stores/token-meta"
import { showError } from "@/util/util";
import type { UploadProps, UploadUserFile } from "element-plus";
import { DocumentReference, Timestamp } from "firebase/firestore"
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAllGalleries } from "@/api/gallery";

interface SubmitTokenFormProps {
    token_meta_id?: string;
}
const props = defineProps<SubmitTokenFormProps>();

const formRef = ref<FormInstance>();
const file_uid = ref<string>();
const form = ref<TokenMeta>({
    name: "",
    artist: "",
    artist_social_link: "",
    description: "",
    public_link: "",
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
    media_id: "",
    media_type: "",
    user_id: "",
    blockchain: Blockchain.OffChain,
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
const selected_galleries = ref<string[]>([]);
const account_store = useAccountStore();
const token_meta_store = useTokenMetaStore();
const gallery_list = ref<FirestoreDocument<Gallery>[]>([]);

onMounted(() => {
    if (props.token_meta_id) {
        form.value = { ...token_meta_store.all_token_metas[props.token_meta_id].entity }
    } else {
        // only show galleries for new tokens for now
        getAllGalleries().then((galleries) => {
            gallery_list.value = galleries;
        })
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
    // make sure user id is added
    form.value.user_id = account_store.get_account.id

    // clear out asset contract and token_id if off chain
    if (form.value.blockchain != 'ethereum') {
        form.value.asset_contract_address = ""
        form.value.token_id = ""
    }

    // if updating an existing token meta, update and return
    if (props.token_meta_id) {
        updateToken(props.token_meta_id);
        return
    }

    // continue to file upload
    if (file_list?.value?.length !== 1) {
        showError(`Please add a file to upload`);
        return;
    }

    await startFileUpload(formEl);
};

const startFileUpload = async (formEl: FormInstance) => {
    const file = file_list.value[0]

    loading.value = true;

    // first get a token meta document ref, we will use the document id to save the file
    const ref = await getTokenMetaDocumentRef().catch(err => {
        console.error(err)
        loading.value = false;
        showError(`Error getting moda archive token meta document - ${err}`);
    });
    if(!ref) {
        return
    }

    const progressCallback = (progress: number) => {
        loading_progress.value = `${Math.round(progress * 100)}%`
    }
    const successCallback = () => {
        uploadSuccess(formEl, file, ref)
    }

    const file_uri = `${ref.id}.${file.name.split(".").pop()}`;
    return uploadFile(file_uri, file.raw as File, progressCallback, successCallback)
        .catch(err => {
            console.error(err)
            loading.value = false;
            showError(`Error uploading file to moda archive - ${err}`);
        });
}

const uploadSuccess = async (formEl: FormInstance, file: UploadUserFile, ref: DocumentReference) => {
    form.value.media_id = `${ref.id}`
    form.value.media_type = `.${file.name.split(".").pop()}`

    let new_token_meta: FirestoreDocument<TokenMeta>;
    try {
        new_token_meta = await createTokenMetaWithReference(ref, form.value)
    } catch (err) {
        showError(`Error uploading metadata to moda archive - ${err}`)
        loading.value = false;
        return
    }

    // if the user selected galleries we need to add the token to them
    if (selected_galleries.value?.length) {
        const gallery_token_meta_list = selected_galleries.value.map((gallery_id) => {
            return {
                gallery_id,
                token_meta_id: new_token_meta.id
            } as GalleryTokenMeta
        })

        await createGalleryTokenMetaList(gallery_token_meta_list)
            .catch((err) => {
                showError(`Error adding token to gallery - ${err}`)
                loading.value = false;
            })
    }

    formEl.resetFields();
    file_list.value = [];
    selected_galleries.value = [];
    ElMessage({
        type: 'success',
        message: 'Successfully submitted artwork. Please wait a few moments for your artwork to appear.',
    })
    loading.value = false;
}

const updateToken = (token_meta_id: string) => {
    loading.value = true;
    updateTokenMeta(token_meta_id, form.value).then(() => {
        ElMessage({
            type: 'success',
            message: 'Successfully updated artwork',
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
