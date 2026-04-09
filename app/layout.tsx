import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SEO Analyzer — Audit Any Website Instantly",
  description:
    "Free, no-signup SEO audit tool. Enter any URL to instantly analyse title tags, meta descriptions, heading structure, image alt attributes, and get an overall SEO score.",
  keywords: ["SEO", "SEO checker", "website audit", "meta tags", "title tag"],
  openGraph: {
    title: "SEO Analyzer — Audit Any Website Instantly",
    description:
      "Free real-time SEO audit. Enter any URL and get a score, title analysis, meta tags check, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-slate-900 min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}
