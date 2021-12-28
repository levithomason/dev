import * as React from "react";
import { phantomWalletState } from "../lib/state/wallet-state";
import { useRecoilState } from "recoil";
import { useHasMounted } from "../lib/hooks/hasMounted";
import { formatAddress } from "../lib/formatAddress";

export const PhantomWallet: React.FC = () => {
  const [wallet, setWallet] = useRecoilState(phantomWalletState);

  const handleClick = React.useCallback(async () => {
    try {
      const res = window.solana?.publicKey
        ? await window.solana?.disconnect()
        : await window.solana?.connect();
      const selectedAddress = res?.publicKey?.toString() ?? null;

      setWallet((val) => ({ ...val, selectedAddress }));
    } catch (err) {
      setWallet((val) => ({ ...val, state: "disconnected" }));
    }
  }, []);

  const handleAccountsChanged = React.useCallback(() => {
    const selectedAddress = window.solana?.publicKey?.toString() ?? null;
    console.log("handleAccountsChanged Phantom", selectedAddress);
    setWallet((val) => ({ ...val, selectedAddress }));
  }, [setWallet]);

  React.useEffect(() => {
    window.solana?.on("connect", handleAccountsChanged);
    window.solana?.on("disconnect", handleAccountsChanged);

    // try eager connect
    window.solana?.connect();

    return () => {
      window.solana?.off("connect", handleAccountsChanged);
      window.solana?.off("disconnect", handleAccountsChanged);
    };
  }, [handleAccountsChanged]);

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
