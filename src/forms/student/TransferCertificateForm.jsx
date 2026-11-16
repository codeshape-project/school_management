

// import { saveForm, searchRecords } from "../../api/formApi";
// import { useRef, useState } from "react";

// import {
//   FileCheck,
//   X,
//   Search,
//   FileText,
//   Save,
// } from "lucide-react";

// export default function TransferCertificateForm({ onClose }) {
//    const [saved, setSaved] = useState(false);
//   const formRef = useRef(null);

//   /* ---------- search student ---------- */
//   const [searchBy, setSearchBy] = useState("admissionNo");
//   const [searchValue, setSearchValue] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchState, setSearchState] = useState("idle");
//     const [searchError, setSearchError] = useState(""); // idle | loading | done | empty | error

//     async function runSearch() {
//     const term = searchValue.trim();

//     if (!term) {
//       setSearchResults([]);
//       setSearchState("idle");
//       return;
//     }

//     setSearchState("loading");
//     setSearchError("");

//     try {
//       const result = await searchRecords("student", searchBy, term, "All");
//       const rows = result?.data || [];

//       setSearchResults(rows);
//       setSearchState(rows.length ? "done" : "empty");
//     } catch (err) {
//       console.error("TC search error:", err);
//       setSearchResults([]);
//       setSearchError(err.message || "Unable to search.");
//       setSearchState("error");
//     }
//   }

//   // put values into the form fields (fields are matched by their name)
//   function fillForm(values) {
//     const formEl = formRef.current;
//     if (!formEl) return;

//     Object.entries(values).forEach(([name, value]) => {
//       const el = formEl.elements[name];

//       if (!el || el instanceof RadioNodeList) return;
//       if (value === undefined || value === null || value === "") return;

//       el.value = String(value);
//     });
//   }

//   function pickStudent(row) {
//     const data = row.form_data || {};

//     fillForm({
//       admissionNo: row.admission_no || data.admissionNo,
//       session: data.session,
//       studentName: row.name || data.name,
//       fatherName: data.fatherName,
//       motherName: data.motherName,
//       dateOfBirth: data.dateOfBirth,
//       className: row.class_name || data.className,
//       category: data.category,
//       dateOfAdmission: data.dateOfAdmission,
//       admissionInClass: data.admissionInClass,
//     });

//     setSearchValue("");
//     setSearchResults([]);
//     setSearchState("idle");
//   }

//   async function submit(e) {
//     e.preventDefault();

//     // IMPORTANT:
//     // Save the form reference before await.
//     // e.currentTarget can become null after await.
//     const form = e.currentTarget;

//     try {
//       // Save all named form fields to backend
//             const data = Object.fromEntries(new FormData(form).entries());

//       // search box values are not part of the certificate data
//       delete data.searchType;
//       delete data.searchValue;

//       await saveForm("transferCertificate", data);

//       // Clear the complete form only AFTER successful save
//       form.reset();

//       // Show success message
//             setSearchValue("");
//       setSearchResults([]);
//       setSearchState("idle");
//       setSaved(true);

//       setTimeout(() => {
//         setSaved(false);
//       }, 2200);
//     } catch (err) {
//       console.error("Transfer Certificate save error:", err);

//       // Do NOT reset the form when saving fails.
//       // This keeps entered data available for correction.
//       alert(err.message || "Unable to save data.");
//     }
//   }

//   return (
//         <form
//       ref={formRef}
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
//             <FileCheck size={15} strokeWidth={2.8} />
//           </div>

//           <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
//             Transfer Certificate
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

//         {/* TOP-RIGHT CLOSE BUTTON */}
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

//       {/* SCROLLABLE CONTENT */}
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
//         {/* STUDENT INFORMATION */}
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
//           <SectionTitle
//             icon={<FileText size={13} />}
//             title="Student Information"
//           />

//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-2
//               sm:grid-cols-2
//               lg:grid-cols-4
//             "
//           >
//             <Field
//               name="admissionNo"
//               label="Adm. No"
//               placeholder="Admission No."
//             />

//             <SelectField
//               name="session"
//               label="Session"
//               options={["2026 - 27", "2025 - 26", "2024 - 25"]}
//             />

//             <Field
//               name="bookNo"
//               label="Book No"
//               defaultValue="0"
//             />

//             <Field
//               name="serialNo"
//               label="Sl. No"
//               defaultValue="0"
//             />

//             <div className="sm:col-span-2 lg:col-span-4">
//               <Field
//                 name="boardRegNo"
//                 label="Board Reg. No"
//                 placeholder="Board Registration Number"
//               />
//             </div>

//             <div className="lg:col-span-2">
//               <Field
//                 name="studentName"
//                 label="Name"
//                 placeholder="Student name"
//               />
//             </div>

//             <div className="lg:col-span-2">
//               <Field
//                 name="fatherName"
//                 label="Father's Name"
//                 placeholder="Father's name"
//               />
//             </div>

//             <div className="lg:col-span-2">
//               <Field
//                 name="motherName"
//                 label="Mother's Name"
//                 placeholder="Mother's name"
//               />
//             </div>

//             <Field
//               name="nationality"
//               label="Nationality"
//               defaultValue="Indian"
//             />

//             <Field
//               name="category"
//               label="Category"
//               placeholder="Category"
//             />

//             <DateField
//               name="dateOfBirth"
//               label="Date of Birth"
//             />

