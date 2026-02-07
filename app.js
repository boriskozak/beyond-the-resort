/* ============================================
   Beyond the Resort — App Logic (PREMIUM)
   3D Globe · Filters · Modals · Animations
   Cursor Glow · Stats Counter · Hero Crossfade
   ============================================ */

// ───────── TRIP DATA ─────────
const TRIPS = [
  {
    id: 'iceland',
    region: 'Iceland — Troll Peninsula',
    title: 'Arctic Heli-Skiing — Summit to Sea',
    tagline: 'Where fire meets ice.',
    price: '$7,500 – $10,000 pp',
    image: 'images/iceland.png',
    transport: 'helicopter',
    vibe: 'raw',
    adrenaline: 9,
    luxury: 4,
    remoteness: 7,
    bestTime: 'March – May',
    snowType: 'Maritime Snow — Dense, stable, and wind-buffed. Born from the North Atlantic, these heavy snowpacks bond fast to volcanic terrain, delivering reliable lines from summit to shoreline.',
    description: 'Fly over fractured glaciers and erupting geysers to ski 5,000-foot descents that end at the Arctic Ocean. The Troll Peninsula delivers untracked powder on peaks that have never seen a chairlift — backed by creative Icelandic cuisine, natural hot springs, and midnight sun sessions in late season.',
    details: ['6-day expedition', 'Max 8 guests', 'Hot spring base camp', 'Maritime snowpack'],
    lat: 66.0, lon: -18.5
  },
  {
    id: 'greenland',
    region: 'Greenland — Nuuk / Maniitsoq',
    title: 'Raw Arctic Ski Touring',
    tagline: 'The last great wilderness.',
    price: '$8,000 – $12,000 pp',
    image: 'images/greenland.png',
    transport: 'boat',
    vibe: 'raw',
    adrenaline: 8,
    luxury: 2,
    remoteness: 10,
    bestTime: 'April – June',
    snowType: 'Arctic Desert — Thin, wind-sculpted, and bone-dry. Greenland receives surprisingly little precipitation; the snow that falls is featherweight and crystalline, but crust layers demand sharp route-finding.',
    description: 'Sail a converted fishing vessel through the Davis Strait to access fjords that don\'t appear on most maps. Earn every turn on multi-day touring circuits through an arctic desert where the ice cap glows electric blue on the horizon. No lodges. No trails. No one else.',
    details: ['10-day voyage', 'Max 6 guests', 'Boat-based camp', 'Full self-sufficiency'],
    lat: 65.2, lon: -52.0
  },
  {
    id: 'svalbard',
    region: 'Svalbard — Norway',
    title: 'Ski & Sail Expeditions',
    tagline: 'Polar bear country.',
    price: '$9,000 – $14,000 pp',
    image: 'images/svalbard.png',
    transport: 'boat',
    vibe: 'luxury',
    adrenaline: 8,
    luxury: 7,
    remoteness: 9,
    bestTime: 'April – May',
    snowType: 'Maritime-Arctic Hybrid — Svalbard sits where the Gulf Stream meets polar air. The result: moderate snowfall that consolidates well, ideal for long couloir descents to sea level.',
    description: 'Live aboard a heritage tall ship navigating the high Arctic archipelago at 78°N. Each morning, zodiac ashore to skin up spines and couloirs that drop directly into the fjord. Armed guides scan for polar bears while you carve untouched faces under the midnight sun. Gourmet dinners and a wood-fired sauna await below deck.',
    details: ['8-day sail', 'Max 12 guests', 'Armed polar bear guard', 'Tall ship accommodation'],
    lat: 78.2, lon: 15.6
  },
  {
    id: 'kyrgyzstan',
    region: 'Kyrgyzstan — Tien Shan',
    title: 'Yurt-Based Heli-Skiing on the Silk Road',
    tagline: 'Nomad powder.',
    price: '$5,000 – $7,500 pp',
    image: 'images/kyrgyzstan.png',
    transport: 'helicopter',
    vibe: 'raw',
    adrenaline: 9,
    luxury: 5,
    remoteness: 8,
    bestTime: 'February – April',
    snowType: 'Continental Cold Smoke — Landlocked and high-altitude, the Tien Shan range produces dry, deep, blower powder with a shallow snowpack. Aspect management is everything.',
    description: 'A Soviet-era Mi-8 helicopter deposits you on 15,000-foot Silk Road peaks above yurt camps run by semi-nomadic Kyrgyz herders. The vertical is massive, the snow is cold smoke, and the price is half of anything comparable in the Alps. Warm up with fermented mare\'s milk and mutton stew by the fire.',
    details: ['7-day trip', 'Max 10 guests', 'Traditional yurt lodging', 'Mi-8 helicopter'],
    lat: 42.0, lon: 75.0
  },
  {
    id: 'finland',
    region: 'Finnish Lapland',
    title: 'Dog-Sled Supported Backcountry Touring',
    tagline: 'Silent wilderness, loyal companions.',
    price: '$5,500 – $8,000 pp',
    image: 'images/finland.png',
    transport: 'dogsled',
    vibe: 'raw',
    adrenaline: 6,
    luxury: 5,
    remoteness: 7,
    bestTime: 'January – March',
    snowType: 'Boreal Continental — Consistent, cold, and deep. Lapland\'s snow arrives early and stays late, building a stable base ideal for touring. Powder stashes hide in old-growth spruce forests.',
    description: 'Your gear travels by husky sled as you skin through ancient boreal forests and across frozen lakes, chasing turns on the gentle fells of Finnish Lapland. Nights are spent in remote wilderness cabins with wood-fired saunas. The northern lights are your headlamp. The silence is deafening.',
    details: ['5-day traverse', 'Max 8 guests', 'Husky team support', 'Wilderness cabin stays'],
    lat: 68.5, lon: 27.5
  },
  {
    id: 'skijoring',
    region: 'Montana / St. Moritz',
    title: 'Luxury Skijoring',
    tagline: 'Horse-drawn thrills.',
    price: '$6,000 – $9,000 pp',
    image: 'images/skijoring.png',
    transport: 'horse',
    vibe: 'luxury',
    adrenaline: 7,
    luxury: 10,
    remoteness: 3,
    bestTime: 'December – February',
    snowType: 'Intermountain / Alpine — Montana\'s snow is cold and dry; St. Moritz delivers high-altitude champagne powder. Both provide ideal groomed surfaces for high-speed skijoring.',
    description: 'Be towed at 30 mph behind a thoroughbred across frozen meadows and purpose-built courses, jumping hay bales and slalom gates. In Montana, stay at a working ranch with craft whiskey and wagyu steaks. In St. Moritz, it\'s Veuve Clicquot and fur blankets at a palace hotel. The most luxurious adrenaline rush in skiing.',
    details: ['4-day experience', 'Max 6 guests', 'Five-star lodging', 'Private instruction'],
    lat: 46.5, lon: 9.8
  }
];

