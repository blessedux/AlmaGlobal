import { DashboardLayout } from "@/components/dashboard-layout"
import { HealthPassport } from "@/components/health-passport"
import { InsuranceClaimCTA } from "@/components/insurance-claim-cta"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Medical Passport</h1>
          <p className="text-muted-foreground">Access your health records and insurance claims</p>
        </div>

        <HealthPassport />
        
        <InsuranceClaimCTA />
      </div>
    </DashboardLayout>
  )
}
