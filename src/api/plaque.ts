import { BaseEntity, type FirestoreDocument, type Plaque } from "@/types/types"
import firebaseConfig from "../firebaseConfig"
import { getFirestore } from "firebase/firestore";
import { collection, getDoc, where, query, doc, onSnapshot, updateDoc, addDoc } from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const plaques_ref = collection(db, "plaque")

export const getPlaquesByWalletAddressWithListener = async (wallet_address: string, onChange: (arr: Array<FirestoreDocument<Plaque>>) => void) => {
    const q = query(plaques_ref, where("wallet_address", "==", wallet_address));
    const unsubscribe = await onSnapshot(q, (query_snapshot) => {
        const plaques: FirestoreDocument<Plaque>[] = [];
        query_snapshot.forEach((doc) => {
            plaques.push({ id: doc.id, entity: doc.data() as Plaque })
        })
        onChange(plaques)
    })
};

export const createPlaque = async (plaque: Plaque): Promise<FirestoreDocument<Plaque>> => {
    const document = await addDoc(plaques_ref, {
        ...BaseEntity.createBaseEntity(),
        ...plaque
    })
    const snapshot = await getDoc(document)
    return { id: snapshot.id, entity: snapshot.data() as Plaque }
}

export const updatePlaque = async (plaque_id: string, update_data: Partial<Plaque>): Promise<FirestoreDocument<Plaque>> => {
    const ref = doc(db, "plaque", plaque_id)
    await updateDoc(ref, update_data)
    const snapshot = await getDoc(ref)
    return { id: snapshot.id, entity: snapshot.data() as Plaque }
}