// ───────── CURSOR GLOW ─────────
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(max-width: 768px)').matches) return;

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(updateGlow);
  }
  updateGlow();
}

// ───────── NAV SCROLL ─────────
function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

// ───────── SNOW PARTICLES ─────────
function initSnowParticles() {
  const container = document.getElementById('snow-particles');
  if (!container) return;
  const count = 80;
  for (let i = 0; i < count; i++) {
    const flake = document.createElement('div');
    flake.classList.add('snowflake');
    flake.style.left = Math.random() * 100 + '%';
    const s = Math.random() * 4 + 1.5;
    flake.style.width = s + 'px';
    flake.style.height = s + 'px';
    flake.style.animationDuration = (Math.random() * 10 + 8) + 's';
    flake.style.animationDelay = (Math.random() * 12) + 's';
    flake.style.opacity = Math.random() * 0.5 + 0.15;
    container.appendChild(flake);
  }
}

// ───────── HERO BG CROSSFADE ─────────
function initHeroCrossfade() {
  const imgCurrent = document.getElementById('hero-bg-img');
  const imgNext = document.getElementById('hero-bg-img-next');
  if (!imgCurrent || !imgNext) return;

  const images = ['images/iceland.png', 'images/svalbard.png', 'images/finland.png', 'images/kyrgyzstan.png'];
  let idx = 0;
  let showingCurrent = true;

  setInterval(() => {
    idx = (idx + 1) % images.length;
    if (showingCurrent) {
      imgNext.src = images[idx];
      imgNext.style.opacity = '1';
      imgCurrent.style.opacity = '0';
    } else {
      imgCurrent.src = images[idx];
      imgCurrent.style.opacity = '1';
      imgNext.style.opacity = '0';
    }
    showingCurrent = !showingCurrent;
  }, 7000);
}

