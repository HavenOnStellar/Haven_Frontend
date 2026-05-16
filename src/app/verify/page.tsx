'use client';

import { useState } from 'react';
import { getDeviceStatus, hashIMEI } from '../lib/havenClient';

type LookupState = 'empty' | 'loading' | 'success' | 'not-found' | 'error';

interface DeviceInfo {
  owner: string;
  deviceModel: string;
  isStolen: boolean;
  registeredAt: number;
  recoveryContact: string;
  insurer: string | null;
}

export default function VerifyPage() {
  const [input, setInput] = useState('');
  const [state, setState] = useState<LookupState>('empty');
  const [device, setDevice] = useState<DeviceInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;

    setState('loading');
    setDevice(null);
    setErrorMessage('');

    try {
      const hashedImei = /^([0-9a-fA-F]{64})$/.test(trimmed)
        ? trimmed
        : await hashIMEI(trimmed);

      const result = await getDeviceStatus(hashedImei);

      if (result) {
        setDevice(result);
        setState('success');
      } else {
        setState('not-found');
      }
    } catch {
      setErrorMessage('Unable to reach the Stellar network. Try again later.');
      setState('error');
    }
  }

  return (
    <div className="bg-[#0A0908] text-[#e6e1df] min-h-screen relative overflow-x-hidden flex flex-col">
      <div className="hero-gradient-orb" />

      {/* ===== NAVBAR ===== */}
      <nav className="bg-[#0A0908]/80 backdrop-blur-md sticky top-0 w-full z-50 border-b border-white/10 shadow-xl shadow-[#ffb596]/5">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-6 md:px-12 h-20">
          <a href="/" className="flex items-center gap-3">
            <div className="text-2xl md:text-4xl font-bold tracking-tight text-[#e6e1df]">
              Haven
            </div>
          </a>
          <div className="hidden md:flex items-center gap-12">
            <a href="/" className="text-[#e1bfb2] font-medium hover:text-[#e6e1df] transition-colors">Home</a>
            <a href="/verify" className="text-[#e6e1df] font-medium">Verify</a>
          </div>
          <a
            href="/"
            className="glass-panel hover:bg-white/5 rounded-lg transition-all duration-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#f49e00] border-[#E85D04] flex items-center gap-2 active:scale-95"
            style={{ borderColor: '#E85D04' }}
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Back to Home
          </a>
        </div>
      </nav>

      {/* ===== MAIN ===== */}
      <main className="flex-grow flex items-start justify-center relative z-10 px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-[600px] w-full flex flex-col items-center gap-10">
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#141312] border border-[#a98a7e]/20 flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[#ffb596] text-3xl">verified_user</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Device <span className="text-gradient-sunset">Verification</span>
            </h1>
            <p className="text-base text-[#e1bfb2] max-w-[480px] leading-relaxed">
              Enter a hashed IMEI (64 hex chars) or a raw IMEI number to look up the on-chain registration status.
            </p>
          </div>

          {/* Lookup Form */}
          <form onSubmit={handleLookup} className="w-full flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (state !== 'empty') setState('empty');
              }}
              placeholder="Enter IMEI or hashed IMEI"
              className="flex-1 glass-panel rounded-lg px-4 py-3 text-[#e6e1df] placeholder:text-[#e1bfb2]/50 border-[#E85D04] focus:outline-none focus:ring-2 focus:ring-[#f26411]/40 transition-all"
              style={{ borderColor: 'rgba(232,93,4,0.4)' }}
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="submit"
              disabled={state === 'loading' || !input.trim()}
              className="btn-gradient text-[#581e00] rounded-lg px-8 py-3 text-base font-bold shadow-lg shadow-[#f26411]/20 hover:shadow-[#f26411]/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[#f26411]/20 whitespace-nowrap"
            >
              {state === 'loading' ? 'Looking up...' : 'Verify'}
            </button>
          </form>

          {/* States */}
          {state === 'empty' && (
            <div className="w-full glass-panel rounded-xl p-8 text-center animate-fade-in-up">
              <span className="material-symbols-outlined text-[#e1bfb2]/40 text-5xl mb-4">search</span>
              <p className="text-[#e1bfb2] text-sm">Enter an IMEI above to check its status on the Haven Registry.</p>
            </div>
          )}

          {state === 'loading' && (
            <div className="w-full glass-panel rounded-xl p-8 text-center animate-fade-in-up">
              <div className="w-10 h-10 border-2 border-[#ffb596]/30 border-t-[#ffb596] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#e1bfb2] text-sm">Querying the Stellar network...</p>
            </div>
          )}

          {state === 'success' && device && (
            <div className="w-full glass-panel rounded-xl p-8 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-[#4caf50] text-2xl">check_circle</span>
                <h2 className="text-xl font-semibold text-[#e6e1df]">Device Found</h2>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2]/60 mb-1">Status</dt>
                  <dd className={`text-sm font-medium ${device.isStolen ? 'text-[#ffb4ab]' : 'text-[#4caf50]'}`}>
                    {device.isStolen ? 'Reported Stolen' : 'Registered — Clean'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2]/60 mb-1">Model</dt>
                  <dd className="text-sm font-medium text-[#e6e1df]">{device.deviceModel}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2]/60 mb-1">Owner</dt>
                  <dd className="text-sm font-mono text-[#e6e1df] truncate">{device.owner}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2]/60 mb-1">Registered</dt>
                  <dd className="text-sm font-medium text-[#e6e1df]">
                    {new Date(device.registeredAt * 1000).toLocaleDateString()}
                  </dd>
                </div>
                {device.insurer && (
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2]/60 mb-1">Insurer</dt>
                    <dd className="text-sm font-mono text-[#e6e1df] truncate">{device.insurer}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.08em] text-[#e1bfb2]/60 mb-1">Recovery Contact</dt>
                  <dd className="text-sm font-medium text-[#e6e1df]">{device.recoveryContact}</dd>
                </div>
              </dl>
            </div>
          )}

          {state === 'not-found' && (
            <div className="w-full glass-panel rounded-xl p-8 text-center animate-fade-in-up">
              <span className="material-symbols-outlined text-[#f49e00] text-5xl mb-4">warning</span>
              <h2 className="text-xl font-semibold text-[#e6e1df] mb-2">Device Not Found</h2>
              <p className="text-[#e1bfb2] text-sm">No registration record exists for this IMEI on the Haven Registry.</p>
            </div>
          )}

          {state === 'error' && (
            <div className="w-full glass-panel rounded-xl p-8 text-center animate-fade-in-up">
              <span className="material-symbols-outlined text-[#ffb4ab] text-5xl mb-4">error_outline</span>
              <h2 className="text-xl font-semibold text-[#e6e1df] mb-2">Lookup Failed</h2>
              <p className="text-[#e1bfb2] text-sm">{errorMessage}</p>
            </div>
          )}
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="w-full border-t border-white/10 bg-[#0A0908]/50 backdrop-blur-sm mt-auto z-10 relative">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#e1bfb2] text-center md:text-left">
            Haven — The Open Source Device Registry.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-12">
            <a href="/" className="text-sm text-[#e1bfb2] hover:text-[#ffb596] transition-colors duration-300">Home</a>
            <a href="https://github.com/HavenOnStellar" target="_blank" rel="noopener noreferrer" className="text-sm text-[#e1bfb2] hover:text-[#ffb596] transition-colors duration-300">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
