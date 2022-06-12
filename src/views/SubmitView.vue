<template>
  <div style="padding: 20px">
    <h1 style="margin-bottom: 15px">SUBMIT TO MODA ARCHIVES</h1>
    <SubmitTokenForm v-if="account_store.account"></SubmitTokenForm> 
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import { useRouter } from 'vue-router';
import { useAccountStore } from "@/stores/account"
import { showError } from "@/util/util";
import SubmitTokenForm from "../components/SubmitTokenForm.vue";
import { ElLoading } from 'element-plus'

const router = useRouter();
const account_store = useAccountStore();

onMounted(async () => {

  const address = window.localStorage.getItem("account_address")
  const signature = window.localStorage.getItem("account_signature")

  if (address == null || signature == null) {
    router.push({ name: "login" })
    return
  }
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  try {
    await account_store.loadAccount(address, signature);
  } catch (err) {
    showError(`Error loading moda archive account - ${err}`);
  } finally {
    loading.close()
  }
})

</script>

<style>
</style>
