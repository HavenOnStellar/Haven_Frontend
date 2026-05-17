import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { TopStatusBar } from '@/components/TopStatusBar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
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
  themeColor: '#080c10',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-[#080c10] text-[#f8fafc] flex flex-col">
        <TopStatusBar />
        {children}
      </body>
    </html>
  )
}
