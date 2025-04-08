"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, CheckCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import WorkflowStage1 from "@/components/workflow/stage-1"
import WorkflowStageFinal from "@/components/workflow/stage-final"
import { useAuth } from "@/contexts/auth-context"
import { Skeleton } from "@/components/ui/skeleton"

export default function WorkflowPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [activeStep, setActiveStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [projectId, setProjectId] = useState<string | null>(null)
  const [contentObject, setContentObject] = useState({
    websiteUrl: "",
    socialProfiles: [],
    stage1Insights: {
      trendingSubtopicsKeywords: [],
      bestPerformingFormats: [],
      audiencePainPointsInterests: [],
      competitorAnglesPerformance: [],
      differentiationOpportunities: [],
    },
    draftFinal: "",
    stage3RefinementNotes: "",
    stage4OptimizationNotes: "",
  })

  useEffect(() => {
    const id = searchParams.get("id")
    if (!id) {
      alert("No project ID found. Redirecting to dashboard.")
      router.push("/dashboard")
      return
    }

    setProjectId(id)
    fetchProjectData(id)
  }, [searchParams, router])

  const fetchProjectData = async (id: string) => {
    setIsLoading(true)
    try {
      // For the mock implementation, we'll simulate fetching project data
      setTimeout(() => {
        // Generate mock data
        generateContent(id, {
          title: "Workflow Automation",
          type: "blog",
          objective: "Explain benefits of workflow automation",
          audience: "Business professionals looking to improve efficiency",
          notes: "Focus on time savings and ROI",
        })
      }, 1500)
    } catch (error) {
      console.error("Error fetching project data:", error)
      alert("Failed to load project data. Please try again.")
      setIsLoading(false)
    }
  }

  const generateContent = async (id: string, projectData: any) => {
    setIsProcessing(true)

    try {
      // In a real implementation, this would call an external API
      // For now, we'll simulate the content generation with a timeout

      setTimeout(() => {
        // Mock data for content generation
        const generatedContent = {
          trending_keywords: ["automation", "AI integration", "workflow optimization"],
          best_formats: ["long-form blog posts with case studies"],
          audience_insights: ["time-consuming manual processes", "integration challenges", "ROI measurement"],
          competitor_insights: ["Technical deep-dives perform well", "Customer success stories get high engagement"],
          opportunities: ["Focus on implementation ease", "Highlight unique automation capabilities"],
          draft_final: `# 5 Ways Workflow Automation Delivers 85% Time Savings for Businesses\n\nIn today's fast-paced business environment, efficiency is everything. Companies are constantly seeking ways to streamline operations, reduce costs, and maximize productivity. Workflow automation has emerged as a powerful solution, offering remarkable time savings and operational benefits.\n\n## 1. Eliminating Manual Data Entry\n\nOne of the most time-consuming aspects of many business processes is manual data entry. Not only is it tedious, but it's also prone to human error. Workflow automation eliminates this burden by:\n\n- Automatically capturing data from forms, emails, and documents\n- Transferring information between systems without human intervention\n- Reducing errors by up to 95% compared to manual processes\n\nA recent study found that employees spend an average of 4.5 hours per week on manual data entry tasks. By automating these processes, companies can reclaim this time for more valuable activities.\n\n## 2. Streamlining Approval Processes\n\nTraditional approval workflows often involve multiple emails, follow-ups, and delays. Automated approval processes create clear paths for documents or requests to follow, with:\n\n- Automatic routing to the appropriate approvers\n- Reminder notifications for pending approvals\n- Escalation protocols for delayed responses\n- Complete visibility into the approval status\n\nOrganizations implementing automated approval workflows report reducing approval times by up to 80%.\n\n## 3. Enhancing Communication and Collaboration\n\nWorkflow automation improves team coordination by:\n\n- Providing real-time status updates on projects and tasks\n- Automatically notifying team members when action is required\n- Creating centralized information repositories accessible to all stakeholders\n- Eliminating information silos and reducing miscommunication\n\nImproved communication alone can save employees up to 30 minutes per day in unnecessary meetings and email exchanges.\n\n## 4. Standardizing Processes for Consistency\n\nInconsistent processes lead to variable outcomes and quality issues. Automation ensures:\n\n- Every process follows the same optimized steps every time\n- New employees can quickly achieve the same productivity as experienced staff\n- Compliance requirements are consistently met\n- Best practices are embedded into daily operations\n\nStandardized processes have been shown to reduce training time by up to 60% and improve output quality by 40%.\n\n## 5. Providing Actionable Analytics\n\nAutomated workflows generate valuable data that can be used to:\n\n- Identify bottlenecks in processes\n- Measure key performance indicators in real-time\n- Make data-driven decisions about resource allocation\n- Continuously improve and optimize operations\n\nCompanies leveraging workflow analytics report an additional 15-25% efficiency gain after initial automation implementation.\n\n## The Bottom Line: 85% Time Savings\n\nWhen implemented comprehensively across an organization, workflow automation delivers an average time savings of 85% for automated processes. This translates to:\n\n- Reduced operational costs\n- Faster delivery of products and services\n- Improved employee satisfaction and retention\n- Enhanced customer experience\n- Competitive advantage in the marketplace\n\nAs businesses continue to face pressure to do more with less, workflow automation stands out as a critical investment for those seeking to thrive in an increasingly competitive landscape.\n\nIs your organization ready to capture these benefits? The time to automate is now.`,
          refinement_notes:
            "- Added specific statistics to support claims\n- Structured content with clear headings for better readability\n- Incorporated bullet points to break up text and highlight key points\n- Added a compelling introduction and conclusion\n- Ensured consistent tone throughout the piece",
          optimization_notes:
            "- Primary keyword 'workflow automation' appears in title, headings, and throughout content at optimal density\n- Secondary keywords like 'time savings', 'efficiency', 'streamline operations' distributed throughout\n- Added numbered list format which performs well for this topic\n- Optimized title for CTR with specific benefit (85% time savings)\n- Content length (1,245 words) is ideal for this topic based on top-performing competitor content",
          status: "complete",
        }

        // Update state
        setContentObject({
          websiteUrl: projectData.website_url || "",
          socialProfiles: projectData.social_profiles || [],
          stage1Insights: {
            trendingSubtopicsKeywords: generatedContent.trending_keywords,
            bestPerformingFormats: generatedContent.best_formats,
            audiencePainPointsInterests: generatedContent.audience_insights,
            competitorAnglesPerformance: generatedContent.competitor_insights,
            differentiationOpportunities: generatedContent.opportunities,
          },
          draftFinal: generatedContent.draft_final,
          stage3RefinementNotes: generatedContent.refinement_notes,
          stage4OptimizationNotes: generatedContent.optimization_notes,
        })

        setActiveStep(2)
        setIsProcessing(false)
        setIsLoading(false)
      }, 3000) // Simulate 3 second processing time
    } catch (error) {
      console.error("Error generating content:", error)
      alert("Failed to generate content. Please try again.")
      setIsProcessing(false)
      setIsLoading(false)
    }
  }

  const handleStage1Update = (data: any) => {
    setContentObject((prev) => ({
      ...prev,
      stage1Insights: data,
    }))
  }

  const handleNextStage = () => {
    setActiveStep(2)
  }

  const handlePreviousStage = () => {
    setActiveStep(1)
  }

  const handleContentUpdate = async (updatedContent: string) => {
    if (!projectId) return

    try {
      // In a real implementation, this would update the content in Supabase
      // For now, we'll just update the local state
      setContentObject((prev) => ({
        ...prev,
        draftFinal: updatedContent,
      }))

      alert("Content updated successfully")
    } catch (error) {
      console.error("Error updating content:", error)
      alert("Failed to update content. Please try again.")
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Content Workflow</h1>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Workflow</h1>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Step {activeStep} of 2</h2>
          <div className="flex space-x-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 w-16 rounded-full ${
                  i === activeStep ? "bg-purple-600" : i < activeStep ? "bg-purple-300" : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Button
          variant={activeStep === 1 ? "default" : "outline"}
          className={`flex flex-col items-center justify-center h-20 ${activeStep === 1 ? "bg-purple-600 hover:bg-purple-700" : ""}`}
          onClick={() => setActiveStep(1)}
        >
          <FileText className="h-5 w-5 mb-1" />
          <span className="text-xs">Content Creation</span>
        </Button>

        <Button
          variant={activeStep === 2 ? "default" : "outline"}
          className={`flex flex-col items-center justify-center h-20 ${activeStep === 2 ? "bg-purple-600 hover:bg-purple-700" : ""}`}
          onClick={() => setActiveStep(2)}
          disabled={isProcessing || (!contentObject.draftFinal && activeStep < 2)}
        >
          <CheckCircle className="h-5 w-5 mb-1" />
          <span className="text-xs">Review & Publish</span>
        </Button>
      </div>

      {activeStep === 1 && isProcessing ? (
        <div className="flex flex-col items-center justify-center p-12 border rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <h3 className="text-xl font-medium mb-2">Generating your content...</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Our AI is analyzing your inputs, researching trends, and crafting high-quality content tailored to your
            needs. This may take a few moments.
          </p>
        </div>
      ) : activeStep === 1 ? (
        <WorkflowStage1 contentObject={contentObject} onUpdate={handleStage1Update} onNext={handleNextStage} />
      ) : null}

      {activeStep === 2 && (
        <WorkflowStageFinal
          contentObject={contentObject}
          onPrevious={handlePreviousStage}
          onContentUpdate={handleContentUpdate}
          projectId={projectId}
        />
      )}
    </div>
  )
}
