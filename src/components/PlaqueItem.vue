<template>
  <el-card class="rounded-card">
    <template #header>
      <div style="display: flex; align-items: center;padding:1em">
        <h1> {{ props.plaque.entity.name }}</h1>
        <div style="flex-grow: 1" />
        <el-tag
          class="ml-2"
          type="success"
        >online</el-tag>
      </div>
      <div style="display: flex; align-items: center;justify-content:space-between; padding:1em">
        <p>Filter: Name</p>
        <el-button text @click="addNewToList = true">ADD NFT</el-button>
      </div>
    </template>
    <el-row
      style="margin-bottom: 8px;padding:1em"
    >
      <el-col :span="12">
        <div style="font-size: var(--el-font-size-extra-small)">title</div>
        <span>V.E.N.I.C.E</span>
      </el-col>
      <el-col :span="12">
        <div style="font-size: var(--el-font-size-extra-small)">artist</div>
        Nate Mohler
      </el-col>
    </el-row>
    <div
      style="padding:1em"
    >Total artworks: 8</div>
    <el-collapse accordion>
      <el-collapse-item name="1">
        <template #title>
          View
        </template>
          <PlaqueItemDetail :detail="i" v-for="i in items"/>
      </el-collapse-item>
    </el-collapse>
            <el-dialog class="box-dialog" center v-model="centerDialogVisible" width="530px" v-if="addNewToList" close-on-click-modal="false">
              <el-card  class="box-card"   shadow="never">
                <AllDetails :detail="i" v-for="i in allItems"></AllDetails>
                <hr class="hr"/>
              </el-card>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="addNewToList = false">Clear</el-button>
                  <el-button type="info" @click="addNewToList = false">Done</el-button>
                </span>
              </template>
          </el-dialog>
  </el-card>
</template>
<script setup lang="ts">
import { defineProps, computed } from "vue";
import type { FirestoreDocument, Plaque,TokenMeta } from "../types/types";
import AllDetails from './AllDetails.vue';
import PlaqueItemDetail from "./PlaqueItemDetail.vue";
import { Timestamp } from "firebase/firestore";
import { reactive } from "vue";
import { ref } from "vue";
interface PlaqueItemProps {
  plaque: FirestoreDocument<Plaque>;
}
const centerDialogVisible = ref(true)
const props = defineProps<PlaqueItemProps>();
const addNewToList = ref(false);
const items: FirestoreDocument<TokenMeta>[] = reactive([
  {
    id: "test",
    entity: {
      name: "V.E.N.I.C.E",
      artist: "Nate Mohler",
      description: "Lorem ipsum dolor sit amet",
      public_link: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      media_id: "dfefe",
      media_type: "mp3",
      // isExpand: true,
      // computedHeight: 0,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }
  },
  {
    id: "test",
    entity: {
      name: "Bing Bong",
      artist: "Shawn Lister",
      description: "Lorem ipsum dolor sit amet",
      public_link: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      media_id: "balavavdd",
      media_type: "mp3",
      // isExpand: true,
      // computedHeight: 0,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }
  },
])
const allItems: FirestoreDocument<TokenMeta>[] = reactive([
  {
    id: "test",
    entity: {
      name: "V.E.N.I.C.E",
      artist: "Nate Mohler",
      description: "Lorem ipsum dolor sit amet",
      public_link: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      media_id: "dfefe",
      media_type: "mp3",
      // isExpand: true,
      // computedHeight: 0,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }
  },
  {
    id: "test",
    entity: {
      name: "Bing Bong",
      artist: "Shawn Lister",
      description: "Lorem ipsum dolor sit amet",
      public_link: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      media_id: "balavavdd",
      media_type: "mp3",
      // isExpand: true,
      // computedHeight: 0,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }
  },
])
</script>

<style scoped>
.rounded-card {
  --el-card-padding: 0px;
  margin: 10px;
  border-radius: 18px;
  min-width: 380px;
  display: inline-block;
  text-align: left;
}
.box-card {
  --el-card-padding: 0px;
  width: 480px;
  border-radius: 0px;
  text-align: left;
  background-color: none;
  padding:0px;
}
.image {
  width: 100%;
  display: block;
  padding-right: 1em;
}
.el-dialog__body {
  padding: 0 !important;
}
.box-dialog{
    --el-dialog-padding-primary: 10px 0px 10px 0px;
}
.dialog-footer{

}
@media only screen and (max-width: 600px) {
  .el-card {
    display: block;
    margin: 20px 10px 20px 10px;
  }
}
</style>
