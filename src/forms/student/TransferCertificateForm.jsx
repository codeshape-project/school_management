// import { saveForm } from "../../api/formApi";
// import { useState } from "react";
// import {
//   FileCheck,
//   X,
//   Search,
//   FileText,
//   Save,
// } from "lucide-react";

// export default function TransferCertificateForm({ onClose }) {
//   const [saved, setSaved] = useState(false);

//   async function submit(e) {
//     e.preventDefault();

//     try {
//       await saveForm("transferCertificate", e.currentTarget);
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
//           <SectionTitle icon={<FileText size={13} />} title="Student Information" />

//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-2
//               sm:grid-cols-2
//               lg:grid-cols-4
//             "
//           >
//             <Field label="Adm. No" placeholder="Admission No." />

//             <SelectField
//               label="Session"
//               options={["2026 - 27", "2025 - 26", "2024 - 25"]}
//             />

//             <Field label="Book No" defaultValue="0" />

//             <Field label="Sl. No" defaultValue="0" />

//             <div className="sm:col-span-2 lg:col-span-4">
//               <Field
//                 label="Board Reg. No"
//                 placeholder="Board Registration Number"
//               />
//             </div>

//             <div className="lg:col-span-2">
//               <Field label="Name" placeholder="Student name" />
//             </div>

//             <div className="lg:col-span-2">
//               <Field label="Father's Name" placeholder="Father's name" />
//             </div>

//             <div className="lg:col-span-2">
//               <Field label="Mother's Name" placeholder="Mother's name" />
//             </div>

//             <Field label="Nationality" defaultValue="Indian" />

//             <Field label="Category" placeholder="Category" />

//             <DateField label="Date of Birth" />

//             <SelectField
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

//             <DateField label="Date of Admission" />

//             <Field label="Adm. in Class" placeholder="Class" />

//             <div className="lg:col-span-2">
//               <Field
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
//           <SectionTitle icon={<FileText size={13} />} title="Academic Details" />

//           <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
//             <RowField
//               label="Whether failed, if so once/twice in the same class"
//               type="select"
//               options={["Never", "Once", "Twice"]}
//             />

//             <RowField label="Result of Last Class" type="input" />

//             <RowField
//               label="Whether qualified for promotion to the higher class"
//               type="select"
//               options={["Yes", "No"]}
//             />

//             <RowField
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
//           <SectionTitle icon={<FileText size={13} />} title="Subject" />

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
//           <SectionTitle icon={<FileText size={13} />} title="School Record" />

//           <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
//             <RowField
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
//               label="Total No of Working Day"
//               type="input"
//               placeholder="0"
//             />

//             <RowField
//               label="Total No of Working Day present"
//               type="input"
//               placeholder="0"
//             />

//             <RowField
//               label="Proof for Date of Birth Submitted at the time of Admission"
//               type="input"
//             />
//           </div>

//           <div className="mt-2 space-y-2">
//             <LongField label="Whether NCC Cadet/Boy Scout/Girl Guide" />

//             <LongField label="Games played or extra curricular activities" />

//             <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[230px_125px_1fr] sm:items-center">
//               <label className={labelClass}>
//                 Whether school is under Govt./Minority/Independent category
//               </label>

//               <Select options={["Govt.", "Minority", "Independent"]} />

//               <input className={inputClass} />
//             </div>

//             <LongField label="General Conduct" defaultValue="Good" />
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
//           <SectionTitle icon={<FileCheck size={13} />} title="Certificate Details" />

//           <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
//             <RowField
//               label="Date of application for certificate"
//               type="date"
//             />

//             <RowField
//               label="Any Fee Concession to Student"
//               type="select"
//               options={["No", "Yes"]}
//             />

//             <RowField
//               label="Date on which pupil's name was struck of the rolls of the school"
//               type="date"
//             />

//             <RowField label="Date of issue of certificate" type="date" />

