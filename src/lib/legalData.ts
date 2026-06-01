// 준법자문가 (Compliance advisor) workspace mock data.

import type { RiskLevel } from "./data";

export type LegalStatus =
  | "approved"
  | "waiting"
  | "ai"
  | "revise"
  | "rejected"
  | "progress";

export type ReviewResult = "approved" | "rejected" | "revising";

export interface KpiFoot {
  kind: "up" | "down" | "warn" | "flat";
  icon: "trending-up" | "trending-down" | "clock" | "alert-triangle" | "minus";
  text: string;
}

export interface LegalKpi {
  label: string;
  value: string;
  unit: string;
  foot?: KpiFoot;
}

export interface PipelineSeg {
  label: string;
  n: number;
  color: string;
}

export interface LegalProject {
  name: string;
  date: string;
  type: string;
  count: string;
  pipeline: PipelineSeg[];
}

export interface LegalMaterial {
  name: string;
  camp: string;
  id: string;
  surface: string;
  type: string;
  status: LegalStatus;
  err: string;
  errC: "high" | "medium" | "low" | "muted";
}

export interface ReviewSourceSeg {
  t: string;
  hl?: RiskLevel;
  fb?: number;
}

export interface ReviewFeedback {
  title: string;
  risk: RiskLevel;
  hl: RiskLevel;
  tags: string[];
  clause: string;
  reason: string;
}

export interface ReviewHistoryItem {
  ev: string;
  actor: string;
  actorCls: "actor-mkt" | "actor-ai" | "actor-rev";
  ts: string;
  dot: "done" | "active" | "pending";
}

export interface ReviewData {
  title: string;
  surface: string;
  sent: string;
  id: string;
  source: ReviewSourceSeg[];
  feedback: ReviewFeedback[];
  history: ReviewHistoryItem[];
}

export interface ViolationItem {
  label: string;
  pct: number;
}

export interface LoanDistItem {
  label: string;
  n: number;
  color: string;
}

export interface HistRow {
  id: string;
  name: string;
  type: string;
  result: ReviewResult;
  before: string;
  after: string | null;
  date: string;
  cert: string | null;
}

export const LEGAL_HOME_KPIS: LegalKpi[] = [
  { label: "검토 대기", value: "5", unit: "건", foot: { kind: "warn", icon: "clock", text: "오늘 마감 3건" } },
  { label: "오늘 마감", value: "3", unit: "건", foot: { kind: "warn", icon: "alert-triangle", text: "지연 위험 1건" } },
  { label: "이번 주 승인", value: "4", unit: "건", foot: { kind: "up", icon: "trending-up", text: "지난주 대비 +1" } },
  { label: "평균 처리", value: "1.4", unit: "일", foot: { kind: "down", icon: "trending-down", text: "0.3일 단축" } },
];

export const LEGAL_PROJECTS: LegalProject[] = [
  {
    name: "봄맞이 대출 통합 캠페인",
    date: "2026.04.04 – 06.30",
    type: "신용대출",
    count: "소재 4건",
    pipeline: [
      { label: "검토 대기", n: 1, color: "#DC2626" },
      { label: "AI 검증중", n: 1, color: "#0EA5E9" },
      { label: "수정 요청", n: 1, color: "#F59E0B" },
      { label: "승인 완료", n: 1, color: "#16A34A" },
    ],
  },
  {
    name: "비상금 대출 카드뉴스",
    date: "2026.04.10 – 05.18",
    type: "신용대출",
    count: "소재 4건",
    pipeline: [
      { label: "검토 대기", n: 2, color: "#DC2626" },
      { label: "AI 검증중", n: 0, color: "#0EA5E9" },
      { label: "수정 요청", n: 1, color: "#F59E0B" },
      { label: "승인 완료", n: 1, color: "#16A34A" },
    ],
  },
];

