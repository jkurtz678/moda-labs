<template>
  <el-card>
    <div style="display: flex; align-items: center; padding:1em">
      <h1 v-if="!edit_plaque_name"> {{ props.plaque.entity.name }}</h1>
      <input v-else v-model="props.plaque.entity.name" class="edit-name-input" />
      <el-button :icon="Edit" v-if="!edit_plaque_name" @click="edit_plaque_name = true" class="editIcon" circle />
      <el-button :icon="Select" v-if="edit_plaque_name" :loading="edit_loading" @click="updatePlaqueName" class="editIcon"
        circle :type="edit_loading ? '' : 'success'" text />
      <div style="flex-grow: 1" />
      <el-tooltip class="box-item" effect="dark" :content="`Last activity ${last_check_in_time_formatted}`"
        placement="top">
        <el-tag v-if="is_online" class="ml-2" type="success">online</el-tag>
        <el-tag v-else class="ml-2" type="danger">offline</el-tag>
      </el-tooltip>

    </div>
    <el-collapse-transition>
      <section v-show="plaque_view == 'simple'" class="card-simple">
        <hr>
        <el-row style="padding:1em">
          <el-col :span="12">
            <div style="font-size: var(--el-font-size-extra-small)">title</div>
            <span>{{ first_token?.entity.name || "N/A" }}</span>
          </el-col>
          <el-col :span="12">
            <div style="font-size: var(--el-font-size-extra-small)">artist</div>
            {{ first_token?.entity.artist || "N/A" }}
          </el-col>
        </el-row>
        <div style="padding:0.3em 1em">{{ `Total artworks: ${plaque.entity.token_meta_id_list.length}` }}</div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-right: 1em; padding: 1em;">
          <el-button type="info" @click="show_add_token_dialog = true">Add Artwork</el-button>
          <el-button @click="plaque_view = 'detail'">
            Details<el-icon class="el-icon--right">
              <ArrowRight />
            </el-icon>
          </el-button>
        </div>
      </section>
    </el-collapse-transition>
    <el-collapse-transition>
      <section v-if="plaque_view == 'detail'" class="card-detail">
        <p style="padding:0 1em;">{{ `Total artworks: ${plaque.entity.token_meta_id_list.length}` }}</p>
        <div style="display: flex; align-items: center; justify-content: space-between;padding: 0.5em 1em;">
          <el-button @click="plaque_view = 'settings'">Settings</el-button>
          <el-button @click="clearTokens">Clear Artwork</el-button>
        </div>
        <hr />
        <template v-if="plaque_tokens.length == 0">
          <div style="padding: 1em;">No artwork added</div>
          <hr />

        </template>
        <PlaqueTokenItem :token_meta="meta" v-for="meta in plaque_tokens" />
        <div style="display: flex; padding: 1em;">
          <el-button type="info" @click="show_add_token_dialog = true">Add Artwork</el-button>
          <div style="flex-grow: 1"></div>
          <el-button @click="plaque_view = 'simple'">Close<el-icon class="el-icon--right">
              <Close />
            </el-icon>
          </el-button>
        </div>
      </section>
    </el-collapse-transition>
    <el-collapse-transition>
      <section v-if="plaque_view == 'settings'" style="padding: 1em;">
        <!-- <div style="display: flex; justify-content: space-between;">
          <el-button>Preview Art</el-button>
          <el-button @click="previewPlaque">Preview
            Plaque</el-button>
        </div> -->
        <PlaqueController :plaque="props.plaque"></PlaqueController>
        <div style="padding: 1em 0em; display: flex; justify-content: space-between; align-items: center;">
          <div v-if="plaque.entity.user_id">
            <div style="font-size: var(--el-font-size-extra-small)">Associated User</div>
            <div v-if="user_email">{{ user_email }}</div>
            <div v-else>Loading...</div>
            <div style="font-size: var(--el-font-size-extra-small)">{{ plaque.entity.user_id }}</div>
          </div>
          <div v-else>No associated user</div>
          <el-button v-if="plaque.entity.user_id" type="danger" plain @click="forgetPlaque">Forget Display</el-button>
          <!-- <el-button v-if="!plaque.entity.user_id && (!plaque.entity.token_meta_id_list || plaque.entity.token_meta_id_list.length === 0)" type="danger" plain @click="deleteEmptyPlaque">Delete Plaque</el-button> -->
        </div>
        <div style="margin-bottom: 1em;">
          <div style="font-size: var(--el-font-size-extra-small)">Machine Info</div>
          <div>Machine name: {{ plaque.entity.machine_data?.machine_name ?? "N/A" }}</div>
          <div>Version: {{ plaque.entity.machine_data?.version ?? "N/A" }}</div>
          <div>Local IP: {{ plaque.entity.machine_data?.local_ip ?? "N/A" }}</div>
          <div>Public IP: {{ plaque.entity.machine_data?.public_ip ?? "N/A" }}</div>
          <div>Updated At: {{ machine_data_updated_at }}</div>
          <div>Free Space: {{ plaque.entity.free_space ? mediaSizeDisplay(plaque.entity.free_space) : "N/A" }}</div>
        </div>

        <div v-if="account_store.is_user_admin" style="margin-bottom: 1em">
          <div class="caption">Admin only commands</div>
          <div style="margin-bottom: 1em">
            <el-button plain @click="downloadLogsCommand" :loading="download_logs_loading">Upload Logs To
              Cloud</el-button>
            <el-button plain @click="show_logs_dialog = true">View Logs</el-button>
          </div>
          <div style="margin-bottom: 1em">
            <el-button plain @click="extendDisplayCommand" :loading="extend_display_loading">Extend Display</el-button>
            <el-button plain @click="mirrorDisplayCommand" :loading="mirror_display_loading">Mirror Display</el-button>
          </div>
          <div style="margin-bottom: 1em">
            <el-button type="danger" plain @click="restartAppCommand" :loading="restart_app_loading">Restart
              App</el-button>
            <el-button type="danger" plain @click="restartMachineCommand" :loading="restart_machine_loading">Restart
              Machine</el-button>
          </div>
          <div style="margin-bottom: 1em">
            <el-button type="danger" plain @click="clearMediaFilesCommand" :loading="clear_media_files_loading">
              Clear Media Files</el-button>
          </div>
          <el-dialog v-model="show_logs_dialog" title="Uploaded Logs" width="75%">
            <el-table :data="plaque.entity.uploaded_log_files">
              <el-table-column prop="file_name" label="File Name" width="400"></el-table-column>
              <el-table-column prop="upload_time" label="Time Uploaded">
                <template #default="{ row }">
                  {{ formatTime(row.upload_time) }}
                </template>
              </el-table-column>
              <el-table-column prop="bytes" label="Size">
                <template #default="{ row }">
                  {{ mediaSizeDisplay(row.bytes) }}
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="" width="80">
                <template #default="{ row }">
                  <el-button icon="Download" text circle @click="downloadLogs(row.file_name)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
          <div style="margin-top: 1em">
            <div class="caption">Enable Support VPN</div>
            <el-switch v-model="vpn_active" active-text="Enabled" inactive-text="Off" />
          </div>
        </div>
        <div style="display: flex; justify-content: end;">
          <el-button @click="plaque_view = 'detail'">Close<el-icon class="el-icon--right">
              <Close />
            </el-icon>
          </el-button>
        </div>
      </section>
    </el-collapse-transition>

    <AddTokenDialog :plaque_id="props.plaque.id" v-model:show_add_token_dialog="show_add_token_dialog"></AddTokenDialog>

  </el-card>
