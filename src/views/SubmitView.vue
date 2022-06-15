<template>
  <div style="padding: 20px">
    <h1 style="margin-bottom: 15px">SUBMIT TO MODA ARCHIVES</h1>
    <SubmitTokenForm v-if="account_store.account"></SubmitTokenForm>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from 'vue-router';
import { useAccountStore } from "@/stores/account"
import { showError } from "@/util/util";
import SubmitTokenForm from "../components/SubmitTokenForm.vue";
import { ElLoading } from 'element-plus'

const router = useRouter();
const account_store = useAccountStore();

onMounted(async () => {

  const { wallet_address, signature, ens_name } = account_store.getCachedAccountData()

  if (wallet_address == null || signature == null) {
    router.push({ name: "landing", query: { redir: window.location.href } })
    return
  }
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  try {
    await account_store.loadAccount(wallet_address, signature, ens_name);
  } catch (err) {
    showError(`Error loading moda archive account - ${err}`);
  } finally {
    loading.close()
  }
})

</script>

<style>
</style>
