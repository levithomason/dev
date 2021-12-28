import * as React from "react";
import { useRecoilState } from "recoil";

import { useHasMounted } from "../lib/hooks/hasMounted";
import { formatAddress } from "../lib/formatAddress";
import { metaMaskWalletState } from "../lib/state/wallet-state";

export const MetaMaskWallet: React.FC = () => {
  const [wallet, setWallet] = useRecoilState(metaMaskWalletState);

  const handleClick = React.useCallback(async () => {
    console.log("handleClick MetaMask");
    if (window.ethereum?.selectedAddress) {
      alert("Disconnect using MetaMask.");
    } else {
      await window.ethereum?.request({ method: "eth_requestAccounts" });
    }
  }, []);

  const handleAccountsChanged = React.useCallback(
    ([selectedAddress]) => {
      console.log("handleAccountsChanged MetaMask");
      setWallet((val) => ({ ...val, selectedAddress }));
    },
    [setWallet]
  );

  React.useEffect(() => {
    const isInstalled = window.ethereum?.isMetaMask ?? false;

    setWallet((val) => ({ ...val, isInstalled }));

    // Emitted on page load automatically
    window.ethereum?.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum?.off("accountsChanged", handleAccountsChanged);
    };
  }, [handleAccountsChanged, setWallet]);

  if (!useHasMounted()) {
    return null;
  }

  return (
    <>
      <button onClick={handleClick} className="app-wallet">
        <span className="app-wallet-indicator" />
        <span className="app-wallet-name">{wallet.name}</span>
        <span className="app-wallet-address">
          {formatAddress(wallet.selectedAddress)}
        </span>
      </button>
      <style jsx>{`
        .app-wallet {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 4px;
          font-size: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          opacity: ${wallet.isInstalled ? 1 : 0.5};
          cursor: pointer;
        }

        .app-wallet-indicator {
          display: inline-block;
          padding: 3px;
          border-radius: 999px;
          background: ${!wallet.isInstalled
            ? "#555"
            : !wallet.selectedAddress
            ? "#C82"
            : "#4A0"};
        }
        .app-wallet-name {
          color: rgba(255, 255, 255, 0.7);
          font-weight: bold;
        }
        .app-wallet-address {
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  );
};
