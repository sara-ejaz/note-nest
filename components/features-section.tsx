import { Search, Download, BookOpen, Bookmark, FolderOpen, ShieldCheck, Brain, FileQuestion, Moon, Zap, Unlock, MessageSquare } from "lucide-react"

const features = [
  {
    icon: FolderOpen,
    title: "Subject-wise Organization",
    description: "Notes neatly organized by subject and further divided into topics and units for easy navigation.",
  },
  {
    icon: Zap,
    title: "Short & Detailed Notes",
    description: "Choose between short notes for quick revision or detailed notes for full understanding.",
  },
  {
    icon: Search,
    title: "Powerful Search",
    description: "Find any topic or keyword instantly with our fast and accurate search functionality.",
  },
  {
    icon: Brain,
    title: "MCQ Practice",
    description: "Practice multiple choice questions with instant results and explanations for each answer.",
  },
  {
    icon: FileQuestion,
    title: "Important Questions",
    description: "Exam-based important questions and past paper questions to help you prepare effectively.",
  },
  {
    icon: Download,
    title: "Download Notes",
    description: "Download notes in PDF format for offline study. Access your notes anytime, anywhere.",
  },
  {
    icon: Bookmark,
    title: "Bookmark & Save",
    description: "Bookmark your favorite notes and build a personalized study collection.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Notes",
    description: "Only correct and quality notes are uploaded, reviewed by professors for accuracy.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description: "Easy on the eyes with full dark mode support for comfortable reading at night.",
  },
  {
    icon: MessageSquare,
    title: "Feedback & Comments",
    description: "Students can rate notes and share feedback to help improve content quality.",
  },
  {
    icon: BookOpen,
    title: "Read Online",
    description: "Read notes directly in your browser with a clean, distraction-free reading experience.",
  },
  {
    icon: Unlock,
    title: "Free Access",
    description: "All notes are completely free for students. No paywalls, no hidden charges.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)] md:text-4xl">
            Everything You Need to Study Better
          </h2>
          <p className="mt-3 text-muted-foreground">
            NoteNest is designed with students in mind. Here are the features that make studying easier.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-primary/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
