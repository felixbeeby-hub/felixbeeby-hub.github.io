/* ============================================================
   SNL TRACKER — SEASONS PAGE
   ------------------------------------------------------------
   Renders one season at a time as a list of full-width episode
   boxes. Each episode expands to reveal its sketches; each
   sketch expands to reveal a blurb + cast list.

   Episode "avg" scores are computed here from sketch scores.
   ============================================================ */

(function () {
  'use strict';

  /* ---- small helpers ---- */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function param(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function pad2(n) {
    return String(n).length < 2 ? '0' + n : String(n);
  }

  /* Format a score: number -> one decimal, null/undefined -> dash */
  function fmtScore(n) {
    if (typeof n !== 'number') return '\u2014';   /* — */
    return String(Math.round(n * 10) / 10);
  }

  /* Average of the sketches that actually have a score */
  function episodeAvg(sketches) {
    var scored = sketches.filter(function (s) { return typeof s.score === 'number'; });
    if (!scored.length) return null;
    var sum = scored.reduce(function (a, s) { return a + s.score; }, 0);
    return sum / scored.length;
  }

  /* ---- pick which season to show ---- */
  function pickSeason(region) {
    var want = param('season');
    if (want) {
      var found = region.seasons.filter(function (s) {
        return String(s.id) === String(want);
      })[0];
      if (found) return found;
    }
    return region.seasons[0];
  }

  /* ---- HTML builders ---- */
  function sketchHtml(sk) {
    var registry = window.SNL.cast() || {};
    var cast = (sk.cast || []).map(function (id) {
      var m = registry[id];
      var name = m ? m.name : id;                 /* fall back to raw id */
      var page = (m && m.status === 'alumni') ? 'cast-alumni.html' : 'cast.html';
      return '<a class="cast-chip" href="' + page + '?member=' +
             encodeURIComponent(id) + '">' + esc(name) + '</a>';
    }).join('');

    return '' +
      '<li class="sketch">' +
        '<div class="sketch-head" role="button" tabindex="0" aria-expanded="false">' +
          '<span class="sketch-title">' + esc(sk.title) + '</span>' +
          '<span class="sketch-score">' + fmtScore(sk.score) + '</span>' +
          '<span class="chevron">\u25BE</span>' +
        '</div>' +
        '<div class="sketch-body"><div class="sketch-body-inner">' +
          '<p class="sketch-blurb">' + esc(sk.blurb || '') + '</p>' +
          '<div class="cast-row">' + (cast || '<span class="cast-chip">No cast listed</span>') + '</div>' +
        '</div></div>' +
      '</li>';
  }

  function episodeHtml(ep) {
    var avg = episodeAvg(ep.sketches || []);
    var sketches = (ep.sketches || []).map(sketchHtml).join('');

    return '' +
      '<article class="episode">' +
        '<div class="episode-head" role="button" tabindex="0" aria-expanded="false">' +
          '<span class="episode-num">EP ' + pad2(ep.number) + '</span>' +
          '<div class="episode-info">' +
            '<h3 class="episode-title">' + esc(ep.title) + '</h3>' +
            '<p class="episode-meta">Host: ' + esc(ep.host) +
              ' &nbsp;·&nbsp; Music: ' + esc(ep.musicalGuest) +
              ' &nbsp;·&nbsp; Aired: ' + esc(ep.airDate) + '</p>' +
          '</div>' +
          '<div class="episode-score">' +
            '<span class="score-num">' + fmtScore(avg) + '</span>' +
            '<span class="score-cap">avg</span>' +
          '</div>' +
          '<span class="chevron">\u25BE</span>' +
        '</div>' +
        '<div class="episode-body"><div class="episode-body-inner">' +
          '<ul class="sketch-list">' + sketches + '</ul>' +
        '</div></div>' +
      '</article>';
  }

  /* ---- main render ---- */
  function render() {
    var region = window.SNL.region();
    if (!region) return;

    var season = pickSeason(region);

    /* keep the URL in sync so the page is shareable / refreshable */
    var url = new URL(location.href);
    url.searchParams.set('season', season.id);
    history.replaceState(null, '', url);

    /* heading */
    document.getElementById('season-title').textContent =
      region.seasonWord + ' ' + season.id;
    var n = season.episodes.length;
    document.getElementById('season-subtitle').textContent =
      'Saturday Night Live ' + region.fullLabel + ' · ' +
      n + ' episode' + (n === 1 ? '' : 's');

    /* season switcher pills */
    document.getElementById('season-pills').innerHTML =
      region.seasons.map(function (s) {
        return '<button class="season-pill' +
          (s.id === season.id ? ' active' : '') +
          '" data-season="' + s.id + '">' +
          region.seasonWord + ' ' + s.id + '</button>';
      }).join('');

    /* episode list */
    var list = document.getElementById('episode-list');
    list.innerHTML = n
      ? season.episodes.map(episodeHtml).join('')
      : '<p class="empty">No episodes recorded for this season yet.</p>';
  }

  /* ---- expand / collapse ---- */
  function toggle(head) {
    var container = head.parentElement;            /* .episode or .sketch */
    var open = container.classList.toggle('open');
    head.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  /* delegated clicks: pills + accordion headers */
  document.addEventListener('click', function (e) {
    var pill = e.target.closest('.season-pill');
    if (pill) {
      var url = new URL(location.href);
      url.searchParams.set('season', pill.dataset.season);
      history.replaceState(null, '', url);
      render();
      return;
    }
    var head = e.target.closest('.episode-head, .sketch-head');
    if (head) toggle(head);
  });

  /* keyboard support for the accordion headers */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var head = e.target.closest('.episode-head, .sketch-head');
    if (head) {
      e.preventDefault();
      toggle(head);
    }
  });

  /* re-render when the user flips the US / UK toggle */
  document.addEventListener('snl:modechange', function () {
    /* the previous season id may not exist in the other edition,
       so drop it and let pickSeason fall back to the first one */
    var url = new URL(location.href);
    url.searchParams.delete('season');
    history.replaceState(null, '', url);
    render();
  });

  render();
})();
