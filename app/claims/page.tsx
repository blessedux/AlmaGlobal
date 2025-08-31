import { ClaimsLayout } from "@/components/claims-layout"
import { InsuranceClaimForm } from "@/components/insurance-claim-form"

export default function ClaimsPage() {
  return (
    <ClaimsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">File Insurance Claim</h1>
          <p className="text-muted-foreground">
            Upload your medical receipts and documentation to get reimbursed
          </p>
        </div>

        <InsuranceClaimForm />
      </div>
    </ClaimsLayout>
  )
}
