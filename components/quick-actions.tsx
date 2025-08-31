import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Plus, QrCode, FileText } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Upload Records",
    description: "Add new health documents",
    icon: Upload,
    href: "/records/upload",
  },
  {
    title: "Submit Claim",
    description: "File a new insurance claim",
    icon: Plus,
    href: "/claims/new",
  },
  {
    title: "Medical Passport",
    description: "View your QR code",
    icon: QrCode,
    href: "/passport",
  },
  {
    title: "View Records",
    description: "Browse your documents",
    icon: FileText,
    href: "/records",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action) => (
          <Button key={action.title} variant="ghost" className="w-full justify-start gap-3 h-auto p-3" asChild>
            <Link href={action.href}>
              <action.icon className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
