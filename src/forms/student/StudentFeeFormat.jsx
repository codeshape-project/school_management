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

//     try {
//       await saveForm("feeFormat", e.currentTarget);
//       setSaved(true);

//     setTimeout(() => {
//       setSaved(false);
//     }, 2200);
//     } catch (err) {
//       alert(err.message || "Unable to save data.");
//     }
//   }

//   return (
//     <form
//   onSubmit={submit}
//   className="
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
// >
//   {/* HEADER */}
//   <div
//     className="
//       flex
//       min-h-[38px]
//       shrink-0
//       items-center
//       justify-between
//       gap-2
//       rounded-lg
//       border
//       border-[#5d91b2]
//       bg-gradient-to-r
//       from-[#174f7b]
//       via-[#216994]
//       to-[#174f7b]
//       px-3
//       py-1.5
//       text-white
//     "
//   >
//     <div className="flex min-w-0 items-center gap-2">
//       <div
//         className="
//           flex
//           h-7
//           w-7
//           shrink-0
//           items-center
//           justify-center
//           rounded-md
//           bg-[#d8a928]
//           text-[#102f4b]
//         "
//       >
//         <IndianRupee size={15} strokeWidth={2.8} />
//       </div>

//       <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
//         Fee Format Report
//       </h2>
//     </div>

//     {saved && (
//       <span
//         className="
//           rounded-md
//           border
//           border-emerald-300
//           bg-emerald-500/20
//           px-2.5
//           py-1
//           text-[10px]
//           font-bold
//           text-emerald-100
//         "
//       >
//         Saved Successfully
//       </span>
//     )}

//     {/* TOP-RIGHT CUT BUTTON */}
//     <button
//       type="button"
//       onClick={onClose}
//       title="Close"
//       className="
//         flex
//         h-7
//         w-8
//         shrink-0
//         items-center
//         justify-center
//         rounded-md
//         border
//         border-red-300
//         bg-red-600
//         text-white
//         transition-all
//         hover:bg-red-700
//         hover:shadow-[0_0_14px_rgba(239,68,68,0.55)]
//       "
//     >
//       <X size={16} strokeWidth={3} />
//     </button>
//   </div>

//   {/* MAIN SCROLL AREA */}
//   <div
//     className="
//       min-h-0
//       flex-1
//       overflow-y-auto
//       overflow-x-hidden
//       overscroll-contain
//       touch-pan-y
//       p-1.5
//       pb-2
//       scrollbar-thin
//       lg:overflow-y-auto
//     "
//   >
//     {/* FILTERS */}
//     <section
//       className="
//         rounded-lg
//         border
//         border-[#79a9c9]
//         bg-[#e6f0f7]
//         p-2
//         shadow-sm
//       "
//     >
//       <div
//         className="
//           grid
//           grid-cols-1
//           gap-2
//           sm:grid-cols-2
//           lg:grid-cols-5
//         "
//       >
//         <SelectField
//           label="Session"
//           options={["", "2024 - 25", "2025 - 26", "2026 - 27"]}
//         />

//         <SelectField
//           label="Class"
//           options={[
//             "",
//             "ALL",
//             "Nursery",
//             "LKG",
//             "UKG",
//             "I",
//             "II",
//             "III",
//             "IV",
//             "V",
//             "VI",
//             "VII",
//             "VIII",
//             "IX",
//             "X",
//             "XI",
//             "XII",
//           ]}
//         />

//         <SelectField label="Section" options={["", "A", "B", "C", "D"]} />

//         <SelectField
//           label="Student Type"
//           options={["Regular", "Private", "Other"]}
//         />

//         <SelectField
//           label="Admission Type"
//           options={["New", "Old", "Transfer"]}
//         />
//       </div>
//     </section>

//     {/* SELECT FORMAT */}
//     <section
//       className="
//         mt-2
//         rounded-lg
//         border
//         border-[#547c98]
//         bg-[#d9e7f2]
//         p-2
//       "
//     >
//       <div
//         className="
//           grid
//           grid-cols-1
//           gap-2
//           sm:grid-cols-[auto_1fr]
//           sm:items-center
//         "
//       >
//         <label className={`${labelClass} whitespace-nowrap`}>
//           Select Format
//         </label>

