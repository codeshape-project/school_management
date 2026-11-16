// import { previewReport } from "../../api/formApi";
// import { useState } from "react";
// import { Search, X, Bus } from "lucide-react";

// const MONTHS = [
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
//   "January",
//   "February",
//   "March",
// ];

// const REPORT_TYPES = [
//   "Student",
//   "Expected Collection",
//   "Expected Collection Detail",
//   "Student Allotment Slip",
// ];

// export default function ConveyanceStudent({ onClose }) {
//   const [reportType, setReportType] = useState("Student");
//   const [showResult, setShowResult] = useState(false);

//   const [form, setForm] = useState({
//     session: "2024 - 25",
//     month: "September",
//     groupwise: "Vehicle Wise",
//     vehicle: "All",
//   });

//   function handleChange(e) {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setShowResult(false);
//   }

//   async function handleShow(e) {
//     e.preventDefault();
//     try {
//       await previewReport({
//         sources: ["conveyance_students"],
//         filters: Object.fromEntries(new FormData(e.currentTarget).entries()),
//         columns: ["record_no","name","admission_no","session","class_name","section","vehicle_no","route_name"],
//         limit: 500,
//       });
//       setShowResult(true);
//     } catch (err) {
//       alert(err.message || "Unable to generate report.");
//     }
//   }

//   const inputClass = `
//   h-7
//   w-full
//   rounded-md
//   border
//   border-[#0b2a52]
//   bg-white
//   px-2
//   text-[11px]
//   font-semibold
//   text-slate-800
//   outline-none
//   transition
//   focus:border-[#061a3a]
//   focus:ring-1
//   focus:ring-[#0b2a52]/30
// `;

//   const labelClass = `
//     mb-0.5
//     block
//     whitespace-nowrap
//     text-[11px]
//     font-semibold
//     text-[#173b5c]
//   `;

//   return (
//     <form
//       onSubmit={handleShow}
//       className="
//   flex
//   h-auto
//   max-h-[calc(100vh-72px)]
//   w-full
//   max-w-[1180px]
//   flex-col
//   overflow-hidden
//   rounded-[22px]
//   border-2
//   border-[#0b2a52]
//   bg-[#dbe9f4]
//   p-2.5
//   shadow-[0_0_18px_rgba(11,42,82,0.30)]
// "
//     >
//       {/* HEADER */}
//       <div
//         className="
//           flex
//           min-h-[38px]
//           shrink-0
//           items-center
//           justify-between
//           gap-2
//           rounded-lg
//           border
//           border-[#5d91b2]
//           bg-gradient-to-r
//           from-[#174f7b]
//           via-[#216994]
//           to-[#174f7b]
//           px-3
//           py-1.5
//           text-white
//         "
//       >
//         <div className="flex min-w-0 items-center gap-2">
//           <div
//             className="
//               flex
//               h-7
//               w-7
//               shrink-0
//               items-center
//               justify-center
//               rounded-md
//               bg-[#d8a928]
//               text-[#102f4b]
//             "
//           >
//             <Bus size={15} strokeWidth={2.8} />
//           </div>

//           <h2 className="truncate text-sm font-black tracking-wide">
//             Transport Student Expected Collection
//           </h2>
//         </div>

//         {/* TOP-RIGHT CUT BUTTON */}
//         <button
//           type="button"
//           onClick={onClose}
//           title="Close"
//           className="
//             flex
//             h-7
//             w-8
//             shrink-0
//             items-center
//             justify-center
//             rounded-md
//             border
//             border-red-300
//             bg-red-600
//             text-white
//             transition-all
//             hover:bg-red-700
//             hover:shadow-[0_0_14px_rgba(239,68,68,0.55)]
//           "
//         >
//           <X size={16} strokeWidth={3} />
//         </button>
//       </div>

