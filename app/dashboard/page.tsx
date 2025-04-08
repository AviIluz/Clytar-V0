"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileText, Bell, Settings } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function Dashboard() {
  const { user, isAdmin } = useAuth()
  const [isNewUser] = useState(true)
  const [notifications, setNotifications] = useState<{ id: string; message: string }[]>([])
  const router = useRouter()

  useEffect(() => {
    // In a real implementation, this would fetch notifications from Supabase
    // For now, we'll add a mock notification
    setNotifications([
      {
        id: "1",
        message: "Welcome to Clytar! Get started by creating your first content piece.",
      },
    ])
  }, [])

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          {isAdmin && (
            <Button
              onClick={() => router.push("/admin/dashboard")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" /> Admin
            </Button>
          )}
          <Button
            onClick={() => router.push("/dashboard/new")}
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Content
          </Button>
        </div>
      </div>

      {notifications.length > 0 && (
        <div className="mb-6 space-y-3">
          {notifications.map((notification) => (
            <Alert
              key={notification.id}
              className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20"
            >
              <Bell className="h-4 w-4 text-purple-600" />
              <AlertTitle>Notification</AlertTitle>
              <div className="flex justify-between items-start">
                <AlertDescription>{notification.message}</AlertDescription>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => dismissNotification(notification.id)}
                >
                  Dismiss
                </Button>
              </div>
            </Alert>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Create your first content</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Recent Content</h2>

      {isNewUser ? (
        <Card className="p-6 text-center">
          <div className="flex flex-col items-center justify-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No content yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start creating content to see your recent projects here.
            </p>
            <Button
              onClick={() => router.push("/dashboard/new")}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
            >
              Create Your First Content
            </Button>
          </div>
        </Card>
      ) : null}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.user_metadata?.full_name || "User"}!</CardTitle>
            <CardDescription>This is your personal dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You are now logged in to the Clytar platform.</p>
            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/profile">
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
