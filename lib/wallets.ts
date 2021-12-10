interface Wallet {
  name: string;
  connect: () => Promise<any>;
  isInstalled: () => boolean;
  currentNetwork: () => null | string;
  currentAccount: () => null | string;
}

export const metaMask: Wallet = {
  name: "MetaMask",
  connect: async () =>
    Promise.resolve(
      await window?.ethereum?.request?.({ method: "eth_requestAccounts" })
    ),
  isInstalled: () => window?.ethereum?.isMetaMask ?? false,
  currentNetwork: () => window?.ethereum?.networkVersion ?? null,
  currentAccount: () => window?.ethereum?.selectedAddress ?? null,
};

// export const solana: Wallet = {
//   name: "Solana",
//   connect: async () =>
//     Promise.resolve(
//       await window?.ethereum?.request?.({ method: "eth_requestAccounts" })
//     ),
//   isInstalled: () => window?.ethereum?.isMetaMask ?? false,
//   currentNetwork: () => window?.ethereum?.networkVersion ?? null,
//   currentAccount: () => window?.ethereum?.selectedAddress ?? null,
// };
