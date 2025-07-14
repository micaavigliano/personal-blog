import { client } from '@/lib/contentful'
import { JsonLd } from "@/components/json-ld"
import { AccessibilityStats } from '../components/accessibility-stats'
import { EntrySkeletonType } from 'contentful'

interface Post {
  title: string
  slug: string
}

type PostSkeleton = EntrySkeletonType<Post, 'blogPost'>

export default async function BlogPage() {
  const entries = await client.getEntries<PostSkeleton>({ content_type: 'blogPost' })

  const posts = entries.items.map((item) => ({
    title: item.fields.title,
    slug: item.fields.slug,
  }))

  return (
    <div className="p-8">
      <JsonLd />
      <AccessibilityStats />
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-2">
            <h3>{post.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  )
}
