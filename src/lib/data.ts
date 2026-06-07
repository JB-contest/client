export type MaterialStatus =
  | "approved"
  | "waiting"
  | "ai"
  | "revise"
  | "progress";

export type RiskLevel = "high" | "medium" | "low";

export interface Kpi {
  label: string;
  value: string;
  unit: string;
  warn?: boolean;
}

export interface Project {
  name: string;
  date: string;
  type: string;
  count: string;
  pct: number;
  stats: [string, string][];
}

export interface Material {
  name: string;
  camp: string;
  id: string;
  surface: string;
  type: string;
  status: MaterialStatus;
  err: string;
  errC: "high" | "medium" | "low" | "muted";
  docId?: number; // 실제 문서 id (API 연결 시). 검토 화면으로 행별 이동에 사용.
}

export interface SourceSeg {
  t: string;
  hl?: RiskLevel;
  fb?: number;
}

export interface Feedback {
  title: string;
  risk: RiskLevel;
  tag: string;
  clause: string;
  reason: string;
  reviewComment: string;
  suggest: string;
}


export interface HistoryItem {
  ev: string;
  actor: string;
  role: "mk" | "ai" | "rv";
  ts: string;
  dot: "done" | "active" | "pending";
}

export interface ArchiveItem {
  no: string;
  name: string;
  camp: string;
  surface: string;
  type: string;
  err: string;
  risk: string;
  req: string;
  issued: string;
  expires: string;
  by: string;
}

export const KPIS: Kpi[] = [
  { label: "진행 프로젝트", value: "5", unit: "건" },
  { label: "검토중", value: "3", unit: "건" },
  { label: "수정 요청", value: "4", unit: "건", warn: true },
  { label: "승인 완료", value: "36", unit: "건" },
];

export const PROJECTS: Project[] = [
  {
    name: "봄맞이 대출 통합 캠페인",
    date: "2026.04.04 – 06",
    type: "신용대출",
    count: "소재 4건",
    pct: 62,
    stats: [
      ["검토 대기", "1"],
      ["AI 검증중", "1"],
      ["수정 요청", "1"],
      ["승인 완료", "1"],
    ],
  },
  {
    name: "비상금 대출 카드뉴스",
    date: "2026.04.10 – 18",
    type: "신용대출",
    count: "소재 3건",
    pct: 35,
    stats: [
      ["검토 대기", "2"],
      ["AI 검증중", "0"],
      ["수정 요청", "1"],
      ["승인 완료", "0"],
    ],
  },
];

export const MATERIALS: Material[] = [
  { name: "봄맞이 신용대출 상세페이지", camp: "봄맞이 대출 통합 캠페인", id: "SM-2026-0428", surface: "상세페이지", type: "신용대출", status: "revise", err: "14%", errC: "high" },
  { name: "직장인 신용대출 배너", camp: "봄맞이 대출 통합 캠페인", id: "SM-2026-0430", surface: "홈페이지", type: "신용대출", status: "ai", err: "—", errC: "muted" },
  { name: "비상금 대출 카드뉴스", camp: "비상금 대출 캠페인", id: "SM-2026-0431", surface: "카드뉴스", type: "신용대출", status: "waiting", err: "—", errC: "muted" },
  { name: "주택담보 갈아타기 상세", camp: "비상금 대출 캠페인", id: "SM-2026-0431", surface: "상세페이지", type: "담보대출", status: "ai", err: "—", errC: "muted" },
  { name: "사잇돌 중금리 안내", camp: "정책금융 안내", id: "SM-2026-0432", surface: "상세페이지", type: "신용대출", status: "progress", err: "7%", errC: "low" },
  { name: "아파트 담보대출 카드", camp: "주거안정 금융 캠페인", id: "SM-2026-0433", surface: "카드뉴스", type: "담보대출", status: "revise", err: "9%", errC: "low" },
  { name: "전세자금대출 안내 배너", camp: "주거안정 금융 캠페인", id: "SM-2026-0421", surface: "홈페이지", type: "전세자금대출", status: "approved", err: "0%", errC: "low" },
  { name: "햇살론 정책금융 상세", camp: "정책금융 안내", id: "SM-2026-0418", surface: "상세페이지", type: "신용대출", status: "approved", err: "2%", errC: "low" },
];

export const SOURCE: SourceSeg[] = [
  { t: "직장인이라면 누구나 " },
  { t: "100% 당일 승인", hl: "high", fb: 0 },
  { t: "! 복잡한 서류 없이 " },
  { t: "업계 최저 금리", hl: "high", fb: 1 },
  { t: "로 모셔갑니다. 지금 신청하면 한도 " },
  { t: "최대 1억원까지 무조건 가능", hl: "medium", fb: 2 },
  { t: "하며, " },
  { t: "중도상환 수수료 전액 면제", hl: "medium", fb: 3 },
  { t: " 혜택을 드립니다. 대출 신청은 신용점수에 영향을 주지 않으니 부담 없이 알아보세요." },
];

