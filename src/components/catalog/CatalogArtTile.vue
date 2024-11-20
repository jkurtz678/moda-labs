<template>
    <div class="tile-container" style="margin: 12px; width: 340px;"
        @click="router.push({ name: 'actions', params: { token_meta_id: props.token_meta.id } })">
        <div style="display: flex; flex-direction: column; height: 100%;">
            <div style="display: flex; border-radius: 18px; flex-grow: 1;">
                <img :src="thumbnail_url" />
            </div>
            <h2 style="font-weight: bold; overflow-wrap: break-word;">{{ props.token_meta.entity.name }}</h2>
            <div>{{ priceDisplay(props.token_meta) }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useTileAnimation } from '@/composables/thumbnail-image';
import { FirestoreDocument, priceDisplay, TokenMeta } from '@/types/types';
import { toRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
interface ArtPreviewHeaderProps {
    token_meta: FirestoreDocument<TokenMeta>;

}
const props = defineProps<ArtPreviewHeaderProps>();
const thumbnail_url = useTileAnimation(toRef(props, "token_meta"));

</script>

<style scoped>
:deep(.el-card__body) {
    height: 100%;
}

img {
    border-radius: 18px;
    max-width: 100%;
    min-width: 140px;
    max-height: 400px; 
    object-fit: contain;
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