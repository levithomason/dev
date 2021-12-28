import * as React from "react";

import { Accounts } from "../components/Accounts";
import { Chains } from "../components/Chains";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { RecoilRoot, useRecoilValue } from "recoil";
import { metaMaskWalletState } from "../lib/state/wallet-state";
// import { TokenPrices } from "../components/TokenPrices";

const IndexPage = () => {
  const walletState = useRecoilValue(metaMaskWalletState);

  return (
    <Layout title="Crypto Gypto">
      <Header />
      <Chains />
      {walletState.selectedAddress && (
        <Accounts address={walletState.selectedAddress} />
      )}
      {/*<TokenPrices />*/}

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
