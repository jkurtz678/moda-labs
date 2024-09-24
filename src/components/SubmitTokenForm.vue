<template>
    <el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="180px"
        style="margin: 0 auto;">
        <el-form-item label="Artwork Title" prop="name">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Artist Name" prop="artist">
            <el-input v-model="form.artist" />
        </el-form-item>
        <el-form-item label="Plaque Description" prop="description">
            <el-input v-model="form.description" type="textarea" rows="3" />
        </el-form-item>
        <el-form-item label="Plaque QR Code Link" prop="public_link">
            <el-input v-model="form.public_link" />
        </el-form-item>
        <el-form-item label="Artist Social Media Link" prop="artist_social_link">
            <el-input v-model="form.artist_social_link" />
        </el-form-item>
        <el-form-item label="Link to Blockchain">
            <el-switch v-model="using_blockchain" :active-text="using_blockchain ? 'Enabled' : 'Disabled'" />
        </el-form-item>
        <el-form-item v-if="using_blockchain" label="Blockchain" prop="blockchain">
            <el-select v-model="form.blockchain">
                <el-option label="Ethereum" value="ethereum" />
            </el-select>
        </el-form-item>
        <el-form-item v-if="using_blockchain" label="Contract Address" prop="asset_contract_address">
            <el-input v-model="form.asset_contract_address" />
        </el-form-item>
        <el-form-item v-if="using_blockchain" label="Token ID" prop="token_id">
            <el-input v-model="form.token_id" />
        </el-form-item>
        <el-form-item label="Are You Willing to Sell This Piece?" class="sell-piece">
            <el-switch v-model="form.permission_to_sell" :active-text="form.permission_to_sell ? 'Yes' : 'No'" />
        </el-form-item>
        <el-form-item v-if="form.permission_to_sell" label="Price" prop="price">
            <div>
                <div style="display: flex; align-items: center">
                    <el-input-number v-model="form.price" :controls="false" placeholder="No Price"
                        style="max-width:133px;" />
                    <el-select v-model="form.price_unit" style="margin-left: 12px; max-width: 90px;">
                        <el-option label="USD" :value="PriceUnit.USD" />
                        <el-option label="ETH" :value="PriceUnit.ETH" />
                    </el-select>
                </div>
                <div style="font-size: 11px;">GALLERY COMISSION RATE IS 33%</div>
            </div>
        </el-form-item>
        <el-form-item v-if="!props.token_meta_id" label="Share to Gallery(s)">
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
import { type TokenMeta, Blockchain, TokenPlatform, type FirestoreDocument, type Gallery, type GalleryTokenMeta, PriceUnit } from "@/types/types";
import { useAccountStore } from "@/stores/account"
import { useTokenMetaStore } from "@/stores/token-meta"
import { showError } from "@/util/util";
import type { UploadProps, UploadUserFile } from "element-plus";
import { DocumentReference, Timestamp } from "firebase/firestore"
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAllGalleries } from "@/api/gallery";
import { computed } from "vue";

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
    platform: TokenPlatform.Archive,
    permission_to_sell: false,
    price: 0,
    price_unit: PriceUnit.USD,
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
        if (!form.value.price_unit) {
            form.value.price_unit = PriceUnit.USD
        }
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

const using_blockchain = computed({
    get: () => form.value.blockchain === Blockchain.Ethereum,
    set: (value: boolean) => {
        form.value.blockchain = value ? Blockchain.Ethereum : Blockchain.OffChain;
    },
});

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
    if (!ref) {
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

<style scoped>
.el-form-item {
    max-width: 650px;
}

.el-form {
    max-width: 650px;
}

::v-deep(.el-upload-dragger) {
    padding: 5px 10px;
}

::v-deep(.el-input__inner) {
    text-align: left;
}

.el-upload {
    --el-upload-dragger-padding-horizontal: 4px;
    --el-upload-dragger-padding-vertical: 10px;
}

.el-upload-dragger .el-icon--upload {
    margin-bottom: 0px;
}

::v-deep(.sell-piece .el-form-item__label) {
    line-height: inherit;
    margin-bottom: 10px;
    text-align: left;
}
</style>
