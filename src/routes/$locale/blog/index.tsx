import { createFileRoute } from '@tanstack/react-router'
import { getAllPosts } from "@/lib/getPostBySlug"
import Blog from '@/components/Blog'

export const Route = createFileRoute('/$locale/blog/')({
  loader: async ({ params }) => {
    const posts = await getAllPosts(params.locale as any)
    return posts
  },
  pendingComponent: () => <div>Loading posts…</div>,
  errorComponent: ({ error }) => <div>Failed: {String(error)}</div>,
  component: BlogPage,
})

function BlogPage() {
  const posts = Route.useLoaderData()
  return <Blog posts={posts} />
}
