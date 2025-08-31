"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Download, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react"

interface Claim {
  id: string
  type: string
  description: string
  amount: number
  status: "pending" | "approved" | "rejected" | "paid"
  submittedDate: string
  processedDate?: string
  paymentDate?: string
  transactionHash?: string
  receipts: number
}

const mockClaims: Claim[] = [
  {
    id: "CLM-001",
    type: "Dental",
    description: "Routine cleaning and checkup",
    amount: 150,
    status: "paid",
    submittedDate: "2024-01-15",
    processedDate: "2024-01-15",
    paymentDate: "2024-01-16",
    transactionHash: "0x7a8b9c2d...",
    receipts: 2,
  },
  {
    id: "CLM-002",
    type: "Lab Results",
    description: "Blood work and comprehensive panel",
    amount: 320,
    status: "approved",
    submittedDate: "2024-01-12",
    processedDate: "2024-01-12",
    receipts: 1,
  },
  {
    id: "CLM-003",
    type: "Prescription",
    description: "Antibiotics for infection",
    amount: 45,
    status: "paid",
    submittedDate: "2024-01-08",
    processedDate: "2024-01-08",
    paymentDate: "2024-01-09",
    transactionHash: "0x3f4e5d6c...",
    receipts: 1,
  },
  {
    id: "CLM-004",
    type: "Imaging",
    description: "X-ray for sports injury",
    amount: 280,
    status: "pending",
    submittedDate: "2024-01-20",
    receipts: 3,
  },
  {
    id: "CLM-005",
    type: "Emergency",
    description: "Urgent care visit",
    amount: 450,
    status: "approved",
    submittedDate: "2024-01-18",
    processedDate: "2024-01-19",
    receipts: 2,
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "paid":
      return <DollarSign className="h-4 w-4 text-green-500" />
    case "approved":
      return <CheckCircle className="h-4 w-4 text-blue-500" />
    case "rejected":
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return <Clock className="h-4 w-4 text-yellow-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-500"
    case "approved":
      return "bg-blue-500"
    case "rejected":
      return "bg-red-500"
    default:
      return "bg-yellow-500"
  }
}

export function ClaimsList() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [claims] = useState<Claim[]>(mockClaims)

  const filteredClaims = claims.filter((claim) => {
    return selectedStatus === "all" || claim.status === selectedStatus
  })

  return (
    <div className="space-y-4">
      {/* Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Claims History</h3>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Claims</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Claims List */}
      <div className="space-y-4">
        {filteredClaims.map((claim) => (
          <Card key={claim.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{claim.id}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {claim.type}
                    </Badge>
                  </div>
                  <CardDescription>{claim.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">${claim.amount}</div>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(claim.status)}
                    <Badge className={getStatusColor(claim.status)}>
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Submitted</div>
                  <div className="font-medium">{new Date(claim.submittedDate).toLocaleDateString()}</div>
                </div>
                {claim.processedDate && (
                  <div>
                    <div className="text-sm text-muted-foreground">Processed</div>
                    <div className="font-medium">{new Date(claim.processedDate).toLocaleDateString()}</div>
                  </div>
                )}
                {claim.paymentDate && (
                  <div>
                    <div className="text-sm text-muted-foreground">Paid</div>
                    <div className="font-medium">{new Date(claim.paymentDate).toLocaleDateString()}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-muted-foreground">Receipts</div>
                  <div className="font-medium">{claim.receipts} files</div>
                </div>
              </div>

              {claim.transactionHash && (
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Transaction Hash</div>
                  <div className="font-mono text-sm">{claim.transactionHash}</div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipts
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClaims.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No claims found</h3>
            <p className="text-muted-foreground mb-4">
              {selectedStatus !== "all"
                ? `No claims with status "${selectedStatus}"`
                : "You haven't submitted any claims yet"}
            </p>
            <Button>Submit Your First Claim</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
