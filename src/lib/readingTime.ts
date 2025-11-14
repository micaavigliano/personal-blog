import type { EntryFields } from "contentful"

const extractTextFromRichText = (node: any): string => {
  if (!node) return ""

  if (node.nodeType === "text") {
    return node.value
  }

  if (Array.isArray(node.content)) {
    return node.content.map(extractTextFromRichText).join(" ")
  }

  return ""
}

export const calculateReadingTime = (doc: EntryFields.RichText, locale: string): string => {
  if (!doc || !doc.content) return `0 ${locale}`

  const text = extractTextFromRichText(doc)

  if (!text) return `0 ${locale}`

  const words = text.trim().split(/\s+/).length

  const minutes = Math.max(1, Math.ceil(words / 200))

  return `${minutes} ${locale}`
}