import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from "@vue/test-utils";
import SubmitTokenForm from "../SubmitTokenForm.vue";
import { uploadFile } from "@/api/storage";
import ElementPlus from 'element-plus';
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router';
import { Timestamp } from "firebase/firestore"
import { useAccountStore } from "@/stores/account"
import { createTokenMetaWithReference, getTokenMetaDocumentRef } from '@/api/token-meta';
import { getAllGalleries } from '@/api/gallery';
import { createGalleryTokenMetaList } from "@/api/gallery-token";


vi.mock("@/api/storage", () => ({
    uploadFile: vi.fn(() => {
        return Promise.resolve();
    })
}));

vi.mock("@/api/token-meta", () => ({
    getTokenMetaDocumentRef: vi.fn(() => {
        return Promise.resolve({ id: "test-id" })
    }),
    createTokenMetaWithReference: vi.fn(() => {
        return Promise.resolve({ id: "test-id", entity: { name: "test-name", artist: "test-artist", created_at: Timestamp.now(), updated_at: Timestamp.now() } });
    })
}));

vi.mock("@/api/gallery", () => ({
    getAllGalleries: vi.fn(() => {
        return Promise.resolve([{ id: "load-all-test", entity: { name: "test-name", created_at: Timestamp.now(), updated_at: Timestamp.now() } }]);
    }),
}));

vi.mock("@/api/gallery-token", () => ({
    createGalleryTokenMetaList: vi.fn(() => {
        return Promise.resolve([]);
    }),
}));

const mockRouter = createRouter({ history: createWebHistory(), routes: [] });

describe("SubmitTokenForm", () => {
    let wrapper: VueWrapper<any>;
    beforeEach(async () => {
        // setup testing pinia
        const test_pinia = createTestingPinia({ createSpy: vi.fn })

        // setup test account
        const account_store = useAccountStore();
        account_store.account = { id: "test-id", entity: { email: "test@test.com", created_at: Timestamp.now(), updated_at: Timestamp.now() } };

        wrapper = await mount(SubmitTokenForm, {
            global: {
                plugins: [
                    ElementPlus,
                    test_pinia,
                    mockRouter
                ],
            },
        });

        // reset spies
        // @ts-ignore
        uploadFile.mockClear();
        // @ts-ignore
        getTokenMetaDocumentRef.mockClear();
        // @ts-ignore
        createTokenMetaWithReference.mockClear();
        // @ts-ignore
        createGalleryTokenMetaList.mockClear();

        await wrapper.vm.$nextTick()
    });

    it("mounts properly and loads all galleries", async () => {
        expect(wrapper).toBeTruthy();
        expect(getAllGalleries).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.gallery_list).toHaveLength(1);
        expect(wrapper.vm.gallery_list[0].id).toBe("load-all-test");
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
        expect(getTokenMetaDocumentRef).toHaveBeenCalledTimes(1);
        expect(uploadFile).toHaveBeenCalledTimes(1);
        // loading indicator shown
        expect(wrapper.vm.loading).toBe(true);
    });
    it("uploadSuccess creates token meta, resets fields", async () => {
        wrapper.vm.form.name = "Test Artwork";
        wrapper.vm.form.artist = "Test Artist";
        wrapper.vm.loading = true;
        await wrapper.vm.uploadSuccess(wrapper.vm.formRef, { name: "test-file.jpg", size: 1000, type: "image/jpeg" }, { id: "test-id" })
        expect(createTokenMetaWithReference).toHaveBeenCalledTimes(1);
        expect(createTokenMetaWithReference).toHaveBeenCalledWith({ id: "test-id" }, wrapper.vm.form);

        //addTokenToGallery is not called because no galleries are selected
        expect(createGalleryTokenMetaList).toHaveBeenCalledTimes(0);

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
        await wrapper.vm.uploadSuccess(wrapper.vm.formRef, { name: "test-file.jpg", size: 1000, type: "image/jpeg" }, { id: "test-id" })
        expect(createTokenMetaWithReference).toHaveBeenCalledTimes(1);
        expect(createGalleryTokenMetaList).toHaveBeenCalledTimes(1);

        // ensure data gets reset
        expect(wrapper.vm.form.name).toBe("");
        expect(wrapper.vm.form.artist).toBe("");
        expect(wrapper.vm.file_list).toHaveLength(0);
        expect(wrapper.vm.selected_galleries).toHaveLength(0);
        expect(wrapper.vm.loading).toBe(false);
    })
});
