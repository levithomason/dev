import * as React from "react";
import { useMetaMask } from "metamask-react";

export const Wallets = () => {
  const { status, connect, account } = useMetaMask();

  return (
    <>
      <div className="actions">
        {(status === "initializing" && (
          <button className="connect-button" disabled>
            Synchronisation with MetaMask ongoing...
          </button>
        )) ||
          (status === "unavailable" && (
            <button className="connect-button" disabled>
              MetaMask not available :(
            </button>
          )) ||
          (status === "notConnected" && (
            <button className="connect-button" onClick={connect}>
              Connect to MetaMask
            </button>
          )) ||
          (status === "connecting" && (
            <button className="connect-button" disabled>
              Connecting...
            </button>
          )) ||
          (status === "connected" && account && (
            <button className="connect-button" disabled>
              {account.substring(0, 5)}
              ...
              {account.substring(account.length - 4, account.length)}
            </button>
          ))}
      </div>

      <style jsx>{`
        .actions {
          display: inline-block;
        }

        .actions .connect-button {
          background: black;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 12px 16px;
          cursor: pointer;
        }

        .actions .connect-button[disabled] {
          background: #bbb;
        }
      `}</style>
    </>
  );
};
