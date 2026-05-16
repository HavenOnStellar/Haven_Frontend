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

export type NetworkKey = keyof typeof NETWORK_CONFIG;

/**
 * Returns the active Stellar network configuration.
 *
 * Reads `NEXT_PUBLIC_STELLAR_NETWORK` from environment variables.
 * Supported values: `testnet`, `mainnet`.
 * Defaults to `testnet` for local development.
 *
 * @throws Error if an unsupported network value is configured.
 */
export function getNetworkConfig(): (typeof NETWORK_CONFIG)[NetworkKey] {
  const network = (process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? 'testnet') as NetworkKey;

  if (!(network in NETWORK_CONFIG)) {
    throw new Error(
      `Unsupported Stellar network: "${network}". Use "testnet" or "mainnet".`
    );
  }

  return NETWORK_CONFIG[network];
}

/** The deployed Haven Registry contract ID */
export const HAVEN_CONTRACT_ID =
  process.env.NEXT_PUBLIC_HAVEN_CONTRACT_ID ??
  'CAT2TDBXGW6GETW52MQB725PLWN2CBVO3YSKLHRA7SRN6FC';

// ---------------------------------------------------------------------------
// IMEI Validation & Hashing (Client-Side Utility)
// ---------------------------------------------------------------------------

/**
 * Validate an IMEI number.
 *
 * Checks that the input is exactly 15 digits and passes the Luhn checksum.
 *
 * @param imei - The raw IMEI string to validate
 * @returns true if the IMEI is valid, false otherwise
 */
export function isValidIMEI(imei: string): boolean {
  if (!/^\d{15}$/.test(imei)) return false;

  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let digit = parseInt(imei[i], 10);
    if (i % 2 !== 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

/**
 * Returns a human-readable validation error for an invalid IMEI, or null if valid.
 *
 * @param imei - The raw IMEI string to validate
 */
export function validateIMEI(imei: string): string | null {
  if (!/^\d+$/.test(imei)) return 'IMEI must contain only digits.';
  if (imei.length !== 15) return 'IMEI must be exactly 15 digits.';
  if (!isValidIMEI(imei)) return 'Invalid IMEI — checksum verification failed.';
  return null;
}

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
 * @throws Error if the IMEI fails validation
 *
 * @example
 * ```typescript
 * const hashed = await hashIMEI('123456789012345');
 * // => '7b3f1d2e4a5b6c7d8e9f...' (64 hex chars)
 * ```
 */
export async function hashIMEI(imei: string): Promise<string> {
  const error = validateIMEI(imei);
  if (error) throw new Error(error);

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
 * Standard result shape for all contract write operations.
 *
 * UI consumers should check `status` first:
 * - `"success"` — `txHash` will be populated.
 * - `"error"` — `errorMessage` will describe what went wrong.
 * - `"pending"` — transaction submitted, awaiting confirmation.
 */
export interface ContractResult {
  status: 'success' | 'error' | 'pending';
  txHash: string | null;
  errorMessage: string | null;
}

/**
 * Register a new device on the Haven Registry.
 *
 * @param hashedImei - SHA-256 hash of the IMEI (from `hashIMEI()` or server-side)
 * @param deviceModel - Human-readable device model (e.g., "iPhone 15 Pro")
 * @returns A `ContractResult` indicating transaction outcome.
 *
 * @example
 * ```typescript
 * const result = await registerDevice(hashedImei, 'iPhone 15 Pro');
 * if (result.status === 'success') {
 *   console.log('Registered:', result.txHash);
 * } else {
 *   console.error('Failed:', result.errorMessage);
 * }
 * ```
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
): Promise<ContractResult> {
  console.log('[Haven] registerDevice stub called', { hashedImei, deviceModel });

  // TODO: Implement using Stellar SDK
  // const contract = new StellarSdk.Contract(HAVEN_CONTRACT_ID);
  // const tx = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase })
  //   .addOperation(contract.call('register_device', ...args))
  //   .setTimeout(30)
  //   .build();
  // const signedTx = await freighterApi.signTransaction(tx.toXDR(), { networkPassphrase });
  // const result = await server.sendTransaction(signedTx);

  return {
    status: 'error',
    txHash: null,
    errorMessage: 'Not implemented — see TODO in havenClient.ts',
  };
}

/**
 * Report a device as stolen and deposit a recovery bounty.
 *
 * @param hashedImei - SHA-256 hash of the IMEI
 * @param bountyAmount - Amount to escrow (in stroops for XLM, or USDC smallest unit)
 * @param recoveryContact - Email or phone for the finder to contact
 * @returns A `ContractResult` indicating transaction outcome.
 *
 * @example
 * ```typescript
 * const result = await reportStolen(hashedImei, 500_000_000, 'owner@example.com');
 * if (result.status === 'success') {
 *   console.log('Bounty deposited:', result.txHash);
 * }
 * ```
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
): Promise<ContractResult> {
  console.log('[Haven] reportStolen stub called', {
    hashedImei,
    bountyAmount,
    recoveryContact,
  });

  return {
    status: 'error',
    txHash: null,
    errorMessage: 'Not implemented — see TODO in havenClient.ts',
  };
}

/**
 * Confirm device recovery and release bounty to the finder.
 *
 * @param hashedImei - SHA-256 hash of the IMEI
 * @param finderAddress - Stellar public key of the person returning the device
 * @returns A `ContractResult` indicating transaction outcome.
 *
 * @example
 * ```typescript
 * const result = await confirmRecovery(hashedImei, 'G...finder');
 * if (result.status === 'success') {
 *   console.log('Bounty released:', result.txHash);
 * }
 * ```
 *
 * TODO:
 * - [ ] Build the `confirm_recovery` Soroban transaction
 * - [ ] Verify the bounty transfer to finder
 * - [ ] Return transaction confirmation
 */
export async function confirmRecovery(
  hashedImei: string,
  finderAddress: string
): Promise<ContractResult> {
  console.log('[Haven] confirmRecovery stub called', {
    hashedImei,
    finderAddress,
  });

  return {
    status: 'error',
    txHash: null,
    errorMessage: 'Not implemented — see TODO in havenClient.ts',
  };
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
