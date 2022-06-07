import Web3 from 'web3/dist/web3.min.js'
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js'; // import index.min.js to fix node build issue https://github.com/WalletConnect/walletconnect-monorepo/issues/341#issuecomment-1079579976
import { ElMessage } from 'element-plus'

interface ConnectWalletResponse {
  address: string;
  signature: string;
}

export async function connectWallet(): Promise<ConnectWalletResponse> {
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
  console.log("connecting wallet...");
  //web3_modal.clearCachedProvider();
  const provider = await web3_modal.connect().catch((err) => {
    console.error(err);
    ElMessage({ message: `Error connecting to web3 modal - ${err}`, type: 'error', showClose: true, duration: 12000 });
  });
  console.log("AFTER CONNECT", provider)

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
  console.log("setWeb3Account", provider)
  const web3 = new Web3(provider);
  let address: string = (await web3.eth.getAccounts().catch((err: Error) => {
    ElMessage({ message: `Error getting eth account - ${err}`, type: 'error', showClose: true, duration: 12000 });
  }))[0];

  // attempt reverse
  const ethers_provider = new ethers.providers.Web3Provider(
    web3.currentProvider as ethers.providers.ExternalProvider
  );
  await ethers_provider.lookupAddress(address).then((ensName) => {
    if (ensName != null) {
      address = ensName;
    }
  }).catch(err => {
    ElMessage({ message: `Error getting adddress from ethers - ${err}`, type: 'error', showClose: true, duration: 12000 });
  })

  // get signature
  let signature = window.localStorage.getItem("account_signature") || ""
  if (!signature) {
    const plain =
      "MoDA Labs - proof of ownership. Please sign this message to prove ownership over your Ethereum account.";
    const msg = web3.utils.asciiToHex(plain);

    signature = await web3.eth.personal.sign(msg, address, "")
      .catch((err: Error) => {
        ElMessage({ message: `Error getting signature - ${err}`, type: 'error', showClose: true, duration: 12000 });
      })
  }

  return { address, signature };

}