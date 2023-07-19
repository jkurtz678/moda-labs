<template>
  <div class="custom-card" @click="show_detail = !show_detail">
    <img :class="show_detail ? 'absolute' : ''" :src="thumbnail_url" />

    <div class="transition absolute" :class="!show_detail ? 'show-blur' : 'hide-blur'">
      <div class="header">
        {{ `${token_meta.entity.name} | ${token_meta.entity.artist}` }}
      </div>
      <div class="platform">{{ platform }}</div>
    </div>

    <div class='detail-container transition' :class="show_detail ? 'show-blur' : 'hide-blur absolute'">
      <div style="font-size: 1.6em; font-weight: bold;">{{ token_meta.entity.name }}</div>
      <div style="font-weight: bold;">{{ token_meta.entity.artist }}</div>
      <template v-if="show_detail">
      <el-tooltip class="box-item" effect="dark" content="Download art" placement="top">
        <el-button icon="Download" text circle @click="openArt"></el-button>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="Preview plaque" placement="top">
        <el-button icon="Tickets" text circle @click="previewPlaque"></el-button>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="Edit art data" placement="top">
        <el-button icon="Edit" text circle
          @click="router.push({ name: 'edit-artwork', params: { 'token_meta_id': props.token_meta.id } })">
        </el-button>
      </el-tooltip>
      </template>
      <div style="font-size: 0.9em; line-height: 1.3em">{{ token_meta.entity.description }}</div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import useThumbnail from '@/composables/thumbnail-image';
import { getPlatformDisplay, type FirestoreDocument, type TokenMeta, getSourceFile } from '@/types/types';
import { showError } from '@/util/util';
import { ref } from 'vue';
import { computed } from 'vue';
import { toRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
interface ArtworkTileProps {
  token_meta: FirestoreDocument<TokenMeta>;
}
const props = defineProps<ArtworkTileProps>();
const thumbnail_url = useThumbnail(toRef(props, "token_meta"));
const show_detail = ref(false);

const platform = computed(() => {
  return getPlatformDisplay(props.token_meta.entity.platform)
})

const openArt = async () => {
  const url = await getSourceFile(props.token_meta);

  if (!url) {
    showError("Error getting source file")
    return
  }

  window.open(url, '_blank');
}


const previewPlaque = () => {
  const link = router.resolve({ name: 'preview-plaque', params: { token_meta_id: props.token_meta.id } });
  window.open(link.href);
}


</script>
  
<style scoped>
.custom-card {
  border-radius: 18px;
  overflow: hidden;
  width: 100%;
  background: #F5F5F5;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.6s;
}

.custom-card:hover {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.5);
}

.header {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  padding: 5px;
  z-index: 10;
  background-color: white;
  opacity: 0;
  transition: opacity 0.6s;
}

.platform {
  position: absolute;
  border-radius: 18px;
  bottom: 10px;
  right: 10px;
  padding: 4px;
  opacity: 0;
  z-index: 10;
  background-color: white;
  transition: opacity 0.6s;
  font-size: .7em;
}

.custom-card:hover .platform {
  opacity: 85%;
}


.custom-card:hover .header {
  opacity: 85%;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  line-height: 0;
  display: block;
}

.show-blur {
  opacity: 0.85 !important;
}

.hide-blur {
  opacity: 0 !important;
}

.transition {
  transition: opacity 0.5s !important;
}


.detail-container {
  background-color: white;
  opacity: 0;
  padding: 1em;
  min-height: 279px;
}

.absolute {
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
}
</style>