# 불씨 — 김시언 포트폴리오

기획 · 마케팅 · 콘텐츠 포트폴리오 사이트입니다.
표지는 스크롤에 따라 작은 불꽃 → 커지는 불 → 번지는 불로 이어지고, 불씨의 온기가 점들을 밝히며 밝은 포트폴리오로 이어집니다.

- 사이트: https://happybluebird.github.io/bulssi-portfolio/
- 3D 불씨: `assets/models/ember_to_great_flame.glb`를 three.js로 직접 불러와, 다섯 부분(불씨 핵 → 점화 소용돌이 → 안쪽 불꽃 → 바깥 불꽃 덮개 → 불티)이 스크롤에 맞춰 차례로 피어남. 끌어서 돌리기, 누르면 빛과 불티
- 배경: three.js 3D 점 배경 (WebGL을 쓸 수 없으면 빛 번짐 전환으로 대체)
- 본문: 자기소개(이미지 순환 + 고정 소개문) → 프로젝트 목차(분야 필터, 2열) → 연락처
- 프로젝트 상세: `project.html?id=<프로젝트 id>` (소표지 → 문제 / 판단 근거 / 설계·실행 / 결과·한계)
- 문구·프로젝트 데이터: `content/site-content.js`, `content/projects.js`
- 수정 방법: 원본 `site/`를 고친 뒤 `scripts/build-pages.sh`로 이 폴더에 옮겨 담아 올림
- 서체: Pretendard (SIL OFL 1.1)

작업 이미지 · 담당 역할 · 결과 · 연락처는 본인 자료를 받은 뒤 채웁니다.
