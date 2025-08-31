"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, ImageIcon, File, AlertCircle, CheckCircle, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface UploadedDocument {
  id: string
  file: File
  type: "receipt" | "medical_bill" | "documentation"
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
  "Other"
]

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return ImageIcon
  if (type === "application/pdf") return FileText
  return File
}

export function InsuranceClaimForm() {
  const [claimType, setClaimType] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitProgress, setSubmitProgress] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const claimAmount = Number.parseFloat(amount) || 0
  const isInstantProcessing = claimAmount > 0 && claimAmount < 1000
  const exceedsLimit = claimAmount > 5000

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docType: "receipt" | "medical_bill" | "documentation") => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const document: UploadedDocument = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        type: docType
      }

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setDocuments((prev) =>
            prev.map((d) => (d.id === document.id ? { ...d, preview: e.target?.result as string } : d))
          )
        }
        reader.readAsDataURL(file)
      }

      setDocuments((prev) => [...prev, document])
    })
  }

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Enhanced validation
    if (!claimType) {
      toast({
        title: "Missing Information",
        description: "Please select a claim type",
        variant: "destructive"
      })
      return
    }
    
    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than $0",
        variant: "destructive"
      })
      return
    }
    
    if (Number.parseFloat(amount) > 5000) {
      toast({
        title: "Amount Exceeds Limit",
        description: "Claims cannot exceed $5,000. Please contact support for assistance.",
        variant: "destructive"
      })
      return
    }
    
    if (documents.length === 0) {
      toast({
        title: "Missing Documents",
        description: "Please upload at least one receipt or medical bill",
        variant: "destructive"
      })
      return
    }
    
    // Check if required documents are uploaded
    const hasReceipt = documents.some(doc => doc.type === "receipt")
    const hasMedicalBill = documents.some(doc => doc.type === "medical_bill")
    
    if (!hasReceipt || !hasMedicalBill) {
      toast({
        title: "Missing Required Documents",
        description: "Please upload both a receipt and medical bill",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    setSubmitProgress(0)

    try {
      // Simulate submission process
      const steps = [
        { progress: 20, message: "Validating claim details..." },
        { progress: 40, message: "Uploading documents..." },
        { progress: 60, message: "AI analysis in progress..." },
        { progress: 80, message: "Processing claim..." },
        { progress: 100, message: "Claim submitted successfully!" }
      ]

      for (const step of steps) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setSubmitProgress(step.progress)
      }

      setIsSubmitting(false)
      setIsSubmitted(true)

      toast({
        title: "Claim Submitted Successfully!",
        description: isInstantProcessing 
          ? "Your claim has been approved! Payment will be sent to your wallet within 24 hours."
          : "Your claim is under review. You'll receive an update within 24 hours."
      })
    } catch (error) {
      setIsSubmitting(false)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your claim. Please try again.",
        variant: "destructive"
      })
    }
  }

  if (isSubmitted) {
    return (
      <Card className="text-center py-8 sm:py-12">
        <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Claim Submitted Successfully!</h2>
        <p className="text-muted-foreground mb-6 px-4">
          {isInstantProcessing 
            ? "Your claim has been approved and payment will be sent to your wallet within 24 hours."
            : "Your claim is under review. You'll receive an update within 24 hours."
          }
        </p>
        <div className="space-y-2 text-sm text-muted-foreground mb-6">
          <p>Claim Amount: ${amount}</p>
          <p>Claim Type: {claimType}</p>
          <p>Documents Uploaded: {documents.length}</p>
        </div>
        <Button 
          onClick={() => window.location.href = "/dashboard"}
          className="w-full sm:w-auto"
        >
                          Back to Passport
        </Button>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image 
              src="/almaglobal_logo.png" 
              alt="AlmaGlobal" 
              width={20} 
              height={20}
              className="h-5 w-5"
            />
            Claim Information
          </CardTitle>
          <CardDescription>
            Provide details about your medical expense
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="claimType">Claim Type</Label>
              <Select value={claimType} onValueChange={setClaimType}>
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
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                max="5000"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the medical service or treatment"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Required Documents
          </CardTitle>
          <CardDescription>
            Upload receipts, medical bills, and supporting documentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Receipt Upload */}
          <div className="space-y-3">
            <Label>Hospital/Clinic Receipt</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center">
              <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload receipt showing the amount paid
              </p>
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload(e, "receipt")}
                className="hidden"
                id="receipt-upload"
              />
              <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                <label htmlFor="receipt-upload">
                  Choose File
                </label>
              </Button>
            </div>
          </div>

          {/* Medical Bill Upload */}
          <div className="space-y-3">
            <Label>Medical Bill/Invoice</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload the medical bill or invoice
              </p>
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload(e, "medical_bill")}
                className="hidden"
                id="bill-upload"
              />
              <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                <label htmlFor="bill-upload">
                  Choose File
                </label>
              </Button>
            </div>
          </div>

          {/* Additional Documentation */}
          <div className="space-y-3">
            <Label>Additional Documentation (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center">
              <File className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Any additional medical records or documentation
              </p>
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload(e, "documentation")}
                className="hidden"
                id="doc-upload"
              />
              <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                <label htmlFor="doc-upload">
                  Choose File
                </label>
              </Button>
            </div>
          </div>

          {/* Uploaded Documents */}
          {documents.length > 0 && (
            <div className="space-y-3">
              <Label>Uploaded Documents</Label>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg gap-3">
                    <div className="flex items-center gap-3">
                      {doc.preview ? (
                        <img src={doc.preview} alt="Preview" className="w-10 h-10 object-cover rounded" />
                      ) : (
                        <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                          {(() => {
                            const IconComponent = getFileIcon(doc.file.type)
                            return <IconComponent className="h-5 w-5 text-muted-foreground" />
                          })()}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{doc.file.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{doc.type.replace("_", " ")}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(doc.id)}
                      className="text-destructive hover:text-destructive w-full sm:w-auto"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submission Progress */}
      {isSubmitting && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Processing Claim...</span>
                <span className="text-sm text-muted-foreground">{submitProgress}%</span>
              </div>
              <Progress value={submitProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alerts */}
      {exceedsLimit && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Claim amount exceeds the $5,000 limit. Please contact support for assistance.
          </AlertDescription>
        </Alert>
      )}

      {isInstantProcessing && (
        <Alert>
          <Zap className="h-4 w-4" />
          <AlertDescription>
            This claim will be processed instantly since it's under $1,000!
          </AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <Button 
        type="submit"
        disabled={isSubmitting || !claimType || !amount || documents.length === 0}
        className="w-full bg-green-600 hover:bg-green-700"
        size="lg"
      >
        {isSubmitting ? "Submitting Claim..." : "Submit Claim"}
      </Button>
    </form>
  )
}
