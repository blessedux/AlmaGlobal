"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Wallet, Calendar, DollarSign, Crown, Shield } from "lucide-react"
import Image from "next/image"

export function BillingSettings() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [currentPlan, setCurrentPlan] = useState("basic") // "basic" or "plus"

  const handleUpdatePayment = async () => {
    setIsUpdating(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsUpdating(false)
  }

  const handleSwitchPlan = async (newPlan: string) => {
    setIsUpdating(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setCurrentPlan(newPlan)
    setIsUpdating(false)
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image 
              src="/almaglobal_logo.png" 
              alt="AlmaGlobal" 
              width={20} 
              height={20}
              className="h-5 w-5"
            />
            Current Subscription
          </CardTitle>
          <CardDescription>
            Manage your current health insurance plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {currentPlan === "basic" ? "AlmaGlobal Health Plan" : "AlmaGlobal Plus"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentPlan === "basic" ? "$30/month coverage" : "$890/month comprehensive coverage"}
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 w-fit">Active</Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Next Billing Date:</span>
              <p className="text-muted-foreground">February 1, 2024</p>
            </div>
            <div>
              <span className="font-medium">Coverage Limit:</span>
              <p className="text-muted-foreground">
                {currentPlan === "basic" ? "Up to $5,000 per incident" : "Unlimited coverage"}
              </p>
            </div>
            <div>
              <span className="font-medium">Plan Type:</span>
              <p className="text-muted-foreground">
                {currentPlan === "basic" ? "Non-catastrophic events" : "Comprehensive including catastrophic"}
              </p>
            </div>
            <div>
              <span className="font-medium">Claims Processing:</span>
              <p className="text-muted-foreground">
                {currentPlan === "basic" ? "Instant under $1,000" : "Instant under $10,000"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Available Plans
          </CardTitle>
          <CardDescription>
            Choose the plan that best fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Plan */}
            <Card className={`border-2 ${currentPlan === "basic" ? "border-primary" : "border-border"}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  AlmaGlobal Basic
                </CardTitle>
                <div className="text-3xl font-bold">$30<span className="text-sm font-normal">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Up to $5,000 coverage per incident
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Non-catastrophic events only
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Instant claims under $1,000
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    No KYC required
                  </li>
                </ul>
                {currentPlan === "basic" ? (
                  <Badge className="w-full justify-center bg-green-100 text-green-800">Current Plan</Badge>
                ) : (
                  <Button 
                    onClick={() => handleSwitchPlan("basic")}
                    disabled={isUpdating}
                    className="w-full"
                    variant="outline"
                  >
                    Switch to Basic
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Plus Plan */}
            <Card className={`border-2 ${currentPlan === "plus" ? "border-primary" : "border-border"}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  AlmaGlobal Plus
                </CardTitle>
                <div className="text-3xl font-bold">$890<span className="text-sm font-normal">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    Unlimited coverage for all events
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    Catastrophic illness coverage
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    Instant claims under $10,000
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    Priority support & processing
                  </li>
                </ul>
                {currentPlan === "plus" ? (
                  <Badge className="w-full justify-center bg-yellow-100 text-yellow-800">Current Plan</Badge>
                ) : (
                  <Button 
                    onClick={() => handleSwitchPlan("plus")}
                    disabled={isUpdating}
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                  >
                    Upgrade to Plus
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
          <CardDescription>
            Manage how you pay for your subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">USDC Wallet</h3>
                <p className="text-sm text-muted-foreground break-all">0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e</p>
              </div>
            </div>
            <Badge variant="outline" className="w-fit">Default</Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <CreditCard className="mr-2 h-4 w-4" />
              Add New Payment Method
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleUpdatePayment}
              disabled={isUpdating}
              className="w-full sm:w-auto"
            >
              {isUpdating ? "Updating..." : "Update Payment Method"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>
            View your past payments and invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg gap-3">
              <div>
                <p className="font-medium">January 2024</p>
                <p className="text-sm text-muted-foreground">
                  {currentPlan === "basic" ? "Health Insurance Premium" : "AlmaGlobal Plus Premium"}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-medium">
                  {currentPlan === "basic" ? "$30.00" : "$890.00"}
                </p>
                <Badge className="bg-green-100 text-green-800 text-xs">Paid</Badge>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg gap-3">
              <div>
                <p className="font-medium">December 2023</p>
                <p className="text-sm text-muted-foreground">
                  {currentPlan === "basic" ? "Health Insurance Premium" : "AlmaGlobal Plus Premium"}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-medium">
                  {currentPlan === "basic" ? "$30.00" : "$890.00"}
                </p>
                <Badge className="bg-green-100 text-green-800 text-xs">Paid</Badge>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg gap-3">
              <div>
                <p className="font-medium">November 2023</p>
                <p className="text-sm text-muted-foreground">
                  {currentPlan === "basic" ? "Health Insurance Premium" : "AlmaGlobal Plus Premium"}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-medium">
                  {currentPlan === "basic" ? "$30.00" : "$890.00"}
                </p>
                <Badge className="bg-green-100 text-green-800 text-xs">Paid</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Actions</CardTitle>
          <CardDescription>
            Manage your subscription and account settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Change Billing Cycle
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Image
              src="/almaglobal_logo.png"
              alt="AlmaGlobal"
              width={16}
              height={16}
              className="h-4 w-4 mr-2"
            />
            Update Coverage Preferences
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <CreditCard className="mr-2 h-4 w-4" />
            Download Tax Documents
          </Button>
        </CardContent>
      </Card>

      {/* File Claim CTA */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Need to file a claim?</h3>
            <p className="text-sm text-muted-foreground">
              Upload your medical receipts and get reimbursed within 24 hours
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              File a Claim
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
