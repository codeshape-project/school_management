import { useRef } from "react";
import { createPortal } from "react-dom";
import { Printer, X } from "lucide-react";

/*
  Generic print window: shows ready-made HTML in a page-sized frame
  with Print / Close buttons.

  title       heading of the window
  html        full HTML document to show and print
  pageWidth   width of the page in px   (A4 = 794, A5 = 559)
  pageHeight  height of the page in px  (A4 = 1123, A5 = 794)
*/
export default function PrintPreview({
  title = "Print Preview",
  html,
  pageWidth = 794,
  pageHeight = 1123,
  onClose,
}) {
  const frameRef = useRef(null);

  function printNow() {
    const frame = frameRef.current;
    if (!frame?.contentWindow) return;

    frame.contentWindow.focus();
    frame.contentWindow.print();
  }

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-3">
      <div
        className="flex h-full max-h-[96vh] w-full flex-col overflow-hidden rounded-xl border-2 border-[#0b2a52] bg-[#dbe9f4] shadow-2xl"
        style={{ maxWidth: pageWidth + 60 }}
      >
        <div className="flex shrink-0 items-center justify-between gap-2 bg-gradient-to-r from-[#174f7b] via-[#216994] to-[#174f7b] px-3 py-2 text-white">
          <h3 className="text-sm font-black">{title}</h3>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={printNow}
              className="flex h-8 items-center gap-1.5 rounded-md border border-emerald-600 bg-emerald-600 px-4 text-[11px] font-extrabold text-white transition-all hover:bg-emerald-700"
            >
              <Printer size={14} strokeWidth={2.5} />
              Print
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
            title={title}
            srcDoc={html}
            className="mx-auto block max-w-full border-0 bg-white shadow"
            style={{ width: pageWidth, height: pageHeight }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}