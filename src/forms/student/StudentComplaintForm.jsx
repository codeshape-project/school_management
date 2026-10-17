// import { saveForm } from "../../api/formApi";


// import { useState } from "react";
// import {
//   MessageSquareWarning,
//   Search,
//   Save,
//   Plus,
//   X,
//   Pencil,
// } from "lucide-react";

// export default function StudentComplaintForm({ onClose }) {
//   const [saved, setSaved] = useState(false);

//   async function submit(e) {
//     e.preventDefault();

//     try {
//       await saveForm("complaint", e.currentTarget);
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
//             <MessageSquareWarning size={15} strokeWidth={2.8} />
//           </div>

//           <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
//             Complaint Form
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
//         {/* TOP COMPLAINT INFORMATION */}
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
//               lg:grid-cols-4
//               lg:items-end
//             "
//           >
//             <Field label="Complaint No" placeholder="Complaint No" />

//             <DateField label="Date" />

//             <SelectField
//               label="Complainant"
//               options={["", "Student", "Parent", "Teacher", "Staff"]}
//             />

//             <SelectField
//               label="Against whom the complaint is"
//               options={[
//                 "",
//                 "Student",
//                 "Teacher",
//                 "Staff",
//                 "Management",
//                 "Other",
//               ]}
//             />
//           </div>
//         </section>

//         {/* COMPLAINANT + AGAINST WHOM */}
//         <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-2">
//           {/* COMPLAINANT */}
//           <section
//             className="
//               rounded-lg
//               border
//               border-[#547c98]
//               bg-[#d9e7f2]
//               p-1.5
//             "
//           >
//             <SectionTitle
//               title="Complainant"
//               icon={<MessageSquareWarning size={13} />}
//             />

//             <div className="space-y-2">
//               <Field label="Comp. ID" placeholder="Complaint ID" />

//               <Field label="Adm. No" placeholder="Admission No." />

//               <Field label="Name" placeholder="Student Name" />

//               <Field label="Class" placeholder="Class" />

//               <Field label="Section" placeholder="Section" />
//             </div>
//           </section>

//           {/* AGAINST WHOM */}
//           <section
//             className="
//               rounded-lg
//               border
//               border-[#547c98]
//               bg-[#d9e7f2]
//               p-1.5
//             "
//           >
//             <SectionTitle
//               title="Against Whom"
//               icon={<MessageSquareWarning size={13} />}
//             />

//             <div className="space-y-2">
//               <Field label="Comp. ID" placeholder="Complaint ID" />

//               <Field label="Adm. No" placeholder="Admission No." />

//               <Field label="Name" placeholder="Name" />

//               <Field label="Class" placeholder="Class" />

//               <Field label="Section" placeholder="Section" />
//             </div>
//           </section>
//         </div>

//         {/* SEARCH */}
//         <section
//           className="
//             mt-2
//             rounded-lg
//             border
//             border-[#547c98]
//             bg-[#d3e2ed]
//             p-1.5
//           "
//         >
//           <SectionTitle title="Search" icon={<Search size={13} />} />

//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-2
//               sm:grid-cols-[1fr_145px]
//               sm:items-center
//             "
//           >
//             <input className={inputClass} placeholder="Search..." />

//             <Select options={["Student", "Parent", "Teacher", "Staff"]} />
//           </div>
//         </section>

//         {/* COMPLAINT */}
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
//           <SectionTitle
//             title="Complaint"
//             icon={<MessageSquareWarning size={13} />}
//           />

//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-1.5
//               sm:grid-cols-[85px_1fr]
//               sm:items-start
//             "
//           >
//             <label className={`${labelClass} sm:pt-1.5`}>Complaint</label>

//             <textarea
//               rows={2}
//               placeholder="Enter complaint details..."
//               className="
//                 min-h-[60px]
//                 w-full
//                 resize-y
//                 rounded-md
//                 border
//                 border-[#79a9c9]
//                 bg-white
//                 px-2
//                 py-1.5
//                 text-[11px]
//                 font-semibold
//                 text-slate-800
//                 outline-none
//                 transition
//                 focus:border-[#0b5fa5]
//                 focus:ring-1
//                 focus:ring-[#0b5fa5]/30
//               "
//             />
//           </div>
//         </section>

