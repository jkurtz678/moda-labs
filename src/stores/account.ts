import { defineStore } from 'pinia'
import type { FirestoreDocument, Account } from "@/types/types"
import { getAccountByAddress, createAccount } from "@/api/account"
import { ElMessage } from 'element-plus'
import { connectWallet } from "@/web3Interface"

export type RootAccountState = {
  account: FirestoreDocument<Account> | null
}
interface CachedAccountData {
  wallet_address: string | null;
  signature: string | null; 
  ens_name: string | null;
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
    async loadAccount(address: string, signature: string, ens_name: string | null) {
      const accounts = await getAccountByAddress(address);

      if (accounts.length > 0) {
        this.account = accounts[0];
        return;
      }

      this.account = await createAccount(address, signature, ens_name)
    },
    async login() {
      const { address, signature, ens_name } = await connectWallet()
      window.localStorage.setItem("account_address", address);
      window.localStorage.setItem("account_signature", signature);
      if (ens_name) {
        window.localStorage.setItem("account_ens_name", ens_name);
      }
    },
    logout() {
      window.localStorage.removeItem("account_address");
      window.localStorage.removeItem("account_signature");
      window.localStorage.removeItem("account_ens_name");
      this.account = null;
    },
    getCachedAccountData(): CachedAccountData {
      const address = window.localStorage.getItem("account_address");
      const signature = window.localStorage.getItem("account_signature");
      const ens_name = window.localStorage.getItem("account_ens_name");
      return { wallet_address: address, signature: signature, ens_name: ens_name }
    }
  }
})
