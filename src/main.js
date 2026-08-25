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
};

// ============================================================
// Market Metadata (shared display names across stations)
// ============================================================
const MARKET_TITLES = {
  'flexible-packaging': 'Flexible Packaging',
  'folding-carton': 'Folding Carton',
  'labels': 'Labels',
  'corrugated': 'Corrugated',
};

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
          'Automated solutions such as smartGPS and connected end-to-end workflows help reduce setup time, operator dependency and process variation while improving overall press performance.',
        videos: [],
      },
      'folding-carton': {
        blurb:
          'Improve makeready and production performance through standardized tooling, integrated workflows and certified processes.',
        headline: 'Improve Folding Carton Productivity',
        body:
          'Standardized tooling, connected production processes and workforce training help converters reduce makeready time, improve repeatability and maintain performance across every job.',
        videos: [],
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
          'oneECG, Co-efficient color management and advanced process controls help flexible packaging converters achieve predictable color, faster setup and greater consistency across production runs.',
        videos: [],
      },
      'folding-carton': {
        blurb:
          'Improve registration, defect detection and makeready performance to produce consistent, high-quality cartons with less waste.',
        headline: 'Protect Quality Throughout Production',
        body:
          'Solutions including ACCUCHECK, ACCUPLATEN, POWER REGISTER and high-performance tooling help detect defects, improve registration and maintain consistent converting quality.',
        videos: [],
      },
      'labels': {
        blurb:
          'Deliver consistent color and reliable quality across digital, flexo and All-in-One label production.',
        headline: 'Maintain Color Across Every Label Job',
        body:
          'Integrated color management, inspection and process-control solutions help label converters maintain predictable results across changing substrates, run lengths and production technologies.',
        videos: [
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
          'BOBST barrier, coating and metallizing technologies support the development of recyclable, paper-based and lightweight structures created in partnership with industry experts.',
        videos: [],
      },
      'folding-carton': {
        blurb:
          'Use connected production insights and optimized tooling to reduce waste, improve energy efficiency and maximize material performance.',
        headline: 'Produce More with Fewer Resources',
        body:
          'Energy monitoring, production insights and optimized tooling help folding carton converters reduce waste, make better operating decisions and improve resource efficiency.',
        videos: [],
      },
      'labels': {
        blurb:
          'Explore digitally produced multilayer labels, expanded color capabilities and new applications designed for greater production efficiency.',
        headline: 'Expand Label Application Possibilities',
        body:
          'Digital, flexo and All-in-One technologies support innovative label applications while helping converters optimize materials, reduce waste and respond to evolving market requirements.',
        videos: [],
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
          'BOBST service, maintenance, remote support and tailored upgrades help protect equipment availability and keep production performing throughout the machine lifecycle.',
        videos: [],
      },
      'folding-carton': {
        blurb:
          'Improve equipment and tooling performance with certified die makers, high-performance tooling, TooLink and expert lifecycle support.',
        headline: 'Optimize Equipment and Tooling Performance',
        body:
          'Certified processes, high-performance tooling, TooLink and expert technical support help improve repeatability, reduce downtime and extend the value of your equipment.',
        videos: [],
      },
      'labels': {
        blurb:
          'Protect your investment with modular upgrades, tailored retrofits and service solutions that evolve with your production requirements.',
        headline: 'Keep Your Label Operation Moving Forward',
        body:
          'Modular upgrades, retrofits and lifecycle services help label converters respond to changing market requirements and introduce new capabilities without replacing their entire production platform.',
        videos: [],
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
          'Explore digital demonstrations covering real-time performance, recipe management, energy and waste insights, maintenance information and remote technical support.',
        videos: [],
      },
      'folding-carton': {
        blurb:
          'Use connected machine and tooling information to improve makeready, monitor performance and make faster, data-driven decisions.',
        headline: 'Connect Machines, Tools and Production Data',
        body:
          'See how BOBST Connect and TooLink improve visibility across equipment, jobs and tooling—helping converters simplify makeready and support more consistent production.',
        videos: [],
      },
      'labels': {
        blurb:
          'Connect digital, flexo and All-in-One production to improve job management, process visibility and operational responsiveness.',
        headline: 'Create a More Connected Label Workflow',
        body:
          'Explore how connected solutions support job management, production monitoring and performance analysis across digital, flexo and All-in-One label production.',
        videos: [],
      },
      'corrugated': {
        blurb:
          'Gain greater visibility into machine performance, production activity and service needs to support more efficient corrugated operations.',
        headline: 'Turn Corrugated Production Data into Action',
        body:
          'Discover digital solutions that provide greater visibility into equipment performance, production activity and service requirements, helping teams identify opportunities for continued improvement.',
        videos: [],
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
        <div class="card__image-placeholder">
          <div class="card__image-placeholder-icon">${icons.image}</div>
        </div>
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
              Choose a station below to explore BOBST solutions across Flexible Packaging, Folding Carton, Labels and Corrugated.
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
// Market Detail — minimal layout: hero (+ optional video carousel) + footer
// ============================================================
function renderMarketDetail(stationSlug, marketSlug) {
  const station = stations[stationSlug];
  const market = station && station.markets[marketSlug];
  if (!station || !market) return renderHub();

  const hasVideos = Boolean(market.videos && market.videos.length);

  const videoCarouselHeroHtml = hasVideos
    ? `
      <div class="video-carousel video-carousel--hero">
        <button class="video-carousel__arrow video-carousel__arrow--prev" aria-label="Previous video">${icons.arrowLeft}</button>
        <div class="video-carousel__stage">
          ${market.videos
            .map(
              (v, i) => `
            <div class="video-carousel__item" data-index="${i}" data-src="${v.src}">
              <img class="video-carousel__poster" src="${v.poster}" alt="${v.title}" loading="lazy" />
              <div class="video-carousel__scrim"></div>
              <div class="video-carousel__play">${icons.playCircle}</div>
              <div class="video-carousel__title">${v.title}</div>
            </div>
          `
            )
            .join('')}
        </div>
        <button class="video-carousel__arrow video-carousel__arrow--next" aria-label="Next video">${icons.arrowRight}</button>
      </div>
    `
    : '';

  return `
    ${renderNav(`#/s/${stationSlug}`, `Back to ${station.category}`)}

    <div class="page" id="market-detail-page">
      <div class="detail detail--minimal">
        <div class="detail__hero detail__hero--minimal">
          <div class="detail__hero-content">
            <div class="detail__category">${station.category} — ${MARKET_TITLES[marketSlug] || marketSlug}</div>
            <h1 class="detail__title"><b>${market.headline}</b></h1>
            <p class="detail__intro">${market.body}</p>
            ${videoCarouselHeroHtml}
          </div>
        </div>

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
          openFullscreenVideo(item.dataset.src, title);
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
// Fullscreen Video Overlay
// ============================================================
function closeFullscreenVideo() {
  const existing = document.getElementById('video-overlay');
  if (existing) existing.remove();
  document.body.style.overflow = '';
}

function openFullscreenVideo(src, title) {
  closeFullscreenVideo();

  const overlay = document.createElement('div');
  overlay.className = 'video-overlay';
  overlay.id = 'video-overlay';
  overlay.innerHTML = `
    <button class="video-overlay__close" aria-label="Close video">${icons.close}</button>
    <video class="video-overlay__video" src="${src}" title="${title}" controls autoplay playsinline></video>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const video = overlay.querySelector('video');

  function handleKeydown(e) {
    if (e.key === 'Escape') close();
  }

  function close() {
    video.pause();
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
// Init
// ============================================================
window.addEventListener('hashchange', renderRoute);
renderRoute();
