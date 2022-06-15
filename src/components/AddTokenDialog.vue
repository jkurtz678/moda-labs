
<template>
  <div class="dialog-container">
    <el-dialog center v-model="show_dialog" title="Add tokens to plaque" :close-on-click-modal="false"
      :fullscreen="screen_type == 'xs'">
      <el-card class="box-card" shadow="never">
        <div v-if="sort_token_metas.length == 0">No tokens found</div>
        <AddTokenItem v-for="token in sort_token_metas" :token="token" :in_list="token_in_list_map[token.id]"
          @update_token_list="updateLocalTokenList"></AddTokenItem>
        <hr class="hr" />
      </el-card>
      <template #footer>
        <span class="dialog-footer">
          <div>{{ `Tokens in playlist: ${new_token_meta_id_list.length}` }}</div>
          <div style="flex-grow: 1"></div>
          <el-button @click="clearList">Clear</el-button>
          <el-button type="info" @click="updateList" :loading="save_loading">Save</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { updatePlaque } from "@/api/plaque"
import { usePlaqueStore } from "@/stores/plaque"
import AddTokenItem from './AddTokenItem.vue';
import { showError } from "@/util/util"
import type { FirestoreDocument, TokenMeta, Plaque } from "@/types/types";
import useBreakpoints from "@/composables/breakpoints"
import { useTokenMetaStore } from "@/stores/token-meta";

interface AddTokenDialogProps {
  show_add_token_dialog: boolean;
  plaque_id: string;
}

const props = defineProps<AddTokenDialogProps>();
const new_token_meta_id_list = ref<string[]>([]);
const save_loading = ref(false);


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
watch(show_dialog, (v) => {
  if (v) {
    new_token_meta_id_list.value = JSON.parse(JSON.stringify(plaque.value.entity.token_meta_id_list));
  }
})

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

interface InListMap {
  [id: string]: boolean;
}
const token_in_list_map = computed((): InListMap => {
  const in_list_map: InListMap = {}
  new_token_meta_id_list.value.forEach((t) => {
    in_list_map[t] = true;
  })
  return in_list_map;
});

const updateLocalTokenList = (new_id: string) => {
  if (new_token_meta_id_list.value.some(id => id === new_id)) {
    new_token_meta_id_list.value = new_token_meta_id_list.value.filter(id => id != new_id);
  } else {
    new_token_meta_id_list.value.push(new_id);
  }
}
const updateList = async () => {
  save_loading.value = true;
  await updatePlaque(props.plaque_id, { token_meta_id_list: new_token_meta_id_list.value }).catch(err => {
    showError(`Error updating plaque tokens - ${err}`)
  })
  save_loading.value = false;
  show_dialog.value = false
}
const clearList = () => {
  new_token_meta_id_list.value = []
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

.dialog-footer {
  display: flex;
  align-items: center;
  padding: 0px 5px 0px 5px;
}
</style> 