// ───────── STATS COUNTER ─────────
function initStatsCounter() {
  const numbers = document.querySelectorAll('.stat-item__number[data-target]');
  if (!numbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  numbers.forEach(n => observer.observe(n));
}

function animateCounter(el, target) {
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ───────── 3D GLOBE ─────────
let scene, camera, renderer, globe, pinGroup;
let isDragging = false, prevMouse = { x: 0, y: 0 };
let autoRotate = true;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const pinMeshes = [];

function latLonToVec3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function initGlobe() {
  const container = document.getElementById('globe-container');
  const canvas = document.getElementById('globe-canvas');
  if (!container || !canvas) return;

  const w = container.clientWidth;
  const h = container.clientHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
  camera.position.z = 4;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  scene.add(new THREE.AmbientLight(0x334466, 0.5));

  const dirLight = new THREE.DirectionalLight(0x8899cc, 1.2);
  dirLight.position.set(5, 3, 5);
  scene.add(dirLight);

  const rimLight = new THREE.DirectionalLight(0xff6b2b, 0.3);
  rimLight.position.set(-5, -2, -3);
  scene.add(rimLight);

  const pointLight = new THREE.PointLight(0x38bdf8, 0.3, 10);
  pointLight.position.set(-3, 2, 4);
  scene.add(pointLight);

  // Globe
  const globeRadius = 1.5;
  const globeGeo = new THREE.SphereGeometry(globeRadius, 80, 80);
  const globeMat = new THREE.MeshPhongMaterial({
    color: 0x0a1025,
    emissive: 0x060c20,
    specular: 0x2a3a66,
    shininess: 20,
    transparent: true,
    opacity: 0.97,
  });
  globe = new THREE.Mesh(globeGeo, globeMat);
  scene.add(globe);

  // Wireframe
  const wireGeo = new THREE.SphereGeometry(globeRadius + 0.004, 40, 40);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x1a2a55,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  });
  globe.add(new THREE.Mesh(wireGeo, wireMat));

  // Atmosphere
  const glowGeo = new THREE.SphereGeometry(globeRadius + 0.1, 64, 64);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x1a3a88,
    transparent: true,
    opacity: 0.06,
    side: THREE.BackSide,
  });
  scene.add(new THREE.Mesh(glowGeo, glowMat));

  // Second atmosphere (wider)
  const glowGeo2 = new THREE.SphereGeometry(globeRadius + 0.2, 64, 64);
  const glowMat2 = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.02,
    side: THREE.BackSide,
  });
  scene.add(new THREE.Mesh(glowGeo2, glowMat2));

  // Continent patches
  addContinentPatches(globeRadius);

  // Pin group
  pinGroup = new THREE.Group();
  globe.add(pinGroup);

  // Add pins
  TRIPS.forEach(trip => {
    const pos = latLonToVec3(trip.lat, trip.lon, globeRadius);

    const stemGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.14, 8);
    const stemMat = new THREE.MeshBasicMaterial({ color: 0xff6b2b });
    const stem = new THREE.Mesh(stemGeo, stemMat);

    const headGeo = new THREE.SphereGeometry(0.035, 16, 16);
    const headMat = new THREE.MeshBasicMaterial({ color: 0xff6b2b });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 0.09;

    const glowPinGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const glowPinMat = new THREE.MeshBasicMaterial({
      color: 0xff8c55,
      transparent: true,
      opacity: 0.25,
    });
    const glowPin = new THREE.Mesh(glowPinGeo, glowPinMat);
    glowPin.position.y = 0.09;

    // Ring around pin
    const ringGeo = new THREE.RingGeometry(0.05, 0.07, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff6b2b,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 0.005;
    ring.rotation.x = -Math.PI / 2;

    const pinContainer = new THREE.Group();
    pinContainer.add(stem);
    pinContainer.add(head);
    pinContainer.add(glowPin);
    pinContainer.add(ring);

    pinContainer.position.copy(pos);
    pinContainer.lookAt(0, 0, 0);
    pinContainer.rotateX(Math.PI / 2);

    pinContainer.userData = { tripId: trip.id };
    pinGroup.add(pinContainer);
    pinMeshes.push(head);
    head.userData = { tripId: trip.id };
  });

  // Events
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('mouseleave', onMouseUp);
  canvas.addEventListener('click', onGlobeClick);
  canvas.addEventListener('touchstart', onTouchStart, { passive: false });
  canvas.addEventListener('touchmove', onTouchMove, { passive: false });
  canvas.addEventListener('touchend', onMouseUp);

  window.addEventListener('resize', onResize);

  // Globe location sidebar
  initGlobeLocations();

  animate();
}

