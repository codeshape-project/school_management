// import { saveForm } from "../../api/formApi";
// import { useState } from "react";
// import {
//   Search,
//   Printer,
//   Save,
//   X,
//   Bus,
// } from "lucide-react";

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

// export default function TransportAllotment({ onClose }) {
//   const [saved, setSaved] = useState(false);

//   const [form, setForm] = useState({
//     session: "2024 - 25",
//     computerId: "",
//     admissionNo: "",
//     name: "",
//     className: "",
//     section: "",
//     date: "12-09-2026",
//     fatherName: "",
//     address: "",
//     siblings: "",
//     capacity: "",
//     travellingStudents: "",
//     totalAmt: "",
//     totalConc: "",
//     totalPay: "",
//     validFrom: "12-09-2026",
//     validTo: "12-09-2026",
//     searchStudent: "",
//   });

//   const [rows, setRows] = useState(
//     MONTHS.map((month) => ({
//       month,
//       checked: false,
//       pickup: "",
//       vehicleNo: "",
//       amount: "",
//       conc: "",
//       payAmt: "",
//       returnVehicleNo: "",
//       seatNo: "",
//     }))
//   );

//   function handleChange(e) {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function handleRowChange(index, field, value) {
//     setRows((prev) =>
//       prev.map((row, i) =>
//         i === index ? { ...row, [field]: value } : row
//       )
//     );
//   }

//   async function submit(e) {
//     e.preventDefault();

//     try {
//       await saveForm("transportAllotment", e.currentTarget);
//       setSaved(true);

//     setTimeout(() => {
//       setSaved(false);
//     }, 2200);
//     } catch (err) {
//       alert(err.message || "Unable to save data.");
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

//           <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
//             Transport Allotment
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
//         {/* MAIN LAYOUT: STUDENT DETAILS + SEARCH */}
//         <div
//           className="
//             grid
//             grid-cols-1
//             gap-2
//             lg:grid-cols-[minmax(0,1fr)_230px]
//           "
//         >
//           {/* STUDENT DETAILS */}
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
//                 lg:grid-cols-5
//               "
//             >
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
//                 <label className={labelClass}>Name</label>

//                 <input
//                   name="name"
//                   value={form.name}
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
//                 lg:grid-cols-4
//               "
//             >
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
//                 <label className={labelClass}>Father's Name</label>

//                 <input
//                   name="fatherName"
//                   value={form.fatherName}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Siblings</label>

//                 <input
//                   name="siblings"
//                   value={form.siblings}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             <div className="mt-2">
//               <label className={labelClass}>Address</label>

//               <input
//                 name="address"
//                 value={form.address}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </section>

//           {/* SEARCH STUDENT */}
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
//                 rounded-md
//                 border
//                 border-[#7ca7c2]
//                 bg-[#c7dce9]
//                 px-2
//                 py-1.5
//                 text-[10px]
//                 font-black
//                 text-[#173b5c]
//               "
//             >
//               Search Student
//             </div>

//             <input
//               name="searchStudent"
//               value={form.searchStudent}
//               onChange={handleChange}
//               placeholder="Type to search..."
//               className={inputClass}
//             />

//             <div
//               className="
//                 mt-2
//                 h-[140px]
//                 rounded-md
//                 border
//                 border-[#a2b9c8]
//                 bg-[#edf4f8]
//                 lg:h-[300px]
//               "
//             />
//           </section>
//         </div>

//         {/* MONTH-WISE TRANSPORT TABLE */}
//         <section
//           className="
//             mt-2
//             rounded-lg
//             border
//             border-[#547c98]
//             bg-[#d9e7f2]
//             p-1.5
//           "
//         >
//           <div
//             className="
//               mb-1.5
//               flex
//               h-7
//               shrink-0
//               items-center
//               rounded-md
//               border
//               border-[#7ca7c2]
//               bg-[#c8dce9]
//               px-2
//               text-[10px]
//               font-black
//               uppercase
//               tracking-wide
//               text-[#163d5c]
//             "
//           >
//             Month-wise Allotment
//           </div>

