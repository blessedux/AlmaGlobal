import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, CreditCard, Upload, CheckCircle } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "payment",
    title: "Monthly premium paid",
    description: "Payment of $30.00 processed successfully",
    timestamp: "2 hours ago",
    icon: CreditCard,
    status: "completed",
  },
  {
    id: 2,
    type: "upload",
    title: "Health record uploaded",
    description: "Blood test results from Dr. Smith",
    timestamp: "1 day ago",
    icon: Upload,
    status: "completed",
  },
  {
    id: 3,
    type: "claim",
    title: "Claim approved",
    description: "Dental cleaning claim for $150.00",
    timestamp: "3 days ago",
    icon: CheckCircle,
    status: "approved",
  },
  {
    id: 4,
    type: "document",
    title: "Medical passport updated",
    description: "QR code regenerated with new records",
    timestamp: "1 week ago",
    icon: FileText,
    status: "completed",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest insurance and health record activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 pb-4 last:pb-0 border-b last:border-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <activity.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <Badge variant="outline" className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
