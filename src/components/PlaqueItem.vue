<template>
  <el-card>
    <template #header>
      <div style="display: flex; align-items: center;padding:1em" @click="showDetail = !showDetail">
        <h1> {{ props.plaque.entity.name }}</h1>
        <div style="flex-grow: 1" />
        <el-tag class="ml-2" type="success">online</el-tag>
      </div>
      <transition name="el-fade-in-linear">
        <section v-if="showDetail">
          <p style="padding:0 1em;">{{ `Total artworks: ${plaque.entity.token_meta_id_list.length}` }}</p>
          <div style="display: flex; align-items: center; justify-content: space-between;padding: 0.5em 1em;">
            <el-button>Settings</el-button>
            <el-button type="info" @click="show_add_token_dialog = true">Add Artwork</el-button>
          </div>
        </section>
      </transition>
    </template>
    <transition name="el-fade-in-linear">
      <section class="card-simple" v-if="!showDetail" @click="showDetail = true">
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
        <div style="padding:1em">{{ `Total artworks: ${plaque.entity.token_meta_id_list.length}` }}</div>
      </section>
    </transition>
    <transition name="el-fade-in-linear">
      <section class="card-detail" v-if="showDetail">
      <div v-if="plaque_tokens.length == 0" style="padding: 1em;">No tokens added</div>
        <PlaqueItemDetail :detail="i" v-for="i in plaque_tokens" />
        <div style="display: flex; padding: 1em;">
          <el-button @click="clearTokens">Clear Tokens</el-button>
          <div style="flex-grow: 1"></div>
          <el-button type="danger" plain @click="forgetPlaque">Forget Display</el-button>
        </div>
      </section>
    </transition>

    <AddTokenDialog :plaque_id="props.plaque.id" v-model:show_add_token_dialog="show_add_token_dialog"></AddTokenDialog>

  </el-card>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { FirestoreDocument, Plaque, TokenMeta } from "@/types/types";
import AddTokenDialog from './AddTokenDialog.vue';
import PlaqueItemDetail from "./PlaqueItemDetail.vue";
import { Timestamp } from "firebase/firestore";
import { reactive } from "vue";
import PlaqueItemDetailList from './PlaqueItemDetailList.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from "vue";
import { updatePlaque } from "@/api/plaque";
import { useTokenMetaStore } from "../stores/token-meta";
interface PlaqueItemProps {
  plaque: FirestoreDocument<Plaque>;
}
const centerDialogVisible = ref(true)
const props = defineProps<PlaqueItemProps>();
const showDetail = ref(false);
const show_add_token_dialog = ref(false);
const token_meta_store = useTokenMetaStore()

const items: FirestoreDocument<TokenMeta>[] = token_meta_store.token_meta_list;

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
  const token_map = token_meta_store.token_meta_map;
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
    updatePlaque(props.plaque.id, { account_id: "" })
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

@media only screen and (max-width: 600px) {
  div.el-card {
    display: block;
    margin: 20px 10px 20px 10px;

    min-width: 250px !important;
  }
}
</style>
