import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Haven — Decentralized Device Registry on Stellar',
  description:
    'Haven makes smartphone theft economically unviable by turning physical hardware into stateful on-chain assets. Trustless recovery bounties, cryptographic proof-of-loss, and native USDC escrow — all on Stellar.',
  keywords: [
    'device registry', 'stolen phone', 'IMEI', 'Stellar', 'Soroban',
    'blockchain', 'anti-theft', 'USDC', 'bounty', 'insurance', 'proof of loss',
  ],
  authors: [{ name: 'Haven Protocol' }],
  openGraph: {
    title: 'Haven — Decentralized Device Registry on Stellar',
    description: 'Turn physical hardware into stateful on-chain assets. Trustless bounties defeat the black market.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0A0908',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${jakarta.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
