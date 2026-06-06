// JB 컴플라이언스 API 클라이언트 (MVP).
// 연결 범위: 핵심 심의 루프 7개 호출
//   1) GET  /documents                          목록
//   2) GET  /documents/{id}                      단건
//   3) GET  /documents/{id}/validation-results   AI 검증 결과
//   4) GET  /documents/{id}/feedbacks            피드백 목록
//   5) POST /documents                           업로드(제출)
//   6) POST /documents/{id}/feedbacks            검토 의견 작성
//   7) POST /documents/{id}/approvals            최종 결재
//
// next.config.mjs 의 rewrite 를 통해 /backend → 백엔드 /api 로 프록시된다.

import type {
  Feedback,
  HistoryItem,
  Material,
  MaterialStatus,
  RiskLevel,
  SourceSeg,
} from "@/lib/data";
import type { ReviewData, ReviewFeedback, ReviewSourceSeg } from "@/lib/legalData";

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/backend";

// 백엔드에 로그인/세션이 없어 POST 시 사용자 id 를 직접 넣어야 한다.
// 시드된 사용자 기준 기본값 — 환경변수로 덮어쓸 수 있다.
export const MARKETING_USER_ID = Number(
  process.env.NEXT_PUBLIC_MARKETING_USER_ID ?? 1,
);
export const COMPLIANCE_USER_ID = Number(
  process.env.NEXT_PUBLIC_COMPLIANCE_USER_ID ?? 2,
);

// ── enums ─────────────────────────────────────────────────────────────
export type Role = "MARKETING" | "COMPLIANCE";
export type LoanType = "CREDIT_LOAN" | "COLLATERAL_LOAN" | "JEONSE_LOAN";
export type UploadLocation = "DETAIL_PAGE" | "CARD_NEWS" | "FAQ" | "HOMEPAGE";
export type DocStatus =
  | "SUBMITTED"
  | "AI_VALIDATING"
  | "IN_REVIEW"
  | "REVISION_REQUESTED"
  | "APPROVED";
export type Decision = "APPROVED" | "REVISION_REQUESTED";
export type ApiRisk = "HIGH" | "MEDIUM" | "LOW";

// ── response types ────────────────────────────────────────────────────
export interface DocumentResponse {
  id: number;
  parentId: number | null;
  version: number;
  uploaderId: number;
  uploaderName: string;
  name: string;
  uploadLocation: UploadLocation;
  loanType: LoanType;
  title: string;
  content: string;
  status: DocStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ViolationTextResponse {
  id: number;
  resultId: number;
  violationText: string;
  riskLevel: ApiRisk;
  violationTypes: string;
  lawMappings: string;
  createdAt: string;
}

export interface ValidationResultResponse {
  id: number;
  documentId: number;
  errorRate: number;
  createdAt: string;
  violations: ViolationTextResponse[];
}

export interface FeedbackItemResponse {
  id: number;
  feedbackId: number;
  violationTextId: number;
  violationText: string;
  comment: string;
  createdAt: string;
}

export interface FeedbackResponse {
  id: number;
  documentId: number;
  reviewerId: number;
  reviewerName: string;
  decision: Decision;
  createdAt: string;
  items: FeedbackItemResponse[];
}

export interface ApprovalResponse {
  id: number;
  documentId: number;
  approverId: number;
  approverName: string;
  reviewNumber: string;
  approvedAt: string;
}

// ── request types ─────────────────────────────────────────────────────
export interface DocumentCreateRequest {
  uploaderId: number;
  name: string;
  uploadLocation: UploadLocation;
  loanType: LoanType;
  title: string;
  content: string;
}

export interface FeedbackItemCreateRequest {
  violationTextId: number;
  comment: string;
}

export interface FeedbackCreateRequest {
  reviewerId: number;
  decision: Decision;
  items: FeedbackItemCreateRequest[];
}

export interface ApprovalCreateRequest {
  approverId: number;
  reviewNumber: string;
}

// ── fetch helper ──────────────────────────────────────────────────────
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`API ${res.status} ${path}`);
  }
  return res.json() as Promise<T>;
}

// ── 7 core calls ──────────────────────────────────────────────────────
export const listDocuments = () =>
  request<DocumentResponse[]>("/documents");

export const getDocument = (id: number) =>
  request<DocumentResponse>(`/documents/${id}`);

export const getValidationResults = (id: number) =>
  request<ValidationResultResponse[]>(`/documents/${id}/validation-results`);

export const listFeedbacks = (id: number) =>
  request<FeedbackResponse[]>(`/documents/${id}/feedbacks`);

