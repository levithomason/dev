import * as React from "react";
// import { useMetaMask } from "metamask-react";
import * as wallets from "../lib/wallets";
import { WalletAPI } from "../types";

// const X = () => {
//   const { status, connect, account } = useMetaMask();
//
//   return (
//     <>
//       <div className="actions">
//         {(status === "initializing" && (
//           <button className="connect-button" disabled>
//             Synchronisation with MetaMask ongoing...
//           </button>
//         )) ||
//           (status === "unavailable" && (
//             <button className="connect-button" disabled>
//               MetaMask not available :(
//             </button>
//           )) ||
//           (status === "notConnected" && (
//             <button className="connect-button" onClick={connect}>
//               Connect to MetaMask
//             </button>
//           )) ||
//           (status === "connecting" && (
//             <button className="connect-button" disabled>
//               Connecting...
//             </button>
//           )) ||
//           (status === "connected" && account && (
//             <button className="connect-button" disabled>
//               {account.substring(0, 5)}
//               ...
//               {account.substring(account.length - 4, account.length)}
//             </button>
//           ))}
//       </div>
//
//       <style jsx>{`
//         .actions {
//           display: inline-block;
//         }
//
//         .actions .connect-button {
//           background: black;
//           color: white;
//           border: none;
//           border-radius: 10px;
//           padding: 12px 16px;
//           cursor: pointer;
//         }
//
//         .actions .connect-button[disabled] {
//           background: #bbb;
//         }
//       `}</style>
//     </>
//   );
// };

const Wallet: React.FC<{ wallet: WalletAPI }> = ({ wallet }) => {
  const [isConnected, setIsConnected] = React.useState(
    !!wallet.selectedAddress
  );

  if (wallet.isInstalled && !isConnected) {
    wallet
      .connect()
      .then(() => {
        setIsConnected(true);
      })
      .catch(() => {
        setIsConnected(false);
      });
  }

  return (
    <>
      <div className="app-wallet">
        <span className="app-wallet-indicator" />
        {wallet.name}
      </div>
      <style jsx>{`
        .app-wallet {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 4px;
          font-size: 12px;
          background: #eee;
          opacity: ${wallet.isInstalled ? 1 : 0.5};
        }

        .app-wallet-indicator {
          display: inline-block;
          padding: 3px;
          border-radius: 999px;
          background: ${wallet.selectedAddress ? "#090" : "#000"};
        }
      `}</style>
    </>
  );
};

export const Wallets = () => {
  return (
    <>
      <div className="app-wallets">
        {Object.values(wallets).map((wallet) => (
          <Wallet key={wallet.name} wallet={wallet} />
        ))}
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
