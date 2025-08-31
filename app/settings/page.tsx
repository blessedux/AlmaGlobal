import { DashboardLayout } from "@/components/dashboard-layout"
import { BillingSettings } from "@/components/billing-settings"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and billing preferences</p>
        </div>

        <BillingSettings />
      </div>
    </DashboardLayout>
  )
}
