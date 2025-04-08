"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Edit, RefreshCw, Calendar, Share, Zap, BarChart3 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface StageFinalProps {
  contentObject: any
  onPrevious: () => void
  onContentUpdate: (content: string) => Promise<void>
  projectId: string | null
}

export default function WorkflowStageFinal({ contentObject, onPrevious, onContentUpdate, projectId }: StageFinalProps) {
  const [activeTab, setActiveTab] = useState("preview")
  const [finalContent, setFinalContent] = useState(contentObject.draftFinal)
  const [variationType, setVariationType] = useState("emotional")
  const [publishPlatform, setPublishPlatform] = useState("website")
  const [publishCategory, setPublishCategory] = useState("industry")
  const [publishTime, setPublishTime] = useState("now")
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [scheduleDate, setScheduleDate] = useState(new Date().toISOString().split("T")[0])
  const [scheduleTime, setScheduleTime] = useState("09:00")
  const [additionalPlatforms, setAdditionalPlatforms] = useState({
    linkedin: false,
    twitter: false,
    facebook: false,
    medium: false,
  })

  const handleEditContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFinalContent(e.target.value)
  }

  const handleSaveDraft = async () => {
    if (!projectId) return

    setIsSaving(true)
    try {
      await onContentUpdate(finalContent)

      // In a real implementation, this would update the project status in Supabase
      console.log("Saved draft for project:", projectId)

      setTimeout(() => {
        setIsSaving(false)
        alert("Draft saved successfully")
      }, 1000)
    } catch (error) {
      console.error("Error saving draft:", error)
      alert("Failed to save draft. Please try again.")
      setIsSaving(false)
    }
  }

  const handleRequestVariation = async () => {
    if (!projectId) return

    setIsRegenerating(true)

    try {
      // In a real implementation, this would call an external API
      // For now, we'll simulate the variation generation with a timeout

      setTimeout(async () => {
        let newContent = finalContent

        if (variationType === "emotional") {
          newContent = finalContent.replace(
            "# 5 Ways Workflow Automation Delivers 85% Time Savings for Businesses",
            "# Stop Wasting Precious Hours: How Workflow Automation Rescued Teams from Tedious Tasks",
          )
        } else if (variationType === "data-driven") {
          newContent = finalContent.replace(
            "# 5 Ways Workflow Automation Delivers 85% Time Savings for Businesses",
            "# The ROI of Workflow Automation: 85% Time Savings & 3.2x Productivity Increase",
          )
        } else if (variationType === "concise") {
          newContent = finalContent.replace(
            "# 5 Ways Workflow Automation Delivers 85% Time Savings for Businesses",
            "# Workflow Automation: 5 Quick Ways to Save 85% of Your Time",
          )
        }

        // Save the variation
        await onContentUpdate(newContent)
        setFinalContent(newContent)

        alert(`Generated a new ${variationType} variation of your content`)

        setIsRegenerating(false)
      }, 3000)
    } catch (error) {
      console.error("Error generating variation:", error)
      alert("Failed to generate variation. Please try again.")
      setIsRegenerating(false)
    }
  }

  const handleApproveAndSchedule = () => {
    setShowScheduleDialog(true)
  }

  const handleConfirmSchedule = async () => {
    if (!projectId) return

    setIsPublishing(true)

    try {
      // In a real implementation, this would call an external API (Buffer, Hootsuite, etc.)
      // For now, we'll simulate the scheduling with a timeout

      setTimeout(() => {
        // In a real implementation, this would save scheduling details to Supabase
        console.log("Scheduled content for project:", projectId, {
          date: scheduleDate,
          time: scheduleTime,
          platform: publishPlatform,
          category: publishCategory,
          additionalPlatforms: Object.entries(additionalPlatforms)
            .filter(([_, value]) => value)
            .map(([key]) => key),
        })

        setShowScheduleDialog(false)
        setShowSuccessDialog(true)
        setIsPublishing(false)
      }, 2000)
    } catch (error) {
      console.error("Error scheduling content:", error)
      alert("Failed to schedule content. Please try again.")
      setIsPublishing(false)
    }
  }

  const handleTogglePlatform = (platform: keyof typeof additionalPlatforms) => {
    setAdditionalPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }))
  }

  return (
    <Card className="border-t-4 border-t-purple-600">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle className="mr-2 h-5 w-5 text-purple-600" />
          Review & Publish
        </CardTitle>
        <CardDescription>Review your AI-generated content, make edits if needed, and publish</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="preview">Content Preview</TabsTrigger>
            <TabsTrigger value="variations">Request Variations</TabsTrigger>
            <TabsTrigger value="publish">Publish Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit in Rich Text Editor
                </Button>
              </div>

              <Textarea value={finalContent} onChange={handleEditContent} className="min-h-[500px] font-mono text-sm" />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="refinement-notes">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center">
                      <Zap className="mr-2 h-4 w-4 text-purple-600" />
                      View Refinement Notes
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mb-4">
                      <pre className="text-sm whitespace-pre-wrap">{contentObject.stage3RefinementNotes}</pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="optimization-notes">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4 text-purple-600" />
                      View Optimization Notes
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                      <pre className="text-sm whitespace-pre-wrap">{contentObject.stage4OptimizationNotes}</pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h4 className="font-medium mb-2">Content Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Word Count:</span> 1,245
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reading Time:</span> ~6 minutes
                  </div>
                  <div>
                    <span className="text-muted-foreground">Primary Keyword:</span> workflow automation
                  </div>
                  <div>
                    <span className="text-muted-foreground">Keyword Density:</span> 1.2%
                  </div>
                  <div>
                    <span className="text-muted-foreground">Readability:</span> Grade 8 (Good)
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tone:</span> Professional, Persuasive
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="variations">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Request Content Variation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Need a different approach? Select a variation type below and we'll generate an alternative version.
                </p>

                <RadioGroup
                  defaultValue={variationType}
                  onValueChange={setVariationType}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:border-purple-500">
                    <RadioGroupItem value="emotional" id="emotional" />
                    <Label htmlFor="emotional" className="cursor-pointer">
                      <div className="font-medium">More Emotional</div>
                      <p className="text-xs text-muted-foreground mt-1">Emphasize pain points and emotional benefits</p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:border-purple-500">
                    <RadioGroupItem value="data-driven" id="data-driven" />
                    <Label htmlFor="data-driven" className="cursor-pointer">
                      <div className="font-medium">More Data-Driven</div>
                      <p className="text-xs text-muted-foreground mt-1">Focus on metrics, statistics, and ROI</p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:border-purple-500">
                    <RadioGroupItem value="concise" id="concise" />
                    <Label htmlFor="concise" className="cursor-pointer">
                      <div className="font-medium">More Concise</div>
                      <p className="text-xs text-muted-foreground mt-1">Shorter, more direct version of the content</p>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-6 flex justify-end">
                  <Button onClick={handleRequestVariation} disabled={isRegenerating}>
                    {isRegenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Generate Variation
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="publish">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Publishing Options</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Select Platform</Label>
                    <Select defaultValue={publishPlatform} onValueChange={setPublishPlatform}>
                      <SelectTrigger id="platform">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Company Website</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Content Category</Label>
                    <Select defaultValue={publishCategory} onValueChange={setPublishCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">Product Updates</SelectItem>
                        <SelectItem value="industry">Industry Insights</SelectItem>
                        <SelectItem value="howto">How-To Guides</SelectItem>
                        <SelectItem value="case-study">Case Studies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Publishing Time</Label>
                    <RadioGroup
                      defaultValue={publishTime}
                      onValueChange={setPublishTime}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:border-purple-500">
                        <RadioGroupItem value="now" id="now" />
                        <Label htmlFor="now" className="cursor-pointer">
                          Publish Now
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:border-purple-500">
                        <RadioGroupItem value="schedule" id="schedule" />
                        <Label htmlFor="schedule" className="cursor-pointer">
                          Schedule for Later
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Insights
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save as Draft"}
          </Button>
          <Button
            onClick={handleApproveAndSchedule}
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
            disabled={isPublishing}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            {isPublishing ? "Processing..." : "Approve & Schedule"}
          </Button>
        </div>
      </CardFooter>

      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Publication</DialogTitle>
            <DialogDescription>Choose when and where to publish your content.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-date">Publication Date</Label>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  id="schedule-date"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule-time">Publication Time</Label>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <input
                  type="time"
                  id="schedule-time"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule-platforms">Additional Platforms</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="linkedin"
                    className="rounded border-gray-300"
                    checked={additionalPlatforms.linkedin}
                    onChange={() => handleTogglePlatform("linkedin")}
                  />
                  <Label htmlFor="linkedin">LinkedIn</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="twitter"
                    className="rounded border-gray-300"
                    checked={additionalPlatforms.twitter}
                    onChange={() => handleTogglePlatform("twitter")}
                  />
                  <Label htmlFor="twitter">Twitter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="facebook"
                    className="rounded border-gray-300"
                    checked={additionalPlatforms.facebook}
                    onChange={() => handleTogglePlatform("facebook")}
                  />
                  <Label htmlFor="facebook">Facebook</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="medium"
                    className="rounded border-gray-300"
                    checked={additionalPlatforms.medium}
                    onChange={() => handleTogglePlatform("medium")}
                  />
                  <Label htmlFor="medium">Medium</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)} disabled={isPublishing}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSchedule}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
              disabled={isPublishing}
            >
              {isPublishing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Confirm Schedule
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <CheckCircle className="mr-2 h-5 w-5" />
              Content Successfully Scheduled
            </DialogTitle>
            <DialogDescription>Your content has been scheduled for publication.</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-200 dark:border-green-800 mb-4">
              <p className="text-sm text-green-800 dark:text-green-200">
                "{finalContent.split("\n")[0].replace("# ", "")}" will be published on{" "}
                {new Date(scheduleDate).toLocaleDateString()} at {scheduleTime}.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Primary Platform:</span>
                <span>{publishPlatform === "website" ? "Company Website" : publishPlatform}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Additional Platforms:</span>
                <span>
                  {Object.entries(additionalPlatforms)
                    .filter(([_, value]) => value)
                    .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                    .join(", ") || "None"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Category:</span>
                <span>{publishCategory.charAt(0).toUpperCase() + publishCategory.slice(1)}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSuccessDialog(false)}>
              Close
            </Button>
            <Button asChild variant="outline">
              <div className="flex items-center">
                <Share className="mr-2 h-4 w-4" />
                Share Schedule
              </div>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

// Missing component definition
function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
