"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/data";
import { buildMarketingProjects, listDocuments } from "@/lib/api";

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    listDocuments()
      .then((docs) => setProjects(buildMarketingProjects(docs)))
      .catch(() => setProjects([]));
  }, []);

  return (
    <>
      <div className="text-base font-semibold mt-2 mb-3">프로젝트 한눈에</div>
      {projects === null ? (
        <div className="panel p-10 text-center text-text-3 text-[13.5px] mb-[26px]">
          불러오는 중…
        </div>
      ) : projects.length === 0 ? (
        <div className="panel p-10 text-center text-text-3 text-[13.5px] mb-[26px]">
          진행 중인 프로젝트가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 mb-[26px]">
          {projects.map((p, i) => (
            <ProjectCard key={i} p={p} />
          ))}
        </div>
      )}
    </>
  );
}
