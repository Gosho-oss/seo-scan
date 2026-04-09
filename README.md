# SEOScan 🚀

**Free and open-source SEO Analyzer**  
Audit your website's SEO instantly — check meta tags, headings, images, and get a simple SEO score.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/Gosho-oss/seo-scan/pulls)

---

## Features

- ✅ Meta tags analysis (title, description)
- ✅ Heading structure check (H1, H2, H3)
- ✅ Detect missing image alt attributes
- ✅ SEO Score (0–100) with color indicator
- ✅ Clean, modern UI
- ✅ Fully local, no API required

---

## How it Works

1. Enter your website URL
2. Click "Analyze"
3. Get an instant SEO report

---

## Demo

[Insert your live demo link here, e.g., Vercel or localhost]

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
│   │       └── route.ts     # Fetches & parses HTML with Cheerio
│   ├── layout.tsx
│   └── page.tsx             # Main page
├── public/
├── CLAUDE.md                # AI assistant context
├── next.config.ts
├── package.json
└── README.md
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
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| HTML Parsing | Cheerio |

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
If this project helped you, consider giving it a ⭐