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
  var reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');

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
      text(SITE.role) && el('p', { class: 'about-role' }, SITE.role),
      paras(about.paragraphs).map(function (t) { return el('p', { class: 'about-text' }, t); }),
      el('a', { class: 'pill-link', href: cta.charAt(0) === '#' ? cta : (safeUrl(cta) || '#projects') },
        [el('span', null, text(about.ctaLabel) || '프로젝트 살펴보기'), icon('down-right')])
    ]);
    renderAboutImages(media, list(about.images).map(toImage).filter(Boolean), +about.interval);
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
    var check = function () {
      queued = false;
      var r = band.getBoundingClientRect(), line = 46;   // 머리말 가운데 높이
      root.classList.toggle('on-dark', r.top <= line && r.bottom >= line);
    };
    var queue = function () { if (!queued) { queued = true; requestAnimationFrame(check); } };
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    check();
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

  function coverArt(p, hero) {
    var c = p.cover || {};
    if (c.type === 'metric' && text(c.value) && list(c.groups).length) return metricCover(p, c, hero);
    if (c.type === 'symbol' && SYMBOLS[c.symbol]) return symbolCover(p, c, hero);
    return null;
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
    return el('li', { class: 'card' }, [
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
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-on'); io.unobserve(e.target); } });
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
    var f = el('figure', { class: 'story-figure' });
    var img = imageNode(im, { alt: alt, lazy: true });
    img.addEventListener('error', function () { f.remove(); });
    append(f, [img, text(im.caption) && el('figcaption', null, im.caption)]);
    return f;
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

    // 소표지: 어두운 면의 점들이 불씨의 온기로 밝아진 뒤 프로젝트명이 드러남 (긴 도입 없이 바로 읽을 수 있음)
    // 목차 카드와 같은 소표지(상징·지표)를 오른쪽에 크게 두고, 등장이 끝나면 한 번 펼침
    var heroArt = coverArt(p, true);
    if (heroArt) setTimeout(function () { heroArt.classList.add('is-on'); }, reduceMQ.matches ? 0 : 1100);
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
      var body = el('div', { class: 'story-body' });
      append(body, renderBlocks(x.body));
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

  /* ---------- 시작 ---------- */
  var aboutRoot = document.querySelector('[data-about]');
  var projectsRoot = document.querySelector('[data-projects-section]');
  var contactRoot = document.querySelector('[data-contact]');
  var detailRoot = document.querySelector('[data-project-root]');
  if (aboutRoot) { renderAbout(aboutRoot); watchDarkBand(document.getElementById('intro-me')); }
  if (projectsRoot) renderProjects(projectsRoot);
  if (contactRoot) renderContact(contactRoot);
  if (detailRoot) renderDetail(detailRoot);

  // 이미지 상태 확인용 (콘솔에서 Bulssi.renderAboutImages([...]) 로 0·1·여러 장 상태를 볼 수 있음)
  window.Bulssi = {
    renderAboutImages: function (images, interval) { if (aboutRoot) renderAboutImages(aboutRoot.querySelector('[data-about-media]'), list(images).map(toImage).filter(Boolean), interval); }
  };
})();
