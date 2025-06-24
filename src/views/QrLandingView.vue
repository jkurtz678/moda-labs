<template>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <div :class="{ container: !isIframePage, 'iframe-page': isIframePage }">
        <transition name="slide-in" appear>
            <template v-if="token_meta">
                <div class="content-wrapper">
                    <ArtPreviewHeader v-if="!isIframePage" :token_meta="token_meta"></ArtPreviewHeader>
                    <transition name="fade" mode="out-in">
                        <RouterView v-slot="{ Component }">
                            <component :is="Component" :token_meta="token_meta" />
                        </RouterView>
                    </transition>
                </div>
            </template>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { showError } from "@/util/util";
import type { FormInstance, FormRules } from "element-plus";
import ArtPreviewHeader from '@/components/ArtPreviewHeader.vue';
import type { Bid, TokenMeta, FirestoreDocument } from "@/types/types";
import { getBidListByTokenMetaIDWithListener, createBid } from "@/api/bid";
import { getTokenMetaByIDWithListener } from "@/api/token-meta";
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const token_meta = ref<FirestoreDocument<TokenMeta>>();

const global_loading = ref(); // should not have an initial value or type because of the way ElLoading.service works

// Check if current route is the iframe page
const isIframePage = computed(() => {
    return route.name === 'iframe';
});

// call bid list on mount
onMounted(async () => {
    // check if token meta id is valid and not an array
    if (!route.params.token_meta_id || route.params.token_meta_id instanceof Array) {
        showError(`Error invalid token meta id`);
        return;
    }

    fetchTokenMeta(route.params.token_meta_id);
});

watch(
    () => route.params.token_meta_id, // Watch this value
    (newVal, oldVal) => {
        if (!newVal || newVal instanceof Array) {
            showError(`Error invalid token meta id`);
            return;
        }

        if (newVal !== oldVal) {
            fetchTokenMeta(newVal); // Call API when token_meta_id changes
        }
    }
);

const fetchTokenMeta = async (token_meta_id: string) => {
    token_meta.value = undefined;
    global_loading.value = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    await getTokenMetaByIDWithListener(token_meta_id, (meta) => {
        token_meta.value = meta;
    }).catch((err) => {
        showError(`Error fetching token meta: ${err}`);
    }).finally(() => {
        global_loading.value.close();
    });
}

</script>

<style scoped>
.container {
    max-width: 500px;
    margin: 0 auto;
    padding: 16px 20px;
    overflow-y: auto;
    height: 100%;
    font-family: "K2D", sans-serif;
    font-size: 15px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.iframe-page {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.slide-in-enter-active {
    transition: all 0.6s ease-out;
}

.slide-in-enter-from {
    transform: translateY(30px);
    opacity: 0;
}

.slide-in-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.content-wrapper {
    width: 100%;
}

::v-deep .el-button {
    font-family: "K2D", sans-serif;
}

</style>