declare global {
  interface Window {
    solana?: {
      on<K extends keyof SolanaWalletEventMap>(
        type: K,
        listener: (ev: SolanaWalletEventMap[K]) => any
      ): void;
      off<K extends keyof SolanaWalletEventMap>(
        type: K,
        listener: (ev: SolanaWalletEventMap[K]) => any
      ): void;
      publicKey: null | {
        toString: () => string;
      };
      isPhantom: boolean;
      isConnected: boolean;
      connect: (options?: {
        onlyIfTrusted?: boolean;
      }) => Promise<{ publicKey: string }>;
      disconnect: () => Promise<void>;
      request: (params: {
        method: SolanaWalletJSONRPCMethods;
        params?: SolanaWalletJSONRPCParams;
      }) => Promise<{
        publicKey: string;
      }>;
    };

    ethereum?: {
      on<K extends keyof MetaMaskWalletEventMap>(
        type: K,
        listener: (ev: MetaMaskWalletEventMap[K]) => any
      ): void;
      off<K extends keyof MetaMaskWalletEventMap>(
        type: K,
        listener: (ev: MetaMaskWalletEventMap[K]) => any
      ): void;
      isMetaMask: boolean;
      networkVersion: null;
      selectedAddress: null;
      request: (params: {
        method: MetaMaskWalletJSONRPCMethods;
      }) => Promise<WalletAddress[]>;
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

export type ChainID = number;

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
  chainID: ChainID;
  tokenSymbol: TokenSymbol;
  name: ChainName;
  mainnetURL: string;
  coinGeckoId: CoinGeckoChainID;
};

// =============================================================
// Wallets
export type WalletNames = "MetaMask" | "Phantom";

export type WalletAddress = string;

export type WalletState = {
  name: WalletNames;
  isInstalled: boolean;
  selectedAddress: string | null;
};

// -------------------------------
// Solana
export type SolanaWalletEventMap = {
  connect: void;
  disconnect: void;
};
export type SolanaWalletJSONRPCMethods = "connect";
export type SolanaWalletJSONRPCParams = { onlyIfTrusted: boolean };

// -------------------------------
// MetaMask
export type MetaMaskChainId = string;
export type MetaMaskConnectInfo = { chainId: MetaMaskChainId };
export type MetaMaskProviderMessage = {
  type: string;
  data: unknown;
};
interface MetaMaskProviderRPCError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

// https://docs.metamask.io/guide/ethereum-provider.html#events
export type MetaMaskWalletEventMap = {
  accountsChanged: string[];
  chainChanged: MetaMaskChainId;
  connect: MetaMaskConnectInfo;
  disconnect: MetaMaskProviderRPCError;
  message: MetaMaskProviderMessage;
};

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

// -------------------------------
// Tokens
export type CoinGeckoTokenID = "avalanche-2" | "frax" | "usd-coin" | "tether";

export type CoinGeckoTokenResponse = {
  last_updated_at: number;
  usd: number;
  usd_24h_change: number;
  usd_24h_vol: number;
  usd_market_cap: number;
};

// -------------------------------
// Chains
export type CoinGeckoChainID =
  | "avalanche"
  | "ethereum"
  | "fantom"
  | "harmony-shard-0"
  | "polygon-pos";

export type CoinGeckoChain = {
  id: CoinGeckoChainID;
  chain_identifier: number | null;
  name: string;
  shortname: string;
};
