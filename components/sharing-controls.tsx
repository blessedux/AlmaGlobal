"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Share2, Clock, Shield, Users, Plus, X } from "lucide-react"
import { useState } from "react"

interface SharingControlsProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

interface SharedAccess {
  id: string
  name: string
  email: string
  accessLevel: "summary" | "full"
  expiresAt: string
  status: "active" | "expired"
}

const mockSharedAccess: SharedAccess[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "s.johnson@healthcenter.com",
    accessLevel: "full",
    expiresAt: "2024-02-15",
    status: "active",
  },
  {
    id: "2",
    name: "City General Hospital",
    email: "records@citygeneral.com",
    accessLevel: "summary",
    expiresAt: "2024-01-30",
    status: "active",
  },
]

export function SharingControls({ enabled, onToggle }: SharingControlsProps) {
  const [accessLevel, setAccessLevel] = useState("summary")
  const [expirationDays, setExpirationDays] = useState("7")
  const [sharedAccess, setSharedAccess] = useState<SharedAccess[]>(mockSharedAccess)
  const [newShareEmail, setNewShareEmail] = useState("")

  const handleAddAccess = () => {
    if (!newShareEmail) return

    const newAccess: SharedAccess = {
      id: Date.now().toString(),
      name: newShareEmail.split("@")[0],
      email: newShareEmail,
      accessLevel: accessLevel as "summary" | "full",
      expiresAt: new Date(Date.now() + Number.parseInt(expirationDays) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      status: "active",
    }

    setSharedAccess([...sharedAccess, newAccess])
    setNewShareEmail("")
  }

  const handleRevokeAccess = (id: string) => {
    setSharedAccess(sharedAccess.filter((access) => access.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            <CardTitle>Sharing Controls</CardTitle>
          </div>
          <Switch checked={enabled} onCheckedChange={onToggle} />
        </div>
        <CardDescription>Manage who can access your medical passport</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {enabled ? (
          <>
            {/* Default Settings */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Default Sharing Settings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="access-level">Access Level</Label>
                  <Select value={accessLevel} onValueChange={setAccessLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary Only</SelectItem>
                      <SelectItem value="full">Full Records</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiration">Default Expiration</Label>
                  <Select value={expirationDays} onValueChange={setExpirationDays}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 day</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Add New Access */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Grant Access</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter email address..."
                  value={newShareEmail}
                  onChange={(e) => setNewShareEmail(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddAccess} disabled={!newShareEmail}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Active Shares */}
            {sharedAccess.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Active Shares</h4>
                  <Badge variant="outline" className="text-xs">
                    <Users className="mr-1 h-3 w-3" />
                    {sharedAccess.length} active
                  </Badge>
                </div>
                <div className="space-y-2">
                  {sharedAccess.map((access) => (
                    <div key={access.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">{access.name}</p>
                          <Badge variant="outline" className="text-xs">
                            {access.accessLevel}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{access.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Expires: {new Date(access.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRevokeAccess(access.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy Notice */}
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Privacy Protected</p>
                  <p>
                    All shared access is encrypted and logged. You can revoke access at any time. Recipients can only
                    view the data level you've granted.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <Share2 className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Sharing is currently disabled</p>
            <p className="text-xs text-muted-foreground mt-1">Enable sharing to grant access to healthcare providers</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
