
<template>
    <el-dialog class="box-dialog" center v-model="show_dialog" width="530px"
        close-on-click-modal="false">
        <el-card class="box-card" shadow="never">
            <!-- <AddTokenItem :detail="i" v-for="i in allItems"></AddTokenItem> -->
            <hr class="hr" />
        </el-card>
        <template #footer>
            <span class="dialog-footer">
                <el-button>Clear</el-button>
                <el-button type="info">Done</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import {computed} from "vue";
import AddTokenItem from './AddTokenItem.vue';
interface PlaqueItemProps {
  show_add_token_dialog: boolean;
}

const props = defineProps<PlaqueItemProps>();
const emit = defineEmits(['update:show_add_token_dialog'])

const show_dialog = computed({
  get() {
    return props.show_add_token_dialog
  },
  set(value) {
    emit('update:show_add_token_dialog', value)
  }
})

</script>