"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import ScoreCard from "@/app/components/ScoreCard";
import Footer from "@/app/components/Footer";
import type { SeoResult } from "@/app/types/seo";

interface CompareResult {
  site1: SeoResult | { error: string };
  site2: SeoResult | { error: string };
}

// ===== Helper to check if a result is an error =====
function isError(result: unknown): result is { error: string } {
  return typeof result === "object" && result !== null && "error" in result;
}

// ===== Helper to check if a result is valid SeoResult =====
function isSeoResult(result: unknown): result is SeoResult {
  return typeof result === "object" && result !== null && !("error" in result);
}

// ===== Comparison Logic =====

interface ComparisonMetric {
  label: string;
  site1Value: string | number;
  site2Value: string | number;
  site1Winner: boolean;
  site2Winner: boolean;
  tie: boolean;
}

function getComparisonMetrics(site1: SeoResult, site2: SeoResult): ComparisonMetric[] {
  const metrics: ComparisonMetric[] = [];

  // SEO Score
  const scoreSite1 = site1.score;
  const scoreSite2 = site2.score;
  metrics.push({
    label: "SEO Score",
    site1Value: `${scoreSite1}/100`,
    site2Value: `${scoreSite2}/100`,
    site1Winner: scoreSite1 > scoreSite2,
    site2Winner: scoreSite2 > scoreSite1,
    tie: scoreSite1 === scoreSite2,
  });

  // Title Present
  const titleSite1 = site1.title ? "Yes" : "No";
  const titleSite2 = site2.title ? "Yes" : "No";
  const titleWin1 = site1.title !== null && site2.title === null;
  const titleWin2 = site2.title !== null && site1.title === null;
  metrics.push({
    label: "Title Present",
    site1Value: titleSite1,
    site2Value: titleSite2,
    site1Winner: titleWin1,
    site2Winner: titleWin2,
    tie: !titleWin1 && !titleWin2,
  });

  // Title Length (optimal = 10-60)
  const titleLenGood1 = site1.titleLength >= 10 && site1.titleLength <= 60;
  const titleLenGood2 = site2.titleLength >= 10 && site2.titleLength <= 60;
  metrics.push({
    label: "Title Length Optimal",
    site1Value: `${site1.titleLength} chars`,
    site2Value: `${site2.titleLength} chars`,
    site1Winner: titleLenGood1 && !titleLenGood2,
    site2Winner: titleLenGood2 && !titleLenGood1,
    tie: titleLenGood1 === titleLenGood2,
  });

  // Meta Description Present
  const metaSite1 = site1.metaDescription ? "Yes" : "No";
  const metaSite2 = site2.metaDescription ? "Yes" : "No";
  const metaWin1 = site1.metaDescription !== null && site2.metaDescription === null;
  const metaWin2 = site2.metaDescription !== null && site1.metaDescription === null;
  metrics.push({
    label: "Meta Description Present",
    site1Value: metaSite1,
    site2Value: metaSite2,
    site1Winner: metaWin1,
    site2Winner: metaWin2,
    tie: !metaWin1 && !metaWin2,
  });

  // Meta Description Length (optimal = 50-160)
  const metaLenGood1 = site1.metaDescriptionLength >= 50 && site1.metaDescriptionLength <= 160;
  const metaLenGood2 = site2.metaDescriptionLength >= 50 && site2.metaDescriptionLength <= 160;
  metrics.push({
    label: "Meta Description Length Optimal",
    site1Value: `${site1.metaDescriptionLength} chars`,
    site2Value: `${site2.metaDescriptionLength} chars`,
    site1Winner: metaLenGood1 && !metaLenGood2,
    site2Winner: metaLenGood2 && !metaLenGood1,
    tie: metaLenGood1 === metaLenGood2,
  });

  // H1 Count (optimal = 1)
  const h1Good1 = site1.h1Count === 1;
  const h1Good2 = site2.h1Count === 1;
  metrics.push({
    label: "Exactly One H1",
    site1Value: site1.h1Count,
    site2Value: site2.h1Count,
    site1Winner: h1Good1 && !h1Good2,
    site2Winner: h1Good2 && !h1Good1,
    tie: h1Good1 === h1Good2,
  });

  // Canonical URL
  const canSite1 = site1.canonicalUrl ? "Yes" : "No";
  const canSite2 = site2.canonicalUrl ? "Yes" : "No";
  const canWin1 = site1.canonicalUrl !== null && site2.canonicalUrl === null;
  const canWin2 = site2.canonicalUrl !== null && site1.canonicalUrl === null;
  metrics.push({
    label: "Canonical URL Present",
    site1Value: canSite1,
    site2Value: canSite2,
    site1Winner: canWin1,
    site2Winner: canWin2,
    tie: !canWin1 && !canWin2,
  });

  // Image Alt Attributes
  const imgAltGood1 = site1.totalImages === 0 || site1.imagesWithoutAlt === 0;
  const imgAltGood2 = site2.totalImages === 0 || site2.imagesWithoutAlt === 0;
  metrics.push({
    label: "All Images Have Alt Text",
    site1Value: `${site1.imagesWithoutAlt}/${site1.totalImages} missing`,
    site2Value: `${site2.imagesWithoutAlt}/${site2.totalImages} missing`,
    site1Winner: imgAltGood1 && !imgAltGood2,
    site2Winner: imgAltGood2 && !imgAltGood1,
    tie: imgAltGood1 === imgAltGood2,
  });

  return metrics;
}

