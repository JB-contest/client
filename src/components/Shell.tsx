"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import LogoutModal from "./LogoutModal";

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar onLogout={() => setLogoutOpen(true)} />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />
          <div className="flex-1 overflow-y-auto">
            <div
              key={pathname}
              className="max-w-[1120px] mx-auto px-9 pt-7 pb-[72px] fade-in"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </>
  );
}
