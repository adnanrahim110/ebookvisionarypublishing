import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

import { REVALIDATE_TAG } from "@/sanity/lib/client";

type ParsedWebhookBody<T> = {
  body: T | null;
  isValidSignature: boolean | null;
};

async function parseSanityWebhookBody<T>(
  req: NextRequest,
  secret?: string,
): Promise<ParsedWebhookBody<T>> {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);

  if (!signature) {
    console.error("Missing signature header");
    return { body: null, isValidSignature: null };
  }

  const rawBody = await req.text();
  const validSignature = secret
    ? await isValidSignature(rawBody, signature, secret.trim())
    : null;

  if (validSignature !== false) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  return {
    body: rawBody.trim() ? (JSON.parse(rawBody) as T) : null,
    isValidSignature: validSignature,
  };
}

// Sanity publish webhook -> invalidate every CMS-backed page on-demand.
// Configure a webhook in Sanity (sanity.io/manage) pointing POST -> /api/revalidate
// with the same secret as the SANITY_REVALIDATE_SECRET env var on the server.
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseSanityWebhookBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad request: missing document type", { status: 400 });
    }

    // `{ expire: 0 }` forces immediate expiry, the recommended profile for
    // external webhooks in Next 16 (the single-arg form is deprecated).
    revalidateTag(REVALIDATE_TAG, { expire: 0 });

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      now: Date.now(),
    });
  } catch (err) {
    console.error("Revalidation webhook error:", err);
    return new Response("Error revalidating", { status: 500 });
  }
}
