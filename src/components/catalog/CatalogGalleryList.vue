<template>
  <div>
    <el-card @click="router.push({ name: 'catalog-gallery-detail', params: { gallery_id: 'CtmSolhMWKKqrSrch1L3' } });">
      <h1>Flux Festival</h1>
      November 23, 2024<br />

      We cordially Invite you to the Flux Festival Saturday Exhibition Nov. 23rd at the beautiful Audry Irmas Pavillion
      featuring Live Performances, New Media Art Gallery, VR films, and 3 floors of installations. Projekt Blank and
      Flux Festival are co-curating the physical exhibition to highlight artists and filmmakers pioneering creative uses
      of Ai and innovations in media art and film.
      <br/>
      Flux Festival culminates with live audio-visual performances by New York based @kevinpeterhe and @jakeoleson and
      the esteemed @nosajthing.
    </el-card>
    <el-card @click="router.push({ name: 'catalog-gallery-detail', params: { gallery_id: 'vN1VWlc07Qo48dRTMKZw' } });">
      <h1>Sequencer :: 002 — MICRO MYTHOLOGIES</h1>
      September 28, 2024<br />

      Presenting “Sequencer :: 002 — MICRO MYTHOLOGIES" a design and media art group exhibition featuring a curation of
      new media artists exploring generative systems, mythical biology, micro organisms, and unseen or endangered parts
      of our world. This second edition will feature artists working in: Film, Animation, Light, Generative Art,
      Projection, Performance, and Time.
    </el-card>

  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.el-card {
  margin: 40px 0px;
  padding: 20px;
  border-radius: 18px;
  cursor: pointer;
  transition: box-shadow 0.3s, transform 0.3s;
}

.el-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}
</style>
