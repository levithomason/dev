import * as React from "react";
import { MetaMaskProvider } from "metamask-react";

import { Accounts } from "../components/Accounts";
import { Chains } from "../components/Chains";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
// import { TokenPrices } from "../components/TokenPrices";

const IndexPage = () => (
  <MetaMaskProvider>
    <Layout title="Crypto Gypto">
      <Header />
      <Chains />
      <Accounts />
      {/*<TokenPrices />*/}

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
    </Layout>
  </MetaMaskProvider>
);

export default IndexPage;
