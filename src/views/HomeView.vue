<template>
  <el-container style="height: 100%">
    <el-header class="header">
      <Header></Header>
    </el-header>
    <el-main style="background-color: #DAD9D7;">
      <RouterView v-if="initial_load_done"></RouterView>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import Header from "@/components/Header.vue";
import { onMounted, ref } from "vue"
import { useRouter, useRoute, RouterView } from 'vue-router';
import { useAccountStore } from "@/stores/account"
import { usePlaqueStore } from "@/stores/plaque"
import { useTokenMetaStore } from "@/stores/token-meta"
import { ElLoading, ElMessage } from 'element-plus'
import { showError } from "@/util/util";
import { updatePlaque } from "@/api/plaque";

const account_store = useAccountStore();
const plaque_store = usePlaqueStore();
const token_meta_store = useTokenMetaStore();
const router = useRouter();
const initial_load_done = ref(false);
const route = useRoute()

onMounted(async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  const { wallet_address, signature, ens_name } = account_store.getCachedAccountData()
  // if account address is not found in local storage, redirect to landing. ens_name can be empty
  if (!wallet_address || !signature) {
    router.push({ name: "landing", query: { redir: window.location.href } });
    loading.close()
    return
  }

  // load account first
  await account_store.loadAccount(wallet_address, signature, ens_name)
  if (account_store.account == null) {
    showError("Error - failed to load account")
    return
  }

  // then load all tokens and plaques in parallel 
  const address = account_store.get_account.entity.wallet_address
  const plaque_promise = plaque_store.loadPlaques(address)
    .catch(err => (showError(`Error loading plaques - ${err}`)));
  const archive_token_promise = token_meta_store.loadArchiveTokenMetas(address)
    .catch(err => (showError(`Error loading archive token metas - ${err}`)));
  const opensea_minted_token_promise = token_meta_store.loadOpenseaMintedTokenMetas(address)
    .catch(err => (showError(`Error loading opensea minted tokens - ${err}`)))
const opensea_wallet_token_promise = token_meta_store.loadOpenseaWalletTokenMetas(address)
    .catch(err => (showError(`Error loading opensea wallet tokens - ${err}`)))
  await Promise.all([plaque_promise, archive_token_promise, opensea_minted_token_promise, opensea_wallet_token_promise])

  // if plaque_id is passed in the query params and the plaque is not in the store, attempt to add this plaque to this account
  const plaque_id_qp = route.query.plaque_id;
  if (plaque_id_qp && typeof plaque_id_qp === 'string' && !plaque_store.plaque_map[plaque_id_qp]) {
    await updatePlaque(plaque_id_qp, { wallet_address: account_store.get_account.entity.wallet_address, token_meta_id_list: [] }).catch(err => {
      showError(`Error adding plaque from query param = ${err}`)
    })
  }
  initial_load_done.value = true;
  loading.close()
});

</script>

<style scoped>
.header {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 30px;
  padding-right: 30px;
  --el-header-height: 75px;
}

.el-main {
  --el-main-padding: 10px;
}

@media only screen and (max-width: 600px) {
  .el-main {
    text-align: center;
  }
}
</style>