</template>
<script setup lang="ts">
import { computed, watch } from "vue";
import type { Command, FirestoreDocument, Plaque, TokenMeta } from "@/types/types";
import AddTokenDialog from './AddTokenDialog.vue';
import PlaqueController from './PlaqueController.vue';
import PlaqueTokenItem from "./PlaqueTokenItem.vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from "vue";
import { updatePlaque, deletePlaqueByID } from "@/api/plaque";
import { useTokenMetaStore } from "../stores/token-meta";
import { useRouter } from 'vue-router';
import { isPlaqueOnline, mediaSizeDisplay, showError } from "@/util/util";
import { usePlaqueStore } from "@/stores/plaque"
import { useAccountStore } from "@/stores/account"
import {
  Edit,
  Select,
  Loading
} from '@element-plus/icons-vue'
import { getAccountByID } from "@/api/account";
import { Timestamp } from "firebase/firestore";
import type { el } from "element-plus/es/locale";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";

interface PlaqueCardProps {
  plaque: FirestoreDocument<Plaque>;
}
const props = defineProps<PlaqueCardProps>();
const plaque_store = usePlaqueStore();
const router = useRouter();
const plaque_view = ref("simple"); // 3 modes - 'simple', 'detail', 'settings'
const show_add_token_dialog = ref(false);
const edit_plaque_name = ref(false);
const user_email = ref("");
const edit_loading = ref(false);
const download_logs_loading = ref(false);
const restart_machine_loading = ref(false);
const restart_app_loading = ref(false);
const show_logs_dialog = ref(false);
const extend_display_loading = ref(false);
const mirror_display_loading = ref(false);
const clear_media_files_loading = ref(false);

