"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, TrendingUp, Users, Target, LineChart } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Stage1Props {
  contentObject: any
  onUpdate: (data: any) => void
  onNext: () => void
}

export default function WorkflowStage1({ contentObject, onUpdate, onNext }: Stage1Props) {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("trends")

  // Mock API call to get insights
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)

      // Check if we have website or social data to analyze
      const hasDataToAnalyze = contentObject.websiteUrl || contentObject.socialProfiles

      // If we don't already have insights and we have data to analyze, generate them
      if (!contentObject.stage1Insights.trendingSubtopicsKeywords.length) {
        if (hasDataToAnalyze) {
          onUpdate({
            trendingSubtopicsKeywords: ["automation", "AI integration", "workflow optimization"],
            bestPerformingFormats: ["long-form blog posts with case studies"],
            audiencePainPointsInterests: [
              "time-consuming manual processes",
              "integration challenges",
              "ROI measurement",
            ],
            competitorAnglesPerformance: [
              "Technical deep-dives perform well",
              "Customer success stories get high engagement",
            ],
            differentiationOpportunities: ["Focus on implementation ease", "Highlight unique automation capabilities"],
          })
        } else {
          // If no data to analyze, provide generic insights
          onUpdate({
            trendingSubtopicsKeywords: ["content marketing", "digital strategy", "audience engagement"],
            bestPerformingFormats: ["blog posts with visuals", "short-form video content"],
            audiencePainPointsInterests: ["finding reliable information", "time constraints", "decision making"],
            competitorAnglesPerformance: [
              "Educational content performs well",
              "Solution-oriented approaches get engagement",
            ],
            differentiationOpportunities: ["Focus on actionable insights", "Highlight unique expertise"],
          })
        }
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="border-t-4 border-t-purple-600">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-purple-600" />
          Stage 1: Data Collection & Trend Analysis
        </CardTitle>
        <CardDescription>Gathering real-time trends, audience preferences, and competitor insights</CardDescription>
      </CardHeader>
      <CardContent>
        {!contentObject.websiteUrl && !contentObject.socialProfiles && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Limited data analysis:</strong> You haven't added website or social profiles yet. Clytar is
                using generic industry trends instead of your specific data. For more accurate insights, add your data
                sources in settings.
              </span>
            </p>
          </div>
        )}

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Trending Subtopics & Keywords</h3>
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {contentObject.stage1Insights.trendingSubtopicsKeywords.map((keyword: string, index: number) => (
                      <Card
                        key={index}
                        className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <div className="mr-2 h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                              <span className="font-medium text-purple-800 dark:text-purple-300">{index + 1}</span>
                            </div>
                            <span>{keyword}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Best Performing Content Formats</h3>
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ) : (
                  <ul className="list-disc pl-5 space-y-2">
                    {contentObject.stage1Insights.bestPerformingFormats.map((format: string, index: number) => (
                      <li key={index}>{format}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audience">
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5 text-purple-600" />
                Audience Pain Points & Interests
              </h3>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : (
                <div className="space-y-4">
                  {contentObject.stage1Insights.audiencePainPointsInterests.map((item: string, index: number) => (
                    <div key={index} className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                          <span className="font-medium text-purple-800 dark:text-purple-300">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{item}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {index === 0
                              ? "High search volume and engagement on this topic"
                              : index === 1
                                ? "Frequently mentioned in customer feedback"
                                : "Common question in industry forums"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="competitors">
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Target className="mr-2 h-5 w-5 text-purple-600" />
                Competitor Content Analysis
              </h3>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : (
                <div className="space-y-4">
                  {contentObject.stage1Insights.competitorAnglesPerformance.map((item: string, index: number) => (
                    <div key={index} className="p-4 border rounded-md">
                      <p className="font-medium">{item}</p>
                      <div className="mt-2 flex items-center">
                        <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: index === 0 ? "75%" : "60%" }}></div>
                        </div>
                        <span className="ml-2 text-sm">{index === 0 ? "75%" : "60%"} engagement</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="opportunities">
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <LineChart className="mr-2 h-5 w-5 text-purple-600" />
                Differentiation Opportunities
              </h3>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : (
                <div className="space-y-4">
                  {contentObject.stage1Insights.differentiationOpportunities.map((item: string, index: number) => (
                    <div
                      key={index}
                      className="p-4 border rounded-md bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-800 dark:text-green-300">
                          ✓
                        </div>
                        <div>
                          <p className="font-medium">{item}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {index === 0
                              ? "Low competition, high audience interest"
                              : "Unique selling point vs competitors"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">{loading ? "Analyzing data..." : "Analysis complete"}</div>
        <Button
          onClick={onNext}
          disabled={loading}
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
        >
          Next Stage <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
