import { DashboardLayout } from "@/components/dashboard-layout"
import { MedicalPassport } from "@/components/medical-passport"

export default function PassportPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Medical Passport</h1>
          <p className="text-muted-foreground">Your secure, shareable health record summary with QR code access</p>
        </div>
        <MedicalPassport />
      </div>
    </DashboardLayout>
  )
}
