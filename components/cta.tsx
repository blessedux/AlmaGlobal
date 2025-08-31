"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg leading-8 text-muted-foreground text-pretty">
            Join thousands of users who have already switched to decentralized health insurance. 
            Get started in under 5 minutes.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button size="lg" className="px-6 sm:px-8 w-full sm:w-auto" asChild>
              <Link href="/subscribe">
                Create Account
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/dashboard">
                View Passport
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
