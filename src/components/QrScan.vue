<template>
    <QrcodeStream style="width: 100%;" @decode="onDecode" @init="onInit">
    </QrcodeStream>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QrcodeStream } from "vue3-qrcode-reader";
import { updatePlaque } from "@/api/plaque";
import { useRouter } from 'vue-router';
import { useAccountStore } from "@/stores/account"
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'


const account_store = useAccountStore()
const router = useRouter();

const onDecode = async (qr_code_link: string) => {
    console.log("QrScan.onDecode qr_code_link ", qr_code_link);
    const split_link = qr_code_link.split("?")
    if (split_link.length != 2) {
        console.log(`QrScan.onDecode error - invalid url, nor query params found`);
        ElMessage({ message: "Error adding account to plaque - invalid qr code", type: 'error', showClose: true, duration: 12000 })
        return
    }

    const qparams = new URLSearchParams(split_link[1]);
    const plaque_id = qparams.get("plaque_id");
    const account_id = account_store.account?.id;
    if (!plaque_id || !account_id) {
        console.log(`QrScan.onDecode error - invalid plaque_id: ${plaque_id} or account_id: ${account_id}`)
        ElMessage({ message: "Error adding account to plaque - invalid plaque or account", type: 'error', showClose: true, duration: 12000 });
        return
    }

    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    await updatePlaque(plaque_id, {account_id}).then((plaque) => {
        ElMessage({ message: `Connected to plaque ${plaque.entity.name}`, type: 'success', showClose: true, duration: 6000 });
    }).catch(err => {
        ElMessage({ message: `Error adding account to plaque - ${err}`, type: 'error', showClose: true, duration: 12000 });
    })
    loading.close();
    router.push('plaque-list');
};

const onInit = async (promise: Promise<any>) => {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })

    try {
        await promise;
        // successfully initialized
    } catch (error: any) {
        console.log("QrScan.onInit error - ", error)
        if (error.name === "NotAllowedError") {
            // user denied camera access permisson
        } else if (error.name === "NotFoundError") {
            // no suitable camera device installed
        } else if (error.name === "NotSupportedError") {
            // page is not served over HTTPS (or localhost)
        } else if (error.name === "NotReadableError") {
            // maybe camera is already in use
        } else if (error.name === "OverconstrainedError") {
            // did you requested the front camera although there is none?
        } else if (error.name === "StreamApiNotSupportedError") {
            // browser seems to be lacking features
        }
    } finally {
        loading.close();
    }
};
</script>