"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { COLOR } from "@/lib/colors";

type ToastKind = "success" | "error";
interface ToastItem {
  id: number;
  msg: string;
  kind: ToastKind;
}

interface ToastContextValue {
  toast: (msg: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error("useToast must be used within ToasterProvider");
  return ctx;
}

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const seq = useRef(0);

  const toast = useCallback<ToastContextValue["toast"]>(
    (msg, kind = "success") => {
      seq.current += 1;
      const id = seq.current;
      setItems((prev) => [...prev, { id, msg, kind }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== id));
      }, 3200);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Toasts items={items} />
    </ToastContext.Provider>
  );
}

function Toasts({ items }: { items: ToastItem[] }) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2.5 z-[80]">
      {items.map((t) => (
        <div key={t.id} className={`toast ${t.kind}`}>
          <span className="bar" />
          {t.kind === "success" ? (
            <CheckCircle2 size={18} color={COLOR.riskLow} />
          ) : (
            <AlertCircle size={18} color={COLOR.riskHigh} />
          )}
          <span style={{ fontSize: 13.5, fontWeight: 500 }}>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

export function useMount(cb: () => void) {
  useEffect(cb, []); // eslint-disable-line react-hooks/exhaustive-deps
}
