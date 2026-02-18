import Link from "next/link"
import { Code, Calculator, Database, BookOpen, Monitor, Wifi } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Subject } from "@/lib/data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Calculator,
  Database,
  BookOpen,
  Monitor,
  Wifi,
}

export function SubjectCard({ subject }: { subject: Subject }) {
  const Icon = iconMap[subject.icon] || BookOpen

  return (
    <Link href={`/subjects/${subject.slug}`}>
      <Card className="group h-full transition-all hover:shadow-md hover:border-primary/30">
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${subject.color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)] group-hover:text-primary transition-colors">
              {subject.name}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {subject.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{subject.topicCount} Topics</Badge>
            <Badge variant="outline">{subject.noteCount} Notes</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