function countWinners(metrics: ComparisonMetric[]): { site1: number; site2: number } {
  let site1Wins = 0;
  let site2Wins = 0;

  metrics.forEach((m) => {
    if (m.site1Winner) site1Wins++;
    if (m.site2Winner) site2Wins++;
  });

  return { site1: site1Wins, site2: site2Wins };
}

// ===== Component =====

export default function ComparePage() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [compareResult, setCompareResult] = useState<CompareResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCompare(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setCompareResult(null);

    const normalizeUrl = (u: string) => {
      const trimmed = u.trim();
      return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    };

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url1: normalizeUrl(url1),
          url2: normalizeUrl(url2),
        }),
      });

      const data: CompareResult = await res.json();
      setCompareResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const bothResultsValid =
    compareResult &&
    isSeoResult(compareResult.site1) &&
    isSeoResult(compareResult.site2);

  const metrics =
    bothResultsValid && compareResult
      ? getComparisonMetrics(
          compareResult.site1 as SeoResult,
          compareResult.site2 as SeoResult
        )
      : [];

  const wins = metrics.length > 0 ? countWinners(metrics) : { site1: 0, site2: 0 };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Compare{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Two Websites
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Analyze and compare the SEO performance of two websites side by side. See which site is winning on every metric.
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleCompare} className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* URL 1 Input */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 rounded-2xl blur-lg opacity-20 group-focus-within:opacity-50 transition-all duration-500 pointer-events-none"></div>
                <div className="relative flex flex-col">
                  <label htmlFor="url1-input" className="text-sm font-semibold text-slate-700 mb-2">
                    Website 1
                  </label>
                  <div className="flex items-center gap-3 px-5 h-14 bg-white rounded-xl border border-slate-200 group-focus-within:border-indigo-400 group-focus-within:ring-4 group-focus-within:ring-indigo-500/20 transition-all duration-300 shadow-sm hover:shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 flex-shrink-0"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <input
                      id="url1-input"
                      type="text"
                      value={url1}
                      onChange={(e) => setUrl1(e.target.value)}
                      placeholder="https://example.com"
                      disabled={isLoading}
                      className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none disabled:opacity-50"
                      autoComplete="url"
                      spellCheck={false}
                    />
                  </div>
                </div>
              </div>

              {/* URL 2 Input */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-sky-500 rounded-2xl blur-lg opacity-20 group-focus-within:opacity-50 transition-all duration-500 pointer-events-none"></div>
                <div className="relative flex flex-col">
                  <label htmlFor="url2-input" className="text-sm font-semibold text-slate-700 mb-2">
                    Website 2
                  </label>
                  <div className="flex items-center gap-3 px-5 h-14 bg-white rounded-xl border border-slate-200 group-focus-within:border-purple-400 group-focus-within:ring-4 group-focus-within:ring-purple-500/20 transition-all duration-300 shadow-sm hover:shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-5 h-5 text-slate-400 group-focus-within:text-purple-500 flex-shrink-0"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <input
                      id="url2-input"
                      type="text"
                      value={url2}
                      onChange={(e) => setUrl2(e.target.value)}
                      placeholder="https://example.com"
                      disabled={isLoading}
                      className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none disabled:opacity-50"
                      autoComplete="url"
                      spellCheck={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Compare Button */}
            <button
              type="submit"
              disabled={isLoading || !url1.trim() || !url2.trim()}
              className={`w-full h-14 flex items-center justify-center gap-2 font-bold text-white bg-gradient-to-br from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 hover:shadow-lg hover:shadow-indigo-500/20 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 active:scale-[0.98] rounded-xl shadow-md relative overflow-hidden group ${
                !isLoading && url1.trim() && url2.trim() ? "hover:scale-105" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Comparing Websites...</span>
                </>
              ) : (
                <>
                  <span>Compare</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-5 h-5"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <p className="font-medium">Error: {error}</p>
            </div>
          )}

          {/* Results Section */}
          {compareResult && (
            <div className="space-y-8 animate-fade-in">
              {/* Summary Card */}
              {bothResultsValid && (
                <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Summary
                  </h2>
                  <div className="flex gap-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-indigo-600">{wins.site1}</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Website 1 wins</p>
                        <p className="text-lg font-bold text-slate-900">{wins.site1}/{metrics.length} checks</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-purple-600">{wins.site2}</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Website 2 wins</p>
                        <p className="text-lg font-bold text-slate-900">{wins.site2}/{metrics.length} checks</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Results Grid - Two Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Site 1 Results */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {isSeoResult(compareResult.site1)
                      ? new URL(compareResult.site1.url).hostname
                      : "Website 1"}
                  </h2>

                  {isError(compareResult.site1) ? (
                    <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
                      <p className="font-semibold text-red-700 mb-1">Error Analyzing Site</p>
                      <p className="text-red-600">{compareResult.site1.error}</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Score Card */}
                      <div className="h-80">
                        <ScoreCard score={compareResult.site1.score} />
                      </div>

                      {/* Metrics Cards */}
                      {metrics.map((metric, idx) => (
                        <div
                          key={`site1-${idx}`}
                          className={`p-5 rounded-xl border-2 transition-all ${
                            metric.site1Winner
                              ? "bg-emerald-50 border-emerald-300 shadow-md shadow-emerald-100"
                              : metric.site2Winner
                              ? "bg-gray-50 border-gray-200"
                              : "bg-slate-50 border-slate-200"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-semibold text-slate-700">{metric.label}</p>
                              <p className="text-xl font-bold text-slate-900 mt-1">
                                {metric.site1Value}
                              </p>
                            </div>
                            {metric.site1Winner && (
                              <div className="px-3 py-1 bg-emerald-200 text-emerald-700 text-xs font-bold rounded-full">
                                Winner
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Site 2 Results */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {isSeoResult(compareResult.site2)
                      ? new URL(compareResult.site2.url).hostname
                      : "Website 2"}
                  </h2>

                  {isError(compareResult.site2) ? (
                    <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
                      <p className="font-semibold text-red-700 mb-1">Error Analyzing Site</p>
                      <p className="text-red-600">{compareResult.site2.error}</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Score Card */}
                      <div className="h-80">
                        <ScoreCard score={compareResult.site2.score} />
                      </div>

                      {/* Metrics Cards */}
                      {metrics.map((metric, idx) => (
                        <div
                          key={`site2-${idx}`}
                          className={`p-5 rounded-xl border-2 transition-all ${
                            metric.site2Winner
                              ? "bg-emerald-50 border-emerald-300 shadow-md shadow-emerald-100"
                              : metric.site1Winner
                              ? "bg-gray-50 border-gray-200"
                              : "bg-slate-50 border-slate-200"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-semibold text-slate-700">{metric.label}</p>
                              <p className="text-xl font-bold text-slate-900 mt-1">
                                {metric.site2Value}
                              </p>
                            </div>
                            {metric.site2Winner && (
                              <div className="px-3 py-1 bg-emerald-200 text-emerald-700 text-xs font-bold rounded-full">
                                Winner
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!compareResult && !isLoading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-8 h-8 text-slate-400"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <p className="text-slate-500">
                Enter two website URLs above to compare their SEO performance.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
