import { Experience } from "@/components/Experience"
import { getExperienceMetadata } from "@/lib/metadata-trans"
import type { Metadata } from "next"

interface ExperiencePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { locale } = await params
  return getExperienceMetadata(locale)
}

export default function ExperiencePage() {
  return (
    <Experience />
  )
}
