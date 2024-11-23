<template>
    <el-header>
        <el-image :src="getImageUrl('logo.png')" style="width: 60px; height: 60px; margin-right: 2em">
        </el-image>
        <h1 v-if="md_and_up" style="font-weight: bold">MODA CATALOG</h1>
        <div style="flex-grow: 1"></div>
        <el-button link @click="goToGalleries" class="header-button toolbar-item">All Exhibitions</el-button>
        <el-button v-if="md_and_up" link @click="goToProjectBlank" class="header-button toolbar-item">Projekt _______</el-button>
        <el-button v-if="md_and_up" link @click="goToModaPlaque" class="header-button toolbar-item">MODA Plaque</el-button>
        <!-- <el-button color="#000000" size="large" @click="goToLogin">LOGIN</el-button> -->
        <el-divider style="position: absolute; bottom: 0px; left: 0px; right: 0px; margin: 0px;"/>
    </el-header>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import useBreakpoints from "@/composables/breakpoints"
const {md_and_up} = useBreakpoints();

const router = useRouter();

const getImageUrl = (filename: string) => {
    return new URL(`../../assets/${filename}`, import.meta.url).href
}

const goToGalleries = () => {
    router.push({name:"catalog-gallery-list"});
}

const goToModaPlaque = () => {
    window.open('https://moda-labs.xyz/', "_blank");
}

const goToProjectBlank = () => {
    window.open('https://www.instagram.com/projekt.______/', "_blank");
}

const goToLogin = () => {
    window.location.href = 'https://labs.modadisplay.art/#/home/plaque-list';
}

</script>
<style scoped>
.el-header {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 1em;
    background-color: white;
    z-index: 100;
}

.header-button {
    font-size: 1.4em;
    padding-left: .8em;
    padding-right: .8em;
    font-weight: bold;
}

.toolbar-item {
    background-color: transparent;
    border: none;
    color: #000;
    padding: 0.5em 1em;
    margin: 0 0.5em;
    cursor: pointer;
    transition: background-color 0.3s;
}

.toolbar-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}
</style>