export const FEEDBACK: Feedback[] = [
  {
    title: "100% 당일 승인",
    risk: "high",
    tag: "과장·단정 표현",
    clause: "표시광고법 제3조 2항",
    reason:
      '모든 신청자가 당일 승인되는 것처럼 단정하고 있습니다. 승인 여부·소요 시간은 개인별 심사 결과에 따라 달라지므로 "100% 당일 승인" 표현은 사용이 어렵습니다.',
    reviewComment:
      "'100%' 단정 표현을 삭제하고 '심사 결과에 따라'와 같은 조건 문구로 바꿔 주세요.",
    suggest: "심사 결과에 따라 당일 심사가 가능합니다",
  },
  {
    title: "업계 최저 금리",
    risk: "high",
    tag: "객관적 근거 부재",
    clause: "표시광고법 제3조 2항",
    reason:
      "객관적 실증 자료 없이 '최저'라는 최상급·배타성 표현을 사용했습니다. 부당한 비교광고로 간주될 수 있어 근거 병기 또는 표현 수정이 필요합니다.",
    reviewComment:
      "'업계 최저' 표현은 실증 자료 없이는 사용할 수 없습니다. 근거를 병기하거나 표현을 완화해 주세요.",
    suggest: "합리적인 금리 조건으로 안내드립니다",
  },
  {
    title: "최대 1억원까지 무조건 가능",
    risk: "medium",
    tag: "조건 누락",
    clause: "대부업법 시행령 제9조",
    reason:
      "'무조건'은 심사 절차를 부정하는 표현입니다. 한도는 심사 결과에 따라 결정된다는 조건을 반드시 병기해야 합니다.",
    reviewComment:
      "'무조건' 표현을 삭제하고 한도가 심사 결과에 따라 결정된다는 조건을 명시해 주세요.",
    suggest: "심사 결과에 따라 최대 1억원까지 가능합니다",
  },
  {
    title: "중도상환 수수료 전액 면제",
    risk: "medium",
    tag: "고지 의무 누락",
    clause: "여신금융 표준약관 제22조",
    reason:
      "면제 조건·적용 기간이 명시되지 않았습니다. 상품 약관상 면제 범위와 예외 사항을 함께 고지해야 합니다.",
    reviewComment:
      "면제 조건과 적용 기간, 예외 사항을 약관 기준으로 함께 고지해 주세요.",
    suggest: "조건에 따라 중도상환 수수료가 면제됩니다 (약관 참조)",
  },
];

export const HISTORY: HistoryItem[] = [
  { ev: "업로드 · 검증 요청", actor: "마케팅팀", role: "mk", ts: "04.26 10:12", dot: "done" },
  { ev: "AI 6단계 검증 · 오류율 14%", actor: "AI Agent", role: "ai", ts: "04.26 10:13", dot: "done" },
  { ev: "검토 · 수정 요청 4건", actor: "준법자문가", role: "rv", ts: "04.26 14:40", dot: "active" },
  { ev: "수정 재업로드 · 재검증", actor: "마케팅팀", role: "mk", ts: "대기", dot: "pending" },
  { ev: "최종 승인", actor: "준법자문가", role: "rv", ts: "", dot: "pending" },
];

export const ARCHIVE: ArchiveItem[] = [
  { no: "2026-0428-A", name: "봄맞이 신용대출 상세페이지", camp: "봄맞이 대출 통합 캠페인", surface: "상세페이지", type: "신용대출", err: "0%", risk: "A", req: "6/6", issued: "2026.04.28", expires: "2026.10.28", by: "김준법 자문위원" },
  { no: "2026-0421-P", name: "햇살론 정책금융 상세", camp: "봄맞이 대출 통합 캠페인", surface: "상세페이지", type: "신용대출", err: "0%", risk: "A", req: "6/6", issued: "2026.04.21", expires: "2026.10.21", by: "박심사 자문위원" },
  { no: "2026-0418-C", name: "전세자금대출 안내 배너", camp: "주거안정 금융 캠페인", surface: "홈페이지", type: "전세자금대출", err: "2%", risk: "A", req: "6/6", issued: "2026.04.18", expires: "2026.10.18", by: "김준법 자문위원" },
  { no: "2026-0415-A", name: "사잇돌 중금리 카드뉴스", camp: "정책금융 안내", surface: "카드뉴스", type: "신용대출", err: "0%", risk: "A", req: "6/6", issued: "2026.04.15", expires: "2026.10.15", by: "김준법 자문위원" },
  { no: "2026-0409-B", name: "아파트 담보대출 상세", camp: "주거안정 금융 캠페인", surface: "상세페이지", type: "담보대출", err: "3%", risk: "A", req: "6/6", issued: "2026.04.09", expires: "2026.10.09", by: "박심사 자문위원" },
  { no: "2026-0402-A", name: "직장인 비상금 대출 FAQ", camp: "비상금 대출 캠페인", surface: "FAQ", type: "신용대출", err: "1%", risk: "A", req: "6/6", issued: "2026.04.02", expires: "2026.10.02", by: "김준법 자문위원" },
];

export const STATUS_MAP: Record<MaterialStatus, { cls: string; label: string }> = {
  approved: { cls: "pill-approved", label: "승인완료" },
  waiting: { cls: "pill-waiting", label: "검토 대기" },
  ai: { cls: "pill-ai", label: "AI 검증중" },
  revise: { cls: "pill-revise", label: "수정 요청" },
  progress: { cls: "pill-progress", label: "검토중" },
};

export const RISK_MAP: Record<RiskLevel, { cls: string; label: string }> = {
  high: { cls: "risk-high", label: "높음" },
  medium: { cls: "risk-medium", label: "중간" },
  low: { cls: "risk-low", label: "낮음" },
};
