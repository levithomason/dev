import * as React from "react";
import Web3 from "web3";

import tokenABI from "../lib/tokenABI";
import { tokens } from "../lib/tokens";
import { Chain, TokenType } from "../types";

export const TokenBalances: React.FC<{
  chain: Chain;
  address: string;
}> = ({ chain, address }) => {
  const [tokenBalances, setTokenBalances] = React.useState<TokenType[]>([]);
  const chainTokens = Object.values(tokens[chain.name]);

  console.log(chain.name, chainTokens)

  const web3 = new Web3(chain.mainnetURL);

  const getBalances = async () => {
    const tokensWithBalances: TokenType[] = [];

    const addressBalance = await web3.eth.getBalance(address);
    tokensWithBalances.push({
      token: chain.tokenSymbol,
      balance: web3.utils.fromWei(addressBalance, "ether"),
    });

    await Promise.all(
      chainTokens.map(async (token) => {
        const tokenInst = new web3.eth.Contract(tokenABI, token.address);
        const tokenBalance = await tokenInst.methods.balanceOf(address).call();
        let balance = web3.utils.fromWei(tokenBalance, "ether");

        if (balance !== "0") {
          tokensWithBalances.push({
            token: token.symbol,
            balance,
          });
        }
      })
    );

    setTokenBalances(tokensWithBalances);
  };

  React.useEffect(() => {
    getBalances();
  }, []);

  return (
    <div className="token-balances">
      <h2 className="chain-name">{chain.name}</h2>
      {tokenBalances.map(({ token, balance }) => (
        <div key={token} className="token-list">
          <span className="token-name">{token}</span>
          <span className="token-balance">{balance}</span>
        </div>
      ))}

      <style jsx>{`
        .token-balances {
          padding: 4px;
        }
        .chain-name {
          padding: 4px;
        }

        .token-list {
          padding: 4px;
        }
        .token-name {
          display: inline-block;
          width: 100px;
        }
      `}</style>
    </div>
  );
};
