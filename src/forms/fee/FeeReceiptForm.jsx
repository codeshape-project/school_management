// import { saveForm } from "../../api/formApi";
// import { useState } from "react";
// import {
//   Search,
//   Printer,
//   Plus,
//   X,
//   Receipt as ReceiptIcon,
//   Calculator,
//   PlusCircle,
// } from "lucide-react";

// export default function FeeReceiptForm({ onClose }) {
//   const [saved, setSaved] = useState(false);

//   const [form, setForm] = useState({
//     recDate: "12-09-2026",
//     session: "2024 - 25",
//     computerId: "",
//     admissionNo: "",
//     name: "",
//     fatherName: "",
//     className: "",
//     section: "",
//     siblings: "",
//     paidMonths: "",
//     payFor: "",
//     totalDuesAmt: "",
//     cashDiscount: "",
//     totalPaidAmt: "",
//     balanceAmt: "",
//     depositIn: "School",
//     mode: "",
//     bottomTotalDuesAmt: "",
//     remarks: "",
//     sendSms: true,
//     searchClass: "ALL",
//     searchSection: "ALL",
//     searchStudent: "",
//     paymentType: "Net Banking",
//     paymentRef: "",
//     rememberRemarks: "",
//   });

//   function handleChange(e) {
//     const { name, value, type, checked } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }

//   async function submit(e) {
//     e.preventDefault();

//     try {
//       await saveForm("receipt", e.currentTarget);
//       setSaved(true);

//     setTimeout(() => {
//       setSaved(false);
//     }, 2200);
//     } catch (err) {
//       alert(err.message || "Unable to save data.");
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
//     green = false,
//     blue = false,
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
//             : green
//             ? `
//               border-emerald-600
//               bg-emerald-600
//               text-white
//               hover:bg-emerald-700
//               hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]
//             `
//             : blue
//             ? `
//               border-[#174f7b]
//               bg-[#174f7b]
//               text-white
//               hover:bg-[#123f65]
//               hover:shadow-[0_0_10px_rgba(23,79,123,0.35)]
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
//     <form
//       onSubmit={submit}
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
//       {/* HEADER - icon, title, cut button only */}
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
//             Receipt
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
//         {/* STUDENT DETAILS */}
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
//               md:grid-cols-3
//               lg:grid-cols-5
//             "
//           >
//             <div>
//               <label className={labelClass}>Rec. Date</label>

//               <input
//                 type="date"
//                 className={inputClass}
//                 value={
//                   form.recDate
//                     ? form.recDate.split("-").reverse().join("-")
//                     : ""
//                 }
//                 onChange={(e) => {
//                   const parts = e.target.value.split("-");

//                   if (parts.length === 3) {
//                     setForm((prev) => ({
//                       ...prev,
//                       recDate: `${parts[2]}-${parts[1]}-${parts[0]}`,
//                     }));
//                   }
//                 }}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Session</label>

//               <select
//                 name="session"
//                 value={form.session}
//                 onChange={handleChange}
//                 className={selectClass}
//               >
//                 <option>2024 - 25</option>
//                 <option>2025 - 26</option>
//                 <option>2026 - 27</option>
//               </select>
//             </div>

//             <div>
//               <label className={labelClass}>Computer ID</label>

//               <input
//                 name="computerId"
//                 value={form.computerId}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Adm No</label>

//               <input
//                 name="admissionNo"
//                 value={form.admissionNo}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Name</label>

//               <input
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           <div
//             className="
//               mt-2
//               grid
//               grid-cols-1
//               gap-2
//               sm:grid-cols-2
//               lg:grid-cols-4
//             "
//           >
//             <div>
//               <label className={labelClass}>Father's Name</label>

//               <input
//                 name="fatherName"
//                 value={form.fatherName}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Class</label>

//               <select
//                 name="className"
//                 value={form.className}
//                 onChange={handleChange}
//                 className={selectClass}
//               >
//                 <option value="">Select Class</option>
//                 <option>Nursery</option>
//                 <option>LKG</option>
//                 <option>UKG</option>
//                 <option>1</option>
//                 <option>2</option>
//                 <option>3</option>
//                 <option>4</option>
//                 <option>5</option>
//                 <option>6</option>
//                 <option>7</option>
//                 <option>8</option>
//                 <option>9</option>
//                 <option>10</option>
//                 <option>11</option>
//                 <option>12</option>
//               </select>
//             </div>

