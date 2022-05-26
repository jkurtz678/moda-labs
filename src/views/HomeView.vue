<template>
  <el-container style="height: 100%">
    <el-header class="header">
      <div style="display: flex; align-items: center;">
        <h1 style="display: inline-flex;">MoDA</h1>
        <el-icon size="25px" style="margin-left: 10px">
          <UserFilled />
        </el-icon>
        <div style="flex-grow: 1"></div>
        <el-icon size="32px">
          <CirclePlus />
        </el-icon>
      </div>
      <el-tabs>
        <el-tab-pane label="Overview" name="first">User</el-tab-pane>
        <el-tab-pane label="Support" name="second">Support</el-tab-pane>
        <el-tab-pane label="Account" name="Third">Account</el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main style="background-color: #DAD9D7;">
      <PlaqueList></PlaqueList>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from 'vue-router';
import PlaqueList from '../components/PlaqueList.vue'
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
    router.push("landing");
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
  --el-header-height: 100px;
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
