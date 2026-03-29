import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { selectIsGlobalLoading } from "@/redux/slices/loadingSlice";

const GlobalLoading = () => {
  const loading = useSelector(selectIsGlobalLoading);

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3 rounded-xl border bg-card px-8 py-6 shadow-lg">
        <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden />
        <span className="text-sm font-medium text-muted-foreground">Loading…</span>
      </div>
    </div>
  );
};

export default GlobalLoading;
