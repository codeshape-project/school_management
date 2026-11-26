import { Printer, Trash2, Check, ImageOff } from "lucide-react";
import ICardFace from "./ICardFace";
import { PRINT_LAYOUTS } from "./icardUtils";
import { inputClass, labelClass } from "../library/libraryUi";

/* =========================================================
   SMALL PIECES SHARED BY THE I-CARD FORMS
========================================================= */

export const toOptions = (list = []) => list.map((v) => ({ value: v, label: v }));

export function LayoutSelect({ value, onChange }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`${labelClass} !mb-0 whitespace-nowrap`}>Print layout</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`${inputClass} !h-9 !w-auto`}>
        {PRINT_LAYOUTS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Chip({ children, tone = "blue" }) {
  const tones = {
    blue: "border-[#79a9c9] bg-[#e6f0f7] text-[#163d5c]",
    green: "border-emerald-300 bg-emerald-50 text-emerald-700",
    red: "border-rose-300 bg-rose-50 text-rose-700",
    gold: "border-amber-300 bg-amber-50 text-amber-700",
  };
  return (
    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${tones[tone] || tones.blue}`}>
      {children}
    </span>
  );
}

/* ---------------------------------------------------------
   Grid of ready-made cards.
   items = [{ id, card, saved, missingPhoto }]
   Each card has a tick box, a Print button and (optionally)
   a Remove button.
--------------------------------------------------------- */
export function CardGrid({ items, template, type, selected, onToggle, onPrint, onRemove, emptyText }) {
  if (!items.length) {
    return (
      <div className="rounded-md border border-dashed border-[#79a9c9] bg-white/60 px-3 py-10 text-center text-[11px] font-semibold text-[#173b5c]/70">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(205px,1fr))] gap-2.5">
      {items.map((it) => {
        const checked = selected.has(it.id);
        return (
          <div
            key={it.id}
            className={`relative rounded-xl p-1.5 transition ${
              checked ? "bg-[#f8e8a8] ring-2 ring-[#d8a928]" : "bg-white/70 ring-1 ring-[#79a9c9]"
            }`}
          >
            <div className="mx-auto w-fit shadow-[0_2px_8px_rgba(11,42,82,0.25)]" style={{ borderRadius: 11 }}>
              <ICardFace card={it.card} template={template} type={type} size="3.5px" />
            </div>

            <label
              className="absolute left-3 top-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-[#0b2a52] bg-white shadow"
              title="Select"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(it.id)}
                className="peer sr-only"
              />
              <Check size={15} strokeWidth={3.5} className={checked ? "text-emerald-600" : "text-transparent"} />
            </label>

            <div className="absolute right-3 top-3 flex flex-col items-end gap-1">
              {it.saved && (
                <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[9px] font-extrabold text-white shadow">
                  SAVED
                </span>
              )}
              {it.missingPhoto && (
                <span className="flex items-center gap-0.5 rounded bg-rose-600 px-1.5 py-0.5 text-[9px] font-extrabold text-white shadow">
                  <ImageOff size={10} /> NO PHOTO
                </span>
              )}
            </div>

            <div className="mt-1.5 flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={() => onPrint(it)}
                className="flex h-7 items-center gap-1 rounded-md border border-[#5685a6] bg-[#e4eef6] px-3 text-[10px] font-extrabold text-[#153b5a] transition hover:border-[#0b5fa5] hover:bg-[#d3e6f3]"
              >
                <Printer size={12} strokeWidth={2.6} /> Print
              </button>
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(it)}
                  title="Remove saved I-Card"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-red-300 bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
