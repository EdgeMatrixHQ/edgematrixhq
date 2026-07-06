
// EdgeMatrix Shared Components
// Particle engine, nav, footer, CSS injection

const EM = {
  colors: {
    bg: '#0A0A0C',
    bgCard: '#0F0F12',
    bgCardHover: '#141418',
    border: 'rgba(166,30,46,0.18)',
    borderHover: 'rgba(166,30,46,0.5)',
    accent: '#A61E2E',
    accentBright: '#D42B40',
    accentGlow: 'rgba(166,30,46,0.15)',
    text: '#E8E8EC',
    muted: '#888899',
    dim: '#444455',
    green: '#1DB954',
    orange: '#E5820A',
  },

  injectGlobalStyles() {
    if (document.getElementById('em-global-styles')) return;
    const style = document.createElement('style');
    style.id = 'em-global-styles';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

      :root {
        --bg: #0A0A0C;
        --bg-card: #0F0F12;
        --bg-card-hover: #141418;
        --accent: #A61E2E;
        --accent-bright: #D42B40;
        --accent-glow: rgba(166,30,46,0.15);
        --accent-glow-strong: rgba(166,30,46,0.35);
        --border: rgba(166,30,46,0.18);
        --border-hover: rgba(166,30,46,0.5);
        --text: #E8E8EC;
        --muted: #888899;
        --dim: #444455;
        --green: #1DB954;
        --orange: #E5820A;
        --font-main: 'Space Grotesk', sans-serif;
        --font-mono: 'Space Mono', monospace;
      }

      html { scroll-behavior: smooth; }

      body {
        background: var(--bg);
        color: var(--text);
        font-family: var(--font-main);
        line-height: 1.6;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        padding-top: 38px;
      }

      /* Announcement bar */
      .em-announce {
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 1001;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: linear-gradient(90deg, var(--accent), var(--accent-bright));
        color: #fff;
        font-family: var(--font-mono);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-align: center;
        text-decoration: none;
        padding: 0 16px;
        transition: filter 0.2s;
      }
      .em-announce:hover { filter: brightness(1.08); }
      .em-announce .em-announce-arrow { font-weight: 700; }
      @media (max-width: 600px) {
        .em-announce { font-size: 10px; letter-spacing: 0.3px; }
      }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--bg); }
      ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

      /* Nav */
      .em-nav {
        position: fixed;
        top: 38px; left: 0; right: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 48px;
        height: 68px;
        background: rgba(10,10,12,0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border);
        transition: background 0.3s;
      }

      .em-nav.scrolled {
        background: rgba(10,10,12,0.97);
      }

      .em-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        flex-shrink: 0;
      }

      .em-logo-bar {
        width: 3px;
        height: 28px;
        background: linear-gradient(180deg, var(--accent-bright), var(--accent));
        border-radius: 2px;
        box-shadow: 0 0 10px var(--accent-bright);
      }

      .em-logo-text {
        display: flex;
        flex-direction: column;
        line-height: 1;
      }

      .em-logo-edge {
        font-family: var(--font-mono);
        font-size: 18px;
        font-weight: 700;
        color: var(--text);
        letter-spacing: 2px;
      }

      .em-logo-matrix {
        font-family: var(--font-mono);
        font-size: 9px;
        font-weight: 400;
        color: var(--accent);
        letter-spacing: 5px;
        margin-top: 2px;
      }

      .em-nav-links {
        display: flex;
        align-items: center;
        gap: 32px;
        list-style: none;
      }

      .em-nav-links a {
        color: var(--muted);
        text-decoration: none;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.5px;
        transition: color 0.2s;
        text-transform: uppercase;
      }

      .em-nav-links a:hover,
      .em-nav-links a.active { color: var(--text); }

      .em-nav-links a.active::after {
        content: '';
        display: block;
        height: 1px;
        background: var(--accent);
        margin-top: 2px;
      }

      .em-nav-cta {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: var(--accent);
        color: #fff !important;
        padding: 9px 20px;
        border-radius: 4px;
        font-size: 12px !important;
        font-weight: 700 !important;
        letter-spacing: 1px;
        text-transform: uppercase;
        text-decoration: none;
        transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        white-space: nowrap;
      }

      .em-nav-cta:hover {
        background: var(--accent-bright) !important;
        box-shadow: 0 0 20px var(--accent-glow-strong);
        transform: translateY(-1px);
      }

      .em-hamburger {
        display: none;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;
        padding: 4px;
      }

      .em-hamburger span {
        display: block;
        width: 22px;
        height: 2px;
        background: var(--text);
        border-radius: 2px;
        transition: all 0.3s;
      }

      .em-mobile-menu {
        display: none;
        position: fixed;
        top: 106px; left: 0; right: 0;
        background: rgba(10,10,12,0.98);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border);
        padding: 24px 48px;
        z-index: 999;
        flex-direction: column;
        gap: 16px;
      }

      .em-mobile-menu.open { display: flex; }

      .em-mobile-menu a {
        color: var(--muted);
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        padding: 8px 0;
        border-bottom: 1px solid var(--border);
        transition: color 0.2s;
      }

      .em-mobile-menu a:hover { color: var(--text); }

      /* Badge */
      .em-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(166,30,46,0.08);
        border: 1px solid var(--border-hover);
        color: var(--accent-bright);
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 2.5px;
        padding: 6px 14px;
        border-radius: 2px;
        text-transform: uppercase;
      }

      .em-badge::before {
        content: '';
        width: 5px;
        height: 5px;
        background: var(--accent-bright);
        border-radius: 50%;
        box-shadow: 0 0 6px var(--accent-bright);
        animation: pulse-dot 2s infinite;
      }

      @keyframes pulse-dot {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.7); }
      }

      /* Buttons */
      .em-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 14px 28px;
        border-radius: 4px;
        font-family: var(--font-main);
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-decoration: none;
        cursor: pointer;
        border: none;
        transition: all 0.2s;
        white-space: nowrap;
      }

      .em-btn-primary {
        background: var(--accent);
        color: #fff;
        box-shadow: 0 0 0 rgba(166,30,46,0);
      }

      .em-btn-primary:hover {
        background: var(--accent-bright);
        box-shadow: 0 0 30px var(--accent-glow-strong);
        transform: translateY(-2px);
      }

      .em-btn-ghost {
        background: transparent;
        color: var(--text);
        border: 1px solid var(--border-hover);
      }

      .em-btn-ghost:hover {
        border-color: var(--accent);
        color: var(--accent-bright);
        background: var(--accent-glow);
      }

      .em-btn-lg {
        padding: 18px 40px;
        font-size: 16px;
        letter-spacing: 1px;
      }

      /* Cards */
      .em-card {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 32px;
        transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
      }

      .em-card:hover {
        border-color: var(--border-hover);
        box-shadow: 0 8px 40px rgba(166,30,46,0.08);
        transform: translateY(-2px);
      }

      .em-card-accent {
        border-top: 2px solid var(--accent);
      }

      /* Section layout */
      .em-section {
        padding: 100px 0;
        position: relative;
      }

      .em-container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 48px;
      }

      .em-section-label {
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 3px;
        color: var(--accent);
        text-transform: uppercase;
        margin-bottom: 12px;
      }

      .em-section-title {
        font-size: clamp(28px, 4vw, 44px);
        font-weight: 700;
        letter-spacing: -1px;
        line-height: 1.1;
        margin-bottom: 16px;
      }

      .em-section-sub {
        font-size: 17px;
        color: var(--muted);
        line-height: 1.8;
        max-width: 600px;
      }

      /* Grid lines decoration */
      .em-grid-bg {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(166,30,46,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(166,30,46,0.03) 1px, transparent 1px);
        background-size: 60px 60px;
        pointer-events: none;
      }

      /* Divider */
      .em-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border), transparent);
        margin: 0;
      }

      /* Footer */
      .em-footer {
        background: var(--bg-card);
        border-top: 1px solid var(--border);
        padding: 64px 48px 32px;
      }

      .em-footer-inner {
        max-width: 1100px;
        margin: 0 auto;
      }

      .em-footer-top {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 1fr;
        gap: 48px;
        padding-bottom: 48px;
        border-bottom: 1px solid var(--border);
        margin-bottom: 32px;
      }

      .em-footer-brand p {
        font-size: 13px;
        color: var(--dim);
        line-height: 1.8;
        margin-top: 16px;
        max-width: 240px;
      }

      .em-footer-col h5 {
        font-family: var(--font-mono);
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 3px;
        color: var(--accent);
        text-transform: uppercase;
        margin-bottom: 16px;
      }

      .em-footer-col ul { list-style: none; }

      .em-footer-col ul li {
        margin-bottom: 10px;
      }

      .em-footer-col ul li a {
        font-size: 13px;
        color: var(--dim);
        text-decoration: none;
        transition: color 0.2s;
      }

      .em-footer-col ul li a:hover { color: var(--text); }

      .em-footer-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      .em-footer-copy {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--dim);
        letter-spacing: 1px;
      }

      .em-footer-social {
        display: flex;
        gap: 16px;
      }

      .em-footer-social a {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--dim);
        text-decoration: none;
        letter-spacing: 1px;
        transition: color 0.2s;
      }

      .em-footer-social a:hover { color: var(--accent-bright); }

      /* Form inputs */
      .em-input {
        width: 100%;
        background: rgba(255,255,255,0.03);
        border: 1px solid var(--border);
        border-radius: 4px;
        padding: 14px 16px;
        color: var(--text);
        font-family: var(--font-main);
        font-size: 15px;
        outline: none;
        transition: border-color 0.2s, background 0.2s;
      }

      .em-input::placeholder { color: var(--dim); }

      .em-input:focus {
        border-color: var(--accent);
        background: rgba(166,30,46,0.04);
      }

      /* Fade-in on scroll */
      .em-reveal {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }

      .em-reveal.visible {
        opacity: 1;
        transform: none;
      }

      /* Mobile */
      @media (max-width: 900px) {
        .em-nav { padding: 0 24px; }
        .em-nav-links { display: none; }
        .em-nav-cta { display: none; }
        .em-hamburger { display: flex; }
        .em-container { padding: 0 24px; }
        .em-section { padding: 64px 0; }
        .em-footer { padding: 48px 24px 24px; }
        .em-footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
        .em-footer-bottom { flex-direction: column; align-items: flex-start; }
        .em-mobile-menu { padding: 24px; }
      }

      @media (max-width: 600px) {
        .em-footer-top { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);
  },

  buildAnnounce() {
    if (document.querySelector('.em-announce')) return;
    const bar = document.createElement('a');
    bar.className = 'em-announce';
    bar.href = 'pro.html';
    bar.innerHTML = `NEW · START EDGEMATRIX PRO WITH A 7-DAY FREE TRIAL · CANCEL ANYTIME <span class="em-announce-arrow">→</span>`;
    document.body.prepend(bar);
  },

  buildNav(activePage) {
    this.buildAnnounce();
    const pages = [
      { href: 'index.html', label: 'Home' },
      { href: 'pro.html', label: 'Pro' },
      { href: 'free.html', label: 'Free Tool' },
      { href: 'tools.html', label: 'Tools' },
      { href: 'about.html', label: 'About' },
      { href: 'blog.html', label: 'Blog' },
    ];

    const nav = document.createElement('nav');
    nav.className = 'em-nav';
    nav.innerHTML = `
      <a href="index.html" class="em-logo">
        <div class="em-logo-bar"></div>
        <div class="em-logo-text">
          <span class="em-logo-edge">EDGE</span>
          <span class="em-logo-matrix">MATRIX</span>
        </div>
      </a>
      <ul class="em-nav-links">
        ${pages.map(p => `<li><a href="${p.href}" class="${p.label.toLowerCase().replace(' ', '-') === activePage ? 'active' : ''}">${p.label}</a></li>`).join('')}
      </ul>
      <a href="pro.html" class="em-nav-cta">Get Pro →</a>
      <div class="em-hamburger" id="em-hamburger">
        <span></span><span></span><span></span>
      </div>
    `;
    document.body.prepend(nav);

    // Mobile menu
    const mobile = document.createElement('div');
    mobile.className = 'em-mobile-menu';
    mobile.id = 'em-mobile-menu';
    mobile.innerHTML = `
      ${pages.map(p => `<a href="${p.href}">${p.label}</a>`).join('')}
      <a href="pro.html" style="color: var(--accent-bright) !important;">Get Pro →</a>
    `;
    nav.after(mobile);

    document.getElementById('em-hamburger').addEventListener('click', () => {
      mobile.classList.toggle('open');
    });

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  },

  buildFooter() {
    const footer = document.createElement('footer');
    footer.className = 'em-footer';
    footer.innerHTML = `
      <div class="em-footer-inner">
        <div class="em-footer-top">
          <div class="em-footer-brand">
            <a href="index.html" class="em-logo" style="text-decoration:none;">
              <div class="em-logo-bar"></div>
              <div class="em-logo-text">
                <span class="em-logo-edge">EDGE</span>
                <span class="em-logo-matrix">MATRIX</span>
              </div>
            </a>
            <p>The execution system for serious traders. Discipline, enforced.</p>
          </div>
          <div class="em-footer-col">
            <h5>Product</h5>
            <ul>
              <li><a href="pro.html">EdgeMatrix Pro</a></li>
              <li><a href="free.html">Sessions (Free)</a></li>
              <li><a href="tools.html">All Tools</a></li>
              <li><a href="checkout.html">Pricing</a></li>
            </ul>
          </div>
          <div class="em-footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="mailto:hello@edgematrixhq.com">Contact</a></li>
            </ul>
          </div>
          <div class="em-footer-col">
            <h5>Follow</h5>
            <ul>
              <li><a href="https://www.instagram.com/edgematrixhq" target="_blank">Instagram</a></li>
              <li><a href="https://www.tiktok.com/@edgematrixhq" target="_blank">TikTok</a></li>
              <li><a href="https://discord.gg/bqnkyTuyHg" target="_blank">Discord</a></li>
              <li><a href="mailto:hello@edgematrixhq.com">hello@edgematrixhq.com</a></li>
            </ul>
          </div>
        </div>
        <div class="em-footer-bottom">
          <span class="em-footer-copy">© 2026 EDGEMATRIX — ALL RIGHTS RESERVED · <a href="https://billing.stripe.com/p/login/9B6cN72rYdrlc0zgMU4ZG00" target="_blank" rel="noopener" style="color:inherit; text-decoration:none;">Manage subscription</a></span>
          <div class="em-footer-social">
            <a href="https://www.instagram.com/edgematrixhq" target="_blank">INSTAGRAM</a>
            <a href="https://www.tiktok.com/@edgematrixhq" target="_blank">TIKTOK</a>
            <a href="https://discord.gg/bqnkyTuyHg" target="_blank">DISCORD</a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(footer);
  },

  initReveal() {
    const els = document.querySelectorAll('.em-reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), (e.target.dataset.delay || 0) * 1);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
  },

  // WebGL particle field
  initParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles = [], mouse = { x: -9999, y: -9999 };
    const COUNT = window.innerWidth < 600 ? 60 : 120;
    const MAX_DIST = 120;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function createParticle() {
      return {
        x: rand(0, W),
        y: rand(0, H),
        vx: rand(-0.3, 0.3),
        vy: rand(-0.2, 0.2),
        r: rand(0.8, 2.2),
        alpha: rand(0.2, 0.8),
        pulse: rand(0, Math.PI * 2),
        pulseSpeed: rand(0.005, 0.02),
        color: Math.random() > 0.85 ? '#D42B40' : '#888899',
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: COUNT }, createParticle);
    }

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const opacity = (1 - d / MAX_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(166,30,46,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections
      particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) {
          const opacity = (1 - d / 200) * 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(212,43,64,${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // Draw particles
      particles.forEach(p => {
        p.pulse += p.pulseSpeed;
        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color === '#D42B40'
          ? `rgba(212,43,64,${alpha})`
          : `rgba(136,136,153,${alpha})`;
        ctx.fill();

        if (p.color === '#D42B40') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(166,30,46,${alpha * 0.15})`;
          ctx.fill();
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Attract slightly toward mouse
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 300 && md > 0) {
          p.vx += (mdx / md) * 0.008;
          p.vy += (mdy / md) * 0.008;
        }

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) { p.vx *= 0.95; p.vy *= 0.95; }

        // Wrap
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;
      });

      requestAnimationFrame(drawFrame);
    }

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

    window.addEventListener('resize', () => { resize(); });

    init();
    drawFrame();
  }
};

window.EM = EM;
