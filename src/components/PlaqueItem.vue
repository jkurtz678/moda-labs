<template>
  <el-card class="rounded-card">
    <template #header>
      <div style="display: flex; align-items: center;padding:1em" @click="showDetail = !showDetail">
        <h1> {{ props.plaque.entity.name }}</h1>
        <div style="flex-grow: 1" />
        <el-tag class="ml-2" type="success">online</el-tag>
      </div>
      <transition name="el-fade-in-linear"> 
      <section v-if="showDetail">
      <p style="padding:0 1em;">Total artworks: 8</p>
      <div style="display: flex; align-items: center; justify-content: space-between;padding: 0.5em 1em;">
        <el-button>Settings</el-button>
        <el-button type="info" @click="addNewToList = true">ADD Artwork</el-button>
      </div>
      </section>
      </transition>
    </template>
    <transition name="el-fade-in-linear"> 
      <section class="card-simple" v-if="!showDetail" @click="showDetail = true">
        <el-row style="margin-bottom: 8px;padding:1em">
          <el-col :span="12">
            <div style="font-size: var(--el-font-size-extra-small)">title</div>
            <span>V.E.N.I.C.E</span>
          </el-col>
          <el-col :span="12">
            <div style="font-size: var(--el-font-size-extra-small)">artist</div>
            Nate Mohler
          </el-col>
        </el-row>
        <div style="padding:1em">Total artworks: 8</div>
      </section>
    </transition>
    <transition name="el-fade-in-linear"> 
      <section class="card-detail" v-if="showDetail">
        <PlaqueItemDetail :detail="i" v-for="i in items" />
        <div style="display: flex; padding: 1em;">
          <el-button @click="clearTokens">Clear Tokens</el-button>
          <div style="flex-grow: 1"></div>
          <el-button type="danger" plain @click="forgetPlaque">Forget Display</el-button>
        </div>
      </section>
    </transition>
    <el-dialog class="box-dialog" center v-model="centerDialogVisible" width="530px" v-if="addNewToList"
      close-on-click-modal="false">
      <el-card class="box-card" shadow="never">
        <AllDetails :detail="i" v-for="i in allItems"></AllDetails>
        <hr class="hr" />
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
import type { FirestoreDocument, Plaque, TokenMeta } from "@/types/types";
import AllDetails from './AllDetails.vue';
import PlaqueItemDetail from "./PlaqueItemDetail.vue";
import { Timestamp } from "firebase/firestore";
import { reactive } from "vue";
import PlaqueItemDetailList from './PlaqueItemDetailList.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from "vue";
import { updatePlaque } from "@/api/plaque";
interface PlaqueItemProps {
  plaque: FirestoreDocument<Plaque>;
}
const centerDialogVisible = ref(true)
const props = defineProps<PlaqueItemProps>();
const addNewToList = ref(false);
const showDetail = ref(false);
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
.rounded-card {
  --el-card-padding: 0px;
  margin: 10px;
  border-radius: 18px;
  min-width: 380px;
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
  .el-card {
    display: block;
    margin: 20px 10px 20px 10px;
  }
}
</style>
