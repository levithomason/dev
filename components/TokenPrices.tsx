import React from "react";
import { TokenList, TokenInfo } from "@uniswap/token-lists";
import { coingecko } from "../lib/coingecko";

const Token: React.FC<Pick<TokenInfo, "logoURI" | "symbol">> = ({
  logoURI,
  symbol,
}) => (
  <div className="app-token">
    <img className="app-token-logo" src={logoURI} alt={symbol + " logo"} />
    <span className="app-token-symbol">{symbol}</span>
    <style jsx>{`
      .app-token {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        margin: 2px;
        padding: 2px 4px;
      }
      .app-token-logo {
        width: 18px;
      }
      .app-token-symbol {
        font-size: 11px;
        font-weight: bold;
      }
    `}</style>
  </div>
);

export const TokenPrices: React.FC = () => {
  const [tokenList, setTokenList] = React.useState<TokenList["tokens"]>();

  const getTokens = async () => {
    const res = await coingecko.tokenList();
    setTokenList(res.tokens);
  };

  React.useEffect(() => {
    getTokens();
  }, []);

  if (!tokenList) {
    return null;
  }

  return (
    <div className="app-tokens">
      {tokenList.map((tokenInfo) => (
        <Token
          key={tokenInfo.address}
          logoURI={tokenInfo.logoURI}
          symbol={tokenInfo.symbol}
        />
      ))}
      <style jsx>{`
        .app-tokens {
          height: 10vh;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};
