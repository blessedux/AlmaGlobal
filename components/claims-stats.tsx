import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Clock, CheckCircle, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Claims",
    value: "8",
    description: "Lifetime submissions",
    icon: TrendingUp,
  },
  {
    title: "Claims Paid",
    value: "$2,450",
    description: "Total reimbursed",
    icon: DollarSign,
  },
  {
    title: "Pending Claims",
    value: "2",
    description: "Under review",
    icon: Clock,
  },
  {
    title: "Approval Rate",
    value: "95%",
    description: "Claims approved",
    icon: CheckCircle,
  },
]

export function ClaimsStats() {
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
