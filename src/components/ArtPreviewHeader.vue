<template>
    <h1 style="font-weight: bold;">{{ token_meta?.entity?.name }}</h1>
    <h3 style="font-weight: bold;">{{ token_meta?.entity?.artist }}</h3>
    <!-- <el-link type="primary" style="margin: 12px 0px;" target="_blank"
        :href="token_meta?.entity?.public_link">View</el-link> -->
    <img :src="thumbnail_url" style="max-width: 100%; max-height: 200px; padding: 10px 0px;"/>
    <template v-if="route.name?.toString() != 'bid'">
        <h2 v-if="token_meta.entity.permission_to_sell" style="font-weight: bold;">{{price}}</h2>
        <TruncatedDescription :description="token_meta?.entity?.description"></TruncatedDescription>
    </template>
</template>


<script setup lang="ts">
import { FirestoreDocument, PriceUnit, TokenMeta } from '@/types/types';
import TruncatedDescription from '@/components/TruncatedDescription.vue';
import { useMediumThumbnail } from '@/composables/thumbnail-image';
import { computed, toRef } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

interface ArtPreviewHeaderProps {
    token_meta: FirestoreDocument<TokenMeta>;
    
}
const props = defineProps<ArtPreviewHeaderProps>();
const thumbnail_url = useMediumThumbnail(toRef(props, "token_meta"));

const price = computed(() => {
    switch (props.token_meta?.entity?.price_unit) {
        case PriceUnit.USD:
            return `$${props.token_meta?.entity?.price}`
        case PriceUnit.ETH:
            return `${props.token_meta?.entity?.price} ETH`
        default:
            return ""
    }
})
</script>