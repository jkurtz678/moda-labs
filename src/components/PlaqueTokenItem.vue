<template>
  <hr />
  <div class="card-flex-container">
    <div style="display: flex; align-items: center; margin: 5px 25px 5px 0px;">
      <el-image :src="thumbnail_image" style="width:50px; height: 50px;" fit="contain" />
    </div>
    <div style="flex: 3 1 0%; text-align: left;">
      <p class="bold">{{ props.token_meta?.entity?.name }}</p>
      <p class="bold">{{ props.token_meta?.entity?.artist }}</p>
    </div>
    <div style="flex: 1;text-align:right; padding-right:1em">
      <el-icon @click="isExpand.expanded = !isExpand.expanded">
        <ArrowRightBold v-if="!isExpand.expanded"></ArrowRightBold>
        <ArrowDownBold v-if="isExpand.expanded"></ArrowDownBold>
      </el-icon>
      <div style="opacity: 0.5;">{{ platform }}</div>
    </div>
  </div>
  <div class="card-body" v-if="isExpand.expanded">
    <div class="card-flex-container">
      <div style="flex:1; width:30%">
        <div>{{ props.token_meta.entity.name }}</div>
        <img style="width:121px" :src="getImageUrl('logo.png')" />
      </div>
      <div style="flex: 3 1 0%; width:70%">
        <div class="bold bigger-font description">{{ props.token_meta.entity.artist }}</div>
        <div class="description">{{ props.token_meta.entity.description }}</div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import type { FirestoreDocument, TokenMeta } from "../types/types";
import { ref, reactive, computed } from "vue";

interface PlaqueTokenItem {
  token_meta: FirestoreDocument<TokenMeta>;
}
const props = defineProps<PlaqueTokenItem>();
const isExpand = reactive({ expanded: false });

const platform = computed(() => {
  console.log("PROPS", props.token_meta)
  const platform = props.token_meta.entity.platform || "archive";
  return platform.charAt(0).toUpperCase() + platform.slice(1);
})

const thumbnail_image = computed(() => {
  if (props.token_meta.entity.thumbnail_url) {
    return props.token_meta.entity.thumbnail_url
  }
  return getImageUrl('logo.png')
})

const getImageUrl = (filename: string) => {
  return new URL(`../assets/${filename}`, import.meta.url).href
}
</script>

<style>
.description {
  padding: 0 1em;
}

.bigger-font {
  font-size: 1.5em;
}

.card-flex-container {
  display: flex;
  align-items: center;
}

.image {
  width: 100%;
  display: block;
  padding-right: 1em;
}

.card-body {
  max-width: 404px;
}

.bold {
  font-weight: 700;
}


</style>