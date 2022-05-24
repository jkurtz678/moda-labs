<template>
    <PlaqueItem :plaque="plaque" v-for="plaque in plaques" />
</template>

<script setup lang="ts">
import PlaqueItem from '../components/PlaqueItem.vue'
import { Timestamp } from "firebase/firestore"
import type { Plaque, FirestoreDocument } from '../types/types'
const plaques: FirestoreDocument<Plaque>[] = [
    {
        id: "",
        entity: {
            name: "Display 1A",
            token_meta_id_list: [],
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        }
    },
    {
        id: "",
        entity: {
            name: "Home Wall",
            token_meta_id_list: [],
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        }
    }
]
</script>

<style scoped>
</style>
