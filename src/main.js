import './style.css';

// ============================================================
// SVG Icons (inline for zero-dependency)
// ============================================================
const icons = {
  arrowLeft: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10H5"/><path d="M10 5L5 10L10 15"/></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10"/><path d="M9 4l4 4-4 4"/></svg>`,
  image: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
  print: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
  layers: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  box: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  zap: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>`,
  shield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  globe: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>`,
  target: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  settings: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  eye: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  tag: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  cpu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  leaf: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"/></svg>`,
};

// ============================================================
// Content Data (Placeholder)
// ============================================================
const sectionData = {
  'flexible-packaging': {
    category: 'Flexible Packaging',
    title: 'End-to-End Flexible Packaging Solutions',
    intro: 'Placeholder text for flexible packaging introduction. Describe the complete range of BOBST solutions for flexible packaging converters.',
    heroPlaceholder: 'Flexible Packaging Hero Image — 1920×600',
    features: [
      {
        icon: 'print',
        title: 'CI Flexo Printing',
        text: 'Placeholder description for CI Flexo printing solutions. Detail the EXPERT CI and related press technologies.',
      },
      {
        icon: 'layers',
        title: 'Lamination & Coating',
        text: 'Placeholder description for laminating solutions. Detail the CL series and multi-layer capabilities.',
      },
      {
        icon: 'leaf',
        title: 'Sustainable Solutions',
        text: 'Placeholder description for oneBARRIER and sustainable packaging initiatives. Detail recycle-ready structures.',
      },
      {
        icon: 'cpu',
        title: 'Automation & Digital',
        text: 'Placeholder description for smartGPS and digital workflow automation. Detail waste reduction capabilities.',
      },
    ],
    stats: [
      { value: '—', label: 'Stat Placeholder' },
      { value: '—', label: 'Stat Placeholder' },
      { value: '—', label: 'Stat Placeholder' },
      { value: '—', label: 'Stat Placeholder' },
    ],
    applications: [
      'Food & Beverage',
      'Snacks & Confectionery',
      'Pet Food',
      'Household & Laundry',
      'Frozen & Chilled',
      'Dairy',
      'Decoration',
    ],
    detailSections: [
      {
        eyebrow: 'Overview',
        title: 'A Complete Ecosystem',
        text: 'Placeholder text for the overview section. Describe BOBST\'s integrated approach to flexible packaging — from printing and laminating to quality control and sustainable structures. This section should highlight the value proposition.',
        imagePlaceholder: 'Overview Image — 1200×400',
      },
      {
        eyebrow: 'Technology',
        title: 'Precision at Every Stage',
        text: 'Placeholder text for the technology section. Detail the specific equipment, control systems, and digital solutions that set BOBST apart in the flexible packaging space.',
        imagePlaceholder: 'Technology Image — 1200×400',
      },
    ],
  },
  'folding-carton': {
    category: 'Folding Carton',
    title: 'Complete Folding Carton Production Line',
    intro: 'Placeholder text for folding carton introduction. Describe the full BOBST production chain from printing to die-cutting, embellishment, and folder-gluing.',
    heroPlaceholder: 'Folding Carton Hero Image — 1920×600',
    features: [
      {
        icon: 'box',
        title: 'Die-Cutting',
        text: 'Placeholder description for AUTOPLATEN® die-cutting. Detail EXPERTCUT, NOVACUT, and VISIONCUT platforms.',
      },
      {
        icon: 'zap',
        title: 'Hot Foil Stamping',
        text: 'Placeholder description for premium embellishment and hot foil stamping capabilities.',
      },
      {
        icon: 'settings',
        title: 'Folder-Gluers',
        text: 'Placeholder description for EXPERTFOLD, VISIONFOLD, and NOVAFOLD series folder-gluers.',
      },
      {
        icon: 'eye',
        title: 'Quality & Connectivity',
        text: 'Placeholder description for BOBST Connect platform and TooLink tooling integration.',
      },
    ],
    stats: [
      { value: '—', label: 'Stat Placeholder' },
      { value: '—', label: 'Stat Placeholder' },
      { value: '—', label: 'Stat Placeholder' },
      { value: '—', label: 'Stat Placeholder' },
    ],
    applications: [
      'Food & Beverage',
      'Healthcare & Pharma',
      'Personal Care & Cosmetics',
      'Household',
      'Toys & Games',
      'Electronics',
      'Wine & Spirits',
    ],
    detailSections: [
      {
        eyebrow: 'Overview',
        title: 'From Sheet to Finished Package',
        text: 'Placeholder text for the overview section. Describe how BOBST covers the entire folding carton production workflow — from printing through die-cutting to folder-gluing.',
        imagePlaceholder: 'Overview Image — 1200×400',
      },
      {
        eyebrow: 'Technology',
        title: 'Precision Converting & Finishing',
        text: 'Placeholder text for the technology section. Highlight the AUTOPLATEN® portfolio, hot foil solutions, and modular folder-gluer configurations.',
        imagePlaceholder: 'Technology Image — 1200×400',
      },
    ],
  },
  'labels': {
    category: 'Labels',
    title: 'Advanced Label Printing & Converting',
    intro: 'Placeholder text for labels introduction. Describe BOBST\'s portfolio spanning digital inkjet, flexography, and All-in-One hybrid systems for modern label production.',
    heroPlaceholder: 'Labels Hero Image — 1920×600',
    features: [
      {
        icon: 'target',
        title: 'All-in-One Hybrid',
        text: 'Placeholder description for MASTER DM5 hybrid presses combining flexo and inkjet in a single workflow.',
      },
      {
        icon: 'print',
        title: 'Digital Inkjet',
        text: 'Placeholder description for Mouvent LB702-UV and digital inkjet technology for short-run label production.',
      },
      {
        icon: 'layers',
        title: 'Flexo Printing',
        text: 'Placeholder description for VISION M1, MASTER M5, and MASTER M6 flexographic press lines.',
      },
      {
        icon: 'globe',
        title: 'Color Consistency',
        text: 'Placeholder description for oneECG extended color gamut technology ensuring color repeatability.',
      },
    ],
    stats: [
      { value: '—', label: 'Stat Placeholder' },
      { value: '—', label: 'Stat Placeholder' },
      { value: '—', label: 'Stat Placeholder' },
      { value: '—', label: 'Stat Placeholder' },
    ],
    applications: [
      'Food & Beverage Labels',
      'Wine & Spirits',
      'Health & Beauty',
      'Pharmaceutical',
      'Home Care',
      'Variable Data',
      'Specialty & Shrink Sleeve',
    ],
    detailSections: [
      {
        eyebrow: 'Overview',
        title: 'One Workflow, Endless Possibilities',
        text: 'Placeholder text for the overview section. Describe how BOBST label solutions unify digital and conventional technologies into a single, automated production workflow.',
        imagePlaceholder: 'Overview Image — 1200×400',
      },
      {
        eyebrow: 'Technology',
        title: 'Digital Meets Conventional',
        text: 'Placeholder text for the technology section. Detail the FlexJet module, All-in-One architecture, and BOBST Connect platform integration.',
        imagePlaceholder: 'Technology Image — 1200×400',
      },
    ],
  },
};

