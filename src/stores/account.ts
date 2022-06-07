import { defineStore } from 'pinia'
import type { FirestoreDocument, Account } from "@/types/types"
import { getAccountByAddress, createAccount } from "@/api/account"
import { ElMessage } from 'element-plus'
import { connectWallet } from "@/web3Interface"

export type RootAccountState = {
  account: FirestoreDocument<Account> | null
}
export const useAccountStore = defineStore({
  id: 'account',
  state: () => ({
    account: null,
  } as RootAccountState),
  getters: {
    get_account: (state): FirestoreDocument<Account> => {
      if (!state.account) {
        ElMessage("Error - tried to retrieve account for unautheticated user");
        throw "Error - tried to retrieve account for unauthenticated user";
      }

      return state.account;
    }
  },
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
    async login() {
      const { address, signature } = await connectWallet()
      window.localStorage.setItem("account_address", address);
      window.localStorage.setItem("account_signature", signature);
    },
    logout() {
      window.localStorage.removeItem("account_address");
      window.localStorage.removeItem("account_signature");
      this.account = null;
    }
  }
})
