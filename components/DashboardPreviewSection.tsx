import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AppointmentCalendar } from "@/components/appointment-calendar"

export function DashboardPreviewSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <Badge variant="outline" className="w-fit border-teal-500 text-teal-500">
              Personal Dashboard
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Track Your Progress with Our Intuitive Dashboard
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Monitor your health metrics, schedule appointments, and access personalized recommendations all in one
              place.
            </p>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Fitness Progress</h3>
                  <span className="text-sm text-teal-600">78%</span>
                </div>
                <Progress value={78} className="h-2 w-full bg-slate-200" indicatorClassName="bg-teal-500" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Nutrition Goals</h3>
                  <span className="text-sm text-teal-600">65%</span>
                </div>
                <Progress value={65} className="h-2 w-full bg-slate-200" indicatorClassName="bg-teal-500" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Sleep Quality</h3>
                  <span className="text-sm text-teal-600">92%</span>
                </div>
                <Progress value={92} className="h-2 w-full bg-slate-200" indicatorClassName="bg-teal-500" />
              </div>
            </div>
            <div className="pt-4">
              <Button size="lg" className="bg-teal-500 text-white hover:bg-teal-600">
                Access Your Dashboard
              </Button>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium">Schedule Your Appointments</h3>
            <AppointmentCalendar />
          </div>
        </div>
      </div>
    </section>
  )
}