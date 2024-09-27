<template>
    <div class="container">
        <div v-if="!token_meta">Loading</div>
        <ArtPreviewHeader v-else :token_meta="token_meta"></ArtPreviewHeader>
        <div>
            <div style="padding: 20px 0px; display: flex; gap: 10px; width: 100%;">
                <el-button color="#000000" size="large" @click="tipArtist" style="flex-grow: 1; font-size: 18px;"
                    round>Tip Artist</el-button>
                <!-- <el-button v-if="token_meta?.entity.permission_to_sell" color="#000000" size="large"
                    style="flex-grow: 1; font-size: 18px;" round>Place A Bid</el-button> -->
            </div>
            <div style="padding: 12px 0px; ">
                <div style="font-size: var(--el-font-size-extra-small);">Learn More</div>
                <div style="display: flex; gap: 10px; width: 100%;">
                    <el-button @click="goToModaPlaque" style="flex-grow: 1;">Moda Plaque</el-button>
                    <el-button @click="goToProjectBlank" style="flex-grow: 1;">Projekt
                        ______</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { showError } from "@/util/util";
import type { FormInstance, FormRules } from "element-plus";
import ArtPreviewHeader from '@/components/ArtPreviewHeader.vue';
import type { Bid, TokenMeta, FirestoreDocument } from "@/types/types";
import { getBidListByTokenMetaIDWithListener, createBid } from "@/api/bid";
import { getTokenMetaByIDWithListener } from "@/api/token-meta";
import { Timestamp } from "firebase/firestore"
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router';
const route = useRoute();

const formRef = ref<FormInstance>();

const form = ref<Bid>({
    token_meta_id: '',
    bidding_name: '',
    email: '',
    phone_number: '',
    amount: 0,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
});

const bid_list = ref<FirestoreDocument<Bid>[]>([]);
const token_meta = ref<FirestoreDocument<TokenMeta>>();

const minAmount = (rule: any, value: any, callback: any) => {
    let minimum_amount = 0;
    if (heighest_bid.value) {
        minimum_amount = heighest_bid.value.entity.amount + 1;
    }
    if (value <= minimum_amount) {
        callback(new Error(`Please enter a bid amount greater than $${minimum_amount}`));
    } else {
        callback();
    }
};

const rules = reactive({
    bidding_name: [{ required: true, message: 'Please enter your bidding name', trigger: 'blur' }],
    email: [
        { required: true, message: 'Please enter your email', trigger: 'blur' },
        { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] },
    ],
    phone_number: [
        { required: true, message: 'Please enter your phone number', trigger: 'blur' },
        { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number', trigger: 'blur' },
    ],
    amount: [
        { required: true, message: 'Please enter a bid amount', trigger: 'blur' },
        { validator: minAmount, trigger: 'blur' },
        { pattern: /^\d+(\.\d+)?$/, message: 'Please enter a valid number', trigger: 'blur' },
    ]
});



const global_loading = ref(); // should not have an initial value or type because of the way ElLoading.service works
const submit_loading = ref(false);

// call bid list on mount
onMounted(async () => {
    // check if token meta id is valid and not an array
    if (!route.params.token_meta_id || route.params.token_meta_id instanceof Array) {
        showError(`Error invalid token meta id`);
        return;
    }

    global_loading.value = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    console.log("route.params.token_meta_id", route.params.token_meta_id)
    await getTokenMetaByIDWithListener(route.params.token_meta_id, (meta) => {
        token_meta.value = meta;
        form.value.token_meta_id = meta.id;
    });
    // await getBidListByTokenMetaIDWithListener(route.params.token_meta_id, (bids) => {
    //     bid_list.value = bids;
    //     global_loading.value.close();
    // });
});

const heighest_bid = computed(() => {
    if (bid_list.value.length === 0) {
        return null;
    }
    // return highest bid in bid_list
    return bid_list.value.reduce((prev, current) => {
        return (prev.entity.amount > current.entity.amount) ? prev : current
    });
});

const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        showError(`Error finding form element`);
        return;
    }
    const valid = await formEl.validate((v) => v);
    if (!valid) {
        return;
    }
    submit_loading.value = true;

    // submit bid 
    await createBid(form.value).then(() => {
        submit_loading.value = false;
        formEl.resetFields();
        ElMessage({
            type: 'success',
            message: 'Successfully submitted bid!',
        })
    }).catch((err) => {
        submit_loading.value = false;
        showError(err);
    })

};

const goToModaPlaque = () => {
    window.open('https://moda-labs.xyz/', "_blank");
}

const goToProjectBlank = () => {
    window.open('https://www.instagram.com/projekt.______/', "_blank");
}

const tipArtist = () => {
    window.open('https://account.venmo.com/u/ModaArt', "_blank");
}

</script>

<style>
.container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, Helvetica, sans-serif;
}

.top-bid {
    margin-top: 20px;
    padding-top: 20px;
}


.bid-name {
    font-weight: bold;
    margin-right: 10px;
}

.bid-form {
    margin-top: 40px;
}

.submit-button {
    margin-top: 20px;
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