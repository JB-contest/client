"use client";

import { useEffect, useState } from "react";
import LegalProjectCard from "./LegalProjectCard";
import type { LegalProject } from "@/lib/legalData";
import { buildLegalProjects, listDocuments } from "@/lib/api";

export default function LegalProjectGrid() {
  const [projects, setProjects] = useState<LegalProject[] | null>(null);

  useEffect(() => {
    listDocuments()
      .then((docs) => setProjects(buildLegalProjects(docs)))
      .catch(() => setProjects([]));
  }, []);

  return (
    <>
      <div className="text-[17px] font-bold tracking-[-0.01em] my-1.5 mb-3.5">
        프로젝트 한눈에
      </div>
      {projects === null ? (
        <div className="panel p-10 text-center text-text-3 text-[13.5px] mb-7">
          불러오는 중…
        </div>
      ) : projects.length === 0 ? (
        <div className="panel p-10 text-center text-text-3 text-[13.5px] mb-7">
          진행 중인 프로젝트가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 mb-7">
          {projects.map((p, i) => (
            <LegalProjectCard key={i} p={p} />
          ))}
        </div>
      )}
    </>
  );
}
