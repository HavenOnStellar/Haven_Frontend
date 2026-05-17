'use client';

import { useState, useEffect } from 'react';

const mockReports = [
  { city: 'Lagos', model: 'iPhone 14 Pro', bounty: 250, time: '2m ago' },
  { city: 'Nairobi', model: 'Samsung Galaxy S23', bounty: 100, time: '5m ago' },
  { city: 'Bogotá', model: 'Pixel 7', bounty: 150, time: '12m ago' },
  { city: 'Manila', model: 'iPhone 13', bounty: 80, time: '18m ago' },
  { city: 'São Paulo', model: 'Galaxy Z Flip', bounty: 200, time: '24m ago' },
  { city: 'Jakarta', model: 'iPhone 15', bounty: 300, time: '31m ago' },
];

export function StolenFeed() {
  const [items, setItems] = useState(mockReports.slice(0, 4));

  useEffect(() => {
    let currentIndex = 4;
    const interval = setInterval(() => {
      setItems(prev => {
        const nextItem = mockReports[currentIndex % mockReports.length];
        currentIndex++;
        return [nextItem, ...prev.slice(0, 3)];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm glass-panel rounded-2xl p-6 border border-white/5 relative overflow-hidden h-[400px]">
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#0f151b] to-transparent z-10" />
      
      <div className="flex items-center gap-2 mb-6 relative z-20">
        <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse-dot" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Live Theft Feed</h3>
      </div>

      <div className="flex flex-col gap-4 relative z-0">
        {items.map((item, i) => (
          <div 
            key={`${item.city}-${item.time}-${i}`}
            className="bg-[#161e26] border border-[#f59e0b]/20 rounded-xl p-4 animate-fade-in-up"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[#f59e0b] font-mono text-xs">REPORTED STOLEN</span>
              <span className="text-slate-500 text-xs">{item.time}</span>
            </div>
            <div className="font-semibold text-white mb-1">{item.model}</div>
            <div className="flex justify-between items-end mt-3">
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                {item.city}
              </div>
              <div className="bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20 px-2 py-1 rounded text-xs font-bold">
                ${item.bounty} USDC
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0f151b] to-transparent z-10" />
    </div>
  );
}
