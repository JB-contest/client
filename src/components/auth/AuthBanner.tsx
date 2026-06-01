import { AlertCircle } from "lucide-react";

export default function AuthBanner({ message }: { message: string }) {
  return (
    <div className="auth-banner" role="alert">
      <AlertCircle size={16} />
      <span>{message}</span>
    </div>
  );
}
