import { previewReport } from "../../api/formApi";
import { useState } from "react";
import {
  FileText,
  RotateCcw,
  LogOut,
} from "lucide-react";

export default function StudentReport({ onClose }) {
  const [saved, setSaved] = useState(false);

  async function submit(e) {
    e.preventDefault();

    try {
      await previewReport({
        sources: ["students"],
        filters: Object.fromEntries(new FormData(e.currentTarget).entries()),
        columns: ["record_no","name","phone","admission_no","session","class_name","section","status","event_date"],
        limit: 500,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      alert(err.message || "Unable to generate report.");
    }
  }

  return (
    <form
      onSubmit={submit}
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
      {/* =====================================================
          TITLE BAR
      ====================================================== */}
      <div
        className="
          flex
          h-[38px]
          shrink-0
          items-center
          justify-between
          rounded-lg
          border
          border-[#58bdf5]/40
          bg-[#061a3a]
          px-2.5
          shadow-[0_0_12px_rgba(88,189,245,0.15)]
        "
      >
        <div className="flex items-center gap-2">
          <div
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-md
              bg-[#58bdf5]/15
              text-[#ffd75a]
            "
          >
            <FileText
              size={14}
              strokeWidth={2.5}
            />
          </div>

          <h2 className="text-[13px] font-black text-white">
            Student Report
          </h2>
        </div>

        {saved && (
          <span
            className="
              rounded-md
              bg-emerald-500/15
              px-2
              py-1
              text-[8px]
              font-bold
              text-emerald-300
            "
          >
            Generated
          </span>
        )}
      </div>

      {/* =====================================================
          REPORT CONTENT
      ====================================================== */}
      <div
        className="
          overflow-y-auto
          overflow-x-hidden
          overscroll-contain
          touch-pan-y
          py-2
          lg:overflow-hidden
        "
      >
        <div
          className="
            rounded-lg
            border
            border-[#58bdf5]/45
            bg-[#e5eff7]
            p-3
          "
        >
          {/* Session */}
          <ReportSelect
            label="Session"
            options={[
              "2026 - 27",
              "2025 - 26",
              "2024 - 25",
              "2023 - 24",
            ]}
          />

          {/* Class */}
          <ReportSelect
            label="Class"
            options={[
              "ALL",
              "Nursery",
              "LKG",
              "UKG",
              "Class 1",
              "Class 2",
              "Class 3",
              "Class 4",
              "Class 5",
              "Class 6",
              "Class 7",
              "Class 8",
              "Class 9",
              "Class 10",
              "Class 11",
              "Class 12",
            ]}
          />

          {/* Groupwise */}
          <ReportSelect
            label="Groupwise"
            options={[
              "ALL",
              "House",
              "Section",
              "Category",
              "Gender",
            ]}
          />

          {/* Show Button */}
          <button
            type="submit"
            className="
              mt-5
              flex
              h-10
              w-full
              items-center
              justify-center
              rounded-md
              border
              border-[#58bdf5]
              bg-[#061a3a]
              text-[11px]
              font-black
              text-[#ffd75a]
              shadow-[0_0_10px_rgba(88,189,245,0.15)]
              transition-all
              duration-200
              hover:border-[#ffd75a]
              hover:bg-[#0a2854]
              hover:shadow-[0_0_17px_rgba(88,189,245,0.35)]
              active:scale-[0.98]
            "
          >
            <FileText
              size={14}
              className="mr-2"
              strokeWidth={2.5}
            />

            Show
          </button>
        </div>
      </div>

      {/* =====================================================
          EXIT BUTTON
      ====================================================== */}
      <div
        className="
          mt-1
          shrink-0
          border-t
          border-[#58bdf5]/30
          pt-2
        "
      >
        <button
          type="button"
          onClick={onClose}
          className="
            flex
            h-9
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-red-500
            bg-red-600
            px-4
            text-[10px]
            font-black
            tracking-wide
            text-white
            shadow-[0_0_10px_rgba(239,68,68,0.25)]
            transition-all
            duration-200
            hover:border-red-300
            hover:bg-red-700
            hover:shadow-[0_0_18px_rgba(239,68,68,0.55)]
            active:scale-[0.97]
          "
        >
          <LogOut
            size={15}
            strokeWidth={2.8}
          />

          Exit
        </button>
      </div>
    </form>
  );
}

/* =========================================================
   REPORT SELECT
========================================================= */

function ReportSelect({
  label,
  options = [],
}) {
  return (
    <div className="mb-3">
      <div
        className="
          grid
          grid-cols-[92px_1fr]
          items-center
          gap-2
          sm:grid-cols-[105px_1fr]
        "
      >
        <label
          className="
            text-right
            text-[10px]
            font-black
            text-[#061a3a]
          "
        >
          {label}
        </label>

        <select
          className="
            h-8
            w-full
            rounded-md
            border
            border-slate-300
            bg-white
            px-2
            text-[10px]
            font-semibold
            text-[#061a3a]
            outline-none
            transition
            focus:border-[#58bdf5]
            focus:ring-1
            focus:ring-[#58bdf5]/40
          "
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}