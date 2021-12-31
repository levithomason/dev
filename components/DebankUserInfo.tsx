import * as React from "react";

import {
  userTotalBalance,
  UserTotalBalanceResponse,
  DebankChain,
} from "../lib/debank";
import { formatUSDNoCents } from "../lib/formatters";

const DebankChain: React.FC<{ chain: DebankChain }> = ({ chain }) => {
  if (chain.usd_value === 0) return null;

  return (
    <>
      <div>
        <img width={16} src={chain.logo_url} />
        {formatUSDNoCents(chain.usd_value)}
      </div>
      <style jsx>{`
        div {
          display: inline-flex;
          gap: 4px;
          padding: 2px 4px;
          margin: 0 4px;
          font-family: monospace;
          background: #333;
          border-radius: 4px;
          font-size: 16px;
        }
      `}</style>
    </>
  );
};

export const DebankUserInfo: React.FC<{ address: null | string }> = ({
  address,
}) => {
  const [userTotal, setUserTotal] = React.useState<UserTotalBalanceResponse>();

  if (!address) {
    return null;
  }

  // TODO: move to recoil state: 1) use total price 2) use chain list
  userTotalBalance(address).then((res) => {
    setUserTotal(res);
  });

  return (
    <div>
      <h2>{formatUSDNoCents(userTotal?.total_usd_value)}</h2>
      {userTotal?.chain_list.map((chain) => (
        <DebankChain key={chain.id} chain={chain} />
      ))}
    </div>
  );
};
