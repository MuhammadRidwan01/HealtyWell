"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const searchSuggestions = [
  { id: 1, category: "Services", title: "Virtual Consultations" },
  { id: 2, category: "Services", title: "Fitness Programs" },
  { id: 3, category: "Services", title: "Nutritional Guidance" },
  { id: 4, category: "Articles", title: "Superfoods for Immunity" },
  { id: 5, category: "Articles", title: "Benefits of Meditation" },
  { id: 6, category: "Articles", title: "HIIT vs. Steady-State Cardio" },
  { id: 7, category: "FAQ", title: "How to schedule an appointment?" },
  { id: 8, category: "FAQ", title: "What insurance do you accept?" },
]

export function SearchBar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const filteredSuggestions = query
    ? searchSuggestions.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )
    : searchSuggestions

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[250px] justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 shrink-0 opacity-50" />
            <span className="text-sm text-muted-foreground">Search health topics...</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Search health topics..."
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={query}
              onValueChange={setQuery}
            />
            {query && (
              <Button variant="ghost" size="sm" className="h-5 w-5 rounded-full p-0" onClick={() => setQuery("")}>
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {["Services", "Articles", "FAQ"].map((category) => {
              const items = filteredSuggestions.filter((item) => item.category === category)
              if (!items.length) return null

              return (
                <CommandGroup key={category} heading={category}>
                  {items.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.title}
                      onSelect={() => {
                        setQuery(item.title)
                        setOpen(false)
                      }}
                    >
                      {item.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
