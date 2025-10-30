import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const allowedOrigins = [
  "https://micaavigliano.com",
  "https://www.micaavigliano.com",
  "http://localhost:3000",
  "http://localhost:8888",
  "http://localhost:5174"
];

function corsHeaders(origin = "*") {
  return {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders(event.headers.origin || ""),
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders(event.headers.origin || ""),
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing SUPABASE env vars");
    return {
      statusCode: 500,
      headers: corsHeaders(event.headers.origin || ""),
      body: JSON.stringify({ message: "Server not configured" }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (err) {
    return {
      statusCode: 400,
      headers: corsHeaders(event.headers.origin || ""),
      body: JSON.stringify({ message: "Invalid JSON" }),
    };
  }

  const email = (body.email || "").trim().toLowerCase();
  const name = body.name ? String(body.name).trim() : null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      headers: corsHeaders(event.headers.origin || ""),
      body: JSON.stringify({ message: "Invalid email" }),
    };
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const table = "subscribers";

  try {
    const { data: existing, error: selectError } = await supabase
      .from(table)
      .select("id")
      .eq("email", email)
      .limit(1);

    if (selectError) {
      console.error("select error", selectError);
      throw selectError;
    }

    if (existing && existing.length > 0) {
      return {
        statusCode: 200,
        headers: corsHeaders(event.headers.origin || ""),
        body: JSON.stringify({ already: true, message: "Already subscribed" }),
      };
    }

    const insertBody: any = { email };
    if (name) insertBody.name = name;

    const { data, error: insertError } = await supabase
      .from(table)
      .insert([insertBody])
      .select()
      .single();

    if (insertError) {
      console.error("insert error", insertError);
      throw insertError;
    }

    return {
      statusCode: 201,
      headers: corsHeaders(event.headers.origin || ""),
      body: JSON.stringify({ message: "Subscribed", subscriber: data }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: corsHeaders(event.headers.origin || ""),
      body: JSON.stringify({ message: "Server error" }),
    };
  }
};