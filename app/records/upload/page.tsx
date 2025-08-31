import { DashboardLayout } from "@/components/dashboard-layout"
import { RecordUpload } from "@/components/record-upload"

export default function UploadPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Upload Health Records</h1>
          <p className="text-muted-foreground">Add new medical documents to your encrypted health record collection</p>
        </div>
        <RecordUpload />
      </div>
    </DashboardLayout>
  )
}
