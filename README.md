# Lambda Phi Epsilon — UC Berkeley (Delta Chapter) Website

The chapter website. Built with React + Vite + Tailwind CSS, but you don't need to
know any of those deeply to make the most common edits — see the cheat sheet below.

## Running the site on your computer

You need [Node.js](https://nodejs.org) installed. Then, in this folder:

```bash
npm install     # first time only — downloads dependencies
npm run dev     # starts the site at http://localhost:3000 and opens your browser
```

The page auto-refreshes as you save changes to files. Stop the server with Ctrl+C.

## Publishing your changes (deploy)

```bash
npm run build    # bundles the site into the build/ folder
npm run deploy   # pushes the build to GitHub Pages (the live site)
```

Always run `npm run build` first, then `npm run deploy`. Give it a few minutes
to go live. Also commit and push your source changes to git so the next person
has them.

## "I want to change X — which file do I edit?"

| I want to… | Edit this file |
|---|---|
| Add or remove a **brother** | `src/pages/BrothersPage.tsx` — drop their photo in `src/images/headshots/`, import it at the top, add an entry to the `brothers` list |
| Change **executive board** members | `src/pages/ExecutiveBoardPage.tsx` — the `cabinet` and `chairs` lists |
| Update **rush events / dates / info** | `src/pages/RushPage.tsx` — the `rushEvents` list near the top |
| Change **home page** photos or stats | `src/pages/HomePage.tsx` — photos are imported at the top, gallery order is `photoGallery` |
| Edit **chapter history / about text** | `src/pages/AboutPage.tsx` — the `timelineEvents` and `pillars` lists |
| Update **alumni** profiles | `src/pages/AlumniPage.tsx` — the `allAlumni` list |
| Change the **top menu** or un-hide pages | `src/Header.tsx` — some menu buttons point to the "Coming Soon" page; comments in the file show how to re-enable them |
| Edit the **footer** (links, contact, socials) | `src/Footer.tsx` |
| Change **site colors or fonts** | `src/styles.css` — all colors are named at the top in the `@theme` block |
| Swap a **photo** | Put the new file in `src/images/` and update the `import` line in whichever page uses it |

## How the site is organized

```
src/
  main.tsx             starts the app (never needs editing)
  App.tsx              decides which page is shown; wraps pages with Header/Footer
  Header.tsx           top navigation bar (desktop + mobile)
  Footer.tsx           footer on every page
  ImageWithFallback.tsx helper that shows a placeholder if a photo fails to load
  styles.css           the one stylesheet: colors, fonts, special effects
  pages/               one file per page of the site
  images/              all photos; brother headshots live in images/headshots/
```

There are no URLs for individual pages — navigation works by clicking the menu,
which tells `App.tsx` which page component to show.

Styling is done with [Tailwind](https://tailwindcss.com) utility classes written
directly on the elements (e.g. `className="px-6 py-3 bg-navy"`). Color names like
`navy`, `surface`, `off-white`, and `muted` are defined in `src/styles.css`.

## Notes for the next tech chair

- The **Executive Board**, **Alumni**, and **Login** pages exist but are hidden —
  their menu buttons currently show a "Coming Soon" page. `src/Header.tsx` has
  comments showing exactly what to change to turn them back on.
- The **login / brothers portal** (`LoginPage.tsx`, `ProtectedContent.tsx`) uses a
  fake login and is slated to be replaced with real authentication.
- The rush page embeds an Instagram reel; if it shows up blank, that's Instagram
  rate-limiting, not a bug in the site.
