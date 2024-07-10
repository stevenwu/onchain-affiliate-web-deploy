import * as React from 'react';
import { Connector, useConnect } from 'wagmi';
import { CoinbaseWalletLogo } from './icons/CoinbaseWalletLogo';

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <WalletOption
      key={connectors[0].uid}
      connector={connectors[0]}
      onClick={() => connect({ connector: connectors[0] })}
    />
  );

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ));
}

function WalletOption({ connector, onClick }: { connector: Connector; onClick: () => void }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      className="rounded-full bg-base-blue px-4 text-white flex items-center h-11 text-sm md:text-base "
      disabled={!ready}
      onClick={onClick}
      type="button"
    >
      <CoinbaseWalletLogo />
      <span className="ml-1">Connect</span>
    </button>
  );
}
