# SNL Tracker

A personal site for tracking your progress watching *Saturday Night Live*
(US and UK editions).

## Running it

Just open `index.html` in a browser — no build step or server needed.

## Project structure

```
snl-tracker/
├── index.html            Home page
├── seasons.html          Seasons page (episode + sketch browser)
├── data/
│   └── snl-data.js        ← ALL content lives here (placeholder data)
└── assets/
    ├── css/
    │   └── styles.css     Shared styles for every page
    └── js/
        ├── site.js        Shared: header, nav, footer, US/UK toggle
        ├── home.js        Home page logic
        └── seasons.js     Seasons page logic
```

## Core principles

1. **One HTML file per nav tab.** Currently only `index.html` and
   `seasons.html` are built. Unbuilt pages show a "soon" badge in the nav.
2. **No data in HTML.** Every piece of content is read from
   `data/snl-data.js`. The HTML files are just empty shells that the
   scripts fill in.
3. **The header/nav/footer are defined once** in `site.js` and injected
   into every page, so there's a single place to edit them.

## How to add things

**Add an episode, sketch or season:** edit `data/snl-data.js` only.
Pages update automatically (including the Seasons dropdown in the nav).

- Sketch scores are `0`–`10`. Use `null` for "not rated yet" (shows as `—`).
- Episode "avg" scores are calculated automatically from sketch scores.

**Build a new page** (e.g. `cast.html`):

1. Create the HTML file (copy `seasons.html` as a starting shell).
2. In `site.js`, add the filename to `BUILT_PAGES`.
3. Write a page script in `assets/js/`.

The "soon" badge disappears and the nav link goes live.

## Notes / improvements added

- US/UK choice is remembered across pages (saved in `localStorage`).
- Episode boxes and sketches are keyboard-accessible accordions.
- Section cards on the home page are clickable shortcuts.
- The Seasons page URL carries the season (`seasons.html?season=51`), so
  it's refreshable and shareable.
- All data is in a `.js` file so the site works by double-clicking
  `index.html`. If you'd rather use a pure `.json` file, switch the
  scripts to `fetch()` — but that requires running a local server.
