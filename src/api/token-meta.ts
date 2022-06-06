import firebaseConfig from "../firebaseConfig"
import { getFirestore } from "firebase/firestore";
import type { TokenMeta, FirestoreDocument } from "@/types/types";
import { collection, addDoc, getDocs, getDoc, documentId, where, query, onSnapshot } from "firebase/firestore";
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

export const getTokenMetas = async (): Promise<FirestoreDocument<TokenMeta>[]> => {
    const snapshot = await getDocs(query(token_meta_ref));
    return snapshot.docs.map(s => ({
        id: s.id, entity: s.data() as TokenMeta,
    }))
}

export const getTokenMetaListByIDListWithListener = async (token_meta_id_list: string[], onChange: (arr: FirestoreDocument<TokenMeta>[]) => void) => {
    // in filters will error if array is empty
    if (token_meta_id_list.length == 0) {
        return;
    }
    const q = query(token_meta_ref, where(documentId(), "in", token_meta_id_list));
    const unsubscribe = onSnapshot(q, (query_snapshot) => {
        const metas: FirestoreDocument<TokenMeta>[] = [];
        query_snapshot.forEach((doc) => {
            metas.push({ id: doc.id, entity: doc.data() as TokenMeta })
        })
        onChange(metas)
    })
}