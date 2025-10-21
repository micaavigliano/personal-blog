import { createClient } from 'contentful'

export const client = createClient({
  space: import.meta.env.VITE_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: import.meta.env.VITE_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
})