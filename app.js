/* ============================================
   Beyond the Resort — App Logic (PREMIUM)
   3D Globe · Filters · Modals · Animations
   ============================================ */

// ───────── CURSOR GLOW ─────────
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(max-width: 768px)').matches) return;
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  (function updateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(updateGlow);
  })();
}

// ───────── NAV SCROLL ─────────
function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}

// ───────── SNOW PARTICLES ─────────
function initSnowParticles() {
  const container = document.getElementById('snow-particles');
  if (!container) return;
  const count = window.matchMedia('(max-width: 768px)').matches ? 25 : 50;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const f = document.createElement('div');
    f.classList.add('snowflake');
    f.style.cssText = `left:${Math.random() * 100}%;width:${Math.random() * 4 + 1.5}px;height:${Math.random() * 4 + 1.5}px;animation-duration:${Math.random() * 10 + 8}s;animation-delay:${Math.random() * 12}s;opacity:${Math.random() * 0.5 + 0.15}`;
    frag.appendChild(f);
  }
  container.appendChild(frag);
}

// ───────── HERO BG CROSSFADE ─────────
function initHeroCrossfade() {
  const imgA = document.getElementById('hero-bg-img');
  const imgB = document.getElementById('hero-bg-img-next');
  if (!imgA || !imgB) return;
  const imgs = ['images/iceland.png', 'images/svalbard.png', 'images/alaska.png', 'images/kamchatka.png', 'images/japan.png', 'images/patagonia.png'];
  let idx = 0, showA = true;
  setInterval(() => {
    idx = (idx + 1) % imgs.length;
    if (showA) { imgB.src = imgs[idx]; imgB.style.opacity = '1'; imgA.style.opacity = '0'; }
    else { imgA.src = imgs[idx]; imgA.style.opacity = '1'; imgB.style.opacity = '0'; }
    showA = !showA;
  }, 7000);
}

// ───────── STATS COUNTER ─────────
function initStatsCounter() {
  const nums = document.querySelectorAll('.stat-item__number[data-target]');
  if (!nums.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target, +e.target.dataset.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
}
function animateCounter(el, target) {
  const t0 = performance.now();
  (function tick(now) {
    const p = Math.min((now - t0) / 2000, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

// ───────── 3D GLOBE ─────────
let scene, camera, renderer, globe, pinGroup;
let isDragging = false, prevMouse = { x: 0, y: 0 };
let autoRotate = true;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const pinMeshes = [];
const tripMap = new Map();
TRIPS.forEach(t => tripMap.set(t.id, t));
let lastRaycast = 0;

function latLonToVec3(lat, lon, r) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(-(r * Math.sin(phi) * Math.cos(theta)), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

function initGlobe() {
  const container = document.getElementById('globe-container');
  const canvas = document.getElementById('globe-canvas');
  if (!container || !canvas) return;
  const w = container.clientWidth, h = container.clientHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
  camera.position.z = 4;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0x334466, 0.5));
  const dir = new THREE.DirectionalLight(0x8899cc, 1.2); dir.position.set(5, 3, 5); scene.add(dir);
  const rim = new THREE.DirectionalLight(0xff6b2b, 0.3); rim.position.set(-5, -2, -3); scene.add(rim);
  const pt = new THREE.PointLight(0x38bdf8, 0.3, 10); pt.position.set(-3, 2, 4); scene.add(pt);

  const R = 1.5;
  globe = new THREE.Mesh(
    new THREE.SphereGeometry(R, 48, 48),
    new THREE.MeshPhongMaterial({ color: 0x0a1025, emissive: 0x060c20, specular: 0x2a3a66, shininess: 20, transparent: true, opacity: 0.97 })
  );
  scene.add(globe);

  globe.add(new THREE.Mesh(new THREE.SphereGeometry(R + 0.004, 24, 24), new THREE.MeshBasicMaterial({ color: 0x1a2a55, wireframe: true, transparent: true, opacity: 0.2 })));
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(R + 0.1, 32, 32), new THREE.MeshBasicMaterial({ color: 0x1a3a88, transparent: true, opacity: 0.06, side: THREE.BackSide })));
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(R + 0.2, 32, 32), new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.02, side: THREE.BackSide })));

  addContinentPatches(R);

  pinGroup = new THREE.Group();
  globe.add(pinGroup);

  // Share geometries & materials across all 60 pins (huge perf win)
  const stemGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.14, 6);
  const headGeo = new THREE.SphereGeometry(0.035, 8, 8);
  const glowGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const ringGeo = new THREE.RingGeometry(0.05, 0.07, 12);
  const pinMat = new THREE.MeshBasicMaterial({ color: 0xff6b2b });

  TRIPS.forEach(trip => {
    const pos = latLonToVec3(trip.lat, trip.lon, R);
    const stem = new THREE.Mesh(stemGeo, pinMat);
    const head = new THREE.Mesh(headGeo, pinMat);
    head.position.y = 0.09;
    // Glow & ring need unique materials since we animate opacity per-pin
    const glow = new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({ color: 0xff8c55, transparent: true, opacity: 0.25 }));
    glow.position.y = 0.09;
    const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xff6b2b, transparent: true, opacity: 0.15, side: THREE.DoubleSide }));
    ring.position.y = 0.005; ring.rotation.x = -Math.PI / 2;

    const g = new THREE.Group();
    g.add(stem); g.add(head); g.add(glow); g.add(ring);
    g.position.copy(pos); g.lookAt(0, 0, 0); g.rotateX(Math.PI / 2);
    g.userData = { tripId: trip.id };
    pinGroup.add(g);
    pinMeshes.push(head);
    head.userData = { tripId: trip.id };
  });

  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('mouseleave', onMouseUp);
  canvas.addEventListener('click', onGlobeClick);
  canvas.addEventListener('touchstart', onTouchStart, { passive: false });
  canvas.addEventListener('touchmove', onTouchMove, { passive: false });
  canvas.addEventListener('touchend', onMouseUp);
  window.addEventListener('resize', onResize);

  animate();
}

