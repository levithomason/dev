import { atom } from "recoil";
import { WalletNames, WalletState } from "../../types";
import { TokenList } from "@uniswap/token-lists";

export const walletsState = atom<{ [key in WalletNames]: WalletState }>({
  key: "wallets",
  default: {
    MetaMask: {
      name: "MetaMask",
      selectedAddress: null,
      isInstalled: false,
    },

    Phantom: {
      name: "Phantom",
      selectedAddress: null,
      isInstalled: false,
    },
  },
});

export const tokenInfoState = atom<TokenList["tokens"]>({
  key: "tokens",
  default: [],
});
