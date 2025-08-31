import { Hero } from "@/components/hero"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Pricing />
      <CTA />
    </main>
  )
}
