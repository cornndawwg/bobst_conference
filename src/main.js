import './style.css';

// ============================================================
// SVG Icons (inline for zero-dependency)
// ============================================================
const icons = {
  arrowLeft: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10H5"/><path d="M10 5L5 10L10 15"/></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10"/><path d="M9 4l4 4-4 4"/></svg>`,
  image: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
  close: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  playCircle: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>`,
  zoomIn: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
  clock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
};

// ============================================================
// Market Metadata (shared display names across stations)
// ============================================================
const MARKET_TITLES = {
  'flexible-packaging': 'Flexible Packaging',
  'folding-carton': 'Folding Carton',
  'labels': 'Labels',
};

// Shared market photography used on the market cards across every station
// home page (one representative image per market — no per-station variants).
const MARKET_IMAGES = {
  'flexible-packaging': '/images/cards/flexible-packaging.jpg',
  'folding-carton': '/images/cards/folding-carton.jpg',
  'labels': '/images/cards/labels.jpg',
};

// ============================================================
// Video helpers — a video entry is either a locally-hosted file
// ({ src, poster }) or a hosted embed ({ provider: 'vimeo'|'youtube',
// embedId, poster? }). This lets Vimeo/YouTube links play inline in the
// same carousel + fullscreen overlay as local mp4s without a backend.
// ============================================================
function getVideoEmbedUrl(video) {
  if (video.provider === 'vimeo' && video.embedId) {
    const hash = video.embedHash ? `&h=${video.embedHash}` : '';
    return `https://player.vimeo.com/video/${video.embedId}?autoplay=1&title=0&byline=0&portrait=0${hash}`;
  }
  if (video.provider === 'youtube' && video.embedId) {
    return `https://www.youtube.com/embed/${video.embedId}?autoplay=1&rel=0`;
  }
  return null;
}

function getVideoPoster(video) {
  if (video.poster) return video.poster;
  if (video.provider === 'vimeo' && video.embedId) return `https://vumbnail.com/${video.embedId}.jpg`;
  if (video.provider === 'youtube' && video.embedId) return `https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`;
  return '';
}

// ============================================================
// Station + Market Content
// ============================================================
// NOTE on videos: `src`/`poster` currently point at local dev copies under
// public/videos/ and public/posters/, which are gitignored (too large for
// git / the Railway build). Swap `src` to production-hosted URLs (CDN,
// object storage, etc.) once the real videos are uploaded — posters are
// small enough to ship in the repo as-is.
const stationOrder = [
  'productivity-solutions',
  'quality-color-consistency',
  'sustainability-innovation',
  'lifecycle-performance-services',
  'digital-solutions',
];