function addContinentPatches(r) {
  const continents = [
    { lat: 50, lon: 10, scale: 0.15 },
    { lat: 55, lon: 25, scale: 0.12 },
    { lat: 60, lon: 15, scale: 0.1 },
    { lat: 64, lon: 14, scale: 0.08 },
    { lat: 68, lon: 18, scale: 0.06 },
    { lat: 65, lon: -19, scale: 0.05 },
    { lat: 72, lon: -42, scale: 0.2 },
    { lat: 68, lon: -50, scale: 0.12 },
    { lat: 45, lon: -100, scale: 0.35 },
    { lat: 55, lon: -105, scale: 0.25 },
    { lat: 60, lon: -135, scale: 0.15 },
    { lat: 35, lon: -90, scale: 0.2 },
    { lat: 42, lon: 70, scale: 0.2 },
    { lat: 35, lon: 60, scale: 0.15 },
    { lat: 60, lon: 80, scale: 0.3 },
    { lat: 65, lon: 120, scale: 0.2 },
    { lat: 5, lon: 20, scale: 0.3 },
    { lat: -10, lon: 25, scale: 0.2 },
    { lat: -15, lon: -60, scale: 0.25 },
    { lat: -30, lon: -65, scale: 0.15 },
    { lat: -25, lon: 135, scale: 0.2 },
    { lat: 35, lon: 110, scale: 0.2 },
    { lat: 40, lon: 130, scale: 0.1 },
    { lat: 78, lon: 16, scale: 0.04 },
  ];

  continents.forEach(c => {
    const pos = latLonToVec3(c.lat, c.lon, r + 0.002);
    const geo = new THREE.CircleGeometry(c.scale, 24);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x182848,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    mesh.lookAt(0, 0, 0);
    globe.add(mesh);
  });
}

function initGlobeLocations() {
  document.querySelectorAll('.globe-loc').forEach(loc => {
    loc.addEventListener('click', () => {
      const tripId = loc.dataset.trip;
      const trip = TRIPS.find(t => t.id === tripId);
      if (trip) {
        // Rotate globe to show the location
        const target = latLonToVec3(trip.lat, trip.lon, 1.5);
        const angle = Math.atan2(target.x, target.z);
        globe.rotation.y = -angle + Math.PI;
        autoRotate = false;
        setTimeout(() => autoRotate = true, 5000);
        // Open modal
        openModal(trip);
      }
    });
  });
}

function onMouseDown(e) {
  isDragging = true;
  autoRotate = false;
  prevMouse.x = e.clientX;
  prevMouse.y = e.clientY;
}

function onMouseMove(e) {
  const container = document.getElementById('globe-container');
  const rect = container.getBoundingClientRect();

  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(pinMeshes);
  const tooltip = document.getElementById('globe-tooltip');

  if (intersects.length > 0) {
    const tripId = intersects[0].object.userData.tripId;
    const trip = TRIPS.find(t => t.id === tripId);
    if (trip && tooltip) {
      tooltip.textContent = trip.title;
      tooltip.style.left = (e.clientX - rect.left + 15) + 'px';
      tooltip.style.top = (e.clientY - rect.top - 15) + 'px';
      tooltip.classList.add('active');
      container.style.cursor = 'pointer';
    }
  } else {
    if (tooltip) tooltip.classList.remove('active');
    container.style.cursor = isDragging ? 'grabbing' : 'grab';
  }

  if (!isDragging) return;
  const dx = e.clientX - prevMouse.x;
  const dy = e.clientY - prevMouse.y;
  globe.rotation.y += dx * 0.005;
  globe.rotation.x += dy * 0.005;
  globe.rotation.x = Math.max(-1.2, Math.min(1.2, globe.rotation.x));
  prevMouse.x = e.clientX;
  prevMouse.y = e.clientY;
}

