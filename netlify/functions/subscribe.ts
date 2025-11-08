import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_KEY!;

const allowedOrigins = [
  "https://micaavigliano.com",
  "https://www.micaavigliano.com",
  "http://localhost:8888",
  "https://201ff4f9--micaavigliano.netlify.live"
];

const cors = (origin = "*") => ({
  "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
});

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: cors(event.headers.origin || ""), body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: cors(event.headers.origin || ""), body: "Method Not Allowed" };
  if (!SUPABASE_URL || !SERVICE_KEY) return { statusCode: 500, headers: cors(event.headers.origin || ""), body: JSON.stringify({ message: "Server not configured" }) };

  const { email = "", name } = JSON.parse(event.body || "{}");
  const normalized = String(email).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { statusCode: 400, headers: cors(event.headers.origin || ""), body: JSON.stringify({ message: "Invalid email" }) };
  }

  const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

  try {
    const { data: existing, error: selErr } = await db.from("subscribers").select("id").eq("email", normalized).limit(1);
    if (selErr) throw selErr;

    if (existing?.length) {
      return { statusCode: 200, headers: cors(event.headers.origin || ""), body: JSON.stringify({ already: true, message: "Already subscribed" }) };
    }

    const { data, error: insErr } = await db.from("newsletter").insert([{ email: normalized, name: name?.trim() || null }]).select("id,email,unsubscribe_token").single();
    if (insErr) throw insErr;

    return { statusCode: 201, headers: cors(event.headers.origin || ""), body: JSON.stringify({ message: "Subscribed", subscriber: data }) };
  } catch (e) {
    console.error("subscribe error:", e);
    return { statusCode: 500, headers: cors(event.headers.origin || ""), body: JSON.stringify({ message: "Server error" }) };
  }
};
