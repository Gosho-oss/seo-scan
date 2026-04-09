"use client";

import { FormEvent, useState } from "react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export default function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    const normalized = trimmed.startsWith("http")
      ? trimmed
      : `https://${trimmed}`;
    onSubmit(normalized);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative group animate-fade-in-up delay-400">
      {/* Premium gradient background glow with animation */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 rounded-3xl blur-xl opacity-20 group-focus-within:opacity-50 group-hover:opacity-35 transition-all duration-500 pointer-events-none animate-pulse animation-delay-1000"></div>

      <div className="relative flex flex-col sm:flex-row shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 bg-white rounded-2xl border border-slate-200 overflow-hidden group-focus-within:ring-4 group-focus-within:ring-indigo-500/20 group-focus-within:border-indigo-400 group-hover:border-indigo-300 transition-all duration-300">
        {/* Left input section */}
        <label htmlFor="url-input" className="sr-only">Website URL</label>

        <div className="relative flex-1 flex items-center bg-white">
          {/* Animated icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-5 h-5 absolute left-6 text-slate-400 group-focus-within:text-indigo-500 group-focus-within:scale-110 group-focus-within:rotate-12 transition-all duration-300"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z" />
          </svg>

          {/* Input field */}
          <input
            id="url-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://example.com"
            disabled={isLoading}
            className="w-full h-16 sm:h-20 pl-14 pr-4 bg-transparent text-slate-800 placeholder-slate-400 text-lg font-medium focus:outline-none disabled:opacity-50 transition-all"
            autoComplete="url"
            spellCheck={false}
          />
        </div>

        {/* Analyze button with premium effects */}
        <button
          id="analyze-btn"
          type="submit"
          disabled={isLoading || !value.trim()}
          className={`h-16 sm:h-[calc(5rem-8px)] px-10 flex items-center justify-center gap-2 font-bold text-white bg-gradient-to-br from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 hover:shadow-lg hover:shadow-indigo-500/20 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 active:scale-[0.98] m-1 rounded-xl shadow-md relative overflow-hidden group-hover:ring-2 group-hover:ring-indigo-500/50 ${
            !isLoading && value.trim() ? "group-hover:scale-105" : ""
          }`}
        >
          {/* Animated background shine on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Button content */}
          <div className="relative z-10 flex items-center gap-2">
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
                <span>Scanning</span>
              </>
            ) : (
              <>
                <span>Analyze</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  className="w-4 h-4 ml-1 translate-y-[1px] group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </div>
        </button>
      </div>
    </form>
  );
}
