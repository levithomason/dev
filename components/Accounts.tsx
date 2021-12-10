import * as React from "react";
import { useMetaMask } from "metamask-react";

import { TokenBalances } from "./TokenBalances";
import { chains } from "../lib/chains";

export const Accounts: React.FC = () => {
  const { account } = useMetaMask();

  if (!account) return null;

  return (
    <>
      {Object.values(chains).map((chain) => (
        <TokenBalances key={chain.name} chain={chain} address={account} />
      ))}
    </>
  );
};
