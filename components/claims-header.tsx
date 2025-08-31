import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function ClaimsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Insurance Claims</h1>
        <p className="text-muted-foreground">Track and manage your medical expense claims</p>
      </div>
      <Button className="sm:w-auto" asChild>
        <Link href="/claims/new">
          <Plus className="mr-2 h-4 w-4" />
          Submit New Claim
        </Link>
      </Button>
    </div>
  )
}
