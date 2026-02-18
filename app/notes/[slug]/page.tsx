import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Clock, Eye, Download, Bookmark, Calendar, User, ShieldCheck, Zap, FileText, Unlock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NoteContent } from "@/components/note-content"
import { FeedbackSection } from "@/components/feedback-section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  notes,
  getNoteBySlug,
  getSubjectById,
  getTopicById,
  getFeedbacksByNoteId,
} from "@/lib/data"

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }))
}

export default async function NoteViewerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const note = getNoteBySlug(slug)
  if (!note) return notFound()

  const subject = getSubjectById(note.subjectId)
  const topic = getTopicById(note.topicId)
  const feedbacks = getFeedbacksByNoteId(note.id)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8 lg:py-14">
          {/* Breadcrumb */}
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/subjects" className="hover:text-foreground transition-colors">
              Subjects
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            {subject && (
              <>
                <Link
                  href={`/subjects/${subject.slug}`}
                  className="hover:text-foreground transition-colors"
                >
                  {subject.name}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
            <span className="font-medium text-foreground">{note.title}</span>
          </nav>

          {/* Note Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {note.verified && (
                <Badge variant="default" className="gap-1 text-xs bg-primary/90">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </Badge>
              )}
              <Badge variant="outline" className="gap-1 text-xs">
                {note.noteType === "short" ? (
                  <><Zap className="h-3 w-3" />Short Notes</>
                ) : (
                  <><FileText className="h-3 w-3" />Detailed Notes</>
                )}
              </Badge>
              <Badge variant="secondary" className="gap-1 text-xs">
                <Unlock className="h-3 w-3" />
                Free Access
              </Badge>
              {note.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-heading)] md:text-4xl">
              {note.title}
            </h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {note.excerpt}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {note.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(note.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {note.readTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {note.views.toLocaleString()} views
              </span>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <Button size="sm">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button size="sm" variant="outline">
                <Bookmark className="h-4 w-4" />
                Bookmark
              </Button>
            </div>
          </header>

          {/* Note Content */}
          <article className="rounded-xl border border-border bg-card p-6 lg:p-8">
            {topic && (
              <div className="mb-6 rounded-lg bg-secondary px-4 py-3">
                <p className="text-sm text-secondary-foreground">
                  <span className="font-medium">{subject?.name}</span>
                  {" / "}
                  <span>{topic.name}</span>
                </p>
              </div>
            )}
            <NoteContent content={note.content} />
          </article>

          {/* Feedback Section */}
          <FeedbackSection feedbacks={feedbacks} noteId={note.id} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
