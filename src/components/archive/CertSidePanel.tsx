"use client";

import { useState } from "react";
import CertActions from "./CertActions";
import CertStatusNote from "./CertStatusNote";
import HistoryModal from "./HistoryModal";
import type { ArchiveItem } from "@/lib/data";

export default function CertSidePanel({ cert }: { cert: ArchiveItem }) {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <>
      <div className="sticky top-0 flex flex-col gap-3">
        <CertStatusNote />
        <CertActions onShowHistory={() => setShowHistory(true)} />
      </div>
      <HistoryModal
        open={showHistory}
        onClose={() => setShowHistory(false)}
        cert={cert}
      />
    </>
  );
}
