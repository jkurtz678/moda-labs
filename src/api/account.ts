import type { FirestoreDocument, Account } from "@/types/types"
import { BaseEntity } from "@/types/types";
import { documentId, getFirestore, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig"
import { collection, addDoc, getDoc, where, query, getDocs, doc } from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const accounts_ref = collection(db, "account")

// getAccountByID returns a single account by its ID
export const getAccountByID = async (id: string): Promise<FirestoreDocument<Account>> => {
    const doc_ref = doc(db, "account", id);
    const snapshot = await getDoc(doc_ref);
    return { id: snapshot.id, entity: snapshot.data() as Account };
}

// getAccountByEmail returns a single account by its email
export const getAccountByEmail = async (email: string): Promise<FirestoreDocument<Account>> => {
    const snapshot = await getDocs(query(accounts_ref, where("email", "==", email)));
    return { id: snapshot.docs[0].id, entity: snapshot.docs[0].data() as Account };
}

// getAccountByAccountIDList returns a list of accounts by a list of account IDs
export const getAccountByAccountIDList = async (account_id_list: Array<string>): Promise<Array<FirestoreDocument<Account>>> => {
    const q = query(accounts_ref, where(documentId(), "in", account_id_list));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(s => ({
        id: s.id, entity: s.data() as Account,
    }))
}

// creates a new account record in the database and returns it
export const createAccount = async (user_id: string, account: Partial<Account>): Promise<FirestoreDocument<Account>> => {
    const document = doc(accounts_ref, user_id)
    await setDoc(document, {
        ...BaseEntity.createBaseEntity(),
        ...account
    })
    const snapshot = await getDoc(document)
    return { id: snapshot.id, entity: snapshot.data() as Account }
}

export const updateAccount = async (account_id: string, update_data: Partial<Account>): Promise<FirestoreDocument<Account>> => {
    update_data.updated_at = Timestamp.now();
    const ref = doc(db, "account", account_id)
    await updateDoc(ref, update_data)
    const snapshot = await getDoc(ref)
    return { id: snapshot.id, entity: snapshot.data() as Account }
}
