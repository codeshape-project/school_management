// import { saveForm } from "../../api/formApi";
// import { useState } from "react";
// import {
//   Search,
//   Printer,
//   X,
//   Receipt as ReceiptIcon,
// } from "lucide-react";

// const FEE_ROWS = 9;

// export default function BlankReceipt({ onClose }) {
//   const [saved, setSaved] = useState(false);

//   async function handleSave() {
//     try {
//       const data = { ...form, feeRows };
//       const fakeForm = document.createElement("form");
//       Object.entries(data).forEach(([key, value]) => {
//         const input = document.createElement("input");
//         input.name = key;
//         input.value = typeof value === "string" ? value : JSON.stringify(value);
//         fakeForm.appendChild(input);
//       });
//       await saveForm("blankReceipt", fakeForm);
//       setSaved(true);
//       setTimeout(() => setSaved(false), 2200);
//     } catch (err) {
//       alert(err.message || "Unable to save blank receipt.");
//     }
//   }

//   const [form, setForm] = useState({
//     computerId: "",
//     admissionNo: "",
//     date: "12-09-2026",
//     session: "2024 - 25",
//     name: "",
//     className: "",
//     section: "",
//     fatherName: "",
//     relatedComputerId: "",
//     payFor: "",
//     depositIn: "School",
//     mode: "Cash",
//     remarks: "",
//     sendSms: true,
//     paymentType: "Cheque",
//     paymentRef: "",
//     searchStudent: "",
//   });

//   const [feeRows, setFeeRows] = useState(
//     Array.from({ length: FEE_ROWS }, () => ({
//       caption: "",
//       amount: "0",
//     }))
//   );

//   function handleChange(e) {
//     const { name, value, type, checked } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }

//   function handleFeeChange(index, field, value) {
//     setFeeRows((prev) =>
//       prev.map((row, i) =>
//         i === index ? { ...row, [field]: value } : row
//       )
//     );
//   }

//   const totalPaidAmt = feeRows.reduce(
//     (sum, row) => sum + (Number(row.amount) || 0),
//     0
//   );

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

//   const selectClass = inputClass;

//   const labelClass = `
//     mb-0.5
//     block
//     whitespace-nowrap
//     text-[10px]
//     font-semibold
//     text-[#173b5c]
//   `;

//   const Button = ({
//     type = "button",
//     onClick,
//     icon: Icon,
//     children,
//     red = false,
//   }) => (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`
//         flex
//         h-9
//         min-w-[90px]
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
//         ${
//           red
//             ? `
//               border-red-500
//               bg-red-600
//               text-white
//               shadow-[0_0_8px_rgba(239,68,68,0.25)]
//               hover:bg-red-700
//               hover:shadow-[0_0_14px_rgba(239,68,68,0.5)]
//             `
//             : `
//               border-[#5685a6]
//               bg-[#e4eef6]
//               text-[#153b5a]
//               hover:border-[#0b5fa5]
//               hover:bg-[#d3e6f3]
//               hover:shadow-[0_0_10px_rgba(11,95,165,0.18)]
//             `
//         }
//       `}
//     >
//       {Icon && <Icon size={14} strokeWidth={2.5} />}
//       <span>{children}</span>
//     </button>
//   );

//   return (
//     <div
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
//             <ReceiptIcon size={15} strokeWidth={2.8} />
//           </div>

//           <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
//             Blank Receipt
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

//       {/* SCROLLABLE FORM CONTENT */}
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
//         <div
//           className="
//             grid
//             grid-cols-1
//             gap-2
//             lg:grid-cols-[minmax(0,1fr)_270px]
//           "
//         >
//           {/* LEFT: STUDENT + FEE DETAILS */}
//           <section
//             className="
//               rounded-lg
//               border
//               border-[#79a9c9]
//               bg-[#e6f0f7]
//               p-2
//               shadow-sm
//             "
//           >
//             <div
//               className="
//                 mb-1.5
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
//               Student Details
//             </div>

//             <div
//               className="
//                 grid
//                 grid-cols-1
//                 gap-2
//                 sm:grid-cols-2
//                 md:grid-cols-3
//                 lg:grid-cols-4
//               "
//             >
//               <div>
//                 <label className={labelClass}>Computer ID</label>

//                 <input
//                   name="computerId"
//                   value={form.computerId}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Adm No</label>

