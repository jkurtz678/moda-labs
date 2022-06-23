
import type { FirestoreDocument, Gallery } from "@/types/types"
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig"
import { collection, addDoc, getDoc, where, query, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const gallery_ref = collection(db, "gallery")

export const getGalleriesForAddress = async (wallet_address: string): Promise<FirestoreDocument<Gallery>[]> => { 
    const snapshot = await getDocs(query(gallery_ref));
    const galleries = snapshot.docs.map(s => ({
        id: s.id, entity: s.data() as Gallery,
    }))

    return galleries.filter(g => g.entity.wallet_address_list.includes(wallet_address));
}