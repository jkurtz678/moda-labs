import { BaseEntity, type FirestoreDocument, type GalleryTokenMeta } from "@/types/types";
import firebaseConfig from "../firebaseConfig"
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const gallery_token_meta_ref = collection(db, "gallery_token_meta")

// getGalleryTokenMetaByGalleryID returns a list of gallery token meta for a given gallery id
export const getGalleryTokenMetaByGalleryID = async (gallery_id: string): Promise<FirestoreDocument<GalleryTokenMeta>[]> => {
    const q = query(gallery_token_meta_ref, where("gallery_id", "==", gallery_id));
    const query_snapshot = await getDocs(q)

    const gallery_token_metas: FirestoreDocument<GalleryTokenMeta>[] = [];
    query_snapshot.forEach((doc) => {
        gallery_token_metas.push({ id: doc.id, entity: doc.data() as GalleryTokenMeta })
    })
    return gallery_token_metas
}

// getGalleryTokenMetaListByGalleryIDList returns a list of gallery token meta for a gallery id
export const getGalleryTokenMetaListByGalleryIDList = async (gallery_id_list: string[]): Promise<FirestoreDocument<GalleryTokenMeta>[]> => {
    const q = query(gallery_token_meta_ref, where("gallery_id", "in", gallery_id_list));
    const query_snapshot = await getDocs(q)
    const gallery_token_metas: FirestoreDocument<GalleryTokenMeta>[] = [];
    query_snapshot.forEach((doc) => {
        gallery_token_metas.push({ id: doc.id, entity: doc.data() as GalleryTokenMeta })
    })
    return gallery_token_metas
}

// getGalleryTokenMetaByTokenMetaID returns a list of gallery token meta for a given token meta id
export const getGalleryTokenMetaByTokenMetaID = async (token_meta_id: string): Promise<FirestoreDocument<GalleryTokenMeta>[]> => {
    const q = query(gallery_token_meta_ref, where("token_meta_id", "==", token_meta_id));
    const query_snapshot = await getDocs(q)
    const gallery_token_metas: FirestoreDocument<GalleryTokenMeta>[] = [];
    query_snapshot.forEach((doc) => {
        gallery_token_metas.push({ id: doc.id, entity: doc.data() as GalleryTokenMeta })
    })
    return gallery_token_metas;
}

// createGalleryTokenMetaList inserts a list of gallery token meta into the database
export const createGalleryTokenMetaList = async (gallery_token_meta_list: GalleryTokenMeta[]): Promise<void> => {
    const add_doc_promise_list = [];
    for (const gallery_token_meta of gallery_token_meta_list) {
        add_doc_promise_list.push(addDoc(gallery_token_meta_ref, {
            ...BaseEntity.createBaseEntity(),
            ...gallery_token_meta
        }))
    }
    await Promise.all(add_doc_promise_list)
}

// deleteGalleryTokenMetaByGalleryID deletes all gallery token meta for a given gallery id
export const deleteGalleryTokenMetaByGalleryID = async (gallery_id: string): Promise<void> => {
    const q = query(gallery_token_meta_ref, where("gallery_id", "==", gallery_id));
    const query_snapshot = await getDocs(q)

    const delete_doc_promise_list = [];
    for (const doc of query_snapshot.docs) {
        delete_doc_promise_list.push(deleteDoc(doc.ref));
    }

    await Promise.all(delete_doc_promise_list);
}