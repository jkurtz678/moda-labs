<template>
    <el-header>
        <el-image :src="getImageUrl('logo.png')" style="width: 60px; height: 60px; margin-right: 2em">
        </el-image>
        <h1 style="font-weight: bold">MODA CATALOG</h1>
        <div style="flex-grow: 1"></div>
        <el-button @click="goToProjectBlank">Projekt _______</el-button>
        <el-button  @click="goToModaPlaque">MODA Plaque</el-button>
        <el-button color="#000000" size="large" @click="goToLogin">LOGIN</el-button>
        <el-divider style="position: absolute; bottom: 0px; left: 0px; right: 0px; margin: 0px;"/>
    </el-header>
</template>
<script lang="ts" setup>

const getImageUrl = (filename: string) => {
    return new URL(`../../assets/${filename}`, import.meta.url).href
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
</style>