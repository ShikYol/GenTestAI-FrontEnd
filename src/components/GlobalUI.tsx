import { useUI } from "../context/UIContext";

export default function GlobalUI() {
  const { loading, message, clearMessage } = useUI();

  return (
    <>
      {/* Global Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Global Message Banner */}
      {message && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white px-4 py-2 rounded shadow z-50 flex items-center gap-2">
          <span>{message}</span>
          <button
            onClick={clearMessage}
            className="ml-2 text-sm underline hover:text-brand-muted"
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
}
