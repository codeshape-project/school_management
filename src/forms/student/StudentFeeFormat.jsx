
// import { saveForm } from "../../api/formApi";
// import { useState } from "react";
// import {
//   IndianRupee,
//   Eye,
//   Printer,
//   Save,
//   X,
// } from "lucide-react";

// export default function StudentFeeFormat({ onClose }) {
//   const [saved, setSaved] = useState(false);

//   const months = [
//     "Admission",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//     "January",
//     "February",
//     "March",
//   ];

//   async function submit(e) {
//     e.preventDefault();

//     const form = e.currentTarget;

//     try {
//       await saveForm("feeFormat", form);

//       // Empty form only after successful save
//       form.reset();

//       setSaved(true);

//       setTimeout(() => {
//         setSaved(false);
//       }, 2200);
//     } catch (err) {
//       alert(err.message || "Unable to save data.");
//     }
//   }

//   return (
//     <form
//       onSubmit={submit}
//       className="
//         flex
//         h-auto
//         max-h-[calc(100vh-72px)]
//         w-full
//         max-w-[1180px]
//         flex-col
//         overflow-hidden
//         rounded-[22px]
//         border-2
//         border-[#0b2a52]
//         bg-[#dbe9f4]
//         p-2.5
//         shadow-[0_0_18px_rgba(11,42,82,0.30)]
//       "
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
//             <IndianRupee size={15} strokeWidth={2.8} />
//           </div>

//           <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
//             Fee Format Report
//           </h2>
//         </div>

//         {saved && (
//           <span
//             className="
//               rounded-md
//               border
//               border-emerald-300
//               bg-emerald-500/20
//               px-2.5
//               py-1
//               text-[10px]
//               font-bold
//               text-emerald-100
//             "
//           >
//             Saved Successfully
//           </span>
//         )}

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

//       {/* MAIN SCROLL AREA */}
//       <div
//         className="
//           min-h-0
//           flex-1
//           overflow-y-auto
//           overflow-x-hidden
//           overscroll-contain
//           touch-pan-y
//           p-1.5
//           pb-2
//           scrollbar-thin
//           lg:overflow-y-auto
//         "
//       >
//         {/* FILTERS */}
//         <section
//           className="
//             rounded-lg
//             border
//             border-[#79a9c9]
//             bg-[#e6f0f7]
//             p-2
//             shadow-sm
//           "
//         >
//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-2
//               sm:grid-cols-2
//               lg:grid-cols-5
//             "
//           >
//             <SelectField
//               name="session"
//               label="Session"
//               options={["", "2024 - 25", "2025 - 26", "2026 - 27"]}
//             />

//             <SelectField
//               name="className"
//               label="Class"
//               options={[
//                 "",
//                 "ALL",
//                 "Nursery",
//                 "LKG",
//                 "UKG",
//                 "I",
//                 "II",
//                 "III",
//                 "IV",
//                 "V",
//                 "VI",
//                 "VII",
//                 "VIII",
//                 "IX",
//                 "X",
//                 "XI",
//                 "XII",
//               ]}
//             />

//             <SelectField
//               name="section"
//               label="Section"
//               options={["", "A", "B", "C", "D"]}
//             />

//             <SelectField
//               name="studentType"
//               label="Student Type"
//               options={["Regular", "Private", "Other"]}
//             />

//             <SelectField
//               name="admissionType"
//               label="Admission Type"
//               options={["New", "Old", "Transfer"]}
//             />
//           </div>
//         </section>

//         {/* SELECT FORMAT */}
//         <section
//           className="
//             mt-2
//             rounded-lg
//             border
//             border-[#547c98]
//             bg-[#d9e7f2]
//             p-2
//           "
//         >
//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-2
//               sm:grid-cols-[auto_1fr]
//               sm:items-center
//             "
//           >
//             <label className={`${labelClass} whitespace-nowrap`}>
//               Select Format
//             </label>

//             <select
//               name="feeFormatType"
//               className={inputClass}
//               defaultValue=""
//             >
//               <option value="">Select Format</option>
//               <option value="Monthly Fee">Monthly Fee</option>
//               <option value="Quarterly Fee">Quarterly Fee</option>
//               <option value="Annual Fee">Annual Fee</option>
//             </select>
//           </div>
//         </section>

