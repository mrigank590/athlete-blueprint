# 🏋️ Athlete Blueprint

A sport-inspired workout planner built with React. Every exercise is chosen based on what elite athletes actually do — not just what looks good in a gym bro split.

**Live:** [yourusername.github.io/athlete-blueprint](https://yourusername.github.io/athlete-blueprint)

---

## What It Is

Most workout plans are built around muscle groups. This one is built around **performance demands** — the idea that athlete physiques come from movement patterns, not just bodybuilder logic.

Each exercise traces back to a specific sport and why that sport produces the best version of that body part:

| Day | Focus | Inspired By |
|-----|-------|-------------|
| D1 | Upper Push | Swimmers · Gymnasts |
| D2 | Lower — Quad | Track Cyclists · Sprinters |
| D3 | Upper Pull | Climbers · Rowers · Gymnasts |
| D4 | Lower — Power | Sprinters · Speed Skaters · Decathletes · Boxers |

---

## Features

- **4-day split** with two scheduling options (2+2 or spread)
- **Rest times per exercise** — no guessing between sets
- **Alternatives for every exercise** — swap based on available equipment
- **Schedule tab** — shows which days can go back-to-back and which need rest
- **Rest Rules tab** — signs of overtraining and the golden rule of the split

---

## Stack

- React (functional components + hooks)
- Pure CSS-in-JS (no external UI library)
- Deployed via GitHub Pages

---

## Run Locally

```bash
git clone https://github.com/yourusername/athlete-blueprint.git
cd athlete-blueprint
npm install
npm start
```

## Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:

```json
"homepage": "https://yourusername.github.io/athlete-blueprint",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:

```bash
npm run deploy
```

---

## Philosophy

> Bodybuilding creates muscles optimised for size and symmetry.  
> Sports physiques are optimised for performance demands.  
> That's why athlete physiques often look more naturally impressive — even if they're smaller.

---

## License

MIT
