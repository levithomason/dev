import * as React from "react";
import Web3 from "web3";

import tokenABI from "../lib/tokenABI";
import { tokens } from "../lib/tokens";
import { Chain, TokenDisplay } from "../types";
import { coingecko } from "../lib/coingecko";

export const TokenBalances: React.FC<{
  chain: Chain;
  address: string;
}> = ({ chain, address }) => {
  const [tokenBalances, setTokenBalances] = React.useState<TokenDisplay[]>([]);
  const chainTokens = Object.values(tokens[chain.name]);

  const web3 = new Web3(chain.mainnetURL);

  const getBalances = async () => {
    const tokensWithBalances: TokenDisplay[] = [];

    const addressBalance = await web3.eth.getBalance(address);
    tokensWithBalances.push({
      token: chain.tokenSymbol,
      balance: web3.utils.fromWei(addressBalance, "ether"),
      usdPrice: "",
    });

    await Promise.all(
      chainTokens.map(async ([tokenAddress, tokenSymbol, tokenDecimal]) => {
        const tokenInst = new web3.eth.Contract(tokenABI, tokenAddress);
        const tokenBalance = await tokenInst.methods.balanceOf(address).call();
        const decimalBalance = tokenBalance * Math.pow(10, -tokenDecimal);

        const priceInfo = await coingecko.tokenPrice(chain.coinGeckoId, [
          tokenAddress,
        ]);
        const usdPrice = String(priceInfo[tokenAddress]?.usd ?? "");

        const balance =
          decimalBalance < 1
            ? // prevent numbers like "1e-12", show full decimals
              decimalBalance.toFixed(tokenDecimal)
            : decimalBalance.toLocaleString("fullwide", { useGrouping: false });

        if (+balance !== 0) {
          tokensWithBalances.push({ token: tokenSymbol, balance, usdPrice });
        }
      })
    );

    setTokenBalances(tokensWithBalances);
  };

  React.useEffect(() => {
    getBalances();
  }, [chain, address]);

  return (
    <div>
      {tokenBalances.map(({ token, balance, usdPrice }) => {
        const whole = Number(balance.replace(/\..*/, "")).toLocaleString();
        const decimal = balance.replace(/.*\./, "");

        return (
          <div key={`${chain.name}-${token}`} className="token-row">
            <span className="token-cell token-name">{token}</span>
            <span className="token-cell token-usd-balance">
              {balance.length && usdPrice.length
                ? (Number(balance) * Number(usdPrice)).toLocaleString()
                : ""}
            </span>
            <span className="token-cell token-whole-number">{whole}</span>
            <span className="token-cell token-decimal">.</span>
            <span className="token-cell token-decimal-number">{decimal}</span>
            <span className="token-cell token-usd-price">{usdPrice}</span>
            <span className="token-cell token-chain">{chain.name}</span>
          </div>
        );
      })}

      <style jsx>{`
        .token-row {
          padding: 4px;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .token-cell {
          display: inline-block;
          padding: 8px 16px;
          font-family: monospace;
          font-size: 16px;
          vertical-align: middle;
        }

        .token-cell.token-name {
          padding-left: 8px;
          padding-right: 8px;
          font-weight: bold;
          width: 9ch;
        }
        .token-cell.token-usd-balance {
          width: 11ch;
          color: green;
        }
        .token-cell.token-whole-number {
          text-align: right;
          padding-right: 0;
          width: 11ch;
          font-weight: bold;
        }
        .token-cell.token-decimal {
          padding-left: 0;
          padding-right: 0;
          width: 1ch;
        }
        .token-cell.token-decimal-number {
          padding-left: 0;
          width: 18ch;
        }
        .token-cell.token-usd-price {
          width: 11ch;
          opacity: 0.5;
        }
        .token-cell.token-chain {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};
