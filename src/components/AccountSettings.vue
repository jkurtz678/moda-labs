<template>
    <div style="display: flex; justify-content: center">
        <el-card class="container-card">
            <template #header>
                <div class="card-header">
                    <span style="font-size: 18px;">Account Settings</span>
                </div>
            </template>
            <div style="font-size: var(--el-font-size-extra-small)">Email</div>
            <div>{{ account_store.get_account.entity.email }}</div>

            <div v-if="account.entity.wallet_address" style="margin-top: 2em">

                <div style="font-size: var(--el-font-size-extra-small); display: flex; align-items: center;">
                    <div>Connected Ethereum Wallet</div>
                    <el-icon style="color: green; font-size: 1.5em; margin-left: 5px">
                        <Check />
                    </el-icon>
                </div>
                <div style="display: flex; align-items: center;">
                    <div>{{ account.entity.wallet_address }}</div>
                    <el-button text circle size="small" icon="close" style="margin-left: 5px;" @click="disconnect"
                        :loading="connect_wallet_loading"></el-button>
                </div>
            </div>
            <el-button v-else @click="connect" :loading="connect_wallet_loading" style="margin-top: 2em" icon="Connection"
                color="#000000">Connect Ethereum
                Wallet</el-button>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/account"
import { computed, ref } from "vue";
import { connectWallet } from "@/web3Interface"
import { updateAccount } from "@/api/account"
import { ElMessage, ElMessageBox } from "element-plus";
import type { Account } from "@/types/types";

const account_store = useAccountStore();
const connect_wallet_loading = ref(false);


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
    await updateAccount(account.value.id, update_data).then(() => {
        return account_store.loadAccount(account.value.id);
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
    min-width: 700px;
    border-radius: 18px;
    height: 100%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>