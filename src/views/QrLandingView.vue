<template>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <div class="container">
        <template v-if="token_meta">
            <ArtPreviewHeader :token_meta="token_meta"></ArtPreviewHeader>
            <transition name="fade" mode="out-in">
                <RouterView v-slot="{ Component }">
                    <component :is="Component" :token_meta="token_meta" />
                </RouterView>
            </transition>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { showError } from "@/util/util";
import type { FormInstance, FormRules } from "element-plus";
import ArtPreviewHeader from '@/components/ArtPreviewHeader.vue';
import type { Bid, TokenMeta, FirestoreDocument } from "@/types/types";
import { getBidListByTokenMetaIDWithListener, createBid } from "@/api/bid";
import { getTokenMetaByIDWithListener } from "@/api/token-meta";
import { Timestamp } from "firebase/firestore"
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router';
const route = useRoute();

const formRef = ref<FormInstance>();


const bid_list = ref<FirestoreDocument<Bid>[]>([]);
const token_meta = ref<FirestoreDocument<TokenMeta>>();


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
    await getTokenMetaByIDWithListener(route.params.token_meta_id, (meta) => {
        token_meta.value = meta;
        global_loading.value.close();
    });
    // await getBidListByTokenMetaIDWithListener(route.params.token_meta_id, (bids) => {
    //     bid_list.value = bids;
    //     global_loading.value.close();
    // });
});



</script>

<style>
.container {
    max-width: 500px;
    margin: 0 auto;
    padding: 16px 20px;
    font-family: Arial, Helvetica, sans-serif;
    overflow-y: auto;
    height: 100%;
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
</style>