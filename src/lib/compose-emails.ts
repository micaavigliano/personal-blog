import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const LOCALE_KEY_MAP: Record<string, string[]> = {
  en: ['en-US', 'en'],
  es: ['es-ES', 'es'],
  it: ['it-IT', 'it'],
}

const keysForLocale = (shortLocale: string) => {
  return LOCALE_KEY_MAP[shortLocale] ?? [shortLocale, `${shortLocale}-${shortLocale.toUpperCase()}`]
}

export const getLocalizedField = (fields: Record<string, any>, fieldName: string, locale: string): any => {
  const field = fields?.[fieldName]
  if (field == null) return undefined

  const keys = keysForLocale(locale)

  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(field, k)) {
      return field[k]
    }
  }

  const values = Object.values(field)
  const primitive = values.find(v => typeof v === 'string' || typeof v === 'number' || Array.isArray(v))
  if (primitive !== undefined) return primitive

  return values[0]
}

export const renderValueAsHtml = (value: any): string => {
  if (value == null) return ''
  if (typeof value === 'string' || typeof value === 'number') return String(value)

  if (typeof value === 'object' && (value.nodeType || value.content || value.node_type)) {
    try {
      return documentToHtmlString(value)
    } catch (err) {
      return `<pre>${escapeHtml(JSON.stringify(value, null, 2))}</pre>`
    }
  }

  if (Array.isArray(value)) {
    return escapeHtml(value.join('\n'))
  }

  return `<pre>${escapeHtml(JSON.stringify(value, null, 2))}</pre>`
}

const escapeHtml = (str: string) => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}