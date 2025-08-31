"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function InsuranceClaimCTA() {
  const router = useRouter()

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Image 
            src="/almaglobal_logo.png" 
            alt="AlmaGlobal" 
            width={24} 
            height={24}
            className="h-6 w-6"
          />
          Need to File an Insurance Claim?
        </CardTitle>
        <CardDescription>
          Upload your medical receipts and get reimbursed within 24 hours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span>Upload receipts & documentation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span>AI analysis & verification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span>Instant payment to your wallet</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center sm:justify-start">
              <Zap className="h-4 w-4 text-primary" />
              Claims under $1,000 processed instantly
            </div>
            
            <Button 
              onClick={() => router.push("/claims")}
              size="lg"
              className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
            >
              File a Claim
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
