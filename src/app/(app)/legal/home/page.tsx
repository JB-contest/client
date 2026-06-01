import PageHead from "@/components/PageHead";
import LegalKpiGrid from "@/components/legal/home/LegalKpiGrid";
import LegalMaterialsPanel from "@/components/legal/home/LegalMaterialsPanel";
import LegalProjectGrid from "@/components/legal/home/LegalProjectGrid";

export default function LegalHomePage() {
  return (
    <div className="fade-in">
      <PageHead
        crumb={["Home", "심의 현황"]}
        title="심의 현황"
        sub="오늘 처리할 검토 요청과 진행 중인 심의 현황입니다."
      />
      <LegalKpiGrid />
      <LegalProjectGrid />
      <LegalMaterialsPanel />
    </div>
  );
}
