import { BaseEntity, type FirestoreDocument, type GalleryUser } from "@/types/types";
import firebaseConfig from "../firebaseConfig"
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const gallery_user_meta_ref = collection(db, "gallery_user")

// getGalleryUserListByUserID returns a list of gallery user for a given user id
export const getGalleryUserListByUserID = async (user_id: string): Promise<FirestoreDocument<GalleryUser>[]> => {
    const q = query(gallery_user_meta_ref, where("user_id", "==", user_id));
    const query_snapshot = await getDocs(q)
    return query_snapshot.docs.map(s => s.data() as FirestoreDocument<GalleryUser>)
}

export const createGalleryUserList = async (gallery_user_list: GalleryUser[]): Promise<void> => {
    const add_doc_promise_list = [];
    for (const gallery_user of gallery_user_list) {
        add_doc_promise_list.push(addDoc(gallery_user_meta_ref, {
            ...BaseEntity.createBaseEntity(),
            ...gallery_user
        }))
    }
    await Promise.all(add_doc_promise_list)
}