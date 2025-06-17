<template>
  <div class="iframe-container">
    <div class="header">
      <button @click="goBack" class="back-button">
        ← Back
      </button>
    </div>
    <div class="iframe-wrapper">
      <iframe 
        :src="iframeUrl"
        frameborder="0"
        class="manifold-iframe"
        title="Purchase Interface"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { TokenMeta, FirestoreDocument } from "@/types/types";

interface Props {
  token_meta?: FirestoreDocument<TokenMeta>;
}

const props = defineProps<Props>();
const router = useRouter();
const route = useRoute();

// Compute the iframe URL from token_meta
const iframeUrl = computed(() => {
  return props.token_meta?.entity?.iframe_purchase_url || "";
});

const goBack = () => {
  // Navigate back to the qr-landing actions page
  router.push(`/qr-landing/${route.params.token_meta_id}`);
};
</script>

<style scoped>
.iframe-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  padding: 16px 20px;
  font-family: "K2D", sans-serif;
}

.header {
  margin-bottom: 16px;
}

.back-button {
  background: none;
  border: none;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  padding: 8px 0;
  font-family: "K2D", sans-serif;
  display: flex;
  align-items: center;
  gap: 4px;
}

.back-button:hover {
  color: #007bff;
}

.iframe-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: start;
  min-height: 0;
}

.manifold-iframe {
  width: 100%;
  height: 80vh;
  max-width: 450px;
  max-height: 800px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .iframe-container {
    padding: 12px 16px;
  }
  
  .manifold-iframe {
    height: 75vh;
    max-height: none;
  }
}
</style>