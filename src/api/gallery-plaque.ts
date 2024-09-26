import { addDoc, collection, getDocs, getFirestore, query, where, type DocumentData, DocumentSnapshot, getDoc, doc, deleteDoc } from "firebase/firestore"
import firebaseConfig from "../firebaseConfig"
import { BaseEntity, type FirestoreDocument, type GalleryPlaque } from "@/types/types"

const db = getFirestore(firebaseConfig)
const gallery_plaque_meta_ref = collection(db, "gallery-plaque")

// getGalleryPlaqueListByUserID returns a list of gallery plaque for a given gallery id
export const getGalleryPlaqueListByGalleryIDList = async (gallery_id_list: string[]): Promise<FirestoreDocument<GalleryPlaque>[]> => {
    if (gallery_id_list.length == 0) {
        return [];
    }

    const q = query(gallery_plaque_meta_ref, where("gallery_id", "in", gallery_id_list));
    const query_snapshot = await getDocs(q)
    const gallery_plaques: FirestoreDocument<GalleryPlaque>[] = [];
    query_snapshot.forEach((doc) => {
        gallery_plaques.push({ id: doc.id, entity: doc.data() as GalleryPlaque })
    });
    return gallery_plaques;
}

// getGalleryPlaqueListByGalleryID returns a list of gallery plaque for a given gallery id
export const getGalleryPlaqueListByGalleryID = async (gallery_id: string): Promise<FirestoreDocument<GalleryPlaque>[]> => {
    const q = query(gallery_plaque_meta_ref, where("gallery_id", "==", gallery_id));    
    const query_snapshot = await getDocs(q)
    const gallery_plaques: FirestoreDocument<GalleryPlaque>[] = [];
    query_snapshot.forEach((doc) => {
        gallery_plaques.push({ id: doc.id, entity: doc.data() as GalleryPlaque })
    });
    return gallery_plaques;
}


// createGalleryPlaqueList creates a list of gallery plaque
export const createGalleryPlaqueList = async (gallery_plaque_list: GalleryPlaque[]): Promise<FirestoreDocument<GalleryPlaque>[]> => {
    const add_doc_promise_list = [];
    for (const gallery_plaque of gallery_plaque_list) {
        add_doc_promise_list.push(addDoc(gallery_plaque_meta_ref, { ...BaseEntity.createBaseEntity(), ...gallery_plaque }))
    }
    const docs = await Promise.all(add_doc_promise_list);
    const snapshot_promise_list: Promise<DocumentSnapshot<DocumentData>>[] = [];
    docs.forEach((doc) => {
        snapshot_promise_list.push(getDoc(doc))
    });
    const snapshots = await Promise.all(snapshot_promise_list)

    return snapshots.map((snapshot) => {
        return { id: snapshot.id, entity: snapshot.data() as GalleryPlaque }
    })
}

// deleteGalleryPlaquesByGalleryID deletes all gallery plaques for a given gallery id
export const deleteGalleryPlaquesByGalleryID = async (gallery_id: string): Promise<void> => {
    const gallery_plaques = await getGalleryPlaqueListByGalleryID(gallery_id);
    const delete_promise_list = [];
    for (const gallery_plaque of gallery_plaques) {
        delete_promise_list.push(deleteDoc(doc(db, "gallery-plaque", gallery_plaque.id)))
    }
    await Promise.all(delete_promise_list);
}