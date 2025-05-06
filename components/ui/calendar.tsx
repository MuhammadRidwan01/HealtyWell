"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { DayPicker, useNavigation } from "react-day-picker"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function YearPicker({ currentYear, onSelect }: { currentYear: number; onSelect: (year: number) => void }) {  const [decade, setDecade] = React.useState(Math.floor(currentYear / 10) * 10)
  
  const generateYearsForDecade = (decadeStart) => {
    return Array.from({ length: 12 }, (_, i) => decadeStart + i)
  }
  
  const years = generateYearsForDecade(decade)
  
  const handlePrevDecade = () => setDecade(decade - 12)
  const handleNextDecade = () => setDecade(decade + 12)
  
  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 bg-transparent p-0"
          )}
          onClick={handlePrevDecade}
        >
          <ChevronLeft className="h-4 w-4" />
        </motion.button>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={decade}
          className="font-medium"
        >
          {decade} - {decade + 11}
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 bg-transparent p-0"
          )}
          onClick={handleNextDecade}
        >
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={decade}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2"
        >
          {years.map((year, idx) => (
            <motion.button
              key={year}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "var(--accent)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { delay: idx * 0.03 } 
              }}
              className={cn(
                "rounded-lg py-2 text-sm font-medium shadow-sm",
                year === currentYear 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-accent/80 bg-background"
              )}
              onClick={() => onSelect(year)}
            >
              {year}
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function MonthPicker({ currentMonth, currentYear, onSelect }) {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]
  
  const shortMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  
  // pake window.innerWidth untuk milih month full atau tidak
  const [isMobile, setIsMobile] = React.useState(false)
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <div className="p-2">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {months.map((month, idx) => (
          <motion.button
            key={month}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "var(--accent)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { delay: idx * 0.03 } 
            }}
            className={cn(
              "rounded-lg py-2 text-center text-sm font-medium overflow-hidden",
              idx === currentMonth 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "hover:bg-accent/80 bg-background"
            )}
            onClick={() => onSelect(idx)}
          >
            {isMobile ? shortMonths[idx] : month}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function CustomCaption({ displayMonth, onMonthChange }) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation()
  const [showYearPicker, setShowYearPicker] = React.useState(false)
  const [showMonthPicker, setShowMonthPicker] = React.useState(false)
  
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]

  const shortMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  
  // Use window.innerWidth to determine if we should show short month names
  const [isMobile, setIsMobile] = React.useState(false)
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 400)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const handleYearSelect = (year) => {
    const newDate = new Date(displayMonth)
    newDate.setFullYear(year)
    goToMonth(newDate)
    setShowYearPicker(false)
  }
  
  const handleMonthSelect = (monthIdx) => {
    const newDate = new Date(displayMonth)
    newDate.setMonth(monthIdx)
    goToMonth(newDate)
    setShowMonthPicker(false)
  }
  
  const handlePrevMonth = () => {
    if (previousMonth) {
      const newDate = new Date(previousMonth)
      goToMonth(newDate)
    }
  }
  
  const handleNextMonth = () => {
    if (nextMonth) {
      const newDate = new Date(nextMonth)
      goToMonth(newDate)
    }
  }

  return (
    <div className="flex justify-center pt-1 relative items-center h-12">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePrevMonth}
        disabled={!previousMonth}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1 shadow-sm"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </motion.button>
      
      <div className="flex space-x-2 items-center">
        <Popover open={showMonthPicker} onOpenChange={setShowMonthPicker}>
          <PopoverTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-lg hover:bg-accent text-sm font-medium flex items-center shadow-sm bg-background"
            >
              {isMobile ? shortMonths[displayMonth.getMonth()] : months[displayMonth.getMonth()]}
              <motion.div
                animate={{ rotate: showMonthPicker ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-1"
              >
                <ChevronRight className="h-4 w-4 rotate-90" />
              </motion.div>
            </motion.button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 shadow-lg" align="center">
            <MonthPicker 
              currentMonth={displayMonth.getMonth()} 
              currentYear={displayMonth.getFullYear()}
              onSelect={handleMonthSelect} 
            />
          </PopoverContent>
        </Popover>
        
        <Popover open={showYearPicker} onOpenChange={setShowYearPicker}>
          <PopoverTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-lg hover:bg-accent text-sm font-medium flex items-center shadow-sm bg-background"
            >
              {displayMonth.getFullYear()}
              <motion.div
                animate={{ rotate: showYearPicker ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-1"
              >
                <ChevronRight className="h-4 w-4 rotate-90" />
              </motion.div>
            </motion.button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 shadow-lg" align="center">
            <YearPicker 
              currentYear={displayMonth.getFullYear()} 
              onSelect={handleYearSelect} 
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNextMonth}
        disabled={!nextMonth}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1 shadow-sm"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </motion.button>
    </div>
  )
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <DayPicker
          showOutsideDays={showOutsideDays}
          className={cn("p-3", className)}
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "hidden", // Hide the original caption label
            nav: "hidden", // Hide default navigation
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell:
              "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "h-9 w-9 p-0 font-normal aria-selected:opacity-100 transition-all"
            ),
            day_range_end: "day-range-end",
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside:
              "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle:
              "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
            ...classNames,
          }}
          components={{
            Caption: ({ displayMonth, goToMonth }) => (
              <CustomCaption displayMonth={displayMonth} onMonthChange={goToMonth} />
            ),          }}
          {...props}
        />
      </motion.div>
    </AnimatePresence>
  )
}

// Create a React component that wraps the Calendar with a Popover for better mobile integration
function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = React.useState(false)
  
  const handleSelect = (date) => {
    onChange(date)
    if (date) setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? value.toDateString() : "Pick a date"}
        </motion.button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

Calendar.displayName = "Calendar"
DatePicker.displayName = "DatePicker"

export { Calendar, DatePicker }