const sample_file_list = [{ file_name: "mKMwEFebeBaA6MM3NUxj-20231214074903.log", bytes: 57167794, upload_time: Timestamp.now() }]

const updatePlaqueName = async () => {
  edit_loading.value = true;
  await updatePlaque(props.plaque.id, { name: props.plaque.entity.name }).catch(err => {
    showError(`Error updating plaque tokens - ${err}`)
  })
  edit_plaque_name.value = false;
  edit_loading.value = false;
}
const account_store = useAccountStore()
const token_meta_store = useTokenMetaStore()

interface TokenMetaMap {
  [id: string]: FirestoreDocument<TokenMeta>;
}
// first_token is the token visible on the simple view of the plaque card
const first_token = computed(() => {
  if (plaque_tokens.value.length == 0) {
    return null
  }
  return plaque_tokens.value[0];
})
const plaque_tokens = computed(() => {
  const token_map = token_meta_store.all_token_metas;
  let res = props.plaque.entity.token_meta_id_list.map(token_id => token_map[token_id])
  return res;
})

// plaque is considered online if it has last_check_in_time that is newer than 2 hours
const is_online = computed(() => {
  return isPlaqueOnline(props.plaque)
})

const last_check_in_time_formatted = computed(() => {
  const last_check_in_time = props.plaque.entity.last_check_in_time
  if (!last_check_in_time) {
    return "N/A"
  }
  const date = new Date(last_check_in_time.seconds * 1000)
  return date.toLocaleString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
})

const formatTime = (firebase_timestamp: Timestamp): string => {
  const date = new Date(firebase_timestamp.seconds * 1000)
  return date.toLocaleString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}

const clearTokens = () => {
  ElMessageBox.confirm(`Are you sure you want to clear tokens for plaque '${props.plaque.entity.name}'?`, "Clear tokens", {
    type: 'warning'
  }).then(() => {
    updatePlaque(props.plaque.id, { token_meta_id_list: [] })
      .then(() => {
        plaque_store.plaque_map[props.plaque.id].entity.token_meta_id_list = [];
        ElMessage({
          type: 'success',
          message: 'Tokens cleared',
        })
      })
      .catch((err) => {
        ElMessage({ message: `Error clearing tokens from plaque - ${err}`, type: 'error', showClose: true, duration: 12000 });
      })
  })
}

const forgetPlaque = () => {
  ElMessageBox.confirm(`Are you sure you want to forget the plaque named '${props.plaque.entity.name}'?`, "Forget plaque", {
    type: 'warning'
  }).then(() => {
    updatePlaque(props.plaque.id, { user_id: "", token_meta_id_list: [] })
      .then(() => {
        plaque_store.plaque_map[props.plaque.id].entity.user_id = "";
        plaque_store.plaque_map[props.plaque.id].entity.token_meta_id_list = [];
        ElMessage({
          type: 'success',
          message: 'Plaque forgotten',
        })
      })
      .catch((err) => {
        ElMessage({ message: `Error forgetting plaque - ${err}`, type: 'error', showClose: true, duration: 12000 });
      })
  })
}
const previewPlaque = () => {
  const link = router.resolve({ name: 'preview-plaque', params: { plaque_id: props.plaque.id } });
  window.open(link.href);
}
const deleteEmptyPlaque = () => {
  ElMessageBox.confirm(`Are you sure you want to delete the plaque named '${props.plaque.entity.name}'?`, "Delete plaque", {
    type: 'warning'
  }).then(() => {
    deletePlaqueByID(props.plaque.id)
      .then(() => {
        delete plaque_store.plaque_map[props.plaque.id];
        ElMessage({
          type: 'success',
          message: 'Plaque deleted',
        })
      })
      .catch((err) => {
        ElMessage({ message: `Error deleting empty plaque - ${err}`, type: 'error', showClose: true, duration: 12000 });
      })
  })
}

watch(plaque_view, (v) => {
  if (v == "settings" && props.plaque.entity.user_id && !user_email.value) {
    getAccountByID(props.plaque.entity.user_id).then((account) => {
      user_email.value = account.entity.email
    })
      .catch((err) => {
        ElMessage({ message: `Error loading user account - ${err}`, type: 'error', showClose: true, duration: 12000 });
      })
  }
})

const vpn_active = computed({
  get: () => {
    return Boolean(props.plaque.entity.vpn_active);
  },
  set: (value) => {
    updatePlaque(props.plaque.id, { vpn_active: value })
      .then(() => {
        plaque_store.plaque_map[props.plaque.id].entity.vpn_active = value;
        ElMessage({
          type: 'success',
          message: 'VPN setting updated',
        })
      })
      .catch((err) => {
        showError(`Error updating VPN setting- ${err}`);
      });
  }
})

