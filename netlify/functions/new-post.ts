import type { Handler } from "@netlify/functions";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const RESEND_API_KEY = process.env.VITE_RESEND_API!;
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
const CONTENTFUL_WEBHOOK_SECRET = process.env.CONTENTFUL_WEBHOOK_SECRET!;

const db = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
type DB = typeof db;


async function listSubs(client: DB) {
  const { data, error } = await client
    .from("subscribers")
    .select("email,unsubscribe_token")
    .eq("unsubscribed", false)
    .limit(5000);

  if (error) throw error;
  return data ?? [];
}

// Minimal header normalization helper (case-insensitive + multiValueHeaders support)
function normalizeHeaders(event: any): Record<string, string> {
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

    // NEW: read and check the notification headers Contentful can send
    const headers = normalizeHeaders(event as any);
    const notifyHeader = headers["x-notify"];
    const authHeader = headers["authentication"] || headers["authorization"];

    // Require either X-Notify: subscribers OR Authentication/Authorization: subscribers
    if (notifyHeader !== "subscribers" && authHeader !== "subscribers") {
      console.warn("Webhook ignored: not a subscribers notification", { notifyHeader, authHeader });
      // Return 204 so Contentful treats it as delivered but no action is taken.
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

    const fields = payload.fields || {};
    const title = fields.title;
    const slug = fields.slug?.en ?? fields.slug ?? "";
    const excerpt = fields.excerpt?.en ?? fields.excerpt ?? "";

    const url = `https://micaavigliano.com/blog/${slug}`;
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

    for (let i = 0; i < subs.length; i += batchSize) {
      const chunk = subs.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        chunk.map(({ email, unsubscribe_token }: any) =>
          resend.emails.send({
            from: "Mica <news@micaavigliano.com>",
            to: email,
            subject: `New post: ${title}`,
            html: `
              <p><strong>${title}</strong></p>
              <p>${excerpt}</p>
              <p><a href="${url}">Read the post</a></p>
              <hr />
              <p style="font-size:12px;color:#666">You can <a href="${unsubBase}?t=${unsubscribe_token}">unsubscribe</a> anytime.</p>
            `,
          })
        )
      );

      results.forEach((r, idx) => {
        if (r.status === "fulfilled") {
          totalSent += 1;
        } else {
          failures.push({ item: chunk[idx], reason: r.reason });
        }
      });
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