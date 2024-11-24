<template>
    <h1 style="font-weight: bold;">{{ token_meta?.entity?.name }}</h1>
    <el-button v-if="token_meta.entity.artist_social_link" link size="large" style="font-weight: bold; display:block; font-size: 1.1em"
        type="primary" @click="openArtistSocial">
        {{ token_meta?.entity?.artist }}
      
    </el-button>
    <h3 v-else style="font-weight: bold;">{{ token_meta?.entity?.artist }}</h3>
    <!-- <el-link type="primary" style="margin: 12px 0px;" target="_blank"
        :href="token_meta?.entity?.public_link">View</el-link> -->
    <img :src="thumbnail_url" style="max-width: 100%; max-height: 250px; padding: 8px 0px;" />
    <template v-if="route.name?.toString() != 'bid'">
        <div style="display: flex; align-items: center;">
            <h2 v-if="token_meta.entity.permission_to_sell" style="font-weight: bold;">{{ price }}</h2>
            <!-- <el-button v-if="token_meta?.entity.permission_to_sell" color="#000000" size="small"
                    style="margin-left: 12px; font-size: 14px;" round @click="router.push({ name: 'bid', params: {token_meta_id: route.params.token_meta_id  }})">Place A Bid</el-button> -->
        </div>
        <TruncatedDescription :description="token_meta?.entity?.description"></TruncatedDescription>
    </template>
</template>


<script setup lang="ts">
import { FirestoreDocument, PriceUnit, TokenMeta } from '@/types/types';
import TruncatedDescription from '@/components/TruncatedDescription.vue';
import { useTileAnimation } from '@/composables/thumbnail-image';
import { computed, toRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

interface ArtPreviewHeaderProps {
    token_meta: FirestoreDocument<TokenMeta>;

}
const props = defineProps<ArtPreviewHeaderProps>();
const thumbnail_url = useTileAnimation(toRef(props, "token_meta"));

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

const openArtistSocial = () => {
    window.open(props.token_meta?.entity?.artist_social_link, "_blank");
}
</script>