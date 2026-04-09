"use client";

import { useEffect, useState } from "react";

interface ScoreCardProps {
  score: number;
}

export default function ScoreCard({ score }: ScoreCardProps) {
  const [displayScore, setDisplayScore] = useState(score);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Set the final display score immediately
    setDisplayScore(score);

    // Animate the ring from 0 to final value
    const duration = 1500; // ms
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(interval);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [score]);

  const tier =
    displayScore >= 75 ? "good" : displayScore >= 50 ? "medium" : "poor";

  const colorMap = {
    good: {
      ring: "stroke-emerald-500",
      text: "text-emerald-500",
      label: "Excellent",
      bg: "bg-emerald-50",
      badgeText: "text-emerald-700",
      border: "border-emerald-100",
    },
    medium: {
      ring: "stroke-yellow-500",
      text: "text-yellow-500",
      label: "Needs Improvement",
      bg: "bg-yellow-50",
      badgeText: "text-yellow-700",
      border: "border-yellow-100",
    },
    poor: {
      ring: "stroke-red-500",
      text: "text-red-500",
      label: "Critical Issues",
      bg: "bg-red-50",
      badgeText: "text-red-700",
      border: "border-red-100",
    },
  };

  const { ring, text, label, bg, badgeText, border } = colorMap[tier];

  // SVG ring properties
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (animatedScore / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center p-8 h-full bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 group overflow-hidden">
      {/* Animated background glow */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <h3 className="text-sm font-semibold text-slate-500 tracking-wide uppercase mb-6">
          Overall Score
        </h3>

        {/* Animated circular progress */}
        <div className="relative w-40 h-40 mb-2">
          <svg
            viewBox="0 0 140 140"
            className="w-full h-full -rotate-90"
            aria-hidden="true"
          >
            {/* Background ring */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              className="stroke-slate-100"
              strokeWidth="12"
            />
            {/* Animated score ring */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`${ring} transition-all duration-1000 ease-out`}
            />
          </svg>

          {/* Center score display - shows final score immediately */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-baseline gap-1">
              <span
                className={`text-5xl font-extrabold tracking-tight ${text} transition-all duration-500`}
              >
                {displayScore}
              </span>
              <span className="text-lg font-bold text-slate-300">/100</span>
            </div>
          </div>

          {/* Pulse/glow effect */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500 pointer-events-none" style={{
            background: tier === "good" ? "rgba(16, 185, 129, 0.3)" : tier === "medium" ? "rgba(234, 179, 8, 0.3)" : "rgba(239, 68, 68, 0.3)"
          }} />
        </div>

        {/* Status badge with animation */}
        <div
          className={`mt-6 px-4 py-1.5 rounded-full text-sm font-semibold border ${bg} ${badgeText} ${border} transform transition-all duration-500 group-hover:scale-105`}
        >
          {label}
        </div>

        {/* Descriptive text */}
        <p className="mt-4 text-sm text-slate-500 text-center max-w-[200px] leading-relaxed">
          {tier === "good"
            ? "Your page follows SEO best practices! 🎉"
            : tier === "medium"
            ? "A few tweaks could boost your rankings."
            : "Significant SEO issues require your attention."}
        </p>
      </div>
    </div>
  );
}
