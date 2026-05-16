<div align="center">
  <h1>🛡️ Haven Frontend</h1>
  <p><strong>The Landing Page & Client Application for Haven Protocol</strong></p>
  <p>Next.js 16 + Stellar SDK + Tailwind CSS v4</p>

  <br />

  [![License: MIT](https://img.shields.io/badge/License-MIT-48a9a6.svg)](https://opensource.org/licenses/MIT)
  [![Built on Stellar](https://img.shields.io/badge/Built%20on-Stellar-000000.svg)](https://stellar.org)
  [![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](./CONTRIBUTING.md)
</div>

---

## Overview

This is the frontend application for [Haven Protocol](https://github.com/HavenOnStellar) — a decentralized device registry on Stellar that makes smartphone theft economically unviable.

The frontend currently includes:
- **Landing page** — dark-mode marketing page with amber/orange gradient design system
- **Stellar SDK client stub** — typed functions ready to connect to the deployed Soroban contract
- **Freighter wallet helpers** — typed connection, detection, and state reading
- **Device verification** — IMEI lookup page with validation
- **Dashboard scaffold** — mock device management UI
- **Responsive design** — mobile-first layout with desktop breakpoints

> **Looking for the smart contracts?** See [`haven-contracts`](https://github.com/HavenOnStellar/Haven_Contracts)

---

## ⚡ Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| **Node.js** | 18+ |
| **npm** | 9+ |

### Setup

```bash
git clone https://github.com/HavenOnStellar/Haven_Frontend.git
cd haven-frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local
# Edit .env.local with your configuration (see below)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

### Environment Configuration

The frontend requires environment variables for Stellar network and contract configuration:

| Variable | Description | Default for Local Dev |
|----------|-------------|----------------------|
| `NEXT_PUBLIC_STELLAR_NETWORK` | Stellar network to connect to (`testnet` or `mainnet`) | `testnet` |
| `NEXT_PUBLIC_HAVEN_CONTRACT_ID` | Deployed Haven Registry contract ID | See `.env.local.example` |

**For local testnet development:**

1. Copy `.env.local.example` to `.env.local`
2. Keep `NEXT_PUBLIC_STELLAR_NETWORK=testnet` (default)
3. Update `NEXT_PUBLIC_HAVEN_CONTRACT_ID` after deploying the contract:
   ```bash
   # Deploy contract and generate bindings
   stellar contract bindings typescript \
     --network testnet \
     --contract-id <YOUR_CONTRACT_ID> \
     --output-dir ./src/app/lib/haven-bindings
   ```
4. Fund test accounts using the [Stellar testnet faucet](https://laboratory.stellar.org/#account-creator)
5. Configure Freighter wallet for testnet mode

**For production:**
- Set `NEXT_PUBLIC_STELLAR_NETWORK=mainnet`
- Deploy contract to mainnet and update the contract ID accordingly

### Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Design system — dark mode, amber gradients, glass panels
│   ├── layout.tsx           # Root layout — SEO metadata, fonts, theme
│   ├── page.tsx             # Landing page — hero, protocol flow, features
│   ├── verify/
│   │   └── page.tsx         # Device verification — IMEI lookup
│   ├── dashboard/
│   │   └── page.tsx         # User dashboard — device management (mock)
│   └── lib/
│       ├── havenClient.ts   # Stellar SDK client stub with typed functions
│       └── wallet.ts        # Freighter wallet connection helpers
```

---

## 🎨 Design System

The UI follows a **dark-mode-first** aesthetic inspired by Web3 protocol sites:

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0A0908` | Page background |
| Surface | `#141312` | Card backgrounds |
| Primary | `#ffb596` | Accent text, icons |
| Primary Container | `#f26411` | Buttons, active states |
| Secondary | `#f49e00` | Status indicators, highlights |
| On Surface | `#e6e1df` | Body text |
| On Surface Variant | `#e1bfb2` | Secondary text |

**Key effects:**
- `glass-panel` — frosted glass cards with backdrop blur
- `text-gradient-sunset` — amber-to-orange gradient text
- `btn-gradient` — sunset gradient buttons
- `hero-gradient-orb` — ambient background glow

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | App Router, SSR, API routes |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **@stellar/stellar-sdk** | Soroban contract interaction |
| **@stellar/freighter-api** | B2B wallet integration |
| **Plus Jakarta Sans** | Primary typeface |
| **Material Symbols** | Icon system |

---

## 🔌 Wallet Integration

The app includes typed helpers in `src/app/lib/wallet.ts` for connecting to the **Freighter** browser extension wallet.

### Usage

```typescript
import { connectWallet, getWalletState } from './lib/wallet';

// "Connect Wallet" button handler
const result = await connectWallet();
if (result.connected) {
  console.log('Public key:', result.state.publicKey);
} else {
  console.log('Error:', result.state.error);
}

// Non-interactive state check (no popup)
const state = await getWalletState();
```

### Available Helpers

| Function | Triggers Popup? | Description |
|----------|:---------------:|-------------|
| `isFreighterInstalled()` | No | Detects if the Freighter extension is present |
| `isFreighterAllowed()` | No | Checks if this site already has permission |
| `requestFreighterAccess()` | **Yes** | Requests user approval via extension popup |
| `getFreighterPublicKey()` | No | Reads the connected public key (requires prior access) |
| `getFreighterNetwork()` | No | Reads Freighter's current network setting |
| `getWalletState()` | No | Returns a full `WalletState` snapshot |
| `connectWallet()` | **Yes** | Full connection flow: detect → request → read |
| `disconnectWallet()` | No | Resets local UI state (sync) |

### Limitations

- **Public key only** — Freighter never exposes private keys or seed phrases.
- **Manual revoke** — there is no programmatic disconnect; users must revoke access in the Freighter extension settings.
- **Network mismatch** — the helpers detect when Freighter's network differs from the app's `NEXT_PUBLIC_STELLAR_NETWORK` config, but do not auto-switch it.
- **Browser extension required** — Freighter must be installed and unlocked. The helpers gracefully report when it is absent.

---

## 🗺️ Roadmap

### Current (Skeleton)
- [x] Landing page with premium dark-mode UI
- [x] Stellar SDK client stub
- [x] SEO metadata and responsive design

### Next Steps
- [ ] User dashboard — device management, bounty status
- [ ] Passkey Kit integration — biometric smart wallet onboarding
- [ ] Vendor verification portal — public device status lookup
- [ ] SEP-24 integration — fiat on-ramp webview for bounty funding
- [ ] Freighter integration — B2B wallet for vendors and insurers
- [ ] Launchtube integration — fee abstraction for gasless UX

---

## 🤝 Contributing

The codebase is full of `// TODO:` markers — each one is a scoped contribution opportunity.

```bash
grep -rn "TODO" src/
```

See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for the full guide.

---

<div align="center">
  <i>Part of the <a href="https://github.com/HavenOnStellar">Haven Protocol</a> — built with ❤️ to defeat the black market.</i>
</div>
