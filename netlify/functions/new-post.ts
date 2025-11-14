import type { Handler } from "@netlify/functions";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { getLocalizedField, renderValueAsHtml } from "@/lib/compose-emails";

const RESEND_API_KEY = process.env.VITE_RESEND_API!;
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
const CONTENTFUL_WEBHOOK_SECRET = process.env.CONTENTFUL_WEBHOOK_SECRET!;

const db = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
type DB = typeof db;


const listSubs = async (client: DB) => {
  const { data, error } = await client
    .from("subscribers")
    .select("email,unsubscribe_token")
    .eq("unsubscribed", false)
    .limit(5000);

  if (error) throw error;
  return data ?? [];
}

const normalizeHeaders = (event: any): Record<string, string> => {
  const out: Record<string, string> = {};
  if (event?.multiValueHeaders) {
    for (const k of Object.keys(event.multiValueHeaders)) {
      const v = event.multiValueHeaders[k];
      out[k.toLowerCase()] = Array.isArray(v) ? String(v[0]) : String(v);
    }
  }
  if (event?.headers) {
    for (const k of Object.keys(event.headers)) {
      const lk = k.toLowerCase();
      if (!out[lk]) out[lk] = String(event.headers[k]);
    }
  }
  return out;
}

const escapeHtml = (str: string) => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const resolveChosenLocale = (fields: Record<string, any>): string => {
  if (!fields) return 'en'

  const candidates = ['selectedLocale', 'sendLocale', 'locale', 'language']
  for (const name of candidates) {
    const v = fields[name]
    if (!v) continue
    if (typeof v === 'string') return v.slice(0, 2)
    if (typeof v === 'object') {
      const keys = Object.keys(v)
      const shortVal = Object.values(v).find(val => typeof val === 'string' && ['en','es','it'].includes(val))
      if (shortVal) return (shortVal as string).slice(0,2)
      for (const k of keys) {
        const short = k.slice(0,2)
        if (['en','es','it'].includes(short)) return short
      }
    }
  }

  const titleField = fields.title
  if (titleField && typeof titleField === 'object') {
    const firstKey = Object.keys(titleField)[0]
    if (firstKey) return firstKey.slice(0,2)
  }

  return 'en'
}

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    if (!RESEND_API_KEY) {
      console.error("Missing RESEND API key (VITE_RESEND_API or RESEND_API)");
      return { statusCode: 500, body: "Server misconfigured: missing resend key" };
    }
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.error("Missing SUPABASE_URL or SUPABASE_KEY");
      return { statusCode: 500, body: "Server misconfigured: missing supabase credentials" };
    }
    if (!CONTENTFUL_WEBHOOK_SECRET) {
      console.error("Missing CONTENTFUL_WEBHOOK_SECRET");
      return { statusCode: 500, body: "Server misconfigured: missing contentful webhook secret" };
    }

    const headers = normalizeHeaders(event as any);
    const notifyHeader = headers["x-notify"];
    const authHeader = headers["authentication"] || headers["authorization"];

    if (notifyHeader !== "subscribers" && authHeader !== "subscribers") {
      console.warn("Webhook ignored: not a subscribers notification", { notifyHeader, authHeader });
      return { statusCode: 204, body: "" };
    }

    // const secret = (event.headers["x-webhook-secret"]);
    // if (secret !== CONTENTFUL_WEBHOOK_SECRET) {
    //   console.warn("Unauthorized webhook call", { received: secret });
    //   return { statusCode: 401, body: "Unauthorized" };
    // }

    let payload: any = {};
    try {
      payload = JSON.parse(event.body || "{}");
    } catch (err) {
      console.warn("Could not parse request body as JSON", err);
      return { statusCode: 400, body: "Invalid JSON body" };
    }

    console.log(payload, 'testing in prod porque no tengo miedo')

    const entry = payload.fields ? payload : payload.entry ?? payload
    const fields = entry.fields ?? {}

    const chosenLocale = resolveChosenLocale(fields)

    const title = getLocalizedField(fields, "title", chosenLocale) ?? "Untitled"
    const slug = getLocalizedField(fields, "slug", chosenLocale) ?? ""
    const excerptVal = getLocalizedField(fields, "excerpt", chosenLocale) ?? ""
    const excerpt = typeof excerptVal === "string" || typeof excerptVal === "number" ? String(excerptVal) : "" // keep plain text
    const descriptionValue = getLocalizedField(fields, "description", chosenLocale)
    const descriptionHtml = renderValueAsHtml(descriptionValue)

    const url = `https://micaavigliano.com/${chosenLocale}/blog/${slug}`;
    const unsubBase = "https://micaavigliano.com/.netlify/functions/unsubscribe";

    const resend = new Resend(RESEND_API_KEY);
    const subs = await listSubs(db);
    if (!Array.isArray(subs)) {
      console.warn("listSubs did not return an array", { subs });
      return { statusCode: 500, body: "Unexpected DB response" };
    }

    const batchSize = 50;
    let totalSent = 0;
    const failures: any[] = [];

    console.log(descriptionHtml, 'descriptionHtml')
    for (let i = 0; i < subs.length; i += batchSize) {
      const chunk = subs.slice(i, i + batchSize)
      const results = await Promise.allSettled(
        chunk.map(({ email, unsubscribe_token }: any) =>
          resend.emails.send({
            from: `Mica <news@micaavigliano.com>`,
            to: email,
            subject: `New post: ${String(title)}`,
            html: `
              <p><strong>${escapeHtml(String(title))}</strong></p>
              <p>${escapeHtml(excerpt)}</p>
              <div>${descriptionHtml}</div>
              <p><a href="${url}">Read the post</a></p>
              <hr />
              <p style="font-size:12px;color:#666">You can <a href="${unsubBase}?t=${unsubscribe_token}">unsubscribe</a> anytime.</p>
            `,
          })
        )
      )

      results.forEach((r, idx) => {
        if (r.status === "fulfilled") {
          totalSent += 1
        } else {
          failures.push({ item: chunk[idx], reason: r.reason })
        }
      })
    }

    console.info(`Notified ${totalSent} subscribers, ${failures.length} failures`);
    if (failures.length > 0) {
      console.error("Some sends failed", failures.slice(0, 10));
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Notifications queued", sent: totalSent, failures: failures.length }),
    };
  } catch (err: any) {
    console.error("Function error:", err && (err.stack || err));
    const message = err && err.message ? err.message : "Unknown error";
    return { statusCode: 500, body: JSON.stringify({ error: message }) };
  }
};