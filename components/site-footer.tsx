import Link from "next/link"
import { BookOpen } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold font-[family-name:var(--font-space-grotesk)]">
                NoteNest
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Your study companion for accessing quality notes, organized by subject and topic.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/subjects" className="transition-colors hover:text-foreground">
                  All Subjects
                </Link>
              </li>
              <li>
                <Link href="/search" className="transition-colors hover:text-foreground">
                  Search Notes
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Subjects</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/subjects/programming" className="transition-colors hover:text-foreground">
                  Programming
                </Link>
              </li>
              <li>
                <Link href="/subjects/mathematics" className="transition-colors hover:text-foreground">
                  Mathematics
                </Link>
              </li>
              <li>
                <Link href="/subjects/dbms" className="transition-colors hover:text-foreground">
                  DBMS
                </Link>
              </li>
              <li>
                <Link href="/subjects/operating-systems" className="transition-colors hover:text-foreground">
                  Operating Systems
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Account</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/login" className="transition-colors hover:text-foreground">
                  Log In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="transition-colors hover:text-foreground">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/admin" className="transition-colors hover:text-foreground">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>
            {"Built with Next.js, Tailwind CSS & shadcn/ui. Deployed on Vercel."}
          </p>
        </div>
      </div>
    </footer>
  )
}