//           <div
//             className="
//               overflow-x-auto
//               rounded-md
//               border
//               border-[#567b94]
//               bg-[#e3edf5]
//               p-1
//             "
//           >
//             <div className="min-w-[900px]">
//               {/* TABLE HEADER */}
//               <div
//                 className="
//                   grid
//                   grid-cols-[22px_80px_1fr_1fr_80px_70px_80px_1fr_70px]
//                   overflow-hidden
//                   rounded-md
//                   border
//                   border-[#7698ad]
//                   bg-[#c7dce9]
//                   text-[9px]
//                   font-black
//                   text-[#173b5c]
//                 "
//               >
//                 <div className="border-r border-[#7698ad] px-1 py-1" />
//                 <div className="border-r border-[#7698ad] px-1.5 py-1">
//                   Month
//                 </div>
//                 <div className="border-r border-[#7698ad] px-1.5 py-1">
//                   Pickup Station
//                 </div>
//                 <div className="border-r border-[#7698ad] px-1.5 py-1">
//                   Vehicle No.
//                 </div>
//                 <div className="border-r border-[#7698ad] px-1.5 py-1">
//                   Amount
//                 </div>
//                 <div className="border-r border-[#7698ad] px-1.5 py-1">
//                   Conc.
//                 </div>
//                 <div className="border-r border-[#7698ad] px-1.5 py-1">
//                   Pay Amt
//                 </div>
//                 <div className="border-r border-[#7698ad] px-1.5 py-1">
//                   Return Vehicle No.
//                 </div>
//                 <div className="px-1.5 py-1">Seat No.</div>
//               </div>

//               {/* TABLE ROWS */}
//               <div className="mt-1 space-y-1">
//                 {rows.map((row, index) => (
//                   <div
//                     key={row.month}
//                     className="
//                       grid
//                       grid-cols-[22px_80px_1fr_1fr_80px_70px_80px_1fr_70px]
//                       items-center
//                       gap-1
//                       rounded-md
//                       border
//                       border-[#a2b9c8]
//                       bg-[#edf4f8]
//                       px-1
//                       py-1
//                     "
//                   >
//                     <input
//                       type="checkbox"
//                       checked={row.checked}
//                       onChange={(e) =>
//                         handleRowChange(index, "checked", e.target.checked)
//                       }
//                       className="h-3.5 w-3.5 accent-[#174f7b]"
//                     />

//                     <span className="text-[9px] font-bold italic text-[#23435b]">
//                       {row.month}
//                     </span>

//                     <select
//                       value={row.pickup}
//                       onChange={(e) =>
//                         handleRowChange(index, "pickup", e.target.value)
//                       }
//                       className={selectClass}
//                     >
//                       <option value="">Select</option>
//                     </select>

//                     <select
//                       value={row.vehicleNo}
//                       onChange={(e) =>
//                         handleRowChange(index, "vehicleNo", e.target.value)
//                       }
//                       className={selectClass}
//                     >
//                       <option value="">Select</option>
//                     </select>

//                     <input
//                       value={row.amount}
//                       onChange={(e) =>
//                         handleRowChange(index, "amount", e.target.value)
//                       }
//                       className={inputClass}
//                     />

//                     <input
//                       value={row.conc}
//                       onChange={(e) =>
//                         handleRowChange(index, "conc", e.target.value)
//                       }
//                       className={inputClass}
//                     />

//                     <input
//                       value={row.payAmt}
//                       onChange={(e) =>
//                         handleRowChange(index, "payAmt", e.target.value)
//                       }
//                       className={inputClass}
//                     />

//                     <select
//                       value={row.returnVehicleNo}
//                       onChange={(e) =>
//                         handleRowChange(
//                           index,
//                           "returnVehicleNo",
//                           e.target.value
//                         )
//                       }
//                       className={selectClass}
//                     >
//                       <option value="">Select</option>
//                     </select>

//                     <select
//                       value={row.seatNo}
//                       onChange={(e) =>
//                         handleRowChange(index, "seatNo", e.target.value)
//                       }
//                       className={selectClass}
//                     >
//                       <option value="">Select</option>
//                     </select>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CAPACITY + TOTALS + VALIDITY */}
//         <section
//           className="
//             mt-2
//             rounded-lg
//             border
//             border-[#7195aa]
//             bg-[#d9e7f1]
//             p-2
//           "
//         >
//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-2
//               sm:grid-cols-2
//               md:grid-cols-3
//               lg:grid-cols-6
//             "
//           >
//             <div>
//               <label className={labelClass}>Capacity</label>

//               <input
//                 name="capacity"
//                 value={form.capacity}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Travelling Students</label>

//               <input
//                 name="travellingStudents"
//                 value={form.travellingStudents}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Total Amt</label>

//               <input
//                 name="totalAmt"
//                 value={form.totalAmt}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Total Conc</label>

//               <input
//                 name="totalConc"
//                 value={form.totalConc}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Total Pay</label>

//               <input
//                 name="totalPay"
//                 value={form.totalPay}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           <div className="my-2 border-t border-[#7999ad]" />

//           <div
//             className="
//               grid
//               grid-cols-1
//               items-end
//               gap-2
//               sm:grid-cols-2
//               lg:grid-cols-4
//             "
//           >
//             <div className="lg:col-span-1">
//               <span className="text-[10px] font-black uppercase tracking-wide text-[#173b5c]">
//                 Transport Pass is Valid
//               </span>
//             </div>

