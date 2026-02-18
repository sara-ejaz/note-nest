"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  Bookmark,
  Clock,
  Download,
  Eye,
  FileText,
  TrendingUp,
  User,
  Settings,
  LogOut,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NoteCard } from "@/components/note-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { notes } from "@/lib/data"

const recentlyViewed = notes.slice(0, 3)
const bookmarkedNotes = notes.slice(1, 4)
const downloadedNotes = notes.slice(2, 5)

const stats = [
  { label: "Notes Read", value: "23", icon: Eye, change: "+5 this week" },
  { label: "Bookmarks", value: "12", icon: Bookmark, change: "+3 this week" },
  { label: "Downloads", value: "8", icon: Download, change: "+2 this week" },
  { label: "Subjects", value: "4", icon: BookOpen, change: "Active" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
          {/* Profile Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
                  John Doe
                </h1>
                <p className="text-sm text-muted-foreground">
                  Roll No: 2024CS001 | Computer Science
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
                Log Out
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="flex items-center gap-4 pt-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="flex items-center gap-1 text-xs text-primary">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabbed Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">
                <Clock className="h-4 w-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="bookmarks">
                <Bookmark className="h-4 w-4" />
                Bookmarks
              </TabsTrigger>
              <TabsTrigger value="downloads">
                <Download className="h-4 w-4" />
                Downloads
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="mt-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)]">
                    Recently Viewed
                  </h2>
                  <Badge variant="secondary">{recentlyViewed.length} notes</Badge>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {recentlyViewed.map((note) => (
                    <NoteCard key={note.id} note={note} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bookmarks">
              <div className="mt-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)]">
                    Bookmarked Notes
                  </h2>
                  <Badge variant="secondary">{bookmarkedNotes.length} bookmarks</Badge>
                </div>
                {bookmarkedNotes.length > 0 ? (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {bookmarkedNotes.map((note) => (
                      <NoteCard key={note.id} note={note} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={Bookmark}
                    title="No bookmarks yet"
                    description="Start bookmarking notes to build your study collection."
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="downloads">
              <div className="mt-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)]">
                    Downloaded Notes
                  </h2>
                  <Badge variant="secondary">{downloadedNotes.length} downloads</Badge>
                </div>
                {downloadedNotes.length > 0 ? (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {downloadedNotes.map((note) => (
                      <NoteCard key={note.id} note={note} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={Download}
                    title="No downloads yet"
                    description="Download notes for offline access."
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Access */}
          <section className="mt-12">
            <h2 className="mb-5 text-lg font-semibold font-[family-name:var(--font-space-grotesk)]">
              Quick Access
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/subjects">
                <Card className="group transition-all hover:shadow-md hover:border-primary/30">
                  <CardContent className="flex items-center gap-3 pt-6">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="font-medium group-hover:text-primary transition-colors">
                      Browse Subjects
                    </span>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/search">
                <Card className="group transition-all hover:shadow-md hover:border-primary/30">
                  <CardContent className="flex items-center gap-3 pt-6">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium group-hover:text-primary transition-colors">
                      Search Notes
                    </span>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/subjects/programming">
                <Card className="group transition-all hover:shadow-md hover:border-primary/30">
                  <CardContent className="flex items-center gap-3 pt-6">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="font-medium group-hover:text-primary transition-colors">
                      Trending: Programming
                    </span>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/subjects/dbms">
                <Card className="group transition-all hover:shadow-md hover:border-primary/30">
                  <CardContent className="flex items-center gap-3 pt-6">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="font-medium group-hover:text-primary transition-colors">
                      Trending: DBMS
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
