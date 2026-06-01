"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageHead from "@/components/PageHead";
import CertCard from "@/components/archive/CertCard";
import CertSidePanel from "@/components/archive/CertSidePanel";
import { ARCHIVE } from "@/lib/data";
import { ROUTES } from "@/lib/routes";

export default function CertDetailPage() {
  const params = useParams<{ no: string }>();
  const router = useRouter();
  const no = decodeURIComponent(params.no);
  const a = ARCHIVE.find((x) => x.no === no) ?? ARCHIVE[0];

  return (
    <div>
      <PageHead
        crumb={["심의필 보관함", a.no]}
        title="심의필 보관함"
        actions={
          <button
            className="btn btn-ghost"
            onClick={() => router.push(ROUTES.marketing.archive)}
          >
            <ArrowLeft size={16} />목록으로
          </button>
        }
      />

      <div
        className="grid gap-4 items-start"
        style={{ gridTemplateColumns: "1fr 252px" }}
      >
        <CertCard a={a} />
        <CertSidePanel cert={a} />
      </div>
    </div>
  );
}
