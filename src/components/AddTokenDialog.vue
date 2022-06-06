
<template>
  <el-dialog class="box-dialog" center v-model="show_dialog" title="Add tokens" width="530px"
    close-on-click-modal="false" :fullscreen="screen_type == 'xs'">
    <el-card class="box-card" shadow="never">
      <AddTokenItem :plaque_id="plaque_id" :detail="i" v-for="i in token_metas"></AddTokenItem>
      <hr class="hr" />
    </el-card>
    <template #footer>
      <span class="dialog-footer">
        <el-button>Clear</el-button>
        <el-button type="info">Done</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { getTokenMetas } from "@/api/token-meta";
import AddTokenItem from './AddTokenItem.vue';
import { ElLoading, ElMessage } from 'element-plus'
import type { FirestoreDocument, TokenMeta } from "@/types/types";
import useBreakpoints from "@/composables/breakpoints"

interface PlaqueItemProps {
  show_add_token_dialog: boolean;
  plaque_id: string
}

const props = defineProps<PlaqueItemProps>();
const emit = defineEmits(['update:show_add_token_dialog'])
const token_metas = ref<FirestoreDocument<TokenMeta>[]>();
const loading = ref(false);
const {width, screen_type} = useBreakpoints();

const show_dialog = computed({
  get() {
    return props.show_add_token_dialog
  },
  set(value) {
    emit('update:show_add_token_dialog', value)
  }
})

watch(show_dialog, async (v) => {
  if (!v) {
    return
  }
  loading.value = true
  token_metas.value = await getTokenMetas()
  loading.value = false;
})

</script>