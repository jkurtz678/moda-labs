<template>
  <div class="card-flex-container">
    <div>
      <el-collapse-transition>
        <div v-if="!expanded" style="display: flex;">
          <div style="display: flex; align-items: center; margin: 5px 25px 5px 5px;">
            <el-image :src="thumbnail_url" style="width:50px; height: 50px;" fit="contain" />
          </div>
          <div style="display: flex; flex-direction: column; justify-content: center;">
            <div class="bold">{{ props.token_meta?.entity?.name }}</div>
            <div class="bold">{{ props.token_meta?.entity?.artist }}</div>
          </div>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <template v-if="expanded">
          <div style="display: flex; align-items: top; text-align:left;">
            <div class="card-flex-left">
              <div class="flex-column">
                <p class="card-title">Title</p>
                <div class="bold bigger-font">{{ props.token_meta.entity.name }}</div>
                <img style="width:150px" :src="thumbnail_url" />
              </div>
            </div>
            <div class="card-flex-right">
              <p class="card-title">Artist name</p>
              <div class="bold bigger-font description">{{ props.token_meta.entity.artist }}</div>
              <div>{{ token_description }}
              </div>
              <div>
                <a v-if="props.token_meta.entity.description && props.token_meta.entity.description.length > 200"
                  @click="show_full_description = !show_full_description" class="link">
                  <span v-if="show_full_description">Less</span>
                  <span v-else>More</span>
                </a>
              </div>
              <div>
                <a v-if="token_meta.public_link" :href="token_meta.public_link" target="_blank">Qr-code link</a>
              </div>
            </div>
          </div>
        </template>
      </el-collapse-transition>
    </div>
    <div style="flex: 1; text-align:right; padding-right:1em; white-space: nowrap;">
      <el-button icon="Edit" text circle
        @click="router.push({ name: 'edit-token', params: { 'token_meta_id': props.token_meta.id } })"></el-button>
      <el-button :icon="expanded ? 'ArrowDownBold' : 'ArrowRightBold'" @click="expanded = !expanded" text circle>
      </el-button>
      <div style="opacity: 0.5;">{{ platform }}</div>
    </div>
  </div>

  <hr />
</template>


<script setup lang="ts">

import { ref, reactive, computed, toRef } from "vue";
import type { FirestoreDocument, TokenMeta } from "../types/types";
import { getPlatformDisplay } from "../types/types";
import { useRouter } from 'vue-router';
import useThumbnail from "@/composables/thumbnail-image";

const router = useRouter();

interface PlaqueTokenItem {
  token_meta: FirestoreDocument<TokenMeta>;
}
const props = defineProps<PlaqueTokenItem>();
const expanded = ref(false);
const show_full_description = ref(false);

// use toRef to make token_meta param stay reactive
const thumbnail_url = useThumbnail(toRef(props, "token_meta"));

const token_description = computed(() => {
  if (!props.token_meta.entity.description) {
    return "No artwork description";
  }

  if (show_full_description.value || props.token_meta.entity.description.length < 200) {
    return props.token_meta.entity.description;
  }
  return `${props.token_meta.entity.description.substring(0, 200)}...`;
});

const platform = computed(() => {
  return getPlatformDisplay(props.token_meta.entity.platform)
})

const token_meta = computed(() => {
  return props.token_meta.entity
})

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
  align-items: top;
  max-width: 658px;
}

.image {
  width: 100%;
  display: block;
  padding-right: 1em;
}

.bold {
  font-weight: 700;
}

.card-flex-left {
  width: 45%;
  margin: 5px;
  /* height: 100vh; */
  padding: 5px;
}

.card-flex-right {
  width: 55%;
  /* height: 50vh; */
  margin: 5px;
  padding: 5px;
}

.flex-column {
  flex-direction: column;
}
</style>