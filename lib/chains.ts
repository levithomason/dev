import { Chain, ChainName } from "../types";

export const chains: {
  [key in ChainName]: Chain;
} = {
  Avalanche: {
    chainID: 43114,
    tokenSymbol: "AVAX",
    name: "Avalanche",
    mainnetURL: "https://api.avax.network/ext/bc/C/rpc",
  },

  Ethereum: {
    chainID: 1,
    tokenSymbol: "ETH",
    name: "Ethereum",
    mainnetURL: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  },

  Fantom: {
    chainID: 250,
    tokenSymbol: "FTM",
    name: "Fantom",
    mainnetURL: "https://rpc.ftm.tools",
  },

  Harmony: {
    chainID: 1666600000,
    tokenSymbol: "ONE",
    name: "Harmony", // Shard 0
    mainnetURL: "https://api.s0.t.hmny.io",
    // testnetUrl: "https://api.s0.b.hmny.io",
  },

  // HarmonyShard1: {
  //   chainID: 1666600001,
  //   tokenSymbol: "ONE",
  //   name: "Harmony Mainnet Shard 1",
  //   mainnetURL: "https://api.s1.t.hmny.io",
  //   // testnetUrl: "https://api.s1.b.hmny.io",
  // },
  //
  // HarmonyShard2: {
  //   chainID: 1666600002,
  //   tokenSymbol: "ONE",
  //   name: "Harmony Mainnet Shard 2",
  //   mainnetURL: "https://api.s2.t.hmny.io",
  //   // testnetUrl: "https://api.s2.b.hmny.io",
  // },
  //
  // HarmonyShard3: {
  //   chainID: 1666600003,
  //   tokenSymbol: "ONE",
  //   name: "Harmony Mainnet Shard 3",
  //   mainnetURL: "https://api.s3.t.hmny.io",
  //   // testnetUrl: "https://api.s3.b.hmny.io",
  // },

  Polygon: {
    chainID: 137,
    tokenSymbol: "MATIC",
    name: "Polygon",
    mainnetURL: "https://polygon-rpc.com",
  },
};
