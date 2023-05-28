<template>
    <div>
        <div class="controller-buttons">
            <el-button circle text :loading="previous_loading" icon="DArrowLeft"
                @click="previous_loading = true; sendCommand('playlist_previous')">
            </el-button>
            <el-button circle text :loading="play_loading" icon="VideoPlay"
                @click="play_loading = true; sendCommand('play')">
            </el-button>
            <el-button circle text icon="VideoPause" :loading="pause_loading"
                @click="pause_loading = true; sendCommand('pause')">
            </el-button>
            <el-button circle text icon="DArrowRight" :loading="next_loading"
                @click="next_loading = true; sendCommand('playlist_next')">
            </el-button>
        </div>
        <!-- <div class="controller-buttons"> 
            <el-button circle text>
                <el-icon :size="25">
                    <RefreshLeft></RefreshLeft>
                </el-icon>
            </el-button>
            <el-button circle text>
                <el-icon :size="25">
                    <RefreshRight></RefreshRight>
                </el-icon>
            </el-button>
            <el-button circle text style="visibility: hidden;">
                <el-icon :size="25">
                    <RefreshRight></RefreshRight>
                </el-icon>
            </el-button>
            <el-button circle text style="visibility: hidden;">
                <el-icon :size="25">
                    <RefreshRight></RefreshRight>
                </el-icon>
            </el-button>
        </div> -->
        <el-radio-group v-model="orientation"
            style="display: flex; flex-direction: column; align-items: start; margin-top: 20px;">
            <el-radio label="landscape" size="small">Landscape</el-radio>
            <el-radio label="portrait" size="small">Portrait</el-radio>
            <el-radio label="landscape_reversed" size="small">Landscape Reversed</el-radio>
            <el-radio label="portrait_reversed" size="small">Portrait Reversed</el-radio>
        </el-radio-group>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { usePlaqueStore } from "@/stores/plaque"
import type { FirestoreDocument, Plaque, Command } from "@/types/types";
import { updatePlaque } from "@/api/plaque";
import { ElMessage } from 'element-plus'
import { showError } from "@/util/util";
import { Timestamp } from "@firebase/firestore";

const plaque_store = usePlaqueStore();

interface PlaqueControllerProps {
    plaque: FirestoreDocument<Plaque>;
}
const props = defineProps<PlaqueControllerProps>();

const previous_loading = ref<boolean>(false);
const play_loading = ref<boolean>(false);
const pause_loading = ref<boolean>(false);
const next_loading = ref<boolean>(false);

const orientation = computed({
    get: () => {
        return props.plaque.entity.orientation || "landscape";
    },
    set: (value) => {
        updatePlaque(props.plaque.id, { orientation: value })
            .then(() => {
                plaque_store.plaque_map[props.plaque.id].entity.orientation = value;
                ElMessage({
                    type: 'success',
                    message: 'Plaque orientation updated',
                })
            })
            .catch((err) => {
                showError(`Error updating plaque orientation - ${err}`);
            });
    },
});

const sendCommand = (command_type: string) => {
    const command: Command = { type: command_type, time_sent: Timestamp.now() };

    updatePlaque(props.plaque.id, { command: command })
        .then(() => {
            plaque_store.plaque_map[props.plaque.id].entity.command = command;
            ElMessage({
                type: 'success',
                message: 'Command sent to plaque',
            })
        })
        .catch((err) => {
            showError(`Error sending command to plaque - ${err}`);
        }).finally(() => {
            previous_loading.value = false;
            play_loading.value = false;
            pause_loading.value = false;
            next_loading.value = false;
        })
}
</script>

<style scoped>
.controller-buttons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0px;
}

::v-deep(.el-icon) {
    font-size: 25px;
}

::v-deep(.el-radio.el-radio--small .el-radio__label){
    font-size: 15px;
}
</style>