const stations = {
  'productivity-solutions': {
    category: 'Productivity Solutions',
    headline: 'Reduce Complexity, Improve Performance',
    intro:
      'Explore BOBST solutions that simplify workflows, automate critical processes and help converters produce more efficiently across Flexible Packaging, Folding Carton and Labels.',
    markets: {
      'flexible-packaging': {
        blurb:
          'Reduce setup time and operator dependency through automated press processes, faster changeovers and more repeatable production.',
        headline: 'Simplify Flexible Packaging Production',
        body:
          'Automated solutions such as smartGPS and connected end-to-end workflows help reduce setup time, operator dependency and process variation while improving overall press performance. BOBST smartGPS delivers up to a 30% productivity increase without changing production speed.',
        videos: [
          {
            title: 'BOBST smartGPS — Graphic Positioning System for CI Flexo',
            poster: '/posters/productivity-solutions/flexible-packaging/smartgps-ci-flexo-press.jpg',
            src: '/videos/productivity-solutions/flexible-packaging/smartgps-ci-flexo-press.mp4',
          },
        ],
        slides: [
          {
            title: 'smartGPS — SAMM 3.0 Mounting Unit',
            image: '/images/productivity-solutions/flexible-packaging/smartgps-samm-unit.jpg',
          },
          {
            title: 'smartGPS Live on the Show Floor',
            image: '/images/productivity-solutions/flexible-packaging/smartgps-live-demo-floor.jpg',
          },
        ],
      },
      'folding-carton': {
        blurb:
          'Improve makeready and production performance through standardized tooling, integrated workflows and certified processes.',
        headline: 'Improve Folding Carton Productivity',
        body:
          'Standardized tooling, connected production processes and workforce training help converters reduce makeready time, improve repeatability and maintain performance across every job. High Performance Tooling and TooLink together can reduce set-up time and increase output by up to 30%.',
        videos: [
          {
            title: 'Zumbiel and BOBST',
            provider: 'vimeo',
            embedId: '1093624953',
            embedHash: '5f4c0ef396',
            poster: 'https://i.vimeocdn.com/video/2027022860-409eb7beeef9265e367f548f842755fa3e2ca4e4ac9c0960b2b3b327374fc57e-d_1280x720?region=us',
          },
          {
            title: 'Tooling, TooLink and CITO — Proof Points',
            poster: '/posters/productivity-solutions/folding-carton/tooling-toolink-cito-proof-points.jpg',
            src: '/videos/productivity-solutions/folding-carton/tooling-toolink-cito-proof-points.mp4',
          },
        ],
        slides: [
          {
            title: 'High Performance Tooling — Precision Detail',
            image: '/images/productivity-solutions/folding-carton/tooling-close-up.jpg',
          },
          {
            title: 'Loading a High Performance Die Plate',
            image: '/images/productivity-solutions/folding-carton/tooling-plate-loading.jpg',
          },
        ],
      },
      'labels': {
        blurb:
          'Combine printing and converting operations with intelligent automation to manage shorter runs, increasing SKU complexity and faster turnaround requirements.',
        headline: 'Increase Label Production Agility',
        body:
          'BOBST solutions integrate printing, embellishment and converting to simplify production, reduce manual steps and support faster, more efficient job changeovers.',
        videos: [
          {
            title: 'MASTER M6 oneECG — BOBST Connect Live Demo',
            poster: '/posters/productivity-solutions/labels/master-m6.jpg',
            src: '/videos/productivity-solutions/labels/master-m6-oneecg-connect-live-demo.mp4',
          },
          {
            title: 'Brook + Whittle: Automation in Action',
            poster: '/posters/productivity-solutions/labels/brook-whittle.jpg',
            src: '/videos/productivity-solutions/labels/brook-whittle-full.mp4',
          },
          {
            title: 'Die Plate Change',
            poster: '/posters/productivity-solutions/labels/die-plate-change.jpg',
            src: '/videos/productivity-solutions/labels/die-plate-change.mp4',
          },
          {
            title: 'How Label Specialties Elevates Production with the MASTER M5',
            provider: 'youtube',
            embedId: 'p-n1VRqWWn8',
          },
          {
            title: 'MASTER M6 — Exceptionally Productive',
            poster: '/posters/productivity-solutions/labels/master-m6-vision-pillars.jpg',
            src: '/videos/productivity-solutions/labels/master-m6-vision-pillars.mp4',
          },
          {
            title: 'DIGIFLEXO in Action — Automated Register & Pressure Control',
            poster: '/posters/productivity-solutions/labels/digiflexo-automation-demo.jpg',
            src: '/videos/productivity-solutions/labels/digiflexo-automation-demo.mp4',
          },
          {
            title: 'All-in-One Modular Press — Build Your Line',
            poster: '/posters/productivity-solutions/labels/all-in-one-modular-press.jpg',
            src: '/videos/productivity-solutions/labels/all-in-one-modular-press.mp4',
          },
        ],
      },
    },
  },
  'quality-color-consistency': {
    category: 'Quality & Color Consistency',
    headline: 'Deliver Color Consistency',
    intro:
      'Discover solutions that combine advanced color management, inspection and process control to achieve repeatable quality across jobs, machines and production locations.',
    markets: {
      'flexible-packaging': {
        blurb:
          'Maintain stable color and process performance through oneECG, intelligent color management and advanced production controls.',
        headline: 'Achieve Stable, Repeatable Print Quality',
        body:
          'oneECG, Co-efficient color management and advanced process controls help flexible packaging converters achieve predictable color, faster setup and greater consistency across production runs. oneECG extends Pantone book matching from 65% to 95%+ while cutting start-up waste by 35%.',
        videos: [
          {
            title: 'oneECG — Digitalizing Color Consistency',
            poster: '/posters/quality-color-consistency/flexible-packaging/oneecg-proof-points.jpg',
            src: '/videos/quality-color-consistency/flexible-packaging/oneecg-proof-points.mp4',
          },
        ],
        slides: [
          {
            title: 'oneECG — 95%+ Pantone Book Match',
            image: '/images/quality-color-consistency/flexible-packaging/oneecg-pantone-match-review.jpg',
          },
        ],
      },
      'folding-carton': {
        blurb:
          'Improve registration, defect detection and makeready performance to produce consistent, high-quality cartons with less waste.',
        headline: 'Protect Quality Throughout Production',
        body:
          'Solutions including ACCUCHECK, ACCUPLATEN, POWER REGISTER and high-performance tooling help detect defects, improve registration and maintain consistent converting quality.',
        videos: [
          {
            title: 'ACCUPLATEN — Faster Die-Cutting Setup',
            poster: '/posters/quality-color-consistency/folding-carton/accuplaten-speed-patching.jpg',
            src: '/videos/quality-color-consistency/folding-carton/accuplaten-speed-patching.mp4',
          },
          {
            title: 'Drupa Proof Points — Die Cutting',
            poster: '/posters/quality-color-consistency/folding-carton/drupa-proof-points-die-cutting.jpg',
            src: '/videos/quality-color-consistency/folding-carton/drupa-proof-points-die-cutting.mp4',
          },
          { title: 'Tooling with Patrick and Brian', provider: 'vimeo', embedId: '1080758081' },
          { title: 'How TAVO Packaging Is Delivering More with BOBST', provider: 'youtube', embedId: '-pvVuTX9S8A' },
        ],
        slides: [
          {
            title: 'BOBST ACCUCHECK — Inline Quality Control',
            image: '/images/quality-color-consistency/folding-carton/accucheck-machine.jpg',
          },
          {
            title: 'Full-Speed Inspection Unit',
            image: '/images/quality-color-consistency/folding-carton/full-speed-inspection.jpg',
          },
          {
            title: 'Complete Folding Carton Production Line',
            image: '/images/quality-color-consistency/folding-carton/folding-carton-line.jpg',
          },
        ],
      },
      'labels': {
        blurb:
          'Deliver consistent color and reliable quality across digital, flexo and All-in-One label production.',
        headline: 'Maintain Color Across Every Label Job',
        body:
          'Integrated color management, inspection and process-control solutions help label converters maintain predictable results across changing substrates, run lengths and production technologies. Converters running oneECG at scale report up to a 67% output increase per year with 86% less time lost during set-up.',
        videos: [
          { title: 'BOBST Connect — Quality Reports in the Cloud', poster: '/posters/quality-color-consistency/labels/techproofpoint-connect-quality-reports.jpg', src: '/videos/quality-color-consistency/labels/techproofpoint-connect-quality-reports.mp4' },
          { title: 'oneECG — Digitalizing Color Information for Labels', poster: '/posters/quality-color-consistency/labels/techproofpoint-oneecg-digitizing-color.jpg', src: '/videos/quality-color-consistency/labels/techproofpoint-oneecg-digitizing-color.mp4' },
          { title: 'Animation — BOBST oneECG for Labels', poster: '/posters/quality-color-consistency/labels/animation-oneecg-labels.jpg', src: '/videos/quality-color-consistency/labels/animation-oneecg-labels.mp4' },
          { title: 'Label Specialties — oneECG in Action', poster: '/posters/quality-color-consistency/labels/label-specialties-oneecg.jpg', src: '/videos/quality-color-consistency/labels/label-specialties-oneecg.mp4' },
          { title: 'ACCUCHECK B1 — Introduction', poster: '/posters/quality-color-consistency/labels/accucheck-b1-introduction.jpg', src: '/videos/quality-color-consistency/labels/accucheck-b1-introduction.mp4' },
          { title: 'ACCUCHECK B2 — Inspection', poster: '/posters/quality-color-consistency/labels/accucheck-b2-inspection.jpg', src: '/videos/quality-color-consistency/labels/accucheck-b2-inspection.mp4' },
          { title: 'ACCUCHECK B3 — Registration', poster: '/posters/quality-color-consistency/labels/accucheck-b3-registration.jpg', src: '/videos/quality-color-consistency/labels/accucheck-b3-registration.mp4' },
          { title: 'ACCUCHECK B4 — Colorimetry', poster: '/posters/quality-color-consistency/labels/accucheck-b4-colorimetry.jpg', src: '/videos/quality-color-consistency/labels/accucheck-b4-colorimetry.mp4' },
          { title: 'ACCUCHECK B5 — Barcodes & QR Codes', poster: '/posters/quality-color-consistency/labels/accucheck-b5-barcodes-qr-codes.jpg', src: '/videos/quality-color-consistency/labels/accucheck-b5-barcodes-qr-codes.mp4' },
          { title: 'ACCUCHECK B6 — Intro to Calibration', poster: '/posters/quality-color-consistency/labels/accucheck-b6-intro-calibration.jpg', src: '/videos/quality-color-consistency/labels/accucheck-b6-intro-calibration.mp4' },
          { title: 'ACCUCHECK B7 — Calibration, Angle & Stitch', poster: '/posters/quality-color-consistency/labels/accucheck-b7-calibration-angle-stitch.jpg', src: '/videos/quality-color-consistency/labels/accucheck-b7-calibration-angle-stitch.mp4' },
          { title: 'ACCUCHECK B8 — Color to Color', poster: '/posters/quality-color-consistency/labels/accucheck-b8-color-to-color.jpg', src: '/videos/quality-color-consistency/labels/accucheck-b8-color-to-color.mp4' },
          { title: 'ACCUCHECK B9 — Color Uniformity', poster: '/posters/quality-color-consistency/labels/accucheck-b9-color-uniformity.jpg', src: '/videos/quality-color-consistency/labels/accucheck-b9-color-uniformity.mp4' },
          { title: 'ACCUCHECK B10 — Nozzle Compensation', poster: '/posters/quality-color-consistency/labels/accucheck-b10-nozzle-compensation.jpg', src: '/videos/quality-color-consistency/labels/accucheck-b10-nozzle-compensation.mp4' },
          { title: 'ACCUCHECK B11 — Recap', poster: '/posters/quality-color-consistency/labels/accucheck-b11-recap.jpg', src: '/videos/quality-color-consistency/labels/accucheck-b11-recap.mp4' },
          { title: 'ACCUCHECK — Full Edit', poster: '/posters/quality-color-consistency/labels/accucheck-full-edit.jpg', src: '/videos/quality-color-consistency/labels/accucheck-full-edit.mp4' },
          {
            title: 'Brook + Whittle Elevates Digital Productivity with the BOBST DIGITAL MASTER 340',
            provider: 'youtube',
            embedId: 'OG2HgO17sHY',
          },
        ],
      },
    },
  },
  'sustainability-innovation': {
    category: 'Sustainability & Application Innovation',
    headline: 'Drive Sustainability and Application Innovation',
    intro:
      'Explore technologies and industry partnerships that support new packaging structures, reduce production waste and energy use, and expand opportunities across packaging applications.',
    markets: {
      'flexible-packaging': {
        blurb:
          'Develop recyclable, paper-based and lightweight structures using advanced coating, metallizing and barrier technologies.',
        headline: 'Advance Sustainable Packaging Applications',
        body:
          'BOBST barrier, coating and metallizing technologies support the development of recyclable, paper-based and lightweight structures created in partnership with industry experts. The oneBARRIER family — including PrimeCycle and FibreCycle — is built around mono-material and fibre-based structures designed for recyclability.',
        videos: [
          {
            title: 'oneBARRIER — Sustainable Barrier Solutions',
            poster: '/posters/sustainability-innovation/flexible-packaging/onebarrier-proof-points.jpg',
            src: '/videos/sustainability-innovation/flexible-packaging/onebarrier-proof-points.mp4',
          },
        ],
        slides: [
          {
            title: 'oneBARRIER & Partners — Innovating Together',
            image: '/images/sustainability-innovation/flexible-packaging/onebarrier-partner-discussion.jpg',
          },
        ],
      },
      'folding-carton': {
        blurb:
          'Use connected production insights and optimized tooling to reduce waste, improve energy efficiency and maximize material performance.',
        headline: 'Produce More with Fewer Resources',
        body:
          'Energy monitoring, production insights and optimized tooling help folding carton converters reduce waste, make better operating decisions and improve resource efficiency. The Pack Energy Efficiency module reduces total machine energy consumption by up to 20% on folding carton applications.',
        videos: [],
        slides: [
          {
            title: 'MASTERCUT 106 PER — Pack Energy Efficiency',
            image: '/images/sustainability-innovation/folding-carton/mastercut-106-per.jpg',
          },
          {
            title: 'EXPERTCUT 106 with POWER REGISTER',
            image: '/images/sustainability-innovation/folding-carton/expertcut-power-register.jpg',
          },
          {
            title: 'BOBST Campus — Engineering Sustainable Production',
            image: '/images/sustainability-innovation/folding-carton/bobst-campus.jpg',
          },
        ],
      },
      'labels': {
        blurb:
          'Explore digitally produced multilayer labels, expanded color capabilities and new applications designed for greater production efficiency.',
        headline: 'Expand Label Application Possibilities',
        body:
          'Digital, flexo and All-in-One technologies support innovative label applications while helping converters optimize materials, reduce waste and respond to evolving market requirements. BOBST FLEXJET brings fully digital multilayer label production to a single pass, cutting start-up time by up to 60% and waste by up to 30% while doubling output.',
        videos: [
          {
            title: 'BOBST FLEXJET — Simplifying Multilayer Labels Production',
            poster: '/posters/sustainability-innovation/labels/flexjet-multilayer-labels.jpg',
            src: '/videos/sustainability-innovation/labels/flexjet-multilayer-labels.mp4',
          },
          {
            title: 'Expand Your Label Production',
            poster: '/posters/sustainability-innovation/labels/expand-label-production.jpg',
            src: '/videos/sustainability-innovation/labels/expand-label-production.mp4',
          },
        ],
        slides: [
          {
            title: 'Multilayer Extended Content Label',
            image: '/images/sustainability-innovation/labels/multilayer-extended-content-label.jpg',
          },
        ],
      },
    },
  },
  'lifecycle-performance-services': {
    category: 'Lifecycle Performance & Services',
    headline: 'Power Continuous Performance Improvement',
    intro:
      'Maximize the long-term value of your equipment through expert service, maintenance, upgrades, tooling support and solutions tailored to evolving production needs.',
    markets: {
      'flexible-packaging': {
        blurb:
          'Maintain performance and adapt to changing requirements through preventive maintenance, technical support, upgrades and retrofits.',
        headline: 'Sustain Flexible Packaging Performance',
        body:
          'BOBST service, maintenance, remote support and tailored upgrades help protect equipment availability and keep production performing throughout the machine lifecycle. Customers running BOBST Connect and Maintenance Plus have reported machine availability as high as 98.5%.',
        videos: [],
        slides: [
          {
            title: 'On the Shop Floor with BOBST Connect',
            image: '/images/lifecycle-performance-services/flexible-packaging/production-line-close-up.jpg',
          },
          {
            title: 'Reviewing Real-Time Performance Data',
            image: '/images/lifecycle-performance-services/flexible-packaging/bobst-connect-dashboard-review.jpg',
          },
          {
            title: 'BOBST Connect — Anywhere, Anytime',
            image: '/images/lifecycle-performance-services/flexible-packaging/bobst-connect-laptop.jpg',
          },
        ],
      },
      'folding-carton': {
        blurb:
          'Improve equipment and tooling performance with certified die makers, high-performance tooling, TooLink and expert lifecycle support.',
        headline: 'Optimize Equipment and Tooling Performance',
        body:
          'Certified processes, high-performance tooling, TooLink and expert technical support help improve repeatability, reduce downtime and extend the value of your equipment. BOBST Remanufacturing can increase machine productivity by up to 15%.',
        videos: [
          {
            title: 'See How Midlands Packaging Is Advancing Quality and Efficiency with BOBST',
            provider: 'vimeo',
            embedId: '1089981976',
            embedHash: '622dc8d7c6',
            poster: 'https://i.vimeocdn.com/video/2022505467-284fd9cab0c714e0e7a2f2c44ede12504a85e513fee7a094b46bfabc8020b0ce-d_1280x720?region=us',
          },
        ],
        slides: [
          {
            title: 'Reviewing Real-Time Performance Data',
            image: '/images/lifecycle-performance-services/folding-carton/bobst-connect-performance-review.jpg',
          },
          {
            title: 'A Long-Term View of Your Production Floor',
            image: '/images/lifecycle-performance-services/folding-carton/plant-overview.jpg',
          },
        ],
      },
      'labels': {
        blurb:
          'Protect your investment with modular upgrades, tailored retrofits and service solutions that evolve with your production requirements.',
        headline: 'Keep Your Label Operation Moving Forward',
        body:
          'Modular upgrades, retrofits and lifecycle services help label converters respond to changing market requirements and introduce new capabilities without replacing their entire production platform. BOBST Services can cut downtime by up to 60% and resolve up to 80% of issues remotely through Helpline and BOBST Connect.',
        videos: [
          {
            title: 'See How Midlands Packaging Is Advancing Quality and Efficiency with BOBST',
            provider: 'vimeo',
            embedId: '1089981976',
            embedHash: '622dc8d7c6',
            poster: 'https://i.vimeocdn.com/video/2022505467-284fd9cab0c714e0e7a2f2c44ede12504a85e513fee7a094b46bfabc8020b0ce-d_1280x720?region=us',
          },
          {
            title: 'BOBST Services — Connected to Power Your Performance',
            poster: '/posters/lifecycle-performance-services/labels/service-performance-overview.jpg',
            src: '/videos/lifecycle-performance-services/labels/service-performance-overview.mp4',
          },
        ],
        slides: [
          {
            title: 'BOBST DIGITAL MASTER 340 — Upgradable by Design',
            image: '/images/lifecycle-performance-services/labels/digital-master-340.jpg',
          },
          {
            title: 'Expert Field Service, On Site',
            image: '/images/lifecycle-performance-services/labels/field-service-technician.jpg',
          },
          {
            title: 'From Beverage to Personal Care — Every Label Application',
            image: '/images/lifecycle-performance-services/labels/label-application-range.jpg',
          },
        ],
      },
    },
  },
  'digital-solutions': {
    category: 'Digital Solutions',
    headline: 'Connected to Power Your Performance',
    intro:
      'Discover how BOBST Digital Solutions connect machines, tools, processes and people—turning production data into actionable insights that support better decisions and continuous improvement.',
    markets: {
      'flexible-packaging': {
        blurb:
          'Connect production data, job recipes, energy insights and remote support to improve visibility and performance across flexible packaging operations.',
        headline: 'Connect Flexible Packaging Production',
        body:
          'Explore how BOBST Connect transforms real-time machine data into actionable insights, helping optimize energy consumption, reduce downtime and improve color consistency across operations.',
        liveDemo: 'Live Demo at 10am & 3pm',
        videos: [
          { title: 'BOBST Connect — Recorded Demo', provider: 'vimeo', embedId: '949042871' },
        ],
      },
      'folding-carton': {
        blurb:
          'Use connected machine and tooling information to improve makeready, monitor performance and make faster, data-driven decisions.',
        headline: 'Connect Machines, Tools and Production Data',
        body:
          'See how BOBST Connect and TooLink improve visibility across equipment, jobs and tooling lifecycles — helping converters simplify makeready, reduce waste and maximize machine performance.',
        liveDemo: 'Live Demo at 10am & 3pm',
        videos: [
          { title: 'BOBST Connect — Overview and Success Story', provider: 'vimeo', embedId: '949042871' },
        ],
      },
      'labels': {
        blurb:
          'Connect digital, flexo and All-in-One production to improve job management, process visibility and operational responsiveness.',
        headline: 'Create a More Connected Label Workflow',
        body:
          'Discover how BOBST Connect transforms real-time machine data into actionable linear meter usage insights — helping converters simplify makeready, reduce downtime and optimize machine profitability.',
        liveDemo: 'Live Demo at 10am & 3pm',
        videos: [
          { title: 'BOBST Connect — Overview and Success Story', provider: 'vimeo', embedId: '949042871' },
        ],
      },
    },
  },
};

