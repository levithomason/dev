// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }

export type TokenAddress = string;

export type TokenSymbol =
  | "AVAX"
  | "DAI"
  | "ETH"
  | "FTM"
  | "ONE"
  | "HEC"
  | "sHEC"
  | "wsHEC"
  | "WAGMI"
  | "sWAGMI"
  | "wsWAGMI"
  | "MATIC"
  | "CLAM2"
  | "USDC"
  | "USDC.e"
  | "USDT"
  | "FRAX"
  | "wFRAX"
  | "weFRAX";

export type TokenDisplay = {
  token: TokenSymbol;
  balance: string;
  usdPrice: string;
};

export type TokenDefinition = [
  address: TokenAddress,
  symbol: TokenSymbol,
  decimal: number
];

export type TokensByChain = {
  [chain in ChainName]: TokenDefinition[];
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
  tokenSymbol: TokenSymbol;
  name: ChainName;
  mainnetURL: string;
  coinGeckoId: CoinGeckoChainID;
};

export type CoinGeckoChainID =
  | "avalanche"
  | "ethereum"
  | "fantom"
  | "harmony-shard-0"
  | "polygon-pos";
export type CoinGeckoTokenID = "avalanche-2" | "frax" | "usd-coin" | "tether";
