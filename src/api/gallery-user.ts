import { BaseEntity, type FirestoreDocument, type GalleryUser } from "@/types/types";
import firebaseConfig from "../firebaseConfig"
import { DocumentSnapshot, addDoc, collection, deleteDoc, getDoc, getDocs, getFirestore, query, where, type DocumentData, doc } from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const gallery_user_meta_ref = collection(db, "gallery-user")

// getGalleryUserListByUserID returns a list of gallery user for a given user id
export const getGalleryUserListByUserID = async (user_id: string): Promise<FirestoreDocument<GalleryUser>[]> => {
    const q = query(gallery_user_meta_ref, where("user_id", "==", user_id));
    const query_snapshot = await getDocs(q)
    const gallery_users: FirestoreDocument<GalleryUser>[] = [];
    query_snapshot.forEach((doc) => {
        gallery_users.push({ id: doc.id, entity: doc.data() as GalleryUser });
    });
    return gallery_users; 
}

// getGalleryUserListByGalleryID returns a list of gallery user for a given gallery id
export const getGalleryUserListByGalleryID = async (gallery_id: string): Promise<FirestoreDocument<GalleryUser>[]> => {
    const q = query(gallery_user_meta_ref, where("gallery_id", "==", gallery_id));
    const query_snapshot = await getDocs(q)
    const gallery_users: FirestoreDocument<GalleryUser>[] = [];
    query_snapshot.forEach((doc) => {
        gallery_users.push({ id: doc.id, entity: doc.data() as GalleryUser });
    });
    return gallery_users;
}

// createGalleryUser creates a new gallery user
export const createGalleryUserList = async (gallery_user_list: GalleryUser[]): Promise<FirestoreDocument<GalleryUser>[]> => {
    const add_doc_promise_list = [];
    for (const gallery_user of gallery_user_list) {
        add_doc_promise_list.push(addDoc(gallery_user_meta_ref, {
            ...BaseEntity.createBaseEntity(),
            ...gallery_user
        }))
    }
    const docs = await Promise.all(add_doc_promise_list)
    
    const snapshot_promise_list: Promise<DocumentSnapshot<DocumentData>>[] = [];
    docs.forEach((doc) => {
        snapshot_promise_list.push(getDoc(doc))
    });
    const snapshots = await Promise.all(snapshot_promise_list)
 
    return snapshots.map((snapshot) => {
        return { id: snapshot.id, entity: snapshot.data() as GalleryUser }
    })
}

// deleteGalleryUsersByGalleryID deletes all gallery users for a given gallery id
export const deleteGalleryUsersByGalleryID = async (gallery_id: string): Promise<void> => {
    const gallery_users = await getGalleryUserListByGalleryID(gallery_id);
    const delete_promise_list = [];
    for (const gallery_user of gallery_users) {
        delete_promise_list.push(deleteDoc(doc(db, "gallery-user", gallery_user.id)))
    }
    await Promise.all(delete_promise_list)
}