function onMouseUp() {
  isDragging = false;
  setTimeout(() => { autoRotate = true; }, 4000);
}

function onTouchStart(e) {
  if (e.touches.length === 1) {
    isDragging = true;
    autoRotate = false;
    prevMouse.x = e.touches[0].clientX;
    prevMouse.y = e.touches[0].clientY;
    e.preventDefault();
  }
}

function onTouchMove(e) {
  if (!isDragging || e.touches.length !== 1) return;
  e.preventDefault();
  const dx = e.touches[0].clientX - prevMouse.x;
  const dy = e.touches[0].clientY - prevMouse.y;
  globe.rotation.y += dx * 0.005;
  globe.rotation.x += dy * 0.005;
  globe.rotation.x = Math.max(-1.2, Math.min(1.2, globe.rotation.x));
  prevMouse.x = e.touches[0].clientX;
  prevMouse.y = e.touches[0].clientY;
}

function onGlobeClick(e) {
  const container = document.getElementById('globe-container');
  const rect = container.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(pinMeshes);

  if (intersects.length > 0) {
    const tripId = intersects[0].object.userData.tripId;
    const trip = TRIPS.find(t => t.id === tripId);
    if (trip) openModal(trip);
  }
}

function onResize() {
  const container = document.getElementById('globe-container');
  if (!container || !camera || !renderer) return;
  const w = container.clientWidth;
  const h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

let pulseTime = 0;
function animate() {
  requestAnimationFrame(animate);
  pulseTime += 0.02;

  if (autoRotate && globe) {
    globe.rotation.y += 0.0018;
  }

  // Pulse pins
  pinGroup?.children.forEach((pin, i) => {
    const glowMesh = pin.children[2];
    const ring = pin.children[3];
    const offset = i * 0.5;
    if (glowMesh) {
      glowMesh.scale.setScalar(1 + Math.sin(pulseTime * 2 + offset) * 0.25);
      glowMesh.material.opacity = 0.15 + Math.sin(pulseTime * 2 + offset) * 0.12;
    }
    if (ring) {
      ring.scale.setScalar(1 + Math.sin(pulseTime * 1.5 + offset) * 0.3);
      ring.material.opacity = 0.1 + Math.sin(pulseTime * 1.5 + offset) * 0.08;
    }
  });

  renderer.render(scene, camera);
}

// ───────── TRIP CARDS ─────────
function renderTripCards() {
  const grid = document.getElementById('trips-grid');
  if (!grid) return;

  grid.innerHTML = TRIPS.map((trip, index) => `
    <div class="trip-card reveal" data-trip-id="${trip.id}" data-transport="${trip.transport}" data-vibe="${trip.vibe}" style="transition-delay: ${index * 0.1}s">
      <div class="trip-card__image">
        <img src="${trip.image}" alt="${trip.title}" loading="lazy">
        <div class="trip-card__image-overlay"></div>
        <span class="trip-card__transport-badge">${getTransportLabel(trip.transport)}</span>
        <span class="trip-card__price">${trip.price}</span>
      </div>
      <div class="trip-card__body">
        <p class="trip-card__region">${trip.region}</p>
        <h3 class="trip-card__title">${trip.title}</h3>
        <p class="trip-card__desc">${trip.description.substring(0, 130)}…</p>
        <div class="trip-card__meta">
          <div class="trip-card__stat">
            <span class="trip-card__stat-label">Adrenaline</span>
            <div class="trip-card__stat-bar">${renderPips(trip.adrenaline, 'filled')}</div>
          </div>
          <div class="trip-card__stat">
            <span class="trip-card__stat-label">Luxury</span>
            <div class="trip-card__stat-bar">${renderPips(trip.luxury, 'filled gold')}</div>
          </div>
          <div class="trip-card__stat">
            <span class="trip-card__stat-label">Remoteness</span>
            <div class="trip-card__stat-bar">${renderPips(trip.remoteness, 'filled')}</div>
          </div>
        </div>
      </div>
      <div class="trip-card__hover-details">
        🕐 Best time: ${trip.bestTime} → Click for details
      </div>
    </div>
  `).join('');

  // Card click
  grid.querySelectorAll('.trip-card').forEach(card => {
    card.addEventListener('click', () => {
      const trip = TRIPS.find(t => t.id === card.dataset.tripId);
      if (trip) openModal(trip);
    });
  });

  requestAnimationFrame(() => initScrollReveal());
}

function getTransportLabel(t) {
  const labels = { helicopter: '🚁 Helicopter', boat: '⛵ Boat', dogsled: '🐕 Dog Sled', horse: '🐴 Horse' };
  return labels[t] || t;
}

function renderPips(value, cls) {
  let html = '';
  for (let i = 1; i <= 10; i++) {
    html += `<span class="stat-pip ${i <= value ? cls : ''}"></span>`;
  }
  return html;
}

// ───────── FILTERS ─────────
let activeTransport = 'all';
let activeVibe = 'all';

function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const filter = btn.dataset.filter;

      document.querySelectorAll(`.filter-btn[data-type="${type}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (type === 'transport') activeTransport = filter;
      if (type === 'vibe') activeVibe = filter;

      applyFilters();
    });
  });
}

function applyFilters() {
  const cards = document.querySelectorAll('.trip-card');
  let delay = 0;

  cards.forEach(card => {
    const transport = card.dataset.transport;
    const vibe = card.dataset.vibe;
    const matchTransport = activeTransport === 'all' || transport === activeTransport;
    const matchVibe = activeVibe === 'all' || vibe === activeVibe;

    if (matchTransport && matchVibe) {
      card.classList.remove('hidden');
      card.style.animation = `fadeInUp 0.5s ease ${delay}s both`;
      delay += 0.08;
    } else {
      card.classList.add('hidden');
    }
  });
}

// ───────── MODAL ─────────
function openModal(trip) {
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-image').src = trip.image;
  document.getElementById('modal-image').alt = trip.title;
  document.getElementById('modal-region').textContent = trip.region;
  document.getElementById('modal-title').textContent = trip.title;
  document.getElementById('modal-price').textContent = trip.price;
  document.getElementById('modal-description').textContent = trip.description;
  document.getElementById('modal-best-time').textContent = trip.bestTime;
  document.getElementById('modal-snow-type').textContent = trip.snowType;

  const badgesEl = document.getElementById('modal-badges');
  badgesEl.innerHTML = trip.details.map(d => `<span class="modal__badge">${d}</span>`).join('');

  // Ratings — animate in after modal opens
  const ratingsEl = document.getElementById('modal-ratings');
  ratingsEl.innerHTML = [
    { label: 'Adrenaline', value: trip.adrenaline },
    { label: 'Luxury', value: trip.luxury },
    { label: 'Remoteness', value: trip.remoteness },
  ].map(r => `
    <div class="modal__rating">
      <span class="modal__rating-label">${r.label}</span>
      <div class="modal__rating-bar">
        <div class="modal__rating-fill" style="width: 0%;" data-width="${r.value * 10}%"></div>
      </div>
      <span class="modal__rating-value">${r.value}/10</span>
    </div>
  `).join('');

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Animate rating bars in after slide transition
  setTimeout(() => {
    document.querySelectorAll('.modal__rating-fill').forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }, 600);
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function initModal() {
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ───────── SCROLL REVEAL ─────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ───────── SMOOTH SCROLL FOR ANCHOR LINKS ─────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
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
    links.style.top = '100%';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(6, 10, 22, 0.95)';
    links.style.backdropFilter = 'blur(20px)';
    links.style.padding = '1.5rem 2rem';
    links.style.borderBottom = '1px solid rgba(240, 244, 255, 0.06)';
  });
}

// ───────── INIT ─────────
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initNavScroll();
  initSnowParticles();
  initHeroCrossfade();
  initStatsCounter();
  initGlobe();
  renderTripCards();
  initFilters();
  initModal();
  initScrollReveal();
  initSmoothScroll();
  initMobileNav();
});
