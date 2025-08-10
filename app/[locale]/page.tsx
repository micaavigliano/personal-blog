import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { AccessibilityStats } from "@/components/accessibility-stats"
import { Services } from "@/components/Services"
import { Contact } from "@/components/Contact"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <AccessibilityStats />
      <Services />
      <Contact />
    </>
  )
}
