import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="w-full bg-teal-500 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center space-y-4 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Ready to Transform Your Health Journey?
          </h2>
          <p className="mx-auto max-w-[700px] md:text-lg">
            Join thousands of people who have already taken control of their health and wellness with our
            personalized programs.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a href="/doctors" className="w-full">
            <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-white/90">
              Get Started Today
            </Button>
          </a>
            {/* <Button
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white/20"
            >
              Schedule a Consultation
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  )
}