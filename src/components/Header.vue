<template>
    <div style="display: flex; align-items: center;">
        <el-image :src="getImageUrl('logo.png')" style="width: 43px; height: 43px;"></el-image>
        <el-tabs v-if="screen_type != 'xs'"  style="margin-left: 2em;">
            <el-tab-pane label="Overview" name="first"></el-tab-pane>
            <el-tab-pane label="Support" name="second"></el-tab-pane>
            <el-tab-pane label="Account" name="Third"></el-tab-pane>
        </el-tabs>
        <div style="flex-grow: 1"></div>
        <el-button @click="logout" style="margin-right: 1em;">Logout</el-button>
        <el-button v-if="router.currentRoute.value.name == 'plaque-list'" icon="plus" circle
            @click="router.push('qr-scan')" />
        <el-button v-if="router.currentRoute.value.name == 'qr-scan'" icon="close" circle
            @click="router.push('plaque-list')" />
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAccountStore } from "@/stores/account"
import useBreakpoints from "@/composables/breakpoints"
const router = useRouter();
const account_store = useAccountStore();
const {width, screen_type} = useBreakpoints();

const logout = () => {
    account_store.logout();
    router.push({ name: "landing" })
}

const getImageUrl = (filename: string) => {
    return new URL(`../assets/${filename}`, import.meta.url).href
}
</script>

<style scoped>
</style>
