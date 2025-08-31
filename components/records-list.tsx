"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Eye, MoreHorizontal, FileText, ImageIcon, File } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HealthRecord {
  id: string
  name: string
  type: "pdf" | "image" | "document"
  category: string
  date: string
  size: string
  encrypted: boolean
  ipfsHash: string
}

const mockRecords: HealthRecord[] = [
  {
    id: "1",
    name: "Blood Test Results - Complete Panel",
    type: "pdf",
    category: "Lab Results",
    date: "2024-01-15",
    size: "2.4 MB",
    encrypted: true,
    ipfsHash: "QmX7Y8Z9...",
  },
  {
    id: "2",
    name: "Chest X-Ray - Annual Checkup",
    type: "image",
    category: "Imaging",
    date: "2024-01-10",
    size: "8.1 MB",
    encrypted: true,
    ipfsHash: "QmA1B2C3...",
  },
  {
    id: "3",
    name: "Prescription - Antibiotics",
    type: "pdf",
    category: "Prescriptions",
    date: "2024-01-08",
    size: "156 KB",
    encrypted: true,
    ipfsHash: "QmD4E5F6...",
  },
  {
    id: "4",
    name: "Vaccination Record - COVID-19",
    type: "pdf",
    category: "Immunizations",
    date: "2024-01-05",
    size: "892 KB",
    encrypted: true,
    ipfsHash: "QmG7H8I9...",
  },
  {
    id: "5",
    name: "MRI Scan - Knee Injury",
    type: "image",
    category: "Imaging",
    date: "2023-12-28",
    size: "15.2 MB",
    encrypted: true,
    ipfsHash: "QmJ1K2L3...",
  },
  {
    id: "6",
    name: "Dental Cleaning Report",
    type: "pdf",
    category: "Dental",
    date: "2023-12-20",
    size: "1.1 MB",
    encrypted: true,
    ipfsHash: "QmM4N5O6...",
  },
]

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return FileText
    case "image":
      return ImageIcon
    default:
      return File
  }
}

export function RecordsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [records] = useState<HealthRecord[]>(mockRecords)

  const filteredRecords = records.filter((record) => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || record.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(records.map((record) => record.category)))

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search health records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Records Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRecords.map((record) => {
          const FileIcon = getFileIcon(record.type)
          return (
            <Card key={record.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-medium line-clamp-2">{record.name}</CardTitle>
                      <CardDescription className="text-xs">{record.category}</CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{new Date(record.date).toLocaleDateString()}</span>
                    <span>{record.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {record.encrypted ? "Encrypted" : "Not Encrypted"}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">{record.ipfsHash}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No records found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Upload your first health record to get started"}
            </p>
            <Button>Upload Records</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
