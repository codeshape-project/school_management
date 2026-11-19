// import { saveForm, searchRecords } from "../../api/formApi";

// import { useState } from "react";
// import {
//   Search,
//   Save,
//   RotateCcw,
//   X,
//   ClipboardList,
// } from "lucide-react";

// export default function EnquiryForm({ onClose }) {
//   const [saved, setSaved] = useState(false);

//   const [form, setForm] = useState({
//     session: "2026 - 27",
//     date: "2026-06-29",
//     enquiryMode: "Physical",
//     enquiredBy: "",
//     purposeType: "For Admission",
//     name: "",
//     className: "",
//     isFather: false,
//     isMother: false,
//     relation: "",
//     fatherName: "",
//     motherName: "",
//     purpose: "",
//     address: "",
//     // zone: "",
//     mobile: "",
//     occupation: "",
//     // introducedBy: "",
//     // representative: "",
//     remark: "",
//     searchType: "Student Name",
//     searchValue: "",
//   });

//   const [searchResults, setSearchResults] = useState([]);

//   const updateField = (field, value) => {
//     setForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await saveForm("enquiry", form);
//       setSaved(true);

//     setTimeout(() => {
//       setSaved(false);
//     }, 2200);
//     } catch (err) {
//       alert(err.message || "Unable to save data.");
//     }
//   };

//   const handleReset = () => {
//     setForm({
//       session: "2026 - 27",
//       date: "2026-06-29",
//       enquiryMode: "Physical",
//       enquiredBy: "",
//       purposeType: "For Admission",
//       name: "",
//       className: "",
//       isFather: false,
//       isMother: false,
//       relation: "",
//       fatherName: "",
//       motherName: "",
//       purpose: "",
//       address: "",
//       // zone: "",
//       mobile: "",
//       occupation: "",
//       // introducedBy: "",
//       // representative: "",
//       remark: "",
//       searchType: "Student Name",
//       searchValue: "",
//     });

//     setSearchResults([]);
//   };

//    const SEARCH_FIELD = {
//     "Enquired By": "enquiredBy",
//     "Student Name": "name",
//     "Father Name": "fatherName",
//     "Mobile No.": "mobile",
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     const value = form.searchValue.trim();

//     if (!value) {
//       setSearchResults([]);
//       return;
//     }

//     try {
//       const result = await searchRecords(
//         "enquiry",
//         SEARCH_FIELD[form.searchType],
//         value
//       );

//       const rows = result?.data || [];

//       setSearchResults(
//         rows.map((row) => ({
//           id: row.record_no,
//           name: row.name || row.form_data?.name || "-",
//           className: row.class_name || row.form_data?.className || "-",
//           mobile: row.phone || row.form_data?.mobile || "-",
//         }))
//       );

//       if (!rows.length) alert("No enquiry found.");
//     } catch (err) {
//       setSearchResults([]);
//       alert(err.message || "Unable to search.");
//     }
//   };

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
//       onSubmit={handleSubmit}
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
//             <ClipboardList size={15} strokeWidth={2.8} />
//           </div>

//           <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
//             Enquiry Form
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
//         <div
//           className="
//             grid
//             grid-cols-1
//             gap-2
//             lg:grid-cols-[1.5fr_0.85fr]
//           "
//         >
//           {/* LEFT PANEL: ENQUIRY INFORMATION */}
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
//               Enquiry Information
//             </div>

//             {/* SESSION + DATE */}
//             <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
//               <div>
//                 <label className={labelClass}>Session</label>

//                 <select
//                   className={selectClass}
//                   value={form.session}
//                   onChange={(e) => updateField("session", e.target.value)}
//                 >
//                   <option>2026 - 27</option>
//                   <option>2025 - 26</option>
//                   <option>2024 - 25</option>
//                 </select>
//               </div>

//               <div>
//                 <label className={labelClass}>Date</label>

//                 <input
//                   type="date"
//                   className={inputClass}
//                   value={form.date}
//                   onChange={(e) => updateField("date", e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* ENQUIRY MODE */}
//             <div
//               className="
//                 mt-2
//                 flex
//                 h-8
//                 items-center
//                 justify-center
//                 gap-5
//                 rounded-md
//                 border
//                 border-[#79a9c9]
//                 bg-[#dfeaf2]
//               "
//             >
//               {["Physical", "Telephone", "By Mail"].map((mode) => (
//                 <label
//                   key={mode}
//                   className="
//                     flex
//                     cursor-pointer
//                     items-center
//                     gap-1.5
//                     text-[10px]
//                     font-semibold
//                     text-[#173b5c]
//                   "
//                 >
//                   <input
//                     type="radio"
//                     name="enquiryMode"
//                     checked={form.enquiryMode === mode}
//                     onChange={() => updateField("enquiryMode", mode)}
//                     className="h-3.5 w-3.5 accent-[#174f7b]"
//                   />
//                   {mode}
//                 </label>
//               ))}
//             </div>

