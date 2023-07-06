<template>
  <div class="custom-card">
    <div class="content">
      {{ `${token_meta.entity.name} | ${token_meta.entity.artist}`}}
    </div>
    <img :src="thumbnail_url" />


    <!-- <div>{{ `${props.token_meta.entity.name} - ${props.token_meta.entity.artist}` }}</div> -->
  </div>
</template>
  
<script setup lang="ts">
import useThumbnail from '@/composables/thumbnail-image';
import type { FirestoreDocument, TokenMeta } from '@/types/types';
import { toRef } from 'vue';

interface ArtworkTileProps {
  token_meta: FirestoreDocument<TokenMeta>;
}
const props = defineProps<ArtworkTileProps>();
const thumbnail_url = useThumbnail(toRef(props, "token_meta"));
</script>
  
<style scoped>
.custom-card {
  border-radius: 18px;
  overflow: hidden;
  width: 100%;
  background: #F5F5F5;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.content {
  position:absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  padding: 6px;
  z-index: 10;
  background-color: white;
  opacity: 78%;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  line-height: 0;
  display: block;
}
</style>