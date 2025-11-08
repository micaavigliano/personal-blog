import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
const db = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!, { auth: { persistSession: false } });

export const handler: Handler = async (event) => {
  const token = event.queryStringParameters?.t;
  if (!token) return { statusCode: 400, body: "Missing token" };
  const { error } = await db.from("subscribers").update({ unsubscribed: true }).eq("unsubscribe_token", token);
  const location = error ? "https://micaavigliano.com/unsubscribe-error" : "https://micaavigliano.com/unsubscribed";
  return { statusCode: 302, headers: { Location: location }, body: "" };
};
