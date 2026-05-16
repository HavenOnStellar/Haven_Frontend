/**
 * Haven Client — Stellar/Soroban SDK Stub
 *
 * This file provides the foundation for interacting with the Haven Registry
 * Soroban smart contract from the frontend.
 *
 * ## Setup
 *
 * Once the contract is deployed, generate TypeScript bindings:
 *
 * ```bash
 * stellar contract bindings typescript \
 *   --network testnet \
 *   --contract-id <YOUR_CONTRACT_ID> \
 *   --output-dir ./src/app/lib/haven-bindings
 * ```
 *
 * Then replace these stubs with the generated client.
 *
 * ## Dependencies
 *
 * - `@stellar/stellar-sdk` — Stellar SDK (includes Soroban support)
 * - `@stellar/freighter-api` — Freighter wallet integration
 */

// TODO: Uncomment and configure once contract is deployed
// import * as StellarSdk from '@stellar/stellar-sdk';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Stellar network configuration */
export const NETWORK_CONFIG = {
  testnet: {
    networkPassphrase: 'Test SDF Network ; September 2015',
    rpcUrl: 'https://soroban-testnet.stellar.org',
    horizonUrl: 'https://horizon-testnet.stellar.org',
  },
  mainnet: {
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
    rpcUrl: 'https://soroban-rpc.mainnet.stellar.gateway.fm',
    horizonUrl: 'https://horizon.stellar.org',
  },
} as const;

/** The deployed Haven Registry contract ID */
export const HAVEN_CONTRACT_ID =
  process.env.NEXT_PUBLIC_HAVEN_CONTRACT_ID ??
  'CAT2TDBXGW6GETW52MQB725PLWN2CBVO3YSKLHRA7SRN6FC';

// ---------------------------------------------------------------------------
// IMEI Hashing (Client-Side Utility)
// ---------------------------------------------------------------------------

/**
 * Hash an IMEI using SHA-256.
 *
 * IMPORTANT: In production, this should happen server-side (in a Next.js API route)
 * to ensure the raw IMEI never touches the client or the blockchain.
 *
 * This client-side version is provided for development/testing only.
 *
 * @param imei - The raw IMEI string (15 digits)
 * @returns The SHA-256 hash as a hex string
 *
 * @example
 * ```typescript
 * const hashed = await hashIMEI('123456789012345');
 * // => '7b3f1d2e4a5b6c7d8e9f...' (64 hex chars)
 * ```
 */
export async function hashIMEI(imei: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(imei);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// ---------------------------------------------------------------------------
// Contract Interaction Stubs
// ---------------------------------------------------------------------------

/**
 * Register a new device on the Haven Registry.
 *
 * @param hashedImei - SHA-256 hash of the IMEI (from `hashIMEI()` or server-side)
 * @param deviceModel - Human-readable device model (e.g., "iPhone 15 Pro")
 *
 * TODO:
 * - [ ] Import and use the generated TypeScript bindings
 * - [ ] Connect to Freighter wallet for transaction signing
 * - [ ] Build and submit the Soroban transaction
 * - [ ] Handle transaction confirmation and return the device state
 */
export async function registerDevice(
  hashedImei: string,
  deviceModel: string
): Promise<void> {
  console.log('[Haven] registerDevice stub called', { hashedImei, deviceModel });

  // TODO: Implement using Stellar SDK
  // const contract = new StellarSdk.Contract(HAVEN_CONTRACT_ID);
  // const tx = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase })
  //   .addOperation(contract.call('register_device', ...args))
  //   .setTimeout(30)
  //   .build();
  // const signedTx = await freighterApi.signTransaction(tx.toXDR(), { networkPassphrase });
  // const result = await server.sendTransaction(signedTx);

  throw new Error('Not implemented — see TODO in havenClient.ts');
}

/**
 * Report a device as stolen and deposit a recovery bounty.
 *
 * @param hashedImei - SHA-256 hash of the IMEI
 * @param bountyAmount - Amount to escrow (in stroops for XLM, or USDC smallest unit)
 * @param recoveryContact - Email or phone for the finder to contact
 *
 * TODO:
 * - [ ] Build the `report_stolen` Soroban transaction
 * - [ ] Handle SAC token approval and transfer for bounty deposit
 * - [ ] Return transaction confirmation
 */
export async function reportStolen(
  hashedImei: string,
  bountyAmount: number,
  recoveryContact: string
): Promise<void> {
  console.log('[Haven] reportStolen stub called', {
    hashedImei,
    bountyAmount,
    recoveryContact,
  });

  throw new Error('Not implemented — see TODO in havenClient.ts');
}

/**
 * Confirm device recovery and release bounty to the finder.
 *
 * @param hashedImei - SHA-256 hash of the IMEI
 * @param finderAddress - Stellar public key of the person returning the device
 *
 * TODO:
 * - [ ] Build the `confirm_recovery` Soroban transaction
 * - [ ] Verify the bounty transfer to finder
 * - [ ] Return transaction confirmation
 */
export async function confirmRecovery(
  hashedImei: string,
  finderAddress: string
): Promise<void> {
  console.log('[Haven] confirmRecovery stub called', {
    hashedImei,
    finderAddress,
  });

  throw new Error('Not implemented — see TODO in havenClient.ts');
}

/**
 * Look up a device's on-chain status by its hashed IMEI.
 *
 * @param hashedImei - SHA-256 hash of the IMEI
 * @returns The device state from the contract, or null if not found
 *
 * TODO:
 * - [ ] Use the generated bindings or Soroban RPC to read contract state
 * - [ ] Parse the XDR response into a TypeScript type
 */
export async function getDeviceStatus(hashedImei: string): Promise<{
  owner: string;
  deviceModel: string;
  isStolen: boolean;
  registeredAt: number;
  recoveryContact: string;
  insurer: string | null;
} | null> {
  console.log('[Haven] getDeviceStatus stub called', { hashedImei });

  // TODO: Implement contract read
  return null;
}
