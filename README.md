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
├── hosts.html            Hosts
├── musical-guests.html   Musical guests
├── data/
│   └── snl-data.js        ← ALL content lives here
└── assets/
    ├── css/
    │   └── styles.css     Shared styles for every page
    └── js/
        ├── site.js        Shared: header, nav, footer, US/UK toggle, helpers
        ├── home.js        Home page logic
        ├── seasons.js     Seasons page logic
        ├── cast.js        Cast pages logic (shared by both cast pages)
        └── hosts.js       Hosts + Musical Guests logic (shared)
```

## Core principles

1. **One HTML file per nav tab.** Built: home, seasons, cast, alumni,
   hosts, musical guests.
   Unbuilt pages show a "soon" badge in the nav.
2. **No data in HTML.** Every piece of content is read from
   `data/snl-data.js`. The HTML files are empty shells.
3. **The header/nav/footer are defined once** in `site.js`.
4. **Derived values are computed, never stored** — episode averages and
   cast member stats are calculated from sketch scores at render time.

## Data model

`data/snl-data.js` holds two regions (`us`, `uk`). Each region has:

- **`cast`** — cast members keyed by id. Fields: `name`, `status`
  (`current` | `alumni`), `role`, `seasons`, `bio`, optional `photo`.
- **`hosts`** / **`music`** — hosts and musical guests keyed by id.
  Fields: `name`, `bio`, optional `photo`.
- **`seasons`** — seasons → episodes → sketches. Each episode names its
  `host` and `musicalGuest` **by id**. Each sketch lists the people in
  it **by id**: `cast: [...]`, `hosts: [...]`, `music: [...]`.

The id is the join key: the cast / hosts / music pages cross-reference
every sketch to derive each person's per-rater average and appearance
count. Host photos live in `assets/images/hosts/`.

## How to add things — from the website

Click **✎ Edit** (top-right of the header). The first time, it asks for a
GitHub token (instructions + link are in the popup; it's stored in that
browser only). In edit mode:

- **Seasons page** — `+ Season`, `✎` next to the season pills to renumber /
  delete, `+ Add episode` at the bottom, `✎` on each episode, `+ Add sketch`
  inside each episode, `✎` / `↑` / `↓` on each sketch.
- **Sketch form** — title, F/O scores, notes, and tap-to-tag chips for cast,
  host and musical guest. **Save & add another** keeps the form open so you
  can log a whole episode in one go.
- **Episode form** — host / musical guest are type-ahead; a name that
  doesn't exist yet is created automatically.
- **Cast / Hosts / Musical Guests pages** — `+ Add …` and `✎` on each card
  (name, status, role, seasons like `47-51`, bio, photos). Picking a photo
  file uploads it to `assets/images/cast/` or `assets/images/hosts/`.

Every save is one commit to `data/snl-data.js` (the editor fetches the
latest file first, so two people editing at once don't clobber each other).
GitHub Pages takes ~1 minute to redeploy; your own browser shows the change
immediately. Click **✓ Done** to leave edit mode. Code: `assets/js/editor.js`.

### Editing data.js by hand (still works)

The editor rewrites `data/snl-data.js` in a fixed format on every save, so
hand-written comments there won't survive — everything else is fine.

- Scores: `scores: { F: 8, O: 7 }`, `null` = not rated yet.
- Sketch people by id: `cast: ["kenan"], hosts: ["dua_lipa"], music: []`.

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
