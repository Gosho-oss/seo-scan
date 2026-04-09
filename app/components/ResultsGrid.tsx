"use client";

import type { SeoResult } from "@/app/types/seo";
import ScoreCard from "./ScoreCard";

interface ResultsGridProps {
  result: SeoResult;
}

// ---------- Helpers ----------

function LengthBadge({
  length,
  min,
  max,
}: {
  length: number;
  min: number;
  max: number;
}) {
  const ok = length >= min && length <= max;
  const empty = length === 0;
  return (
    <span
      className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        empty
          ? "bg-red-50 text-red-700 border border-red-100"
          : ok
          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
          : "bg-yellow-50 text-yellow-700 border border-yellow-100"
      }`}
    >
      {length} / {max}
    </span>
  );
}

function Card({
  icon,
  title,
  children,
  index = 0,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  index?: number;
}) {
  return (
    <div
      className={`flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 transform hover:-translate-y-1 group overflow-hidden animate-slideUpFade`}
      style={{ animationDelay: `${50 + index * 100}ms` }}
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-purple-50/0 to-indigo-50/0 group-hover:from-indigo-50 group-hover:via-purple-50/50 group-hover:to-indigo-50 transition-all duration-500 -z-10 rounded-2xl" />

      {/* Icon with animation */}
      <div className="flex items-center gap-3 text-slate-800 relative z-10">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:scale-110 group-hover:rotate-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
          {icon}
        </div>
        <h3 className="font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Accent bottom line */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent w-0 group-hover:w-full transition-all duration-500" />

      {/* Glow effect */}
      <div className="absolute -right-12 top-1/2 w-24 h-24 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}

function CountPill({
  label,
  value,
  color = "indigo",
}: {
  label: string;
  value: number;
  color?: "indigo" | "purple" | "sky";
}) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
    sky: "bg-sky-50 text-sky-700 border-sky-100",
  };
  return (
    <div
      className={`flex flex-col items-center justify-center px-5 py-4 rounded-xl border ${colors[color]}`}
    >
      <span className="text-3xl font-black mb-1">{value}</span>
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 opacity-80">{label}</span>
    </div>
  );
}

// ---------- Icons ----------

const TitleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
    <path d="M4 7V4h16v3M9 20h6M12 4v16" />
  </svg>
);

const DescIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const HeadingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
    <path d="M4 12h16M4 6h7M4 18h7" />
  </svg>
);

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

// ---------- Main Component ----------

export default function ResultsGrid({ result }: ResultsGridProps) {
  return (
    <section className="w-full max-w-5xl mx-auto">
      {/* Banner with animation */}
      <div className="mb-8 px-5 py-4 rounded-xl bg-white shadow-sm border border-slate-200 text-slate-600 font-medium flex items-center justify-center gap-2 truncate hover:shadow-md hover:border-indigo-300 transition-all duration-300 animate-slideUpFade">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="w-5 h-5 text-indigo-500 shrink-0 animate-spin"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>Report for</span>
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-700 underline underline-offset-4 decoration-indigo-200 hover:decoration-indigo-500 font-semibold truncate transition-colors duration-300"
        >
          {result.url}
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 animate-slideUpFade" style={{ animationDelay: "50ms" }}>
          <ScoreCard score={result.score} />
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title Card */}
          <Card icon={<TitleIcon />} title="Title Tag" index={0}>
            {result.title ? (
              <div className="flex flex-col h-full justify-between">
                <p className="text-slate-700 text-base leading-relaxed line-clamp-3 mb-4 font-medium">
                  &ldquo;{result.title}&rdquo;
                </p>
                <div className="flex items-center text-sm text-slate-500 mt-auto pt-4 border-t border-slate-100">
                  Length:
                  <LengthBadge length={result.titleLength} min={10} max={60} />
                </div>
              </div>
            ) : (
              <p className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-lg border border-red-100">
                Missing &lt;title&gt; tag
              </p>
            )}
          </Card>

          {/* Meta Description Card */}
          <Card icon={<DescIcon />} title="Meta Description" index={1}>
            {result.metaDescription ? (
              <div className="flex flex-col h-full justify-between">
                <p className="text-slate-700 text-base leading-relaxed line-clamp-3 mb-4 font-medium">
                  &ldquo;{result.metaDescription}&rdquo;
                </p>
                <div className="flex items-center text-sm text-slate-500 mt-auto pt-4 border-t border-slate-100">
                  Length:
                  <LengthBadge
                    length={result.metaDescriptionLength}
                    min={50}
                    max={160}
                  />
                </div>
              </div>
            ) : (
              <p className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-lg border border-red-100">
                Missing Meta Description
              </p>
            )}
          </Card>

          {/* Headings Card */}
          <Card icon={<HeadingIcon />} title="Headings" index={2}>
            <div className="flex gap-4 mb-4">
              <CountPill label="H1" value={result.h1Count} color="indigo" />
              <CountPill label="H2" value={result.h2Count} color="purple" />
              <CountPill label="H3" value={result.h3Count} color="sky" />
            </div>
            <p className="text-sm font-medium pt-3 border-t border-slate-100">
              {result.h1Count === 0 ? (
                <span className="text-red-600">Missing H1 attribute.</span>
              ) : result.h1Count > 1 ? (
                <span className="text-yellow-600">
                  Multiple H1s found. Aim for exactly one.
                </span>
              ) : (
                <span className="text-emerald-600">
                  Perfect: Exactly one H1 tag.
                </span>
              )}
            </p>
          </Card>

          {/* Images Card */}
          <Card icon={<ImageIcon />} title="Image Alt Attributes" index={3}>
            <div className="flex items-center gap-6 mb-4 mt-2">
              <div className="flex flex-col">
                <span className="text-4xl font-extrabold text-slate-800">
                  {result.totalImages}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                  Total
                </span>
              </div>
              <div className="h-10 w-px bg-slate-200"></div>
              <div className="flex flex-col">
                <span
                  className={`text-4xl font-extrabold ${
                    result.imagesWithoutAlt === 0
                      ? "text-emerald-500"
                      : "text-red-500"
                  }`}
                >
                  {result.imagesWithoutAlt}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                  No Alt
                </span>
              </div>
            </div>
            <p className="text-sm font-medium pt-3 border-t border-slate-100">
              {result.imagesWithoutAlt === 0
                ? result.totalImages === 0
                  ? <span className="text-slate-500">No images on page.</span>
                  : <span className="text-emerald-600">
                      All images use alt attributes.
                    </span>
                : (
                    <span className="text-red-600">
                      {result.imagesWithoutAlt} image(s) missing alt text.
                    </span>
                  )}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
