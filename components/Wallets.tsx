import * as React from "react";
import { PhantomWallet } from "./PhantomWallet";
import { MetaMaskWallet } from "./MetaMaskWallet";

export const Wallets = () => {
  return (
    <>
      <div className="app-wallets">
        <MetaMaskWallet />
        <PhantomWallet />
      </div>
      <style jsx>{`
        .app-wallets {
          display: inline-flex;
          gap: 4px;
        }
      `}</style>
    </>
  );
};
