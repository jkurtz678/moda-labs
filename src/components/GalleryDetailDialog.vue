<template>
    <div class="gallery-dialog">
        <el-dialog v-model="show_dialog" title="Edit Gallery" @close="router.push({ name: 'gallery-list' })" top="2vh"
            width="75%" :fullscreen="screen_type == 'xs'">
            <div style="max-width: 600px; margin: 0 auto;">
                <el-form ref="form_ref" :model="gallery" :rules="rules">
                    <el-form-item prop="name" style="max-width: 280px; margin-bottom: 2em;">
                        <div class="header">Gallery Name</div>
                        <el-input v-model="gallery.name" placeholder="Name" />
                    </el-form-item>
                    <el-tabs class="demo-tabs" type="border-card">
                        <el-tab-pane label="Users">
                            <el-row style="display: block; margin-bottom: 1em">
                                <el-table :data="account_list" style="width: 100%">
                                    <el-table-column prop="entity.email" label="Email" />
                                    <el-table-column label="Role">
                                        <template #default="scope">
                                            <div>{{gallery_user_list.find(gu => {return gu.user_id == scope.row.id})?.role || "not found"}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column fixed="right" label="" width="50">
                                        <template #default="scope">
                                            <div v-if="scope.$index && can_edit">
                                                <el-button link type="primary" size="small" icon="close"
                                                    @click="removeUser(scope.$index)">
                                                </el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div>{{ `Users in gallery: ${gallery_user_list.length}` }}</div>
                                <div  v-if="can_edit" style="display: flex; align-items: center; padding: 1em 0em; max-width: 350px;">
                                    <el-input v-model="add_user_email" placeholder="Email"></el-input>
                                    <el-button icon="Plus" color="#000000" size="small"
                                        style="margin-left: 1em;" @click="addUser">
                                        Add user
                                    </el-button>
                                </div>
                            </el-row>
                        </el-tab-pane>

                        <el-tab-pane label="Artwork">
                            <div>
                                <TokenSelectList v-model:selected_token_meta_id_list="gallery_token_meta_id_list"
                                    :token_meta_list="token_meta_list" :max_height="350">
                                </TokenSelectList>
                                <div>{{ `Artwork in gallery: ${gallery_token_meta_id_list.length}` }}</div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Plaques">
                            <div style="margin-bottom: 2em;">
                                <PlaqueSelectList v-model:selected_plaque_id_list="gallery_plaque_id_list"
                                    :plaque_list="plaque_list">
                                </PlaqueSelectList>
                                <div>{{ `Plaques in gallery: ${gallery_plaque_id_list.length}` }}</div>
                            </div>
                        </el-tab-pane>

                    </el-tabs>
                </el-form>
            </div>
            <template #footer>
                <div class="dialog-footer">

                    <div style="flex-grow: 1"></div>
                    <el-button v-if="can_edit" color="#000000" @click="handleSave(form_ref)" :loading="save_loading">Save</el-button>
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
import { type Gallery, type FirestoreDocument, type TokenMeta, type Account, type Plaque, TokenPlatform, type GalleryUser, type GalleryTokenMeta, type GalleryPlaque } from '@/types/types';
import { GalleryUserRole } from '@/types/types';
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
import { createGalleryUserList, deleteGalleryUsersByGalleryID } from '@/api/gallery-user';
import { createGalleryPlaqueList, deleteGalleryPlaquesByGalleryID } from '@/api/gallery-plaque';
import { createGalleryTokenMetaList, deleteGalleryTokenMetaByGalleryID } from '@/api/gallery-token';

const show_dialog = ref(true);
const gallery = ref<Gallery>({
    name: '',
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
});
const gallery_user_list = ref<GalleryUser[]>([]);
const gallery_plaque_id_list = ref<string[]>([]);
const gallery_token_meta_id_list = ref<string[]>([]);

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
    return gallery_user_list.value.map((gu) => {
        return loaded_accounts.value.find((account) => account.id == gu.user_id);
    })
});
const can_edit = computed(() => {
    if (account_store.is_user_admin) {
        return true;
    }
    const gallery_user = gallery_user_list.value.find(gu => gu.user_id == account_store.get_account.id)
    if (!gallery_user) {
        return false;
    }
    return gallery_user.role == GalleryUserRole.Owner || gallery_user.role == GalleryUserRole.Editor;
})
const plaque_list = computed(() => {
    return Object.values(plaque_store.plaque_map);
})
const token_meta_list = computed(() => {
    return Object.values(token_meta_store.all_token_metas).filter(t => t.entity.platform != TokenPlatform.Opensea)
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

        // load gallery data from the store
        gallery.value = g.entity;
        gallery_user_list.value = gallery_store.gallery_user_list
            .filter(gu => gu.entity.gallery_id == g.id)
            .sort((a, b) => {
                // Sort by role: owner > editor > reader
                if (a.entity.role === GalleryUserRole.Owner) {
                    return -1;
                } else if (b.entity.role === GalleryUserRole.Owner) {
                    return 1;
                } else if (a.entity.role === GalleryUserRole.Editor) {
                    return -1;
                } else if (b.entity.role === GalleryUserRole.Editor) {
                    return 1;
                } else {
                    return 0;
                }
            }).map(gu => gu.entity);
        gallery_plaque_id_list.value = gallery_store.gallery_plaque_list.filter(gp => gp.entity.gallery_id == g.id).map(gp => gp.entity.plaque_id);
        gallery_token_meta_id_list.value = gallery_store.gallery_token_meta_list.filter(gt => gt.entity.gallery_id == g.id).map(gt => gt.entity.token_meta_id);

        await getAccountByAccountIDList(gallery_user_list.value.map(gu => gu.user_id))
            .then((accounts) => {
                accounts.forEach((account) => {
                    loaded_accounts.value.push(account);
                })
            }).catch((err) => {
                showError(err);
            })

    } else { // new gallery
        loaded_accounts.value.push(account_store.get_account);
        const gallery_user = { user_id: account_store.get_account.id, role: GalleryUserRole.Owner, created_at: Timestamp.now(), updated_at: Timestamp.now(), gallery_id: "" }
        gallery_user_list.value = [gallery_user];
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

    let gallery_resp: FirestoreDocument<Gallery> | null;
    // if we have a gallery_id param we are updating an existing one
    if (route.params.gallery_id) {
        gallery_resp = await updateGallery(route.params.gallery_id as string, gallery.value)
            .catch((err) => {
                showError(err);
                return null
            })
    } else {
        gallery_resp = await saveGallery(gallery.value).catch((err) => {
            showError(`Error saving gallery: ${err}`);
            return null
        })
    }
    if (!gallery_resp) {
        showError(`Error saving gallery`);
        return;
    }
    const db_gallery: FirestoreDocument<Gallery> = gallery_resp

    // if its an existing gallery delete all existing gallery users, plaques, and token metas
    if (route.params.gallery_id) {
        await Promise.all([
            deleteGalleryUsersByGalleryID(db_gallery.id),
            deleteGalleryPlaquesByGalleryID(db_gallery.id),
            deleteGalleryTokenMetaByGalleryID(db_gallery.id),
        ])
    }

    gallery_user_list.value.forEach((gu) => {
        gu.gallery_id = db_gallery.id;
        gu.created_at = Timestamp.now();
        gu.updated_at = Timestamp.now();
    })

    const save_gallery_user_promise = createGalleryUserList(gallery_user_list.value);
    const save_gallery_plaque_promise = createGalleryPlaqueList(gallery_plaque_id_list.value.map((plaque_id) => {
        return {
            gallery_id: db_gallery.id,
            plaque_id: plaque_id,
            created_at: Timestamp.now(),
            updated_at: Timestamp.now(),
        }
    }));
    const save_gallery_token_meta_promise = createGalleryTokenMetaList(gallery_token_meta_id_list.value.map((token_meta_id) => {
        return {
            gallery_id: db_gallery.id,
            token_meta_id: token_meta_id,
            created_at: Timestamp.now(),
            updated_at: Timestamp.now(),
        }
    }));


    Promise.all([save_gallery_user_promise, save_gallery_plaque_promise, save_gallery_token_meta_promise]).then((resp_list) => {
        const db_gallery_user_list = resp_list[0];
        const db_gallery_plaque_list = resp_list[1];
        const db_gallery_token_meta_list = resp_list[2];

        gallery_store.addGalleryToStore(db_gallery, db_gallery_user_list, db_gallery_plaque_list, db_gallery_token_meta_list);

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
                gallery_user_list.value.push({gallery_id: "", user_id: account.id, role: GalleryUserRole.Reader, created_at: Timestamp.now(), updated_at: Timestamp.now()});
            }
        }).catch((error) => {
            console.log(error);
            showError(`Invalid email`);
        })
}

const removeUser = (i: number) => {
    gallery_user_list.value.splice(i, 1);
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
    font-weight: bold;
}

.gallery-dialog {
    position: relative;
    height: 90%;
}

:deep(.el-dialog__body) {
    padding: 10px calc(var(--el-dialog-padding-primary) + 5px) 30px;
    position: relative;
    border-top: 1px solid #dcdfe6;
    max-height: 80vh;
    overflow-y: scroll;
}

:deep(.el-dialog.add-dialog) {
    height: auto;
    overflow-y: auto;
    margin: 4vh auto;
}

:deep(.el-table .cell) {
    padding: 0px 0px;
}
</style>