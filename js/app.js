/* Terra Collective · website behaviour
   Fitting room: tapping a piece puts it on the model (tap again to take it off).
   Every combination is its own photo in assets/looks/, revealed from the hem up with an olive scan line. */

(function () {
  const T = window.TERRA;
  const $ = s => document.querySelector(s);
  const item = id => T.items.find(x => x.id === id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const isPhone = () => window.matchMedia('(max-width: 760px)').matches;

  const heart = fill => `<svg width="19" height="19" viewBox="0 0 24 24" fill="${fill}" stroke="#4B3A2E" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>`;
  const tick = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F5EFE7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

  const s = { cat: 'All', sel: T.items[0].id, top: 'tee', bottom: 'cream', outer: 'none', dress: false, cur: 'base', n: 0, size: 'M', fav: {}, bag: 0 };

  /* ---------- Outfit logic ---------- */
  function keyOf(o) {
    if (o.dress) return 'd-vestido_o-' + o.outer;
    const k = 't-' + o.top + '_b-' + o.bottom + '_o-' + o.outer;
    return k === 't-tee_b-cream_o-none' ? 'base' : k;
  }
  const src = k => T.looksPath + k + '.jpg';
  function wearing(id) {
    const it = item(id); if (!it) return false;
    if (it.slot === 'outer') return s.outer === id;
    if (it.slot === 'dress') return s.dress;
    if (s.dress) return false;
    return it.slot === 'top' ? s.top === id : s.bottom === id;
  }
  function pick(id, scrollUp, force) {
    const it = item(id); if (!it) return;
    const on = wearing(id) && !force;
    if (it.slot === 'outer') s.outer = on ? 'none' : id;
    if (it.slot === 'dress') s.dress = !on;
    if (it.slot === 'top') { s.dress = false; s.top = on ? 'tee' : id; }
    if (it.slot === 'bottom') { s.dress = false; s.bottom = on ? 'cream' : id; }
    s.sel = id;
    showLook(keyOf(s));
    renderPicker();
    if (scrollUp) window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function showLook(k) {
    if (k === s.cur) return;
    const under = $('#lookUnder'), over = $('#lookOver'), scan = $('#scan');
    under.src = src(s.cur);
    s.cur = k; s.n++;
    const v = s.n % 2 ? 'A' : 'B';
    over.className = 'look over'; scan.className = 'scan';
    void over.offsetWidth;                         // restart the animation
    over.src = src(k);
    over.classList.add('rev' + v); scan.classList.add('scan' + v);
    updateLabel();
  }
  function worn() {
    const w = [];
    if (s.dress) w.push(item('vestido').name);
    else {
      w.push(s.top === 'tee' ? T.basics.top : item(s.top).name);
      w.push(s.bottom === 'cream' ? T.basics.bottom : item(s.bottom).name);
    }
    if (s.outer !== 'none') w.push(item(s.outer).name);
    return w;
  }
  function updateLabel() {
    $('#lookLabel').setAttribute('aria-label', 'Model wearing: ' + worn().join(', ').toLowerCase());
    $('#inLook').textContent = 'In this look: ' + worn().join(' + ');
  }

  /* ---------- Picker ---------- */
  function renderPicker() {
    $('#cats').innerHTML = T.categories.map(c => `<button type="button" class="btn ${s.cat === c ? 'on' : ''}" data-cat="${c}" aria-pressed="${s.cat === c}">${s.cat === c ? '<span class="dot terra" aria-hidden="true"></span>' : ''}${c}</button>`).join('');
    const rail = T.items.filter(x => s.cat === 'All' || x.cat === s.cat);
    $('#rail').innerHTML = rail.length ? rail.map(g => `
      <button type="button" class="btn piece ${g.id === s.sel ? 'on' : ''}" data-pick="${g.id}" aria-pressed="${g.id === s.sel}" aria-label="Try on ${esc(g.name)}">
        <img src="${g.thumb}" alt="">
        ${wearing(g.id) ? `<span class="wearing" aria-hidden="true">${tick}</span>` : ''}
        <span class="nm">${esc(g.name)}</span>
      </button>`).join('') : '<div class="rail-empty">More pieces are landing on the rack soon. Have a look at the others in the meantime.</div>';

    const sel = item(s.sel) || T.items[0];
    $('#selThumb').src = sel.thumb;
    $('#selBrand').textContent = sel.brand;
    $('#selName').textContent = sel.name;
    $('#selDetail').textContent = sel.detail;
    $('#selPrice').textContent = sel.price;
    $('#favSel').setAttribute('aria-pressed', !!s.fav[sel.id]);
    $('#favSel svg').setAttribute('fill', s.fav[sel.id] ? '#B76E4E' : 'none');
    $('#sizes').innerHTML = T.sizes.map(z => `<button type="button" class="btn ${s.size === z ? 'on' : ''}" data-size="${z}" aria-pressed="${s.size === z}">${z}</button>`).join('');
    updateLabel();

    if (isPhone()) { const on = $('#rail .piece.on'); if (on) on.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' }); }
  }

  /* ---------- Shop grid ---------- */
  function renderGrid() {
    $('#grid').innerHTML = T.items.map(p => `
      <article class="card">
        <div class="ph">
          <img src="${p.thumb}" alt="${esc(p.name)}" loading="lazy">
          <button type="button" class="btn fav" data-fav="${p.id}" aria-label="Save ${esc(p.name)}" aria-pressed="${!!s.fav[p.id]}">${heart(s.fav[p.id] ? '#B76E4E' : 'none')}</button>
          <button type="button" class="btn try" data-try="${p.id}"><span class="dot olive" aria-hidden="true"></span>Try it on</button>
        </div>
        <div class="br">${esc(p.brand)}</div>
        <div class="nm">${esc(p.name)}</div>
        <div class="meta">Size ${esc(p.size)} · ${esc(p.price)}</div>
      </article>`).join('');
  }

  /* ---------- Toast ---------- */
  let tt;
  function say(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2400); }

  /* ---------- Events ---------- */
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-cat],[data-pick],[data-size],[data-fav],[data-try],[data-close]');
    if (!b) return;
    if (b.dataset.cat) { s.cat = b.dataset.cat; renderPicker(); }
    else if (b.dataset.pick) pick(b.dataset.pick);
    else if (b.dataset.size) { s.size = b.dataset.size; renderPicker(); }
    else if (b.dataset.fav) { s.fav[b.dataset.fav] = !s.fav[b.dataset.fav]; renderGrid(); renderPicker(); }
    else if (b.dataset.try) pick(b.dataset.try, true, true);
    if (b.hasAttribute('data-close')) $('#drawer').hidden = true;
  });

  $('#openMenu').onclick = () => { $('#drawer').hidden = false; };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $('#drawer').hidden = true; });

  $('#reset').onclick = () => { s.top = 'tee'; s.bottom = 'cream'; s.outer = 'none'; s.dress = false; showLook('base'); renderPicker(); };
  $('#favSel').onclick = () => { s.fav[s.sel] = !s.fav[s.sel]; renderPicker(); renderGrid(); };
  $('#share').onclick = () => {
    const url = location.href;
    (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(() => say('Link to this look copied'), () => say('Copy the address bar to share this look'));
  };
  function mode(m) {
    $('#useModel').classList.toggle('on', m === 'model'); $('#useModel').setAttribute('aria-pressed', m === 'model');
    $('#useYou').classList.toggle('on', m === 'you'); $('#useYou').setAttribute('aria-pressed', m === 'you');
  }
  $('#useModel').onclick = () => mode('model');
  $('#useYou').onclick = () => { mode('you'); say('Try-on with your own photo is coming soon'); };

  function step(d) {
    const rail = T.items.filter(x => s.cat === 'All' || x.cat === s.cat); if (!rail.length) return;
    const i = rail.findIndex(x => x.id === s.sel);
    pick(rail[(i + d + rail.length) % rail.length].id, false, true);
  }
  $('#prev').onclick = () => step(-1);
  $('#next').onclick = () => step(1);

  $('#addToBag').onclick = () => {
    s.bag++; const c = $('#bagCount'); c.hidden = false; c.textContent = s.bag;
    say(`${item(s.sel).name}, size ${s.size}, is in your bag`);
  };
  $('#subscribe').onsubmit = e => {
    e.preventDefault();
    const v = $('#email').value.trim();
    if (!/^\S+@\S+\.\S+$/.test(v)) { say('Pop in a valid email, please'); return; }
    $('#email').value = ''; say('Thanks, you’re on the list');
  };

  /* ---------- Start ---------- */
  $('#showWhen').textContent = `${T.showroom.date} · ${T.showroom.time}`;
  $('#showWhere').textContent = `${T.showroom.venue}, Adelaide`;
  $('#lookUnder').src = src('base'); $('#lookOver').src = src('base');
  // Preload every look so changes are instant
  const keys = new Set(['base']);
  ['tee', 'cardigan', 'top'].forEach(t => ['cream', 'jeans'].forEach(b => ['none', 'blazer', 'trench'].forEach(o => keys.add(keyOf({ top: t, bottom: b, outer: o, dress: false })))));
  ['none', 'blazer', 'trench'].forEach(o => keys.add('d-vestido_o-' + o));
  keys.forEach(k => { const i = new Image(); i.src = src(k); });
  renderPicker(); renderGrid();
})();
