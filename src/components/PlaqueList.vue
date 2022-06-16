<template>
    <!-- <div v-if="plaque_store.plaques.length == 0" style="padding: 1em;">No plaques connected</div> -->
    <PlaqueCard :plaque="plaque" v-for="plaque in plaque_store.plaques" :key="plaque.id" />
    <div class='add-button-container'>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%">
            <div class="add-button" @click="show_add_plaque_dialog = true">
                <el-icon style="font-size: 26px; margin-bottom: 6px;">
                    <Plus />
                </el-icon>
                <div style="font-size: 17px;">Add plaque</div>
            </div>
        </div>
    </div>
    <el-dialog v-model="show_add_plaque_dialog" title="Add plaque" :width="screen_type == 'xs' ? '90%' : '50%'">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
            <el-button @click="router.push('qr-scan'); show_add_plaque_dialog = false;" icon="camera"
                style="margin: 10px 12px 10px 0px;">Scan Plaque QR
                Code</el-button>
            <el-button icon="plus" @click="createTestPlaque" :loading="add_test_plaque_loading"
                style="margin: 10px 0px 10px 0px;">Add test plaque
            </el-button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import PlaqueCard from '@/components/PlaqueCard.vue'
import { ref } from "vue";
import { usePlaqueStore } from "@/stores/plaque"
import { useRouter } from 'vue-router';
import { createPlaque } from "@/api/plaque"
import { Timestamp } from "firebase/firestore"
import { useAccountStore } from "@/stores/account"
import { ElMessage } from 'element-plus'
import useBreakpoints from "@/composables/breakpoints"

const add_test_plaque_loading = ref(false);
const { width, screen_type } = useBreakpoints();
const show_add_plaque_dialog = ref(false);
const router = useRouter();
const account_store = useAccountStore();

const plaque_store = usePlaqueStore();
const createTestPlaque = async () => {
    add_test_plaque_loading.value = true
    await createPlaque({
        name: "Test Plaque",
        wallet_address: account_store.get_account.entity.wallet_address,
        token_meta_id_list: [],
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
    }).catch(err =>
        ElMessage({ message: `Error creating test plaque- ${err}`, type: 'error', showClose: true, duration: 12000 })
    );
    add_test_plaque_loading.value = false;
    show_add_plaque_dialog.value = false;
}
</script>

<style scoped>
.add-button-container {
    display: inline-block;
    text-align: center;
    min-width: 410px;
    height: 180px;
    vertical-align: top;
    margin: 10px;
}

.add-button {
    height: 100px;
    width: 150px;
    border: 1px dashed;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

@media only screen and (max-width: 600px) {
  div.add-button-container {
    display: block;
    margin: 20px 10px 20px 10px;

    min-width: 250px !important;
  }
}
</style>
