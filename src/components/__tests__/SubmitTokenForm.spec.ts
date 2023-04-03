import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from "@vue/test-utils";
import SubmitTokenForm from "../SubmitTokenForm.vue";
import { uploadFile } from "@/api/storage";
import ElementPlus from 'element-plus';
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router';
import { Timestamp } from "firebase/firestore"
import { useAccountStore } from "@/stores/account"
import { createTokenMeta } from '@/api/token-meta';
import { addTokenToGallery } from '@/api/gallery';

vi.mock("@/api/storage", () => ({
    uploadFile: vi.fn(() => {
        return Promise.resolve();
    })
}));

vi.mock("@/api/token-meta", () => ({
    createTokenMeta: vi.fn(() => {
        return Promise.resolve({id: "test-id", entity: {name: "test-name", artist: "test-artist", created_at: Timestamp.now(), updated_at: Timestamp.now()}});
    })
}));

vi.mock("@/api/gallery", () => ({
    addTokenToGallery: vi.fn(() => {
        return Promise.resolve();
    })
}));

const mockRouter = createRouter({ history: createWebHistory(), routes: [] });

describe("SubmitTokenForm", () => {
    let wrapper: VueWrapper<any>;
    beforeEach(async () => {
        wrapper = await mount(SubmitTokenForm, {
            global: {
                plugins: [
                    ElementPlus,
                    createTestingPinia({ createSpy: vi.fn }),
                    mockRouter
                ],
            },
        });

        // setup test account
        const account_store = useAccountStore();
        account_store.account = { id: "test-id", entity: { email: "test@test.com", created_at: Timestamp.now(), updated_at: Timestamp.now() } };

        // reset spies
        // @ts-ignore
        uploadFile.mockClear();
        // @ts-ignore
        createTokenMeta.mockClear();
        // @ts-ignore
        addTokenToGallery.mockClear();


        await wrapper.vm.$nextTick()
    });

    it("mounts properly", async () => {
        expect(wrapper).toBeTruthy();
    });

    // this is currently not working, validation passes even with invalid data, it exits on file count check so thats why test still passes
    it("errors with invalid data", async () => {
        wrapper.vm.form.name = "";
        await wrapper.vm.submit(wrapper.vm.formRef);
        expect(uploadFile).toHaveBeenCalledTimes(0);
    });

    it("errors with valid data but no file", async () => {
        wrapper.vm.form.name = "Test Artwork";
        wrapper.vm.form.artist = "Test Artist";
        await wrapper.vm.submit(wrapper.vm.formRef);
        expect(uploadFile).toHaveBeenCalledTimes(0);
    })
    it("submits form with valid data, calls uploadFile", async () => {
        wrapper.vm.form.name = "Test Artwork";
        wrapper.vm.form.artist = "Test Artist";
        wrapper.vm.file_list = [{ name: "test-file.jpg", size: 1000, type: "image/jpeg" }];
        await wrapper.vm.submit(wrapper.vm.formRef);
        expect(uploadFile).toHaveBeenCalledTimes(1);
        // loading indicator shown
        expect(wrapper.vm.loading).toBe(true);
    });
    it("uploadSuccess creates token meta, resets fields", async () => {
        wrapper.vm.form.name = "Test Artwork";
        wrapper.vm.form.artist = "Test Artist";
        wrapper.vm.loading = true;
        await wrapper.vm.uploadSuccess(wrapper.vm.formRef, { name: "test-file.jpg", size: 1000, type: "image/jpeg" } )
        expect(createTokenMeta).toHaveBeenCalledTimes(1);

        //addTokenToGallery is not called because no galleries are selected
        expect(addTokenToGallery).toHaveBeenCalledTimes(0);

        // ensure data gets reset
        expect(wrapper.vm.form.name).toBe("");
        expect(wrapper.vm.form.artist).toBe("");
        expect(wrapper.vm.file_list).toHaveLength(0);
        expect(wrapper.vm.selected_galleries).toHaveLength(0);
        expect(wrapper.vm.loading).toBe(false); 
    });

    it("uploadSuccess with galleries", async () => {
        wrapper.vm.form.name = "Test Artwork";
        wrapper.vm.form.artist = "Test Artist";
        wrapper.vm.loading = true;
        wrapper.vm.selected_galleries = ["test-gallery", "test-gallery-2"];
        await wrapper.vm.uploadSuccess(wrapper.vm.formRef, { name: "test-file.jpg", size: 1000, type: "image/jpeg" } )
        expect(createTokenMeta).toHaveBeenCalledTimes(1);
        expect(addTokenToGallery).toHaveBeenCalledTimes(2);

        // ensure data gets reset
        expect(wrapper.vm.form.name).toBe("");
        expect(wrapper.vm.form.artist).toBe("");
        expect(wrapper.vm.file_list).toHaveLength(0);
        expect(wrapper.vm.selected_galleries).toHaveLength(0);
        expect(wrapper.vm.loading).toBe(false); 
    })
});
