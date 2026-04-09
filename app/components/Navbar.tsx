"use client";

import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Determine active section
      const sections = ["hero", "features", "how-it-works"];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  const navLinks = [
    { label: "Features", id: "features" },
    { label: "How it works", id: "how-it-works" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl shadow-lg shadow-indigo-500/5 border-slate-200/50 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo with hover effect */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 group hover:opacity-80 transition-opacity duration-300 relative"
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:scale-110 transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="w-4 h-4"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 -z-10"></div>
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-lg">
            SEO<span className="text-indigo-600">Scan</span>
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="relative text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-300 group"
            >
              {link.label}
              {/* Animated underline */}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ${
                  activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
              {/* Active indicator dot */}
              {activeSection === link.id && (
                <span className="absolute -bottom-3 left-1/2 w-1.5 h-1.5 rounded-full bg-indigo-600 transform -translate-x-1/2 animate-pulse"></span>
              )}
            </button>
          ))}
        </nav>

        {/* Empty space to maintain layout */}
        <div className="w-32" />
      </div>
    </header>
  );
}
