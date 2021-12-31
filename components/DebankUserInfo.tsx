import * as React from "react";

import { TokenBalances } from "./TokenBalances";
import { chains } from "../lib/chains";
import { userTotalBalance } from "../lib/debank";

export const DebankUserInfo: React.FC<{ address: string }> = ({ address }) => {
  const [userTotal, setUserTotal] = React.useState();

  userTotalBalance(address)

  return (
    <>
      {Object.values(chains).map((chain) => (
        <TokenBalances key={chain.name} chain={chain} address={address} />
      ))}
    </>
  );
};
