interface MetaData {
  title: string;
  sub: string;
  id: string;
  sent: string;
}

const FALLBACK: MetaData = {
  title: "봄맞이 신용대출 캠페인",
  sub: "봄맞이 신용대출 상세 페이지 · 신용대출",
  id: "SM-2026-0428",
  sent: "04/26 14:20 전달됨",
};

export default function MetaBar({ data }: { data?: MetaData }) {
  const d = data ?? FALLBACK;
  return (
    <div className="panel flex items-center justify-between px-[18px] py-3.5 mb-4">
      <div>
        <div className="text-base font-bold">{d.title}</div>
        <div className="text-[12.5px] text-text-2 mt-[3px]">{d.sub}</div>
      </div>
      <div className="text-right">
        <div className="mono text-[13px] font-semibold">{d.id}</div>
        <div className="num text-[11.5px] text-text-3 mt-[3px]">{d.sent}</div>
      </div>
    </div>
  );
}
