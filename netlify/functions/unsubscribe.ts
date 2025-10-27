import type { Handler } from "@netlify/functions";

async function removeSubscriber(email: string) {
  await fetch(`${process.env.SUBSCRIBERS_API}/${encodeURIComponent(email)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${process.env.SUBSCRIBERS_TOKEN}` }
  });
}

export const handler: Handler = async (event) => {
  const email = event.queryStringParameters?.e;
  if (!email) return { statusCode: 400, body: "Missing email" };

  await removeSubscriber(email);
  return {
    statusCode: 302,
    headers: { Location: "https://micaavigliano.com/unsubscribed" },
    body: ""
  };
};
