import * as React from "react";

import { Wallets } from "./Wallets";
import { Logo } from "./Logo";

export const Header = () => (
  <>
    <div className="app-header">
      <Logo />
      <Wallets />
    </div>

    <style jsx>{`
      .app-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 1rem;
        border-bottom: 2px solid rgba(0, 0, 0, 0.1);
      }
    `}</style>
  </>
);