// ============================================================
// Landing Cards Config
// ============================================================
const landingCards = [
  {
    id: 'flexible-packaging',
    number: '01',
    title: 'Flexible Packaging',
    description:
      'Placeholder description for flexible packaging solutions. Printing, laminating, coating, and sustainable barrier solutions.',
    imagePlaceholder: 'Flexible Packaging — 600×440',
  },
  {
    id: 'folding-carton',
    number: '02',
    title: 'Folding Carton',
    description:
      'Placeholder description for folding carton solutions. Die-cutting, embellishment, and folder-gluing systems.',
    imagePlaceholder: 'Folding Carton — 600×440',
  },
  {
    id: 'labels',
    number: '03',
    title: 'Labels',
    description:
      'Placeholder description for label printing and converting. Digital, flexo, and hybrid All-in-One solutions.',
    imagePlaceholder: 'Labels — 600×440',
  },
];

// ============================================================
// Router
// ============================================================
function getRoute() {
  const hash = window.location.hash.slice(1) || '/';
  return hash;
}

function navigate(path) {
  window.location.hash = path;
}

// ============================================================
// Render Functions
// ============================================================
function renderNav(showBack = false) {
  return `
    <nav class="nav" id="main-nav">
      <a href="#/" class="nav__logo-link" id="nav-logo-link" aria-label="Back to home">
        <img src="/logo.svg" alt="BOBST" class="nav__logo" id="nav-logo" />
      </a>
      ${
        showBack
          ? `<button class="nav__back" id="nav-back" onclick="window.location.hash='/'">
              <span class="nav__back-arrow">${icons.arrowLeft}</span>
              Back to Overview
            </button>`
          : '<div></div>'
      }
    </nav>
  `;
}

function renderLanding() {
  const cardsHtml = landingCards
    .map(
      (card) => `
    <article class="card" id="card-${card.id}" data-section="${card.id}">
      <div class="card__image-wrapper">
        <div class="card__image-placeholder">
          <div class="card__image-placeholder-icon">${icons.image}</div>
        </div>
        <div class="card__image-overlay"></div>
      </div>
      <div class="card__body">
        <div class="card__number">${card.number}</div>
        <h3 class="card__title">${card.title}</h3>
        <p class="card__description">${card.description}</p>
        <span class="card__cta">
          Explore Solutions
          <span class="card__cta-arrow">${icons.arrowRight}</span>
        </span>
      </div>
    </article>
  `
    )
    .join('');

  return `
    ${renderNav(false)}

    <div class="page" id="landing-page">
      <section class="hero" id="hero-section">
        <div class="hero__content">
          <div class="hero__eyebrow">BOBST Packaging Solutions</div>
          <h1 class="hero__title">
            <b>Reduce Complexity,</b><br>
            Improve Performance
          </h1>
          <p class="hero__subtitle">
            Placeholder text for hero subtitle. Describe the overarching value proposition of BOBST solutions for packaging converters.
          </p>
          <div class="hero__cta-hint">
            Explore our solutions below
            <span class="hero__scroll-indicator"></span>
          </div>
        </div>
      </section>

      <section class="sections" id="sections">
        <div class="sections__inner">
          <div class="sections__header">
            <p class="sections__label">Our Expertise</p>
            <h2 class="sections__title">Solutions by Market</h2>
          </div>
          <div class="sections__grid" id="sections-grid">
            ${cardsHtml}
          </div>
        </div>
      </section>

      <footer class="footer" id="footer">
        <img src="/logo.svg" alt="BOBST" class="footer__logo" />
        <p class="footer__text">© ${new Date().getFullYear()} BOBST. All rights reserved.</p>
      </footer>
    </div>
  `;
}