//             <SelectField
//               name="className"
//               label="Class"
//               options={[
//                 "ALL",
//                 "Nursery",
//                 "LKG",
//                 "UKG",
//                 "Class 1",
//                 "Class 2",
//                 "Class 3",
//                 "Class 4",
//                 "Class 5",
//                 "Class 6",
//                 "Class 7",
//                 "Class 8",
//                 "Class 9",
//                 "Class 10",
//                 "Class 11",
//                 "Class 12",
//               ]}
//             />

//             <DateField
//               name="dateOfAdmission"
//               label="Date of Admission"
//             />

//             <Field
//               name="admissionInClass"
//               label="Adm. in Class"
//               placeholder="Class"
//             />

//             <div className="lg:col-span-2">
//               <Field
//                 name="admissionInClassWord"
//                 label="Adm. in Class (In Word)"
//                 placeholder="Class in words"
//               />
//             </div>
//           </div>
//         </section>

//         {/* ACADEMIC DETAILS */}
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
//           <SectionTitle
//             icon={<FileText size={13} />}
//             title="Academic Details"
//           />

//           <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
//             <RowField
//               name="failedInSameClass"
//               label="Whether failed, if so once/twice in the same class"
//               type="select"
//               options={["Never", "Once", "Twice"]}
//             />

//             <RowField
//               name="lastClassResult"
//               label="Result of Last Class"
//               type="input"
//             />

//             <RowField
//               name="qualifiedForPromotion"
//               label="Whether qualified for promotion to the higher class"
//               type="select"
//               options={["Yes", "No"]}
//             />

//             <RowField
//               name="promotionClass"
//               label="If so, to which class"
//               type="select"
//               options={[
//                 "Class 1",
//                 "Class 2",
//                 "Class 3",
//                 "Class 4",
//                 "Class 5",
//                 "Class 6",
//                 "Class 7",
//                 "Class 8",
//                 "Class 9",
//                 "Class 10",
//                 "Class 11",
//                 "Class 12",
//               ]}
//             />
//           </div>
//         </section>

//         {/* SUBJECT */}
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
//           <SectionTitle
//             icon={<FileText size={13} />}
//             title="Subject"
//           />

//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-2
//               sm:grid-cols-2
//               lg:grid-cols-5
//             "
//           >
//             {Array.from({ length: 10 }, (_, index) => (
//               <div
//                 key={index}
//                 className="flex min-w-0 items-center gap-1.5"
//               >
//                 <span
//                   className="
//                     flex
//                     h-7
//                     w-4
//                     shrink-0
//                     items-center
//                     justify-center
//                     text-[10px]
//                     font-black
//                     text-[#173b5c]
//                   "
//                 >
//                   {index + 1}
//                 </span>

//                 <input
//                   name={`subject${index + 1}`}
//                   className={inputClass}
//                   placeholder={`Subject ${index + 1}`}
//                 />
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* SCHOOL RECORD */}
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
//           <SectionTitle
//             icon={<FileText size={13} />}
//             title="School Record"
//           />

//           <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
//             <RowField
//               name="duesPaidUpto"
//               label="Month upto which the pupil has paid school dues"
//               type="select"
//               options={[
//                 "January",
//                 "February",
//                 "March",
//                 "April",
//                 "May",
//                 "June",
//                 "July",
//                 "August",
//                 "September",
//                 "October",
//                 "November",
//                 "December",
//               ]}
//             />

//             <RowField
//               name="totalWorkingDays"
//               label="Total No of Working Day"
//               type="input"
//               placeholder="0"
//             />

//             <RowField
//               name="totalPresentDays"
//               label="Total No of Working Day present"
//               type="input"
//               placeholder="0"
//             />

//             <RowField
//               name="dobProofSubmitted"
//               label="Proof for Date of Birth Submitted at the time of Admission"
//               type="input"
//             />
//           </div>

//           <div className="mt-2 space-y-2">
//             <LongField
//               name="nccScoutGuide"
//               label="Whether NCC Cadet/Boy Scout/Girl Guide"
//             />

//             <LongField
//               name="gamesActivities"
//               label="Games played or extra curricular activities"
//             />

//             <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[230px_125px_1fr] sm:items-center">
//               <label className={labelClass}>
//                 Whether school is under Govt./Minority/Independent category
//               </label>

//               <Select
//                 name="schoolCategory"
//                 options={["Govt.", "Minority", "Independent"]}
//               />

//               <input
//                 name="schoolCategoryDetails"
//                 className={inputClass}
//               />
//             </div>

//             <LongField
//               name="generalConduct"
//               label="General Conduct"
//               defaultValue="Good"
//             />
//           </div>
//         </section>

//         {/* CERTIFICATE DETAILS */}
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
//           <SectionTitle
//             icon={<FileCheck size={13} />}
//             title="Certificate Details"
//           />

//           <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
//             <RowField
//               name="certificateApplicationDate"
//               label="Date of application for certificate"
//               type="date"
//             />

//             <RowField
//               name="feeConcession"
//               label="Any Fee Concession to Student"
//               type="select"
//               options={["No", "Yes"]}
//             />

//             <RowField
//               name="nameStruckOffDate"
//               label="Date on which pupil's name was struck of the rolls of the school"
//               type="date"
//             />

