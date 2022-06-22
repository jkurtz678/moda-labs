<template>
    <el-dialog v-model="show_dialog" title="Submit Moda Archives" top="2vh" :fullscreen="screen_type == 'xs'"
        width="75%">
        <SubmitTokenForm></SubmitTokenForm>
    </el-dialog>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import SubmitTokenForm from "./SubmitTokenForm.vue";
import useBreakpoints from "@/composables/breakpoints";
const show_dialog = ref(false);
const { width, screen_type } = useBreakpoints();
</script>