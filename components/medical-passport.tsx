"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Calendar, Stethoscope, Upload, Plus, Eye, EyeOff, QrCode, RefreshCw, Share2, Download } from "lucide-react"
import Image from "next/image"

interface MedicalRecord {
  id: string
  type: string
  date: string
  description: string
  amount?: number
  status: "completed" | "pending" | "cancelled"
}

const mockRecords: MedicalRecord[] = [
  {
    id: "1",
    type: "Dental Checkup",
    date: "2024-01-15",
    description: "Regular dental cleaning and examination",
    amount: 150,
    status: "completed"
  },
  {
    id: "2",
    type: "Blood Test",
    date: "2024-01-10",
    description: "Complete blood count and cholesterol screening",
    amount: 89,
    status: "completed"
  },
  {
    id: "3",
    type: "Eye Exam",
    date: "2024-01-05",
    description: "Annual vision examination",
    amount: 75,
    status: "completed"
  }
]

export function MedicalPassport() {
  const [records] = useState<MedicalRecord[]>(mockRecords)
  const [showQR, setShowQR] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mx-auto sm:mx-0">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div>
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-muted-foreground">john.doe@email.com</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                <div>
                  <span className="font-medium">Date of Birth:</span>
                  <p className="text-muted-foreground">January 15, 1990</p>
                </div>
                <div>
                  <span className="font-medium">Blood Type:</span>
                  <p className="text-muted-foreground">O+</p>
                </div>
                <div>
                  <span className="font-medium">Emergency Contact:</span>
                  <p className="text-muted-foreground">Jane Doe (555-0123)</p>
                </div>
                <div>
                  <span className="font-medium">Insurance Status:</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Records */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Medical Records
            </CardTitle>
            <Button size="sm" variant="outline" className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          </div>
          <CardDescription>
            Your complete medical history and health records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="checkups">Checkups</TabsTrigger>
              <TabsTrigger value="tests">Tests</TabsTrigger>
              <TabsTrigger value="treatments">Treatments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-6">
              {records.map((record) => (
                <div key={record.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-3">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{record.type}</h4>
                      <p className="text-sm text-muted-foreground">{record.description}</p>
                      <p className="text-xs text-muted-foreground">{record.date}</p>
                    </div>
                  </div>
                  
                  <div className="text-left sm:text-right">
                    {record.amount && (
                      <p className="font-medium">${record.amount}</p>
                    )}
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="checkups" className="mt-6">
              <div className="text-center py-8 text-muted-foreground">
                <Stethoscope className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Checkup records will appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="tests" className="mt-6">
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Test results will appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="treatments" className="mt-6">
              <div className="text-center py-8 text-muted-foreground">
                <Stethoscope className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Treatment records will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* QR Code Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Medical Passport QR Code
          </CardTitle>
          <CardDescription>
            Share this QR code with healthcare providers for instant access to your records
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 border-2 border-dashed border-border rounded-lg">
                <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                  {showQR ? (
                    <QrCode className="h-20 w-20 text-muted-foreground" />
                  ) : (
                    <Image 
                      src="/almaglobal_logo.png" 
                      alt="AlmaGlobal" 
                      width={80} 
                      height={80}
                      className="h-20 w-20"
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQR(!showQR)}
              >
                {showQR ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showQR ? "Hide QR" : "Show QR"}
              </Button>
              
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              This QR code contains encrypted access to your medical records
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
