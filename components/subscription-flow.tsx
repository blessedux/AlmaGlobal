"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Shield, Zap, ArrowRight } from "lucide-react"
import { PaymentMethod } from "@/components/payment-method"
import { SubscriptionConfirmation } from "@/components/subscription-confirmation"

type Step = "plan" | "payment" | "confirmation"

const planFeatures = [
  "Up to $5,000 coverage per incident",
  "Instant claims under $1,000",
  "No KYC required",
  "Encrypted health record storage",
  "Medical passport with QR codes",
  "24/7 customer support",
  "Cancel anytime",
]

export function SubscriptionFlow() {
  const [currentStep, setCurrentStep] = useState<Step>("plan")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)

  const handlePlanSelect = () => {
    setCurrentStep("payment")
  }

  const handlePaymentSelect = (method: string) => {
    setSelectedPaymentMethod(method)
    setCurrentStep("confirmation")
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
            currentStep === "plan" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          1
        </div>
        <div className="h-px w-12 bg-border" />
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
            currentStep === "payment"
              ? "bg-primary text-primary-foreground"
              : currentStep === "confirmation"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
          }`}
        >
          2
        </div>
        <div className="h-px w-12 bg-border" />
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
            currentStep === "confirmation" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          3
        </div>
      </div>
    </div>
  )

  if (currentStep === "plan") {
    return (
      <div className="max-w-4xl mx-auto">
        {renderStepIndicator()}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground">
            Get comprehensive health coverage with instant claims processing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Plan Details */}
          <Card className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">AlmaGlobal Coverage</CardTitle>
                <Badge variant="secondary">Recommended</Badge>
              </div>
              <CardDescription>Complete health insurance coverage for the modern world</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">$30</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">What's included:</h4>
                <ul className="space-y-2">
                  {planFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Coverage Highlights */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Shield className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Secure & Private</CardTitle>
                    <CardDescription>Your data is encrypted and stored on IPFS</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Zap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Instant Processing</CardTitle>
                    <CardDescription>Claims under $1,000 approved automatically</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <CreditCard className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Crypto Payments</CardTitle>
                    <CardDescription>Pay with USDC or USDT stablecoins</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Button size="lg" className="w-full" onClick={handlePlanSelect}>
              Continue to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "payment") {
    return (
      <div className="max-w-2xl mx-auto">
        {renderStepIndicator()}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Payment Method</h1>
          <p className="text-lg text-muted-foreground">Choose how you'd like to pay for your monthly subscription</p>
        </div>
        <PaymentMethod onSelect={handlePaymentSelect} />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {renderStepIndicator()}
      <SubscriptionConfirmation paymentMethod={selectedPaymentMethod} />
    </div>
  )
}