// ============================================================
// Router — 3-tier hash routes:
//   #/                              -> hub (5 stations)
//   #/s/<station>                   -> station home (its markets)
//   #/s/<station>/<market>          -> market detail
// ============================================================
function getRouteSegments() {
  const hash = window.location.hash.slice(1);
  return hash.split('/').filter(Boolean);
}

function navigate(path) {
  window.location.hash = path;
}

// ============================================================
// Nav
// ============================================================
function renderNav(backHref, backLabel) {
  return `
    <nav class="nav" id="main-nav">
      <a href="#/" class="nav__logo-link" id="nav-logo-link" aria-label="Back to home">
        <img src="/logo.svg" alt="BOBST" class="nav__logo" id="nav-logo" />
      </a>
      ${
        backHref
          ? `<a href="${backHref}" class="nav__back" id="nav-back">
              <span class="nav__back-arrow">${icons.arrowLeft}</span>
              ${backLabel}
            </a>`
          : '<div></div>'
      }
    </nav>
  `;
}

// ============================================================
// Shared: Card grid section (used by hub + station home)
// ============================================================
function renderCardsSection({ label, title, cards }) {
  const gridModifier = cards.length === 5 ? ' sections__grid--5' : cards.length === 4 ? ' sections__grid--4' : '';

  const cardsHtml = cards
    .map(
      (card, i) => `
    <article class="card" data-href="${card.href}">
      <div class="card__image-wrapper">
        ${
          card.image
            ? `<img class="card__image" src="${card.image}" alt="${card.title}" loading="lazy" />`
            : `<div class="card__image-placeholder">
                <div class="card__image-placeholder-icon">${icons.image}</div>
              </div>`
        }
        <div class="card__image-overlay"></div>
      </div>
      <div class="card__body">
        <div class="card__number">${String(i + 1).padStart(2, '0')}</div>
        <h3 class="card__title">${card.title}</h3>
        <p class="card__description">${card.description}</p>
        <span class="card__cta">
          Explore
          <span class="card__cta-arrow">${icons.arrowRight}</span>
        </span>
      </div>
    </article>
  `
    )
    .join('');

  return `
    <section class="sections" id="sections">
      <div class="sections__inner">
        <div class="sections__header">
          <p class="sections__label">${label}</p>
          <h2 class="sections__title">${title}</h2>
        </div>
        <div class="sections__grid${gridModifier}" id="sections-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}

function renderFooter() {
  return `
    <footer class="footer" id="footer">
      <img src="/logo.svg" alt="BOBST" class="footer__logo" />
      <p class="footer__text">© ${new Date().getFullYear()} BOBST. All rights reserved.</p>
    </footer>
  `;
}

// ============================================================
// Hub — landing page listing all 5 stations
// ============================================================
function renderHub() {
  const cards = stationOrder.map((slug) => {
    const s = stations[slug];
    return {
      href: `#/s/${slug}`,
      title: s.category,
      description: s.intro,
    };
  });

  return `
    ${renderNav(null, null)}

    <div class="page" id="hub-page">
      <div class="home-viewport">
        <section class="hero" id="hero-section">
          <div class="hero__content">
            <div class="hero__eyebrow">BOBST Packaging Solutions</div>
            <h1 class="hero__title">
              <b>Reduce Complexity,</b><br>
              Improve Performance
            </h1>
            <p class="hero__subtitle">
              Choose a station below to explore BOBST solutions across Flexible Packaging, Folding Carton and Labels.
            </p>
          </div>
        </section>

        ${renderCardsSection({ label: 'Our Expertise', title: 'Explore by Station', cards })}

        ${renderFooter()}
      </div>
    </div>
  `;
}

