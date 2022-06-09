<template>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items:center; height: 100%">
        <img :src="getImageUrl('logo.png')" style="width: 180px; height: 180px; display: block; margin-bottom: 25px;" />
        <el-button v-if="metamask_supported" :loading="connect_account_loading" @click="connectWallet">Connect Metamask
        </el-button>
        <div v-else style="text-align: center;">
            The Metamask extension was not detected on your browser.
            <br />Please
            <el-link type="primary" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">
                install Metamask
            </el-link> and then refresh the page.
        </div>
        <div style="height: 100px;"></div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { ethers } from "ethers";
import { ElMessage, ElMessageBox } from 'element-plus'
import router from "@/router";
import detectEthereumProvider from '@metamask/detect-provider';

const metamask_supported = ref(false);
const connect_account_loading = ref(false);

onMounted(async () => {
    const provider = await detectEthereumProvider();
    metamask_supported.value = Boolean(provider);
})

const connectWallet = async () => {
    const { ethereum } = window;
    connect_account_loading.value = true;
    let address;
    let signature;
    try {
        // fix issue with user closing metamask before entering password https://github.com/MetaMask/metamask-extension/issues/10085#issuecomment-1122815090
        await ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
        })
        
        // load account
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        address = await signer.getAddress()

        // get signature
        const message =
            "MoDA Labs - proof of ownership. Please sign this message to prove ownership over your Ethereum account.";
        signature = await signer.signMessage(message);
        window.localStorage.setItem("account_address", address);
        window.localStorage.setItem("account_signature", signature);

        router.push({ name: "submit" });
    } catch (err: any) {
        ElMessage({ message: `Error connecting to Metamask - ${err.message ? err.message : err}`, type: 'error', showClose: true, duration: 10000 });
    } finally {
        connect_account_loading.value = false;
    }
}

const getImageUrl = (filename: string) => {
    return new URL(`../assets/${filename}`, import.meta.url).href
}
</script>