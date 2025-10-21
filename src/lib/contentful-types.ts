import type { EntryFieldTypes, EntrySkeletonType } from "contentful"

export interface BlogPostFields {
  slug: EntryFieldTypes.Symbol
  title: EntryFieldTypes.Symbol
  seoTitle?: EntryFieldTypes.Symbol
  description: EntryFieldTypes.RichText
  seoDescription?: EntryFieldTypes.Text
  dateISO?: EntryFieldTypes.Text
  updatedAtISO?: EntryFieldTypes.Text
  keywords?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
}

export type BlogPostSkeleton = EntrySkeletonType<BlogPostFields, "blogPost">