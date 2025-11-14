import { createFileRoute, notFound } from '@tanstack/react-router'
import { Post } from '@/components/Post'
import {
  getPostBySlug,
  getTranslationsMapForPost,
  type PostView,
} from '@/lib/get-data-contentful'

export const Route = createFileRoute('/$locale/blog/$slug')({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug, params.locale)
    if (!post) throw notFound()
    const translations = await getTranslationsMapForPost(params.slug, params.locale)
    return { post, translations }
  },
  pendingComponent: () => <div>Loading post…</div>,
  errorComponent: ({ error }) => <div role="alert">Failed: {String(error)}</div>,
  component: PostRoute,
})

function PostRoute() {
  const { post } = Route.useLoaderData() as {
    post: PostView & { id: string }
  }

  return <Post post={post} />
}