function addContinentPatches(r) {
  [
    { lat: 50, lon: 10, s: 0.15 }, { lat: 55, lon: 25, s: 0.12 }, { lat: 60, lon: 15, s: 0.1 }, { lat: 64, lon: 14, s: 0.08 }, { lat: 68, lon: 18, s: 0.06 },
    { lat: 65, lon: -19, s: 0.05 }, { lat: 72, lon: -42, s: 0.2 }, { lat: 68, lon: -50, s: 0.12 }, { lat: 45, lon: -100, s: 0.35 }, { lat: 55, lon: -105, s: 0.25 },
    { lat: 60, lon: -135, s: 0.15 }, { lat: 35, lon: -90, s: 0.2 }, { lat: 42, lon: 70, s: 0.2 }, { lat: 35, lon: 60, s: 0.15 }, { lat: 60, lon: 80, s: 0.3 },
    { lat: 65, lon: 120, s: 0.2 }, { lat: 5, lon: 20, s: 0.3 }, { lat: -10, lon: 25, s: 0.2 }, { lat: -15, lon: -60, s: 0.25 }, { lat: -30, lon: -65, s: 0.15 },
    { lat: -25, lon: 135, s: 0.2 }, { lat: 35, lon: 110, s: 0.2 }, { lat: 40, lon: 130, s: 0.1 }, { lat: 78, lon: 16, s: 0.04 }
  ].forEach(c => {
    const m = new THREE.Mesh(new THREE.CircleGeometry(c.s, 12), new THREE.MeshBasicMaterial({ color: 0x182848, transparent: true, opacity: 0.3, side: THREE.DoubleSide }));
    m.position.copy(latLonToVec3(c.lat, c.lon, r + 0.002)); m.lookAt(0, 0, 0); globe.add(m);
  });
}

