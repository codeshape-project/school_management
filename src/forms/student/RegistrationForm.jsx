// import { saveForm } from "../../api/formApi";
// import { useState } from "react";
// import {
//   FilePenLine,
//   Search,
//   Save,
//   X,
//   Send,
//   Pencil,
//   Plus,
// } from "lucide-react";

// export default function RegistrationForm({ onClose }) {
//   const [saved, setSaved] = useState(false);

//   const submit = async (e) => {
//     e.preventDefault();

//     try {
//       await saveForm("registration", e.currentTarget);
//       setSaved(true);

//     setTimeout(() => {
//       setSaved(false);
//     }, 2200);
//     } catch (err) {
//       alert(err.message || "Unable to save data.");
//     }
//   };

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
//       {/* =====================================================
//           HEADER
//       ====================================================== */}
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
//             <FilePenLine size={15} strokeWidth={2.8} />
//           </div>

//           <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
//             Registration Form
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

//       {/* =====================================================
//           MAIN CONTENT
//       ====================================================== */}
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
//             lg:grid-cols-[1.55fr_0.85fr]
//           "
//         >
//           {/* =================================================
//               LEFT SIDE
//           ================================================== */}
//           <div
//             className="
//               rounded-lg
//               border
//               border-[#79a9c9]
//               bg-[#e6f0f7]
//               p-2
//               shadow-sm
//             "
//           >
//             {/* =================================================
//                 REGISTRATION
//             ================================================== */}
//             <section>
//               <SectionTitle title="Registration" />

//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   gap-x-2
//                   gap-y-2
//                   sm:grid-cols-2
//                   lg:grid-cols-4
//                 "
//               >
//                 <Field label="Computer ID" placeholder="Enter ID" />

//                 <Field label="Adm. No." placeholder="Admission No." />

//                 <Field label="Enquiry No" placeholder="Enquiry No." />

//                 <Field label="Form No" placeholder="Form No." />

//                 <Field label="Form Date" type="date" />

//                 <SelectField
//                   label="Session"
//                   options={["2026 - 27", "2025 - 26", "2024 - 25"]}
//                 />

//                 <SelectField
//                   label="Form For"
//                   options={["Regular", "RTE", "Transfer"]}
//                 />

//                 <SelectField
//                   label="Class"
//                   options={[
//                     "Select Class",
//                     "Nursery",
//                     "LKG",
//                     "UKG",
//                     "Class 1",
//                     "Class 2",
//                     "Class 3",
//                     "Class 4",
//                     "Class 5",
//                     "Class 6",
//                     "Class 7",
//                     "Class 8",
//                     "Class 9",
//                     "Class 10",
//                     "Class 11",
//                     "Class 12",
//                   ]}
//                 />
//               </div>
//             </section>

//             {/* =================================================
//                 STUDENT INFORMATION
//             ================================================== */}
//             <section className="mt-2">
//               <SectionTitle title="Student Information" red />

//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   gap-x-2
//                   gap-y-2
//                   sm:grid-cols-2
//                   lg:grid-cols-4
//                 "
//               >
//                 <Field
//                   label="Student Name"
//                   placeholder="Enter student name"
//                 />

//                 <Field
//                   label="Father's Name"
//                   placeholder="Enter father's name"
//                 />

//                 <SelectField
//                   label="Father Qualification"
//                   options={[
//                     "Select Qualification",
//                     "High School",
//                     "Intermediate",
//                     "Graduate",
//                     "Post Graduate",
//                     "Other",
//                   ]}
//                 />

//                 <Field
//                   label="Mother's Name"
//                   placeholder="Enter mother's name"
//                 />

//                 <SelectField
//                   label="Mother Qualification"
//                   options={[
//                     "Select Qualification",
//                     "High School",
//                     "Intermediate",
//                     "Graduate",
//                     "Post Graduate",
//                     "Other",
//                   ]}
//                 />

//                 <Field
//                   label="Address"
//                   placeholder="Enter complete address"
//                 />

//                 <SelectField
//                   label="City"
//                   options={[
//                     "Select City",
//                     "Varanasi",
//                     "Prayagraj",
//                     "Lucknow",
//                     "Kanpur",
//                     "Other",
//                   ]}
//                 />

