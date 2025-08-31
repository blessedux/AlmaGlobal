import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import Link from "next/link"

export function RecordsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Health Records</h1>
        <p className="text-muted-foreground">Manage your encrypted medical documents</p>
      </div>
      <Button className="sm:w-auto" asChild>
        <Link href="/records/upload">
          <Upload className="mr-2 h-4 w-4" />
          Upload Records
        </Link>
      </Button>
    </div>
  )
}
