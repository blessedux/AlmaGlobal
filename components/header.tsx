import { WalletConnect } from "@/components/wallet-connect"
import { Shield } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">AlmaGlobal</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Pricing
          </a>
                      <a href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Passport
            </a>
        </nav>
        <WalletConnect />
      </div>
    </header>
  )
}
