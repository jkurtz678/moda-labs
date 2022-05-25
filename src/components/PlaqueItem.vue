<template>
    <el-card>
        <template #header>
            <div style="display: flex; align-items: center">
                <h1> {{ props.plaque.entity.name }}</h1>
                <div style="flex-grow: 1" />
                <el-tag class="ml-2" type="success">online</el-tag>
            </div>
        </template>
        <el-row style="margin-bottom: 8px">
            <el-col :span="12">
                <div style="font-size: var(--el-font-size-extra-small)">title</div>
                V.E.N.I.C.E
            </el-col>
            <el-col :span="12">
                <div style="font-size: var(--el-font-size-extra-small)">artist</div>
                Nate Mohler
            </el-col>
        </el-row>
        <div style="display: flex; align-items: center">
            <div>Total artworks: 8</div>
            <div style="flex-grow: 1"></div>
            <el-button text>View ></el-button>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import type { FirestoreDocument, Plaque } from '../types/types'

interface PlaqueItemProps {
    plaque: FirestoreDocument<Plaque>
}
const props = defineProps<PlaqueItemProps>()
</script>

<style scoped>
.el-card {
    --el-card-padding: 12px;
    margin: 10px;
    border-radius: 18px;
    min-width: 380px;
    display: inline-block;
    text-align: left;
}

@media only screen and (max-width: 600px) {
  .el-card { 
      display: block;
      margin: 20px 10px 20px 10px;
  }
}
</style>
