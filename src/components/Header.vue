<template>
    <el-header class="header" :style="screen_type=='xs' ? 'padding: 0px 8px;' : ''">
        <el-image v-if="md_and_up" :src="getImageUrl('logo.png')"
            style="width: 40px; height: 40px; margin-right: 2em">
        </el-image>
        <template v-if="router.currentRoute.value.name == 'qr-scan'">
            <div style="flex-grow: 1"></div>
            <el-button icon="close" color="#000000" @click="router.push('plaque-list')">
                Cancel
            </el-button>
        </template>
        <template v-else>
            <el-tabs v-model="route.name" @tab-click="handleClick" :class="md_and_up ? '' : 'small-tabs'">
                <el-tab-pane label="Plaques" name="plaque-list"></el-tab-pane>
                <el-tab-pane label="Artwork" name="artwork-tile-grid"></el-tab-pane>
                <el-tab-pane label="Galleries" name="gallery-list"></el-tab-pane>
                <el-tab-pane label="Account" name="account-settings"></el-tab-pane>
            </el-tabs>
            <div style="flex-grow: 1"></div>
            <div v-if="md_and_up" style="margin-right: 10px; display: flex; align-items: center;">
                <div>{{ toolbar_address }}</div>
                <el-button v-if="account_store.is_user_admin" type="info" round size="small"
                    style="margin-left: 8px">Admin</el-button>
            </div>
            <!--- beginning of view-as system -->
            <!-- <el-popover placement="bottom" :width="400" trigger="click">
                <template #reference>
                    <el-button style="margin-right: 16px">Click to activate</el-button>
                </template>
                <el-select-v2 v-model="" style="width: 240px" multiple filterable remote :remote-method=""
                    clearable :loading="false" placeholder="Please enter a keyword" />
            </el-popover> -->
            <el-button @click="logout" style="margin-left: 1em;" :loading="logout_loading">Logout</el-button>
        </template>
    </el-header>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useAccountStore } from "@/stores/account"
import useBreakpoints from "@/composables/breakpoints"
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig"
import type { TabsPaneContext } from 'element-plus'
import { showError } from "@/util/util";

const router = useRouter();
const route = useRoute();
const account_store = useAccountStore();
const logout_loading = ref(false);
const { md_and_up, screen_type} = useBreakpoints();

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
    if (account.entity.email) {
        return account.entity.email;
    }
    const address = account.entity.wallet_address;
    if (address) {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    }
    return ""
})

const logout = () => {
    logout_loading.value = true;
    signOut(auth)
        .then(() => {
            // onAuthStateChanged will redirect to login
            //router.push({ name: "login", query: { redir: window.location.href } });
        }).catch((error) => {
            showError(error)
        }).finally(() => {
            logout_loading.value = false;
        })
}

const getImageUrl = (filename: string) => {
    return new URL(`../assets/${filename}`, import.meta.url).href
}


</script>

<style scoped>
.header {
    position:fixed;
    top: 0px;
    left: 0px; 
    right: 0px;
    --el-header-height: 50px;
    display: flex;
    align-items: center;
    z-index: 100;
    background-color: white;
}

:deep(.el-tabs__header) {
    margin-bottom: 0px;
    padding-bottom: 8px;
}

.small-tabs :deep(.el-tabs__item) {
    padding: 0px 8px;
} 
</style>