//             <RowField
//               name="certificateIssueDate"
//               label="Date of issue of certificate"
//               type="date"
//             />

//             <RowField
//               name="reasonForLeaving"
//               label="Reason for leaving the school"
//               type="input"
//               defaultValue="Parents Request"
//             />

//             <div className="lg:col-span-2">
//               <LongField
//                 name="remarks"
//                 label="Remarks"
//               />
//             </div>

//             <div className="lg:col-span-2">
//               <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[230px_165px] sm:items-center">
//                 <label className={labelClass}>
//                   Select Session for Admission Cancel
//                 </label>

//                 <Select
//                   name="admissionCancelSession"
//                   options={[
//                     "",
//                     "2026 - 27",
//                     "2025 - 26",
//                     "2024 - 25",
//                   ]}
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* SEARCH */}
//                {/* SEARCH */}
//         <section
//           className="
//             mt-2
//             rounded-lg
//             border
//             border-[#547c98]
//             bg-[#d3e2ed]
//             p-2
//           "
//         >
//           <SectionTitle
//             icon={<Search size={13} />}
//             title="Search Student"
//           />

//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-2
//               sm:grid-cols-[1fr_120px]
//               sm:items-end
//             "
//           >
//             <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
//               <select
//                 name="searchType"
//                 className={inputClass}
//                 value={searchBy}
//                 onChange={(e) => setSearchBy(e.target.value)}
//               >
//                 <option value="admissionNo">
//                   Admission No.
//                 </option>
//                 <option value="studentName">
//                   Student Name
//                 </option>
//                 <option value="fatherName">
//                   Father's Name
//                 </option>
//               </select>

//               <input
//                 name="searchValue"
//                 className={inputClass}
//                 placeholder="Search..."
//                 value={searchValue}
//                 onChange={(e) => setSearchValue(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault();
//                     runSearch();
//                   }
//                 }}
//               />
//             </div>

//             <button
//               type="button"
//               onClick={runSearch}
//               className="
//                 flex
//                 h-9
//                 min-w-[110px]
//                 items-center
//                 justify-center
//                 gap-1.5
//                 rounded-md
//                 border
//                 border-[#5685a6]
//                 bg-[#e4eef6]
//                 px-4
//                 text-[11px]
//                 font-extrabold
//                 text-[#153b5a]
//                 transition-all
//                 hover:border-[#0b5fa5]
//                 hover:bg-[#d3e6f3]
//                 hover:shadow-[0_0_10px_rgba(11,95,165,0.18)]
//                 active:scale-[0.97]
//               "
//             >
//               <Search size={14} strokeWidth={2.5} />
//               {searchState === "loading" ? "Searching..." : "Search"}
//             </button>
//           </div>

//           {searchState === "done" && (
//             <div className="mt-2 max-h-[140px] space-y-1 overflow-y-auto rounded-md border border-[#a2b9c8] bg-[#edf4f8] p-1">
//               {searchResults.map((row) => (
//                 <button
//                   type="button"
//                   key={row.id}
//                   onClick={() => pickStudent(row)}
//                   className="w-full rounded-md border border-[#79a9c9] bg-white px-2 py-1 text-left transition-all hover:border-[#0b5fa5] hover:bg-[#eef6fb]"
//                 >
//                   <div className="flex items-center justify-between gap-2">
//                     <span className="truncate text-[10px] font-bold text-[#173b5c]">
//                       {row.name || row.form_data?.name || "-"}
//                     </span>

//                     <span className="shrink-0 rounded-md bg-[#174f7b] px-1.5 py-0.5 text-[8px] font-bold text-[#ffd75a]">
//                       {row.admission_no || row.record_no}
//                     </span>
//                   </div>

//                   <div className="mt-0.5 truncate text-[9px] text-[#173b5c]/70">
//                     {`Father: ${row.form_data?.fatherName || "-"}  |  Class: ${
//                       row.class_name || "-"
//                     }`}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           )}

//           {(searchState === "empty" || searchState === "error") && (
//             <p className="mt-1.5 px-1 text-[10px] font-semibold text-[#173b5c]/70">
//                {searchState === "empty"
//                 ? "No student found."
//                 : searchError || "Unable to search."}
//             </p>
//           )}
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
//           {/* IMPORTANT: This is the actual submit button */}
//           <ActionButton
//             icon={<FileCheck size={14} strokeWidth={2.5} />}
//             text="Create TC"
//             submit
//           />

//           <ActionButton
//             icon={<FileText size={14} strokeWidth={2.5} />}
//             text="Create TC For English Format"
//             wide
//             submit
//           />

//           <ActionButton
//             icon={<Save size={14} strokeWidth={2.5} />}
//             text="Modify"
//           />

//           <ActionButton
//             icon={<X size={14} strokeWidth={2.5} />}
//             text="Exit"
//             danger
//             onClick={onClose}
//           />
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
//   leading-tight
// `;

// /* =========================================================
//    SECTION TITLE
// ========================================================= */

// function SectionTitle({ icon, title }) {
//   return (
//     <div
//       className="
//         mb-1.5
//         flex
//         h-7
//         items-center
//         gap-1.5
//         rounded-md
//         border
//         border-[#7ca7c2]
//         bg-[#c8dce9]
//         px-2
//         text-[10px]
//         font-black
//         uppercase
//         tracking-wide
//         text-[#163d5c]
//       "
//     >
//       <span className="text-[#b42323]">{icon}</span>
//       {title}
//     </div>
//   );
// }

