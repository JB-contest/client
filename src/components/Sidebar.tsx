"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  ChevronDown,
  FolderCheck,
  Home as HomeIcon,
  LogOut,
  Upload,
} from "lucide-react";

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/" || pathname === "/home";
  const isFeedback = pathname.startsWith("/feedback");
  const isUpload = pathname.startsWith("/upload");
  const isArchive = pathname.startsWith("/archive");
  const homeActive = isHome || isFeedback;

  const [homeOpen, setHomeOpen] = useState(true);
  useEffect(() => {
    if (homeActive) setHomeOpen(true);
  }, [homeActive]);

  return (
    <aside className="w-[220px] flex-none bg-white border-r border-border flex flex-col">
      <div className="flex items-center gap-2.5 px-4 pt-[18px] pb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/jb-symbol.png"
          alt="JB"
          className="w-8 h-8"
        />
        <div>
          <div className="font-bold text-sm leading-tight">제이비</div>
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
                onClick={() => router.push("/home")}
              >
                <span className="sub-dot" />
                심의 현황
              </button>
              <button
                type="button"
                className={clsx("nav-subitem", isFeedback && "active")}
                onClick={() => router.push("/feedback")}
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
          onClick={() => router.push("/upload")}
        >
          <Upload size={18} />
          자료 업로드
        </button>
        <button
          type="button"
          className={clsx("nav-item", isArchive && "active")}
          onClick={() => router.push("/archive")}
        >
          <FolderCheck size={18} />
          심의필 보관함
        </button>
      </nav>
      <div className="p-2 border-t border-border">
        <button type="button" className="nav-item w-auto" onClick={onLogout}>
          <LogOut size={18} />
          로그아웃
        </button>
      </div>
    </aside>
  );
}
