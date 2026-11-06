/* 불씨 포트폴리오 — 자기소개 · 프로젝트 목차 · 프로젝트 상세
   - 문구와 프로젝트 정보는 content/site-content.js, content/projects.js 에서 읽음
   - 비어 있는 값(역할·기간·성과·주소·이미지)은 지어내지 않고 숨기거나 '보완 예정'으로 표시
   - 상세 주소는 project.html?id=프로젝트id (GitHub Pages 하위 경로에서도 새로고침 가능한 정적 주소) */
(function () {
  'use strict';

  var SITE = window.BULSSI_SITE || {};
  var PROJECTS = ((window.BULSSI_PROJECTS || {}).projects || []).filter(function (p) { return p && p.id && p.name; });
  var ALL = '전체';
  var FILTERS = list(SITE.filters).length ? list(SITE.filters) : [ALL, '서비스 기획', 'UI/UX', '마케팅'];
  if (FILTERS.indexOf(ALL) < 0) FILTERS.unshift(ALL);
  var reduceMQ = window.bulssiReduceMQ || matchMedia('(prefers-reduced-motion: reduce)');   // js/motion.js (방문자가 켠 움직임 반영)
  var SCRIPT_SRC = (document.currentScript && document.currentScript.src) || location.href;

  /* ---------- 도우미 ---------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') node.className = v;
      else node.setAttribute(k, v === true ? '' : v);
    });
    append(node, children);
    return node;
  }
  function append(node, children) {
    [].concat(children == null ? [] : children).forEach(function (c) {
      if (c == null || c === false || c === '') return;
      if (Array.isArray(c)) return append(node, c);
      node.append(c.nodeType ? c : document.createTextNode(String(c)));
    });
    return node;
  }
  function text(v) { return typeof v === 'string' ? v.trim() : (typeof v === 'number' ? String(v) : ''); }
  function list(v) { return Array.isArray(v) ? v.filter(function (x) { return x != null && x !== ''; }) : (text(v) ? [v] : []); }
  function paras(v) { return list(v).map(text).filter(Boolean); }
  // 본문 블록: 문장(문자열) 또는 이름표 줄({ label, text })
  function blocks(v) {
    return list(v).map(function (b) {
      if (b && typeof b === 'object') return text(b.text) ? { label: text(b.label), text: text(b.text) } : null;
      return text(b) || null;
    }).filter(Boolean);
  }
  // 이어지는 이름표 줄은 하나의 목록으로 묶고, 문장은 문단으로
  function renderBlocks(items) {
    var out = [], rows = null;
    items.forEach(function (b) {
      if (typeof b === 'string') { rows = null; out.push(el('p', null, b)); return; }
      if (!rows) { rows = el('dl', { class: 'story-rows' }); out.push(rows); }
      rows.append(el('div', null, [el('dt', null, b.label), el('dd', null, b.text)]));
    });
    return out;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function categories(p) { var c = list(p.categories).map(text).filter(Boolean); return FILTERS.filter(function (f) { return c.indexOf(f) >= 0; }).concat(c.filter(function (x) { return FILTERS.indexOf(x) < 0; })); }
  function roleText(p) { return list(p.role).map(text).filter(Boolean).join(' · '); }
  function detailHref(id) { return 'project.html?id=' + encodeURIComponent(id); }
  function safeUrl(u) {
    if (!text(u)) return null;
    try { var x = new URL(u, location.href); return /^https?:$/.test(x.protocol) ? x.href : null; }
    catch (e) { return null; }
  }
  function toImage(v) {
    if (typeof v === 'string' && v.trim()) return { src: v.trim() };
    if (v && typeof v === 'object' && text(v.src)) return v;
    return null;
  }
  function imageNode(im, opts) {
    var node = el('img', { src: im.src, alt: text(im.alt) || opts.alt || '', decoding: 'async' });
    if (opts.lazy) node.loading = 'lazy';
    if (im.width && im.height) { node.width = im.width; node.height = im.height; }
    var fit = im.fit || opts.fit;
    if (fit) node.classList.add('fit-' + fit);
    if (text(im.position)) node.style.objectPosition = im.position;
    return node;
  }
  function icon(kind) {
    var d = { 'down-right': 'M6 6l12 12M18 9v9H9', left: 'M19 12H5M11 6l-6 6 6 6', right: 'M5 12h14M13 6l6 6-6 6', 'up-right': 'M7 17L17 7M8 7h9v9' }[kind];
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', 'icon');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    svg.append(path);
    return svg;
  }
  function stored(key, value) {
    try {
      if (arguments.length > 1) sessionStorage.setItem(key, value);
      else return sessionStorage.getItem(key);
    } catch (e) { return null; }
  }

  /* ---------- 자기소개: 왼쪽 이미지 순환, 오른쪽 문구 고정 ---------- */
  var rotation = null;

  function renderAbout(root, about) {
    about = about || SITE.about || {};
    var copy = root.querySelector('[data-about-copy]');
    var media = root.querySelector('[data-about-media]');
    var cta = text(about.ctaHref) || '#projects';
    copy.replaceChildren();
    append(copy, [
      el('div', { class: 'about-copy-body' }, [
        text(SITE.role) && el('p', { class: 'about-role' }, SITE.role),
        paras(about.paragraphs).map(function (t) { return el('p', { class: 'about-text' }, t); })
      ]),
      el('div', { class: 'about-ctas' }, [
        el('a', { class: 'pill-link', href: cta.charAt(0) === '#' ? cta : (safeUrl(cta) || '#projects') },
          [el('span', null, text(about.ctaLabel) || '프로젝트 살펴보기'), icon('down-right')]),
        SITE.profile && el('a', { class: 'pill-link is-quiet', href: 'about.html' }, [el('span', null, '자기소개 · 이력'), icon('right')])
      ])
    ]);
    renderAboutImages(media, list(about.images).map(toImage).filter(Boolean), +about.interval);
    fitAboutCopy(root);
    if (!root._fitWatch) {
      root._fitWatch = true;
      var queued = false;
      window.addEventListener('resize', function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () { queued = false; fitAboutCopy(root); });
      });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fitAboutCopy(root); });
    }
  }

  // 글(직무 ~ 마지막 문단)을 사진 높이에 맞춤: 사진 높이 안에 들어가는 가장 큰 글자 크기를 고르고,
  // 남는 높이는 문단 사이에 고르게 나눠 글의 위·아래 끝을 사진의 위·아래 끝과 맞춤 (사진 위·글 아래로 쌓이는 좁은 화면에서는 그대로)
  function fitAboutCopy(root) {
    var frame = root.querySelector('.about-frame'), body = root.querySelector('.about-copy-body');
    var grid = root.querySelector('.about') || root;
    if (!frame || !body) return;
    body.style.height = '';
    body.style.removeProperty('--about-fs');
    if (getComputedStyle(grid).gridTemplateColumns.split(' ').length < 2) return;
    var h = frame.getBoundingClientRect().height;
    if (!h) return;
    body.classList.add('is-measuring');
    for (var fs = 22; fs > 14; fs -= .5) {
      body.style.setProperty('--about-fs', fs + 'px');
      if (body.scrollHeight <= h) break;
    }
    body.classList.remove('is-measuring');
    body.style.height = h + 'px';
  }

  function renderAboutImages(media, images, interval) {
    interval = Math.max(1000, interval || 4500);
    if (rotation) rotation.stop();
    rotation = null;
    media.replaceChildren();
    var frame = el('div', { class: 'about-frame' });
    media.append(frame);

    // 이미지 0개: 대기 영역 하나만
    if (!images.length) {
      frame.classList.add('is-empty');
      frame.append(el('div', { class: 'frame-ph' }, [el('strong', null, '이미지 준비 중'), el('span', null, '관찰 · 작업 기록')]));
      return;
    }

    var nodes = images.map(function (im, i) {
      var n = imageNode(im, { alt: '김시언의 관찰·작업 기록 ' + (i + 1), fit: 'cover', lazy: i > 0 });
      if (i === 0) n.classList.add('is-active'); else n.setAttribute('aria-hidden', 'true');
      n.addEventListener('error', function () { n.remove(); nodes = nodes.filter(function (x) { return x !== n; }); if (controls) sync(); });
      frame.append(n);
      return n;
    });
    if (images.length < 2) return;   // 1개: 순환하지 않음

    // 여러 개: 짧은 크로스페이드로 순환(간격은 about.interval). 화면 밖·탭 숨김·모션 축소에서는 멈춤, 버튼으로 멈추고 다시 재생
    var current = 0, timer = 0, visible = false;
    var playing = !reduceMQ.matches;
    var count = el('span', { class: 'about-count' });
    var btn = el('button', { type: 'button', class: 'about-toggle' });
    var controls = el('div', { class: 'about-controls' }, [btn, count]);
    media.append(controls);

    function show(i) {
      if (!nodes.length) return;
      current = (i + nodes.length) % nodes.length;
      nodes.forEach(function (n, k) {
        n.classList.toggle('is-active', k === current);
        if (k === current) n.removeAttribute('aria-hidden'); else n.setAttribute('aria-hidden', 'true');
      });
      count.textContent = pad(current + 1) + ' / ' + pad(nodes.length);
    }
    function sync() {
      clearInterval(timer); timer = 0;
      if (nodes.length < 2) { controls.hidden = true; return; }
      show(current);
      btn.textContent = playing ? '멈춤' : '재생';
      btn.setAttribute('aria-label', playing ? '이미지 순환 멈추기' : '이미지 순환 재생');
      btn.setAttribute('aria-pressed', playing ? 'false' : 'true');
      if (playing && visible && !document.hidden) timer = setInterval(function () { show(current + 1); }, interval);
    }
    btn.addEventListener('click', function () { playing = !playing; sync(); });
    var io = new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; sync(); });
    io.observe(frame);
    document.addEventListener('visibilitychange', sync);
    var onMotion = function () { if (reduceMQ.matches) playing = false; sync(); };
    reduceMQ.addEventListener('change', onMotion);
    rotation = { stop: function () { clearInterval(timer); io.disconnect(); document.removeEventListener('visibilitychange', sync); reduceMQ.removeEventListener('change', onMotion); } };
    sync();
  }

  // 남색 자기소개가 머리말 아래를 지나는 동안에는 머리말을 밝은 글자로 (크림 바탕으로 돌아오면 원래대로)
  function watchDarkBand(band) {
    if (!band || !band.classList.contains('about-band')) return;
    var root = document.documentElement, queued = false;
    var header = document.querySelector('.site-header');
    var check = function () {
      queued = false;
      var r = band.getBoundingClientRect(), line = 46;   // 머리말 가운데 높이 (표지가 끝나는 기준과 같음)
      root.classList.toggle('on-dark', r.top <= line && r.bottom >= line);
      // 남색 끝이 머리말 높이 안을 지나는 동안: 머리말 바탕을 그 경계에서 나눠(위 남색·아래 크림) 띠가 보이지 않게
      var hh = header ? header.offsetHeight : 0;
      var split = r.bottom > 0 && r.bottom < hh;
      root.classList.toggle('hdr-split', split);
      if (split) root.style.setProperty('--hdr-split', r.bottom.toFixed(1) + 'px');
    };
    var queue = function () { if (!queued) { queued = true; requestAnimationFrame(check); } };
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    check();
  }

  /* ---------- 자기소개 → 목차: 온기가 점을 밝혀 크림 바탕으로 ----------
     남색 위 옅은 점들이 아래에서부터 따뜻해지고(주황) 커지며(크림) 서로 맞닿아 바탕이 됨.
     스크롤·창 크기가 바뀔 때만 다시 그림 (상시 애니메이션 없음) */
  function mountDawn(box) {
    var canvas = box && box.querySelector('canvas');
    if (!canvas || !canvas.getContext || reduceMQ.matches) return;
    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, gap = 22, cols = 0, rows = 0, jitter = [], queued = false;

    function hash(i, j) { var x = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return x - Math.floor(x); }
    function vnoise(x, y) {   // 부드러운 값 잡음: 온기의 앞선이 반듯하지 않게
      var i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j;
      fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
      var a = hash(i, j), b = hash(i + 1, j), c = hash(i, j + 1), d = hash(i + 1, j + 1);
      return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
    }
    function sm(a, b, x) { var t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); }

    function resize() {
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      W = box.clientWidth; H = box.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = W < 720 ? 18 : 22;
      cols = Math.ceil(W / gap) + 2; rows = Math.ceil(H / gap) + 1;
      jitter = [];
      for (var j = 0; j < rows; j++) for (var i = 0; i < cols; i++) jitter.push(vnoise(i * 0.18, j * 0.22) - 0.5);
      draw();
    }

    function draw() {
      queued = false;
      var r = box.getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom < -40 || r.top > vh + 40) return;
      // 띠 위쪽이 화면 아래에 닿을 때 0 → 띠 위쪽이 화면 위에 닿을 때 1
      var t = Math.min(1, Math.max(0, (vh - r.top) / (H + vh * 0.3)));
      ctx.fillStyle = '#010514';
      ctx.fillRect(0, 0, W, H);
      var x0 = (W - (cols - 1) * gap) / 2;
      for (var j = 0; j < rows; j++) {
        var y = H - j * gap, yb = y / H;   // 맨 아래 줄은 띠 아랫단에 딱 맞춤
        for (var i = 0; i < cols; i++) {
          var e = t * 1.65 - (1 - yb) + jitter[j * cols + i] * 0.36;
          // 먼저 따뜻해지고(주황, 조금 커짐) → 이어서 커지며 크림으로 맞닿음
          var warm = sm(-0.5, -0.12, e), grow = sm(0.0, 0.46, e), cream = sm(0.12, 0.42, e);
          var base = 0.1 * sm(0, 0.3, yb) * (1 - warm);
          var rad = 1.1 + 2.2 * warm + (gap * 0.76 - 3.3) * grow;
          var cr = 243 + (240 - 243) * warm, cg = 237 + (150 - 237) * warm, cb = 228 + (88 - 228) * warm;   // 옅은 점 → 주황
          cr += (246 - cr) * cream; cg += (242 - cg) * cream; cb += (235 - cb) * cream;                      // → 크림
          var alpha = base + (0.9 - base) * warm;
          alpha += (1 - alpha) * grow;
          var edge = sm(0, 0.16, yb);           // 띠 윗단: 주황 단계는 흐리게 시작해 반듯한 줄이 생기지 않게
          alpha *= edge + (1 - edge) * grow;
          if (alpha < 0.01) continue;
          ctx.fillStyle = 'rgba(' + (cr | 0) + ',' + (cg | 0) + ',' + (cb | 0) + ',' + alpha.toFixed(3) + ')';
          ctx.beginPath();
          ctx.arc(x0 + i * gap, y, rad, 0, 6.2832);
          ctx.fill();
        }
      }
    }
    var queue = function () { if (!queued) { queued = true; requestAnimationFrame(draw); } };
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', function () { requestAnimationFrame(resize); });
    resize();
  }

  /* ---------- 연락처: 제공된 정보가 있을 때만 채움 ---------- */
  function renderContact(root) {
    var c = SITE.contact || {};
    var email = text(c.email);
    var links = list(c.links).map(function (l) { return { label: text(l.label) || text(l.url), url: safeUrl(l.url) }; }).filter(function (l) { return l.url; });
    if (!email && !links.length) return;   // 없으면 기존 입력 자리 유지
    root.replaceChildren(el('ul', { class: 'contact-list' }, [
      email && el('li', null, el('a', { href: 'mailto:' + email }, email)),
      links.map(function (l) { return el('li', null, el('a', { href: l.url, target: '_blank', rel: 'noopener' }, [l.label, icon('up-right')])); })
    ]));
  }

  /* ---------- 소표지: 목차 카드와 상세 위쪽이 함께 쓰는 움직이는 표지 ----------
     symbol: 프로젝트 상징 → (올리거나 키보드로 고르면) 빛이 켜지고 이름이 드러남 (OpenTabs 원리)
     metric: 확인된 지표 카드 → 블록이 흩어져 그 지표를 이루는 구성으로 다시 모임 (Domu 원리)
     같은 내용이 카드 아래 글과 상세 본문에 있으므로 소표지는 장식(aria-hidden) */
  var SVG_NS = 'http://www.w3.org/2000/svg';
  // 상징 그림 (48×48). lit = 빛이 켜질 때 채워지는 면, ln = 선, occ = 뒤의 선을 가리는 면
  var SYMBOLS = {
    route: [
      ['lit', 'path', { d: 'M37 22c-4-4.6-5-6.8-5-8.8a5 5 0 0 1 10 0c0 2-1 4.2-5 8.8z' }],
      ['ln', 'path', { d: 'M9 38c8 0 6-12 15-12s9-6 10.5-9', 'stroke-dasharray': '2.4 3' }],
      ['ln', 'circle', { cx: 9, cy: 38, r: 2.6 }],
      ['ln', 'path', { d: 'M37 22c-4-4.6-5-6.8-5-8.8a5 5 0 0 1 10 0c0 2-1 4.2-5 8.8z' }],
      ['ln', 'circle', { cx: 37, cy: 13.2, r: 1.6 }]
    ],
    gavel: [
      ['lit', 'rect', { x: 10, y: 13, width: 18, height: 9, rx: 2, transform: 'rotate(-45 19 17.5)' }],
      ['ln', 'rect', { x: 10, y: 13, width: 18, height: 9, rx: 2, transform: 'rotate(-45 19 17.5)' }],
      ['ln', 'path', { d: 'M22.2 20.7L35 33.5' }],
      ['ln', 'rect', { x: 24, y: 38, width: 18, height: 4.5, rx: 1.5 }]
    ],
    cards: [
      ['ln occ', 'rect', { x: 18, y: 6, width: 22, height: 28, rx: 3 }],
      ['ln occ', 'rect', { x: 14, y: 9.5, width: 22, height: 28, rx: 3 }],
      ['ln occ', 'rect', { x: 10, y: 13, width: 22, height: 28, rx: 3 }],
      ['lit', 'rect', { x: 10, y: 13, width: 22, height: 28, rx: 3 }],
      ['ln', 'path', { d: 'M15 31h12M15 35.5h7' }]
    ],
    backpack: [
      ['ln', 'path', { d: 'M19 14v-2.5a5 5 0 0 1 10 0V14' }],
      ['ln occ', 'rect', { x: 11, y: 14, width: 26, height: 28, rx: 7 }],
      ['lit', 'rect', { x: 17, y: 29, width: 14, height: 9, rx: 2.5 }],
      ['ln', 'rect', { x: 17, y: 29, width: 14, height: 9, rx: 2.5 }],
      ['ln', 'path', { d: 'M11 24h26' }]
    ],
    box: [
      ['lit', 'rect', { x: 9, y: 19, width: 22, height: 20 }],
      ['ln', 'path', { d: 'M9 19l8-8h22l-8 8zM31 19l8-8v20l-8 8' }],
      ['ln', 'rect', { x: 9, y: 19, width: 22, height: 20 }],
      ['ln', 'path', { d: 'M14.5 29l4 4 7.5-8' }]
    ],
    book: [
      ['lit', 'path', { d: 'M24 14c-5-4-12-4.5-17-3v26c5-1.5 12-1 17 3zM24 14c5-4 12-4.5 17-3v26c-5-1.5-12-1-17 3z' }],
      ['ln', 'path', { d: 'M24 14c-5-4-12-4.5-17-3v26c5-1.5 12-1 17 3zM24 14c5-4 12-4.5 17-3v26c-5-1.5-12-1-17 3z' }]
    ],
    sprout: [
      ['lit', 'path', { d: 'M24 27c-7.5 0-12-5-12-12 7 0 12 5 12 12zM24 23c0-7 4.5-12.5 13-12.5 0 7.5-5 12.5-13 12.5z' }],
      ['ln', 'path', { d: 'M10 40h28M24 40V22' }],
      ['ln', 'path', { d: 'M24 27c-7.5 0-12-5-12-12 7 0 12 5 12 12zM24 23c0-7 4.5-12.5 13-12.5 0 7.5-5 12.5-13 12.5z' }]
    ]
  };

  function symbolSvg(name) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 48 48');
    svg.setAttribute('class', 'cv-svg');
    SYMBOLS[name].forEach(function (s) {
      var n = document.createElementNS(SVG_NS, s[1]);
      n.setAttribute('class', s[0]);
      Object.keys(s[2]).forEach(function (k) { n.setAttribute(k, s[2][k]); });
      svg.append(n);
    });
    return svg;
  }

  function symbolCover(p, c, hero) {
    return el('div', { class: 'cv cv--symbol' + (hero ? ' cv--hero' : ''), 'aria-hidden': 'true' }, [
      el('span', { class: 'cv-dots' }), el('span', { class: 'cv-warm' }), el('span', { class: 'cv-glow' }),
      el('span', { class: 'cv-symbol' }, symbolSvg(c.symbol)),
      el('span', { class: 'cv-name' }, p.name),
      el('span', { class: 'cv-view' }, 'VIEW')
    ]);
  }

  // 블록 위치 (표지 폭 기준 cqw). 처음엔 지표 카드 아래 띠, 켜지면 무리별 격자
  var STRIP = { x: 21, bottom: 50.5, step: 2.4, cols: 24 };   // 띠는 지표 카드 아랫단에 맞춰 줄 수만큼 위로 쌓임
  var GRID = { y: 24, size: 3, step: 3.8, gap: 7 };
  function metricCover(p, c, hero) {
    var groups = list(c.groups).map(function (g) {
      return { label: text(g.label), count: Math.max(0, Math.min(72, Math.round(+g.count || 0))), tone: g.tone === 'muted' ? 'muted' : 'accent' };
    }).filter(function (g) { return g.count > 0; });
    var cols = groups.length > 2 ? 6 : 8;
    var gw = cols * GRID.step - (GRID.step - GRID.size);
    var x0 = (100 - (groups.length * gw + (groups.length - 1) * GRID.gap)) / 2;
    var total = groups.reduce(function (n, g) { return n + g.count; }, 0);
    var stripY = STRIP.bottom - Math.ceil(total / STRIP.cols) * STRIP.step;
    var parts = [], k = 0;
    groups.forEach(function (g, gi) {
      var gx = x0 + gi * (gw + GRID.gap);
      parts.push(el('span', { class: 'cv-glabel t-' + g.tone, style: 'left:' + gx.toFixed(2) + 'cqw;width:' + gw.toFixed(2) + 'cqw' }, g.label));
      for (var i = 0; i < g.count; i++, k++) {
        parts.push(el('span', { class: 'blk t-' + g.tone, style: [
          '--x1:' + (STRIP.x + (k % STRIP.cols) * STRIP.step).toFixed(2), '--y1:' + (stripY + Math.floor(k / STRIP.cols) * STRIP.step).toFixed(2),
          '--x2:' + (gx + (i % cols) * GRID.step).toFixed(2), '--y2:' + (GRID.y + Math.floor(i / cols) * GRID.step).toFixed(2),
          '--d:' + Math.min(k * 14, 600) + 'ms'].join(';') }));
      }
    });
    var markImg = toImage(c.markImage);
    return el('div', { class: 'cv cv--metric' + (hero ? ' cv--hero' : ''), 'aria-hidden': 'true' }, [
      el('span', { class: 'cv-mark' }, [markImg && el('img', { src: markImg.src, alt: '' }), p.name]),
      el('span', { class: 'cv-card' }, [
        text(c.label) && el('span', { class: 'cv-label' }, c.label),
        el('strong', { class: 'cv-value' }, text(c.value)),
        text(c.note) && el('span', { class: 'cv-note' }, c.note)
      ]),
      parts,
      text(c.unit) && el('span', { class: 'cv-unit' }, c.unit),
      el('span', { class: 'cv-view' }, 'VIEW')
    ]);
  }

  /* 보드게임형: 실제 프로모션 판 위를 팀 말 넷이 칸을 뛰며 돎 (켜져 있는 동안 계속, 끄면 출발 칸으로)
     track = 판 이미지 기준 칸 가운데 좌표(%) 목록, 출발 칸부터 한 바퀴 순서 */
  var PAWN_LANES = [[-2.1, .9], [-.7, -.5], [.7, .9], [2.1, -.5]];   // 같은 칸에서 겹치지 않게 (판 폭·높이 %)
  function pawnSvg() {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 20 34');
    svg.setAttribute('class', 'pawn-svg');
    [['path', { class: 'pw-pole', d: 'M10 13V1.5' }],
     ['path', { class: 'pw-flag', d: 'M10.6 1.5l7.4 2.9-7.4 2.9z' }],
     ['ellipse', { class: 'pw-base', cx: 10, cy: 30.5, rx: 7.2, ry: 2.6 }],
     ['path', { class: 'pw-body', d: 'M4.2 30c.8-5.6 3-9.4 4-12h3.6c1 2.6 3.2 6.4 4 12z' }],
     ['circle', { class: 'pw-body', cx: 10, cy: 14.6, r: 4.6 }],
     ['ellipse', { class: 'pw-shine', cx: 8.3, cy: 13, rx: 1.4, ry: 1.9 }]
    ].forEach(function (s) {
      var n = document.createElementNS(SVG_NS, s[0]);
      Object.keys(s[1]).forEach(function (k) { n.setAttribute(k, s[1][k]); });
      svg.append(n);
    });
    return svg;
  }
  function boardCover(p, c, hero) {
    var im = toImage(c.image);
    var track = list(c.track).filter(function (t) { return Array.isArray(t) && t.length === 2; });
    var pawns = list(c.pieces).slice(0, 4).map(function (color, i) {
      var lane = PAWN_LANES[i];
      return el('span', { class: 'pawn', style: '--c:' + color + ';left:' + (track[0][0] + lane[0]) + '%;top:' + (track[0][1] + lane[1]) + '%' },
        el('span', { class: 'pawn-hop' }, pawnSvg()));
    });
    var cv = el('div', { class: 'cv cv--board' + (hero ? ' cv--hero' : ''), 'aria-hidden': 'true' }, [
      el('span', { class: 'cv-board', style: im.width && im.height ? 'aspect-ratio:' + im.width + '/' + im.height : null }, [
        el('img', { src: im.src, alt: '', decoding: 'async', loading: hero ? null : 'lazy' }),
        el('span', { class: 'cv-board-card' }, [
          text(c.label) && el('span', { class: 'cv-label' }, c.label),
          text(c.title) && el('strong', { class: 'cv-board-title' }, c.title),
          text(c.note) && el('span', { class: 'cv-board-note' }, c.note)
        ]),
        pawns
      ]),
      el('span', { class: 'cv-view' }, 'VIEW')
    ]);
    var anims = [];
    // 한 바퀴 = 칸 수 × 한 칸. 말마다 속도가 조금씩 달라 서로 앞서거니 뒤서거니 함
    var LAP = [6.0, 6.6, 5.5, 6.3];
    cv._toggle = function (on) {
      if (reduceMQ.matches || !track.length || typeof Element.prototype.animate !== 'function') return;
      if (on && anims.length) return;
      anims.forEach(function (a) { a.cancel(); });
      anims = [];
      if (!on) {
        pawns.forEach(function (pw) { pw.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' }); });
        return;
      }
      pawns.forEach(function (pw, i) {
        var lane = PAWN_LANES[i], n = track.length, lap = LAP[i % LAP.length] * 1000, delay = i * 140;
        var frames = track.concat([track[0]]).map(function (t, j) {
          return { offset: j / n, left: (t[0] + lane[0]) + '%', top: (t[1] + lane[1]) + '%', easing: 'cubic-bezier(.22,1,.36,1)' };
        });
        anims.push(pw.animate(frames, { duration: lap, delay: delay, iterations: Infinity }));
        anims.push(pw.firstChild.animate([
          { transform: 'translateY(0)', easing: 'cubic-bezier(.25,.6,.45,1)' },
          { transform: 'translateY(-42%)', offset: .45, easing: 'cubic-bezier(.55,0,.75,.4)' },
          { transform: 'translateY(0)' }
        ], { duration: lap / n, delay: delay, iterations: Infinity }));
      });
    };
    return cv;
  }

  /* 책형: 게시한 카드뉴스 전부를 엮은 잡지. 넘김은 StPageFlip(js/page-flip.browser.js, MIT)으로 —
     모서리부터 종이가 휘며 넘어가고 그림자가 생김. pages[0] = 앞표지, 마지막 = 뒤표지(단단한 장).
     목차 카드: 올리거나 고르면 표지가 열리고 stops(쪽 번호) 차례로 펼침면을 넘겨 보여 줌, 떼면 표지로 돌아감.
     상세: 한 번 넘겨 보인 뒤 직접 끌거나 눌러 끝까지 넘겨 볼 수 있음. 이미지는 지금 펼침면 앞뒤만 불러옴 */
  // 넘김 시간(ms): 목차·상세에서 올리면 표지 열기 + 세 번 넘김이 약 1.5초 안에 끝남. 직접 넘길 때는 조금 여유 있게
  var BOOK_OPEN = 420, BOOK_FLIP = 320, BOOK_GAP = 50, BOOK_CLOSE = 380, BOOK_HAND = 560;
  // 책 넘김 라이브러리는 책이 있는 페이지에서만, 이 파일 옆(js/)에서 불러옴
  var pageFlipLoad = null;
  function loadPageFlip() {
    if (window.St && St.PageFlip) return Promise.resolve();
    if (!pageFlipLoad) pageFlipLoad = new Promise(function (ok, fail) {
      var sc = document.createElement('script');
      sc.src = new URL('page-flip.browser.js' + new URL(SCRIPT_SRC).search, SCRIPT_SRC).href;   // 같은 배포 버전(?v=)으로
      sc.onload = ok; sc.onerror = fail;
      document.head.append(sc);
    });
    return pageFlipLoad;
  }
  function bookCover(p, c, hero) {
    var pages = list(c.pages).map(toImage).filter(Boolean);
    var last = pages.length - 1;
    var stops = list(c.stops).map(Number).filter(function (n) { return n > 0 && n < last; });
    if (!stops.length) stops = [1];
    var pageEls = pages.map(function (im, i) {
      var img = el('img', { alt: '', decoding: 'async', draggable: 'false' });
      img.dataset.src = im.src;
      return el('div', { class: 'bk-page' + (i === 0 || i === last ? ' is-cover' : ''), 'data-density': i === 0 || i === last ? 'hard' : 'soft' }, img);
    });
    function load(from, to) {
      for (var i = Math.max(0, from); i <= Math.min(last, to); i++) {
        var img = pageEls[i].firstChild;
        if (!img.src) img.src = img.dataset.src;
      }
    }
    var bookEl = el('div', { class: 'bk' }, pageEls);   // 라이브러리가 없을 때도 앞표지는 보임
    load(0, 0);
    var shift = el('span', { class: 'cv-book-in is-front' }, bookEl);
    var markImg = toImage(c.markImage);
    var cv = el('div', { class: 'cv cv--book' + (hero ? ' cv--hero' : ''), 'aria-hidden': 'true' }, [
      el('span', { class: 'cv-book-glow' }),
      el('span', { class: 'cv-book' }, shift),
      el('span', { class: 'cv-mark' }, [markImg && el('img', { src: markImg.src, alt: '' }), p.name]),
      text(c.caption) && el('span', { class: 'cv-book-cap' }, hero ? [c.caption, el('span', { class: 'cv-book-hint' }, ' · 책장을 끌거나 눌러 넘겨 보세요')] : c.caption),
      el('span', { class: 'cv-view' }, 'VIEW')
    ]);

    var pf = null, want = false, step = 0, timer = null;
    // 닫힌 앞표지·뒤표지는 한 쪽뿐이라 책을 가운데로 옮김
    function place(n) {
      shift.classList.toggle('is-front', n === 0);
      shift.classList.toggle('is-back', n >= last);
    }
    // StPageFlip 은 넘기는 거리(px)에 비례해 시간을 줄이므로, 원하는 시간이 되게 flippingTime 을 맞춤
    function flipTime(ms) {
      var r = pf.getBoundsRect();
      pf.getSettings().flippingTime = ms / Math.min(1, Math.max(1, 2 * r.pageWidth) / 1000);
    }
    function go(n, ms) {
      load(n - 2, n + 3);
      place(n);
      flipTime(ms);
      pf.flip(n);
      timer = setTimeout(next, ms + BOOK_GAP);
    }
    function next() {
      timer = null;
      if (!pf) return;
      var cur = pf.getCurrentPageIndex();
      if (!want) { if (cur !== 0) go(0, BOOK_CLOSE); else flipTime(BOOK_HAND); return; }
      while (step < stops.length && stops[step] === cur) step++;
      if (step < stops.length) go(stops[step], step++ === 0 && cur === 0 ? BOOK_OPEN : BOOK_FLIP);
      else flipTime(BOOK_HAND);   // 자동 넘김이 끝나면 직접 넘길 때의 속도로
    }
    function init() {
      if (pf) return true;
      if (!window.St || !St.PageFlip) { loadPageFlip().then(function () { if (init()) apply(); }, function () {}); return false; }
      if (!cv.isConnected || !bookEl.clientWidth) return false;
      load(0, 2);
      pf = new St.PageFlip(bookEl, {
        width: 400, height: 500, size: 'stretch', minWidth: 60, maxWidth: 1400, minHeight: 75, maxHeight: 1750,
        showCover: true, usePortrait: false, autoSize: true, drawShadow: true, maxShadowOpacity: .5,
        flippingTime: BOOK_HAND, mobileScrollSupport: false, useMouseEvents: hero, showPageCorners: hero
      });
      pf.loadFromHTML(pageEls);
      pf.on('flip', function (e) { load(e.data - 3, e.data + 4); if (!timer) place(e.data); });
      pf.on('changeState', function (e) { if (e.data === 'user_fold' || e.data === 'fold_corner') { var cur = pf.getCurrentPageIndex(); load(cur - 3, cur + 4); place(-1); } });
      if (hero && reduceMQ.matches) { load(0, stops[stops.length - 1] + 2); pf.turnToPage(stops[stops.length - 1]); place(pf.getCurrentPageIndex()); }
      return true;
    }
    var wish = false;   // 켜짐 요청. 라이브러리를 불러오는 중이면 다 불러온 뒤 apply()
    function apply() {
      if (reduceMQ.matches || wish === want) return;   // 모션 축소: 자동으로 넘기지 않음 (상세는 펼친 면에서 직접 넘김)
      want = wish;
      if (want) step = 0;
      if (!timer) next();
    }
    cv._toggle = function (on) {
      wish = on;
      if (reduceMQ.matches && !hero) return;
      if (init()) apply();
    };
    // 화면 가까이 오면 미리 만들어 둠 (크기를 잴 수 있어야 함)
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting && init()) io.disconnect();
      }, { rootMargin: '300px 0px' });
      io.observe(cv);
    }
    return cv;
  }

  /* 비행형: 같은 블로그의 하루 조회 — 오목눈이 한 마리(에세이)가 낮게 날아가는데,
     공연 정보 글로 바꾸자 저 높이에서 새 오목눈이가 빠르게 날아 들어옴. 높이는 비유(실제 비율 아님), 숫자는 확인된 값 */
  function svgAdd(parent, items) {
    items.forEach(function (s) {
      var node = document.createElementNS(SVG_NS, s[0]);
      Object.keys(s[1] || {}).forEach(function (k) { node.setAttribute(k, s[1][k]); });
      if (s[2]) svgAdd(node, s[2]);
      parent.append(node);
    });
    return parent;
  }
  function cloud(x, y, sc) {
    return ['g', { class: 'fl-cloud', transform: 'translate(' + x + ' ' + y + ') scale(' + sc + ')' }, [
      ['ellipse', { cx: 0, cy: 0, rx: 7, ry: 3.6 }], ['ellipse', { cx: 6.5, cy: -2.6, rx: 5.6, ry: 4.4 }],
      ['ellipse', { cx: 12.5, cy: -.4, rx: 6, ry: 3.6 }], ['ellipse', { cx: 6.5, cy: 1.4, rx: 10, ry: 2.4 }]
    ]];
  }
  // 오목눈이: 흰 둥근 몸, 굵은 검은 눈썹줄, 분홍빛 옆구리, 긴 꼬리 (오른쪽을 봄, 원점이 몸 가운데)
  var TIT = [
    ['path', { class: 'tt-tail', d: 'M-3.2-.2L-15 1.9c-.4.5-.2.9.3 1L-2.6 2.2z' }],
    ['ellipse', { class: 'tt-body', cx: 0, cy: .4, rx: 4.8, ry: 3.7 }],
    ['path', { class: 'tt-flank', d: 'M-3.6 1.3c1.6 2.4 5 2.9 7.2 1.2-1.6.2-4.6.1-7.2-1.2z' }],
    ['path', { class: 'tt-back', d: 'M-4.2-.6c1.4-2.6 4.6-3.3 6.6-2.1-2.4-.2-4.6.7-6.6 2.1z' }],
    ['circle', { class: 'tt-body', cx: 3.4, cy: -1.5, r: 2.7 }],
    ['path', { class: 'tt-brow', d: 'M1.4-3.1c1.5-.9 3.5-.8 4.6.3l-.3.6c-1.2-.7-2.8-.8-4.1-.1z' }],
    ['circle', { class: 'tt-eye', cx: 4.6, cy: -1.5, r: .55 }],
    ['path', { class: 'tt-beak', d: 'M5.9-1.4l1.3.4-1.3.4z' }],
    ['path', { class: 'tt-wing', d: 'M-2.2-.4c.6-4.2 4.4-6.2 6-5.4-.6 1.6-2.2 4-3.6 5.6z' }]
  ];
  var LOW = [40, 72], HIGH = [112, 26];   // 낮게 나는 새(에세이) · 높이 나타나는 새(공연 정보 글)
  function birdAt(pos, scale, extra) {
    return ['g', { class: 'fl-bob' }, [['g', { transform: 'translate(' + pos[0] + ' ' + pos[1] + ')' }, (extra || []).concat([['g', { class: 'fl-bird', transform: 'scale(' + scale + ')' }, TIT]])]]];
  }
  function flightSvg() {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 160 100');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.setAttribute('class', 'fl-svg');
    return svgAdd(svg, [
      ['g', { class: 'fl-clouds is-hi' }, [cloud(18, 4, 1.1), cloud(76, 12, .8), cloud(134, 2, 1.2)]],
      ['g', { class: 'fl-clouds is-mid' }, [cloud(96, 44, .9), cloud(142, 54, .7), cloud(58, 50, .6)]],
      ['path', { class: 'fl-hills', d: 'M0 84c14-6 26-7 40-3s26 2 40-4 30-5 44 0 26 4 36 1V100H0z' }],
      ['path', { class: 'fl-trees', d: 'M0 93c1.3 -4.5 7.6 -4.5 9 0c1.5 -3.5 8.5 -3.5 10 0c1.1 -3.5 6.0 -3.5 7 0c1.3 -3.5 7.6 -3.5 9 0c1.2 -3.5 6.8 -3.5 8 0c1.1 -6.5 6.0 -6.5 7 0c1.5 -3.5 8.5 -3.5 10 0c1.2 -3.5 6.8 -3.5 8 0c1.5 -3.5 8.5 -3.5 10 0c1.1 -4.5 6.0 -4.5 7 0c1.1 -6.5 6.0 -6.5 7 0c1.1 -4.5 6.0 -4.5 7 0c1.1 -4.5 6.0 -4.5 7 0c1.3 -6.5 7.6 -6.5 9 0c1.2 -3.5 6.8 -3.5 8 0c1.3 -4.5 7.6 -4.5 9 0c1.1 -4.5 6.0 -4.5 7 0c1.3 -3.5 7.6 -3.5 9 0c1.1 -3.5 6.0 -3.5 7 0c1.2 -6.5 6.8 -6.5 8 0V100H0z' }],
      ['path', { class: 'fl-line is-low', d: 'M6 ' + (LOW[1] + 4) + 'H154' }],
      ['path', { class: 'fl-line is-high', d: 'M72 ' + (HIGH[1] + 5) + 'H154' }],   // 왼쪽 위 숫자와 겹치지 않게 오른쪽만
      ['g', { class: 'fl-a' }, [birdAt(LOW, 1.3)]],
      ['g', { class: 'fl-b' }, [birdAt(HIGH, 1.7, [
        ['circle', { class: 'fl-glow', r: 15 }],
        ['g', { class: 'fl-streaks' }, [
          ['path', { d: 'M-9-2H-44' }], ['path', { d: 'M-8 1.5H-58' }], ['path', { d: 'M-10 5H-38' }]
        ]]
      ])]]
    ]);
  }
  function flightCover(p, c, hero) {
    var from = c.from || {}, to = c.to || {};
    var unit = text(c.unit);
    function stage(s, cls) {
      return el('span', { class: 'fl-stage ' + cls }, [text(s.label), text(s.note) && el('span', { class: 'fl-stage-note' }, s.note)]);
    }
    return el('div', { class: 'cv cv--flight' + (hero ? ' cv--hero' : ''), 'aria-hidden': 'true' }, [
      el('span', { class: 'fl-sky-hi' }),
      flightSvg(),
      el('span', { class: 'fl-copy' }, [
        text(c.label) && el('span', { class: 'cv-label' }, c.label),
        el('strong', { class: 'fl-count', style: '--from:' + (+from.value || 0) + ';--to:' + (+to.value || 0) }, el('span', { class: 'fl-unit' }, unit)),
        el('span', { class: 'fl-stages' }, [stage(from, 'is-from'), stage(to, 'is-to')])
      ]),
      el('span', { class: 'fl-tag is-low' }, [text(from.label), ' · ', (+from.value || 0) + unit]),
      el('span', { class: 'fl-tag is-high' }, [text(to.label), ' · ', (+to.value || 0) + unit]),
      el('span', { class: 'cv-view' }, 'VIEW')
    ]);
  }

  /* 영상형: 실제 사이트를 쓰는 화면을 브라우저 창 안에서 재생 (목차에선 올리거나 고를 때만, 상세에선 반복)
     모션 축소 설정이면 자동 재생하지 않고 첫 화면(poster)만 */
  function videoCover(p, c, hero) {
    var video = el('video', { class: 'cv-video', muted: true, playsinline: true, loop: true, preload: hero ? 'auto' : 'metadata', poster: text(c.poster) || null, disablepictureinpicture: true });
    video.muted = true;
    if (text(c.webm)) video.append(el('source', { src: c.webm, type: 'video/webm' }));
    video.append(el('source', { src: c.src, type: 'video/mp4' }));
    // frame: "phone" = 휴대폰 크기 앱(세로 영상)을 휴대폰 틀 안에, 그 밖에는 브라우저 창 안에
    var phone = c.frame === 'phone';
    var cv = el('div', { class: 'cv cv--video' + (phone ? ' cv--phone' : '') + (hero ? ' cv--hero' : ''), 'aria-hidden': 'true' }, phone ? [
      el('span', { class: 'cv-phone' }, el('span', { class: 'cv-phone-screen' }, video)),
      text(c.url) && el('span', { class: 'cv-phone-url' }, c.url),
      el('span', { class: 'cv-view' }, 'VIEW')
    ] : [
      el('span', { class: 'cv-browser' }, [
        el('span', { class: 'cv-browser-dots' }, [el('i'), el('i'), el('i')]),
        text(c.url) && el('span', { class: 'cv-browser-url' }, c.url)
      ]),
      el('span', { class: 'cv-screen' }, video),
      el('span', { class: 'cv-view' }, 'VIEW')
    ]);
    // 목차: 카드가 화면 가까이 오면 미리 받아 둬서 올리자마자 재생
    if (!hero && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { video.preload = 'auto'; io.disconnect(); } }, { rootMargin: '300px 0px' });
      io.observe(cv);
    }
    cv._toggle = function (on) {
      if (reduceMQ.matches) return;
      if (on) { var pr = video.play(); if (pr && pr.catch) pr.catch(function () {}); }
      else { video.pause(); try { video.currentTime = 0; } catch (e) {} }
    };
    return cv;
  }

  function coverArt(p, hero) {
    var c = p.cover || {};
    if (c.type === 'metric' && text(c.value) && list(c.groups).length) return metricCover(p, c, hero);
    if (c.type === 'symbol' && SYMBOLS[c.symbol]) return symbolCover(p, c, hero);
    if (c.type === 'board' && toImage(c.image) && list(c.track).length && list(c.pieces).length) return boardCover(p, c, hero);
    if (c.type === 'book' && list(c.pages).length > 1) return bookCover(p, c, hero);
    if (c.type === 'flight' && c.from && c.to) return flightCover(p, c, hero);
    if (c.type === 'video' && text(c.src)) return videoCover(p, c, hero);
    return null;
  }
  // 소표지 켜기: CSS 쪽은 .is-on, 스크립트로 움직이는 소표지(board·video)는 _toggle 도 부름
  function coverOn(cv) {
    cv.classList.add('is-on');
    if (cv._toggle) cv._toggle(true);
  }

  /* ---------- 프로젝트 목차: 대표 2열 + 분야별 3열 묶음 ---------- */
  function cardPlaceholder(p) {
    return el('div', { class: 'media-ph', 'aria-hidden': 'true' }, [
      el('span', { class: 'media-ph-name' }, p.name),
      el('span', { class: 'media-ph-note' }, '대표 이미지 준비 중')
    ]);
  }

  // 썸네일: 소표지 → 대표 이미지 → 이름만 있는 대기 화면 순
  function projectCard(p, headingTag) {
    var media = el('div', { class: 'card-media' });
    var art = coverArt(p, false);
    var cover = toImage(p.image);
    if (art) {
      media.classList.add('has-cover');
      media.append(art);
    } else if (cover) {
      if (text(cover.bg)) media.style.background = cover.bg;
      var img = imageNode(cover, { alt: p.name + ' 대표 화면', lazy: true });
      img.addEventListener('error', function () { media.style.background = ''; img.replaceWith(cardPlaceholder(p)); });
      media.append(img);
    } else {
      media.append(cardPlaceholder(p));
    }
    var cats = categories(p);
    var role = roleText(p);
    var problem = text(p.displayProblem) || text(p.desc);
    var card = el('li', { class: 'card' });
    if (art && art._toggle) {
      var hovered = false, focused = false;
      var sync = function () { if (!art.classList.contains('is-on')) art._toggle(hovered || focused); };
      card.addEventListener('mouseenter', function () { hovered = true; sync(); });
      card.addEventListener('mouseleave', function () { hovered = false; sync(); });
      card.addEventListener('focusin', function () { focused = true; sync(); });
      card.addEventListener('focusout', function () { focused = false; sync(); });
    }
    return append(card, [
      media,
      el('div', { class: 'card-body' }, [
        cats.length > 0 && el('p', { class: 'card-cats' }, cats.join(' · ')),
        el(headingTag, { class: 'card-title' }, el('a', { class: 'card-link', href: detailHref(p.id) }, p.name)),
        problem && el('p', { class: 'card-problem' }, problem),
        role && el('p', { class: 'card-role' }, [el('span', { class: 'k' }, '역할'), role])
      ])
    ]);
  }

  // 묶음은 site-content.js 의 projectGroups 순서대로. 어느 묶음에도 없는 프로젝트는 마지막 묶음으로
  function projectGroups() {
    var byId = {}, used = {};
    PROJECTS.forEach(function (p) { byId[p.id] = p; });
    var groups = list(SITE.projectGroups).map(function (g) {
      return {
        title: text(g.title), desc: text(g.desc), featured: g.layout === 'featured',
        items: list(g.ids).map(function (id) { return byId[id]; }).filter(function (p) { return p && !used[p.id] && (used[p.id] = true); })
      };
    }).filter(function (g) { return g.items.length; });
    var rest = PROJECTS.filter(function (p) { return !used[p.id]; });
    if (rest.length) groups.push({ title: groups.length ? '그 밖의 작업' : '', desc: '', featured: !groups.length, items: rest });
    return groups;
  }

  function renderProjects(section) {
    var root = section.querySelector('[data-toc]');
    var groups = projectGroups();
    if (!groups.length) {
      root.replaceChildren(el('div', { class: 'placeholder' }, el('div', null, [el('strong', null, '준비 중'), '프로젝트 자료를 정리하고 있습니다.'])));
      return;
    }
    root.replaceChildren();
    groups.forEach(function (g, gi) {
      var hid = 'toc-group-' + (gi + 1);
      append(root, el('section', { class: 'toc-group', 'aria-labelledby': g.title ? hid : null }, [
        g.title && el('div', { class: 'toc-group-head' }, [
          el('h3', { id: hid }, g.title),
          el('span', { class: 'toc-group-n' }, g.items.length + '개')
        ]),
        g.desc && el('p', { class: 'toc-group-desc' }, g.desc),
        el('ul', { class: 'project-grid ' + (g.featured ? 'is-featured' : 'is-compact') },
          g.items.map(function (p) { return projectCard(p, g.title ? 'h4' : 'h3'); }))
      ]));
    });

    // 목차 아래 짧은 기록 (예: 실패 기록). 상세 페이지 없이 한 줄로
    var notes = list(SITE.projectNotes).filter(function (n) { return n && text(n.text); });
    if (notes.length) root.append(el('div', { class: 'toc-notes' }, notes.map(function (n) {
      return el('p', { class: 'toc-note' }, [text(n.label) && el('span', { class: 'toc-note-k' }, n.label), el('span', null, n.text)]);
    })));

    // 마우스가 없는 기기: 카드가 화면에 충분히 들어오면 소표지를 한 번 펼침
    if (matchMedia('(hover: none)').matches && !reduceMQ.matches && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { coverOn(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.6 });
      root.querySelectorAll('.cv').forEach(function (c) { io.observe(c); });
    }
  }

  /* ---------- 프로젝트 상세: 소표지 → 구성 지도 → 문제 / 판단 근거 / 설계·실행 / 결과·한계 ---------- */
  var SECTIONS = [
    { id: 'problem', name: '문제', body: function (p) { return blocks(p.problem); },
      pending: function () { return '풀고자 한 문제를 정리해 추가합니다.'; } },
    { id: 'judgment', name: '판단 근거', body: function (p) { return blocks(p.judgmentEvidence); },
      pending: function () { return '판단의 근거가 된 관찰·자료를 확인한 뒤 정리합니다.'; } },
    { id: 'build', name: '설계·실행', body: function (p) { return blocks(p.approach); }, images: true,
      pending: function () { return '설계와 실행 과정을 정리해 추가합니다.'; } },
    { id: 'result', name: '결과·한계', body: function (p) { return blocks(p.outcome).concat(blocks(p.limitations)); },
      learned: function (p) { return blocks(p.learned); },
      // 확인된 결과가 없으면 evidence(보완할 자료 메모)를 '보완 예정'으로만 보여 줌
      pending: function (p) { return text(p.evidence) || '확인된 결과와 한계를 정리해 추가합니다.'; } }
  ];

  function isIndexUrl(url) {
    try {
      var u = new URL(url), here = new URL('./', location.href);
      return u.origin === here.origin && (u.pathname === here.pathname || u.pathname === here.pathname + 'index.html');
    } catch (e) { return false; }
  }
  // 목차에서 들어왔으면 뒤로 가기로 돌아가 스크롤 위치까지 그대로 복원
  function backToList(a) {
    a.addEventListener('click', function (e) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (history.length > 1 && isIndexUrl(document.referrer)) { e.preventDefault(); history.back(); }
    });
    return a;
  }

  function figure(im, alt) {
    var f = el('figure', { class: 'story-figure' + (text(im.video) ? ' is-video' : '') + (text(im.video) && im.height > im.width ? ' is-portrait' : '') });
    var media;
    if (text(im.video)) {
      // 시연 영상: 소리 없음, 직접 재생(controls). 설명은 aria-label 로
      media = el('video', { controls: true, playsinline: true, muted: true, preload: 'none', poster: im.src, 'aria-label': text(im.alt) || alt });
      media.muted = true;
      if (im.width && im.height) { media.width = im.width; media.height = im.height; }
      if (text(im.webm)) media.append(el('source', { src: im.webm, type: 'video/webm' }));
      media.append(el('source', { src: im.video, type: 'video/mp4' }));
    } else {
      media = imageNode(im, { alt: alt, lazy: true });
      media.addEventListener('error', function () { f.remove(); });
    }
    append(f, [media, text(im.caption) && el('figcaption', null, im.caption)]);
    return f;
  }

  /* 서비스 교육(선택 섹션 p.training): 직접 만든 트레이닝북을 한 쪽씩 넘겨 보고,
     네 장의 구성·선 서비스 문장·현장 사례·인정받은 기록을 함께 보여 줌. 글은 모두 데이터에 적힌 그대로.
     넘김: 지금 쪽이 왼쪽 모서리를 축으로 들려 넘어가고(그림자), 아래 다음 쪽이 드러남. 버튼·방향키·밀기 */
  function trainingBook(t) {
    var pages = list(t.pages).map(toImage).filter(Boolean);
    var last = pages.length - 1, cur = 0, anim = null;
    var pageEls = pages.map(function (im, i) {
      var img = el('img', { alt: text(im.alt) || (t.title + ' ' + (i + 1) + '쪽'), decoding: 'async', draggable: 'false' });
      if (im.width && im.height) { img.width = im.width; img.height = im.height; }
      img.dataset.src = im.src;
      return el('div', { class: 'tb-page' + (i === 0 ? ' is-now' : ''), 'aria-hidden': i === 0 ? null : 'true' }, [img, el('span', { class: 'tb-shade' })]);
    });
    function load(from, to) {
      for (var i = Math.max(0, from); i <= Math.min(last, to); i++) { var img = pageEls[i].firstChild; if (!img.src) img.src = img.dataset.src; }
    }
    var bookEl = el('div', { class: 'tb-book' }, pageEls);
    var counter = el('span', { class: 'tb-count', 'aria-live': 'polite' });
    var prev = el('button', { class: 'tb-btn', type: 'button', 'aria-label': '이전 쪽' }, icon('left'));
    var next = el('button', { class: 'tb-btn', type: 'button', 'aria-label': '다음 쪽' }, icon('right'));
    function show(n) {
      pageEls.forEach(function (pg, i) {
        pg.classList.toggle('is-now', i === n);
        pg.classList.remove('is-under');
        if (i === n) pg.removeAttribute('aria-hidden'); else pg.setAttribute('aria-hidden', 'true');
      });
      cur = n;
      counter.textContent = (n + 1) + ' / ' + pages.length;
      prev.disabled = n <= 0; next.disabled = n >= last;
      load(n - 1, n + 2);
    }
    var TURN = [
      { transform: 'perspective(2200px) rotateY(0deg)' },
      { transform: 'perspective(2200px) rotateY(-96deg)' }
    ];
    function go(d) {
      var n = cur + d;
      if (n < 0 || n > last) return;
      if (anim) anim.finish();
      load(n, n);
      if (reduceMQ.matches || typeof bookEl.animate !== 'function') return show(n);
      // 앞으로: 지금 쪽이 넘어가며 다음 쪽이 드러남 / 뒤로: 이전 쪽이 되돌아와 덮음
      var mover = d > 0 ? pageEls[cur] : pageEls[n];
      var under = d > 0 ? pageEls[n] : pageEls[cur];
      under.classList.add('is-under');
      mover.classList.add('is-turning');
      var opts = { duration: 620, easing: 'cubic-bezier(.45, .05, .3, 1)' };
      anim = mover.animate(d > 0 ? TURN : TURN.slice().reverse(), opts);
      mover.lastChild.animate(d > 0 ? [{ opacity: 0 }, { opacity: .55 }] : [{ opacity: .55 }, { opacity: 0 }], opts);
      under.lastChild.animate(d > 0 ? [{ opacity: .35 }, { opacity: 0 }] : [{ opacity: 0 }, { opacity: .35 }], opts);
      anim.onfinish = function () { anim = null; mover.classList.remove('is-turning'); show(n); };
    }
    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    // 밀어서 넘기기 (손가락·마우스)
    var sx = null;
    bookEl.addEventListener('pointerdown', function (e) { sx = e.clientX; });
    bookEl.addEventListener('pointerup', function (e) {
      if (sx == null) return;
      var dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      else if (e.pointerType === 'mouse') go(e.offsetX > bookEl.clientWidth / 2 ? 1 : -1);   // 누르면 누른 쪽으로
    });
    var fig = el('figure', { class: 'tb', tabindex: '0', 'aria-label': t.title + ' 넘겨 보기 (왼쪽·오른쪽 방향키)' }, [
      el('div', { class: 'tb-stage' }, bookEl),
      el('figcaption', { class: 'tb-bar' }, [
        el('span', { class: 'tb-title' }, [el('strong', null, t.title), text(t.meta) && el('span', null, t.meta)]),
        el('span', { class: 'tb-nav' }, [prev, counter, next])
      ])
    ]);
    fig.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    });
    load(0, 0);
    show(0);
    return fig;
  }

  function trainingSection(t) {
    var c = t.case || {}, r = t.recognition || {};
    var rImg = toImage(r.image);
    return el('div', { class: 'training' }, [
      text(t.intro) && el('p', { class: 'training-intro' }, t.intro),
      list(t.pages).length > 0 && trainingBook(t),
      text(t.pagesNote) && el('p', { class: 'training-note' }, t.pagesNote),
      list(t.chapters).length > 0 && el('ol', { class: 'tr-chapters' }, list(t.chapters).map(function (ch) {
        return el('li', null, [el('span', { class: 'tr-no' }, ch.no), el('strong', null, ch.name), el('p', null, ch.text)]);
      })),
      list(t.phrases).length > 0 && el('div', { class: 'tr-phrases' }, [
        text(t.phrasesLabel) && el('p', { class: 'tr-k' }, t.phrasesLabel),
        el('ul', null, list(t.phrases).map(function (q) { return el('li', null, '“' + q + '”'); }))
      ]),
      list(c.steps).length > 0 && el('div', { class: 'tr-case' }, [
        text(c.label) && el('p', { class: 'tr-k' }, c.label),
        el('ol', null, list(c.steps).map(function (st) { return el('li', null, st); })),
        text(c.quote) && el('blockquote', null, '“' + c.quote + '”'),
        text(c.note) && el('p', { class: 'tr-note' }, c.note)
      ]),
      (rImg || r.quote || list(r.awards).length) && el('div', { class: 'tr-proof' }, [
        rImg && figure(rImg, '선정 증서'),
        el('div', { class: 'tr-proof-side' }, [
          r.quote && text(r.quote.text) && el('blockquote', { class: 'tr-voice' }, [el('p', null, '“' + r.quote.text + '”'), text(r.quote.source) && el('cite', null, r.quote.source)]),
          list(r.awards).map(function (a) { return el('div', { class: 'tr-award' }, [el('span', null, a.k), el('strong', null, a.v)]); })
        ])
      ])
    ]);
  }

  function renderDetail(root) {
    var id = new URLSearchParams(location.search).get('id');
    var index = -1;
    PROJECTS.some(function (p, i) { if (p.id === id) { index = i; return true; } return false; });
    if (index < 0) return renderNotFound(root);

    var p = PROJECTS[index];
    var cats = categories(p);
    var role = roleText(p);
    var period = text(p.period);
    var link = safeUrl(p.link);
    var lede = text(p.displayProblem) || text(p.desc);
    var isDraft = /^draft/.test(text(p.contentStatus));
    var cover = toImage(p.image);
    var detailImages = list(p.detailImages).map(toImage).filter(Boolean);
    // 대표 이미지는 상세 이미지에 같은 파일이 없을 때만 설계·실행 맨 앞에 둠
    // (로고처럼 작업 화면이 아닌 대표 이미지는 showInDetail: false)
    if (cover && cover.showInDetail !== false && !detailImages.some(function (im) { return im.src === cover.src; })) detailImages.unshift(cover);

    document.title = p.name + ' · 김시언 포트폴리오';
    var md = document.querySelector('meta[name="description"]');
    if (md && lede) md.setAttribute('content', p.name + ' — ' + lede);

    var sections = SECTIONS.map(function (s) {
      var body = s.body(p);
      var imgs = s.images ? detailImages : [];
      var learned = s.learned ? s.learned(p) : [];
      return { s: s, body: body, imgs: imgs, learned: learned, filled: body.length + imgs.length + learned.length > 0 };
    });
    // 선택 섹션: 서비스 교육 자료가 있으면 '설계·실행' 다음에
    if (p.training && typeof p.training === 'object') {
      var at = sections.findIndex(function (x) { return x.s.id === 'build'; }) + 1;
      sections.splice(at, 0, { s: { id: 'training', name: '서비스 교육' }, body: [], imgs: [], learned: [], filled: true, node: trainingSection(p.training) });
    }

    // 소표지: 어두운 면의 점들이 불씨의 온기로 밝아진 뒤 프로젝트명이 드러남 (긴 도입 없이 바로 읽을 수 있음)
    // 목차 카드와 같은 소표지(상징·지표)를 오른쪽에 크게 두고, 등장이 끝나면 한 번 펼침
    var heroArt = coverArt(p, true);
    // 영상은 첫 화면(poster)에서 멈춰 보이지 않게 바로 재생, 나머지는 등장이 끝난 뒤 한 번 펼침
    var heroDelay = reduceMQ.matches || (p.cover && p.cover.type === 'video') ? 0 : 1100;
    if (heroArt) setTimeout(function () { coverOn(heroArt); }, heroDelay);
    var subcover = el('section', { class: 'subcover' + (heroArt ? ' has-cover' : ''), 'aria-labelledby': 'project-title' }, [
      el('div', { class: 'subcover-art', 'aria-hidden': 'true' }, [
        el('span', { class: 'sc-dots' }), el('span', { class: 'sc-dots sc-dots--warm' }), el('span', { class: 'sc-ember' })
      ]),
      heroArt && el('div', { class: 'subcover-cover' }, heroArt),
      el('div', { class: 'subcover-copy' }, [
        el('p', { class: 'subcover-eyebrow' }, ['PROJECT ' + pad(index + 1), cats.length ? ' · ' + cats.join(' · ') : '']),
        el('h1', { id: 'project-title', class: 'subcover-title' }, p.name),
        lede && el('p', { class: 'subcover-lede' }, lede)
      ])
    ]);

    var facts = el('dl', { class: 'facts' }, [
      cats.length > 0 && el('div', null, [el('dt', null, '분야'), el('dd', null, cats.join(' · '))]),
      period && el('div', null, [el('dt', null, '기간'), el('dd', null, period)]),
      role && el('div', null, [el('dt', null, '역할'), el('dd', null, role)]),
      link && el('div', null, [el('dt', null, '링크'), el('dd', null, el('a', { href: link, target: '_blank', rel: 'noopener' }, [text(p.linkLabel) || '프로젝트 보기', icon('up-right')]))])
    ]);

    // 핵심 결과: 데이터에 적힌 확인된 수치만, 숫자 애니메이션 없이
    var metricList = list(p.metrics).filter(function (m) { return m && text(m.value); });
    var metrics = metricList.length > 0 && el('section', { class: 'metrics', 'aria-label': '핵심 결과' }, [
      el('ul', { class: 'metrics-list' }, metricList.map(function (m) {
        return el('li', { class: 'metric' }, [
          text(m.label) && el('span', { class: 'metric-label' }, m.label),
          el('strong', { class: 'metric-value' }, m.value),
          text(m.note) && el('span', { class: 'metric-note' }, m.note)
        ]);
      })),
      text(p.metricsNote) && el('p', { class: 'metrics-note' }, p.metricsNote)
    ]);

    // 구성 지도: 네 단계가 블록으로 이어지고, 정리된 단계와 보완할 단계를 구분 (수치는 쓰지 않음)
    var map = el('nav', { class: 'story-map', 'aria-label': '이 프로젝트의 구성' }, el('ol', null, sections.map(function (x, i) {
      return el('li', { style: '--i:' + i }, el('a', { class: 'step' + (x.filled ? '' : ' is-pending'), href: '#' + x.s.id }, [
        el('span', { class: 'step-mark', 'aria-hidden': 'true' }),
        el('span', { class: 'step-no' }, pad(i + 1)),
        el('span', { class: 'step-name' }, x.s.name),
        !x.filled && el('span', { class: 'step-state' }, '보완 예정')
      ]));
    })));

    var story = el('div', { class: 'story' }, sections.map(function (x, i) {
      var body = el('div', { class: 'story-body' + (x.node ? ' is-wide' : '') });
      append(body, renderBlocks(x.body));
      if (x.node) body.append(x.node);
      if (x.imgs.length) {
        var figs = x.imgs.map(function (im, k) { return figure(im, p.name + ' 작업 화면 ' + (k + 1)); });
        body.append(figs.length > 1 ? el('div', { class: 'story-gallery' }, figs) : figs[0]);
      }
      if (x.learned.length) body.append(el('div', { class: 'learned' }, [el('p', { class: 'learned-k' }, '배운 점'), renderBlocks(x.learned)]));
      if (!x.filled) body.append(el('p', { class: 'pending' }, [el('span', { class: 'pending-tag' }, '보완 예정'), el('span', null, x.s.pending(p))]));
      return el('section', { class: 'story-section', id: x.s.id, 'aria-labelledby': x.s.id + '-title' }, [
        el('div', { class: 'story-head' }, [el('span', { class: 'story-no' }, pad(i + 1)), el('h2', { id: x.s.id + '-title' }, x.s.name)]),
        body
      ]);
    }));

    var prev = PROJECTS[index - 1], next = PROJECTS[index + 1];
    var pager = el('nav', { class: 'pager', 'aria-label': '다른 프로젝트' }, [
      prev ? el('a', { class: 'pager-link is-prev', href: detailHref(prev.id) }, [el('span', { class: 'pager-k' }, [icon('left'), '이전 프로젝트']), el('span', { class: 'pager-name' }, prev.name)]) : el('span'),
      backToList(el('a', { class: 'pill-link pager-list', href: './#projects' }, '프로젝트 목록')),
      next ? el('a', { class: 'pager-link is-next', href: detailHref(next.id) }, [el('span', { class: 'pager-k' }, ['다음 프로젝트', icon('right')]), el('span', { class: 'pager-name' }, next.name)]) : el('span')
    ]);

    root.replaceChildren();
    append(root, [
      backToList(el('a', { class: 'back-link', href: './#projects' }, [icon('left'), '프로젝트 목록'])),
      subcover,
      el('div', { class: 'project-body', id: 'project-body', tabindex: '-1' }, [
        facts,
        metrics,
        isDraft && el('p', { class: 'draft-note' }, '이 페이지의 설명은 정리 중인 초안입니다. 담당 역할과 결과는 자료를 확인한 뒤 추가합니다.'),
        map,
        story,
        pager
      ])
    ]);

    // 새로고침·직접 진입 시 #problem 같은 구간 주소로 이동
    if (location.hash.length > 1) {
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) requestAnimationFrame(function () { target.scrollIntoView(); });
    }
  }

  function renderNotFound(root) {
    document.title = '프로젝트를 찾을 수 없음 · 김시언 포트폴리오';
    root.replaceChildren(el('section', { class: 'not-found', id: 'project-body', tabindex: '-1' }, [
      el('p', { class: 'section-label' }, 'PROJECT'),
      el('h1', null, '프로젝트를 찾을 수 없습니다'),
      el('p', null, '주소가 바뀌었거나 아직 준비 중인 프로젝트입니다.'),
      el('a', { class: 'pill-link', href: './#projects' }, [el('span', null, '프로젝트 목록으로'), icon('right')])
    ]));
  }

  /* ---------- 자기소개 페이지 (about.html) ----------
     남색 판(이름 · 키워드 · 한 문장 · 사진 순환) → 소개 → 이력(학력 · 경력·교육 · 수상 · 활동) → 사용 툴 → 연락처
     이력은 site-content.js 의 profile 에 적힌 것만, 관련 프로젝트는 상세 페이지로 이어짐 */
  function renderMe(root) {
    var prof = SITE.profile || {};
    var about = SITE.about || {};
    var c = SITE.contact || {};
    var email = text(c.email);
    var links = list(c.links).map(function (l) { return { label: text(l.label) || text(l.url), url: safeUrl(l.url) }; }).filter(function (l) { return l.url; });
    var byId = {};
    PROJECTS.forEach(function (p) { byId[p.id] = p; });

    var media = el('div', { class: 'me-hero-media', 'data-about-media': '' });
    var hero = el('section', { class: 'subcover me-hero', 'aria-labelledby': 'me-title' }, [
      el('div', { class: 'subcover-art', 'aria-hidden': 'true' }, [
        el('span', { class: 'sc-dots' }), el('span', { class: 'sc-dots sc-dots--warm' }), el('span', { class: 'sc-ember' })
      ]),
      el('div', { class: 'subcover-copy me-hero-copy' }, [
        el('p', { class: 'subcover-eyebrow' }, 'ABOUT ME · 자기소개'),
        el('h1', { id: 'me-title', class: 'subcover-title' }, text(SITE.name) || '김시언'),
        text(SITE.role) && el('p', { class: 'me-role' }, SITE.role),
        text(prof.tagline) && el('p', { class: 'subcover-lede' }, prof.tagline),
        text(SITE.keyword) && el('div', { class: 'me-keyword' }, [
          el('span', { class: 'me-keyword-k' }, 'KEYWORD'),
          el('strong', { class: 'me-keyword-v' }, SITE.keyword),
          text(SITE.definition) && el('p', { class: 'me-keyword-d' }, SITE.definition)
        ])
      ]),
      media
    ]);

    var no = 0;
    function section(id, title, body) {
      no += 1;
      return el('section', { class: 'story-section', id: id, 'aria-labelledby': id + '-title' }, [
        el('div', { class: 'story-head' }, [el('span', { class: 'story-no' }, pad(no)), el('h2', { id: id + '-title' }, title)]),
        el('div', { class: 'story-body' }, body)
      ]);
    }
    function projectLinks(ids) {
      var ps = list(ids).map(function (id) { return byId[id]; }).filter(Boolean);
      return ps.length > 0 && el('p', { class: 'me-projects' }, ps.map(function (p) {
        return el('a', { class: 'me-project', href: detailHref(p.id) }, [p.name, icon('right')]);
      }));
    }

    var parts = [];
    var intro = paras(about.paragraphs);
    if (intro.length) parts.push(section('intro', '소개', intro.map(function (t) { return el('p', null, t); })));

    list(prof.history).forEach(function (g, gi) {
      var items = list(g.items).filter(function (it) { return it && text(it.title); });
      if (!text(g.title) || !items.length) return;
      parts.push(section('history-' + (gi + 1), g.title, el('ol', { class: 'me-timeline' }, items.map(function (it) {
        var points = paras(it.points);
        return el('li', { class: 'me-item' }, [
          el('p', { class: 'me-date' }, [text(it.date), text(it.length) && el('span', { class: 'me-length' }, it.length)]),
          el('div', { class: 'me-what' }, [
            el('h3', { class: 'me-title' }, it.title),
            points.length > 0 && el('ul', { class: 'me-points' }, points.map(function (t) { return el('li', null, t); })),
            text(it.highlight) && el('p', { class: 'me-highlight' }, it.highlight),
            projectLinks(it.projects)
          ])
        ]);
      }))));
    });

    var tools = list(prof.tools).filter(function (t) { return t && text(t.group) && paras(t.items).length; });
    if (tools.length) parts.push(section('tools', '사용 툴', el('dl', { class: 'me-tools' }, tools.map(function (t) {
      return el('div', null, [el('dt', null, t.group), el('dd', null, paras(t.items).map(function (x) { return el('span', { class: 'me-chip' }, x); }))]);
    }))));

    if (email || links.length) parts.push(section('contact', '연락처', el('ul', { class: 'contact-list' }, [
      email && el('li', null, el('a', { href: 'mailto:' + email }, email)),
      links.map(function (l) { return el('li', null, el('a', { href: l.url, target: '_blank', rel: 'noopener' }, [l.label, icon('up-right')])); })
    ])));

    root.replaceChildren();
    append(root, [
      el('a', { class: 'back-link', href: './' }, [icon('left'), '처음으로']),
      hero,
      el('div', { class: 'project-body me-body', id: 'me-body', tabindex: '-1' }, [
        el('div', { class: 'story' }, parts),
        el('nav', { class: 'me-next', 'aria-label': '다음으로' }, el('a', { class: 'pill-link', href: './#projects' }, [el('span', null, '프로젝트 살펴보기'), icon('right')]))
      ])
    ]);
    renderAboutImages(media, list(about.images).map(toImage).filter(Boolean), +about.interval);
  }

  /* ---------- 움직임·3D 안내 ----------
     컴퓨터에 '움직임 줄이기'(윈도우: 애니메이션 효과 끄기)가 켜져 있으면 사이트가 정지 화면으로 보이므로,
     화면 아래에 이유와 '움직이는 화면 보기' 버튼을 둠. 3D(WebGL)를 못 쓰는 브라우저는 표지에서 이유를 알림 */
  function mountMotionNote() {
    var mq = window.bulssiReduceMQ;
    var noWebGL = !!document.getElementById('ember-canvas') && !(function () {
      try { var c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; }
    })();
    var system = !!(mq && mq.system);
    if (!system && !noWebGL) return;
    var on = system && !mq.matches;
    var note = el('div', { class: 'motion-note' + (on ? ' is-on' : ''), role: 'status' }, [
      system && el('p', null, on ? '움직이는 화면으로 보는 중' : '이 컴퓨터는 ‘움직임 줄이기’가 켜져 있어 정지 화면으로 보여요'),
      system && el('button', { type: 'button' }, on ? '정지 화면으로' : '움직이는 화면 보기'),
      noWebGL && el('p', { class: 'motion-note-gl' }, '이 브라우저에서는 3D 그래픽(WebGL)을 쓸 수 없어 표지의 불씨가 보이지 않아요. 브라우저 설정에서 ‘하드웨어 가속’을 켜 주세요.')
    ]);
    var btn = note.querySelector('button');
    if (btn) btn.addEventListener('click', function () { mq.set(!on); });
    document.body.append(note);
  }

  /* ---------- 시작 ---------- */
  mountMotionNote();
  var meRoot = document.querySelector('[data-me-root]');
  if (meRoot) renderMe(meRoot);
  var aboutRoot = document.querySelector('[data-about]');
  var projectsRoot = document.querySelector('[data-projects-section]');
  var contactRoot = document.querySelector('[data-contact]');
  var detailRoot = document.querySelector('[data-project-root]');
  if (aboutRoot) { renderAbout(aboutRoot); watchDarkBand(document.getElementById('intro-me')); }
  mountDawn(document.querySelector('[data-dawn]'));
  if (projectsRoot) renderProjects(projectsRoot);
  if (contactRoot) renderContact(contactRoot);
  if (detailRoot) renderDetail(detailRoot);

  // 이미지 상태 확인용 (콘솔에서 Bulssi.renderAboutImages([...]) 로 0·1·여러 장 상태를 볼 수 있음)
  window.Bulssi = {
    renderAboutImages: function (images, interval) { if (aboutRoot) renderAboutImages(aboutRoot.querySelector('[data-about-media]'), list(images).map(toImage).filter(Boolean), interval); }
  };
})();
