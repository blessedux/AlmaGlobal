"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Wallet, Smartphone, Key, CheckCircle, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WalletOption {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  available: boolean
}

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: string | null
  connect: (walletId: string) => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | null>(null)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const { toast } = useToast()

  const connect = async (walletId: string) => {
    // Mock wallet connection
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockAddress = "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e"
    const mockBalance = "1,234.56"

    setIsConnected(true)
    setAddress(mockAddress)
    setBalance(mockBalance)

    toast({
      title: "Wallet Connected",
      description: `Successfully connected to ${walletId}`,
    })
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance(null)

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  return (
    <WalletContext.Provider value={{ isConnected, address, balance, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

const walletOptions: WalletOption[] = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect using MetaMask browser extension",
    icon: Wallet,
    available: true,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Connect using mobile wallet apps",
    icon: Smartphone,
    available: true,
  },
  {
    id: "passkey",
    name: "Create Passkey",
    description: "Use biometric authentication (Face ID, Touch ID)",
    icon: Key,
    available: true,
  },
]

export function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { isConnected, address, balance, connect, disconnect } = useWallet()
  const { toast } = useToast()

  const handleConnect = async (walletId: string) => {
    setIsConnecting(true)
    setSelectedWallet(walletId)

    try {
      await connect(walletId)
      setIsOpen(false)
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
      setSelectedWallet(null)
    }
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
          Connected
        </Badge>
        <Button variant="outline" size="sm" onClick={copyAddress} className="font-mono text-xs bg-transparent">
          {address.slice(0, 6)}...{address.slice(-4)}
          <Copy className="ml-1 h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={disconnect}>
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="px-8">
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            Choose how you'd like to authenticate and manage your AlmaGlobal account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {walletOptions.map((wallet) => (
            <Card
              key={wallet.id}
              className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                selectedWallet === wallet.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => !isConnecting && handleConnect(wallet.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <wallet.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{wallet.name}</CardTitle>
                    <CardDescription className="text-sm">{wallet.description}</CardDescription>
                  </div>
                  {isConnecting && selectedWallet === wallet.id && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            New to Web3?{" "}
            <a href="#" className="text-primary hover:underline">
              Learn about wallet security
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
