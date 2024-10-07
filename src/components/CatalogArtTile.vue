<template>
    <el-card style="margin: 12px; width: 340px;"
        @click="router.push({ name: 'qr-landing', params: { token_meta_id: props.token_meta.id } })">
        <div style="display: flex; flex-direction: column">
            <div style="display: flex; justify-content: center; background-color: #eeeeee; flex-grow: 1;">
                <img :src="thumbnail_url" style="max-width: 100%; min-width: 140px; max-height: 240px; object-fit: contain;" />
            </div>
            <h2 style="font-weight: bold">{{ props.token_meta.entity.name }}</h2>
            <div>{{ priceDisplay(props.token_meta) }}</div>
        </div>
    </el-card>
</template>
<script lang="ts" setup>
import { useMediumThumbnail } from '@/composables/thumbnail-image';
import { FirestoreDocument, priceDisplay, TokenMeta } from '@/types/types';
import { toRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
interface ArtPreviewHeaderProps {
    token_meta: FirestoreDocument<TokenMeta>;

}
const props = defineProps<ArtPreviewHeaderProps>();
const thumbnail_url = useMediumThumbnail(toRef(props, "token_meta"));

</script>