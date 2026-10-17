import { previewReport } from "../../api/formApi";
import { useState } from "react";
import { Search, X, Bus } from "lucide-react";

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

const REPORT_TYPES = [
  "Student",
  "Expected Collection",
  "Expected Collection Detail",
  "Student Allotment Slip",
];

export default function ConveyanceStudent({ onClose }) {
  const [reportType, setReportType] = useState("Student");
  const [showResult, setShowResult] = useState(false);

  const [form, setForm] = useState({
    session: "2024 - 25",
    month: "September",
    groupwise: "Vehicle Wise",
    vehicle: "All",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setShowResult(false);
  }

  async function handleShow(e) {
    e.preventDefault();
    try {
      await previewReport({
        sources: ["conveyance_students"],
        filters: Object.fromEntries(new FormData(e.currentTarget).entries()),
        columns: ["record_no","name","admission_no","session","class_name","section","vehicle_no","route_name"],
        limit: 500,
      });
      setShowResult(true);
    } catch (err) {
      alert(err.message || "Unable to generate report.");
    }
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
    <form
      onSubmit={handleShow}
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
            <Bus size={15} strokeWidth={2.8} />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide">
            Transport Student Expected Collection
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
        {/* REPORT TYPE RADIOS */}
        <div
          className="
            mb-3
            grid
            grid-cols-1
            gap-x-4
            gap-y-1.5
            border-b
            border-[#c3d8e7]
            pb-3
            sm:grid-cols-2
          "
        >
          {REPORT_TYPES.map((type) => (
            <label
              key={type}
              className="
                flex
                items-center
                gap-1.5
                text-[11px]
                font-semibold
                text-[#173b5c]
              "
            >
              <input
                type="radio"
                name="reportType"
                value={type}
                checked={reportType === type}
                onChange={(e) => {
                  setReportType(e.target.value);
                  setShowResult(false);
                }}
                className="h-3.5 w-3.5 accent-[#174f7b]"
              />
              {type}
            </label>
          ))}
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-[80px_1fr] items-center gap-x-2 gap-y-2">
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

          <label className={labelClass}>Month</label>

          <select
            name="month"
            value={form.month}
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

        {/* SHOW BUTTON */}
        <div className="mt-4 flex justify-center border-t border-[#c3d8e7] pt-3">
          <button
            type="submit"
            className="
              flex
              h-9
              min-w-[140px]
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
            <Search size={14} strokeWidth={2.5} />
            <span>Show</span>
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
            Showing "{reportType}" for {form.month}, {form.session} ({form.groupwise}, Vehicle: {form.vehicle})
          </div>
        )}
      </div>
    </form>
  );
}