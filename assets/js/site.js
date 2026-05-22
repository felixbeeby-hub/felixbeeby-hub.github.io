/* ============================================================
   SNL TRACKER — SHARED SITE SCRIPT
   ------------------------------------------------------------
   Builds the header, navigation and footer on every page so
   there is exactly ONE place to edit them. Also owns the
   US / UK mode (persisted across pages via localStorage).

   Exposes a small API on `window.SNL` for page scripts:
     SNL.mode()        -> 'us' | 'uk'
     SNL.region()      -> the data block for the current mode
     SNL.homeCards()   -> section cards for the home page
   And dispatches a `snl:modechange` event on document when the
   user flips the toggle, so pages can re-render.
   ============================================================ */

(function () {
  'use strict';

  /* ---- Navigation config (structural data, edit here) ----
     Each top-level item may have:
       href      - its own page (optional)
       children  - dropdown links
       dynamic   - 'seasons' to auto-build from SNL_DATA
       description - used for the home-page section cards
     When you build a new page, add its filename to BUILT_PAGES
     (and/or give it an href here) and it stops showing "soon". */
  var NAV = [
    {
      label: 'Cast Members',
      children: [
        { label: 'Current Cast', href: 'cast.html' },
        { label: 'Alumni',       href: 'cast-alumni.html' }
      ],
      description: 'Browse current and former cast — Weekend Update anchors, featured players & more.'
    },
    {
      label: 'Hosts & Guests',
      children: [
        { label: 'All Hosts',      href: 'hosts.html' },
        { label: 'Musical Guests', href: 'musical-guests.html' }
      ],
      description: 'Every host, five-timer or first-timer, and every musical guest that graced the stage.'
    },
    {
      label: 'Seasons',
      href: 'seasons.html',
      dynamic: 'seasons',
      description: 'Dive into individual seasons — episodes, sketch scores, and your notes.'
    },
    {
      label: 'Favourites',
      children: [
        { label: 'Gallery',            href: 'gallery.html' },
        { label: 'Favourite Sketches', href: 'sketches.html' },
        { label: 'Favourite Segments', href: 'segments.html' }
      ],
      description: 'Your personal gallery of iconic sketches, recurring bits, and memorable segments.'
    }
  ];

  /* Pages that actually exist. Anything else renders as "soon". */
  var BUILT_PAGES = {
    'index.html': true,
    'seasons.html': true,
    'cast.html': true,
    'cast-alumni.html': true
  };

  var MODE_KEY = 'snl-mode';

  /* ---- Helpers ---- */
  function mode() {
    return document.documentElement.dataset.mode || 'us';
  }

  function setMode(m) {
    document.documentElement.dataset.mode = m;
    try { localStorage.setItem(MODE_KEY, m); } catch (e) { /* ignore */ }
  }

  function region() {
    return (window.SNL_DATA && window.SNL_DATA.regions[mode()]) || null;
  }

  function fileOf(href) {
    return (href || '').split('?')[0].split('/').pop();
  }

  function currentFile() {
    var f = fileOf(location.pathname) || 'index.html';
    return f;
  }

  function isBuilt(href) {
    return !!BUILT_PAGES[fileOf(href)];
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* Build the dynamic "Seasons" dropdown from the data file. */
  function seasonsChildren() {
    var r = region();
    if (!r) return [];
    return r.seasons.map(function (s) {
      return {
        label: r.seasonWord + ' ' + s.id,
        href: 'seasons.html?season=' + s.id
      };
    });
  }

  /* ---- Header / nav rendering ---- */
  function navItemHtml(item) {
    var children = item.children ? item.children.slice() : [];
    if (item.dynamic === 'seasons') children = seasonsChildren();

    var hasChildren = children.length > 0;
    var active = item.href && fileOf(item.href) === currentFile();
    var arrow = hasChildren ? ' <span class="nav-arrow">\u25BE</span>' : '';

    var top;
    if (item.href) {
      var disabled = !isBuilt(item.href);
      top = '<a class="nav-btn' + (disabled ? ' nav-disabled' : '') + '" href="' +
            (disabled ? '#' : item.href) + '"' +
            (disabled ? ' aria-disabled="true"' : '') + '>' +
            escapeHtml(item.label) + arrow + '</a>';
    } else {
      top = '<button class="nav-btn" type="button">' + escapeHtml(item.label) + arrow + '</button>';
    }

    var dd = '';
    if (hasChildren) {
      dd = '<div class="dropdown">' + children.map(function (c) {
        var dis = !isBuilt(c.href);
        return '<a href="' + (dis ? '#' : c.href) + '"' +
               (dis ? ' class="nav-disabled" aria-disabled="true"' : '') + '>' +
               escapeHtml(c.label) + (dis ? '<span class="soon">soon</span>' : '') + '</a>';
      }).join('') + '</div>';
    }

    var liClass = 'nav-item' +
      (hasChildren ? ' has-children' : '') +
      (active ? ' active' : '');
    return '<li class="' + liClass + '">' + top + dd + '</li>';
  }

  function buildHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;
    var m = mode();

    header.innerHTML =
      '<div class="header-inner">' +
        '<a class="logo" href="index.html">SNL</a>' +
        '<div class="toggle-wrap">' +
          '<span class="toggle-label ' + (m === 'us' ? 'active' : '') + '">US</span>' +
          '<button class="toggle-btn" id="modeToggle" type="button" ' +
                  'aria-label="Switch between US and UK editions">' +
            '<span class="toggle-inner-label label-us">US</span>' +
            '<span class="toggle-inner-label label-uk">UK</span>' +
            '<span class="toggle-knob"></span>' +
          '</button>' +
          '<span class="toggle-label ' + (m === 'uk' ? 'active' : '') + '">UK</span>' +
        '</div>' +
        '<nav><ul>' + NAV.map(navItemHtml).join('') + '</ul></nav>' +
      '</div>';

    document.getElementById('modeToggle')
      .addEventListener('click', toggleMode);

    /* Touch-friendly: clicking a dropdown header toggles it open. */
    header.querySelectorAll('.nav-item.has-children > .nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (btn.tagName === 'A') return;          /* real links navigate */
        e.preventDefault();
        e.stopPropagation();
        var li = btn.closest('.nav-item');
        var wasOpen = li.classList.contains('open');
        closeDropdowns();
        if (!wasOpen) li.classList.add('open');
      });
    });
  }

  function closeDropdowns() {
    document.querySelectorAll('.nav-item.open').forEach(function (li) {
      li.classList.remove('open');
    });
  }

  function buildFooter() {
    var footer = document.getElementById('site-footer');
    if (!footer) return;
    var r = region();
    footer.textContent = 'SNL ' + (r ? r.label : '') + ' Tracker · Personal use only · ' +
                         'Not affiliated with ' + (r ? r.network : '');
  }

  /* ---- Mode toggle ---- */
  function updateFavicon(m) {
    var link32 = document.querySelector('link[sizes="32x32"]');
    var link16 = document.querySelector('link[sizes="16x16"]');
    var linkIco = document.querySelector('link[type="image/x-icon"]');
    if (m === 'uk') {
      if (link32) link32.href = 'assets/images/favicons/favicon-uk-32x32.png';
      if (link16) link16.href = 'assets/images/favicons/favicon-uk-16x16.png';
      if (linkIco) linkIco.href = 'assets/images/favicons/favicon-uk.ico';
    } else {
      if (link32) link32.href = 'assets/images/favicons/favicon-32x32.png';
      if (link16) link16.href = 'assets/images/favicons/favicon-16x16.png';
      if (linkIco) linkIco.href = 'assets/images/favicons/favicon.ico';
    }
  }

  function toggleMode() {
    setMode(mode() === 'us' ? 'uk' : 'us');

    document.body.classList.add('switching');
    setTimeout(function () { document.body.classList.remove('switching'); }, 400);

    buildHeader();
    buildFooter();
    updateFavicon(mode());
    document.dispatchEvent(new CustomEvent('snl:modechange', { detail: { mode: mode() } }));
  }
  /* ---- Global listeners ---- */
  document.addEventListener('click', function (e) {
    /* stop disabled links from jumping the page */
    if (e.target.closest('.nav-disabled')) e.preventDefault();
    /* close any open dropdown when clicking elsewhere */
    if (!e.target.closest('.nav-item')) closeDropdowns();
  });

  /* ---- Public API for page scripts ---- */
  window.SNL = {
    mode: mode,
    region: region,
    homeCards: function () {
      return NAV.map(function (item) {
        var href = item.href;
        if (!href && item.children && item.children.length) href = item.children[0].href;
        return {
          label: item.label,
          description: item.description || '',
          href: href || null,
          built: href ? isBuilt(href) : false
        };
      });
    },

    /* The cast registry for the current edition (id -> member). */
    cast: function () {
      var r = region();
      return r ? (r.cast || {}) : {};
    },

    /* Cross-references every sketch in the current edition and
       returns derived stats for one cast member id:
         appearances - number of sketches they're tagged in
         avg         - average score over RATED sketches (or null)
         sketches    - [{ seasonId, episodeNumber, episodeTitle,
                           title, score }]                          */
    castStats: function (id) {
      var r = region();
      var out = { appearances: 0, avg: null, sketches: [] };
      if (!r) return out;

      var scored = [];
      r.seasons.forEach(function (s) {
        s.episodes.forEach(function (ep) {
          (ep.sketches || []).forEach(function (sk) {
            if ((sk.cast || []).indexOf(id) === -1) return;
            out.appearances++;
            var score = (typeof sk.score === 'number') ? sk.score : null;
            out.sketches.push({
              seasonId: s.id,
              episodeNumber: ep.number,
              episodeTitle: ep.title,
              title: sk.title,
              score: score
            });
            if (score !== null) scored.push(score);
          });
        });
      });

      if (scored.length) {
        out.avg = scored.reduce(function (a, b) { return a + b; }, 0) / scored.length;
      }
      return out;
    }
  };

  /* ---- Init (deferred script => DOM + data are ready) ---- */
  buildHeader();
  buildFooter();
   updateFavicon(mode());
})();
