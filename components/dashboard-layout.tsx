"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Medical Passport", href: "/dashboard" },
    { name: "Health Records", href: "/records" },
    { name: "Claims", href: "/claims" },
    { name: "Settings", href: "/settings" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-first horizontal navbar */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image
                src="/almaglobal_logo.png"
                alt="AlmaGlobal"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-semibold text-primary">AlmaGlobal</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              {/* New Claim CTA Button */}
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                <Link href="/claims">
                  <Plus className="h-4 w-4 mr-2" />
                  New Claim
                </Link>
              </Button>
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-card">
              <nav className="flex flex-col space-y-1 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile New Claim CTA Button */}
                <div className="px-4 py-2">
                  <Button
                    asChild
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                    size="sm"
                  >
                    <Link href="/claims" onClick={() => setIsMobileMenuOpen(false)}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Claim
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
