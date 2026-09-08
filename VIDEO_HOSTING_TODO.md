# Videos Still Needing External Hosting

These are all the videos currently referenced in `src/main.js` that do **not**
have a Vimeo/YouTube link yet — they're playing from local files in
`public/videos/` (gitignored, dev-only). Everything below needs to either:

1. Get uploaded to Vimeo (or another host) and swapped to a `provider`/`embedId`
   entry in `main.js`, **or**
2. Get manually uploaded to a persistent volume on Railway and referenced by
   URL, if we're going the "temporary, conference-only, ~5 concurrent viewers"
   route instead of Vimeo.

Total: **27 files, ~7.4 GB**. They're organized under
`public/videos/<station-slug>/<market-slug>/<file>.mp4`, matching the same
station/market structure used everywhere else in the app (this folder is
covered by `.gitignore` — `public/videos/`).

## Productivity Solutions

| Market | Title | File | Size |
|---|---|---|---|
| Flexible Packaging | BOBST smartGPS — Graphic Positioning System for CI Flexo | `productivity-solutions/flexible-packaging/smartgps-ci-flexo-press.mp4` | 191.3 MB |
| Folding Carton | Tooling, TooLink and CITO — Proof Points | `productivity-solutions/folding-carton/tooling-toolink-cito-proof-points.mp4` | 399.4 MB |
| Labels | MASTER M6 oneECG — BOBST Connect Live Demo | `productivity-solutions/labels/master-m6-oneecg-connect-live-demo.mp4` | 1029.3 MB |
| Labels | Brook + Whittle: Automation in Action | `productivity-solutions/labels/brook-whittle-full.mp4` | 271.6 MB |
| Labels | Die Plate Change | `productivity-solutions/labels/die-plate-change.mp4` | 38.8 MB |

## Quality & Color Consistency

| Market | Title | File | Size |
|---|---|---|---|
| Flexible Packaging | oneECG — Digitalizing Color Consistency | `quality-color-consistency/flexible-packaging/oneecg-proof-points.mp4` | 484.6 MB |
| Folding Carton | ACCUPLATEN — Faster Die-Cutting Setup | `quality-color-consistency/folding-carton/accuplaten-speed-patching.mp4` | 129.6 MB |
| Folding Carton | Drupa Proof Points — Die Cutting | `quality-color-consistency/folding-carton/drupa-proof-points-die-cutting.mp4` | 427 MB |
| Labels | BOBST Connect — Quality Reports in the Cloud | `quality-color-consistency/labels/techproofpoint-connect-quality-reports.mp4` | 13.5 MB |
| Labels | oneECG — Digitalizing Color Information for Labels | `quality-color-consistency/labels/techproofpoint-oneecg-digitizing-color.mp4` | 2.9 MB |
| Labels | Animation — BOBST oneECG for Labels | `quality-color-consistency/labels/animation-oneecg-labels.mp4` | 4.5 MB |
| Labels | Label Specialties — oneECG in Action | `quality-color-consistency/labels/label-specialties-oneecg.mp4` | 25.1 MB |
| Labels | ACCUCHECK B1 — Introduction | `quality-color-consistency/labels/accucheck-b1-introduction.mp4` | 75.6 MB |
| Labels | ACCUCHECK B2 — Inspection | `quality-color-consistency/labels/accucheck-b2-inspection.mp4` | 302.1 MB |
| Labels | ACCUCHECK B3 — Registration | `quality-color-consistency/labels/accucheck-b3-registration.mp4` | 157.4 MB |
| Labels | ACCUCHECK B4 — Colorimetry | `quality-color-consistency/labels/accucheck-b4-colorimetry.mp4` | 188.3 MB |
| Labels | ACCUCHECK B5 — Barcodes & QR Codes | `quality-color-consistency/labels/accucheck-b5-barcodes-qr-codes.mp4` | 165.4 MB |
| Labels | ACCUCHECK B6 — Intro to Calibration | `quality-color-consistency/labels/accucheck-b6-intro-calibration.mp4` | 39.2 MB |
| Labels | ACCUCHECK B7 — Calibration, Angle & Stitch | `quality-color-consistency/labels/accucheck-b7-calibration-angle-stitch.mp4` | 201.2 MB |
| Labels | ACCUCHECK B8 — Color to Color | `quality-color-consistency/labels/accucheck-b8-color-to-color.mp4` | 106.7 MB |
| Labels | ACCUCHECK B9 — Color Uniformity | `quality-color-consistency/labels/accucheck-b9-color-uniformity.mp4` | 154.1 MB |
| Labels | ACCUCHECK — Full Edit | `quality-color-consistency/labels/accucheck-full-edit.mp4` | 1604.2 MB |

## Sustainability & Application Innovation

| Market | Title | File | Size |
|---|---|---|---|
| Flexible Packaging | oneBARRIER — Sustainable Barrier Solutions | `sustainability-innovation/flexible-packaging/onebarrier-proof-points.mp4` | 694.5 MB |
| Labels | BOBST FLEXJET — Simplifying Multilayer Labels Production | `sustainability-innovation/labels/flexjet-multilayer-labels.mp4` | 470.5 MB |

## Lifecycle Performance & Services

| Market | Title | File | Size |
|---|---|---|---|
| Labels | BOBST Services — Connected to Power Your Performance | `lifecycle-performance-services/labels/service-performance-overview.mp4` | 55.5 MB |

## Notes

- Every other video already has a Vimeo or YouTube link and plays as an
  embed (no hosting action needed for those).
- `ACCUCHECK — Full Edit` (1.6 GB) is the single biggest file — it's the
  full compilation of the individual ACCUCHECK B1–B11 clips, which are also
  listed separately above. Worth asking whether we still need the full-edit
  version once all the individual chapters are hosted, to cut ~1.6 GB.
- If hosting on Railway: a persistent [volume](https://docs.railway.com/reference/volumes)
  mounted at something like `/data/videos` and served statically (or via a
  tiny Express/static route) would work fine for ~5 concurrent kiosk
  viewers. Swap each `src:` path in `main.js` to the Railway-served URL once
  uploaded — no code changes needed beyond the path itself.
- If hosting on Vimeo: once uploaded, replace the `{ poster, src }` pair
  with `{ title, provider: 'vimeo', embedId: '...' }` (see any existing
  entry with `provider: 'vimeo'` in `src/main.js` for the exact shape).
