import LoanDist from "./LoanDist";
import ViolationDist from "./ViolationDist";

export default function HistDistGrid() {
  return (
    <div className="grid grid-cols-2 gap-3.5 mb-7 items-start">
      <ViolationDist />
      <LoanDist />
    </div>
  );
}
