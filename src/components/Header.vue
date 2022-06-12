<template>
    <div style="display: flex; align-items: center;">
        <el-image :src="getImageUrl('logo.png')" style="width: 43px; height: 43px;"></el-image>
        <el-tabs v-if="screen_type != 'xs'" style="margin-left: 2em;">
            <el-tab-pane label="Overview" name="first"></el-tab-pane>
            <el-tab-pane label="Support" name="second"></el-tab-pane>
            <el-tab-pane label="Account" name="Third"></el-tab-pane>
        </el-tabs>
        <div style="flex-grow: 1"></div>
        <el-button v-if="router.currentRoute.value.name == 'plaque-list'" icon="plus"
            @click="show_add_plaque_dialog = true">
            Plaque</el-button>
        <el-button v-if="router.currentRoute.value.name == 'qr-scan'" icon="close" @click="router.push('plaque-list')">
            Cancel</el-button>

        <el-button @click="logout" style="margin-left: 1em;">Logout</el-button>
        <el-dialog v-model="show_add_plaque_dialog" title="Add plaque" :width="screen_type == 'xs' ? '90%' : '50%'">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                <el-button @click="router.push('qr-scan'); show_add_plaque_dialog = false;" icon="camera"
                    style="margin: 10px 12px 10px 0px;">Scan Plaque QR
                    Code</el-button>
                <el-button icon="plus" @click="createTestPlaque" :loading="add_test_plaque_loading"
                    style="margin: 10px 0px 10px 0px;">Add test plaque
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useAccountStore } from "@/stores/account"
import useBreakpoints from "@/composables/breakpoints"
import { createPlaque } from "@/api/plaque"
import { Timestamp } from "firebase/firestore"
import { ElMessage } from 'element-plus'

const router = useRouter();
const account_store = useAccountStore();
const show_add_plaque_dialog = ref(false);
const add_test_plaque_loading = ref(false);
const { width, screen_type } = useBreakpoints();

const logout = () => {
    account_store.logout();
    router.push({ name: "landing" })
}

const getImageUrl = (filename: string) => {
    return new URL(`../assets/${filename}`, import.meta.url).href
}

const createTestPlaque = async () => {
    add_test_plaque_loading.value = true
    await createPlaque({
        name: "Test Plaque",
        wallet_address: account_store.get_account.entity.wallet_address,
        token_meta_id_list: [],
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
    }).catch(err =>
        ElMessage({ message: `Error creating test plaque- ${err}`, type: 'error', showClose: true, duration: 12000 })
    );
    add_test_plaque_loading.value = false;
    show_add_plaque_dialog.value = false;
}
</script>

<style scoped>
</style>
