/* 프로젝트 목차·상세 데이터. = 뒤의 { } 는 JSON 그대로입니다. 목록 순서 = 목차 순서.
   - 아웃백·우주도서관·OCM·기쁜오목눈이·OZ TRIP·경매 드래프트·카드뉴스 자동화: 김시언_포트폴리오_카카오뱅크.pdf(2026.10)에서 옮김
   - 스쿨존윅·이사이상무·기억의 궁전·SEED: bulssi-claude-handoff 초안(2026-10-24), 검증 전
   problem·judgmentEvidence·approach·outcome·learned 는 문장 배열. {"label","text"} 는 이름표가 붙은 줄로 표시.
   cover: 목차 카드·상세 위쪽 소표지 (metric = 확인된 지표 → 블록 구성, symbol = 상징 → 빛 → 이름).
   role·period·outcome·link·image 가 null 이면 화면에서 숨기거나 '보완 예정'으로 표시합니다. 작성법은 README.md */
window.BULSSI_PROJECTS = {
  "schemaVersion": 1,
  "projects": [
    {
      "id": "outback",
      "name": "아웃백 홀 매니저",
      "categories": [
        "마케팅"
      ],
      "desc": "하스필 야시장 객단가 +16%, 월별 팀 프로모션, 두 시즌 수상",
      "displayProblem": "하스필 야시장 객단가 +16%, 월별 팀 프로모션, 두 시즌 수상",
      "problem": [
        "2022–2024 시즌 하남스타필드점 홀 매니저. 도입 전 객단가는 37,000원이었습니다.",
        "팀 단위로 객단가를 올릴 인센티브 프로그램 ‘하스필 야시장’을 설계하는 것이 과제였습니다."
      ],
      "judgmentEvidence": [
        "시간대별 매출·주문 패턴을 분석해 메뉴 제안 방식을 정했습니다."
      ],
      "approach": [
        {
          "label": "하스필 야시장",
          "text": "메뉴 제안 방식 교육 → 매주 결과 확인·조정"
        },
        {
          "label": "월별 팀 경쟁",
          "text": "2025년 8·9·10월, 매달 다른 보드게임 판으로 매출 경쟁을 설계. 8월 국내 여행 보드게임(40칸·4팀), 9월 가을 단풍 나무(팀별 판에 단풍잎 스티커·토·일 2배), 10월 한가위 보름달 윷놀이(8×8 외곽 트랙·대각선 지름길)"
        },
        {
          "label": "설계 규칙",
          "text": "점수는 매출 지표와 연동 · 순위 보상은 팀 단위로 1회 · 마감 주는 모든 조건 2배"
        },
        {
          "label": "교육 기준",
          "text": "2025 시즌 직원 서비스 교육 기준. 메뉴(메뉴 구성과 추가 주문 제안) · 서비스(응대 단계별 기준) · 컴플레인(유형별 대응 절차)"
        }
      ],
      "outcome": [
        "객단가 +16%(37,000원 → 43,000원) · 2024년 하남스타필드점 전국 매출 1위.",
        "월별 프로모션 객단가 전월 대비: 8월 +2,712원 · 9월 −482원 · 10월 +1,285원, 3개월 합계 +3,515원.",
        "아웃백 제2회 D.N.A 이달의 사원(2023.09.17, 하남스타필드점) · 2025 시즌(서비스 교육) 3개월 연속 이달의 우수사원.",
        "“어느 외식업체에서도 만나 보지 못했던 귀한 직원인 것 같습니다” — 2023.09.17 고객의 소리 중"
      ],
      "learned": [
        "매출은 상품만이 아니라 고객이 고르는 순간의 설계로도 바뀝니다."
      ],
      "metrics": [
        {
          "value": "+16%",
          "label": "객단가",
          "note": "37,000원 → 43,000원"
        },
        {
          "value": "전국 1위",
          "label": "매출",
          "note": "2024년 하남스타필드점"
        },
        {
          "value": "+3,515원",
          "label": "월별 프로모션 객단가",
          "note": "2025년 8·9·10월 합계"
        }
      ],
      "role": "홀 매니저",
      "period": "2022–2025",
      "link": null,
      "image": {
        "src": "assets/projects/outback-board-08.jpg",
        "alt": "아웃백 8월 팀 프로모션 국내 여행 보드게임 판",
        "width": 533,
        "height": 319
      },
      "detailImages": [
        {
          "src": "assets/projects/outback-board-08.jpg",
          "alt": "8월 국내 여행 보드게임 판",
          "width": 533,
          "height": 319,
          "caption": "8월 · 국내 여행 보드게임(40칸·4팀) · 객단가 전월 대비 +2,712원"
        },
        {
          "src": "assets/projects/outback-board-09.jpg",
          "alt": "9월 가을 단풍 나무 판",
          "width": 534,
          "height": 319,
          "caption": "9월 · 가을 단풍 나무(팀별 판에 단풍잎 스티커·토·일 2배) · 객단가 전월 대비 −482원"
        },
        {
          "src": "assets/projects/outback-board-10.jpg",
          "alt": "10월 한가위 보름달 윷놀이 판",
          "width": 533,
          "height": 319,
          "caption": "10월 · 한가위 보름달 윷놀이(8×8 외곽 트랙·대각선 지름길) · 객단가 전월 대비 +1,285원"
        }
      ],
      "contentStatus": "from_portfolio_2026_10",
      "sourceNote": "김시언_포트폴리오_카카오뱅크.pdf (2026.10)",
      "cover": {
        "type": "metric",
        "label": "객단가",
        "value": "+16%",
        "note": "37,000원 → 43,000원",
        "groups": [
          {
            "label": "도입 전 · 37,000원",
            "count": 37,
            "tone": "muted"
          },
          {
            "label": "도입 후 · 43,000원",
            "count": 43,
            "tone": "accent"
          }
        ],
        "unit": "블록 1개 = 객단가 1,000원"
      }
    },
    {
      "id": "space",
      "name": "우주도서관",
      "desc": "NASA·ESA 관측 정보를 한국어로 쉽게 탐색하는 서비스",
      "tags": "우주 정보 콘텐츠 접근성 NASA ESA",
      "problem": [
        "NASA 자료는 영어라 일반인이 찾아보기 어렵습니다.",
        "타겟을 교육 플랫폼에서 우주를 좋아하는 일반인으로 바꾸고, 들어올 이유를 만들어야 했습니다."
      ],
      "approach": [
        {
          "label": "훅",
          "text": "“내가 태어난 날, NASA는 무엇을 올렸을까”"
        },
        {
          "label": "머물 콘텐츠",
          "text": "4종"
        },
        {
          "label": "전환 퍼널",
          "text": "무료 체험(생일 사진, 오늘의 우주) → 가치 인지(타로, 천체보관소, 블랙홀) → 로그인(전환 지점: 검색 하루 2회 → 3회) → 결제(유료 기능)"
        },
        {
          "label": "운영·QA",
          "text": "출시 전 AI 생성 코드의 보안을 확인. API 키·결제·CORS 점검 후 조치"
        }
      ],
      "evidence": null,
      "categories": [
        "서비스 기획",
        "마케팅"
      ],
      "role": "1인 기획·개발·마케팅",
      "period": null,
      "outcome": [
        "국내 활성 사용자 109명 · 참여율 73.2% · 평균 참여 시간 1분 48초(전체 기준 246명 · 46.4% · 49초, 세션 351).",
        "보안 이슈 3건을 조치하고, 이후 매일 재점검합니다."
      ],
      "link": "https://cosmoslib.com",
      "image": {
        "src": "assets/projects/space-cover.jpg",
        "alt": "우주도서관 첫 화면 — 내가 태어난 날, NASA는 무엇을 올렸을까",
        "width": 600,
        "height": 500
      },
      "contentStatus": "from_portfolio_2026_10",
      "displayProblem": "NASA·ESA 관측 정보를 한국어로 쉽게 탐색하는 서비스",
      "judgmentEvidence": [
        "반응은 GA4로 측정하되, 해외 유입을 걸러 국내 실사용자 기준으로 봤습니다."
      ],
      "detailImages": [],
      "sourceNote": "김시언_포트폴리오_카카오뱅크.pdf (2026.10)",
      "metrics": [
        {
          "value": "109명",
          "label": "국내 활성 사용자",
          "note": "전체 246명"
        },
        {
          "value": "73.2%",
          "label": "국내 참여율",
          "note": "전체 46.4%"
        },
        {
          "value": "1분 48초",
          "label": "국내 평균 참여 시간",
          "note": "전체 49초"
        }
      ],
      "metricsNote": "GA4 2026.08.01~10.28 · 검색 한도 수치는 서비스 화면 기준",
      "linkLabel": "cosmoslib.com",
      "cover": {
        "type": "metric",
        "label": "국내 참여율",
        "value": "73.2%",
        "note": "전체 46.4% · GA4 2026.08~10",
        "groups": [
          {
            "label": "국내 · 109명",
            "count": 22,
            "tone": "accent"
          },
          {
            "label": "그 외 · 137명",
            "count": 27,
            "tone": "muted"
          }
        ],
        "unit": "블록 1개 ≈ 활성 사용자 5명 · 전체 246명"
      }
    },
    {
      "id": "ocm",
      "name": "OCM",
      "desc": "시청자 데이터로 KPI 재설계, 카드뉴스·릴스 운영",
      "tags": "오버워치 크리에이터 매거진 인스타그램 카드뉴스 릴스 KPI",
      "problem": [
        "OCM 시즌3(오버워치 크리에이터 대회). 2020년 시즌1·2 생방송 평균 시청자는 216명 → 176명이었고, 시즌3 목표는 300명이었습니다.",
        "운영진 5인 중 SNS 홍보·마케팅과 데이터를 맡아, 대회 전 공식 인스타그램을 개설·운영하는 것이 과제였습니다."
      ],
      "approach": [
        {
          "label": "인스타그램",
          "text": "@ocm.magazine(OCM = Overwatch Creator Magazine) 개설·운영"
        },
        {
          "label": "편성",
          "text": "월·수·금 고정 콘텐츠(‘게임 산업·생태계’ 주간 콘텐츠) + 화·목·토 오버워치 카드뉴스·릴스 · 모집 포스터"
        },
        {
          "label": "제작",
          "text": "카드뉴스 7단계 중 4단계를 자동으로 돌리는 반자동 파이프라인(카드뉴스 자동화 참고)"
        }
      ],
      "evidence": null,
      "categories": [
        "마케팅"
      ],
      "role": "SNS 홍보·마케팅 · 데이터 (운영진 5인 중)",
      "period": "2026 시즌3",
      "outcome": [
        "개설 17일 만에 게시물 13개 · 릴스 평균 조회수 326회 · 팔로워 45명(2026.10.11 개설 → 10.28 기준).",
        "대회 전 목표는 팔로워 200 · 조회수 1,000입니다."
      ],
      "link": "https://www.instagram.com/ocm.magazine/",
      "image": {
        "src": "assets/projects/ocm-logo.jpg",
        "alt": "OCM 로고",
        "width": 216,
        "height": 216,
        "fit": "scale-down",
        "bg": "#CCCCCC",
        "showInDetail": false
      },
      "contentStatus": "from_portfolio_2026_10",
      "displayProblem": "시청자 데이터로 KPI 재설계, 카드뉴스·릴스 운영",
      "judgmentEvidence": [
        "치지직 오버워치 카테고리 시청자 수를 2026.9.9~9.13 22시에 직접 수집했습니다: 9/9(수) 6,000 · 9/10(목) 9,800 · 9/11(금) 8,000 · 9/12(토) 4,000 · 9/13(일, 대회일) 10,000명.",
        "같은 금요일에도 14시 600명, 22시 8,000명으로 시간대 차이가 컸습니다.",
        "그래서 목표를 평균 시청자 수(S2 대비 +70%인 300명)에서 카테고리 점유율로 바꿨습니다: 드래프트(12/13 18시) 60%, 본대회(12/19~20 14시) 50%."
      ],
      "detailImages": [],
      "sourceNote": "김시언_포트폴리오_카카오뱅크.pdf (2026.10)",
      "metrics": [
        {
          "value": "13개",
          "label": "게시물",
          "note": "개설 17일 만"
        },
        {
          "value": "326회",
          "label": "릴스 평균 조회수",
          "note": "대회 전 목표 1,000"
        },
        {
          "value": "45명",
          "label": "팔로워",
          "note": "대회 전 목표 200"
        }
      ],
      "metricsNote": "2026.10.11 개설 → 10.28 기준",
      "linkLabel": "@ocm.magazine",
      "cover": {
        "type": "metric",
        "label": "대회 목표 KPI",
        "value": "점유율 60%",
        "note": "드래프트 기준 · 본대회 50%",
        "groups": [
          {
            "label": "14시 · 600명",
            "count": 3,
            "tone": "muted"
          },
          {
            "label": "22시 · 8,000명",
            "count": 40,
            "tone": "accent"
          }
        ],
        "unit": "블록 1개 = 시청자 200명 · 같은 금요일(9/11) 치지직 오버워치",
        "markImage": "assets/projects/ocm-logo.jpg"
      }
    },
    {
      "id": "blog",
      "name": "기쁜오목눈이",
      "categories": [
        "마케팅"
      ],
      "desc": "감성 에세이 블로그를 공연 정보 블로그로 키운 기록",
      "displayProblem": "감성 에세이 블로그를 공연 정보 블로그로 키운 기록",
      "problem": [
        "2026.02.19부터 노래 한 곡에 감상을 붙이는 감성 에세이를 매달 20~22편 발행했습니다. 6개월 129편, 하루 평균 조회 약 5회. 8월 애드포스트 신청은 방문자·페이지뷰 부족으로 보류되었습니다.",
        "음악 주제와 톤은 지키면서 9월 하루 평균 100회를 넘기는 것이 과제였습니다. 10/1 애드포스트 재검수에 9월 실적이 쓰이기 때문입니다. 확인된 사실만 쓴다는 원칙은 유지했습니다."
      ],
      "judgmentEvidence": [
        {
          "label": "감성 에세이",
          "text": "검색 1위 에세이의 하루 조회 1회. 132편을 합쳐도 하루 17~18회(8/28). 유입: 곡명 + 가사·해석"
        },
        {
          "label": "공연 예매 정보 글",
          "text": "최유리 콘서트 글 하루 조회 260회(8/30), 리도어 글은 일반예매 당일 61회. 유입: 아티스트 + 콘서트·가격·공연장"
        },
        "같은 음악 주제라도, 지금 찾는 정보는 예매 직전의 공연 정보였습니다."
      ],
      "approach": [
        {
          "label": "새 카테고리 실험",
          "text": "8/23 「이번 주, 이 공연」 신설, 팬층 다른 공연 2종으로 시험"
        },
        {
          "label": "소재 선정 기준",
          "text": "자동완성 키워드 수(수요) × 1주 경쟁 글 수 × 예매 직전 발행"
        },
        {
          "label": "정확성 원칙",
          "text": "예매처·공식 공지 원문만 사용, 선예매·일반예매 구분 표기"
        },
        {
          "label": "형식 확장",
          "text": "도시별 묶음글, 예매 가이드, 생중계 안내, 공연장 후기"
        },
        {
          "label": "에세이 재설계",
          "text": "주 3편·신곡 중심, “곡 정보 + 감상”으로 재구성"
        },
        {
          "label": "운영 체계",
          "text": "AI 에이전트 분업, 요일별 예약 발행, 발행 전 검증"
        },
        "흐름: 02.19 노래 에세이 정기 발행 → 07.22 AI 에이전트와 운영 자동화 → 08.23 공연 카테고리·애드포스트 신청 → 08.29 하루 272회, 첫 100회 돌파 → 9월 공연 글 73편, 하루 118.6회 → 10.03 에세이 주 3편 개편 → 10.05 애드포스트 승인 → 10.07 첫 수익 2,915원"
      ],
      "outcome": [
        "에세이 중심(02.19~08.22 · 129편 · 하루 약 5회) → 공연 정보 병행(08.23~10.27 · 정보 글 132편 + 에세이 28편 · 하루 약 159회).",
        "9월 하루 평균 118.6회로 목표 100회를 넘었고, 10/5 애드포스트가 승인되었습니다(신청 후 43일).",
        "2026년 누적 조회수 11,325회 중 92%가 공연 글 시작 후입니다. 공연 글은 글 수의 46%이지만 조회 비중은 79%입니다. 10월 1~27일 6,001회(하루 평균 222회), 예상수익 누적 3,556원(10/5~10/27)."
      ],
      "learned": [
        {
          "label": "검색 의도부터 본다",
          "text": "쓰기 전에 수요와 경쟁을 잰다"
        },
        {
          "label": "정확성이 차별점",
          "text": "공지 원문으로 선예매·일반예매 구분"
        },
        {
          "label": "버리지 않고 재설계",
          "text": "에세이는 주 3편, 곡 정보 + 감상"
        }
      ],
      "metrics": [
        {
          "value": "5 → 159회",
          "label": "하루 평균 조회",
          "note": "공연 글 전 → 후"
        },
        {
          "value": "11,325회",
          "label": "누적 조회수",
          "note": "2026.02~10.27"
        },
        {
          "value": "10/5 승인",
          "label": "애드포스트",
          "note": "신청 후 43일"
        },
        {
          "value": "289편",
          "label": "총 게시물",
          "note": "에세이 157 · 정보 132"
        }
      ],
      "metricsNote": "출처: 네이버 크리에이터 어드바이저(조회수·예상수익, ~2026.10.27), 블로그 공개 글 목록(2026.10.28)",
      "role": "기획 · 글 작성과 검수 · 데이터 분석 · 운영 (1인, AI 에이전트와 분업)",
      "period": "2026.02~ 운영 중",
      "link": "https://blog.naver.com/ksu4718",
      "linkLabel": "blog.naver.com/ksu4718",
      "image": {
        "src": "assets/projects/blog-home.jpg",
        "alt": "네이버 블로그 기쁜오목눈이 홈 화면(2026.10.28)",
        "width": 600,
        "height": 373
      },
      "detailImages": [
        {
          "src": "assets/projects/blog-card-1.jpg",
          "alt": "이무진 콘서트 예매 정보 카드",
          "width": 398,
          "height": 298,
          "caption": "공연 정보 카드 · 예매 일정·공연 정보·가격을 한 장에 정리하고, 아티스트 사진 대신 블로그 캐릭터 오목눈이를 사용"
        },
        {
          "src": "assets/projects/blog-card-2.jpg",
          "alt": "변진섭 콘서트 예매 정보 카드",
          "width": 398,
          "height": 298
        },
        {
          "src": "assets/projects/blog-card-3.jpg",
          "alt": "사이먼 도미닉 콘서트 예매 정보 카드",
          "width": 397,
          "height": 298
        },
        {
          "src": "assets/projects/blog-card-4.jpg",
          "alt": "홍이삭 소극장 콘서트 예매 정보 카드",
          "width": 399,
          "height": 298
        }
      ],
      "contentStatus": "from_portfolio_2026_10",
      "sourceNote": "김시언_포트폴리오_카카오뱅크.pdf (2026.10)",
      "cover": {
        "type": "metric",
        "label": "하루 평균 조회",
        "value": "5 → 159회",
        "note": "공연 글 시작 전 → 후",
        "groups": [
          {
            "label": "에세이 중심 · 5회",
            "count": 1,
            "tone": "muted"
          },
          {
            "label": "공연 글 병행 · 159회",
            "count": 32,
            "tone": "accent"
          }
        ],
        "unit": "블록 1개 = 하루 평균 조회 5회"
      }
    },
    {
      "id": "oztrip",
      "name": "OZ TRIP",
      "desc": "복잡한 여행 선택을 간편하게 만드는 추천 서비스",
      "tags": "시니어 여행 추천 알고리즘 사용자 경험",
      "problem": [
        "여행지에 관심이 생겨도 코스를 고르고 일정을 구성하는 과정은 복잡합니다. 이를 시니어 여행의 ‘선택 경로’ 문제로 재정의했습니다."
      ],
      "approach": [
        "출발역 기준 근교 추천과 수익 모델 3단계를 설계했습니다.",
        "여행 추천 구조와 코스 선택 흐름을 설계하고, 코스 확정·소요 시간·공유를 효과성 측정 항목으로 정리했습니다."
      ],
      "evidence": null,
      "categories": [
        "서비스 기획"
      ],
      "role": null,
      "period": null,
      "outcome": [
        "경진대회 탈락: 구조 증명·실적 부족."
      ],
      "link": null,
      "image": {
        "src": "assets/projects/oztrip-screen.jpg",
        "alt": "OZ TRIP 화면 — 오늘은 어디로 가 볼까요?, 출발역 선택",
        "width": 258,
        "height": 540
      },
      "contentStatus": "from_portfolio_2026_10",
      "displayProblem": "시니어 여행을 ‘선택 경로’ 문제로 다시 정의한 근교 여행 추천",
      "judgmentEvidence": null,
      "detailImages": [],
      "sourceNote": "김시언_포트폴리오_카카오뱅크.pdf (2026.10)",
      "learned": [
        "혁신 기술보다 쉽게 쓰는 간단한 앱."
      ],
      "cover": {
        "type": "symbol",
        "symbol": "route"
      }
    },
    {
      "id": "draft",
      "name": "경매 드래프트 시스템",
      "categories": [
        "서비스 기획"
      ],
      "desc": "6팀 30명 선수 경매 규칙을 문서와 앱으로 고정",
      "displayProblem": "6팀 30명 선수 경매 규칙을 문서와 앱으로 고정",
      "problem": [
        "6팀 30명 선수 경매 규칙을 정리해야 했습니다."
      ],
      "judgmentEvidence": null,
      "approach": [
        "팀당 1,000점 · 티어별 시작가로 규칙을 정하고, React 앱으로 만들었습니다."
      ],
      "outcome": [
        "명세서 v2.0으로 규칙을 고정했습니다."
      ],
      "role": null,
      "period": null,
      "link": null,
      "image": null,
      "detailImages": [],
      "contentStatus": "from_portfolio_2026_10",
      "sourceNote": "김시언_포트폴리오_카카오뱅크.pdf (2026.10)",
      "cover": {
        "type": "symbol",
        "symbol": "gavel"
      }
    },
    {
      "id": "cardnews",
      "name": "카드뉴스 자동화",
      "categories": [
        "서비스 기획"
      ],
      "desc": "카드뉴스 7단계 중 4단계를 자동으로",
      "displayProblem": "카드뉴스 7단계 중 4단계를 자동으로",
      "problem": [
        "OCM 인스타그램 카드뉴스를 반복해서 만드는 일을 줄여야 했습니다."
      ],
      "judgmentEvidence": [
        "판단과 승인은 사람이, 반복은 스크립트·루틴이 맡도록 7단계를 나눴습니다: 재료 수집 → 원고 → 빌드 → Figma → 검수 → 게시 승인 → 성과 분석."
      ],
      "approach": [
        {
          "label": "재료 수집 · 자동",
          "text": "노션 콘티·공식 소식·경기 일정, 매주 일요일 일괄"
        },
        {
          "label": "원고 · 직접",
          "text": "사실 확인표(값·출처·날짜) 먼저 작성"
        },
        {
          "label": "빌드 · 자동",
          "text": "카드 데이터 → SVG·HTML, 종류별 레이아웃"
        },
        {
          "label": "Figma · 자동",
          "text": "업로드·자간 보정, 버전 보관, PNG 내보내기"
        },
        {
          "label": "검수 · 직접",
          "text": "금지어·사진 중복·출처·글자 넘침"
        },
        {
          "label": "게시 승인 · 직접",
          "text": "웹 20장·예약 10장, 음악은 앱에서"
        },
        {
          "label": "성과 분석 · 자동",
          "text": "매일 CSV 수집, 게시 후 7·14·30일 비교"
        },
        "분업: 시언(기획 결정 · 검수 · 승인) · Aside(빌드 · Figma · 게시 · CSV) · Claude Code(스크립트 · 인사이트 분석). Figma ‘OCM 카드뉴스 아카이브’에서 새 버전은 이전 버전 위에 쌓고 지우지 않습니다(최대 v15)."
      ],
      "outcome": [
        "7단계 중 4단계를 자동화했습니다."
      ],
      "role": "기획 결정 · 검수 · 승인",
      "period": "2026 시즌3",
      "link": null,
      "image": null,
      "detailImages": [],
      "contentStatus": "from_portfolio_2026_10",
      "sourceNote": "김시언_포트폴리오_카카오뱅크.pdf (2026.10)",
      "cover": {
        "type": "symbol",
        "symbol": "cards"
      }
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
      "sourceNote": "이전 포트폴리오 허브의 소개 초안. 실제 구현·기여·성과 검증 전.",
      "cover": {
        "type": "symbol",
        "symbol": "backpack"
      }
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
      "sourceNote": "이전 포트폴리오 허브의 소개 초안. 실제 구현·기여·성과 검증 전.",
      "cover": {
        "type": "symbol",
        "symbol": "box"
      }
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
      "sourceNote": "이전 포트폴리오 허브의 소개 초안. 실제 구현·기여·성과 검증 전.",
      "cover": {
        "type": "symbol",
        "symbol": "book"
      }
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
      "sourceNote": "이전 포트폴리오 허브의 소개 초안. 실제 구현·기여·성과 검증 전.",
      "cover": {
        "type": "symbol",
        "symbol": "sprout"
      }
    }
  ]
};
