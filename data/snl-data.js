/* ============================================================
   SNL TRACKER — DATA FILE
   ------------------------------------------------------------
   Single source of truth for all SNL content. Nothing is
   written directly into the HTML files.

   STRUCTURE
     regions.<us|uk>.cast      Cast registry, keyed by id (c1, c2…)
     regions.<us|uk>.seasons   Seasons → episodes → sketches

   CAST
     Each cast member has: name, status ("current" | "alumni"),
     role, seasons (roster), bio.
     Sketches reference cast members by id, e.g. cast: ["c1","c2"].
     Average scores & appearance counts are CALCULATED from the
     sketches — never stored here.

   SCORES
     Sketch scores are 0–10. Use `null` for "not rated yet" (—).

   NOTE: All values are PLACEHOLDERS — replace as you watch.
   ============================================================ */

window.SNL_DATA = {
  regions: {

    /* ==================== UNITED STATES ==================== */
    us: {
      label: "US",
      fullLabel: "United States",
      network: "NBC",
      seasonWord: "Season",
      heroEyebrow: "Saturday Night Live · United States",
      heroTitle: "Live from<br>New York",

      cast: {
        colin_jost: {
          name: "Colin Jost",
           photo: "colin_jost.jpg",
           photobig: ["colin_jost.jpg", "colin_intro.jpg"],
          status: "current",
          role: "Repertory",
          seasons: [51],
          bio: "An anchor of 'Weekend Update' who commonly portrays Pete Hegseth in the cold opens. (LEFT: Jost during Weekend Update. RIGHT: Jost during the SNL intro.)"
        },
        james_a_johnson: {
          name: "James Austin Johnson",
           photo: "jaj.jpg",
           photobig: ["jaj_trump.jpg", "jaj_into.jpg"],
          status: "current",
          role: "Repertory",
          seasons: [49, 50, 51],
          bio: "JAJ has been a cast member since 2021 and (mostly just) impersonates Donald Trump - 14 times! (LEFT: Johnson as Trump. RIGHT: Johnson during the SNL intro."
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
              host: "Bad Bunny",
              musicalGuest: "Doja Cat",
              airDate: "4 October 2025",
              sketches: [
                { title: "Cold Open",      score: 5,    blurb: "", cast: ["colin_jost", "james_a_johnson"] },
                { title: "Monologue",      score: 5,    blurb: "",   cast: [] },
                 { title: "Jeopardy",      score: 8,    blurb: "", cast: ["andrew", "kenan", "veronika"] },
                { title: "Weekend Update", score: null,    blurb: "Placeholder blurb for Weekend Update. Note the anchors and any standout desk pieces.",                  cast: ["c2", "c3"] }
              ]
            },
            {
              number: 2,
              title: "Episode 2",
              host: "Placeholder Host B",
              musicalGuest: "Placeholder Musical Guest B",
              airDate: "TBD",
              sketches: [
                { title: "Cold Open",         score: 6,    blurb: "Placeholder blurb for this cold open.",                                                      cast: ["c1", "c3"] },
                { title: "Recurring Sketch",  score: null, blurb: "Placeholder blurb — this sketch has not been rated yet, so it shows a dash.",                 cast: ["c2", "c3"] },
                { title: "Ten-to-One Sketch", score: 8.5,  blurb: "Placeholder blurb for the weird late-in-the-show sketch.",                                    cast: ["c1"] }
              ]
            },
            {
              number: 3,
              title: "Episode 3",
              host: "Placeholder Host C",
              musicalGuest: "Placeholder Musical Guest C",
              airDate: "TBD",
              sketches: [
                { title: "Cold Open",         score: 7.5, blurb: "Placeholder blurb for this cold open.",     cast: ["c1", "c2"] },
                { title: "Commercial Parody", score: 9,   blurb: "Placeholder blurb for a fake-ad sketch.",   cast: ["c2", "c3"] }
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
              host: "Placeholder Host A",
              musicalGuest: "Placeholder Musical Guest A",
              airDate: "TBD",
              sketches: [
                { title: "Cold Open", score: 8,    blurb: "Placeholder blurb for the UK cold open.", cast: ["c1", "c2"] },
                { title: "Monologue", score: null, blurb: "Placeholder blurb — not yet rated.",      cast: ["c1"] }
              ]
            },
            {
              number: 2,
              title: "Episode 2",
              host: "Placeholder Host B",
              musicalGuest: "Placeholder Musical Guest B",
              airDate: "TBD",
              sketches: [
                { title: "Cold Open",    score: 7,   blurb: "Placeholder blurb for this UK cold open.", cast: ["c2", "c3"] },
                { title: "Sketch Title", score: 6.5, blurb: "Placeholder blurb for a UK sketch.",       cast: ["c1", "c3"] }
              ]
            }
          ]
        }
      ]
    }

  }
};
