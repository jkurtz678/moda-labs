<template>
    <div style="display: flex; justify-content: center; margin-top: 50px;">
        <el-card class="container-card" :style="md_and_up ? 'min-width: 700px;' : ''">
            <template #header>
                <div class="card-header">
                    <span style="font-size: 18px;">Account Settings</span>
                </div>
            </template>
            <div style="font-size: var(--el-font-size-extra-small)">Email</div>
            <div>{{ account_store.get_account.entity.email }}</div>

            <div style="font-size: var(--el-font-size-extra-small); margin-top: 2em">Ethereum Wallet</div>
            <div v-if="account.entity.wallet_address">

                <div style="display: flex; align-items: center;">
                    <div :style="screen_type == 'xs' ? 'max-width: 250px; text-overflow: ellipsis; overflow: hidden;' : ''">{{
                        account.entity.wallet_address }}</div>
                    <el-button text circle size="small" icon="close" style="margin-left: 5px;" @click="disconnect"
                        :loading="connect_wallet_loading"></el-button>
                </div>
                <div>Loaded {{ token_meta_store.opensea_wallet_token_meta_list.length }} wallet
                    token{{ token_meta_store.opensea_wallet_token_meta_list.length == 1 ? '' : 's' }} from Opensea</div>
                <div>Loaded {{ token_meta_store.opensea_minted_token_meta_list.length }}
                    token{{ token_meta_store.opensea_minted_token_meta_list.length == 1 ? '' : 's' }} you minted from
                    Opensea
                </div>
            </div>
            <template v-else>
                <div v-if="metamask_check_loading" v-loading="metamask_check_loading" style="width: 60px; height: 60px;">
                </div>
                <el-button v-else-if="metamask_supported" @click="connect" :loading="connect_wallet_loading"
                    icon="Connection" color="#000000">
                    Connect With Metamask
                </el-button>
                <el-alert v-else type="warning" show-icon title="Metamask extension not found" style="margin-bottom: 1.5em"
                    :closable="false">
                    The Metamask browser extension is required to connect your wallet, and this extension was not detected
                    on your browser.
                    <br />Please
                    <el-link type="primary" style="font-size: 12px; vertical-align: top;"
                        href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">
                        install Metamask
                    </el-link> and then refresh the page.
                </el-alert>
            </template>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/account"
import { useTokenMetaStore } from "@/stores/token-meta"
import { computed, onMounted, ref } from "vue";
import { connectWallet } from "@/web3Interface"
import { updateAccount } from "@/api/account"
import { ElLoading, ElMessage, ElMessageBox } from "element-plus";
import type { Account } from "@/types/types";
import { showError, isMobileBrowser } from "@/util/util";
import useBreakpoints from "@/composables/breakpoints";
import detectEthereumProvider from "@metamask/detect-provider";

const account_store = useAccountStore();
const token_meta_store = useTokenMetaStore();
const connect_wallet_loading = ref(false);
const { md_and_up, screen_type } = useBreakpoints();

const metamask_supported = ref(false);
const metamask_check_loading = ref(false);

onMounted(() => {
    checkMetamaskExtension();
})

const checkMetamaskExtension = async () => {
    // had difficulties detecting metamask on mobile browsers, always show connect button on mobile for now
    if (isMobileBrowser()) {
        metamask_supported.value = true;
        return
    }

    metamask_check_loading.value = true
    const provider = await detectEthereumProvider().catch((err: Error) => {
        showError(`Error detecting ethereum provider - ${err}`)
    });
    metamask_supported.value = Boolean(provider);
    metamask_check_loading.value = false;
}

const account = computed(() => {
    return account_store.get_account;
})

const connect = async () => {
    const { address, signature, ens_name } = await connectWallet()
    console.log("address", address, signature, ens_name)
    connect_wallet_loading.value = true
    const update_data: Partial<Account> = { wallet_address: address, signature: signature }
    if (ens_name) {
        update_data.ens_name = ens_name;
    }
    updateAccount(account.value.id, update_data).then(() => {
        return account_store.loadAccount(account.value.id);
    }).then(() => {
        const opensea_minted_token_promise = token_meta_store.loadOpenseaMintedTokenMetas(address)
            .catch(err => (showError(`Error loading opensea minted tokens - ${err}`)))
        const opensea_wallet_token_promise = token_meta_store.loadOpenseaWalletTokenMetas(address)
            .catch(err => (showError(`Error loading opensea wallet tokens - ${err}`)))

        return Promise.all([opensea_minted_token_promise, opensea_wallet_token_promise]);
    }).then(() => {
        ElMessage({
            type: 'success',
            message: 'Ethereum wallet connected',
        })
    }).catch((err) => {
        ElMessage({ message: `Error connecting wallet - ${err}`, type: 'error', showClose: true, duration: 12000 });
    }).finally(() => connect_wallet_loading.value = false);
}

const disconnect = async () => {
    connect_wallet_loading.value = true
    ElMessageBox.confirm(`Are you sure you want to disconnect your wallet?`, "Disconnect", {
        type: 'warning'
    }).then(() => {
        const update_data: Partial<Account> = { wallet_address: "", signature: "", ens_name: "" }
        return updateAccount(account.value.id, update_data);
    }).then(() => {
        return account_store.loadAccount(account.value.id);
    }).then(() => {
        token_meta_store.opensea_minted_token_meta_list = [];
        token_meta_store.opensea_wallet_token_meta_list = [];
        ElMessage({
            type: 'success',
            message: 'Ethereum wallet disconnected',
        })
    }).catch(err => {
        ElMessage({ message: `Error disconnecting wallet - ${err}`, type: 'error', showClose: true, duration: 12000 });
    }).finally(() => connect_wallet_loading.value = false);
}

</script>

<style scoped>
.container-card {
    border-radius: 18px;
    height: 100%;
    text-align: left;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>