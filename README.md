# JB FinCompliance AI — 마케팅팀 워크스페이스

JB 마케팅팀이 광고 자료를 업로드하고, AI 검증 결과를 확인하고, 피드백을 반영해 심의필 증명서를 받기까지의 전 과정을 다루는 내부 워크스페이스입니다.

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 기반.

## 화면 구성

| 경로 | 화면 | 설명 |
| --- | --- | --- |
| `/home` | 심의 현황 | KPI, 프로젝트 카드, 자료 목록 + 상태 필터 |
| `/upload` | 자료 업로드 | 자료 정보 폼 + 텍스트/이미지 입력, AI 6단계 검증 패널 |
| `/feedback` | 피드백 수정 | 원문 하이라이트 ↔ 피드백 카드 동기화, AI 제안, 진행률 |
| `/archive` | 심의필 보관함 | 승인 자료 그리드 (검색/필터) |
| `/archive/[no]` | 심의필 상세 | 광고 심의필 증명서, 심의 이력 모달 |

## 시작하기

```bash
npm install
npm run dev
# http://localhost:3000
```

빌드 / 프로덕션 실행:

```bash
npm run build
npm run start
```

## 디렉토리 구조

```
src/
├── app/                  # App Router 라우트
│   ├── layout.tsx        # 루트 레이아웃 + Toaster + Shell
│   ├── globals.css       # 디자인 토큰 · 컴포넌트 CSS
│   ├── page.tsx          # /home 으로 리다이렉트
│   ├── home/             # 심의 현황
│   ├── upload/           # 자료 업로드
│   ├── feedback/         # 피드백 수정
│   └── archive/          # 보관함 (목록 + [no] 상세)
├── components/
│   ├── Shell.tsx         # 사이드바 + 탑바 + 로그아웃 모달
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   ├── PageHead.tsx
│   ├── LogoutModal.tsx
│   ├── Toaster.tsx       # Context 기반 토스트
│   └── primitives.tsx    # Pill / RiskBadge / Clause / ErrCell
└── lib/
    └── data.ts           # 데모용 mock 데이터
public/
├── assets/               # JB 심볼 · 시그니처
└── fonts/                # Pretendard (self-host)
```

## 디자인 시스템

- **컬러 토큰**: `tailwind.config.ts` 에 JB Navy(`#0B2F6E`), 리스크 (high/medium/low), 정보색 등록
- **타이포**: 한글 Pretendard (self-host), 라틴/숫자 Inter, 모노 JetBrains Mono — `next/font/google` + `@font-face`
- **컴포넌트 CSS**: `src/app/globals.css` 의 `@layer components` 에서 `.btn`, `.panel`, `.pill`, `.timeline`, `.fc`, `.hl`, `.nav-item` 등 정의
- **아이콘**: `lucide-react`

## 기술 스택

- Next.js 14.2 (App Router)
- React 18.3
- TypeScript 5.5
- Tailwind CSS 3.4
- lucide-react
- clsx
