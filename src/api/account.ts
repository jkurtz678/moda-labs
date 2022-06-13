import type { FirestoreDocument, Account } from "@/types/types"
import { BaseEntity } from "@/types/types";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig"
import { collection, addDoc, getDoc, where, query, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const accounts_ref = collection(db, "account")

// returns a list of all accounts that match the given address (should only have 1 or 0 results unless something else has gone wrong)
export const getAccountByAddress = async (wallet_address: string): Promise<Array<FirestoreDocument<Account>>> => {
    const snapshot = await getDocs(query(accounts_ref, where("wallet_address", "==", wallet_address)));
    return snapshot.docs.map(s => ({
        id: s.id, entity: s.data() as Account,
    }))
};

// creates a new account record in the database and returns it
export const createAccount = async (wallet_address: string, signature: string): Promise<FirestoreDocument<Account>> => {
    const document = await addDoc(accounts_ref, {
        ...BaseEntity.createBaseEntity(),
        wallet_address: wallet_address,
        signature: signature
    })
    const snapshot = await getDoc(document)
    return { id: snapshot.id, entity: snapshot.data() as Account }
}

/* export const updateAccount = async (account: FirestoreDocument<Account>): Promise<FirestoreDocument<Account>> => {
    await db.collection("account").doc(account.id).update(account.entity)
    const snapshot = await db.collection("account").doc(account.id).get()
    return { id: snapshot.id, entity: snapshot.data() as Account }
} */
