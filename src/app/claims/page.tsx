'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WalletConnect } from '@/components/WalletConnect';

const mockClaims = [
  { id: 'clm_9a8b7c6d', deviceId: 'dev_3b4c5d6e7f', make: 'Samsung', model: 'Galaxy S23', status: 'Verified', submittedAt: 'Feb 12, 2026', insurer: 'Lemonade Insurance (GABC...XYZ)' },
  { id: 'clm_1z2y3x4w', deviceId: 'dev_7p8q9r0s1t', make: 'Apple', model: 'iPhone 13', status: 'Paid', submittedAt: 'Nov 05, 2025', insurer: 'Allstate (GBDC...LMN)' },
];

export default function ClaimsPage() {
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [insurerAddress, setInsurerAddress] = useState('');

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
            <Link href="/claims" className="text-slate-400 hover:text-white font-medium transition-colors hidden sm:block">Insurance Claims</Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/bounties" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Bounties</Link>
            <WalletConnect />
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-[1000px] mx-auto px-6 md:px-12 py-10">
        <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Insurance Claims</h1>
            <p className="text-slate-400">Cryptographic proof-of-loss and digital salvage rights transfer.</p>
          </div>
          <button 
            onClick={() => setSubmitModalOpen(true)}
            className="bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
          >
            <span className="material-symbols-outlined">assignment_add</span>
            File New Claim
          </button>
        </div>

        <div className="space-y-6">
          {mockClaims.map(claim => (
            <div key={claim.id} className="glass-panel rounded-2xl p-6 md:p-8 border border-white/5 relative overflow-hidden group hover:border-[#0ea5e9]/30 transition-colors">
              {claim.status === 'Verified' && <div className="absolute top-0 left-0 w-1 h-full bg-[#00d4aa]" />}
              {claim.status === 'Paid' && <div className="absolute top-0 left-0 w-1 h-full bg-[#10b981]" />}
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold text-white">{claim.make} {claim.model}</span>
                    <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      claim.status === 'Verified' ? 'bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20' : 
                      'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20'
                    }`}>
                      {claim.status}
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 flex flex-col sm:flex-row sm:gap-4">
                    <span>Claim ID: <span className="font-mono text-slate-300">{claim.id}</span></span>
                    <span className="hidden sm:inline">•</span>
                    <span>Device ID: <span className="font-mono text-slate-300">{claim.deviceId.slice(0, 8)}...</span></span>
                  </div>
                  <div className="text-sm text-slate-400 mt-2">
                    Insurer: <span className="text-slate-300">{claim.insurer}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="text-right hidden md:block mr-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Submitted</div>
                    <div className="text-sm text-slate-300">{claim.submittedAt}</div>
                  </div>
                  
                  <button className="flex-1 md:flex-none bg-[#161e26] hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Certificate
                  </button>
                </div>
              </div>

              {claim.status === 'Paid' && (
                <div className="mt-6 pt-4 border-t border-white/5 flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#10b981] mt-0.5 text-[18px]">gavel</span>
                  <div>
                    <div className="text-sm font-medium text-white">Salvage Rights Transferred</div>
                    <div className="text-xs text-slate-400">Authority over this device asset has been permanently transferred to the insurer. You no longer have owner controls on the registry.</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Submit Claim Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSubmitModalOpen(false)} />
          <div className="bg-[#161e26] border border-[#0ea5e9]/30 rounded-2xl w-full max-w-xl relative z-10 p-6 md:p-8 shadow-[0_0_50px_rgba(14,165,233,0.1)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">File Insurance Claim</h2>
              <button onClick={() => setSubmitModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <p className="text-sm text-slate-400 mb-6">
              Filing a claim uses your on-chain theft report as immutable proof-of-loss. If the claim is paid, device authority will automatically transfer to the insurer.
            </p>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Select Stolen Device</label>
              <select 
                value={selectedDevice} 
                onChange={e => setSelectedDevice(e.target.value)}
                className="w-full bg-[#0f151b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9]/50"
              >
                <option value="">-- Select a device --</option>
                <option value="dev_3b4c5d6e7f">Samsung Galaxy S23 (Stolen on Jan 10, 2026)</option>
              </select>
            </div>

            {selectedDevice && (
              <div className="bg-[#0f151b] border border-[#00d4aa]/20 rounded-lg p-4 mb-6 flex items-start gap-3">
                <span className="material-symbols-outlined text-[#00d4aa] mt-0.5">verified_user</span>
                <div>
                  <div className="text-sm font-bold text-[#00d4aa] mb-1">On-Chain Theft Report Verified</div>
                  <div className="text-xs text-slate-300 font-mono break-all">Tx: 0x8f2a...9b1c (Ledger 4839100)</div>
                </div>
              </div>
            )}

            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Insurer Stellar Address</label>
              <input 
                type="text" 
                placeholder="G..."
                value={insurerAddress} 
                onChange={e => setInsurerAddress(e.target.value)}
                className="w-full bg-[#0f151b] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#0ea5e9]/50"
              />
              <p className="text-xs text-slate-500 mt-2">The address provided by your insurance company for salvage transfer.</p>
            </div>
            
            <button 
              className="w-full bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedDevice || !insurerAddress}
            >
              <span className="material-symbols-outlined">assignment_turned_in</span>
              Submit Proof of Loss to Contract
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
