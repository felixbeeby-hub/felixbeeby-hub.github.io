/* ============================================================
   SNL TRACKER — HOSTS & MUSICAL GUESTS PAGE
   ------------------------------------------------------------
   Shared by hosts.html and musical-guests.html. The page tells
   this script which registry to show via <body data-host-view>.

   Each host / guest renders as an expandable card (same look as
   the cast page) showing a bio, the episodes they were involved
   in, a per-rater average, an appearance count and a sketch
   list. All stats come from SNL.hostStats / SNL.musicStats.
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

  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2)
      .map(function (w) { return w.charAt(0); }).join('').toUpperCase();
  }

  /* 'hosts' (hosts.html) or 'music' (musical-guests.html) */
  var VIEW = document.body.dataset.hostView || 'hosts';
  var IS_MUSIC = (VIEW === 'music');

  /* a ?member=<id> deep-link — applied once on first render */
  var pendingMember = param('member');

  function registry() {
    return (IS_MUSIC ? window.SNL.music() : window.SNL.hosts()) || {};
  }

  function statsFor(id) {
    return IS_MUSIC ? window.SNL.musicStats(id) : window.SNL.hostStats(id);
  }

  /* ---- HTML builders ---- */
  function episodeRowHtml(e, word) {
    return '' +
      '<li>' +
        '<a class="cast-sketch-link" href="seasons.html?season=' +
            encodeURIComponent(e.seasonId) + '">' +
          '<span class="cast-sketch-where">' + esc(word + ' ' + e.seasonId) + '</span>' +
          '<span class="cast-sketch-title">Episode ' + e.episodeNumber + '</span>' +
        '</a>' +
      '</li>';
  }

  function sketchRowHtml(s, word) {
    return '' +
      '<li>' +
        '<a class="cast-sketch-link" href="seasons.html?season=' +
            encodeURIComponent(s.seasonId) + '">' +
          '<span class="cast-sketch-where">' +
            esc(word + ' ' + s.seasonId) + ' · Ep ' + s.episodeNumber + '</span>' +
          '<span class="cast-sketch-title">' + esc(s.title) + '</span>' +
          window.SNL.scorePairHtml(s.scores) +
        '</a>' +
      '</li>';
  }

  function cardHtml(id, m, word) {
    var stats = statsFor(id);
    var nEp = stats.episodes.length;

    var meta;
    if (!nEp) {
      meta = IS_MUSIC ? 'Musical guest' : 'Host';
    } else if (IS_MUSIC) {
      meta = 'Musical guest · ' + nEp + ' episode' + (nEp === 1 ? '' : 's');
    } else {
      meta = nEp + ' episode' + (nEp === 1 ? '' : 's') + ' hosted';
    }

    var episodes = nEp
      ? stats.episodes.map(function (e) { return episodeRowHtml(e, word); }).join('')
      : '<li class="cast-sketch-empty">No episodes logged yet.</li>';

    var sketches = stats.sketches.length
      ? stats.sketches.map(function (s) { return sketchRowHtml(s, word); }).join('')
      : '<li class="cast-sketch-empty">No sketch appearances logged yet.</li>';

    var avatar = m.photo
      ? '<img class="cast-avatar cast-avatar-photo" src="assets/images/hosts/' +
          esc(m.photo) + '" alt="' + esc(m.name) + '">'
      : '<span class="cast-avatar">' + esc(initials(m.name)) + '</span>';

    var photobig = m.photobig
      ? '<div class="cast-photo-row">' +
          (Array.isArray(m.photobig) ? m.photobig : [m.photobig]).map(function (p) {
            return '<img class="cast-dropdown-photo" src="assets/images/hosts/' +
                   esc(p) + '" alt="' + esc(m.name) + '">';
          }).join('') +
        '</div>'
      : '';

    return '' +
    '<article class="cast-card" data-id="' + esc(id) + '">' +
      '<div class="cast-head" role="button" tabindex="0" aria-expanded="false">' +
        avatar +
        '<div class="cast-id-info">' +
          '<h3 class="cast-name">' + esc(m.name) + '</h3>' +
          '<p class="cast-meta">' + esc(meta) + '</p>' +
        '</div>' +
        '<div class="cast-stat cast-stat-score">' +
          window.SNL.scorePairHtml(stats.avg) +
          '<span class="cast-stat-cap">avg</span>' +
        '</div>' +
        '<div class="cast-stat">' +
          '<span class="cast-stat-num">' + stats.appearances + '</span>' +
          '<span class="cast-stat-cap">sketch' + (stats.appearances === 1 ? '' : 'es') + '</span>' +
        '</div>' +
        '<span class="chevron">\u25BE</span>' +
      '</div>' +
      '<div class="cast-body"><div class="cast-body-inner">' +
        photobig +
        '<p class="cast-bio-above">' + (m.bio || '') + '</p>' +
        '<hr class="cast-inner-divider">' +
        '<h4 class="cast-subhead">' + (IS_MUSIC ? 'Episodes' : 'Episodes hosted') + '</h4>' +
        '<ul class="cast-sketch-list">' + episodes + '</ul>' +
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
    var reg = registry();
    var ids = Object.keys(reg);
    var n = ids.length;

    document.getElementById('host-subtitle').textContent =
      'Saturday Night Live ' + region.fullLabel + ' · ' +
      n + ' ' + (IS_MUSIC ? 'musical guest' : 'host') + (n === 1 ? '' : 's');

    var list = document.getElementById('host-list');

    if (!n) {
      list.innerHTML = '<p class="empty">No ' +
        (IS_MUSIC ? 'musical guests' : 'hosts') +
        ' recorded for this edition yet.</p>';
      return;
    }

    list.innerHTML = ids.map(function (id) {
      return cardHtml(id, reg[id], word);
    }).join('');

    /* deep-link: open + scroll to a specific person on first load */
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
