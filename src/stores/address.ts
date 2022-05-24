import { defineStore } from 'pinia'

export const useAddressStore = defineStore({
  id: 'address',
  state: () => ({
    address: ""
  }),
})
