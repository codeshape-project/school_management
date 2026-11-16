import { useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { Printer, X } from "lucide-react";
import { buildReceiptHtml } from "../utils/feeReceipt";

/*
  Shows the fee receipt slip (A4) in a window with Print / Close.
  data = result of buildReceiptData(...)
*/
export default function FeeReceiptPreview({ data, onClose }) {
  const frameRef = useRef(null);

  const html = useMemo(() => buildReceiptHtml(data), [data]);

  function printReceipt() {
    const frame = frameRef.current;
    if (!frame?.contentWindow) return;

    frame.contentWindow.focus();
    frame.contentWindow.print();
  }

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-3">
      <div className="flex h-full max-h-[96vh] w-full max-w-[680px] flex-col overflow-hidden rounded-xl border-2 border-[#0b2a52] bg-[#dbe9f4] shadow-2xl">
        <div className="flex shrink-0 items-center justify-between gap-2 bg-gradient-to-r from-[#174f7b] via-[#216994] to-[#174f7b] px-3 py-2 text-white">
          <h3 className="text-sm font-black">Fee Receipt</h3>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={printReceipt}
              className="flex h-8 items-center gap-1.5 rounded-md border border-emerald-600 bg-emerald-600 px-4 text-[11px] font-extrabold text-white transition-all hover:bg-emerald-700"
            >
              <Printer size={14} strokeWidth={2.5} />
              Print Receipt
            </button>

            <button
              type="button"
              onClick={onClose}
              title="Close"
              className="flex h-8 w-9 items-center justify-center rounded-md border border-red-300 bg-red-600 text-white transition-all hover:bg-red-700"
            >
              <X size={16} strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-slate-300 p-2">
          <iframe
            ref={frameRef}
            title="Fee receipt"
            srcDoc={html}
                        className="mx-auto block h-[794px] w-[559px] max-w-full border-0 bg-white shadow"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}