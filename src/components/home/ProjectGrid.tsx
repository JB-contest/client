import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@/lib/data";

export default function ProjectGrid() {
  return (
    <>
      <div className="text-base font-semibold mt-2 mb-3">프로젝트 한눈에</div>
      <div className="grid grid-cols-2 gap-3.5 mb-[26px]">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={i} p={p} />
        ))}
      </div>
    </>
  );
}