//         <select className={inputClass}>
//           <option>Select Format</option>
//           <option>Monthly Fee</option>
//           <option>Quarterly Fee</option>
//           <option>Annual Fee</option>
//         </select>
//       </div>
//     </section>

//     {/* MAIN REPORT AREA */}
//     <div
//       className="
//         mt-2
//         grid
//         grid-cols-1
//         gap-2
//         lg:grid-cols-[1fr_260px]
//       "
//     >
//       {/* LEFT REPORT PANEL */}
//       <section
//         className="
//           flex
//           min-h-[280px]
//           flex-col
//           rounded-lg
//           border
//           border-[#547c98]
//           bg-[#d9e7f2]
//           p-1.5
//         "
//       >
//         <div
//           className="
//             flex
//             h-7
//             shrink-0
//             items-center
//             rounded-md
//             border
//             border-[#7ca7c2]
//             bg-[#c8dce9]
//             px-2
//             text-[10px]
//             font-black
//             uppercase
//             tracking-wide
//             text-[#163d5c]
//           "
//         >
//           Fee Format
//         </div>

//         {/* REPORT TABLE AREA */}
//         <div
//           className="
//             mt-1.5
//             min-h-[200px]
//             flex-1
//             overflow-auto
//             rounded-md
//             border
//             border-[#567b94]
//             bg-[#e3edf5]
//           "
//         >
//           <div className="min-w-[500px]">
//             {/* TABLE HEADER */}
//             <div
//               className="
//                 grid
//                 grid-cols-6
//                 overflow-hidden
//                 rounded-t-md
//                 border
//                 border-[#7698ad]
//                 bg-[#c7dce9]
//               "
//             >
//               <TableHeader>Adm. No.</TableHeader>
//               <TableHeader>Name</TableHeader>
//               <TableHeader>Class</TableHeader>
//               <TableHeader>Section</TableHeader>
//               <TableHeader>Fee</TableHeader>
//               <TableHeader>Balance</TableHeader>
//             </div>

//             {/* EMPTY ROWS */}
//             {[1, 2, 3, 4, 5].map((row) => (
//               <div
//                 key={row}
//                 className="
//                   grid
//                   grid-cols-6
//                   border-b
//                   border-[#a2b9c8]
//                 "
//               >
//                 <TableCell />
//                 <TableCell />
//                 <TableCell />
//                 <TableCell />
//                 <TableCell />
//                 <TableCell />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* SMALL BOTTOM FIELD */}
//         <div className="mt-1.5 flex justify-end">
//           <input className={`${inputClass} max-w-[160px]`} />
//         </div>
//       </section>

//       {/* MONTHLY FEE PANEL */}
//       <section
//         className="
//           rounded-lg
//           border
//           border-[#547c98]
//           bg-[#d3e2ed]
//           p-1.5
//         "
//       >
//         <div
//           className="
//             mb-1.5
//             flex
//             h-7
//             items-center
//             rounded-md
//             border
//             border-[#7ca7c2]
//             bg-[#c8dce9]
//             px-2
//             text-[10px]
//             font-black
//             uppercase
//             tracking-wide
//             text-[#163d5c]
//           "
//         >
//           Fee Details
//         </div>

//         <div className="space-y-1">
//           {months.map((month) => (
//             <div
//               key={month}
//               className="
//                 grid
//                 grid-cols-[18px_1fr_90px]
//                 items-center
//                 gap-1.5
//               "
//             >
//               <input
//                 type="checkbox"
//                 className="h-3.5 w-3.5 cursor-pointer accent-[#174f7b]"
//               />

//               <label className="truncate text-[10px] font-semibold text-[#173b5c]">
//                 {month}
//               </label>

//               <input
//                 type="number"
//                 min="0"
//                 placeholder="0"
//                 className={`${inputClass} text-right`}
//               />
//             </div>
//           ))}
//         </div>