//                 <SelectField
//                   label="State"
//                   options={[
//                     "Select State",
//                     "Uttar Pradesh",
//                     "Bihar",
//                     "Delhi",
//                     "Madhya Pradesh",
//                     "Other",
//                   ]}
//                 />

//                 <Field
//                   label="Contact No"
//                   placeholder="Enter contact number"
//                 />

//                 <SelectField
//                   label="Gender"
//                   options={["Select Gender", "Male", "Female", "Other"]}
//                 />

//                 <Field label="Date Of Birth" type="date" />

//                 <Field label="Entrance Date" type="datetime-local" />

//                 <Field label="Upto" type="time" />

//                 <Field label="Form Submit Date" type="date" />
//               </div>
//             </section>

//             {/* =================================================
//                 FEE DETAILS
//             ================================================== */}
//             <section className="mt-2">
//               <div
//                 className="
//                   rounded-lg
//                   border
//                   border-[#547c98]
//                   bg-[#d9e7f2]
//                   p-1.5
//                 "
//               >
//                 <div
//                   className="
//                     mb-1.5
//                     flex
//                     h-7
//                     items-center
//                     rounded-md
//                     border
//                     border-[#7ca7c2]
//                     bg-[#c8dce9]
//                     px-2
//                     text-[10px]
//                     font-black
//                     uppercase
//                     tracking-wide
//                     text-[#163d5c]
//                   "
//                 >
//                   Registration Form Fee Detail
//                 </div>

//                 <div
//                   className="
//                     grid
//                     grid-cols-1
//                     gap-x-2
//                     gap-y-2
//                     sm:grid-cols-3
//                   "
//                 >
//                   <Field label="Fee" placeholder="0" />

//                   <Field label="Amount Paid" placeholder="0" />

//                   <SelectField
//                     label="Mode"
//                     options={["Cash", "Online", "Cheque", "UPI", "Card"]}
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* =================================================
//                 REMARKS
//             ================================================== */}
//             <div className="mt-2">
//               <Field
//                 label="Reference / Remarks"
//                 placeholder="Enter reference or remarks"
//               />
//             </div>
//           </div>

//           {/* =================================================
//               RIGHT SIDE
//           ================================================== */}
//           <div className="flex flex-col gap-2">
//             {/* =================================================
//                 SEARCH ENQUIRY
//             ================================================== */}
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
//                   py-1.5
//                   text-[10px]
//                   font-black
//                   text-[#173b5c]
//                 "
//               >
//                 Search Enquiry
//               </div>

//               <div className="mb-1.5 flex flex-wrap gap-3">
//                 <RadioOption
//                   label="By Student Name"
//                   name="searchEnquiry"
//                   defaultChecked
//                 />

//                 <RadioOption
//                   label="By Father Name"
//                   name="searchEnquiry"
//                 />
//               </div>

//               <input
//                 type="text"
//                 placeholder="Search enquiry..."
//                 className={inputClass}
//               />
//             </section>

//             {/* =================================================
//                 SEARCH STUDENT
//             ================================================== */}
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
//                   py-1.5
//                   text-[10px]
//                   font-black
//                   text-[#173b5c]
//                 "
//               >
//                 Search Student
//               </div>

//               <div className="mb-1.5 flex flex-wrap gap-3">
//                 <RadioOption
//                   label="By Form No"
//                   name="searchStudent"
//                   defaultChecked
//                 />

//                 <RadioOption label="By Name" name="searchStudent" />
//               </div>

//               <input
//                 type="text"
//                 placeholder="Search student..."
//                 className={inputClass}
//               />
//             </section>

//             {/* =================================================
//                 QUICK INFORMATION PANEL
//             ================================================== */}
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
//                 Registration Information
//               </div>

//               <div className="grid grid-cols-2 gap-1.5">
//                 <InfoBox title="Registration" value="New" />

//                 <InfoBox title="Status" value="Pending" />

//                 <InfoBox title="Session" value="2026 - 27" />

//                 <InfoBox title="Form" value="Regular" />
//               </div>

//               <div
//                 className="
//                   mt-2
//                   rounded-md
//                   border
//                   border-[#a2b9c8]
//                   bg-[#edf4f8]
//                   p-2
//                   text-[10px]
//                   font-semibold
//                   leading-4
//                   text-[#173b5c]
//                 "
//               >
//                 Fill the registration details carefully before submitting
//                 the form.
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           BOTTOM BUTTON BAR
//       ====================================================== */}
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
//             type="button"
//             icon={<Plus size={14} strokeWidth={2.5} />}
//             label="New"
//           />

