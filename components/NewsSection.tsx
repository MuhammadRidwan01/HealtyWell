import { Badge } from "@/components/ui/badge"
import { NewsWidget } from "@/components/news-widget"

export function NewsSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Badge variant="outline" className="border-teal-500 text-teal-500">
            Health News
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Stay Informed with the Latest Health News
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Updates from trusted health sources to keep you informed about the latest research and developments.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-6xl">
          <NewsWidget />
        </div>
      </div>
    </section>
  )
}