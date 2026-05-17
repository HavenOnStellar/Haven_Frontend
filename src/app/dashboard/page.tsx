'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WalletConnect } from '@/components/WalletConnect';
import { DeviceCard } from '@/components/DeviceCard';
import { HashPreview } from '@/components/HashPreview';

const mockDevices = [
  { id: 'dev_8f92a1b3c4', make: 'Apple', model: 'iPhone 15 Pro', color: 'Titanium', registeredAt: 'Oct 12, 2025', status: 'Active' as const },
  { id: 'dev_3b4c5d6e7f', make: 'Samsung', model: 'Galaxy S23', color: 'Phantom Black', registeredAt: 'Jan 05, 2026', status: 'Stolen' as const, bounty: 150 },
  { id: 'dev_1a2b3c4d5e', make: 'Google', model: 'Pixel 8', color: 'Obsidian', registeredAt: 'Mar 22, 2026', status: 'Recovered' as const },
];

const mockActivity = [
  { id: 1, text: 'Bounty posted for Galaxy S23 ($150)', time: '2 days ago', type: 'stolen' },
  { id: 2, text: 'Galaxy S23 reported stolen', time: '2 days ago', type: 'stolen' },
  { id: 3, text: 'Pixel 8 registered on-chain', time: 'Mar 22, 2026', type: 'register' },
  { id: 4, text: 'iPhone 15 Pro registered on-chain', time: 'Oct 12, 2025', type: 'register' },
];

export default function Dashboard() {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [newImei, setNewImei] = useState('');
  const [make, setMake] = useState('Apple');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');

  return (
    <div className="flex-grow flex flex-col w-full relative z-10 bg-[#080c10]">
      {/* NAVBAR */}
      <nav className="bg-[#080c10] border-b border-white/5 sticky top-0 w-full z-40">
        <div className="flex justify-between items-center max-w-[1400px] mx-auto px-6 md:px-12 h-20">
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Image src="/logo.png" alt="Haven Logo" width={32} height={32} className="object-contain" />
            </Link>
            <div className="text-xl font-bold tracking-tight text-white hidden sm:block">
              Haven
            </div>
            <div className="w-px h-6 bg-white/10 mx-2 hidden sm:block" />
            <div className="text-slate-400 font-medium hidden sm:block">Dashboard</div>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/bounties" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Bounties</Link>
            <Link href="/claims" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Claims</Link>
            <WalletConnect />
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-[1400px] mx-auto px-6 md:px-12 py-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Devices</h1>
            <p className="text-slate-400">Manage your secured hardware and active bounties.</p>
          </div>
          <button 
            onClick={() => setRegisterModalOpen(true)}
            className="bg-[#00d4aa] hover:bg-[#00d4aa]/90 text-[#002c23] px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">add</span>
            Register Device
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass-panel rounded-xl p-5 border-l-2 border-[#0ea5e9]">
            <div className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Total Secured</div>
            <div className="text-3xl font-bold text-white">3</div>
          </div>
          <div className="glass-panel rounded-xl p-5 border-l-2 border-[#f59e0b]">
            <div className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Currently Stolen</div>
            <div className="text-3xl font-bold text-[#f59e0b]">1</div>
          </div>
          <div className="glass-panel rounded-xl p-5 border-l-2 border-[#00d4aa]">
            <div className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Recovered</div>
            <div className="text-3xl font-bold text-[#00d4aa]">1</div>
          </div>
          <div className="glass-panel rounded-xl p-5 border-l-2 border-white/20">
            <div className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Total Bounties Posted</div>
            <div className="text-3xl font-bold text-white">$150</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Devices Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-6">Registered Hardware</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mockDevices.map(dev => (
                <DeviceCard key={dev.id} {...dev} />
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="glass-panel rounded-xl p-6">
              <div className="flex flex-col gap-6">
                {mockActivity.map((activity, i) => (
                  <div key={activity.id} className="flex gap-4 relative">
                    {i !== mockActivity.length - 1 && (
                      <div className="absolute top-8 left-[11px] bottom-[-24px] w-px bg-white/10" />
                    )}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 z-10 ${
                      activity.type === 'stolen' ? 'bg-[#f59e0b]/20 text-[#f59e0b]' : 'bg-[#00d4aa]/20 text-[#00d4aa]'
                    }`}>
                      <span className="material-symbols-outlined text-[14px]">
                        {activity.type === 'stolen' ? 'warning' : 'fingerprint'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{activity.text}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setRegisterModalOpen(false)} />
          <div className="bg-[#161e26] border border-white/10 rounded-2xl w-full max-w-xl relative z-10 p-6 md:p-8 animate-fade-in-up shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Register New Device</h2>
              <button onClick={() => setRegisterModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Make</label>
                <select 
                  value={make} onChange={e => setMake(e.target.value)}
                  className="w-full bg-[#0f151b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00d4aa]/50"
                >
                  <option>Apple</option>
                  <option>Samsung</option>
                  <option>Google</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Model</label>
                <input 
                  type="text" placeholder="e.g. iPhone 15 Pro"
                  value={model} onChange={e => setModel(e.target.value)}
                  className="w-full bg-[#0f151b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00d4aa]/50"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Color</label>
              <input 
                type="text" placeholder="e.g. Titanium"
                value={color} onChange={e => setColor(e.target.value)}
                className="w-full bg-[#0f151b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00d4aa]/50"
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">IMEI Number</label>
              <input 
                type="text" placeholder="Enter 15-digit IMEI"
                value={newImei} onChange={e => setNewImei(e.target.value.replace(/\D/g, '').slice(0, 15))}
                className="w-full bg-[#0f151b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00d4aa]/50 mb-4"
              />
              <HashPreview imei={newImei} />
            </div>
            
            <button 
              className="w-full bg-[#00d4aa] hover:bg-[#00d4aa]/90 text-[#002c23] py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={newImei.length < 15 || !model}
            >
              <span className="material-symbols-outlined">fingerprint</span>
              Sign & Register on Soroban
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
