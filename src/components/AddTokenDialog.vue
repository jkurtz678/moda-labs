
<template>
  <div class="dialog-container">
    <el-dialog class="box-dialog" center v-model="show_dialog" title="Add tokens to plaque" close-on-click-modal="false"
      :fullscreen="screen_type == 'xs'" custom-class="add-dialog">
      <el-card class="box-card" shadow="never">
        <div v-if="sort_token_metas.length == 0">No tokens found</div>
        <AddTokenItem :plaque_id="plaque_id" :token="i" v-for="i in sort_token_metas"
          @update_token_list="update_token_list" :submit_new_token="submit_new_token" :clear="ref_new_token_meta_id"></AddTokenItem>
        <hr class="hr" />
      </el-card>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clearList">Clear</el-button>
          <el-button type="info" @click="updateList">Done</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { getTokenMetas } from "@/api/token-meta";
import { updatePlaque } from "@/api/plaque"
import { usePlaqueStore } from "@/stores/plaque"
import AddTokenItem from './AddTokenItem.vue';
import { ElLoading, ElMessage } from 'element-plus'
import type { FirestoreDocument, TokenMeta, Plaque } from "@/types/types";
import useBreakpoints from "@/composables/breakpoints"
import { useTokenMetaStore } from "@/stores/token-meta";

interface AddTokenDialogProps {
  show_add_token_dialog: boolean;
  plaque_id: string;
  submit_new_token: boolean;
  clear:string[]
}

const props = defineProps<AddTokenDialogProps>();
const emit = defineEmits(['update:show_add_token_dialog',])
const { width, screen_type } = useBreakpoints();
const plaque_store = usePlaqueStore();
const token_meta_store = useTokenMetaStore();
const show_dialog = computed({
  get() {
    return props.show_add_token_dialog
  },
  set(value) {
    emit('update:show_add_token_dialog', value)
  }
})
const submit_new_token = ref(false)
const token_metas = computed(() => {
  return token_meta_store.archive_token_meta_list;
})

const sort_token_metas = computed(() => {
  console.log(token_metas)
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
const plaque = computed((): FirestoreDocument<Plaque> => {
  return plaque_store.plaque_map[props.plaque_id];
})
const new_token_meta_id: string[] = JSON.parse(JSON.stringify(plaque.value.entity.token_meta_id_list))
const ref_new_token_meta_id = ref(new_token_meta_id)
const update_token_list = (new_id: string) => {
  if (ref_new_token_meta_id.value.some(id => id === new_id)) {
    ref_new_token_meta_id.value = ref_new_token_meta_id.value.filter(id => id != new_id);
  } else {
    ref_new_token_meta_id.value.push(new_id);
  }
}
const updateList = async () => {
  await updatePlaque(props.plaque_id, { token_meta_id_list: ref_new_token_meta_id.value });
  submit_new_token.value = true
  show_dialog.value = false
}
const clearList = () => {
  ref_new_token_meta_id.value = []
}

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