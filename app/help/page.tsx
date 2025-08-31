import { DashboardLayout } from "@/components/dashboard-layout"
import { HelpCenter } from "@/components/help-center"

export default function HelpPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Help Center</h1>
          <p className="text-muted-foreground">Find answers to common questions and get support</p>
        </div>
        <HelpCenter />
      </div>
    </DashboardLayout>
  )
}
