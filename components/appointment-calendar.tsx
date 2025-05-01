"use client"

import { useState } from "react"
import { CalendarIcon, Clock } from "lucide-react"
import { format, addDays } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

export function AppointmentCalendar() {
  const [date, setDate] = useState<Date>()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>()
  const [appointmentType, setAppointmentType] = useState("consultation")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="consultation" onValueChange={setAppointmentType}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="consultation">Consultation</TabsTrigger>
          <TabsTrigger value="checkup">Check-up</TabsTrigger>
          <TabsTrigger value="followup">Follow-up</TabsTrigger>
        </TabsList>
        <TabsContent value="consultation" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">
            Schedule a comprehensive consultation with one of our healthcare professionals.
          </p>
        </TabsContent>
        <TabsContent value="checkup" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">Book a routine check-up to monitor your health and wellness.</p>
        </TabsContent>
        <TabsContent value="followup" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">Schedule a follow-up appointment to discuss your progress.</p>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
              />
            </PopoverContent>
          </Popover>
        </div>

        {date && (
          <div className="space-y-2">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Available Time Slots</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTimeSlot === time ? "default" : "outline"}
                  className={cn("h-9", selectedTimeSlot === time && "bg-teal-500 hover:bg-teal-600")}
                  onClick={() => setSelectedTimeSlot(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {date && selectedTimeSlot && (
          <Button className="mt-4 bg-teal-500 text-white hover:bg-teal-600">Confirm Appointment</Button>
        )}
      </div>
    </div>
  )
}
