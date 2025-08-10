import { CalendlyBooking } from "@/components/Booking"
import { getBookingMetadata } from "@/lib/booking-trans"
import type { Metadata } from "next"

interface ExperiencePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { locale } = await params
  return getBookingMetadata(locale)
}

export default function BookPage() {
  return (
    <CalendlyBooking />
  )
}
