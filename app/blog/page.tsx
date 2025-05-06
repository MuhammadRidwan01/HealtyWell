"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LiveChat } from "@/components/live-chat"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Clock, Search, Tag, Calendar, ArrowRight, ThumbsUp, MessageSquare, Share2 } from "lucide-react"

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  // Blog articles data
  const blogArticles = [
    {
      id: 1,
      title: "The Role of AI in Modern Health Monitoring",
      excerpt: "Discover how artificial intelligence is revolutionizing the way we track and improve our health metrics.",
      content: `
        <p>Artificial intelligence is transforming healthcare monitoring in unprecedented ways. Modern AI systems can now analyze patterns in your health data that would be impossible for humans to detect manually.</p>
        
        <h3>Key Benefits of AI Health Monitoring</h3>
        <ul>
          <li>Early detection of health anomalies before they become serious</li>
          <li>Personalized health insights based on your unique data patterns</li>
          <li>Continuous monitoring without manual tracking</li>
          <li>Predictive analytics to forecast potential health issues</li>
        </ul>
        
        <p>Recent studies have shown that AI-powered health monitoring can detect certain conditions up to 6 months earlier than traditional diagnostic methods. This early detection capability is particularly valuable for chronic conditions like diabetes, heart disease, and certain types of cancer.</p>
        
        <h3>How AI Analyzes Your Health Data</h3>
        <p>Modern AI health assistants use several sophisticated techniques to analyze your health data:</p>
        
        <ol>
          <li><strong>Pattern Recognition:</strong> Identifying recurring patterns in vital signs, activity levels, and other metrics</li>
          <li><strong>Anomaly Detection:</strong> Flagging unusual changes that deviate from your personal baseline</li>
          <li><strong>Comparative Analysis:</strong> Comparing your metrics against population data while accounting for your unique factors</li>
          <li><strong>Predictive Modeling:</strong> Using past data to forecast future health trends</li>
        </ol>
        
        <p>The most exciting aspect of AI health monitoring is its ability to learn and improve over time. As these systems collect more data about your health patterns, their insights become increasingly accurate and personalized.</p>
        
        <h3>Privacy Considerations</h3>
        <p>While AI health monitoring offers tremendous benefits, it's important to consider privacy implications. Always ensure that any AI health platform you use employs strong encryption, transparent data policies, and gives you control over your information.</p>
        
        <p>The future of healthcare is increasingly personalized, preventive, and powered by intelligent systems that work alongside healthcare professionals to keep you at your healthiest.</p>
      `,
      image: "/images/blog/ai-health-monitoring.jpg",
      category: "Technology",
      author: {
        name: "Dr. Sarah Chen",
        avatar: "/images/avatars/sarah-chen.jpg",
        role: "Health Technology Researcher"
      },
      date: "May 15, 2023",
      readTime: "8 min read",
      tags: ["AI", "Health Tech", "Monitoring"]
    },
    {
      id: 2,
      title: "Nutrition Myths Debunked by Science",
      excerpt: "Separating fact from fiction: what the latest research tells us about common nutrition beliefs.",
      content: `
        <p>The world of nutrition is filled with conflicting information, making it difficult to know what to believe. Let's examine some common nutrition myths and what science actually tells us.</p>
        
        <h3>Myth 1: Eating Fat Makes You Fat</h3>
        <p>For decades, low-fat diets were recommended for weight loss. However, research now shows that healthy fats are essential for optimal health. Monounsaturated and polyunsaturated fats from sources like avocados, nuts, and olive oil can actually help with weight management and reduce inflammation.</p>
        
        <h3>Myth 2: You Need to Eat Every 2-3 Hours to Boost Metabolism</h3>
        <p>The idea that frequent eating &quot;stokes the metabolic fire&quot; has been disproven. Studies show that meal frequency has minimal impact on metabolism. What matters more is your total caloric intake and the quality of foods you consume.</p>
        
        <h3>Myth 3: Carbs Are Bad for You</h3>
        <p>Not all carbohydrates are created equal. Highly processed carbs can indeed contribute to health problems, but whole food carbohydrates from fruits, vegetables, and whole grains provide essential nutrients and fiber that support good health.</p>
        
        <h3>Myth 4: Natural Sugars Are Much Healthier Than Added Sugars</h3>
        <p>While natural sugars in fruits come packaged with fiber, vitamins, and antioxidants, the body processes all sugars similarly. The key difference is the &quot;package&quot; they come in and the quantity consumed.</p>
        
        <h3>Myth 5: Supplements Can Make Up for a Poor Diet</h3>
        <p>Research consistently shows that nutrients from whole foods are more beneficial than isolated supplements. While supplements have their place, they cannot replicate the complex interactions of nutrients in whole foods.</p>
        
        <p>The most reliable nutrition advice remains remarkably consistent: eat a variety of whole foods, mostly plants, not too much. Focus on food quality, mindful eating, and sustainable habits rather than following the latest trends.</p>
      `,
      image: "/images/blog/nutrition-myths.jpg",
      category: "Nutrition",
      author: {
        name: "Michael Rodriguez",
        avatar: "/images/avatars/michael-rodriguez.jpg",
        role: "Nutritional Scientist"
      },
      date: "June 3, 2023",
      readTime: "6 min read",
      tags: ["Nutrition", "Diet", "Health Facts"]
    },
    {
      id: 3,
      title: "The Science of Effective Sleep: Quality Over Quantity",
      excerpt: "New research reveals why the quality of your sleep matters more than how many hours you spend in bed.",
      content: `
        <p>While most people focus on getting the recommended 7-9 hours of sleep, emerging research suggests that sleep quality may be even more important than sleep duration for overall health and cognitive function.</p>
        
        <h3>What Defines Quality Sleep?</h3>
        <p>Quality sleep is characterized by:</p>
        <ul>
          <li>Proper cycling through all sleep stages (light, deep, and REM)</li>
          <li>Minimal disruptions and awakenings</li>
          <li>Appropriate timing aligned with your circadian rhythm</li>
          <li>Feeling refreshed upon waking</li>
        </ul>
        
        <h3>The Impact of Sleep Quality on Health</h3>
        <p>Recent studies have found that poor sleep quality, even with adequate duration, is associated with:</p>
        <ul>
          <li>Increased inflammation markers</li>
          <li>Impaired glucose metabolism</li>
          <li>Reduced cognitive performance</li>
          <li>Higher risk of cardiovascular issues</li>
          <li>Compromised immune function</li>
        </ul>
        
        <h3>Optimizing Your Sleep Architecture</h3>
        <p>Sleep architecture refers to the structure of your sleep cycles throughout the night. Here are evidence-based strategies to improve it:</p>
        
        <ol>
          <li><strong>Consistent Schedule:</strong> Going to bed and waking up at the same time daily helps regulate your circadian rhythm</li>
          <li><strong>Light Management:</strong> Exposure to bright light in the morning and limiting blue light before bed helps signal your brain when to be alert or prepare for sleep</li>
          <li><strong>Temperature Control:</strong> Research shows that a slightly cool room temperature (around 65-68°F or 18-20°C) promotes better sleep</li>
          <li><strong>Mindful Eating:</strong> Avoiding large meals and caffeine close to bedtime prevents digestive discomfort and stimulation</li>
          <li><strong>Relaxation Techniques:</strong> Practices like deep breathing or progressive muscle relaxation can improve sleep onset and quality</li>
        </ol>
        
        <h3>Tracking Sleep Quality</h3>
        <p>Modern sleep tracking technology can provide insights into your sleep architecture, helping you identify patterns and make targeted improvements. Look for devices that measure:</p>
        <ul>
          <li>Time spent in each sleep stage</li>
          <li>Sleep continuity and disruptions</li>
          <li>Heart rate variability during sleep</li>
          <li>Breathing patterns</li>
        </ul>
        
        <p>Remember that while technology can provide helpful data, your subjective feeling upon waking remains one of the most reliable indicators of sleep quality.</p>
      `,
      image: "/images/blog/sleep-science.jpg",
      category: "Sleep",
      author: {
        name: "Dr. James Wilson",
        avatar: "/images/avatars/james-wilson.jpg",
        role: "Sleep Researcher"
      },
      date: "April 22, 2023",
      readTime: "7 min read",
      tags: ["Sleep", "Health", "Wellness"]
    },
    {
      id: 4,
      title: "Mindfulness Practices for Stress Reduction",
      excerpt: "Simple mindfulness techniques that can help manage stress and improve mental wellbeing in just minutes a day.",
      content: `
        <p>In our fast-paced world, stress has become a common companion for many. Mindfulness—the practice of bringing awareness to the present moment without judgment—offers a scientifically validated approach to reducing stress and improving mental wellbeing.</p>
        
        <h3>The Science Behind Mindfulness</h3>
        <p>Research has shown that regular mindfulness practice can:</p>
        <ul>
          <li>Reduce cortisol levels (the primary stress hormone)</li>
          <li>Decrease activity in the amygdala (the brain's stress center)</li>
          <li>Increase gray matter density in brain regions associated with emotional regulation</li>
          <li>Improve immune function and inflammatory responses</li>
        </ul>
        
        <h3>5-Minute Mindfulness Practices</h3>
        <p>Even brief mindfulness exercises can provide significant benefits. Here are some practices</p>
      `,
      image: "/images/blog/mindfulness-practices.jpg",
      category: "Mental Health",
      author: {
        name: "Linda Martinez",
        avatar: "/images/avatars/linda-martinez.jpg",
        role: "Mindfulness Coach"
      },
      date: "July 10, 2023",
      readTime: "5 min read",
      tags: ["Mindfulness", "Stress Reduction", "Wellness"]
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Blog
            </h1>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="sleep">Sleep</TabsTrigger>
                <TabsTrigger value="mental-health">Mental Health</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {blogArticles.map(article => (
                    <motion.article key={article.id} variants={cardVariant} className="group relative rounded-lg border bg-card shadow-sm hover:bg-muted">
                      <Image src={article.image} alt={article.title} width={384} height={224} className="aspect-video rounded-t-lg object-cover" />
                      <CardContent className="p-6">
                        <CardTitle>{article.title}</CardTitle>
                        <CardDescription>{article.excerpt}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-6">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={article.author.avatar} alt={article.author.name} />
                            <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium leading-none">{article.author.name}</p>
                            <p className="text-sm text-muted-foreground">{article.author.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{article.category}</Badge>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedArticle(article)}>
                            Read more <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </motion.article>
                  ))}
                </motion.div>
              </TabsContent>
              <TabsContent value="technology">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {blogArticles.filter(article => article.category === "Technology").map(article => (
                    <motion.article key={article.id} variants={cardVariant} className="group relative rounded-lg border bg-card shadow-sm hover:bg-muted">
                      <Image src={article.image} alt={article.title} width={384} height={224} className="aspect-video rounded-t-lg object-cover" />
                      <CardContent className="p-6">
                        <CardTitle>{article.title}</CardTitle>
                        <CardDescription>{article.excerpt}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-6">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={article.author.avatar} alt={article.author.name} />
                            <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium leading-none">{article.author.name}</p>
                            <p className="text-sm text-muted-foreground">{article.author.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{article.category}</Badge>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedArticle(article)}>
                            Read more <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </motion.article>
                  ))}
                </motion.div>
              </TabsContent>
              <TabsContent value="nutrition">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {blogArticles.filter(article => article.category === "Nutrition").map(article => (
                    <motion.article key={article.id} variants={cardVariant} className="group relative rounded-lg border bg-card shadow-sm hover:bg-muted">
                      <Image src={article.image} alt={article.title} width={384} height={224} className="aspect-video rounded-t-lg object-cover" />
                      <CardContent className="p-6">
                        <CardTitle>{article.title}</CardTitle>
                        <CardDescription>{article.excerpt}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-6">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={article.author.avatar} alt={article.author.name} />
                            <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium leading-none">{article.author.name}</p>
                            <p className="text-sm text-muted-foreground">{article.author.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{article.category}</Badge>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedArticle(article)}>
                            Read more <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </motion.article>
                  ))}
                </motion.div>
              </TabsContent>
              <TabsContent value="sleep">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {blogArticles.filter(article => article.category === "Sleep").map(article => (
                    <motion.article key={article.id} variants={cardVariant} className="group relative rounded-lg border bg-card shadow-sm hover:bg-muted">
                      <Image src={article.image} alt={article.title} width={384} height={224} className="aspect-video rounded-t-lg object-cover" />
                      <CardContent className="p-6">
                        <CardTitle>{article.title}</CardTitle>
                        <CardDescription>{article.excerpt}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-6">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={article.author.avatar} alt={article.author.name} />
                            <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium leading-none">{article.author.name}</p>
                            <p className="text-sm text-muted-foreground">{article.author.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{article.category}</Badge>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedArticle(article)}>
                            Read more <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </motion.article>
                  ))}
                </motion.div>
              </TabsContent>
              <TabsContent value="mental-health">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {blogArticles.filter(article => article.category === "Mental Health").map(article => (
                    <motion.article key={article.id} variants={cardVariant} className="group relative rounded-lg border bg-card shadow-sm hover:bg-muted">
                      <Image src={article.image} alt={article.title} width={384} height={224} className="aspect-video rounded-t-lg object-cover" />
                      <CardContent className="p-6">
                        <CardTitle>{article.title}</CardTitle>
                        <CardDescription>{article.excerpt}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-6">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={article.author.avatar} alt={article.author.name} />
                            <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium leading-none">{article.author.name}</p>
                            <p className="text-sm text-muted-foreground">{article.author.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{article.category}</Badge>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedArticle(article)}>
                            Read more <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </motion.article>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        {selectedArticle && (
          <Dialog open={!!selectedArticle} onOpenChange={setSelectedArticle}>
            <DialogContent className="max-w-5xl">
              <DialogHeader>
                <DialogTitle>{selectedArticle.title}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={selectedArticle.author.avatar} alt={selectedArticle.author.name} />
                      <AvatarFallback>{selectedArticle.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium leading-none">{selectedArticle.author.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedArticle.author.role}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" /> {selectedArticle.date}
                    <Clock className="mr-1 h-4 w-4" /> {selectedArticle.readTime}
                    <Tag className="mr-1 h-4 w-4" /> {selectedArticle.tags.join(", ")}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
              <div className="mt-8 flex items-center space-x-4">
                <Button variant="secondary" onClick={() => setSelectedArticle(null)}>
                  Close
                </Button>
                <Button>
                  Share <Share2 className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
      <Footer />
      <LiveChat />
    </div>
  )
}