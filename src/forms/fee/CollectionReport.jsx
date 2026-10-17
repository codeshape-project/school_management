// import { previewReport } from "../../api/formApi";
// import { useState } from "react";
// import { Search, X, FileBarChart } from "lucide-react";

// export default function CollectionReport({ onClose }) {
//   const [showResult, setShowResult] = useState(false);

//   const [form, setForm] = useState({
//     session: "ALL",
//     fromDate: "12-09-2026",
//     toDate: "12-09-2026",
//     groupwise: "Collection",
//     className: "ALL",
//     section: "",
//     payMode: "ALL",
//     depositIn: "All",
//   });

//   const sectionDisabled = form.className === "ALL";

//   function handleChange(e) {
//     const { name, value } = e.target;

//     setForm((prev) => {
//       const next = {
//         ...prev,
//         [name]: value,
//       };

//       if (name === "className" && value === "ALL") {
//         next.section = "";
//       }

//       return next;
//     });

//     setShowResult(false);
//   }

//   async function handleShow(e) {
//     e.preventDefault();
//     try {
//       const data = Object.fromEntries(new FormData(e.currentTarget).entries());
//       const result = await previewReport({
//         sources: ["fee_receipts"],
//         filters: data,
//         columns: ["record_no","name","phone","admission_no","session","class_name","section","event_date","payment_mode"],
//         limit: 500,
//       });
//       setShowResult(true);
//       window.__schoolReportResult = result?.data || result;
//     } catch (err) {
//       alert(err.message || "Unable to generate report.");
//     }
//   }

//  const inputClass = `
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
//      className="
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
//             <FileBarChart size={15} strokeWidth={2.8} />
//           </div>

//           <h2 className="truncate text-sm font-black tracking-wide">
//             Fee Collection Reports
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
//         {/* SELECT SESSION */}
//         <div className="grid grid-cols-[100px_1fr] items-center gap-x-2 gap-y-2">
//           <label className={labelClass}>Select Session</label>

//           <select
//             name="session"
//             value={form.session}
//             onChange={handleChange}
//             className={inputClass}
//           >
//             <option>ALL</option>
//             <option>2024 - 25</option>
//             <option>2025 - 26</option>
//             <option>2026 - 27</option>
//           </select>
//         </div>

//         {/* DATE RANGE */}
//         <div
//           className="
//             mt-2
//             rounded-md
//             border
//             border-[#7ca7c2]
//             bg-[#dfeaf2]
//             p-2
//           "
//         >
//           <p className="mb-1.5 text-[10px] font-black uppercase tracking-wide text-[#0b5fa5]">
//             Date
//           </p>

//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <label className={labelClass}>From</label>

//               <input
//                 type="date"
//                 className={inputClass}
//                 value={
//                   form.fromDate
//                     ? form.fromDate.split("-").reverse().join("-")
//                     : ""
//                 }
//                 onChange={(e) => {
//                   const parts = e.target.value.split("-");

//                   if (parts.length === 3) {
//                     setForm((prev) => ({
//                       ...prev,
//                       fromDate: `${parts[2]}-${parts[1]}-${parts[0]}`,
//                     }));
//                     setShowResult(false);
//                   }
//                 }}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>To</label>

//               <input
//                 type="date"
//                 className={inputClass}
//                 value={
//                   form.toDate
//                     ? form.toDate.split("-").reverse().join("-")
//                     : ""
//                 }
//                 onChange={(e) => {
//                   const parts = e.target.value.split("-");

//                   if (parts.length === 3) {
//                     setForm((prev) => ({
//                       ...prev,
//                       toDate: `${parts[2]}-${parts[1]}-${parts[0]}`,
//                     }));
//                     setShowResult(false);
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* REMAINING FILTERS */}
//         <div className="mt-2 grid grid-cols-[100px_1fr] items-center gap-x-2 gap-y-2">
//           <label className={labelClass}>Groupwise</label>

