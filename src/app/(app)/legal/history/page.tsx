import PageHead from "@/components/PageHead";
import HistDistGrid from "@/components/legal/history/HistDistGrid";
import HistKpiGrid from "@/components/legal/history/HistKpiGrid";
import HistPanel from "@/components/legal/history/HistPanel";

export default function LegalHistoryPage() {
  return (
    <div className="fade-in">
      <PageHead
        crumb={["Home", "심의 이력"]}
        title="심의 이력"
        sub="완료된 심의 건의 처리 결과와 오류율 개선 추이를 확인합니다."
      />
      <HistKpiGrid />
      <HistDistGrid />
      <HistPanel />
    </div>
  );
}
