// import { saveForm } from "../../api/formApi";
// import { useRef, useState } from "react";
// import {
//   UserPlus,
//   Search,
//   Save,
//   X,
//   Pencil,
//   Plus,
//   Upload,
//   RefreshCw,
//   Camera,
// } from "lucide-react";

// export default function StudentAdmissionForm({ onClose }) {
//  const [saved, setSaved] = useState(false);
// const [uploadStatus, setUploadStatus] = useState(false);
// const [photo, setPhoto] = useState(null);
// const [photoFile, setPhotoFile] = useState(null);

// const fileInputRef = useRef(null);

//   const submit = async (e) => {
//     e.preventDefault();

//     try {
//       const result = await saveForm("admission", e.currentTarget);
//       const studentId = result?.data?.id;

//       if (photoFile && studentId) {
//         const { uploadStudentPhoto } = await import("../../api/formApi");
//         setUploadStatus(true);
//         await uploadStudentPhoto(studentId, photoFile);
//         setUploadStatus(false);
//       }

//       setSaved(true);
//       setTimeout(() => setSaved(false), 2200);
//     } catch (err) {
//       setUploadStatus(false);
//       alert(err.message || "Unable to save student admission.");
//     }
//   };

//   const handlePhotoChange = (e) => {
//   const file = e.target.files?.[0];

//   if (!file) return;

//   const imageUrl = URL.createObjectURL(file);

//   setPhoto(imageUrl);
//   setPhotoFile(file);
// };

//   const openPhotoPicker = () => {
//     fileInputRef.current?.click();
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
//             <UserPlus size={15} strokeWidth={2.8} />
//           </div>

//           <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
//             Student Admission Form
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
//             lg:grid-cols-[minmax(0,1fr)_230px]
//           "
//         >
//           {/* =================================================
//               LEFT SIDE
//           ================================================== */}
//           <div className="min-w-0">
//             {/* PRIMARY INFORMATION */}
//             <section
//               className="
//                 rounded-lg
//                 border
//                 border-[#79a9c9]
//                 bg-[#e6f0f7]
//                 p-2
//                 shadow-sm
//               "
//             >
//               <div
//                 className="
//                   mb-1.5
//                   flex
//                   flex-wrap
//                   items-center
//                   justify-between
//                   gap-1.5
//                   border-b
//                   border-[#c3d8e7]
//                   pb-1.5
//                 "
//               >
//                 <div
//                   className="
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
//                   Primary Information
//                 </div>

//                 <div className="hidden gap-1 xl:flex">
//                   <SmallTab active>Primary Information</SmallTab>
//                   <SmallTab>Parents Information</SmallTab>
//                   <SmallTab>Other Information</SmallTab>
//                   <SmallTab>Scanned Document</SmallTab>
//                 </div>
//               </div>

//               {/* GENERAL */}
//               <div
//                 className="
//                   rounded-md
//                   border
//                   border-[#567b94]
//                   bg-[#e3edf5]
//                   p-1.5
//                 "
//               >
//                 <SectionTitle title="General" />

//                 <div
//                   className="
//                     grid
//                     grid-cols-1
//                     gap-x-2
//                     gap-y-2

//                     sm:grid-cols-2
//                     lg:grid-cols-4
//                     xl:grid-cols-5
//                   "
//                 >
//                   <Field label="Adm. Form No" placeholder="Form no." />

//                   <SelectField
//                     label="Session"
//                     options={["2026 - 27", "2025 - 26", "2024 - 25"]}
//                   />

//                   <Field label="Computer ID" placeholder="Computer ID" />

//                   <Field label="Adm. No" placeholder="Admission no." />

//                   <Field label="Class Roll No" placeholder="Roll no." />

//                   <Field
//                     label="Name"
//                     placeholder="Student name"
//                     className="xl:col-span-2"
//                   />

//                   <Field label="First Name" placeholder="First name" />

//                   <SelectField
//                     label="Class"
//                     options={[
//                       "Select Class",
//                       "Nursery",
//                       "LKG",
//                       "UKG",
//                       "Class 1",
//                       "Class 2",
//                       "Class 3",
//                       "Class 4",
//                       "Class 5",
//                       "Class 6",
//                       "Class 7",
//                       "Class 8",
//                       "Class 9",
//                       "Class 10",
//                       "Class 11",
//                       "Class 12",
//                     ]}
//                   />

//                   <SelectField
//                     label="Section"
//                     options={["Select Section", "A", "B", "C", "D"]}
//                   />

//                   <SelectField
//                     label="Adm. Type"
//                     options={["New", "Old", "Transfer"]}
//                   />

//                   <SelectField
//                     label="Adm. Category"
//                     options={["Regular", "RTE", "Management", "Other"]}
//                   />

//                   <SelectField
//                     label="Gender"
//                     options={["Select Gender", "Male", "Female", "Other"]}
//                   />

//                   <Field label="Sr. No." placeholder="Serial no." />

