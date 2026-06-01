import FacetField from "./FacetField";

interface Props {
  headline: string;
  sub?: string;
  chips?: string[];
  showFacet?: boolean;
}

function Headline({ text }: { text: string }) {
  let lines: string[];
  if (text.indexOf("\n") >= 0) lines = text.split("\n");
  else {
    const i = text.indexOf(",");
    lines =
      i >= 0 && i < text.length - 1
        ? [text.slice(0, i + 1), text.slice(i + 1).trim()]
        : [text];
  }
  return (
    <h1 className="brand-headline">
      {lines.map((l, i) => (
        <span key={i}>
          {l}
          {i < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </h1>
  );
}

export default function BrandPanel({
  headline,
  sub = "JB FinCompliance AI · 준법 심의 워크스페이스",
  chips = ["6단계 AI 검증", "근거 기반 심의"],
  showFacet = true,
}: Props) {
  return (
    <aside className="brand-panel">
      {showFacet ? (
        <>
          <FacetField cols={9} rows={12} seed={7} />
          <div className="brand-scrim" />
        </>
      ) : (
        <div className="brand-gradient" />
      )}
      <div className="brand-content">
        <div className="brand-mid">
          <Headline text={headline} />
          <p className="brand-sub">{sub}</p>
          {chips.length > 0 && (
            <div className="brand-chips">
              {chips.map((c) => (
                <span key={c} className="brand-chip">
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="brand-foot">
          © 2026 JB Financial Group · 준법감시부서 전용 시스템
        </div>
      </div>
    </aside>
  );
}
