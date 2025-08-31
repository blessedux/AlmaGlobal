"use client"

import { Button } from "@/components/ui/button"
import { Zap, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Image
              src="/almaglobal_logo.png"
              alt="AlmaGlobal"
              width={32}
              height={32}
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
            <span className="text-lg sm:text-xl font-semibold text-primary">AlmaGlobal</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-foreground sm:text-balance">
            Health Insurance for the
            <span className="text-primary"> Digital Age</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg leading-8 text-muted-foreground text-pretty">
            Get $30/month health coverage with instant claims processing. No KYC, no paperwork, just upload receipts and get paid in crypto.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button size="lg" className="px-6 sm:px-8 w-full sm:w-auto" asChild>
              <Link href="/subscribe">
                Get Started - $30/month
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/subscribe">
                Learn More
              </Link>
            </Button>
          </div>
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Instant Claims
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/almaglobal_logo.png"
                alt="AlmaGlobal"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              No KYC Required
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
