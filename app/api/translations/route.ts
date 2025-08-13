import { getTranslationsMapForPost } from "@/lib/getPostBySlug"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")
  const locale = searchParams.get("locale")

  if (!slug || !locale) {
    return NextResponse.json({ error: "Missing slug or locale" }, { status: 400 })
  }

  const translations = await getTranslationsMapForPost(slug, locale)
  return NextResponse.json({ translations })
}
