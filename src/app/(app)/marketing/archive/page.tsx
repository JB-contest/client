"use client";

import { useMemo, useState } from "react";
import PageHead from "@/components/PageHead";
import ArchiveGrid from "@/components/archive/ArchiveGrid";
import ArchiveToolbar from "@/components/archive/ArchiveToolbar";
import EmptyState from "@/components/archive/EmptyState";
import { ARCHIVE } from "@/lib/data";

export default function ArchivePage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [surface, setSurface] = useState("");

  const list = useMemo(
    () =>
      ARCHIVE.filter(
        (a) =>
          (!q ||
            a.name.includes(q) ||
            a.no.includes(q) ||
            a.camp.includes(q)) &&
          (!type || a.type === type) &&
          (!surface || a.surface === surface),
      ),
    [q, type, surface],
  );

  return (
    <div>
      <PageHead
        crumb={[]}
        title="심의필 보관함"
        sub="승인 완료된 자료의 광고 심의필 증명을 보관·발급합니다."
      />
      <ArchiveToolbar
        q={q}
        setQ={setQ}
        type={type}
        setType={setType}
        surface={surface}
        setSurface={setSurface}
        total={list.length}
      />
      {list.length === 0 ? <EmptyState /> : <ArchiveGrid items={list} />}
    </div>
  );
}