//                   <SelectField
//                     label="House"
//                     options={["Select House", "Red", "Blue", "Green", "Yellow"]}
//                   />

//                   <SelectField
//                     label="Religion"
//                     options={[
//                       "Select Religion",
//                       "Hindu",
//                       "Muslim",
//                       "Sikh",
//                       "Christian",
//                       "Other",
//                     ]}
//                   />

//                   <SelectField
//                     label="Category"
//                     options={["General", "OBC", "SC", "ST", "Other"]}
//                   />

//                   <SelectField
//                     label="Caste"
//                     options={["Select Caste", "Other"]}
//                   />

//                   <Field label="Aadhar No" placeholder="Aadhar no." />

//                   <Field label="E-Mail ID" placeholder="Email" />

//                   <Field label="P.E.N." placeholder="PEN" />

//                   <SelectField
//                     label="Is Handicapped"
//                     options={["NO", "YES"]}
//                   />

//                   <Field label="Describe" placeholder="Description" />

//                   <SelectField
//                     label="Blood Group"
//                     options={[
//                       "None",
//                       "A+",
//                       "A-",
//                       "B+",
//                       "B-",
//                       "AB+",
//                       "AB-",
//                       "O+",
//                       "O-",
//                     ]}
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* =================================================
//                 LOWER INFORMATION
//             ================================================== */}
//             <div
//               className="
//                 mt-2
//                 grid
//                 grid-cols-1
//                 gap-2

//                 lg:grid-cols-3
//               "
//             >
//               {/* PARENTS */}
//               <section
//                 className="
//                   rounded-lg
//                   border
//                   border-[#547c98]
//                   bg-[#d9e7f2]
//                   p-1.5
//                 "
//               >
//                 <SectionTitle title="Parents" />

//                 <div className="space-y-1.5">
//                   <Field
//                     label="Father's Name"
//                     placeholder="Father's name"
//                     full
//                   />

//                   <Field
//                     label="Father's Aadhar No"
//                     placeholder="Aadhar no."
//                     full
//                   />

//                   <Field
//                     label="Mother's Name"
//                     placeholder="Mother's name"
//                     full
//                   />

//                   <Field
//                     label="Mother's Aadhar No"
//                     placeholder="Aadhar no."
//                     full
//                   />

//                   <Field
//                     label="Guardian's Name"
//                     placeholder="Guardian name"
//                     full
//                   />
//                 </div>
//               </section>

//               {/* DATE */}
//               <section
//                 className="
//                   rounded-lg
//                   border
//                   border-[#547c98]
//                   bg-[#d9e7f2]
//                   p-1.5
//                 "
//               >
//                 <SectionTitle title="Date" />

//                 <div className="space-y-1.5">
//                   <Field label="Date Of Birth" type="date" full />

//                   <Field label="Date Of Admission" type="date" full />

//                   <SelectField
//                     label="Admission In Class"
//                     options={[
//                       "Select Class",
//                       "Nursery",
//                       "LKG",
//                       "UKG",
//                       "Class 1",
//                       "Class 2",
//                       "Class 3",
//                       "Class 4",
//                       "Class 5",
//                       "Class 6",
//                       "Class 7",
//                       "Class 8",
//                       "Class 9",
//                       "Class 10",
//                       "Class 11",
//                       "Class 12",
//                     ]}
//                   />

//                   <label
//                     className="
//                       flex
//                       items-center
//                       gap-1.5
//                       pt-0.5
//                       text-[10px]
//                       font-semibold
//                       text-[#173b5c]
//                     "
//                   >
//                     <input
//                       type="checkbox"
//                       className="h-3.5 w-3.5 accent-[#174f7b]"
//                     />
//                     If Single Child
//                   </label>

//                   <div className="grid grid-cols-2 gap-1.5">
//                     <Field label="Height in Cm" placeholder="Height" />

//                     <Field label="Weight in Kg" placeholder="Weight" />
//                   </div>
//                 </div>
//               </section>

//               {/* DOCUMENTS */}
//               <section
//                 className="
//                   rounded-lg
//                   border
//                   border-[#547c98]
//                   bg-[#d9e7f2]
//                   p-1.5
//                 "
//               >
//                 <SectionTitle title="Document Submitted" />

//                 <div className="space-y-1.5">
//                   <Field
//                     label="Date Of Birth Certificate"
//                     type="date"
//                     full
//                   />

//                   <Field
//                     label="DOB Document"
//                     placeholder="DOB document"
//                     full
//                   />

//                   <div className="grid grid-cols-2 gap-1.5">
//                     <SelectField
//                       label="TC"
//                       options={["Select", "Yes", "No"]}
//                     />

//                     <SelectField
//                       label="TC Type"
//                       options={["Select", "Original", "Duplicate"]}
//                     />
//                   </div>

//                   <Field
//                     label="Document No."
//                     placeholder="Document no."
//                     full
//                   />

//                   <Field label="Remarks" placeholder="Remarks" full />
//                 </div>
//               </section>
//             </div>