//       {/* FORM CONTENT */}
//       <div
//         className="
//           mt-1.5
//           rounded-lg
//           border
//           border-[#79a9c9]
//           bg-[#e6f0f7]
//           p-3
//           shadow-sm
//         "
//       >
//         {/* REPORT TYPE RADIOS */}
//         <div
//           className="
//             mb-3
//             grid
//             grid-cols-1
//             gap-x-4
//             gap-y-1.5
//             border-b
//             border-[#c3d8e7]
//             pb-3
//             sm:grid-cols-2
//           "
//         >
//           {REPORT_TYPES.map((type) => (
//             <label
//               key={type}
//               className="
//                 flex
//                 items-center
//                 gap-1.5
//                 text-[11px]
//                 font-semibold
//                 text-[#173b5c]
//               "
//             >
//               <input
//                 type="radio"
//                 name="reportType"
//                 value={type}
//                 checked={reportType === type}
//                 onChange={(e) => {
//                   setReportType(e.target.value);
//                   setShowResult(false);
//                 }}
//                 className="h-3.5 w-3.5 accent-[#174f7b]"
//               />
//               {type}
//             </label>
//           ))}
//         </div>

//         {/* FILTERS */}
//         <div className="grid grid-cols-[80px_1fr] items-center gap-x-2 gap-y-2">
//           <label className={labelClass}>Session</label>

//           <select
//             name="session"
//             value={form.session}
//             onChange={handleChange}
//             className={inputClass}
//           >
//             <option>2024 - 25</option>
//             <option>2025 - 26</option>
//             <option>2026 - 27</option>
//           </select>

//           <label className={labelClass}>Month</label>

//           <select
//             name="month"
//             value={form.month}
//             onChange={handleChange}
//             className={inputClass}
//           >
//             {MONTHS.map((month) => (
//               <option key={month}>{month}</option>
//             ))}
//           </select>

//           <label className={labelClass}>Groupwise</label>

//           <select
//             name="groupwise"
//             value={form.groupwise}
//             onChange={handleChange}
//             className={inputClass}
//           >
//             <option>Vehicle Wise</option>
//             <option>Route Wise</option>
//             <option>Class Wise</option>
//           </select>

//           <label className={labelClass}>Vehicle</label>

//           <select
//             name="vehicle"
//             value={form.vehicle}
//             onChange={handleChange}
//             className={inputClass}
//           >
//             <option>All</option>
//           </select>
//         </div>

//         {/* SHOW BUTTON */}
//         <div className="mt-4 flex justify-center border-t border-[#c3d8e7] pt-3">
//           <button
//             type="submit"
//             className="
//               flex
//               h-9
//               min-w-[140px]
//               items-center
//               justify-center
//               gap-1.5
//               rounded-md
//               border
//               border-emerald-600
//               bg-emerald-600
//               px-4
//               text-[11px]
//               font-extrabold
//               text-white
//               transition-all
//               hover:bg-emerald-700
//               hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]
//               active:scale-[0.97]
//             "
//           >
//             <Search size={14} strokeWidth={2.5} />
//             <span>Show</span>
//           </button>
//         </div>

//         {/* RESULT AREA */}
//         {showResult && (
//           <div
//             className="
//               mt-3
//               rounded-md
//               border
//               border-[#a2b9c8]
//               bg-[#edf4f8]
//               p-3
//               text-center
//               text-[11px]
//               font-semibold
//               text-[#173b5c]
//             "
//           >
//             Showing "{reportType}" for {form.month}, {form.session} ({form.groupwise}, Vehicle: {form.vehicle})
//           </div>
//         )}
//       </div>
//     </form>
//   );
// }

import { useMemo, useState } from "react";
import { previewReport } from "../../api/formApi";
import { Search, X, Bus, Printer, RefreshCw } from "lucide-react";

const MONTHS = ["April","May","June","July","August","September","October","November","December","January","February","March"];
const REPORT_TYPES = ["Student","Expected Collection","Expected Collection Detail","Student Allotment Slip"];
const SESSIONS = ["2024 - 25","2025 - 26","2026 - 27","2027 - 28"];

const inputClass = "h-8 w-full rounded-md border border-[#0b2a52] bg-white px-2 text-[11px] font-semibold text-slate-800 outline-none focus:border-[#061a3a] focus:ring-1 focus:ring-[#0b2a52]/30";
const labelClass = "mb-0.5 block whitespace-nowrap text-[11px] font-semibold text-[#173b5c]";

