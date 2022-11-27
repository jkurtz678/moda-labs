<template>
    <div class="gallery-dialog">
        <el-dialog v-model="show_dialog" title="Edit Gallery" @close="router.push({ name: 'gallery-list' })" top="2vh"
            width="60%" :fullscreen="screen_type == 'xs'">
            <el-form ref="form_ref" :model="gallery" :rules="rules">
                <el-form-item prop="name" style="max-width: 280px; margin-bottom: 2em;">
                    <div>Gallery Name</div>
                    <el-input v-model="gallery.name" placeholder="Name" />
                </el-form-item>
                <el-row style="display: block; margin-bottom: 2em;">
                    <div class="header">Users</div>
                    <el-table :data="account_list" style="width: 100%">
                        <el-table-column prop="entity.email" label="Email" />
                        <el-table-column fixed="right" label="" width="50">
                            <template #default="scope">
                                <div v-if="scope.$index">
                                    <el-button link type="primary" size="small" icon="close"
                                        @click="removeUser(scope.$index)">
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div>{{ `Users in gallery: ${gallery.user_id_list.length}` }}</div>
                    <div style="display: flex; align-items: center; padding: 1em 0em; max-width: 350px;">
                        <el-input v-model="add_user_email" placeholder="Email"></el-input>
                        <el-button icon="Plus" color="#000000" size="small" style="margin-left: 1em;" @click="addUser">
                            Add user
                        </el-button>
                    </div>
                </el-row>
                <div style="margin-bottom: 2em;">
                    <div class="header">Plaque</div>
                    <PlaqueSelectList v-model:selected_plaque_id_list="gallery.plaque_id_list"
                        :plaque_list="plaque_list">
                    </PlaqueSelectList>
                    <div>{{ `Plaques in gallery: ${gallery.plaque_id_list.length}` }}</div>
                </div>
                <div>
                    <div class="header">Artwork</div>
                    <TokenSelectList v-model:selected_token_meta_id_list="gallery.token_meta_id_list"
                        :token_meta_list="token_meta_list">
                    </TokenSelectList>
                    <div>{{ `Artwork in gallery: ${gallery.token_meta_id_list.length}` }}</div>
                </div>
            </el-form>
            <template #footer>
                <div class="dialog-footer">

                    <div style="flex-grow: 1"></div>
                    <el-button color="#000000" @click="handleSave(form_ref)">Save</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
import { useTokenMetaStore } from '@/stores/token-meta';
import { getAccountByAccountIDList, getAccountByEmail } from "@/api/account";
import { saveGallery, updateGallery } from "@/api/gallery";
import type { Gallery, FirestoreDocument, TokenMeta, Account, Plaque } from '@/types/types';
import { Timestamp } from '@firebase/firestore';
import { ElMessage, ElTable, type FormInstance, type FormRules } from 'element-plus';
import { computed, onMounted, reactive, ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showError } from '@/util/util';
import { useGalleryStore } from '@/stores/gallery';
import useBreakpoints from '@/composables/breakpoints';
import { usePlaqueStore } from '@/stores/plaque';
import TokenSelectList from "./TokenSelectList.vue";
import PlaqueSelectList from './PlaqueSelectList.vue';

const show_dialog = ref(true);
const gallery = ref<Gallery>({
    name: '',
    user_id_list: [],
    plaque_id_list: [],
    token_meta_id_list: [],
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
});
const form_ref = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [{ required: true, message: "Required", trigger: "blur" }],
});

const save_loading = ref(false);
const add_user_email = ref("");

const router = useRouter();
const route = useRoute();

const account_store = useAccountStore();
const plaque_store = usePlaqueStore();
const gallery_store = useGalleryStore();
const token_meta_store = useTokenMetaStore();
const { screen_type } = useBreakpoints();

// table lists
const loaded_accounts = ref<FirestoreDocument<Account>[]>([]);
const account_list = computed(() => {
    return gallery.value.user_id_list.map((id) => {
        return loaded_accounts.value.find((account) => account.id == id);
    })
});
const plaque_list = computed(() => {
    return Object.values(plaque_store.plaque_map);
})
const token_meta_list = computed(() => {
    return Object.values(token_meta_store.all_token_metas);
})

onMounted(async () => {
    // editing a existing gallery
    if (route.params.gallery_id) {
        const g = gallery_store.gallery_list.find(g => g.id === route.params.gallery_id)
        if (!g) {
            showError("Gallery not found");
            router.push({ name: "gallery-list" });
            return;
        }
        gallery.value = g.entity;
        console.log("gallery.value", gallery.value)
        await getAccountByAccountIDList(gallery.value.user_id_list)
            .then((accounts) => {
                console.log("accounts");
                accounts.forEach((account) => {
                    loaded_accounts.value.push(account);
                })
            }).catch((err) => {
                showError(err);
            })

    } else { // new gallery
        loaded_accounts.value.push(account_store.get_account);
        gallery.value.user_id_list = [account_store.get_account.id];
    }
})

const handleSave = async (form_el: FormInstance | undefined) => {
    if (!form_el) {
        showError(`Error finding form element`);
        return;
    }
    const valid = await form_el.validate((v) => v);
    if (!valid) {
        return;
    }

    save_loading.value = true;

    // if we have a gallery_id param we are updating an existing one
    if (route.params.gallery_id) {
        await updateGallery(route.params.gallery_id as string, gallery.value)
            .then(() => {
                ElMessage.success("Gallery updated");
                router.push({ name: "gallery-list" });
            }).catch((err) => {
                showError(err);
            }).finally(() => {
                save_loading.value = false;
            })
        return;
    }
    saveGallery(gallery.value)
        .then(() => {
            ElMessage({
                message: 'Gallery saved',
                type: 'success',
            });
            router.push({ name: 'gallery-list' });
        }).catch((err) => {
            showError(`Error saving gallery: ${err}`);
        }).finally(() => {
            save_loading.value = false;
        });


}

const addUser = async () => {
    // error if email already in list
    if (loaded_accounts.value.find((account) => account.entity.email === add_user_email.value)) {
        showError("User already added");
        return;
    }


    await getAccountByEmail(add_user_email.value)
        .then((account) => {
            if (account) {
                loaded_accounts.value.push(account);
                gallery.value.user_id_list.push(account.id);
            }
        }).catch((error) => {
            console.log(error);
            showError(`Invalid email`);
        })
}

const removeUser = (i: number) => {
    gallery.value.user_id_list.splice(i, 1);
    loaded_accounts.value.splice(i, 1);
}

</script>

<style scoped>
.dialog-footer {
    display: flex;
    align-items: center;
}

.header {
    font-size: var(--el-font-size-large);
}

.gallery-dialog {
    position: relative;
    height: 90%;
}

:deep(.el-dialog__body) {
    padding: 10px calc(var(--el-dialog-padding-primary) + 5px) 30px;
    position: relative;
    border-top: 1px solid #dcdfe6;
    max-height: 75vh;
    overflow-y: scroll;
}

:deep(.el-dialog.add-dialog) {
    height: auto;
    overflow-y: auto;
    margin: 4vh auto;
}
</style>