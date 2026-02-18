import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/hero-section"
import { PopularSubjects } from "@/components/popular-subjects"
import { FeaturesSection } from "@/components/features-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <PopularSubjects />
        <FeaturesSection />
      </main>
      <SiteFooter />
    </div>
  )
}
