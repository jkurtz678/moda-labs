<template>
  <div class="card-flex-container">
    <div style="display: flex; align-items: center; margin: 5px 25px 5px 0px;">
      <el-image :src="getTokenMetaThumbnailImageURL(props.token_meta)" style="width:50px; height: 50px;"
        fit="contain" />
    </div>
    <div style="flex: 3 1 0%; text-align: left;">
      <p class="bold">{{ props.token_meta?.entity?.name }}</p>
      <p class="bold">{{ props.token_meta?.entity?.artist }}</p>
    </div>
    <div style="flex: 1;text-align:right; padding-right:1em">
      <el-button :icon="isExpand.expanded ? 'ArrowDownBold' : 'ArrowRightBold'"
        @click="isExpand.expanded = !isExpand.expanded" text circle>
      </el-button>
      <div style="opacity: 0.5;">{{ platform }}</div>
    </div>
  </div>
  <el-collapse-transition>
    <div class="card-body" v-if="isExpand.expanded">
      <div style="display: flex; align-items: top; text-align:left;">
        <div class="card-flex-left">
          <div class="flex-column">
            <p class="card-title">Title</p>
            <div class="bold bigger-font">{{ props.token_meta.entity.name }}</div>
            <img style="width:150px" :src="getTokenMetaThumbnailImageURL(props.token_meta)" />
          </div>
        </div>
        <div class="card-flex-right">
          <p class="card-title">Artist name</p>
          <div class="bold bigger-font description" >{{ props.token_meta.entity.artist }}</div>
          <div :class="show_all ? 'description-all' : 'description-less'">{{ props.token_meta.entity.description }}
          </div>
          <a v-if="props.token_meta.entity.description != ''" @click="show_all = !show_all" class="link">
            <span v-if="show_all">Less</span>
            <span v-else> More</span>
          </a>
        </div>
      </div>
    </div>
  </el-collapse-transition>
  <hr />
</template>


<script setup lang="ts">

import type { FirestoreDocument, TokenMeta } from "../types/types";
import { getPlatformDisplay } from "../types/types";
import { ref, reactive, computed } from "vue";
import { getTokenMetaThumbnailImageURL } from "@/types/types"

interface PlaqueTokenItem {
  token_meta: FirestoreDocument<TokenMeta>;
}
const props = defineProps<PlaqueTokenItem>();
const isExpand = reactive({ expanded: false });

const platform = computed(() => {
  return getPlatformDisplay(props.token_meta.entity.platform)
})

const show_all = ref(false);
</script>

<style>
.card-title {
  line-height: 0.5em;
}

.link:hover {
  color: hotpink;
  cursor: pointer;
}

.link {
  text-decoration: underline;
}

.link span {
  font-weight: bold;
}

.description-less {
  /* padding: 0 1em; */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  max-width: 400px;
}

.description-all {
  /* padding: 0 1em; */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  max-width: 400px;
}

.bigger-font {
  font-size: 1.2em;
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
  max-width: 600px;
}

.bold {
  font-weight: 700;
}

.card-flex-left {
  width: 40%;
  margin: 5px;
  /* height: 100vh; */
  padding: 5px;
}

.card-flex-right {
  width: 60%;
  /* height: 50vh; */
  margin: 5px;
  padding: 5px;
}

.flex-column {
  flex-direction: column;
}
</style>