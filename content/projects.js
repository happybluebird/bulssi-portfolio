/* 프로젝트 목차·상세 데이터. = 뒤의 { } 는 JSON 그대로입니다. 목록 순서 = 목차 순서.
   - 아웃백·우주도서관·OCM·기쁜오목눈이·OZ TRIP·경매 드래프트·카드뉴스 자동화: 김시언_포트폴리오_카카오뱅크.pdf(2026.10)에서 옮김
   - 스쿨존윅·이사이상무·기억의 궁전: 각 GitHub 저장소 README·CONTRIBUTORS·커밋 기록에서 옮김(2026-11). 팀 결과는 metricsNote에 '팀 결과'로 표시 (SEED는 제작 중단으로 2026-11-05 목록에서 뺌)
   problem·judgmentEvidence·approach·outcome·learned 는 문장 배열. {"label","text"} 는 이름표가 붙은 줄로 표시.
   cover: 목차 카드·상세 위쪽 소표지 (metric = 확인된 지표 → 블록 구성, symbol = 상징 → 빛 → 이름,
          board = 보드게임 판 위를 팀 말이 달림, book = 카드뉴스가 책처럼 넘어감, flight = 낮게 날던 오목눈이가 하늘 높이, video = 실제 사이트 시연 영상).
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
        "아웃백 제2회 D.N.A 이달의 사원(2023.09.17, 하남스타필드점) · 2025 시즌(서비스 교육) 3개월 연속 이달의 우수사원."
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
        "type": "board",
        "image": {
          "src": "assets/projects/outback-board-08-race.jpg",
          "width": 533,
          "height": 319
        },
        "pieces": [
          "#D3372D",
          "#2F62C6",
          "#2E9B4D",
          "#EFBD2E"
        ],
        "track": [
          [
            25.9,
            91.2
          ],
          [
            24.9,
            76.8
          ],
          [
            24.9,
            67.7
          ],
          [
            24.9,
            58.3
          ],
          [
            24.9,
            48.9
          ],
          [
            24.9,
            39.5
          ],
          [
            24.9,
            30.1
          ],
          [
            24.9,
            20.7
          ],
          [
            25.7,
            9.4
          ],
          [
            33.3,
            8.5
          ],
          [
            38.8,
            8.5
          ],
          [
            44.4,
            8.5
          ],
          [
            50,
            8.5
          ],
          [
            55.7,
            8.5
          ],
          [
            61.3,
            8.5
          ],
          [
            66.8,
            8.5
          ],
          [
            74.6,
            9.4
          ],
          [
            75.3,
            20.7
          ],
          [
            75.3,
            30.1
          ],
          [
            75.3,
            39.5
          ],
          [
            75.3,
            48.9
          ],
          [
            75.3,
            58.3
          ],
          [
            75.3,
            67.7
          ],
          [
            75.3,
            76.8
          ],
          [
            74.2,
            91.2
          ],
          [
            66.3,
            89.7
          ],
          [
            61.2,
            89.7
          ],
          [
            56,
            89.7
          ],
          [
            50.8,
            89.7
          ],
          [
            45.5,
            89.7
          ],
          [
            40.1,
            89.7
          ],
          [
            34.6,
            89.7
          ]
        ],
        "label": "8월 팀 프로모션",
        "title": "국내 여행 보드게임",
        "note": "객단가 전월 대비 +2,712원"
      },
      "training": {
        "title": "FOH CLASS 서비스 트레이닝북",
        "meta": "2024.06 · 직접 기획·제작 · 홀(FOH) 직원 교육용",
        "intro": "홀 직원 교육용 트레이닝북을 직접 만들었습니다. 일을 시작하기 전의 태도에서 고객 앞에서 꺼낼 말 한마디까지, 네 장으로 나눴습니다.",
        "pages": [
          {
            "src": "assets/projects/foh/s01.webp",
            "alt": "표지: FOH CLASS 서비스 트레이닝북 — 가족을 모시듯, 뜻깊은 경험과 좋은 추억을 만드는 법",
            "width": 1280,
            "height": 720
          },
          {
            "src": "assets/projects/foh/s02.webp",
            "alt": "목차: 01 MIND · 02 SERVICE · 03 STRATEGY · 04 CLOSE",
            "width": 1280,
            "height": 720
          },
          {
            "src": "assets/projects/foh/s03.webp",
            "alt": "01 MIND: 우리는 모두 사람 — 처음이니까 배우고 익히며 성장한다, 도덕과 책임감",
            "width": 1280,
            "height": 720
          },
          {
            "src": "assets/projects/foh/s04.webp",
            "alt": "좋은 서비스를 위한 4가지 태도: 겸손, 자기 객관화, 기분이 태도가 되지 않기, 긍정",
            "width": 1280,
            "height": 720
          },
          {
            "src": "assets/projects/foh/s05.webp",
            "alt": "02 SERVICE: 좋은 서비스는 사소한 것부터 차곡차곡 쌓아 뜻깊은 경험을 드리는 것",
            "width": 1280,
            "height": 720
          },
          {
            "src": "assets/projects/foh/s06.webp",
            "alt": "선 서비스를 만드는 세 문장",
            "width": 1280,
            "height": 720
          },
          {
            "src": "assets/projects/foh/s07.webp",
            "alt": "사례 1: 메뉴 선택을 돕는 세심한 관찰",
            "width": 1280,
            "height": 720
          },
          {
            "src": "assets/projects/foh/s08.webp",
            "alt": "사례 2: 아이의 생일을 기억하는 서비스",
            "width": 1280,
            "height": 720
          },
          {
            "src": "assets/projects/foh/s09.webp",
            "alt": "현장에서 실천하는 6가지 서비스 전략",
            "width": 1280,
            "height": 720
          },
          {
            "src": "assets/projects/foh/s10.webp",
            "alt": "마무리: 서비스는 어떻게 생각하고 실천하느냐에 달렸다",
            "width": 1280,
            "height": 720
          }
        ],
        "pagesNote": "원본 11쪽 가운데 매니저 실명이 담긴 1쪽(매니저들의 조언)은 빼고 실었습니다.",
        "chapters": [
          {
            "no": "01",
            "name": "MIND",
            "text": "일을 시작하기 전의 생각과 태도. 겸손, 자기 객관화, 기분이 태도가 되지 않기, 긍정"
          },
          {
            "no": "02",
            "name": "SERVICE",
            "text": "고객이 요청하기 전에 먼저 다가가는 ‘선 서비스’와 현장 사례 2가지"
          },
          {
            "no": "03",
            "name": "STRATEGY",
            "text": "현장에서 실천하는 6가지 전략. 넓은 시야, 대화, 표정·목소리, 과도한 관심 금지, 좋은 기억, 인사"
          },
          {
            "no": "04",
            "name": "CLOSE",
            "text": "혼자 풀기 어려울 때 기댈 매니저들의 조언과 마무리"
          }
        ],
        "phrasesLabel": "선 서비스를 만드는 세 문장",
        "phrases": [
          "음료수 더 리필 해드릴까요?",
          "피클 더 준비 해드릴까요?",
          "실례하겠습니다. 편안한 대화 환경을 위해 다 드신 그릇 정리해 드릴까요?"
        ],
        "case": {
          "label": "사례 · 메뉴 선택을 돕는 세심한 관찰",
          "steps": [
            "5분이 지나도 블로그와 메뉴판을 번갈아 보며 고민하는 고객에게 먼저 추천을 제안",
            "토마호크 스테이크의 세 부위를 설명하고 제휴 할인·멤버십 쿠폰·와인 혜택을 안내",
            "컷팅부터 중간 체크, 후식, 남은 빵 포장까지 끝까지 챙김"
          ],
          "quote": "너무 감사합니다. 잘 몰랐는데.. 되게 친절하시고 맛있게 잘 먹었어요. 다음에 또 올게요!",
          "note": "트레이닝북 7쪽 · 할인·혜택은 2024년 6월 기준"
        },
        "recognition": {
          "image": {
            "src": "assets/projects/outback-dna.jpg",
            "alt": "아웃백 하남스타필드점 D.N.A 선정 증서. 이름 김시언, 날짜 2023.09.17, 고객의 소리 원문이 함께 실려 있음",
            "width": 520,
            "height": 562,
            "caption": "D.N.A 선정 증서 · 고객의 소리 원문 포함"
          },
          "quote": {
            "text": "어느 외식업체에서도 만나 보지 못했던 귀한 직원인 것 같습니다",
            "source": "2023.09.17 고객의 소리 중"
          },
          "awards": [
            {
              "k": "2023.09.17 · 하남스타필드점",
              "v": "아웃백 제2회 D.N.A 이달의 사원"
            },
            {
              "k": "2025 시즌 · 서비스 교육",
              "v": "3개월 연속 이달의 우수사원"
            }
          ]
        }
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
        "height": 500,
        "showInDetail": false
      },
      "contentStatus": "from_portfolio_2026_10",
      "displayProblem": "NASA·ESA 관측 정보를 한국어로 쉽게 탐색하는 서비스",
      "judgmentEvidence": [
        "반응은 GA4로 측정하되, 해외 유입을 걸러 국내 실사용자 기준으로 봤습니다."
      ],
      "detailImages": [
        {
          "src": "assets/projects/space-demo-poster.jpg",
          "video": "assets/projects/space-demo.mp4",
          "webm": "assets/projects/space-demo.webm",
          "width": 1280,
          "height": 740,
          "alt": "우주도서관 시연 영상: 생일을 넣어 그날 NASA 사진과 한국어 해설을 보고, 오늘의 우주와 천체보관소를 둘러봄",
          "caption": "실제 사이트 시연(2026.11.05 녹화, 19초로 줄임: 날짜 입력은 2배·나머지는 1.25배 빠르게) · 생일 우주 → 한국어 해설 → 오늘의 우주 → 천체보관소"
        }
      ],
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
        "type": "video",
        "src": "assets/projects/space-demo.mp4",
        "webm": "assets/projects/space-demo.webm",
        "poster": "assets/projects/space-demo-poster.jpg",
        "url": "cosmoslib.com"
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
        "type": "book",
        "pages": [
          "assets/projects/ocm-book/p000.webp",
          "assets/projects/ocm-book/p001.webp",
          "assets/projects/ocm-book/p002.webp",
          "assets/projects/ocm-book/p003.webp",
          "assets/projects/ocm-book/p004.webp",
          "assets/projects/ocm-book/p005.webp",
          "assets/projects/ocm-book/p006.webp",
          "assets/projects/ocm-book/p007.webp",
          "assets/projects/ocm-book/p008.webp",
          "assets/projects/ocm-book/p009.webp",
          "assets/projects/ocm-book/p010.webp",
          "assets/projects/ocm-book/p011.webp",
          "assets/projects/ocm-book/p012.webp",
          "assets/projects/ocm-book/p013.webp",
          "assets/projects/ocm-book/p014.webp",
          "assets/projects/ocm-book/p015.webp",
          "assets/projects/ocm-book/p016.webp",
          "assets/projects/ocm-book/p017.webp",
          "assets/projects/ocm-book/p018.webp",
          "assets/projects/ocm-book/p019.webp",
          "assets/projects/ocm-book/p020.webp",
          "assets/projects/ocm-book/p021.webp",
          "assets/projects/ocm-book/p022.webp",
          "assets/projects/ocm-book/p023.webp",
          "assets/projects/ocm-book/p024.webp",
          "assets/projects/ocm-book/p025.webp",
          "assets/projects/ocm-book/p026.webp",
          "assets/projects/ocm-book/p027.webp",
          "assets/projects/ocm-book/p028.webp",
          "assets/projects/ocm-book/p029.webp",
          "assets/projects/ocm-book/p030.webp",
          "assets/projects/ocm-book/p031.webp",
          "assets/projects/ocm-book/p032.webp",
          "assets/projects/ocm-book/p033.webp",
          "assets/projects/ocm-book/p034.webp",
          "assets/projects/ocm-book/p035.webp",
          "assets/projects/ocm-book/p036.webp",
          "assets/projects/ocm-book/p037.webp",
          "assets/projects/ocm-book/p038.webp",
          "assets/projects/ocm-book/p039.webp",
          "assets/projects/ocm-book/p040.webp",
          "assets/projects/ocm-book/p041.webp",
          "assets/projects/ocm-book/p042.webp",
          "assets/projects/ocm-book/p043.webp",
          "assets/projects/ocm-book/p044.webp",
          "assets/projects/ocm-book/p045.webp",
          "assets/projects/ocm-book/p046.webp",
          "assets/projects/ocm-book/p047.webp",
          "assets/projects/ocm-book/p048.webp",
          "assets/projects/ocm-book/p049.webp",
          "assets/projects/ocm-book/p050.webp",
          "assets/projects/ocm-book/p051.webp",
          "assets/projects/ocm-book/p052.webp",
          "assets/projects/ocm-book/p053.webp",
          "assets/projects/ocm-book/p054.webp",
          "assets/projects/ocm-book/p055.webp",
          "assets/projects/ocm-book/p056.webp",
          "assets/projects/ocm-book/p057.webp",
          "assets/projects/ocm-book/p058.webp",
          "assets/projects/ocm-book/p059.webp",
          "assets/projects/ocm-book/p060.webp",
          "assets/projects/ocm-book/p061.webp",
          "assets/projects/ocm-book/p062.webp",
          "assets/projects/ocm-book/p063.webp",
          "assets/projects/ocm-book/p064.webp",
          "assets/projects/ocm-book/p065.webp",
          "assets/projects/ocm-book/p066.webp",
          "assets/projects/ocm-book/p067.webp",
          "assets/projects/ocm-book/p068.webp",
          "assets/projects/ocm-book/p069.webp",
          "assets/projects/ocm-book/p070.webp",
          "assets/projects/ocm-book/p071.webp",
          "assets/projects/ocm-book/p072.webp",
          "assets/projects/ocm-book/p073.webp",
          "assets/projects/ocm-book/p074.webp",
          "assets/projects/ocm-book/p075.webp",
          "assets/projects/ocm-book/p076.webp",
          "assets/projects/ocm-book/p077.webp",
          "assets/projects/ocm-book/p078.webp",
          "assets/projects/ocm-book/p079.webp",
          "assets/projects/ocm-book/p080.webp",
          "assets/projects/ocm-book/p081.webp",
          "assets/projects/ocm-book/p082.webp",
          "assets/projects/ocm-book/p083.webp",
          "assets/projects/ocm-book/p084.webp",
          "assets/projects/ocm-book/p085.webp",
          "assets/projects/ocm-book/p086.webp",
          "assets/projects/ocm-book/p087.webp",
          "assets/projects/ocm-book/p088.webp",
          "assets/projects/ocm-book/p089.webp",
          "assets/projects/ocm-book/p090.webp",
          "assets/projects/ocm-book/p091.webp",
          "assets/projects/ocm-book/p092.webp",
          "assets/projects/ocm-book/p093.webp",
          "assets/projects/ocm-book/p094.webp",
          "assets/projects/ocm-book/p095.webp",
          "assets/projects/ocm-book/p096.webp",
          "assets/projects/ocm-book/p097.webp",
          "assets/projects/ocm-book/p098.webp",
          "assets/projects/ocm-book/p099.webp",
          "assets/projects/ocm-book/p100.webp",
          "assets/projects/ocm-book/p101.webp",
          "assets/projects/ocm-book/p102.webp",
          "assets/projects/ocm-book/p103.webp",
          "assets/projects/ocm-book/p104.webp",
          "assets/projects/ocm-book/p105.webp",
          "assets/projects/ocm-book/p106.webp",
          "assets/projects/ocm-book/p107.webp",
          "assets/projects/ocm-book/p108.webp",
          "assets/projects/ocm-book/p109.webp",
          "assets/projects/ocm-book/p110.webp",
          "assets/projects/ocm-book/p111.webp",
          "assets/projects/ocm-book/p112.webp",
          "assets/projects/ocm-book/p113.webp",
          "assets/projects/ocm-book/p114.webp",
          "assets/projects/ocm-book/p115.webp",
          "assets/projects/ocm-book/p116.webp",
          "assets/projects/ocm-book/p117.webp",
          "assets/projects/ocm-book/p118.webp",
          "assets/projects/ocm-book/p119.webp",
          "assets/projects/ocm-book/p120.webp",
          "assets/projects/ocm-book/p121.webp",
          "assets/projects/ocm-book/p122.webp",
          "assets/projects/ocm-book/p123.webp",
          "assets/projects/ocm-book/p124.webp",
          "assets/projects/ocm-book/p125.webp",
          "assets/projects/ocm-book/p126.webp",
          "assets/projects/ocm-book/p127.webp",
          "assets/projects/ocm-book/p128.webp",
          "assets/projects/ocm-book/p129.webp"
        ],
        "stops": [
          1,
          35,
          59,
          117
        ],
        "markImage": "assets/projects/ocm-logo.jpg",
        "caption": "게시한 카드뉴스 17세트 · 121장 · 2026.10.15~11.04"
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
        "type": "flight",
        "label": "하루 평균 조회",
        "unit": "회",
        "from": {
          "value": 5,
          "label": "에세이 중심",
          "note": "02.19~08.22"
        },
        "to": {
          "value": 159,
          "label": "공연 글 병행",
          "note": "08.23~10.27"
        }
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
      "link": "https://oz-trip.netlify.app/",
      "image": {
        "src": "assets/projects/oztrip-screen.jpg",
        "alt": "OZ TRIP 화면 — 오늘은 어디로 가 볼까요?, 출발역 선택",
        "width": 258,
        "height": 540,
        "showInDetail": false
      },
      "contentStatus": "from_portfolio_2026_10",
      "displayProblem": "시니어 여행을 ‘선택 경로’ 문제로 다시 정의한 근교 여행 추천",
      "judgmentEvidence": null,
      "detailImages": [
        {
          "src": "assets/projects/oztrip-demo-poster.jpg",
          "video": "assets/projects/oztrip-demo.mp4",
          "webm": "assets/projects/oztrip-demo.webm",
          "width": 512,
          "height": 740,
          "alt": "OZ TRIP 시연 영상: 출발역을 수원역으로 바꾸고 거리·취향·익숙함을 고른 뒤, 추천 1위 서호공원의 하루 코스와 식사 장소, 다음 목적지를 봄",
          "caption": "실제 사이트 시연(2026.11.05 녹화, 16초) · 출발역 변경 → 거리·취향 선택 → 추천 결과 → 하루 코스"
        }
      ],
      "sourceNote": "김시언_포트폴리오_카카오뱅크.pdf (2026.10)",
      "learned": [
        "혁신 기술보다 쉽게 쓰는 간단한 앱."
      ],
      "cover": {
        "type": "video",
        "frame": "phone",
        "src": "assets/projects/oztrip-demo.mp4",
        "webm": "assets/projects/oztrip-demo.webm",
        "poster": "assets/projects/oztrip-demo-poster.jpg",
        "url": "oz-trip.netlify.app"
      },
      "linkLabel": "oz-trip.netlify.app"
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
      "link": "https://ocm-draft-studio.happychovy.chatgpt.site/",
      "image": null,
      "detailImages": [
        {
          "src": "assets/projects/draft-demo-poster.jpg",
          "video": "assets/projects/draft-demo.mp4",
          "webm": "assets/projects/draft-demo.webm",
          "width": 1280,
          "height": 740,
          "alt": "OCM 드래프트 스튜디오 화면 둘러보기: 6팀 경매 보드, 공개 선수·관전 모드, 방송 화면, 드래프트 방 만들기 설정과 선수 24명 명단",
          "caption": "실제 사이트 둘러보기(2026.11.05 녹화, 17초) · 입찰·방 만들기는 공유 서버에 저장되는 기능이라 실행하지 않고 화면만 보여 줌"
        }
      ],
      "contentStatus": "from_portfolio_2026_10",
      "sourceNote": "김시언_포트폴리오_카카오뱅크.pdf (2026.10)",
      "cover": {
        "type": "video",
        "src": "assets/projects/draft-demo.mp4",
        "webm": "assets/projects/draft-demo.webm",
        "poster": "assets/projects/draft-demo-poster.jpg",
        "url": "ocm-draft-studio"
      },
      "linkLabel": "OCM 드래프트 스튜디오"
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
      "categories": [
        "서비스 기획"
      ],
      "desc": "성남시 스쿨존 142곳의 어린이 사고 위험도 예측",
      "displayProblem": "안전시설과 도로 구조로 스쿨존 어린이 사고 위험도를 예측",
      "tags": "스쿨존 데이터 전처리 EDA 머신러닝 Azure Custom Vision Streamlit",
      "problem": [
        "스쿨존마다 안전시설과 도로 구조가 달라, 어느 곳부터 시설을 보강해야 할지 판단할 근거가 필요했습니다.",
        "안전시설물 데이터와 로드뷰 이미지로 스쿨존별 어린이 교통사고 위험도를 예측하는 모델을 6인 팀으로 만들었습니다(MS AI School 9기 1차 프로젝트)."
      ],
      "judgmentEvidence": [
        {
          "label": "분석 범위",
          "text": "경기도 어린이보호구역 2,932곳 중 성남시(분당·수정·중원구) 142곳으로 좁혔습니다."
        },
        {
          "label": "사고 반경",
          "text": "경기도 사고다발지 2,611건을 스쿨존 반경 200m로 묶으니 173건이었고, 300m로 넓혀 195건으로 정했습니다."
        },
        {
          "label": "깨진 값",
          "text": "사고 유형이 ‘보행어?’로 깨진 8건을 ‘보행어린이사고다발지’로 바로잡았습니다(54건 → 62건)."
        },
        {
          "label": "위험 점수",
          "text": "사망 5 · 중상 3 · 경상 1 · 부상 0.5점으로 더해 10점 이상 Red, 5점 이상 Yellow, 그 아래 Green으로 나누는 기준을 정의했습니다."
        }
      ],
      "approach": [
        {
          "label": "내 역할 · 전처리",
          "text": "성남시 스쿨존·사고 데이터를 정제하고, 학교마다 반경 300m 안의 시설물 10종(CCTV·무인카메라·신호등·횡단보도·옐로카펫 등)을 세어 지표로 만들었습니다."
        },
        {
          "label": "내 역할 · EDA",
          "text": "사고 TOP 10 학교의 연도별 사고, 학교별 세부 위험 점수(사고 30 · 어린이 인구 13 · 어린이 비율 7), 시설물 K-means 3등급(취약 · 보통 · 우수) 분포를 그렸습니다."
        },
        {
          "label": "팀 파이프라인",
          "text": "로드뷰 약 4,000장 → Azure Custom Vision으로 도로 구조 위험도(1단계) → 시설 데이터와 합쳐 로지스틱 회귀(L1 · SMOTE · OOF, 2단계) → SHAP 해석 → Streamlit 대시보드"
        }
      ],
      "outcome": [
        "최종 모델은 AUC 0.807 · Recall 0.750이고, 변수 17개 중 5개(어린이 인구, CCTV × 어린이 인구, 사고 이력, 과속방지턱, 횡단보도)를 남겼습니다.",
        "안전 D등급 구역의 평균 사고는 12.2건으로 A등급(1.6건)의 7.6배였고, 광명시 51곳으로 외부 검증했습니다.",
        "대시보드에서 지도 · 등급 · D등급 시설 보강 시뮬레이션을 보여 줍니다(CCTV 1대 추가 시 위험 확률 −2.3%p)."
      ],
      "metrics": [
        {
          "value": "0.807",
          "label": "최종 모델 AUC",
          "note": "Recall 0.750"
        },
        {
          "value": "7.6배",
          "label": "D등급 vs A등급 평균 사고",
          "note": "12.2건 vs 1.6건"
        },
        {
          "value": "142곳",
          "label": "분석한 성남시 스쿨존",
          "note": "외부 검증 광명시 51곳"
        }
      ],
      "metricsNote": "팀 결과 · GitHub README 기준",
      "role": "데이터 전처리 · EDA (6인 팀)",
      "period": "2026.02.23 ~ 03.10",
      "link": "https://github.com/happybluebird/Microsoft-Ai-School-1st-Project_School-Zone-Safety-Risk-Prediction-Model",
      "linkLabel": "GitHub 저장소",
      "image": null,
      "detailImages": [
        {
          "src": "assets/projects/school-demo-poster.jpg",
          "video": "assets/projects/school-demo.mp4",
          "webm": "assets/projects/school-demo.webm",
          "width": 1280,
          "height": 740,
          "alt": "스쿨존 안전 분석 대시보드 시연 영상: 성남시 스쿨존 142개소 지표 카드와 안전점수 상·하위 5곳, 안전 등급 색으로 표시한 성남 지도, D등급 시설별 개선 제안, 구별 시설 보유 현황 차트, 광명시 51개소 시뮬레이션 지도, 모델 분석의 시스템 아키텍처를 차례로 봄",
          "caption": "팀 Streamlit 대시보드 시연(Streamlit Cloud 배포본, 2026.11.05 녹화, 22초 · 1.3배) · 개요 → 성남 지도 → D등급 개선 제안 → 시설점수 → 광명 시뮬레이션 → 모델 분석"
        }
      ],
      "contentStatus": "from_github_2026_11",
      "sourceNote": "GitHub 저장소 README·커밋 기록 (2026.11 확인)",
      "cover": {
        "type": "video",
        "src": "assets/projects/school-demo.mp4",
        "webm": "assets/projects/school-demo.webm",
        "poster": "assets/projects/school-demo-poster.jpg",
        "url": "schoolzone-dashboard · Streamlit"
      }
    },
    {
      "id": "moving",
      "name": "이사이상무",
      "categories": [
        "서비스 기획",
        "UI/UX"
      ],
      "desc": "이사 여정 전체를 법령 근거로 안내하는 AI 이사 도우미",
      "displayProblem": "사람마다 다른 이사 행정을 맞춤 체크리스트로",
      "tags": "이사 행정 체크리스트 RAG Azure OpenAI React Native UI 디자인",
      "problem": [
        "이사는 전입신고 · 확정일자 · 공과금 · 우편물 전송 같은 행정의 연쇄이고, 상당수는 기한을 놓치면 과태료가 붙습니다.",
        "자취·가족, 월세·전세, 반려동물·자녀 여부에 따라 할 일이 다른데, 기존 서비스는 신고를 처리해 줄 뿐 무엇이 필요한지는 알려 주지 않습니다."
      ],
      "judgmentEvidence": [
        {
          "label": "하이브리드",
          "text": "모든 조건을 LLM에 넘기니 같은 입력에도 결과가 달라졌습니다. 정해진 조건(토글)은 정적 매핑으로, 자유 텍스트만 LLM으로 나눴습니다."
        },
        {
          "label": "판정은 규칙으로",
          "text": "등기부등본은 추출(Document Intelligence) · 판정(공개한 규칙) · 해석(GPT-4o)을 나눠 LLM이 위험을 판정하지 않게 했고, 종합 점수는 일부러 만들지 않았습니다."
        }
      ],
      "approach": [
        {
          "label": "내 역할",
          "text": "UI 제작·디자인, 도메인 리서치, AI 윤리 6대 원칙 정리, 데이터 수집·전처리, 등기부등본 학습 데이터 라벨링, 앱 테스트, 발표 슬라이드 구성"
        },
        {
          "label": "발표",
          "text": "문제 정의와 서비스 소개 파트"
        },
        {
          "label": "이사 체크리스트",
          "text": "조건을 넣으면 법적 기한 기준 D-day 타임라인을 만들고, 기한이 공휴일이면 다음 평일로 옮깁니다."
        },
        {
          "label": "등기부등본 해석기",
          "text": "PDF를 올리면 위험 · 주의 · 안전으로 나눠 풀어 설명합니다."
        },
        {
          "label": "꽉꽉봇",
          "text": "법령 · 해설 · 기관 정보 인덱스 3개를 함께 찾아 출처와 함께 답하는 RAG 챗봇(음성 입력)"
        },
        {
          "label": "책임 있는 AI",
          "text": "개인정보 최소 수집(비로그인 · 업로드 즉시 삭제), 종합 점수 미제공, 위험 분류 규칙 공개, 출처 공개, 도메인 한정"
        }
      ],
      "outcome": [
        "React Native(Expo) 앱으로 체크리스트 · 등기부등본 해석기 · 꽉꽉봇을 만들었습니다.",
        "법령 1,635 · 해설 340 · 기관 매핑 122건으로 검색 인덱스 3개를 구축했습니다."
      ],
      "role": "UI 디자인 · 리서치 · 발표 (6인 팀)",
      "period": "2026.04.13 ~ 04.26",
      "link": "https://github.com/happybluebird/Microsoft-Ai-School-2nd-project-isa-isangmu",
      "linkLabel": "GitHub 저장소",
      "image": null,
      "detailImages": [
        {
          "src": "assets/projects/moving-demo-poster.jpg",
          "video": "assets/projects/moving-demo.mp4",
          "webm": "assets/projects/moving-demo.webm",
          "width": 512,
          "height": 740,
          "alt": "이사이상무 시연 영상: 시작하기 → 체크리스트 조건(자취·월세·반려동물, 이사일 2027년 1월 15일)을 고르고 생성 → 법령 근거가 달린 D-day 타임라인을 내려 보고 전입신고 항목 상세(마감·과태료·주민등록법 제16조)를 연 뒤, 홈의 D-71 화면, 계약 전 체크(위험 샘플 입력), 꽉꽉봇 화면을 둘러봄",
          "caption": "실제 앱 시연(웹 빌드 + 팀 서버, 2026.11.05 녹화, 23초 · 1.3배, 서버 대기는 줄임) · 팀 Azure 자원이 내려가 체크리스트는 AI 대신 규칙 기반 기본 결과로 나오고(화면 위 안내), 등기부등본 분석·꽉꽉봇 답변은 실행하지 않고 화면만 보여 줌"
        }
      ],
      "contentStatus": "from_github_2026_11",
      "sourceNote": "GitHub 저장소 README (2026.11 확인)",
      "cover": {
        "type": "video",
        "frame": "phone",
        "src": "assets/projects/moving-demo.mp4",
        "webm": "assets/projects/moving-demo.webm",
        "poster": "assets/projects/moving-demo-poster.jpg",
        "url": "이사이상무 앱"
      }
    },
    {
      "id": "mindpalace",
      "name": "기억의 궁전",
      "categories": [
        "서비스 기획",
        "UI/UX"
      ],
      "desc": "학습 PDF를 걸어 다니며 외우는 3D 기억의 궁전으로",
      "displayProblem": "학습 자료를 걸어서 외우는 3D 공간으로 바꾸는 서비스",
      "tags": "기억의 궁전 3D GraphRAG Azure 랜딩 UI 공간음향",
      "problem": [
        "여러 번 읽어도 잊는 건 기억이 사라져서가 아니라 다시 꺼낼 단서가 없어서입니다. 목록처럼 평평한 자료에는 위치 단서가 없습니다.",
        "기억의 궁전(장소법)은 효과가 알려져 있지만 분류 · 단서화 · 배치를 직접 설계해야 해서 쓰기 어렵습니다. 이 설계를 AI가 맡는 서비스를 7인 팀으로 만들었습니다."
      ],
      "judgmentEvidence": [
        {
          "label": "근거",
          "text": "일반인도 하루 30분 · 6주 훈련으로 무작위 단어 회상이 26개에서 62개로 늘었다는 연구(Dresler et al., Neuron 2017)에서 출발했습니다."
        },
        {
          "label": "멘토 피드백",
          "text": "범용 도메인 대신 한국사 · AI 교안으로 좁혀 검증하고, 직접 조립한 파이프라인 대신 GraphRAG를 본체로 삼았습니다."
        }
      ],
      "approach": [
        {
          "label": "서비스 흐름",
          "text": "PDF 업로드 → GraphRAG로 개념·관계 추출 → VWorld 3D 지도에서 명소 선택 → 가구마다 개념이 놓인 방을 1인칭으로 걷기 → 간격 복습 · 챗봇 · 퀴즈"
        },
        {
          "label": "내 역할 · 초기 설계",
          "text": "전체 파이프라인 초안을 설계하고, gpt-4.1-mini로 목차 추출을 실험해 비용(교안 5~6원 · 국사 13~15원)을 산정했습니다."
        },
        {
          "label": "내 역할 · 홈",
          "text": "히어로 · 문제 제기 · 체험 순서 · FAQ 카피와 화면, 엔딩 입장 영상을 만들었습니다."
        },
        {
          "label": "내 역할 · 챗봇·퀴즈",
          "text": "방 안에서 바로 푸는 퀴즈 설정 화면과 위젯, 챗봇 음성 안내(TTS) · 음성 입력(STT), RAG 답변의 출처 복원을 맡았습니다."
        },
        {
          "label": "내 역할 · 공간음향",
          "text": "입장 지점을 기준으로 소리에 방향이 생기는 HRTF 3D 오디오를 넣고, 개념 카드의 ‘설명 듣기’와 연결했습니다."
        }
      ],
      "outcome": [
        "한국사 · AI 교안 · 경제 · 회계 감사 4과목으로 검증했고, RAG 답변은 약 7~8초 걸립니다.",
        "근거가 없는 질문에는 일반 지식으로 둘러대지 않고 솔직히 거절하게 했습니다."
      ],
      "limitations": [
        {
          "label": "한계",
          "text": "다른 개념과 연결되지 않은 개념(예: 측우기)은 답이 약하고, 한 번에 처리하는 자료는 10MB · 50쪽 이내입니다."
        }
      ],
      "metrics": [
        {
          "value": "4과목",
          "label": "검증한 과목",
          "note": "한국사 · AI 교안 · 경제 · 회계 감사"
        },
        {
          "value": "7~8초",
          "label": "RAG 답변 시간",
          "note": "GraphRAG global 검색 기준"
        }
      ],
      "metricsNote": "팀 결과 · GitHub README 기준",
      "role": "UI · 데이터 전처리 (7인 팀 ‘고민중독’)",
      "period": "2026.05.20 ~ 06.25",
      "link": "https://github.com/happybluebird/Mindpalace_Microsoft9ai_Thirdprj-",
      "linkLabel": "GitHub 저장소",
      "image": null,
      "detailImages": [
        {
          "src": "assets/projects/palace-live-poster.jpg",
          "video": "assets/projects/palace-live.mp4",
          "webm": "assets/projects/palace-live.webm",
          "width": 1280,
          "height": 740,
          "alt": "기억의 궁전 시연 영상: 홈에서 궁궐 그림 히어로, ‘읽기만 한 기억은 오래 머물지 않습니다’ 문제 제기, 여섯 걸음 카드 넘기기, 3D 둘러보기 영상, 자주 묻는 질문, ‘환영합니다’ 입장 영상을 지나, 데모 데이터로 도시를 고르고 한국사 6개 챕터를 명소·방에 배치하는 구성 화면과 방 디자인 고르기를 봄",
          "caption": "팀 GitHub Pages 포트폴리오 데모(정적 배포, 2026.11.06 녹화, 22초 · 1.3배) · 홈 → 데모 데이터로 도시 선택 → 학습 구성 → 방 디자인 · Azure 백엔드가 종료돼 챗봇·PDF 분석·3D 지도·방 걷기는 이 배포본에서 동작하지 않아 아래 두 장(라이브 데모 당시 캡처)으로 대신함"
        },
        {
          "src": "assets/projects/palace-quiz.jpg",
          "width": 1440,
          "height": 900,
          "alt": "3D 지도 위 퀴즈 창: 주제 입력, 문제 수 3 · 5 · 8 · 10, 객관식 · OX · 단답형 선택과 ‘퀴즈 만들기’ 버튼",
          "caption": "퀴즈 설정 · 걷던 자리에서 바로 출제"
        },
        {
          "src": "assets/projects/palace-assistant.jpg",
          "width": 1440,
          "height": 900,
          "alt": "3D 지도 옆 기억의 궁전 도우미 챗봇이 ‘훈구와 사림의 차이’ 질문에 답하고, 테마 · 화면 이동 · 음성 안내 버튼이 있는 화면",
          "caption": "도우미 챗봇 · 음성 안내와 RAG 답변"
        }
      ],
      "contentStatus": "from_github_2026_11",
      "sourceNote": "GitHub 저장소 README·CONTRIBUTORS·커밋 기록 (2026.11 확인). 시연 영상은 팀 GitHub Pages 포트폴리오 데모, 화면 2장은 저장소 docs/ui(라이브 데모 캡처)",
      "cover": {
        "type": "video",
        "src": "assets/projects/palace-live.mp4",
        "webm": "assets/projects/palace-live.webm",
        "poster": "assets/projects/palace-live-poster.jpg",
        "url": "phreno0.github.io · 기억의 궁전"
      }
    }
  ]
};
