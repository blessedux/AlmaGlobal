import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Activity, Shield, Calendar } from "lucide-react"

const healthSummary = {
  personalInfo: {
    age: 32,
    bloodType: "O+",
    height: "5'8\"",
    weight: "165 lbs",
  },
  allergies: ["Penicillin", "Shellfish"],
  medications: ["Lisinopril 10mg", "Vitamin D3"],
  conditions: ["Hypertension (controlled)", "Seasonal allergies"],
  recentRecords: [
    {
      type: "Lab Results",
      date: "2024-01-15",
      summary: "Complete blood panel - Normal",
    },
    {
      type: "Imaging",
      date: "2024-01-10",
      summary: "Chest X-ray - Clear",
    },
    {
      type: "Vaccination",
      date: "2024-01-05",
      summary: "COVID-19 booster",
    },
  ],
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "+1 (555) 123-4567",
  },
}

export function PassportSummary() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Health Summary
          </CardTitle>
          <CardDescription>Key health information included in your medical passport</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Personal Info */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Personal Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Age:</span>
                  <span className="font-medium">{healthSummary.personalInfo.age}</span>
                </div>
                <div className="flex justify-between">
                  <span>Blood Type:</span>
                  <span className="font-medium">{healthSummary.personalInfo.bloodType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Height:</span>
                  <span className="font-medium">{healthSummary.personalInfo.height}</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight:</span>
                  <span className="font-medium">{healthSummary.personalInfo.weight}</span>
                </div>
              </div>
            </div>

            {/* Allergies & Medications */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Allergies & Medications</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Allergies:</p>
                  <div className="flex flex-wrap gap-1">
                    {healthSummary.allergies.map((allergy) => (
                      <Badge key={allergy} variant="destructive" className="text-xs">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Medications:</p>
                  <div className="space-y-1">
                    {healthSummary.medications.map((med) => (
                      <p key={med} className="text-xs">
                        {med}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Medical Conditions</h4>
              <div className="space-y-1">
                {healthSummary.conditions.map((condition) => (
                  <p key={condition} className="text-xs">
                    {condition}
                  </p>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Emergency Contact</h4>
              <div className="space-y-1 text-xs">
                <p className="font-medium">{healthSummary.emergencyContact.name}</p>
                <p className="text-muted-foreground">{healthSummary.emergencyContact.relationship}</p>
                <p className="font-mono">{healthSummary.emergencyContact.phone}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Medical Records
          </CardTitle>
          <CardDescription>Latest health records included in your passport</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {healthSummary.recentRecords.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{record.summary}</p>
                    <p className="text-xs text-muted-foreground">{record.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(record.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Privacy & Security</p>
              <p className="text-muted-foreground">
                Your medical passport contains only summary information. Full medical records require additional
                authorization and are never shared without your explicit consent. All data is encrypted and stored
                securely on IPFS.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