//         {/* SEARCH COMPLAINT NUMBER */}
//         <section
//           className="
//             mt-2
//             rounded-lg
//             border
//             border-[#547c98]
//             bg-[#d3e2ed]
//             p-1.5
//           "
//         >
//           <SectionTitle
//             title="Search Complain No"
//             icon={<Search size={13} />}
//           />

//           <div
//             className="
//               grid
//               grid-cols-1
//               gap-2
//               sm:grid-cols-[1fr_130px]
//               sm:items-center
//             "
//           >
//             <input
//               className={inputClass}
//               placeholder="Enter complaint number"
//             />

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
//             icon={<Plus size={14} strokeWidth={2.5} />}
//             text="New"
//           />

//           <ActionButton
//             icon={<Save size={14} strokeWidth={2.5} />}
//             text="Save"
//             submit
//             green
//           />

//           <ActionButton
//             icon={<Pencil size={14} strokeWidth={2.5} />}
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
//    NORMAL FIELD
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
//    DATE
// ========================================================= */

// function DateField({ label }) {
//   return (
//     <div className="min-w-0">
//       <label className={`${labelClass} truncate`}>{label}</label>

//       <input
//         type="date"
//         defaultValue="2026-09-12"
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
//   green = false,
//   submit = false,
//   onClick,
// }) {
//   return (
//     <button
//       type={submit ? "submit" : "button"}
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
//           danger
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
//       <span className="whitespace-nowrap">{text}</span>
//     </button>
//   );
// }



import { saveForm } from "../../api/formApi";
import { useState } from "react";

import {
  MessageSquareWarning,
  Search,
  Save,
  Plus,
  X,
  Pencil,
} from "lucide-react";