//                 <input
//                   name="admissionNo"
//                   value={form.admissionNo}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Date</label>

//                 <input
//                   type="date"
//                   className={inputClass}
//                   value={
//                     form.date
//                       ? form.date.split("-").reverse().join("-")
//                       : ""
//                   }
//                   onChange={(e) => {
//                     const parts = e.target.value.split("-");

//                     if (parts.length === 3) {
//                       setForm((prev) => ({
//                         ...prev,
//                         date: `${parts[2]}-${parts[1]}-${parts[0]}`,
//                       }));
//                     }
//                   }}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Session</label>

//                 <select
//                   name="session"
//                   value={form.session}
//                   onChange={handleChange}
//                   className={selectClass}
//                 >
//                   <option>2024 - 25</option>
//                   <option>2025 - 26</option>
//                   <option>2026 - 27</option>
//                 </select>
//               </div>
//             </div>

//             <div
//               className="
//                 mt-2
//                 grid
//                 grid-cols-1
//                 gap-2
//                 sm:grid-cols-2
//                 lg:grid-cols-4
//               "
//             >
//               <div>
//                 <label className={labelClass}>Name</label>

//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Class</label>

//                 <select
//                   name="className"
//                   value={form.className}
//                   onChange={handleChange}
//                   className={selectClass}
//                 >
//                   <option value="">Select Class</option>
//                   <option>Nursery</option>
//                   <option>LKG</option>
//                   <option>UKG</option>
//                   <option>1</option>
//                   <option>2</option>
//                   <option>3</option>
//                   <option>4</option>
//                   <option>5</option>
//                   <option>6</option>
//                   <option>7</option>
//                   <option>8</option>
//                   <option>9</option>
//                   <option>10</option>
//                   <option>11</option>
//                   <option>12</option>
//                 </select>
//               </div>

//               <div>
//                 <label className={labelClass}>Section</label>

//                 <select
//                   name="section"
//                   value={form.section}
//                   onChange={handleChange}
//                   className={selectClass}
//                 >
//                   <option value="">Select</option>
//                   <option>A</option>
//                   <option>B</option>
//                   <option>C</option>
//                   <option>D</option>
//                 </select>
//               </div>

//               <div>
//                 <label className={labelClass}>Related Computer Id</label>

//                 <input
//                   name="relatedComputerId"
//                   value={form.relatedComputerId}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             <div
//               className="
//                 mt-2
//                 grid
//                 grid-cols-1
//                 gap-2
//                 sm:grid-cols-2
//               "
//             >
//               <div>
//                 <label className={labelClass}>Father's Name</label>

//                 <input
//                   name="fatherName"
//                   value={form.fatherName}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Pay For</label>

//                 <input
//                   name="payFor"
//                   value={form.payFor}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             {/* FEE DETAILS TABLE */}
//             <div
//               className="
//                 mt-3
//                 rounded-lg
//                 border
//                 border-[#547c98]
//                 bg-[#d9e7f2]
//                 p-1.5
//               "
//             >
//               <div
//                 className="
//                   mb-1.5
//                   flex
//                   h-7
//                   shrink-0
//                   items-center
//                   rounded-md
//                   border
//                   border-[#7ca7c2]
//                   bg-[#c8dce9]
//                   px-2
//                   text-[10px]
//                   font-black
//                   uppercase
//                   tracking-wide
//                   text-[#163d5c]
//                 "
//               >
//                 Fee Details
//               </div>

//               <div
//                 className="
//                   overflow-x-auto
//                   rounded-md
//                   border
//                   border-[#567b94]
//                   bg-[#e3edf5]
//                   p-1
//                 "
//               >
//                 <div className="min-w-[420px]">
//                   {/* TABLE HEADER */}
//                   <div
//                     className="
//                       grid
//                       grid-cols-[1fr_150px]
//                       overflow-hidden
//                       rounded-md
//                       border
//                       border-[#7698ad]
//                       bg-[#c7dce9]
//                       text-[9px]
//                       font-black
//                       text-[#173b5c]
//                     "
//                   >
//                     <div className="border-r border-[#7698ad] px-1.5 py-1">
//                       Fee Caption
//                     </div>

//                     <div className="px-1.5 py-1 text-right">
//                       Amount Paid
//                     </div>
//                   </div>

