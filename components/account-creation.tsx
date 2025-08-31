"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function AccountCreation() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const createAccount = async () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    setIsCreating(true)
    // Mock account creation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsCreating(false)
    
          toast({
        title: "Account Created",
        description: "Welcome to AlmaGlobal! Redirecting to your passport...",
      })
      
      // Redirect to passport
      setTimeout(() => router.push("/dashboard"), 1000)
  }

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Image 
            src="/almaglobal_logo.png" 
            alt="AlmaGlobal" 
            width={32} 
            height={32}
            className="h-8 w-8"
          />
          <span className="text-xl font-semibold text-primary">AlmaGlobal</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Create Your Account</h1>
        <p className="text-muted-foreground mt-2">
          Get started with decentralized health insurance in minutes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
              1
            </div>
            Personal Information
          </CardTitle>
          <CardDescription>
            Tell us a bit about yourself to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="pt-4">
            <Button 
              onClick={createAccount} 
              disabled={isCreating}
              className="w-full"
              size="lg"
            >
              {isCreating ? "Creating Account..." : "Create Account"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" className="p-0 h-auto" onClick={() => router.push("/dashboard")}>
            Go to Passport
          </Button>
        </p>
      </div>

      {/* File Claim CTA */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 mt-6">
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