// /* =========================================================
//    FIELD
// ========================================================= */

// function Field({
//   name,
//   label,
//   placeholder = "",
//   defaultValue = "",
// }) {
//   return (
//     <div className="min-w-0">
//       <label className={`${labelClass} truncate`}>
//         {label}
//       </label>

//       <input
//         name={name}
//         defaultValue={defaultValue}
//         placeholder={placeholder}
//         className={inputClass}
//       />
//     </div>
//   );
// }

// /* =========================================================
//    SELECT FIELD
// ========================================================= */

// function SelectField({ name, label, options = [] }) {
//   return (
//     <div className="min-w-0">
//       <label className={`${labelClass} truncate`}>
//         {label}
//       </label>

//       <Select
//         name={name}
//         options={options}
//       />
//     </div>
//   );
// }

// /* =========================================================
//    SELECT
// ========================================================= */

// function Select({ name, options = [] }) {
//   return (
//     <select
//       name={name}
//       className={inputClass}
//     >
//       {options.map((option, index) => (
//         <option
//           key={`${option}-${index}`}
//           value={option}
//         >
//           {option || "Select"}
//         </option>
//       ))}
//     </select>
//   );
// }

// /* =========================================================
//    DATE FIELD
// ========================================================= */

// function DateField({ name, label }) {
//   return (
//     <div className="min-w-0">
//       <label className={`${labelClass} truncate`}>
//         {label}
//       </label>

//       <DateInput name={name} />
//     </div>
//   );
// }

// /* =========================================================
//    DATE INPUT
// ========================================================= */

// function DateInput({ name }) {
//   return (
//     <input
//       name={name}
//       type="date"
//       className={inputClass}
//     />
//   );
// }

// /* =========================================================
//    ROW FIELD
// ========================================================= */

// function RowField({
//   name,
//   label,
//   type = "input",
//   options = [],
//   placeholder = "",
//   defaultValue = "",
// }) {
//   return (
//     <div
//       className="
//         grid
//         grid-cols-1
//         gap-1
//         sm:grid-cols-[1fr_135px]
//         sm:items-center
//       "
//     >
//       <label className={labelClass}>
//         {label}
//       </label>

//       {type === "select" ? (
//         <Select
//           name={name}
//           options={options}
//         />
//       ) : type === "date" ? (
//         <DateInput name={name} />
//       ) : (
//         <input
//           name={name}
//           defaultValue={defaultValue}
//           placeholder={placeholder}
//           className={inputClass}
//         />
//       )}
//     </div>
//   );
// }

// /* =========================================================
//    LONG FIELD
// ========================================================= */

// function LongField({
//   name,
//   label,
//   defaultValue = "",
// }) {
//   return (
//     <div
//       className="
//         grid
//         grid-cols-1
//         gap-1
//         sm:grid-cols-[230px_1fr]
//         sm:items-center
//       "
//     >
//       <label className={labelClass}>
//         {label}
//       </label>

//       <input
//         name={name}
//         defaultValue={defaultValue}
//         className={inputClass}
//       />
//     </div>
//   );
// }

// /* =========================================================
//    ACTION BUTTON
// ========================================================= */

// function ActionButton({
//   icon,
//   text,
//   danger = false,
//   wide = false,
//   onClick,
//   submit = false,
// }) {
//   return (
//     <button
//       type={submit ? "submit" : "button"}
//       onClick={onClick}
//       className={`
//         flex
//         h-9
//         ${wide ? "min-w-[90px] sm:min-w-[210px]" : "min-w-[90px]"}
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
//           danger
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
//       {icon}

//       <span className="whitespace-nowrap">
//         {text}
//       </span>
//     </button>
//   );
// }


import { saveForm, searchRecords } from "../../api/formApi";
import { useRef, useState } from "react";
import { SCHOOL_INFO } from "../../config/schoolInfo";
import {
  FileCheck,
  X,
  Search,
  FileText,
  Save,
  Printer,
} from "lucide-react";

