import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { WalletProvider } from "@/components/wallet-connect"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "AlmaGlobal - Decentralized Health Insurance",
  description: "Affordable health insurance for everyone. $30/month, no KYC, instant claims processing.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <WalletProvider>
            {children}
            <Toaster />
          </WalletProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