function onMouseDown(e) { isDragging = true; autoRotate = false; prevMouse.x = e.clientX; prevMouse.y = e.clientY; }
function onMouseMove(e) {
  if (isDragging) {
    globe.rotation.y += (e.clientX - prevMouse.x) * 0.005; globe.rotation.x += (e.clientY - prevMouse.y) * 0.005;
    globe.rotation.x = Math.max(-1.2, Math.min(1.2, globe.rotation.x));
    prevMouse.x = e.clientX; prevMouse.y = e.clientY;
  }
  // Throttle raycasting to ~16 checks/sec
  const now = performance.now();
  if (now - lastRaycast < 60) return;
  lastRaycast = now;
  const c = document.getElementById('globe-container'), r = c.getBoundingClientRect();
  mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1; mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(pinMeshes), tt = document.getElementById('globe-tooltip');
  if (hits.length > 0) { const t = tripMap.get(hits[0].object.userData.tripId); if (t && tt) { tt.textContent = t.title; tt.style.left = (e.clientX - r.left + 15) + 'px'; tt.style.top = (e.clientY - r.top - 15) + 'px'; tt.classList.add('active'); c.style.cursor = 'pointer'; } }
  else { if (tt) tt.classList.remove('active'); c.style.cursor = isDragging ? 'grabbing' : 'grab'; }
}
function onMouseUp() { isDragging = false; setTimeout(() => autoRotate = true, 4000); }
function onTouchStart(e) { if (e.touches.length === 1) { isDragging = true; autoRotate = false; prevMouse.x = e.touches[0].clientX; prevMouse.y = e.touches[0].clientY; e.preventDefault(); } }
function onTouchMove(e) { if (!isDragging || e.touches.length !== 1) return; e.preventDefault(); globe.rotation.y += (e.touches[0].clientX - prevMouse.x) * 0.005; globe.rotation.x += (e.touches[0].clientY - prevMouse.y) * 0.005; globe.rotation.x = Math.max(-1.2, Math.min(1.2, globe.rotation.x)); prevMouse.x = e.touches[0].clientX; prevMouse.y = e.touches[0].clientY; }
function onGlobeClick(e) {
  const c = document.getElementById('globe-container'), r = c.getBoundingClientRect();
  mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1; mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(pinMeshes);
  if (hits.length > 0) { const t = tripMap.get(hits[0].object.userData.tripId); if (t) openModal(t); }
}
function onResize() { const c = document.getElementById('globe-container'); if (!c || !camera || !renderer) return; const w = c.clientWidth, h = c.clientHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); }

let pulseTime = 0;
let frameSkip = 0;
function animate() {
  requestAnimationFrame(animate); pulseTime += 0.02;
  if (autoRotate && globe) globe.rotation.y += 0.0018;
  // Only animate pin glow every 3rd frame for performance
  if (++frameSkip % 3 === 0 && pinGroup) {
    const pins = pinGroup.children;
    for (let i = 0, len = pins.length; i < len; i++) {
      const gl = pins[i].children[2], rn = pins[i].children[3], o = i * 0.5;
      const sv = Math.sin(pulseTime * 2 + o);
      if (gl) { gl.scale.setScalar(1 + sv * 0.25); gl.material.opacity = 0.15 + sv * 0.12; }
      if (rn) { rn.scale.setScalar(1 + Math.sin(pulseTime * 1.5 + o) * 0.3); rn.material.opacity = 0.1 + Math.sin(pulseTime * 1.5 + o) * 0.08; }
    }
  }
  renderer.render(scene, camera);
}

// ───────── TRIP CARDS ─────────
const CARDS_PER_PAGE = 12;
let currentPage = 1;
let filteredTrips = [...TRIPS];

