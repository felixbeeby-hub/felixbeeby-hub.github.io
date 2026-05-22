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
├── cast.html             Current cast
├── cast-alumni.html      Alumni
├── data/
│   └── snl-data.js        ← ALL content lives here
└── assets/
    ├── css/
    │   └── styles.css     Shared styles for every page
    └── js/
        ├── site.js        Shared: header, nav, footer, US/UK toggle, helpers
        ├── home.js        Home page logic
        ├── seasons.js     Seasons page logic
        └── cast.js        Cast pages logic (shared by both cast pages)
```

## Core principles

1. **One HTML file per nav tab.** Built: home, seasons, cast, alumni.
   Unbuilt pages show a "soon" badge in the nav.
2. **No data in HTML.** Every piece of content is read from
   `data/snl-data.js`. The HTML files are empty shells.
3. **The header/nav/footer are defined once** in `site.js`.
4. **Derived values are computed, never stored** — episode averages and
   cast member stats are calculated from sketch scores at render time.

## Data model

`data/snl-data.js` holds two regions (`us`, `uk`). Each region has:

- **`cast`** — a registry of cast members keyed by id (`c1`, `c2`, …).
  Fields: `name`, `status` (`current` | `alumni`), `role`, `seasons`, `bio`.
- **`seasons`** — seasons → episodes → sketches. Each sketch lists its
  cast **by id**: `cast: ["c1", "c2"]`.

The id is the join key: the cast pages cross-reference every sketch to
work out each member's average score and appearance count.

## How to add things

**Add an episode / sketch / season / cast member:** edit
`data/snl-data.js` only. Pages update automatically.

- Sketch scores are `0`–`10`. Use `null` for "not rated yet" (shows `—`).
- Tag a sketch's cast with member ids, e.g. `cast: ["c1", "c3"]`.
- New cast member: add an entry to `cast` with a fresh id and a
  `status`. It appears on the matching cast page automatically.

**Build a new page** (e.g. `hosts.html`):

1. Create the HTML file (copy an existing shell).
2. In `site.js`, add the filename to `BUILT_PAGES`.
3. Write a page script in `assets/js/`.

## Notes / features

- US/UK choice is remembered across pages (`localStorage`).
- Episode boxes, sketches and cast cards are keyboard-accessible accordions.
- Cast chips on the Seasons page link through to that member's card
  (`cast.html?member=c1`), which auto-expands on arrival.
- All data is in a `.js` file so the site works by double-clicking
  `index.html`.