//             <RowField
//               label="Reason for leaving the school"
//               type="input"
//               defaultValue="Parents Request"
//             />

//             <div className="lg:col-span-2">
//               <LongField label="Remarks" />
//             </div>

//             <div className="lg:col-span-2">
//               <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[230px_165px] sm:items-center">
//                 <label className={labelClass}>
//                   Select Session for Admission Cancel
//                 </label>

//                 <Select
//                   options={["", "2026 - 27", "2025 - 26", "2024 - 25"]}
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* SEARCH */}
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
//           <SectionTitle icon={<Search size={13} />} title="Search Student" />

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
//               <select className={inputClass}>
//                 <option>Admission No.</option>
//                 <option>Student Name</option>
//                 <option>Father's Name</option>
//               </select>

//               <input className={inputClass} placeholder="Search..." />
//             </div>

//             <button
//               type="button"
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
//               Search
//             </button>
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
//           <ActionButton
//             icon={<FileCheck size={14} strokeWidth={2.5} />}
//             text="Create TC"
//           />

//           <ActionButton
//             icon={<FileText size={14} strokeWidth={2.5} />}
//             text="Create TC For English Format"
//             wide
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

// function Field({ label, placeholder = "", defaultValue = "" }) {
//   return (
//     <div className="min-w-0">
//       <label className={`${labelClass} truncate`}>{label}</label>

//       <input
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

// function SelectField({ label, options = [] }) {
//   return (
//     <div className="min-w-0">
//       <label className={`${labelClass} truncate`}>{label}</label>

//       <Select options={options} />
//     </div>
//   );
// }

// /* =========================================================
//    SELECT
// ========================================================= */

// function Select({ options = [] }) {
//   return (
//     <select className={inputClass}>
//       {options.map((option, index) => (
//         <option key={`${option}-${index}`} value={option}>
//           {option || "Select"}
//         </option>
//       ))}
//     </select>
//   );
// }

// /* =========================================================
//    DATE FIELD
// ========================================================= */

// function DateField({ label }) {
//   return (
//     <div className="min-w-0">
//       <label className={`${labelClass} truncate`}>{label}</label>

//       <DateInput />
//     </div>
//   );
// }

// /* =========================================================
//    DATE INPUT
// ========================================================= */

// function DateInput() {
//   return (
//     <input
//       type="date"
//       defaultValue="2026-09-12"
//       className={inputClass}
//     />
//   );
// }

// /* =========================================================
//    ROW FIELD
// ========================================================= */

// function RowField({
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
//       <label className={labelClass}>{label}</label>

//       {type === "select" ? (
//         <Select options={options} />
//       ) : type === "date" ? (
//         <DateInput />
//       ) : (
//         <input
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

// function LongField({ label, defaultValue = "" }) {
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
//       <label className={labelClass}>{label}</label>

//       <input defaultValue={defaultValue} className={inputClass} />
//     </div>
//   );
// }

// /* =========================================================
//    ACTION BUTTON
// ========================================================= */

// function ActionButton({ icon, text, danger = false, wide = false, onClick }) {
//   return (
//     <button
//       type="button"
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
//       <span className="whitespace-nowrap">{text}</span>
//     </button>
//   );
// }


import { saveForm } from "../../api/formApi";
import { useState } from "react";

import {
  FileCheck,
  X,
  Search,
  FileText,
  Save,
} from "lucide-react";

export default function TransferCertificateForm({ onClose }) {
  const [saved, setSaved] = useState(false);

  async function submit(e) {
    e.preventDefault();

    // IMPORTANT:
    // Save the form reference before await.
    // e.currentTarget can become null after await.
    const form = e.currentTarget;

    try {
      // Save all named form fields to backend
      await saveForm("transferCertificate", form);

      // Clear the complete form only AFTER successful save
      form.reset();

      // Show success message
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
                defaultValue="admissionNo"
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
              />
            </div>

            <button
              type="button"
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
              Search
            </button>
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

