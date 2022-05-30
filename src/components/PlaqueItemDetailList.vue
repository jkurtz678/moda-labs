<template>
  <PlaqueItemDetail :detail="p" v-for="p in painting_list" />
</template>

<script setup lang="ts">
import PlaqueItemDetail from "./PlaqueItemDetail.vue";
import { Timestamp } from "firebase/firestore";
import type { Painting, FirestoreDocument } from "../types/types";
import { reactive } from "vue";

const painting_list: FirestoreDocument<Painting>[] = reactive([
  {
    src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
    author: "Nate Mohler",
    title: "V.E.N.I.C.E",
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  },
  {
    src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
    author: "Shawn Lister",
    title: "Bing Bong",
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  },
]);
const src =
  "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png";
</script>

<style scoped>
</style>
