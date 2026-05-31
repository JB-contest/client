import type { ReactNode } from "react";

interface PageHeadProps {
  crumb?: string[];
  title: string;
  sub?: string;
  actions?: ReactNode;
}

export default function PageHead({
  crumb,
  title,
  sub,
  actions,
}: PageHeadProps) {
  return (
    <div className="mb-[22px]">
      {crumb && crumb.length > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-text-3 mb-2">
          {crumb.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-text-3">›</span>}
              <span>{c}</span>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[28px] font-bold tracking-[-0.01em]">
            {title}
          </div>
          {sub && (
            <div className="text-[13px] text-text-2 mt-[5px]">{sub}</div>
          )}
        </div>
        {actions}
      </div>
    </div>
  );
}
