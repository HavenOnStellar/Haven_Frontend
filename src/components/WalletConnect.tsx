'use client';

import { useState, useEffect } from 'react';
import { isConnected, requestAccess, getAddress, getNetwork } from '@stellar/freighter-api';

export function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [isTestnet, setIsTestnet] = useState<boolean>(true);
  const [hasFreighter, setHasFreighter] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      if (await isConnected()) {
        setHasFreighter(true);
        try {
          const res = await getAddress();
          if (res.address) {
            setAddress(res.address);
            try {
              const netRes = await getNetwork();
              setIsTestnet(netRes.network === 'TESTNET');
            } catch {
              // Ignore
            }
          }
        } catch {
          // Not connected yet
        }
      } else {
        setHasFreighter(false);
      }
    };

    init();
  }, []);

  const connect = async () => {
    if (!hasFreighter) {
      window.open('https://freighter.app', '_blank');
      return;
    }

    try {
      const res = await requestAccess();
      if (res.address) {
        setAddress(res.address);
        try {
          const netRes = await getNetwork();
          setIsTestnet(netRes.network === 'TESTNET');
        } catch {
          // Ignore
        }
      }
    } catch {
      console.error("User rejected access");
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex items-center gap-3">
      {address && isTestnet && (
        <div className="hidden sm:flex items-center gap-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 px-3 py-1.5 rounded-md">
          <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#f59e0b]">Testnet</span>
        </div>
      )}
      
      <button
        onClick={connect}
        className="glass-panel hover:bg-white/5 rounded-lg transition-all duration-300 px-5 py-2.5 text-sm font-bold tracking-wide text-[#00d4aa] border-[#00d4aa]/50 flex items-center gap-2 active:scale-95"
      >
        <span className="material-symbols-outlined text-[20px]">
          {address ? 'account_balance_wallet' : 'login'}
        </span>
        {!hasFreighter 
          ? 'Install Freighter' 
          : address 
            ? truncateAddress(address) 
            : 'Connect Wallet'}
      </button>
    </div>
  );
}

