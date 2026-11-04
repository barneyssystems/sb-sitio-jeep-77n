/* Saborcito · sitio regalo. Every fact below is sourced in ../FUENTES.md. Change nothing here without a source. */
(function () {
  'use strict';

  // ---------- facts (see FUENTES.md) ----------
  var WA = '13412284974';                       // public WhatsApp = production catalog owner (FUENTES §1)
  var CATALOG = 'https://wa.me/c/' + WA;        // production catalog link (FUENTES §1)

  // Catalog: live WhatsApp card names (src/catalog/card-names.ts) + D1 prices (snapshot 2026-10-19, FUENTES §2).
  // price null = card is live but its price is not in a verified source → "ver en catálogo".
  var MENU = [
    { es: 'Arepas', en: 'Arepas', items: [
      ['Arepa rellena de queso', '', 10],
      ['Arepa dulce rellena de queso', '', 10],
      ['Arepa de huevo y carne', '', 10],
      ['Arepandebono con bocadillo', '', 10],
      ['Arepa de Promasa quesuda', '', 10],
      ['Arepa de chía', '', 10],
      ['Arepa tradicional delgada', '', 10],
      ['Arepa tradicional delgada amarilla', '', 10],
      ['Arepa gruesa sencilla', '', 10],
      ['Arepa pequeña para lechona o tamal', '', 10]
    ]},
    { es: 'Empanadas y fritos', en: 'Empanadas & snacks', items: [
      ['Empanadas de pollo grandes', 'congeladas', 10],
      ['Empanadas de carne grandes', 'congeladas', 10],
      ['Palitos de queso prefritos', '', 10],
      ['Palitos de queso con bocadillo prefritos', '', null],
      ['Mini palitos de queso crudos', '', null]
    ]},
    { es: 'Tamales, carnes y maduro', en: 'Tamales, meats & plantain', items: [
      ['Tamal colombiano', 'congelado', 15],
      ['Envuelto de mazorca', 'congelado', 10],
      ['Chorizo artesanal', '', 10],
      ['Chunchullo precocido y sazonado', '', 10],
      ['Tajadas de plátano maduro', '', 10]
    ]},
    { es: 'Pulpas de fruta colombiana', en: 'Colombian fruit pulps', items: [
      ['Pulpa de maracuyá', '', 10],
      ['Pulpa de lulo', '', 10],
      ['Pulpa de guanábana', '', 10],
      ['Pulpa de guayaba', '', 10],
      ['Pulpa de tomate de árbol', '', 10],
      ['Pulpa de mora', '', null]
    ]},
    { es: 'Bebidas', en: 'Drinks', items: [
      ['Six-pack Pony Malta', '', 10],
      ['Six-pack Hit naranja piña', '', 10],
      ['Six-pack Hit mora', '', 10],
      ['Six-pack Hit mango', '', 10],
      ['Six-pack Hit frutas tropicales', '', null],
      ['Six-pack gaseosa manzana', '', 10],
      ['Six-pack gaseosa colombiana', '', 10]
    ]},
    { es: 'Para cocinar en casa', en: 'To cook at home', items: [
      ['Masa para buñuelo', '', 10],
      ['Masa para hacer empanadas o arepas', '', 10],
      ['Mazamorra (peto) + panela', '2 pack', 10],
      ['Maíz blanco trillado', '', 50],
      ['Parrilla para asar arepas en estufa eléctrica', '', 10]
    ]}
  ];

  // Featured photo cards: AI illustrations of these exact catalog products (FUENTES §6).
  var FEATURED = [
    ['empanadas', 'Empanadas grandes, de pollo o de carne', 'congeladas · $10', 'Empanadas colombianas doradas sobre un plato', 'Golden Colombian empanadas on a plate'],
    ['tamal', 'Tamal colombiano', 'congelado · $15', 'Tamal envuelto en hoja de plátano y amarrado', 'A tamal wrapped and tied in a banana leaf'],
    ['pulpas', 'Pulpas de fruta', 'maracuyá, lulo, guanábana, guayaba o tomate de árbol · $10', 'Sugerencia: jugos de fruta preparados con pulpa', 'Serving suggestion: fruit juices made from pulp', 1],
    ['arepa-rellena-queso', 'Arepa rellena de queso', '$10', 'Arepas de maíz doradas en sartén de hierro, una abierta con queso derretido', 'Golden corn arepas in a cast-iron pan, one open with melted cheese'],
    ['palitos-queso', 'Palitos de queso prefritos', '$10', 'Palitos de queso dorados, uno abierto con queso', 'Golden cheese sticks, one open with cheese'],
    ['arepandebono', 'Arepandebono con bocadillo', '$10', 'Arepas de pandebono en sartén con bocadillo de guayaba', 'Pandebono arepas in a pan with guava paste'],
    ['chorizo-arepa', 'Chorizo artesanal', '$10', 'Chorizos asados sobre una tabla', 'Grilled chorizos on a board'],
    ['envuelto', 'Envuelto de mazorca', 'congelado · $10', 'Envuelto de mazorca en hoja y uno abierto', 'A corn envuelto in its husk and one unwrapped'],
    ['tajadas', 'Tajadas de plátano maduro', '$10', 'Tajadas de maduro fritas', 'Fried sweet plantain slices']
  ];

  // Zones: src/zones/config.ts (FUENTES §3). Only window_es / days — never window_hours. San José = "tarde-noche".
  var ZONES = [
    { es: 'San José', cities: ['San José', 'Santa Clara', 'Milpitas', 'Campbell', 'Cupertino', 'Los Gatos'],
      dEs: 'Lunes, miércoles y viernes', dEn: 'Mondays, Wednesdays and Fridays', wEs: 'en la tarde-noche', wEn: 'in the late afternoon or evening' },
    { es: 'Sunnyvale', cities: ['Sunnyvale'],
      dEs: 'Martes a viernes', dEn: 'Tuesday to Friday', wEs: 'en la mañana', wEn: 'in the morning' },
    { es: 'Fremont', cities: ['Fremont', 'Newark'],
      dEs: 'Todos los días', dEn: 'Every day', wEs: 'después de las 6 p. m.', wEn: 'after 6 p.m.' },
    { es: 'Península', en: 'Peninsula', cities: ['Mountain View', 'Palo Alto', 'Menlo Park', 'Redwood City', 'San Carlos', 'Belmont', 'San Mateo', 'Foster City', 'Burlingame'],
      dEs: 'Jueves', dEn: 'Thursdays', wEs: 'en la mañana', wEn: 'in the morning' },
    { es: 'East Bay', cities: ['Union City', 'Hayward', 'San Leandro', 'San Lorenzo', 'Ashland', 'Cherryland', 'Oakland'],
      dEs: 'Sábados, cada 15 días (dos sábados al mes)', dEn: 'Saturdays, every 15 days (two Saturdays a month)', wEs: 'durante todo el día', wEn: 'all day',
      noteEs: 'Te confirmamos la fecha del sábado al pedir.', noteEn: 'We confirm the Saturday date when you order.' }
  ];

  // Santi's mandated disclaimer, verbatim (src/order/confirmation-message.ts, FUENTES §5).
  var TRUCK_ES = '🚚 Importante: La fecha y horario indicados corresponden a nuestra entrega programada. En caso de presentarse algún imprevisto o ajuste en nuestra ruta de entregas, podrían estar sujetos a cambios. Si esto llegara a suceder, te informaremos con anticipación para coordinar la nueva fecha u horario.';
  var TRUCK_EN = '🚚 Important: the delivery day and time shown are our scheduled delivery. If something unexpected comes up or our delivery route changes, they may change. If that happens, we will let you know in advance to set a new date or time.';

  // ---------- helpers ----------
  var shown = { menu: false, zones: false };   // JS-rendered blocks animate in once; re-renders (language, finder) appear instantly
  var lang = 'es';
  try { var saved = localStorage.getItem('sab-lang'); if (saved === 'en' || saved === 'es') lang = saved; } catch (e) {}
  var q = new URLSearchParams(location.search).get('lang'); if (q === 'en' || q === 'es') lang = q;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function norm(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\b\d{5}(-\d{4})?\b/g, ' ').replace(/[,.]/g, ' ').replace(/\s+(ca|california)\s*$/, '').replace(/\s+/g, ' ').trim(); }
  function L(es, en) { return lang === 'en' ? en : es; }

  // ---------- render ----------
  function renderSwipe() {
    $('#swipe').innerHTML = FEATURED.map(function (f) {
      var tag = f[2].replace('congeladas', L('congeladas', 'frozen')).replace('congelado', L('congelado', 'frozen')).replace(' o tomate', L(' o tomate', ' or tomate'));
      return '<article class="card"><div class="ph"><img loading="lazy" decoding="async" width="800" height="600" src="img/' + f[0] + '-480.webp" srcset="img/' + f[0] + '-480.webp 480w, img/' + f[0] + '-800.webp 800w" sizes="(min-width:1000px) 31vw, (min-width:720px) 42vw, 78vw" alt="' + esc(L(f[3], f[4])) + '"><span class="ilu">' + (f[5] ? L('Foto ilustrativa · IA · sugerencia: jugo', 'Illustrative photo · AI · suggestion: juice') : L('Foto ilustrativa · IA', 'Illustrative photo · AI')) + '</span></div>' +
        '<h3>' + esc(f[1]) + '</h3><p class="pr">' + esc(tag) + '</p></article>';
    }).join('');
  }
  function renderMenu() {
    $('#menu').innerHTML = MENU.map(function (c) {
      return '<div class="cat rv' + (shown.menu ? ' in' : '') + '"><h3>' + esc(L(c.es, c.en)) + '</h3><ul>' + c.items.map(function (i) {
        var sm = i[1] ? '<small>' + esc(i[1] === 'congeladas' ? L('congeladas', 'frozen') : i[1] === 'congelado' ? L('congelado', 'frozen') : i[1]) + '</small>' : '';
        var p = i[2] == null ? '<span class="p ver">' + L('ver en catálogo', 'see catalog') + '</span>' : '<span class="p">$' + i[2] + '</span>';
        return '<li><span class="nm">' + esc(i[0]) + sm + '</span>' + p + '</li>';
      }).join('') + '</ul></div>';
    }).join('');
  }
  function renderZones(hit) {
    $('#zlist').innerHTML = ZONES.map(function (z, k) {
      return '<li class="z rv' + (shown.zones ? ' in' : '') + (hit === k ? ' hit' : '') + '" data-d="' + (k % 3) * 90 + '"><h3>' + esc(lang === 'en' && z.en ? z.en : z.es) + '</h3>' +
        '<p class="when"><b>' + esc(L(z.dEs, z.dEn)) + '</b> · <span class="nw">' + esc(L(z.wEs, z.wEn)) + '</span></p>' +
        (z.noteEs ? '<p class="when" style="font-size:14px;color:#d8c6af">' + esc(L(z.noteEs, z.noteEn)) + '</p>' : '') +
        '<p class="cities">' + esc(z.cities.join(' · ')) + '</p></li>';
    }).join('');
    $('#truck').textContent = L(TRUCK_ES, TRUCK_EN);
  }

  var lastCity = '';
  function answer() {
    var raw = $('#city').value, n = norm(raw), out = $('#answer');
    lastCity = raw;
    if (!n) { out.innerHTML = ''; renderZones(-1); return; }
    for (var k = 0; k < ZONES.length; k++) {
      for (var j = 0; j < ZONES[k].cities.length; j++) {
        if (norm(ZONES[k].cities[j]) === n) {
          var z = ZONES[k];
          out.innerHTML = L('Sí, llegamos a <b>' + esc(z.cities[j]) + '</b>: ' + esc(z.dEs.toLowerCase()) + ', ' + esc(z.wEs) + '.',
                            'Yes, we deliver to <b>' + esc(z.cities[j]) + '</b>: ' + esc(z.dEn.charAt(0).toLowerCase() + z.dEn.slice(1)) + ', ' + esc(z.wEn) + '.');
          renderZones(k); return;
        }
      }
    }
    out.innerHTML = L('<b>' + esc(raw.trim()) + '</b> no está en nuestra lista de zonas. Escríbenos por <a class="js-chat" target="_blank" rel="noopener" href="' + chatHref() + '">WhatsApp</a> y te contamos.',
                      '<b>' + esc(raw.trim()) + '</b> isn’t on our zone list. Message us on <a class="js-chat" target="_blank" rel="noopener" href="' + chatHref() + '">WhatsApp</a> and we’ll let you know.');
    renderZones(-1);
  }
  function chatHref() { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(L('Hola Saborcito 👋', 'Hi Saborcito 👋')); }

  // ---------- i18n ----------
  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-en],[data-en-html],[data-en-alt],[data-en-ph],[data-en-label]').forEach(function (el) {
      if (el.hasAttribute('data-en')) { if (!el.hasAttribute('data-es')) el.setAttribute('data-es', el.textContent); el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es'); }
      if (el.hasAttribute('data-en-html')) { if (!el.hasAttribute('data-es-html')) el.setAttribute('data-es-html', el.innerHTML); el.innerHTML = lang === 'en' ? el.getAttribute('data-en-html') : el.getAttribute('data-es-html'); }
      if (el.hasAttribute('data-en-alt')) { if (!el.hasAttribute('data-es-alt')) el.setAttribute('data-es-alt', el.alt); el.alt = lang === 'en' ? el.getAttribute('data-en-alt') : el.getAttribute('data-es-alt'); }
      if (el.hasAttribute('data-en-ph')) { if (!el.hasAttribute('data-es-ph')) el.setAttribute('data-es-ph', el.placeholder); el.placeholder = lang === 'en' ? el.getAttribute('data-en-ph') : el.getAttribute('data-es-ph'); }
      if (el.hasAttribute('data-en-label')) { if (!el.hasAttribute('data-es-label')) el.setAttribute('data-es-label', el.getAttribute('aria-label')); el.setAttribute('aria-label', lang === 'en' ? el.getAttribute('data-en-label') : el.getAttribute('data-es-label')); }
    });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    $$('.js-chat').forEach(function (a) { a.href = chatHref(); });
    $$('.js-cat').forEach(function (a) { a.href = CATALOG; });
    renderSwipe(); renderMenu();
    if (lastCity) answer(); else renderZones(-1);
  }
  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { lang = b.getAttribute('data-lang'); try { localStorage.setItem('sab-lang', lang); } catch (e) {} applyLang(); });
  });
  $('#finder').addEventListener('submit', function (e) { e.preventDefault(); answer(); });

  applyLang();

  // ---------- motion (transform/opacity only; html.mo is set in <head> only when reduced motion is off) ----------
  var de = document.documentElement, motion = de.classList.contains('mo'), progress = null;
  // live state: html.mo is kept in sync with the OS preference by the inline <head> listener (SAB-WEB-R4/R5)
  function motionNow() { return de.classList.contains('mo'); }
  var io = null;
  function reveal(els) {
    els.forEach(function (el) {
      if (el.classList.contains('in')) return;
      if (!io) { el.classList.add('in'); return; }
      if (el.dataset.d) el.style.transitionDelay = el.dataset.d + 'ms';
      io.observe(el);
    });
  }
  if (motion && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  }
  $$('#menu .cat').forEach(function (el, i) { el.dataset.d = (i % 2) * 90; });
  if (io) {
    // content is visible by default (P2-01); it is hidden-until-revealed only from here on, after everything rendered.
    // Elements already on screen are marked shown in the same frame, so nothing blinks.
    var vh0 = window.innerHeight;
    $$('.rv').forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < vh0 && r.bottom > 0) el.classList.add('in'); });
    de.classList.add('rv-on');
  }
  reveal($$('.rv'));
  shown.menu = shown.zones = true;
  function revealAll() { $$('.rv').forEach(function (el) { el.classList.add('in'); }); }
  // a hash jump (e.g. #zonas) or a print should never leave content hidden
  window.addEventListener('beforeprint', revealAll);

  // scroll progress → --p (0 when the element enters at the bottom, 1 when it leaves at the top); on-screen elements only
  var ps = $$('[data-p]');
  ps.forEach(function (el) { if (el.dataset.v) el.style.setProperty('--v', el.dataset.v); });
  if (ps.length && 'IntersectionObserver' in window) {   // always observe; CSS applies the transforms only under html.mo
    var live = [], vh = window.innerHeight;
    var pio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { var i = live.indexOf(e.target); if (e.isIntersecting && i < 0) live.push(e.target); if (!e.isIntersecting && i >= 0) live.splice(i, 1); });
      progress();
    });
    ps.forEach(function (el) { pio.observe(el); });
    progress = function () {
      var vals = live.map(function (el) { var r = el.getBoundingClientRect(); var p = (vh - r.top) / (vh + r.height); return p < 0 ? 0 : p > 1 ? 1 : p; });
      for (var i = 0; i < live.length; i++) live[i].style.setProperty('--p', vals[i].toFixed(3));
    };
    window.addEventListener('resize', function () { vh = window.innerHeight; progress(); });
  }

  // swipe row: native scroller; JS only drives the desktop arrows and hides the cue after the first swipe
  var sw = $('#swipe'), wrap = $('.swipe-wrap');
  function step(dir) { var c = sw.firstElementChild; var dx = c ? c.getBoundingClientRect().width + 14 : sw.clientWidth * 0.8; sw.scrollBy({ left: dir * dx, behavior: motionNow() ? 'smooth' : 'auto' }); }
  $('.sw-prev').addEventListener('click', function () { step(-1); });
  $('.sw-next').addEventListener('click', function () { step(1); });
  sw.addEventListener('scroll', function () { if (sw.scrollLeft > 8) wrap.classList.add('used'); }, { passive: true });
  // switching to reduced motion stops any programmatic smooth scroll already in flight
  var rmq = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)');
  if (rmq) { var stopSmooth = function () { if (rmq.matches) sw.scrollTo({ left: sw.scrollLeft, behavior: 'auto' }); };
    if (rmq.addEventListener) rmq.addEventListener('change', stopSmooth); else if (rmq.addListener) rmq.addListener(stopSmooth); }

  var hdr = $('#hdr'), obar = $('#obar'), hero = $('.hero .cta'), ticking = false;
  // the sticky bar steps aside while an in-page catalog button (or the footer) is on screen, so two green buttons never stack
  var ctaInView = false, seen = [];
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { var i = seen.indexOf(e.target); if (e.isIntersecting && i < 0) seen.push(e.target); if (!e.isIntersecting && i >= 0) seen.splice(i, 1); });
      ctaInView = seen.length > 0; onScroll();
    });
    $$('.menu-cta, .casa .cta, .foot').forEach(function (el) { cio.observe(el); });
  }
  function onScroll() {
    ticking = false;
    hdr.classList.toggle('scrolled', window.scrollY > 8);
    var r = hero.getBoundingClientRect();
    obar.classList.toggle('on', r.bottom < 0 && !ctaInView);
    if (progress) progress();
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
})();