//             <div>
//               <label className={labelClass}>Section</label>

//               <select
//                 name="section"
//                 value={form.section}
//                 onChange={handleChange}
//                 className={selectClass}
//               >
//                 <option value="">Select</option>
//                 <option>A</option>
//                 <option>B</option>
//                 <option>C</option>
//                 <option>D</option>
//               </select>
//             </div>

//             <div>
//               <label className={labelClass}>Siblings</label>

//               <input
//                 name="siblings"
//                 value={form.siblings}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           <div
//             className="
//               mt-2
//               grid
//               grid-cols-1
//               gap-2
//               sm:grid-cols-2
//             "
//           >
//             <div>
//               <label className={labelClass}>Paid Months</label>

//               <input
//                 name="paidMonths"
//                 value={form.paidMonths}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Pay For</label>

//               <input
//                 name="payFor"
//                 value={form.payFor}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           <label
//             className="
//               mt-2
//               flex
//               items-center
//               gap-1.5
//               text-[10px]
//               font-semibold
//               text-[#173b5c]
//             "
//           >
//             <input
//               type="radio"
//               name="collectionType"
//               defaultChecked
//               className="h-3.5 w-3.5 accent-[#174f7b]"
//             />
//             Combined
//           </label>
//         </section>

//         {/* MAIN LAYOUT: MONTHS TABLE + AMOUNTS + SEARCH/PAYMENT */}
//         <div
//           className="
//             mt-2
//             grid
//             grid-cols-1
//             gap-2
//             lg:grid-cols-[220px_minmax(0,1fr)_260px]
//           "
//         >
//           {/* MONTHS / DUES TABLE */}
//           <section
//             className="
//               rounded-lg
//               border
//               border-[#547c98]
//               bg-[#d9e7f2]
//               p-1.5
//             "
//           >
//             <div
//               className="
//                 grid
//                 grid-cols-[26px_1fr_70px]
//                 overflow-hidden
//                 rounded-md
//                 border
//                 border-[#7698ad]
//                 bg-[#c7dce9]
//                 text-[9px]
//                 font-black
//                 text-[#173b5c]
//               "
//             >
//               <div className="border-r border-[#7698ad] px-1 py-1">
//                 <input
//                   type="checkbox"
//                   className="h-3 w-3 accent-[#174f7b]"
//                 />
//               </div>
//               <div className="border-r border-[#7698ad] px-1.5 py-1">
//                 Months
//               </div>
//               <div className="px-1.5 py-1">Dues</div>
//             </div>

//             <div
//               className="
//                 mt-1
//                 h-[190px]
//                 rounded-md
//                 border
//                 border-[#a2b9c8]
//                 bg-[#edf4f8]
//               "
//             />

//             <div className="mt-1.5">
//               <label className={labelClass}>Total Dues Amt</label>

//               <input
//                 name="bottomTotalDuesAmt"
//                 value={form.bottomTotalDuesAmt}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </section>

//           {/* AMOUNT PANEL */}
//           <section
//             className="
//               flex
//               flex-col
//               rounded-lg
//               border
//               border-[#547c98]
//               bg-[#d3e2ed]
//               p-1.5
//             "
//           >
//             <div className="flex flex-1 items-center justify-center rounded-md border border-[#a2b9c8] bg-[#edf4f8] py-3">
//               <Calculator
//                 size={28}
//                 strokeWidth={1.8}
//                 className="text-[#7ca7c2]"
//               />
//             </div>

//             <div className="mt-1.5 grid grid-cols-2 gap-2">
//               <div>
//                 <label className={labelClass}>Total Dues Amt</label>

//                 <input
//                   name="totalDuesAmt"
//                   value={form.totalDuesAmt}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Cash Discount</label>

//                 <input
//                   name="cashDiscount"
//                   value={form.cashDiscount}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Total Paid Amt</label>

