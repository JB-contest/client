import type {
  Feedback,
  HistoryItem,
  Material,
  MaterialStatus,
  Project,
  RiskLevel,
  SourceSeg,
} from "@/lib/data";
import type {
  HistRow,
  LegalKpi,
  LegalProject,
  LoanDistItem,
  ReviewData,
  ReviewFeedback,
  ReviewSourceSeg,
  ViolationItem,
} from "@/lib/legalData";
import { COLOR } from "@/lib/colors";

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/backend";

// 백엔드에 로그인/세션이 없어 POST 시 사용자 id 를 직접 넣어야 한다.
// 시드된 사용자 기준 기본값 — 환경변수로 덮어쓸 수 있다.
export const MARKETING_USER_ID = Number(
  process.env.NEXT_PUBLIC_MARKETING_USER_ID ?? 4,
);
export const COMPLIANCE_USER_ID = Number(
  process.env.NEXT_PUBLIC_COMPLIANCE_USER_ID ?? 5,
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
  violationReason: string; 
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

// 피드백 목록은 서버에서 최신순(내림차순)으로 올 수도, 오래된순으로 올 수도 있다.
// 배열 위치에 의존하지 않고 createdAt 기준으로 가장 최근 피드백을 고른다.
function latestFeedback(
  feedbacks: FeedbackResponse[],
): FeedbackResponse | undefined {
  if (!feedbacks.length) return undefined;
  return feedbacks.reduce((a, b) => (a.createdAt >= b.createdAt ? a : b));
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
      vid: v.id,
      title: tags.length
        ? v.violationText && v.violationText !== tags.join(", ")
          ? `${tags.join(", ")} - "${v.violationText}"`
          : tags.join(", ")
        : v.violationText,
      risk,
      hl: risk,
      tags,
      clause: laws.join(", "),
      reason:
        v.violationReason?.trim() ||
        (tags.length
          ? `'${v.violationText}' — ${tags.join(", ")}에 해당합니다.${laws.length ? ` (${laws.join(", ")})` : ""}`
          : laws.join(", ")),
    };
  });

  const latest = latestFeedback(feedbacks);

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
  const latest = latestFeedback(feedbacks);
  const commentByViolation = new Map<number, string>();
  (latest?.items ?? []).forEach((it) =>
    commentByViolation.set(it.violationTextId, it.comment),
  );

  const feedback: Feedback[] = ranked.map(({ v, risk }) => {
    const tags = parseList(v.violationTypes);
    const laws = parseList(v.lawMappings);

    const raw = commentByViolation.get(v.id);
    const isAuto = raw ? /\[\s*".*?"\s*\]/.test(raw) : false;
    const reviewComment = raw && !isAuto ? cleanComment(raw) : "";
    const reason =
      v.violationReason?.trim() ||
      (tags.length
        ? `${tags.join(", ")}에 해당합니다.${laws.length ? ` (${laws.join(", ")})` : ""}`
        : laws.join(", "));
    return {
      title: tags.length
        ? v.violationText && v.violationText !== tags.join(", ")
          ? `${tags.join(", ")} - "${v.violationText}"`
          : tags.join(", ")
        : v.violationText,
      risk,
      tag: tags[0] ?? "",
      clause: laws.join(", "),
      reason,
      reviewComment,
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

// ── 프로젝트 한눈에 (심의 현황 · 마케팅/준법 공통) ────────────────────
// 문서의 title 을 프로젝트 제목으로 보고 묶는다. 같은 소재(name)의 여러 버전은
// 최신 버전만 현재 상태로 집계하며, 승인되지 않은 소재가 남은(진행 중) 프로젝트만 남긴다.
interface ProjectAgg {
  title: string;
  count: number;
  type: string;
  date: string;
  bucket: { waiting: number; ai: number; revise: number; approved: number };
}

function aggregateProjects(docs: DocumentResponse[]): ProjectAgg[] {
  const byId = new Map(docs.map((d) => [d.id, d]));
  // 한 소재는 parentId 체인으로 이어진 버전들의 묶음이다. 최상위 부모 id 를 소재 키로 쓴다.
  const rootId = (d: DocumentResponse): number => {
    let cur = d;
    const seen = new Set<number>();
    while (cur.parentId != null && byId.has(cur.parentId) && !seen.has(cur.id)) {
      seen.add(cur.id);
      cur = byId.get(cur.parentId)!;
    }
    return cur.id;
  };

  // 소재(부모 체인)별 최신 버전만 현재 상태로 집계한다.
  const familyLatest = new Map<number, DocumentResponse>();
  docs.forEach((d) => {
    const r = rootId(d);
    const cur = familyLatest.get(r);
    if (!cur || d.version > cur.version) familyLatest.set(r, d);
  });

  // 프로젝트(title) 단위로 묶기. 기간은 해당 title 의 모든 문서 기준.
  const byTitleMaterials = new Map<string, DocumentResponse[]>();
  familyLatest.forEach((d) => {
    const arr = byTitleMaterials.get(d.title) ?? [];
    arr.push(d);
    byTitleMaterials.set(d.title, arr);
  });
  const byTitleAll = new Map<string, DocumentResponse[]>();
  docs.forEach((d) => {
    const arr = byTitleAll.get(d.title) ?? [];
    arr.push(d);
    byTitleAll.set(d.title, arr);
  });

  const aggs: ProjectAgg[] = [];
  byTitleMaterials.forEach((materials, title) => {
    const bucket = { waiting: 0, ai: 0, revise: 0, approved: 0 };
    materials.forEach((d) => {
      if (d.status === "IN_REVIEW") bucket.waiting += 1;
      else if (d.status === "REVISION_REQUESTED") bucket.revise += 1;
      else if (d.status === "APPROVED") bucket.approved += 1;
      else bucket.ai += 1; // SUBMITTED, AI_VALIDATING
    });

    // 모든 소재가 승인된 프로젝트는 진행 중이 아니므로 제외.
    if (bucket.approved === materials.length) return;

    const typeCount = new Map<LoanType, number>();
    materials.forEach((d) =>
      typeCount.set(d.loanType, (typeCount.get(d.loanType) ?? 0) + 1),
    );
    const topType = [...typeCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];

    const fmt = (s?: string) => (s ? s.slice(0, 10).replace(/-/g, ".") : "");
    const all = byTitleAll.get(title) ?? [];
    const created = all.map((d) => d.createdAt).filter(Boolean).sort();
    const updated = all.map((d) => d.updatedAt).filter(Boolean).sort();
    const date = created.length
      ? `${fmt(created[0])} – ${fmt(updated[updated.length - 1])}`
      : "";

    aggs.push({
      title,
      count: materials.length,
      type: topType ? (LOAN_TYPE_LABEL[topType] ?? topType) : "",
      date,
      bucket,
    });
  });

  return aggs;
}

// 준법자문가 심의 현황용 — pipeline(라벨·건수·색) 형태.
export function buildLegalProjects(docs: DocumentResponse[]): LegalProject[] {
  return aggregateProjects(docs).map((a) => ({
    name: a.title,
    date: a.date,
    type: a.type,
    count: `소재 ${a.count}건`,
    pipeline: [
      { label: "검토 대기", n: a.bucket.waiting, color: COLOR.riskHigh },
      { label: "AI 검증중", n: a.bucket.ai, color: COLOR.info },
      { label: "수정 요청", n: a.bucket.revise, color: COLOR.riskMedium },
      { label: "승인 완료", n: a.bucket.approved, color: COLOR.riskLow },
    ],
  }));
}

// 마케팅 심의 현황용 — 진행률(pct) + 상태별 통계(stats) 형태.
export function buildMarketingProjects(docs: DocumentResponse[]): Project[] {
  return aggregateProjects(docs).map((a) => ({
    name: a.title,
    date: a.date,
    type: a.type,
    count: `소재 ${a.count}건`,
    pct: a.count ? Math.round((a.bucket.approved / a.count) * 100) : 0,
    stats: [
      ["검토 대기", String(a.bucket.waiting)],
      ["AI 검증중", String(a.bucket.ai)],
      ["수정 요청", String(a.bucket.revise)],
      ["승인 완료", String(a.bucket.approved)],
    ],
  }));
}

// ── 심의 이력 화면 ────────────────────────────────────────────────────
export interface HistoryData {
  kpis: LegalKpi[];
  violationDist: ViolationItem[];
  loanDist: LoanDistItem[];
  rows: HistRow[];
}

const LOAN_DIST_COLOR: Record<LoanType, string> = {
  CREDIT_LOAN: COLOR.jbNavy,
  COLLATERAL_LOAN: COLOR.jbBlue,
  JEONSE_LOAN: COLOR.info,
};

export function buildHistoryData(
  docs: DocumentResponse[],
  approvals: ApprovalResponse[],
  validationsByDoc: Map<number, ValidationResultResponse[]>,
): HistoryData {
  const approvalByDoc = new Map<number, ApprovalResponse>();
  approvals.forEach((a) => approvalByDoc.set(a.documentId, a));

  // 처리(승인/수정 요청)가 끝난 문서만 이력에 포함한다.
  const processed = docs.filter(
    (d) => d.status === "APPROVED" || d.status === "REVISION_REQUESTED",
  );

  const rows: HistRow[] = processed.map((d) => {
    const validations = validationsByDoc.get(d.id) ?? [];
    const latest = validations[validations.length - 1];
    const beforeNum = latest ? Math.round(latest.errorRate) : 0;
    const approved = d.status === "APPROVED";
    const approval = approvalByDoc.get(d.id);
    return {
      id: `#${d.id}${d.version > 1 ? ` v${d.version}` : ""}`,
      name: d.name,
      type: LOAN_TYPE_LABEL[d.loanType] ?? d.loanType,
      result: approved ? "approved" : "revising",
      before: `${beforeNum}%`,
      after: approved ? "0%" : null,
      date: approved
        ? ((approval?.approvedAt ?? d.updatedAt)?.slice(0, 10).replace(/-/g, ".") ??
          "—")
        : "—",
      cert: approval?.reviewNumber ?? null,
    };
  });

  // KPI
  const total = rows.length;
  const errAvg = total
    ? rows.reduce((s, r) => s + parseFloat(r.before), 0) / total
    : 0;
  const revisingCount = rows.filter((r) => r.result === "revising").length;
  const rejectRate = total ? Math.round((revisingCount / total) * 100) : 0;

  // 평균 처리일 — 승인 문서의 (승인일 − 생성일) 평균.
  const days = processed
    .filter((d) => d.status === "APPROVED")
    .map((d) => {
      const a = approvalByDoc.get(d.id);
      if (!a) return null;
      const diff =
        (new Date(a.approvedAt).getTime() - new Date(d.createdAt).getTime()) /
        86400000;
      return diff >= 0 ? diff : null;
    })
    .filter((x): x is number => x != null);
  const avgDays = days.length
    ? days.reduce((s, x) => s + x, 0) / days.length
    : 0;

  const round1 = (n: number) => (Math.round(n * 10) / 10).toString();
  const kpis: LegalKpi[] = [
    { label: "총 심의", value: String(total), unit: "건" },
    { label: "평균 오류율", value: round1(errAvg), unit: "%" },
    { label: "평균 처리", value: round1(avgDays), unit: "일" },
    { label: "반려율", value: String(rejectRate), unit: "%" },
  ];

  // 위반 유형 분포 — 처리 문서의 모든 위반 항목 violationTypes 집계 후 상위 5개.
  const typeCount = new Map<string, number>();
  let totalViolations = 0;
  processed.forEach((d) => {
    (validationsByDoc.get(d.id) ?? []).forEach((vr) =>
      vr.violations.forEach((v) =>
        parseList(v.violationTypes).forEach((t) => {
          typeCount.set(t, (typeCount.get(t) ?? 0) + 1);
          totalViolations += 1;
        }),
      ),
    );
  });
  const violationDist: ViolationItem[] = [...typeCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([label, n]) => ({
      label,
      pct: totalViolations ? Math.round((n / totalViolations) * 100) : 0,
    }));

  // 대출유형별 심의 건수.
  const loanCount = new Map<LoanType, number>();
  processed.forEach((d) =>
    loanCount.set(d.loanType, (loanCount.get(d.loanType) ?? 0) + 1),
  );
  const loanDist: LoanDistItem[] = [...loanCount.entries()].map(([lt, n]) => ({
    label: LOAN_TYPE_LABEL[lt] ?? lt,
    n,
    color: LOAN_DIST_COLOR[lt] ?? COLOR.info,
  }));

  return { kpis, violationDist, loanDist, rows };
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