//             {/* =================================================
//                 ADDRESS
//             ================================================== */}
//             <div
//               className="
//                 mt-2
//                 grid
//                 grid-cols-1
//                 gap-2

//                 lg:grid-cols-2
//               "
//             >
//               <AddressSection title="Present Address" />

//               <section
//                 className="
//                   rounded-lg
//                   border
//                   border-[#547c98]
//                   bg-[#d9e7f2]
//                   p-1.5
//                 "
//               >
//                 <SectionTitle title="Permanent Address" />

//                 <div className="space-y-1.5">
//                   <Field
//                     label="Address"
//                     placeholder="Permanent address"
//                     full
//                   />

//                   <div className="grid grid-cols-3 gap-1.5">
//                     <Field label="City" placeholder="City" />

//                     <Field label="District" placeholder="District" />

//                     <Field label="State" placeholder="State" />
//                   </div>

//                   <div className="grid grid-cols-3 gap-1.5">
//                     <Field label="Contact No" placeholder="Contact" />

//                     <Field label="PIN CODE" placeholder="PIN" />

//                     <SelectField
//                       label="Zone"
//                       options={["Zone", "North", "South", "East", "West"]}
//                     />
//                   </div>

//                   <label
//                     className="
//                       flex
//                       items-center
//                       gap-1.5
//                       text-[10px]
//                       font-semibold
//                       text-[#173b5c]
//                     "
//                   >
//                     <input
//                       type="checkbox"
//                       className="h-3.5 w-3.5 accent-[#174f7b]"
//                       defaultChecked
//                     />
//                     Is Indian
//                   </label>
//                 </div>
//               </section>
//             </div>
//           </div>

//           {/* =================================================
//               RIGHT SIDE
//           ================================================== */}
//           <div className="flex min-w-0 flex-col gap-2">
//             {/* SEARCH */}
//             <section
//               className="
//                 rounded-lg
//                 border
//                 border-[#547c98]
//                 bg-[#d3e2ed]
//                 p-1.5
//               "
//             >
//               <SectionTitle title="Search Student" />

//               <div className="flex flex-wrap items-center gap-2">
//                 <select
//                   className="
//                     h-7
//                     rounded-md
//                     border
//                     border-[#79a9c9]
//                     bg-white
//                     px-1.5
//                     text-[10px]
//                     font-semibold
//                     text-slate-800
//                     outline-none
//                     focus:border-[#0b5fa5]
//                     focus:ring-1
//                     focus:ring-[#0b5fa5]/30
//                   "
//                 >
//                   <option>Active</option>
//                   <option>Inactive</option>
//                   <option>All</option>
//                 </select>

//                 <RadioOption
//                   label="By Name"
//                   name="studentSearch"
//                   defaultChecked
//                 />

//                 <RadioOption label="By Contact" name="studentSearch" />
//               </div>

//               <div className="relative mt-1.5">
//                 <Search
//                   size={12}
//                   className="
//                     absolute
//                     left-2
//                     top-1/2
//                     -translate-y-1/2
//                     text-slate-400
//                   "
//                 />

//                 <input
//                   type="text"
//                   placeholder="Search student..."
//                   className="
//                     h-7
//                     w-full
//                     rounded-md
//                     border
//                     border-[#79a9c9]
//                     bg-white
//                     pl-7
//                     pr-2
//                     text-[11px]
//                     font-semibold
//                     text-slate-800
//                     outline-none
//                     focus:border-[#0b5fa5]
//                     focus:ring-1
//                     focus:ring-[#0b5fa5]/30
//                   "
//                 />
//               </div>

//               <div
//                 className="
//                   mt-1.5
//                   h-[105px]
//                   rounded-md
//                   border
//                   border-[#a2b9c8]
//                   bg-[#edf4f8]
//                 "
//               />
//             </section>

//             {/* =================================================
//                 PHOTO
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
//               <SectionTitle title="Student Photo" />

//               {/* Hidden browser file input */}
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoChange}
//                 className="hidden"
//               />

//               <div
//                 className="
//                   flex
//                   h-[145px]
//                   items-center
//                   justify-center
//                   overflow-hidden
//                   rounded-md
//                   border
//                   border-[#567b94]
//                   bg-[#e3edf5]
//                 "
//               >
//                 {photo ? (
//                   <img
//                     src={photo}
//                     alt="Student"
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <div className="text-center">
//                     <div
//                       className="
//                         mx-auto
//                         flex
//                         h-14
//                         w-14
//                         items-center
//                         justify-center
//                         rounded-full
//                         border-2
//                         border-[#7ca7c2]
//                         bg-[#d8a928]/25
//                       "
//                     >
//                       <Camera size={24} className="text-[#173b5c]/70" />
//                     </div>

//                     <p className="mt-1 text-[10px] font-black text-[#173b5c]">
//                       STUDENT PHOTO
//                     </p>

