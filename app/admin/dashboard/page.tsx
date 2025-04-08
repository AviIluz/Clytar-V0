"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Settings, Bell } from "lucide-react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [users, setUsers] = useState([
    {
      id: "1",
      full_name: "Admin User",
      email: "aviiluz1000@gmail.com",
      company: "Clytar",
      is_admin: true,
      plan: "premium",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      full_name: "Regular User",
      email: "user@example.com",
      company: "Example Co",
      is_admin: false,
      plan: "free",
      created_at: new Date().toISOString(),
    },
  ])
  const [notification, setNotification] = useState({
    message: "",
    recipient: "all",
  })
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    // In a real implementation, this would fetch users from Supabase
    console.log("Fetching users...")
  }, [])

  const handlePlanToggle = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          const newPlan = user.plan === "free" ? "premium" : "free"
          // In a real implementation, this would update the user's plan in Supabase
          console.log(`Updating user ${userId} plan to ${newPlan}`)
          return { ...user, plan: newPlan }
        }
        return user
      }),
    )
  }

  const handleSendNotification = () => {
    if (!notification.message) return

    setIsSending(true)

    // In a real implementation, this would save the notification to Supabase
    setTimeout(() => {
      console.log("Sending notification:", notification)
      setIsSending(false)
      setNotification({ message: "", recipient: "all" })
      alert("Notification sent successfully!")
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((user) => user.plan === "premium").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((user) => user.is_admin).length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.full_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.is_admin ? "default" : "outline"}>{user.is_admin ? "Admin" : "User"}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.plan === "premium" ? "default" : "outline"}
                        className={user.plan === "premium" ? "bg-purple-600" : ""}
                      >
                        {user.plan === "premium" ? "Premium" : "Free"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={user.plan === "premium"}
                          onCheckedChange={() => handlePlanToggle(user.id)}
                          disabled={user.email === "aviiluz1000@gmail.com"} // Can't change admin's plan
                        />
                        <span className="text-xs">Premium</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Send Notification
            </CardTitle>
            <CardDescription>Send notifications to users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Select
                  value={notification.recipient}
                  onValueChange={(value) => setNotification((prev) => ({ ...prev, recipient: value }))}
                >
                  <SelectTrigger id="recipient">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.full_name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your notification message..."
                  value={notification.message}
                  onChange={(e) => setNotification((prev) => ({ ...prev, message: e.target.value }))}
                  rows={4}
                />
              </div>

              <Button
                onClick={handleSendNotification}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                disabled={isSending || !notification.message}
              >
                {isSending ? "Sending..." : "Send Notification"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            System Settings
          </CardTitle>
          <CardDescription>Configure system-wide settings</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Additional system settings will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  )
}
