import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HealthAssessment } from "@/components/health-assessment"
import { ArrowRight, CheckCircle } from "lucide-react"
export function HealthAssessmentSection() {
  return (
    <section className="w-full py-20 md:py-32 bgrk:from-slate-950 dark:to-slate-900/80">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-6">
            <Badge 
              variant="outline" 
              className="w-fit border-teal-500 text-teal-500 dark:border-teal-400 dark:text-teal-400 px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 hover:bg-teal-50 dark:hover:bg-teal-900/20"
            >
              Interactive Tool
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl/tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              Discover Your Personal Health Score
            </h2>
            <p className="text-slate-600 dark:text-slate-400 md:text-lg max-w-xl">
              Take our comprehensive health assessment to receive personalized recommendations and insights tailored
              to your unique health profile.
            </p>
            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4 group transition-all duration-300 hover:translate-x-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-500 text-white font-medium shadow-md shadow-teal-500/20 dark:shadow-teal-500/10 group-hover:shadow-lg group-hover:shadow-teal-500/30 transition-all duration-300">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-lg text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">Complete the Assessment</h3>
                  <p className="text-slate-600 dark:text-slate-400">Answer questions about your lifestyle and health habits</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group transition-all duration-300 hover:translate-x-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-500 text-white font-medium shadow-md shadow-teal-500/20 dark:shadow-teal-500/10 group-hover:shadow-lg group-hover:shadow-teal-500/30 transition-all duration-300">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-lg text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">Get Your Health Score</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Receive a comprehensive analysis of your current health status
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 group transition-all duration-300 hover:translate-x-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-500 text-white font-medium shadow-md shadow-teal-500/20 dark:shadow-teal-500/10 group-hover:shadow-lg group-hover:shadow-teal-500/30 transition-all duration-300">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-lg text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">Personalized Recommendations</h3>
                  <p className="text-slate-600 dark:text-slate-400">Get tailored advice to improve your overall wellbeing</p>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-300 group"
              >
                <span>Start Your Assessment</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-500 flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-teal-500" />
                <span>Takes approximately 5 minutes to complete</span>
              </p>
            </div>
          </div>
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-teal-100 dark:bg-teal-900/20 blur-3xl opacity-70"></div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl opacity-70"></div>
            
            {/* Card with assessment */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/30 overflow-hidden">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.6),transparent)] opacity-20"></div>
              
              <HealthAssessment />
              
              {/* Highlight accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-teal-400"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}