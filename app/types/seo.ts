/**
 * Types shared between frontend components and the backend API route.
 */

/** The payload shape returned by /api/analyze */
export interface SeoResult {
  url: string;
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  imagesWithoutAlt: number;
  totalImages: number;
  score: number; // 0–100
}

/** Response shape when the API returns an error */
export interface SeoError {
  error: string;
}

/** Union type for the full API response */
export type SeoApiResponse = SeoResult | SeoError;
