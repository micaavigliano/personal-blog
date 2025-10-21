import Experience from '@/components/Experience'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/$locale/experience")({
  component: Experience,
})

