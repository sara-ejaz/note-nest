import Link from "next/link"
import { ArrowRight, BookOpen, Users, FileText, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/search-input"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-card">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(160_40%_95%),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Unlock className="h-4 w-4" />
            100% Free Access -- No Paywalls, Ever
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] md:text-5xl lg:text-6xl">
            Your Study Notes,
            <span className="text-primary"> All in One Place</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Access subject-wise and topic-wise notes. Search, read online, download PDFs, and bookmark your favorites. Everything you need to ace your exams.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <SearchInput size="lg" />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/subjects">
                Browse Subjects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup">Create Account</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <span className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">6+</span>
            <span className="text-sm text-muted-foreground">Subjects</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <span className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">115+</span>
            <span className="text-sm text-muted-foreground">Notes</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <span className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">500+</span>
            <span className="text-sm text-muted-foreground">Students</span>
          </div>
        </div>
      </div>
    </section>
  )
}
