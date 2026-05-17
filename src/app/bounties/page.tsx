'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WalletConnect } from '@/components/WalletConnect';

const initialBounties = [
  { id: 'dev_8f92a1b3c4', make: 'Apple', model: 'iPhone 14 Pro', city: 'Lagos, NG', amount: 250, days: 2 },
  { id: 'dev_3b4c5d6e7f', make: 'Samsung', model: 'Galaxy S23', city: 'Nairobi, KE', amount: 100, days: 5 },
  { id: 'dev_1a2b3c4d5e', make: 'Google', model: 'Pixel 7', city: 'Bogotá, CO', amount: 150, days: 12 },
  { id: 'dev_9z8y7x6w5v', make: 'Apple', model: 'iPhone 13', city: 'Manila, PH', amount: 80, days: 18 },
  { id: 'dev_4u3t2s1r0q', make: 'Samsung', model: 'Galaxy Z Flip', city: 'São Paulo, BR', amount: 200, days: 24 },
  { id: 'dev_5p6o7n8m9l', make: 'Apple', model: 'iPhone 15', city: 'Jakarta, ID', amount: 300, days: 31 },
];

export default function BountyBoard() {
  const [bounties] = useState([...initialBounties].sort((a, b) => b.amount - a.amount));
  const [selectedBounty, setSelectedBounty] = useState<typeof initialBounties[0] | null>(null);

  const totalBountyValue = bounties.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="flex-grow flex flex-col w-full relative z-10 bg-[#080c10]">
      {/* NAVBAR */}
      <nav className="bg-[#080c10] border-b border-white/5 sticky top-0 w-full z-40">
        <div className="flex justify-between items-center max-w-[1400px] mx-auto px-6 md:px-12 h-20">
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Image src="/logo.png" alt="Haven Logo" width={32} height={32} className="object-contain" />
            </Link>
            <div className="text-xl font-bold tracking-tight text-white hidden sm:block">Haven</div>
            <div className="w-px h-6 bg-white/10 mx-2 hidden sm:block" />
            <Link href="/bounties" className="text-slate-400 hover:text-white font-medium transition-colors hidden sm:block">Bounty Board</Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/claims" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Claims</Link>
            <WalletConnect />
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-[1400px] mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Active Bounties</h1>
            <p className="text-slate-400">Public registry of stolen devices and their smart contract escrowed rewards.</p>
          </div>
          
          <div className="glass-panel rounded-xl p-4 flex items-center gap-6 min-w-[250px]">
            <div className="w-12 h-12 rounded-full bg-[#f59e0b]/20 flex items-center justify-center border border-[#f59e0b]/30">
              <span className="material-symbols-outlined text-[#f59e0b]">payments</span>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Value Locked</div>
              <div className="text-2xl font-bold text-white">${totalBountyValue.toLocaleString()} USDC</div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#161e26] border-b border-white/5">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Device</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Last Location</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Time Stolen</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#00d4aa]">Bounty Reward</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {bounties.map((bounty, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-white">{bounty.make} {bounty.model}</div>
                      <div className="text-xs text-slate-500 font-mono mt-1">{bounty.id}</div>
                    </td>
                    <td className="p-4 text-slate-300">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-slate-400">location_on</span>
                        {bounty.city}
                      </div>
                    </td>
                    <td className="p-4 text-slate-400 text-sm">
                      {bounty.days} days ago
                    </td>
                    <td className="p-4">
                      <div className="inline-flex items-center gap-1.5 bg-[#f59e0b]/10 border border-[#f59e0b]/20 px-3 py-1 rounded-full">
                        <span className="text-[#f59e0b] font-bold">${bounty.amount}</span>
                        <span className="text-xs text-[#f59e0b]/80">USDC</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setSelectedBounty(bounty)}
                        className="bg-[#161e26] hover:bg-[#00d4aa] text-[#00d4aa] hover:text-[#002c23] border border-[#00d4aa]/30 px-4 py-2 rounded font-bold text-sm transition-all"
                      >
                        Claim
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Claim Instructions Modal */}
      {selectedBounty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedBounty(null)} />
          <div className="bg-[#161e26] border border-[#00d4aa]/30 rounded-2xl w-full max-w-lg relative z-10 p-6 md:p-8 shadow-[0_0_50px_rgba(0,212,170,0.1)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Claim Bounty</h2>
              <button onClick={() => setSelectedBounty(null)} className="text-slate-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="bg-[#0f151b] border border-white/5 rounded-xl p-4 mb-6 text-center">
              <div className="text-sm text-slate-400 mb-1">Escrowed Reward</div>
              <div className="text-3xl font-bold text-[#00d4aa]">${selectedBounty.amount} USDC</div>
              <div className="text-sm font-medium text-white mt-2">{selectedBounty.make} {selectedBounty.model}</div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-2">How to claim</h3>
              
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#00d4aa]/20 text-[#00d4aa] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <div className="text-white font-medium mb-1">Contact the Owner</div>
                  <div className="text-sm text-slate-400">The owner has provided a secure channel. You will arrange a public meetup or safe drop-off location.</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#00d4aa]/20 text-[#00d4aa] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <div className="text-white font-medium mb-1">Provide your Stellar Address</div>
                  <div className="text-sm text-slate-400">Give the owner your Stellar wallet address (or exchange deposit address) where you want the USDC sent.</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#00d4aa]/20 text-[#00d4aa] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <div className="text-white font-medium mb-1">Smart Contract Release</div>
                  <div className="text-sm text-slate-400">Upon receiving the device, the owner calls `confirm_recovery` on the Soroban smart contract, instantly releasing the escrowed funds to your address.</div>
                </div>
              </div>
            </div>

            <button 
              className="w-full bg-[#00d4aa] hover:bg-[#00d4aa]/90 text-[#002c23] py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined">chat</span>
              Reveal Owner Contact
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
