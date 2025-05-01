import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function FeaturedArticlesSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Badge className="px-3.5 py-1.5 bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-950 border-0">
            Latest Articles
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight text-slate-900 dark:text-white">
            Health & Wellness Insights
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-600 dark:text-slate-400 md:text-lg">
            Expert advice and the latest research to help you live your healthiest life.
          </p>
        </div>
        
        <div className="mx-auto max-w-6xl">
          <Tabs defaultValue="all" className="w-full">
            <div className="relative mb-10 border-b border-slate-200 dark:border-slate-800">
              <TabsList className="flex w-full justify-start overflow-x-auto pb-px scrollbar-hide">
                <TabsTrigger 
                  value="all" 
                  className="px-4 py-2 text-sm font-medium data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none bg-transparent dark:data-[state=active]:text-teal-500 dark:data-[state=active]:border-teal-500"
                >
                  All Topics
                </TabsTrigger>
                <TabsTrigger 
                  value="nutrition" 
                  className="px-4 py-2 text-sm font-medium data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none bg-transparent dark:data-[state=active]:text-teal-500 dark:data-[state=active]:border-teal-500"
                >
                  Nutrition
                </TabsTrigger>
                <TabsTrigger 
                  value="fitness" 
                  className="px-4 py-2 text-sm font-medium data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none bg-transparent dark:data-[state=active]:text-teal-500 dark:data-[state=active]:border-teal-500"
                >
                  Fitness
                </TabsTrigger>
                <TabsTrigger 
                  value="mental-health" 
                  className="px-4 py-2 text-sm font-medium data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none bg-transparent dark:data-[state=active]:text-teal-500 dark:data-[state=active]:border-teal-500"
                >
                  Mental Health
                </TabsTrigger>
                <TabsTrigger 
                  value="preventive" 
                  className="px-4 py-2 text-sm font-medium data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none bg-transparent dark:data-[state=active]:text-teal-500 dark:data-[state=active]:border-teal-500"
                >
                  Preventive Care
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="group overflow-hidden border-0 bg-slate-50 dark:bg-slate-900 rounded-xl shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Healthy meal preparation"
                      width={500}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-5 pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950 border-0">
                        Nutrition
                      </Badge>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="mr-1 h-3 w-3" />
                        5 min read
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-500 transition-colors">
                      <Link href="#">10 Superfoods to Boost Your Immune System Naturally</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-3">
                    <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                      Discover the power of nutrient-dense foods that can help strengthen your body's natural
                      defenses and keep you healthy year-round.
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-5 pt-0 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border border-white dark:border-slate-800">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Emily Wilson" />
                        <AvatarFallback className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 text-xs">EW</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">Dr. Emily Wilson</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="mr-1 h-3 w-3" />
                      Apr 15, 2023
                    </div>
                  </CardFooter>
                </Card>
                
                <Card className="group overflow-hidden border-0 bg-slate-50 dark:bg-slate-900 rounded-xl shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Meditation practice"
                      width={500}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-5 pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950 border-0">
                        Mental Health
                      </Badge>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="mr-1 h-3 w-3" />
                        8 min read
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-500 transition-colors">
                      <Link href="#">The Science of Mindfulness: How Daily Meditation Changes Your Brain</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-3">
                    <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                      Research shows that consistent mindfulness practice can physically alter brain structure and
                      function, leading to improved focus, reduced stress, and better emotional regulation.
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-5 pt-0 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border border-white dark:border-slate-800">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. James Lee" />
                        <AvatarFallback className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-xs">JL</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">Dr. James Lee</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="mr-1 h-3 w-3" />
                      Mar 28, 2023
                    </div>
                  </CardFooter>
                </Card>
                
                <Card className="group overflow-hidden border-0 bg-slate-50 dark:bg-slate-900 rounded-xl shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="High-intensity workout"
                      width={500}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-5 pb-0">
                    <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-950 border-0">
                        Fitness
                      </Badge>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="mr-1 h-3 w-3" />
                        6 min read
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-500 transition-colors">
                      <Link href="#">HIIT vs. Steady-State Cardio: Which Is Right for Your Goals?</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-3">
                    <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                      Comparing the benefits and drawbacks of high-intensity interval training and traditional
                      cardio to help you optimize your workout routine.
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-5 pt-0 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border border-white dark:border-slate-800">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Mark Johnson" />
                        <AvatarFallback className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs">MJ</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">Mark Johnson</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="mr-1 h-3 w-3" />
                      Apr 2, 2023
                    </div>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="mt-12 flex justify-center">
                <Button variant="outline" className="group px-6 py-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white dark:border-teal-500 dark:text-teal-500 dark:hover:bg-teal-500 dark:hover:text-white transition-all duration-200">
                  View All Articles 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="nutrition">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="group overflow-hidden border-0 bg-slate-50 dark:bg-slate-900 rounded-xl shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Healthy meal preparation"
                      width={500}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-5 pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950 border-0">
                        Nutrition
                      </Badge>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="mr-1 h-3 w-3" />
                        5 min read
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-500 transition-colors">
                      <Link href="#">10 Superfoods to Boost Your Immune System Naturally</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-3">
                    <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                      Discover the power of nutrient-dense foods that can help strengthen your body's natural
                      defenses and keep you healthy year-round.
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-5 pt-0 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border border-white dark:border-slate-800">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Emily Wilson" />
                        <AvatarFallback className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 text-xs">EW</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">Dr. Emily Wilson</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="mr-1 h-3 w-3" />
                      Apr 15, 2023
                    </div>
                  </CardFooter>
                </Card>
                
                <Card className="group overflow-hidden border-0 bg-slate-50 dark:bg-slate-900 rounded-xl shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Plant-based diet"
                      width={500}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-5 pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950 border-0">
                        Nutrition
                      </Badge>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="mr-1 h-3 w-3" />
                        7 min read
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-500 transition-colors">
                      <Link href="#">Plant-Based Eating: A Beginner's Guide to Getting Started</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-3">
                    <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                      Learn how to transition to a more plant-focused diet with practical tips, nutritional advice, and delicious recipes that make it easy to incorporate more plants into your meals.
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-5 pt-0 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border border-white dark:border-slate-800">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Chen" />
                        <AvatarFallback className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 text-xs">SC</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">Sarah Chen, RD</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="mr-1 h-3 w-3" />
                      Apr 8, 2023
                    </div>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="mt-12 flex justify-center">
                <Button variant="outline" className="group px-6 py-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white dark:border-teal-500 dark:text-teal-500 dark:hover:bg-teal-500 dark:hover:text-white transition-all duration-200">
                  View All Nutrition Articles 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </TabsContent>
            
            {/* Other tab contents would follow the same pattern */}
          </Tabs>
        </div>
      </div>
    </section>
  )
}