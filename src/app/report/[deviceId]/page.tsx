'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { WalletConnect } from '@/components/WalletConnect';
import { StatusBadge } from '@/components/StatusBadge';

// In Next.js App Router, params are accessed asynchronously or via a hook depending on the version.
// For client components we use useParams().

export default function ReportStolenPage() {
  const params = useParams();
  const deviceId = params.deviceId as string;
  
  const [bountyAmount, setBountyAmount] = useState(100);
  const [step, setStep] = useState<'config' | 'approving' | 'creating' | 'success'>('config');

  // Mock device info
  const device = {
    id: deviceId || 'dev_8f92a1b3c4',
    make: 'Apple',
    model: 'iPhone 15 Pro',
    color: 'Titanium',
    registeredAt: 'Oct 12, 2025'
  };

  const handleReport = () => {
    setStep('approving');
    // Mock approve USDC
    setTimeout(() => {
      setStep('creating');
      // Mock create bounty transaction
      setTimeout(() => {
        setStep('success');
      }, 2000);
    }, 2000);
  };

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
            <Link href="/dashboard" className="text-slate-400 hover:text-white font-medium transition-colors hidden sm:block">Dashboard</Link>
          </div>
          <WalletConnect />
        </div>
      </nav>

      <main className="flex-grow w-full max-w-[800px] mx-auto px-6 md:px-12 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Dashboard
        </Link>

        {step === 'config' && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-[#f59e0b]/20 flex items-center justify-center border border-[#f59e0b]/30">
                <span className="material-symbols-outlined text-[#f59e0b] text-2xl">warning</span>
              </div>
              <h1 className="text-3xl font-bold text-white">Report Device Stolen</h1>
            </div>
            <p className="text-slate-400 mb-10 ml-16">Trigger the on-chain killswitch and post a recovery bounty.</p>

            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10 mb-8">
              <h2 className="text-lg font-bold text-white mb-4">Device Information</h2>
              <div className="flex justify-between items-center bg-[#161e26] p-4 rounded-xl border border-white/5">
                <div>
                  <div className="text-xs text-slate-500 font-mono mb-1">{device.id}</div>
                  <div className="text-lg font-bold text-white">{device.make} {device.model}</div>
                  <div className="text-sm text-slate-400">{device.color}</div>
                </div>
                <StatusBadge status="Active" />
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-[#f59e0b]/20 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f59e0b]/5 blur-[80px] rounded-full pointer-events-none" />
              
              <h2 className="text-xl font-bold text-white mb-2">Set Recovery Bounty</h2>
              <p className="text-sm text-slate-400 mb-6">Incentivize the return of your device by locking USDC in a trustless escrow.</p>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-300">Bounty Amount</span>
                  <span className="text-lg font-bold text-[#f59e0b]">${bountyAmount} USDC</span>
                </div>
                <input 
                  type="range" 
                  min="25" max="250" step="25"
                  value={bountyAmount}
                  onChange={(e) => setBountyAmount(parseInt(e.target.value))}
                  className="w-full accent-[#f59e0b]"
                />
                <div className="flex justify-between mt-4">
                  {[25, 50, 100, 250].map(preset => (
                    <button 
                      key={preset}
                      onClick={() => setBountyAmount(preset)}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                        bountyAmount === preset 
                          ? 'bg-[#f59e0b] text-[#581e00]' 
                          : 'bg-[#161e26] text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#161e26] p-4 rounded-xl border border-[#0ea5e9]/20 flex gap-4 mt-8 items-start">
                <span className="material-symbols-outlined text-[#0ea5e9] mt-0.5">info</span>
                <div>
                  <div className="text-sm font-bold text-[#0ea5e9] mb-1">The Economics of Recovery</div>
                  <div className="text-sm text-slate-300">
                    At a <span className="font-bold text-white">${bountyAmount}</span> bounty, returning your phone is worth <span className="font-bold text-white">{(bountyAmount / 35).toFixed(1)}x more</span> than selling it to a black market fence (avg. $35). Rational actors will return the device.
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleReport}
              className="w-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-[#581e00] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">lock</span>
              Deposit ${bountyAmount} USDC & Report Stolen
            </button>
          </div>
        )}

        {(step === 'approving' || step === 'creating') && (
          <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center animate-fade-in-up mt-12 border border-[#f59e0b]/20">
            <div className="relative mb-8">
              <div className="w-20 h-20 border-4 border-[#161e26] border-t-[#f59e0b] rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#f59e0b] text-2xl">
                  {step === 'approving' ? 'currency_exchange' : 'lock'}
                </span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              {step === 'approving' ? 'Approving USDC Deposit' : 'Creating Bounty Escrow'}
            </h2>
            <p className="text-slate-400 max-w-[300px]">
              {step === 'approving' 
                ? 'Please sign the transaction in your Freighter wallet to approve the USDC transfer.' 
                : 'Writing to the Soroban ledger to freeze the asset and lock funds in escrow.'}
            </p>

            <div className="mt-8 flex gap-2">
              <div className={`w-2 h-2 rounded-full ${step === 'approving' ? 'bg-[#f59e0b] animate-pulse' : 'bg-[#00d4aa]'}`} />
              <div className={`w-2 h-2 rounded-full ${step === 'creating' ? 'bg-[#f59e0b] animate-pulse' : 'bg-[#161e26]'}`} />
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="glass-panel rounded-2xl p-8 md:p-12 text-center animate-fade-in-up mt-12 border border-[#00d4aa]/30 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#00d4aa]/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="w-24 h-24 rounded-full bg-[#00d4aa]/20 border border-[#00d4aa]/50 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[#00d4aa] text-5xl">task_alt</span>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Device Reported Stolen</h2>
            <p className="text-slate-300 mb-8 max-w-[400px] mx-auto">
              Your device has been frozen on-chain and your <span className="font-bold text-[#00d4aa]">${bountyAmount} USDC</span> bounty is now active in escrow.
            </p>

            <div className="bg-[#161e26] border border-white/10 rounded-xl p-4 mb-8 text-left">
              <div className="text-xs font-bold uppercase text-slate-500 mb-2">Shareable Bounty Link</div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={`https://haven.network/bounties/${device.id}`}
                  className="flex-grow bg-[#0f151b] border border-white/5 rounded pl-3 pr-2 py-2 text-sm text-[#00d4aa] focus:outline-none"
                />
                <button className="bg-white/5 hover:bg-white/10 text-white px-4 rounded transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>
            </div>

            <Link 
              href="/dashboard"
              className="inline-flex bg-[#00d4aa] hover:bg-[#00d4aa]/90 text-[#002c23] px-8 py-3 rounded-lg font-bold transition-all active:scale-95"
            >
              Return to Dashboard
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
