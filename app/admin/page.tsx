"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  Users,
  FileText,
  FolderOpen,
  Plus,
  Pencil,
  Trash2,
  BarChart3,
  Eye,
  Download,
  TrendingUp,
  Upload,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { subjects, notes } from "@/lib/data"

const adminStats = [
  { label: "Total Notes", value: "115", icon: FileText, trend: "+12 this month" },
  { label: "Total Subjects", value: "6", icon: FolderOpen, trend: "+1 this month" },
  { label: "Total Students", value: "524", icon: Users, trend: "+45 this month" },
  { label: "Total Views", value: "7,140", icon: Eye, trend: "+890 this week" },
]

const recentUsers = [
  { name: "Amit Sharma", email: "amit@university.edu", roll: "2024CS001", joined: "2026-02-10", status: "Active" },
  { name: "Priya Patel", email: "priya@university.edu", roll: "2024CS015", joined: "2026-02-09", status: "Active" },
  { name: "Rahul Kumar", email: "rahul@university.edu", roll: "2024IT008", joined: "2026-02-08", status: "Active" },
  { name: "Sneha Gupta", email: "sneha@university.edu", roll: "2024EC022", joined: "2026-02-07", status: "Inactive" },
  { name: "Vikash Singh", email: "vikash@university.edu", roll: "2024ME011", joined: "2026-02-06", status: "Active" },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
          {/* Admin Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
                Admin Panel
              </h1>
              <p className="mt-1 text-muted-foreground">
                Manage subjects, notes, and users.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <AddNoteDialog />
              <AddSubjectDialog />
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {adminStats.map((stat) => (
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
                      {stat.trend}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="notes">
                <FileText className="h-4 w-4" />
                Notes
              </TabsTrigger>
              <TabsTrigger value="subjects">
                <FolderOpen className="h-4 w-4" />
                Subjects
              </TabsTrigger>
              <TabsTrigger value="users">
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-[family-name:var(--font-space-grotesk)]">
                      Top Performing Notes
                    </CardTitle>
                    <CardDescription>Notes with the most views</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      {notes
                        .sort((a, b) => b.views - a.views)
                        .slice(0, 5)
                        .map((note, i) => (
                          <div
                            key={note.id}
                            className="flex items-center justify-between rounded-lg border border-border p-3"
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-xs font-semibold">
                                {i + 1}
                              </span>
                              <div>
                                <p className="text-sm font-medium line-clamp-1">
                                  {note.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {note.author}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {note.views.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Download className="h-3 w-3" />
                                {note.downloads.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-[family-name:var(--font-space-grotesk)]">
                      Recent Users
                    </CardTitle>
                    <CardDescription>Latest student registrations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      {recentUsers.map((user) => (
                        <div
                          key={user.roll}
                          className="flex items-center justify-between rounded-lg border border-border p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {user.roll}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={user.status === "Active" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {user.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes">
              <div className="mt-6">
                <Card>
                  <CardHeader className="flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-[family-name:var(--font-space-grotesk)]">
                        All Notes
                      </CardTitle>
                      <CardDescription>
                        Manage all uploaded notes
                      </CardDescription>
                    </div>
                    <AddNoteDialog />
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Views</TableHead>
                          <TableHead>Downloads</TableHead>
                          <TableHead>Updated</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {notes.map((note) => (
                          <TableRow key={note.id}>
                            <TableCell>
                              <Link
                                href={`/notes/${note.slug}`}
                                className="font-medium text-sm hover:text-primary transition-colors"
                              >
                                {note.title}
                              </Link>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {note.author}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {note.views.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {note.downloads.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(note.updatedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button variant="ghost" size="icon-sm">
                                  <Pencil className="h-3.5 w-3.5" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
                                  <Trash2 className="h-3.5 w-3.5" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Subjects Tab */}
            <TabsContent value="subjects">
              <div className="mt-6">
                <Card>
                  <CardHeader className="flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-[family-name:var(--font-space-grotesk)]">
                        All Subjects
                      </CardTitle>
                      <CardDescription>
                        Manage subjects and topics
                      </CardDescription>
                    </div>
                    <AddSubjectDialog />
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Topics</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subjects.map((subject) => (
                          <TableRow key={subject.id}>
                            <TableCell>
                              <Link
                                href={`/subjects/${subject.slug}`}
                                className="font-medium text-sm hover:text-primary transition-colors"
                              >
                                {subject.name}
                              </Link>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {subject.topicCount}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {subject.noteCount}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button variant="ghost" size="icon-sm">
                                  <Pencil className="h-3.5 w-3.5" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
                                  <Trash2 className="h-3.5 w-3.5" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-[family-name:var(--font-space-grotesk)]">
                      All Users
                    </CardTitle>
                    <CardDescription>
                      Manage registered students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Roll No.</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentUsers.map((user) => (
                          <TableRow key={user.roll}>
                            <TableCell className="font-medium text-sm">
                              {user.name}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {user.email}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {user.roll}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(user.joined).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={user.status === "Active" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button variant="ghost" size="icon-sm">
                                  <Pencil className="h-3.5 w-3.5" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
                                  <Trash2 className="h-3.5 w-3.5" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function AddNoteDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Add Note
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-space-grotesk)]">
            Add New Note
          </DialogTitle>
          <DialogDescription>
            Upload a new note to the platform.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="note-title">Title</Label>
            <Input id="note-title" placeholder="Note title" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="note-subject">Subject</Label>
            <Input id="note-subject" placeholder="Select subject" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="note-topic">Topic</Label>
            <Input id="note-topic" placeholder="Select topic" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="note-content">Content</Label>
            <Textarea id="note-content" placeholder="Write note content..." rows={6} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="note-file">Upload File (PDF/DOC)</Label>
            <div className="flex items-center gap-2 rounded-lg border border-dashed border-border p-4">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Drag and drop or click to upload
              </span>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Upload Note</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function AddSubjectDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4" />
          Add Subject
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-space-grotesk)]">
            Add New Subject
          </DialogTitle>
          <DialogDescription>
            Create a new subject category.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="subject-name">Subject Name</Label>
            <Input id="subject-name" placeholder="e.g. Data Structures" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="subject-desc">Description</Label>
            <Textarea id="subject-desc" placeholder="Brief description of the subject..." rows={3} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create Subject</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
