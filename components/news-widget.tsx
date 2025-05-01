"use client"

import { useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Mock news data
const newsItems = [
  {
    id: 1,
    title: "New Study Links Regular Exercise to Improved Mental Health",
    source: "Health Journal",
    date: "April 15, 2023",
    category: "research",
    url: "#",
    excerpt:
      "Researchers found that just 30 minutes of moderate exercise three times a week can significantly reduce symptoms of anxiety and depression.",
  },
  {
    id: 2,
    title: "Mediterranean Diet Ranked Best Diet for Heart Health",
    source: "Nutrition Today",
    date: "April 10, 2023",
    category: "nutrition",
    url: "#",
    excerpt:
      "The diet rich in olive oil, nuts, fish, and fresh produce continues to show significant benefits for cardiovascular health.",
  },
  {
    id: 3,
    title: "CDC Updates Vaccination Guidelines for Adults",
    source: "Public Health News",
    date: "April 8, 2023",
    category: "prevention",
    url: "#",
    excerpt: "New recommendations include additional boosters for certain age groups and risk categories.",
  },
  {
    id: 4,
    title: "Breakthrough in Alzheimer's Research Shows Promise",
    source: "Medical Science Review",
    date: "April 5, 2023",
    category: "research",
    url: "#",
    excerpt:
      "A new treatment approach targeting specific proteins in the brain has shown positive results in early clinical trials.",
  },
  {
    id: 5,
    title: "Sleep Quality More Important Than Quantity, Study Finds",
    source: "Sleep Research Institute",
    date: "April 3, 2023",
    category: "wellness",
    url: "#",
    excerpt:
      "Research indicates that the quality of sleep may be more crucial for overall health than the total hours spent sleeping.",
  },
  {
    id: 6,
    title: "New Guidelines for Managing Hypertension Released",
    source: "Cardiology Association",
    date: "March 30, 2023",
    category: "prevention",
    url: "#",
    excerpt:
      "Updated recommendations focus on lifestyle modifications alongside medication for better blood pressure management.",
  },
]

export function NewsWidget() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredNews = activeTab === "all" ? newsItems : newsItems.filter((item) => item.category === activeTab)

  return (
    <Tabs defaultValue="all" onValueChange={setActiveTab}>
      <TabsList className="mb-6 flex flex-wrap justify-center gap-2">
        <TabsTrigger value="all">All News</TabsTrigger>
        <TabsTrigger value="research">Research</TabsTrigger>
        <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        <TabsTrigger value="prevention">Prevention</TabsTrigger>
        <TabsTrigger value="wellness">Wellness</TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="mt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? // Loading skeletons
              Array(6)
                .fill(0)
                .map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <Skeleton className="mb-2 h-4 w-20" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="mb-2 h-4 w-full" />
                      <Skeleton className="mb-2 h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                  </Card>
                ))
            : filteredNews.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="capitalize">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.source}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">{item.excerpt}</p>
                    <a
                      href={item.url}
                      className="mt-4 inline-flex items-center text-xs font-medium text-teal-600 hover:underline"
                    >
                      Read full article <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
