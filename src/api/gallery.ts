
import type { FirestoreDocument, Gallery } from "@/types/types"
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig"
import { collection, query, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const gallery_ref = collection(db, "gallery")

// getGalleriesForUserID returns a list of galleries for a given user id
export const getGalleriesForUserID = async (user_id: string): Promise<FirestoreDocument<Gallery>[]> => { 
    const snapshot = await getDocs(query(gallery_ref));
    const galleries = snapshot.docs.map(s => ({
        id: s.id, entity: s.data() as Gallery,
    }))

    return galleries.filter(g => g?.entity?.user_id_list?.includes(user_id));
}