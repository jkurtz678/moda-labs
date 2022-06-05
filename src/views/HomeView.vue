<template>
  <el-container style="height: 100%">
    <el-header class="header">
     <Header></Header> 
    </el-header>
    <el-main style="background-color: #DAD9D7;">
      <RouterView></RouterView>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import Header from "@/components/Header.vue";
import { onMounted } from "vue"
import { useRouter, RouterView } from 'vue-router';
import { useAccountStore } from "@/stores/account"
import { usePlaqueStore } from "@/stores/plaque"
import { ElLoading, ElMessage } from 'element-plus'

const account_store = useAccountStore();
const plaque_store = usePlaqueStore();
const router = useRouter();

onMounted(async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  const address = window.localStorage.getItem("account_address")
  const signature = window.localStorage.getItem("account_signature")
  // if account address is not found in local storage, redirect to landing
  if (address == null || signature == null) {
    router.push({ name: "landing" });
    loading.close()
    return
  }
  await account_store.loadAccount(address, signature)
  if (account_store.account == null) {
    ElMessage("Error - failed to load account")
    return
  }
  await plaque_store.loadPlaques(account_store.account.id)
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
