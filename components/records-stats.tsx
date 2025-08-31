import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, Calendar, HardDrive } from "lucide-react"

const stats = [
  {
    title: "Total Records",
    value: "24",
    description: "Documents uploaded",
    icon: FileText,
  },
  {
    title: "Storage Used",
    value: "156 MB",
    description: "Of unlimited storage",
    icon: HardDrive,
  },
  {
    title: "Encrypted Files",
    value: "24",
    description: "100% secure",
    icon: Shield,
  },
  {
    title: "Last Upload",
    value: "2 days ago",
    description: "Blood test results",
    icon: Calendar,
  },
]

export function RecordsStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
