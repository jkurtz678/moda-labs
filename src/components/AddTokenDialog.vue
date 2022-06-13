
<template>
  <div class="dialog-container">
    <el-dialog class="box-dialog" center v-model="show_dialog" title="Add tokens to plaque" close-on-click-modal="false"
      :fullscreen="screen_type == 'xs'" custom-class="add-dialog">
      <el-card class="box-card" shadow="never">
        <div v-if="sort_token_metas.length == 0">No tokens found</div>
        <AddTokenItem :plaque_id="plaque_id" :token="i" v-for="i in sort_token_metas" :add_list="addList"></AddTokenItem>
        <hr class="hr" />
      </el-card>
      <template #footer>
        <span class="dialog-footer">
          <el-button>Clear</el-button>
          <el-button type="info" @click="addList= true">Done</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { getTokenMetas } from "@/api/token-meta";
import { usePlaqueStore } from "@/stores/plaque"
import AddTokenItem from './AddTokenItem.vue';
import { ElLoading, ElMessage } from 'element-plus'
import type { FirestoreDocument, TokenMeta, Plaque } from "@/types/types";
import useBreakpoints from "@/composables/breakpoints"
import { useTokenMetaStore } from "@/stores/token-meta";

interface AddTokenDialogProps {
  show_add_token_dialog: boolean;
  plaque_id: string;
  add_list :boolean;
}

const props = defineProps<AddTokenDialogProps>();
const emit = defineEmits(['update:show_add_token_dialog'])
const loading = ref(false);
const { width, screen_type } = useBreakpoints();
const plaque_store = usePlaqueStore();
const addList = ref(false);
const token_meta_store = useTokenMetaStore();
const show_dialog = computed({
  get() {
    return props.show_add_token_dialog
  },
  set(value) {
    emit('update:show_add_token_dialog', value)
  }
})

const token_metas = computed(() => {
  return token_meta_store.archive_token_meta_list;
})

const sort_token_metas = computed(() => {
  const sort_token_metas: FirestoreDocument<TokenMeta>[] = [];
  if (token_metas?.value) {
    for (let token of token_metas?.value) {
      if (plaque_store.meta_in_playlist(props.plaque_id, token.id)) {
        sort_token_metas.unshift(token)
      } else {
        sort_token_metas.push(token)
      }
    }
  }
  return sort_token_metas;
})

/* watch(show_dialog, async (v) => {
  if (!v) {
    return
  }
  loading.value = true
  token_metas.value = await getTokenMetas()
  loading.value = false;
}) */

</script>

<style scoped>
:deep .el-dialog.add-dialog {
  height: auto;
  max-height: 100vh;
  overflow-y: auto;
  margin: 4vh auto;
}

:deep .el-dialog__body {
  padding: 10px calc(var(--el-dialog-padding-primary) + 5px) 30px;
  position: relative;
  border-top: 1px solid #dcdfe6;
  max-height: 79vh;
  overflow-y: scroll;
}

.dialog-container {
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  width: 50%;
  height: 100%;
}
</style> 