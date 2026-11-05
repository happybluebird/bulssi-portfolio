/* 자기소개·필터·연락처 문구 (원본: bulssi-claude-handoff/content/site-content.json, 2026-10-24 초안)
   = 뒤의 { } 는 JSON 그대로입니다. 고칠 때는 따옴표·쉼표만 지켜 주세요.
   about.images 형식은 content/README.md 참고. 비워 두면 이미지 대기 영역 하나만 보입니다. */
window.BULSSI_SITE = {
  "contentStatus": "proposed_copy_for_review",
  "name": "김시언",
  "role": "프로덕트 마케터 · 서비스 기획자",
  "headline": "작은 호기심을, 사람에게 닿는 기획으로.",
  "keyword": "불씨",
  "definition": "호기심으로 가능성을 발견하고, 긍정적인 말로 함께 시작할 힘을 만듭니다.",
  "about": {
    "paragraphs": [
      "사용자의 불편에서 질문을 찾고, 그 질문을 서비스의 구조와 경험으로 구체화합니다. 둥글게 바라보고, 날카롭게 검증합니다.",
      "마케팅에서는 고객이 고르는 순간을 설계하고 숫자로 확인합니다. 매장에서는 팀 인센티브로 객단가를 16% 올렸고, 블로그에서는 검색 수요와 경쟁을 재어 하루 조회를 5회에서 159회로 키웠습니다. 이스포츠 대회에서는 시청자 수를 직접 모아 목표를 점유율 KPI로 다시 세웠습니다.",
      "기획에서는 문제를 정의하고, 규칙을 문서로 고정하고, 직접 만듭니다. 혼자 만든 우주도서관에서는 우주 정보를 ‘내 생일의 이야기’로 바꾸고, 무료 체험에서 로그인·결제로 이어지는 흐름을 설계해 GA4로 반응을 측정했습니다.",
      "긍정적인 소통으로 함께 시작합니다."
    ],
    "ctaLabel": "프로젝트 살펴보기",
    "ctaHref": "#projects",
    "images": [
      {
        "src": "assets/about/about-01.jpg",
        "alt": "해 질 녘 강변 산책로에서 지는 해를 바라보는 모습",
        "width": 1080,
        "height": 1440
      },
      {
        "src": "assets/about/about-02.jpg",
        "alt": "주황빛으로 물든 저녁 하늘과 도시의 실루엣",
        "width": 1080,
        "height": 1440
      },
      {
        "src": "assets/about/about-03.jpg",
        "alt": "야자수 너머 밤바다 위로 빛나는 달",
        "width": 1080,
        "height": 1440
      },
      {
        "src": "assets/about/about-04.jpg",
        "alt": "밤의 모래밭에서 춤추듯 움직이는 모습",
        "width": 900,
        "height": 1200
      }
    ],
    "interval": 3000
  },
  "profile": {
    "tagline": "세상을 둥글게 바라보는 긍정적인 마케터",
    "sourceNote": "학력·경력·수상·사용 툴: 이력서(2026.06.29 판). 활동 기간·역할: 각 프로젝트 데이터. 생년월일·주소·전화번호는 공개 사이트라 싣지 않음",
    "history": [
      {
        "title": "학력",
        "items": [
          { "date": "2027.02", "title": "신구대학교 미디어콘텐츠학과 학사 졸업 (예정)" },
          { "date": "2026.02", "title": "신구대학교 미디어콘텐츠과 (3년제) 졸업" }
        ]
      },
      {
        "title": "경력 · 교육",
        "items": [
          {
            "date": "2025.12 – 2026.06",
            "length": "7개월",
            "title": "Microsoft AI School 9기 수료",
            "points": ["Azure AI 기반 팀 프로젝트 세 번: 1차 데이터 분석·모델, 2차 RAG 앱, 3차 3D 학습 서비스"],
            "projects": ["school", "moving", "mindpalace"]
          },
          {
            "date": "2022.04 – 2025.12",
            "length": "3년 4개월",
            "title": "OUTBACK STEAK HOUSE 홀 매니저",
            "points": ["매출 증진 프로모션 기획", "신규 직원 서비스 교육 및 콘텐츠 기획 제작", "매장 최우수 서비스 사원"],
            "highlight": "인센티브 프로그램 기획·운영 → 객단가 16% 상승 · 전국 매출 1위 · 3개월 연속 우수사원",
            "projects": ["outback"]
          }
        ]
      },
      {
        "title": "수상",
        "items": [
          {
            "date": "2025",
            "title": "제12회 대학생 출판콘텐츠 공모전 잡지 부문 우수상",
            "points": ["[TMDE] 신구대학교 잡지 기획 팀 프로젝트 (6인) · 졸업작품"]
          }
        ]
      },
      {
        "title": "활동 · 개인 프로젝트",
        "items": [
          { "date": "2026.02 –", "title": "우주도서관", "points": ["개인 SaaS · 기획·개발·마케팅 단독 (운영 중)"], "projects": ["space"] },
          { "date": "2026.02 –", "title": "블로그 ‘기쁜오목눈이’", "points": ["기획 · 글 작성과 검수 · 데이터 분석 · 운영 (1인)"], "projects": ["blog"] },
          { "date": "2026 시즌3", "title": "OCM 시즌3 운영진 (오버워치 크리에이터 대회)", "points": ["SNS 홍보·마케팅 · 데이터 (운영진 5인 중) · 카드뉴스 자동화"], "projects": ["ocm", "cardnews"] }
        ]
      }
    ],
    "tools": [
      { "group": "AI", "items": ["ChatGPT · Codex", "Claude · Claude Code", "Gemini · Stitch"] },
      { "group": "디자인 · 영상", "items": ["Adobe Illustrator", "Adobe Photoshop", "Adobe Premiere Pro"] },
      { "group": "개발 · 데이터", "items": ["Python", "Microsoft Azure"] },
      { "group": "마케팅", "items": ["Google Ads"] }
    ]
  },
  "filters": [
    "전체",
    "서비스 기획",
    "UI/UX",
    "마케팅"
  ],
  "contact": {
    "email": "ksu4718@gmail.com",
    "links": [
      {
        "label": "네이버 블로그 · 기쁜오목눈이",
        "url": "https://blog.naver.com/ksu4718"
      }
    ]
  },
  "note": "자기소개 세 문단은 초안: 김시언_포트폴리오_카카오뱅크.pdf(2026.10)의 문장·사실과 이전 제안 문구를 엮음(2026-11-04). 자기소개 사진 1~4번은 사용자 제공(2026-11-04). 연락처·실패 기록·프로젝트 묶음 설명은 같은 PDF에서 옮김.",
  "projectNotes": [
    {
      "label": "실패 기록",
      "text": "클린데이터랩(크몽 엑셀 정제 대행) 2개월 운영, 고객 2명 → 보류 후 다른 기획으로 전환"
    }
  ],
  "projectGroups": [
    {
      "title": "마케팅",
      "desc": "고객이 고르는 순간을 설계하고, 숫자로 확인합니다.",
      "layout": "featured",
      "ids": [
        "outback",
        "space",
        "ocm",
        "blog"
      ]
    },
    {
      "title": "서비스 기획",
      "desc": "문제를 정의하고, 규칙을 문서로 고정하고, 직접 만듭니다.",
      "layout": "grid",
      "ids": [
        "oztrip",
        "draft",
        "cardnews",
        "school"
      ]
    },
    {
      "title": "UI/UX",
      "desc": null,
      "layout": "grid",
      "ids": [
        "moving",
        "mindpalace"
      ]
    }
  ]
};