//         {/* MAIN REPORT AREA */}
//         <div
//           className="
//             mt-2
//             grid
//             grid-cols-1
//             gap-2
//             lg:grid-cols-[1fr_260px]
//           "
//         >
//           {/* LEFT REPORT PANEL */}
//           <section
//             className="
//               flex
//               min-h-[280px]
//               flex-col
//               rounded-lg
//               border
//               border-[#547c98]
//               bg-[#d9e7f2]
//               p-1.5
//             "
//           >
//             <div
//               className="
//                 flex
//                 h-7
//                 shrink-0
//                 items-center
//                 rounded-md
//                 border
//                 border-[#7ca7c2]
//                 bg-[#c8dce9]
//                 px-2
//                 text-[10px]
//                 font-black
//                 uppercase
//                 tracking-wide
//                 text-[#163d5c]
//               "
//             >
//               Fee Format
//             </div>

//             {/* REPORT TABLE AREA */}
//             <div
//               className="
//                 mt-1.5
//                 min-h-[200px]
//                 flex-1
//                 overflow-auto
//                 rounded-md
//                 border
//                 border-[#567b94]
//                 bg-[#e3edf5]
//               "
//             >
//               <div className="min-w-[500px]">
//                 <div
//                   className="
//                     grid
//                     grid-cols-6
//                     overflow-hidden
//                     rounded-t-md
//                     border
//                     border-[#7698ad]
//                     bg-[#c7dce9]
//                   "
//                 >
//                   <TableHeader>Adm. No.</TableHeader>
//                   <TableHeader>Name</TableHeader>
//                   <TableHeader>Class</TableHeader>
//                   <TableHeader>Section</TableHeader>
//                   <TableHeader>Fee</TableHeader>
//                   <TableHeader>Balance</TableHeader>
//                 </div>

//                 {[1, 2, 3, 4, 5].map((row) => (
//                   <div
//                     key={row}
//                     className="
//                       grid
//                       grid-cols-6
//                       border-b
//                       border-[#a2b9c8]
//                     "
//                   >
//                     <TableCell />
//                     <TableCell />
//                     <TableCell />
//                     <TableCell />
//                     <TableCell />
//                     <TableCell />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-1.5 flex justify-end">
//               <input
//                 name="reportValue"
//                 className={`${inputClass} max-w-[160px]`}
//               />
//             </div>
//           </section>

//           {/* MONTHLY FEE PANEL */}
//           <section
//             className="
//               rounded-lg
//               border
//               border-[#547c98]
//               bg-[#d3e2ed]
//               p-1.5
//             "
//           >
//             <div
//               className="
//                 mb-1.5
//                 flex
//                 h-7
//                 items-center
//                 rounded-md
//                 border
//                 border-[#7ca7c2]
//                 bg-[#c8dce9]
//                 px-2
//                 text-[10px]
//                 font-black
//                 uppercase
//                 tracking-wide
//                 text-[#163d5c]
//               "
//             >
//               Fee Details
//             </div>

//             <div className="space-y-1">
//               {months.map((month) => {
//                 const key = month.toLowerCase().replace(/\s+/g, "");

//                 return (
//                   <div
//                     key={month}
//                     className="
//                       grid
//                       grid-cols-[18px_1fr_90px]
//                       items-center
//                       gap-1.5
//                     "
//                   >
//                     <input
//                       type="checkbox"
//                       name={`${key}Selected`}
//                       value="true"
//                       className="h-3.5 w-3.5 cursor-pointer accent-[#174f7b]"
//                     />

//                     <label className="truncate text-[10px] font-semibold text-[#173b5c]">
//                       {month}
//                     </label>

//                     <input
//                       type="number"
//                       name={`${key}Fee`}
//                       min="0"
//                       placeholder="0"
//                       className={`${inputClass} text-right`}
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             {/* TOTAL */}
//             <div className="mt-2 border-t border-[#7999ad] pt-2">
//               <div
//                 className="
//                   grid
//                   grid-cols-[1fr_90px]
//                   items-center
//                   gap-1.5
//                 "
//               >
//                 <span className="text-[10px] font-black text-[#173b5c]">
//                   Total
//                 </span>

//                 <input
//                   type="number"
//                   name="totalFee"
//                   placeholder="0"
//                   className={`${inputClass} text-right font-black`}
//                 />
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>

//       {/* ALL BUTTONS AT BOTTOM */}
//       <div
//         className="
//           mt-1.5
//           shrink-0
//           rounded-lg
//           border
//           border-[#5d8ba7]
//           bg-[#c7dce9]
//           p-2.5
//         "
//       >
//         <div
//           className="
//             flex
//             flex-wrap
//             items-center
//             justify-center
//             gap-2.5
//             sm:justify-start
//           "
//         >
//           <ActionButton type="button" variant="dark">
//             UP FEE
//           </ActionButton>

