import type { FirestoreDocument, Account } from "@/types/types"
import { BaseEntity } from "@/types/types";
import { getFirestore, setDoc } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig"
import { collection, addDoc, getDoc, where, query, getDocs, doc } from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const accounts_ref = collection(db, "account")

// returns a list of all accounts that match the given address (should only have 1 or 0 results unless something else has gone wrong)
export const getAccountByAddress = async (user_id: string): Promise<Array<FirestoreDocument<Account>>> => {
    const snapshot = await getDocs(query(accounts_ref, where("user_id", "==", user_id)));
    return snapshot.docs.map(s => ({
        id: s.id, entity: s.data() as Account,
    }))
};

// getAccountByID returns a single account by its ID
export const getAccountByID = async (id: string): Promise<FirestoreDocument<Account>> => {
    const doc_ref = doc(db, "account", id);
    const snapshot = await getDoc(doc_ref);
    return { id: snapshot.id, entity: snapshot.data() as Account };
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

/* export const updateAccount = async (account: FirestoreDocument<Account>): Promise<FirestoreDocument<Account>> => {
    await db.collection("account").doc(account.id).update(account.entity)
    const snapshot = await db.collection("account").doc(account.id).get()
    return { id: snapshot.id, entity: snapshot.data() as Account }
} */