//             {/* ENQUIRED BY */}
//             <div className="mt-2">
//               <label className={labelClass}>
//                 Enquired By <span className="text-red-500">*</span>
//               </label>

//               <input
//                 value={form.enquiredBy}
//                 onChange={(e) => updateField("enquiredBy", e.target.value)}
//                 className={inputClass}
//               />
//             </div>

//             {/* PURPOSE TYPE */}
//             <div
//               className="
//                 mt-2
//                 flex
//                 h-8
//                 items-center
//                 justify-center
//                 gap-6
//                 rounded-md
//                 border
//                 border-[#79a9c9]
//                 bg-[#dfeaf2]
//               "
//             >
//               {["For Admission", "Other"].map((type) => (
//                 <label
//                   key={type}
//                   className="
//                     flex
//                     cursor-pointer
//                     items-center
//                     gap-1.5
//                     text-[10px]
//                     font-semibold
//                     text-[#173b5c]
//                   "
//                 >
//                   <input
//                     type="radio"
//                     name="purposeType"
//                     checked={form.purposeType === type}
//                     onChange={() => updateField("purposeType", type)}
//                     className="h-3.5 w-3.5 accent-[#174f7b]"
//                   />
//                   {type}
//                 </label>
//               ))}
//             </div>

//             {/* NAME + CLASS */}
//             <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
//               <div>
//                 <label className={labelClass}>
//                   Name <span className="text-red-500">*</span>
//                 </label>

//                 <input
//                   value={form.name}
//                   onChange={(e) => updateField("name", e.target.value)}
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Class</label>

//                 <select
//                   value={form.className}
//                   onChange={(e) => updateField("className", e.target.value)}
//                   className={selectClass}
//                 >
//                   <option value="">Select</option>
//                   <option>Nursery</option>
//                   <option>LKG</option>
//                   <option>UKG</option>
//                   <option>Class 1</option>
//                   <option>Class 2</option>
//                   <option>Class 3</option>
//                   <option>Class 4</option>
//                   <option>Class 5</option>
//                   <option>Class 6</option>
//                   <option>Class 7</option>
//                   <option>Class 8</option>
//                   <option>Class 9</option>
//                   <option>Class 10</option>
//                   <option>Class 11</option>
//                   <option>Class 12</option>
//                 </select>
//               </div>
//             </div>

//             {/* FATHER / MOTHER */}
//             <div className="mt-2 flex items-center justify-center gap-6">
//               <label className="flex cursor-pointer items-center gap-1.5 text-[10px] font-semibold text-[#173b5c]">
//                 <input
//                   type="checkbox"
//                   checked={form.isFather}
//                   onChange={(e) =>
//                     updateField("isFather", e.target.checked)
//                   }
//                   className="h-3.5 w-3.5 accent-[#174f7b]"
//                 />
//                 Is Father
//               </label>

//               <label className="flex cursor-pointer items-center gap-1.5 text-[10px] font-semibold text-[#173b5c]">
//                 <input
//                   type="checkbox"
//                   checked={form.isMother}
//                   onChange={(e) =>
//                     updateField("isMother", e.target.checked)
//                   }
//                   className="h-3.5 w-3.5 accent-[#174f7b]"
//                 />
//                 Is Mother
//               </label>
//             </div>

//             {/* RELATION */}
//             <div className="mt-2">
//               <label className={labelClass}>Relation With Student</label>

//               <select
//                 value={form.relation}
//                 onChange={(e) => updateField("relation", e.target.value)}
//                 className={selectClass}
//               >
//                 <option value="">Select</option>
//                 <option>Mother</option>
//                 <option>Father</option>
//                 <option>sister</option>
//                 <option>Brother</option>
//                 <option>Relative</option>
      
//               </select>
//             </div>

//             {/* FATHER + MOTHER */}
//             <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
//               <div>
//                 <label className={labelClass}>Father's Name</label>

//                 <input
//                   value={form.fatherName}
//                   onChange={(e) =>
//                     updateField("fatherName", e.target.value)
//                   }
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Mother's Name</label>

//                 <input
//                   value={form.motherName}
//                   onChange={(e) =>
//                     updateField("motherName", e.target.value)
//                   }
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             {/* PURPOSE + ADDRESS */}
//             <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
//               <div>
//                 <label className={labelClass}>Purpose</label>