export const LEGAL_MATERIALS: LegalMaterial[] = [
  { name: "봄맞이 신용대출 상세페이지", camp: "봄맞이 대출 통합 캠페인", id: "SM-2026-0427", surface: "홈페이지", type: "신용대출", status: "approved", err: "14%", errC: "low" },
  { name: "봄맞이 신용대출 메인배너", camp: "봄맞이 대출 통합 캠페인", id: "SM-2026-0426", surface: "배너", type: "담보대출", status: "approved", err: "18%", errC: "low" },
  { name: "봄맞이 신용대출 캠페인", camp: "봄맞이 대출 통합 캠페인", id: "SM-2026-0428", surface: "상세페이지", type: "신용대출", status: "waiting", err: "—", errC: "muted" },
  { name: "주택담보 갈아타기 상세", camp: "비상금 대출 카드뉴스", id: "SM-2026-0431", surface: "상세페이지", type: "담보대출", status: "waiting", err: "—", errC: "muted" },
  { name: "비상금 대출 카드뉴스 1면", camp: "비상금 대출 카드뉴스", id: "SM-2026-0433", surface: "카드뉴스", type: "신용대출", status: "ai", err: "—", errC: "muted" },
  { name: "비상금 대출 카드뉴스 2면", camp: "비상금 대출 카드뉴스", id: "SM-2026-0434", surface: "카드뉴스", type: "신용대출", status: "ai", err: "—", errC: "muted" },
  { name: "아파트 담보대출 안내", camp: "비상금 대출 카드뉴스", id: "SM-2026-0435", surface: "상세페이지", type: "담보대출", status: "ai", err: "—", errC: "muted" },
  { name: "직장인 신용대출 배너", camp: "봄맞이 대출 통합 캠페인", id: "SM-2026-0430", surface: "배너", type: "신용대출", status: "revise", err: "9%", errC: "medium" },
  { name: "사잇돌 중금리 안내", camp: "정책금융 안내", id: "SM-2026-0438", surface: "상세페이지", type: "정책금융", status: "revise", err: "11%", errC: "medium" },
  { name: "전세자금대출 FAQ", camp: "정책금융 안내", id: "SM-2026-0440", surface: "FAQ", type: "담보대출", status: "approved", err: "6%", errC: "low" },
  { name: "햇살론 정책금융 카드", camp: "정책금융 안내", id: "SM-2026-0441", surface: "카드뉴스", type: "정책금융", status: "approved", err: "5%", errC: "low" },
];

export const REVIEW_DATA: ReviewData = {
  title: "봄맞이 신용대출 캠페인",
  surface: "봄맞이 신용대출 상세 페이지",
  sent: "04/07 14:20 전달됨",
  id: "SM-2026-0428",
  source: [
    { t: "직장인이라면 누구나 " },
    { t: "100% 당일 승인", hl: "high", fb: 0 },
    { t: "! 복잡한 서류 없이 저희가 " },
    { t: "업계 최저 금리", hl: "high", fb: 1 },
    { t: "로 모셔갑니다. 지금 신청하면 한도 " },
    { t: "최대 1억원까지 무조건", hl: "medium", fb: 2 },
    { t: " 가능하며, " },
    { t: "중도상환 수수료 전액 면제", hl: "medium", fb: 3 },
    { t: " 혜택을 드립니다. 대출 신청은 신용점수에 영향을 주지 않으니 부담 없이 알아보세요." },
  ],
  feedback: [
    {
      title: "100% 당일 승인", risk: "high", hl: "high",
      tags: ["과장·단정 표현"], clause: "표시광고법 제3조 2항",
      reason:
        "모든 신청자가 당일 승인되는 것처럼 단정하고 있습니다. 실제 승인 여부·소요 시간은 신용평가 결과에 따라 달라지므로, 소비자가 '신청하면 누구나 즉시 승인'으로 오인할 소지가 큽니다. 「표시·광고의 공정화에 관한 법률」 제3조 제1항의 거짓·과장 광고에 해당할 수 있습니다.",
    },
    {
      title: "업계 최저 금리", risk: "high", hl: "high",
      tags: ["근거 없는 최상급"], clause: "표시광고법 제3조 2항",
      reason:
        "비교 시점·대상·출처 등 객관적 근거 없이 '최저'라는 최상급 표현을 사용했습니다. 실증 자료가 없는 최상급·배타성 표현은 부당한 비교광고로 간주될 수 있습니다.",
    },
    {
      title: "최대 1억원까지 무조건", risk: "medium", hl: "medium",
      tags: ["오인유발 한도"], clause: "대부업법 시행령 제9조",
      reason:
        "'무조건'은 심사 절차를 부정하는 표현입니다. 한도는 심사 결과에 따라 결정된다는 조건을 병기해야 소비자 오인을 방지할 수 있습니다.",
    },
    {
      title: "중도상환 수수료 전액 면제", risk: "medium", hl: "medium",
      tags: ["조건 누락"], clause: "여신금융 표준약관 제22조",
      reason: "면제 조건·적용 기간이 명시되지 않았습니다. 상품 약관상 면제 범위와 예외 사항을 함께 고지해야 합니다.",
    },
  ],
  history: [
    { ev: "업로드 · 검증 요청", actor: "마케팅팀", actorCls: "actor-mkt", ts: "04.26 10:12", dot: "done" },
    { ev: "AI 6단계 검증 · 오류율 —", actor: "AI Agent", actorCls: "actor-ai", ts: "04.26 10:13", dot: "done" },
    { ev: "검토 · 수정 요청 0건", actor: "준법자문가", actorCls: "actor-rev", ts: "04.26 14:40", dot: "done" },
    { ev: "수정 재업로드 · 재검증 0%", actor: "마케팅팀", actorCls: "actor-mkt", ts: "04.28 09:05", dot: "done" },
    { ev: "최종 승인 · 심의필 발급", actor: "준법자문가", actorCls: "actor-rev", ts: "대기", dot: "pending" },
  ],
};

