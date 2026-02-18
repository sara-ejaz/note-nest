"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SearchInput } from "@/components/search-input"
import { NoteCard } from "@/components/note-card"
import { searchNotes, notes } from "@/lib/data"
import { FileText } from "lucide-react"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const results = query ? searchNotes(query) : notes

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] md:text-4xl">
          Search Notes
        </h1>
        <p className="mt-2 text-muted-foreground">
          {query
            ? `Showing results for "${query}"`
            : "Search for any topic, subject, or keyword."}
        </p>
        <div className="mt-5 max-w-xl">
          <SearchInput defaultValue={query} size="lg" />
        </div>
      </div>

      {query && (
        <p className="mb-5 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "result" : "results"} found
        </p>
      )}

      {results.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No notes found</h3>
          <p className="text-sm text-muted-foreground">
            {`Try searching with different keywords or browse subjects directly.`}
          </p>
        </div>
      )}
    </>
  )
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
          <Suspense fallback={<SearchPageSkeleton />}>
            <SearchResults />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function SearchPageSkeleton() {
  return (
    <div>
      <div className="mb-8">
        <div className="h-10 w-64 rounded-lg bg-muted animate-pulse" />
        <div className="mt-3 h-5 w-96 rounded-lg bg-muted animate-pulse" />
        <div className="mt-5 h-12 max-w-xl rounded-lg bg-muted animate-pulse" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  )
}
