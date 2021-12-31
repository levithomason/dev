import * as React from "react";

import { Accounts } from "../components/Accounts";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { RecoilRoot, useRecoilValue } from "recoil";
import { metaMaskWalletState } from "../lib/state/wallet-state";
import { DebankUserInfo } from "../components/DebankUserInfo";

const IndexPage = () => {
  const walletState = useRecoilValue(metaMaskWalletState);

  return (
    <Layout title="Crypto Gypto">
      <Header />
      <DebankUserInfo address={walletState.selectedAddress} />
      <br />
      <br />
      {walletState.selectedAddress && (
        <Accounts address={walletState.selectedAddress} />
      )}

      <style jsx global>
        {`
          html {
            font-family: sans-serif;
          }

          body {
            padding: 0;
            margin: 0;
            background: #222;
            color: #ddd;
          }
        `}
      </style>
    </Layout>
  );
};

export default () => (
  <RecoilRoot>
    <IndexPage />
  </RecoilRoot>
);
