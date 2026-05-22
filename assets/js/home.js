/* ============================================================
   SNL TRACKER — HOME PAGE
   Fills in the mode-specific hero text and builds the section
   cards from the shared nav config. No content is hard-coded.
   ============================================================ */

(function () {
  'use strict';

  function renderHero() {
    var r = window.SNL.region();
    if (!r) return;
    document.getElementById('hero-eyebrow').textContent = r.heroEyebrow;
    document.getElementById('hero-title').innerHTML = r.heroTitle;  /* contains <br> */
  }

  function renderCards() {
    var grid = document.getElementById('home-cards');
    if (!grid) return;

    grid.innerHTML = window.SNL.homeCards().map(function (c) {
      var tag = c.built
        ? '<p class="card-tag">Section</p>'
        : '<p class="card-tag">Section <span class="soon">soon</span></p>';
      var inner =
        tag +
        '<h3>' + c.label + '</h3>' +
        '<p class="card-desc">' + c.description + '</p>';

      if (c.built && c.href) {
        return '<a class="card" href="' + c.href + '">' + inner + '</a>';
      }
      return '<div class="card card-disabled">' + inner + '</div>';
    }).join('');
  }

  renderHero();
  renderCards();

  /* Hero copy changes between US / UK editions. */
  document.addEventListener('snl:modechange', renderHero);
})();