//                     <p className="text-[9px] font-semibold text-[#173b5c]/60">
//                       No photo selected
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* BROWSE */}
//               <button
//                 type="button"
//                 onClick={openPhotoPicker}
//                 className="
//                   mt-1.5
//                   flex
//                   h-8
//                   w-full
//                   items-center
//                   justify-center
//                   gap-1.5
//                   rounded-md
//                   border
//                   border-[#5d91b2]
//                   bg-gradient-to-r
//                   from-[#174f7b]
//                   via-[#216994]
//                   to-[#174f7b]
//                   text-[10px]
//                   font-black
//                   text-white
//                   transition-all
//                   hover:shadow-[0_0_12px_rgba(20,94,145,0.4)]
//                 "
//               >
//                 <Camera size={12} />
//                 Take / Select Photo
//               </button>

//               <button
//                 type="button"
//                 onClick={openPhotoPicker}
//                 className="
//                   mt-1.5
//                   flex
//                   h-7
//                   w-full
//                   items-center
//                   justify-center
//                   gap-1.5
//                   rounded-md
//                   border
//                   border-[#5685a6]
//                   bg-[#e4eef6]
//                   text-[10px]
//                   font-bold
//                   text-[#153b5a]
//                   transition-all
//                   hover:border-[#0b5fa5]
//                   hover:bg-[#d3e6f3]
//                 "
//               >
//                 <Upload size={11} />
//                 Browse
//               </button>

//               <button
//                 type="button"
//                 className="
//                   mt-1.5
//                   flex
//                   h-7
//                   w-full
//                   items-center
//                   justify-center
//                   gap-1.5
//                   rounded-md
//                   border
//                   border-[#5685a6]
//                   bg-[#e4eef6]
//                   text-[10px]
//                   font-bold
//                   text-[#153b5a]
//                   transition-all
//                   hover:border-[#0b5fa5]
//                   hover:bg-[#d3e6f3]
//                 "
//               >
//                 <RefreshCw size={11} />
//                 Sync From Server
//               </button>
//             </section>

//             {/* PHOTO STATUS */}
//             <section
//               className="
//                 rounded-lg
//                 border
//                 border-[#547c98]
//                 bg-[#d3e2ed]
//                 p-1.5
//               "
//             >
//               <SectionTitle title="Upload Status" />

//               <label
//                 className="
//                   flex
//                   items-center
//                   gap-1.5
//                   text-[10px]
//                   font-semibold
//                   text-[#173b5c]
//                 "
//               >
//                 <input
//                   type="checkbox"
//                   checked={uploadStatus}
//                   onChange={(e) => setUploadStatus(e.target.checked)}
//                   className="h-3.5 w-3.5 accent-[#174f7b]"
//                 />
//                 Upload Status
//               </label>

//               <p className="mt-1 text-[9px] text-[#173b5c]/70">
//                 {photo
//                   ? "Photo selected successfully."
//                   : "No photo selected."}
//               </p>
//             </section>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           ACTION BAR
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
//             icon={<Search size={14} strokeWidth={2.5} />}
//             label="Find Student"
//           />

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
//    FIELD
// ========================================================= */

// function Field({
//   label,
//   placeholder = "",
//   type = "text",
//   full = false,
//   className = "",
// }) {
//   return (
//     <div className={`${full ? "w-full" : "min-w-0"} ${className}`}>
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
//    SECTION TITLE
// ========================================================= */

// function SectionTitle({ title }) {
//   return (
//     <div
//       className="
//         mb-1.5
//         flex
//         h-7
//         items-center
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
//       {title}
//     </div>
//   );
// }

// /* =========================================================
//    ADDRESS
// ========================================================= */

// function AddressSection({ title }) {
//   return (
//     <section
//       className="
//         rounded-lg
//         border
//         border-[#547c98]
//         bg-[#d9e7f2]
//         p-1.5
//       "
//     >
//       <SectionTitle title={title} />

//       <div className="space-y-1.5">
//         <Field label="Address" placeholder="Enter address" full />

//         <div className="grid grid-cols-3 gap-1.5">
//           <Field label="City" placeholder="City" />

//           <Field label="District" placeholder="District" />

//           <Field label="State" placeholder="State" />
//         </div>

//         <div className="grid grid-cols-3 gap-1.5">
//           <Field label="Contact No" placeholder="Contact" />

//           <Field label="PIN CODE" placeholder="PIN" />

//           <SelectField
//             label="Zone"
//             options={["Zone", "North", "South", "East", "West"]}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// /* =========================================================
//    RADIO
// ========================================================= */

// function RadioOption({ label, name, defaultChecked = false }) {
//   return (
//     <label className="flex items-center gap-1.5">
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
//    TAB
// ========================================================= */

// function SmallTab({ children, active = false }) {
//   return (
//     <button
//       type="button"
//       className={`
//         rounded-md
//         border
//         px-2
//         py-1
//         text-[9px]
//         font-bold
//         transition-all

//         ${
//           active
//             ? "border-[#f5d76e] bg-gradient-to-r from-[#f8e8a8] to-[#f3d978] text-[#061a3a]"
//             : "border-[#79a9c9] bg-white text-[#173b5c] hover:border-[#0b5fa5]"
//         }
//       `}
//     >
//       {children}
//     </button>
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