export const createDocument = (body: DocumentCreateRequest) =>
  request<DocumentResponse>("/documents", {
    method: "POST",
    body: JSON.stringify(body),
  });

// 수정본 제출 — 준법자문가의 수정 요청(REVISION_REQUESTED) 후 새 버전 문서를 제출한다.
// parentId 는 요청 경로의 documentId 로, version 은 원본 +1 로 서버가 자동 설정하며
// 제출 즉시 검증이 다시 실행된다.
export const createRevision = (id: number, body: DocumentCreateRequest) =>
  request<DocumentResponse>(`/documents/${id}/revisions`, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const createFeedback = (id: number, body: FeedbackCreateRequest) =>
  request<FeedbackResponse>(`/documents/${id}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const createApproval = (id: number, body: ApprovalCreateRequest) =>
  request<ApprovalResponse>(`/documents/${id}/approvals`, {
    method: "POST",
    body: JSON.stringify(body),
  });

// 피드백 항목 코멘트 수정.
export const updateFeedbackItem = (itemId: number, comment: string) =>
  request<FeedbackItemResponse>(`/feedback-items/${itemId}`, {
    method: "PUT",
    body: JSON.stringify({ comment }),
  });

// 결재 목록 — 심의필 보관함에서 사용.
export const listApprovals = () =>
  request<ApprovalResponse[]>("/approvals");

// ── enum ↔ 한글 라벨 ──────────────────────────────────────────────────
export const LOAN_TYPE_LABEL: Record<LoanType, string> = {
  CREDIT_LOAN: "신용대출",
  COLLATERAL_LOAN: "담보대출",
  JEONSE_LOAN: "전세자금대출",
};
export const LOAN_TYPE_VALUE: Record<string, LoanType> = {
  신용대출: "CREDIT_LOAN",
  담보대출: "COLLATERAL_LOAN",
  전세자금대출: "JEONSE_LOAN",
};

export const LOCATION_LABEL: Record<UploadLocation, string> = {
  DETAIL_PAGE: "상세페이지",
  HOMEPAGE: "홈페이지",
  CARD_NEWS: "카드뉴스",
  FAQ: "FAQ",
};
export const LOCATION_VALUE: Record<string, UploadLocation> = {
  상세페이지: "DETAIL_PAGE",
  홈페이지: "HOMEPAGE",
  카드뉴스: "CARD_NEWS",
  FAQ: "FAQ",
};

// 상태 → UI 라벨 매핑.
//   SUBMITTED       제출 직후 → AI 검증 단계로 묶어 표시
//   AI_VALIDATING   체크리스트 + AI 검증 진행 중
//   IN_REVIEW       검증 완료, 준법자문가 검토 대기(= "검토 대기")
//   REVISION_REQUESTED 준법자문가 수정 요청
//   APPROVED        최종 결재 완료
const STATUS_TO_MATERIAL: Record<DocStatus, MaterialStatus> = {
  SUBMITTED: "ai",
  AI_VALIDATING: "ai",
  IN_REVIEW: "waiting",
  REVISION_REQUESTED: "revise",
  APPROVED: "approved",
};

const RISK_TO_UI: Record<ApiRisk, RiskLevel> = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

// 카드 정렬 우선순위: 높음 → 중간 → 낮음.
const RISK_WEIGHT: Record<RiskLevel, number> = { high: 0, medium: 1, low: 2 };

// violationTypes·lawMappings 는 JSON 배열 문자열(예: '["필수항목 누락"]')로 온다.
// 배열이면 파싱하고, 아니면 콤마 구분 문자열로 처리한다.
function parseList(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    if (Array.isArray(v)) return v.map((s) => String(s).trim()).filter(Boolean);
  } catch {
    /* JSON 아님 → 콤마 분리 */
  }
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// ── API → 기존 UI 형태 매퍼 ───────────────────────────────────────────
export function docToMaterial(d: DocumentResponse): Material {
  const approved = d.status === "APPROVED";
  return {
    docId: d.id,
    name: d.name,
    camp: d.title,
    id: `#${d.id}${d.version > 1 ? ` v${d.version}` : ""}`,
    surface: LOCATION_LABEL[d.uploadLocation] ?? d.uploadLocation,
    type: LOAN_TYPE_LABEL[d.loanType] ?? d.loanType,
    status: STATUS_TO_MATERIAL[d.status] ?? "waiting",
    err: approved ? "0%" : "—",
    errC: approved ? "low" : "muted",
  };
}

