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
        amy_poehler: { name: "Amy Poehler", bio: "" },
        sabrina_carpenter: { name: "Sabrina Carpenter", bio: "" }
      },

      music: {
        doja_cat:            { name: "Doja Cat",                    bio: "" },
        role_model: { name: "Role Model", bio: "" },
        sabrina_carpenter: { name: "Sabrina Carpenter", bio: "" }
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
           photo: "veronika.jpg",
           photobig: ["veronika.jpg", "veronika_intro.jpeg"],
          status: "current",
          role: "Featured",
          seasons: [51],
          bio: "A Canadian! A distinctive voice but unfortunately does not appear in many sketches and is not too memorable.<br>LEFT: Slowikowska during Weekend Update. RIGHT: Slowikowska during the SNL intro."
        },
        chloe: {
          name: "Chloe Fineman",
           photo: "fineman.jpg",
           photobig: ["fineman.jpg", "fineman_intro.jpg"],
          status: "current",
          role: "Repertory",
          seasons: [45, 46, 47, 48, 49, 50, 51],
          bio: "Maybe still a Scientologist, but a good cast member - nothing too stand out, but usually funny.<br>LEFT: Fineman during Weekend Update. RIGHT: Fineman during the SNL intro."
        },
        marcello: {
          name: "Marcello Hernández",
           photo: "marcello.jpg",
           photobig: ["marcello.jpg", "marcello_domingo.jpg", "marcello_heart.jpg", "marcello_intro.jpg"],
          status: "current",
          role: "Repertory",
          seasons: [48, 49, 50, 51],
          bio: "Despite usually doing the same couple bits/voices, they still land and are funny!<br>LEFT: Hernández during Weekend Update. CENTER LEFT: Hernández as the iconic and beloved 'Domingo'. CENTER RIGHT: Hernández (breaking) during the hilarious 'AERIAL TRAMWAY!!' sketch. RIGHT: Hernández during the SNL intro."
        },
        sarah: {
          name: "Sarah Sherman",
           photo: "sherman.jpg",
           photobig: ["sherman.jpg", "shermanraccoon.jpg", "sherman_squirrel.jpg", "sherman_intro.jpeg"],
          status: "current",
          role: "Repertory",
          seasons: [47, 48, 49, 50, 51],
          bio: "She has a chaotic energy that (although similar) she brings to many of her characters that makes them funny: both through physical comedy and her dialouge  + vocals. Becoming one of my favourites, she also does a suprisingly good job acting as small mammals!<br>LEFT: Sherman during Weekend Update. CENTER LEFT: Sherman as a drunk raccoon during Weekend Update. CENTER RIGHT: Sherman as a Squirrel during Weekend Update. RIGHT: Sherman during the SNL intro."
        },
        mikey: {
          name: "Mikey Day",
           photo: "mikey.jpg",
           photobig: ["mikey.jpg", "mikey_spit.jpeg", "mikey_intro.jpg"],
          status: "current",
          role: "Repertory",
          seasons: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
          bio: "The most memorable things are that he appears to be the oldest cast memeber and his name rhymes with Che's in the intro. His sketches are sometimes funny... and is often (maybe??) at the expense of him - like the Matt Damon sketch above.<br>LEFT: Day during a Cold Open. CENTER: Day during one of MANY spit takes in a sketch with Matt Damon. RIGHT: Day during the SNL intro"
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
           photo: "che.jpg",
           photobig: ["che.jpg", "che_intro.jpeg"],
          status: "current",
          role: "Weekend Update Anchor",
          seasons: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
          bio: "The (probably) better Weekend Update anchor.<br>LEFT: Che during Weekend Update. RIGHT: Che during the SNL intro."
        },
        kam: {
          name: "Kam Patterson",
           photo: "kam.jpg",
           photobig: ["kam.jpg", "kam_sax.jpg", "kam_intro.jpg"],
          status: "current",
          role: "Featured",
          seasons: [51],
          bio: "I like Kam, and he is funny, but so far he hasnt appeared many times and, when is the main part of a sketch, has kinda only done one of two 'characters': Young Kid and ¿himself?<br>LEFT: Patterson during Weekend Update. CENTER: Patterson (incorrectly) playing the Saxophone to a 'drunk' Miles Teller. RIGHT: Patterson during the SNL intro."
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
           photo: "marshall.jpg",
           photobig: ["marshall.jpg", "marshall_tall.jpg", "marshall_intro.jpg"],
          status: "current",
          role: "Featured",
          seasons: [51],
          bio: "He was promoted from writer to cast member in season 51 and his 'thing' is being very tall I guess.<br>LEFT: Marshall during a sketch. CENTER: Marshall during a sketch about height. LEFT: Marshall during the SNL intro."
        },
        ashley: {
          name: "Ashley Padilla",
           photo: "padilla.jpg",
           photobig: ["padilla.jpg", "padilla_sketcheg.jpg", "padilla_intro.jpeg"],
          status: "current",
          role: "Featured",
          seasons: [50, 51],
          bio: "Despite being a Featured Player, Padilla is one of the funniest (and a favourite) cast members and surely deserves the promotion to Repertory Cast. Her memorable mannerisms and vocals alongside how she sits on the verge of breaking add to her success during sketches.<br>LEFT: Padilla as Kristi Noem (repeated role). CENTER: Padilla (and Marshall) in the sketch 'My Ex.' RIGHT: Padilla during the SNL into."
        } ,
         jeremy: {
          name: "Jeremy Culhane",
           photo: "culhane.jpg",
           photobig: ["culhane.jpg", "culhaneonblast.jpg", "culhane_intro.jpg"],
          status: "current",
          role: "Featured",
          seasons: [51],
          bio:"A phenomenal casting by NBC and already one of my favourite cast members, after only 1 season he has produced two iconic Weekend Update characters/impersonations (performing both of them twice in his debut season). He brings good energy and facial expressions to his roles.<br>LEFT: Culhane as Tucker Carlson on Weekend Update. CENTER: Culhane as 'Mr On Blast' during Weekend Update. RIGHT: Culhane during the SNL intro."
        },
        tommy: {
          name: "Tommy Brennan",
             photo: "brennan.jpg",
           photobig: ["brennan.jpg", "brennan_intro.jpeg"],
          status: "current",
          role: "featured",
          seasons: [51],
          bio: "One of the newest members of the cast, he is not the most memorable of the new cast and has not featured in many sketches.<br>LEFT: Brennan during Weekend Update. RIGHT: Brennan during the SNL intro."
        },
        jane: {
          name: "Jane Wickline",
           photo: "jane_wickline.jpg",
           photobig: ["jane_wickline.jpg", "jane_intro.jpeg"],
          status: "current",
          role: "Featured",
          seasons: [51],
          bio: "Its her first season and she is doing well! She is becoming quite popular with viewers and has featured in many sketches and usually fits a specific niche (of comedically akward). Jane's look is often similar with most wigs being straight brown hair (the same as, but longer, than her real hair). She has also appeared numerous times on Weekend Update as herself, often times with a keyboard which she plays while singing!<br>LEFT: Wickline during Weekend Update. RIGHT: Wickline during the SNL intro."
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
               { title: "Jeopardy",      scores: { F: 6, O: 3 },    blurb: "", cast: ["andrew", "kenan", "veronika"], hosts: ["bad_bunny"], music: [] },
               { title: "ChatGPTio", scores: { F: 4, O: 5},    blurb: "", cast: ["chloe", "marcello"], hosts: ["bad_bunny"], music: [] },
               { title: "The Donor", scores: { F: 5, O: 2},    blurb: "", cast: ["chloe", "sarah","andrew", "kenan", "marcello", "bowen"], hosts: ["bad_bunny"], music: [] },
               { title: "K-Pop Demon Hunters", scores: { F: 6, O: 6},    blurb: "The premise is really stale, but I was won over by Bowen Jinu and the HUNTR/X cameo.", cast: ["chloe", "sarah", "mikey", "bowen"], hosts: ["bad_bunny"], music: [] },
               { title: "AAAHH MEN!", scores: { F: null, O: 10},    blurb: "", cast: [], hosts: [], music: ["doja_cat"] },
               { title: "Weekend Update 04/10/25", scores: { F: null, O: 4},    blurb: "", cast: ["colin", "michael"], hosts: [], music: [] },
               { title: "Weekend Update: Kam Patterson", scores: { F: 7, O: 3},    blurb: "", cast: ["kam", "colin", "michael"], hosts: [], music: [] },
               { title: "Weekend Update: Dobby the House-Elf", scores: { F: 8, O: 8},    blurb: "", cast: ["bowen", "colin", "michael"], hosts: [], music: [] },
               { title: "Inventing Spanish", scores: { F: 4, O: 5},    blurb: "Featuring Javier Bardem", cast: ["marcello", "kenan", "mikey", "andrew", "jaj", "ben"], hosts: ["bad_bunny"], music: [] },
               { title: "Gorgeous", scores: { F: null, O: 8},    blurb: "She should've done Jelous Type! But this is still excellent.", cast: [], hosts: [], music: ["doja_cat"] },
               { title: "Parent-Teacher Conference", scores: { F: 7, O: 6},    blurb: "Finally a sketch that plays to Bad Bunny's... strengths.", cast: ["marcello", "andrew", "ashley"], hosts: ["bad_bunny"], music: [] },
               { title: "The Kid from Number 8", scores: { F: 6, O: 4},    blurb: "Featuring Jon Hamm. This is probably really funny if you have even a passing knowledge of the reference material.", cast: ["marcello", "andrew", "chloe", "sarah", "kenan"], hosts: ["bad_bunny"], music: [] }
                                                                      
              ]
            },
            {
              number: 2,
              title: "Episode 2",
              host: "amy_poehler",
              musicalGuest: "role_model",
              airDate: "11 October 2025",
              sketches: [
                { title: "Cold Open",         scores: { F:null, O: 5 },    blurb: "",                                                      cast: ["jaj","andrew","mikey","jeremy","chloe","tommy"], hosts: ["amy_poehler"], music: [] },
                { title: "Monologue",  scores: { F: 6, O: 7 }, blurb: "",                 cast: [], hosts: ["amy_poehler"], music: [] },
                { title: "The Rudemans", scores: { F: 7, O: 6 },  blurb: "",                                    cast: ["ashley","andrew","bowen","sarah","mikey"], hosts: ["amy_poehler"], music: [] },
                { title: "Non-Non-Alcoholic Beer", scores: { F: 3, O: 2},    blurb: "", cast: ["andrew","kam","ashley","ben"], hosts: [], music: [] },
                { title: "Miss Lycus The Fast Psychic", scores: { F: 8, O: 7},    blurb: "", cast: ["jaj","chloe","jeremy","ashley","ben","kam","veronika","jane","bowen","marcello"], hosts: ["amy_poehler"], music: [] },
                { title: "The Hunting Wives", scores: { F: 6, O: 7},    blurb: "Featuring Aubrey Plaza", cast: ["chloe","ashley","sarah","kam","jeremy"], hosts: ["amy_poehler"], music: [] }, 
                { title: "Work Baby", scores: { F: 7, O: 8},    blurb: "", cast: ["ashley", "tommy","sarah","ben","mikey","kenan","bowen"], hosts: ["amy_poehler"], music: [] }, 
                { title: "Sally, When The Wine Runs Out", scores: { F: null, O: 6},    blurb: "Featuring Charli XCX", cast: [], hosts: [], music: ["role_model"] }, 
                { title: "Weekend Update 11/10/2025", scores: { F: null, O: 5},    blurb: "", cast: ["colin", "michael"], hosts: [], music: [] }, 
                { title: "Weekend Update: Rhonda LaCenzo", scores: { F: 9, O: 9},    blurb: "", cast: ["sarah", "michael", "colin"], hosts: [], music: [] }, 
                { title: "Weekend Udpate: Joke-Off", scores: { F: null, O: 7},    blurb: "Twelve pound newborn baby jokes. Featuring Seth Meyers and Tina Fey.", cast: ["colin", "michael"], hosts: ["amy_poehler"], music: [] },
                { title: "Billson & Lieberman Attorneys at Law", scores: { F: 5, O: 8},    blurb: "", cast: ["andrew", "jaj", "tommy","mikey","kam","ben","veronika","ashley","chloe","jane","marcello","jeremy","sarah","bowen","kenan"], hosts: ["amy_poehler"], music: [] },
                { title: "Some Protector", scores: { F: null, O: 4},    blurb: "", cast: [], hosts: [], music: ["role_model"] },
                { title: "Emo Mom", scores: { F: 5, O: 7},    blurb: "", cast: ["jaj","chloe","jeremy","jane","ben","kam"], hosts: [], music: [] },
                { title: "TV Composer Masterclass", scores: { F: 8, O: 7},    blurb: "", cast: ["bowen","jaj","ben","tommy","jane","ashley"], hosts: [], music: [] }
                 
              ]
            },
            {
              number: 3,
              title: "Episode 3",
              host: "sabrina_carpenter",
              musicalGuest: "sabrina_carpenter",
              airDate: "18 October 2025",
              sketches: [
                { title: "Cold Open (Domingo Reprise 2)",         scores: { F: null, O: 9 }, blurb: "It's getting kind of corny but I still love it.",     cast: ["chloe", "andrew","sarah","veronika","ashley","marcello"], hosts: ["sabrina_carpenter"], music: [] },
                { title: "Monologue", scores: { F: null, O: 6 },   blurb: "",   cast: ["kenan"], hosts: ["sabrina_carpenter"], music: [] },
                { title: "Snack Homiez", scores: { F: null, O: 7},    blurb: "Inlcuding Trump in this was a great idea, but then they didn't execute it correctly!", cast: ["chloe","jane","veronika","jaj"], hosts: ["sabrina_carpenter"], music: [] }, 
                 
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
        tina_fey: { name: "Tina Fey", bio: "" },
        placeholder_host_b: { name: "Placeholder Host B", bio: "" }
      },

      music: {
        wet_leg: { name: "Wet Leg", bio: "" },
        placeholder_music_b: { name: "Placeholder Musical Guest B", bio: "" }
      },

      cast: {
        george: {
          name: "George Fouracres",
          status: "current",
          
          seasons: [1],
          bio: "(Kier Starmar, 45 seconds with Fouracres)"
        },
        al: {
          name: "Al Nash",
          status: "current",
          
          seasons: [1],
          bio: ""
            },
        paddy: {
          name: "Paddy Young",
          status: "current",
          role: "Weekend Update Anchor",
          seasons: [1],
          bio: ""
        },
        ania: {
          name: "Ania Maglioni",
          status: "current",
          role: "Weekend Update Anchor",
          seasons: [1],
          bio: ""
        },
        hammed: {
          name: "Hammed Animashaun",
          status: "current",
          seasons: [1],
          bio: ""
        },
        ayoade: {
          name: "Ayoade Bamgboye",
          status: "current",
          seasons: [1],
          bio: ""
        },
        larry: {
          name: "Larry Dean",
          status: "current",
          seasons: [1],
          bio: ""
        },
        celeste: {
          name: "Celeste Dring",
          status: "current",
          seasons: [1],
          bio: ""
        },
        annabel: {
          name: "Annabel Marlow",
          status: "current",
          seasons: [1],
          bio: ""
        },
        jack: {
          name: "Jack Shep",
          status: "current",
          seasons: [1],
          bio: ""
        },
        emma: {
          name: "Emma Sidi",
          status: "current",
          seasons: [1],
          bio: ""
        } 
      },

      seasons: [
         {
          id: 1,
          episodes: [
             {
              number: 1,
              title: "Episode 1",
              host: "tina_fey",
              musicalGuest: "wet_leg",
              airDate: "21 March 2026",
              sketches: [
                { title: "Cold Open", scores: { F: null, O: 8 },    blurb: "", cast: ["george", "hammed", "jack"], hosts: [], music: [] },
                { title: "Monologue", scores: { F: null, O: 7 }, blurb: "Featuring Nicola Coughlan, Michael Cera, & Graham Norton.",      cast: [], hosts: ["tina_fey"], music: [] },
                { title: "Undérage", scores: { F: null, O: 4},    blurb: "", cast: ["celeste", "emma", "ayoade","paddy","al","george","jack"], hosts: ["tina_fey"], music: [] },
                { title: "David Attenborough's Last Supper", scores: { F: null, O: 4},    blurb: "", cast: ["george","al","annabel","ayoade","jack","hammed","larry","emma","celeste"], hosts: ["tina_fey"], music: [] },
                { title: "Boovies", scores: { F: null, O: 6},    blurb: "", cast: ["hammed","jack"], hosts: ["tina_fey"], music: [] },
                { title: "Internet Team", scores: { F: null, O: 5},    blurb: "", cast: ["hammed", "jack", "larry",], hosts: [], music: [] },
                { title: "Performative Baby", scores: { F: null, O: 4},    blurb: "", cast: ["ayoade", "george", "celeste", "jack"], hosts: ["tina_fey"], music: [] },
                { title: "mangetout", scores: { F: null, O: 6},    blurb: "", cast: [], hosts: [], music: ["wet_leg"] },
                { title: "Weekend Update", scores: { F: null, O: 6},    blurb: "Where is Belgium?", cast: ["paddy", "ania"], hosts: [], music: [] },
                { title: "Weekend Update: Captain Birdseye", scores: { F: null, O: 2},    blurb: "", cast: ["al", "paddy"], hosts: [], music: [] },
                { title: "Shakespeare", scores: { F: null, O: 5},    blurb: "", cast: ["george", "larry", "ayoade", "emma","jack"], hosts: ["tina_fey"], music: [] },
                { title: "The Live Paddington Bear Experience", scores: { F: null, O: 3},    blurb: "", cast: ["ania","larry","annabel","george","jack","hammed","ayoade","al"], hosts: ["tina_fey"], music: [] },
                { title: "catch these fists", scores: { F: null, O: 6},    blurb: "", cast: [], hosts: [], music: ["wet_leg"] },
                { title: "Bra Fitting", scores: { F: null, O: 4},    blurb: "", cast: ["annabel", "emma", "celeste","ayoade"], hosts: ["tina_fey"], music: [] },
                { title: "45 Seconds with Fouracres", scores: { F: null, O: 3},    blurb: "?", cast: ["george"], hosts: [], music: [] }
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
