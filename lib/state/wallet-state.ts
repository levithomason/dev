import { atom } from "recoil";
import { WalletState } from "../../types";
import { isBrowser } from "../isBrowser";

export const metaMaskWalletState = atom<WalletState>({
  key: "wallet-metaMask",
  default: {
    name: "MetaMask",
    selectedAddress: isBrowser()
      ? window.ethereum?.selectedAddress ?? null
      : null,
    isInstalled: isBrowser() ? window.ethereum?.isMetaMask ?? false : false,
  },
});

export const phantomWalletState = atom<WalletState>({
  key: "wallet-phantom",
  default: {
    name: "Phantom",
    selectedAddress: isBrowser()
      ? window.solana?.publicKey?.toString() ?? null
      : null,
    isInstalled: isBrowser() ? window.solana?.isPhantom ?? false : false,
  },
});