//           <select
//             name="groupwise"
//             value={form.groupwise}
//             onChange={handleChange}
//             className={inputClass}
//           >
//             <option>Collection</option>
//             <option>Class Wise</option>
//             <option>Section Wise</option>
//             <option>Fee Head Wise</option>
//           </select>

//           <label className={labelClass}>Class</label>

//           <select
//             name="className"
//             value={form.className}
//             onChange={handleChange}
//             className={inputClass}
//           >
//             <option>ALL</option>
//             <option>Nursery</option>
//             <option>LKG</option>
//             <option>UKG</option>
//             <option>1</option>
//             <option>2</option>
//             <option>3</option>
//             <option>4</option>
//             <option>5</option>
//             <option>6</option>
//             <option>7</option>
//             <option>8</option>
//             <option>9</option>
//             <option>10</option>
//             <option>11</option>
//             <option>12</option>
//           </select>

//           <label className={labelClass}>Section</label>

//           <select
//             name="section"
//             value={form.section}
//             onChange={handleChange}
//             disabled={sectionDisabled}
//             className={inputClass}
//           >
//             <option value="">Select</option>
//             <option>A</option>
//             <option>B</option>
//             <option>C</option>
//             <option>D</option>
//           </select>

//           <label className={labelClass}>Pay Mode</label>

//           <select
//             name="payMode"
//             value={form.payMode}
//             onChange={handleChange}
//             className={inputClass}
//           >
//             <option>ALL</option>
//             <option>Cash</option>
//             <option>Cheque</option>
//             <option>A/C Transfer</option>
//             <option>Card</option>
//           </select>

//           <label className={labelClass}>Deposit In</label>

//           <select
//             name="depositIn"
//             value={form.depositIn}
//             onChange={handleChange}
//             className={inputClass}
//           >
//             <option>All</option>
//             <option>School</option>
//             <option>Bank</option>
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
//             Showing collection report from {form.fromDate} to {form.toDate}
//             {" "}
//             ({form.groupwise}, Class: {form.className}
//             {form.section ? ` - ${form.section}` : ""}, Pay Mode: {form.payMode}, Deposit In: {form.depositIn})
//           </div>
//         )}
//       </div>
//     </form>
//   );
// }


import { previewReport } from "../../api/formApi";
import { useState } from "react";
import { Search, X, FileBarChart } from "lucide-react";