//                 <input
//                   value={form.purpose}
//                   onChange={(e) => updateField("purpose", e.target.value)}
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Address</label>

//                 <input
//                   value={form.address}
//                   onChange={(e) => updateField("address", e.target.value)}
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             {/* ZONE */}
//             {/* <div className="mt-2 grid grid-cols-[1fr_36px] items-end gap-1.5">
//               <div>
//                 <label className={labelClass}>Zone</label>

//                 <select
//                   value={form.zone}
//                   onChange={(e) => updateField("zone", e.target.value)}
//                   className={selectClass}
//                 >
//                   <option value="">Select Zone</option>
//                   <option>Zone 1</option>
//                   <option>Zone 2</option>
//                   <option>Zone 3</option>
//                   <option>Zone 4</option>
//                 </select>
//               </div>

//               <button
//                 type="button"
//                 title="Add Zone"
//                 className="
//                   flex
//                   h-7
//                   items-center
//                   justify-center
//                   rounded-md
//                   border
//                   border-[#5d91b2]
//                   bg-gradient-to-r
//                   from-[#174f7b]
//                   via-[#216994]
//                   to-[#174f7b]
//                   text-[13px]
//                   font-black
//                   text-[#ffd75a]
//                   transition
//                   hover:shadow-[0_0_10px_rgba(20,94,145,0.35)]
//                 "
//               >
//                 +
//               </button>
//             </div> */}

//             {/* MOBILE + OCCUPATION */}
//             <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
//               <div>
//                 <label className={labelClass}>
//                   Mobile No. <span className="text-red-500">*</span>
//                 </label>

//                 <input
//                   value={form.mobile}
//                   onChange={(e) => updateField("mobile", e.target.value)}
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Occupation</label>

//                 <input
//                   value={form.occupation}
//                   onChange={(e) =>
//                     updateField("occupation", e.target.value)
//                   }
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             {/* INTRODUCED BY + REPRESENTATIVE */}
//             {/* <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
//               <div>
//                 <label className={labelClass}>Introduced By</label>

//                 <input
//                   value={form.introducedBy}
//                   onChange={(e) =>
//                     updateField("introducedBy", e.target.value)
//                   }
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Representative</label>

//                 <select
//                   value={form.representative}
//                   onChange={(e) =>
//                     updateField("representative", e.target.value)
//                   }
//                   className={selectClass}
//                 >
//                   <option value="">Select Representative</option>
//                   <option>Representative 1</option>
//                   <option>Representative 2</option>
//                   <option>Representative 3</option>
//                 </select>
//               </div>
//             </div> */}

//             {/* REMARK */}
//             <div className="mt-2">
//               <label className={labelClass}>Remark</label>

//               <textarea
//                 value={form.remark}
//                 onChange={(e) => updateField("remark", e.target.value)}
//                 rows={2}
//                 placeholder="Enter remark"
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
//             </div>
//           </section>

//           {/* RIGHT PANEL: SEARCH ENQUIRY */}
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
//               Search Enquiry
//             </div>

//             {/* SEARCH TYPES */}
//             <div
//               className="
//                 rounded-md
//                 border
//                 border-[#7d9caf]
//                 bg-[#dfeaf2]
//                 p-2
//               "
//             >
//               <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
//                 {[
//                   "Enquired By",
//                   "Student Name",
//                   "Father Name",
//                   "Mobile No.",
//                 ].map((type) => (
//                   <label
//                     key={type}
//                     className="
//                       flex
//                       cursor-pointer
//                       items-center
//                       gap-1.5
//                       text-[9px]
//                       font-semibold
//                       text-[#173b5c]
//                     "
//                   >
//                     <input
//                       type="radio"
//                       name="searchType"
//                       checked={form.searchType === type}
//                       onChange={() => updateField("searchType", type)}
//                       className="h-3 w-3 accent-[#174f7b]"
//                     />
//                     {type}
//                   </label>
//                 ))}
//               </div>

//               {/* SEARCH INPUT */}
//               <div className="mt-2 flex gap-1.5">
//                 <input
//                   value={form.searchValue}
//                   onChange={(e) =>
//                     updateField("searchValue", e.target.value)
//                   }
//                   placeholder={`Search by ${form.searchType}`}
//                   className={`${inputClass} flex-1`}
//                 />

//                 <button
//                   type="button"
//                   onClick={handleSearch}
//                   title="Search"
//                   className="
//                     flex
//                     h-7
//                     w-9
//                     shrink-0
//                     items-center
//                     justify-center
//                     rounded-md
//                     border
//                     border-[#5d91b2]
//                     bg-gradient-to-r
//                     from-[#174f7b]
//                     via-[#216994]
//                     to-[#174f7b]
//                     text-[#ffd75a]
//                     transition-all
//                     hover:shadow-[0_0_10px_rgba(20,94,145,0.35)]
//                   "
//                 >
//                   <Search size={14} />
//                 </button>
//               </div>
//             </div>

