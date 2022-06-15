<template>
    <div style="display: flex; align-items: center;">
        <el-image v-if="screen_type != 'xs'" :src="getImageUrl('logo.png')"
            style="width: 43px; height: 43px; margin-right: 2em">
        </el-image>
        <template v-if="router.currentRoute.value.name == 'qr-scan'">
            <div style="flex-grow: 1"></div>
            <el-button icon="close" @click="router.push('plaque-list')">
                Cancel
            </el-button>
        </template>
        <template v-else>
            <el-tabs v-model="route.name" @tab-click="handleClick">
                <el-tab-pane label="Plaques" name="plaque-list"></el-tab-pane>
                <el-tab-pane label="Tokens" name="token-list"></el-tab-pane>
            </el-tabs>
            <div style="flex-grow: 1"></div>
            <div style="margin-right: 10px;">{{ toolbar_address }}</div>
            <el-button @click="logout" style="margin-left: 1em;">Logout</el-button>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useAccountStore } from "@/stores/account"
import useBreakpoints from "@/composables/breakpoints"
import type { TabsPaneContext } from 'element-plus'

const router = useRouter();
const route = useRoute();
const account_store = useAccountStore();
const { width, screen_type } = useBreakpoints();

const handleClick = (tab: TabsPaneContext, event: Event) => {
    if (tab.paneName && typeof tab.paneName === 'string') {
        router.push({ name: tab.paneName })
    }
}
// show ens if found, otherwise show truncated wallet address
const toolbar_address = computed(() => {
    const account = account_store.account
    if (!account) {
        return ""
    }
    if (account.entity.ens_name) {
        return account.entity.ens_name;
    }
    const address = account.entity.wallet_address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
})

const logout = () => {
    account_store.logout();
    router.push({ name: "landing", query: { redir: window.location.href } });
}

const getImageUrl = (filename: string) => {
    return new URL(`../assets/${filename}`, import.meta.url).href
}


</script>

<style scoped>
</style>
