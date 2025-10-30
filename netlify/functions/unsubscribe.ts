import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
const SUPABASE_TOKEN = process.env.VITE_SUPABASE_TOKEN!;

export const handler: Handler = async (event) => {
  const token = event.queryStringParameters?.t;
  if (!token) return { statusCode: 400, body: "Missing token" };

  const supabase = createClient(SUPABASE_URL, SUPABASE_TOKEN, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from("subscribers")
    .update({ unsubscribed: true })
    .eq("unsubscribe_token", token)
    .select("email")
    .single();

  const location = error
    ? "https://micaavigliano.com/unsubscribe-error"
    : "https://micaavigliano.com/unsubscribed";

  return { statusCode: 302, headers: { Location: location }, body: "" };
};
