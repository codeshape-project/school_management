import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const EVENT = "school:toast";

function push(type, message, duration) {
  window.dispatchEvent(
    new CustomEvent(EVENT, {
      detail: {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        type,
        message,
        duration,
      },
    })
  );
}

export const notify = {
  success: (message, duration = 3500) => push("success", message, duration),
  error: (message, duration = 6000) => push("error", message, duration),
  info: (message, duration = 3500) => push("info", message, duration),
};

const STYLES = {
  success: { box: "border-emerald-300 bg-emerald-600", Icon: CheckCircle2 },
  error: { box: "border-red-300 bg-red-600", Icon: XCircle },
  info: { box: "border-sky-300 bg-[#174f7b]", Icon: Info },
};

export function ToastHost() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const timers = new Map();

    const remove = (id) => {
      clearTimeout(timers.get(id));
      timers.delete(id);
      setToasts((list) => list.filter((t) => t.id !== id));
    };

    const onToast = (event) => {
      const toast = event.detail;
      setToasts((list) => [...list, toast].slice(-4));
      timers.set(toast.id, setTimeout(() => remove(toast.id), toast.duration));
    };

    window.addEventListener(EVENT, onToast);
    return () => {
      window.removeEventListener(EVENT, onToast);
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const dismiss = (id) =>
    setToasts((list) => list.filter((t) => t.id !== id));

  return createPortal(
    <div className="pointer-events-none fixed right-4 top-4 z-[99999] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2 print:hidden">
      {toasts.map((toast) => {
        const { box, Icon } = STYLES[toast.type] || STYLES.info;
        return (
          <div
            key={toast.id}
            role={toast.type === "error" ? "alert" : "status"}
            className={`toast-in pointer-events-auto flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm font-bold text-white shadow-2xl ${box}`}
          >
            <Icon size={20} className="mt-0.5 shrink-0" />
            <span className="min-w-0 flex-1 break-words">{toast.message}</span>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Close notification"
              className="shrink-0 rounded p-0.5 text-white/80 hover:bg-white/20 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>,
    document.body
  );
}