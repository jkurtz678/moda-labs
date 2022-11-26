
<template>
  <div class="dialog-container">
    <el-dialog center v-model="show_dialog" title="Add artwork to plaque" :close-on-click-modal="false"
      :fullscreen="screen_type == 'xs'" top="2vh">
      <input type="text" v-model="search_filter" class="search-bar"
        placeholder="Search by artwork title or artist name" />
      <el-card class="box-card" shadow="never">
        <div v-if="sort_token_metas.length == 0">No artwork found</div>
        <AddTokenItem v-for="token in sort_token_metas" :token_meta="token"
          :in_list="Boolean(token_in_list_map[token.id])" @update_token_list="updateLocalTokenList"></AddTokenItem>
        <hr class="hr" />
      </el-card>
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
import AddTokenItem from './AddTokenItem.vue';
import { showError } from "@/util/util"
import { type FirestoreDocument, type TokenMeta, type Plaque, TokenPlatform } from "@/types/types";
import useBreakpoints from "@/composables/breakpoints"
import { useTokenMetaStore } from "@/stores/token-meta";

interface AddTokenDialogProps {
  show_add_token_dialog: boolean;
  plaque_id: string;
}
const props = defineProps<AddTokenDialogProps>();
  
const new_token_meta_id_list = ref<string[]>([]);
const save_loading = ref(false);
const search_filter = ref("");
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

const token_metas = computed(() => {
  return token_meta_store.sorted_all_token_metas;
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
  if (search_filter.value.trim() !== '') {
    return sort_token_metas.filter((token) =>
      token.entity.artist?.toLowerCase().includes(search_filter.value.toLowerCase()) || token.entity.name?.toLowerCase().includes(search_filter.value.toLowerCase())
    );
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
  width: 50%;
  height: 100%;
}

.dialog-footer { 
  display: flex;
  align-items: center;
  padding: 0px 5px 25px 5px;
}

.search-bar {
  display: block;
  width: 100%;
  margin: 5px 0px 15px 0px;
  padding: 10px 45px;
  background: white url("../assets/search-icon.svg") no-repeat 15px center;
  background-size: 20px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

input[type="text"] {
  font-family: "K2D", sans-serif;
}
</style> 