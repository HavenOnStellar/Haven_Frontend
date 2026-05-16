/**
 * Haven Wallet — Freighter Integration Helpers
 *
 * Provides typed helpers for detecting, connecting to, and reading state
 * from the Freighter browser extension wallet.
 *
 * ## Limitations
 *
 * - Freighter only exposes the **public key** — no private key access.
 * - Each call to `connectWallet()` triggers a browser extension popup
 *   that the user must approve.
 * - Freighter must be installed and unlocked for any helper to succeed.
 * - Network mismatch (e.g. Freighter on mainnet while app expects testnet)
 *   is reported in `WalletState.networkMismatch`.
 *
 * ## Dependencies
 *
 * - `@stellar/freighter-api` — Freighter SDK
 */

import {
  isConnected,
  isAllowed,
  setAllowed,
  getAddress,
  getNetwork,
  requestAccess,
} from '@stellar/freighter-api';
import { type NetworkKey } from './havenClient';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WalletState {
  /** Whether Freighter extension is detected in the browser */
  isInstalled: boolean;
  /** Whether the user has granted this site access */
  isAllowed: boolean;
  /** Connected Stellar public key, or null */
  publicKey: string | null;
  /** Network Freighter is currently set to, or null */
  freighterNetwork: string | null;
  /** True when Freighter's network differs from the app's configured network */
  networkMismatch: boolean;
  /** Human-readable error from the last connection attempt */
  error: string | null;
}

export interface WalletConnectResult {
  /** Full wallet state after the connection attempt */
  state: WalletState;
  /** Convenience shorthand — true when a public key was obtained */
  connected: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Check whether the Freighter extension is present in the browser.
 */
export async function isFreighterInstalled(): Promise<boolean> {
  try {
    const result = await isConnected();
    return result.isConnected === true;
  } catch {
    return false;
  }
}

/**
 * Check whether this site has already been allowed by the user.
 *
 * This does NOT trigger a popup — it only reads the stored permission.
 */
export async function isFreighterAllowed(): Promise<boolean> {
  try {
    const result = await isAllowed();
    return result.isAllowed === true;
  } catch {
    return false;
  }
}

/**
 * Request the user to grant this site access to their Freighter wallet.
 *
 * Triggers a browser extension approval popup. Returns `true` if granted.
 */
export async function requestFreighterAccess(): Promise<boolean> {
  try {
    const result = await setAllowed();
    return result.isAllowed === true;
  } catch {
    return false;
  }
}

/**
 * Read the connected public key from Freighter.
 *
 * Returns `null` if the user has not granted access or the call fails.
 */
export async function getFreighterPublicKey(): Promise<string | null> {
  try {
    const result = await getAddress();
    return result.address ?? null;
  } catch {
    return null;
  }
}

/**
 * Read the network Freighter is currently configured for.
 *
 * Returns the network name string (e.g. `"TESTNET"`, `"PUBLIC"`) or `null`.
 */
export async function getFreighterNetwork(): Promise<string | null> {
  try {
    const result = await getNetwork();
    return result.network ?? null;
  } catch {
    return null;
  }
}

/**
 * Build a full `WalletState` snapshot without triggering any popups.
 *
 * Reads installation status, stored permission, public key (if already
 * allowed), and network — all non-interactively.
 */
export async function getWalletState(): Promise<WalletState> {
  const installed = await isFreighterInstalled();

  if (!installed) {
    return {
      isInstalled: false,
      isAllowed: false,
      publicKey: null,
      freighterNetwork: null,
      networkMismatch: false,
      error: 'Freighter extension not detected. Install it from freighter.app.',
    };
  }

  const allowed = await isFreighterAllowed();

  if (!allowed) {
    return {
      isInstalled: true,
      isAllowed: false,
      publicKey: null,
      freighterNetwork: null,
      networkMismatch: false,
      error: null,
    };
  }

  const [publicKey, freighterNetwork] = await Promise.all([
    getFreighterPublicKey(),
    getFreighterNetwork(),
  ]);

  const appNetwork = (process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? 'testnet') as NetworkKey;
  const expectedNetwork = appNetwork === 'mainnet' ? 'PUBLIC' : 'TESTNET';
  const networkMismatch =
    freighterNetwork !== null &&
    freighterNetwork.toUpperCase() !== expectedNetwork.toUpperCase();

  return {
    isInstalled: true,
    isAllowed: true,
    publicKey,
    freighterNetwork,
    networkMismatch,
    error: null,
  };
}

/**
 * Full connection flow: detect → request access → read state.
 *
 * This is the primary entry point for UI "Connect Wallet" buttons.
 *
 * @example
 * ```typescript
 * const result = await connectWallet();
 * if (result.connected) {
 *   console.log('Connected:', result.state.publicKey);
 * } else {
 *   console.log('Error:', result.state.error);
 * }
 * ```
 */
export async function connectWallet(): Promise<WalletConnectResult> {
  const installed = await isFreighterInstalled();

  if (!installed) {
    return {
      connected: false,
      state: {
        isInstalled: false,
        isAllowed: false,
        publicKey: null,
        freighterNetwork: null,
        networkMismatch: false,
        error: 'Freighter extension not detected. Install it from freighter.app.',
      },
    };
  }

  const allowed = await isFreighterAllowed();

  if (!allowed) {
    const granted = await requestFreighterAccess();
    if (!granted) {
      return {
        connected: false,
        state: {
          isInstalled: true,
          isAllowed: false,
          publicKey: null,
          freighterNetwork: null,
          networkMismatch: false,
          error: 'Connection denied by user.',
        },
      };
    }
  }

  return {
    connected: true,
    state: await getWalletState(),
  };
}

/**
 * Disconnect by clearing the stored permission for this site.
 *
 * Note: Freighter does not expose a programmatic "disconnect" API, so this
 * resets local UI state. Users must revoke access manually in the extension.
 */
export function disconnectWallet(): WalletState {
  return {
    isInstalled: true,
    isAllowed: false,
    publicKey: null,
    freighterNetwork: null,
    networkMismatch: false,
    error: null,
  };
}
