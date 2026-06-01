"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import PageHead from "@/components/PageHead";
import KpiGrid from "@/components/home/KpiGrid";
import ProjectGrid from "@/components/home/ProjectGrid";
import MaterialsPanel from "@/components/home/MaterialsPanel";
import { ROUTES } from "@/lib/routes";

export default function HomePage() {
  const router = useRouter();
  return (
    <div>
      <PageHead
        crumb={["Home", "심의 현황"]}
        title="심의 현황"
        sub="내가 의뢰한 자료의 심의 진행 상황입니다."
        actions={
          <button
            className="btn btn-primary"
            onClick={() => router.push(ROUTES.marketing.upload)}
          >
            <Plus size={16} />새 자료 업로드
          </button>
        }
      />
      <KpiGrid />
      <ProjectGrid />
      <MaterialsPanel />
    </div>
  );
}
