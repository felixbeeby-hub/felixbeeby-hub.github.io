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

   Useful copy paste templates:
   { title: "", scores: { F: , O: },    blurb: "", cast: [], hosts: [], music: [] },
   host_id: { name: "", bio: "" },
   c5: {
          name: "",
          status: "",
          role: "",
          seasons: [],
          bio: ""
        }
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
        colin: {
          name: "Colin Jost",
           photo: "colin_jost.jpg",
           photobig: ["colin_jost.jpg", "colin_intro.jpg"],
          status: "current",
          role: "Weekend Update Anchor",
          seasons: [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
          bio: "An anchor of 'Weekend Update' who commonly portrays Pete Hegseth in the cold opens. <br>LEFT: Jost during Weekend Update. RIGHT: Jost during the SNL intro."
        },
        jaj: {
          name: "James Austin Johnson",
           photo: "jaj.jpg",
           photobig: ["jaj_trump.jpg", "jaj_intro.jpg"],
          status: "current",
          role: "Repertory",
          seasons: [47, 48, 49, 50, 51],
          bio: "JAJ has been a cast member since 2021 and (mostly just) impersonates Donald Trump - 14 times!<br>LEFT: Johnson as Trump. RIGHT: Johnson during the SNL intro."
        },
        kenan: {
          name: "Kenan Thompson",
          status: "current",
          role: "Repertory",
          seasons: [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
          bio: ""
        },
        veronika: {
          name: "Veronika Slowikowska",
          status: "current",
          role: "Featured",
          seasons: [51],
          bio: ""
        },
        chloe: {
          name: "Chloe Fineman",
          status: "current",
          role: "Repertory",
          seasons: [45, 46, 47, 48, 49, 50, 51],
          bio: ""
        },
        marcello: {
          name: "Marcello Hernández",
          status: "current",
          role: "Repertory",
          seasons: [48, 49, 50, 51],
          bio: ""
        },
        sarah: {
          name: "Sarah Sherman",
          status: "current",
          role: "Repertory",
          seasons: [47, 48, 49, 50, 51],
          bio: ""
        },
        mikey: {
          name: "Mikey Day",
          status: "current",
          role: "Repertory",
          seasons: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
          bio: ""
        },
        bowen: {
          name: "Bowen Yang",
          status: "alumni",
          role: "Repertory",
          seasons: [45, 46, 47, 48, 49, 50, 51],
          bio: ""
        },
        michael: {
          name: "Michael Che",
          status: "current",
          role: "Weekend Update Anchor",
          seasons: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
          bio: ""
        },
        kam: {
          name: "Kam Patterson",
          status: "current",
          role: "Featured",
          seasons: [51],
          bio: ""
        },
        andrew: {
          name: "Andrew Dismukes",
          status: "current",
          role: "Repertory",
          seasons: [46, 47, 48, 49, 50, 51],
          bio: ""
        },
        ben: {
          name: "Ben Marshall",
          status: "current",
          role: "Featured",
          seasons: [51],
          bio: ""
        },
        ashley: {
          name: "Ashley Padilla",
          status: "current",
          role: "Featured",
          seasons: [50, 51],
          bio: ""
        } ,
         },
        jeremy: {
          name: "Jeremy Culhane",
          status: "current",
          role: "Featured",
          seasons: [51],
          bio:""
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
               { title: "Cold Open",      scores: { F: 5, O: 7 },    blurb: "A seemingly normal Cold Open with Pete Hegseth (Colin Jost) is interrupted by James Austin Johnson's Trump. His commentary during a freeze frame breaks the fourth wall and is the first of many (apparantly necessary) appearances of Donald Trump in S51's Cold Opens. ", cast: ["colin", "jaj"], hosts: [], music: [] },
               { title: "Monologue",      scores: { F: 5, O: 4 },    blurb: "Bad Bunny struggles through a somewhat dry opening monologue, though his charisma and a touch of español do some work in redeeming it slightly.",   cast: [], hosts: ["bad_bunny"], music: [] },
               { title: "Jeopardy",      scores: { F: 8, O: 3 },    blurb: "", cast: ["andrew", "kenan", "veronika"], hosts: ["bad_bunny"], music: [] },
               { title: "ChatGPTio", scores: { F: null, O: 5},    blurb: "", cast: ["chloe", "marcello"], hosts: ["bad_bunny"], music: [] },
               { title: "The Donor", scores: { F: null, O: 2},    blurb: "", cast: ["chloe", "sarah","andrew", "kenan", "marcello", "bowen"], hosts: ["bad_bunny"], music: [] },
               { title: "K-Pop Demon Hunters", scores: { F: null, O: 6},    blurb: "The premise is really stale, but I was won over by Bowen Jinu and the HUNTR/X cameo.", cast: ["chloe", "sarah", "mikey", "bowen"], hosts: ["bad_bunny"], music: [] },
               { title: "AAAHH MEN!", scores: { F: null, O: 10},    blurb: "", cast: [], hosts: [], music: ["doja_cat"] },
               { title: "Weekend Update 04/10/25", scores: { F: null, O: 4},    blurb: "", cast: ["colin", "michael"], hosts: [], music: [] },
               { title: "Weekend Update: Kam Patterson", scores: { F: null, O: 3},    blurb: "", cast: ["kam", "colin", "michael"], hosts: [], music: [] },
               { title: "Weekend Update: Dobby the House-Elf", scores: { F: null, O: 8},    blurb: "", cast: ["bowen", "colin", "michael"], hosts: [], music: [] },
               { title: "Inventing Spanish", scores: { F: null, O: 5},    blurb: "Featuring Javier Bardem", cast: ["marcello", "kenan", "mikey", "andrew", "jaj", "ben"], hosts: ["bad_bunny"], music: [] },
               { title: "Gorgeous", scores: { F: null, O: 8},    blurb: "She should've done Jelous Type! But this is still excellent.", cast: [], hosts: [], music: ["doja_cat"] },
               { title: "Parent-Teacher Conference", scores: { F: null, O: 6},    blurb: "Finally a sketch that plays to Bad Bunny's... strengths.", cast: ["marcello", "andrew", "ashley"], hosts: ["bad_bunny"], music: [] },
               { title: "The Kid from Number 8", scores: { F: null, O: 4},    blurb: "Featuring Jon Hamm. This is probably really funny if you have even a passing knowledge of the reference material.", cast: ["marcello", "andrew", "chloe", "sarah", "kenan"], hosts: ["bad_bunny"], music: [] }
                                                                      
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
        george: {
          name: "George Foreacres",
          status: "current",
          role: "Repertory",
          seasons: [1],
          bio: "(Kier Starmar, 45 seconds with Foreacres)"
        },
        alnash: {
          name: "Al Nash",
          status: "current",
          role: "Featured Player",
          seasons: [1],
          bio: ""
        },
        ania: {
          name: "Ania Maglioni",
          status: "Current",
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
