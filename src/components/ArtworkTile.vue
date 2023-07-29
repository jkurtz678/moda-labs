<template>
  <div ref="tile_container" class="custom-card" @click="() => { show_detail = !show_detail; animateTileHeight(show_detail); }" :style="show_detail ? '' : `height: ${tile_height}px !important`">
    <img :class="show_detail ? 'absolute' : ''" :src="thumbnail_url"  />
    <div :class="show_detail ? 'show-blur' : 'hide-blur'" class="absolute overlay transition" ></div>
    <div class="transition absolute" :class="!show_detail ? 'show-blur' : 'hide-blur'">
      <div class="header">
        {{ `${token_meta.entity.name} | ${token_meta.entity.artist}` }}
      </div>
      <div class="platform">{{ platform }}</div>
    </div>
    <div ref="detail_container" class='detail-container transition'
      :class="show_detail ? 'show-blur' : 'hide-blur absolute-no-b'">
      <div style="font-size: 1.6em; font-weight: bold;">{{ token_meta.entity.name }}</div>
      <div v-if="token_meta.entity.artist_social_link">
        <el-button link style="font-weight: bold; display: block;" @click.stop="openArtistSocial">{{
          token_meta.entity.artist }}</el-button>
      </div>
      <div v-else style="font-weight: bold;">{{ token_meta.entity.artist }}</div>
      <template v-if="show_detail">
        <el-tooltip class="box-item" effect="dark" content="Edit art data" placement="top">
          <el-button icon="Edit" text circle
            @click.stop="router.push({ name: 'edit-artwork', params: { 'token_meta_id': props.token_meta.id } })">
          </el-button>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="Download art" placement="top">
          <el-button icon="Download" text circle @click.stop="openArt"></el-button>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="Preview plaque" placement="top">
          <el-button icon="Tickets" text circle @click.stop="previewPlaque"></el-button>
        </el-tooltip>
        <el-tooltip v-if="token_meta.entity.public_link" class="box-item" effect="dark" content="QR Code Link"
          placement="top">
          <el-button icon="Link" text circle @click.stop="qrCodeLink"></el-button>
        </el-tooltip> 
      </template>
      <div v-else style="height: 32px;"></div>
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
  column_width: number;
}
const props = defineProps<ArtworkTileProps>();
const thumbnail_url = useThumbnail(toRef(props, "token_meta"));
const show_detail = ref(false);
const starting_height = ref<number>(0);
const tile_container = ref();
const detail_container = ref();

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

const tile_height = computed(() => {

  if (!props.token_meta.entity.aspect_ratio) {
    return props.column_width 
  }

  return props.column_width / props.token_meta.entity.aspect_ratio
})


const previewPlaque = () => {
  const link = router.resolve({ name: 'preview-plaque', params: { token_meta_id: props.token_meta.id } });
  window.open(link.href);
}

const qrCodeLink = () => {
  window.open(props.token_meta.entity.public_link, '_blank');
}

const openArtistSocial = () => {
  window.open(props.token_meta.entity.artist_social_link, '_blank');
}

function animateTileHeight(detail: boolean) {


  if (!tile_container.value) {
    console.log("animateDivHeight - error finding tile container")
    return
  }

  if (detail && starting_height.value == 0) {
    starting_height.value = tile_container.value.offsetHeight
  }

  if (!detail_container.value) {
    console.log("animateDivHeight - error finding detail container")
    return
  }


  let targetHeight: number;
  if (detail && detail_container.value.offsetHeight > starting_height.value) {
    targetHeight = detail_container.value.offsetHeight; // The final height you want to animate to (in pixels)
  } else {
    targetHeight = starting_height.value
  }
  const duration = 300; // The duration of the animation in milliseconds
  const frameRate = 10; // The interval between each animation frame in milliseconds

  const startHeight = tile_container.value.offsetHeight;
  const distance = Math.ceil(targetHeight - startHeight);
  const increments = Math.ceil(duration / frameRate);
  const incrementSize = distance / increments;

  let currentIncrement = 0;

  const interval = setInterval(() => {
    if (currentIncrement >= increments) {
      tile_container.value.style.height = targetHeight + "px"
      clearInterval(interval);
      return
    }

    currentIncrement++;
    const newHeight = startHeight + incrementSize * currentIncrement;
    tile_container.value.style.height = newHeight + "px";
  }, frameRate);
}

</script>
  
<style scoped>
.custom-card {
  border-radius: 18px;
  overflow: hidden;
  width: 100%;
  background: #F5F5F5;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  transition-property: box-shadow, height;
  transition-duration: 0.5s, 0.3s;
  transition-timing-function: ease-out ease-out;
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
  transition: opacity 0.5s;
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
  transition: opacity 0.5s;
  font-size: .7em;
}

.custom-card:hover .platform {
  opacity: 88%;
}


.custom-card:hover .header {
  opacity: 88%;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  line-height: 0;
  display: block;
}

.show-blur {
  opacity: 0.88 !important;
}

.hide-blur {
  opacity: 0 !important;
}

.transition {
  transition: opacity 0.5s !important;
}

.overlay {
  background-color: white;
  opacity: 0;
}


.detail-container {
  background-color: transparent;
  opacity: 0;
  padding: 1em;
}

.absolute {
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
}

.absolute-no-b {
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
}

:deep(.el-button>span) {
  font-weight: bold;
}
</style>