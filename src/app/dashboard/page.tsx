'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Device {
  id: string;
  model: string;
  status: 'registered' | 'stolen' | 'recovered';
  registeredAt: string;
  bounty?: string;
  finder?: string;
}

const MOCK_DEVICES: Device[] = [
  { id: '1', model: 'iPhone 15 Pro', status: 'registered', registeredAt: '2026-04-12' },
  { id: '2', model: 'Samsung Galaxy S25', status: 'stolen', registeredAt: '2026-03-01', bounty: '500 USDC', finder: 'G...7X3K' },
  { id: '3', model: 'Google Pixel 9', status: 'recovered', registeredAt: '2026-02-18', bounty: '300 USDC', finder: 'A...9M2P' },
];

export default function DashboardPage() {
  const [devices] = useState<Device[]>(MOCK_DEVICES);

  const registered = devices.filter((d) => d.status === 'registered').length;
  const stolen = devices.filter((d) => d.status === 'stolen').length;
  const recovered = devices.filter((d) => d.status === 'recovered').length;

  return (
    <div className="bg-[#0A0908] text-[#e6e1df] min-h-screen relative overflow-x-hidden flex flex-col">
      <div className="hero-gradient-orb" />

      {/* ===== NAVBAR ===== */}
      <nav className="bg-[#0A0908]/80 backdrop-blur-md sticky top-0 w-full z-50 border-b border-white/10 shadow-xl shadow-[#ffb596]/5">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-6 md:px-12 h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-2xl md:text-4xl font-bold tracking-tight text-[#e6e1df]">Haven</div>
          </Link>
          <div className="hidden md:flex items-center gap-12">
            <Link href="/" className="text-[#e1bfb2] font-medium hover:text-[#e6e1df] transition-colors">Home</Link>
            <Link href="/verify" className="text-[#e1bfb2] font-medium hover:text-[#e6e1df] transition-colors">Verify</Link>
            <Link href="/dashboard" className="text-[#e6e1df] font-medium">Dashboard</Link>
          </div>
          <Link
            href="/"
            className="glass-panel hover:bg-white/5 rounded-lg transition-all duration-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#f49e00] border-[#E85D04] flex items-center gap-2 active:scale-95"
            style={{ borderColor: '#E85D04' }}
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* ===== MAIN ===== */}
      <main className="flex-grow relative z-10 px-6 md:px-12 py-20 md:py-28 max-w-[1200px] mx-auto w-full">
        {/* Banner */}
        <div className="glass-panel rounded-xl p-6 mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-[#f49e00]/30" style={{ borderColor: 'rgba(244,158,0,0.3)' }}>
          <span className="material-symbols-outlined text-[#f49e00] text-2xl flex-shrink-0">construction</span>
          <div>
            <h2 className="text-lg font-semibold text-[#e6e1df]">Dashboard Preview</h2>
            <p className="text-sm text-[#e1bfb2]">
              Full contract-backed data and wallet integration are coming soon. The data below is mocked for demonstration.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Registered', value: registered, icon: 'devices' },
            { label: 'Stolen', value: stolen, icon: 'warning' },
            { label: 'Recovered', value: recovered, icon: 'check_circle' },
            { label: 'Active Bounties', value: stolen, icon: 'payments' },
          ].map((stat) => (
            <div key={stat.label} className="glass-panel rounded-xl p-6 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[#ffb596] text-2xl mb-2">{stat.icon}</span>
              <span className="text-2xl font-semibold text-[#e6e1df]">{stat.value}</span>
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2] mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Device List */}
        <h2 className="text-2xl font-bold text-[#e6e1df] mb-6">Your Devices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <div key={device.id} className="glass-panel rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#e6e1df]">{device.model}</h3>
                  <p className="text-xs text-[#e1bfb2] mt-1">Registered {device.registeredAt}</p>
                </div>
                <StatusBadge status={device.status} />
              </div>

              {device.status === 'stolen' && (
                <div className="bg-[#ffb4ab]/10 rounded-lg p-3 flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#e1bfb2]">Bounty</span>
                    <span className="text-[#ffb4ab] font-medium">{device.bounty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#e1bfb2]">Finder</span>
                    <span className="text-[#e6e1df] font-mono text-xs">{device.finder}</span>
                  </div>
                </div>
              )}

              {device.status === 'recovered' && (
                <div className="bg-[#4caf50]/10 rounded-lg p-3 flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#e1bfb2]">Bounty Paid</span>
                    <span className="text-[#4caf50] font-medium">{device.bounty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#e1bfb2]">Returned To</span>
                    <span className="text-[#e6e1df] font-mono text-xs">{device.finder}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-auto pt-2">
                <button className="flex-1 glass-panel rounded-lg py-2 text-sm font-medium text-[#e1bfb2] hover:text-[#e6e1df] hover:bg-white/5 transition-all active:scale-95">
                  Details
                </button>
                {device.status === 'registered' && (
                  <button className="flex-1 btn-gradient rounded-lg py-2 text-sm font-bold text-[#581e00] active:scale-95 transition-all">
                    Report Stolen
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recovery History */}
        <h2 className="text-2xl font-bold text-[#e6e1df] mb-6 mt-16">Recovery History</h2>
        <div className="glass-panel rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2]/60">Date</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2]/60">Device</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2]/60">Bounty</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2]/60">Status</th>
              </tr>
            </thead>
            <tbody>
              {devices
                .filter((d) => d.status === 'stolen' || d.status === 'recovered')
                .map((device) => (
                  <tr key={device.id} className="border-b border-white/5 last:border-0">
                    <td className="px-6 py-4 text-[#e1bfb2]">{device.registeredAt}</td>
                    <td className="px-6 py-4 text-[#e6e1df] font-medium">{device.model}</td>
                    <td className="px-6 py-4 text-[#e6e1df]">{device.bounty}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={device.status} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="w-full border-t border-white/10 bg-[#0A0908]/50 backdrop-blur-sm mt-auto z-10 relative">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#e1bfb2] text-center md:text-left">
            Haven — The Open Source Device Registry.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-12">
            <Link href="/" className="text-sm text-[#e1bfb2] hover:text-[#ffb596] transition-colors duration-300">Home</Link>
            <Link href="/verify" className="text-sm text-[#e1bfb2] hover:text-[#ffb596] transition-colors duration-300">Verify</Link>
            <a href="https://github.com/HavenOnStellar" target="_blank" rel="noopener noreferrer" className="text-sm text-[#e1bfb2] hover:text-[#ffb596] transition-colors duration-300">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatusBadge({ status }: { status: Device['status'] }) {
  const config = {
    registered: { bg: 'bg-[#f49e00]/10', text: 'text-[#f49e00]', label: 'Registered' },
    stolen: { bg: 'bg-[#ffb4ab]/10', text: 'text-[#ffb4ab]', label: 'Stolen' },
    recovered: { bg: 'bg-[#4caf50]/10', text: 'text-[#4caf50]', label: 'Recovered' },
  }[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.08em] ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.text.replace('text-', 'bg-')}`} />
      {config.label}
    </span>
  );
}