// content 원문 + 위반문구로 하이라이트 세그먼트를 만든다.
// fbRank: 원본 violation 인덱스 → 정렬된 피드백 카드 인덱스(하이라이트 클릭 시 카드 연결).
function buildSource(
  content: string,
  violations: ViolationTextResponse[],
  fbRank: Map<number, number>,
): ReviewSourceSeg[] {
  const marks = violations
    .map((v, i) => ({
      i,
      text: v.violationText,
      hl: RISK_TO_UI[v.riskLevel],
      idx: content.indexOf(v.violationText),
    }))
    .filter((m) => m.idx >= 0)
    .sort((a, b) => a.idx - b.idx);

  const segs: ReviewSourceSeg[] = [];
  let cur = 0;
  for (const m of marks) {
    if (m.idx < cur) continue; // 겹치는 구간은 건너뜀
    if (m.idx > cur) segs.push({ t: content.slice(cur, m.idx) });
    segs.push({ t: m.text, hl: m.hl, fb: fbRank.get(m.i) ?? m.i });
    cur = m.idx + m.text.length;
  }
  if (cur < content.length) segs.push({ t: content.slice(cur) });
  return segs.length ? segs : [{ t: content }];
}

export function buildReviewData(
  doc: DocumentResponse,
  validation: ValidationResultResponse | undefined,
  feedbacks: FeedbackResponse[],
): ReviewData {
  const violations = validation?.violations ?? [];

  // 위험도 높음 → 중간 → 낮음 순으로 카드를 정렬한다(안정 정렬: 동일 위험도는 원본 순서 유지).
  // 원본 인덱스 i 를 보존해 원문 하이라이트와 카드 순서를 연결한다.
  const ranked = violations
    .map((v, i) => ({ v, i, risk: RISK_TO_UI[v.riskLevel] }))
    .sort((a, b) => RISK_WEIGHT[a.risk] - RISK_WEIGHT[b.risk]);

  // 원본 violation 인덱스 → 정렬된 카드 인덱스
  const fbRank = new Map<number, number>();
  ranked.forEach((r, rank) => fbRank.set(r.i, rank));

  const feedback: ReviewFeedback[] = ranked.map(({ v, risk }) => {
    const tags = parseList(v.violationTypes);
    const laws = parseList(v.lawMappings);
    return {
      title: v.violationText,
      risk,
      hl: risk,
      tags,
      clause: laws.join(", "),
      reason: tags.length
        ? `'${v.violationText}' — ${tags.join(", ")}에 해당합니다.${laws.length ? ` (${laws.join(", ")})` : ""}`
        : laws.join(", "),
    };
  });

  const latest = feedbacks[feedbacks.length - 1];

  return {
    title: doc.name,
    surface: `${LOCATION_LABEL[doc.uploadLocation] ?? ""} · ${LOAN_TYPE_LABEL[doc.loanType] ?? ""}`,
    sent: doc.createdAt?.slice(0, 16).replace("T", " ") ?? "",
    id: `#${doc.id}`,
    source: buildSource(doc.content, violations, fbRank),
    feedback,
    history: [
      {
        ev: "업로드 · 검증 요청",
        actor: doc.uploaderName ?? "마케팅팀",
        actorCls: "actor-mkt",
        ts: doc.createdAt?.slice(5, 16).replace("T", " ") ?? "",
        dot: "done",
      },
      {
        ev: `AI 검증 · 오류율 ${validation ? Math.round(validation.errorRate) + "%" : "—"}`,
        actor: "AI Agent",
        actorCls: "actor-ai",
        ts: validation?.createdAt?.slice(5, 16).replace("T", " ") ?? "",
        dot: validation ? "done" : "pending",
      },
      {
        ev: latest
          ? `검토 · ${latest.decision === "APPROVED" ? "승인" : "수정 요청"} ${latest.items.length}건`
          : "검토 대기",
        actor: latest?.reviewerName ?? "준법자문가",
        actorCls: "actor-rev",
        ts: latest?.createdAt?.slice(5, 16).replace("T", " ") ?? "대기",
        dot: latest ? "done" : "active",
      },
      {
        ev: "최종 승인",
        actor: "준법자문가",
        actorCls: "actor-rev",
        ts: doc.status === "APPROVED" ? "완료" : "대기",
        dot: doc.status === "APPROVED" ? "done" : "pending",
      },
    ],
  };
}

// 준법자문가 코멘트는 '["필수항목 누락"] · ["대부업법 제6조"]' 처럼 JSON 배열 토큰을
// 포함할 수 있다. 사람이 읽을 수 있도록 배열 토큰만 풀어 준다.
function cleanComment(c: string): string {
  if (!c) return "";
  return c.replace(/\[(.*?)\]/g, (_, inner) => {
    try {
      const a = JSON.parse(`[${inner}]`);
      return Array.isArray(a) ? a.join(", ") : inner;
    } catch {
      return inner;
    }
  });
}

