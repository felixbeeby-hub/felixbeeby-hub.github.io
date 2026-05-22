/* ============================================================
   SNL TRACKER — DATA FILE
   ------------------------------------------------------------
   This is the single source of truth for all SNL content.
   Nothing is written directly into the HTML files — every page
   reads from this object.

   To add content, just extend the structure below. Pages will
   pick it up automatically (season dropdown, episode list, etc).

   Score scale: 0–10. Use `null` for a sketch you haven't rated.
   Episode "avg" scores are calculated automatically from sketches.

   NOTE: All values here are PLACEHOLDERS — replace them with
   real data as you watch.
   ============================================================ */

window.SNL_DATA = {
  regions: {

    /* ---------------- UNITED STATES ---------------- */
    us: {
      label: "US",
      fullLabel: "United States",
      network: "NBC",
      seasonWord: "Season",
      heroEyebrow: "Saturday Night Live · United States",
      heroTitle: "Live from<br>New York",
      seasons: [
        {
          id: 51,
          episodes: [
            {
              number: 1,
              title: "Episode 1",
              host: "Bad Bunny",
              musicalGuest: "Doja Cat",
              airDate: "October 4, 2025",
              sketches: [
                {
                  title: "Cold Open",
                  score: 7,
                  blurb: "A fairly mediocre Pete Hegseth bit gives way to a surprisingly sharp meta-critique of SNL delivered by Trump.",
                  cast: ["Colin Jost", "James Austin Johnson", "Cast Member Three"]
                },
                {
                  title: "Monologue",
                  score: 7,
                  blurb: "Placeholder blurb for the host monologue. Add notes about the bit, jokes, or surprise appearances.",
                  cast: ["Placeholder Host A"]
                },
                {
                  title: "Weekend Update",
                  score: 9,
                  blurb: "Placeholder blurb for Weekend Update. Note the anchors and any standout desk pieces.",
                  cast: ["Cast Member Two", "Cast Member Four"]
                }
              ]
            },
            {
              number: 2,
              title: "Episode 2",
              host: "Placeholder Host B",
              musicalGuest: "Placeholder Musical Guest B",
              airDate: "TBD",
              sketches: [
                {
                  title: "Cold Open",
                  score: 6,
                  blurb: "Placeholder blurb for this cold open.",
                  cast: ["Cast Member One", "Cast Member Five"]
                },
                {
                  title: "Recurring Sketch",
                  score: null,
                  blurb: "Placeholder blurb — this sketch has not been rated yet, so it shows a dash.",
                  cast: ["Cast Member Three", "Cast Member Four", "Placeholder Host B"]
                },
                {
                  title: "Ten-to-One Sketch",
                  score: 8.5,
                  blurb: "Placeholder blurb for the weird late-in-the-show sketch.",
                  cast: ["Cast Member Five"]
                }
              ]
            },
            {
              number: 3,
              title: "Episode 3",
              host: "Placeholder Host C",
              musicalGuest: "Placeholder Musical Guest C",
              airDate: "TBD",
              sketches: [
                {
                  title: "Cold Open",
                  score: 7.5,
                  blurb: "Placeholder blurb for this cold open.",
                  cast: ["Cast Member One", "Cast Member Two"]
                },
                {
                  title: "Commercial Parody",
                  score: 9,
                  blurb: "Placeholder blurb for a fake-ad sketch.",
                  cast: ["Cast Member Four", "Cast Member Five"]
                }
              ]
            }
          ]
        }
      ]
    },

    /* ---------------- UNITED KINGDOM ---------------- */
    uk: {
      label: "UK",
      fullLabel: "United Kingdom",
      network: "Sky TV",
      seasonWord: "Series",
      heroEyebrow: "Saturday Night Live · United Kingdom",
      heroTitle: "Live from<br>London",
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
                {
                  title: "Cold Open",
                  score: 8,
                  blurb: "Placeholder blurb for the UK cold open.",
                  cast: ["Cast Member One", "Cast Member Two"]
                },
                {
                  title: "Monologue",
                  score: null,
                  blurb: "Placeholder blurb — not yet rated.",
                  cast: ["Placeholder Host A"]
                }
              ]
            },
            {
              number: 2,
              title: "Episode 2",
              host: "Placeholder Host B",
              musicalGuest: "Placeholder Musical Guest B",
              airDate: "TBD",
              sketches: [
                {
                  title: "Cold Open",
                  score: 7,
                  blurb: "Placeholder blurb for this UK cold open.",
                  cast: ["Cast Member Two", "Cast Member Three"]
                },
                {
                  title: "Sketch Title",
                  score: 6.5,
                  blurb: "Placeholder blurb for a UK sketch.",
                  cast: ["Cast Member One", "Cast Member Three", "Placeholder Host B"]
                }
              ]
            }
          ]
        }
      ]
    }

  }
};
