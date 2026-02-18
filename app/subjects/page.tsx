import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SubjectCard } from "@/components/subject-card"
import { SearchInput } from "@/components/search-input"
import { subjects } from "@/lib/data"

export default function SubjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] md:text-4xl">
              All Subjects
            </h1>
            <p className="mt-2 text-muted-foreground">
              Browse all available subjects. Click on a subject to view its topics and notes.
            </p>
            <div className="mt-5 max-w-lg">
              <SearchInput placeholder="Search subjects..." />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
