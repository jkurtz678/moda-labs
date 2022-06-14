import Web3 from 'web3/dist/web3.min.js'
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js'; // import index.min.js to fix node build issue https://github.com/WalletConnect/walletconnect-monorepo/issues/341#issuecomment-1079579976
import { ElMessage } from 'element-plus'

interface ConnectWalletResponse {
  address: string;
  signature: string;
  ens_name: string | null;
}

export async function connectWallet(): Promise<ConnectWalletResponse> {

  const { ethereum } = window;
  await ethereum.request({
    method: 'wallet_requestPermissions',
    params: [{ eth_accounts: {} }],
  })
  // setup web3 modal
  console.log("setup web3 modal...");
  const web3_modal = new Web3Modal({
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "e132974b42d54791bd631e7bcd88572b", // infura.io Mainnet endpoint
        },
      },
    },
    cacheProvider: true,
    //disableInjectedProvider: false,
  });

  // connect wallet
  console.log("web3_modal connecting wallet...");
  //web3_modal.clearCachedProvider();
  const provider = await web3_modal.connect().catch((err) => {
    throw `Error connecting to web3 modal - ${err.message ? err.message : err}`
  });
  console.log("web3_modal.connect provider: ", provider)

  // Subscribe to accounts change
  provider.on("accountsChanged", () => {
    console.log("accountsChanged");
  });

  // Subscribe to chainId change
  provider.on("chainChanged", () => {
    console.log("chainChanged");
  });

  // Subscribe to networkId change
  provider.on("networkChanged", () => {
    console.log("networkChanged");
  });

  // set web3 account
  console.log("web3.eth.getAccounts with provider: ", provider)
  const web3 = new Web3(provider);
  const account_addresses: string[] = await web3.eth.getAccounts()
    .catch((err: Error) => {
      throw `Error getting eth account - $ ${err.message ? err.message : err}`;
    });

  // should always be first
  let address = account_addresses[0]
  console.log("web3.eth.getAccounts address: ", address)

  // attempt lookup of address in ENS using reverse registrar (e.g. 0x333... -> name.eth)
  const ethers_provider = new ethers.providers.Web3Provider(
    web3.currentProvider as ethers.providers.ExternalProvider
  );
  const ens_name = await ethers_provider.lookupAddress(address)
    .catch(err => {
      throw `Error getting adddress from ethers - ${err.message ? err.message : err}`;
    })

  // get signature
  let signature = window.localStorage.getItem("account_signature") || ""
  if (!signature) {
    const plain =
      "MoDA Labs - proof of ownership. Please sign this message to prove ownership over your Ethereum account.";
    const msg = web3.utils.asciiToHex(plain);

    // do not use ens_name (e.g. name.eth) to sign instead of address will fail with following error:
    // "Provided address natemohler.eth is invalid, the capitalization checksum test failed, or it's an indirect IBAN address which can't be converted."
    signature = await web3.eth.personal.sign(msg, address)
      .catch((err: Error) => {
        throw `Error getting signature - ${err.message}`;
      })
  }

  return { address, signature, ens_name };

}