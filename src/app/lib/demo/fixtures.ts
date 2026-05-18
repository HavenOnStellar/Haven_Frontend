// ─── Device ───────────────────────────────────────────────────────────────────

export type DeviceStatus = 'Active' | 'Stolen' | 'Recovered'

export interface Device {
  id: string
  make: string
  model: string
  color: string
  registeredAt: string
  status: DeviceStatus
  bounty?: number
}

// [DEMO] Replace with: await client.getDevicesForOwner(walletAddress)
export const DEMO_DEVICES: Device[] = [
  { id: 'dev_8f92a1b3c4', make: 'Apple',   model: 'iPhone 15 Pro', color: 'Titanium',      registeredAt: 'Oct 12, 2025', status: 'Active' },
  { id: 'dev_3b4c5d6e7f', make: 'Samsung', model: 'Galaxy S23',    color: 'Phantom Black', registeredAt: 'Jan 05, 2026', status: 'Stolen', bounty: 150 },
  { id: 'dev_1a2b3c4d5e', make: 'Google',  model: 'Pixel 8',       color: 'Obsidian',      registeredAt: 'Mar 22, 2026', status: 'Recovered' },
]

// Lookup map: device.id → Device
export const DEMO_DEVICES_BY_ID: Record<string, Device> = Object.fromEntries(
  DEMO_DEVICES.map(d => [d.id, d])
)

// ─── Bounty ───────────────────────────────────────────────────────────────────

export type BountyStatus = 'open' | 'claimed' | 'paid' | 'expired'

export interface Bounty {
  id: string
  make: string
  model: string
  city: string
  amount: number
  days: number
  status: BountyStatus
}

// [DEMO] Replace with: await client.listBounties({ status: 'open' })
export const DEMO_BOUNTIES: Bounty[] = [
  { id: 'dev_8f92a1b3c4', make: 'Apple',   model: 'iPhone 14 Pro', city: 'Lagos, NG',     amount: 250, days: 2,  status: 'open' },
  { id: 'dev_3b4c5d6e7f', make: 'Samsung', model: 'Galaxy S23',    city: 'Nairobi, KE',   amount: 100, days: 5,  status: 'open' },
  { id: 'dev_1a2b3c4d5e', make: 'Google',  model: 'Pixel 7',       city: 'Bogotá, CO',    amount: 150, days: 12, status: 'open' },
  { id: 'dev_9z8y7x6w5v', make: 'Apple',   model: 'iPhone 13',     city: 'Manila, PH',    amount: 80,  days: 18, status: 'open' },
  { id: 'dev_4u3t2s1r0q', make: 'Samsung', model: 'Galaxy Z Flip', city: 'São Paulo, BR', amount: 200, days: 24, status: 'open' },
  { id: 'dev_5p6o7n8m9l', make: 'Apple',   model: 'iPhone 15',     city: 'Jakarta, ID',   amount: 300, days: 31, status: 'open' },
]

// ─── Claim ────────────────────────────────────────────────────────────────────

export type ClaimStatus = 'Verified' | 'Paid' | 'Pending'

export interface Claim {
  id: string
  deviceId: string
  make: string
  model: string
  status: ClaimStatus
  submittedAt: string
  insurer: string
}

// [DEMO] Replace with: await client.getClaimsForAddress(walletAddress)
export const DEMO_CLAIMS: Claim[] = [
  { id: 'clm_9a8b7c6d', deviceId: 'dev_3b4c5d6e7f', make: 'Samsung', model: 'Galaxy S23', status: 'Verified', submittedAt: 'Feb 12, 2026', insurer: 'Lemonade Insurance (GABC...XYZ)' },
  { id: 'clm_1z2y3x4w', deviceId: 'dev_7p8q9r0s1t', make: 'Apple',   model: 'iPhone 13',  status: 'Paid',     submittedAt: 'Nov 05, 2025', insurer: 'Allstate (GBDC...LMN)' },
]

// ─── Activity ─────────────────────────────────────────────────────────────────

export type ActivityType = 'stolen' | 'register'

export interface ActivityEvent {
  id: number
  text: string
  time: string
  type: ActivityType
}

// [DEMO] Replace with: await client.getActivityForOwner(walletAddress)
export const DEMO_ACTIVITY: ActivityEvent[] = [
  { id: 1, text: 'Bounty posted for Galaxy S23 ($150)', time: '2 days ago',   type: 'stolen'   },
  { id: 2, text: 'Galaxy S23 reported stolen',           time: '2 days ago',   type: 'stolen'   },
  { id: 3, text: 'Pixel 8 registered on-chain',          time: 'Mar 22, 2026', type: 'register' },
  { id: 4, text: 'iPhone 15 Pro registered on-chain',    time: 'Oct 12, 2025', type: 'register' },
]