const machine_data_updated_at = computed(() => {
  const timestamp = props?.plaque?.entity?.machine_data?.updated_at
  if (!timestamp) {
    return "N/A"
  }
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

  return date.toLocaleString();
})

const downloadLogsCommand = () => {
  const command: Command = { type: "upload_logs", time_sent: Timestamp.now() };
  download_logs_loading.value = true;

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
      download_logs_loading.value = false;
    })
}

const restartMachineCommand = () => {
  ElMessageBox.confirm(`Are you sure you want to restart the plaque '${props.plaque.entity.name}'?`, "Restart plaque", {
    type: 'warning'
  }).then(() => {
    const command: Command = { type: "restart_machine", time_sent: Timestamp.now() };
    restart_machine_loading.value = true;
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
        restart_machine_loading.value = false;
      })
  })
}

const restartAppCommand = () => {
  ElMessageBox.confirm(`Are you sure you want to restart the app on plaque '${props.plaque.entity.name}'?`, "Restart app", {
    type: 'warning'
  }).then(() => {
    const command: Command = { type: "restart_app", time_sent: Timestamp.now() };
    restart_app_loading.value = true;
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
        restart_app_loading.value = false;
      })
  })
}

const sendPlaqueCommand = (plaque_id: string, command: Command): Promise<void> => {
  return updatePlaque(plaque_id, { command: command })
    .then(() => {
      plaque_store.plaque_map[plaque_id].entity.command = command;
      ElMessage({
        type: 'success',
        message: 'Command sent to plaque',
      })
    })
    .catch((err) => {
      showError(`Error sending command to plaque - ${err}`);
    })
}

const extendDisplayCommand = () => {
  const command: Command = { type: "display_extend", time_sent: Timestamp.now() };
  extend_display_loading.value = true;
  sendPlaqueCommand(props.plaque.id, command).finally(() => {
    extend_display_loading.value = false;
  })
}

const mirrorDisplayCommand = () => {
  const command: Command = { type: "display_mirror", time_sent: Timestamp.now() };
  mirror_display_loading.value = true;
  sendPlaqueCommand(props.plaque.id, command).finally(() => {
    mirror_display_loading.value = false;
  })
}

const clearMediaFilesCommand = async () => {
  ElMessageBox.confirm(`Are you sure you want to clear all media files on this plaque? They files will have to be redownloaded if you want to play them again.`, "Clear files", {
    type: 'warning'

  }).then(async () => {
    clear_media_files_loading.value = true;
    // first clear playlist
    await updatePlaque(props.plaque.id, { token_meta_id_list: [] }).catch(err => {
      showError(`Error clearing media files - ${err}`)
    })

    // wait for 3 seconds to give time for the plaque to clear the files
    await setTimeout(() => { }, 3000); 

    const command: Command = { type: "clear_media_files", time_sent: Timestamp.now() };
    sendPlaqueCommand(props.plaque.id, command).finally(() => {
      clear_media_files_loading.value = false;
    })
  })

}

const downloadLogs = async (file_name: string) => {
  const storage = getStorage();

  const path = `viewer-logs/${file_name}`
  const path_ref = storageRef(storage, path);
  try {
    const url = await getDownloadURL(path_ref)
    window.open(url, '_blank');
    return;
  } catch (err) {
    console.log(`downloadLogs - failed to download logs for ${file_name}`, err)
    showError(`Error downloading logs - ${err}`)
  }
  return ""
}
</script>

<style scoped>
.el-card {
  --el-card-padding: 0px;
  margin: 10px;
  border-radius: 18px;
  min-width: 410px;
  display: inline-block;
  vertical-align: top;
  text-align: left;
}

.box-card {
  --el-card-padding: 0px;
  width: 480px;
  border-radius: 0px;
  text-align: left;
  background-color: none;
  padding: 0px;
}

.image {
  width: 100%;
  display: block;
  padding-right: 1em;
}

.el-dialog__body {
  padding: 0 !important;
}

.box-dialog {
  --el-dialog-padding-primary: 10px 0px 10px 0px;
}

el-card__body {
  padding: 0 !important;
}

.edit-name-input {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid black;
  padding: 0 2px;
  font-size: 1.5em;
}

.editIcon {
  margin: 0 1px;
  border: none;
}

span {
  overflow-wrap: break-word;
}

@media only screen and (max-width: 600px) {
  div.el-card {
    display: block;
    margin: 12px 0px 12px 0px;
    min-width: 250px !important;
  }
}

.caption {
  font-size: var(--el-font-size-extra-small)
}
</style>
