"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface PaymentMethodProps {
  onSelect: (method: string) => void
}

const stablecoins = [
  {
    id: "usdc",
    name: "USDC",
    fullName: "USD Coin",
    network: "Ethereum",
    balance: "150.00",
    icon: "💰",
  },
  {
    id: "usdt",
    name: "USDT",
    fullName: "Tether USD",
    network: "Ethereum",
    balance: "75.50",
    icon: "💵",
  },
]

export function PaymentMethod({ onSelect }: PaymentMethodProps) {
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    if (!selectedCoin) return

    setIsProcessing(true)
    // Mock payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    onSelect(selectedCoin)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">AlmaGlobal Coverage</span>
            <span className="font-medium">$30.00/month</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Network Fee</span>
            <span className="font-medium">~$2.50</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>~$32.50</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select Payment Method</CardTitle>
          <CardDescription>Choose a stablecoin to pay with</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {stablecoins.map((coin) => (
            <Card
              key={coin.id}
              className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                selectedCoin === coin.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedCoin(coin.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{coin.icon}</span>
                    <div>
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-sm text-muted-foreground">{coin.fullName}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {coin.balance} {coin.name}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {coin.network}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wallet Address</CardTitle>
          <CardDescription>Your connected wallet will be used for payment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="wallet">Connected Wallet</Label>
            <Input
              id="wallet"
              value="0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e"
              readOnly
              className="font-mono text-sm"
            />
          </div>
        </CardContent>
      </Card>

      <Button size="lg" className="w-full" onClick={handlePayment} disabled={!selectedCoin || isProcessing}>
        {isProcessing ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Processing Payment...
          </>
        ) : (
          `Pay $30 with ${selectedCoin?.toUpperCase() || "Stablecoin"}`
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Your subscription will auto-renew monthly. Cancel anytime from your passport.
      </p>
    </div>
  )
}
