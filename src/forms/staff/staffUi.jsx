export * from "../library/libraryUi";

/* =========================================================
   Shared helpers for the Staff & Salary forms
   (the visual style comes from libraryUi = same as Student forms)
========================================================= */

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DEPARTMENTS = [
  "Teaching", "Administration", "Accounts", "Library", "Transport", "Hostel",
  "Laboratory", "Sports", "Computer / IT", "Housekeeping", "Security",
];

export const DESIGNATIONS = [
  "Principal", "Vice Principal", "Coordinator", "PGT Teacher", "TGT Teacher",
  "PRT Teacher", "Nursery Teacher", "Clerk", "Accountant", "Librarian",
  "Lab Assistant", "Computer Operator", "Driver", "Conductor", "Warden",
  "Nurse", "Peon", "Guard", "Cook", "Sweeper",
];

export const PAY_MODES = ["Cash", "Bank Transfer", "Cheque", "UPI", "Online"];

export const monthOptions = MONTHS.map((m, i) => ({ value: String(i + 1), label: m }));

export const currentPeriod = () => {
  const d = new Date();
  return { month: d.getMonth() + 1, year: d.getFullYear() };
};

// last few years, newest first
export const yearOptions = () => {
  const y = new Date().getFullYear();
  return [y, y - 1, y - 2, y - 3].map((v) => ({ value: String(v), label: String(v) }));
};

export const daysInMonth = (month, year) => new Date(Number(year), Number(month), 0).getDate();

export const isFutureMonth = (month, year) => {
  const now = currentPeriod();
  return Number(year) > now.year || (Number(year) === now.year && Number(month) > now.month);
};

export const toNum = (v) => {
  const n = Number(String(v ?? "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};

export const round2 = (n) => Math.round(n * 100) / 100;

export const money = (v) =>
  toNum(v).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// small radio button used by the staff search box (same look as the student search)
export function RadioOption({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-1 text-[10px] font-bold text-[#173b5c]">
      <input type="radio" checked={checked} onChange={onChange} className="accent-[#174f7b]" />
      {label}
    </label>
  );
}

export function MiniButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded border border-[#5685a6] bg-white px-2 py-0.5 text-[9px] font-extrabold text-[#153b5a] hover:bg-[#d3e6f3]"
    >
      {children}
    </button>
  );
}

// big read-only amount card (gross / deductions / net)
export function AmountCard({ label, value, strong = false }) {
  return (
    <div
      className={`rounded-lg border p-2 shadow-sm ${
        strong ? "border-[#0b2a52] bg-[#174f7b] text-white" : "border-[#547c98] bg-[#e6f0f7] text-[#0b2a52]"
      }`}
    >
      <p className={`text-[10px] font-bold uppercase tracking-wide ${strong ? "text-[#f5d76e]" : "text-[#163d5c]"}`}>
        {label}
      </p>
      <p className="text-lg font-black">&#8377; {money(value)}</p>
    </div>
  );
}
