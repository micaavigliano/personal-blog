"use client"

import { getTranslation, TranslationKey } from "@/lib/translations"
import { Eye } from "lucide-react"
import { useEffect, useState } from "react"

type Props = {
  slug: string
  locale: string
}

export default function ViewCounter({ slug, locale }: Props) {
  const t = (key: TranslationKey) => getTranslation(locale, key)
  const [views, setViews] = useState<number | null>(null)
  const viewTexts = views === 1 ? t("blog.view") : t("blog.views")

  useEffect(() => {
    fetch(`/api/views/${slug}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setViews(data.views))

    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
  }, [slug])

  return (
    <div className="flex flex-row gap-2" aria-label={`${views} ${viewTexts}`}>
      <Eye aria-hidden="true" className="text-gray-400" />
      {views === null ? "—" : <p>{views}</p>}
    </div>
  )
}