//             {/* SEARCH RESULTS */}
//             <div
//               className="
//                 mt-2
//                 min-h-[160px]
//                 flex-1
//                 overflow-y-auto
//                 rounded-md
//                 border
//                 border-[#a2b9c8]
//                 bg-[#edf4f8]
//               "
//             >
//               {searchResults.length === 0 ? (
//                 <div className="flex min-h-[160px] flex-col items-center justify-center px-5 text-center">
//                   <div
//                     className="
//                       flex
//                       h-11
//                       w-11
//                       items-center
//                       justify-center
//                       rounded-xl
//                       border
//                       border-[#79a9c9]
//                       bg-white
//                       text-[#0b5fa5]
//                     "
//                   >
//                     <Search size={18} />
//                   </div>

//                   <p className="mt-2 text-[11px] font-bold text-[#173b5c]">
//                     Search Enquiry
//                   </p>

//                   <p className="mt-1 max-w-[200px] text-[9px] leading-relaxed text-[#173b5c]/60">
//                     Select a search option and enter a value to find
//                     existing enquiries.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-1.5 p-2">
//                   {searchResults.map((result) => (
//                     <button
//                       type="button"
//                       key={result.id}
//                       className="
//                         w-full
//                         rounded-md
//                         border
//                         border-[#79a9c9]
//                         bg-white
//                         p-2
//                         text-left
//                         transition-all
//                         hover:border-[#0b5fa5]
//                         hover:bg-[#eef6fb]
//                       "
//                     >
//                       <div className="flex items-center justify-between">
//                         <span className="text-[10px] font-bold text-[#173b5c]">
//                           {result.name}
//                         </span>

//                         <span
//                           className="
//                             rounded-md
//                             bg-[#174f7b]
//                             px-1.5
//                             py-0.5
//                             text-[8px]
//                             font-bold
//                             text-[#ffd75a]
//                           "
//                         >
//                           {result.id}
//                         </span>
//                       </div>

//                       <div className="mt-1 flex gap-3 text-[9px] text-[#173b5c]/70">
//                         <span>Class: {result.className}</span>
//                         <span>Mobile: {result.mobile}</span>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </section>
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
//           <Button type="submit" icon={Save} green>
//             Save
//           </Button>

//           <Button type="button" onClick={handleReset} icon={RotateCcw}>
//             Reset
//           </Button>

//           <Button type="button" onClick={onClose} icon={X} red>
//             Exit
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// }


import { saveForm, searchRecords } from "../../api/formApi";
import PrintPreview from "../../components/PrintPreview";
import {
  buildEnquirySlipData,
  buildEnquirySlipHtml,
} from "../../utils/enquirySlip";

import { useMemo, useState } from "react";
import {
  Search,
  Save,
  RotateCcw,
  X,
  ClipboardList,
  Printer,
} from "lucide-react";

const CLASSES = [
  "Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4",
  "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11", "Class 12",
];

const ABOUT_OPTIONS = [
  "Fee Structure",
  "Transport",
  "TC / Certificate",
  "Job / Vacancy",
  "Visit / Meeting",
  "Complaint / Feedback",
  "Other",
];

const SEARCH_TYPES = [
  "Enquiry No.",
  "Enquired By",
  "Student Name",
  "Father Name",
  "Mobile No.",
];

const SEARCH_FIELD = {
  "Enquiry No.": "enquiryNo",
  "Enquired By": "enquiredBy",
  "Student Name": "name",
  "Father Name": "fatherName",
  "Mobile No.": "mobile",
};

function todayText() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function emptyForm() {
  return {
    session: "2026 - 27",
    date: todayText(),
    enquiryMode: "Physical",
    enquiredBy: "",
    purposeType: "For Admission",

    // For Admission (student details)
    name: "",
    className: "",
    gender: "",
    dateOfBirth: "",
    previousSchool: "",
    isFather: false,
    isMother: false,
    relation: "",
    fatherName: "",
    motherName: "",
    occupation: "",

    // Other (enquiry details)
    enquiryAbout: "",
    enquiryAboutOther: "",
    purposeDetail: "",

    // both
    purpose: "",
    address: "",
    mobile: "",
    remark: "",

    searchType: "Enquiry No.",
    searchValue: "",
  };
}

