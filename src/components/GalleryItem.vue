<template>
  <div class="flex-container">
    <div style="flex-grow: 1; text-align: left;">
      <div class="bold" style="font-size: var(--el-font-size-large)">{{ props.gallery.entity.name }}</div>
      <div>{{ user_count_str }}</div>
    </div>
    <div style="min-width: 100px; margin-left: 20px;">
      <div>{{ plaque_count_str }}</div>
      <div>{{ artwork_count_str }}</div>
    </div>
    <div style="display: flex">
      <el-button icon="Edit" text circle
        @click="router.push({ name: 'edit-gallery', params: { 'gallery_id': props.gallery.id } })">
      </el-button>
    </div>
  </div>
  <hr />
</template>
<script setup lang="ts">
import router from '@/router';
import type { FirestoreDocument, Gallery } from '@/types/types';
import { computed } from 'vue';

interface GalleryItemProps {
  gallery: FirestoreDocument<Gallery>;
}
const props = defineProps<GalleryItemProps>();
const user_count_str = computed(() => {
  const user_count = props.gallery.entity.user_id_list.length;
  return `${user_count} user${user_count == 1 ? '' : 's'}`;

})
const plaque_count_str = computed(() => {
  const plaque_count = props.gallery.entity.plaque_id_list.length;
  return `${plaque_count} plaque${plaque_count == 1 ? '' : 's'}`;
})
const artwork_count_str = computed(() => {
  const artwork_count = props.gallery.entity.token_meta_id_list.length;
  return `${artwork_count} artwork${artwork_count == 1 ? '' : 's'}`
})

</script>

<style scoped>
.flex-container {
  display: flex;
  align-items: center;
}

.bold {
  font-weight: 700;
}
</style>
