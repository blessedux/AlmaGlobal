"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function ClaimsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image 
                src="/almaglobal_logo.png" 
                alt="AlmaGlobal" 
                width={24} 
                height={24}
                className="h-6 w-6"
              />
              <span className="text-lg font-semibold text-primary">AlmaGlobal</span>
            </div>
            
            <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Passport
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 sm:px-6 lg:px-8 sm:py-8">
        {children}
      </main>
    </div>
  )
}
