"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import UrlInput from "./components/UrlInput";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import ResultsGrid from "./components/ResultsGrid";
import Footer from "./components/Footer";
import type { SeoApiResponse, SeoResult } from "./types/seo";

// ===== FEATURE 3: Utility function to generate JSON report =====
function generateJsonReport(result: SeoResult): void {
  // Extract domain from URL for filename
  const urlObj = new URL(result.url);
  const domain = urlObj.hostname.replace("www.", "");
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  // Build comprehensive report object
  const report = {
    url: result.url,
    analyzedAt: new Date().toISOString(),
    seoScore: result.score,
    title: {
      content: result.title,
      length: result.titleLength,
    },
    metaDescription: {
      content: result.metaDescription,
      length: result.metaDescriptionLength,
    },
    openGraph: {
      ogTitle: result.ogTitle,
      ogDescription: result.ogDescription,
      ogImage: result.ogImage,
    },
    canonicalUrl: result.canonicalUrl,
    headings: {
      h1: result.h1Count,
      h2: result.h2Count,
      h3: result.h3Count,
    },
    images: {
      total: result.totalImages,
      missingAlt: result.imagesWithoutAlt,
    },
  };

  // Convert to JSON and create blob
  const jsonString = JSON.stringify(report, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // Trigger download
  const link = document.createElement("a");
  link.href = url;
  link.download = `seoscan-report-${domain}-${today}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function Home() {
  const [result, setResult] = useState<SeoResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAnalyze(url: string) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    // Scroll slightly to simulate processing feel
    window.scrollTo({ top: 100, behavior: 'smooth' });

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data: SeoApiResponse = await res.json();

      if ("error" in data) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      
      {/* Background Animated Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <main className="flex-1 flex flex-col items-center px-6 pt-24 pb-12 md:pb-24 w-full">
        {/* ── Header ── */}
        <div id="hero" className="w-full">
          <HeroSection />
        </div>

        {/* ── Input ── */}
        <div className="w-full relative z-10 mb-8 md:mb-16">
          <UrlInput onSubmit={handleAnalyze} isLoading={isLoading} />
        </div>

        {/* ── Default State (Features & How it works) ── */}
        {!isLoading && !result && !error && (
          <>
            <FeaturesSection />
            <HowItWorksSection />
          </>
        )}

        {/* ── Loading Skeleton ── */}
        {isLoading && (
          <div
            aria-live="polite"
            className="w-full max-w-5xl mx-auto flex flex-col items-center animate-slideUpFade"
          >
            <div className="flex items-center gap-4 mb-12 px-8 py-4 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-slate-200/60">
              <svg className="animate-spin h-5 w-5 text-indigo-600" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span className="text-slate-700 font-semibold tracking-wide">Processing DOM structure...</span>
            </div>
            
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 opacity-60">
              <div className="h-80 bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-sm animate-pulse" />
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-48 bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-sm animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Error Handling ── */}
        {error && !isLoading && (
          <div className="w-full max-w-3xl mx-auto z-10 animate-slideUpFade mt-8">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg shadow-red-500/5 border-l-4 border-l-red-500 border-y border-r border-slate-200/60">
              <div className="bg-red-50 p-2 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-slate-800 text-lg mb-1">Analysis Failed</h3>
                <p className="text-slate-600 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {result && !isLoading && (
          <div className="w-full z-10 mt-8">
            <ResultsGrid result={result} />

            {/* ===== FEATURE 3: Download Report Button ===== */}
            <div className="w-full max-w-5xl mx-auto flex justify-center mt-12 animate-slideUpFade">
              <button
                onClick={() => generateJsonReport(result)}
                className="group flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Download Icon */}
                <svg
                  className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Report as JSON</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
