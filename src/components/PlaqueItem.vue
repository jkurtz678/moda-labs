<template>
  <el-card>
    <template #header>
      <div style="display: flex; align-items: center;padding:1em">
        <h1> {{ props.plaque.entity.name }} {{ activeName }}</h1>
        <div style="flex-grow: 1" />
        <el-tag class="ml-2" type="success">online</el-tag>
      </div>
    </template>
    <el-row style="margin-bottom: 8px;padding:1em" v-if="activeName == 0">
      <el-col :span="12">
        <div style="font-size: var(--el-font-size-extra-small)">title</div>
        <span>V.E.N.I.C.E</span>
      </el-col>
      <el-col :span="12">
        <div style="font-size: var(--el-font-size-extra-small)">artist</div>
        Nate Mohler
      </el-col>
    </el-row>
    <div v-if="activeName == 0" style="padding:1em">Total artworks: 8</div>
    <el-collapse accordion>
      <el-collapse-item name="1" >
        <template #title>
          View
        </template>
        <PlaqueItemDetailList></PlaqueItemDetailList>
        <div style="display: flex; padding: 1em;">
          <el-button @click="clearTokens">Clear Tokens</el-button>
          <div style="flex-grow: 1"></div>
          <el-button type="danger" plain @click="forgetPlaque">Forget Display</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import type { FirestoreDocument, Plaque } from "../types/types";
import PlaqueItemDetailList from './PlaqueItemDetailList.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from "vue";
import { updatePlaque } from "@/api/plaque";
interface PlaqueItemProps {
  plaque: FirestoreDocument<Plaque>;
}
const props = defineProps<PlaqueItemProps>();
const activeName = ref("0");
const collapse = ref(true);
  
const clearTokens = () => {
  ElMessageBox.confirm(`Are you sure you want to clear tokens for plaque '${props.plaque.entity.name}'?`, "Clear tokens", {
    type: 'warning'
  }).then(() => {
    updatePlaque(props.plaque.id, {token_meta_id_list: []})
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
  min-width: 380px;
  display: inline-block;
  vertical-align: top;
  text-align: left;
}

.image {
  width: 100%;
  display: block;
  padding-right: 1em;
}

.el-card__body {
  padding: 0 !important;
}

@media only screen and (max-width: 600px) {
  .el-card {
    display: block;
    margin: 20px 10px 20px 10px;
  }
}
</style>
