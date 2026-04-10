import * as cheerio from "cheerio";
import type { SeoResult } from "@/app/types/seo";

/**
 * Validates that the given string is a well-formed, absolute HTTP/HTTPS URL.
 */
export function isValidUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Calculates an SEO score from 0–100 based on the analyzed data.
 *
 * Scoring criteria:
 *  - Title present & optimal length (10–60 chars):  25 pts
 *  - Meta description present & optimal (50–160):   25 pts
 *  - Exactly one H1 tag:                            20 pts
 *  - No images missing alt attributes:             20 pts
 *  - At least one H2 tag present:                  10 pts
 */
export function calculateScore(data: Omit<SeoResult, "score" | "ogTitle" | "ogDescription" | "ogImage" | "canonicalUrl">): number {
  let score = 0;

  // --- Title (25 pts) ---
  if (data.title) {
    if (data.titleLength >= 10 && data.titleLength <= 60) {
      score += 25;
    } else if (data.titleLength > 0) {
      score += 12; // partial credit for present but non-optimal
    }
  }

  // --- Meta description (25 pts) ---
  if (data.metaDescription) {
    if (data.metaDescriptionLength >= 50 && data.metaDescriptionLength <= 160) {
      score += 25;
    } else if (data.metaDescriptionLength > 0) {
      score += 12; // partial credit
    }
  }

  // --- H1 count (20 pts) ---
  if (data.h1Count === 1) {
    score += 20;
  } else if (data.h1Count > 1) {
    score += 8; // multiple H1s is "ok-ish" but not ideal
  }

  // --- Alt attributes on images (20 pts) ---
  if (data.totalImages === 0) {
    // No images → no penalty, but also no full bonus
    score += 20;
  } else {
    const ratio =
      (data.totalImages - data.imagesWithoutAlt) / data.totalImages;
    score += Math.round(ratio * 20);
  }

  // --- H2 structure (10 pts) ---
  if (data.h2Count >= 1) {
    score += 10;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Fetches the HTML of a URL and runs the SEO analysis using Cheerio.
 * Throws with a human-readable message on failure.
 */
export async function analyzeUrl(rawUrl: string): Promise<SeoResult> {
  if (!isValidUrl(rawUrl)) {
    throw new Error("Invalid URL. Please enter a full URL starting with http:// or https://");
  }

  let html: string;

  try {
    const response = await fetch(rawUrl, {
      headers: {
        // Mimic a real browser so sites don't block the request
        "User-Agent":
          "Mozilla/5.0 (compatible; SEOAnalyzer/1.0; +https://seo-analizer.io)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      // 10-second timeout
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`The website returned HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      throw new Error("The URL does not point to an HTML page.");
    }

    html = await response.text();
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "TimeoutError") {
      throw new Error("Request timed out. The website took too long to respond.");
    }
    if (err instanceof Error) throw err;
    throw new Error("Failed to fetch the website. Please check the URL and try again.");
  }

  // --- Parse HTML with Cheerio ---
  const $ = cheerio.load(html);

  const title = $("title").first().text().trim() || null;
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() || null;

  // FEATURE 1: Parse Open Graph tags
  const ogTitle = $('meta[property="og:title"]').attr("content")?.trim() || null;
  const ogDescription = $('meta[property="og:description"]').attr("content")?.trim() || null;
  const ogImage = $('meta[property="og:image"]').attr("content")?.trim() || null;

  // FEATURE 2: Parse Canonical URL
  const canonicalUrl = $('link[rel="canonical"]').attr("href")?.trim() || null;

  const h1Count = $("h1").length;
  const h2Count = $("h2").length;
  const h3Count = $("h3").length;

  // Count images that lack an alt attribute entirely, or have an empty alt=""
  const allImages = $("img");
  const totalImages = allImages.length;
  let imagesWithoutAlt = 0;
  allImages.each((_, el) => {
    const alt = $(el).attr("alt");
    if (alt === undefined || alt === null || alt.trim() === "") {
      imagesWithoutAlt++;
    }
  });

  const partial = {
    url: rawUrl,
    title,
    titleLength: title?.length ?? 0,
    metaDescription,
    metaDescriptionLength: metaDescription?.length ?? 0,
    h1Count,
    h2Count,
    h3Count,
    imagesWithoutAlt,
    totalImages,
    // FEATURE 1: Include OG tags in result
    ogTitle,
    ogDescription,
    ogImage,
    // FEATURE 2: Include canonical URL in result
    canonicalUrl,
  };

  return { ...partial, score: calculateScore(partial) };
}
