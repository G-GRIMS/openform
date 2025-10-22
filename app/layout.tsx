import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Manrope, Roboto_Mono, Lora } from 'next/font/google'

// Initialize fonts
const _manrope = Manrope({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800"] })
const _robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })
const _lora = Lora({ subsets: ['latin'], weight: ["400","500","600","700"] })

export const metadata: Metadata = {
  title: "G'GRIMS OpenForm",
  description: 'An open-source form builder with a focus on simplicity and flexibility',
  generator: 'G-GRIMS OpenForm',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
