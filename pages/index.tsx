import * as React from "react";
import { MetaMaskProvider, useMetaMask } from "metamask-react";

import Layout from "../components/Layout";
import { TokenBalances } from "../components/TokenBalances";
import { chains } from "../lib/chains";

const IndexPage = () => {
  const { status, connect, account } = useMetaMask();

  // instant connect
  React.useEffect(() => {
    if (status === "notConnected") connect();
  }, []);

  if (status === "connected") {
    // return <div>Connected account: {account}</div>;
  }

  return (
    <Layout title="Levi's cypto gypto machine">
      <h1>🤖 cypto gypto</h1>

      <div className="actions">
        {(status === "initializing" && (
          <button>Synchronisation with MetaMask ongoing...</button>
        )) ||
          (status === "unavailable" && (
            <button>MetaMask not available :(</button>
          )) ||
          (status === "notConnected" && (
            <button onClick={connect}>Connect to MetaMask</button>
          )) ||
          (status === "connecting" && <button>Connecting...</button>) ||
          (status === "connected" && <button>{account}</button>)}
      </div>

      {account && (
        <div className="accounts">
          {Object.values(chains).map((chain) => (
            <TokenBalances key={chain.name} chain={chain} address={account} />
          ))}
        </div>
      )}

      <style jsx global>
        {`
          html {
            font-family: sans-serif;
          }
          body {
            padding: 0;
            margin: 0;
          }
        `}
      </style>
      <style jsx>{`
        h1 {
          text-align: center;
        }
        .accounts {
          /*display: grid;*/
          /*grid-template-columns: min-content min-content min-content min-content min-content;*/
        }

        .actions {
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        button {
          background: black;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 15px;
          cursor: pointer;
        }
      `}</style>
    </Layout>
  );
};

export default () => {
  return (
    <MetaMaskProvider>
      <IndexPage />
    </MetaMaskProvider>
  );
};