export default function CollectionReport({ onClose }) {
  const [showResult, setShowResult] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    session: "ALL",
    fromDate: "12-09-2026",
    toDate: "12-09-2026",
    groupwise: "Collection",
    className: "ALL",
    section: "",
    payMode: "ALL",
    depositIn: "All",
  });

  const sectionDisabled = form.className === "ALL";

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = {
        ...prev,
        [name]: value,
      };

      if (name === "className" && value === "ALL") {
        next.section = "";
      }

      return next;
    });

    setShowResult(false);
    setSaved(false);
  }

  async function handleShow(e) {
    e.preventDefault();

    try {
      const data = {
        session: form.session,
        fromDate: form.fromDate,
        toDate: form.toDate,
        groupwise: form.groupwise,
        className: form.className,
        section: form.section,
        payMode: form.payMode,
        depositIn: form.depositIn,
      };

      const result = await previewReport({
        sources: ["fee_receipts"],
        filters: data,
        columns: [
          "record_no",
          "name",
          "phone",
          "admission_no",
          "session",
          "class_name",
          "section",
          "event_date",
          "payment_mode",
        ],
        limit: 500,
      });

      window.__schoolReportResult = result?.data || result;

      setShowResult(true);

      // Show success message after report is generated
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2200);
    } catch (err) {
      setSaved(false);
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
            <FileBarChart size={15} strokeWidth={2.8} />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide">
            Fee Collection Reports
          </h2>
        </div>

        {/* SUCCESS MESSAGE */}
        {saved && (
          <span
            className="
              rounded-md
              border
              border-emerald-300
              bg-emerald-500/20
              px-2.5
              py-1
              text-[10px]
              font-bold
              text-emerald-100
            "
          >
            Saved Successfully
          </span>
        )}

        {/* CLOSE */}
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
        {/* SESSION */}
        <div className="grid grid-cols-[100px_1fr] items-center gap-x-2 gap-y-2">
          <label className={labelClass}>Select Session</label>

          <select
            name="session"
            value={form.session}
            onChange={handleChange}
            className={inputClass}
          >
            <option>ALL</option>
            <option>2024 - 25</option>
            <option>2025 - 26</option>
            <option>2026 - 27</option>
          </select>
        </div>

        {/* DATE RANGE */}
        <div
          className="
            mt-2
            rounded-md
            border
            border-[#7ca7c2]
            bg-[#dfeaf2]
            p-2
          "
        >
          <p className="mb-1.5 text-[10px] font-black uppercase tracking-wide text-[#0b5fa5]">
            Date
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClass}>From</label>

              <input
                type="date"
                name="fromDate"
                className={inputClass}
                value={
                  form.fromDate
                    ? form.fromDate.split("-").reverse().join("-")
                    : ""
                }
                onChange={(e) => {
                  const parts = e.target.value.split("-");

                  if (parts.length === 3) {
                    setForm((prev) => ({
                      ...prev,
                      fromDate: `${parts[2]}-${parts[1]}-${parts[0]}`,
                    }));

                    setShowResult(false);
                    setSaved(false);
                  }
                }}
              />
            </div>

            <div>
              <label className={labelClass}>To</label>

              <input
                type="date"
                name="toDate"
                className={inputClass}
                value={
                  form.toDate
                    ? form.toDate.split("-").reverse().join("-")
                    : ""
                }
                onChange={(e) => {
                  const parts = e.target.value.split("-");

                  if (parts.length === 3) {
                    setForm((prev) => ({
                      ...prev,
                      toDate: `${parts[2]}-${parts[1]}-${parts[0]}`,
                    }));

                    setShowResult(false);
                    setSaved(false);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* REMAINING FILTERS */}
        <div className="mt-2 grid grid-cols-[100px_1fr] items-center gap-x-2 gap-y-2">
          <label className={labelClass}>Groupwise</label>

          <select
            name="groupwise"
            value={form.groupwise}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Collection</option>
            <option>Class Wise</option>
            <option>Section Wise</option>
            <option>Fee Head Wise</option>
          </select>

          <label className={labelClass}>Class</label>

          <select
            name="className"
            value={form.className}
            onChange={handleChange}
            className={inputClass}
          >
            <option>ALL</option>
            <option>Nursery</option>
            <option>LKG</option>
            <option>UKG</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </select>

          <label className={labelClass}>Section</label>

          <select
            name="section"
            value={form.section}
            onChange={handleChange}
            disabled={sectionDisabled}
            className={inputClass}
          >
            <option value="">Select</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>

          <label className={labelClass}>Pay Mode</label>

          <select
            name="payMode"
            value={form.payMode}
            onChange={handleChange}
            className={inputClass}
          >
            <option>ALL</option>
            <option>Cash</option>
            <option>Cheque</option>
            <option>A/C Transfer</option>
            <option>Card</option>
          </select>

          <label className={labelClass}>Deposit In</label>

          <select
            name="depositIn"
            value={form.depositIn}
            onChange={handleChange}
            className={inputClass}
          >
            <option>All</option>
            <option>School</option>
            <option>Bank</option>
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
            Showing collection report from {form.fromDate} to {form.toDate}
            {" "}
            ({form.groupwise}, Class: {form.className}
            {form.section ? ` - ${form.section}` : ""}
            , Pay Mode: {form.payMode}, Deposit In: {form.depositIn})
          </div>
        )}
      </div>
    </form>
  );
}

