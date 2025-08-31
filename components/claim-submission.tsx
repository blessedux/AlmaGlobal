"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Upload, X, FileText, ImageIcon, File, AlertCircle, CheckCircle, Zap, Shield } from "lucide-react"

interface UploadedReceipt {
  id: string
  file: File
  preview?: string
}

const claimTypes = [
  "Dental",
  "Vision",
  "Prescription",
  "Lab Results",
  "Imaging",
  "Emergency",
  "Specialist Visit",
  "Physical Therapy",
  "Mental Health",
  "Other",
]

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return ImageIcon
  if (type === "application/pdf") return FileText
  return File
}

export function ClaimSubmission() {
  const [claimType, setClaimType] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [receipts, setReceipts] = useState<UploadedReceipt[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitProgress, setSubmitProgress] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const claimAmount = Number.parseFloat(amount) || 0
  const isInstantProcessing = claimAmount > 0 && claimAmount < 1000
  const exceedsLimit = claimAmount > 5000
  const remainingCoverage = 5000 - 2450 // Mock: $2450 already claimed this period

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const receipt: UploadedReceipt = {
        id: Math.random().toString(36).substr(2, 9),
        file,
      }

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setReceipts((prev) =>
            prev.map((r) => (r.id === receipt.id ? { ...r, preview: e.target?.result as string } : r)),
          )
        }
        reader.readAsDataURL(file)
      }

      setReceipts((prev) => [...prev, receipt])
    })
  }

  const removeReceipt = (id: string) => {
    setReceipts((prev) => prev.filter((r) => r.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitProgress(0)

    // Simulate submission process
    const steps = [
      { progress: 20, message: "Validating claim details..." },
      { progress: 40, message: "Uploading receipts..." },
      { progress: 60, message: "Encrypting documents..." },
      { progress: 80, message: "Processing claim..." },
      { progress: 100, message: "Claim submitted successfully!" },
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitProgress(step.progress)
    }

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <CheckCircle className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Claim Submitted Successfully!</h2>
          <p className="text-muted-foreground mb-6">
            Your claim for ${amount} has been submitted and assigned ID: CLM-
            {Math.random().toString(36).substr(2, 6).toUpperCase()}
          </p>

          {isInstantProcessing && (
            <Alert className="mb-6">
              <Zap className="h-4 w-4" />
              <AlertDescription>
                <strong>Instant Processing:</strong> Your claim is under $1,000 and will be automatically approved
                within minutes. Payment will be processed within 24 hours.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <div className="text-muted-foreground">Claim Type</div>
              <div className="font-medium">{claimType}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Amount</div>
              <div className="font-medium">${amount}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Processing Time</div>
              <div className="font-medium">{isInstantProcessing ? "< 5 minutes" : "1-3 business days"}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Payment Method</div>
              <div className="font-medium">USDC to wallet</div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1">View Claim Status</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Submit Another Claim
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Coverage Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Coverage Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Annual Limit</div>
              <div className="text-2xl font-bold">$5,000</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Remaining Coverage</div>
              <div className="text-2xl font-bold text-primary">${remainingCoverage.toLocaleString()}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Coverage Used</span>
              <span>$2,450 / $5,000</span>
            </div>
            <Progress value={(2450 / 5000) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Claim Details */}
      <Card>
        <CardHeader>
          <CardTitle>Claim Information</CardTitle>
          <CardDescription>Provide details about your medical expense</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="claim-type">Claim Type</Label>
              <Select value={claimType} onValueChange={setClaimType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select claim type" />
                </SelectTrigger>
                <SelectContent>
                  {claimTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Claim Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                max="5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the medical service or treatment..."
              rows={3}
              required
            />
          </div>

          {/* Amount Validation Alerts */}
          {claimAmount > 0 && (
            <div className="space-y-2">
              {isInstantProcessing && (
                <Alert>
                  <Zap className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Instant Processing:</strong> Claims under $1,000 are automatically approved within minutes.
                  </AlertDescription>
                </Alert>
              )}
              {exceedsLimit && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Exceeds Coverage:</strong> This claim amount exceeds your annual coverage limit of $5,000.
                  </AlertDescription>
                </Alert>
              )}
              {claimAmount > remainingCoverage && !exceedsLimit && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Insufficient Coverage:</strong> You only have ${remainingCoverage} remaining in your annual
                    coverage.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Receipt Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Receipts</CardTitle>
          <CardDescription>Upload receipts, invoices, or other supporting documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Drag and drop files or click to browse</p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="receipt-upload"
            />
            <Button type="button" variant="outline" asChild>
              <label htmlFor="receipt-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
          </div>

          {receipts.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Receipts ({receipts.length})</Label>
              <div className="grid gap-2">
                {receipts.map((receipt) => {
                  const FileIcon = getFileIcon(receipt.file.type)
                  return (
                    <div key={receipt.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      {receipt.preview ? (
                        <img
                          src={receipt.preview || "/placeholder.svg"}
                          alt="Receipt preview"
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                          <FileIcon className="h-5 w-5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{receipt.file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(receipt.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeReceipt(receipt.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processing Info */}
      {isInstantProcessing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Instant Processing Eligible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Processing Time</div>
                <div className="font-medium">Under 5 minutes</div>
              </div>
              <div>
                <div className="text-muted-foreground">Payment Time</div>
                <div className="font-medium">Within 24 hours</div>
              </div>
              <div>
                <div className="text-muted-foreground">Payment Method</div>
                <div className="font-medium">USDC to your wallet</div>
              </div>
              <div>
                <div className="text-muted-foreground">Network Fee</div>
                <div className="font-medium">Covered by AlmaGlobal</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submission */}
      <Card>
        <CardContent className="p-6">
          {isSubmitting && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Submitting claim...</span>
                <span>{submitProgress}%</span>
              </div>
              <Progress value={submitProgress} className="h-2" />
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              disabled={
                !claimType ||
                !amount ||
                !description ||
                receipts.length === 0 ||
                exceedsLimit ||
                claimAmount > remainingCoverage ||
                isSubmitting
              }
            >
              {isSubmitting ? "Submitting..." : `Submit Claim for $${amount || "0"}`}
            </Button>
            <Button type="button" variant="outline" size="lg">
              Save Draft
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            By submitting this claim, you confirm that all information is accurate and you have the right to claim these
            expenses.
          </p>
        </CardContent>
      </Card>
    </form>
  )
}
