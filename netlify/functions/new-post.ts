import type { Handler } from "@netlify/functions";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.VITE_RESEND_API!);
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_TOKEN = process.env.SUPABASE_TOKEN!;

async function listSubscribers() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_TOKEN, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from("subscribers")
    .select("email, name, unsubscribe_token")
    .eq("unsubscribed", false);
  if (error) throw error;
  return data ?? [];
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const payload = JSON.parse(event.body || "{}");
  const fields = payload.fields || {};
  const title = fields.title?.en ?? fields.title ?? "New post";
  const slug = fields.slug?.en ?? fields.slug ?? "";
  const excerpt = fields.excerpt?.en ?? fields.excerpt ?? "";

  const url = `https://micaavigliano.com/blog/${slug}`;
  const base = "https://micaavigliano.com/.netlify/functions/unsubscribe";

  const subs = await listSubscribers();

  const secret = event.headers["x-webhook-secret"] || event.headers["X-Webhook-Secret"];
  if (secret !== process.env.VITE_CONTENTFUL_WEBHOOK_SECRET) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  const batchSize = 50;
  for (let i = 0; i < subs.length; i += batchSize) {
    const batch = subs.slice(i, i + batchSize);
    await Promise.allSettled(
      batch.map(({ email, unsubscribe_token }) =>
        resend.emails.send({
          from: "Mica <micaela.avigliano@gmail.com>",
          to: email,
          subject: `New post: ${title}`,
          html: `
            <p><strong>${title}</strong></p>
            <p>${excerpt}</p>
            <p><a href="${url}">Read the post</a></p>
            <hr />
            <p style="font-size:12px;color:#666">
              You received this because you subscribed on my website.
              <a href="${base}?t=${unsubscribe_token}">Unsubscribe</a>
            </p>
          `,
        })
      )
    );
  }

  return { statusCode: 200, body: "Notifications queued" };
};