//         {/* TOTAL */}
//         <div className="mt-2 border-t border-[#7999ad] pt-2">
//           <div
//             className="
//               grid
//               grid-cols-[1fr_90px]
//               items-center
//               gap-1.5
//             "
//           >
//             <span className="text-[10px] font-black text-[#173b5c]">
//               Total
//             </span>

//             <input
//               type="number"
//               placeholder="0"
//               className={`${inputClass} text-right font-black`}
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   </div>

//   {/* ALL BUTTONS AT BOTTOM */}
//   <div
//     className="
//       mt-1.5
//       shrink-0
//       rounded-lg
//       border
//       border-[#5d8ba7]
//       bg-[#c7dce9]
//       p-2.5
//     "
//   >
//     <div
//       className="
//         flex
//         flex-wrap
//         items-center
//         justify-center
//         gap-2.5
//         sm:justify-start
//       "
//     >
//       <ActionButton type="button" variant="dark">
//         UP FEE
//       </ActionButton>

//       <ActionButton type="button" variant="light">
//         Transfer
//       </ActionButton>

//       <ActionButton
//         type="button"
//         variant="green"
//         icon={<Eye size={14} strokeWidth={2.5} />}
//       >
//         Show
//       </ActionButton>

//       <ActionButton
//         type="button"
//         variant="light"
//         icon={<Printer size={14} strokeWidth={2.5} />}
//       >
//         Print
//       </ActionButton>

//       <ActionButton
//         type="submit"
//         variant="gold"
//         icon={<Save size={14} strokeWidth={2.5} />}
//       >
//         Save Format
//       </ActionButton>

//       <ActionButton type="reset" variant="light">
//         Reset
//       </ActionButton>

//       <ActionButton
//         type="button"
//         variant="red"
//         icon={<X size={14} strokeWidth={2.5} />}
//         onClick={onClose}
//       >
//         Exit
//       </ActionButton>
//     </div>
//   </div>
// </form>
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

// function SelectField({ label, options = [] }) {
//   return (
//     <div className="min-w-0">
//       <label className={`${labelClass} truncate`}>{label}</label>

//       <select className={inputClass}>
//         {options.map((option, index) => (
//           <option key={`${option}-${index}`} value={option}>
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


import { saveForm } from "../../api/formApi";
import { useState } from "react";
import {
  IndianRupee,
  Eye,
  Printer,
  Save,
  X,
} from "lucide-react";

