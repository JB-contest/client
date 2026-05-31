import { FileText } from "lucide-react";

export default function Clause({ text }: { text: string }) {
  const m = text.match(/^(.*?)(\s*제.*)$/);
  return (
    <span className="fc-clause">
      <FileText size={12} />
      {m ? (
        <>
          {m[1]} <span className="mono">{m[2].trim()}</span>
        </>
      ) : (
        text
      )}
    </span>
  );
}