function renderTripCards() {
  const grid = document.getElementById('trips-grid');
  if (!grid) return;

  const start = (currentPage - 1) * CARDS_PER_PAGE;
  const pageTrips = filteredTrips.slice(start, start + CARDS_PER_PAGE);

  grid.innerHTML = pageTrips.map((trip, index) => `
    <div class="trip-card reveal" data-trip-id="${trip.id}" data-transport="${trip.transport}" data-vibe="${trip.vibe}" style="transition-delay: ${index * 0.06}s">
      <div class="trip-card__image">
        <img src="${trip.image}" alt="${trip.title}" loading="lazy">
        <div class="trip-card__image-overlay"></div>
        <span class="trip-card__transport-badge">${getTransportLabel(trip.transport)}</span>
        <span class="trip-card__price">${trip.price}</span>
      </div>
      <div class="trip-card__body">
        <p class="trip-card__region">${trip.region}</p>
        <h3 class="trip-card__title">${trip.title}</h3>
        <p class="trip-card__desc">${trip.description.substring(0, 120)}…</p>
        <div class="trip-card__meta">
          <div class="trip-card__stat"><span class="trip-card__stat-label">Adrenaline</span><div class="trip-card__stat-bar">${renderPips(trip.adrenaline, 'filled')}</div></div>
          <div class="trip-card__stat"><span class="trip-card__stat-label">Luxury</span><div class="trip-card__stat-bar">${renderPips(trip.luxury, 'filled gold')}</div></div>
          <div class="trip-card__stat"><span class="trip-card__stat-label">Remoteness</span><div class="trip-card__stat-bar">${renderPips(trip.remoteness, 'filled')}</div></div>
        </div>
      </div>
      <div class="trip-card__hover-details">🕐 Best time: ${trip.bestTime} → Click for details</div>
    </div>
  `).join('');

  grid.querySelectorAll('.trip-card').forEach(card => {
    card.addEventListener('click', () => {
      const trip = tripMap.get(card.dataset.tripId);
      if (trip) openModal(trip);
    });
  });

  renderPagination();
  requestAnimationFrame(() => initScrollReveal());
}