//                   {/* ROWS */}
//                   <div className="mt-1 space-y-1">
//                     {feeRows.map((row, index) => (
//                       <div
//                         key={index}
//                         className="
//                           grid
//                           grid-cols-[1fr_150px]
//                           items-center
//                           gap-1.5
//                         "
//                       >
//                         <select
//                           value={row.caption}
//                           onChange={(e) =>
//                             handleFeeChange(index, "caption", e.target.value)
//                           }
//                           className={selectClass}
//                         >
//                           <option value="">Select Fee Caption</option>
//                         </select>

//                         <input
//                           value={row.amount}
//                           onChange={(e) =>
//                             handleFeeChange(index, "amount", e.target.value)
//                           }
//                           className={`${inputClass} text-right`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* TOTAL PAID AMT */}
//               <div
//                 className="
//                   mt-2
//                   grid
//                   grid-cols-[1fr_150px]
//                   items-center
//                   gap-2
//                 "
//               >
//                 <span className="text-right text-[10px] font-black text-[#173b5c]">
//                   Total Paid Amt
//                 </span>

//                 <input
//                   readOnly
//                   value={totalPaidAmt}
//                   className={`${inputClass} text-right font-black`}
//                 />
//               </div>
//             </div>

//             {/* DEPOSIT / MODE / REMARKS */}
//             <div
//               className="
//                 mt-2
//                 grid
//                 grid-cols-1
//                 gap-2
//                 sm:grid-cols-2
//                 lg:grid-cols-4
//               "
//             >
//               <div>
//                 <label className={labelClass}>Deposit in</label>

//                 <select
//                   name="depositIn"
//                   value={form.depositIn}
//                   onChange={handleChange}
//                   className={selectClass}
//                 >
//                   <option>School</option>
//                   <option>Bank</option>
//                 </select>
//               </div>

//               <div>
//                 <label className={labelClass}>Mode</label>

//                 <select
//                   name="mode"
//                   value={form.mode}
//                   onChange={handleChange}
//                   className={selectClass}
//                 >
//                   <option>Cash</option>
//                   <option>Cheque</option>
//                   <option>A/C Transfer</option>
//                   <option>Card</option>
//                 </select>
//               </div>

//               <div className="sm:col-span-2 lg:col-span-2">
//                 <label className={labelClass}>Remarks</label>

//                 <input
//                   name="remarks"
//                   value={form.remarks}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             <label
//               className="
//                 mt-2
//                 flex
//                 items-center
//                 gap-1.5
//                 text-[10px]
//                 font-semibold
//                 text-[#173b5c]
//               "
//             >
//               <input
//                 type="checkbox"
//                 name="sendSms"
//                 checked={form.sendSms}
//                 onChange={handleChange}
//                 className="h-3.5 w-3.5 accent-[#174f7b]"
//               />
//               Send SMS
//             </label>
//           </section>

//           {/* RIGHT: SEARCH STUDENT + PAYMENT REF */}
//           <div className="flex flex-col gap-2">
//             <section
//               className="
//                 flex-1
//                 rounded-lg
//                 border
//                 border-[#547c98]
//                 bg-[#d3e2ed]
//                 p-1.5
//               "
//             >
//               <div
//                 className="
//                   mb-1.5
//                   rounded-md
//                   border
//                   border-[#7ca7c2]
//                   bg-[#c7dce9]
//                   px-2
//                   py-1.5
//                   text-[10px]
//                   font-black
//                   text-[#173b5c]
//                 "
//               >
//                 Search Student
//               </div>

//               <input
//                 name="searchStudent"
//                 value={form.searchStudent}
//                 onChange={handleChange}
//                 placeholder="Type to search..."
//                 className={inputClass}
//               />

//               <div
//                 className="
//                   mt-2
//                   h-[140px]
//                   rounded-md
//                   border
//                   border-[#a2b9c8]
//                   bg-[#edf4f8]
//                   lg:h-[200px]
//                 "
//               />
//             </section>

//             <section
//               className="
//                 rounded-lg
//                 border
//                 border-[#547c98]
//                 bg-[#d3e2ed]
//                 p-1.5
//               "
//             >
//               <div className="mb-1.5 flex items-center gap-4 px-1">
//                 <label
//                   className="
//                     flex
//                     items-center
//                     gap-1.5
//                     text-[10px]
//                     font-bold
//                     text-[#173b5c]
//                   "
//                 >
//                   <input
//                     type="radio"
//                     name="paymentType"
//                     value="Cheque"
//                     checked={form.paymentType === "Cheque"}
//                     onChange={handleChange}
//                     className="h-3.5 w-3.5 accent-[#174f7b]"
//                   />
//                   Cheque
//                 </label>

