<template>
    <div>
        <div v-if="highest_bid">
            <h3 style="font-weight: bold;">Highest Bid</h3>
            <div class="bid">
                <span style=" margin-right: 5px;">{{ highest_bid.entity.bidding_name }}</span>-
                <span >{{ highest_bid_string }}</span>
            </div>
        </div>
        <div v-else>
            <h3 style="font-weight: bold;">Starting Bid</h3>
            <h2 >{{ starting_bid_string }}</h2>
        </div>
        <div class="bid-form">
            <h3 style="padding-bottom: 15px; font-weight: bold;" >Place a Bid</h3>
            <el-form ref="formRef" :model="form" :rules="rules" label-width="160px" label-position="left">
                <el-form-item label="Email (private)" prop="email">
                    <el-input v-model.trim="form.email"></el-input>
                </el-form-item>
                <el-form-item label="Phone (private)" prop="phone_number">
                    <el-input v-model.trim="form.phone_number"></el-input>
                </el-form-item>
                <el-form-item label="Bidding Name (public)" prop="bidding_name">
                    <el-input v-model="form.bidding_name"></el-input>
                </el-form-item>
                <el-form-item label="Bid Amount (public)" prop="amount" style="max-width: 350px">
                    <el-input v-model="form.amount">
                        <template #append>{{currency_unit == 'eth' ? 'ETH' : '$'}}</template>
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
import { type Bid, type TokenMeta, type FirestoreDocument, PriceUnit } from "@/types/types";
import { getBidListByTokenMetaIDWithListener, createBid } from "@/api/bid";
import { getTokenMetaByIDWithListener } from "@/api/token-meta";
import { Timestamp } from "firebase/firestore"
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';

interface QrLandingBiddingFormProps {
    token_meta: FirestoreDocument<TokenMeta>;
}
const props = defineProps<QrLandingBiddingFormProps>();

const route = useRoute();
const router = useRouter();

const formRef = ref<FormInstance>();

const form = ref<Bid>({
    token_meta_id: '',
    bidding_name: '',
    email: '',
    phone_number: '',
    amount: 0,
    amount_unit: PriceUnit.USD,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
});
// const amount_string = ref('0');

const bid_list = ref<FirestoreDocument<Bid>[]>([]);
const starting_bid_string = computed(() => {
    switch (props.token_meta?.entity?.price_unit) {
        case PriceUnit.USD:
            return `$${props.token_meta?.entity?.price}`
        case PriceUnit.ETH:
            return `${props.token_meta?.entity?.price} ETH`
        default:
            return ""
    }
})

const highest_bid_string = computed(() => {
     if (!highest_bid.value) {
        return ""
     }
    switch (highest_bid.value.entity.amount_unit) {
        case PriceUnit.USD:
            return `$${highest_bid?.value?.entity?.amount}`
        case PriceUnit.ETH:
            return `${highest_bid?.value?.entity?.amount} ETH`
        default:
            return ""
    }
})

const currency_unit = computed(() => {
    if(highest_bid.value) {
        return highest_bid.value?.entity.amount_unit;
    } 

    return props.token_meta.entity.price_unit;
})

const minAmount = (rule: any, value: string, callback: any) => {
    console.log("value", value)
    const value_num = parseFloat(value);
    if(isNaN(value_num)) {
        callback(new Error(`Please enter a valid number`));
        return;
    }

    let minimum_amount = 0;
    if (highest_bid.value) {
        if(highest_bid.value.entity.amount_unit == PriceUnit.USD) {
            minimum_amount = highest_bid.value.entity.amount + 20;
        } else {
            minimum_amount = highest_bid.value.entity.amount + .01;
        }
    } else {
        minimum_amount = props.token_meta?.entity?.price || 0
    }
    console.log("minimum_amount", minimum_amount, value_num);
    if(value_num < minimum_amount) {
        callback(new Error(`Please enter a bid amount equal or greater than ${minimum_amount}`));
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

    await getBidListByTokenMetaIDWithListener(route.params.token_meta_id, (bids) => {
        console.log("bids", bids);
        bid_list.value = bids;
        global_loading.value.close();
    });
});

const highest_bid = computed(() => {
    if (bid_list.value.length === 0) {
        return null;
    }
    // return highest bid in bid_list
    return bid_list.value.reduce((prev, current) => {
        return (prev.entity.amount > current.entity.amount) ? prev : current
    });
});

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
    form.value.amount = parseFloat(form.value.amount);
    form.value.token_meta_id = props.token_meta.id;
    form.value.amount_unit = currency_unit.value || PriceUnit.USD;

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