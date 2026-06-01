"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FileCheck2, FileText, Search, X } from "lucide-react";
import Pill from "@/components/ui/Pill";
import { COLOR } from "@/lib/colors";
import { ARCHIVE, MATERIALS, type Material, type ArchiveItem } from "@/lib/data";
import { ROUTES } from "@/lib/routes";

type Hit =
  | { kind: "material"; m: Material }
  | { kind: "archive"; a: ArchiveItem };

function match(q: string, ...fields: string[]) {
  const t = q.trim().toLowerCase();
  if (!t) return false;
  return fields.some((f) => f.toLowerCase().includes(t));
}

export default function GlobalSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hits = useMemo<Hit[]>(() => {
    if (!q.trim()) return [];
    const m = MATERIALS.filter((r) => match(q, r.name, r.id, r.camp)).map(
      (m): Hit => ({ kind: "material", m }),
    );
    const a = ARCHIVE.filter((r) => match(q, r.name, r.no, r.camp)).map(
      (a): Hit => ({ kind: "archive", a }),
    );
    return [...m, ...a].slice(0, 8);
  }, [q]);

  useEffect(() => setActiveIdx(0), [q]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const go = (hit: Hit) => {
    setOpen(false);
    setQ("");
    if (hit.kind === "archive") {
      router.push(ROUTES.marketing.cert(hit.a.no));
    } else if (hit.m.status === "approved") {
      router.push(ROUTES.marketing.archive);
    } else {
      router.push(ROUTES.marketing.feedback);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!hits.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + hits.length) % hits.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(hits[activeIdx]);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <div
        className="tb-search"
        style={{
          color: q ? "#111827" : "#9CA3AF",
          borderColor: open ? "#1F6FEB" : "#D1D5DB",
          boxShadow: open ? "0 0 0 3px rgba(31,111,235,.32)" : "none",
          paddingRight: q ? 32 : 12,
        }}
      >
        <Search size={16} color={COLOR.text3} />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => q && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="심의 ID · 자료명 검색"
          className="border-none outline-none bg-transparent w-full text-[13px] text-text-1 placeholder:text-text-3"
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-text-3 hover:text-text-1"
            aria-label="검색 지우기"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {open && q.trim() && (
        <div
          className="absolute left-0 right-0 mt-1 bg-white border border-border rounded-card overflow-hidden z-50"
          style={{ boxShadow: "0 6px 20px rgba(16,24,40,.12)" }}
        >
          {hits.length === 0 ? (
            <div className="px-3.5 py-4 text-[12.5px] text-text-3 text-center">
              일치하는 결과가 없습니다.
            </div>
          ) : (
            <ul className="max-h-[360px] overflow-y-auto">
              {hits.map((h, i) => {
                const isActive = i === activeIdx;
                const key =
                  h.kind === "material" ? `m-${h.m.id}-${i}` : `a-${h.a.no}`;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => go(h)}
                      className="w-full text-left flex items-start gap-2.5 px-3 py-2.5 border-b border-border last:border-b-0"
                      style={{
                        background: isActive ? "#F2F4F7" : "transparent",
                      }}
                    >
                      <span
                        className="grid place-content-center w-6 h-6 rounded-full flex-none mt-0.5"
                        style={{
                          background:
                            h.kind === "archive" ? "#E7F6EC" : "#E8F1FE",
                          color: h.kind === "archive" ? "#16A34A" : "#0B2F6E",
                        }}
                      >
                        {h.kind === "archive" ? (
                          <FileCheck2 size={13} />
                        ) : (
                          <FileText size={13} />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 justify-between">
                          <div className="text-[13px] font-semibold text-text-1 truncate">
                            {h.kind === "archive" ? h.a.name : h.m.name}
                          </div>
                          {h.kind === "material" && (
                            <Pill status={h.m.status} />
                          )}
                          {h.kind === "archive" && (
                            <span className="pill pill-approved">
                              <span className="dot" />
                              유효
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11.5px] text-text-3">
                          <span className="mono">
                            {h.kind === "archive" ? h.a.no : h.m.id}
                          </span>
                          <span>·</span>
                          <span className="truncate">
                            {h.kind === "archive" ? h.a.camp : h.m.camp}
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="px-3 py-2 border-t border-border text-[11px] text-text-3 flex items-center justify-between bg-page">
            <span>↑↓ 이동 · Enter 선택 · Esc 닫기</span>
            <span className="num">{hits.length}건</span>
          </div>
        </div>
      )}
    </div>
  );
}
