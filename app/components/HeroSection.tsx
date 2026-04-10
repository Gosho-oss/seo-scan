"use client";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto pt-28 pb-12 relative z-10">
      {/* Badge with improved animation */}
      <div className="animate-fade-in-up delay-100 inline-flex flex-row items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white border border-slate-200/60 shadow-sm text-slate-800 text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:border-indigo-300/50 transition-all duration-300 cursor-pointer group backdrop-blur-sm bg-white/80">
        <span className="relative flex h-2 w-2 mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        V2.0 is live
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="w-3.5 h-3.5 ml-1 text-slate-400 group-hover:translate-x-1 transition-transform duration-300"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      {/* Main headline with premium animations */}
      <h1 className="animate-fade-in-up delay-200 text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
        Audit your website&apos;s SEO{" "}
        <br className="hidden md:block" />
        <span className="inline-block relative">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] animate-gradient-slow relative whitespace-nowrap">
            in seconds
          </span>
          {/* Underline animation */}
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500 rounded-full -bottom-2"></span>
          {/* Decorative SVG */}
          <svg className="absolute w-full h-3 -bottom-2 left-0 text-indigo-400/20 animate-pulse" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </span>
      </h1>

      {/* Subtitle with fade-in */}
      <p className="animate-fade-in-up delay-300 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
        Paste your URL below and our powerful local parser will immediately grade your metadata, headers, accessibility,
        <span className="block mt-2 text-slate-600 font-semibold">and structure.</span>
      </p>

      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>
    </div>
  );
}
