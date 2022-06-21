<template>
  <el-card>
    <div style="display: flex; align-items: center; padding:1em">
      <h1 v-if="!edit_plaque_name"> {{ props.plaque.entity.name }}</h1>
      <input v-else v-model="props.plaque.entity.name" class="edit-name-input" />
      <el-button :icon="Edit" v-if="!edit_plaque_name" @click="edit_plaque_name = true" class="editIcon" circle />
      <el-button :icon="Select" v-if="edit_plaque_name" :loading="edit_loading" @click="updatePlaqueName"
        class="editIcon" circle :type="edit_loading ? '' : 'success'" text/>
      <div style="flex-grow: 1" />
      <el-tag class="ml-2" type="success">online</el-tag>
    </div>
    <el-collapse-transition>
      <section v-show="plaque_view == 'simple'" class="card-simple">
        <hr>
        <el-row style="margin-bottom: 8px;padding:1em">
          <el-col :span="12">
            <div style="font-size: var(--el-font-size-extra-small)">title</div>
            <span>{{ first_token?.entity.name || "N/A" }}</span>
          </el-col>
          <el-col :span="12">
            <div style="font-size: var(--el-font-size-extra-small)">artist</div>
            {{ first_token?.entity.artist || "N/A" }}
          </el-col>
        </el-row>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-right: 1em">
          <div style="padding:1em">{{ `Total artworks: ${plaque.entity.token_meta_id_list.length}` }}</div>
          <el-button @click="plaque_view = 'detail'">
            View <el-icon class="el-icon--right">
              <ArrowRight />
            </el-icon>
          </el-button>
        </div>
      </section>
    </el-collapse-transition>
    <el-collapse-transition>
      <section v-if="plaque_view == 'detail'" class="card-detail">
        <p style="padding:0 1em;">{{ `Total artworks: ${plaque.entity.token_meta_id_list.length}` }}</p>
        <div style="display: flex; align-items: center; justify-content: space-between;padding: 0.5em 1em;">
          <el-button @click="plaque_view = 'settings'">Settings</el-button>
          <el-button type="info" @click="show_add_token_dialog = true">Add Artwork</el-button>
        </div>
        <hr />
        <template v-if="plaque_tokens.length == 0">
          <div style="padding: 1em;"> No tokens added</div>
          <hr />
        </template>
        <PlaqueTokenItem :token_meta="meta" v-for="meta in plaque_tokens" />
        <div style="display: flex; padding: 1em;">
          <el-button @click="clearTokens">Clear Tokens</el-button>
          <div style="flex-grow: 1"></div>
          <el-button @click="plaque_view = 'simple'">Close<el-icon class="el-icon--right">
              <Close />
            </el-icon>
          </el-button>
        </div>
      </section>
    </el-collapse-transition>

    <el-collapse-transition>
      <section v-if="plaque_view == 'settings'" style="padding: 1em; display: flex; justify-content: space-between;">
        <el-button type="danger" plain @click="forgetPlaque">Forget Display</el-button>
        <el-button @click="plaque_view = 'detail'">Close<el-icon class="el-icon--right">
            <Close />
          </el-icon>
        </el-button>
      </section>
    </el-collapse-transition>

    <AddTokenDialog :plaque_id="props.plaque.id" v-model:show_add_token_dialog="show_add_token_dialog"></AddTokenDialog>

  </el-card>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { FirestoreDocument, Plaque, TokenMeta } from "@/types/types";
import AddTokenDialog from './AddTokenDialog.vue';
import PlaqueTokenItem from "./PlaqueTokenItem.vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from "vue";
import { updatePlaque } from "@/api/plaque";
import { useTokenMetaStore } from "../stores/token-meta";
import { showError } from "@/util/util";
import {
  Edit,
  Select,
  Loading
} from '@element-plus/icons-vue'
interface PlaqueCardProps {
  plaque: FirestoreDocument<Plaque>;
}

const props = defineProps<PlaqueCardProps>();
const plaque_view = ref("simple"); // 3 modes - 'simple', 'detail', 'settings'
const show_add_token_dialog = ref(false);
const edit_plaque_name = ref(false);
const edit_loading = ref(false);
const updatePlaqueName = async () => {
  edit_loading.value = true;
  await updatePlaque(props.plaque.id, { name: props.plaque.entity.name }).catch(err => {
    showError(`Error updating plaque tokens - ${err}`)
  })
  edit_plaque_name.value = false;
  edit_loading.value = false;
}
const token_meta_store = useTokenMetaStore()

interface TokenMetaMap {
  [id: string]: FirestoreDocument<TokenMeta>;
}
// first_token is the token visible on the simple view of the plaque card
const first_token = computed(() => {
  if (plaque_tokens.value.length == 0) {
    return null
  }
  return plaque_tokens.value[0];
})
const plaque_tokens = computed(() => {
  const token_map = token_meta_store.archive_token_meta_map;
  let res = props.plaque.entity.token_meta_id_list.map(token_id => token_map[token_id])
  return res;
})

const activeName = ref("0");
const collapse = ref(true);

const clearTokens = () => {
  ElMessageBox.confirm(`Are you sure you want to clear tokens for plaque '${props.plaque.entity.name}'?`, "Clear tokens", {
    type: 'warning'
  }).then(() => {
    updatePlaque(props.plaque.id, { token_meta_id_list: [] })
      .then(() => {
        ElMessage({
          type: 'success',
          message: 'Tokens cleared',
        })
      })
      .catch((err) => {
        ElMessage({ message: `Error clearing tokens from plaque - ${err}`, type: 'error', showClose: true, duration: 12000 });
      })
  })
}

const forgetPlaque = () => {
  ElMessageBox.confirm(`Are you sure you want to forget the plaque named '${props.plaque.entity.name}'?`, "Forget plaque", {
    type: 'warning'
  }).then(() => {
    updatePlaque(props.plaque.id, { wallet_address: "", token_meta_id_list: [] })
      .then(() => {
        ElMessage({
          type: 'success',
          message: 'Plaque forgotten',
        })
      })
      .catch((err) => {
        ElMessage({ message: `Error forgetting plaque - ${err}`, type: 'error', showClose: true, duration: 12000 });
      })
  })
}
</script>

<style scoped>
.el-card {
  --el-card-padding: 0px;
  margin: 10px;
  border-radius: 18px;
  min-width: 410px;
  display: inline-block;
  vertical-align: top;
  text-align: left;
}

.box-card {
  --el-card-padding: 0px;
  width: 480px;
  border-radius: 0px;
  text-align: left;
  background-color: none;
  padding: 0px;
}

.image {
  width: 100%;
  display: block;
  padding-right: 1em;
}

.el-dialog__body {
  padding: 0 !important;
}

.box-dialog {
  --el-dialog-padding-primary: 10px 0px 10px 0px;
}

el-card__body {
  padding: 0 !important;
}

.edit-name-input {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid black;
  padding: 0 2px;
  font-size: 1.5em;
}

.editIcon {
  margin: 0 1px;
  border: none;
}

@media only screen and (max-width: 600px) {
  div.el-card {
    display: block;
    margin: 20px 0px 20px 0px;
    min-width: 250px !important;
  }
}
</style>
