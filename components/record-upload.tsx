"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, X, FileText, ImageIcon, File, Shield, CheckCircle, AlertCircle } from "lucide-react"

interface UploadFile {
  id: string
  file: File
  progress: number
  status: "uploading" | "encrypting" | "completed" | "error"
  ipfsHash?: string
  error?: string
}

const categories = [
  "Lab Results",
  "Imaging",
  "Prescriptions",
  "Immunizations",
  "Dental",
  "Vision",
  "Mental Health",
  "Emergency",
  "Other",
]

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return ImageIcon
  if (type === "application/pdf") return FileText
  return File
}

const getFileTypeColor = (type: string) => {
  if (type.startsWith("image/")) return "bg-blue-500"
  if (type === "application/pdf") return "bg-red-500"
  return "bg-gray-500"
}

export function RecordUpload() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [isDragOver, setIsDragOver] = useState(false)

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]

    if (file.size > maxSize) {
      return "File size must be less than 10MB"
    }

    if (!allowedTypes.includes(file.type)) {
      return "Only PDF, JPG, and PNG files are allowed"
    }

    return null
  }

  const processFile = async (file: File) => {
    const error = validateFile(file)
    if (error) {
      const uploadFile: UploadFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        progress: 0,
        status: "error",
        error,
      }
      setFiles((prev) => [...prev, uploadFile])
      return
    }

    const uploadFile: UploadFile = {
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: "uploading",
    }

    setFiles((prev) => [...prev, uploadFile])

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? { ...f, progress } : f)))
    }

    // Simulate encryption
    setFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? { ...f, status: "encrypting" } : f)))

    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Complete upload
    const ipfsHash = `Qm${Math.random().toString(36).substr(2, 44)}`
    setFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? { ...f, status: "completed", ipfsHash } : f)))
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    droppedFiles.forEach(processFile)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    selectedFiles.forEach(processFile)
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const getStatusIcon = (status: UploadFile["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "encrypting":
        return <Shield className="h-4 w-4 text-blue-500 animate-pulse" />
      default:
        return <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    }
  }

  const getStatusText = (status: UploadFile["status"]) => {
    switch (status) {
      case "uploading":
        return "Uploading..."
      case "encrypting":
        return "Encrypting..."
      case "completed":
        return "Completed"
      case "error":
        return "Error"
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Drag and drop your health records or click to browse. Files are automatically encrypted before storage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragOver(true)
            }}
            onDragLeave={() => setIsDragOver(false)}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Drop files here or click to upload</h3>
            <p className="text-muted-foreground mb-4">Supports PDF, JPG, PNG files up to 10MB each</p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
            <CardDescription>Track the status of your file uploads and encryption</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {files.map((uploadFile) => {
              const FileIcon = getFileIcon(uploadFile.file.type)
              return (
                <div key={uploadFile.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${getFileTypeColor(uploadFile.file.type)}`}
                  >
                    <FileIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm truncate">{uploadFile.file.name}</p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(uploadFile.status)}
                        <span className="text-xs text-muted-foreground">{getStatusText(uploadFile.status)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>{(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB</span>
                      {uploadFile.ipfsHash && <span className="font-mono">{uploadFile.ipfsHash}</span>}
                    </div>
                    {uploadFile.status === "uploading" && <Progress value={uploadFile.progress} className="h-2" />}
                    {uploadFile.status === "error" && <p className="text-xs text-red-500">{uploadFile.error}</p>}
                    {uploadFile.status === "completed" && (
                      <Badge variant="outline" className="text-xs">
                        <Shield className="mr-1 h-3 w-3" />
                        Encrypted & Stored
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFile(uploadFile.id)} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* Metadata Form */}
      <Card>
        <CardHeader>
          <CardTitle>Record Information</CardTitle>
          <CardDescription>Add details to help organize your health records</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any additional notes about these records..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          size="lg"
          className="flex-1"
          disabled={files.length === 0 || files.some((f) => f.status !== "completed")}
        >
          Save Records
        </Button>
        <Button variant="outline" size="lg">
          Cancel
        </Button>
      </div>
    </div>
  )
}
