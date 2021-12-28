import * as React from "react";

import { TokenBalances } from "./TokenBalances";
import { chains } from "../lib/chains";

export const Accounts: React.FC<{ address: string }> = ({ address }) => (
  <>
    {Object.values(chains).map((chain) => (
      <TokenBalances key={chain.name} chain={chain} address={address} />
    ))}
  </>
);
