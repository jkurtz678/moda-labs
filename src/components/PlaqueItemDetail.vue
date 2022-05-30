<template>
  <hr class="hr" />
  <div class="card-flex-container">
    <div style="flex: 1">
      <!-- <img
        :src="src"
        class="image"
      /> -->
      <img
        :src="props.detail.src"
        class="image"
      />
    </div>
    <div style="flex: 3 1 0%">
      <p class="bold">{{ props.detail.title }}</p>
      <p class="bold">{{ props.detail.author }}</p>
    </div>
    <div style="flex: 1;text-align:right; padding-right:1em">
      <el-icon>
        <ArrowRightBold />
      </el-icon>
      <!-- <el-icon><ArrowDownBold /></el-icon> -->
      <p>Archive</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed } from "vue";
import type { FirestoreDocument, Painting } from "../types/types";
interface PlaqueItemDetailProps {
  detail: FirestoreDocument<Painting>;
}
const props = defineProps<PlaqueItemDetailProps>();
</script>

<style scoped>
.card-flex-container {
  display: flex;
  align-items: center;
}
.image {
  width: 100%;
  display: block;
  padding-right: 1em;
}
.bold{
    font-weight:700;
}
.hr{
    border: 0.5px solid lightgray;
}
</style>