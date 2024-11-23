<template>
  <div >
    <el-card @click="router.push({ name: 'catalog-gallery-detail', params: { gallery_id: 'CtmSolhMWKKqrSrch1L3' } });"
      class="card" style="
       background-position: center top; 
      background-repeat: no-repeat;
      background-image: url('https://firebasestorage.googleapis.com/v0/b/moda-archive.appspot.com/o/medium_WLPhhzVKsMMqwUv8IW4J.jpg?alt=media&token=a66d1586-3618-41bd-a0dd-9626eec08cd8');">
      <div class="overlay"></div>
      <div class="text-wrapper">
        <h1>Flux Festival</h1>
        <h2>November 23, 2024</h2>
      </div>
    </el-card>
    <el-card @click="router.push({ name: 'catalog-gallery-detail', params: { gallery_id: 'vN1VWlc07Qo48dRTMKZw' } });"
      class="card"
      style="background-image: url('https://firebasestorage.googleapis.com/v0/b/moda-archive.appspot.com/o/medium_EN2FVwhaMhA37E7skY0F.jpg?alt=media&token=7fada025-41ea-43d1-a4cb-f117b6d029a9');">
      <div class="overlay"></div>
      <div class="text-wrapper">
        <h1>Sequencer :: 002 — MICRO MYTHOLOGIES</h1>
        <h2>September 28, 2024</h2>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.el-card {
  position: relative;
  margin: 40px auto;
  border-radius: 18px;
  cursor: pointer;
  max-width:1000px;
  transition: box-shadow 0.3s, transform 0.3s;
  background-size: cover;
  background-position: center;
  color: white;
  overflow: hidden;
}
.text-wrapper {
  padding: 0px 25px 20px 25px
}

.el-card .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.el-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

h1,
h2 {
  position: relative;
  z-index: 2;
}

h1 {
  font-weight: bold;
  font-size: 2.8em;
  padding: 24px 0px 24px 0px;
}
</style>