function unwrapResponse(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.rows)) return response.data.rows;
  if (Array.isArray(response?.rows)) return response.rows;
  if (Array.isArray(response?.result)) return response.result;
  return [];
}

function groupRows(rows, groupwise) {
  const key = groupwise === "Vehicle Wise" ? "vehicle_no" : groupwise === "Route Wise" ? "route_name" : "class_name";
  const groups = new Map();
  rows.forEach((row) => {
    const group = row?.[key] || "Not Assigned";
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(row);
  });
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

export default function ConveyanceStudent({ onClose }) {
  const [reportType, setReportType] = useState("Student");
  const [form, setForm] = useState({ session: "2026 - 27", month: "September", groupwise: "Vehicle Wise", vehicle: "All", search: "" });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setHasResult(false);
    setError("");
  }

  async function handleShow(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setHasResult(false);
    try {
      const filters = { session: form.session };
      if (form.vehicle !== "All") filters.vehicleNo = form.vehicle;
      if (form.search.trim()) filters.search = form.search.trim();

      const response = await previewReport({
        sources: ["conveyance_students"],
        filters,
        columns: ["record_no", "name", "admission_no", "phone", "session", "class_name", "section", "vehicle_no", "route_name", "status", "event_date"],
        sortBy: "name",
        sortOrder: "ASC",
        limit: 500,
      });
      setRows(unwrapResponse(response));
      setHasResult(true);
    } catch (err) {
      setError(err?.message || "Unable to load conveyance student records.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  const grouped = useMemo(() => groupRows(rows, form.groupwise), [rows, form.groupwise]);

  return (
    <form onSubmit={handleShow} className="flex h-auto max-h-[calc(100vh-72px)] w-full max-w-[1180px] flex-col overflow-hidden rounded-[22px] border-2 border-[#0b2a52] bg-[#dbe9f4] p-2.5 shadow-[0_0_18px_rgba(11,42,82,0.30)]">
      <div className="flex min-h-[38px] shrink-0 items-center justify-between gap-2 rounded-lg border border-[#5d91b2] bg-gradient-to-r from-[#174f7b] via-[#216994] to-[#174f7b] px-3 py-1.5 text-white">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#d8a928] text-[#102f4b]"><Bus size={15} strokeWidth={2.8} /></div>
          <h2 className="truncate text-sm font-black tracking-wide">Conveyance Student Report</h2>
        </div>
        <button type="button" onClick={onClose} title="Close" className="flex h-7 w-8 shrink-0 items-center justify-center rounded-md border border-red-300 bg-red-600 text-white hover:bg-red-700"><X size={16} strokeWidth={3} /></button>
      </div>

      <div className="mt-1.5 min-h-0 flex-1 overflow-y-auto rounded-lg border border-[#79a9c9] bg-[#e6f0f7] p-3 shadow-sm">
        <div className="mb-3 grid grid-cols-1 gap-x-4 gap-y-1.5 border-b border-[#c3d8e7] pb-3 sm:grid-cols-2">
          {REPORT_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-1.5 text-[11px] font-semibold text-[#173b5c]">
              <input type="radio" name="reportType" value={type} checked={reportType === type} onChange={(e) => { setReportType(e.target.value); setHasResult(false); }} className="h-3.5 w-3.5 accent-[#174f7b]" />
              {type}
            </label>
          ))}
        </div>

        <div className="grid grid-cols-[80px_1fr] items-center gap-x-2 gap-y-2 sm:grid-cols-[90px_1fr_90px_1fr]">
          <label className={labelClass}>Session</label>
          <select name="session" value={form.session} onChange={handleChange} className={inputClass}>{SESSIONS.map((s) => <option key={s}>{s}</option>)}</select>
          <label className={labelClass}>Month</label>
          <select name="month" value={form.month} onChange={handleChange} className={inputClass}>{MONTHS.map((m) => <option key={m}>{m}</option>)}</select>

          <label className={labelClass}>Groupwise</label>
          <select name="groupwise" value={form.groupwise} onChange={handleChange} className={inputClass}><option>Vehicle Wise</option><option>Route Wise</option><option>Class Wise</option></select>
          <label className={labelClass}>Vehicle No.</label>
          <input name="vehicle" value={form.vehicle} onChange={handleChange} className={inputClass} placeholder="All or exact vehicle no." list="conveyance-vehicle-list" />
          <datalist id="conveyance-vehicle-list">{[...new Set(rows.map((r) => r.vehicle_no).filter(Boolean))].map((v) => <option key={v} value={v} />)}</datalist>

          <label className={labelClass}>Search Student</label>
          <input name="search" value={form.search} onChange={handleChange} className={inputClass} placeholder="Name, admission no., class, phone" />
          <span className="hidden sm:block" />
          <span className="hidden sm:block" />
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2 border-t border-[#c3d8e7] pt-3">
          <button type="submit" disabled={loading} className="flex h-9 min-w-[140px] items-center justify-center gap-1.5 rounded-md border border-emerald-600 bg-emerald-600 px-4 text-[11px] font-extrabold text-white hover:bg-emerald-700 disabled:opacity-60"><Search size={14} />{loading ? "Loading..." : "Show Report"}</button>
          <button type="button" onClick={() => { setForm({session:"2026 - 27",month:"September",groupwise:"Vehicle Wise",vehicle:"All",search:""}); setRows([]); setHasResult(false); setError(""); }} className="flex h-9 items-center justify-center gap-1.5 rounded-md border border-[#5685a6] bg-[#e4eef6] px-4 text-[11px] font-extrabold text-[#153b5a] hover:bg-[#d3e6f3]"><RefreshCw size={14}/>Reset</button>
          {hasResult && <button type="button" onClick={() => window.print()} className="flex h-9 items-center justify-center gap-1.5 rounded-md border border-[#0b2a52] bg-[#174f7b] px-4 text-[11px] font-extrabold text-white hover:bg-[#123e62]"><Printer size={14}/>Print</button>}
        </div>

        {error && <div className="mt-3 rounded-md border border-red-300 bg-red-50 p-3 text-[12px] font-semibold text-red-700">{error}</div>}

        {hasResult && (
          <div className="conveyance-student-results mt-4 rounded-md border border-[#a2b9c8] bg-white p-3">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div><h3 className="text-sm font-bold text-[#173b5c]">{reportType}</h3><p className="text-[11px] text-slate-600">Session {form.session} · {form.month} · Grouped {form.groupwise}</p></div>
              <div className="rounded bg-[#e6f0f7] px-3 py-1 text-[11px] font-bold text-[#173b5c]">Total students: {rows.length}</div>
            </div>
            {rows.length === 0 ? <p className="py-6 text-center text-sm font-semibold text-slate-500">No conveyance student records found for these filters.</p> : (
              <div className="space-y-4">
                {grouped.map(([groupName, group]) => (
                  <section key={groupName}>
                    <h4 className="mb-1 rounded bg-[#dbe9f4] px-2 py-1 text-[11px] font-bold text-[#173b5c]">{groupName} <span className="font-normal">({group.length} students)</span></h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left text-[11px]">
                        <thead><tr className="bg-slate-100">{["#","Student Name","Admission No.","Class","Section","Phone","Vehicle No.","Route","Status"].map((h) => <th key={h} className="border border-slate-300 px-2 py-1.5 font-bold">{h}</th>)}</tr></thead>
                        <tbody>{group.map((row, index) => <tr key={row.id || row.record_no || `${groupName}-${index}`} className="odd:bg-white even:bg-slate-50">{[index+1,row.name || "—",row.admission_no || "—",row.class_name || "—",row.section || "—",row.phone || "—",row.vehicle_no || "—",row.route_name || "—",row.status || "—"].map((value,i) => <td key={i} className="border border-slate-300 px-2 py-1">{value}</td>)}</tr>)}</tbody>
                      </table>
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`@media print { body * { visibility: hidden !important; } .conveyance-student-results, .conveyance-student-results * { visibility: visible !important; } .conveyance-student-results { position: absolute !important; inset: 0 auto auto 0 !important; width: 100% !important; margin: 0 !important; border: 0 !important; } }`}</style>
    </form>
  );
}
