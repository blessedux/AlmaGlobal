"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, FileText, CreditCard, QrCode, Settings, HelpCircle, Shield } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navigation = [
  { name: "Passport", href: "/dashboard", icon: Home },
  { name: "Health Records", href: "/records", icon: FileText },
  { name: "Claims", href: "/claims", icon: CreditCard },
  { name: "Medical Passport", href: "/passport", icon: QrCode },
  { name: "Coverage", href: "/subscribe", icon: Shield },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn("w-full justify-start gap-3", pathname === item.href && "bg-accent text-accent-foreground")}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
