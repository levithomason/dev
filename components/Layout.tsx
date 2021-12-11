import React, { ReactNode } from "react";

import Head from "next/head";
import { appName, logo } from "../lib/app-config";

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout = ({ children, title = appName }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="apple-touch-icon" href={logo.src} />
      <link rel="shortcut icon" href={logo.src} />
    </Head>

    {children}
  </div>
);
