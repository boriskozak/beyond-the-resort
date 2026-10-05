# Beyond the Resort

Extreme Winter Expeditions: a premium, single-page travel website for arctic
heli-skiing, ski & sail voyages, dog-sled touring, and luxury skijoring in the
world's most remote winter destinations.

## What's here

- `index.html` — page structure (nav, hero, stats, globe, filters, trip grid, modal, footer)
- `style.css` — full visual design (cinematic dark theme, glassmorphism)
- `app.js` — all interactivity: 3D globe, filters, pagination, modals, animations
- `trips-data.js` — expedition catalog (66 destinations with region, price,
  ratings, snow type, coordinates)
- `itineraries.js` — sample day-by-day itineraries keyed by trip ID
- `images/` — destination artwork

## Run it

No build step. Serve the folder over HTTP (ES modules are not used, but
`file://` may block the Three.js CDN in some browsers):

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Features

- Interactive 3D globe (Three.js) with clickable destination pins
- Filter by transport (helicopter, boat, dog sled, horse), vibe, and region
- Paginated expedition cards with shareable hash URLs (`#taos`)
- Trip detail modal with ratings, itinerary, and Airbnb search link
- "Clint's Decider" random trip picker

## Dependencies

- [Three.js r128](https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js)
  via CDN (globe rendering)
- Google Fonts: Oswald, Lora, Inter
