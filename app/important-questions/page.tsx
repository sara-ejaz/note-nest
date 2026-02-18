"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, FileQuestion, Award, Calendar, Filter } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  importantQuestions,
  subjects,
  getSubjectById,
  getTopicById,
} from "@/lib/data"

type QuestionFilter = "all" | "short-answer" | "long-answer" | "past-paper"

export default function ImportantQuestionsPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<QuestionFilter>("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = importantQuestions.filter((q) => {
    if (selectedSubject !== "all" && q.subjectId !== selectedSubject) return false
    if (selectedType !== "all" && q.type !== selectedType) return false
    return true
  })

  const typeLabels: Record<QuestionFilter, string> = {
    all: "All Types",
    "short-answer": "Short Answer",
    "long-answer": "Long Answer",
    "past-paper": "Past Paper",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8 lg:py-14">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileQuestion className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="secondary" className="text-xs">Exam Prep</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-heading)] md:text-4xl">
              Important Questions
            </h1>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Exam-based important questions and past paper questions organized by subject. Practice these for your exam preparation.
            </p>
          </header>

          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedSubject === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubject("all")}
              >
                All Subjects
              </Button>
              {subjects.map((s) => (
                <Button
                  key={s.id}
                  variant={selectedSubject === s.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubject(s.id)}
                >
                  {s.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="mb-8 flex flex-wrap gap-2">
            {(Object.keys(typeLabels) as QuestionFilter[]).map((t) => (
              <Button
                key={t}
                variant={selectedType === t ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedType(t)}
              >
                {typeLabels[t]}
              </Button>
            ))}
          </div>

          {/* Questions List */}
          <div className="flex flex-col gap-4">
            {filtered.length > 0 ? (
              filtered.map((q) => {
                const subject = getSubjectById(q.subjectId)
                const topic = getTopicById(q.topicId)
                const isExpanded = expandedId === q.id

                return (
                  <Card key={q.id} className="transition-all hover:shadow-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {subject && (
                              <Badge variant="outline" className="text-xs">
                                {subject.name}
                              </Badge>
                            )}
                            <Badge
                              variant="secondary"
                              className="text-xs"
                            >
                              {q.type === "past-paper" ? "Past Paper" : q.type === "short-answer" ? "Short" : "Long"}
                            </Badge>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Award className="h-3 w-3" />
                              {q.marks} marks
                            </span>
                            {q.year && (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {q.year}
                              </span>
                            )}
                          </div>
                          <p className="font-medium leading-relaxed">{q.question}</p>
                          {topic && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              {topic.name}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0"
                          onClick={() => setExpandedId(isExpanded ? null : q.id)}
                          aria-label={isExpanded ? "Hide answer" : "Show answer"}
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {isExpanded && (
                        <div className="mt-4 rounded-lg bg-secondary px-4 py-3">
                          <p className="text-xs font-medium text-secondary-foreground mb-1">Answer:</p>
                          <p className="text-sm leading-relaxed text-secondary-foreground">
                            {q.answer}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <FileQuestion className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No questions found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting the filters to find questions.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