export const HIST_KPIS: LegalKpi[] = [
  { label: "총 심의", value: "147", unit: "건", foot: { kind: "up", icon: "trending-up", text: "이번 분기 +38" } },
  { label: "평균 오류율", value: "11.4", unit: "%", foot: { kind: "down", icon: "trending-down", text: "전분기 대비 2.1%p" } },
  { label: "평균 처리", value: "1.4", unit: "일", foot: { kind: "down", icon: "trending-down", text: "0.3일 단축" } },
  { label: "반려율", value: "28", unit: "%", foot: { kind: "flat", icon: "minus", text: "전분기와 동일" } },
];

export const VIOLATION_DIST: ViolationItem[] = [
  { label: "과장·단정 표현", pct: 28 },
  { label: "근거 없는 최상급", pct: 24 },
  { label: "오인유발 한도", pct: 19 },
  { label: "필수 고지 누락", pct: 17 },
  { label: "조건 누락 혜택", pct: 12 },
];

export const LOAN_DIST: LoanDistItem[] = [
  { label: "신용대출", n: 68, color: "#0B2F6E" },
  { label: "담보대출", n: 54, color: "#1F6FEB" },
  { label: "정책금융", n: 25, color: "#0EA5E9" },
];

export const HIST_ROWS: HistRow[] = [
  { id: "SM-2026-0427", name: "봄맞이 신용대출 상세페이지", type: "신용대출", result: "approved", before: "14%", after: "0%", date: "2026.05.28", cert: "2026-0428-A" },
  { id: "SM-2026-0426", name: "봄맞이 신용대출 메인배너", type: "담보대출", result: "approved", before: "18%", after: "0%", date: "2026.05.28", cert: "2026-0428-B" },
  { id: "SM-2026-0420", name: "전세자금대출 안내 배너", type: "담보대출", result: "rejected", before: "31%", after: null, date: "2026.05.27", cert: null },
  { id: "SM-2026-0418", name: "직장인 마이너스 통장 안내", type: "신용대출", result: "rejected", before: "29%", after: null, date: "2026.05.26", cert: null },
  { id: "SM-2026-0430", name: "직장인 신용대출 배너", type: "신용대출", result: "revising", before: "9%", after: null, date: "—", cert: null },
  { id: "SM-2026-0438", name: "사잇돌 중금리 안내", type: "정책금융", result: "revising", before: "11%", after: null, date: "—", cert: null },
  { id: "SM-2026-0415", name: "사잇돌 중금리 카드뉴스", type: "정책금융", result: "approved", before: "12%", after: "0%", date: "2026.05.22", cert: "2026-0422-A" },
  { id: "SM-2026-0411", name: "햇살론 정책금융 카드", type: "정책금융", result: "approved", before: "8%", after: "0%", date: "2026.05.20", cert: "2026-0420-C" },
  { id: "SM-2026-0409", name: "주택담보 갈아타기 상세", type: "담보대출", result: "approved", before: "16%", after: "0%", date: "2026.05.18", cert: "2026-0418-A" },
  { id: "SM-2026-0405", name: "아파트 담보대출 카드", type: "담보대출", result: "rejected", before: "24%", after: null, date: "2026.05.15", cert: null },
  { id: "SM-2026-0402", name: "전세자금대출 FAQ", type: "담보대출", result: "approved", before: "6%", after: "0%", date: "2026.05.12", cert: "2026-0412-A" },
];

export const LEGAL_STATUS_MAP: Record<LegalStatus, { cls: string; label: string }> = {
  approved: { cls: "pill-approved", label: "승인 완료" },
  waiting: { cls: "pill-waiting", label: "검토 대기" },
  ai: { cls: "pill-ai", label: "AI 검증중" },
  revise: { cls: "pill-revise", label: "수정 요청" },
  rejected: { cls: "pill-rejected", label: "반려" },
  progress: { cls: "pill-progress", label: "진행중" },
};

export const RESULT_MAP: Record<ReviewResult, { cls: string; label: string }> = {
  approved: { cls: "pill-approved", label: "승인" },
  rejected: { cls: "pill-waiting", label: "반려" },
  revising: { cls: "pill-ai", label: "수정중" },
};
