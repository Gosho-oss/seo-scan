"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function HowItWorksSection() {
  const { elementRef, isVisible } = useScrollAnimation();

  const steps = [
    {
      number: "01",
      title: "Enter Your URL",
      description: "Paste any website URL into our analyzer. No signup required—just share the link you want to audit.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
      color: "from-indigo-50 to-indigo-100",
    },
    {
      number: "02",
      title: "Analyze Instantly",
      description: "Our advanced parser scans your entire DOM in milliseconds, processing meta tags, headers, images, and more.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      color: "from-purple-50 to-purple-100",
    },
    {
      number: "03",
      title: "Get Your Report",
      description: "Receive detailed insights and actionable recommendations to improve your SEO score and rankings.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M8 12h8M8 16h8M8 8h8" />
        </svg>
      ),
      color: "from-emerald-50 to-emerald-100",
    },
  ];

  return (
    <section
      ref={elementRef}
      id="how-it-works"
      className="w-full py-20 md:py-32 px-6 relative z-10 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Simple, fast, and transparent. Get your SEO audit in three easy steps.
          </p>
        </div>

        {/* Steps Container with animated progress line */}
        <div className="relative">
          {/* Animated progress line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-0 w-full h-0.5 bg-gradient-to-r from-slate-200 via-indigo-300 to-slate-200 z-0">
            <div
              className={`h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-1000 ${
                isVisible ? "w-full" : "w-0"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`relative transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                } hover:translate-y-0`}
                style={{
                  transitionDelay: isVisible ? `${200 + idx * 150}ms` : "0ms",
                }}
              >
                {/* Step Card */}
                <div className="group relative h-full p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 hover:-translate-y-2 flex flex-col transform">
                  {/* Animated background gradient */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10`}
                  />

                  {/* Icon Container with animation */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-indigo-500/30 relative z-10">
                    {step.icon}
                  </div>

                  {/* Step Number with animation */}
                  <div className="text-5xl font-extrabold text-slate-200 leading-none mb-4 group-hover:text-slate-300 group-hover:translate-x-1 transition-all duration-500 relative z-10">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed flex-1 group-hover:text-slate-700 transition-colors duration-300 relative z-10">
                    {step.description}
                  </p>

                  {/* Dot indicator for step (positioned at top, visible during scroll) */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-indigo-600 group-hover:scale-125 transition-all duration-500 shadow-lg hidden md:block z-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