//                 <input
//                   name="totalPaidAmt"
//                   value={form.totalPaidAmt}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Balance Amt</label>

//                 <input
//                   name="balanceAmt"
//                   value={form.balanceAmt}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>

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
//                   <option value="">Select</option>
//                   <option>Cash</option>
//                   <option>Cheque</option>
//                   <option>Net Banking</option>
//                   <option>Card</option>
//                 </select>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={() => alert("Added in list")}
//               className="
//                 mt-1.5
//                 flex
//                 h-8
//                 w-full
//                 items-center
//                 justify-center
//                 gap-1.5
//                 rounded-md
//                 border
//                 border-[#174f7b]
//                 bg-[#174f7b]
//                 text-[11px]
//                 font-extrabold
//                 text-white
//                 transition-all
//                 hover:bg-[#123f65]
//                 hover:shadow-[0_0_10px_rgba(23,79,123,0.35)]
//                 active:scale-[0.97]
//               "
//             >
//               <PlusCircle size={14} strokeWidth={2.5} />
//               Add In
//             </button>

//             <div className="mt-1.5">
//               <label className={labelClass}>Remarks</label>

//               <input
//                 name="remarks"
//                 value={form.remarks}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <label
//               className="
//                 mt-1.5
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

//           {/* SEARCH STUDENT + PAYMENT TYPE */}
//           <div className="flex flex-col gap-2">
//             <section
//               className="
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
//                   py-1
//                   text-[10px]
//                   font-black
//                   text-[#173b5c]
//                 "
//               >
//                 Search Student
//               </div>

//               <div className="grid grid-cols-[1fr_1fr_60px] items-end gap-1.5">
//                 <div>
//                   <label className={labelClass}>Class</label>

//                   <select
//                     name="searchClass"
//                     value={form.searchClass}
//                     onChange={handleChange}
//                     className={selectClass}
//                   >
//                     <option>ALL</option>
//                     <option>Nursery</option>
//                     <option>LKG</option>
//                     <option>UKG</option>
//                     <option>1</option>
//                     <option>2</option>
//                     <option>3</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Section</label>

//                   <select
//                     name="searchSection"
//                     value={form.searchSection}
//                     onChange={handleChange}
//                     className={selectClass}
//                   >
//                     <option>ALL</option>
//                     <option>A</option>
//                     <option>B</option>
//                     <option>C</option>
//                   </select>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => alert("Show students")}
//                   className="
//                     flex
//                     h-7
//                     items-center
//                     justify-center
//                     gap-1
//                     rounded-md
//                     border
//                     border-[#5685a6]
//                     bg-[#e4eef6]
//                     text-[10px]
//                     font-extrabold
//                     text-[#153b5a]
//                     transition-all
//                     hover:border-[#0b5fa5]
//                     hover:bg-[#d3e6f3]
//                   "
//                 >
//                   <Search size={12} strokeWidth={2.5} />
//                   Show
//                 </button>
//               </div>

//               <input
//                 name="searchStudent"
//                 value={form.searchStudent}
//                 onChange={handleChange}
//                 placeholder="Type to search..."
//                 className={`${inputClass} mt-1.5`}
//               />

//               <div
//                 className="
//                   mt-1.5
//                   h-[100px]
//                   rounded-md
//                   border
//                   border-[#a2b9c8]
//                   bg-[#edf4f8]
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
//               <div className="mb-1.5 flex flex-wrap items-center gap-2 px-0.5">
//                 <label
//                   className="
//                     flex
//                     items-center
//                     gap-1
//                     text-[9px]
//                     font-bold
//                     text-[#173b5c]
//                   "
//                 >
//                   <input
//                     type="radio"
//                     name="paymentType"
//                     value="Unclaimed Transaction"
//                     checked={form.paymentType === "Unclaimed Transaction"}
//                     onChange={handleChange}
//                     className="h-3 w-3 accent-[#174f7b]"
//                   />
//                   Unclaimed Transaction
//                 </label>

//                 <label
//                   className="
//                     flex
//                     items-center
//                     gap-1
//                     text-[9px]
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
//                     className="h-3 w-3 accent-[#174f7b]"
//                   />
//                   Cheque
//                 </label>

