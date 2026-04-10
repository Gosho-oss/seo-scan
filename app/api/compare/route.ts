import { NextRequest } from "next/server";
import { analyzeUrl } from "@/app/lib/seo-analyzer";
import type { SeoResult } from "@/app/types/seo";

/**
 * POST /api/compare
 *
 * Body: { url1: string, url2: string }
 * Returns: { site1: SeoResult | { error: string }, site2: SeoResult | { error: string } }
 */
export async function POST(request: NextRequest) {
  let url1: string;
  let url2: string;

  try {
    const body = await request.json();
    url1 = body?.url1;
    url2 = body?.url2;
  } catch {
    return Response.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Validate both URLs are provided
  if (
    !url1 ||
    typeof url1 !== "string" ||
    url1.trim() === "" ||
    !url2 ||
    typeof url2 !== "string" ||
    url2.trim() === ""
  ) {
    return Response.json(
      { error: "Both url1 and url2 are required." },
      { status: 400 }
    );
  }

  // Analyze both URLs in parallel using Promise.allSettled()
  // This ensures one failure doesn't prevent the other from being analyzed
  const results = await Promise.allSettled([
    analyzeUrl(url1.trim()),
    analyzeUrl(url2.trim()),
  ]);

  // Extract the results
  const site1 =
    results[0].status === "fulfilled"
      ? results[0].value
      : { error: results[0].reason instanceof Error ? results[0].reason.message : "Unknown error" };

  const site2 =
    results[1].status === "fulfilled"
      ? results[1].value
      : { error: results[1].reason instanceof Error ? results[1].reason.message : "Unknown error" };

  return Response.json({ site1, site2 });
}
