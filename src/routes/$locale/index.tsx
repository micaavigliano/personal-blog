import { createFileRoute } from '@tanstack/react-router'
import Introduction from '@/components/Introduction'

export const Route = createFileRoute('/$locale/')({
  component: Home,
})

function Home() {
  return <Introduction />
}
