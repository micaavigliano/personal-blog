import {
  type Options,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer"
import {
  BLOCKS,
  INLINES,
  MARKS,
  type Document,
  type Paragraph,
  type Hyperlink,
  type EntryHyperlink,
  type AssetHyperlink,
  type AssetLinkBlock,
  type EntryLinkBlock,
  type Text,
} from "@contentful/rich-text-types"
import type { Asset, Entry, EntrySkeletonType, AssetFile } from "contentful"
import { Copy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { getTranslation, type TranslationKey } from "@/lib/translations"
import Tooltip from "./Tooltip"

export function RichText({ doc, locale }: { doc?: Document; locale: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const t = (key: TranslationKey) => getTranslation(locale, key)
  const [copyText, setCopyText] = useState(t("rich.copy"))

  if (!doc) return null

  const handleCopy = () => {
    const text = sectionRef.current?.innerText
    navigator.clipboard.writeText(text ?? "").then(() => {
      setCopyText(t("rich.copied"))
      setTimeout(() => {
        setCopyText(t("rich.copy"))
      }, 5000)
    })
  }

  type EntryTarget =
    | Entry<EntrySkeletonType>
    | { sys: { type: "Link"; linkType: "Entry"; id: string } }

  type AssetTarget =
    | Asset
    | { sys: { type: "Link"; linkType: "Asset"; id: string } }

  const isResolvedEntry = (x: unknown): x is Entry<EntrySkeletonType> =>
    typeof x === "object" && x !== null && "fields" in (x as Record<string, unknown>)

  const isResolvedAsset = (x: unknown): x is Asset =>
    typeof x === "object" && x !== null && "fields" in (x as Record<string, unknown>)

  const hasStringUrl = (f: unknown): f is AssetFile & { url: string } =>
    typeof f === "object" &&
    f !== null &&
    "url" in (f as Record<string, unknown>) &&
    typeof (f as { url?: unknown }).url === "string"

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text) => <em>{text}</em>,
      [MARKS.CODE]: (text) => (
        <code className="font-mono text-sm px-1 py-0.5 rounded bg-neutral-100">
          {text}
        </code>
      ),
    },

    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const p = node as Paragraph
        const isSingleText =
          p.content.length === 1 && p.content[0].nodeType === "text"
        const hasCodeMark =
          isSingleText &&
          (p.content[0] as Text).marks?.some((m) => m.type === MARKS.CODE)

        if (isSingleText && hasCodeMark) {
          const code = (p.content[0] as Text).value ?? ""
          return (
            <section
              className="my-6 rounded-xl bg-neutral-900 text-neutral-100 p-4 overflow-x-auto flex flex-row justify-between items-start"
              ref={sectionRef}
            >
              <pre>
                <code className="font-mono text-sm whitespace-pre-wrap">{code}</code>
              </pre>
              <Tooltip text={copyText} direction="left" id="copyid">
                <button
                  onClick={handleCopy}
                  aria-label={t("rich.copy")}
                  className="cursor-pointer bg-gray-100 rounded p-2 transition-colors"
                  aria-labelledby="copyid"
                >
                  <Copy aria-hidden="true" className="text-black" />
                </button>
              </Tooltip>
            </section>
          )
        }

        return <p className="mb-4 last:mb-0">{children}</p>
      },

      [BLOCKS.HEADING_1]: (_n, children) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (_n, children) => <h2>{children}</h2>,
      [BLOCKS.HEADING_3]: (_n, children) => <h3 className="relative inline-block text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 [text-wrap:balance] after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-12 after:rounded-full after:bg-gradient-to-r after:from-indigo-500 after:via-fuchsia-500 after:to-pink-500">{children}</h3>,
      [BLOCKS.HEADING_4]: (_n, children) => <h4 className="relative inline-block text-1xl md:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 [text-wrap:balance] after:absolute after:left-0 after:-bottom-1 after:h-1 after:w-12 after:rounded-full after:bg-gradient-to-r after:from-indigo-500 after:via-fuchsia-500 after:to-pink-500">{children}</h4>,
      [BLOCKS.QUOTE]: (_n, children) => <blockquote>{children}</blockquote>,
      [BLOCKS.UL_LIST]: (_n, children) => <ul className="list-disc pl-6 my-4">{children}</ul>,
      [BLOCKS.OL_LIST]: (_n, children) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (_n, children) => <li className="[&::marker]:text-black">{children}</li>,
      [BLOCKS.HR]: () => <hr />,

      // Embedded asset (images / files)
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const n = node as AssetLinkBlock
        const target = n.data.target as unknown as AssetTarget
        if (!isResolvedAsset(target)) return null

        const fileField = target.fields.file
        if (!hasStringUrl(fileField)) return null

        const file = fileField // AssetFile with url: string
        const url = file.url.startsWith("//") ? `https:${file.url}` : file.url

        const title = (target.fields.title as string | undefined) ?? ""
        const desc = (target.fields.description as string | undefined) ?? title

        const isImage =
          typeof file.contentType === "string" && file.contentType.startsWith("image/")

        if (isImage) {
          const w = file.details?.image?.width ?? 800
          const h = file.details?.image?.height ?? 600
          return (
            <figure className="my-6">
              <Image
                src={url}
                alt={desc}
                width={w}
                height={h}
                sizes="(max-width: 768px) 100vw, 768px"
              />
              {desc && <figcaption className="text-sm text-neutral-500 mt-2">{desc}</figcaption>}
            </figure>
          )
        }

        return (
          <p>
            <a href={url} target="_blank" rel="noreferrer" className="underline">
              {title || url}
            </a>
          </p>
        )
      },

      // Embedded entries (e.g., "codeBlock", "callout")
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const n = node as EntryLinkBlock
        const target = n.data.target as unknown as EntryTarget
        if (!isResolvedEntry(target)) return null

        const ctId = target.sys.contentType.sys.id

        if (ctId === "codeBlock") {
          const code: string = (target.fields as { code?: string }).code ?? ""
          return (
            <section
              className="my-6 rounded-xl bg-neutral-900 text-neutral-100 p-4 overflow-x-auto flex flex-row justify-between items-start"
              ref={sectionRef}
            >
              <pre>
                <code className="font-mono text-sm whitespace-pre-wrap">{code}</code>
              </pre>
              <Tooltip text={copyText} direction="left" id="copyid">
                <button
                  onClick={handleCopy}
                  aria-label={t("rich.copy")}
                  className="cursor-pointer bg-gray-100 rounded p-2 transition-colors"
                  aria-labelledby="copyid"
                >
                  <Copy aria-hidden="true" className="text-black" />
                </button>
              </Tooltip>
            </section>
          )
        }

        if (ctId === "callout") {
          const { title, body } = (target.fields as { title?: string; body?: string }) || {}
          return (
            <aside className="my-6 rounded-lg border p-4 bg-neutral-50">
              {title && <strong className="block mb-2">{title}</strong>}
              {body && <p>{body}</p>}
            </aside>
          )
        }

        return null
      },

      [INLINES.HYPERLINK]: (node, children) => {
        const n = node as Hyperlink
        const href = n.data.uri
        const external = /^https?:\/\//i.test(href)
        return external ? (
          <a href={href} target="_blank" rel="noreferrer" className="underline text-wrap text-blue-600">
            {children}
          </a>
        ) : (
          <Link href={href} target="_blank" rel="noreferrer" className="underline text-wrap text-blue-600">
            {children}
          </Link>
        )
      },

      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const n = node as EntryHyperlink
        const target = n.data.target as unknown as EntryTarget
        return isResolvedEntry(target) ? (
          <span>{(target.fields as { title?: string }).title ?? "(embedded entry)"}</span>
        ) : null
      },

      [INLINES.ASSET_HYPERLINK]: (node, children) => {
        const n = node as AssetHyperlink
        const target = n.data.target as unknown as AssetTarget
        let url = "#"
        if (isResolvedAsset(target)) {
          const fileField = target.fields.file
          if (hasStringUrl(fileField)) {
            url = fileField.url.startsWith("//") ? `https:${fileField.url}` : fileField.url
          }
        }
        return (
          <a href={url} target="_blank" rel="noreferrer">
            {children}
          </a>
        )
      },
    },
  }

  return <>{documentToReactComponents(doc, options)}</>
}
