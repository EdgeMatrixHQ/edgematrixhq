/* =========================================================
   EdgeMatrix app shell.

   Injects the desktop left rail, the mobile bottom tab bar, the
   top status strip and the animated background, then moves
   whatever the page already had in <body> into the content
   column. Any page adopts it with one line and no markup changes:

       <script src="em-shell.js"></script>
       <script>EMShell.build('sessions', 'Sessions');</script>

   The NAV array is the single source of truth. Every entry points
   at a real page, never an anchor, so clicking a tab always lands
   somewhere rather than scrolling. The items marked tab:true are
   the mobile bottom tabs, which are also the navigation a future
   EdgeMatrix app would ship with.
   ========================================================= */
(function () {

  var ICONS = {
    today:     '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>',
    sessions:  '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    news:      '<svg viewBox="0 0 24 24"><path d="M4 5h12a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2z"/><path d="M18 9h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/><path d="M8 9h6M8 13h6M8 17h4"/></svg>',
    creators:  '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16.5 5.2a3.2 3.2 0 0 1 0 5.6M18 20a6 6 0 0 0-2.3-4.7"/></svg>',
    resources: '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18"/></svg>',
    about:     '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.4"/></svg>',
    more:      '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg>',
    card:      '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
    mail:      '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/></svg>'
  };

  var NAV = [
    { key: 'today',     href: 'index.html',     label: 'Today',     icon: 'today',     tab: true },
    { key: 'sessions',  href: 'sessions.html',  label: 'Sessions',  icon: 'sessions',  tab: true },
    { key: 'news',      href: 'news.html',      label: 'News',      icon: 'news',      tab: true },
    { key: 'creators',  href: 'creators.html',  label: 'Creators',  icon: 'creators',  tab: true },
    { key: 'resources', href: 'resources.html', label: 'Resources', icon: 'resources' },
    { key: 'about',     href: 'about.html',     label: 'About',     icon: 'about' }
  ];

  var PORTAL = 'https://billing.stripe.com/p/login/9B6cN72rYdrlc0zgMU4ZG00';

  var CSS = [
    ':root{--ems-rail:238px;--ems-tab:62px}',

    /* Animated field sits behind the whole document, not just a hero. */
    '#ems-bg{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}',
    'body{position:relative;background:#0A0A0C}',
    '.ems-rail,.ems-main,.ems-tabbar,.ems-sheet{position:relative;z-index:1}',
    '.ems-rail{z-index:70}.ems-tabbar{z-index:80}.ems-sheet{z-index:90}',

    '.ems-rail{position:fixed;top:0;left:0;bottom:0;width:var(--ems-rail);',
      'background:rgba(12,12,15,.92);backdrop-filter:blur(10px);',
      'border-right:1px solid #1C1C22;display:flex;flex-direction:column;padding:20px 14px}',
    '.ems-rail .ems-brand{display:flex;align-items:center;gap:10px;padding:4px 10px 24px;',
      'font-weight:700;font-size:17px;letter-spacing:-.3px;color:#E8E8EC;text-decoration:none}',
    '.ems-mark{width:24px;height:24px;border-radius:6px;flex:none;',
      'background:linear-gradient(135deg,#D42B40 0%,#A61E2E 100%)}',
    '.ems-rail nav{display:flex;flex-direction:column;gap:2px}',
    '.ems-rail nav a{display:flex;align-items:center;gap:11px;padding:10px 11px;border-radius:8px;',
      'font-size:14px;font-weight:600;color:#888899;text-decoration:none;transition:background .14s,color .14s}',
    '.ems-rail nav a svg,.ems-tabbar svg,.ems-sheet svg{display:block;flex:none;stroke:currentColor;',
      'stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}',
    '.ems-rail nav a svg{width:17px;height:17px}',
    '.ems-rail nav a:hover{background:rgba(255,255,255,.04);color:#C8C8D2}',
    '.ems-rail nav a.on{background:rgba(166,30,46,.16);color:#E8E8EC}',
    '.ems-rail nav a.on svg{stroke:#D42B40}',
    '.ems-sep{height:1px;background:#1C1C22;margin:14px 6px}',
    '.ems-foot{margin-top:auto;padding:0 4px}',
    '.ems-clock{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:#666677;',
      'font-variant-numeric:tabular-nums;padding:0 11px 10px}',
    '.ems-mini{display:block;font-size:11.5px;color:#666677;padding:4px 11px;text-decoration:none}',
    '.ems-mini:hover{color:#888899}',

    '.ems-tabbar{display:none;position:fixed;left:0;right:0;bottom:0;',
      'height:calc(var(--ems-tab) + env(safe-area-inset-bottom));padding-bottom:env(safe-area-inset-bottom);',
      'background:rgba(12,12,15,.94);backdrop-filter:blur(16px);border-top:1px solid #1C1C22}',
    '.ems-tabbar .ems-in{display:flex;height:var(--ems-tab)}',
    '.ems-tabbar a,.ems-tabbar button{flex:1;display:flex;flex-direction:column;align-items:center;',
      'justify-content:center;gap:4px;background:none;border:0;cursor:pointer;font-family:inherit;',
      'font-size:10px;font-weight:600;color:#666677;text-decoration:none}',
    '.ems-tabbar svg{width:21px;height:21px;stroke-width:1.7}',
    '.ems-tabbar a.on{color:#E8E8EC}',
    '.ems-tabbar a.on svg{stroke:#D42B40}',
    '.ems-sheet{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6)}',
    '.ems-sheet.open{display:block}',
    '.ems-sheet .ems-panel{position:absolute;left:0;right:0;bottom:0;background:#0F0F12;',
      'border-top:1px solid #26262E;border-radius:16px 16px 0 0;',
      'padding:10px 0 calc(16px + env(safe-area-inset-bottom))}',
    '.ems-grab{width:38px;height:4px;border-radius:2px;background:#26262E;margin:4px auto 12px}',
    '.ems-sheet a{display:flex;align-items:center;gap:12px;padding:14px 22px;font-size:15px;',
      'font-weight:600;color:#C8C8D2;text-decoration:none}',
    '.ems-sheet svg{width:18px;height:18px}',

    '.ems-main{margin-left:var(--ems-rail)}',
    '.ems-top{position:sticky;top:0;z-index:50;height:56px;display:flex;align-items:center;gap:12px;',
      'padding:0 26px;background:rgba(10,10,12,.78);backdrop-filter:blur(14px);border-bottom:1px solid #1C1C22}',
    '.ems-where{font-size:14.5px;font-weight:700;letter-spacing:-.2px;color:#E8E8EC}',
    '.ems-st{margin-left:auto;display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;',
      'letter-spacing:1.2px;text-transform:uppercase;color:#888899}',
    '.ems-dot{width:7px;height:7px;border-radius:50%;background:#1DB954;flex:none;',
      'box-shadow:0 0 0 0 rgba(29,185,84,.6);animation:ems-p 2.4s infinite}',
    '.ems-dot.shut{background:#666677;animation:none;box-shadow:none}',
    '@keyframes ems-p{0%{box-shadow:0 0 0 0 rgba(29,185,84,.55)}70%{box-shadow:0 0 0 9px rgba(29,185,84,0)}100%{box-shadow:0 0 0 0 rgba(29,185,84,0)}}',

    '@media(max-width:1000px){',
      '.ems-rail{display:none}',
      '.ems-main{margin-left:0;padding-bottom:calc(var(--ems-tab) + env(safe-area-inset-bottom))}',
      '.ems-tabbar{display:block}',
      '.ems-top{padding:0 18px}',
    '}',
    /* The shared footer is the one full width band with a solid fill, so it
       hides the field behind it. Translucent plus a blur keeps the text
       readable while the particles carry on through to the bottom. */
    '.em-footer{background:rgba(15,15,18,.66)!important;backdrop-filter:blur(12px)}',
    '.em-footer-bottom,.em-footer-legal{background:transparent!important}',
    '@media(prefers-reduced-motion:reduce){#ems-bg{display:none}}'
  ].join('');

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function two(n) { return n < 10 ? '0' + n : '' + n; }

  /* =========================================================
     BACKGROUND
     Full viewport, fixed, behind every page. Same look as the
     old hero field but bound to the window rather than one
     section, so it follows the cursor anywhere on the site.
     ========================================================= */
  function startBackground() {
    var c = document.getElementById('ems-bg');
    if (!c || !c.getContext) return;
    var ctx = c.getContext('2d');
    var W = 0, H = 0, dots = [], mouse = { x: -9999, y: -9999 };
    var MAX = 120, PULL = 200;

    function rand(a, b) { return Math.random() * (b - a) + a; }

    function size() {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
      var want = W < 600 ? 45 : (W < 1100 ? 85 : 130);
      while (dots.length < want) dots.push(make());
      dots.length = want;
    }
    function make() {
      return {
        x: rand(0, W || window.innerWidth), y: rand(0, H || window.innerHeight),
        vx: rand(-0.26, 0.26), vy: rand(-0.18, 0.18),
        r: rand(0.8, 2.1), a: rand(0.2, 0.75),
        p: rand(0, Math.PI * 2), ps: rand(0.005, 0.018),
        col: Math.random() > 0.85 ? '212,43,64' : '136,136,153'
      };
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);

      for (var i = 0; i < dots.length; i++) {
        for (var j = i + 1; j < dots.length; j++) {
          var dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX) {
            ctx.strokeStyle = 'rgba(136,136,153,' + ((1 - d / MAX) * 0.17).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y); ctx.stroke();
          }
        }
      }

      for (var k = 0; k < dots.length; k++) {
        var p = dots[k];
        var mdx = mouse.x - p.x, mdy = mouse.y - p.y;
        var md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < PULL) {
          ctx.strokeStyle = 'rgba(212,43,64,' + ((1 - md / PULL) * 0.45).toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          p.vx += (mdx / md) * 0.006;
          p.vy += (mdy / md) * 0.006;
        }

        p.p += p.ps;
        var alpha = p.a * (0.6 + 0.4 * Math.sin(p.p));
        ctx.fillStyle = 'rgba(' + p.col + ',' + alpha.toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();

        p.x += p.vx; p.y += p.vy;
        var sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp > 0.6) { p.vx *= 0.96; p.vy *= 0.96; }
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
      }
      requestAnimationFrame(frame);
    }

    window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout', function () { mouse.x = -9999; mouse.y = -9999; });
    window.addEventListener('resize', size);
    size();
    frame();
  }

  var EMShell = {
    NAV: NAV,
    ICONS: ICONS,
    PORTAL: PORTAL,

    build: function (activeKey, title) {
      if (document.querySelector('.ems-rail')) return;

      var style = el('style');
      style.id = 'ems-styles';
      style.textContent = CSS;
      document.head.appendChild(style);

      var main = el('div', 'ems-main');
      while (document.body.firstChild) main.appendChild(document.body.firstChild);

      var top = el('div', 'ems-top',
        '<span class="ems-where">' + (title || '') + '</span>' +
        '<div class="ems-st"><span class="ems-dot" id="emsDot"></span>' +
        '<span id="emsStatus">&nbsp;</span></div>');
      main.insertBefore(top, main.firstChild);

      var rail = el('aside', 'ems-rail',
        '<a href="index.html" class="ems-brand"><span class="ems-mark"></span>EdgeMatrix</a>' +
        '<nav>' + NAV.map(function (n) {
          return '<a href="' + n.href + '"' + (n.key === activeKey ? ' class="on"' : '') + '>' +
                 ICONS[n.icon] + '<span>' + n.label + '</span></a>';
        }).join('') + '</nav>' +
        '<div class="ems-foot"><div class="ems-sep"></div>' +
          '<div class="ems-clock" id="emsClock">&nbsp;</div>' +
          '<a class="ems-mini" href="' + PORTAL + '">Manage subscription</a>' +
          '<a class="ems-mini" href="mailto:hello@edgematrixhq.com">Support</a>' +
        '</div>');

      var tabs = NAV.filter(function (n) { return n.tab; }).slice(0, 4);
      var bar = el('div', 'ems-tabbar',
        '<div class="ems-in">' + tabs.map(function (n) {
          return '<a href="' + n.href + '"' + (n.key === activeKey ? ' class="on"' : '') + '>' +
                 ICONS[n.icon] + '<span>' + n.label + '</span></a>';
        }).join('') + '<button id="emsMore">' + ICONS.more + '<span>More</span></button></div>');

      var rest = NAV.filter(function (n) { return !n.tab; });
      var sheet = el('div', 'ems-sheet',
        '<div class="ems-panel"><div class="ems-grab"></div>' +
          rest.map(function (n) {
            return '<a href="' + n.href + '">' + ICONS[n.icon] + n.label + '</a>';
          }).join('') +
          '<a href="' + PORTAL + '">' + ICONS.card + 'Manage subscription</a>' +
          '<a href="mailto:hello@edgematrixhq.com">' + ICONS.mail + 'Support</a>' +
        '</div>');
      sheet.id = 'emsSheet';

      var bg = document.createElement('canvas');
      bg.id = 'ems-bg';

      document.body.appendChild(bg);
      document.body.appendChild(rail);
      document.body.appendChild(main);
      document.body.appendChild(bar);
      document.body.appendChild(sheet);

      document.getElementById('emsMore').addEventListener('click', function () {
        sheet.classList.add('open');
      });
      sheet.addEventListener('click', function (ev) {
        if (ev.target === sheet) sheet.classList.remove('open');
      });

      startBackground();
      this.startClock();
      this.startStatus();
      return main;
    },

    startClock: function () {
      var node = document.getElementById('emsClock');
      if (!node) return;
      function tick() {
        var n = new Date();
        node.textContent = two(n.getHours()) + ':' + two(n.getMinutes()) + ':' + two(n.getSeconds()) + ' local';
      }
      tick(); setInterval(tick, 1000);
    },

    startStatus: function () {
      var dot = document.getElementById('emsDot');
      var label = document.getElementById('emsStatus');
      if (!dot || !label) return;
      function paint() {
        if (typeof computeSessions !== 'function') { dot.className = 'ems-dot shut'; return; }
        try {
          var open = computeSessions(new Date()).filter(function (x) { return x.isOpen; });
          if (open.length) { dot.className = 'ems-dot'; label.textContent = open[0].s.name + ' open'; }
          else { dot.className = 'ems-dot shut'; label.textContent = 'Markets closed'; }
        } catch (e) { dot.className = 'ems-dot shut'; }
      }
      paint(); setInterval(paint, 20000);
    }
  };

  window.EMShell = EMShell;
})();