// ============================================================
// Station Home — lists the markets available within a station
// ============================================================
function renderStationHome(stationSlug) {
  const station = stations[stationSlug];
  if (!station) return renderHub();

  const marketSlugs = Object.keys(station.markets);
  const cards = marketSlugs.map((marketSlug) => {
    const market = station.markets[marketSlug];
    return {
      href: `#/s/${stationSlug}/${marketSlug}`,
      title: MARKET_TITLES[marketSlug] || marketSlug,
      description: market.blurb,
      image: MARKET_IMAGES[marketSlug],
    };
  });

  return `
    ${renderNav('#/', 'Back to Overview')}

    <div class="page" id="station-home-page">
      <div class="home-viewport">
        <section class="hero" id="hero-section">
          <div class="hero__content">
            <div class="hero__eyebrow">${station.category}</div>
            <h1 class="hero__title"><b>${station.headline}</b></h1>
            <p class="hero__subtitle">${station.intro}</p>
          </div>
        </section>

        ${renderCardsSection({ label: 'Markets', title: 'Explore by Market', cards })}

        ${renderFooter()}
      </div>
    </div>
  `;
}

// ============================================================
// Video Carousel markup (videos only — 3D coverflow, click to play fullscreen)
// ============================================================
function renderVideoCarousel(videos) {
  if (!videos || !videos.length) return '';
  return `
    <div class="video-carousel video-carousel--hero">
      <button class="video-carousel__arrow video-carousel__arrow--prev" aria-label="Previous video">${icons.arrowLeft}</button>
      <div class="video-carousel__stage">
        ${videos
          .map((v, i) => {
            const embedUrl = getVideoEmbedUrl(v);
            const srcAttr = embedUrl ? `data-embed-url="${embedUrl}"` : `data-src="${v.src}"`;
            return `
          <div class="video-carousel__item" data-index="${i}" ${srcAttr}>
            <img class="video-carousel__poster" src="${getVideoPoster(v)}" alt="${v.title}" loading="lazy" />
            <div class="video-carousel__scrim"></div>
            <div class="video-carousel__play">${icons.playCircle}</div>
            <div class="video-carousel__title">${v.title}</div>
          </div>
        `;
          })
          .join('')}
      </div>
      <button class="video-carousel__arrow video-carousel__arrow--next" aria-label="Next video">${icons.arrowRight}</button>
    </div>
  `;
}

