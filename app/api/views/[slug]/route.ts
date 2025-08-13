import { createClient } from "redis"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

let redisClient: ReturnType<typeof createClient> | null = null

async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL })
    redisClient.on("error", (err) => console.error("Redis Client Error", err))
    await redisClient.connect()
  }
  return redisClient
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const redis = await getRedisClient()
  const slug = await decodeURIComponent(params.slug)
  const count = Number(await redis.get(`views:${slug}`)) || 0
  return NextResponse.json({ slug, views: count })
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const redis = await getRedisClient()
  const slug = decodeURIComponent(params.slug)
  const newCount = await redis.incr(`views:${slug}`)
  return NextResponse.json({ slug, views: newCount })
}
