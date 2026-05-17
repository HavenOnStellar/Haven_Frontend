'use client';

import { useState, useEffect } from 'react';

// Basic SHA-256 string generator simulation for the UI
async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function HashPreview({ imei }: { imei: string }) {
  const [hash, setHash] = useState<string>('');
  const [displayedHash, setDisplayedHash] = useState<string>('');
  
  useEffect(() => {
    if (!imei) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHash('');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayedHash('');
      return;
    }
    
    // Compute hash
    sha256(imei).then(h => setHash(h));
  }, [imei]);

  useEffect(() => {
    if (!hash) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayedHash('');
      return;
    }
    
    // Animate the hash appearing character by character
    let i = 0;
    setDisplayedHash('');
    
    const interval = setInterval(() => {
      setDisplayedHash(hash.slice(0, i + 1));
      i++;
      if (i >= hash.length) {
        clearInterval(interval);
      }
    }, 20); // 20ms per character

    return () => clearInterval(interval);
  }, [hash]);

  return (
    <div className="w-full bg-[#080c10] border border-[#334155] rounded-lg p-4 font-mono relative overflow-hidden">
      <div className="text-[10px] uppercase tracking-widest text-[#00d4aa] mb-2 font-sans font-bold flex items-center gap-2">
        <span className="material-symbols-outlined text-[14px]">lock</span>
        What gets stored on-chain
      </div>
      
      <div className="text-sm text-slate-300 break-all min-h-[40px] flex items-center">
        {imei ? (
          <span>
            {displayedHash}
            {displayedHash.length < 64 && displayedHash.length > 0 && (
              <span className="inline-block w-2 h-4 bg-[#00d4aa] ml-1 animate-pulse" />
            )}
          </span>
        ) : (
          <span className="text-slate-600">Enter IMEI to generate SHA-256 hash...</span>
        )}
      </div>
      
      {hash.length === 64 && displayedHash.length === 64 && (
        <div className="mt-3 text-xs text-slate-500 font-sans border-t border-white/5 pt-2">
          Your raw IMEI is never stored — only this cryptographic hash.
        </div>
      )}
    </div>
  );
}