//                 <label
//                   className="
//                     flex
//                     items-center
//                     gap-1.5
//                     text-[10px]
//                     font-bold
//                     text-[#173b5c]
//                   "
//                 >
//                   <input
//                     type="radio"
//                     name="paymentType"
//                     value="A/C Transfer"
//                     checked={form.paymentType === "A/C Transfer"}
//                     onChange={handleChange}
//                     className="h-3.5 w-3.5 accent-[#174f7b]"
//                   />
//                   A/C Transfer
//                 </label>
//               </div>

//               <input
//                 name="paymentRef"
//                 value={form.paymentRef}
//                 onChange={handleChange}
//                 placeholder="Reference no."
//                 className={inputClass}
//               />

//               <div
//                 className="
//                   mt-2
//                   h-[140px]
//                   rounded-md
//                   border
//                   border-[#a2b9c8]
//                   bg-[#edf4f8]
//                 "
//               />
//             </section>
//           </div>
//         </div>
//       </div>

//       {/* ALL ACTION BUTTONS AT BOTTOM */}
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
//           <Button
//             onClick={() => alert("Find student")}
//             icon={Search}
//           >
//             Find Stu
//           </Button>

//           <Button
//             onClick={handleSave}
//             icon={ReceiptIcon}
//           >
//             {saved ? "Saved" : "Save"}
//           </Button>

//           <Button
//             onClick={() => window.print()}
//             icon={Printer}
//           >
//             Print
//           </Button>

//           <Button onClick={onClose}>Cancel</Button>

//           <Button onClick={onClose} icon={X} red>
//             Exit
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { saveForm } from "../../api/formApi";
import { useState } from "react";
import {
  Search,
  Printer,
  X,
  Receipt as ReceiptIcon,
} from "lucide-react";

const FEE_ROWS = 9;

const initialForm = {
  computerId: "",
  admissionNo: "",
  date: "12-09-2026",
  session: "2024 - 25",
  name: "",
  className: "",
  section: "",
  fatherName: "",
  relatedComputerId: "",
  payFor: "",
  depositIn: "School",
  mode: "Cash",
  remarks: "",
  sendSms: true,
  paymentType: "Cheque",
  paymentRef: "",
  searchStudent: "",
};

const emptyForm = {
  computerId: "",
  admissionNo: "",
  date: "",
  session: "",
  name: "",
  className: "",
  section: "",
  fatherName: "",
  relatedComputerId: "",
  payFor: "",
  depositIn: "",
  mode: "",
  remarks: "",
  sendSms: false,
  paymentType: "",
  paymentRef: "",
  searchStudent: "",
};

function createFeeRows() {
  return Array.from({ length: FEE_ROWS }, () => ({
    caption: "",
    amount: "0",
  }));
}

