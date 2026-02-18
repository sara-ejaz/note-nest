"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchInputProps {
  defaultValue?: string
  placeholder?: string
  className?: string
  size?: "default" | "lg"
}

export function SearchInput({
  defaultValue = "",
  placeholder = "Search notes by topic, keyword, or subject...",
  className = "",
  size = "default",
}: SearchInputProps) {
  const router = useRouter()
  const [query, setQuery] = useState(defaultValue)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${size === "lg" ? "h-5 w-5" : "h-4 w-4"}`} />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`${size === "lg" ? "h-12 pl-11 pr-4 text-base" : "h-9 pl-9 pr-4 text-sm"}`}
        />
      </div>
      <Button type="submit" size={size === "lg" ? "lg" : "default"}>
        Search
      </Button>
    </form>
  )
}
