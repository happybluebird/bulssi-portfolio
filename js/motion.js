/* 움직임 설정: 컴퓨터의 '움직임 줄이기(애니메이션 효과 끄기)'를 기본으로 따르되,
   방문자가 '움직이는 화면 보기'를 누르면 이 브라우저에서는 움직임을 켬 (localStorage 'bulssi-motion').
   - 모든 페이지 <head>에서 CSS보다 먼저 읽음 → html.motion-on 이면 CSS의 모션 축소 규칙이 꺼짐
   - 다른 스크립트는 matchMedia('(prefers-reduced-motion: reduce)') 대신 window.bulssiReduceMQ 를 씀
     (.matches = 설정이 켜져 있고 방문자가 움직임을 켜지 않았을 때) */
(function () {
  var root = document.documentElement;
  var real = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false, addEventListener: function () {} };
  var on = false;
  try { on = localStorage.getItem('bulssi-motion') === 'on'; } catch (e) {}
  // 주소에 ?motion=on 이 있으면 켬 (발표·공유용 링크). 저장이 되면 다른 페이지로 옮겨 가도 유지
  if (/[?&]motion=on\b/.test(location.search)) {
    on = true;
    try { localStorage.setItem('bulssi-motion', 'on'); } catch (e) {}
  }
  if (on) root.classList.add('motion-on');

  window.bulssiReduceMQ = {
    get matches() { return real.matches && !root.classList.contains('motion-on'); },
    get system() { return real.matches; },   // 컴퓨터 설정 자체 (안내 표시용)
    addEventListener: function (type, fn) { real.addEventListener(type, fn); },
    removeEventListener: function (type, fn) { if (real.removeEventListener) real.removeEventListener(type, fn); },
    // 켜고 끄기: 모든 장면이 처음부터 같은 설정으로 그려지도록 다시 불러옴
    set: function (motion) {
      var saved = false;
      try { if (motion) localStorage.setItem('bulssi-motion', 'on'); else localStorage.removeItem('bulssi-motion'); saved = true; } catch (e) {}
      var url = new URL(location.href);
      url.searchParams.delete('motion');
      if (motion && !saved) url.searchParams.set('motion', 'on');   // 저장이 막힌 브라우저: 주소로 전달
      if (url.href === location.href) location.reload(); else location.replace(url.href);
    }
  };
})();
