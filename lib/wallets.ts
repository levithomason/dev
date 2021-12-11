import { WalletAPI } from "../types";
import { isBrowser } from "./isBrowser";

export const metaMask: WalletAPI = {
  name: "MetaMask",
  get selectedAddress() {
    return isBrowser() ? window?.ethereum?.selectedAddress ?? null : null;
  },
  connect: async () =>
    Promise.resolve(
      await window?.ethereum?.request?.({ method: "eth_requestAccounts" })
    ),
  get isInstalled() {
    return isBrowser() ? window?.ethereum?.isMetaMask ?? false : false;
  },
  // isConnected: () => {
  //   return new Promise(async (resolve, reject) => {
  //     let addresses;
  //     try {
  //       addresses = await window?.ethereum?.request?.({
  //         method: "eth_accounts",
  //       });
  //     } catch (err) {
  //       reject(false);
  //     }
  //
  //     if (addresses && addresses?.length > 0) {
  //       resolve(true);
  //     }
  //
  //     reject(false);
  //   });
  // },
};

export const phantom: WalletAPI = {
  name: "Phantom",
  get selectedAddress() {
    return isBrowser() ? window?.solana?.publicKey?.toString() ?? null : null;
  },
  connect: async () => {
    try {
      const resp = await window?.solana?.request({ method: "connect" });
      resp?.publicKey.toString();
    } catch {}
  },
  get isInstalled() {
    return isBrowser() ? window?.solana?.isPhantom ?? false : false;
  },
  // isConnected: () => Promise.resolve(window?.solana?.isConnected ?? false),
};
