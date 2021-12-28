import { rateLimit } from "./rateLimit";

type Chain = {
  id: string; // example: eth
  // chain id
  community_id: number; // example: 1
  // Community-identified id
  name: string; // example: Ethereum
  logo_url: string; // example: https://static.debank.com/image/chain/logo_url/eth/6e0cd1f895af9836ee8c32cfc03bc279.png
  native_token_id: string; // example: eth
  // native token
  wrapped_token_id: string; // example: 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
  // the erc20-wrapped of native token
};

type Protocol = {
  id: string; // example: compound
  // protocol id
  chain_id: number; // example: 1
  // ChainID
  name: string; // example: Compound
  logo_url: string; // example: https://static.debank.com/image/project/logo_url/compound/b4b9c8de20952846a1c9dfcded47d0db.png
  site_url: string; // example: https://app.compound.finance
  // Prioritize websites that can be interacted with, not official websites

  has_supported_portfolio: boolean; // example: true
  // Is portfolio already supported
};

type Token = {
  id: string; // example: 0xdac17f958d2ee523a2206206994597c13d831ec7
  // Ethereum Address or native token id
  chain: number; // example: 1
  // ChainID
  name: string; // example: Tether USD
  symbol: string; // example: USDT
  decimals: number; // example: 6
  logo_url: string; // example: https://static.debank.com/image/token/logo_url/0xdac17f958d2ee523a2206206994597c13d831ec7/3c1a718331e468abe1fc2ebe319f6c77.png
  is_verified: boolean; // example: true
  price: number; // example: 1.01
  // USD price.Price of 0 means no data
  is_wallet: boolean; // example: true
  // Whether or not to show as a common token in the wallet
};

const CALLS_PER_SECOND = 1;
const msPerCall = 1000 / CALLS_PER_SECOND;

const get = rateLimit(msPerCall, async (url: string) => {
  const res = await fetch(url);
  return await res.json();
});

const BASE_URL = "https://openapi.debank.com/v1";

export const userTotalBalance = async (
  id: string
): Promise<{
  total_usd_value: number;
  chain_list: Chain[];
}> => await get(`${BASE_URL}/user/total_balance?id=${id}`);
