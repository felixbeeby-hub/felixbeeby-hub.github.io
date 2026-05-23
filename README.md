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

## How to add things

**Add an episode / sketch / season / cast member:** edit
`data/snl-data.js` only. Pages update automatically.

- Each sketch has **two scores**, one per rater listed in
  `SNL_DATA.raters` (currently `F` and `O`):
  `scores: { F: 8, O: 7 }`. Use `null` for a rating not given yet
  (shows `—`). Episode and cast averages are computed per rater.
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
