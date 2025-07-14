// import { Hero } from "@/components/hero"
// import { About } from "@/components/about"
import { AccessibilityStats } from "../../components/accessibility-stats"
// import { Services } from "@/components/services"
// import { Projects } from "@/components/projects"
// import { Contact } from "@/components/contact"
import { JsonLd } from "../../components/json-ld"

export default function Home() {
  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-rose-50 to-sunshine-50">
        <main>
          {/* <Hero />
          <About /> */}
          <AccessibilityStats />
          {/* <Services />
          <Projects />
          <Contact /> */}
        </main>
      </div>
    </>
  )
}
