import firebaseConfig from "../firebaseConfig"
import { getFirestore } from "firebase/firestore";
import type { TokenMeta, FirestoreDocument } from "@/types/types";
import { collection, addDoc, getDocs, getDoc, documentId, where, query, onSnapshot } from "firebase/firestore";
import { BaseEntity } from "@/types/types";

const db = getFirestore(firebaseConfig)
const token_meta_ref = collection(db, "token-meta")

// createTokenMeta will add a new firestore record for the given token meta and return the newly created record now with an id
export const createTokenMeta = async (meta: TokenMeta): Promise<FirestoreDocument<TokenMeta>> => {
    const document = await addDoc(token_meta_ref, {
        ...BaseEntity.createBaseEntity(),
        ...meta
    })
    const snapshot = await getDoc(document)
    return { id: document.id, entity: snapshot.data() as TokenMeta }
}

// getAllTokenMetasWithListener returns a list of all archive token metas with a firebase listener callback
export const getAllTokenMetasWithListener = async (onChange: (arr: FirestoreDocument< TokenMeta>[]) => void) => {
    const unsubscribe = await onSnapshot(query(token_meta_ref), (query_snapshot) => {
        const token_metas: FirestoreDocument<TokenMeta>[] = [];
        query_snapshot.forEach((doc) => {
            token_metas.push({ id: doc.id, entity: doc.data() as TokenMeta})
        })
        onChange(token_metas)
    })
}

// getTokenMetasWithListener returns a list of archive token metas that match the given wallet address, uses firebase listener callback
export const getTokenMetaListByWalletAddressWithListener = async (wallet_address: string, onChange: (arr: Array<FirestoreDocument<TokenMeta>>) => void) => {
    const q = query(token_meta_ref, where("wallet_address", "==", wallet_address));
    const unsubscribe = await onSnapshot(q, (query_snapshot) => {
        const token_metas: FirestoreDocument<TokenMeta>[] = [];
        query_snapshot.forEach((doc) => {
            token_metas.push({ id: doc.id, entity: doc.data() as TokenMeta})
        })
        onChange(token_metas)
    })
};

/* export const getTokenMetaListByIDListWithListener = async (token_meta_id_list: string[], onChange: (arr: FirestoreDocument<TokenMeta>[]) => void) => {
    // in filters will error if array is empty
    if (token_meta_id_list.length == 0) {
        return;
    }
    const q = query(token_meta_ref, where(documentId(), "in", token_meta_id_list));
    const unsubscribe = await onSnapshot(q, (query_snapshot) => {
        const metas: FirestoreDocument<TokenMeta>[] = [];
        query_snapshot.forEach((doc) => {
            metas.push({ id: doc.id, entity: doc.data() as TokenMeta })
        })
        onChange(metas)
    })
} */