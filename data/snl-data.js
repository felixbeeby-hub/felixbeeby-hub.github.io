/* ============================================================
   SNL TRACKER — DATA FILE
   ------------------------------------------------------------
   Single source of truth for all SNL content. Nothing is
   written directly into the HTML files.

   STRUCTURE
     regions.<us|uk>.cast      Cast registry, keyed by id
     regions.<us|uk>.hosts     Host registry, keyed by id
     regions.<us|uk>.music     Musical-guest registry, keyed by id
     regions.<us|uk>.seasons   Seasons → episodes → sketches

   Episodes reference a host and musicalGuest by id. Sketches
   reference cast / hosts / music by id arrays.

   CAST
     Each cast member has: name, status ("current" | "alumni"),
     role, seasons (roster), bio.
     Sketches reference cast members by id, e.g. cast: ["c1","c2"].
     Average scores & appearance counts are CALCULATED from the
     sketches — never stored here.

   SCORES
     Every sketch has TWO scores, one per rater in `raters`
     (F and O), e.g. scores: { F: 8, O: 7 }. Use `null` for
     a rating not given yet (shown as —).

   NOTE: All values are PLACEHOLDERS — replace as you watch.
   ============================================================ */

window.SNL_DATA = {

  /* The two people who score sketches. Rename/extend here and
     the whole site (badges, averages) follows automatically. */
  raters: ["F", "O"],
  regions: {

    /* ==================== UNITED STATES ==================== */
    us: {
      label: "US",
      fullLabel: "United States",
      network: "NBC",
      seasonWord: "Season",
      heroEyebrow: "Saturday Night Live · United States",
      heroTitle: "Live from<br>New York",

      hosts: {
        bad_bunny:          { name: "Bad Bunny",          bio: "" },
        placeholder_host_b: { name: "Placeholder Host B", bio: "Placeholder host bio." },
        placeholder_host_c: { name: "Placeholder Host C", bio: "" }
      },

      music: {
        doja_cat:            { name: "Doja Cat",                    bio: "" },
        placeholder_music_b: { name: "Placeholder Musical Guest B", bio: "Placeholder musical-guest bio." },
        placeholder_music_c: { name: "Placeholder Musical Guest C", bio: "" }
      },

      cast: {
        colin_jost: {
          name: "Colin Jost",
           photo: "colin_jost.jpg",
           photobig: ["colin_jost.jpg", "colin_intro.jpg"],
          status: "current",
          role: "Repertory",
          seasons: [51],
          bio: "An anchor of 'Weekend Update' who commonly portrays Pete Hegseth in the cold opens. <br>LEFT: Jost during Weekend Update. RIGHT: Jost during the SNL intro."
        },
        james_a_johnson: {
          name: "James Austin Johnson",
           photo: "jaj.jpg",
           photobig: ["jaj_trump.jpg", "jaj_intro.jpg"],
          status: "current",
          role: "Repertory",
          seasons: [49, 50, 51],
          bio: "JAJ has been a cast member since 2021 and (mostly just) impersonates Donald Trump - 14 times!<br>LEFT: Johnson as Trump. RIGHT: Johnson during the SNL intro."
        },
        kenan: {
          name: "Kenan Thompson",
          status: "current",
          role: "Repertory",
          seasons: [51],
          bio: ""
        },
        veronika: {
          name: "Veronika Slowikowska",
          status: "current",
          role: "Featured",
          seasons: [47, 48],
          bio: ""
        },
         andrew: {
          name: "Andrew Dismukes",
          status: "current",
          role: "Repertory",
          seasons: [47, 48],
          bio: ""
        },
        c5: {
          name: "Placeholder Cast Five",
          status: "alumni",
          role: "Weekend Update Anchor",
          seasons: [46, 47, 48, 49],
          bio: "Placeholder biography for a former Weekend Update anchor."
        }
      },

      seasons: [
        {
          id: 51,
          episodes: [
            {
              number: 1,
              title: "Episode 1",
              host: "bad_bunny",
              musicalGuest: "doja_cat",
              airDate: "4 October 2025",
              sketches: [
                { title: "Cold Open",      scores: { F: 5, O: null },    blurb: "A seemingly normal Cold Open with Pete Hegseth (Colin Jost) is interrupted by James Austin Johnson's Trump. His commentary during a freeze frame breaks the fourth wall and is the first of many (apparantly necessary) appearances of Donald Trump in S51's Cold Opens. ", cast: ["colin_jost", "james_a_johnson"], hosts: [], music: [] },
                { title: "Monologue",      scores: { F: 5, O: null },    blurb: "",   cast: [], hosts: [], music: [] },
                 { title: "Jeopardy",      scores: { F: 8, O: null },    blurb: "", cast: ["andrew", "kenan", "veronika"], hosts: [], music: [] },
                { title: "Weekend Update", scores: { F: null, O: null },    blurb: "Placeholder blurb for Weekend Update. Note the anchors and any standout desk pieces.",                  cast: ["c2", "c3"], hosts: [], music: [] }
              ]
            },
            {
              number: 2,
              title: "Episode 2",
              host: "placeholder_host_b",
              musicalGuest: "placeholder_music_b",
              airDate: "TBD",
              sketches: [
                { title: "Cold Open",         scores: { F: 6, O: null },    blurb: "Placeholder blurb for this cold open.",                                                      cast: ["c1", "c3"], hosts: [], music: [] },
                { title: "Recurring Sketch",  scores: { F: null, O: null }, blurb: "Placeholder blurb — this sketch has not been rated yet, so it shows a dash.",                 cast: ["c2", "c3"], hosts: ["placeholder_host_b"], music: ["placeholder_music_b"] },
                { title: "Ten-to-One Sketch", scores: { F: 8.5, O: null },  blurb: "Placeholder blurb for the weird late-in-the-show sketch.",                                    cast: ["c1"], hosts: ["placeholder_host_b"], music: [] }
              ]
            },
            {
              number: 3,
              title: "Episode 3",
              host: "placeholder_host_c",
              musicalGuest: "placeholder_music_c",
              airDate: "TBD",
              sketches: [
                { title: "Cold Open",         scores: { F: 7.5, O: null }, blurb: "Placeholder blurb for this cold open.",     cast: ["c1", "c2"], hosts: [], music: [] },
                { title: "Commercial Parody", scores: { F: 9, O: null },   blurb: "Placeholder blurb for a fake-ad sketch.",   cast: ["c2", "c3"], hosts: ["placeholder_host_c"], music: ["placeholder_music_c"] }
              ]
            }
          ]
        }
      ]
    },

    /* ==================== UNITED KINGDOM ==================== */
    uk: {
      label: "UK",
      fullLabel: "United Kingdom",
      network: "Sky TV",
      seasonWord: "Series",
      heroEyebrow: "Saturday Night Live · United Kingdom",
      heroTitle: "Live from<br>London",

      hosts: {
        placeholder_host_a: { name: "Placeholder Host A", bio: "Placeholder host bio." },
        placeholder_host_b: { name: "Placeholder Host B", bio: "" }
      },

      music: {
        placeholder_music_a: { name: "Placeholder Musical Guest A", bio: "Placeholder musical-guest bio." },
        placeholder_music_b: { name: "Placeholder Musical Guest B", bio: "" }
      },

      cast: {
        c1: {
          name: "Placeholder Cast One",
          status: "current",
          role: "Repertory",
          seasons: [1],
          bio: "Placeholder biography for a UK cast member."
        },
        c2: {
          name: "Placeholder Cast Two",
          status: "current",
          role: "Featured Player",
          seasons: [1],
          bio: "Placeholder biography for a UK cast member."
        },
        c3: {
          name: "Placeholder Cast Three",
          status: "alumni",
          role: "Repertory",
          seasons: [1],
          bio: "Placeholder biography for a former UK cast member."
        }
      },

      seasons: [
        {
          id: 1,
          episodes: [
            {
              number: 1,
              title: "Episode 1",
              host: "placeholder_host_a",
              musicalGuest: "placeholder_music_a",
              airDate: "TBD",
              sketches: [
                { title: "Cold Open", scores: { F: 8, O: null },    blurb: "Placeholder blurb for the UK cold open.", cast: ["c1", "c2"], hosts: ["placeholder_host_a"], music: ["placeholder_music_a"] },
                { title: "Monologue", scores: { F: null, O: null }, blurb: "Placeholder blurb — not yet rated.",      cast: ["c1"], hosts: ["placeholder_host_a"], music: [] }
              ]
            },
            {
              number: 2,
              title: "Episode 2",
              host: "placeholder_host_b",
              musicalGuest: "placeholder_music_b",
              airDate: "TBD",
              sketches: [
                { title: "Cold Open",    scores: { F: 7, O: null },   blurb: "Placeholder blurb for this UK cold open.", cast: ["c2", "c3"], hosts: ["placeholder_host_b"], music: ["placeholder_music_b"] },
                { title: "Sketch Title", scores: { F: 6.5, O: null }, blurb: "Placeholder blurb for a UK sketch.",       cast: ["c1", "c3"], hosts: ["placeholder_host_b"], music: [] }
              ]
            }
          ]
        }
      ]
    }

  }
};
