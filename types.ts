// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }

export type TokenType = {
  token: string;
  balance: string;
};

export type AccountType = {
  address: string;
  balance: string;
  tokens: TokenType[];
};

export type ChainName =
  | "Avalanche"
  // | "Arbitrum"
  // | "BSC"
  | "Ethereum"
  | "Fantom"
  | "Harmony"
  // | "Moonriver"
  | "Polygon";
// | "Solana";

export type Chain = {
  chainID: number;
  tokenSymbol: string;
  name: ChainName;
  mainnetURL: string;
};
