import { DashboardLayout } from "@/components/dashboard-layout"
import { ClaimSubmission } from "@/components/claim-submission"

export default function NewClaimPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Submit New Claim</h1>
          <p className="text-muted-foreground">File an insurance claim for your medical expenses</p>
        </div>
        <ClaimSubmission />
      </div>
    </DashboardLayout>
  )
}
