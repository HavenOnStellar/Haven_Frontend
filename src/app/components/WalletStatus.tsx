'use client';

import { useState, useEffect } from 'react';
import { connectWallet, getWalletState, type WalletState } from '../lib/wallet';

export default function WalletStatus() {
  const [walletState, setWalletState] = useState<WalletState | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    getWalletState().then(setWalletState);
  }, []);

  async function handleConnect() {
    setIsConnecting(true);
    const result = await connectWallet();
    setWalletState(result.state);
    setIsConnecting(false);
  }

  function handleDisconnect() {
    setWalletState({
      isInstalled: walletState?.isInstalled ?? true,
      isAllowed: false,
      publicKey: null,
      freighterNetwork: null,
      networkMismatch: false,
      error: null,
    });
  }

  const isConnected = walletState !== null && walletState.publicKey !== null;

  if (isConnecting) {
    return (
      <div className="flex items-center justify-center glass-panel rounded-lg px-2 md:px-3 py-1.5 md:py-2">
        <div className="w-3 h-3 border-2 border-[#ffb596]/30 border-t-[#ffb596] rounded-full animate-spin" />
      </div>
    );
  }

  if (isConnected) {
    const shortKey = walletState!.publicKey.slice(0, 4) + '...' + walletState!.publicKey.slice(-4);

    return (
      <div className="flex items-center gap-1.5 md:gap-3">
        <div className="flex items-center gap-1.5 md:gap-2 glass-panel rounded-lg px-2 md:px-3 py-1.5 md:py-2">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#4caf50]" />
          <span className="text-[10px] md:text-xs font-mono text-[#e6e1df]">
            {shortKey}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="text-[10px] md:text-xs text-[#e1bfb2] hover:text-[#ffb596] transition-colors"
          aria-label="Disconnect wallet"
        >
          <span className="hidden sm:inline">Disconnect</span>
          <span className="material-symbols-outlined text-sm sm:hidden" aria-hidden="true">logout</span>
        </button>
      </div>
    );
  }

  if (walletState?.error) {
    return (
      <div className="flex items-center gap-1.5 md:gap-3">
        <div className="flex items-center gap-1.5 md:gap-2 glass-panel rounded-lg px-2 md:px-3 py-1.5 md:py-2 border-[#ffb4ab]/30" style={{ borderColor: 'rgba(255,180,171,0.3)' }}>
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ffb4ab]" />
          <span className="text-[10px] md:text-xs text-[#ffb4ab] hidden sm:inline">{walletState.error}</span>
        </div>
        <button
          onClick={handleConnect}
          className="text-[10px] md:text-xs text-[#e1bfb2] hover:text-[#ffb596] transition-colors"
          aria-label="Retry wallet connection"
        >
          <span className="hidden sm:inline">Retry</span>
          <span className="material-symbols-outlined text-sm sm:hidden" aria-hidden="true">refresh</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="glass-panel hover:bg-white/5 rounded-lg transition-all duration-300 px-2 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.08em] text-[#f49e00] border-[#E85D04] flex items-center gap-1.5 md:gap-2 active:scale-95"
      style={{ borderColor: '#E85D04' }}
      aria-label="Connect Freighter wallet"
    >
      <span className="material-symbols-outlined text-sm" aria-hidden="true">account_balance_wallet</span>
      <span className="hidden sm:inline">Connect Wallet</span>
    </button>
  );
}