/* only the fields that belong to the chosen enquiry type are saved */
function buildPayload(form) {
  const data = { ...form };

  delete data.searchType;
  delete data.searchValue;

  if (form.purposeType === "Other") {
    data.className = "";
    data.gender = "";
    data.dateOfBirth = "";
    data.previousSchool = "";
    data.isFather = false;
    data.isMother = false;
    data.relation = "";
    data.fatherName = "";
    data.motherName = "";
    data.occupation = "";

    data.purpose =
      form.enquiryAbout === "Other"
        ? form.enquiryAboutOther.trim() || "Other"
        : form.enquiryAbout;
  } else {
    data.enquiryAbout = "";
    data.enquiryAboutOther = "";
    data.purposeDetail = "";
    data.purpose = "For Admission";
  }

  return data;
}

export default function EnquiryForm({ onClose }) {
  const [saved, setSaved] = useState("");
  const [form, setForm] = useState(emptyForm);

  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const [slip, setSlip] = useState(null);
  const [lastSlip, setLastSlip] = useState(null);

  const isAdmission = form.purposeType !== "Other";

  const slipHtml = useMemo(
    () => (slip ? buildEnquirySlipHtml(slip) : ""),
    [slip]
  );

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /* ---------------- save ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.enquiredBy.trim()) {
      alert("Enquired By is required.");
      return;
    }

    if (!form.name.trim()) {
      alert(isAdmission ? "Student name is required." : "Name is required.");
      return;
    }

    if (!form.mobile.trim()) {
      alert("Mobile no. is required.");
      return;
    }

    if (!isAdmission && !form.enquiryAbout) {
      alert("Select what the enquiry is about.");
      return;
    }

    try {
      const payload = buildPayload(form);
      const result = await saveForm("enquiry", payload);

      // enquiry number generated by the server (ENQ-2026-0001)
      const enquiryNo = result?.data?.record_no || "";
      const slipData = buildEnquirySlipData(payload, enquiryNo);

      setLastSlip(slipData);
      setSlip(slipData);
      setSaved(enquiryNo || "Saved");

      setForm(emptyForm());
      setSearchResults([]);
      setSearched(false);

      setTimeout(() => setSaved(""), 4000);
    } catch (err) {
      alert(err.message || "Unable to save data.");
    }
  };

  const handleReset = () => {
    setForm(emptyForm());
    setSearchResults([]);
    setSearched(false);
  };

  /* ---------------- search ---------------- */
  const handleSearch = async (e) => {
    e.preventDefault();

    const value = form.searchValue.trim();

    if (!value) {
      setSearchResults([]);
      setSearched(false);
      return;
    }

    try {
      const result = await searchRecords(
        "enquiry",
        SEARCH_FIELD[form.searchType],
        value
      );

      setSearchResults(result?.data || []);
      setSearched(true);
    } catch (err) {
      setSearchResults([]);
      setSearched(false);
      alert(err.message || "Unable to search.");
    }
  };

  // click a result -> open its slip (view / reprint)
  
// Click search result -> auto-fill complete enquiry form

const openSlip = (row) => {
  const d = row.form_data || {};

  // Automatically populate all enquiry fields
  setForm((prev) => ({
    ...emptyForm(),
    ...d,

    enquiryNo: row.record_no || "",
    name: d.name || row.name || "",
    mobile: d.mobile || row.phone || "",
    className: d.className || row.class_name || "",

    purposeType: d.purposeType || "For Admission",

    isFather: Boolean(d.isFather),
    isMother: Boolean(d.isMother),

    searchType: prev.searchType,
    searchValue: prev.searchValue,
  }));

  // Prepare the selected enquiry for printing
  const slipData = buildEnquirySlipData(d, row.record_no);
  setLastSlip(slipData);

  // Close any previously opened print preview
  setSlip(null);
};



  const printLastSlip = () => {
    if (!lastSlip) {
      alert("Save an enquiry first to print its slip.");
      return;
    }

    setSlip(lastSlip);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-auto max-h-[calc(100vh-72px)] w-full max-w-[1180px] flex-col overflow-hidden rounded-[22px] border-2 border-[#0b2a52] bg-[#dbe9f4] p-2.5 shadow-[0_0_18px_rgba(11,42,82,0.30)]"
    >
      {/* HEADER */}
      <div className="flex min-h-[38px] shrink-0 items-center justify-between gap-2 rounded-lg border border-[#5d91b2] bg-gradient-to-r from-[#174f7b] via-[#216994] to-[#174f7b] px-3 py-1.5 text-white">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#d8a928] text-[#102f4b]">
            <ClipboardList size={15} strokeWidth={2.8} />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
            Enquiry Form
          </h2>
        </div>

        {saved && (
          <span className="rounded-md border border-emerald-300 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-100">
            Saved Successfully{saved !== "Saved" ? ` - ${saved}` : ""}
          </span>
        )}

        {/* TOP-RIGHT CUT BUTTON */}
        <button
          type="button"
          onClick={onClose}
          title="Close"
          className="flex h-7 w-8 shrink-0 items-center justify-center rounded-md border border-red-300 bg-red-600 text-white transition-all hover:bg-red-700 hover:shadow-[0_0_14px_rgba(239,68,68,0.55)]"
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>

      {/* SCROLLABLE FORM CONTENT */}
      <div className="min-h-0 flex-1 touch-pan-y overflow-y-auto overflow-x-hidden overscroll-contain p-1.5 pb-2 scrollbar-thin lg:overflow-y-auto">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1.5fr_0.85fr]">
          {/* LEFT PANEL: ENQUIRY INFORMATION */}
          <section className="rounded-lg border border-[#79a9c9] bg-[#e6f0f7] p-2 shadow-sm">
            <PanelTitle>Enquiry Information</PanelTitle>

            {/* ENQUIRY NO + SESSION + DATE */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Enquiry No.</label>
                <input
                  readOnly
                  value="Auto generated on save"
                  className={`${inputClass} cursor-not-allowed bg-slate-100 text-slate-500`}
                />
              </div>

              <div>
                <label className={labelClass}>Session</label>
                <select
                  className={inputClass}
                  value={form.session}
                  onChange={(e) => set("session", e.target.value)}
                >
                  <option>2026 - 27</option>
                  <option>2025 - 26</option>
                  <option>2024 - 25</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Date</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </div>
            </div>

            {/* ENQUIRY MODE */}
            <RadioBar
              name="enquiryMode"
              items={["Physical", "Telephone", "By Mail"]}
              value={form.enquiryMode}
              onChange={(v) => set("enquiryMode", v)}
              gap="gap-5"
            />

            {/* ENQUIRED BY */}
            <div className="mt-2">
              <label className={labelClass}>
                Enquired By <span className="text-red-500">*</span>
              </label>
              <input
                value={form.enquiredBy}
                onChange={(e) => set("enquiredBy", e.target.value)}
                className={inputClass}
              />
            </div>

            {/* ENQUIRY TYPE */}
            <RadioBar
              name="purposeType"
              items={["For Admission", "Other"]}
              value={form.purposeType}
              onChange={(v) => set("purposeType", v)}
              gap="gap-6"
            />

            {isAdmission ? (
              <>
                {/* ================= FOR ADMISSION: STUDENT DETAILS ================= */}
                <SubTitle>Student Details</SubTitle>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Student Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Class</label>
                    <select
                      value={form.className}
                      onChange={(e) => set("className", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select</option>
                      {CLASSES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <div>
                    <label className={labelClass}>Gender</label>
                    <select
                      value={form.gender}
                      onChange={(e) => set("gender", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Date of Birth</label>
                    <input
                      type="date"
                      value={form.dateOfBirth}
                      onChange={(e) => set("dateOfBirth", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Previous School</label>
                    <input
                      value={form.previousSchool}
                      onChange={(e) => set("previousSchool", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <SubTitle>Parent / Guardian</SubTitle>

                <div className="flex items-center justify-center gap-6">
                  <label className="flex cursor-pointer items-center gap-1.5 text-[10px] font-semibold text-[#173b5c]">
                    <input
                      type="checkbox"
                      checked={form.isFather}
                      onChange={(e) => set("isFather", e.target.checked)}
                      className="h-3.5 w-3.5 accent-[#174f7b]"
                    />
                    Is Father
                  </label>

                  <label className="flex cursor-pointer items-center gap-1.5 text-[10px] font-semibold text-[#173b5c]">
                    <input
                      type="checkbox"
                      checked={form.isMother}
                      onChange={(e) => set("isMother", e.target.checked)}
                      className="h-3.5 w-3.5 accent-[#174f7b]"
                    />
                    Is Mother
                  </label>
                </div>

                <div className="mt-2">
                  <label className={labelClass}>Relation With Student</label>
                  <select
                    value={form.relation}
                    onChange={(e) => set("relation", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Guardian</option>
                    <option>Brother</option>
                    <option>Sister</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Father's Name</label>
                    <input
                      value={form.fatherName}
                      onChange={(e) => set("fatherName", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Mother's Name</label>
                    <input
                      value={form.motherName}
                      onChange={(e) => set("motherName", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Mobile No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.mobile}
                      onChange={(e) => set("mobile", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Occupation</label>
                    <input
                      value={form.occupation}
                      onChange={(e) => set("occupation", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <label className={labelClass}>Address</label>
                  <input
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </>
            ) : (
              <>
                {/* ================= OTHER: ENQUIRY DETAILS ================= */}
                <SubTitle>Enquiry Details</SubTitle>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Mobile No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={form.mobile}
                      onChange={(e) => set("mobile", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Enquiry About <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.enquiryAbout}
                      onChange={(e) => set("enquiryAbout", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select</option>
                      {ABOUT_OPTIONS.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  {form.enquiryAbout === "Other" ? (
                    <div>
                      <label className={labelClass}>Please specify</label>
                      <input
                        value={form.enquiryAboutOther}
                        onChange={(e) =>
                          set("enquiryAboutOther", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>
                  ) : (
                    <div>
                      <label className={labelClass}>Address</label>
                      <input
                        value={form.address}
                        onChange={(e) => set("address", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>

                {form.enquiryAbout === "Other" && (
                  <div className="mt-2">
                    <label className={labelClass}>Address</label>
                    <input
                      value={form.address}
                      onChange={(e) => set("address", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                )}

                <div className="mt-2">
                  <label className={labelClass}>Details / Message</label>
                  <textarea
                    value={form.purposeDetail}
                    onChange={(e) => set("purposeDetail", e.target.value)}
                    rows={3}
                    placeholder="What does the visitor want to know?"
                    className={textareaClass}
                  />
                </div>
              </>
            )}

            {/* REMARK */}
            <div className="mt-2">
              <label className={labelClass}>Remark</label>
              <textarea
                value={form.remark}
                onChange={(e) => set("remark", e.target.value)}
                rows={2}
                placeholder="Enter remark"
                className={textareaClass}
              />
            </div>
          </section>

          {/* RIGHT PANEL: SEARCH ENQUIRY */}
          <section className="flex flex-col rounded-lg border border-[#547c98] bg-[#d3e2ed] p-1.5">
            <div className="mb-1.5 rounded-md border border-[#7ca7c2] bg-[#c7dce9] px-2 py-1.5 text-[10px] font-black text-[#173b5c]">
              Search Enquiry
            </div>

            {/* SEARCH TYPES */}
            <div className="rounded-md border border-[#7d9caf] bg-[#dfeaf2] p-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                {SEARCH_TYPES.map((type) => (
                  <label
                    key={type}
                    className="flex cursor-pointer items-center gap-1.5 text-[9px] font-semibold text-[#173b5c]"
                  >
                    <input
                      type="radio"
                      name="searchType"
                      checked={form.searchType === type}
                      onChange={() => set("searchType", type)}
                      className="h-3 w-3 accent-[#174f7b]"
                    />
                    {type}
                  </label>
                ))}
              </div>

              {/* SEARCH INPUT */}
              <div className="mt-2 flex gap-1.5">
                <input
                  value={form.searchValue}
                  onChange={(e) => set("searchValue", e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch(e);
                  }}
                  placeholder={
                    form.searchType === "Enquiry No."
                      ? "e.g. ENQ-2026-0001 or 0001"
                      : `Search by ${form.searchType}`
                  }
                  className={`${inputClass} flex-1`}
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  title="Search"
                  className="flex h-7 w-9 shrink-0 items-center justify-center rounded-md border border-[#5d91b2] bg-gradient-to-r from-[#174f7b] via-[#216994] to-[#174f7b] text-[#ffd75a] transition-all hover:shadow-[0_0_10px_rgba(20,94,145,0.35)]"
                >
                  <Search size={14} />
                </button>
              </div>
            </div>

            {/* SEARCH RESULTS */}
            <div className="mt-2 min-h-[160px] flex-1 overflow-y-auto rounded-md border border-[#a2b9c8] bg-[#edf4f8]">
              {searchResults.length === 0 ? (
                <div className="flex min-h-[160px] flex-col items-center justify-center px-5 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#79a9c9] bg-white text-[#0b5fa5]">
                    <Search size={18} />
                  </div>

                  <p className="mt-2 text-[11px] font-bold text-[#173b5c]">
                    {searched ? "No enquiry found" : "Search Enquiry"}
                  </p>

                  <p className="mt-1 max-w-[200px] text-[9px] leading-relaxed text-[#173b5c]/60">
                    {searched
                      ? "Try a different value or search type."
                      : "Select a search option and enter a value to find existing enquiries."}
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5 p-2">
                  <p className="px-0.5 text-[9px] font-semibold text-[#173b5c]/60">
                    Click an enquiry to automatically fill the form
                  </p>

                  {searchResults.map((row) => {
                    const d = row.form_data || {};
                    const other = d.purposeType === "Other";

                    return (
                      <button
                        type="button"
                        key={row.id}
                        onClick={() => openSlip(row)}
                        className="w-full rounded-md border border-[#79a9c9] bg-white p-2 text-left transition-all hover:border-[#0b5fa5] hover:bg-[#eef6fb]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[10px] font-bold text-[#173b5c]">
                            {row.name || d.name || "-"}
                          </span>

                          <span className="shrink-0 rounded-md bg-[#174f7b] px-1.5 py-0.5 text-[8px] font-bold text-[#ffd75a]">
                            {row.record_no}
                          </span>
                        </div>

                        <div className="mt-1 flex flex-wrap gap-x-3 text-[9px] text-[#173b5c]/70">
                          <span>
                            {other
                              ? `About: ${d.purpose || "-"}`
                              : `Class: ${row.class_name || d.className || "-"}`}
                          </span>
                          <span>Mobile: {row.phone || d.mobile || "-"}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ALL ACTION BUTTONS AT BOTTOM */}
      <div className="mt-1.5 shrink-0 rounded-lg border border-[#5d8ba7] bg-[#c7dce9] p-2.5">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
          <Button type="submit" icon={Save} green>
            Save
          </Button>

          <Button type="button" onClick={printLastSlip} icon={Printer}>
            Print Slip
          </Button>

          <Button type="button" onClick={handleReset} icon={RotateCcw}>
            Reset
          </Button>

          <Button type="button" onClick={onClose} icon={X} red>
            Exit
          </Button>
        </div>
      </div>

      {/* ENQUIRY SLIP (A5) */}
      {slip && (
        <PrintPreview
          title={`Enquiry Slip - ${slip.enquiryNo}`}
          html={slipHtml}
          pageWidth={559}
          pageHeight={794}
          onClose={() => setSlip(null)}
        />
      )}
    </form>
  );
}

/* =========================================================
   SHARED STYLES
========================================================= */

const inputClass =
  "h-7 w-full rounded-md border border-[#0b2a52] bg-white px-2 text-[11px] font-semibold text-slate-800 outline-none transition focus:border-[#061a3a] focus:ring-1 focus:ring-[#0b2a52]/30";

const labelClass =
  "mb-0.5 block whitespace-nowrap text-[10px] font-semibold text-[#173b5c]";

const textareaClass =
  "w-full resize-none rounded-md border border-[#79a9c9] bg-white px-2 py-1 text-[11px] font-semibold text-slate-800 outline-none transition focus:border-[#0b5fa5] focus:ring-1 focus:ring-[#0b5fa5]/30";

/* =========================================================
   SMALL PIECES
========================================================= */

function PanelTitle({ children }) {
  return (
    <div className="mb-1.5 flex h-7 shrink-0 items-center rounded-md border border-[#7ca7c2] bg-[#c8dce9] px-2 text-[10px] font-black uppercase tracking-wide text-[#163d5c]">
      {children}
    </div>
  );
}

function SubTitle({ children }) {
  return (
    <div className="mb-1.5 mt-2.5 flex h-6 items-center rounded-md border border-[#e0a3a3] bg-[#f6dede] px-2 text-[10px] font-black uppercase tracking-wide text-[#b42323]">
      {children}
    </div>
  );
}

function RadioBar({ name, items, value, onChange, gap }) {
  return (
    <div
      className={`mt-2 flex h-8 items-center justify-center ${gap} rounded-md border border-[#79a9c9] bg-[#dfeaf2]`}
    >
      {items.map((item) => (
        <label
          key={item}
          className="flex cursor-pointer items-center gap-1.5 text-[10px] font-semibold text-[#173b5c]"
        >
          <input
            type="radio"
            name={name}
            checked={value === item}
            onChange={() => onChange(item)}
            className="h-3.5 w-3.5 accent-[#174f7b]"
          />
          {item}
        </label>
      ))}
    </div>
  );
}

function Button({
  type = "button",
  onClick,
  icon: Icon,
  children,
  red = false,
  green = false,
}) {
  const colors = red
    ? "border-red-500 bg-red-600 text-white shadow-[0_0_8px_rgba(239,68,68,0.25)] hover:bg-red-700 hover:shadow-[0_0_14px_rgba(239,68,68,0.5)]"
    : green
    ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]"
    : "border-[#5685a6] bg-[#e4eef6] text-[#153b5a] hover:border-[#0b5fa5] hover:bg-[#d3e6f3] hover:shadow-[0_0_10px_rgba(11,95,165,0.18)]";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex h-9 min-w-[90px] items-center justify-center gap-1.5 rounded-md border px-4 text-[11px] font-extrabold transition-all active:scale-[0.97] ${colors}`}
    >
      {Icon && <Icon size={14} strokeWidth={2.5} />}
      <span>{children}</span>
    </button>
  );
}