export default function StudentFeeFormat({ onClose }) {
  const [saved, setSaved] = useState(false);

  const months = [
    "Admission",
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

  async function submit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    try {
      await saveForm("feeFormat", form);

      // Empty form only after successful save
      form.reset();

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2200);
    } catch (err) {
      alert(err.message || "Unable to save data.");
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

          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
            Fee Format Report
          </h2>
        </div>

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

      {/* MAIN SCROLL AREA */}
      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          overflow-x-hidden
          overscroll-contain
          touch-pan-y
          p-1.5
          pb-2
          scrollbar-thin
          lg:overflow-y-auto
        "
      >
        {/* FILTERS */}
        <section
          className="
            rounded-lg
            border
            border-[#79a9c9]
            bg-[#e6f0f7]
            p-2
            shadow-sm
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-2
              lg:grid-cols-5
            "
          >
            <SelectField
              name="session"
              label="Session"
              options={["", "2024 - 25", "2025 - 26", "2026 - 27"]}
            />

            <SelectField
              name="className"
              label="Class"
              options={[
                "",
                "ALL",
                "Nursery",
                "LKG",
                "UKG",
                "I",
                "II",
                "III",
                "IV",
                "V",
                "VI",
                "VII",
                "VIII",
                "IX",
                "X",
                "XI",
                "XII",
              ]}
            />

            <SelectField
              name="section"
              label="Section"
              options={["", "A", "B", "C", "D"]}
            />

            <SelectField
              name="studentType"
              label="Student Type"
              options={["Regular", "Private", "Other"]}
            />

            <SelectField
              name="admissionType"
              label="Admission Type"
              options={["New", "Old", "Transfer"]}
            />
          </div>
        </section>

        {/* SELECT FORMAT */}
        <section
          className="
            mt-2
            rounded-lg
            border
            border-[#547c98]
            bg-[#d9e7f2]
            p-2
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-[auto_1fr]
              sm:items-center
            "
          >
            <label className={`${labelClass} whitespace-nowrap`}>
              Select Format
            </label>

            <select
              name="feeFormatType"
              className={inputClass}
              defaultValue=""
            >
              <option value="">Select Format</option>
              <option value="Monthly Fee">Monthly Fee</option>
              <option value="Quarterly Fee">Quarterly Fee</option>
              <option value="Annual Fee">Annual Fee</option>
            </select>
          </div>
        </section>

        {/* MAIN REPORT AREA */}
        <div
          className="
            mt-2
            grid
            grid-cols-1
            gap-2
            lg:grid-cols-[1fr_260px]
          "
        >
          {/* LEFT REPORT PANEL */}
          <section
            className="
              flex
              min-h-[280px]
              flex-col
              rounded-lg
              border
              border-[#547c98]
              bg-[#d9e7f2]
              p-1.5
            "
          >
            <div
              className="
                flex
                h-7
                shrink-0
                items-center
                rounded-md
                border
                border-[#7ca7c2]
                bg-[#c8dce9]
                px-2
                text-[10px]
                font-black
                uppercase
                tracking-wide
                text-[#163d5c]
              "
            >
              Fee Format
            </div>

            {/* REPORT TABLE AREA */}
            <div
              className="
                mt-1.5
                min-h-[200px]
                flex-1
                overflow-auto
                rounded-md
                border
                border-[#567b94]
                bg-[#e3edf5]
              "
            >
              <div className="min-w-[500px]">
                <div
                  className="
                    grid
                    grid-cols-6
                    overflow-hidden
                    rounded-t-md
                    border
                    border-[#7698ad]
                    bg-[#c7dce9]
                  "
                >
                  <TableHeader>Adm. No.</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Class</TableHeader>
                  <TableHeader>Section</TableHeader>
                  <TableHeader>Fee</TableHeader>
                  <TableHeader>Balance</TableHeader>
                </div>

                {[1, 2, 3, 4, 5].map((row) => (
                  <div
                    key={row}
                    className="
                      grid
                      grid-cols-6
                      border-b
                      border-[#a2b9c8]
                    "
                  >
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-1.5 flex justify-end">
              <input
                name="reportValue"
                className={`${inputClass} max-w-[160px]`}
              />
            </div>
          </section>

          {/* MONTHLY FEE PANEL */}
          <section
            className="
              rounded-lg
              border
              border-[#547c98]
              bg-[#d3e2ed]
              p-1.5
            "
          >
            <div
              className="
                mb-1.5
                flex
                h-7
                items-center
                rounded-md
                border
                border-[#7ca7c2]
                bg-[#c8dce9]
                px-2
                text-[10px]
                font-black
                uppercase
                tracking-wide
                text-[#163d5c]
              "
            >
              Fee Details
            </div>

            <div className="space-y-1">
              {months.map((month) => {
                const key = month.toLowerCase().replace(/\s+/g, "");

                return (
                  <div
                    key={month}
                    className="
                      grid
                      grid-cols-[18px_1fr_90px]
                      items-center
                      gap-1.5
                    "
                  >
                    <input
                      type="checkbox"
                      name={`${key}Selected`}
                      value="true"
                      className="h-3.5 w-3.5 cursor-pointer accent-[#174f7b]"
                    />

                    <label className="truncate text-[10px] font-semibold text-[#173b5c]">
                      {month}
                    </label>

                    <input
                      type="number"
                      name={`${key}Fee`}
                      min="0"
                      placeholder="0"
                      className={`${inputClass} text-right`}
                    />
                  </div>
                );
              })}
            </div>

            {/* TOTAL */}
            <div className="mt-2 border-t border-[#7999ad] pt-2">
              <div
                className="
                  grid
                  grid-cols-[1fr_90px]
                  items-center
                  gap-1.5
                "
              >
                <span className="text-[10px] font-black text-[#173b5c]">
                  Total
                </span>

                <input
                  type="number"
                  name="totalFee"
                  placeholder="0"
                  className={`${inputClass} text-right font-black`}
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ALL BUTTONS AT BOTTOM */}
      <div
        className="
          mt-1.5
          shrink-0
          rounded-lg
          border
          border-[#5d8ba7]
          bg-[#c7dce9]
          p-2.5
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-2.5
            sm:justify-start
          "
        >
          <ActionButton type="button" variant="dark">
            UP FEE
          </ActionButton>

          <ActionButton type="button" variant="light">
            Transfer
          </ActionButton>

          <ActionButton
            type="button"
            variant="green"
            icon={<Eye size={14} strokeWidth={2.5} />}
          >
            Show
          </ActionButton>

          <ActionButton
            type="button"
            variant="light"
            icon={<Printer size={14} strokeWidth={2.5} />}
          >
            Print
          </ActionButton>

          <ActionButton
            type="submit"
            variant="gold"
            icon={<Save size={14} strokeWidth={2.5} />}
          >
            Save Format
          </ActionButton>

          <ActionButton type="reset" variant="light">
            Reset
          </ActionButton>

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
   SHARED FIELD STYLES
========================================================= */

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
  text-[10px]
  font-semibold
  text-[#173b5c]
`;

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({ name, label, options = [] }) {
  return (
    <div className="min-w-0">
      <label className={`${labelClass} truncate`}>
        {label}
      </label>

      <select
        name={name}
        className={inputClass}
        defaultValue={options[0] || ""}
      >
        {options.map((option, index) => (
          <option
            key={`${option}-${index}`}
            value={option}
          >
            {option || "Select"}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   TABLE HEADER
========================================================= */

function TableHeader({ children }) {
  return (
    <div
      className="
        border-r
        border-[#7698ad]
        px-1.5
        py-1
        text-[9px]
        font-black
        text-[#173b5c]
      "
    >
      {children}
    </div>
  );
}

/* =========================================================
   TABLE CELL
========================================================= */

function TableCell() {
  return (
    <div
      className="
        h-7
        border-r
        border-[#a2b9c8]
        bg-[#edf4f8]
      "
    />
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({
  children,
  type = "button",
  variant = "light",
  icon,
  onClick,
}) {
  const variants = {
    dark: `
      border-[#5d91b2]
      bg-gradient-to-r
      from-[#174f7b]
      via-[#216994]
      to-[#174f7b]
      text-white
      hover:shadow-[0_0_12px_rgba(20,94,145,0.4)]
    `,

    light: `
      border-[#5685a6]
      bg-[#e4eef6]
      text-[#153b5a]
      hover:border-[#0b5fa5]
      hover:bg-[#d3e6f3]
      hover:shadow-[0_0_10px_rgba(11,95,165,0.18)]
    `,

    green: `
      border-emerald-600
      bg-emerald-600
      text-white
      hover:bg-emerald-700
      hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]
    `,

    gold: `
      border-[#d8a928]
      bg-gradient-to-r
      from-[#f8e8a8]
      to-[#f3d978]
      text-[#061a3a]
      hover:shadow-[0_0_12px_rgba(216,169,40,0.4)]
    `,

    red: `
      border-red-500
      bg-red-600
      text-white
      shadow-[0_0_8px_rgba(239,68,68,0.25)]
      hover:bg-red-700
      hover:shadow-[0_0_14px_rgba(239,68,68,0.5)]
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        flex
        h-9
        min-w-[100px]
        items-center
        justify-center
        gap-1.5
        rounded-md
        border
        px-4
        text-[11px]
        font-extrabold
        transition-all
        active:scale-[0.97]
        ${variants[variant]}
      `}
    >
      {icon}
      {children}
    </button>
  );
}
