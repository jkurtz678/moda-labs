import type { FirestoreDocument, Plaque} from "@/types/types"
import firebaseConfig from "../firebaseConfig"
import { getFirestore } from "firebase/firestore";
import { collection, getDoc, where, query, doc, onSnapshot, updateDoc} from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const plaques_ref = collection(db, "plaque")

export const getPlaquesByAccountIDWithListener = async (account_id: string, onChange: (arr: Array<FirestoreDocument<Plaque>>) => void) => {
    const q = query(plaques_ref, where("account_id", "==", account_id));
    const unsubscribe = await onSnapshot(q, (query_snapshot) => {
        const plaques: FirestoreDocument<Plaque>[] = [];
        query_snapshot.forEach((doc) => {
            plaques.push( { id: doc.id, entity: doc.data() as Plaque})
        })
        onChange(plaques)
    })
};

export const updatePlaque = async (plaque_id: string, update_data: Partial<Plaque>): Promise<FirestoreDocument<Plaque>> => {
    const ref = doc(db, "plaque", plaque_id)
    await updateDoc(ref, update_data)
    const snapshot = await getDoc(ref)
    return { id: snapshot.id, entity: snapshot.data() as Plaque}
}