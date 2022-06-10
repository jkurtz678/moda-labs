<template>
  <hr class="hr" />
  <div class="card-flex-container">
    <div style="flex: 1">
      <img
        :src="getImageUrl('logo.png')"
        class="image"
        style="max-width: 70px;" 
      />
    </div>
    <div style="flex: 3 1 0%">
      <p class="bold">{{ props.token_meta?.entity?.name }}</p>
      <p class="bold">{{ props.token_meta?.entity?.artist }}</p>
    </div>
    <div style="flex: 1;text-align:right; padding-right:1em">
      <el-icon @click="isExpand.expanded = !isExpand.expanded">
        <ArrowRightBold v-if="!isExpand.expanded"></ArrowRightBold>
        <ArrowDownBold v-if="isExpand.expanded"></ArrowDownBold>
      </el-icon>
      <p @click="">Archive</p>  <!--TODO-->
    </div>
  </div>
  <div class="card-body" v-if="isExpand.expanded">
    <div class="card-flex-container" >
      <div style="flex:1; width:30%">
        <div >{{ props.token_meta.entity.name }}</div>
        <img
          style="width:121px"
          :src="getImageUrl('logo.png')"
        />
      </div>
      <div style="flex: 3 1 0%; width:70%">
        <div class="bold bigger-font description">{{ props.token_meta.entity.artist }}</div>
        <div class="description">{{ props.token_meta.entity.description }}</div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import type { FirestoreDocument,TokenMeta } from "../types/types";
import { ref,reactive } from "vue";

interface PlaqueTokenItem {
  token_meta: FirestoreDocument<TokenMeta>;
}
const props = defineProps<PlaqueTokenItem>();
const isExpand = reactive({expanded:false});

const getImageUrl = (filename: string) => {
    return new URL(`../assets/${filename}`, import.meta.url).href
}
</script>

<style>
.description{
padding: 0 1em;
}
.bigger-font{
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
.card-body{
      max-width: 404px;
}
.bold{
    font-weight:700;
}
.hr{
    border: 0.1px solid lightgray;
}

</style>