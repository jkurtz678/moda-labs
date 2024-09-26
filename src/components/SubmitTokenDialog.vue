<template>
    <el-dialog v-model="show_dialog" title="Submit To Moda Archives" top="2vh" :fullscreen="screen_type == 'xs'" style="max-width: 900px" @close="router.back()" :width="screen_type != 'xs' ? '80%' : '100%'">
        <SubmitTokenForm :token_meta_id="(route.params.token_meta_id as string)"></SubmitTokenForm>
    </el-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import SubmitTokenForm from "./SubmitTokenForm.vue";
import useBreakpoints from "@/composables/breakpoints";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const show_dialog = ref(true);
const { screen_type } = useBreakpoints();
</script>