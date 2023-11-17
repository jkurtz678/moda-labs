<template>
    <div style="display: flex; justify-content: center; margin-top: 50px">
        <el-card class="container-card" :style="md_and_up ? 'min-width: 700px;' : ''">
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
import useBreakpoints from '@/composables/breakpoints';

const { md_and_up } = useBreakpoints();
const router = useRouter();
const gallery_store = useGalleryStore()
const galleries = computed(() => {
    return gallery_store.gallery_list;
})
</script>

<style scoped>
.container-card {
    border-radius: 18px;
    height: 100%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>