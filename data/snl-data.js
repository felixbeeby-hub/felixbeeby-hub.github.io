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


   {
              number: 4,
              title: "Episode 4",
              host: "miles_teller",
              musicalGuest: "brandi_carlile",
              airDate: "",
              sketches: [  
                { title: "", scores: { F: null, O: null},    blurb: "", cast: ["kenan", "kam"], hosts: ["miles_teller"], music: [] }

               ]
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
        sabrina_carpenter: { name: "Sabrina Carpenter", bio: "" },
        miles_teller: { name: "Miles Teller", bio:""},
        nikki_glaser: { name: "Nikki Glaser", bio:""} 
      },

      music: {
        doja_cat:            { name: "Doja Cat",                    bio: "" },
        role_model: { name: "Role Model", bio: "" },
        sabrina_carpenter: { name: "Sabrina Carpenter", bio: "" },
        brandi_carlile: { name: "Brandi Carlile", bio: "" },
        chop: { name: "Sombr", bio: ""} 
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
           photo: "kenan.jpg",
           photobig: ["kenan.jpg", "kenan_host.jpg", "kenan_intro.jpg"],
          status: "current",
          role: "Repertory",
          seasons: [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
          bio: "He is, by far, the cast member with the largest tenure and has an iconic, 'innocent' smile. <br>LEFT: Thompson attending an event. CENTER: Thompson as a game show host during an SNL sketch (a common role). RIGHT: Thompson during the SNL intro."
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
          bio: "Despite usually doing the same couple bits/voices, they still land and are funny!<br>LEFT: Hernández during Weekend Update. CENTER LEFT: Hernández as the iconic and beloved 'Domingo'. CENTER RIGHT: Hernández (breaking) during the amazing 'AERIAL TRAMWAY!!' sketch. RIGHT: Hernández during the SNL intro."
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
           photobig: ["mikey.jpg", "mikey_spit.jpeg", "mikey_tramway.jpg", "mikey_intro.jpg"],
          status: "current",
          role: "Repertory",
          seasons: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
          bio: "The most memorable things are that he appears to be the oldest cast memeber and his name rhymes with Che's in the intro. His sketches are sometimes funny... and is often (maybe??) at the expense of him - like the Matt Damon sketch above.<br>LEFT: Day during a Cold Open. CENTER LEFT: Day during one of MANY spit takes in a sketch with Matt Damon. CENTER RIGHT: Day hilariously being the Aerial Tramway Emoji. RIGHT: Day during the SNL intro"
        },
        bowen: {
          name: "Bowen Yang",
           photo:"bowen.jpg",
           photobig: ["bowen.jpg", "bowen_moodeng.jpg", "bowen_dobby.jpg", "bowen_intro.jpeg"],
          status: "alumni",
          role: "Repertory",
          seasons: [45, 46, 47, 48, 49, 50, 51],
          bio: "BIO<br>LEFT: Yang during Weekend Update. CENTER LEFT: Yang as Moo Deng during Weekend Update. CENTER RIGHT: Yang as Dobby during Weekend Update. RIGHT: Yang during the SNL intro (S51)."
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
           photo: "dismukes.jpg",
           photobig: ["dismukes.jpg", "dismukes_intro.jpg"],
          status: "current",
          role: "Repertory",
          seasons: [46, 47, 48, 49, 50, 51],
          bio: "Seems to be in a lot of sketches but is never really too memorable.<br>LEFT: Dismukes during a sketch. RIGHT: Dismukes during the SNL intro."
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
                { title: "Plans: Coming Soon", scores: { F: null, O: 6},    blurb: "", cast: ["ben", "sarah", "mikey", "andrew"], hosts: ["sabrina_carpenter"], music: [] }, 
                { title: "ShopTV", scores: { F: null, O: 2},    blurb: "", cast: ["ashley", "mikey", "jaj"], hosts: ["sabrina_carpenter"], music: [] }, 
                { title: "Girlboss Female Confidence Seminar", scores: { F: null, O: 7},    blurb: "", cast: ["chloe", "sarah", "jeremy", "tommy", "ashley", "kenan"], hosts: ["sabrina_carpenter"], music: [] },
                { title: "Grind", scores: { F: null, O: 6},    blurb: "Not really funny per se, but this song is lowkey good.", cast: ["bowen", "jeremy", "kenan", "jane", "kam", "marcello", "veronika", "chloe", "ashley"], hosts: ["sabrina_carpenter"], music: [] },
                { title: "Manchild", scores: { F: null, O: 10},    blurb: "", cast: [], hosts: [], music: ["sabrina_carpenter"] },
                { title: "Weekend Update 18/10/2025", scores: { F: null, O: 6},    blurb: "It's exhausting how much of these segments is about Trump. Like, I do get it... but come on. It's telling that all the best jokes don't involve him!", cast: ["colin", "michael"], hosts: [], music: [] },
                { title: "The Movie Guy", scores: { F: null, O: 3},    blurb: "Seems like a slight missed opportunity for some actual jokes about these films.", cast: ["marcello", "colin"], hosts: [], music: [] },
                { title: "Tommy Brennan: Moving", scores: { F: null, O: 3},    blurb: "Almost like an introductory monologue for Tommy Brennan. Except it wasn't very interesting.", cast: ["tommy", "colin"], hosts: [], music: [] },
                { title: "P.C. Richard & Son", scores: { F: null, O: 8},    blurb: "", cast: ["kenan", "andrew", "ashley", "veronika"], hosts: ["sabrina_carpenter"], music: [] },
                { title: "Office Birthday", scores: { F: null, O: 7},    blurb: "", cast: ["ashley", "andrew", "sarah", "ben", "chloe", "jeremy"], hosts: ["sabrina_carpenter"], music: [] },
                { title: "Nobody's Son", scores: { F: null, O: 9},    blurb: "She sounds so good!", cast: [], hosts: [], music: ["sabrina_carpenter"] },
                { title: "Social Experiment", scores: { F: null, O: 7},    blurb: "Featuring Martin Herlihy (should this guy get some kind of tag...?)", cast: ["jane", "veronika", "kam"], hosts: [], music: [] }
                 
                 
              ]
            },
             {
              number: 4,
              title: "Episode 4",
              host: "miles_teller",
              musicalGuest: "brandi_carlile",
              airDate: "",
              sketches: [  
                { title: "Cold Open: NYC Mayoral Debate", scores: { F: null, O: 3},    blurb: "Featuring Ramy Youssef & Shane Gillis. It's nice to see some new impersonations - but they're a little bit esoteric and one-note.", cast: ["kenan", "kam"], hosts: ["miles_teller"], music: [] },
                { title: "Monologue", scores: { F: null, O: 2},    blurb: "Shockingly bland monologue.", cast: [], hosts: ["miles_teller"], music: [] },
                { title: "What Did I Do Last Night?", scores: { F: null, O: 5},    blurb: "", cast: ["kenan", "veronika", "ben", "kam", "jane"], hosts: ["miles_teller"], music: [] },
                { title: "Property Brothers: White House Ballroom", scores: { F: null, O: 7},    blurb: "", cast: ["jaj", "chloe"], hosts: ["miles_teller"], music: [] },
                { title: "NHL Cares", scores: { F: null, O: 4},    blurb: "A bad joke dragged out over five minutes.", cast: ["andrew", "ashley", "tommy", "ben", "jeremy", "veronika"], hosts: ["miles_teller"], music: [] },
                { title: "Gone Without a Trace", scores: { F: null, O: 2},    blurb: "Unfunny and kind of a weird perpetuation of gender norms.", cast: ["ben", "kenan", "veronika", "chloe", "sarah", "mikey", "tommy"], hosts: ["miles_teller"], music: [] },
                { title: "NewsPoint", scores: { F: null, O: 7},    blurb: "A great concept for a sketch - it could've been pushed further though... I wanted more chaos!", cast: ["chloe", "kenan", "bowen", "mikey", "kam", "jane"], hosts: ["miles_teller"], music: [] },
                { title: "Church & State", scores: { F: null, O: 3},    blurb: "Unlike the UK counterpart, SNL knows how to effectively stage a rock song.", cast: [], hosts: [], music: ["brandi_carlile"] },
                { title: "Weekend Update", scores: { F: null, O: 6},    blurb: "Some decent ones here, nothing spectacular.", cast: ["colin", "michael"], hosts: [], music: [] },
                { title: "Weekend Update: George Santos", scores: { F: null, O: 6},    blurb: "I don't think George Santos is a particularly funny or necessary topic for comedy... but Bowen is a delight to watch, as usual.", cast: ["bowen", "colin"], hosts: [], music: [] },
                { title: "Weekend Update: Two People Who Just Hooked Up", scores: { F: null, O: 8},    blurb: "", cast: ["andrew", "ashley", "colin"], hosts: [], music: [] },
                { title: "Gar-Girl", scores: { F: null, O: 3},    blurb: "Idiotic conceit with nothing really to elevate it.", cast: ["jaj", "bowen", "sarah", "andrew", "jeremy", "ashley", "veronika", "tommy", "ben"], hosts: ["miles_teller"], music: [] },
                { title: "Human", scores: { F: null, O: 4},    blurb: "Definitely the better song of the two.", cast: [], hosts: [], music: ["brandi_carlile"] },
                { title: "Best Italian Restaurant in Nebraska", scores: { F: null, O: 7},    blurb: "", cast: ["mikey", "chloe", "marcello", "kenan"], hosts: [], music: [] } 
                 

               ]
             },
             {
              number: 5,
              title: "Episode 5",
              host: "nikki_glaser",
              musicalGuest: "chop",
              airDate: "",
              sketches: [  
                { title: "Cold Open (Oval Office Monologue)", scores: { F: null, O: 2},    blurb: "Feels like they're running out of novel Trump material. This is really sraping the bottom of the barrel.", cast: ["jaj", "mikey", "marcello", "andy", "jeremy"], hosts: [], music: [] },
                { title: "Opening Monologue", scores: { F: null, O: 9},    blurb: "So THIS is what a proper stand-up comedian's opening monologue looks like!", cast: [], hosts: ["nikki_glaser"], music: [] },
                { title: "Family Karaoke Night", scores: { F: null, O: 2},    blurb: "", cast: ["tommy", "sarah", "andrew", "ashley", "kenan"], hosts: ["nikki_glaser"], music: [] },
                { title: "Hudsacillin", scores: { F: null, O: 9},    blurb: "", cast: ["marcello"], hosts: ["nikki_glaser"], music: [] },
                { title: "Beauty and Mr Beast", scores: { F: null, O: 7},    blurb: "A hilarious idea, but I fear the writers don't have enough Beast knowledge to really make this elite.", cast: ["andrew", "ben", "kenan", "bowen"], hosts: ["nikki_glaser"], music: [] },
                { title: "American Doll XL", scores: { F: null, O: 1},    blurb: "Gross", cast: ["chloe", "ashley", "andrew", "veronika", "sarah", "ben", "kam", "tommy", "mikey", "jaj"], hosts: ["nikki_glaser"], music: [] },
                { title: "Runaway Mechanical Bull", scores: { F: null, O: 9},    blurb: "", cast: ["chloe", "veronika", "jane", "sarah", "andrew", "kenan", "jaj", "colin"], hosts: ["nikki_glaser"], music: [] },
                { title: "12 to 12", scores: { F: null, O: 4},    blurb: "Despite his deeply off-putting stage presence, I unfortunately do see the appeal of this music sonically. There's a certain undeniable groove here.", cast: [], hosts: [], music: ["chop"] },
                { title: "Weekend Update", scores: { F: null, O: 4},    blurb: "Making jokes about the topic of the cold open is a little bit lame.", cast: ["colin", "michael"], hosts: [], music: [] },
                { title: "Weekend Update: Pete Davidson", scores: { F: null, O: 2},    blurb: "Featuring Pete Davidson. Unfortunately. But the ferry thing is quite funny, so I'm glad I've been made aware of it!", cast: ["colin"], hosts: [], music: [] },
                { title: "Delta Gamma", scores: { F: null, O: 5},    blurb: "", cast: ["chloe", "ashley", "sarah", "veronika", "jane", "mikey", "andrew"], hosts: ["nikki_glaser"], music: [] },
                { title: "Brad and His Dad", scores: { F: null, O: 6},    blurb: "", cast: ["mikey"], hosts: [], music: [] },
                { title: "Flight Delay", scores: { F: null, O: 7},    blurb: "", cast: ["sarah", "andrew", "kenan", "bowen", "jaj", "kam"], hosts: ["nikki_glaser"], music: [] },
                { title: "back to friends", scores: { F: null, O: 6},    blurb: "", cast: [], hosts: [], music: ["chop"] },
                { title: "The Make Believe Meadow", scores: { F: null, O: 8},    blurb: "", cast: ["ben", "jeremy", "mikey", "sarah"], hosts: [], music: [] } 
                 

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
        jamie_dornan: { name: "Jamie Dornan", bio: "" },
        riz_ahmed: { name: "Riz Ahmed", bio: ""} 
      },

      music: {
        wet_leg: { name: "Wet Leg", bio: "" },
        wolf_alice: { name: "Wolf Alice", bio: "" },
        kasabian: { name: "Kasabian", bio: ""} 
      },

      cast: {
        george: {
          name: "George Fouracres",
           photo: "george.jpg",
           photobig: ["george.jpg", "george_kier.jpg", "george_intro.jpg"],
          status: "current",
          seasons: [1],
          bio: "(Kier Starmar, 45 seconds with Fouracres)<br>LEFT: Fouracres during a '45 seconds with Fouracres' segment. CENTER: Fouracres as Kier Starmer during a Cold Open. RIGHT: Fouracres during the SNL UK intro."
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
           photo: "hammed.jpg",
           photobig: ["hammed.jpg", "hammed_intro.jpg"],
          status: "current",
          seasons: [1],
          bio: "BIO<br>LEFT: Animashaun during and interview. RIGHT: Animashaun during the SNL UK intro."
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
           photo: "shep.jpg",
           photobig: ["shep.jpg", "shep_dianna.jpeg", "shep_intro.jpg"],
          status: "current",
          seasons: [1],
          bio: "BIO<br>LEFT: Shep at the BAFTAs. CENTER: Shep as Princess Diana during a sketch. RIGHT: Shep during the SNL UK intro."
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
              host: "jamie_dornan",
              musicalGuest: "wolf_alice",
              airDate: "TBD",
              sketches: [
                { title: "Cold Open",    scores: { F: null, O: 5},   blurb: "A slightly strange premise, but some of the jokes just about work.", cast: ["hammed", "ayoade", "jack", "celeste", "larry", "emma"], hosts: [], music: [] },
                { title: "Monologue", scores: { F: null, O: 2}, blurb: "The potatoes are actually really cool... but this just isn't funny. Jamie seemed scared.",       cast: [], hosts: ["jamie_dornan"], music: [] },
                { title: "British-Themed Pub", scores: { F: null, O: 10},    blurb: "", cast: ["jack", "annabel", "emma", "hammed", "al", "larry"], hosts: ["jamie_dornan"], music: [] },
                { title: "Hostage Situationship", scores: { F: null, O: 8},    blurb: "", cast: ["annabel", "jack"], hosts: ["jamie_dornan"], music: [] },
                { title: "The Time-Man", scores: { F: null, O: 3},    blurb: "I don't get it.", cast: ["annabel", "george", "paddy", "al", "emma"], hosts: [], music: [] },
                { title: "The Battle Within", scores: { F: null, O: 2},    blurb: "The type of sketch where there is just sort of one (unfunny) joke and it gets dragged out over several minutes with pretty much no variation.", cast: ["jack", "celeste", "hammed", "emma"], hosts: ["jamie_dornan"], music: [] },
                { title: "White Horses", scores: { F: null, O: 6},    blurb: "I get that they're a rock band... but did the Sky budget not extend to any kind of staging for the music?? Anyway, this song is pretty good and they definitely sound nice.", cast: [], hosts: [], music: ["wolf_alice"] },
                { title: "Weekend Update", scores: { F: null, O: 4},    blurb: "These two don't have the chemistry that Colin & Che do. I mean, I don't want them to have the exact same kind of rivalrous dynamic, but there really isn't anything there. In fact, they're pretty wooden - especially Paddy!", cast: ["ania", "paddy"], hosts: [], music: [] },
                { title: "Weekend Update: Ayoade Bamgboye", scores: { F: null, O: 6},    blurb: "Easily charisma-mogs the two anchors. Though I don't think the concept was fully fleshed out.", cast: ["ayoade", "paddy", "ania"], hosts: [], music: [] },
                { title: "Wrap Gluing Factory", scores: { F: null, O: 6},    blurb: "It's weirdly extremely well executed. But I just don't think this is a real premise?? It's observational humour about something that isn't true.", cast: ["jack", "annabel", "celeste", "ayoade", "larry", "george", "emma"], hosts: ["jamie_dornan"], music: [] },
                { title: "Beanz Bros", scores: { F: null, O: 4},    blurb: "", cast: ["larry", "jack"], hosts: [], music: [] },
                { title: "Leaning Against The Wall", scores: { F: null, O: 3},    blurb: "", cast: [], hosts: [], music: ["wolf_alice"] },
                { title: "The Condition", scores: { F: null, O: 5},    blurb: "", cast: ["hammed", "emma", "annabel"], hosts: ["jamie_dornan"], music: [] } 
              ]
            },

             {
              number: 3,
              title: "Episode 3",
              host: "riz_ahmed",
              musicalGuest: "kasabian",
              airDate: "",
              sketches: [  
                { title: "Cold Open: Iran War Speech", scores: { F: null, O: 4},    blurb: "There's something kind of depressing about the Keir bashing - which probably means it's working. The other impersonations felt a little half-baked.", cast: ["george", "al", "emma", "annabel"], hosts: [], music: [] },
                { title: "Monologue", scores: { F: null, O: 3},    blurb: "", cast: [], hosts: ["riz_ahmed"], music: [] },
                { title: "Why Does Everyone in TV and Movies?", scores: { F: null, O: 5},    blurb: "Cinema sins level braindead observational humour. But I like the country line dance of it all.", cast: ["jack", "ayoade", "emma", "al"], hosts: [], music: [] },
                { title: "Great Big Crab Man", scores: { F: null, O: 9},    blurb: "", cast: ["celeste", "emma", "annabel", "larry", "ayoade", "george"], hosts: ["riz_ahmed"], music: [] },
                { title: "Operation", scores: { F: null, O: 4},    blurb: "", cast: ["annabel", "celeste", "jack", "al", "ayoade"], hosts: ["riz_ahmed"], music: [] },
                { title: "OG FM", scores: { F: null, O: 9},    blurb: "When it's good, it's good! But why so inconsistent!", cast: ["hammed", "ayoade", "al"], hosts: ["riz_ahmed"], music: [] },
                { title: "GREAT PRETENDER", scores: { F: null, O: 2},    blurb: "Every single musical guest has been a boring white rock band. Come on guys.", cast: [], hosts: [], music: ["kasabian"] },
                { title: "Weekend Update", scores: { F: null, O: 7},    blurb: "+2 for Ania and -1 for Paddy", cast: ["ania", "paddy"], hosts: [], music: [] },
                { title: "Weekend Update: Chloe Bibby Rinkle", scores: { F: null, O: 8},    blurb: "", cast: ["emma", "ania", "paddy"], hosts: [], music: [] },
                { title: "Weekend Update: An Adorable Little Dormouse", scores: { F: null, O: 8},    blurb: "", cast: ["jack", "ania"], hosts: [], music: [] },
                { title: "Weekend Update: Patrick & Patrick Jr.", scores: { F: null, O: 3},    blurb: "", cast: ["george", "al", "paddy"], hosts: [], music: [] },
                { title: "Tales of Unspeakable Horror", scores: { F: null, O: 3},    blurb: "", cast: ["celeste", "hammed", "george", "ayoade", "al"], hosts: ["riz_ahmed"], music: [] },
                { title: "Release The Pressure", scores: { F: null, O: 5},    blurb: "Slightly better, thanks to Calvin Harris, I'm sure.", cast: [], hosts: [], music: ["kasabian"] },
                { title: "NCT Class", scores: { F: null, O: 7},    blurb: "", cast: ["ayoade", "celeste", "emma", "hammed", "annabel", "larry"], hosts: ["riz_ahmed"], music: [] } 

               ]
             }
          ]
        }
      ]
    }

  }
};