// 마케팅 "피드백 수정" 화면용 데이터(원문 하이라이트 + 준법자문가 피드백 + 이력).
export interface FeedbackData {
  meta: { title: string; sub: string; id: string; sent: string };
  source: SourceSeg[];
  feedback: Feedback[];
  history: HistoryItem[];
}

export function buildFeedbackData(
  doc: DocumentResponse,
  validation: ValidationResultResponse | undefined,
  feedbacks: FeedbackResponse[],
): FeedbackData {
  const violations = validation?.violations ?? [];

  // 위험도 높음 → 중간 → 낮음 순 정렬(검토 화면과 동일). 원본 인덱스로 하이라이트 연결.
  const ranked = violations
    .map((v, i) => ({ v, i, risk: RISK_TO_UI[v.riskLevel] }))
    .sort((a, b) => RISK_WEIGHT[a.risk] - RISK_WEIGHT[b.risk]);
  const fbRank = new Map<number, number>();
  ranked.forEach((r, rank) => fbRank.set(r.i, rank));

  // 가장 최근 검토 의견의 항목별 코멘트(위반문구 id → 코멘트).
  const latest = feedbacks[feedbacks.length - 1];
  const commentByViolation = new Map<number, string>();
  (latest?.items ?? []).forEach((it) =>
    commentByViolation.set(it.violationTextId, it.comment),
  );

  const feedback: Feedback[] = ranked.map(({ v, risk }) => {
    const tags = parseList(v.violationTypes);
    const laws = parseList(v.lawMappings);
    const raw = commentByViolation.get(v.id);
    const reason = raw
      ? cleanComment(raw)
      : tags.length
        ? `${tags.join(", ")}에 해당합니다.${laws.length ? ` (${laws.join(", ")})` : ""}`
        : laws.join(", ");
    return {
      title: v.violationText,
      risk,
      tag: tags[0] ?? "",
      clause: laws.join(", "),
      reason,
      suggest: "", // 백엔드에 AI 제안 문구 필드가 없어 비워 둔다.
    };
  });

  return {
    meta: {
      title: doc.name,
      sub: `${LOCATION_LABEL[doc.uploadLocation] ?? ""} · ${LOAN_TYPE_LABEL[doc.loanType] ?? ""}`,
      id: `#${doc.id}${doc.version > 1 ? ` v${doc.version}` : ""}`,
      sent: doc.createdAt?.slice(0, 16).replace("T", " ") ?? "",
    },
    source: buildSource(doc.content, violations, fbRank),
    feedback,
    history: [
      {
        ev: "업로드 · 검증 요청",
        actor: doc.uploaderName ?? "마케팅팀",
        role: "mk",
        ts: doc.createdAt?.slice(5, 16).replace("T", " ") ?? "",
        dot: "done",
      },
      {
        ev: `AI 검증 · 오류율 ${validation ? Math.round(validation.errorRate) + "%" : "—"}`,
        actor: "AI Agent",
        role: "ai",
        ts: validation?.createdAt?.slice(5, 16).replace("T", " ") ?? "",
        dot: validation ? "done" : "pending",
      },
      {
        ev: latest
          ? `검토 · ${latest.decision === "APPROVED" ? "승인" : "수정 요청"} ${latest.items.length}건`
          : "검토 대기",
        actor: latest?.reviewerName ?? "준법자문가",
        role: "rv",
        ts: latest?.createdAt?.slice(5, 16).replace("T", " ") ?? "대기",
        dot: latest ? "done" : "active",
      },
      {
        ev: "최종 승인 · 심의필 발급",
        actor: "준법자문가",
        role: "rv",
        ts: doc.status === "APPROVED" ? "완료" : "대기",
        dot: doc.status === "APPROVED" ? "done" : "pending",
      },
    ],
  };
}

// 검토 화면이 보여줄 문서 한 건을 고른다(검토 대상 우선, 없으면 첫 문서).
export function pickReviewDoc(docs: DocumentResponse[]): DocumentResponse | undefined {
  const order: DocStatus[] = [
    "IN_REVIEW",
    "REVISION_REQUESTED",
    "AI_VALIDATING",
    "SUBMITTED",
    "APPROVED",
  ];
  return [...docs].sort(
    (a, b) => order.indexOf(a.status) - order.indexOf(b.status),
  )[0];
}
