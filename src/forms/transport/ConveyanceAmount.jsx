import { useState } from "react";
import { AlertCircle, CheckCircle2, X, IndianRupee } from "lucide-react";

const MONTHS = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];

export default function ConveyanceAmount({ onClose }) {
  const [showResult, setShowResult] = useState(null); // "Dues" | "Paid" | null

  const [form, setForm] = useState({
    session: "2024 - 25",
    uptoMonth: "September",
    groupwise: "Vehicle Wise",
    vehicle: "All",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setShowResult(null);
  }

 const inputClass = `
  h-7
  w-full
  rounded-md
  border
  border-[#0b2a52]
  bg-white
  px-2
  text-[11px]
  font-semibold
  text-slate-800
  outline-none
  transition
  focus:border-[#061a3a]
  focus:ring-1
  focus:ring-[#0b2a52]/30
`;  

  const labelClass = `
    mb-0.5
    block
    whitespace-nowrap
    text-[11px]
    font-semibold
    text-[#173b5c]
  `;

  return (
    <div
      className="
  flex
  h-auto
  max-h-[calc(100vh-72px)]
  w-full
  max-w-[1180px]
  flex-col
  overflow-hidden
  rounded-[22px]
  border-2
  border-[#0b2a52]
  bg-[#dbe9f4]
  p-2.5
  shadow-[0_0_18px_rgba(11,42,82,0.30)]
"
    >
      {/* HEADER */}
      <div
        className="
          flex
          min-h-[38px]
          shrink-0
          items-center
          justify-between
          gap-2
          rounded-lg
          border
          border-[#5d91b2]
          bg-gradient-to-r
          from-[#174f7b]
          via-[#216994]
          to-[#174f7b]
          px-3
          py-1.5
          text-white
        "
      >
        <div className="flex min-w-0 items-center gap-2">
          <div
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-md
              bg-[#d8a928]
              text-[#102f4b]
            "
          >
            <IndianRupee size={15} strokeWidth={2.8} />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide">
            Conveyance Status
          </h2>
        </div>

        {/* TOP-RIGHT CUT BUTTON */}
        <button
          type="button"
          onClick={onClose}
          title="Close"
          className="
            flex
            h-7
            w-8
            shrink-0
            items-center
            justify-center
            rounded-md
            border
            border-red-300
            bg-red-600
            text-white
            transition-all
            hover:bg-red-700
            hover:shadow-[0_0_14px_rgba(239,68,68,0.55)]
          "
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>

      {/* FORM CONTENT */}
      <div
        className="
          mt-1.5
          rounded-lg
          border
          border-[#79a9c9]
          bg-[#e6f0f7]
          p-3
          shadow-sm
        "
      >
        <div className="grid grid-cols-[90px_1fr] items-center gap-x-2 gap-y-2">
          <label className={labelClass}>Session</label>

          <select
            name="session"
            value={form.session}
            onChange={handleChange}
            className={inputClass}
          >
            <option>2024 - 25</option>
            <option>2025 - 26</option>
            <option>2026 - 27</option>
          </select>

          <label className={labelClass}>UP to Month</label>

          <select
            name="uptoMonth"
            value={form.uptoMonth}
            onChange={handleChange}
            className={inputClass}
          >
            {MONTHS.map((month) => (
              <option key={month}>{month}</option>
            ))}
          </select>

          <label className={labelClass}>Groupwise</label>

          <select
            name="groupwise"
            value={form.groupwise}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Vehicle Wise</option>
            <option>Route Wise</option>
            <option>Class Wise</option>
          </select>

          <label className={labelClass}>Vehicle</label>

          <select
            name="vehicle"
            value={form.vehicle}
            onChange={handleChange}
            className={inputClass}
          >
            <option>All</option>
          </select>
        </div>

        {/* DUES / PAID BUTTONS */}
        <div className="mt-4 flex justify-center gap-3 border-t border-[#c3d8e7] pt-3">
          <button
            type="button"
            onClick={() => setShowResult("Dues")}
            className="
              flex
              h-9
              min-w-[110px]
              items-center
              justify-center
              gap-1.5
              rounded-md
              border
              border-red-500
              bg-red-600
              px-4
              text-[11px]
              font-extrabold
              text-white
              transition-all
              hover:bg-red-700
              hover:shadow-[0_0_10px_rgba(239,68,68,0.35)]
              active:scale-[0.97]
            "
          >
            <AlertCircle size={14} strokeWidth={2.5} />
            <span>Dues</span>
          </button>

          <button
            type="button"
            onClick={() => setShowResult("Paid")}
            className="
              flex
              h-9
              min-w-[110px]
              items-center
              justify-center
              gap-1.5
              rounded-md
              border
              border-emerald-600
              bg-emerald-600
              px-4
              text-[11px]
              font-extrabold
              text-white
              transition-all
              hover:bg-emerald-700
              hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]
              active:scale-[0.97]
            "
          >
            <CheckCircle2 size={14} strokeWidth={2.5} />
            <span>Paid</span>
          </button>
        </div>

        {/* RESULT AREA */}
        {showResult && (
          <div
            className="
              mt-3
              rounded-md
              border
              border-[#a2b9c8]
              bg-[#edf4f8]
              p-3
              text-center
              text-[11px]
              font-semibold
              text-[#173b5c]
            "
          >
            Showing {showResult} up to {form.uptoMonth}, {form.session} ({form.groupwise}, Vehicle: {form.vehicle})
          </div>
        )}
      </div>
    </div>
  );
}