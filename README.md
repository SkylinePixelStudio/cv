# Dr. Karunanithi Rajamanickam — Academic Portfolio

Personal portfolio and academic landing page for **Dr. Karunanithi Rajamanickam, Ph.D.**

**Live features:**
- Academic profile, experience timeline, and research interests
- Full publications list (30+ papers) with category filtering
- Entrepreneurial ventures: Skyline Pixel Studio & ACAD
- Apps showcase: foundation.acadapp.in, smartcv.acadapp.in, tymr.acadapp.in, eBooks
- Awards & honours section
- Contact section

## 🚀 Deploy to Vercel

### Option 1 — Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2 — Vercel Dashboard
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import the repository → Deploy (no build config needed)

## 🐙 Deploy to GitHub Pages

1. Push this folder to a GitHub repository (e.g. `your-username/portfolio`)
2. Go to **Settings → Pages**
3. Set **Source** to `Deploy from a branch` → `main` → `/ (root)`
4. Your site will be live at `https://your-username.github.io/portfolio`

> **Tip:** If deploying to a subdirectory on GitHub Pages, no changes needed — all asset paths are relative.

## 📁 File Structure

```
portfolio/
├── index.html          # Main page (all sections)
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Animations, filtering, interactions
├── vercel.json         # Vercel deployment config
└── README.md
```

## ✏️ Customisation

- **Update publications:** Edit the `.pub-item` blocks in `index.html`
- **Update contact / links:** Search for `akr.karunanithi@gmail.com` and the URL references
- **Change colours:** Edit CSS variables at the top of `style.css`
- **Add photo:** Place `photo.jpg` in the root and add an `<img>` tag in the hero section

## Tech Stack
Pure HTML · CSS · Vanilla JS — zero dependencies, zero build step.
