"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, CreditCard, Shield } from "lucide-react"
import Link from "next/link"

interface SubscriptionConfirmationProps {
  paymentMethod: string | null
}

export function SubscriptionConfirmation({ paymentMethod }: SubscriptionConfirmationProps) {
  const nextBillingDate = new Date()
  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <CheckCircle className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Welcome to AlmaGlobal!</h1>
        <p className="text-lg text-muted-foreground">Your health insurance is now active and ready to use</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Coverage Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Coverage Amount</div>
              <div className="font-semibold">Up to $5,000</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Monthly Premium</div>
              <div className="font-semibold">$30.00</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Instant Claims</div>
              <div className="font-semibold">Under $1,000</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Status</div>
              <Badge className="bg-primary">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Payment Method</div>
              <div className="font-semibold">{paymentMethod?.toUpperCase() || "USDC"}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Transaction ID</div>
              <div className="font-mono text-sm">0x7a8b...9c2d</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Billing Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Next Billing Date</div>
              <div className="font-semibold">{nextBillingDate.toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Auto-Renewal</div>
              <Badge variant="outline">Enabled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button size="lg" className="flex-1" asChild>
                          <Link href="/dashboard">Go to Passport</Link>
        </Button>
        <Button variant="outline" size="lg" className="flex-1 bg-transparent" asChild>
          <Link href="/records/upload">Upload Health Records</Link>
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Need help? Contact our support team 24/7 at{" "}
          <a href="mailto:support@almaglobal.com" className="text-primary hover:underline">
            support@almaglobal.com
          </a>
        </p>
      </div>
    </div>
  )
}
