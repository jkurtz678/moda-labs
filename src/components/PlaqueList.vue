<template>
    <PlaqueItem :plaque="plaque" v-for="plaque in plaque_store.plaques" />
</template>

<script setup lang="ts">
import PlaqueItem from '../components/PlaqueItem.vue'
import { usePlaqueStore } from "@/stores/plaque"

const plaque_store = usePlaqueStore();

</script>

<style scoped>
</style>
