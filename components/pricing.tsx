"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export function Pricing() {
  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-8 text-muted-foreground text-pretty">
            One plan, everything included. No hidden fees, no surprises.
          </p>
        </div>
        <div className="mx-auto mt-12 sm:mt-16 max-w-2xl rounded-3xl ring-1 ring-border lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-6 sm:p-8 lg:flex-auto">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">AlmaGlobal Coverage</h3>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-7 text-muted-foreground">
              Comprehensive health insurance coverage designed for the modern world. Pay with stablecoins, get instant claims processing, and maintain complete privacy.
            </p>
            <div className="mt-8 sm:mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-primary">What's included</h4>
              <div className="h-px flex-auto bg-border"></div>
            </div>
            <ul className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4 text-sm leading-6 text-muted-foreground sm:grid-cols-2 sm:gap-6">
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 flex-none text-primary" />
                Up to $5,000 coverage per incident
              </li>
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 flex-none text-primary" />
                Instant claims under $1,000
              </li>
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 flex-none text-primary" />
                No KYC or lengthy applications
              </li>
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 flex-none text-primary" />
                Encrypted health record storage
              </li>
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 flex-none text-primary" />
                Medical passport with QR codes
              </li>
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 flex-none text-primary" />
                Global coverage worldwide
              </li>
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <Card className="h-full py-8 sm:py-10 text-center ring-1 ring-inset ring-border lg:flex lg:flex-col lg:justify-center lg:py-12 sm:lg:py-16">
              <CardHeader className="mx-auto max-w-xs px-6 sm:px-8">
                <CardTitle className="leading-none font-semibold text-foreground">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight">$30</span>
                  <span className="text-sm font-semibold leading-6">/month</span>
                </CardTitle>
                <CardDescription className="text-base leading-7">Paid in USDC or USDT</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-end px-6 sm:px-8">
                <Button className="w-full" asChild>
                  <Link href="/subscribe">
                    Get started today
                  </Link>
                </Button>
                <p className="mt-4 sm:mt-6 text-xs leading-5 text-muted-foreground">Cancel anytime. No long-term contracts.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