export default function StudentComplaintForm({ onClose }) {
  const [saved, setSaved] = useState(false);

  async function submit(e) {
    e.preventDefault();

    // Save form reference before await
    const form = e.currentTarget;

    try {
      // Send form data to backend
      await saveForm("complaint", form);

      // Clear form ONLY after successful database save
      form.reset();

      // Show success message
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2200);
    } catch (err) {
      console.error("Complaint save error:", err);

      // Do not clear the form if saving fails
      alert(err.message || "Unable to save complaint.");
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
            <MessageSquareWarning size={15} strokeWidth={2.8} />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
            Complaint Form
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
        {/* TOP COMPLAINT INFORMATION */}
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
              lg:grid-cols-4
              lg:items-end
            "
          >
            <Field
              name="complaintNo"
              label="Complaint No"
              placeholder="Complaint No"
            />

            <DateField
              name="complaintDate"
              label="Date"
            />

            <SelectField
              name="complainantType"
              label="Complainant"
              options={[
                "",
                "Student",
                "Parent",
                "Teacher",
                "Staff",
              ]}
            />

            <SelectField
              name="againstType"
              label="Against whom the complaint is"
              options={[
                "",
                "Student",
                "Teacher",
                "Staff",
                "Management",
                "Other",
              ]}
            />
          </div>
        </section>

        {/* COMPLAINANT + AGAINST WHOM */}
        <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-2">

          {/* COMPLAINANT */}
          <section
            className="
              rounded-lg
              border
              border-[#547c98]
              bg-[#d9e7f2]
              p-1.5
            "
          >
            <SectionTitle
              title="Complainant"
              icon={<MessageSquareWarning size={13} />}
            />

            <div className="space-y-2">
              <Field
                name="complainantComplaintId"
                label="Comp. ID"
                placeholder="Complaint ID"
              />

              <Field
                name="complainantAdmissionNo"
                label="Adm. No"
                placeholder="Admission No."
              />

              <Field
                name="complainantName"
                label="Name"
                placeholder="Student Name"
              />

              <Field
                name="complainantClass"
                label="Class"
                placeholder="Class"
              />

              <Field
                name="complainantSection"
                label="Section"
                placeholder="Section"
              />
            </div>
          </section>

          {/* AGAINST WHOM */}
          <section
            className="
              rounded-lg
              border
              border-[#547c98]
              bg-[#d9e7f2]
              p-1.5
            "
          >
            <SectionTitle
              title="Against Whom"
              icon={<MessageSquareWarning size={13} />}
            />

            <div className="space-y-2">
              <Field
                name="againstComplaintId"
                label="Comp. ID"
                placeholder="Complaint ID"
              />

              <Field
                name="againstAdmissionNo"
                label="Adm. No"
                placeholder="Admission No."
              />

              <Field
                name="againstName"
                label="Name"
                placeholder="Name"
              />

              <Field
                name="againstClass"
                label="Class"
                placeholder="Class"
              />

              <Field
                name="againstSection"
                label="Section"
                placeholder="Section"
              />
            </div>
          </section>
        </div>

        {/* SEARCH */}
        <section
          className="
            mt-2
            rounded-lg
            border
            border-[#547c98]
            bg-[#d3e2ed]
            p-1.5
          "
        >
          <SectionTitle
            title="Search"
            icon={<Search size={13} />}
          />

          <div
            className="
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-[1fr_145px]
              sm:items-center
            "
          >
            <input
              name="studentSearchValue"
              className={inputClass}
              placeholder="Search..."
            />

            <Select
              name="studentSearchType"
              options={[
                "Student",
                "Parent",
                "Teacher",
                "Staff",
              ]}
            />
          </div>
        </section>

        {/* COMPLAINT */}
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
          <SectionTitle
            title="Complaint"
            icon={<MessageSquareWarning size={13} />}
          />

          <div
            className="
              grid
              grid-cols-1
              gap-1.5
              sm:grid-cols-[85px_1fr]
              sm:items-start
            "
          >
            <label
              className={`${labelClass} sm:pt-1.5`}
            >
              Complaint
            </label>

            <textarea
              name="complaintDetails"
              rows={2}
              placeholder="Enter complaint details..."
              className="
                min-h-[60px]
                w-full
                resize-y
                rounded-md
                border
                border-[#79a9c9]
                bg-white
                px-2
                py-1.5
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
          </div>
        </section>

        {/* SEARCH COMPLAINT NUMBER */}
        <section
          className="
            mt-2
            rounded-lg
            border
            border-[#547c98]
            bg-[#d3e2ed]
            p-1.5
          "
        >
          <SectionTitle
            title="Search Complain No"
            icon={<Search size={13} />}
          />

          <div
            className="
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-[1fr_130px]
              sm:items-center
            "
          >
            <input
              name="searchComplaintNo"
              className={inputClass}
              placeholder="Enter complaint number"
            />

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
          <ActionButton
            icon={<Plus size={14} strokeWidth={2.5} />}
            text="New"
            onClick={(e) => {
              const form = e.currentTarget.form;
              if (form) {
                form.reset();
              }
            }}
          />

          {/* ACTUAL SUBMIT BUTTON */}
          <ActionButton
            icon={<Save size={14} strokeWidth={2.5} />}
            text="Save"
            submit
            green
          />

          <ActionButton
            icon={<Pencil size={14} strokeWidth={2.5} />}
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
      <span className="text-[#b42323]">
        {icon}
      </span>

      {title}
    </div>
  );
}

/* =========================================================
   NORMAL FIELD
========================================================= */

function Field({
  name,
  label,
  placeholder = "",
  defaultValue = "",
}) {
  return (
    <div className="min-w-0">
      <label
        className={`${labelClass} truncate`}
      >
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

function SelectField({
  name,
  label,
  options = [],
}) {
  return (
    <div className="min-w-0">
      <label
        className={`${labelClass} truncate`}
      >
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

function Select({
  name,
  options = [],
}) {
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
   DATE
========================================================= */

function DateField({
  name,
  label,
}) {
  return (
    <div className="min-w-0">
      <label
        className={`${labelClass} truncate`}
      >
        {label}
      </label>

      <input
        name={name}
        type="date"
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
  green = false,
  submit = false,
  onClick,
}) {
  return (
    <button
      type={submit ? "submit" : "button"}
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
          danger
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

      <span className="whitespace-nowrap">
        {text}
      </span>
    </button>
  );
}

