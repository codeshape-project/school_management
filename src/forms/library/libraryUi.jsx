import { useRef, useState } from "react";
import { X } from "lucide-react";

/* =========================================================
   SHARED LIBRARY FORM STYLE
   Same look as the Student module forms
========================================================= */

export const inputClass = `
  h-7 w-full rounded-md border border-[#0b2a52] bg-white px-2
  text-[11px] font-semibold text-slate-800 outline-none transition
  focus:border-[#061a3a] focus:ring-1 focus:ring-[#0b2a52]/30
  disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500
`;

export const labelClass = `mb-0.5 block text-[10px] font-semibold text-[#173b5c]`;

export const todayISO = () =>
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

export const addDaysISO = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

export const day = (v) => (v ? String(v).slice(0, 10) : "-");

/* small hook: shows the green "Saved Successfully" badge in the header */
export function useFlash() {
  const [flash, setFlash] = useState("");
  const timer = useRef(null);
  const show = (message) => {
    setFlash(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlash(""), 2400);
  };
  return [flash, show];
}

/* =========================================================
   FORM SHELL  (outer box + header + scroll area + footer)
========================================================= */

export function FormShell({
  icon,
  title,
  onClose,
  onSubmit,
  flash,
  width = "1100px",
  children,
  footer,
}) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      style={{ width }}
      className="
        flex h-auto max-h-[calc(100vh-72px)] max-w-full flex-col overflow-hidden
        rounded-[22px] border-2 border-[#0b2a52] bg-[#dbe9f4] p-2.5
        shadow-[0_0_18px_rgba(11,42,82,0.30)]
      "
    >
      {/* HEADER */}
      <div
        className="
          flex min-h-[38px] shrink-0 items-center justify-between gap-2
          rounded-lg border border-[#5d91b2]
          bg-gradient-to-r from-[#174f7b] via-[#216994] to-[#174f7b]
          px-3 py-1.5 text-white
        "
      >
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#d8a928] text-[#102f4b]">
            {icon}
          </div>
          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">{title}</h2>
        </div>

        {flash && (
          <span className="rounded-md border border-emerald-300 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-100">
            {flash}
          </span>
        )}

        <button
          type="button"
          onClick={onClose}
          title="Close"
          className="
            flex h-7 w-8 shrink-0 items-center justify-center rounded-md border
            border-red-300 bg-red-600 text-white transition-all
            hover:bg-red-700 hover:shadow-[0_0_14px_rgba(239,68,68,0.55)]
          "
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overflow-x-hidden overscroll-contain p-1.5 pb-2">
        {children}
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-1.5 shrink-0 rounded-lg border border-[#5d8ba7] bg-[#c7dce9] p-2.5">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
          {footer}
        </div>
      </div>
    </form>
  );
}

/* =========================================================
   SECTION + TITLE
========================================================= */

export function Section({ title, icon, children, className = "", tone = "a" }) {
  return (
    <section
      className={`rounded-lg border border-[#547c98] p-1.5 ${
        tone === "a" ? "bg-[#d9e7f2]" : "bg-[#d3e2ed]"
      } ${className}`}
    >
      {title && <SectionTitle title={title} icon={icon} />}
      {children}
    </section>
  );
}

export function SectionTitle({ icon, title }) {
  return (
    <div
      className="
        mb-1.5 flex h-7 items-center gap-1.5 rounded-md border border-[#7ca7c2]
        bg-[#c8dce9] px-2 text-[10px] font-black uppercase tracking-wide text-[#163d5c]
      "
    >
      <span className="text-[#b42323]">{icon}</span>
      {title}
    </div>
  );
}

/* =========================================================
   FIELDS  (controlled)
========================================================= */

export function Field({ label, value, onChange, type = "text", placeholder = "", disabled, ...rest }) {
  return (
    <div className="min-w-0">
      <label className={`${labelClass} truncate`}>{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClass}
        {...rest}
      />
    </div>
  );
}

export function SelectField({ label, value, onChange, options = [], placeholder = "Select", disabled }) {
  return (
    <div className="min-w-0">
      <label className={`${labelClass} truncate`}>{label}</label>
      <select
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={inputClass}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TextAreaField({ label, value, onChange, placeholder = "", rows = 2 }) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>
      <textarea
        rows={rows}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="
          min-h-[50px] w-full resize-y rounded-md border border-[#79a9c9] bg-white px-2 py-1.5
          text-[11px] font-semibold text-slate-800 outline-none transition
          focus:border-[#0b5fa5] focus:ring-1 focus:ring-[#0b5fa5]/30
        "
      />
    </div>
  );
}

/* =========================================================
   BUTTONS
========================================================= */

export function ActionButton({ icon, text, danger = false, green = false, submit = false, onClick, disabled }) {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex h-9 min-w-[90px] items-center justify-center gap-1.5 rounded-md border px-4
        text-[11px] font-extrabold transition-all active:scale-[0.97]
        disabled:cursor-not-allowed disabled:opacity-50
        ${
          danger
            ? "border-red-500 bg-red-600 text-white shadow-[0_0_8px_rgba(239,68,68,0.25)] hover:bg-red-700 hover:shadow-[0_0_14px_rgba(239,68,68,0.5)]"
            : green
            ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            : "border-[#5685a6] bg-[#e4eef6] text-[#153b5a] hover:border-[#0b5fa5] hover:bg-[#d3e6f3] hover:shadow-[0_0_10px_rgba(11,95,165,0.18)]"
        }
      `}
    >
      {icon}
      <span className="whitespace-nowrap">{text}</span>
    </button>
  );
}

export function SearchButton({ onClick, text = "Search", icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex h-7 min-w-[100px] items-center justify-center gap-1.5 rounded-md border
        border-[#5685a6] bg-[#e4eef6] px-3 text-[11px] font-extrabold text-[#153b5a]
        transition-all hover:border-[#0b5fa5] hover:bg-[#d3e6f3] active:scale-[0.97]
      "
    >
      {icon}
      {text}
    </button>
  );
}

/* =========================================================
   TABLE
========================================================= */

export function DataTable({ heads, rows, onRowClick, selectedIndex = -1, maxHeight = "220px", empty = "No records found." }) {
  return (
    <div className="overflow-auto rounded-md border border-[#547c98] bg-white" style={{ maxHeight }}>
      <table className="w-full border-collapse text-left text-[11px]">
        <thead className="sticky top-0 z-10 bg-[#174f7b] text-white">
          <tr>
            {heads.map((h) => (
              <th key={h} className="whitespace-nowrap px-2 py-1.5 text-[10px] font-extrabold uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((cells, i) => (
              <tr
                key={i}
                onClick={onRowClick ? () => onRowClick(i) : undefined}
                className={`border-t border-[#c5dce7] font-semibold text-slate-800 ${
                  onRowClick ? "cursor-pointer" : ""
                } ${selectedIndex === i ? "bg-[#f8e8a8]" : "hover:bg-[#e6f0f7]"}`}
              >
                {cells.map((v, j) => (
                  <td key={j} className="whitespace-nowrap px-2 py-1.5">
                    {v}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={heads.length} className="px-2 py-4 text-center text-slate-500">
                {empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function StatusBadge({ value }) {
  const good = value === "active" || value === "returned";
  const warn = value === "partial";
  const info = value === "issued";
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
        good
          ? "bg-emerald-100 text-emerald-700"
          : warn
          ? "bg-amber-100 text-amber-700"
          : info
          ? "bg-sky-100 text-sky-700"
          : "bg-rose-100 text-rose-700"
      }`}
    >
      {value}
    </span>
  );
}
