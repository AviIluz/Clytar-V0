"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, BarChart2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AnalyticsPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
      </div>

      <Card className="p-6 text-center">
        <div className="flex flex-col items-center justify-center py-12">
          <BarChart2 className="h-16 w-16 text-muted-foreground mb-6" />
          <h3 className="text-xl font-medium mb-3">No analytics data available</h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Analytics will be available once you've created content. Clytar will analyze your content performance and
            provide valuable insights.
          </p>
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
            onClick={() => router.push("/dashboard")}
          >
            Return to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  )
}
