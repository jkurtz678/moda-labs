<template>
    <div v-if="plaque_store.plaques.length == 0" style="padding: 1em;">No plaques connected</div>
    <PlaqueCard :plaque="plaque" v-for="plaque in plaque_store.plaques" :key="plaque.id" />
</template>

<script setup lang="ts">
import PlaqueCard from '@/components/PlaqueCard.vue'
import { usePlaqueStore } from "@/stores/plaque"

const plaque_store = usePlaqueStore();

</script>

<style scoped>
</style>
