<template>
    <div class="tile-container" style="margin: 12px; width: 340px;"
        @click="router.push({ name: 'actions', params: { token_meta_id: props.token_meta.id } })">
        <div style="display: flex; flex-direction: column; height: 100%;" ref="tile">
            <div style="display: flex; border-radius: 18px; flex-grow: 1;" :style="`height: ${tile_height}px !important; width: ${tile_width}px !important `">
                <img v-if="isIntersecting" :src="thumbnail_url" :style="`max-height: ${tile_height}px !important;`"/>
            </div>
            <h2 style="font-weight: bold; overflow-wrap: break-word;">{{ props.token_meta.entity.name }}</h2>
            <div style="min-height: 24px;">{{ priceDisplay(props.token_meta) }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useTileAnimation } from '@/composables/thumbnail-image';
import { FirestoreDocument, priceDisplay, TokenMeta } from '@/types/types';
import { toRef, ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLazyLoad } from '@/composables/lazy-load';

const route = useRoute();
const router = useRouter();
interface ArtPreviewHeaderProps {
    token_meta: FirestoreDocument<TokenMeta>;
}
const props = defineProps<ArtPreviewHeaderProps>();
const thumbnail_url = useTileAnimation(toRef(props, "token_meta"));

const { isIntersecting, observe } = useLazyLoad('200% 0px');
const tile = ref<HTMLElement | null>(null);

onMounted(() => {
    if (tile.value) {
        observe(tile.value);
    } else {
        // If ref isn't ready on mount, watch for changes
        watch(tile, (newRef) => {
            if (newRef) {
                observe(newRef);
            }
        }, { immediate: true });
    }
});

const tile_height = computed(() => {

    if (!props.token_meta.entity.aspect_ratio || props.token_meta.entity.aspect_ratio <= 1) {
        return 340;
    }

    return 340 / props.token_meta.entity.aspect_ratio;
    
})

const tile_width = computed(() => {
    if (!props.token_meta.entity.aspect_ratio || props.token_meta.entity.aspect_ratio >= 1) {
        return 340;
    }
    return 340 * props.token_meta.entity.aspect_ratio;
})
</script>

<style scoped>
:deep(.el-card__body) {
    height: 100%;
}

img {
    border-radius: 18px;
    max-width: 100%;
    min-width: 140px;
    max-height: 340px;
    margin: auto auto 0 0;
    transition-property: box-shadow, height;
    transition-duration: 0.5s, 0.3s;
    transition-timing-function: ease-out ease-out;
}

img:hover {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.7);
}

.tile-container {
    cursor: pointer;
}
</style>