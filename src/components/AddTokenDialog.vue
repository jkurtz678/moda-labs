
<template>
  <div class="dialog-container">
    <el-dialog center v-model="show_dialog" title="Add artwork to plaque" :close-on-click-modal="false"
      :fullscreen="screen_type == 'xs'" top="2vh" destroy-on-close>
      <TokenSelectList v-model:selected_token_meta_id_list="new_token_meta_id_list" :token_meta_list="token_meta_list" :plaque_id="plaque_id"></TokenSelectList> 
      <template #footer>
        <div class="dialog-footer">
          <div>{{ `Artwork in playlist: ${new_token_meta_id_list.length}` }}</div>
          <div style="flex-grow: 1"></div>
          <el-button @click="clearList">Clear</el-button>
          <el-button type="info" @click="handleSave" :loading="save_loading">Save</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { updatePlaque } from "@/api/plaque"
import { createTokenMeta } from "@/api/token-meta"
import { usePlaqueStore } from "@/stores/plaque"
import { useAccountStore } from "@/stores/account"
import { showError } from "@/util/util"
import { type FirestoreDocument, type TokenMeta, type Plaque, TokenPlatform } from "@/types/types";
import useBreakpoints from "@/composables/breakpoints"
import { useTokenMetaStore } from "@/stores/token-meta";
import TokenSelectList from "./TokenSelectList.vue";

interface AddTokenDialogProps {
  show_add_token_dialog: boolean;
  plaque_id: string;
}
const props = defineProps<AddTokenDialogProps>();
  
const new_token_meta_id_list = ref<string[]>([]);
const save_loading = ref(false);
const emit = defineEmits(['update:show_add_token_dialog',])
const { screen_type } = useBreakpoints();
const plaque_store = usePlaqueStore();
const token_meta_store = useTokenMetaStore();
const account_store = useAccountStore();

const show_dialog = computed({
  get() {
    return props.show_add_token_dialog
  },
  set(value) {
    emit('update:show_add_token_dialog', value)
  }
})
watch(show_dialog, (show) => {
  if (show) {
    new_token_meta_id_list.value = JSON.parse(JSON.stringify(plaque.value.entity.token_meta_id_list));
  }
})

const plaque = computed((): FirestoreDocument<Plaque> => {
  return plaque_store.plaque_map[props.plaque_id];
})

const token_meta_list = computed(() => {
  return token_meta_store.sorted_all_token_metas;
})

const handleSave = async () => {
  save_loading.value = true;
  // create archive token meta on remote for any tokens that are opensea tokens
  try {
    for (let [i, t_id] of new_token_meta_id_list.value.entries()) {
      const store_token = token_meta_store.all_token_metas[t_id]
      if (!store_token) {
        throw "Failed to find store token for token: " + t_id;
      }
      // only create tokens for opensea tokens
      if (store_token.entity.platform != TokenPlatform.Opensea) {
        continue
      }
      const token_meta: FirestoreDocument<TokenMeta> = JSON.parse(JSON.stringify(store_token));
      token_meta.entity.user_id = account_store.get_account.id
      token_meta.entity.platform = TokenPlatform.OpenseaArchive;
      const new_meta = await createTokenMeta(token_meta.entity)
      // update new_token_meta_id list id with newly created token meta
      new_token_meta_id_list.value[i] = new_meta.id;
    }
    await updatePlaque(props.plaque_id, { token_meta_id_list: new_token_meta_id_list.value })

    // update local store plaque
    plaque_store.plaque_map[props.plaque_id].entity.token_meta_id_list = new_token_meta_id_list.value;
  } catch (err) {
    showError(`Error updating plaque tokens - ${err}`)
  }

  save_loading.value = false;
  show_dialog.value = false
}
const clearList = () => {
  new_token_meta_id_list.value = []
}

</script>

<style scoped>
:deep(.el-dialog.add-dialog) {
  height: auto;
  overflow-y: auto;
  margin: 4vh auto;
}

:deep(.el-dialog__body) {
  padding: 10px calc(var(--el-dialog-padding-primary) + 5px) 30px;
  position: relative;
  border-top: 1px solid #dcdfe6;
  max-height: 75vh;
  overflow-y: scroll;
}

@media only screen and (max-width: 650px) {
  :deep(.el-dialog__body) {
    padding: 0px !important;
  }
}

.dialog-container {
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  width: 60%;
  height: 100%;
}

.dialog-footer { 
  display: flex;
  align-items: center;
  padding: 0px 5px 25px 5px;
}

input[type="text"] {
  font-family: "K2D", sans-serif;
}
</style> 