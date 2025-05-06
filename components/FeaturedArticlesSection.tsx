import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

export function FeaturedArticlesSection() {
  // State untuk mengontrol apakah modal terbuka atau tidak
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedTab, setSelectedTab] = useState("all");

  const articles = [
    {
      title: "10 Superfoods to Boost Your Immune System Naturally",
      category: "Nutrition",
      author: "Dr. Emily Wilson",
      date: "Apr 15, 2023",
      image: "https://domf5oio6qrcr.cloudfront.net/medialibrary/10870/3b16124e-374e-4202-8dce-a1c4b6570a98.jpg",
      excerpt: "Discover the power of nutrient-dense foods that can help strengthen your body's natural defenses and keep you healthy year-round.",
      content: "Here is a more detailed content of the article discussing how these superfoods help with immune health. It explains the specific nutrients in these foods and their benefits..."
    },
    {
      title: "The Science of Mindfulness: How Daily Meditation Changes Your Brain",
      category: "Mental Health",
      author: "Dr. James Lee",
      date: "Mar 28, 2023",
      image: "https://images.ctfassets.net/yixw23k2v6vo/psycom_page_fid31940_asset_31938/3c82541802f801891f8cc1fe08069eaf/Brain_left_and_right_creativity_functions___Sketch_concept?fm=webp&fit=thumb&q=65&w=1728&h=1152",
      excerpt: "Research shows that consistent mindfulness practice can physically alter brain structure and function, leading to improved focus, reduced stress, and better emotional regulation.",
      content: "The full article dives deep into the science behind mindfulness and how it alters brain chemistry, leading to improvements in mental health and overall well-being..."
    },
    {
      title: "How to Build a Stronger Immune System with Regular Exercise",
      category: "Fitness",
      author: "Dr. Sarah Brown",
      date: "Apr 3, 2023",
      image: "https://northwayclinic.co.uk/wp-content/uploads/2023/09/General-Physicians-Guide-to-a-Strong-Immune-System.jpg",
      excerpt: "Exercise is not only essential for physical fitness but also plays a critical role in boosting your immune system and keeping you healthy.",
      content: "This article covers the connection between physical activity and immune function, including tips on how to create a balanced workout routine for maximum health benefits..."
    },
    {
      title: "Understanding Mental Health Disorders: A Comprehensive Guide",
      category: "Mental Health",
      author: "Dr. Alex Carter",
      date: "Feb 18, 2023",
      image: "https://bemftundip.com/storage/424/AQ1FBcX5q22QM9q0x28S859gU68Cp9-metabWVudGFsMS5qcGc=-.jpg",
      excerpt: "A deep dive into common mental health conditions, their symptoms, and treatments available to help individuals manage and improve their mental health.",
      content: "This guide provides an in-depth look at mental health disorders, including anxiety, depression, and PTSD, and offers insights on how to seek support and treatment..."
    },
    {
      title: "Top 5 Stress-Reducing Habits for a Healthier Mind and Body",
      category: "Mental Health",
      author: "Dr. Julia Stone",
      date: "Apr 10, 2023",
      image: "https://medvisit.io/wp-content/uploads/2019/01/avoid-stress-scaled.jpg",
      excerpt: "Stress is a common issue that affects both mental and physical health. Learn simple yet effective techniques to reduce stress and improve your well-being.",
      content: "This article outlines five stress-reducing habits, including deep breathing exercises, mindfulness practices, and the importance of getting enough sleep..."
    },
    {
      title: "The Benefits of a Plant-Based Diet for Long-Term Health",
      category: "Nutrition",
      author: "Dr. Michael Johnson",
      date: "Apr 22, 2023",
      image: "https://www.cuimc.columbia.edu/sites/default/files/styles/cola_media_1600_21_9/public/media/images/2022-04/gettyimages-854725372_plant-based_diet.jpg?itok=-7oGQef3",
      excerpt: "Switching to a plant-based diet can have long-lasting benefits for your health, including improved heart health, weight management, and reduced risk of chronic diseases.",
      content: "This article explores the scientific evidence supporting the benefits of a plant-based diet, including its impact on reducing inflammation, improving cholesterol levels, and enhancing overall vitality..."
    }
  ];
  
  // Fungsi untuk membuka modal dan mengatur artikel yang dipilih
  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  // Filter artikel berdasarkan kategori
  const filteredArticles = selectedTab === "all" ? articles : articles.filter(article => article.category.toLowerCase() === selectedTab);

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
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <div className="relative mb-10 border-b border-slate-200 dark:border-slate-800">
              <TabsList className="flex w-full justify-start overflow-x-auto pb-px scrollbar-hide">
                <TabsTrigger value="all" className="px-4 py-2 text-sm font-medium data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none bg-transparent dark:data-[state=active]:text-teal-500 dark:data-[state=active]:border-teal-500">
                  All Topics
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="px-4 py-2 text-sm font-medium data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none bg-transparent dark:data-[state=active]:text-teal-500 dark:data-[state=active]:border-teal-500">
                  Nutrition
                </TabsTrigger>
                <TabsTrigger value="mental health" className="px-4 py-2 text-sm font-medium data-[state=active]:text-teal-600 data-[state=active]:border-b-2 data-[state=active]:border-teal-600 rounded-none bg-transparent dark:data-[state=active]:text-teal-500 dark:data-[state=active]:border-teal-500">
                  Mental Health
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article, index) => (
                  <Card key={index} className="group overflow-hidden border-0 bg-slate-50 dark:bg-slate-900 rounded-xl shadow-sm transition-all hover:shadow-md">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={500}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader className="p-5 pb-0">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950 border-0">
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="mr-1 h-3 w-3" />
                          5 min read
                        </div>
                      </div>
                      <CardTitle className="text-xl font-semibold line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-500 transition-colors">
                        <Link href="#" onClick={() => openModal(article)}>
                          {article.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-3">
                      <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-5 pt-0 border-t border-slate-100 dark:border-slate-800 mt-auto">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border border-white dark:border-slate-800">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={article.author} />
                          <AvatarFallback className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 text-xs">EW</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">{article.author}</span>
                      </div>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="mr-1 h-3 w-3" />
                        {article.date}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

                {typeof window !== "undefined" && window.location.pathname === "/" && (
                <div className="mt-12 flex justify-center">
                  <Link href="/blog" passHref>
                  <Button asChild variant="outline" className="group px-6 py-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white dark:border-teal-500 dark:text-teal-500 dark:hover:bg-teal-500 dark:hover:text-white transition-all duration-200">
                    <span>
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                  </Link>
               
                </div>
                )}
            </TabsContent>
          </Tabs>

          {/* Modal Popup untuk Detail Artikel */}
          {selectedArticle && (
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="max-w-4xl p-8 bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>{selectedArticle.title}</DialogTitle>
                  <DialogClose onClick={closeModal} className="absolute top-4 right-4 text-xl font-bold text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500">
                    
                  </DialogClose>
                </DialogHeader>
                <div>
                  <div className="w-full h-72 overflow-hidden mb-6 relative">
                    <Image
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{selectedArticle.content}</p>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </section>
  );
}
