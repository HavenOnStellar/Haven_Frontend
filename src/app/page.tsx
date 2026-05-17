'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WalletConnect } from '@/components/WalletConnect';
import { StolenFeed } from '@/components/StolenFeed';
import { HashPreview } from '@/components/HashPreview';

export default function Home() {
  const [imei, setImei] = useState('');
  const [bountyAmount, setBountyAmount] = useState(100);

  return (
    <div className="relative flex flex-col min-h-screen z-10 w-full overflow-hidden">
      {/* Ambient Background Orb */}
      <div className="hero-gradient-orb" />

      {/* ===== NAVBAR ===== */}
      <nav className="bg-[#080c10]/80 backdrop-blur-md sticky top-0 w-full z-50 border-b border-white/5 shadow-xl">
        <div className="flex justify-between items-center max-w-[1400px] mx-auto px-6 md:px-12 h-20">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Haven Logo" width={32} height={32} className="object-contain" />
            <div className="text-2xl font-bold tracking-tight text-white">
              Haven
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/bounties" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Bounty Board</Link>
            <Link href="/claims" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Claims</Link>
            <a href="https://github.com/HavenOnStellar" target="_blank" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">GitHub</a>
          </div>
          
          <div>
            <WalletConnect />
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <main className="w-full px-6 md:px-12 py-16 md:py-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Live Stolen Feed */}
          <div className="lg:col-span-3 hidden lg:block animate-fade-in-up">
            <StolenFeed />
          </div>

          {/* CENTER: Value Proposition */}
          <div className="lg:col-span-5 flex flex-col gap-10 items-center lg:items-start text-center lg:text-left animate-fade-in-up animation-delay-100">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.1] mb-6">
                Make smartphone theft <span className="text-gradient-teal">economically unviable.</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-[500px]">
                Haven turns physical hardware into stateful on-chain assets. We use trustless USDC bounties to outbid the black market and recover devices.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              <div className="glass-panel rounded-xl p-5 border-l-2 border-l-[#00d4aa]">
                <div className="text-3xl font-bold text-white mb-1">24k+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Devices Protected</div>
              </div>
              <div className="glass-panel rounded-xl p-5 border-l-2 border-l-[#f59e0b]">
                <div className="text-3xl font-bold text-white mb-1">$1.2M</div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Bounties</div>
              </div>
              <div className="glass-panel rounded-xl p-5 border-l-2 border-l-[#10b981]">
                <div className="text-3xl font-bold text-white mb-1">8,402</div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Recovered</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Quick Action Panel */}
          <div className="lg:col-span-4 w-full animate-fade-in-up animation-delay-200">
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10 w-full max-w-[450px] mx-auto">
              <h3 className="text-xl font-bold text-white mb-2">Secure Your Device</h3>
              <p className="text-sm text-slate-400 mb-6">Enter your 15-digit IMEI to generate a secure cryptographic hash.</p>
              
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">IMEI Number</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-slate-500">pin</span>
                  <input
                    type="text"
                    value={imei}
                    onChange={(e) => setImei(e.target.value.replace(/\D/g, '').slice(0, 15))}
                    placeholder="e.g. 359123456789012"
                    className="w-full bg-[#080c10] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#00d4aa]/50 transition-colors"
                  />
                </div>
              </div>

              <HashPreview imei={imei} />

              <div className="mt-8">
                <Link href="/dashboard" className="w-full bg-[#00d4aa] hover:bg-[#00d4aa]/90 text-[#002c23] py-3 rounded-lg font-bold text-center flex items-center justify-center gap-2 transition-colors">
                  Continue to Registry
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ===== HOW IT WORKS (Timeline) ===== */}
      <section className="w-full bg-[#0f151b] border-y border-white/5 py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How the Protocol Works</h2>
            <p className="text-slate-400 max-w-xl mx-auto">A seamless lifecycle that flips the incentives of device theft.</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-px bg-gradient-to-r from-[#00d4aa]/10 via-[#00d4aa]/50 to-[#00d4aa]/10" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
              {[
                { icon: 'fingerprint', title: 'Register', desc: 'Your IMEI is hashed and stored on the Soroban ledger.' },
                { icon: 'warning', title: 'Report Stolen', desc: 'Trigger the killswitch and deposit a USDC bounty into escrow.' },
                { icon: 'currency_exchange', title: 'Bounty Posted', desc: 'The device becomes worthless to resell, but valuable to return.' },
                { icon: 'task_alt', title: 'Finder Paid', desc: 'Smart contract automatically releases the escrowed USDC upon return.' },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-full bg-[#161e26] border border-[#00d4aa]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#00d4aa]/60 transition-all shadow-[0_0_15px_rgba(0,212,170,0.05)]">
                    <span className="material-symbols-outlined text-3xl text-[#00d4aa]">{step.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOUNTY CALCULATOR ===== */}
      <section className="w-full py-24 px-6 md:px-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 px-3 py-1 rounded-full mb-6">
              <span className="material-symbols-outlined text-[16px] text-[#0ea5e9]">calculate</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0ea5e9]">Economic Design</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Change the incentives. Collapse the market.</h2>
            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              In emerging markets, a stolen phone typically sells to a fence for $15-$40. By posting a trustless bounty higher than the fence price, rational actors will choose to return the device rather than sell it.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              We don&apos;t track devices. We manipulate the microeconomics of theft.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-8 border border-[#0ea5e9]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0ea5e9]/10 blur-[80px] rounded-full pointer-events-none" />
            
            <h3 className="text-xl font-bold text-white mb-6">Bounty Economics Calculator</h3>
            
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">Your Escrowed Bounty</span>
                <span className="text-sm font-bold text-[#00d4aa]">${bountyAmount} USDC</span>
              </div>
              <input 
                type="range" 
                min="25" max="250" step="25"
                value={bountyAmount}
                onChange={(e) => setBountyAmount(parseInt(e.target.value))}
                className="w-full accent-[#00d4aa]"
              />
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>$25</span>
                <span>$250</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-[#161e26] rounded-xl p-4 border border-[#f59e0b]/20">
                <div className="text-xs font-bold uppercase text-slate-400 mb-1">Value to Fence</div>
                <div className="text-2xl font-bold text-[#f59e0b] mb-1">$35</div>
                <div className="text-xs text-slate-500">Average black market</div>
              </div>
              <div className="bg-[#161e26] rounded-xl p-4 border border-[#00d4aa]/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#00d4aa]/5" />
                <div className="text-xs font-bold uppercase text-[#00d4aa] mb-1 relative z-10">Value to Return</div>
                <div className="text-2xl font-bold text-[#00d4aa] mb-1 relative z-10">${bountyAmount}</div>
                <div className="text-xs text-[#00d4aa]/70 relative z-10">Guaranteed by smart contract</div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <div className="text-lg font-bold text-white">
                Returning is <span className="text-[#00d4aa]">{(bountyAmount / 35).toFixed(1)}x</span> more profitable
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ARCHITECTURE PILLARS ===== */}
      <section className="w-full bg-[#0f151b] border-t border-white/5 py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px border-t border-dashed border-[#334155] z-0" />

            {[
              { title: 'Registry Contract', icon: 'app_registration', content: 'Stores irreversible hashed records of ownership. Vendors can query the registry via API to ensure a device is clean before purchasing.' },
              { title: 'Bounty Escrow', icon: 'lock', content: 'Locks USDC natively on Stellar. If a finder initiates a return, the smart contract automatically routes funds without intermediary delay.' },
              { title: 'Insurance Claims', icon: 'assignment_turned_in', content: 'Acts as cryptographic proof-of-loss. Once a claim is paid, device authority is transferred to the insurer, preventing double-dipping fraud.' },
            ].map((pillar, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl relative z-10 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded bg-[#161e26] border border-white/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#0ea5e9] text-2xl">{pillar.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{pillar.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="w-full bg-[#080c10] border-t border-white/10 py-8 z-10 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Haven Logo" width={24} height={24} className="object-contain" />
            <p className="text-sm font-bold text-white">Haven Protocol</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://haven-docs.gitbook.io/haven" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">menu_book</span>
              Documentation
            </a>
            <p className="text-xs text-slate-500">Built on Stellar Soroban</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