export default function BlankReceipt({ onClose }) {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [feeRows, setFeeRows] = useState(createFeeRows());

  async function handleSave() {
    try {
      const data = {
        ...form,
        feeRows,
        totalPaidAmt,
      };

      const fakeForm = document.createElement("form");

      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.name = key;
        input.value =
          typeof value === "string" ? value : JSON.stringify(value);

        fakeForm.appendChild(input);
      });

      await saveForm("blankReceipt", fakeForm);

      // Clear form only after successful DB save
      setForm(emptyForm);
      setFeeRows(createFeeRows());

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2200);
    } catch (err) {
      alert(err.message || "Unable to save blank receipt.");
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleFeeChange(index, field, value) {
    setFeeRows((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    );
  }

  const totalPaidAmt = feeRows.reduce(
    (sum, row) => sum + (Number(row.amount) || 0),
    0
  );

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

  const selectClass = inputClass;

  const labelClass = `
    mb-0.5
    block
    whitespace-nowrap
    text-[10px]
    font-semibold
    text-[#173b5c]
  `;

  const Button = ({
    type = "button",
    onClick,
    icon: Icon,
    children,
    red = false,
  }) => (
    <button
      type={type}
      onClick={onClick}
      className={`
        flex
        h-9
        min-w-[90px]
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

        ${
          red
            ? `
              border-red-500
              bg-red-600
              text-white
              shadow-[0_0_8px_rgba(239,68,68,0.25)]
              hover:bg-red-700
              hover:shadow-[0_0_14px_rgba(239,68,68,0.5)]
            `
            : `
              border-[#5685a6]
              bg-[#e4eef6]
              text-[#153b5a]
              hover:border-[#0b5fa5]
              hover:bg-[#d3e6f3]
              hover:shadow-[0_0_10px_rgba(11,95,165,0.18)]
            `
        }
      `}
    >
      {Icon && <Icon size={14} strokeWidth={2.5} />}
      <span>{children}</span>
    </button>
  );

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
            <ReceiptIcon size={15} strokeWidth={2.8} />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
            Blank Receipt
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

      {/* SCROLLABLE FORM CONTENT */}
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
        <div
          className="
            grid
            grid-cols-1
            gap-2
            lg:grid-cols-[minmax(0,1fr)_270px]
          "
        >
          {/* LEFT */}
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
                mb-1.5
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
              Student Details
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-2
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
              "
            >
              <div>
                <label className={labelClass}>Computer ID</label>
                <input
                  name="computerId"
                  value={form.computerId}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Adm No</label>
                <input
                  name="admissionNo"
                  value={form.admissionNo}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Date</label>
                <input
                  type="date"
                  name="date"
                  className={inputClass}
                  value={
                    form.date
                      ? form.date.split("-").reverse().join("-")
                      : ""
                  }
                  onChange={(e) => {
                    const parts = e.target.value.split("-");

                    if (parts.length === 3) {
                      setForm((prev) => ({
                        ...prev,
                        date: `${parts[2]}-${parts[1]}-${parts[0]}`,
                      }));
                    }
                  }}
                />
              </div>

              <div>
                <label className={labelClass}>Session</label>
                <select
                  name="session"
                  value={form.session}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select Session</option>
                  <option>2024 - 25</option>
                  <option>2025 - 26</option>
                  <option>2026 - 27</option>
                </select>
              </div>
            </div>

            <div
              className="
                mt-2
                grid
                grid-cols-1
                gap-2
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              <div>
                <label className={labelClass}>Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Class</label>
                <select
                  name="className"
                  value={form.className}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select Class</option>
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
              </div>

              <div>
                <label className={labelClass}>Section</label>
                <select
                  name="section"
                  value={form.section}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Related Computer Id</label>
                <input
                  name="relatedComputerId"
                  value={form.relatedComputerId}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div
              className="
                mt-2
                grid
                grid-cols-1
                gap-2
                sm:grid-cols-2
              "
            >
              <div>
                <label className={labelClass}>Father's Name</label>
                <input
                  name="fatherName"
                  value={form.fatherName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Pay For</label>
                <input
                  name="payFor"
                  value={form.payFor}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* FEE DETAILS */}
            <div
              className="
                mt-3
                rounded-lg
                border
                border-[#547c98]
                bg-[#d9e7f2]
                p-1.5
              "
            >
              <div
                className="
                  mb-1.5
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
                Fee Details
              </div>

              <div
                className="
                  overflow-x-auto
                  rounded-md
                  border
                  border-[#567b94]
                  bg-[#e3edf5]
                  p-1
                "
              >
                <div className="min-w-[420px]">
                  <div
                    className="
                      grid
                      grid-cols-[1fr_150px]
                      overflow-hidden
                      rounded-md
                      border
                      border-[#7698ad]
                      bg-[#c7dce9]
                      text-[9px]
                      font-black
                      text-[#173b5c]
                    "
                  >
                    <div className="border-r border-[#7698ad] px-1.5 py-1">
                      Fee Caption
                    </div>

                    <div className="px-1.5 py-1 text-right">
                      Amount Paid
                    </div>
                  </div>

                  <div className="mt-1 space-y-1">
                    {feeRows.map((row, index) => (
                      <div
                        key={index}
                        className="
                          grid
                          grid-cols-[1fr_150px]
                          items-center
                          gap-1.5
                        "
                      >
                        <select
                          value={row.caption}
                          onChange={(e) =>
                            handleFeeChange(
                              index,
                              "caption",
                              e.target.value
                            )
                          }
                          className={selectClass}
                        >
                          <option value="">Select Fee Caption</option>
                        </select>

                        <input
                          value={row.amount}
                          onChange={(e) =>
                            handleFeeChange(
                              index,
                              "amount",
                              e.target.value
                            )
                          }
                          className={`${inputClass} text-right`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="
                  mt-2
                  grid
                  grid-cols-[1fr_150px]
                  items-center
                  gap-2
                "
              >
                <span className="text-right text-[10px] font-black text-[#173b5c]">
                  Total Paid Amt
                </span>

                <input
                  readOnly
                  value={totalPaidAmt}
                  className={`${inputClass} text-right font-black`}
                />
              </div>
            </div>

            {/* DEPOSIT / MODE / REMARKS */}
            <div
              className="
                mt-2
                grid
                grid-cols-1
                gap-2
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              <div>
                <label className={labelClass}>Deposit in</label>

                <select
                  name="depositIn"
                  value={form.depositIn}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select</option>
                  <option>School</option>
                  <option>Bank</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Mode</label>

                <select
                  name="mode"
                  value={form.mode}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select</option>
                  <option>Cash</option>
                  <option>Cheque</option>
                  <option>A/C Transfer</option>
                  <option>Card</option>
                </select>
              </div>

              <div className="sm:col-span-2 lg:col-span-2">
                <label className={labelClass}>Remarks</label>

                <input
                  name="remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <label
              className="
                mt-2
                flex
                items-center
                gap-1.5
                text-[10px]
                font-semibold
                text-[#173b5c]
              "
            >
              <input
                type="checkbox"
                name="sendSms"
                checked={form.sendSms}
                onChange={handleChange}
                className="h-3.5 w-3.5 accent-[#174f7b]"
              />

              Send SMS
            </label>
          </section>

          {/* RIGHT */}
          <div className="flex flex-col gap-2">
            <section
              className="
                flex-1
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
                  rounded-md
                  border
                  border-[#7ca7c2]
                  bg-[#c7dce9]
                  px-2
                  py-1.5
                  text-[10px]
                  font-black
                  text-[#173b5c]
                "
              >
                Search Student
              </div>

              <input
                name="searchStudent"
                value={form.searchStudent}
                onChange={handleChange}
                placeholder="Type to search..."
                className={inputClass}
              />

              <div
                className="
                  mt-2
                  h-[140px]
                  rounded-md
                  border
                  border-[#a2b9c8]
                  bg-[#edf4f8]
                  lg:h-[200px]
                "
              />
            </section>

            <section
              className="
                rounded-lg
                border
                border-[#547c98]
                bg-[#d3e2ed]
                p-1.5
              "
            >
              <div className="mb-1.5 flex items-center gap-4 px-1">
                <label
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-[10px]
                    font-bold
                    text-[#173b5c]
                  "
                >
                  <input
                    type="radio"
                    name="paymentType"
                    value="Cheque"
                    checked={form.paymentType === "Cheque"}
                    onChange={handleChange}
                    className="h-3.5 w-3.5 accent-[#174f7b]"
                  />

                  Cheque
                </label>

                <label
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-[10px]
                    font-bold
                    text-[#173b5c]
                  "
                >
                  <input
                    type="radio"
                    name="paymentType"
                    value="A/C Transfer"
                    checked={form.paymentType === "A/C Transfer"}
                    onChange={handleChange}
                    className="h-3.5 w-3.5 accent-[#174f7b]"
                  />

                  A/C Transfer
                </label>
              </div>

              <input
                name="paymentRef"
                value={form.paymentRef}
                onChange={handleChange}
                placeholder="Reference no."
                className={inputClass}
              />

              <div
                className="
                  mt-2
                  h-[140px]
                  rounded-md
                  border
                  border-[#a2b9c8]
                  bg-[#edf4f8]
                "
              />
            </section>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
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
          <Button
            onClick={() => alert("Find student")}
            icon={Search}
          >
            Find Stu
          </Button>

          <Button onClick={handleSave} icon={ReceiptIcon}>
            {saved ? "Saved" : "Save"}
          </Button>

          <Button
            onClick={() => window.print()}
            icon={Printer}
          >
            Print
          </Button>

          <Button onClick={onClose}>Cancel</Button>

          <Button onClick={onClose} icon={X} red>
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
}