//           <ActionButton
//             type="submit"
//             icon={<Save size={14} strokeWidth={2.5} />}
//             label="Save"
//             green
//           />

//           <ActionButton
//             type="button"
//             icon={<Send size={14} strokeWidth={2.5} />}
//             label="Form Submit"
//           />

//           <ActionButton
//             type="button"
//             icon={<Pencil size={14} strokeWidth={2.5} />}
//             label="Modify"
//           />

//           <ActionButton
//             type="button"
//             icon={<X size={14} strokeWidth={2.5} />}
//             label="Exit"
//             red
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
//   whitespace-nowrap
//   text-[10px]
//   font-semibold
//   text-[#173b5c]
// `;

// /* =========================================================
//    SECTION TITLE
// ========================================================= */

// function SectionTitle({ title, red = false }) {
//   return (
//     <div
//       className={`
//         mb-1.5
//         flex
//         h-7
//         items-center
//         rounded-md
//         border
//         px-2
//         text-[10px]
//         font-black
//         uppercase
//         tracking-wide

//         ${
//           red
//             ? "border-[#e0a3a3] bg-[#f6dede] text-[#b42323]"
//             : "border-[#7ca7c2] bg-[#c8dce9] text-[#163d5c]"
//         }
//       `}
//     >
//       {title}
//     </div>
//   );
// }

// /* =========================================================
//    FIELD
// ========================================================= */

// function Field({ label, placeholder = "", type = "text" }) {
//   return (
//     <div className="min-w-0">
//       <label className={labelClass}>{label}</label>

//       <input
//         type={type}
//         placeholder={placeholder}
//         className={inputClass}
//       />
//     </div>
//   );
// }

// /* =========================================================
//    SELECT
// ========================================================= */

// function SelectField({ label, options = [] }) {
//   return (
//     <div className="min-w-0">
//       <label className={labelClass}>{label}</label>

//       <select className={inputClass}>
//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// /* =========================================================
//    RADIO
// ========================================================= */

// function RadioOption({ label, name, defaultChecked = false }) {
//   return (
//     <label className="flex cursor-pointer items-center gap-1.5">
//       <input
//         type="radio"
//         name={name}
//         defaultChecked={defaultChecked}
//         className="h-3.5 w-3.5 accent-[#174f7b]"
//       />

//       <span className="text-[10px] font-semibold text-[#173b5c]">
//         {label}
//       </span>
//     </label>
//   );
// }

// /* =========================================================
//    INFORMATION BOX
// ========================================================= */

// function InfoBox({ title, value }) {
//   return (
//     <div
//       className="
//         rounded-md
//         border
//         border-[#a2b9c8]
//         bg-[#edf4f8]
//         px-2
//         py-1.5
//       "
//     >
//       <p className="text-[9px] font-bold text-[#173b5c]/70">{title}</p>

//       <p className="mt-0.5 text-[11px] font-black text-[#173b5c]">
//         {value}
//       </p>
//     </div>
//   );
// }

// /* =========================================================
//    ACTION BUTTON
// ========================================================= */

// function ActionButton({
//   type = "button",
//   icon,
//   label,
//   green = false,
//   red = false,
//   onClick,
// }) {
//   return (
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
//       {icon}
//       {label}
//     </button>
//   );
// }

import { saveForm } from "../../api/formApi";
import { useState } from "react";
import {
  FilePenLine,
  Search,
  Save,
  X,
  Send,
  Pencil,
  Plus,
} from "lucide-react";

