<template>
    <div class='subheader' style="display: flex; align-items: center;" :style="screen_type=='xs' ? 'padding: 0px 8px 10px;' : ''">
        <el-input v-model="search_filter" :prefix-icon="Search" placeholder="Search plaques" style="max-width: 350px"
            clearable></el-input>
        <el-popover placement="bottom" title="Plaque Filters" :width="300" trigger="click">
            <template #reference>
                <el-button icon="Filter" style="margin-left: 10px;" type="info" size="small">Filters</el-button>
            </template>
            <div style="font-size: var(--el-font-size-extra-small)">Filter by gallery</div>
            <el-select v-model="filter_by_gallery" placeholder="Filter by gallery" style="width: 260px; margin-bottom: 12px;">
                <el-option :label="'All plaques'" value="" />
                <el-option v-for="gallery in gallery_store.gallery_list" :key="gallery.id"
                    :label="`${gallery.entity.name}`" :value="gallery.id" />
            </el-select>
            <div style="font-size: var(--el-font-size-extra-small);">Online only</div>
            <el-switch v-model="online_filter" style="margin-bottom: 1em;"/>

            <div class="caption">Sort order</div>
            <el-select v-model="sort_order" placeholder="Sort by" class="filter-select">
                <el-option label="Sort by name" value="name"></el-option>
                <el-option label="Sort by last activity" value="last_check_in_time"></el-option>
            </el-select>
        </el-popover>
        <el-button icon="Camera" type="info" @click="router.push('qr-scan')" style="margin-left: 10px;"
            size="small">Scan</el-button>
    </div>
    <div style="padding-bottom: 90px;"></div>
    <PlaqueCard :plaque="plaque" v-for="plaque in filtered_plaques" :key="plaque.id" />
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
    <el-dialog v-model="show_add_plaque_dialog" title="Add plaque" :width="screen_type == 'xs' ? '90%' : '50%'"
        style="max-width: 500px;">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
            <el-button @click="router.push('qr-scan'); show_add_plaque_dialog = false;" icon="camera" color="#000000"
                style="margin: 10px 12px 10px 0px;">Scan Plaque QR
                Code</el-button>
            <el-button icon="plus" @click="createTestPlaque" :loading="add_test_plaque_loading"
                style="margin: 10px 0px 10px 0px;" color="#000000">Add test plaque
            </el-button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import PlaqueCard from '@/components/PlaqueCard.vue'
import { ref, computed, watch } from "vue";
import { usePlaqueStore } from "@/stores/plaque"
import { useRouter } from 'vue-router';
import { createPlaque } from "@/api/plaque"
import { Timestamp } from "firebase/firestore"
import { useAccountStore } from "@/stores/account";
import { useGalleryStore } from "@/stores/gallery";
import { ElMessage } from 'element-plus'
import useBreakpoints from "@/composables/breakpoints"
import { OrientationType, type FirestoreDocument, type Plaque } from "@/types/types"
import { Search } from '@element-plus/icons-vue'
import { isPlaqueOnline } from '@/util/util';

const add_test_plaque_loading = ref(false);
const { screen_type } = useBreakpoints();
const show_add_plaque_dialog = ref(false);
const router = useRouter();
const account_store = useAccountStore();
const gallery_store = useGalleryStore();

/* plaque filters */
const search_filter = ref("")

const filter_by_gallery = ref<string>(localStorage.getItem('plaque_list_filter_by_gallery') || "")
watch(filter_by_gallery, (newVal) => {
    localStorage.setItem('plaque_list_filter_by_gallery', newVal)
})
const online_filter = ref<boolean>(localStorage.getItem('online_filter') === 'true' || false);
watch(online_filter, (newVal) => {
    if(newVal) {
        localStorage.setItem('online_filter', 'true')
        return
    }
    localStorage.setItem('online_filter', 'false')
})
const sort_order = ref(localStorage.getItem('plaque_list_sort_order') || "name")
watch(sort_order, (newVal) => {
    localStorage.setItem('plaque_list_sort_order', newVal)
})

const plaque_store = usePlaqueStore();
const createTestPlaque = async () => {
    add_test_plaque_loading.value = true
    await createPlaque({
        name: "Test Plaque",
        user_id: account_store.get_account.id,
        token_meta_id_list: [],
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
        orientation: OrientationType.Landscape,
        command: {
            type: "",
            time_sent: Timestamp.fromMillis(0),
        },
        last_check_in_time: Timestamp.fromMillis(0),
        vpn_active: false,
        machine_data: {
            machine_name: "",
            version: "",
            local_ip: "",
            public_ip: "",
            updated_at: Timestamp.fromMillis(0),
        },
        free_space: 0,
        local_media_list: [],
    }).catch(err =>
        ElMessage({ message: `Error creating test plaque- ${err}`, type: 'error', showClose: true, duration: 12000 })
    );
    add_test_plaque_loading.value = false;
    show_add_plaque_dialog.value = false;
}

const sorted_plaques = computed(() => {
    const plaques: FirestoreDocument<Plaque>[] = JSON.parse(JSON.stringify(plaque_store.all_plaque_list));
    return plaques.sort((a, b) => {
        const text_a = a.entity.name.toLowerCase()
        const text_b = b.entity.name.toLowerCase()
        return (text_a < text_b) ? -1 : (text_a > text_b) ? 1 : 0;
    })
})

const plaques_in_gallery_set = computed(() => {
    const set = new Set<string>();

    if (filter_by_gallery.value) {
        gallery_store.gallery_plaque_list.forEach((gpl) => {
            if(gpl.entity.gallery_id == filter_by_gallery.value) {
                set.add(gpl.entity.plaque_id)
            }
        })
    }

    return set;
})

const filtered_plaques = computed(() => {

    let ret_plaques = [...sorted_plaques.value];

    // filter out plaques that are missing all of the following: name, user_id, no tokens. these would have no purpose to the user, only to a plaque that hasnt been setup yet
    ret_plaques = ret_plaques.filter(plaque => {
        return plaque.entity.name || plaque.entity.user_id || plaque.entity.token_meta_id_list.length > 0
    })

    if (filter_by_gallery.value) {
        ret_plaques = ret_plaques.filter(plaque => {
            return plaques_in_gallery_set.value.has(plaque.id)
        })
    }

    if (online_filter.value) {
        ret_plaques = ret_plaques.filter(p => isPlaqueOnline(p));
    }

    if( sort_order.value == "name") {
        ret_plaques = ret_plaques.sort((a, b) => a.entity.name.localeCompare(b.entity.name));
    } else if ( sort_order.value == "last_check_in_time") {
        ret_plaques = ret_plaques.sort((a, b) => {
            // if both art null return 0
            if (a.entity.last_check_in_time == null && b.entity.last_check_in_time== null) {
                return 0;
            }

            // then if one is null it should go last
            if (a.entity.last_check_in_time== null) {
                return 1;
            }
            if (b.entity.last_check_in_time == null) {
                return -1;
            }

            return b.entity.last_check_in_time.seconds - a.entity.last_check_in_time.seconds
        });
    }

    if (!search_filter.value) {
        return ret_plaques;
    }

    return ret_plaques.filter(p =>
        p.entity.name.toLowerCase().includes(search_filter.value.toLowerCase())
    )
})

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

.subheader {
    background-color: white;
    position: fixed;
    top: 50px;
    left: 0px;
    right: 0px;
    padding: 0px 25px 10px;
    z-index: 5;
}

@media only screen and (max-width: 600px) {
    div.add-button-container {
        display: block;
        margin: 20px 10px 20px 10px;

        min-width: 250px !important;
    }
}
</style>
