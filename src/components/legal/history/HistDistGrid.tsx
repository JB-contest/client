import LoanDist from "./LoanDist";
import ViolationDist from "./ViolationDist";

export default function HistDistGrid() {
  return (
    <>
      <div className="text-[17px] font-bold tracking-[-0.01em] my-1.5 mb-3.5">
        분석
      </div>
      <div className="grid grid-cols-2 gap-3.5 mb-7 items-start">
        <ViolationDist />
        <LoanDist />
      </div>
    </>
  );
}