// ============================================================
// Slide Deck markup (PowerPoint-derived images — its own slider,
// separate from the video carousel; click to view fullscreen)
// ============================================================
function renderSlideDeck(slides) {
  if (!slides || !slides.length) return '';
  return `
    <section class="slide-deck" id="slide-deck">
      <div class="slide-deck__inner">
        <p class="slide-deck__label">Featured Content</p>
        <div class="slide-deck__viewer">
          <button class="slide-deck__arrow slide-deck__arrow--prev" aria-label="Previous slide">${icons.arrowLeft}</button>
          <div class="slide-deck__stage">
            ${slides
              .map(
                (s, i) => `
              <div class="slide-deck__slide${i === 0 ? ' slide-deck__slide--active' : ''}" data-index="${i}" data-title="${s.title}">
                <img class="slide-deck__image" src="${s.image}" alt="${s.title}" loading="lazy" />
                <div class="slide-deck__zoom-hint">${icons.zoomIn}</div>
              </div>
            `
              )
              .join('')}
          </div>
          <button class="slide-deck__arrow slide-deck__arrow--next" aria-label="Next slide">${icons.arrowRight}</button>
        </div>
        <div class="slide-deck__caption" id="slide-deck-caption">${slides[0].title}</div>
        <div class="slide-deck__dots">
          ${slides
            .map(
              (_, i) => `<button class="slide-deck__dot${i === 0 ? ' slide-deck__dot--active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// Market Detail — hero (+ optional video carousel) + optional
// slide deck + footer. Pages with extra slide-deck content are
// allowed to grow taller / scroll rather than being forced onto
// one screen.
// ============================================================
function renderMarketDetail(stationSlug, marketSlug) {
  const station = stations[stationSlug];
  const market = station && station.markets[marketSlug];
  if (!station || !market) return renderHub();

  return `
    ${renderNav(`#/s/${stationSlug}`, `Back to ${station.category}`)}

    <div class="page" id="market-detail-page">
      <div class="detail detail--minimal">
        <div class="detail__hero detail__hero--minimal">
          <div class="detail__hero-content">
            <div class="detail__category">${station.category} — ${MARKET_TITLES[marketSlug] || marketSlug}</div>
            <h1 class="detail__title"><b>${market.headline}</b></h1>
            <p class="detail__intro">${market.body}</p>
            ${market.liveDemo ? `<div class="detail__live-demo">${icons.clock}<span>${market.liveDemo}</span></div>` : ''}
            ${renderVideoCarousel(market.videos)}
          </div>
        </div>

        ${renderSlideDeck(market.slides)}

        ${renderFooter()}
      </div>
    </div>
  `;
}

// ============================================================
// App Controller
// ============================================================
const app = document.getElementById('app');

function renderRoute() {
  const segments = getRouteSegments();

  let html;
  if (segments.length === 0) {
    html = renderHub();
  } else if (segments[0] === 's' && segments.length === 2) {
    html = renderStationHome(segments[1]);
  } else if (segments[0] === 's' && segments.length >= 3) {
    html = renderMarketDetail(segments[1], segments[2]);
  } else {
    html = renderHub();
  }

  app.innerHTML = html;

  // Activate page animation
  requestAnimationFrame(() => {
    const page = app.querySelector('.page');
    if (page) {
      requestAnimationFrame(() => {
        page.classList.add('page--active');
      });
    }
  });

  // Scroll to top
  window.scrollTo(0, 0);

  // Init page-specific behaviors
  initCardClicks();
  initScrollEffects();
  initRevealObserver();
  initVideoCarousels();
  initSlideDecks();
}

// ============================================================
// Card Click Navigation
// ============================================================
function initCardClicks() {
  const cards = document.querySelectorAll('.card[data-href]');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      navigate(card.dataset.href.replace(/^#/, ''));
    });

    // Keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigate(card.dataset.href.replace(/^#/, ''));
      }
    });
  });
}

// ============================================================
// Scroll Effects (nav background, card reveals)
// ============================================================
function initScrollEffects() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Card stagger reveal
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card--visible');
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.card').forEach((card) => {
    cardObserver.observe(card);
  });
}

// ============================================================
// Scroll Reveal Observer
// ============================================================
function initRevealObserver() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });
}

// ============================================================
// Video Carousel (3D circular, arrows + touch swipe)
// ============================================================
function initVideoCarousels() {
  document.querySelectorAll('.video-carousel').forEach((carousel) => {
    const stage = carousel.querySelector('.video-carousel__stage');
    const items = Array.from(carousel.querySelectorAll('.video-carousel__item'));
    const prevBtn = carousel.querySelector('.video-carousel__arrow--prev');
    const nextBtn = carousel.querySelector('.video-carousel__arrow--next');
    const count = items.length;
    if (!count) return;

    let active = 0;
    // Scale side-item offset/depth relative to the actual card size so the
    // 3D effect looks proportional whether it's the compact or hero carousel.
    const itemWidth = items[0]?.getBoundingClientRect().width || 320;
    const sideOffsetX = itemWidth * 0.72;
    const sideTranslateZ = -itemWidth * 0.44;

    function render() {
      items.forEach((item, i) => {
        let offset = i - active;
        if (offset > count / 2) offset -= count;
        if (offset < -count / 2) offset += count;

        const abs = Math.abs(offset);
        const translateX = offset * sideOffsetX;
        const translateZ = abs === 0 ? 0 : sideTranslateZ;
        const rotateY = offset * -38;
        const scale = abs === 0 ? 1 : 0.78;
        const opacity = abs <= 1 ? (abs === 0 ? 1 : 0.55) : 0;

        item.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        item.style.opacity = opacity;
        item.style.zIndex = String(10 - abs);
        item.style.pointerEvents = abs > 1 ? 'none' : 'auto';
        item.classList.toggle('video-carousel__item--active', offset === 0);
      });
    }

    function goTo(index) {
      active = ((index % count) + count) % count;
      render();
    }

    prevBtn?.addEventListener('click', () => goTo(active - 1));
    nextBtn?.addEventListener('click', () => goTo(active + 1));

    items.forEach((item, i) => {
      item.addEventListener('click', () => {
        if (i === active) {
          const title = item.querySelector('.video-carousel__title')?.textContent || '';
          if (item.dataset.embedUrl) {
            openFullscreenVideo(item.dataset.embedUrl, title, true);
          } else {
            openFullscreenVideo(item.dataset.src, title, false);
          }
        } else {
          goTo(i);
        }
      });
    });

    // Touch swipe (left/right like a phone)
    let touchStartX = null;
    stage.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );
    stage.addEventListener(
      'touchend',
      (e) => {
        if (touchStartX === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(deltaX) > 40) {
          goTo(active + (deltaX < 0 ? 1 : -1));
        }
        touchStartX = null;
      },
      { passive: true }
    );

    render();
  });
}

// ============================================================
// Slide Deck (flat crossfade slider for PowerPoint-derived images;
// arrows, dots, and touch swipe — separate from the video carousel)
// ============================================================
function initSlideDecks() {
  document.querySelectorAll('.slide-deck').forEach((deck) => {
    const stage = deck.querySelector('.slide-deck__stage');
    const slides = Array.from(deck.querySelectorAll('.slide-deck__slide'));
    const dots = Array.from(deck.querySelectorAll('.slide-deck__dot'));
    const caption = deck.querySelector('.slide-deck__caption');
    const prevBtn = deck.querySelector('.slide-deck__arrow--prev');
    const nextBtn = deck.querySelector('.slide-deck__arrow--next');
    const count = slides.length;
    if (!count) return;

    let active = 0;

    function render() {
      slides.forEach((s, i) => s.classList.toggle('slide-deck__slide--active', i === active));
      dots.forEach((d, i) => d.classList.toggle('slide-deck__dot--active', i === active));
      if (caption) caption.textContent = slides[active].dataset.title || '';
    }

    function goTo(index) {
      active = ((index % count) + count) % count;
      render();
    }

    prevBtn?.addEventListener('click', () => goTo(active - 1));
    nextBtn?.addEventListener('click', () => goTo(active + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    slides.forEach((slide, i) => {
      slide.addEventListener('click', () => {
        if (i !== active) {
          goTo(i);
          return;
        }
        const img = slide.querySelector('.slide-deck__image');
        if (img) openFullscreenImage(img.src, slide.dataset.title || '');
      });
    });

    // Touch swipe (left/right like a phone)
    let touchStartX = null;
    stage?.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );
    stage?.addEventListener(
      'touchend',
      (e) => {
        if (touchStartX === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(deltaX) > 40) {
          goTo(active + (deltaX < 0 ? 1 : -1));
        }
        touchStartX = null;
      },
      { passive: true }
    );

    render();
  });
}

// ============================================================
// Fullscreen Video Overlay
// ============================================================
function closeFullscreenVideo() {
  const existing = document.getElementById('video-overlay');
  if (existing) existing.remove();
  document.body.style.overflow = '';
}

function openFullscreenVideo(src, title, isEmbed = false) {
  closeFullscreenVideo();

  const overlay = document.createElement('div');
  overlay.className = 'video-overlay';
  overlay.id = 'video-overlay';
  overlay.innerHTML = `
    <button class="video-overlay__close" aria-label="Close video">${icons.close}</button>
    ${
      isEmbed
        ? `<iframe class="video-overlay__video video-overlay__video--embed" src="${src}" title="${title}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
        : `<video class="video-overlay__video" src="${src}" title="${title}" controls autoplay playsinline></video>`
    }
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const video = overlay.querySelector('video');

  function handleKeydown(e) {
    if (e.key === 'Escape') close();
  }

  function close() {
    video?.pause();
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    document.removeEventListener('keydown', handleKeydown);
    closeFullscreenVideo();
  }

  overlay.querySelector('.video-overlay__close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', handleKeydown);

  // Best-effort true fullscreen — this runs inside a click handler, so it's
  // a valid user gesture for the Fullscreen API.
  overlay.requestFullscreen?.().catch(() => {});
}

// ============================================================
// Fullscreen Image Overlay (for carousel items with no video source)
// ============================================================
function openFullscreenImage(src, title) {
  closeFullscreenVideo();

  const overlay = document.createElement('div');
  overlay.className = 'video-overlay video-overlay--image';
  overlay.id = 'video-overlay';
  overlay.innerHTML = `
    <button class="video-overlay__close" aria-label="Close image">${icons.close}</button>
    <img class="video-overlay__image" src="${src}" alt="${title}" />
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  function handleKeydown(e) {
    if (e.key === 'Escape') close();
  }

  function close() {
    document.removeEventListener('keydown', handleKeydown);
    closeFullscreenVideo();
  }

  overlay.querySelector('.video-overlay__close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', handleKeydown);
}

// ============================================================
// Init
// ============================================================
window.addEventListener('hashchange', renderRoute);
renderRoute();
