<template>
  <div ref="tile_container" class="custom-card" @click="toggleTileDetail" :style="`height: ${tile_height}px !important`">
    <img :class="show_detail ? 'absolute' : ''" :src="thumbnail_url" />
    <div :class="show_detail ? 'show-blur' : 'hide-blur'" class="absolute overlay transition"></div>
    <div class="transition absolute" :class="!show_detail ? 'show-blur' : 'hide-blur'">
      <div class="header">
        {{ `${token_meta.entity.name} | ${token_meta.entity.artist}` }}
      </div>
      <div class="platform">{{ platform }}</div>
    </div>
    <div ref="detail_container" class='detail-container transition' :class="show_detail ? 'show-blur' : 'hide-blur'">
      <div style="font-size: 1.6em; font-weight: bold;">{{ token_meta.entity.name }}</div>
      <div v-if="token_meta.entity.artist_social_link"
        :style="screen_type == 'xs' ? 'display: flex; justify-content: center;' : ''">
        <el-button link style="font-weight: bold; display: block;" :disabled="!show_detail"
          @click.stop="openArtistSocial">{{
            token_meta.entity.artist }}</el-button>
      </div>
      <div v-else style="font-weight: bold;">{{ token_meta.entity.artist }}</div>
      <template v-if="show_detail">
        <div style="display: flex; align-items: center;">
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
          <el-tooltip v-if="account_store.is_user_admin" class="box-item" effect="dark" content="Delete Artwork"
            placement="top">
            <el-button icon="Delete" text circle @click.stop="deleteConfirm"></el-button>
          </el-tooltip>
          <span v-if="media_size_display" style="font-size: 0.8em; padding-left: 1em; color: #606266">{{ media_size_display }}</span>
        </div>
      </template>
      <div v-else style="height: 32px;"></div>
      <div style="font-size: 0.9em; line-height: 1.3em">{{ token_meta.entity.description }}</div>
      <div style="margin: 10px 0px">
        <el-button v-for="g in gallery_store.token_id_to_gallery_map.get(props.token_meta.id)" size="small" round plain
          type="primary" style="margin: 3px 10px 3px 0px;">{{ g.entity.name }}</el-button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { useMediumThumbnail } from "@/composables/thumbnail-image";
import { getPlatformDisplay, type FirestoreDocument, type TokenMeta, getSourceFile } from '@/types/types';
import { showError } from '@/util/util';
import { ref } from 'vue';
import { computed } from 'vue';
import { toRef } from 'vue';
import { useRouter } from 'vue-router';
import { useAccountStore } from "@/stores/account";
import { deleteTokenMeta } from "@/api/token-meta";
import { ElMessage, ElMessageBox } from 'element-plus';
import { useGalleryStore } from "@/stores/gallery";
import useBreakpoints from "@/composables/breakpoints"

const router = useRouter();
interface ArtworkTileProps {
  token_meta: FirestoreDocument<TokenMeta>;
  column_width: number;
}
const props = defineProps<ArtworkTileProps>();
const thumbnail_url = useMediumThumbnail(toRef(props, "token_meta"));
const show_detail = ref(false);
const starting_height = ref<number>(0);
const tile_container = ref();
const detail_container = ref();
const account_store = useAccountStore();
const gallery_store = useGalleryStore();
const { screen_type } = useBreakpoints();

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


// media_size_display is a string that displays the media size in a human readable format, using metric definition of KB, MB, GB (1000, 1000^2, 1000^3)
const media_size_display = computed(() => {
  const media_size = props.token_meta?.entity?.media_size;
  if (!media_size) {
    return "";
  }

  const kb = 1000;
  const mb = kb * 1000;
  const gb = mb * 1000;

  if (media_size < kb) {
    return `${media_size} B`;
  } else if (media_size < mb) {
    return `${(media_size / kb).toFixed(2)} KB`;
  } else if (media_size < gb) {
    return `${(media_size / mb).toFixed(2)} MB`;
  } else {
    return `${(media_size / gb).toFixed(2)} GB`;
  }
});


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

function toggleTileDetail() {
  if (!tile_container.value) {
    console.log("animateDivHeight - error finding tile container")
    return
  }

  if (!show_detail.value && starting_height.value == 0) {
    starting_height.value = tile_container.value.offsetHeight
  }

  show_detail.value = !show_detail.value;

  if (!detail_container.value) {
    console.log("animateDivHeight - error finding detail container")
    return
  }

  let targetHeight: number;
  if (show_detail.value && detail_container.value.offsetHeight > starting_height.value) {
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

const deleteConfirm = () => {
  ElMessageBox.prompt(`Are you sure you want to delete ${props.token_meta.entity.name}? Please type the word 'DELETE' to proceed.`, 'Delete Artwork', {
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    inputPattern: /^DELETE$/i,
    inputErrorMessage: 'Please enter the word DELETE to confirm.'
  })
    .then(({ value }) => {
      if (value) {
        return deleteTokenMeta(props.token_meta.id)
      }
    })
    .then(() => {
      ElMessage({ message: 'Artwork deleted', type: 'success', showClose: true, duration: 12000 });
    })
    .catch((err) => {
      ElMessage({ message: `Error deleting artwork - ${err}`, type: 'error', showClose: true, duration: 12000 });
    });
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

.el-button+.el-button {
    margin-left: 8px;
}
</style>