//             <div>
//               <label className={labelClass}>From</label>

//               <input
//                 type="date"
//                 className={inputClass}
//                 value={
//                   form.validFrom
//                     ? form.validFrom.split("-").reverse().join("-")
//                     : ""
//                 }
//                 onChange={(e) => {
//                   const parts = e.target.value.split("-");

//                   if (parts.length === 3) {
//                     setForm((prev) => ({
//                       ...prev,
//                       validFrom: `${parts[2]}-${parts[1]}-${parts[0]}`,
//                     }));
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
//                   form.validTo
//                     ? form.validTo.split("-").reverse().join("-")
//                     : ""
//                 }
//                 onChange={(e) => {
//                   const parts = e.target.value.split("-");

//                   if (parts.length === 3) {
//                     setForm((prev) => ({
//                       ...prev,
//                       validTo: `${parts[2]}-${parts[1]}-${parts[0]}`,
//                     }));
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         </section>
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
//             type="submit"
//             icon={Save}
//             green
//           >
//             Save
//           </Button>

//           <Button
//             type="button"
//             onClick={() => {
//               alert("Student search");
//             }}
//             icon={Search}
//           >
//             Show
//           </Button>

//           <Button
//             type="button"
//             onClick={() => {
//               window.print();
//             }}
//             icon={Printer}
//           >
//             Print
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


import { saveForm } from "../../api/formApi";
import { useState } from "react";
import {
  Search,
  Printer,
  Save,
  X,
  Bus,
} from "lucide-react";

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

const createRows = () =>
  MONTHS.map((month) => ({
    month,
    checked: false,
    pickup: "",
    vehicleNo: "",
    amount: "",
    conc: "",
    payAmt: "",
    returnVehicleNo: "",
    seatNo: "",
  }));

