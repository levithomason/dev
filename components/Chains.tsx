import React from "react";
import { chains } from "../lib/chains";

export const Chains: React.FC = () => (
  <>
    <div className="app-chains">
      {Object.values(chains).map((chain) => (
        <div className="app-chain" key={chain.chainID}>
          {chain.name}
        </div>
      ))}
    </div>

    <style jsx>{`
      .app-chains {
        display: flex;
      }
      .app-chain {
        flex: 1;
        padding: 4px 8px;
      }
    `}</style>
  </>
);
