"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ChevronRight, FileText, Zap, Filter } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NoteCard } from "@/components/note-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  subjects,
  getSubjectBySlug,
  getTopicsBySubjectId,
  getNotesBySubjectId,
  getNotesByTopicId,
} from "@/lib/data"
import type { NoteType } from "@/lib/data"

type NoteFilter = "all" | NoteType

export default function SubjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const subject = getSubjectBySlug(slug)
  const [noteFilter, setNoteFilter] = useState<NoteFilter>("all")

  if (!subject) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Subject not found.</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const topics = getTopicsBySubjectId(subject.id)
  const allNotes = getNotesBySubjectId(subject.id)
  const filteredNotes = noteFilter === "all"
    ? allNotes
    : allNotes.filter((n) => n.noteType === noteFilter)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/subjects" className="hover:text-foreground transition-colors">
              Subjects
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">{subject.name}</span>
          </nav>

          {/* Subject Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-heading)] md:text-4xl">
              {subject.name}
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {subject.description}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Badge variant="secondary">{subject.topicCount} Topics</Badge>
              <Badge variant="outline">{subject.noteCount} Notes</Badge>
            </div>
          </div>

          {/* Topics Grid */}
          <section className="mb-12">
            <h2 className="mb-5 text-xl font-semibold font-[family-name:var(--font-heading)]">
              Topics
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic) => {
                const topicNotes = getNotesByTopicId(topic.id)
                return (
                  <Card
                    key={topic.id}
                    className="group transition-all hover:shadow-md hover:border-primary/30"
                  >
                    <CardContent className="flex flex-col gap-3 pt-6">
                      <div className="flex items-start justify-between">
                        <h3 className="text-base font-semibold group-hover:text-primary transition-colors">
                          {topic.name}
                        </h3>
                        <Badge variant="secondary" className="shrink-0 text-xs">
                          {topic.noteCount} notes
                        </Badge>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {topic.description}
                      </p>
                      {topicNotes.length > 0 && (
                        <div className="flex flex-col gap-1.5 border-t border-border pt-3">
                          {topicNotes.map((note) => (
                            <Link
                              key={note.id}
                              href={`/notes/${note.slug}`}
                              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            >
                              <FileText className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">{note.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* All Notes with Filter */}
          {allNotes.length > 0 && (
            <section>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)]">
                  All Notes
                </h2>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Button
                    variant={noteFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNoteFilter("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={noteFilter === "short" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNoteFilter("short")}
                  >
                    <Zap className="h-3.5 w-3.5" />
                    Short Notes
                  </Button>
                  <Button
                    variant={noteFilter === "detailed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNoteFilter("detailed")}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Detailed
                  </Button>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredNotes.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
              {filteredNotes.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No {noteFilter} notes found for this subject.
                </p>
              )}
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
