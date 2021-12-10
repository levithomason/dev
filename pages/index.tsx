import * as React from "react";
import { MetaMaskProvider } from "metamask-react";

import { Accounts } from "../components/Accounts";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";

const IndexPage = () => (
  <MetaMaskProvider>
    <Layout title="Levi's cypto gypto machine">
      <Header />
      <Accounts />

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
