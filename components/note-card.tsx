import Link from "next/link"
import { Clock, Eye, Download, ShieldCheck, Zap, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Note } from "@/lib/data"

export function NoteCard({ note }: { note: Note }) {
  return (
    <Link href={`/notes/${note.slug}`}>
      <Card className="group h-full transition-all hover:shadow-md hover:border-primary/30">
        <CardContent className="flex flex-col gap-3 pt-6">
          <div className="flex items-center gap-2">
            {note.verified && (
              <Badge variant="default" className="gap-1 text-xs bg-primary/90">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </Badge>
            )}
            <Badge variant="outline" className="gap-1 text-xs">
              {note.noteType === "short" ? (
                <><Zap className="h-3 w-3" />Short</>
              ) : (
                <><FileText className="h-3 w-3" />Detailed</>
              )}
            </Badge>
          </div>
          <h3 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {note.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {note.excerpt}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {note.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1 border-t border-border">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {note.readTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {note.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {note.downloads.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
