<template>
  <div style="padding: 20px">
    <h1 style="margin-bottom: 15px">Submit To MoDA Archives</h1>
    <SubmitTokenForm v-if="account_store.account"></SubmitTokenForm>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { useAccountStore } from "@/stores/account"
import { showError } from "@/util/util";
import SubmitTokenForm from "../components/SubmitTokenForm.vue";
import { ElLoading } from 'element-plus'
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/firebaseConfig";

const router = useRouter();
const account_store = useAccountStore();
const loading = ref();

onMounted(async () => {
  loading.value = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      loading.value = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      await account_store.loadAccount(user.uid)
        .catch(err => {
          showError(`Error loading moda archive account - ${err}`);
        })
      loading.value.close();
    } else {
      account_store.setAccount(null)
      loading.value.close();
      router.push({ name: "login", query: { redir: window.location.href } });
    }
  });
})

</script>

<style>

</style>