export default function RegistrationForm({ onClose }) {
  const [saved, setSaved] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await saveForm("registration", e.currentTarget);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2200);
    } catch (err) {
      alert(err.message || "Unable to save data.");
    }
  };

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
      {/* =====================================================
          HEADER
      ====================================================== */}
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
            <FilePenLine size={15} strokeWidth={2.8} />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
            Registration Form
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

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
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
            lg:grid-cols-[1.55fr_0.85fr]
          "
        >
          {/* =================================================
              LEFT SIDE
          ================================================== */}
          <div
            className="
              rounded-lg
              border
              border-[#79a9c9]
              bg-[#e6f0f7]
              p-2
              shadow-sm
            "
          >
            {/* =================================================
                REGISTRATION
            ================================================== */}
            <section>
              <SectionTitle title="Registration" />

              <div
                className="
                  grid
                  grid-cols-1
                  gap-x-2
                  gap-y-2
                  sm:grid-cols-2
                  lg:grid-cols-4
                "
              >
                <Field
                  name="computerId"
                  label="Computer ID"
                  placeholder="Enter ID"
                />

                <Field
                  name="admissionNo"
                  label="Adm. No."
                  placeholder="Admission No."
                />

                <Field
                  name="enquiryNo"
                  label="Enquiry No"
                  placeholder="Enquiry No."
                />

                <Field
                  name="formNo"
                  label="Form No"
                  placeholder="Form No."
                />

                <Field
                  name="formDate"
                  label="Form Date"
                  type="date"
                />

                <SelectField
                  name="session"
                  label="Session"
                  options={["2026 - 27", "2025 - 26", "2024 - 25"]}
                />

                <SelectField
                  name="formFor"
                  label="Form For"
                  options={["Regular", "RTE", "Transfer"]}
                />

                <SelectField
                  name="className"
                  label="Class"
                  options={[
                    "Select Class",
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
              </div>
            </section>

            {/* =================================================
                STUDENT INFORMATION
            ================================================== */}
            <section className="mt-2">
              <SectionTitle title="Student Information" red />

              <div
                className="
                  grid
                  grid-cols-1
                  gap-x-2
                  gap-y-2
                  sm:grid-cols-2
                  lg:grid-cols-4
                "
              >
                <Field
                  name="studentName"
                  label="Student Name"
                  placeholder="Enter student name"
                />

                <Field
                  name="fatherName"
                  label="Father's Name"
                  placeholder="Enter father's name"
                />

                <SelectField
                  name="fatherQualification"
                  label="Father Qualification"
                  options={[
                    "Select Qualification",
                    "High School",
                    "Intermediate",
                    "Graduate",
                    "Post Graduate",
                    "Other",
                  ]}
                />

                <Field
                  name="motherName"
                  label="Mother's Name"
                  placeholder="Enter mother's name"
                />

                <SelectField
                  name="motherQualification"
                  label="Mother Qualification"
                  options={[
                    "Select Qualification",
                    "High School",
                    "Intermediate",
                    "Graduate",
                    "Post Graduate",
                    "Other",
                  ]}
                />

                <Field
                  name="address"
                  label="Address"
                  placeholder="Enter complete address"
                />

                <SelectField
                  name="city"
                  label="City"
                  options={[
                    "Select City",
                    "Varanasi",
                    "Prayagraj",
                    "Lucknow",
                    "Kanpur",
                    "Other",
                  ]}
                />

                <SelectField
                  name="state"
                  label="State"
                  options={[
                    "Select State",
                    "Uttar Pradesh",
                    "Bihar",
                    "Delhi",
                    "Madhya Pradesh",
                    "Other",
                  ]}
                />

                <Field
                  name="contactNo"
                  label="Contact No"
                  placeholder="Enter contact number"
                />

                <SelectField
                  name="gender"
                  label="Gender"
                  options={["Select Gender", "Male", "Female", "Other"]}
                />

                <Field
                  name="dateOfBirth"
                  label="Date Of Birth"
                  type="date"
                />

                <Field
                  name="entranceDate"
                  label="Entrance Date"
                  type="datetime-local"
                />

                <Field
                  name="upto"
                  label="Upto"
                  type="time"
                />

                <Field
                  name="formSubmitDate"
                  label="Form Submit Date"
                  type="date"
                />
              </div>
            </section>

            {/* =================================================
                FEE DETAILS
            ================================================== */}
            <section className="mt-2">
              <div
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
                  Registration Form Fee Detail
                </div>

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-x-2
                    gap-y-2
                    sm:grid-cols-3
                  "
                >
                  <Field
                    name="fee"
                    label="Fee"
                    placeholder="0"
                  />

                  <Field
                    name="amountPaid"
                    label="Amount Paid"
                    placeholder="0"
                  />

                  <SelectField
                    name="paymentMode"
                    label="Mode"
                    options={["Cash", "Online", "Cheque", "UPI", "Card"]}
                  />
                </div>
              </div>
            </section>

            {/* =================================================
                REMARKS
            ================================================== */}
            <div className="mt-2">
              <Field
                name="remarks"
                label="Reference / Remarks"
                placeholder="Enter reference or remarks"
              />
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}
          <div className="flex flex-col gap-2">
            {/* =================================================
                SEARCH ENQUIRY
            ================================================== */}
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
                Search Enquiry
              </div>

              <div className="mb-1.5 flex flex-wrap gap-3">
                <RadioOption
                  label="By Student Name"
                  name="searchEnquiry"
                  value="studentName"
                  defaultChecked
                />

                <RadioOption
                  label="By Father Name"
                  name="searchEnquiry"
                  value="fatherName"
                />
              </div>

              <input
                name="searchEnquiryValue"
                type="text"
                placeholder="Search enquiry..."
                className={inputClass}
              />
            </section>

            {/* =================================================
                SEARCH STUDENT
            ================================================== */}
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

              <div className="mb-1.5 flex flex-wrap gap-3">
                <RadioOption
                  label="By Form No"
                  name="searchStudent"
                  value="formNo"
                  defaultChecked
                />

                <RadioOption
                  label="By Name"
                  name="searchStudent"
                  value="name"
                />
              </div>

              <input
                name="searchStudentValue"
                type="text"
                placeholder="Search student..."
                className={inputClass}
              />
            </section>

            {/* =================================================
                QUICK INFORMATION PANEL
            ================================================== */}
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
                Registration Information
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <InfoBox title="Registration" value="New" />
                <InfoBox title="Status" value="Pending" />
                <InfoBox title="Session" value="2026 - 27" />
                <InfoBox title="Form" value="Regular" />
              </div>

              <div
                className="
                  mt-2
                  rounded-md
                  border
                  border-[#a2b9c8]
                  bg-[#edf4f8]
                  p-2
                  text-[10px]
                  font-semibold
                  leading-4
                  text-[#173b5c]
                "
              >
                Fill the registration details carefully before submitting
                the form.
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BUTTON BAR
      ====================================================== */}
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
          <ActionButton
            type="button"
            icon={<Plus size={14} strokeWidth={2.5} />}
            label="New"
          />

          <ActionButton
            type="submit"
            icon={<Save size={14} strokeWidth={2.5} />}
            label="Save"
            green
          />

          <ActionButton
            type="button"
            icon={<Send size={14} strokeWidth={2.5} />}
            label="Form Submit"
          />

          <ActionButton
            type="button"
            icon={<Pencil size={14} strokeWidth={2.5} />}
            label="Modify"
          />

          <ActionButton
            type="button"
            icon={<X size={14} strokeWidth={2.5} />}
            label="Exit"
            red
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
  whitespace-nowrap
  text-[10px]
  font-semibold
  text-[#173b5c]
`;

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({ title, red = false }) {
  return (
    <div
      className={`
        mb-1.5
        flex
        h-7
        items-center
        rounded-md
        border
        px-2
        text-[10px]
        font-black
        uppercase
        tracking-wide
        ${
          red
            ? "border-[#e0a3a3] bg-[#f6dede] text-[#b42323]"
            : "border-[#7ca7c2] bg-[#c8dce9] text-[#163d5c]"
        }
      `}
    >
      {title}
    </div>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  placeholder = "",
  type = "text",
  name,
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function SelectField({
  label,
  options = [],
  name,
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>

      <select
        name={name}
        className={inputClass}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   RADIO
========================================================= */

function RadioOption({
  label,
  name,
  value,
  defaultChecked = false,
}) {
  return (
    <label className="flex cursor-pointer items-center gap-1.5">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="h-3.5 w-3.5 accent-[#174f7b]"
      />

      <span className="text-[10px] font-semibold text-[#173b5c]">
        {label}
      </span>
    </label>
  );
}

/* =========================================================
   INFORMATION BOX
========================================================= */

function InfoBox({ title, value }) {
  return (
    <div
      className="
        rounded-md
        border
        border-[#a2b9c8]
        bg-[#edf4f8]
        px-2
        py-1.5
      "
    >
      <p className="text-[9px] font-bold text-[#173b5c]/70">
        {title}
      </p>

      <p className="mt-0.5 text-[11px] font-black text-[#173b5c]">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({
  type = "button",
  icon,
  label,
  green = false,
  red = false,
  onClick,
}) {
  return (
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
      {icon}
      {label}
    </button>
  );
}