function renderPagination() {
  const totalPages = Math.ceil(filteredTrips.length / CARDS_PER_PAGE);
  let container = document.getElementById('pagination');
  if (!container) {
    container = document.createElement('div');
    container.id = 'pagination';
    container.className = 'pagination';
    document.getElementById('trips-grid')?.parentElement?.appendChild(container);
  }

  if (totalPages <= 1) { container.innerHTML = ''; return; }

  let html = `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" data-page="prev">←</button>`;
  for (let i = 1; i <= totalPages; i++) {
    if (totalPages > 7 && i > 2 && i < totalPages - 1 && Math.abs(i - currentPage) > 1) {
      if (i === 3 || i === totalPages - 2) html += `<span class="page-dots">…</span>`;
      continue;
    }
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }
  html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" data-page="next">→</button>`;

  container.innerHTML = html;
  container.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      const p = btn.dataset.page;
      if (p === 'prev') currentPage = Math.max(1, currentPage - 1);
      else if (p === 'next') currentPage = Math.min(Math.ceil(filteredTrips.length / CARDS_PER_PAGE), currentPage + 1);
      else currentPage = +p;
      renderTripCards();
      document.getElementById('trips')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function getTransportLabel(t) {
  return { helicopter: '🚁 Helicopter', boat: '⛵ Boat', dogsled: '🐕 Dog Sled', horse: '🐴 Horse' }[t] || t;
}
function renderPips(value, cls) {
  let h = '';
  for (let i = 1; i <= 10; i++) h += `<span class="stat-pip ${i <= value ? cls : ''}"></span>`;
  return h;
}

// ───────── RESULT COUNT ─────────
function updateResultCount() {
  let el = document.getElementById('result-count');
  if (!el) {
    el = document.createElement('div');
    el.id = 'result-count';
    el.className = 'result-count';
    document.querySelector('.filter-bar')?.appendChild(el);
  }
  el.textContent = `${filteredTrips.length} expedition${filteredTrips.length !== 1 ? 's' : ''} found`;
}

// ───────── FILTERS ─────────
let activeTransport = 'all';
let activeVibe = 'all';
let activeRegion = 'all';

function getRegion(trip) {
  const id = trip.id;
  if (['iceland', 'iceland-westfjords', 'iceland-eyja', 'greenland', 'greenland-east', 'svalbard', 'lyngen', 'lofoten', 'senja', 'faroe'].includes(id)) return 'arctic';
  if (['finland', 'sweden-abisko', 'finland-saariselka', 'norway-narvik', 'norway-romsdal'].includes(id)) return 'scandinavia';
  if (['kyrgyzstan', 'kyrgyzstan-karakol', 'kazakhstan', 'georgia', 'tajikistan', 'turkey'].includes(id)) return 'central-asia';
  if (['skijoring', 'chamonix', 'verbier', 'dolomites', 'arlberg', 'pyrenees', 'scotland', 'romania', 'morocco', 'lebanon'].includes(id)) return 'europe';
  if (['hokkaido-niseko', 'hokkaido-asahi', 'tohoku', 'nagano', 'japan-shiga'].includes(id)) return 'japan';
  if (['alaska-valdez', 'alaska-haines', 'alaska-denali', 'bc-revelstoke', 'bc-bellacola', 'colorado', 'tetons', 'utah', 'montana-glacier', 'taos', 'newfoundland'].includes(id)) return 'north-america';
  if (['patagonia', 'chile-araucania', 'chile-portillo', 'bolivia', 'ushuaia'].includes(id)) return 'south-america';
  if (['kamchatka', 'siberia-altai', 'elbrus', 'armenia'].includes(id)) return 'russia';
  if (['kashmir', 'nepal', 'spiti', 'pakistan', 'iran'].includes(id)) return 'himalayas';
  if (['nz-south', 'nz-cook', 'antarctica', 'south-georgia', 'china'].includes(id)) return 'oceania';
  return 'other';
}

function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const filter = btn.dataset.filter;
      document.querySelectorAll(`.filter-btn[data-type="${type}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (type === 'transport') activeTransport = filter;
      if (type === 'vibe') activeVibe = filter;
      if (type === 'region') activeRegion = filter;
      applyFilters();
    });
  });
}

function applyFilters() {
  filteredTrips = TRIPS.filter(trip => {
    const mt = activeTransport === 'all' || trip.transport === activeTransport;
    const mv = activeVibe === 'all' || trip.vibe === activeVibe;
    const mr = activeRegion === 'all' || getRegion(trip) === activeRegion;
    return mt && mv && mr;
  });
  currentPage = 1;
  updateResultCount();
  renderTripCards();
}

// ───────── MODAL ─────────
function openModal(trip) {
  const o = document.getElementById('modal-overlay');
  document.getElementById('modal-image').src = trip.image;
  document.getElementById('modal-image').alt = trip.title;
  document.getElementById('modal-region').textContent = trip.region;
  document.getElementById('modal-title').textContent = trip.title;
  document.getElementById('modal-price').textContent = trip.price;
  document.getElementById('modal-description').textContent = trip.description;
  document.getElementById('modal-best-time').textContent = trip.bestTime;
  document.getElementById('modal-snow-type').textContent = trip.snowType;

  document.getElementById('modal-badges').innerHTML = trip.details.map(d => `<span class="modal__badge">${d}</span>`).join('');

  document.getElementById('modal-ratings').innerHTML = [
    { label: 'Adrenaline', value: trip.adrenaline },
    { label: 'Luxury', value: trip.luxury },
    { label: 'Remoteness', value: trip.remoteness }
  ].map(r => `
    <div class="modal__rating">
      <span class="modal__rating-label">${r.label}</span>
      <div class="modal__rating-bar"><div class="modal__rating-fill" style="width:0%;" data-width="${r.value * 10}%"></div></div>
      <span class="modal__rating-value">${r.value}/10</span>
    </div>
  `).join('');

  o.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    document.querySelectorAll('.modal__rating-fill').forEach(b => { b.style.width = b.dataset.width; });
  }, 600);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function initModal() {
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// ───────── SCROLL REVEAL ─────────
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ───────── SMOOTH SCROLL ─────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  });
}

// ───────── MOBILE NAV ─────────
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.querySelector('.nav__links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '100%'; links.style.left = '0'; links.style.right = '0';
    links.style.background = 'rgba(6,10,22,0.95)';
    links.style.backdropFilter = 'blur(20px)';
    links.style.padding = '1.5rem 2rem';
  });
}

// ───────── INIT ─────────
document.addEventListener('DOMContentLoaded', () => {
  // Critical-path inits first
  initNavScroll();
  initHeroCrossfade();
  renderTripCards();
  updateResultCount();
  initFilters();
  initModal();
  initScrollReveal();
  initSmoothScroll();
  initMobileNav();
  // Defer non-critical / heavy inits
  requestAnimationFrame(() => {
    initCursorGlow();
    initSnowParticles();
    initStatsCounter();
    initGlobe();
  });
});
