/* ============================================================
   SNL TRACKER — IN-SITE EDITOR
   ------------------------------------------------------------
   Lets you add / edit / delete seasons, episodes, sketches,
   cast, hosts and musical guests straight from the website.

   HOW IT SAVES
     The site is static (GitHub Pages), so "saving" means
     committing a new data/snl-data.js to the repo through the
     GitHub API, using a personal access token that is kept in
     this browser only (localStorage). Every save:
       1. fetches the latest data file from GitHub
       2. applies your one change to it
       3. commits it back (one commit per change)
     so two people editing at once don't overwrite each other.

   Nothing here runs unless you click "✎ Edit" in the header.
   ============================================================ */

(function () {
  'use strict';

  /* ---- Repo config ---- */
  var CFG = {
    owner:    'felixbeeby-hub',
    repo:     'felixbeeby-hub.github.io',
    branch:   'main',
    dataPath: 'data/snl-data.js'
  };

  var TOKEN_KEY   = 'snl-gh-token';
  var EDIT_KEY    = 'snl-edit-mode';
  var PENDING_KEY = 'snl-data-pending';

  /* ==========================================================
     1. DATA FILE  (serialise <-> parse)
     ========================================================== */

  var HEADER =
    '/* ============================================================\n' +
    '   SNL TRACKER — DATA FILE\n' +
    '   ------------------------------------------------------------\n' +
    '   Single source of truth for all SNL content.\n' +
    '\n' +
    '   Normally edited from the website itself: click "✎ Edit" in\n' +
    '   the header. The editor rewrites this whole file on every\n' +
    '   save, so comments added here by hand will not survive.\n' +
    '   Hand-editing still works fine if you need it.\n' +
    '\n' +
    '   STRUCTURE\n' +
    '     raters                      people who score sketches\n' +
    '     regions.<us|uk>.hosts       { id: { name, bio, photo?, photobig? } }\n' +
    '     regions.<us|uk>.music       { id: { name, bio, photo?, photobig? } }\n' +
    '     regions.<us|uk>.cast        { id: { name, status, role, seasons,\n' +
    '                                         bio, photo?, photobig? } }\n' +
    '     regions.<us|uk>.seasons     [ { id, episodes: [ { number, title,\n' +
    '                                   host, musicalGuest, airDate,\n' +
    '                                   sketches: [ { title, scores, blurb,\n' +
    '                                   cast, hosts, music } ] } ] } ]\n' +
    '\n' +
    '   Episodes reference host / musicalGuest by id; sketches list\n' +
    '   cast / hosts / music by id. Scores: { F: 8, O: null }.\n' +
    '   ============================================================ */\n\n';

  var IDENT = /^[A-Za-z_$][\w$]*$/;
  function fmtKey(k) { return IDENT.test(k) ? k : JSON.stringify(k); }

  function inline(v) {
    if (v === undefined) v = null;
    if (v === null || typeof v !== 'object') return JSON.stringify(v);
    if (Array.isArray(v)) return '[' + v.map(inline).join(', ') + ']';
    var ks = Object.keys(v).filter(function (k) { return v[k] !== undefined; });
    if (!ks.length) return '{}';
    return '{ ' + ks.map(function (k) { return fmtKey(k) + ': ' + inline(v[k]); }).join(', ') + ' }';
  }

  /* Pretty-print: short things (and every sketch) on one line,
     everything else indented — keeps the file readable and
     the GitHub diffs small. */
  function fmt(v, ind) {
    var one = inline(v);
    if (v === null || typeof v !== 'object') return one;
    var isSketch = !Array.isArray(v) && Object.prototype.hasOwnProperty.call(v, 'scores');
    if (isSketch || one.length + ind.length <= 100) return one;
    var inner = ind + '  ';
    if (Array.isArray(v)) {
      return '[\n' + v.map(function (x) { return inner + fmt(x, inner); }).join(',\n') + '\n' + ind + ']';
    }
    var ks = Object.keys(v).filter(function (k) { return v[k] !== undefined; });
    return '{\n' + ks.map(function (k) {
      return inner + fmtKey(k) + ': ' + fmt(v[k], inner);
    }).join(',\n') + '\n' + ind + '}';
  }

  function serialize(data) {
    return HEADER + 'window.SNL_DATA = ' + fmt(data, '') + ';\n';
  }

  function parse(text) {
    var w = {};
    /* the data file is plain JS that assigns window.SNL_DATA */
    new Function('window', text)(w);           // eslint-disable-line no-new-func
    if (!w.SNL_DATA || !w.SNL_DATA.regions) throw new Error('Data file did not define SNL_DATA');
    return w.SNL_DATA;
  }

  /* Exposed for tooling / tests (and node). */
  var API = { serialize: serialize, parse: parse, CFG: CFG };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  if (typeof window !== 'undefined') window.SNLEditor = API;
  if (typeof document === 'undefined' || !window.SNL) return;

  /* ==========================================================
     2. GITHUB API
     ========================================================== */

  function token() {
    try { return localStorage.getItem(TOKEN_KEY) || ''; } catch (e) { return ''; }
  }

  function gh(path, opts) {
    opts = opts || {};
    var headers = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Authorization': 'Bearer ' + (opts.token || token())
    };
    if (opts.body) headers['Content-Type'] = 'application/json';
    var url = 'https://api.github.com/repos/' + CFG.owner + '/' + CFG.repo + path;
    return fetch(url, {
      method: opts.method || 'GET',
      headers: headers,
      cache: 'no-store',
      body: opts.body ? JSON.stringify(opts.body) : undefined
    }).then(function (res) {
      if (res.ok) return res.json();
      return res.json().catch(function () { return {}; }).then(function (j) {
        var err = new Error(j.message || ('GitHub error ' + res.status));
        err.status = res.status;
        throw err;
      });
    });
  }

  function b64encode(str) {
    var bytes = new TextEncoder().encode(str);
    var bin = '';
    for (var i = 0; i < bytes.length; i += 0x8000) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    }
    return btoa(bin);
  }

  function b64decode(b64) {
    var bin = atob(b64.replace(/\s/g, ''));
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function contentsPath(p) {
    return '/contents/' + p.split('/').map(encodeURIComponent).join('/');
  }

  /* our own last successful write — GitHub's read API can lag a
     few seconds behind, so prefer this for back-to-back edits */
  var lastWrite = null;   /* { sha, text } */

  function fetchLatest() {
    return gh(contentsPath(CFG.dataPath) + '?ref=' + CFG.branch).then(function (j) {
      return { sha: j.sha, text: b64decode(j.content) };
    });
  }

  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  /* Apply `mutate(data)` to the freshest copy and commit it. */
  function commitChange(message, mutate) {
    var attempt = 0;
    function tryOnce(useCache) {
      var src = (useCache && lastWrite) ? Promise.resolve(lastWrite) : fetchLatest();
      return src.then(function (latest) {
        var data = parse(latest.text);
        var result = mutate(data);
        var text = serialize(data);
        if (text === latest.text) return { data: data, result: result, unchanged: true };
        return gh(contentsPath(CFG.dataPath), {
          method: 'PUT',
          body: {
            message: message,
            content: b64encode(text),
            sha: latest.sha,
            branch: CFG.branch
          }
        }).then(function (res) {
          lastWrite = { sha: res.content.sha, text: text };
          return { data: data, result: result };
        });
      }).catch(function (err) {
        /* 409/422 = file changed under us; refetch and re-apply */
        if ((err.status === 409 || err.status === 422) && attempt < 3) {
          attempt++;
          lastWrite = null;
          return sleep(1200 * attempt).then(function () { return tryOnce(false); });
        }
        throw err;
      });
    }
    return tryOnce(true).then(function (out) {
      applyLocal(out.data, true);
      return out.result;
    });
  }

  /* Upload an image to assets/images/<folder>/; returns filename. */
  function uploadImage(folder, file) {
    var name = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '_');
    var path = 'assets/images/' + folder + '/' + name;
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onload = function () { resolve(String(fr.result).split(',')[1]); };
      fr.onerror = reject;
      fr.readAsDataURL(file);
    }).then(function (content) {
      return gh(contentsPath(path) + '?ref=' + CFG.branch)
        .then(function (j) { return j.sha; }, function () { return undefined; })
        .then(function (sha) {
          return gh(contentsPath(path), {
            method: 'PUT',
            body: { message: 'Upload ' + path, content: content, sha: sha, branch: CFG.branch }
          });
        });
    }).then(function () { return name; });
  }

  /* ==========================================================
     3. LOCAL STATE
     ========================================================== */

  function applyLocal(data, remember) {
    window.SNL_DATA = data;
    if (remember) {
      try {
        localStorage.setItem(PENDING_KEY, JSON.stringify({ savedAt: Date.now(), data: data }));
      } catch (e) { /* ignore */ }
    }
    var keep = captureOpen();
    document.dispatchEvent(new CustomEvent('snl:datachange'));
    restoreOpen(keep);
  }

  /* remember which accordions were open so a save doesn't collapse them */
  function captureOpen() {
    return Array.prototype.map.call(
      document.querySelectorAll('.episode.open, .cast-card.open'),
      function (el) { return el.dataset.ep != null ? 'ep:' + el.dataset.ep : 'id:' + el.dataset.id; }
    ).concat(openAfterSave.splice(0));
  }

  function restoreOpen(keys) {
    keys.forEach(function (k) {
      var sel = k.indexOf('ep:') === 0
        ? '.episode[data-ep="' + k.slice(3) + '"]'
        : '.cast-card[data-id="' + k.slice(3) + '"]';
      var el = document.querySelector(sel);
      if (!el) return;
      el.classList.add('open');
      var head = el.querySelector('.episode-head, .cast-head');
      if (head) head.setAttribute('aria-expanded', 'true');
    });
  }

  var openAfterSave = [];

  function editing() { return document.body.classList.contains('snl-editing'); }

  function setEditing(on) {
    document.body.classList.toggle('snl-editing', on);
    try { localStorage.setItem(EDIT_KEY, on ? '1' : ''); } catch (e) { /* ignore */ }
    if (on) refreshFromGitHub();
  }

  /* when entering edit mode, pull the very latest data (the Pages
     copy can be a minute or so behind) */
  function refreshFromGitHub() {
    fetchLatest().then(function (latest) {
      var data = parse(latest.text);
      if (JSON.stringify(data) !== JSON.stringify(window.SNL_DATA)) applyLocal(data, false);
    }).catch(function (err) {
      if (err.status === 401) toast('Your GitHub token was rejected — click Edit to re-enter it.', 'err');
    });
  }

  /* ==========================================================
     4. SMALL UI HELPERS
     ========================================================== */

  var esc = window.SNL.escapeHtml;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var toastTimer;
  function toast(msg, kind) {
    var t = $('#snl-ed-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'snl-ed-toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.className = 'show ' + (kind || '');
    t.textContent = msg;
    clearTimeout(toastTimer);
    if (kind !== 'busy') toastTimer = setTimeout(function () { t.className = ''; }, kind === 'err' ? 7000 : 3500);
  }

  function slugify(name) {
    return String(name).toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'item';
  }

  function uniqueId(base, reg) {
    var id = base, n = 2;
    while (reg[id]) id = base + '_' + (n++);
    return id;
  }

  /* Find (or create) a host / musical guest by display name. */
  function resolvePerson(reg, name) {
    name = (name || '').trim();
    if (!name) return '';
    if (reg[name]) return name;                         /* typed an id */
    var lower = name.toLowerCase();
    var found = Object.keys(reg).filter(function (id) {
      return (reg[id].name || '').toLowerCase() === lower;
    })[0];
    if (found) return found;
    var id = uniqueId(slugify(name), reg);
    reg[id] = { name: name, bio: '' };
    return id;
  }

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'];

  /* "4 October 2025" <-> "2025-10-04" */
  function dateToInput(s) {
    var m = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec((s || '').trim());
    if (!m) return '';
    var mi = MONTHS.map(function (x) { return x.toLowerCase().slice(0, 3); })
      .indexOf(m[2].toLowerCase().slice(0, 3));
    if (mi < 0) return '';
    return m[3] + '-' + String(mi + 1).padStart(2, '0') + '-' + m[1].padStart(2, '0');
  }
  function inputToDate(v) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || '');
    return m ? (+m[3]) + ' ' + MONTHS[+m[2] - 1] + ' ' + m[1] : '';
  }

  /* "47-51, 53" -> [47,48,49,50,51,53] and back */
  function parseSeasons(s) {
    var out = [];
    String(s || '').split(/[,\s]+/).forEach(function (part) {
      var m = /^(\d+)\s*[-–]\s*(\d+)$/.exec(part);
      if (m) { for (var i = +m[1]; i <= +m[2]; i++) out.push(i); }
      else if (/^\d+$/.test(part)) out.push(+part);
    });
    return out.filter(function (v, i, a) { return a.indexOf(v) === i; }).sort(function (a, b) { return a - b; });
  }
  function seasonsToText(arr) {
    arr = (arr || []).slice().sort(function (a, b) { return a - b; });
    var out = [], start = null, prev = null;
    arr.concat([null]).forEach(function (n) {
      if (start === null) { start = prev = n; return; }
      if (n === prev + 1) { prev = n; return; }
      out.push(start === prev ? String(start) : start + '-' + prev);
      start = prev = n;
    });
    return out.join(', ');
  }

  function scoreVal(input) {
    var v = input.value.trim();
    if (v === '') return null;
    var n = Number(v);
    return isNaN(n) ? null : n;
  }

  /* ---- modal ---- */
  function openModal(opts) {
    closeModal();
    var dlg = document.createElement('dialog');
    dlg.id = 'snl-ed-dialog';
    dlg.innerHTML =
      '<form method="dialog" class="ed-form" novalidate>' +
        '<h2 class="ed-title">' + esc(opts.title) + '</h2>' +
        '<div class="ed-fields">' + opts.body + '</div>' +
        '<p class="ed-error" hidden></p>' +
        '<div class="ed-actions">' +
          (opts.onDelete ? '<button type="button" class="ed-btn-danger" data-act="delete">Delete</button>' : '') +
          '<span class="ed-spacer"></span>' +
          '<button type="button" class="ed-btn-ghost" data-act="cancel">Cancel</button>' +
          (opts.saveAnother ? '<button type="button" class="ed-btn-ghost" data-act="another">Save &amp; add another</button>' : '') +
          '<button type="submit" class="ed-btn-primary" data-act="save">' + esc(opts.saveLabel || 'Save') + '</button>' +
        '</div>' +
      '</form>';
    document.body.appendChild(dlg);
    var form = $('form', dlg);
    var errEl = $('.ed-error', dlg);

    function busy(on) {
      $$('button', dlg).forEach(function (b) { b.disabled = on; });
      dlg.classList.toggle('busy', on);
    }
    function fail(err) {
      busy(false);
      errEl.hidden = false;
      errEl.textContent = describeError(err);
    }
    function run(fn, again) {
      errEl.hidden = true;
      var res;
      try { res = fn(form, again); } catch (e) { fail(e); return; }
      if (!res || !res.then) return;
      busy(true);
      res.then(function (keepOpen) {
        busy(false);
        if (!keepOpen) closeModal();
      }, fail);
    }

    form.addEventListener('submit', function (e) { e.preventDefault(); run(opts.onSave, false); });
    dlg.addEventListener('click', function (e) {
      var act = e.target.closest('[data-act]');
      if (!act) return;
      if (act.dataset.act === 'cancel') closeModal();
      if (act.dataset.act === 'another') run(opts.onSave, true);
      if (act.dataset.act === 'delete') {
        if (!act.classList.contains('confirm')) {
          act.classList.add('confirm');
          act.textContent = opts.deleteConfirm || 'Click again to delete';
          return;
        }
        run(opts.onDelete, false);
      }
    });
    dlg.addEventListener('close', function () { dlg.remove(); });
    dlg.showModal();
    if (opts.onMount) opts.onMount(form);
    var first = $('input:not([type=hidden]):not([type=file]), textarea', form);
    if (first) first.focus();
    return form;
  }

  function closeModal() {
    var d = $('#snl-ed-dialog');
    if (d) { d.close(); d.remove(); }
  }

  function describeError(err) {
    if (!err) return 'Something went wrong.';
    if (err.status === 401) return 'GitHub rejected the token. Use "Change token" to enter a new one.';
    if (err.status === 403 || err.status === 404) return 'This token can\'t write to the repo (' + err.message + '). Check it has Contents: read & write access.';
    return err.message || String(err);
  }

  function field(label, inner, hint) {
    return '<label class="ed-field"><span class="ed-label">' + esc(label) + '</span>' + inner +
           (hint ? '<span class="ed-hint">' + hint + '</span>' : '') + '</label>';
  }
  function input(name, value, attrs) {
    return '<input name="' + name + '" value="' + esc(value == null ? '' : value) + '" ' + (attrs || '') + '>';
  }
  function datalist(id, names) {
    return '<datalist id="' + id + '">' + names.map(function (n) {
      return '<option value="' + esc(n) + '">';
    }).join('') + '</datalist>';
  }
  function namesOf(reg) {
    return Object.keys(reg).map(function (id) { return reg[id].name; })
      .sort(function (a, b) { return a.localeCompare(b); });
  }

  /* ==========================================================
     5. CONTEXT  (what's on screen right now)
     ========================================================== */

  function rk() { return window.SNL.mode(); }
  function regionOf(data, key) { return data.regions[key || rk()]; }
  function word() { return window.SNL.region().seasonWord; }

  function currentSeasonId() {
    return new URLSearchParams(location.search).get('season');
  }

  function seasonIn(data, key, sid) {
    return regionOf(data, key).seasons.filter(function (s) { return String(s.id) === String(sid); })[0];
  }

  function need(x, what) {
    if (!x) throw new Error(what + ' no longer exists — someone may have changed it. Reload the page.');
    return x;
  }

  function goToSeason(id) {
    var url = new URL(location.href);
    url.searchParams.set('season', id);
    history.replaceState(null, '', url);
  }

  /* ==========================================================
     6. FORMS
     ========================================================== */

  /* ---- Season ---- */
  function seasonForm(existingId) {
    var key = rk();
    var region = window.SNL.region();
    var ids = region.seasons.map(function (s) { return +s.id; });
    var isNew = existingId == null;
    var def = isNew ? (ids.length ? Math.max.apply(null, ids) + 1 : 1) : existingId;
    var nEps = isNew ? 0 : (seasonIn(window.SNL_DATA, key, existingId).episodes || []).length;

    openModal({
      title: isNew ? 'Add ' + word().toLowerCase() : 'Edit ' + word() + ' ' + existingId,
      body: field(word() + ' number', input('seasonNum', def, 'type="number" min="1" required')) +
            (isNew ? '<p class="ed-note">Tip: remember to add this ' + word().toLowerCase() +
              ' to returning cast members\' season lists (edit them on the Cast page).</p>' : ''),
      onDelete: isNew ? null : function () {
        return commitChange('Delete ' + word() + ' ' + existingId + ' (' + key.toUpperCase() + ')', function (d) {
          var r = regionOf(d, key);
          r.seasons = r.seasons.filter(function (s) { return String(s.id) !== String(existingId); });
        }).then(function () {
          var url = new URL(location.href); url.searchParams.delete('season');
          history.replaceState(null, '', url);
          document.dispatchEvent(new CustomEvent('snl:datachange'));
          toast('Deleted.', 'ok');
        });
      },
      deleteConfirm: nEps ? 'Delete it AND its ' + nEps + ' episodes?' : null,
      onSave: function (f) {
        var id = parseInt(f.seasonNum.value, 10);
        if (!id) throw new Error('Enter a number.');
        if (ids.indexOf(id) !== -1 && id !== +existingId) throw new Error(word() + ' ' + id + ' already exists.');
        var msg = isNew ? 'Add ' + word() + ' ' + id : 'Renumber ' + word() + ' ' + existingId + ' → ' + id;
        return commitChange(msg + ' (' + key.toUpperCase() + ')', function (d) {
          var r = regionOf(d, key);
          if (isNew) r.seasons.push({ id: id, episodes: [] });
          else need(seasonIn(d, key, existingId), 'This season').id = id;
          r.seasons.sort(function (a, b) { return b.id - a.id; });   /* newest first */
        }).then(function () {
          goToSeason(id);
          document.dispatchEvent(new CustomEvent('snl:datachange'));
          toast('Saved.', 'ok');
        });
      }
    });
  }

  /* ---- Episode ---- */
  function episodeForm(epIndex) {
    var key = rk();
    var sid = currentSeasonId();
    var region = window.SNL.region();
    var season = seasonIn(window.SNL_DATA, key, sid);
    if (!season) { toast('Add a ' + word().toLowerCase() + ' first.', 'err'); return; }
    var isNew = epIndex == null;
    var ep = isNew ? {} : season.episodes[epIndex];
    var nums = season.episodes.map(function (e) { return +e.number || 0; });
    var nextNum = nums.length ? Math.max.apply(null, nums) + 1 : 1;
    var hosts = region.hosts || {}, music = region.music || {};

    openModal({
      title: isNew ? 'Add episode · ' + word() + ' ' + sid : 'Edit episode ' + ep.number,
      body:
        '<div class="ed-row">' +
          field('Episode #', input('number', isNew ? nextNum : ep.number, 'type="number" min="1" required')) +
          field('Air date', input('airDate', dateToInput(ep.airDate), 'type="date"')) +
        '</div>' +
        field('Host', input('host', ep.host ? (hosts[ep.host] || {}).name || ep.host : '',
          'list="ed-hosts" autocomplete="off" placeholder="Start typing — new names are added automatically"')) +
        field('Musical guest', input('musicalGuest', ep.musicalGuest ? (music[ep.musicalGuest] || {}).name || ep.musicalGuest : '',
          'list="ed-music" autocomplete="off"')) +
        datalist('ed-hosts', namesOf(hosts)) + datalist('ed-music', namesOf(music)),
      onDelete: isNew ? null : function () {
        return commitChange('Delete ' + word() + ' ' + sid + ' episode ' + ep.number, function (d) {
          var s = need(seasonIn(d, key, sid), 'This season');
          s.episodes.splice(epIndex, 1);
        }).then(function () { toast('Deleted.', 'ok'); });
      },
      deleteConfirm: (ep.sketches || []).length ? 'Delete it AND its ' + ep.sketches.length + ' sketches?' : null,
      onSave: function (f) {
        var num = parseInt(f.number.value, 10);
        if (!num) throw new Error('Enter an episode number.');
        var hostName = f.host.value, musicName = f.musicalGuest.value, date = inputToDate(f.airDate.value);
        var newIndex;
        return commitChange((isNew ? 'Add ' : 'Edit ') + word() + ' ' + sid + ' episode ' + num +
                            (hostName ? ' (' + hostName.trim() + ')' : ''), function (d) {
          var r = regionOf(d, key);
          var s = need(seasonIn(d, key, sid), 'This season');
          var target = isNew ? { number: num, title: 'Episode ' + num, host: '', musicalGuest: '', airDate: '', sketches: [] }
                             : need(s.episodes[epIndex], 'This episode');
          target.number = num;
          if (!target.title || /^Episode \d+$/.test(target.title)) target.title = 'Episode ' + num;
          target.host = resolvePerson(r.hosts = r.hosts || {}, hostName);
          target.musicalGuest = resolvePerson(r.music = r.music || {}, musicName);
          target.airDate = date;
          if (isNew) s.episodes.push(target);
          s.episodes.sort(function (a, b) { return a.number - b.number; });
          newIndex = s.episodes.indexOf(target);
        }).then(function () {
          if (isNew) restoreOpen(['ep:' + newIndex]);
          toast(isNew ? 'Episode added — now add its sketches.' : 'Saved.', 'ok');
        });
      }
    });
  }

  /* ---- Sketch ---- */
  function chipToggle(group, id, label, on, extraCls) {
    return '<button type="button" class="ed-chip ' + (extraCls || '') + (on ? ' on' : '') +
           '" data-group="' + group + '" data-id="' + esc(id) + '" aria-pressed="' + (on ? 'true' : 'false') + '">' +
           esc(label) + '</button>';
  }

  function sketchForm(epIndex, skIndex) {
    var key = rk();
    var sid = currentSeasonId();
    var region = window.SNL.region();
    var season = seasonIn(window.SNL_DATA, key, sid);
    var ep = season.episodes[epIndex];
    var isNew = skIndex == null;
    var sk = isNew ? { scores: {}, cast: [], hosts: [], music: [] } : ep.sketches[skIndex];
    var raters = window.SNL.raters();
    var castReg = region.cast || {}, hostReg = region.hosts || {}, musicReg = region.music || {};

    /* cast chips: current first, then alumni (hidden unless tagged) */
    function castChips() {
      var ids = Object.keys(castReg).sort(function (a, b) {
        return castReg[a].name.localeCompare(castReg[b].name);
      });
      var cur = ids.filter(function (id) { return castReg[id].status !== 'alumni'; });
      var alu = ids.filter(function (id) { return castReg[id].status === 'alumni'; });
      var tagged = sk.cast || [];
      var anyAlumTagged = alu.some(function (id) { return tagged.indexOf(id) !== -1; });
      return '<div class="ed-chips">' +
        cur.map(function (id) { return chipToggle('cast', id, castReg[id].name, tagged.indexOf(id) !== -1); }).join('') +
        (alu.length ? '<button type="button" class="ed-chip ed-chip-more" data-act-alumni' +
          (anyAlumTagged ? ' hidden' : '') + '>+ alumni</button>' +
          '<span class="ed-alumni"' + (anyAlumTagged ? '' : ' hidden') + '>' +
          alu.map(function (id) { return chipToggle('cast', id, castReg[id].name, tagged.indexOf(id) !== -1, 'alum'); }).join('') +
          '</span>' : '') +
      '</div>';
    }

    /* host / music chips: the episode's own guest + anyone already tagged */
    function guestChips(group, reg, epId, cls) {
      var ids = [];
      if (epId) ids.push(epId);
      (sk[group] || []).forEach(function (id) { if (ids.indexOf(id) === -1) ids.push(id); });
      return '<div class="ed-chips" data-chips="' + group + '">' +
        ids.map(function (id) {
          return chipToggle(group, id, (reg[id] || {}).name || id, (sk[group] || []).indexOf(id) !== -1, cls);
        }).join('') +
        '<input class="ed-chip-input" data-add="' + group + '" list="ed-' + group + '-list" placeholder="+ other…" autocomplete="off">' +
        datalist('ed-' + group + '-list', namesOf(reg)) +
      '</div>';
    }

    var scoreInputs = raters.map(function (r) {
      var v = (sk.scores || {})[r];
      return field(r + ' score', input('score_' + r, typeof v === 'number' ? v : '',
        'type="number" min="0" max="10" step="0.5" inputmode="decimal" placeholder="—"'));
    }).join('');

    var form = openModal({
      title: isNew ? 'Add sketch · Ep ' + ep.number : 'Edit sketch',
      saveAnother: isNew,
      body:
        field('Title', input('skTitle', sk.title, 'required autocomplete="off"')) +
        '<div class="ed-row">' + scoreInputs + '</div>' +
        field('Notes', '<textarea name="blurb" rows="3">' + esc(sk.blurb || '') + '</textarea>') +
        '<div class="ed-field"><span class="ed-label">Cast</span>' + castChips() + '</div>' +
        '<div class="ed-field"><span class="ed-label">Host</span>' + guestChips('hosts', hostReg, ep.host, 'host') + '</div>' +
        '<div class="ed-field"><span class="ed-label">Musical guest</span>' + guestChips('music', musicReg, ep.musicalGuest, 'music') + '</div>',
      onDelete: isNew ? null : function () {
        return commitChange('Delete sketch "' + sk.title + '" (' + word() + ' ' + sid + ' Ep ' + ep.number + ')', function (d) {
          var e = need(need(seasonIn(d, key, sid), 'This season').episodes[epIndex], 'This episode');
          e.sketches.splice(skIndex, 1);
        }).then(function () { toast('Deleted.', 'ok'); });
      },
      onSave: function (f, again) {
        var title = f.skTitle.value.trim();
        if (!title) throw new Error('Give the sketch a title.');
        var scores = {};
        raters.forEach(function (r) { scores[r] = scoreVal(f['score_' + r]); });
        function picked(group) {
          return $$('.ed-chip.on[data-group="' + group + '"]', f).map(function (b) { return b.dataset.id; });
        }
        /* typed-but-not-entered names in the "+ other" boxes count too */
        var typed = {};
        $$('.ed-chip-input', f).forEach(function (inp) {
          if (inp.value.trim()) typed[inp.dataset.add] = inp.value.trim();
        });
        var entry = {
          title: title,
          scores: scores,
          blurb: f.blurb.value.trim(),
          cast: picked('cast'),
          hosts: picked('hosts'),
          music: picked('music')
        };
        return commitChange((isNew ? 'Add' : 'Edit') + ' sketch "' + title + '" (' + word() + ' ' + sid + ' Ep ' + ep.number + ')', function (d) {
          var r = regionOf(d, key);
          var e = need(need(seasonIn(d, key, sid), 'This season').episodes[epIndex], 'This episode');
          entry.hosts = entry.hosts.map(function (id) { return resolvePerson(r.hosts, id); });
          entry.music = entry.music.map(function (id) { return resolvePerson(r.music, id); });
          Object.keys(typed).forEach(function (g) {
            var id = resolvePerson(r[g], typed[g]);
            if (entry[g].indexOf(id) === -1) entry[g].push(id);
          });
          e.sketches = e.sketches || [];
          if (isNew) e.sketches.push(entry);
          else e.sketches[skIndex] = entry;
        }).then(function () {
          openAfterSave.push('ep:' + epIndex);
          restoreOpen(['ep:' + epIndex]);
          toast(isNew ? 'Sketch added.' : 'Saved.', 'ok');
          if (again) {
            /* reset for the next sketch, keep the modal open */
            f.skTitle.value = ''; f.blurb.value = '';
            raters.forEach(function (r) { f['score_' + r].value = ''; });
            $$('.ed-chip.on', f).forEach(function (b) { b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); });
            $$('.ed-chip-input', f).forEach(function (i) { i.value = ''; });
            f.skTitle.focus();
            return true;
          }
        });
      }
    });

    /* chip interactions */
    form.addEventListener('click', function (e) {
      var chip = e.target.closest('.ed-chip[data-group]');
      if (chip) {
        var on = chip.classList.toggle('on');
        chip.setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      var more = e.target.closest('[data-act-alumni]');
      if (more) { more.hidden = true; $('.ed-alumni', form).hidden = false; }
    });
    /* "+ other…" box: Enter (or picking from the list) adds a chip */
    function addTyped(inp) {
      var group = inp.dataset.add, name = inp.value.trim();
      if (!name) return;
      var reg = group === 'hosts' ? hostReg : musicReg;
      var id = Object.keys(reg).filter(function (k) {
        return reg[k].name.toLowerCase() === name.toLowerCase();
      })[0] || name;       /* unknown name: resolved to a new id on save */
      var existing = $('.ed-chip[data-group="' + group + '"][data-id="' + CSS.escape(id) + '"]', form);
      if (existing) { existing.classList.add('on'); existing.setAttribute('aria-pressed', 'true'); }
      else inp.insertAdjacentHTML('beforebegin', chipToggle(group, id, reg[id] ? reg[id].name : name, true, group === 'hosts' ? 'host' : 'music'));
      inp.value = '';
    }
    form.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target.classList.contains('ed-chip-input')) {
        e.preventDefault();
        addTyped(e.target);
      }
    });
    form.addEventListener('change', function (e) {
      if (e.target.classList.contains('ed-chip-input')) addTyped(e.target);
    });
  }

  function moveSketch(epIndex, skIndex, dir) {
    var key = rk(), sid = currentSeasonId();
    toast('Saving…', 'busy');
    commitChange('Reorder sketches (' + word() + ' ' + sid + ')', function (d) {
      var e = need(need(seasonIn(d, key, sid), 'This season').episodes[epIndex], 'This episode');
      var to = skIndex + dir;
      if (to < 0 || to >= e.sketches.length) return;
      var tmp = e.sketches[skIndex]; e.sketches[skIndex] = e.sketches[to]; e.sketches[to] = tmp;
    }).then(function () {
      restoreOpen(['ep:' + epIndex]);
      toast('Saved.', 'ok');
    }, function (err) { toast(describeError(err), 'err'); });
  }

  /* ---- Person (cast / host / musical guest) ---- */
  var KIND = {
    cast:  { label: 'cast member', folder: 'cast',  sketchField: 'cast',  epField: null },
    hosts: { label: 'host',        folder: 'hosts', sketchField: 'hosts', epField: 'host' },
    music: { label: 'musical guest', folder: 'hosts', sketchField: 'music', epField: 'musicalGuest' }
  };

  function personForm(kind, id) {
    var key = rk();
    var K = KIND[kind];
    var region = window.SNL.region();
    var reg = region[kind] || {};
    var isNew = id == null;
    var p = isNew ? (kind === 'cast'
      ? { status: document.body.dataset.castView === 'alumni' ? 'alumni' : 'current', seasons: [] }
      : {}) : reg[id];
    var big = p.photobig ? (Array.isArray(p.photobig) ? p.photobig : [p.photobig]) : [];
    var latestSeason = region.seasons.length ? Math.max.apply(null, region.seasons.map(function (s) { return +s.id; })) : '';

    /* how many sketches reference this person (for the delete warning) */
    var refs = 0;
    if (!isNew) region.seasons.forEach(function (s) {
      s.episodes.forEach(function (e) {
        if (K.epField && e[K.epField] === id) refs++;
        (e.sketches || []).forEach(function (sk) { if ((sk[K.sketchField] || []).indexOf(id) !== -1) refs++; });
      });
    });

    var castFields = kind !== 'cast' ? '' :
      '<div class="ed-row">' +
        field('Status', '<select name="status">' +
          ['current', 'alumni'].map(function (s) {
            return '<option value="' + s + '"' + (p.status === s ? ' selected' : '') + '>' +
                   (s === 'current' ? 'Current cast' : 'Alumni') + '</option>';
          }).join('') + '</select>') +
        field('Role', input('role', p.role || '', 'list="ed-roles" placeholder="Repertory"')) +
      '</div>' +
      datalist('ed-roles', ['Repertory', 'Featured', 'Weekend Update Anchor']) +
      field(word() + 's', input('seasons', isNew ? latestSeason : seasonsToText(p.seasons), 'placeholder="e.g. 47-51"'),
            'Ranges are fine: <code>47-51, 53</code>');

    openModal({
      title: isNew ? 'Add ' + K.label : 'Edit ' + p.name,
      body:
        field('Name', input('personName', p.name || '', 'required autocomplete="off"')) +
        castFields +
        field('Bio', '<textarea name="bio" rows="4">' + esc(p.bio || '') + '</textarea>',
              'Basic HTML like <code>&lt;br&gt;</code> works.') +
        '<div class="ed-row">' +
          field('Small photo', input('photo', p.photo || '', 'placeholder="file name"') +
                '<input type="file" name="photoFile" accept="image/*">') +
          field('Gallery photos', input('photobig', big.join(', '), 'placeholder="a.jpg, b.jpg"') +
                '<input type="file" name="bigFiles" accept="image/*" multiple>') +
        '</div>' +
        '<p class="ed-note">Picking a file uploads it to <code>assets/images/' + K.folder + '/</code> when you save.</p>',
      onDelete: isNew ? null : function () {
        return commitChange('Remove ' + K.label + ' ' + p.name + ' (' + key.toUpperCase() + ')', function (d) {
          var r = regionOf(d, key);
          delete r[kind][id];
          r.seasons.forEach(function (s) {
            s.episodes.forEach(function (e) {
              if (K.epField && e[K.epField] === id) e[K.epField] = '';
              (e.sketches || []).forEach(function (sk) {
                if (sk[K.sketchField]) sk[K.sketchField] = sk[K.sketchField].filter(function (x) { return x !== id; });
              });
            });
          });
        }).then(function () { toast('Removed.', 'ok'); });
      },
      deleteConfirm: refs ? 'Delete + untag from ' + refs + ' places?' : null,
      onSave: function (f) {
        var name = f.personName.value.trim();
        if (!name) throw new Error('Enter a name.');
        var uploads = Promise.resolve();
        var photo = f.photo.value.trim();
        var bigs = f.photobig.value.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
        var photoFile = f.photoFile.files[0];
        var bigFiles = Array.prototype.slice.call(f.bigFiles.files);
        if (photoFile || bigFiles.length) {
          toast('Uploading photos…', 'busy');
          uploads = Promise.all([photoFile].concat(bigFiles).map(function (file) {
            return file ? uploadImage(K.folder, file) : null;
          })).then(function (names) {
            if (names[0]) photo = names[0];
            names.slice(1).forEach(function (n) { if (bigs.indexOf(n) === -1) bigs.push(n); });
          });
        }
        var newId;
        return uploads.then(function () {
          return commitChange((isNew ? 'Add ' : 'Edit ') + K.label + ' ' + name + ' (' + key.toUpperCase() + ')', function (d) {
            var r = regionOf(d, key);
            r[kind] = r[kind] || {};
            newId = isNew ? uniqueId(slugify(name), r[kind]) : id;
            var entry = isNew ? {} : need(r[kind][id], 'This person');
            entry.name = name;
            if (kind === 'cast') {
              entry.status = f.status.value;
              entry.role = f.role.value.trim();
              entry.seasons = parseSeasons(f.seasons.value);
            }
            entry.bio = f.bio.value.trim();
            if (photo) entry.photo = photo; else delete entry.photo;
            if (bigs.length) entry.photobig = bigs; else delete entry.photobig;
            r[kind][newId] = entry;
          });
        }).then(function () {
          openAfterSave.push('id:' + newId);
          restoreOpen(['id:' + newId]);
          toast('Saved.', 'ok');
        });
      }
    });
  }

  /* ---- Token setup ---- */
  function tokenForm(thenEdit) {
    openModal({
      title: 'Connect to GitHub',
      saveLabel: 'Connect',
      body:
        '<p class="ed-note">Edits are saved by committing to <code>' + esc(CFG.owner + '/' + CFG.repo) +
        '</code>. Paste a GitHub token once — it stays in this browser only.</p>' +
        '<ol class="ed-steps">' +
          '<li>Open <a href="https://github.com/settings/tokens/new?scopes=public_repo&description=SNL%20Tracker%20editor" target="_blank" rel="noopener">GitHub → new token (classic)</a></li>' +
          '<li>Leave the <b>public_repo</b> box ticked, pick an expiry, click <b>Generate token</b></li>' +
          '<li>Copy the token (starts <code>ghp_</code>) and paste it below</li>' +
        '</ol>' +
        field('Token', input('token', token(), 'type="password" autocomplete="off" spellcheck="false" placeholder="ghp_…"')) +
        (token() ? '<p class="ed-note"><button type="button" class="ed-link" data-forget>Forget saved token</button></p>' : ''),
      onMount: function (f) {
        var b = $('[data-forget]', f);
        if (b) b.addEventListener('click', function () {
          try { localStorage.removeItem(TOKEN_KEY); } catch (e) { /* ignore */ }
          setEditing(false);
          closeModal();
          toast('Token removed from this browser.', 'ok');
        });
      },
      onSave: function (f) {
        var t = f.token.value.trim();
        if (!t) throw new Error('Paste a token first.');
        return gh('', { token: t }).then(function (repo) {
          if (!repo.permissions || !repo.permissions.push) {
            throw new Error('That token works, but your account can\'t write to this repo.');
          }
          localStorage.setItem(TOKEN_KEY, t);
          toast('Connected — edit away.', 'ok');
          if (thenEdit) setEditing(true);
        });
      }
    });
  }

  /* ==========================================================
     7. DECORATE PAGES WITH EDIT BUTTONS
     ========================================================== */

  function iconBtn(cls, title, glyph, data) {
    return '<button type="button" class="ed-only ed-icon ' + cls + '" title="' + esc(title) +
           '" aria-label="' + esc(title) + '"' + (data || '') + '>' + glyph + '</button>';
  }

  function addBtn(cls, label) {
    return '<button type="button" class="ed-only ed-add ' + cls + '">+ ' + esc(label) + '</button>';
  }

  function decorate() {
    $$('.ed-only').forEach(function (el) { el.remove(); });
    var region = window.SNL.region();
    if (!region) return;

    /* Seasons page */
    var epList = $('#episode-list');
    if (epList) {
      var pills = $('#season-pills');
      if (currentSeasonId() && seasonIn(window.SNL_DATA, rk(), currentSeasonId())) {
        pills.insertAdjacentHTML('beforeend', iconBtn('ed-pill ed-edit-season', 'Edit this ' + region.seasonWord.toLowerCase(), '✎'));
      }
      pills.insertAdjacentHTML('beforeend', addBtn('ed-pill ed-add-season', region.seasonWord));

      $$('.episode', epList).forEach(function (art) {
        var chev = $('.episode-head > .chevron', art);
        chev.insertAdjacentHTML('beforebegin', iconBtn('ed-edit-ep', 'Edit episode', '✎'));
        $('.episode-body-inner', art).insertAdjacentHTML('beforeend', addBtn('ed-add-sketch', 'Add sketch'));
        $$('.sketch', art).forEach(function (li, i, all) {
          var c = $('.sketch-head > .chevron', li);
          c.insertAdjacentHTML('beforebegin',
            (i > 0 ? iconBtn('ed-move', 'Move up', '↑', ' data-dir="-1"') : '') +
            (i < all.length - 1 ? iconBtn('ed-move', 'Move down', '↓', ' data-dir="1"') : '') +
            iconBtn('ed-edit-sk', 'Edit sketch', '✎'));
        });
      });
      if (seasonIn(window.SNL_DATA, rk(), currentSeasonId())) {
        epList.insertAdjacentHTML('beforeend', addBtn('ed-add-ep ed-add-wide', 'Add episode'));
      } else if (!region.seasons.length) {
        epList.innerHTML = '<p class="empty">No ' + region.seasonWord.toLowerCase() + 's yet.</p>';
      }
    }

    /* Cast / hosts / music pages */
    var castList = $('#cast-list') || $('#host-list');
    if (castList) {
      var kind = $('#cast-list') ? 'cast' : (document.body.dataset.hostView === 'music' ? 'music' : 'hosts');
      castList.insertAdjacentHTML('beforebegin',
        '<div class="ed-only ed-bar">' + addBtn('ed-add-person', 'Add ' + KIND[kind].label)
          .replace('ed-only ', '') + '</div>');
      $$('.cast-card', castList).forEach(function (card) {
        $('.cast-head > .chevron', card).insertAdjacentHTML('beforebegin', iconBtn('ed-edit-person', 'Edit', '✎'));
      });
      castList.dataset.kind = kind;
    }
  }

  /* ==========================================================
     8. WIRING
     ========================================================== */

  document.addEventListener('click', function (e) {
    var t = e.target;

    if (t.closest('#editToggle')) {
      if (editing()) { setEditing(false); return; }
      if (!token()) { tokenForm(true); return; }
      setEditing(true);
      return;
    }

    var b = t.closest('.ed-only button, button.ed-only');
    if (!b) return;
    e.preventDefault();
    var ep = b.closest('.episode');
    var epIndex = ep ? +ep.dataset.ep : null;
    var sk = b.closest('.sketch');
    var skIndex = sk ? +sk.dataset.sk : null;

    if (b.classList.contains('ed-add-season'))  return seasonForm(null);
    if (b.classList.contains('ed-edit-season')) return seasonForm(currentSeasonId());
    if (b.classList.contains('ed-add-ep'))      return episodeForm(null);
    if (b.classList.contains('ed-edit-ep'))     return episodeForm(epIndex);
    if (b.classList.contains('ed-add-sketch'))  return sketchForm(epIndex, null);
    if (b.classList.contains('ed-edit-sk'))     return sketchForm(epIndex, skIndex);
    if (b.classList.contains('ed-move'))        return moveSketch(epIndex, skIndex, +b.dataset.dir);

    var list = $('#cast-list') || $('#host-list');
    var kind = list && list.dataset.kind;
    if (b.classList.contains('ed-add-person'))  return personForm(kind, null);
    if (b.classList.contains('ed-edit-person')) return personForm(kind, b.closest('.cast-card').dataset.id);
  });

  /* header "Edit" right-click / long-press alternative: manage token */
  document.addEventListener('contextmenu', function (e) {
    if (e.target.closest('#editToggle')) { e.preventDefault(); tokenForm(false); }
  });

  document.addEventListener('snl:rendered', decorate);
  document.addEventListener('snl:modechange', decorate);

  /* ---- init ---- */
  var banner = document.createElement('div');
  banner.id = 'snl-ed-banner';
  banner.innerHTML = '<b>Editing</b> · each save commits to GitHub; the public site catches up in ~1 min · ' +
    '<button type="button" class="ed-link" id="snl-ed-token">GitHub token</button>';
  document.body.appendChild(banner);
  banner.querySelector('#snl-ed-token').addEventListener('click', function () { tokenForm(false); });

  decorate();
  var wasEditing = false;
  try { wasEditing = !!localStorage.getItem(EDIT_KEY); } catch (e) { /* ignore */ }
  if (wasEditing && token()) setEditing(true);
})();