export default function TransferCertificateForm({ onClose }) {
   const [saved, setSaved] = useState(false);
  const [printData, setPrintData] = useState(null);
  const formRef = useRef(null);

  /* ---------- search student ---------- */
  const [searchBy, setSearchBy] = useState("admissionNo");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchState, setSearchState] = useState("idle");
    const [searchError, setSearchError] = useState(""); // idle | loading | done | empty | error

    async function runSearch() {
    const term = searchValue.trim();

    if (!term) {
      setSearchResults([]);
      setSearchState("idle");
      return;
    }

    setSearchState("loading");
    setSearchError("");

    try {
      const result = await searchRecords("student", searchBy, term, "All");
      const rows = result?.data || [];

      setSearchResults(rows);
      setSearchState(rows.length ? "done" : "empty");
    } catch (err) {
      console.error("TC search error:", err);
      setSearchResults([]);
      setSearchError(err.message || "Unable to search.");
      setSearchState("error");
    }
  }

  // put values into the form fields (fields are matched by their name)
  function fillForm(values) {
    const formEl = formRef.current;
    if (!formEl) return;

    Object.entries(values).forEach(([name, value]) => {
      const el = formEl.elements[name];

      if (!el || el instanceof RadioNodeList) return;
      if (value === undefined || value === null || value === "") return;

      el.value = String(value);
    });
  }

  function pickStudent(row) {
    const data = row.form_data || {};

    fillForm({
      admissionNo: row.admission_no || data.admissionNo,
      session: data.session,
      studentName: row.name || data.name,
      fatherName: data.fatherName,
      motherName: data.motherName,
      dateOfBirth: data.dateOfBirth,
      className: row.class_name || data.className,
      category: data.category,
      dateOfAdmission: data.dateOfAdmission,
      admissionInClass: data.admissionInClass,
    });

    setSearchValue("");
    setSearchResults([]);
    setSearchState("idle");
  }

  async function submit(e) {
    e.preventDefault();

    // IMPORTANT:
    // Save the form reference before await.
    // e.currentTarget can become null after await.
    const form = e.currentTarget;

    try {
      // Save all named form fields to backend
            const data = Object.fromEntries(new FormData(form).entries());

      // search box values are not part of the certificate data
      delete data.searchType;
      delete data.searchValue;
const savedRecord = await saveForm("transferCertificate", data);

const serialNo =
  savedRecord?.data?.record_no ||
  savedRecord?.record_no ||
  savedRecord?.data?.id ||
  savedRecord?.id ||
  "";

setPrintData({
  ...data,
  serialNo,
  createdAt:
    savedRecord?.data?.created_at ||
    savedRecord?.created_at ||
    new Date().toISOString(),
});

      // Clear the complete form only AFTER successful save
      form.reset();

      // Show success message
            setSearchValue("");
      setSearchResults([]);
      setSearchState("idle");
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2200);
    } catch (err) {
      console.error("Transfer Certificate save error:", err);

      // Do NOT reset the form when saving fails.
      // This keeps entered data available for correction.
      alert(err.message || "Unable to save data.");
    }
  }

  return (
        <form
      ref={formRef}
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
            <FileCheck size={15} strokeWidth={2.8} />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
            Transfer Certificate
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

        {/* TOP-RIGHT CLOSE BUTTON */}
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

      {/* SCROLLABLE CONTENT */}
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
        {/* STUDENT INFORMATION */}
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
          <SectionTitle
            icon={<FileText size={13} />}
            title="Student Information"
          />

          <div
            className="
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <Field
              name="admissionNo"
              label="Adm. No"
              placeholder="Admission No."
            />

            <SelectField
              name="session"
              label="Session"
              options={["2026 - 27", "2025 - 26", "2024 - 25"]}
            />

            <Field
              name="bookNo"
              label="Book No"
              defaultValue="0"
            />

            <Field
              name="serialNo"
              label="Sl. No"
              defaultValue="0"
            />

            <div className="sm:col-span-2 lg:col-span-4">
              <Field
                name="boardRegNo"
                label="Board Reg. No"
                placeholder="Board Registration Number"
              />
            </div>

            <div className="lg:col-span-2">
              <Field
                name="studentName"
                label="Name"
                placeholder="Student name"
              />
            </div>

            <div className="lg:col-span-2">
              <Field
                name="fatherName"
                label="Father's Name"
                placeholder="Father's name"
              />
            </div>

            <div className="lg:col-span-2">
              <Field
                name="motherName"
                label="Mother's Name"
                placeholder="Mother's name"
              />
            </div>

            <Field
              name="nationality"
              label="Nationality"
              defaultValue="Indian"
            />

            <Field
              name="category"
              label="Category"
              placeholder="Category"
            />

            <DateField
              name="dateOfBirth"
              label="Date of Birth"
            />

            <SelectField
              name="className"
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

            <DateField
              name="dateOfAdmission"
              label="Date of Admission"
            />

            <Field
              name="admissionInClass"
              label="Adm. in Class"
              placeholder="Class"
            />

            <div className="lg:col-span-2">
              <Field
                name="admissionInClassWord"
                label="Adm. in Class (In Word)"
                placeholder="Class in words"
              />
            </div>
          </div>
        </section>

        {/* ACADEMIC DETAILS */}
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
          <SectionTitle
            icon={<FileText size={13} />}
            title="Academic Details"
          />

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <RowField
              name="failedInSameClass"
              label="Whether failed, if so once/twice in the same class"
              type="select"
              options={["Never", "Once", "Twice"]}
            />

            <RowField
              name="lastClassResult"
              label="Result of Last Class"
              type="input"
            />

            <RowField
              name="qualifiedForPromotion"
              label="Whether qualified for promotion to the higher class"
              type="select"
              options={["Yes", "No"]}
            />

            <RowField
              name="promotionClass"
              label="If so, to which class"
              type="select"
              options={[
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
          </div>
        </section>

        {/* SUBJECT */}
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
          <SectionTitle
            icon={<FileText size={13} />}
            title="Subject"
          />

          <div
            className="
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-2
              lg:grid-cols-5
            "
          >
            {Array.from({ length: 10 }, (_, index) => (
              <div
                key={index}
                className="flex min-w-0 items-center gap-1.5"
              >
                <span
                  className="
                    flex
                    h-7
                    w-4
                    shrink-0
                    items-center
                    justify-center
                    text-[10px]
                    font-black
                    text-[#173b5c]
                  "
                >
                  {index + 1}
                </span>

                <input
                  name={`subject${index + 1}`}
                  className={inputClass}
                  placeholder={`Subject ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* SCHOOL RECORD */}
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
          <SectionTitle
            icon={<FileText size={13} />}
            title="School Record"
          />

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <RowField
              name="duesPaidUpto"
              label="Month upto which the pupil has paid school dues"
              type="select"
              options={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ]}
            />

            <RowField
              name="totalWorkingDays"
              label="Total No of Working Day"
              type="input"
              placeholder="0"
            />

            <RowField
              name="totalPresentDays"
              label="Total No of Working Day present"
              type="input"
              placeholder="0"
            />

            <RowField
              name="dobProofSubmitted"
              label="Proof for Date of Birth Submitted at the time of Admission"
              type="input"
            />
          </div>

          <div className="mt-2 space-y-2">
            <LongField
              name="nccScoutGuide"
              label="Whether NCC Cadet/Boy Scout/Girl Guide"
            />

            <LongField
              name="gamesActivities"
              label="Games played or extra curricular activities"
            />

            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[230px_125px_1fr] sm:items-center">
              <label className={labelClass}>
                Whether school is under Govt./Minority/Independent category
              </label>

              <Select
                name="schoolCategory"
                options={["Govt.", "Minority", "Independent"]}
              />

              <input
                name="schoolCategoryDetails"
                className={inputClass}
              />
            </div>

            <LongField
              name="generalConduct"
              label="General Conduct"
              defaultValue="Good"
            />
          </div>
        </section>

        {/* CERTIFICATE DETAILS */}
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
          <SectionTitle
            icon={<FileCheck size={13} />}
            title="Certificate Details"
          />

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <RowField
              name="certificateApplicationDate"
              label="Date of application for certificate"
              type="date"
            />

            <RowField
              name="feeConcession"
              label="Any Fee Concession to Student"
              type="select"
              options={["No", "Yes"]}
            />

            <RowField
              name="nameStruckOffDate"
              label="Date on which pupil's name was struck of the rolls of the school"
              type="date"
            />

            <RowField
              name="certificateIssueDate"
              label="Date of issue of certificate"
              type="date"
            />

            <RowField
              name="reasonForLeaving"
              label="Reason for leaving the school"
              type="input"
              defaultValue="Parents Request"
            />

            <div className="lg:col-span-2">
              <LongField
                name="remarks"
                label="Remarks"
              />
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[230px_165px] sm:items-center">
                <label className={labelClass}>
                  Select Session for Admission Cancel
                </label>

                <Select
                  name="admissionCancelSession"
                  options={[
                    "",
                    "2026 - 27",
                    "2025 - 26",
                    "2024 - 25",
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH */}
               {/* SEARCH */}
        <section
          className="
            mt-2
            rounded-lg
            border
            border-[#547c98]
            bg-[#d3e2ed]
            p-2
          "
        >
          <SectionTitle
            icon={<Search size={13} />}
            title="Search Student"
          />

          <div
            className="
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-[1fr_120px]
              sm:items-end
            "
          >
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              <select
                name="searchType"
                className={inputClass}
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option value="admissionNo">
                  Admission No.
                </option>
                <option value="studentName">
                  Student Name
                </option>
                <option value="fatherName">
                  Father's Name
                </option>
              </select>

              <input
                name="searchValue"
                className={inputClass}
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    runSearch();
                  }
                }}
              />
            </div>

            <button
              type="button"
              onClick={runSearch}
              className="
                flex
                h-9
                min-w-[110px]
                items-center
                justify-center
                gap-1.5
                rounded-md
                border
                border-[#5685a6]
                bg-[#e4eef6]
                px-4
                text-[11px]
                font-extrabold
                text-[#153b5a]
                transition-all
                hover:border-[#0b5fa5]
                hover:bg-[#d3e6f3]
                hover:shadow-[0_0_10px_rgba(11,95,165,0.18)]
                active:scale-[0.97]
              "
            >
              <Search size={14} strokeWidth={2.5} />
              {searchState === "loading" ? "Searching..." : "Search"}
            </button>
          </div>

          {searchState === "done" && (
            <div className="mt-2 max-h-[140px] space-y-1 overflow-y-auto rounded-md border border-[#a2b9c8] bg-[#edf4f8] p-1">
              {searchResults.map((row) => (
                <button
                  type="button"
                  key={row.id}
                  onClick={() => pickStudent(row)}
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
                    {`Father: ${row.form_data?.fatherName || "-"}  |  Class: ${
                      row.class_name || "-"
                    }`}
                  </div>
                </button>
              ))}
            </div>
          )}

          {(searchState === "empty" || searchState === "error") && (
            <p className="mt-1.5 px-1 text-[10px] font-semibold text-[#173b5c]/70">
               {searchState === "empty"
                ? "No student found."
                : searchError || "Unable to search."}
            </p>
          )}
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
          {/* IMPORTANT: This is the actual submit button */}
          <ActionButton
            icon={<FileCheck size={14} strokeWidth={2.5} />}
            text="Create TC"
            submit
          />

          <ActionButton
            icon={<FileText size={14} strokeWidth={2.5} />}
            text="Create TC For English Format"
            wide
            submit
          />

          <ActionButton
            icon={<Save size={14} strokeWidth={2.5} />}
            text="Modify"
          />

          <ActionButton
            icon={<X size={14} strokeWidth={2.5} />}
            text="Exit"
            danger
            onClick={onClose}
          />
        </div>
      </div>

      {printData && (
  <div
    className="tc-print-modal fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/60 p-3"
    style={{ paddingTop: "15px" }}
  >
    <div
      className="mx-auto w-full max-w-[900px] rounded-xl bg-white p-3 shadow-2xl"
      style={{ marginTop: "0", marginBottom: "20px" }}
    >
      {/* PRINT TOOLBAR */}
      <div
        className="tc-print-toolbar sticky top-0 z-[99999] mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 bg-white py-3 px-2"
      >
        <strong className="text-sm text-slate-800">
          Transfer Certificate Preview
        </strong>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800"
          >
            <Printer size={16} />
            Print TC
          </button>

          <button
            type="button"
            onClick={() => setPrintData(null)}
            className="rounded bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>

      {/* TC PRINT CONTENT */}
      <TransferCertificatePrint data={printData} />
    </div>
  </div>
)}
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
  leading-tight
`;

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({ icon, title }) {
  return (
    <div
      className="
        mb-1.5
        flex
        h-7
        items-center
        gap-1.5
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
      <span className="text-[#b42323]">{icon}</span>
      {title}
    </div>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  name,
  label,
  placeholder = "",
  defaultValue = "",
}) {
  return (
    <div className="min-w-0">
      <label className={`${labelClass} truncate`}>
        {label}
      </label>

      <input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({ name, label, options = [] }) {
  return (
    <div className="min-w-0">
      <label className={`${labelClass} truncate`}>
        {label}
      </label>

      <Select
        name={name}
        options={options}
      />
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function Select({ name, options = [] }) {
  return (
    <select
      name={name}
      className={inputClass}
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
  );
}

/* =========================================================
   DATE FIELD
========================================================= */

function DateField({ name, label }) {
  return (
    <div className="min-w-0">
      <label className={`${labelClass} truncate`}>
        {label}
      </label>

      <DateInput name={name} />
    </div>
  );
}

/* =========================================================
   DATE INPUT
========================================================= */

function DateInput({ name }) {
  return (
    <input
      name={name}
      type="date"
      className={inputClass}
    />
  );
}

/* =========================================================
   ROW FIELD
========================================================= */

function RowField({
  name,
  label,
  type = "input",
  options = [],
  placeholder = "",
  defaultValue = "",
}) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-1
        sm:grid-cols-[1fr_135px]
        sm:items-center
      "
    >
      <label className={labelClass}>
        {label}
      </label>

      {type === "select" ? (
        <Select
          name={name}
          options={options}
        />
      ) : type === "date" ? (
        <DateInput name={name} />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}

/* =========================================================
   LONG FIELD
========================================================= */

function LongField({
  name,
  label,
  defaultValue = "",
}) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-1
        sm:grid-cols-[230px_1fr]
        sm:items-center
      "
    >
      <label className={labelClass}>
        {label}
      </label>

      <input
        name={name}
        defaultValue={defaultValue}
        className={inputClass}
      />
    </div>
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({
  icon,
  text,
  danger = false,
  wide = false,
  onClick,
  submit = false,
}) {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={`
        flex
        h-9
        ${wide ? "min-w-[90px] sm:min-w-[210px]" : "min-w-[90px]"}
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
          danger
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
      {icon}

      <span className="whitespace-nowrap">
        {text}
      </span>
    </button>
  );
}




function TransferCertificatePrint({ data }) {
  const val = (key, fallback = "—") =>
    data?.[key] ? String(data[key]) : fallback;

  const date = (key) => {
    const raw = val(key, "");
    if (!raw) return "—";

    const d = new Date(raw);
    return Number.isNaN(d.getTime())
      ? raw
      : d.toLocaleDateString("en-GB");
  };

  const subjects = Array.from(
    { length: 10 },
    (_, i) => data?.[`subject${i + 1}`]
  ).filter(Boolean);

  return (
    <div id="tc-print-paper">
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }

        #tc-print-paper {
          width: 210mm;
          min-height: 297mm;
          box-sizing: border-box;
          background: white;
          color: black;
          margin: 0 auto;
          font-family: Arial, Helvetica, sans-serif;
        }

        .tc-page-inner {
          box-sizing: border-box;
          min-height: 297mm;
          padding: 8mm;
          border: 1px solid black;
          display: flex;
          flex-direction: column;
        }

        .tc-school-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-align: center;
          border-bottom: 2px solid black;
          padding-bottom: 8px;
        }

        .tc-school-logo {
          width: 65px;
          height: 65px;
          object-fit: contain;
        }

        .tc-school-name {
          font-size: 22px;
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1.2;
        }

        .tc-school-address {
          font-size: 12px;
          font-weight: 600;
          margin-top: 4px;
        }

        .tc-title {
          font-size: 18px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 8px;
        }

        .tc-admission {
          display: flex;
          justify-content: flex-end;
          margin: 10px 0;
          font-size: 12px;
          font-weight: bold;
        }

        .tc-row {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 4px;
          border-bottom: 1px dotted #333;
          padding: 4px 0;
          font-size: 11px;
          line-height: 1.4;
          break-inside: avoid;
        }

        .tc-row-number {
          font-weight: bold;
        }

        .tc-row-label {
          font-weight: 600;
        }

        .tc-row-value {
          margin-left: 5px;
          font-style: italic;
          font-weight: 500;
          overflow-wrap: anywhere;
        }

        .tc-signatures {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: auto;
          padding-top: 35px;
          text-align: center;
          font-size: 11px;
          font-weight: bold;
        }

        .tc-signature-line {
          border-top: 1px solid black;
          padding-top: 5px;
        }

        @media screen {
          #tc-print-paper {
            width: 210mm;
            min-height: 297mm;
            box-shadow: 0 0 8px rgba(0,0,0,0.2);
          }
        }

        @media print {
          html,
          body {
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          body * {
            visibility: hidden !important;
          }

          #tc-print-paper,
          #tc-print-paper * {
            visibility: visible !important;
          }

          #tc-print-paper {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            overflow: hidden !important;
          }

          .tc-page-inner {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            padding: 8mm !important;
            border: none !important;
          }

          .tc-print-modal {
            position: static !important;
            display: block !important;
            width: 210mm !important;
            height: 297mm !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            background: white !important;
          }

          .tc-print-toolbar {
            display: none !important;
          }

          .tc-print-modal > div {
            width: 210mm !important;
            max-width: none !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="tc-page-inner">

        {/* SCHOOL HEADER - FROM SOFTWARE CONFIGURATION */}
        <header className="tc-school-header">
          {SCHOOL_INFO.logo && (
            <img
              src={SCHOOL_INFO.logo}
              alt="School Logo"
              className="tc-school-logo"
            />
          )}

          <div>
            <div className="tc-school-name">
              {SCHOOL_INFO.name}
            </div>

            <div className="tc-school-address">
              {SCHOOL_INFO.address}
            </div>

            {SCHOOL_INFO.phone && (
              <div className="tc-school-address">
                {SCHOOL_INFO.phone}
              </div>
            )}

            <div className="tc-title">
              Transfer Certificate
            </div>
          </div>
        </header>

        {/* ADMISSION NUMBER ONLY - NO SERIAL NO / SCHOOL CODE */}
        <div className="tc-admission">
          <span>
            Admission No.: {val("admissionNo")}
          </span>
        </div>

        {/* TC DETAILS */}
        <div>
          {[
            ["1.", "Name of the Pupil", val("studentName")],
            ["2.A", "Father’s/Guardian’s Name", val("fatherName")],
            ["2.B", "Mother’s Name", val("motherName")],
            [
              "3.",
              "Nationality",
              val("nationality", "Indian") +
                "     Religion: " +
                val("religion"),
            ],
            [
              "4.",
              "Whether the candidate belongs to Scheduled Caste/Scheduled Tribe/OBC",
              val("category"),
            ],
            [
              "5.",
              "Date of first admission in this School with class",
              date("dateOfAdmission") +
                "     " +
                val("admissionInClass"),
            ],
            [
              "6.",
              "Date of birth according to Admission Register (in figures)",
              date("dateOfBirth"),
            ],
            ["", "(in words)", val("dateOfBirthWords")],
            [
              "7.",
              "Class in which the pupil last studied (in figures / words)",
              val("className"),
            ],
            [
              "8.",
              "School/Board Annual examination last taken, with result",
              val("lastClassResult"),
            ],
            [
              "9.",
              "Whether failed, if so once/twice in the same class",
              val("failedInSameClass", "Never"),
            ],
            [
              "10.",
              "Subjects Studied",
              subjects.length ? subjects.join("     •     ") : "—",
            ],
            [
              "11.",
              "Whether qualified for promotion to the higher class",
              val("qualifiedForPromotion") +
                "     " +
                val("promotionClass"),
            ],
            [
              "12.",
              "Month upto which the pupil has paid school dues",
              val("duesPaidUpto"),
            ],
            [
              "13.",
              "Any fee concession availed of; if so, nature",
              val("feeConcession", "No"),
            ],
            [
              "14.",
              "Total No. of working days",
              val("totalWorkingDays"),
            ],
            [
              "15.",
              "Total No. of working days present",
              val("totalPresentDays"),
            ],
            [
              "16.",
              "Whether NCC Cadet / Scout / Guide / NSS Volunteer",
              val("nccScoutGuide"),
            ],
            [
              "17.",
              "Games played or extra curricular activities",
              val("gamesActivities"),
            ],
            [
              "18.",
              "General Conduct",
              val("generalConduct", "Good"),
            ],
            [
              "19.",
              "Date of application for certificate",
              date("certificateApplicationDate"),
            ],
            [
              "20.",
              "Date of issue of certificate",
              date("certificateIssueDate"),
            ],
            [
              "21.",
              "Date of leaving the School",
              date("nameStruckOffDate"),
            ],
            [
              "22.",
              "Reason for leaving the school",
              val("reasonForLeaving", "Parents Request"),
            ],
            [
              "23.",
              "Any other remarks",
              val("remarks", "N/A"),
            ],
          ].map(([number, label, value], index) => (
            <div className="tc-row" key={index}>
              <span className="tc-row-number">
                {number}
              </span>

              <div>
                <span className="tc-row-label">
                  {label}
                </span>

                <span className="tc-row-value">
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* SIGNATURE SECTION */}
        <footer className="tc-signatures">
          <div>
            <div className="tc-signature-line">
              Prepared By
            </div>
          </div>

          <div>
            <div className="tc-signature-line">
              Checked By / Manager
            </div>
          </div>

          <div>
            <div className="tc-signature-line">
              Principal / Head of School
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}