import { saveForm, uploadStudentPhoto } from "../../api/formApi";
import { useRef, useState } from "react";

import {
  UserPlus,
  Search,
  Save,
  X,
  Pencil,
  Plus,
  Upload,
  RefreshCw,
  Camera,
} from "lucide-react";

export default function StudentAdmissionForm({ onClose }) {
  const [saved, setSaved] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const fileInputRef = useRef(null);

  // =====================================================
  // SUBMIT FORM
  // =====================================================
  
const submit = async (e) => {
  e.preventDefault();

  // Save the form element before using await
  const form = e.currentTarget;

  try {
    // Save student admission data
    const result = await saveForm("admission", form);

    const studentId =
      result?.data?.id ||
      result?.data?.student?.id ||
      result?.id ||
      result?.student?.id;

    if (!studentId) {
      throw new Error(
        "Student data was saved, but student ID was not returned by the server."
      );
    }

    // Upload photo if selected
    if (photoFile) {
      setUploadStatus(true);

      await uploadStudentPhoto(studentId, photoFile);

      setUploadStatus(false);
    }

    // -----------------------------
    // SUCCESS
    // -----------------------------

    setSaved(true);

    // Clear all form inputs
    form.reset();

    // Clear photo preview
    if (photo) {
      URL.revokeObjectURL(photo);
    }

    setPhoto(null);
    setPhotoFile(null);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Hide success message
    setTimeout(() => {
      setSaved(false);
    }, 2200);

  } catch (error) {
    console.error("Admission save error:", error);

    setUploadStatus(false);

    alert(error.message || "Unable to save student data.");
  }
};



  // =====================================================
  // PHOTO CHANGE
  // =====================================================
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Optional frontend validation
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = "";
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Photo size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    // Remove previous preview URL
    if (photo) {
      URL.revokeObjectURL(photo);
    }

    const imageUrl = URL.createObjectURL(file);

    setPhoto(imageUrl);
    setPhotoFile(file);
  };

  // =====================================================
  // OPEN PHOTO PICKER
  // =====================================================
  const openPhotoPicker = () => {
    fileInputRef.current?.click();
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
            <UserPlus size={15} strokeWidth={2.8} />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
            Student Admission Form
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
            lg:grid-cols-[minmax(0,1fr)_230px]
          "
        >
          {/* =================================================
              LEFT SIDE
          ================================================== */}
          <div className="min-w-0">
            {/* PRIMARY INFORMATION */}
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
                  flex-wrap
                  items-center
                  justify-between
                  gap-1.5
                  border-b
                  border-[#c3d8e7]
                  pb-1.5
                "
              >
                <div
                  className="
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
                  Primary Information
                </div>

                <div className="hidden gap-1 xl:flex">
                  <SmallTab active>
                    Primary Information
                  </SmallTab>

                  <SmallTab>
                    Parents Information
                  </SmallTab>

                  <SmallTab>
                    Other Information
                  </SmallTab>

                  <SmallTab>
                    Scanned Document
                  </SmallTab>
                </div>
              </div>

              {/* GENERAL */}
              <div
                className="
                  rounded-md
                  border
                  border-[#567b94]
                  bg-[#e3edf5]
                  p-1.5
                "
              >
                <SectionTitle title="General" />

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-x-2
                    gap-y-2
                    sm:grid-cols-2
                    lg:grid-cols-4
                    xl:grid-cols-5
                  "
                >
                  <Field
                    label="Adm. Form No"
                    name="admissionFormNo"
                    placeholder="Form no."
                  />

                  <SelectField
                    label="Session"
                    name="session"
                    options={[
                      "2026 - 27",
                      "2025 - 26",
                      "2024 - 25",
                    ]}
                  />

                  <Field
                    label="Computer ID"
                    name="computerId"
                    placeholder="Computer ID"
                  />

                  <Field
                    label="Adm. No"
                    name="admissionNo"
                    placeholder="Admission no."
                  />

                  <Field
                    label="Class Roll No"
                    name="classRollNo"
                    placeholder="Roll no."
                  />

                  <Field
                    label="Name"
                    name="name"
                    placeholder="Student name"
                    className="xl:col-span-2"
                  />

                  <Field
                    label="First Name"
                    name="firstName"
                    placeholder="First name"
                  />

                  <SelectField
                    label="Class"
                    name="className"
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

                  <SelectField
                    label="Section"
                    name="section"
                    options={[
                      "Select Section",
                      "A",
                      "B",
                      "C",
                      "D",
                    ]}
                  />

                  <SelectField
                    label="Adm. Type"
                    name="admissionType"
                    options={[
                      "New",
                      "Old",
                      "Transfer",
                    ]}
                  />

                  <SelectField
                    label="Adm. Category"
                    name="admissionCategory"
                    options={[
                      "Regular",
                      "RTE",
                      "Management",
                      "Other",
                    ]}
                  />

                  <SelectField
                    label="Gender"
                    name="gender"
                    options={[
                      "Select Gender",
                      "Male",
                      "Female",
                      "Other",
                    ]}
                  />

                  <Field
                    label="Sr. No."
                    name="serialNo"
                    placeholder="Serial no."
                  />

                  <SelectField
                    label="House"
                    name="house"
                    options={[
                      "Select House",
                      "Red",
                      "Blue",
                      "Green",
                      "Yellow",
                    ]}
                  />

                  <SelectField
                    label="Religion"
                    name="religion"
                    options={[
                      "Select Religion",
                      "Hindu",
                      "Muslim",
                      "Sikh",
                      "Christian",
                      "Other",
                    ]}
                  />

                  <SelectField
                    label="Category"
                    name="category"
                    options={[
                      "General",
                      "OBC",
                      "SC",
                      "ST",
                      "Other",
                    ]}
                  />

                  <SelectField
                    label="Caste"
                    name="caste"
                    options={[
                      "Select Caste",
                      "Other",
                    ]}
                  />

                  <Field
                    label="Aadhar No"
                    name="aadharNo"
                    placeholder="Aadhar no."
                  />

                  <Field
                    label="E-Mail ID"
                    name="email"
                    placeholder="Email"
                    type="email"
                  />

                  <Field
                    label="P.E.N."
                    name="pen"
                    placeholder="PEN"
                  />

                  <SelectField
                    label="Is Handicapped"
                    name="isHandicapped"
                    options={[
                      "NO",
                      "YES",
                    ]}
                  />

                  <Field
                    label="Describe"
                    name="describe"
                    placeholder="Description"
                  />

                  <SelectField
                    label="Blood Group"
                    name="bloodGroup"
                    options={[
                      "None",
                      "A+",
                      "A-",
                      "B+",
                      "B-",
                      "AB+",
                      "AB-",
                      "O+",
                      "O-",
                    ]}
                  />
                </div>
              </div>
            </section>

            {/* =================================================
                LOWER INFORMATION
            ================================================== */}
            <div
              className="
                mt-2
                grid
                grid-cols-1
                gap-2
                lg:grid-cols-3
              "
            >
              {/* PARENTS */}
              <section
                className="
                  rounded-lg
                  border
                  border-[#547c98]
                  bg-[#d9e7f2]
                  p-1.5
                "
              >
                <SectionTitle title="Parents" />

                <div className="space-y-1.5">
                  <Field
                    label="Father's Name"
                    name="fatherName"
                    placeholder="Father's name"
                    full
                  />

                  <Field
                    label="Father's Aadhar No"
                    name="fatherAadharNo"
                    placeholder="Aadhar no."
                    full
                  />

                  <Field
                    label="Mother's Name"
                    name="motherName"
                    placeholder="Mother's name"
                    full
                  />

                  <Field
                    label="Mother's Aadhar No"
                    name="motherAadharNo"
                    placeholder="Aadhar no."
                    full
                  />

                  <Field
                    label="Guardian's Name"
                    name="guardianName"
                    placeholder="Guardian name"
                    full
                  />
                </div>
              </section>

              {/* DATE */}
              <section
                className="
                  rounded-lg
                  border
                  border-[#547c98]
                  bg-[#d9e7f2]
                  p-1.5
                "
              >
                <SectionTitle title="Date" />

                <div className="space-y-1.5">
                  <Field
                    label="Date Of Birth"
                    name="dateOfBirth"
                    type="date"
                    full
                  />

                  <Field
                    label="Date Of Admission"
                    name="dateOfAdmission"
                    type="date"
                    full
                  />

                  <SelectField
                    label="Admission In Class"
                    name="admissionInClass"
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

                  <label
                    className="
                      flex
                      items-center
                      gap-1.5
                      pt-0.5
                      text-[10px]
                      font-semibold
                      text-[#173b5c]
                    "
                  >
                    <input
                      type="checkbox"
                      name="isSingleChild"
                      value="true"
                      className="h-3.5 w-3.5 accent-[#174f7b]"
                    />

                    If Single Child
                  </label>

                  <div className="grid grid-cols-2 gap-1.5">
                    <Field
                      label="Height in Cm"
                      name="heightCm"
                      placeholder="Height"
                    />

                    <Field
                      label="Weight in Kg"
                      name="weightKg"
                      placeholder="Weight"
                    />
                  </div>
                </div>
              </section>

              {/* DOCUMENTS */}
              <section
                className="
                  rounded-lg
                  border
                  border-[#547c98]
                  bg-[#d9e7f2]
                  p-1.5
                "
              >
                <SectionTitle title="Document Submitted" />

                <div className="space-y-1.5">
                  <Field
                    label="Date Of Birth Certificate"
                    name="dobCertificateDate"
                    type="date"
                    full
                  />

                  <Field
                    label="DOB Document"
                    name="dobDocument"
                    placeholder="DOB document"
                    full
                  />

                  <div className="grid grid-cols-2 gap-1.5">
                    <SelectField
                      label="TC"
                      name="tc"
                      options={[
                        "Select",
                        "Yes",
                        "No",
                      ]}
                    />

                    <SelectField
                      label="TC Type"
                      name="tcType"
                      options={[
                        "Select",
                        "Original",
                        "Duplicate",
                      ]}
                    />
                  </div>

                  <Field
                    label="Document No."
                    name="documentNo"
                    placeholder="Document no."
                    full
                  />

                  <Field
                    label="Remarks"
                    name="remarks"
                    placeholder="Remarks"
                    full
                  />
                </div>
              </section>
            </div>

            {/* =================================================
                ADDRESS
            ================================================== */}
            <div
              className="
                mt-2
                grid
                grid-cols-1
                gap-2
                lg:grid-cols-2
              "
            >
              <AddressSection
                title="Present Address"
                prefix="present"
              />

              <section
                className="
                  rounded-lg
                  border
                  border-[#547c98]
                  bg-[#d9e7f2]
                  p-1.5
                "
              >
                <SectionTitle title="Permanent Address" />

                <div className="space-y-1.5">
                  <Field
                    label="Address"
                    name="permanentAddress"
                    placeholder="Permanent address"
                    full
                  />

                  <div className="grid grid-cols-3 gap-1.5">
                    <Field
                      label="City"
                      name="permanentCity"
                      placeholder="City"
                    />

                    <Field
                      label="District"
                      name="permanentDistrict"
                      placeholder="District"
                    />

                    <Field
                      label="State"
                      name="permanentState"
                      placeholder="State"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    <Field
                      label="Contact No"
                      name="permanentContactNo"
                      placeholder="Contact"
                    />

                    <Field
                      label="PIN CODE"
                      name="permanentPinCode"
                      placeholder="PIN"
                    />

                    <SelectField
                      label="Zone"
                      name="permanentZone"
                      options={[
                        "Zone",
                        "North",
                        "South",
                        "East",
                        "West",
                      ]}
                    />
                  </div>

                  <label
                    className="
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
                      name="permanentIsIndian"
                      value="true"
                      defaultChecked
                      className="h-3.5 w-3.5 accent-[#174f7b]"
                    />

                    Is Indian
                  </label>
                </div>
              </section>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}
          <div className="flex min-w-0 flex-col gap-2">
            {/* SEARCH */}
            <section
              className="
                rounded-lg
                border
                border-[#547c98]
                bg-[#d3e2ed]
                p-1.5
              "
            >
              <SectionTitle title="Search Student" />

              <div className="flex flex-wrap items-center gap-2">
                <select
                  name="studentStatus"
                  className="
                    h-7
                    rounded-md
                    border
                    border-[#79a9c9]
                    bg-white
                    px-1.5
                    text-[10px]
                    font-semibold
                    text-slate-800
                    outline-none
                    focus:border-[#0b5fa5]
                    focus:ring-1
                    focus:ring-[#0b5fa5]/30
                  "
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="All">All</option>
                </select>

                <RadioOption
                  label="By Name"
                  name="studentSearch"
                  value="name"
                  defaultChecked
                />

                <RadioOption
                  label="By Contact"
                  name="studentSearch"
                  value="contact"
                />
              </div>

              <div className="relative mt-1.5">
                <Search
                  size={12}
                  className="
                    absolute
                    left-2
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  name="studentSearchValue"
                  type="text"
                  placeholder="Search student..."
                  className="
                    h-7
                    w-full
                    rounded-md
                    border
                    border-[#79a9c9]
                    bg-white
                    pl-7
                    pr-2
                    text-[11px]
                    font-semibold
                    text-slate-800
                    outline-none
                    focus:border-[#0b5fa5]
                    focus:ring-1
                    focus:ring-[#0b5fa5]/30
                  "
                />
              </div>

              <div
                className="
                  mt-1.5
                  h-[105px]
                  rounded-md
                  border
                  border-[#a2b9c8]
                  bg-[#edf4f8]
                "
              />
            </section>

            {/* =================================================
                PHOTO
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
              <SectionTitle title="Student Photo" />

              {/* Hidden browser file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              <div
                className="
                  flex
                  h-[145px]
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-md
                  border
                  border-[#567b94]
                  bg-[#e3edf5]
                "
              >
                {photo ? (
                  <img
                    src={photo}
                    alt="Student"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <div
                      className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        border-[#7ca7c2]
                        bg-[#d8a928]/25
                      "
                    >
                      <Camera
                        size={24}
                        className="text-[#173b5c]/70"
                      />
                    </div>

                    <p className="mt-1 text-[10px] font-black text-[#173b5c]">
                      STUDENT PHOTO
                    </p>

                    <p className="text-[9px] font-semibold text-[#173b5c]/60">
                      No photo selected
                    </p>
                  </div>
                )}
              </div>

              {/* BROWSE */}
              <button
                type="button"
                onClick={openPhotoPicker}
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
                  border-[#5d91b2]
                  bg-gradient-to-r
                  from-[#174f7b]
                  via-[#216994]
                  to-[#174f7b]
                  text-[10px]
                  font-black
                  text-white
                  transition-all
                  hover:shadow-[0_0_12px_rgba(20,94,145,0.4)]
                "
              >
                <Camera size={12} />
                Take / Select Photo
              </button>

              <button
                type="button"
                onClick={openPhotoPicker}
                className="
                  mt-1.5
                  flex
                  h-7
                  w-full
                  items-center
                  justify-center
                  gap-1.5
                  rounded-md
                  border
                  border-[#5685a6]
                  bg-[#e4eef6]
                  text-[10px]
                  font-bold
                  text-[#153b5a]
                  transition-all
                  hover:border-[#0b5fa5]
                  hover:bg-[#d3e6f3]
                "
              >
                <Upload size={11} />
                Browse
              </button>

              <button
                type="button"
                className="
                  mt-1.5
                  flex
                  h-7
                  w-full
                  items-center
                  justify-center
                  gap-1.5
                  rounded-md
                  border
                  border-[#5685a6]
                  bg-[#e4eef6]
                  text-[10px]
                  font-bold
                  text-[#153b5a]
                  transition-all
                  hover:border-[#0b5fa5]
                  hover:bg-[#d3e6f3]
                "
              >
                <RefreshCw size={11} />
                Sync From Server
              </button>
            </section>

            {/* =================================================
                PHOTO STATUS
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
              <SectionTitle title="Upload Status" />

              <label
                className="
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
                  checked={uploadStatus}
                  onChange={(e) =>
                    setUploadStatus(e.target.checked)
                  }
                  className="h-3.5 w-3.5 accent-[#174f7b]"
                />

                Upload Status
              </label>

              <p className="mt-1 text-[9px] text-[#173b5c]/70">
                {uploadStatus
                  ? "Photo uploaded successfully."
                  : photo
                  ? "Photo selected successfully."
                  : "No photo selected."}
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* =====================================================
          ACTION BAR
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
            icon={
              <Search
                size={14}
                strokeWidth={2.5}
              />
            }
            label="Find Student"
          />

          <ActionButton
            type="button"
            icon={
              <Plus
                size={14}
                strokeWidth={2.5}
              />
            }
            label="New"
          />

          <ActionButton
            type="submit"
            icon={
              <Save
                size={14}
                strokeWidth={2.5}
              />
            }
            label="Save"
            green
          />

          <ActionButton
            type="button"
            icon={
              <Pencil
                size={14}
                strokeWidth={2.5}
              />
            }
            label="Modify"
          />

          <ActionButton
            type="button"
            icon={
              <X
                size={14}
                strokeWidth={2.5}
              />
            }
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
   FIELD
========================================================= */

function Field({
  label,
  name,
  placeholder = "",
  type = "text",
  full = false,
  className = "",
}) {
  return (
    <div
      className={`${full ? "w-full" : "min-w-0"} ${className}`}
    >
      <label className={labelClass}>
        {label}
      </label>

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
  name,
  options = [],
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>
        {label}
      </label>

      <select
        name={name}
        className={inputClass}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({ title }) {
  return (
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
      {title}
    </div>
  );
}

/* =========================================================
   ADDRESS
========================================================= */

function AddressSection({
  title,
  prefix = "present",
}) {
  return (
    <section
      className="
        rounded-lg
        border
        border-[#547c98]
        bg-[#d9e7f2]
        p-1.5
      "
    >
      <SectionTitle title={title} />

      <div className="space-y-1.5">
        <Field
          label="Address"
          name={`${prefix}Address`}
          placeholder="Enter address"
          full
        />

        <div className="grid grid-cols-3 gap-1.5">
          <Field
            label="City"
            name={`${prefix}City`}
            placeholder="City"
          />

          <Field
            label="District"
            name={`${prefix}District`}
            placeholder="District"
          />

          <Field
            label="State"
            name={`${prefix}State`}
            placeholder="State"
          />
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          <Field
            label="Contact No"
            name={`${prefix}ContactNo`}
            placeholder="Contact"
          />

          <Field
            label="PIN CODE"
            name={`${prefix}PinCode`}
            placeholder="PIN"
          />

          <SelectField
            label="Zone"
            name={`${prefix}Zone`}
            options={[
              "Zone",
              "North",
              "South",
              "East",
              "West",
            ]}
          />
        </div>
      </div>
    </section>
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
    <label className="flex items-center gap-1.5">
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
   TAB
========================================================= */

function SmallTab({
  children,
  active = false,
}) {
  return (
    <button
      type="button"
      className={`
        rounded-md
        border
        px-2
        py-1
        text-[9px]
        font-bold
        transition-all

        ${
          active
            ? "border-[#f5d76e] bg-gradient-to-r from-[#f8e8a8] to-[#f3d978] text-[#061a3a]"
            : "border-[#79a9c9] bg-white text-[#173b5c] hover:border-[#0b5fa5]"
        }
      `}
    >
      {children}
    </button>
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

