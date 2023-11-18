import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import firebaseConfig from "../firebaseConfig"
import type { FirestoreDocument, GalleryPlaque } from "@/types/types"

const db = getFirestore(firebaseConfig)
const gallery_plaque_meta_ref = collection(db, "gallery_plaque")

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