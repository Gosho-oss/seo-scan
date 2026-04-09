import { NextRequest } from "next/server";
import { analyzeUrl } from "@/app/lib/seo-analyzer";

/**
 * POST /api/analyze
 *
 * Body: { url: string }
 * Returns: SeoResult | { error: string }
 */
export async function POST(request: NextRequest) {
  let url: string;

  try {
    const body = await request.json();
    url = body?.url;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!url || typeof url !== "string" || url.trim() === "") {
    return Response.json({ error: "A URL is required." }, { status: 400 });
  }

  try {
    const result = await analyzeUrl(url.trim());
    return Response.json(result);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return Response.json({ error: message }, { status: 422 });
  }
}
