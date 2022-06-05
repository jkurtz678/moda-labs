import { defineStore } from 'pinia'
import type { FirestoreDocument, Account } from "@/types/types"
import { getAccountByAddress, createAccount } from "@/api/account"

export type RootAccountState = {
  account: FirestoreDocument<Account> | null
}
export const useAccountStore = defineStore({
  id: 'account',
  state: () => ({
    account: null,
  } as RootAccountState),
  actions: {
    // loadAccount will retrieve an account by a given address, creating if it does not exist
    async loadAccount(address: string, signature: string) {
      const accounts = await getAccountByAddress(address);

      if (accounts.length > 0) {
        this.account = accounts[0];
        return;
      }

      this.account = await createAccount(address, signature)
    },
    login (address: string, signature: string) {
      window.localStorage.setItem("account_address", address);
      window.localStorage.setItem("account_signature", signature);
    },
    logout () {
      window.localStorage.removeItem("account_address");
      window.localStorage.removeItem("account_signature");
      this.account = null;
    }
  }
})
