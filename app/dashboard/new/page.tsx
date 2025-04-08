"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, FileText, MessageSquare, Mail } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { getSupabaseBrowserClient } from "@/lib/supabase"

export default function NewContent() {
  const router = useRouter()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contentData, setContentData] = useState({
    title: "",
    contentType: "blog",
    topic: "",
    audience: "",
    brandNotes: "",
  })
  const [projectId, setProjectId] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState({
    step1: false,
    step2: false,
  })

  // Check if all required fields for step 1 are filled
  const isStep1Valid = contentData.title.trim() !== "" && contentData.topic.trim() !== ""

  // Check if all required fields for step 2 are filled
  const isStep2Valid = contentData.audience.trim() !== ""

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContentData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = async () => {
    if (!isStep1Valid) {
      setFormErrors((prev) => ({ ...prev, step1: true }))
      return
    }

    setIsSubmitting(true)

    try {
      // Save to mock Supabase
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from("content_projects")
        .insert({
          user_id: user?.id || "unknown",
          title: contentData.title,
          type: contentData.contentType,
          objective: contentData.topic,
          status: "draft",
        })
        .select()

      if (error) throw error

      // For the mock implementation, we'll generate a project ID
      const mockProjectId = `project-${Date.now()}`
      setProjectId(mockProjectId)
      setStep(2)
      setFormErrors((prev) => ({ ...prev, step1: false }))
    } catch (error) {
      console.error("Error saving content:", error)
      alert("Failed to save content. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleCreateContent = async () => {
    if (!isStep2Valid) {
      setFormErrors((prev) => ({ ...prev, step2: true }))
      return
    }

    if (!projectId) {
      alert("Project ID not found. Please try again.")
      return
    }

    setIsSubmitting(true)

    try {
      // Update project with audience and notes
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase
        .from("content_projects")
        .update({
          audience: contentData.audience,
          notes: contentData.brandNotes,
          status: "processing",
        })
        .eq("id", projectId)

      if (error) throw error

      // Redirect to workflow page
      router.push(`/dashboard/content/workflow?id=${projectId}`)
    } catch (error) {
      console.error("Error updating content:", error)
      alert("Failed to update content. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <h1 className="text-3xl font-bold mb-8">Create New Content</h1>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Step {step} of 2</h2>
          <div className="flex space-x-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 w-16 rounded-full ${
                  i === step ? "bg-purple-600" : i < step ? "bg-purple-300" : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <Alert className="mb-6 border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20">
        <FileText className="h-4 w-4 text-purple-600" />
        <AlertTitle>Streamlined Content Creation</AlertTitle>
        <AlertDescription>
          We've simplified the content creation process. Just provide the basic details, and our AI will automatically
          generate, refine, and optimize your content in one seamless process.
        </AlertDescription>
      </Alert>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Content Details</CardTitle>
            <CardDescription>Let's start with the basics of your content creation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Content Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Q2 Product Launch Blog Post"
                value={contentData.title}
                onChange={handleInputChange}
                className={formErrors.step1 && !contentData.title ? "border-red-500" : ""}
              />
              {formErrors.step1 && !contentData.title && <p className="text-sm text-red-500">Title is required</p>}
            </div>

            <div className="space-y-2">
              <Label>Content Type</Label>
              <RadioGroup
                defaultValue={contentData.contentType}
                onValueChange={(value) => setContentData((prev) => ({ ...prev, contentType: value }))}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:border-purple-500">
                  <RadioGroupItem value="blog" id="blog" />
                  <Label htmlFor="blog" className="flex items-center cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" /> Blog Post
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:border-purple-500">
                  <RadioGroupItem value="social" id="social" />
                  <Label htmlFor="social" className="flex items-center cursor-pointer">
                    <MessageSquare className="mr-2 h-4 w-4" /> Social Media
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:border-purple-500">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email" className="flex items-center cursor-pointer">
                    <Mail className="mr-2 h-4 w-4" /> Email Copy
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic or Objective</Label>
              <Input
                id="topic"
                name="topic"
                placeholder="e.g., Benefits of our new product feature"
                value={contentData.topic}
                onChange={handleInputChange}
                className={formErrors.step1 && !contentData.topic ? "border-red-500" : ""}
              />
              {formErrors.step1 && !contentData.topic && <p className="text-sm text-red-500">Topic is required</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Content Focus</CardTitle>
            <CardDescription>Provide specific details to guide the content creation process.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Textarea
                id="audience"
                name="audience"
                placeholder="Describe your target audience, their pain points, and interests"
                value={contentData.audience}
                onChange={handleInputChange}
                rows={3}
                className={formErrors.step2 && !contentData.audience ? "border-red-500" : ""}
              />
              {formErrors.step2 && !contentData.audience && (
                <p className="text-sm text-red-500">Target audience is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandNotes">Brand Notes</Label>
              <Textarea
                id="brandNotes"
                name="brandNotes"
                placeholder="Any specific brand guidelines, tone, or style preferences"
                value={contentData.brandNotes}
                onChange={handleInputChange}
                rows={3}
              />
              <p className="text-sm text-muted-foreground">Optional</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button
              onClick={handleCreateContent}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Create Content"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