function renderDetail(sectionId) {
  const data = sectionData[sectionId];
  if (!data) return renderLanding();

  const featuresHtml = data.features
    .map(
      (f) => `
    <div class="feature-card reveal">
      <div class="feature-card__icon">${icons[f.icon] || icons.zap}</div>
      <h4 class="feature-card__title">${f.title}</h4>
      <p class="feature-card__text">${f.text}</p>
    </div>
  `
    )
    .join('');

  const statsHtml = data.stats
    .map(
      (s) => `
    <div class="stat reveal">
      <div class="stat__value">${s.value}</div>
      <div class="stat__label">${s.label}</div>
    </div>
  `
    )
    .join('');

  const tagsHtml = data.applications
    .map((a) => `<span class="tag">${a}</span>`)
    .join('');

  const detailSectionsHtml = data.detailSections
    .map(
      (ds, i) => `
    <section class="content-section">
      <div class="split${i % 2 === 1 ? ' split--reverse' : ''} reveal">
        <div>
          <div class="content-section__eyebrow">${ds.eyebrow}</div>
          <h3 class="content-section__title"><b>${ds.title}</b></h3>
          <p class="content-section__text">${ds.text}</p>
        </div>
        <div class="image-block image-block--medium">
          <div class="image-block__placeholder">
            <div class="image-block__placeholder-icon">${icons.image}</div>
            <span class="image-block__placeholder-text">${ds.imagePlaceholder}</span>
          </div>
        </div>
      </div>
    </section>
  `
    )
    .join('');

  return `
    ${renderNav(true)}

    <div class="page" id="detail-page">
      <div class="detail">
        <div class="detail__hero">
          <div class="detail__hero-bg">
            <span class="detail__hero-placeholder">${data.heroPlaceholder}</span>
          </div>
          <div class="detail__hero-content">
            <div class="detail__category">${data.category}</div>
            <h1 class="detail__title"><b>${data.title}</b></h1>
            <p class="detail__intro">${data.intro}</p>
          </div>
        </div>

        <!-- Key Features -->
        <section class="content-section">
          <div class="content-section__eyebrow">Key Solutions</div>
          <h2 class="content-section__title"><b>Core Capabilities</b></h2>
          <p class="content-section__text">
            Placeholder text for the capabilities overview. Describe what sets BOBST apart in this market segment.
          </p>
          <div class="feature-grid">
            ${featuresHtml}
          </div>
        </section>

        <!-- Full-width Image -->
        <section class="content-section">
          <div class="image-block image-block--wide reveal">
            <div class="image-block__placeholder">
              <div class="image-block__placeholder-icon">${icons.image}</div>
              <span class="image-block__placeholder-text">Full Width Image — 1200×360</span>
            </div>
          </div>
        </section>

        <!-- Stats -->
        <section class="content-section">
          <div class="content-section__eyebrow">By The Numbers</div>
          <h2 class="content-section__title"><b>Performance Metrics</b></h2>
          <div class="stats-row">
            ${statsHtml}
          </div>
        </section>

        <!-- Detail Sections (alternating layout) -->
        ${detailSectionsHtml}

        <!-- Applications -->
        <section class="content-section">
          <div class="content-section__eyebrow reveal">Applications</div>
          <h2 class="content-section__title reveal"><b>End-Use Sectors</b></h2>
          <p class="content-section__text reveal">
            Placeholder text for applications. Describe the key industry sectors and end-use applications served by this solution category.
          </p>
          <div class="tags reveal">
            ${tagsHtml}
          </div>
        </section>

        <footer class="footer" id="footer">
          <img src="/logo.svg" alt="BOBST" class="footer__logo" />
          <p class="footer__text">© ${new Date().getFullYear()} BOBST. All rights reserved.</p>
        </footer>
      </div>
    </div>
  `;
}

// ============================================================
// App Controller
// ============================================================
const app = document.getElementById('app');

function renderRoute() {
  const route = getRoute();

  // Determine what to render
  let html;
  if (route === '/' || route === '') {
    html = renderLanding();
  } else {
    const sectionId = route.replace('/', '');
    html = renderDetail(sectionId);
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
}

// ============================================================
// Card Click Navigation
// ============================================================
function initCardClicks() {
  const cards = document.querySelectorAll('.card[data-section]');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const sectionId = card.dataset.section;
      navigate(`/${sectionId}`);
    });

    // Keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigate(`/${card.dataset.section}`);
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
// Init
// ============================================================
window.addEventListener('hashchange', renderRoute);
renderRoute();
