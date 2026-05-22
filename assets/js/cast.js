/* ============================================================
   SNL TRACKER — CAST PAGE
   ------------------------------------------------------------
   Shared by cast.html and cast-alumni.html. The page tells this
   script which view to show via <body data-cast-view="...">.

   Each cast member renders as an expandable card showing a bio,
   a calculated average score, an appearance count, and the list
   of sketches they're tagged in. All stats come from
   SNL.castStats() — nothing is stored in the data file.
   ============================================================ */

(function () {
  'use strict';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function param(n) {
    return new URLSearchParams(location.search).get(n);
  }

  /* number -> one decimal, null -> dash */
  function fmtScore(n) {
    return typeof n === 'number' ? String(Math.round(n * 10) / 10) : '\u2014';
  }

  /* "Placeholder Cast One" -> "PC" */
  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2)
      .map(function (w) { return w.charAt(0); }).join('').toUpperCase();
  }

  /* [50,51] -> "Seasons 50–51"  ·  [51] -> "Season 51" */
  function fmtSeasons(arr, word) {
    if (!arr || !arr.length) return '';
    var nums = arr.slice().sort(function (a, b) { return a - b; });
    if (nums.length === 1) return word + ' ' + nums[0];
    return word + 's ' + nums[0] + '\u2013' + nums[nums.length - 1];
  }

  /* 'current' (cast.html) or 'alumni' (cast-alumni.html) */
  var VIEW = document.body.dataset.castView || 'current';

  /* a ?member=<id> deep-link — applied once on first render */
  var pendingMember = param('member');

  /* ---- HTML builders ---- */
  function sketchRowHtml(s, word) {
    return '' +
      '<li>' +
        '<a class="cast-sketch-link" href="seasons.html?season=' +
            encodeURIComponent(s.seasonId) + '">' +
          '<span class="cast-sketch-where">' +
            esc(word + ' ' + s.seasonId) + ' · Ep ' + s.episodeNumber + '</span>' +
          '<span class="cast-sketch-title">' + esc(s.title) + '</span>' +
          '<span class="sketch-score">' + fmtScore(s.score) + '</span>' +
        '</a>' +
      '</li>';
  }

  function cardHtml(id, m, word) {
    var stats = window.SNL.castStats(id);

    var sketches = stats.sketches.length
      ? stats.sketches.map(function (s) { return sketchRowHtml(s, word); }).join('')
      : '<li class="cast-sketch-empty">No sketches logged for this member yet.</li>';

    var meta = esc(m.role || 'Cast');
    if (m.seasons && m.seasons.length) {
      meta += ' · ' + esc(fmtSeasons(m.seasons, word));
    }

    return '' +
    '<article class="cast-card" data-id="' + esc(id) + '">' +
      '<div class="cast-head" role="button" tabindex="0" aria-expanded="false">' +
        (m.photo
  ? '<img class="cast-avatar cast-avatar-photo" src="images/cast/' + esc(m.photo) + '" alt="' + esc(m.name) + '">'
  : '<span class="cast-avatar">' + esc(initials(m.name)) + '</span>') +
        '<div class="cast-id-info">' +
          '<h3 class="cast-name">' + esc(m.name) + '</h3>' +
          '<p class="cast-meta">' + meta + '</p>' +
        '</div>' +
        '<div class="cast-stat">' +
          '<span class="cast-stat-num">' + fmtScore(stats.avg) + '</span>' +
          '<span class="cast-stat-cap">avg</span>' +
        '</div>' +
        '<div class="cast-stat">' +
          '<span class="cast-stat-num">' + stats.appearances + '</span>' +
          '<span class="cast-stat-cap">sketch' + (stats.appearances === 1 ? '' : 'es') + '</span>' +
        '</div>' +
        '<span class="chevron">\u25BE</span>' +
      '</div>' +
      '<div class="cast-body"><div class="cast-body-inner">' +
        (m.photo
  ? '<img class="cast-dropdown-photo" src="images/cast/' + esc(m.photo) + '" alt="' + esc(m.name) + '">'
  : '') +
'<p class="cast-bio">' + esc(m.bio || '') + '</p>' +
'<h4 class="cast-subhead">Sketch appearances</h4>' +
        '<ul class="cast-sketch-list">' + sketches + '</ul>' +
      '</div></div>' +
    '</article>';
  }

  /* ---- main render ---- */
  function render() {
    var region = window.SNL.region();
    if (!region) return;

    var word = region.seasonWord;
    var registry = region.cast || {};
    var ids = Object.keys(registry).filter(function (id) {
      return (registry[id].status || 'current') === VIEW;
    });

    var n = ids.length;
    document.getElementById('cast-subtitle').textContent =
      'Saturday Night Live ' + region.fullLabel + ' · ' +
      n + ' ' + (VIEW === 'alumni' ? 'former ' : '') +
      'cast member' + (n === 1 ? '' : 's');

    var list = document.getElementById('cast-list');

    if (!n) {
      list.innerHTML = '<p class="empty">No ' +
        (VIEW === 'alumni' ? 'former cast members' : 'current cast') +
        ' recorded for this edition yet.</p>';
      return;
    }

    list.innerHTML = ids.map(function (id) {
      return cardHtml(id, registry[id], word);
    }).join('');

    /* deep-link: open + scroll to a specific member on first load */
    if (pendingMember && /^[\w-]+$/.test(pendingMember)) {
      var card = list.querySelector('.cast-card[data-id="' + pendingMember + '"]');
      if (card) {
        card.classList.add('open');
        card.querySelector('.cast-head').setAttribute('aria-expanded', 'true');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    pendingMember = null;
  }

  /* ---- expand / collapse ---- */
  function toggle(head) {
    var card = head.parentElement;
    var open = card.classList.toggle('open');
    head.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  document.addEventListener('click', function (e) {
    var head = e.target.closest('.cast-head');
    if (head) toggle(head);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var head = e.target.closest('.cast-head');
    if (head) {
      e.preventDefault();
      toggle(head);
    }
  });

  /* re-render when the US / UK toggle is flipped */
  document.addEventListener('snl:modechange', render);

  render();
})();
