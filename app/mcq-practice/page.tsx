"use client"

import { useState, useCallback } from "react"
import { CheckCircle2, XCircle, RotateCcw, Brain, Trophy, Filter, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mcqs, subjects, getSubjectById, getTopicById } from "@/lib/data"
import { cn } from "@/lib/utils"

interface AnswerState {
  selectedIndex: number | null
  isRevealed: boolean
}

export default function MCQPracticePage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("all")
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({})
  const [showResults, setShowResults] = useState(false)

  const filtered = selectedSubject === "all"
    ? mcqs
    : mcqs.filter((q) => q.subjectId === selectedSubject)

  const handleSelect = useCallback((mcqId: string, optionIndex: number) => {
    setAnswers((prev) => {
      if (prev[mcqId]?.isRevealed) return prev
      return { ...prev, [mcqId]: { selectedIndex: optionIndex, isRevealed: false } }
    })
  }, [])

  const handleReveal = useCallback((mcqId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [mcqId]: { ...prev[mcqId], isRevealed: true },
    }))
  }, [])

  const handleReset = () => {
    setAnswers({})
    setShowResults(false)
  }

  const handleShowResults = () => {
    const newAnswers: Record<string, AnswerState> = {}
    filtered.forEach((q) => {
      if (answers[q.id]) {
        newAnswers[q.id] = { ...answers[q.id], isRevealed: true }
      }
    })
    setAnswers((prev) => ({ ...prev, ...newAnswers }))
    setShowResults(true)
  }

  const answeredCount = filtered.filter((q) => answers[q.id]?.selectedIndex !== null && answers[q.id]?.selectedIndex !== undefined).length
  const correctCount = filtered.filter((q) => {
    const a = answers[q.id]
    return a?.isRevealed && a.selectedIndex === q.correctIndex
  }).length

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8 lg:py-14">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="secondary" className="text-xs">Practice</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-heading)] md:text-4xl">
              MCQ Practice
            </h1>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Test your knowledge with multiple choice questions. Select an answer and get instant feedback.
            </p>
          </header>

          {/* Filters & Score */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Button
                variant={selectedSubject === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => { setSelectedSubject("all"); handleReset() }}
              >
                All Subjects
              </Button>
              {subjects.map((s) => (
                <Button
                  key={s.id}
                  variant={selectedSubject === s.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setSelectedSubject(s.id); handleReset() }}
                >
                  {s.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Score Bar */}
          {showResults && (
            <Card className="mb-8 border-primary/20">
              <CardContent className="flex flex-col items-center gap-3 pt-6 sm:flex-row sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold font-[family-name:var(--font-heading)]">
                      {correctCount} / {filtered.length} Correct
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((correctCount / filtered.length) * 100)}% accuracy
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Progress */}
          {!showResults && filtered.length > 0 && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {answeredCount} of {filtered.length} answered
              </p>
              {answeredCount > 0 && (
                <Button size="sm" onClick={handleShowResults}>
                  Submit All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {/* Questions */}
          <div className="flex flex-col gap-6">
            {filtered.map((mcq, index) => {
              const subject = getSubjectById(mcq.subjectId)
              const topic = getTopicById(mcq.topicId)
              const answer = answers[mcq.id]
              const isRevealed = answer?.isRevealed ?? false
              const selectedIndex = answer?.selectedIndex ?? null
              const isCorrect = selectedIndex === mcq.correctIndex

              return (
                <Card key={mcq.id} className={cn(
                  "transition-all",
                  isRevealed && isCorrect && "border-primary/40",
                  isRevealed && !isCorrect && selectedIndex !== null && "border-destructive/40"
                )}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                          {index + 1}
                        </span>
                        {subject && <Badge variant="outline" className="text-xs">{subject.name}</Badge>}
                        {topic && <span className="text-xs text-muted-foreground">{topic.name}</span>}
                      </div>
                    </div>

                    <p className="mb-4 font-medium leading-relaxed">{mcq.question}</p>

                    <div className="flex flex-col gap-2">
                      {mcq.options.map((option, oi) => {
                        const isSelected = selectedIndex === oi
                        const isCorrectOption = oi === mcq.correctIndex

                        let optionStyle = "border-border hover:border-primary/30 hover:bg-secondary/50 cursor-pointer"
                        if (isSelected && !isRevealed) {
                          optionStyle = "border-primary bg-primary/5 ring-1 ring-primary/20"
                        }
                        if (isRevealed && isCorrectOption) {
                          optionStyle = "border-primary bg-primary/10 text-foreground"
                        }
                        if (isRevealed && isSelected && !isCorrectOption) {
                          optionStyle = "border-destructive bg-destructive/5 text-foreground"
                        }
                        if (isRevealed) {
                          optionStyle += " cursor-default"
                        }

                        return (
                          <button
                            key={oi}
                            onClick={() => handleSelect(mcq.id, oi)}
                            disabled={isRevealed}
                            className={cn(
                              "flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all",
                              optionStyle
                            )}
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-xs font-medium">
                              {String.fromCharCode(65 + oi)}
                            </span>
                            <span className="flex-1">{option}</span>
                            {isRevealed && isCorrectOption && (
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                            )}
                            {isRevealed && isSelected && !isCorrectOption && (
                              <XCircle className="h-4 w-4 shrink-0 text-destructive" />
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {selectedIndex !== null && !isRevealed && (
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" variant="outline" onClick={() => handleReveal(mcq.id)}>
                          Check Answer
                        </Button>
                      </div>
                    )}

                    {isRevealed && (
                      <div className="mt-4 rounded-lg bg-muted px-4 py-3">
                        <p className="text-xs font-medium mb-1">Explanation:</p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {mcq.explanation}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
