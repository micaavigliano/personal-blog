// import { client } from '@/lib/contentful'
import { AccessibilityStats } from '@/components/accessibility-stats'
import { Hero } from "@/components/Hero"
import { Services } from '@/components/Services'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
// import { EntrySkeletonType } from 'contentful'

// interface Post {
//   title: string
//   slug: string
// }

// type PostSkeleton = EntrySkeletonType<Post, 'blogPost'>

export default async function Blog() {
  // const entries = await client.getEntries<PostSkeleton>({ content_type: 'blogPost' })

  // const posts = entries.items.map((item) => ({
  //   title: item.fields.title,
  //   slug: item.fields.slug,
  // }))

  return (
    <>
      <Hero />
      <About />
      <AccessibilityStats />
      <Services />
      <Contact />
    </>
  )
}
