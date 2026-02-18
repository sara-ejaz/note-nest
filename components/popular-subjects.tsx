import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SubjectCard } from "@/components/subject-card"
import { subjects } from "@/lib/data"

export function PopularSubjects() {
  return (
    <section className="bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] md:text-4xl">
              Popular Subjects
            </h2>
            <p className="mt-2 text-muted-foreground">
              Browse notes by subject. Each subject contains organized topics and units.
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex">
            <Link href="/subjects">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.slice(0, 6).map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/subjects">
              View All Subjects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
