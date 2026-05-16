'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-[#0A0908] text-[#e6e1df] min-h-screen relative overflow-x-hidden flex flex-col">
      {/* Ambient Background Orb */}
      <div className="hero-gradient-orb" aria-hidden="true" />

      {/* ===== NAVBAR ===== */}
      <nav className="bg-[#0A0908]/80 backdrop-blur-md sticky top-0 w-full z-50 border-b border-white/10 shadow-xl shadow-[#ffb596]/5">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-6 md:px-12 h-20">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Haven Logo" width={48} height={48} className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            <div className="text-2xl md:text-4xl font-bold tracking-tight text-[#e6e1df]">
              Haven
            </div>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            <a href="#protocol" className="text-[#e1bfb2] font-medium hover:text-[#e6e1df] transition-colors">Ecosystem</a>
            <a href="#protocol" className="text-[#e1bfb2] font-medium hover:text-[#e6e1df] transition-colors">Protocol</a>
            <a href="#scale" className="text-[#e1bfb2] font-medium hover:text-[#e6e1df] transition-colors">Governance</a>
            <Link href="/verify" className="text-[#e1bfb2] font-medium hover:text-[#e6e1df] transition-colors">Verify</Link>
            <a href="https://github.com/HavenOnStellar" className="text-[#e1bfb2] font-medium hover:text-[#e6e1df] transition-colors">Docs</a>
          </div>
          {/* GitHub Button */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/HavenOnStellar"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel hover:bg-white/5 rounded-lg transition-all duration-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#f49e00] border-[#E85D04] flex items-center gap-2 active:scale-95"
              style={{ borderColor: '#E85D04' }}
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">terminal</span>
              GitHub
            </a>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#e6e1df] p-1 hover:bg-white/5 rounded-lg transition-all active:scale-95"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="material-symbols-outlined" aria-hidden="true">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-[#0A0908]/95 backdrop-blur-lg border-b border-white/10 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="flex flex-col p-6 gap-4">
              <a href="#protocol" onClick={() => setIsMenuOpen(false)} className="text-[#e1bfb2] text-lg font-medium hover:text-[#e6e1df] transition-colors">Ecosystem</a>
              <a href="#protocol" onClick={() => setIsMenuOpen(false)} className="text-[#e1bfb2] text-lg font-medium hover:text-[#e6e1df] transition-colors">Protocol</a>
              <a href="#scale" onClick={() => setIsMenuOpen(false)} className="text-[#e1bfb2] text-lg font-medium hover:text-[#e6e1df] transition-colors">Governance</a>
              <Link href="/verify" onClick={() => setIsMenuOpen(false)} className="text-[#e1bfb2] text-lg font-medium hover:text-[#e6e1df] transition-colors">Verify</Link>
              <a href="https://github.com/HavenOnStellar" onClick={() => setIsMenuOpen(false)} className="text-[#e1bfb2] text-lg font-medium hover:text-[#e6e1df] transition-colors">Docs</a>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-[800px] text-center flex flex-col items-center gap-12">
          {/* Network Status Chip */}
          <div className="glass-panel rounded-full px-3 py-1 inline-flex items-center gap-2 animate-fade-in-up">
            <div className="w-2 h-2 rounded-full bg-[#f49e00] animate-pulse-dot" />
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2]">Stellar Network Live</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-[48px] font-bold tracking-tight leading-[1.1] animate-fade-in-up animation-delay-100">
            Secure Your Device.<br />
            <span className="text-gradient-sunset">Defeat the Black Market.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-[#e1bfb2] max-w-[600px] mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            The decentralized device registry on Stellar providing cryptographic proof of loss and trustless recovery bounties.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up animation-delay-300">
            <a
              href="https://github.com/HavenOnStellar"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient text-[#581e00] rounded-lg px-10 md:px-20 py-3 text-xl font-bold shadow-lg shadow-[#f26411]/20 hover:shadow-[#f26411]/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 text-center"
            >
              Start Contributing
            </a>
            <a
              href="https://github.com/HavenOnStellar"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel rounded-lg px-10 md:px-20 py-3 text-xl font-bold text-[#f49e00] hover:bg-white/5 active:scale-95 transition-all duration-300 text-center"
              style={{ borderColor: '#E85D04' }}
            >
              Read the Docs
            </a>
          </div>

          {/* Trust Metrics */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full glass-panel rounded-xl p-6 animate-fade-in-up animation-delay-400">
            {[
              { value: '12k+', label: 'Devices Secured' },
              { value: '$2.4M', label: 'Bounties Paid' },
              { value: '100%', label: 'Trustless' },
              { value: '<2s', label: 'Verification Time' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-semibold text-[#e6e1df]">{stat.value}</span>
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2] mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ===== THE HAVEN PROTOCOL ===== */}
      <section id="protocol" className="w-full px-6 md:px-12 py-20 md:py-28 relative z-10 max-w-[1200px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#e6e1df] text-center mb-20 animate-fade-in-up">The Haven Protocol</h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Connecting Dashed Line (Desktop) */}
          <div className="hidden md:block absolute top-[80px] left-[15%] right-[15%] h-px border-t-2 border-dashed border-white/10 z-0" />

          {/* Mobile Vertical Line */}
          <div className="md:hidden absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-px border-l-2 border-dashed border-white/20 z-0" />

          {[
            { icon: 'fingerprint', title: 'Register', desc: 'Hash your device IMEI into a secure, stateful asset on the Stellar network.' },
            { icon: 'shield', title: 'The Killswitch', desc: 'If stolen, trigger an on-chain freeze and deposit a trustless USDC recovery bounty.' },
            { icon: 'handshake', title: 'Recover', desc: 'Incentivize secondary markets to return the device via code-enforced payouts.' },
          ].map((step, i) => (
            <div key={i} className="bg-[#211f1e]/50 backdrop-blur-md border border-white/10 rounded-xl p-8 md:p-12 flex flex-col items-center text-center relative z-10 hover:scale-[1.02] transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-[#141312] border border-[#a98a7e]/20 flex items-center justify-center mb-6 shadow-lg">
                <span className="material-symbols-outlined text-[#ffb596] text-3xl">{step.icon}</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#e6e1df] mb-3">{step.title}</h3>
              <p className="text-base text-[#e1bfb2] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BUILT FOR SCALE ===== */}
      <section id="scale" className="w-full px-6 md:px-12 py-20 md:py-28 relative z-10 max-w-[1200px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#e6e1df] text-center mb-20">Built for Scale</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: 'verified_user', title: 'Insurance Proof of Loss', desc: 'Eliminate double-dipping fraud. Haven transfers digital salvage rights to insurers upon claim payout.' },
            { icon: 'payments', title: 'Native USDC Bounties', desc: 'Leverage the Stellar network to fund escrows with stable, borderless liquidity.' },
            { icon: 'login', title: 'Frictionless Onboarding', desc: 'No seed phrases. Smart wallet integration allows everyday users to secure devices with just an email.' },
            { icon: 'api', title: 'Vendor API', desc: 'A public, rate-limited endpoint for merchants to verify clean inventory before purchasing wholesale.' },
          ].map((card, i) => (
            <div key={i} className="glass-panel rounded-xl p-8 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[#ffb596] text-3xl">{card.icon}</span>
                <h3 className="text-xl md:text-2xl font-semibold text-[#e6e1df]">{card.title}</h3>
              </div>
              <p className="text-base text-[#e1bfb2] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== POWERED BY ===== */}
      <section className="w-full px-6 md:px-12 py-12 relative z-10 max-w-[1200px] mx-auto flex flex-col items-center justify-center opacity-80 mb-20">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2] mb-6">Powered By</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-xl font-semibold text-[#e1bfb2]/70">
          {['Stellar', 'Soroban', 'Rust', 'Next.js', 'Tailwind'].map((tech) => (
            <span key={tech} className="hover:text-[#e1bfb2] transition-colors duration-300 cursor-default">{tech}</span>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="w-full border-t border-white/10 bg-[#0A0908]/50 backdrop-blur-sm mt-auto z-10 relative">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#e1bfb2] text-center md:text-left">
            Haven — The Open Source Device Registry.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-12">
            <Link href="/verify" className="text-sm text-[#e1bfb2] hover:text-[#ffb596] transition-colors duration-300">Verify Device</Link>
            <a href="https://github.com/HavenOnStellar" target="_blank" rel="noopener noreferrer" className="text-sm text-[#e1bfb2] hover:text-[#ffb596] transition-colors duration-300">GitHub</a>
            <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="text-sm text-[#e1bfb2] hover:text-[#ffb596] transition-colors duration-300">Documentation</a>
            <a href="https://stellar.org/bounties" target="_blank" rel="noopener noreferrer" className="text-sm text-[#e1bfb2] hover:text-[#ffb596] transition-colors duration-300">Stellar Bounties</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
