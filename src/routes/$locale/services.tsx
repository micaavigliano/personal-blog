import Services from '@/components/Services'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/services')({
  component: Services,
})