//                 <label
//                   className="
//                     flex
//                     items-center
//                     gap-1
//                     text-[9px]
//                     font-bold
//                     text-[#173b5c]
//                   "
//                 >
//                   <input
//                     type="radio"
//                     name="paymentType"
//                     value="Net Banking"
//                     checked={form.paymentType === "Net Banking"}
//                     onChange={handleChange}
//                     className="h-3 w-3 accent-[#174f7b]"
//                   />
//                   Net Banking
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
//                   mt-1.5
//                   h-[100px]
//                   rounded-md
//                   border
//                   border-[#a2b9c8]
//                   bg-[#edf4f8]
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
//               <div
//                 className="
//                   mb-1.5
//                   rounded-md
//                   border
//                   border-[#7ca7c2]
//                   bg-[#c7dce9]
//                   px-2
//                   py-1
//                   text-[10px]
//                   font-black
//                   text-[#173b5c]
//                 "
//               >
//                 Remarks (From Remember)
//               </div>

//               <textarea
//                 name="rememberRemarks"
//                 value={form.rememberRemarks}
//                 onChange={handleChange}
//                 rows={2}
//                 className="
//                   w-full
//                   resize-none
//                   rounded-md
//                   border
//                   border-[#79a9c9]
//                   bg-white
//                   px-2
//                   py-1
//                   text-[11px]
//                   font-semibold
//                   text-slate-800
//                   outline-none
//                   transition
//                   focus:border-[#0b5fa5]
//                   focus:ring-1
//                   focus:ring-[#0b5fa5]/30
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
//             type="button"
//             onClick={() => alert("Find Student")}
//             icon={Search}
//           >
//             Find Student
//           </Button>

//           <Button
//             type="button"
//             onClick={() => alert("Allot Transport")}
//           >
//             Allot Transport
//           </Button>

//           <Button
//             type="button"
//             onClick={() => alert("Ledger")}
//           >
//             Ledger
//           </Button>

//           <Button
//             type="submit"
//             icon={Plus}
//             blue
//           >
//             Collect
//           </Button>

//           <Button
//             type="button"
//             onClick={() => alert("Cash Discount")}
//           >
//             Cash Discount
//           </Button>

//           <Button
//             type="button"
//             onClick={() => window.location.reload()}
//           >
//             New
//           </Button>

//           <Button
//             type="button"
//             onClick={() => {
//               setSaved(true);
//               window.print();
//             }}
//             icon={Printer}
//             green
//           >
//             Save And Print
//           </Button>

//           <Button
//             type="button"
//             onClick={onClose}
//             icon={X}
//             red
//           >
//             Exit
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// }


import { saveForm, searchRecords } from "../../api/formApi";
import FeeReceiptPreview from "../../components/FeeReceiptPreview";
import { buildReceiptData } from "../../utils/feeReceipt";
import { useEffect, useState } from "react";

import {
  Search,
  Printer,
  Plus,
  X,
  Receipt as ReceiptIcon,
  Calculator,
  PlusCircle,
} from "lucide-react";

const initialForm = {
  recDate: "12-09-2026",
  session: "2024 - 25",
  computerId: "",
  admissionNo: "",
  name: "",
  fatherName: "",
  className: "",
    section: "",
  rollNo: "",
  category: "",
  siblings: "",
  paidMonths: "",
  payFor: "",
  totalDuesAmt: "",
  cashDiscount: "",
  totalPaidAmt: "",
  balanceAmt: "",
  depositIn: "School",
  mode: "",
  bottomTotalDuesAmt: "",
  remarks: "",
  sendSms: true,
  collectionType: "Combined",
  searchClass: "ALL",
  searchSection: "ALL",
  searchStudent: "",
  paymentType: "Net Banking",
  paymentRef: "",
  rememberRemarks: "",
};

