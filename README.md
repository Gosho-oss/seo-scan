# SEOScan 🚀

**Free and open-source SEO Analyzer**  
Audit your website's SEO instantly — check meta tags, headings, images, and get a simple SEO score. Built with modern premium UI/UX animations.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/Gosho-oss/seo-scan/pulls)

---

## ✨ Features

### SEO Analysis
- ✅ **Meta tags analysis** — Title, meta description, Open Graph
- ✅ **Heading structure check** — H1, H2, H3 validation
- ✅ **Image alt attribute detection** — Identifies missing alt text
- ✅ **SEO Score (0–100)** — Instant scoring with color indicators
- ✅ **Fully local processing** — No external APIs required

### Premium UI/UX
- ✨ **Smooth animations** — Scroll-triggered fade-ins, hover effects, transitions
- ✨ **Animated score counter** — Score animates 0 → final value
- ✨ **Interactive cards** — Lift on hover, color shifts, icon rotations
- ✨ **Active navigation** — Smart scroll detection with animated underlines
- ✨ **Progress indicators** — Animated progress lines, pulsing dots
- ✨ **SaaS-grade polish** — Glows, gradients, and sophisticated transitions

---

## How it Works

1. Enter your website URL
2. Click "Analyze"
3. Get an instant SEO report

---

## 🎬 Animation & Premium Features

This SaaS-grade SEO analyzer features sophisticated, performance-optimized animations:

### Scroll-Triggered Animations
- **Features Section** — Cards fade-up sequentially on scroll (500ms cubic-bezier)
- **How It Works** — Steps animate with progress line fill animation
- **Footer** — Fades in smoothly when scrolled into view

### Interactive Elements
- **Navbar** — Active link underlines animate, dots pulse
- **Hero Input** — Icon rotates and scales on focus, button has shine overlay
- **Score Card** — Counter animates 0 → final value (1.5s duration)
- **Result Cards** — Staggered slide-up animations with hover lift effects

### Hover Effects
- **Cards** — Lift (-0.5rem), shadow expands, border color shifts
- **Icons** — Rotate 6°, scale 110–125%, color transitions
- **Links** — Arrow slides, text color shifts, underlines animate
- **Buttons** — Background gradient shifts, scale effects, smooth transitions

### Performance Optimized
- ✅ GPU-accelerated transforms (transform, opacity only)
- ✅ CSS transitions (300–1000ms) for smooth 60fps animations
- ✅ IntersectionObserver for efficient scroll detection
- ✅ No heavy animation libraries — pure CSS + React hooks
- ✅ Lazy animations (only for visible elements)

---

## Demo

https://seo-scan1.vercel.app/

<img width="1512" height="862" alt="Screenshot 2026-04-10 at 11 53 28 AM" src="https://github.com/user-attachments/assets/c4d02b14-3c6d-4d3f-b0f3-d423af3f13bd" />

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Gosho-oss/seo-scan.git
cd seo-scan
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
seo-scan/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts              # API endpoint: fetches & parses HTML
│   ├── components/
│   │   ├── Navbar.tsx                # Premium nav with active indicators
│   │   ├── HeroSection.tsx           # Animated hero with gradient text
│   │   ├── UrlInput.tsx              # Input with glow & icon animations
│   │   ├── FeaturesSection.tsx       # Feature cards with scroll animations
│   │   ├── HowItWorksSection.tsx     # Steps with progress line animations
│   │   ├── ScoreCard.tsx             # Animated score counter (0 → final)
│   │   ├── ResultsGrid.tsx           # Results cards with staggered animations
│   │   └── Footer.tsx                # Footer with fade-in animations
│   ├── hooks/
│   │   └── useScrollAnimation.ts     # Scroll trigger animation hook
│   ├── lib/
│   │   └── seo-analyzer.ts           # SEO analysis logic
│   ├── types/
│   │   └── seo.ts                    # TypeScript types
│   ├── globals.css                   # Global animations & styles
│   ├── layout.tsx
│   ├── page.tsx                      # Main page
│   └── constants.ts
├── public/
├── eslint.config.mjs
├── next.config.ts
├── tsconfig.json
├── package.json
├── README.md
└── CLAUDE.md
```

---

## SEO Score Breakdown

The score is calculated out of 100 based on four checks:

| Check | Points | Criteria |
|---|---|---|
| **Title tag** | 30 pts | Present + optimal length (30–60 chars) |
| **Meta description** | 30 pts | Present + optimal length (50–160 chars) |
| **H1 heading** | 20 pts | Exactly one H1 on the page |
| **Image alt text** | 20 pts | All images have `alt` attributes |

**Score colors:**
- 🟢 **Green** — 70–100 (Good)
- 🟡 **Yellow** — 40–69 (Needs work)
- 🔴 **Red** — 0–39 (Poor)

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **Styling** | Tailwind CSS 3.4 |
| **HTML Parsing** | Cheerio (server-side only) |
| **Animations** | CSS transitions + React hooks (no external libraries) |
| **State Management** | React hooks (useState, useEffect, useRef) |
| **Performance** | IntersectionObserver API for scroll triggers |

### Key Dependencies
- `next` — Next.js framework
- `cheerio` — Fast HTML parsing for server-side SEO analysis
- `tailwindcss` — Utility-first CSS framework
- `typescript` — Type safety

### No Heavy Animations Libraries
Unlike other SaaS apps, **SEOScan uses zero external animation libraries** (no Framer Motion, GSAP, etc.). All animations are:
- Pure CSS transitions and keyframes
- React hooks for scroll triggers
- GPU-accelerated transforms
- Optimized for performance

---

## 🔄 Recent Updates (v2.0)

### Premium UI/UX Overhaul ✨
- **Complete animation rework** — Added 15+ sophisticated animations across all sections
- **Scroll-triggered effects** — Custom `useScrollAnimation` hook for IntersectionObserver-based triggers
- **Enhanced Navbar** — Active section detection with animated underlines and pulse indicators
- **Animated Score Counter** — Score displays instantly while ring animates 0 → value
- **Interactive Cards** — Hover effects with lift, shadow expansion, and color transitions
- **Premium Polish** — Glows, gradients, and micro-interactions throughout

### Bug Fixes 🐛
- **Fixed ScoreCard animation bug** — Score now displays correctly immediately (was stuck showing 0)
- **Improved state management** — Separated display score from animation score
- **Better dependency tracking** — Animations now properly re-run on new results

---

## Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a [Pull Request](https://github.com/Gosho-oss/seo-scan/pulls)

### Ideas for future contributions

- [ ] Open Graph tags check (`og:title`, `og:image`, etc.)
- [ ] Canonical URL checker
- [ ] Page load speed hints
- [ ] Export results as JSON or PDF
- [ ] Batch URL analysis
- [ ] Browser extension version

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Author

Made by [Gosho-oss](https://github.com/Gosho-oss)  
If this project helped you, consider giving it a ⭐!
