import firebaseConfig from "../firebaseConfig"
import { getFirestore } from "firebase/firestore";
import type { TokenMeta, FirestoreDocument } from "@/types/types";
import { collection, addDoc, getDocs, getDoc, documentId, where, query } from "firebase/firestore";
import { BaseEntity } from "@/types/types";

const db = getFirestore(firebaseConfig)
const token_meta_ref = collection(db, "token-meta")

export const createTokenMeta = async (meta: TokenMeta): Promise<FirestoreDocument<TokenMeta>> => {
    const document = await addDoc(token_meta_ref, {
        ...BaseEntity.createBaseEntity(),
        ...meta
    })
    const snapshot = await getDoc(document)
    return { id: document.id, entity: snapshot.data() as TokenMeta }
}

export const getTokenMetaByIDList = async (token_meta_id_list: string[]): Promise<FirestoreDocument<TokenMeta>[]> => {
    if(token_meta_id_list.length == 0) {
        return [];
    }
    const snapshot = await getDocs(query(token_meta_ref, where(documentId(), "in", token_meta_id_list)));
    return snapshot.docs.map(s => ({
        id: s.id, entity: s.data() as TokenMeta,
    }))
}