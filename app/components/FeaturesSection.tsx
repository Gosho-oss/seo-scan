"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function FeaturesSection() {
  const { elementRef, isVisible } = useScrollAnimation();

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      ),
      title: "Meta Tags Analysis",
      description: "Check your title tags, meta descriptions, and Open Graph tags to ensure they're SEO-optimized and display correctly in search results.",
      color: "indigo",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path d="M5 12h14M12 5l7 7-7 7" />
          <path d="M9 12h6" />
        </svg>
      ),
      title: "Heading Structure Analysis",
      description: "Ensure your H1, H2, and H3 tags are properly structured for better readability and SEO performance.",
      color: "purple",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      ),
      title: "Image Alt Detection",
      description: "Identify images missing alt text attributes that could impact accessibility and hurt your SEO rankings.",
      color: "sky",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: "SEO Scoring",
      description: "Get an instant SEO score with detailed recommendations to improve your website's visibility and rankings.",
      color: "emerald",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <rect x="3" y="3" width="8" height="18" />
          <rect x="13" y="3" width="8" height="18" />
          <path d="M9 9h6M9 15h6" />
        </svg>
      ),
      title: "Side-by-Side Comparison",
      description: "Compare two websites head-to-head across all SEO metrics. See which site wins each check and get an overall winner summary.",
      color: "pink",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <circle cx="12" cy="12" r="1" />
          <path d="M12 7v10M12 7l-3 3m3-3l3 3" />
          <path d="M8 17h8M9 20h6" />
          <rect x="5" y="3" width="14" height="2" rx="1" />
        </svg>
      ),
      title: "Robots.txt Analysis",
      description: "Verify your robots.txt file exists and is accessible to search engines. Missing robots.txt can lead to unwanted page crawling.",
      color: "cyan",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
          <path d="M12 10v4M10 12h4" />
        </svg>
      ),
      title: "Sitemap Detection",
      description: "Check if your sitemap.xml is present and properly linked. A valid sitemap helps search engines index your content faster.",
      color: "orange",
    },
  ];

  const colorClasses = {
    indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    sky: "bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white",
    emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    pink: "bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
    cyan: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white",
    orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
  };

  return (
    <section
      ref={elementRef}
      id="features"
      className="w-full py-20 md:py-32 px-6 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Powerful Features
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive SEO analysis powered by advanced DOM parsing and real-time metrics. Everything you need in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: isVisible ? `${150 + idx * 100}ms` : "0ms",
              }}
            >
              {/* Gradient background animation on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 transition-all duration-500 pointer-events-none" />

              {/* Icon Container with rotation animation */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 ${
                  colorClasses[feature.color as keyof typeof colorClasses]
                }`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed relative z-10">{feature.description}</p>

              {/* Bottom accent line animation */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" />

              {/* Side accent glow */}
              <div className="absolute -right-8 top-1/2 w-16 h-16 bg-indigo-500/10 rounded-full group-hover:bg-indigo-500/20 blur-2xl transition-all duration-500 -translate-y-1/2 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
