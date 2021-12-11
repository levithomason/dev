declare global {
  interface Window {
    solana?: {
      publicKey: null | {
        toString: () => string;
      };
      isPhantom: boolean;
      isSolana: boolean;
      isConnected: boolean;
      request: (params: { method: SolanaWalletJSONRPCMEthods }) => Promise<{
        publicKey: string;
      }>;
    };
    ethereum?: {
      isMetaMask: boolean;
      networkVersion: null;
      selectedAddress: null;
      request: (params: {
        method: MetaMaskWalletJSONRPCMethods;
      }) => Promise<WalletAddressERC20[]>;
    };
  }
}

// =============================================================
// Tokens
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

// =============================================================
// Chains

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

// =============================================================
// Wallets
export type WalletAddressERC20 = string;

export type WalletAPI = {
  name: string;
  connect: () => Promise<any>;
  isInstalled: boolean;
  // isConnected: () => Promise<boolean>;
  selectedAddress: string | null;
}


// -------------------------------
// Solana
export type SolanaWalletJSONRPCMEthods = "connect";

// -------------------------------
// MetaMask

// https://docs.metamask.io/guide/rpc-api.html#table-of-contents
export type MetaMaskWalletJSONRPCMethods =
  // permission
  | "eth_requestAccounts"
  | "wallet_getPermissions"
  | "wallet_requestPermissions"
  // other methods
  | "eth_decrypt"
  | "eth_getEncryptionPublicKey"
  | "wallet_addEthereumChain"
  | "wallet_switchEthereumChain"
  | "wallet_registerOnboarding"
  | "wallet_watchAsset"
  | EthereumJSONRPCMethods;

// https://eth.wiki/json-rpc/API#json-rpc-methods
export type EthereumJSONRPCMethods =
  | "web3_clientVersion"
  | "web3_sha3"
  | "net_version"
  | "net_peerCount"
  | "net_listening"
  | "eth_protocolVersion"
  | "eth_syncing"
  | "eth_coinbase"
  | "eth_mining"
  | "eth_hashrate"
  | "eth_gasPrice"
  | "eth_accounts"
  | "eth_blockNumber"
  | "eth_getBalance"
  | "eth_getStorageAt"
  | "eth_getTransactionCount"
  | "eth_getBlockTransactionCountByHash"
  | "eth_getBlockTransactionCountByNumber"
  | "eth_getUncleCountByBlockHash"
  | "eth_getUncleCountByBlockNumber"
  | "eth_getCode"
  | "eth_sign"
  | "eth_signTransaction"
  | "eth_sendTransaction"
  | "eth_sendRawTransaction"
  | "eth_call"
  | "eth_estimateGas"
  | "eth_getBlockByHash"
  | "eth_getBlockByNumber"
  | "eth_getTransactionByHash"
  | "eth_getTransactionByBlockHashAndIndex"
  | "eth_getTransactionByBlockNumberAndIndex"
  | "eth_getTransactionReceipt"
  | "eth_getUncleByBlockHashAndIndex"
  | "eth_getUncleByBlockNumberAndIndex"
  | "eth_getCompilers"
  | "eth_compileLLL"
  | "eth_compileSolidity"
  | "eth_compileSerpent"
  | "eth_newFilter"
  | "eth_newBlockFilter"
  | "eth_newPendingTransactionFilter"
  | "eth_uninstallFilter"
  | "eth_getFilterChanges"
  | "eth_getFilterLogs"
  | "eth_getLogs"
  | "eth_getWork"
  | "eth_submitWork"
  | "eth_submitHashrate"
  | "db_putString"
  | "db_getString"
  | "db_putHex"
  | "db_getHex"
  | "shh_post"
  | "shh_version"
  | "shh_newIdentity"
  | "shh_hasIdentity"
  | "shh_newGroup"
  | "shh_addToGroup"
  | "shh_newFilter"
  | "shh_uninstallFilter"
  | "shh_getFilterChanges"
  | "shh_getMessages";

// =============================================================
// Coingecko
export type CoinGeckoTokenID = "avalanche-2" | "frax" | "usd-coin" | "tether";

export type CoinGeckoChainID =
  | "avalanche"
  | "ethereum"
  | "fantom"
  | "harmony-shard-0"
  | "polygon-pos";
