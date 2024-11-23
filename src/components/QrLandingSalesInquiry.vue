<template>
    <div>
        <div class="bid-form">
            <h3 style="font-weight: bold;" >Purchase Inquiry</h3>
            <div style="padding-bottom:15px;">Please provide your details, and we’ll contact you soon about purchasing this artwork.</div>
            <el-form ref="formRef" :model="form" :rules="rules" label-width="160px" label-position="left">
                <el-form-item label="Full Name" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model.trim="form.email"></el-input>
                </el-form-item>
                <el-form-item label="Phone" prop="phone_number">
                    <el-input v-model.trim="form.phone_number"></el-input>
                </el-form-item>
                <el-form-item label="Message" prop="message" style="max-width: 350px">
                    <el-input v-model="form.message" type="textarea">
                    </el-input>
                </el-form-item>
                <div style="display: flex;">
                    <el-button :loading="submit_loading" @click="submit(formRef)" class="submit-button" color="#000000"
                        round style="flex-grow: 1">
                        SUBMIT
                    </el-button>
                    <el-button
                        @click="router.push({ name: 'actions', params: { token_meta_id: route.params.token_meta_id } })"
                        class="submit-button" round style="flex-grow: 1">
                        CANCEL
                    </el-button>

                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { showError } from "@/util/util";
import type { FormInstance, FormRules } from "element-plus";
import ArtPreviewHeader from '@/components/ArtPreviewHeader.vue';
import { type Bid, type TokenMeta, type FirestoreDocument, PriceUnit, SalesInquiry } from "@/types/types";
import { getBidListByTokenMetaIDWithListener, createBid } from "@/api/bid";
import { getTokenMetaByIDWithListener } from "@/api/token-meta";
import { Timestamp } from "firebase/firestore"
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';
import { createSalesInquiry } from '@/api/sales-inquiry';

interface QrLandingSalesInquiryFormProps {
    token_meta: FirestoreDocument<TokenMeta>;
}
const props = defineProps<QrLandingSalesInquiryFormProps>();

const route = useRoute();
const router = useRouter();

const formRef = ref<FormInstance>();

const form = ref<SalesInquiry>({
    token_meta_id: '',
    name: '',
    email: '',
    phone_number: '',
    message: '',
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
});



const rules = reactive({
    name: [{ required: true, message: 'Please enter your full name', trigger: 'blur' }],
    email: [
        { required: true, message: 'Please enter your email', trigger: 'blur' },
        { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] },
    ],
    phone_number: [
        { required: true, message: 'Please enter your phone number', trigger: 'blur' },
        { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number', trigger: 'blur' },
    ],
});



const submit_loading = ref(false);


const submit = async (formEl: FormInstance | undefined) => {
    console.log("submit called");
    if (!formEl) {
        showError(`Error finding form element`);
        return;
    }
    const valid = await formEl.validate((v) => v);
    if (!valid) {
        return;
    }
    submit_loading.value = true;
    //@ts-ignore
    form.value.token_meta_id = props.token_meta.id;

    // submit bid 
    await createSalesInquiry(form.value).then(() => {
        submit_loading.value = false;
        formEl.resetFields();
        ElMessage({
            type: 'success',
            message: 'Successfully submitted inquiry!',
        })
        router.push({ name: 'actions', params: { token_meta_id: route.params.token_meta_id } })
    }).catch((err) => {
        submit_loading.value = false;
        showError(err);
    })

};

</script>

<style>
.top-bid {
    margin-top: 20px;
    padding-top: 20px;
}


.bid-name {
    font-weight: bold;
    margin-right: 10px;
}

.bid-form {
    margin-top: 20px;
}

.submit-button {
    margin-top: 8px;
}

.el-form-item {
    margin-bottom: 12px;
}

@media (max-width: 768px) {
    .bid-form {
        flex-wrap: wrap;
    }

    .el-form-item {
        width: 100% !important;
    }
}
</style>