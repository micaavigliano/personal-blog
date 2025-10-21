import Book from '@/components/Book'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/book')({
  component: Book,
})