//           <ActionButton type="button" variant="light">
//             Transfer
//           </ActionButton>

//           <ActionButton
//             type="button"
//             variant="green"
//             icon={<Eye size={14} strokeWidth={2.5} />}
//           >
//             Show
//           </ActionButton>

//           <ActionButton
//             type="button"
//             variant="light"
//             icon={<Printer size={14} strokeWidth={2.5} />}
//           >
//             Print
//           </ActionButton>

//           <ActionButton
//             type="submit"
//             variant="gold"
//             icon={<Save size={14} strokeWidth={2.5} />}
//           >
//             Save Format
//           </ActionButton>

//           <ActionButton type="reset" variant="light">
//             Reset
//           </ActionButton>

//           <ActionButton
//             type="button"
//             variant="red"
//             icon={<X size={14} strokeWidth={2.5} />}
//             onClick={onClose}
//           >
//             Exit
//           </ActionButton>
//         </div>
//       </div>
//     </form>
//   );
// }

// /* =========================================================
//    SHARED FIELD STYLES
// ========================================================= */

// const inputClass = `
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

// const labelClass = `
//   mb-0.5
//   block
//   text-[10px]
//   font-semibold
//   text-[#173b5c]
// `;

// /* =========================================================
//    SELECT FIELD
// ========================================================= */

// function SelectField({ name, label, options = [] }) {
//   return (
//     <div className="min-w-0">
//       <label className={`${labelClass} truncate`}>
//         {label}
//       </label>

//       <select
//         name={name}
//         className={inputClass}
//         defaultValue={options[0] || ""}
//       >
//         {options.map((option, index) => (
//           <option
//             key={`${option}-${index}`}
//             value={option}
//           >
//             {option || "Select"}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// /* =========================================================
//    TABLE HEADER
// ========================================================= */

// function TableHeader({ children }) {
//   return (
//     <div
//       className="
//         border-r
//         border-[#7698ad]
//         px-1.5
//         py-1
//         text-[9px]
//         font-black
//         text-[#173b5c]
//       "
//     >
//       {children}
//     </div>
//   );
// }

// /* =========================================================
//    TABLE CELL
// ========================================================= */

// function TableCell() {
//   return (
//     <div
//       className="
//         h-7
//         border-r
//         border-[#a2b9c8]
//         bg-[#edf4f8]
//       "
//     />
//   );
// }

// /* =========================================================
//    ACTION BUTTON
// ========================================================= */

// function ActionButton({
//   children,
//   type = "button",
//   variant = "light",
//   icon,
//   onClick,
// }) {
//   const variants = {
//     dark: `
//       border-[#5d91b2]
//       bg-gradient-to-r
//       from-[#174f7b]
//       via-[#216994]
//       to-[#174f7b]
//       text-white
//       hover:shadow-[0_0_12px_rgba(20,94,145,0.4)]
//     `,

//     light: `
//       border-[#5685a6]
//       bg-[#e4eef6]
//       text-[#153b5a]
//       hover:border-[#0b5fa5]
//       hover:bg-[#d3e6f3]
//       hover:shadow-[0_0_10px_rgba(11,95,165,0.18)]
//     `,

//     green: `
//       border-emerald-600
//       bg-emerald-600
//       text-white
//       hover:bg-emerald-700
//       hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]
//     `,

//     gold: `
//       border-[#d8a928]
//       bg-gradient-to-r
//       from-[#f8e8a8]
//       to-[#f3d978]
//       text-[#061a3a]
//       hover:shadow-[0_0_12px_rgba(216,169,40,0.4)]
//     `,

//     red: `
//       border-red-500
//       bg-red-600
//       text-white
//       shadow-[0_0_8px_rgba(239,68,68,0.25)]
//       hover:bg-red-700
//       hover:shadow-[0_0_14px_rgba(239,68,68,0.5)]
//     `,
//   };

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`
//         flex
//         h-9
//         min-w-[100px]
//         items-center
//         justify-center
//         gap-1.5
//         rounded-md
//         border
//         px-4
//         text-[11px]
//         font-extrabold
//         transition-all
//         active:scale-[0.97]
//         ${variants[variant]}
//       `}
//     >
//       {icon}
//       {children}
//     </button>
//   );
// }
import { useEffect, useMemo, useRef, useState } from "react";
import { IndianRupee, Lock, Plus, Printer, Save, Trash2, X } from "lucide-react";
import { getFeeFormat, saveForm, updateFeeFormat } from "../../api/formApi";
import { SCHOOL_INFO } from "../../config/schoolInfo";

