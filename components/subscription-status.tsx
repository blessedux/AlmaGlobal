import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Calendar, CreditCard } from "lucide-react"

export function SubscriptionStatus() {
  const nextBillingDate = new Date()
  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Insurance Coverage
        </CardTitle>
        <CardDescription>Your current health insurance status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">$5,000</div>
            <div className="text-sm text-muted-foreground">Coverage Limit</div>
          </div>
          <Badge className="bg-primary">Active</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Next Billing
            </div>
            <div className="font-medium">{nextBillingDate.toLocaleDateString()}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              Monthly Premium
            </div>
            <div className="font-medium">$30.00</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Manage Subscription
          </Button>
          <Button variant="outline" size="sm">
            View Coverage Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
