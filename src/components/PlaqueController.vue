<template>
    <div>
        <div class="controller-buttons">
            <el-button circle text @click="sendCommand('playlist_previous')">
                <el-icon :size="25">
                    <DArrowLeft></DArrowLeft>
                </el-icon>
            </el-button>
            <el-button circle text  @click="sendCommand('play')">
                <el-icon :size="25">
                    <VideoPlay></VideoPlay>
                </el-icon>
            </el-button>
            <el-button circle text  @click="sendCommand('pause')">
                <el-icon :size="25">
                    <VideoPause></VideoPause>
                </el-icon>
            </el-button>
            <el-button circle text @click="sendCommand('playlist_next')">
                <el-icon :size="25">
                    <DArrowRight></DArrowRight>
                </el-icon>
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
import { computed } from "vue";
import { usePlaqueStore } from "@/stores/plaque"
import type { FirestoreDocument, Plaque, Command } from "@/types/types";
import { updatePlaque} from "@/api/plaque";
import { ElMessage } from 'element-plus'
import { showError } from "@/util/util";
import { Timestamp } from "@firebase/firestore";

const plaque_store = usePlaqueStore();

interface PlaqueControllerProps {
  plaque: FirestoreDocument<Plaque>;
}
const props = defineProps<PlaqueControllerProps>();

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
    const command: Command = {type: command_type, time_sent: Timestamp.now()};

    updatePlaque(props.plaque.id, { command: command})
      .then(() => {
        plaque_store.plaque_map[props.plaque.id].entity.command = command;
        ElMessage({
          type: 'success',
          message: 'Command sent to plaque',
        })
      })
      .catch((err) => {
        showError(`Error sending command to plaque - ${err}`);
      });
}
</script>

<style>
.controller-buttons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0px; 
}
</style>