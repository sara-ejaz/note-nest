"use client"

import { useState } from "react"
import { Star, MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import type { Feedback } from "@/lib/data"
import { cn } from "@/lib/utils"

function StarRating({
  rating,
  interactive = false,
  onRate,
}: {
  rating: number
  interactive?: boolean
  onRate?: (r: number) => void
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          className={cn(
            "transition-colors",
            interactive && "cursor-pointer hover:text-primary",
            !interactive && "cursor-default"
          )}
          aria-label={`${star} star${star !== 1 ? "s" : ""}`}
        >
          <Star
            className={cn(
              "h-4 w-4",
              star <= rating ? "fill-primary text-primary" : "fill-none text-muted-foreground/40"
            )}
          />
        </button>
      ))}
    </div>
  )
}

interface FeedbackSectionProps {
  feedbacks: Feedback[]
  noteId: string
}

export function FeedbackSection({ feedbacks, noteId }: FeedbackSectionProps) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const averageRating =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
      : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setShowForm(false)
    setName("")
    setComment("")
    setRating(0)
  }

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)]">
            Feedback
          </h2>
          {feedbacks.length > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-sm text-muted-foreground">
                ({averageRating.toFixed(1)}) {feedbacks.length} review{feedbacks.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
        {!showForm && !submitted && (
          <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
            <MessageSquare className="h-4 w-4" />
            Leave Feedback
          </Button>
        )}
      </div>

      {submitted && (
        <Card className="mb-6 border-primary/20">
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Thank you for your feedback! Your review has been submitted.
            </p>
          </CardContent>
        </Card>
      )}

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="feedback-name" className="mb-1.5 block text-sm font-medium">
                  Your Name
                </label>
                <Input
                  id="feedback-name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Rating</label>
                <StarRating rating={rating} interactive onRate={setRating} />
              </div>
              <div>
                <label htmlFor="feedback-comment" className="mb-1.5 block text-sm font-medium">
                  Comment
                </label>
                <Textarea
                  id="feedback-comment"
                  placeholder="Share your thoughts on these notes..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Button type="submit" size="sm" disabled={rating === 0}>
                  <Send className="h-4 w-4" />
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {feedbacks.length > 0 ? (
        <div className="flex flex-col gap-4">
          {feedbacks.map((f) => (
            <Card key={f.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                      {f.userName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{f.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(f.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <StarRating rating={f.rating} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.comment}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        !submitted && (
          <p className="text-sm text-muted-foreground">
            No feedback yet. Be the first to leave a review!
          </p>
        )
      )}
    </section>
  )
}
