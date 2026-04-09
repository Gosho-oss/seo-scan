"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Footer() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <footer
      ref={elementRef}
      className="w-full bg-gradient-to-b from-white to-slate-50 border-t border-slate-200 py-12 px-6 mt-20 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div
          className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 mb-8 border-b border-slate-200 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left Section - Logo & Tagline */}
          <div className="flex flex-col gap-2 group cursor-pointer">
            <div className="flex items-center gap-2 group-hover:opacity-80 transition-opacity duration-300">
              <div className="relative w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:shadow-indigo-500/50 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  className="w-3.5 h-3.5"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <span className="font-bold text-slate-900 text-lg">
                SEO<span className="text-indigo-600">Scan</span>
              </span>
            </div>
            <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
              Free and open-source SEO analyzer. Audit your website instantly without signing up or paying a dime.
            </p>
          </div>

          {/* Right Section - GitHub Link */}
          <a
            href="https://github.com/Gosho-oss/seo-scan"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 text-slate-700 hover:text-indigo-600 font-medium text-sm relative overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 transition-all duration-500 -z-10" />

            {/* GitHub Icon */}
            <svg
              className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>

            {/* Text */}
            <span className="relative z-10">View on GitHub</span>

            {/* Arrow */}
            <svg
              className="w-4 h-4 opacity-0 transition-all duration-300 transform group-hover:opacity-100 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Bottom Section */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center md:text-left hover:text-slate-700 transition-colors duration-300">
            Built with ❤️ | Open-source project
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="hover:text-slate-700 transition-colors duration-300 hover:underline"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-slate-700 transition-colors duration-300 hover:underline"
            >
              How it works
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
