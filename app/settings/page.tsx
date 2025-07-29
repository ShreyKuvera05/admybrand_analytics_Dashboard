"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Settings, Bell, Shield, Key, Users, Plus, Copy, RefreshCw, Check, UserPlus } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  })
  const [apiKeyCopied, setApiKeyCopied] = useState(false)

  const handleNotificationChange = (type: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [type]: value }))
    toast({
      title: "Notification Settings Updated",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${value ? "enabled" : "disabled"}`,
      duration: 2000,
    })
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText("ak_live_1234567890abcdef")
    setApiKeyCopied(true)
    toast({
      title: "API Key Copied",
      description: "API key has been copied to clipboard",
      duration: 2000,
    })
    setTimeout(() => setApiKeyCopied(false), 2000)
  }

  const regenerateApiKey = () => {
    toast({
      title: "API Key Regenerated",
      description: "Your API key has been regenerated successfully",
      duration: 3000,
    })
  }

  const connectService = (service: string) => {
    toast({
      title: `Connect to ${service}`,
      description: `Redirecting to ${service} authentication...`,
      duration: 2000,
    })
  }

  const inviteTeamMember = () => {
    toast({
      title: "Invite Sent",
      description: "Team member invitation has been sent via email",
      duration: 3000,
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-gray-300 dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
          Settings & Configuration
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
          Manage your account settings, integrations, and team preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <CardTitle className="text-gray-900 dark:text-white">General Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-gray-700 dark:text-gray-300">
                Company Name
              </Label>
              <Input
                id="company-name"
                defaultValue="ADmyBRAND Insights"
                className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website-url" className="text-gray-700 dark:text-gray-300">
                Website URL
              </Label>
              <Input
                id="website-url"
                defaultValue="https://admybrand.com"
                className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-gray-700 dark:text-gray-300">
                Timezone
              </Label>
              <Select defaultValue="utc">
                <SelectTrigger className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                  <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                  <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                  <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <CardTitle className="text-gray-900 dark:text-white">Notification Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-700 dark:text-gray-300">Email Notifications</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(value) => handleNotificationChange("email", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-700 dark:text-gray-300">Push Notifications</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Browser push notifications</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(value) => handleNotificationChange("push", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-700 dark:text-gray-300">SMS Alerts</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Critical alerts via SMS</p>
              </div>
              <Switch checked={notifications.sms} onCheckedChange={(value) => handleNotificationChange("sms", value)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-700 dark:text-gray-300">Marketing Updates</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Product news and tips</p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(value) => handleNotificationChange("marketing", value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* API & Integrations */}
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Key className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <CardTitle className="text-gray-900 dark:text-white">API & Integrations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">API Key</Label>
              <div className="flex space-x-2">
                <Input
                  value="ak_live_1234567890abcdef"
                  readOnly
                  className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyApiKey}
                  className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  {apiKeyCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={regenerateApiKey}
                  className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 dark:text-gray-300">Connected Services</Label>

              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-white/10 rounded-lg bg-white/50 dark:bg-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GA</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Google Analytics</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Web analytics platform</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30">
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-white/10 rounded-lg bg-white/50 dark:bg-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Slack</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Team communication</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => connectService("Slack")}
                  className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  Connect
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-white/10 rounded-lg bg-white/50 dark:bg-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Z</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Zapier</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Workflow automation</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => connectService("Zapier")}
                  className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  Connect
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Manage Integrations
            </Button>
          </CardContent>
        </Card>

        {/* Team Management */}
        <Card className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <CardTitle className="text-gray-900 dark:text-white">Team Management</CardTitle>
              </div>
              <Button
                size="sm"
                onClick={inviteTeamMember}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg border border-blue-200 dark:border-blue-500/20">
              <span className="text-blue-800 dark:text-blue-400 text-sm font-medium">3 of 10 seats used</span>
              <Badge
                variant="outline"
                className="bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-500/30"
              >
                Pro Plan
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-white/10 rounded-lg bg-white/50 dark:bg-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">JD</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">John Doe</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">john@admybrand.com</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30">
                  Admin
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-white/10 rounded-lg bg-white/50 dark:bg-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">SM</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Sarah Miller</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">sarah@admybrand.com</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30">
                  Editor
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-white/10 rounded-lg bg-white/50 dark:bg-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">MJ</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Mike Johnson</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">mike@admybrand.com</p>
                  </div>
                </div>
                <Badge className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30">
                  Viewer
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">Default Role for New Members</Label>
              <Select defaultValue="viewer">
                <SelectTrigger className="bg-white/70 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="lg:col-span-2 bg-white/70 dark:bg-black/20 backdrop-blur-xl border-gray-300 dark:border-white/10 shadow-lg dark:shadow-none">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <CardTitle className="text-gray-900 dark:text-white">Security & Privacy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Session Timeout</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Auto-logout after inactivity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Login Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Alert on new device login</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Data Encryption</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Encrypt sensitive data</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30">
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Audit Logging</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Track user activities</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">GDPR Compliance</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Data protection compliance</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30">
                    Compliant
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
