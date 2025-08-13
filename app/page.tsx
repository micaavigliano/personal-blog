import { AccessibilityStats } from '@/components/accessibility-stats'
import { Hero } from "@/components/Hero"
import { Services } from '@/components/Services'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'

export default async function Blog() {
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
