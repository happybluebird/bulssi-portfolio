/* 프로젝트 목차·상세 데이터 (원본: bulssi-claude-handoff/content/projects.draft.json, 2026-10-24 초안)
   = 뒤의 { } 는 JSON 그대로입니다. 목록 순서 = 목차 순서.
   role·period·outcome·link·image·judgmentEvidence 가 null 이면 화면에서 숨기거나 '보완 예정'으로 표시합니다. */
window.BULSSI_PROJECTS = {
  "schemaVersion": 1,
  "projects": [
    {
      "id": "oztrip",
      "name": "OZ TRIP",
      "desc": "복잡한 여행 선택을 간편하게 만드는 추천 서비스",
      "tags": "시니어 여행 추천 알고리즘 사용자 경험",
      "problem": "여행지에 관심이 생겨도 코스를 고르고 일정을 구성하는 과정은 복잡합니다.",
      "approach": "여행 추천 구조와 코스 선택 흐름을 설계하고, 코스 확정·소요 시간·공유를 효과성 측정 항목으로 정리했습니다.",
      "evidence": "사용자 테스트 결과, 실제 추천 화면, 기여 범위와 검증 수치를 보완할 예정입니다.",
      "categories": [
        "서비스 기획"
      ],
      "role": null,
      "period": null,
      "outcome": null,
      "link": null,
      "image": null,
      "contentStatus": "draft_from_prior_discussion",
      "displayProblem": "복잡한 여행 선택을 간편하게 만드는 추천 서비스",
      "judgmentEvidence": null,
      "detailImages": [],
      "sourceNote": "이전 포트폴리오 허브의 소개 초안. 실제 구현·기여·성과 검증 전."
    },
    {
      "id": "space",
      "name": "우주도서관",
      "desc": "NASA·ESA 관측 정보를 한국어로 쉽게 탐색하는 서비스",
      "tags": "우주 정보 콘텐츠 접근성 NASA ESA",
      "problem": "낯선 용어와 언어는 우주 관측 정보를 쉽게 이해하고 탐색하는 데 장벽이 됩니다.",
      "approach": "오늘의 우주, 생일의 우주와 문서 검색을 중심으로 한국어 정보 탐색 경험을 구성했습니다.",
      "evidence": "현재 서비스 화면, 정보 출처 관리 방식, 사용자의 이해도와 탐색 반응을 보완할 예정입니다.",
      "categories": [
        "서비스 기획"
      ],
      "role": null,
      "period": null,
      "outcome": null,
      "link": null,
      "image": null,
      "contentStatus": "draft_from_prior_discussion",
      "displayProblem": "NASA·ESA 관측 정보를 한국어로 쉽게 탐색하는 서비스",
      "judgmentEvidence": null,
      "detailImages": [],
      "sourceNote": "이전 포트폴리오 허브의 소개 초안. 실제 구현·기여·성과 검증 전."
    },
    {
      "id": "ocm",
      "name": "OCM",
      "desc": "크리에이터와 팬을 연결하는 콘텐츠·대회 운영 기획",
      "tags": "오버워치 크리에이터 매거진 콘텐츠 후원 운영",
      "problem": "팬이 크리에이터의 콘텐츠와 대회 소식을 지속적으로 만날 접점이 필요합니다.",
      "approach": "매거진 콘텐츠 편성과 홍보 방향을 기획하고, 대회 후원 제안과 드래프트 운영 도구의 흐름을 정리했습니다.",
      "evidence": "운영 실적, 콘텐츠별 반응, 후원 협의 결과는 실제 자료를 확인해 추가할 예정입니다.",
      "categories": [
        "마케팅"
      ],
      "role": null,
      "period": null,
      "outcome": null,
      "link": null,
      "image": null,
      "contentStatus": "draft_from_prior_discussion",
      "displayProblem": "크리에이터와 팬을 연결하는 콘텐츠·대회 운영 기획",
      "judgmentEvidence": null,
      "detailImages": [],
      "sourceNote": "이전 포트폴리오 허브의 소개 초안. 실제 구현·기여·성과 검증 전."
    },
    {
      "id": "school",
      "name": "스쿨존윅",
      "desc": "데이터에서 출발한 스쿨존 안전 문제 탐색",
      "tags": "안전 데이터 S-DoT Responsible AI",
      "problem": "스쿨존 안전 문제를 데이터와 이용자의 관점에서 살펴볼 필요가 있습니다.",
      "approach": "S-DoT 데이터와 분석 기준을 바탕으로 문제를 탐색하고, 전달을 위한 포스터·장면 구성·매뉴얼을 정리했습니다.",
      "evidence": "분석 결과, 담당 역할, 데이터의 한계와 산출물 원본을 확인해 추가할 예정입니다.",
      "categories": [
        "서비스 기획"
      ],
      "role": null,
      "period": null,
      "outcome": null,
      "link": null,
      "image": null,
      "contentStatus": "draft_from_prior_discussion",
      "displayProblem": "데이터에서 출발한 스쿨존 안전 문제 탐색",
      "judgmentEvidence": null,
      "detailImages": [],
      "sourceNote": "이전 포트폴리오 허브의 소개 초안. 실제 구현·기여·성과 검증 전."
    },
    {
      "id": "moving",
      "name": "이사이상무",
      "categories": [
        "서비스 기획",
        "UI/UX"
      ],
      "desc": "이사 준비를 체크리스트로 정리하는 앱",
      "tags": "이사 체크리스트 모바일 Expo React Native 인쇄",
      "problem": "이사 과정에서 챙겨야 할 일을 한눈에 확인하고 관리할 수 있도록 돕는 서비스입니다.",
      "approach": "이사 체크리스트 앱과 A4 인쇄 활용을 기획했습니다. 모바일에서 준비 항목을 확인하는 흐름을 포트폴리오에 정리합니다.",
      "evidence": "실제 앱 화면, 항목 구성, 담당 역할과 사용성 확인 자료를 보완할 예정입니다.",
      "role": null,
      "period": "2026.04",
      "outcome": null,
      "link": null,
      "image": null,
      "contentStatus": "draft_from_prior_discussion",
      "displayProblem": "이사 준비를 체크리스트로 정리하는 앱",
      "judgmentEvidence": null,
      "detailImages": [],
      "sourceNote": "이전 포트폴리오 허브의 소개 초안. 실제 구현·기여·성과 검증 전."
    },
    {
      "id": "mindpalace",
      "name": "기억의 궁전",
      "categories": [
        "서비스 기획",
        "UI/UX"
      ],
      "desc": "지식과 공간의 경험을 이어주는 기억의 궁전",
      "tags": "기억 인출학습 공간 랜드마크 PDF 책 UI UX",
      "problem": "학습한 지식을 공간 경로와 연결해 사용자가 스스로 기억을 꺼내는 경험을 돕고자 합니다.",
      "approach": "랜드마크와 기억의 책을 중심으로 공간 탐색과 학습 내용을 연결하는 흐름을 설계했습니다. 책을 크게 보여주고 기억 흐름을 선으로 연결하며 PDF 업로드 영역을 단순하게 구성하는 방향을 논의했습니다.",
      "evidence": "완성 화면, 실제 구현 범위, 담당 역할과 학습 효과 검증 자료를 보완할 예정입니다.",
      "role": null,
      "period": "2026.06",
      "outcome": null,
      "link": null,
      "image": null,
      "contentStatus": "draft_from_prior_discussion",
      "displayProblem": "지식과 공간의 경험을 이어주는 기억의 궁전",
      "judgmentEvidence": null,
      "detailImages": [],
      "sourceNote": "이전 포트폴리오 허브의 소개 초안. 실제 구현·기여·성과 검증 전."
    },
    {
      "id": "seed",
      "name": "SEED",
      "categories": [
        "서비스 기획",
        "UI/UX"
      ],
      "desc": "이미지와 레퍼런스를 바탕으로 콘텐츠 제작을 돕는 서비스",
      "tags": "SEED 브랜드 AI 포스터 카드뉴스 이미지 레퍼런스",
      "problem": "이미지와 제작 의도를 구체적인 구도·분위기·문구로 연결하는 제작 과정을 돕고자 합니다.",
      "approach": "이미지와 제작 형식을 입력받고, 레퍼런스의 구도·배경·분위기와 확인된 정보를 반영해 콘텐츠를 구성하는 흐름을 논의했습니다.",
      "evidence": "현재 서비스 화면, 제작·수정 흐름, 실제 구현 범위와 사용자 반응을 보완할 예정입니다.",
      "role": null,
      "period": null,
      "outcome": null,
      "link": null,
      "image": null,
      "contentStatus": "draft_from_prior_discussion",
      "displayProblem": "이미지와 레퍼런스를 바탕으로 콘텐츠 제작을 돕는 서비스",
      "judgmentEvidence": null,
      "detailImages": [],
      "sourceNote": "이전 포트폴리오 허브의 소개 초안. 실제 구현·기여·성과 검증 전."
    }
  ]
};