export default function TransportAllotment({ onClose }) {
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    session: "2024 - 25",
    computerId: "",
    admissionNo: "",
    name: "",
    className: "",
    section: "",
    date: "12-09-2026",
    fatherName: "",
    address: "",
    siblings: "",
    capacity: "",
    travellingStudents: "",
    totalAmt: "",
    totalConc: "",
    totalPay: "",
    validFrom: "12-09-2026",
    validTo: "12-09-2026",
    searchStudent: "",
  });

  const [rows, setRows] = useState(createRows());

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  }

  function handleRowChange(index, field, value) {
    setRows((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    );

    setSaved(false);
  }

  async function submit(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const data = {};

      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }

      // Add month-wise transport allotment rows
      data.rows = rows;

      await saveForm("transportAllotment", createFakeForm(data));

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2200);
    } catch (err) {
      setSaved(false);
      alert(err.message || "Unable to save data.");
    }
  }

  function createFakeForm(data) {
    const fakeForm = document.createElement("form");

    Object.entries(data).forEach(([key, value]) => {
      const input = document.createElement("input");

      input.name = key;

      if (typeof value === "string") {
        input.value = value;
      } else {
        input.value = JSON.stringify(value);
      }

      fakeForm.appendChild(input);
    });

    return fakeForm;
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
            <Bus size={15} strokeWidth={2.8} />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
            Transport Allotment
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
        {/* MAIN LAYOUT */}
        <div
          className="
            grid
            grid-cols-1
            gap-2
            lg:grid-cols-[minmax(0,1fr)_230px]
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
                lg:grid-cols-5
              "
            >
              <div>
                <label className={labelClass}>Session</label>
                <select
                  name="session"
                  value={form.session}
                  onChange={handleChange}
                  className={selectClass}
                >
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

                    setSaved(false);
                  }}
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
                lg:grid-cols-4
              "
            >
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
                <label className={labelClass}>Father's Name</label>
                <input
                  name="fatherName"
                  value={form.fatherName}
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

            <div className="mt-2">
              <label className={labelClass}>Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </section>

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
                lg:h-[300px]
              "
            />
          </section>
        </div>

        {/* MONTH-WISE TRANSPORT TABLE */}
        <section
          className="
            mt-2
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
            Month-wise Allotment
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
            <div className="min-w-[900px]">
              {/* TABLE HEADER */}
              <div
                className="
                  grid
                  grid-cols-[22px_80px_1fr_1fr_80px_70px_80px_1fr_70px]
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
                <div className="border-r border-[#7698ad] px-1 py-1" />

                <div className="border-r border-[#7698ad] px-1.5 py-1">
                  Month
                </div>

                <div className="border-r border-[#7698ad] px-1.5 py-1">
                  Pickup Station
                </div>

                <div className="border-r border-[#7698ad] px-1.5 py-1">
                  Vehicle No.
                </div>

                <div className="border-r border-[#7698ad] px-1.5 py-1">
                  Amount
                </div>

                <div className="border-r border-[#7698ad] px-1.5 py-1">
                  Conc.
                </div>

                <div className="border-r border-[#7698ad] px-1.5 py-1">
                  Pay Amt
                </div>

                <div className="border-r border-[#7698ad] px-1.5 py-1">
                  Return Vehicle No.
                </div>

                <div className="px-1.5 py-1">
                  Seat No.
                </div>
              </div>

              {/* TABLE ROWS */}
              <div className="mt-1 space-y-1">
                {rows.map((row, index) => (
                  <div
                    key={row.month}
                    className="
                      grid
                      grid-cols-[22px_80px_1fr_1fr_80px_70px_80px_1fr_70px]
                      items-center
                      gap-1
                      rounded-md
                      border
                      border-[#a2b9c8]
                      bg-[#edf4f8]
                      px-1
                      py-1
                    "
                  >
                    <input
                      type="checkbox"
                      checked={row.checked}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          "checked",
                          e.target.checked
                        )
                      }
                      className="h-3.5 w-3.5 accent-[#174f7b]"
                    />

                    <span className="text-[9px] font-bold italic text-[#23435b]">
                      {row.month}
                    </span>

                    <select
                      value={row.pickup}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          "pickup",
                          e.target.value
                        )
                      }
                      className={selectClass}
                    >
                      <option value="">Select</option>
                    </select>

                    <select
                      value={row.vehicleNo}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          "vehicleNo",
                          e.target.value
                        )
                      }
                      className={selectClass}
                    >
                      <option value="">Select</option>
                    </select>

                    <input
                      value={row.amount}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          "amount",
                          e.target.value
                        )
                      }
                      className={inputClass}
                    />

                    <input
                      value={row.conc}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          "conc",
                          e.target.value
                        )
                      }
                      className={inputClass}
                    />

                    <input
                      value={row.payAmt}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          "payAmt",
                          e.target.value
                        )
                      }
                      className={inputClass}
                    />

                    <select
                      value={row.returnVehicleNo}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          "returnVehicleNo",
                          e.target.value
                        )
                      }
                      className={selectClass}
                    >
                      <option value="">Select</option>
                    </select>

                    <select
                      value={row.seatNo}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          "seatNo",
                          e.target.value
                        )
                      }
                      className={selectClass}
                    >
                      <option value="">Select</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CAPACITY + TOTALS + VALIDITY */}
        <section
          className="
            mt-2
            rounded-lg
            border
            border-[#7195aa]
            bg-[#d9e7f1]
            p-2
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-6
            "
          >
            <div>
              <label className={labelClass}>Capacity</label>
              <input
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Travelling Students</label>
              <input
                name="travellingStudents"
                value={form.travellingStudents}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Total Amt</label>
              <input
                name="totalAmt"
                value={form.totalAmt}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Total Conc</label>
              <input
                name="totalConc"
                value={form.totalConc}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Total Pay</label>
              <input
                name="totalPay"
                value={form.totalPay}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="my-2 border-t border-[#7999ad]" />

          <div
            className="
              grid
              grid-cols-1
              items-end
              gap-2
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <div className="lg:col-span-1">
              <span className="text-[10px] font-black uppercase tracking-wide text-[#173b5c]">
                Transport Pass is Valid
              </span>
            </div>

            <div>
              <label className={labelClass}>From</label>
              <input
                type="date"
                name="validFrom"
                className={inputClass}
                value={
                  form.validFrom
                    ? form.validFrom.split("-").reverse().join("-")
                    : ""
                }
                onChange={(e) => {
                  const parts = e.target.value.split("-");

                  if (parts.length === 3) {
                    setForm((prev) => ({
                      ...prev,
                      validFrom: `${parts[2]}-${parts[1]}-${parts[0]}`,
                    }));
                  }

                  setSaved(false);
                }}
              />
            </div>

            <div>
              <label className={labelClass}>To</label>
              <input
                type="date"
                name="validTo"
                className={inputClass}
                value={
                  form.validTo
                    ? form.validTo.split("-").reverse().join("-")
                    : ""
                }
                onChange={(e) => {
                  const parts = e.target.value.split("-");

                  if (parts.length === 3) {
                    setForm((prev) => ({
                      ...prev,
                      validTo: `${parts[2]}-${parts[1]}-${parts[0]}`,
                    }));
                  }

                  setSaved(false);
                }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* ALL ACTION BUTTONS AT BOTTOM */}
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
            type="submit"
            icon={Save}
            green
          >
            Save
          </Button>

          <Button
            type="button"
            onClick={() => {
              alert("Student search");
            }}
            icon={Search}
          >
            Show
          </Button>

          <Button
            type="button"
            onClick={() => {
              window.print();
            }}
            icon={Printer}
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
    </form>
  );
}
