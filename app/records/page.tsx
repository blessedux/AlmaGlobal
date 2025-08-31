import { DashboardLayout } from "@/components/dashboard-layout"
import { RecordsHeader } from "@/components/records-header"
import { RecordsList } from "@/components/records-list"
import { RecordsStats } from "@/components/records-stats"

export default function RecordsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <RecordsHeader />
        <RecordsStats />
        <RecordsList />
      </div>
    </DashboardLayout>
  )
}
