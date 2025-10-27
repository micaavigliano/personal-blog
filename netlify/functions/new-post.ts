import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

async function listSubscribers(): Promise<{ email: string }[]> {
  const resp = await fetch(process.env.SUBSCRIBERS_API!, { headers: { Authorization: `Bearer ${process.env.SUBSCRIBERS_TOKEN}` } });
  if (!resp.ok) throw new Error("Failed to load subscribers");
  return resp.json();
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const payload = JSON.parse(event.body || "{}");
  const fields = payload.fields || {};
  const title = fields.title?.en || fields.title || "New post";
  const slug = fields.slug?.en || fields.slug;
  const excerpt = fields.excerpt?.en || fields.excerpt || "";

  const url = `https://micaavigliano.com/blog/${slug}`;

  const subs = await listSubscribers();

  for (const { email } of subs) {
    await resend.emails.send({
      from: "Mica <micaela.avigliano@gmail.com>",
      to: email,
      subject: `New post: ${title}`,
      html: `
        <h2 style="margin:0 0 12px">${title}</h2>
        <p>${excerpt}</p>
        <p><a href="${url}">Read the post →</a></p>
        <hr />
        <p style="font-size:12px;color:#666">
          You’re receiving this because you subscribed on my site.
          <a href="https://www.micaavigliano.com/.netlify/functions/unsubscribe?e=${encodeURIComponent(email)}">Unsubscribe</a>
        </p>
      `,
    });
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
