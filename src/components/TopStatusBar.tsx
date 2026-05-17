'use client';

export function TopStatusBar() {
  return (
    <div className="w-full bg-[#00d4aa] text-[#002c23] h-10 flex items-center justify-between px-4 sm:px-6 relative z-50">
      <div className="flex items-center gap-2 flex-shrink-0 font-bold tracking-widest uppercase text-xs">
        <div className="w-2 h-2 rounded-full bg-[#002c23] animate-pulse-dot" />
        Soroban Testnet
      </div>
      
      <div className="flex-grow overflow-hidden relative h-full flex items-center mx-4">
        {/* Simple CSS animation for ticker */}
        <div className="whitespace-nowrap flex gap-12 animate-[scroll-left_30s_linear_infinite]" style={{ animation: 'scroll-left 30s linear infinite' }}>
          <span>Bounty claimed: $250 USDC for iPhone 14 Pro (Lagos)</span>
          <span>New device registered: Samsung Galaxy S23 (Nairobi)</span>
          <span>Bounty posted: $100 USDC for Pixel 7 (Bogotá)</span>
          <span>Status update: iPhone 13 recovered by finder</span>
          <span>Bounty claimed: $250 USDC for iPhone 14 Pro (Lagos)</span>
          <span>New device registered: Samsung Galaxy S23 (Nairobi)</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0 text-xs font-mono font-medium">
        <span className="hidden sm:inline">Block:</span> 4839211
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}} />
    </div>
  );
}