export default function FeeReceiptForm({ onClose }) {
  const [saved, setSaved] = useState(false);
    const [form, setForm] = useState(initialForm);

  // fee receipt slip (shown after payment is saved, or from the Print button)
  const [slip, setSlip] = useState(null);
  const [lastSlip, setLastSlip] = useState(null);

  /* ---------- search student ---------- */
  const [showTick, setShowTick] = useState(0);

  const searchClassValue =
    form.searchClass === "ALL" ? "" : form.searchClass;
  const searchSectionValue =
    form.searchSection === "ALL" ? "" : form.searchSection;

  const studentSearch = useStudentSearch(
    form.searchStudent,
    searchClassValue,
    searchSectionValue,
    showTick
  );

  // fill the receipt form from the selected student
  function pickStudent(row) {
    const d = row.form_data || {};

    // this form's class list is Nursery, LKG, UKG, 1, 2, 3 ... (no "Class " prefix)
    const rawClass = String(row.class_name || d.className || "");
    const className = /^select/i.test(rawClass)
      ? ""
      : rawClass.replace(/^class\s*/i, "");

    setForm((prev) => ({
      ...prev,
      admissionNo: row.admission_no || d.admissionNo || prev.admissionNo,
      computerId: d.computerId || prev.computerId,
      name: row.name || d.name || prev.name,
      fatherName: d.fatherName || prev.fatherName,
      className: className || prev.className,
      section: row.section || d.section || prev.section,
      rollNo: d.classRollNo || d.rollNo || prev.rollNo,
      category: d.category || prev.category,
      searchStudent: "",
    }));
  }

  // keep "Mode" and the payment type radio the same value
  function handleModeChange(e) {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      mode: value,
      paymentType:
        value === "Cheque" || value === "Net Banking"
          ? value
          : value
          ? ""
          : prev.paymentType,
    }));
  }

  function handlePaymentTypeChange(e) {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      paymentType: value,
      mode:
        value === "Cheque" || value === "Net Banking" ? value : prev.mode,
    }));
  }
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function resetForm() {
    setForm({
      ...initialForm,
      recDate: "",
      session: "",
      depositIn: "",
      collectionType: "",
      sendSms: false,
      paymentType: "",
      searchClass: "",
      searchSection: "",
    });
  }

  async function submit(e) {
    e.preventDefault();

    const formElement = e.currentTarget;

    try {
                 const data = Object.fromEntries(new FormData(formElement).entries());

      // search box values are not part of the receipt
      delete data.searchClass;
      delete data.searchSection;
      delete data.searchStudent;

      // one payment mode, stored in the database and printed on the slip
      data.paymentMode = form.mode || form.paymentType || "";
      data.category = form.category || "";

      const result = await saveForm("receipt", data);

      // build the receipt slip from the values paid, before the form is cleared
      const slipData = buildReceiptData(form, result?.data?.record_no || "");

      // Clear React-controlled fields after successful DB save
      resetForm();

      setLastSlip(slipData);
      setSlip(slipData);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2200);
    } catch (err) {
      alert(err.message || "Unable to save data.");
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
    green = false,
    blue = false,
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
            : green
            ? `
              border-emerald-600
              bg-emerald-600
              text-white
              hover:bg-emerald-700
              hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]
            `
            : blue
            ? `
              border-[#174f7b]
              bg-[#174f7b]
              text-white
              hover:bg-[#123f65]
              hover:shadow-[0_0_10px_rgba(23,79,123,0.35)]
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
            <ReceiptIcon size={15} strokeWidth={2.8} />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
            Receipt
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
        {/* STUDENT DETAILS */}
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
              md:grid-cols-3
              lg:grid-cols-5
            "
          >
            <div>
              <label className={labelClass}>Rec. Date</label>

              <input
                type="date"
                name="recDate"
                className={inputClass}
                value={
                  form.recDate
                    ? form.recDate.split("-").reverse().join("-")
                    : ""
                }
                onChange={(e) => {
                  const parts = e.target.value.split("-");

                  if (parts.length === 3) {
                    setForm((prev) => ({
                      ...prev,
                      recDate: `${parts[2]}-${parts[1]}-${parts[0]}`,
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
              <label className={labelClass}>Name</label>

              <input
                name="name"
                value={form.name}
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
              lg:grid-cols-5
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
              <label className={labelClass}>Roll No</label>

              <input
                name="rollNo"
                value={form.rollNo}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Siblings</label>

              <input
                name="siblings"
                value={form.siblings}
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
              <label className={labelClass}>Paid Months</label>

              <input
                name="paidMonths"
                value={form.paidMonths}
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
              type="radio"
              name="collectionType"
              value="Combined"
              checked={form.collectionType === "Combined"}
              onChange={handleChange}
              className="h-3.5 w-3.5 accent-[#174f7b]"
            />

            Combined
          </label>
        </section>

        {/* MAIN LAYOUT */}
        <div
          className="
            mt-2
            grid
            grid-cols-1
            gap-2
            lg:grid-cols-[220px_minmax(0,1fr)_260px]
          "
        >
          {/* MONTHS / DUES TABLE */}
          <section
            className="
              rounded-lg
              border
              border-[#547c98]
              bg-[#d9e7f2]
              p-1.5
            "
          >
            <div
              className="
                grid
                grid-cols-[26px_1fr_70px]
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
              <div className="border-r border-[#7698ad] px-1 py-1">
                <input
                  type="checkbox"
                  className="h-3 w-3 accent-[#174f7b]"
                />
              </div>

              <div className="border-r border-[#7698ad] px-1.5 py-1">
                Months
              </div>

              <div className="px-1.5 py-1">
                Dues
              </div>
            </div>

            <div
              className="
                mt-1
                h-[190px]
                rounded-md
                border
                border-[#a2b9c8]
                bg-[#edf4f8]
              "
            />

            <div className="mt-1.5">
              <label className={labelClass}>
                Total Dues Amt
              </label>

              <input
                name="bottomTotalDuesAmt"
                value={form.bottomTotalDuesAmt}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </section>

          {/* AMOUNT PANEL */}
          <section
            className="
              flex
              flex-col
              rounded-lg
              border
              border-[#547c98]
              bg-[#d3e2ed]
              p-1.5
            "
          >
            <div
              className="
                flex
                flex-1
                items-center
                justify-center
                rounded-md
                border
                border-[#a2b9c8]
                bg-[#edf4f8]
                py-3
              "
            >
              <Calculator
                size={28}
                strokeWidth={1.8}
                className="text-[#7ca7c2]"
              />
            </div>

            <div className="mt-1.5 grid grid-cols-2 gap-2">
              <div>
                <label className={labelClass}>
                  Total Dues Amt
                </label>

                <input
                  name="totalDuesAmt"
                  value={form.totalDuesAmt}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Cash Discount
                </label>

                <input
                  name="cashDiscount"
                  value={form.cashDiscount}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Total Paid Amt
                </label>

                <input
                  name="totalPaidAmt"
                  value={form.totalPaidAmt}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Balance Amt
                </label>

                <input
                  name="balanceAmt"
                  value={form.balanceAmt}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Deposit in
                </label>

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
                <label className={labelClass}>
                  Mode
                </label>

                <select
                  name="mode"
                  value={form.mode}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select</option>
                  <option>Cash</option>
                  <option>Cheque</option>
                  <option>Net Banking</option>
                  <option>Card</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert("Added in list")}
              className="
                mt-1.5
                flex
                h-8
                w-full
                items-center
                justify-center
                gap-1.5
                rounded-md
                border
                border-[#174f7b]
                bg-[#174f7b]
                text-[11px]
                font-extrabold
                text-white
                transition-all
                hover:bg-[#123f65]
                hover:shadow-[0_0_10px_rgba(23,79,123,0.35)]
                active:scale-[0.97]
              "
            >
              <PlusCircle size={14} strokeWidth={2.5} />
              Add In
            </button>

            <div className="mt-1.5">
              <label className={labelClass}>
                Remarks
              </label>

              <input
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <label
              className="
                mt-1.5
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

          {/* SEARCH STUDENT + PAYMENT TYPE */}
          <div className="flex flex-col gap-2">
            {/* SEARCH STUDENT */}
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
                  rounded-md
                  border
                  border-[#7ca7c2]
                  bg-[#c7dce9]
                  px-2
                  py-1
                  text-[10px]
                  font-black
                  text-[#173b5c]
                "
              >
                Search Student
              </div>

              <div className="grid grid-cols-[1fr_1fr_60px] items-end gap-1.5">
                <div>
                  <label className={labelClass}>
                    Class
                  </label>

                  <select
                    name="searchClass"
                    value={form.searchClass}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">ALL</option>
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
                  <label className={labelClass}>
                    Section
                  </label>

                  <select
                    name="searchSection"
                    value={form.searchSection}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">ALL</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>

                <button
                  type="button"
                                    onClick={() => {
                    if (!searchClassValue && !searchSectionValue && !form.searchStudent.trim()) {
                      alert("Select a class / section or type a name to search.");
                      return;
                    }

                    setShowTick((n) => n + 1);
                  }}
                  className="
                    flex
                    h-7
                    items-center
                    justify-center
                    gap-1
                    rounded-md
                    border
                    border-[#5685a6]
                    bg-[#e4eef6]
                    text-[10px]
                    font-extrabold
                    text-[#153b5a]
                    transition-all
                    hover:border-[#0b5fa5]
                    hover:bg-[#d3e6f3]
                  "
                >
                  <Search size={12} strokeWidth={2.5} />
                  Show
                </button>
              </div>

              <input
                              name="searchStudent"
                value={form.searchStudent}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setShowTick((n) => n + 1);
                  }
                }}
                placeholder="Type to search..."
                className={`${inputClass} mt-1.5`}
              />

              <div
                className="
                  mt-1.5
                  h-[100px]
                  overflow-y-auto
                  rounded-md
                  border
                  border-[#a2b9c8]
                  bg-[#edf4f8]
                  p-1
                "
              >
                <SearchList
                  search={studentSearch}
                  onPick={pickStudent}
                />
              </div>

              <div
                className="
                  mt-1.5
                  h-[100px]
                  rounded-md
                  border
                  border-[#a2b9c8]
                  bg-[#edf4f8]
                "
              />
            </section>

            {/* PAYMENT TYPE */}
            <section
              className="
                rounded-lg
                border
                border-[#547c98]
                bg-[#d3e2ed]
                p-1.5
              "
            >
              <div className="mb-1.5 flex flex-wrap items-center gap-2 px-0.5">
                <label
                  className="
                    flex
                    items-center
                    gap-1
                    text-[9px]
                    font-bold
                    text-[#173b5c]
                  "
                >
                  <input
                    type="radio"
                    name="paymentType"
                    value="Unclaimed Transaction"
                    checked={
                      form.paymentType === "Unclaimed Transaction"
                    }
                    onChange={handleChange}
                    className="h-3 w-3 accent-[#174f7b]"
                  />

                  Unclaimed Transaction
                </label>

                <label
                  className="
                    flex
                    items-center
                    gap-1
                    text-[9px]
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
                    className="h-3 w-3 accent-[#174f7b]"
                  />

                  Cheque
                </label>

                <label
                  className="
                    flex
                    items-center
                    gap-1
                    text-[9px]
                    font-bold
                    text-[#173b5c]
                  "
                >
                  <input
                    type="radio"
                    name="paymentType"
                    value="Net Banking"
                    checked={form.paymentType === "Net Banking"}
                    onChange={handleChange}
                    className="h-3 w-3 accent-[#174f7b]"
                  />

                  Net Banking
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
                  mt-1.5
                  h-[100px]
                  rounded-md
                  border
                  border-[#a2b9c8]
                  bg-[#edf4f8]
                "
              />
            </section>

            {/* REMEMBER REMARKS */}
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
                  rounded-md
                  border
                  border-[#7ca7c2]
                  bg-[#c7dce9]
                  px-2
                  py-1
                  text-[10px]
                  font-black
                  text-[#173b5c]
                "
              >
                Remarks (From Remember)
              </div>

              <textarea
                name="rememberRemarks"
                value={form.rememberRemarks}
                onChange={handleChange}
                rows={2}
                className="
                  w-full
                  resize-none
                  rounded-md
                  border
                  border-[#79a9c9]
                  bg-white
                  px-2
                  py-1
                  text-[11px]
                  font-semibold
                  text-slate-800
                  outline-none
                  transition
                  focus:border-[#0b5fa5]
                  focus:ring-1
                  focus:ring-[#0b5fa5]/30
                "
              />
            </section>
          </div>
        </div>
      </div>

      {/* ALL ACTION BUTTONS */}
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
          {/* <Button
            type="button"
            onClick={() => alert("Find Student")}
            icon={Search}
          >
            Find Student
          </Button>

          <Button
            type="button"
            onClick={() => alert("Allot Transport")}
          >
            Allot Transport
          </Button>

          <Button
            type="button"
            onClick={() => alert("Ledger")}
          >
            Ledger
          </Button> */}

          <Button
            type="submit"
            icon={Plus}
            green
          >
            Save
          </Button>

          {/* <Button
            type="button"
            onClick={() => alert("Cash Discount")}
          >
            Cash Discount
          </Button>

          <Button
            type="button"
            onClick={resetForm}
          >
            New
          </Button> */}

          <Button
            type="button"
                       onClick={() => {
              const hasCurrent =
                String(form.name || "").trim() ||
                Number(form.totalPaidAmt) > 0;

              const data = hasCurrent
                ? buildReceiptData(form, "")
                : lastSlip;

              if (!data) {
                alert("Enter a payment or save one first to print the receipt.");
                return;
              }

              setSlip(data);
            }}
            icon={Printer}
            blue
          >
             Print
          </Button>

          <Button
            type="button"
            onClick={onClose}
            icon={X}
            red
          >
            Exit
          </Button>
        </div>
      </div>
    
      {slip && (
        <FeeReceiptPreview
          data={slip}
          onClose={() => setSlip(null)}
        />
      )}
    </form>
  );
}
/* =========================================================
   LIVE STUDENT SEARCH (runs 0.35s after typing stops)
========================================================= */

function useStudentSearch(value, className, section, showTick) {
  const [results, setResults] = useState([]);
  const [state, setState] = useState("idle"); // idle | loading | done | empty | error
  const [error, setError] = useState("");

  useEffect(() => {
    const term = value.trim();
    const hasFilter = Boolean(className || section);

    // typing searches by itself; class / section list needs the Show button
    if (!term && !(showTick > 0 && hasFilter)) {
      setResults([]);
      setState("idle");
      return undefined;
    }

    let cancelled = false;
    setState("loading");
    setError("");

    const timer = setTimeout(async () => {
      try {
        const result = await searchRecords("student", "", term, "Active", {
          className,
          section,
          limit: 100,
        });
        if (cancelled) return;

        const rows = result?.data || [];
        setResults(rows);
        setState(rows.length ? "done" : "empty");
      } catch (err) {
        if (!cancelled) {
          setResults([]);
          setError(err.message || "Unable to search.");
          setState("error");
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [value, className, section, showTick]);

  return { results, state, error };
}

/* =========================================================
   SEARCH RESULT LIST
========================================================= */

function SearchList({ search, onPick }) {
  if (search.state !== "done") {
    const text =
      search.state === "loading"
        ? "Searching..."
        : search.state === "empty"
        ? "No student found."
        : search.state === "error"
        ? search.error
        : "Type a name, or pick class / section and press Show";

    return (
      <p className="px-1 py-1 text-[9px] font-semibold text-[#173b5c]/70">
        {text}
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {search.results.map((row) => (
        <button
          type="button"
          key={row.id}
          onClick={() => onPick(row)}
          className="w-full rounded-md border border-[#79a9c9] bg-white px-2 py-1 text-left transition-all hover:border-[#0b5fa5] hover:bg-[#eef6fb]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[10px] font-bold text-[#173b5c]">
              {row.name || row.form_data?.name || "-"}
            </span>

            <span className="shrink-0 rounded-md bg-[#174f7b] px-1.5 py-0.5 text-[8px] font-bold text-[#ffd75a]">
              {row.admission_no || row.record_no}
            </span>
          </div>

          <div className="mt-0.5 truncate text-[9px] text-[#173b5c]/70">
            {`Class: ${row.class_name || "-"}${
              row.section ? " - " + row.section : ""
            }  |  Father: ${row.form_data?.fatherName || "-"}`}
          </div>
        </button>
      ))}
    </div>
  );
}