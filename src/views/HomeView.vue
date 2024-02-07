<template>
  <el-container style="height: 100%; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px;">
    <Header></Header>
    <el-main style="background-color: #DAD9D7;"
      :class="route.fullPath.includes('artwork-tile-grid') ? 'remove-padding' : ''">
      <RouterView v-if="initial_load_done"></RouterView>
    </el-main>
  </el-container>
  <WelcomeDialog />
</template>
<script setup lang="ts">
import Header from "@/components/Header.vue";
import { onMounted, ref } from "vue"
import { useRouter, useRoute, RouterView } from 'vue-router';
import { useAccountStore } from "@/stores/account"
import { usePlaqueStore } from "@/stores/plaque"
import { useTokenMetaStore } from "@/stores/token-meta"
import { ElLoading } from 'element-plus'
import { showError } from "@/util/util";
import { updatePlaque } from "@/api/plaque";
import { useGalleryStore } from "@/stores/gallery";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import type { FirestoreDocument, Plaque } from "@/types/types";
import { addPlaqueToAccount } from "@/util/add-plaque";
import { onUnmounted } from "vue";
import WelcomeDialog from "@/components/WelcomeDialog.vue";

const account_store = useAccountStore();
const plaque_store = usePlaqueStore();
const token_meta_store = useTokenMetaStore();
const gallery_store = useGalleryStore();
const router = useRouter();
const initial_load_done = ref(false);
const loading = ref();
const route = useRoute()

let unsubAuthStateChanged: any;

onMounted(async () => {
  loading.value = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  // detect if user is logged in
  unsubAuthStateChanged = onAuthStateChanged(auth, async (user) => {

    console.log("onAuthStateChanged", user)
    if (user) {
      loading.value = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      try {
        await loadAppData(user.uid);
      } finally {
        loading.value.close();
      }
    }

    if (!user) {
      account_store.setAccount(null)
      loading.value.close();
      router.push({ name: "login", query: { redir: window.location.href } });
    }
  })
});

onUnmounted(() => {
  console.log("unsubscribe onAuthStateChanged on unmount")
  unsubAuthStateChanged();
})

// loadAppData is the initial load for app data for the user
async function loadAppData(user_id: string) {
  console.log("LOAD APP DATA")
  await account_store.loadAccount(user_id)

  // must load gallery data before loading plaque data because we need to know which plaques to load
  await gallery_store.loadGalleryList(user_id)
    .catch(err => (showError(`Error loading galleries - ${err}`)));

  console.log("done loading galleries")

  // then load all tokens and plaques in parallel 
  const plaque_promise = plaque_store.loadPlaques(user_id)
    .catch(err => (showError(`Error loading plaques - ${err}`)));
  const gallery_plaque_promise = plaque_store.loadGalleryPlaques(gallery_store.gallery_plaque_list)
    .catch(err => (showError(`Error loading gallery plaques - ${err}`)));
  const archive_token_promise = token_meta_store.loadArchiveTokenMetas(user_id)
    .catch(err => (showError(`Error loading archive token metas - ${err}`)));
  const gallery_token_promise = token_meta_store.loadGalleryTokenMetas(gallery_store.gallery_token_meta_list)
    .catch(err => (showError(`Error loading token metas - ${err}`)));
  const demo_token_promise = token_meta_store.loadDemoTokenMetas()
    .catch(err => (showError(`Error loading demo token metas - ${err}`)));

  const promise_list = [plaque_promise, gallery_plaque_promise, archive_token_promise, gallery_plaque_promise, gallery_token_promise, demo_token_promise];

  // if user has a wallet connected then we load opensea tokens also
  const wallet_address = account_store.get_account.entity.wallet_address;
  // nates address
  //const wallet_address = "0xd8945d98ed4233Cf87cfA4fDCC7a54FE279E8ee7"
  if (wallet_address) {
    const opensea_minted_token_promise = token_meta_store.loadOpenseaMintedTokenMetas(wallet_address)
      .catch(err => (showError(`Error loading opensea minted tokens - ${err}`)))
    const opensea_wallet_token_promise = token_meta_store.loadOpenseaWalletTokenMetas(wallet_address)
      .catch(err => (showError(`Error loading opensea wallet tokens - ${err}`)))

    promise_list.push(opensea_minted_token_promise);
    promise_list.push(opensea_wallet_token_promise);
  }

  await Promise.all(promise_list);

  // load aspect ratio of opensea tokens
  if (wallet_address) {
    await token_meta_store.loadOpenseaConvertedTokens();
  }

  // delay opensea_wallet_load to possibly help with rate limit
  // await opensea_wallet_token_promise;

  // if plaque_id is passed in the query params and the plaque is not in the store, attempt to add this plaque to this account
  const plaque_id_qp = route.query.plaque_id;
  if (plaque_id_qp && typeof plaque_id_qp === 'string') {
    await addPlaqueToAccount(user_id, plaque_id_qp as string)
    router.replace({ path: route.path, query: {} });
  }
  initial_load_done.value = true;
};

</script>

<style scoped>
.el-main {
  --el-main-padding: 10px;
}

@media only screen and (max-width: 600px) {
  .el-main {
    text-align: center;
  }
}

.remove-padding {
  padding: 0px !important;
  overflow-y: hidden;
}
</style>
