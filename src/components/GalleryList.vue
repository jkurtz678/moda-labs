<template>
    <div style="display: flex; justify-content: center">
        <el-card class="container-card">
            <template #header>
                <div class="card-header">
                    <span style="font-size: 18px;">Galleries</span>
                    <el-button icon="Plus" @click="router.push({ name: 'new-gallery' })" color="#000000">New Gallery
                    </el-button>
                </div>
            </template>
            <div v-if="galleries.length == 0">No galleries found</div>
            <GalleryItem v-for="gallery in galleries" :gallery="gallery">
            </GalleryItem>
        </el-card>
    </div>
    <RouterView></RouterView>
</template>
<script setup lang="ts">
import { useGalleryStore } from '@/stores/gallery';
import GalleryItem from "./GalleryItem.vue";
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const gallery_store = useGalleryStore()
const galleries = computed(() => {
    return gallery_store.gallery_list;
})
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