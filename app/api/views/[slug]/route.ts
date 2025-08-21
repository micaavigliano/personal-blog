import { createClient } from "redis"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
type Params = { slug: string }

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
  _req: NextRequest,
  ctx: { params: Promise<Params> }
) {
  const { slug } = await ctx.params
  const decoded = decodeURIComponent(slug)

  const redis = await getRedisClient()
  const count = Number(await redis.get(`views:${decoded}`)) || 0

  return NextResponse.json({ slug: decoded, views: count })
}

export async function POST(
  _req: NextRequest,
  ctx: { params: Promise<Params> }
) {
  const { slug } = await ctx.params
  const decoded = decodeURIComponent(slug)

  const redis = await getRedisClient()
  const newCount = await redis.incr(`views:${decoded}`)

  return NextResponse.json({ slug: decoded, views: newCount })
}