/* =========================================================
   FEE FORMAT
   - one format per Session + Class
   - pick a session + class to see its saved format
   - if none exists yet you can create it (monthly fees + extra fees)
   - once saved it is LOCKED: the screen is read-only and the
     server / database refuse any change
========================================================= */

const SESSIONS = ["2024 - 25", "2025 - 26", "2026 - 27", "2027 - 28"];

const CLASSES = [
  "Nursery", "LKG", "UKG",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6",
  "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12",
];

const MONTHS = [
  "Admission", "April", "May", "June", "July", "August", "September",
  "October", "November", "December", "January", "February", "March",
];

const emptyMonths = () =>
  Object.fromEntries(MONTHS.map((m) => [m, { on: false, amount: "" }]));

const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const inr = (v) => `₹${num(v).toLocaleString("en-IN")}`;

const escapeHtml = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));

export default function StudentFeeFormat({ onClose }) {
  const [session, setSession] = useState("2026 - 27");
  const [className, setClassName] = useState("");

  // idle | loading | new | locked | error
  const [mode, setMode] = useState("idle");
  const [record, setRecord] = useState(null);

  const [months, setMonths] = useState(emptyMonths);
  const [extras, setExtras] = useState([]);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const extraId = useRef(0);
  const locked = mode === "locked";
  const editable = mode === "new" || mode === "editing";
  const isEditing = mode === "editing";

  /* ---------- load whenever session / class changes ---------- */
  useEffect(() => {
    if (!session || !className) {
      setMode("idle");
      setRecord(null);
      setMonths(emptyMonths());
      setExtras([]);
      return undefined;
    }

    let cancelled = false;
    setMode("loading");

    getFeeFormat(session, className)
      .then((rec) => {
        if (cancelled) return;

        if (rec) {
          const data = rec.form_data || {};
          const next = emptyMonths();

          (data.months || []).forEach((m) => {
            if (next[m.month]) next[m.month] = { on: true, amount: String(m.amount) };
          });

          setMonths(next);
          setExtras(
            (data.extraFees || []).map((e) => ({
              id: ++extraId.current,
              month: e.month,
              title: e.title,
              amount: String(e.amount),
            }))
          );
          setRecord(rec);
          setMode("locked");
        } else {
          setMonths(emptyMonths());
          setExtras([]);
          setRecord(null);
          setMode("new");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Unable to load fee format.");
        setMode("error");
      });

    return () => {
      cancelled = true;
    };
  }, [session, className, reloadKey]);

  /* ---------- totals ---------- */
  const totals = useMemo(() => {
    const monthly = MONTHS.reduce(
      (s, m) => s + (months[m].on ? num(months[m].amount) : 0),
      0
    );
    const extra = extras.reduce((s, e) => s + num(e.amount), 0);
    return { monthly, extra, grand: monthly + extra };
  }, [months, extras]);

  // month-wise summary rows (only months that have something)
  const summary = useMemo(
    () =>
      MONTHS.map((m) => {
        const regular = months[m].on ? num(months[m].amount) : 0;
        const extra = extras
          .filter((e) => e.month === m)
          .reduce((s, e) => s + num(e.amount), 0);
        return { month: m, regular, extra, total: regular + extra };
      }).filter((r) => r.total > 0),
    [months, extras]
  );

  /* ---------- edit helpers ---------- */
  const setMonth = (m, patch) =>
    setMonths((prev) => ({ ...prev, [m]: { ...prev[m], ...patch } }));

  const addExtra = () =>
    setExtras((prev) => [
      ...prev,
      { id: ++extraId.current, month: "April", title: "", amount: "" },
    ]);

  const updateExtra = (id, patch) =>
    setExtras((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  const removeExtra = (id) => setExtras((prev) => prev.filter((e) => e.id !== id));

  function resetForm() {
    setMonths(emptyMonths());
    setExtras([]);
    setError("");
  }

  /* ---------- save ---------- */
  async function submit(e) {
    e.preventDefault();
    if (!editable || saving) return;
    setError("");

    const usedExtras = extras.filter((x) => x.title.trim() || x.amount);
    const badExtra = usedExtras.find((x) => !x.title.trim() || num(x.amount) <= 0);

    if (badExtra) {
      setError("Each extra fee needs a name and an amount, or remove that row.");
      return;
    }

    if (totals.grand <= 0) {
      setError("Enter at least one fee amount before saving.");
      return;
    }

    const ok = window.confirm(
      `Save fee format for ${className} (${session})?\n\n` +
        `Total fee: ${inr(totals.grand)}\n\n` +
        (isEditing
          ? "Update the saved fee format?"
          : "You can edit this format later using the Edit button.")
    );
    if (!ok) return;

    setSaving(true);

    try {
      const payload = {
        session,
        className,
        months: MONTHS.filter((m) => months[m].on && num(months[m].amount) > 0).map(
          (m) => ({ month: m, amount: num(months[m].amount) })
        ),
        extraFees: usedExtras.map((x) => ({
          month: x.month,
          title: x.title.trim(),
          amount: num(x.amount),
        })),
      };

      if (isEditing && record?.id) {
        await updateFeeFormat(record.id, payload);
      } else {
        await saveForm("feeFormat", payload);
      }

      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
      setReloadKey((k) => k + 1); // reload the saved copy
    } catch (err) {
      if (err.status === 409) {
        setReloadKey((k) => k + 1); // someone already saved it: show that one
      }
      setError(err.message || "Unable to save fee format.");
    } finally {
      setSaving(false);
    }
  }

  /* ---------- print ---------- */
  function printFormat() {
    if (!locked) return;

    const rows = summary
      .map(
        (r) => `<tr><td>${escapeHtml(r.month)}</td>
          <td class="r">${r.regular ? inr(r.regular) : "-"}</td>
          <td class="r">${inr(r.total)}</td></tr>`
      )
      .join("");

    const w = window.open("", "_blank", "width=820,height=900");
    if (!w) {
      setError("Please allow pop-ups to print.");
      return;
    }

    w.document.write(`<!doctype html><html><head><title>Fee Format</title>
      <style>
        body{font-family:Arial,sans-serif;color:#111;margin:28px}
        h1{margin:0;font-size:20px;text-align:center}
        .sub{text-align:center;font-size:12px;color:#555;margin:2px 0 14px}
        h2{font-size:14px;margin:18px 0 6px}
        .meta{display:flex;justify-content:space-between;font-size:13px;margin:10px 0}
        table{width:100%;border-collapse:collapse;font-size:13px}
        th,td{border:1px solid #444;padding:5px 8px;text-align:left}
        th{background:#e8eef4}.r{text-align:right}
        tfoot td{font-weight:bold;background:#f3f6f9}
      </style></head><body>
      <h1>${escapeHtml(SCHOOL_INFO.name)}</h1>
      <div class="sub">${escapeHtml(SCHOOL_INFO.address)}</div>
      <h1 style="font-size:16px">Fee Format</h1>
      <div class="meta"><span><b>Session:</b> ${escapeHtml(session)}</span>
        <span><b>Class:</b> ${escapeHtml(className)}</span></div>
      <table><thead><tr><th>Month</th><th class="r">Regular Fee</th><th class="r">Total</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr><td>Total</td><td class="r">${inr(totals.monthly)}</td><td class="r">${inr(totals.grand)}</td></tr></tfoot>
      </table>
      </body></html>`);
    w.document.close();
    w.focus();
    w.print();
  }

  /* ---------- status banner ---------- */
  const banner = {
    idle: { tone: "info", text: "Select a session and a class to view or create its fee format." },
    loading: { tone: "info", text: "Loading fee format…" },
    new: {
      tone: "warn",
      text: `No fee format exists for ${className} (${session}). Fill it in and save. You can edit it later.`,
    },
    locked: {
      tone: "ok",
      text: `Saved${
        record?.created_at
          ? ` on ${new Date(record.created_at).toLocaleDateString("en-IN")}`
          : ""
      }${record?.record_no ? ` · ${record.record_no}` : ""}. Select Edit to change this fee format.`,
    },
    editing: { tone: "warn", text: "Editing saved fee format. Save Changes to apply your updates, or Cancel to discard them." },
    error: { tone: "err", text: error || "Unable to load fee format." },
  }[mode];

  const toneClass = {
    info: "border-[#79a9c9] bg-[#e6f0f7] text-[#173b5c]",
    warn: "border-amber-400 bg-amber-50 text-amber-900",
    ok: "border-emerald-500 bg-emerald-50 text-emerald-900",
    err: "border-red-400 bg-red-50 text-red-800",
  }[banner.tone];

  return (
    <form
      onSubmit={submit}
      className="flex h-auto max-h-[calc(100vh-72px)] w-full max-w-[1180px] flex-col overflow-hidden rounded-[22px] border-2 border-[#0b2a52] bg-[#dbe9f4] p-2.5 shadow-[0_0_18px_rgba(11,42,82,0.30)]"
    >
      {/* HEADER */}
      <div className="flex min-h-[38px] shrink-0 items-center justify-between gap-2 rounded-lg border border-[#5d91b2] bg-gradient-to-r from-[#174f7b] via-[#216994] to-[#174f7b] px-3 py-1.5 text-white">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#d8a928] text-[#102f4b]">
            <IndianRupee size={15} strokeWidth={2.8} />
          </div>
          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
            Fee Format
          </h2>
        </div>

        {justSaved && (
          <span className="rounded-md border border-emerald-300 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-100">
            Saved successfully
          </span>
        )}

        {locked && !justSaved && (
          <span className="flex items-center gap-1 rounded-md border border-emerald-300 bg-emerald-400/20 px-2.5 py-1 text-[10px] font-bold text-emerald-100">
            Saved
          </span>
        )}
        {isEditing && <span className="rounded-md border border-amber-300 bg-amber-400/20 px-2.5 py-1 text-[10px] font-bold text-amber-100">Edit Mode</span>}

        <button
          type="button"
          onClick={onClose}
          title="Close"
          className="flex h-7 w-8 shrink-0 items-center justify-center rounded-md border border-red-300 bg-red-600 text-white transition-all hover:bg-red-700 hover:shadow-[0_0_14px_rgba(239,68,68,0.55)]"
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>

      {/* MAIN SCROLL AREA */}
      <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overflow-x-hidden overscroll-contain p-1.5 pb-2">
        {/* SESSION + CLASS */}
        <section className="rounded-lg border border-[#79a9c9] bg-[#e6f0f7] p-2 shadow-sm">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="min-w-0">
              <label className={labelClass}>Session</label>
              <select
                value={session}
                onChange={(e) => { setError(""); setSession(e.target.value); }}
                className={inputClass}
              >
                <option value="">Select Session</option>
                {SESSIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label className={labelClass}>Class</label>
              <select
                value={className}
                onChange={(e) => { setError(""); setClassName(e.target.value); }}
                className={inputClass}
              >
                <option value="">Select Class</option>
                {CLASSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* STATUS */}
        <div
          role="status"
          className={`mt-2 flex items-start gap-2 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold ${toneClass}`}
        >
          {locked && <Lock size={13} className="mt-px shrink-0" strokeWidth={2.8} />}
          <span>{banner.text}</span>
        </div>

        {error && mode !== "error" && (
          <div
            role="alert"
            className="mt-2 rounded-lg border border-red-400 bg-red-50 px-2.5 py-1.5 text-[11px] font-semibold text-red-800"
          >
            {error}
          </div>
        )}

        {(editable || locked) && (
          <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-[1fr_260px]">
            {/* LEFT: EXTRA FEES + SUMMARY */}
            <div className="flex min-w-0 flex-col gap-2">
              <section className="rounded-lg border border-[#547c98] bg-[#d9e7f2] p-1.5">
                <div className="flex h-7 items-center justify-between rounded-md border border-[#7ca7c2] bg-[#c8dce9] px-2">
                  <span className="text-[10px] font-black uppercase tracking-wide text-[#163d5c]">
                    Extra Fees
                  </span>

                  {editable && (
                    <button
                      type="button"
                      onClick={addExtra}
                      className="flex h-5 items-center gap-1 rounded border border-[#5685a6] bg-white px-2 text-[10px] font-extrabold text-[#153b5a] hover:bg-[#d3e6f3]"
                    >
                      <Plus size={11} strokeWidth={3} /> Add Extra Fee
                    </button>
                  )}
                </div>

                <div className="mt-1.5 space-y-1">
                  {extras.length === 0 && (
                    <p className="px-1 py-2 text-[10px] font-semibold text-[#4b6b83]">
                      {editable
                        ? "No extra fees. Use “Add Extra Fee” for a one-time charge in any month (exam fee, annual charges, etc.)."
                        : "No extra fees in this format."}
                    </p>
                  )}

                  {extras.map((x) => (
                    <div
                      key={x.id}
                      className="grid grid-cols-[100px_1fr_90px_auto] items-center gap-1.5"
                    >
                      <select
                        value={x.month}
                        disabled={!editable}
                        onChange={(e) => updateExtra(x.id, { month: e.target.value })}
                        className={inputClass}
                        aria-label="Extra fee month"
                      >
                        {MONTHS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>

                      <input
                        value={x.title}
                        disabled={!editable}
                        maxLength={120}
                        placeholder="Fee name (e.g. Exam Fee)"
                        onChange={(e) => updateExtra(x.id, { title: e.target.value })}
                        className={inputClass}
                        aria-label="Extra fee name"
                      />

                      <input
                        type="number"
                        min="0"
                        value={x.amount}
                        disabled={!editable}
                        placeholder="0"
                        onChange={(e) => updateExtra(x.id, { amount: e.target.value })}
                        className={`${inputClass} text-right`}
                        aria-label="Extra fee amount"
                      />

                      {editable ? (
                        <button
                          type="button"
                          onClick={() => removeExtra(x.id)}
                          title="Remove"
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-red-300 bg-white text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={13} />
                        </button>
                      ) : (
                        <span className="w-7" />
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-lg border border-[#547c98] bg-[#d9e7f2] p-1.5">
                <div className="flex h-7 items-center rounded-md border border-[#7ca7c2] bg-[#c8dce9] px-2 text-[10px] font-black uppercase tracking-wide text-[#163d5c]">
                  Month-wise Summary
                </div>

                <div className="mt-1.5 overflow-x-auto rounded-md border border-[#567b94] bg-[#e3edf5]">
                  <table className="w-full min-w-[360px] text-[11px]">
                    <thead>
                      <tr className="bg-[#c7dce9] text-left text-[#173b5c]">
                        <th className="px-2 py-1 font-black">Month</th>
                        <th className="px-2 py-1 text-right font-black">Regular</th>
                        <th className="px-2 py-1 text-right font-black">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summary.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-2 py-3 text-center font-semibold text-[#4b6b83]">
                            Nothing added yet
                          </td>
                        </tr>
                      )}

                      {summary.map((r) => (
                        <tr key={r.month} className="border-t border-[#a2b9c8] font-semibold text-slate-800">
                          <td className="px-2 py-1">
                            <details className="group">
                              <summary className="cursor-pointer list-none font-bold text-[#174f7b] underline decoration-dotted underline-offset-2">
                                {r.month} <span className="ml-1 text-[9px] text-slate-500">{extras.some((x) => x.month === r.month) ? "Details " : "Details"}</span>
                              </summary>
                              <div className="mt-1 space-y-1 rounded border border-[#a2b9c8] bg-white/70 p-1.5">
                                <div className="flex justify-between gap-2"><span>Regular Fee</span><b>{r.regular ? inr(r.regular) : "-"}</b></div>
                                {extras.filter((x) => x.month === r.month).map((x) => (
                                  <div key={x.id} className="flex justify-between gap-2 text-[#174f7b]"><span>{x.title}</span><b>{inr(x.amount)}</b></div>
                                ))}
                                {!extras.some((x) => x.month === r.month) && <span className="text-slate-500">No extra fees</span>}
                              </div>
                            </details>
                          </td>
                          <td className="px-2 py-1 text-right">{r.regular ? inr(r.regular) : "-"}</td>
                          <td className="px-2 py-1 text-right font-black">{inr(r.total)}</td>
                        </tr>
                      ))}
                    </tbody>

                    {summary.length > 0 && (
                      <tfoot>
                        <tr className="border-t-2 border-[#567b94] bg-[#c7dce9] font-black text-[#0b2a52]">
                          <td className="px-2 py-1">Total</td>
                          <td className="px-2 py-1 text-right">{inr(totals.monthly)}</td>
                          <td className="px-2 py-1 text-right">{inr(totals.grand)}</td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </section>
            </div>

            {/* RIGHT: MONTHLY FEES */}
            <section className="h-fit rounded-lg border border-[#547c98] bg-[#d3e2ed] p-1.5">
              <div className="mb-1.5 flex h-7 items-center rounded-md border border-[#7ca7c2] bg-[#c8dce9] px-2 text-[10px] font-black uppercase tracking-wide text-[#163d5c]">
                Fee Details
              </div>

              <div className="space-y-1">
                {MONTHS.map((m) => (
                  <div key={m} className="grid grid-cols-[18px_1fr_90px] items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={months[m].on}
                      disabled={!editable}
                      onChange={(e) =>
                        setMonth(m, {
                          on: e.target.checked,
                          amount: e.target.checked ? months[m].amount : "",
                        })
                      }
                      aria-label={`Charge fee in ${m}`}
                      className="h-3.5 w-3.5 cursor-pointer accent-[#174f7b] disabled:cursor-not-allowed"
                    />

                    <label className="truncate text-[10px] font-semibold text-[#173b5c]">{m}</label>

                    <input
                      type="number"
                      min="0"
                      value={months[m].amount}
                      disabled={!editable || !months[m].on}
                      placeholder="0"
                      onChange={(e) => setMonth(m, { amount: e.target.value })}
                      className={`${inputClass} text-right`}
                      aria-label={`${m} fee`}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-2 space-y-1 border-t border-[#7999ad] pt-2">
                <TotalRow label="Monthly Fees" value={totals.monthly} />
                <TotalRow label="Extra Fees" value={totals.extra} />
                <TotalRow label="Total" value={totals.grand} strong />
              </div>
            </section>
          </div>
        )}
      </div>

      {/* BUTTONS */}
      <div className="mt-1.5 shrink-0 rounded-lg border border-[#5d8ba7] bg-[#c7dce9] p-2.5">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
          <ActionButton
            type="button"
            variant="light"
            icon={<Printer size={14} strokeWidth={2.5} />}
            disabled={!locked}
            onClick={printFormat}
          >
            Print
          </ActionButton>

          {locked && (
            <ActionButton type="button" variant="gold" onClick={() => setMode("editing")}>
              Edit Format
            </ActionButton>
          )}

          <ActionButton
            type="submit"
            variant="gold"
            icon={<Save size={14} strokeWidth={2.5} />}
            disabled={!editable || saving}
          >
            {saving ? "Saving…" : isEditing ? "Save Changes" : "Save Format"}
          </ActionButton>

          {isEditing ? (
            <ActionButton type="button" variant="light" onClick={() => setReloadKey((k) => k + 1)}>
              Cancel
            </ActionButton>
          ) : (
            <ActionButton type="button" variant="light" disabled={!editable} onClick={resetForm}>
              Reset
            </ActionButton>
          )}

          <ActionButton
            type="button"
            variant="red"
            icon={<X size={14} strokeWidth={2.5} />}
            onClick={onClose}
          >
            Exit
          </ActionButton>
        </div>
      </div>
    </form>
  );
}

/* =========================================================
   SMALL PIECES
========================================================= */

const inputClass = `
  h-7 w-full rounded-md border border-[#0b2a52] bg-white px-2
  text-[11px] font-semibold text-slate-800 outline-none transition
  focus:border-[#061a3a] focus:ring-1 focus:ring-[#0b2a52]/30
  disabled:cursor-not-allowed disabled:border-[#8aa5b8] disabled:bg-slate-100 disabled:text-slate-600
`;

const labelClass = "mb-0.5 block truncate text-[10px] font-semibold text-[#173b5c]";

function TotalRow({ label, value, strong = false }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-1.5">
      <span className={`text-[10px] ${strong ? "font-black" : "font-semibold"} text-[#173b5c]`}>
        {label}
      </span>
      <span
        className={`text-right text-[11px] ${
          strong ? "font-black text-[#0b2a52]" : "font-semibold text-slate-700"
        }`}
      >
        {inr(value)}
      </span>
    </div>
  );
}

function ActionButton({ children, type = "button", variant = "light", icon, onClick, disabled }) {
  const variants = {
    light:
      "border-[#5685a6] bg-[#e4eef6] text-[#153b5a] hover:border-[#0b5fa5] hover:bg-[#d3e6f3]",
    gold:
      "border-[#d8a928] bg-gradient-to-r from-[#f8e8a8] to-[#f3d978] text-[#061a3a] hover:shadow-[0_0_12px_rgba(216,169,40,0.4)]",
    red:
      "border-red-500 bg-red-600 text-white shadow-[0_0_8px_rgba(239,68,68,0.25)] hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-9 min-w-[100px] items-center justify-center gap-1.5 rounded-md border px-4 text-[11px] font-extrabold transition-all active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-45 disabled:active:scale-100 ${variants[variant]}`}
    >
      {icon}
      {children}
    </button>
  );
}
