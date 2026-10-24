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
  var FILTER_KEY = 'bulssi:filter';

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
      text(SITE.name) && el('p', { class: 'about-name' }, SITE.name),
      paras(about.paragraphs).map(function (t) { return el('p', { class: 'about-text' }, t); }),
      el('a', { class: 'pill-link', href: cta.charAt(0) === '#' ? cta : (safeUrl(cta) || '#projects') },
        [el('span', null, text(about.ctaLabel) || '프로젝트 살펴보기'), icon('down-right')])
    ]);
    renderAboutImages(media, list(about.images).map(toImage).filter(Boolean));
  }

  function renderAboutImages(media, images) {
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

    // 여러 개: 짧은 크로스페이드로 순환. 화면 밖·탭 숨김·모션 축소에서는 멈춤, 버튼으로 멈추고 다시 재생
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
      if (playing && visible && !document.hidden) timer = setInterval(function () { show(current + 1); }, 4500);
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

  /* ---------- 프로젝트 목차: 대표 이미지 2열 + 복수 분류 필터 ---------- */
  function cardPlaceholder(p) {
    return el('div', { class: 'media-ph', 'aria-hidden': 'true' }, [
      el('span', { class: 'media-ph-name' }, p.name),
      el('span', { class: 'media-ph-note' }, '대표 이미지 준비 중')
    ]);
  }

  function projectCard(p) {
    var media = el('div', { class: 'card-media' });
    var cover = toImage(p.image);
    if (cover) {
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
    return el('li', { class: 'card', 'data-cats': cats.join('|') }, [
      media,
      el('div', { class: 'card-body' }, [
        cats.length > 0 && el('p', { class: 'card-cats' }, cats.join(' · ')),
        el('h3', { class: 'card-title' }, el('a', { class: 'card-link', href: detailHref(p.id) }, p.name)),
        problem && el('p', { class: 'card-problem' }, problem),
        role && el('p', { class: 'card-role' }, [el('span', { class: 'k' }, '역할'), role])
      ])
    ]);
  }

  function renderProjects(section) {
    var bar = section.querySelector('[data-filters]');
    var countEl = section.querySelector('[data-count]');
    var grid = section.querySelector('[data-projects]');
    var items = PROJECTS.map(function (p) { return { cats: categories(p), li: projectCard(p) }; });
    grid.replaceChildren.apply(grid, items.map(function (it) { return it.li; }));

    if (!items.length) {
      bar.hidden = true;
      countEl.textContent = '';
      grid.replaceWith(el('div', { class: 'placeholder' }, el('div', null, [el('strong', null, '준비 중'), '프로젝트 자료를 정리하고 있습니다.'])));
      return;
    }

    function matches(it, f) { return f === ALL || it.cats.indexOf(f) >= 0; }
    function total(f) { return items.filter(function (it) { return matches(it, f); }).length; }

    var buttons = FILTERS.map(function (f) {
      var n = total(f);
      return el('button', { type: 'button', class: 'filter', 'aria-pressed': 'false', 'data-filter': f, 'aria-label': f + ', ' + n + '개' }, [
        el('span', null, f), el('span', { class: 'filter-n', 'aria-hidden': 'true' }, String(n))
      ]);
    });
    bar.replaceChildren.apply(bar, buttons);

    function apply(f, animate) {
      var shown = 0;
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === f)); });
      items.forEach(function (it) {
        var on = matches(it, f);
        it.li.hidden = !on;
        it.li.classList.remove('is-entering');
        if (on) {
          if (animate && !reduceMQ.matches) {
            it.li.style.setProperty('--i', shown);
            void it.li.offsetWidth;   // 같은 카드도 다시 등장 효과를 받도록
            it.li.classList.add('is-entering');
          }
          shown++;
        }
      });
      countEl.textContent = (f === ALL ? '전체' : f) + ' · ' + shown + '개 프로젝트';
    }

    bar.addEventListener('click', function (e) {
      var b = e.target.closest('.filter');
      if (!b) return;
      var f = b.getAttribute('data-filter');
      stored(FILTER_KEY, f);
      apply(f, true);
    });

    // 상세에서 돌아왔을 때 고른 분야를 그대로
    var saved = stored(FILTER_KEY);
    apply(FILTERS.indexOf(saved) >= 0 ? saved : ALL, false);
  }

  /* ---------- 프로젝트 상세: 소표지 → 구성 지도 → 문제 / 판단 근거 / 설계·실행 / 결과·한계 ---------- */
  var SECTIONS = [
    { id: 'problem', name: '문제', body: function (p) { return paras(p.problem); },
      pending: function () { return '풀고자 한 문제를 정리해 추가합니다.'; } },
    { id: 'judgment', name: '판단 근거', body: function (p) { return paras(p.judgmentEvidence); },
      pending: function () { return '판단의 근거가 된 관찰·자료를 확인한 뒤 정리합니다.'; } },
    { id: 'build', name: '설계·실행', body: function (p) { return paras(p.approach); }, images: true,
      pending: function () { return '설계와 실행 과정을 정리해 추가합니다.'; } },
    { id: 'result', name: '결과·한계', body: function (p) { return paras(p.outcome).concat(paras(p.limitations)); },
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

    document.title = p.name + ' · 김시언 포트폴리오';
    var md = document.querySelector('meta[name="description"]');
    if (md && lede) md.setAttribute('content', p.name + ' — ' + lede);

    var sections = SECTIONS.map(function (s) {
      var body = s.body(p);
      var imgs = s.images ? detailImages : [];
      return { s: s, body: body, imgs: imgs, filled: body.length > 0 || imgs.length > 0 };
    });

    // 소표지: 어두운 면의 점들이 불씨의 온기로 밝아진 뒤 프로젝트명이 드러남 (긴 도입 없이 바로 읽을 수 있음)
    var subcover = el('section', { class: 'subcover', 'aria-labelledby': 'project-title' }, [
      el('div', { class: 'subcover-art', 'aria-hidden': 'true' }, [
        el('span', { class: 'sc-dots' }), el('span', { class: 'sc-dots sc-dots--warm' }), el('span', { class: 'sc-ember' })
      ]),
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
      link && el('div', null, [el('dt', null, '링크'), el('dd', null, el('a', { href: link, target: '_blank', rel: 'noopener' }, ['프로젝트 보기', icon('up-right')]))])
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
      if (x.body.length) append(body, x.body.map(function (t) { return el('p', null, t); }));
      x.imgs.forEach(function (im, k) { body.append(figure(im, p.name + ' 작업 화면 ' + (k + 1))); });
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
        isDraft && el('p', { class: 'draft-note' }, '이 페이지의 설명은 정리 중인 초안입니다. 담당 역할과 결과는 자료를 확인한 뒤 추가합니다.'),
        map,
        cover && figure(cover, p.name + ' 대표 화면'),
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
  if (aboutRoot) renderAbout(aboutRoot);
  if (projectsRoot) renderProjects(projectsRoot);
  if (contactRoot) renderContact(contactRoot);
  if (detailRoot) renderDetail(detailRoot);

  // 이미지 상태 확인용 (콘솔에서 Bulssi.renderAboutImages([...]) 로 0·1·여러 장 상태를 볼 수 있음)
  window.Bulssi = {
    renderAboutImages: function (images) { if (aboutRoot) renderAboutImages(aboutRoot.querySelector('[data-about-media]'), list(images).map(toImage).filter(Boolean)); }
  };
})();
