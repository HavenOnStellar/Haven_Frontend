'use client';

import { StatusBadge } from './StatusBadge';
import Link from 'next/link';

interface DeviceCardProps {
  id: string;
  make: string;
  model: string;
  color: string;
  registeredAt: string;
  status: 'Active' | 'Stolen' | 'Recovered';
  bounty?: number;
}

export function DeviceCard({ id, make, model, color, registeredAt, status, bounty }: DeviceCardProps) {
  return (
    <div className="glass-panel hover:glass-panel-raised p-6 rounded-xl border border-white/5 transition-all duration-300 group hover:border-[#00d4aa]/30 hover:shadow-[0_0_20px_rgba(0,212,170,0.1)] flex flex-col gap-4 relative overflow-hidden">
      {status === 'Stolen' && (
        <div className="absolute top-0 left-0 w-full h-1 bg-[#f59e0b]" />
      )}
      
      <div className="flex justify-between items-start">
        <StatusBadge status={status} />
        <span className="text-xs text-slate-400 font-mono">{id.slice(0, 8)}</span>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white group-hover:text-gradient-teal transition-all">{make} {model}</h3>
        <p className="text-sm text-slate-400 mt-1">{color} • Registered {registeredAt}</p>
      </div>

      {status === 'Active' && (
        <Link href={`/report/${id}`} className="mt-2 w-full py-2 bg-white/5 hover:bg-[#f59e0b]/20 text-slate-300 hover:text-[#f59e0b] border border-white/10 hover:border-[#f59e0b]/50 rounded-lg text-sm font-medium transition-all text-center flex justify-center items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">report</span>
          Report Stolen
        </Link>
      )}

      {status === 'Stolen' && bounty && (
        <div className="mt-2 w-full p-3 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-lg flex justify-between items-center">
          <span className="text-xs text-[#f59e0b] font-bold uppercase tracking-wider">Active Bounty</span>
          <span className="text-sm font-bold text-white">${bounty} USDC</span>
        </div>
      )}
    </div>
  );
}
