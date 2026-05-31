import { Bell } from "lucide-react";
import GlobalSearch from "./GlobalSearch";

export default function Topbar() {
  return (
    <header className="topbar">
      <GlobalSearch />
      <div className="flex items-center gap-3.5">
        <div className="tb-icon-btn">
          <Bell size={19} />
          <span className="tb-badge" />
        </div>
        <div className="avatar">제</div>
      </div>
    </header>
  );
}
