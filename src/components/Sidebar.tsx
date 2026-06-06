"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  ChevronDown,
  FolderCheck,
  History as HistoryIcon,
  Home as HomeIcon,
  LogOut,
  Repeat,
  Upload,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();
  if (pathname.startsWith(ROUTES.legal.root))
    return <LegalSidebar onLogout={onLogout} />;
  return <MarketingSidebar onLogout={onLogout} />;
}

function MarketingSidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isHome =
    pathname === ROUTES.marketing.root || pathname === ROUTES.marketing.home;
  const isFeedback = pathname.startsWith(ROUTES.marketing.feedback);
  const isUpload = pathname.startsWith(ROUTES.marketing.upload);
  const isArchive = pathname.startsWith(ROUTES.marketing.archive);
  const homeActive = isHome || isFeedback;

  const [homeOpen, setHomeOpen] = useState(true);
  useEffect(() => {
    if (homeActive) setHomeOpen(true);
  }, [homeActive]);

  return (
    <aside className="w-[220px] flex-none bg-white border-r border-border flex flex-col">
      <div className="flex items-center gap-2.5 px-4 pt-[18px] pb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/jb-symbol.png" alt="JB" className="w-8 h-8" />
        <div>
          <div className="font-bold text-sm leading-tight">홍길동</div>
          <div className="text-[11px] text-text-2 mt-[1px]">마케팅팀</div>
        </div>
      </div>
      <nav className="sb-nav">
        <div className="sb-sec">워크스페이스</div>

        <div className="mb-0.5">
          <button
            type="button"
            className={clsx("nav-item nav-parent", homeActive && "on")}
            onClick={() => setHomeOpen((o) => !o)}
          >
            <span className="np-left">
              <HomeIcon size={18} />
              HOME
            </span>
            <span className={clsx("np-chev", homeOpen && "open")}>
              <ChevronDown size={16} />
            </span>
          </button>
          {homeOpen && (
            <div className="nav-sub">
              <button
                type="button"
                className={clsx("nav-subitem", isHome && "active")}
                onClick={() => router.push(ROUTES.marketing.home)}
              >
                <span className="sub-dot" />
                심의 현황
              </button>
              <button
                type="button"
                className={clsx("nav-subitem", isFeedback && "active")}
                onClick={() => router.push(ROUTES.marketing.feedback)}
              >
                <span className="sub-dot" />
                피드백 수정
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className={clsx("nav-item", isUpload && "active")}
          onClick={() => router.push(ROUTES.marketing.upload)}
        >
          <Upload size={18} />
          자료 업로드
        </button>
        <button
          type="button"
          className={clsx("nav-item", isArchive && "active")}
          onClick={() => router.push(ROUTES.marketing.archive)}
        >
          <FolderCheck size={18} />
          심의필 보관함
        </button>
      </nav>
      <div className="p-2 border-t border-border flex flex-col gap-1">
        <button
          type="button"
          className="nav-item w-auto"
          onClick={() => router.push(ROUTES.legal.home)}
          title="준법자문가 워크스페이스로 전환"
        >
          <Repeat size={18} />
          준법자문가로 전환
        </button>
        <button type="button" className="nav-item w-auto" onClick={onLogout}>
          <LogOut size={18} />
          로그아웃
        </button>
      </div>
    </aside>
  );
}

function LegalSidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isLegalHome =
    pathname === ROUTES.legal.root || pathname === ROUTES.legal.home;
  const isLegalReview = pathname.startsWith(ROUTES.legal.review);
  const isLegalIssue = pathname.startsWith(ROUTES.legal.issue);
  const isLegalHistory = pathname.startsWith(ROUTES.legal.history);
  const homeActive = isLegalHome || isLegalReview || isLegalIssue;

  const [homeOpen, setHomeOpen] = useState(true);
  useEffect(() => {
    if (homeActive) setHomeOpen(true);
  }, [homeActive]);

  return (
    <aside className="w-[220px] flex-none bg-white border-r border-border flex flex-col">
      <div className="flex items-center gap-2.5 px-4 pt-[18px] pb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/jb-symbol.png" alt="JB" className="w-8 h-8" />
        <div>
          <div className="font-bold text-sm leading-tight">홍길동</div>
          <div className="text-[11px] text-text-2 mt-[1px]">준법자문가</div>
        </div>
      </div>
      <nav className="sb-nav">
        <div className="sb-sec">워크스페이스</div>

        <div className="mb-0.5">
          <button
            type="button"
            className={clsx("nav-item nav-parent", homeActive && "on")}
            onClick={() => setHomeOpen((o) => !o)}
          >
            <span className="np-left">
              <HomeIcon size={18} />
              HOME
            </span>
            <span className={clsx("np-chev", homeOpen && "open")}>
              <ChevronDown size={16} />
            </span>
          </button>
          {homeOpen && (
            <div className="nav-sub">
              <button
                type="button"
                className={clsx("nav-subitem", isLegalHome && "active")}
                onClick={() => router.push(ROUTES.legal.home)}
              >
                <span className="sub-dot" />
                심의 현황
              </button>
              <button
                type="button"
                className={clsx("nav-subitem", isLegalReview && "active")}
                onClick={() => router.push(ROUTES.legal.review)}
              >
                <span className="sub-dot" />
                검토
              </button>
              <button
                type="button"
                className={clsx("nav-subitem", isLegalIssue && "active")}
                onClick={() => router.push(ROUTES.legal.issue)}
              >
                <span className="sub-dot" />
                심의필 발급
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className={clsx("nav-item", isLegalHistory && "active")}
          onClick={() => router.push(ROUTES.legal.history)}
        >
          <HistoryIcon size={18} />
          심의 이력
        </button>
      </nav>
      <div className="p-2 border-t border-border flex flex-col gap-1">
        <button
          type="button"
          className="nav-item w-auto"
          onClick={() => router.push(ROUTES.marketing.home)}
          title="마케팅팀 워크스페이스로 전환"
        >
          <Repeat size={18} />
          마케팅팀으로 전환
        </button>
        <button type="button" className="nav-item w-auto" onClick={onLogout}>
          <LogOut size={18} />
          로그아웃
        </button>
      </div>
    </aside>
  );
}
