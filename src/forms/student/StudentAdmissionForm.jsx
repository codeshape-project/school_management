
// import {
//   saveForm,
//   uploadStudentPhoto,
//   searchRecords,
// } from "../../api/formApi";
// import { useEffect, useRef, useState } from "react";

// import {
//   UserPlus,
//   Search,
//   Save,
//   X,
//   Upload,
//   RefreshCw,
//   Camera,
// } from "lucide-react";

// export default function StudentAdmissionForm({ onClose }) {
//   const [saved, setSaved] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState(false);
//   const [photo, setPhoto] = useState(null);
//   const [photoFile, setPhotoFile] = useState(null);

//   const fileInputRef = useRef(null);
//   const formRef = useRef(null);

//   /* ---------- search student ---------- */
//   const [studentFilter, setStudentFilter] = useState("Active");
//   const [studentBy, setStudentBy] = useState("name");
//   const [studentValue, setStudentValue] = useState("");
//   const studentSearch = useRecordSearch(
//     "admission",
//     studentBy,
//     studentValue,
//     studentFilter
//   );

//   // put saved student data into the form fields (matched by field name)
//   const fillForm = (values) => {
//     const formEl = formRef.current;
//     if (!formEl) return;

//     Object.entries(values).forEach(([name, value]) => {
//       const el = formEl.elements[name];

//       if (!el || el instanceof RadioNodeList) return;
//       if (value === undefined || value === null) return;

//       if (el.type === "checkbox") {
//         el.checked = String(value) === "true";
//       } else if (el.type !== "file") {
//         el.value = String(value);
//       }
//     });
//   };

//   const pickStudent = (row) => {
//     const data = { ...(row.form_data || {}) };

//     SEARCH_KEYS.forEach((key) => delete data[key]);

//     fillForm({
//       ...data,
//       name: data.name || row.name,
//       admissionNo: data.admissionNo || row.admission_no,
//     });

//     setStudentValue("");
//   };

//   // =====================================================
//   // SUBMIT FORM
//   // =====================================================
  
// const submit = async (e) => {
//   e.preventDefault();

//   // Save the form element before using await
//   const form = e.currentTarget;

//   try {
//     // Save student admission data
//     const data = Object.fromEntries(new FormData(form).entries());

//     // search box values are not part of the student data
//     SEARCH_KEYS.forEach((key) => delete data[key]);

//     const result = await saveForm("admission", data);

//     const studentId =
//       result?.data?.id ||
//       result?.data?.student?.id ||
//       result?.id ||
//       result?.student?.id;

//     if (!studentId) {
//       throw new Error(
//         "Student data was saved, but student ID was not returned by the server."
//       );
//     }

//     // Upload photo if selected
//     if (photoFile) {
//       setUploadStatus(true);

//       await uploadStudentPhoto(studentId, photoFile);

//       setUploadStatus(false);
//     }

//     // -----------------------------
//     // SUCCESS
//     // -----------------------------

//     setSaved(true);

//     // Clear all form inputs
//     form.reset();

//     // Clear photo preview
//     if (photo) {
//       URL.revokeObjectURL(photo);
//     }

//     setPhoto(null);
//     setPhotoFile(null);
//        setStudentValue("");

//     // Clear file input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }

//     // Hide success message
//     setTimeout(() => {
//       setSaved(false);
//     }, 2200);

//   } catch (error) {
//     console.error("Admission save error:", error);

//     setUploadStatus(false);

//     alert(error.message || "Unable to save student data.");
//   }
// };



//   // =====================================================
//   // PHOTO CHANGE
//   // =====================================================
//   const handlePhotoChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     // Optional frontend validation
//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image file.");
//       e.target.value = "";
//       return;
//     }

//     // 5 MB limit
//     if (file.size > 5 * 1024 * 1024) {
//       alert("Photo size must be less than 5 MB.");
//       e.target.value = "";
//       return;
//     }

//     // Remove previous preview URL
//     if (photo) {
//       URL.revokeObjectURL(photo);
//     }

//     const imageUrl = URL.createObjectURL(file);

//     setPhoto(imageUrl);
//     setPhotoFile(file);
//   };

//   // =====================================================
//   // OPEN PHOTO PICKER
//   // =====================================================
//   const openPhotoPicker = () => {
//     fileInputRef.current?.click();
//   };

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
//                   <SmallTab active>
//                     Primary Information
//                   </SmallTab>

//                   <SmallTab>
//                     Parents Information
//                   </SmallTab>

//                   <SmallTab>
//                     Other Information
//                   </SmallTab>

//                   <SmallTab>
//                     Scanned Document
//                   </SmallTab>
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
//                   <Field
//                     label="Adm. Form No"
//                     name="admissionFormNo"
//                     placeholder="Form no."
//                   />

//                   <SelectField
//                     label="Session"
//                     name="session"
//                     options={[
//                       "2026 - 27",
//                       "2025 - 26",
//                       "2024 - 25",
//                     ]}
//                   />

//                   <Field
//                     label="Computer ID"
//                     name="computerId"
//                     placeholder="Computer ID"
//                   />

//                   <Field
//                     label="Adm. No"
//                     name="admissionNo"
//                     placeholder="Admission no."
//                   />

//                   <Field
//                     label="Class Roll No"
//                     name="classRollNo"
//                     placeholder="Roll no."
//                   />

//                   <Field
//                     label="Name"
//                     name="name"
//                     placeholder="Student name"
//                     className="xl:col-span-2"
//                   />

//                   <Field
//                     label="First Name"
//                     name="firstName"
//                     placeholder="First name"
//                   />

//                   <SelectField
//                     label="Class"
//                     name="className"
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
//                     name="section"
//                     options={[
//                       "Select Section",
//                       "A",
//                       "B",
//                       "C",
//                       "D",
//                     ]}
//                   />

//                   <SelectField
//                     label="Adm. Type"
//                     name="admissionType"
//                     options={[
//                       "New",
//                       "Old",
//                       "Transfer",
//                     ]}
//                   />

//                   <SelectField
//                     label="Adm. Category"
//                     name="admissionCategory"
//                     options={[
//                       "Regular",
//                       "RTE",
//                       "Management",
//                       "Other",
//                     ]}
//                   />

//                   <SelectField
//                     label="Gender"
//                     name="gender"
//                     options={[
//                       "Select Gender",
//                       "Male",
//                       "Female",
//                       "Other",
//                     ]}
//                   />

//                   <Field
//                     label="Sr. No."
//                     name="serialNo"
//                     placeholder="Serial no."
//                   />

//                   <SelectField
//                     label="House"
//                     name="house"
//                     options={[
//                       "Select House",
//                       "Red",
//                       "Blue",
//                       "Green",
//                       "Yellow",
//                     ]}
//                   />

//                   <SelectField
//                     label="Religion"
//                     name="religion"
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
//                     name="category"
//                     options={[
//                       "General",
//                       "OBC",
//                       "SC",
//                       "ST",
//                       "Other",
//                     ]}
//                   />

//                   <SelectField
//                     label="Caste"
//                     name="caste"
//                     options={[
//                       "Select Caste",
//                       "Other",
//                     ]}
//                   />

//                   <Field
//                     label="Aadhar No"
//                     name="aadharNo"
//                     placeholder="Aadhar no."
//                   />

//                   <Field
//                     label="E-Mail ID"
//                     name="email"
//                     placeholder="Email"
//                     type="email"
//                   />

//                   <Field
//                     label="P.E.N."
//                     name="pen"
//                     placeholder="PEN"
//                   />

//                   <SelectField
//                     label="Is Handicapped"
//                     name="isHandicapped"
//                     options={[
//                       "NO",
//                       "YES",
//                     ]}
//                   />

//                   <Field
//                     label="Describe"
//                     name="describe"
//                     placeholder="Description"
//                   />

//                   <SelectField
//                     label="Blood Group"
//                     name="bloodGroup"
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
//                     name="fatherName"
//                     placeholder="Father's name"
//                     full
//                   />

//                   <Field
//                     label="Father's Aadhar No"
//                     name="fatherAadharNo"
//                     placeholder="Aadhar no."
//                     full
//                   />

//                   <Field
//                     label="Mother's Name"
//                     name="motherName"
//                     placeholder="Mother's name"
//                     full
//                   />

//                   <Field
//                     label="Mother's Aadhar No"
//                     name="motherAadharNo"
//                     placeholder="Aadhar no."
//                     full
//                   />

//                   <Field
//                     label="Guardian's Name"
//                     name="guardianName"
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
//                   <Field
//                     label="Date Of Birth"
//                     name="dateOfBirth"
//                     type="date"
//                     full
//                   />

//                   <Field
//                     label="Date Of Admission"
//                     name="dateOfAdmission"
//                     type="date"
//                     full
//                   />

//                   <SelectField
//                     label="Admission In Class"
//                     name="admissionInClass"
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
//                       name="isSingleChild"
//                       value="true"
//                       className="h-3.5 w-3.5 accent-[#174f7b]"
//                     />

//                     If Single Child
//                   </label>

//                   <div className="grid grid-cols-2 gap-1.5">
//                     <Field
//                       label="Height in Cm"
//                       name="heightCm"
//                       placeholder="Height"
//                     />

//                     <Field
//                       label="Weight in Kg"
//                       name="weightKg"
//                       placeholder="Weight"
//                     />
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
//                     name="dobCertificateDate"
//                     type="date"
//                     full
//                   />

//                   <Field
//                     label="DOB Document"
//                     name="dobDocument"
//                     placeholder="DOB document"
//                     full
//                   />

//                   <div className="grid grid-cols-2 gap-1.5">
//                     <SelectField
//                       label="TC"
//                       name="tc"
//                       options={[
//                         "Select",
//                         "Yes",
//                         "No",
//                       ]}
//                     />

//                     <SelectField
//                       label="TC Type"
//                       name="tcType"
//                       options={[
//                         "Select",
//                         "Original",
//                         "Duplicate",
//                       ]}
//                     />
//                   </div>

//                   <Field
//                     label="Document No."
//                     name="documentNo"
//                     placeholder="Document no."
//                     full
//                   />

//                   <Field
//                     label="Remarks"
//                     name="remarks"
//                     placeholder="Remarks"
//                     full
//                   />
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
//               <AddressSection
//                 title="Present Address"
//                 prefix="present"
//               />

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
//                     name="permanentAddress"
//                     placeholder="Permanent address"
//                     full
//                   />

//                   <div className="grid grid-cols-3 gap-1.5">
//                     <Field
//                       label="City"
//                       name="permanentCity"
//                       placeholder="City"
//                     />

//                     <Field
//                       label="District"
//                       name="permanentDistrict"
//                       placeholder="District"
//                     />

//                     <Field
//                       label="State"
//                       name="permanentState"
//                       placeholder="State"
//                     />
//                   </div>

//                   <div className="grid grid-cols-3 gap-1.5">
//                     <Field
//                       label="Contact No"
//                       name="permanentContactNo"
//                       placeholder="Contact"
//                     />

//                     <Field
//                       label="PIN CODE"
//                       name="permanentPinCode"
//                       placeholder="PIN"
//                     />

//                     <SelectField
//                       label="Zone"
//                       name="permanentZone"
//                       options={[
//                         "Zone",
//                         "North",
//                         "South",
//                         "East",
//                         "West",
//                       ]}
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
//                       name="permanentIsIndian"
//                       value="true"
//                       defaultChecked
//                       className="h-3.5 w-3.5 accent-[#174f7b]"
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
//                   name="studentStatus"
//                   value={studentFilter}
//                   onChange={(e) => setStudentFilter(e.target.value)}
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
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                   <option value="All">All</option>
//                 </select>

//                                 <RadioOption
//                   label="By Name"
//                   name="studentSearch"
//                   value="name"
//                   defaultChecked
//                   onChange={() => setStudentBy("name")}
//                 />

//                 <RadioOption
//                   label="By Contact"
//                   name="studentSearch"
//                   value="contact"
//                   onChange={() => setStudentBy("contact")}
//                 />
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
//                   name="studentSearchValue"
//                   type="text"
//                   value={studentValue}
//                   onChange={(e) => setStudentValue(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
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

//                            <div
//                 className="
//                   mt-1.5
//                   h-[105px]
//                   overflow-y-auto
//                   rounded-md
//                   border
//                   border-[#a2b9c8]
//                   bg-[#edf4f8]
//                   p-1
//                 "
//               >
//                 <SearchList
//                   search={studentSearch}
//                   onPick={pickStudent}
//                 />
//               </div>
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
//                       <Camera
//                         size={24}
//                         className="text-[#173b5c]/70"
//                       />
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

//             {/* =================================================
//                 PHOTO STATUS
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
//                   onChange={(e) =>
//                     setUploadStatus(e.target.checked)
//                   }
//                   className="h-3.5 w-3.5 accent-[#174f7b]"
//                 />

//                 Upload Status
//               </label>

//               <p className="mt-1 text-[9px] text-[#173b5c]/70">
//                 {uploadStatus
//                   ? "Photo uploaded successfully."
//                   : photo
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
//                     {/* <ActionButton
//             type="button"
//             icon={
//               <Search
//                 size={14}
//                 strokeWidth={2.5}
//               />
//             }
//             label="Find Student"
//           /> */}

//           {/* <ActionButton
//             type="button"
//             icon={
//               <Plus
//                 size={14}
//                 strokeWidth={2.5}
//               />
//             }
//             label="New"
//           /> */}

//           <ActionButton
//             type="submit"
//             icon={
//               <Save
//                 size={14}
//                 strokeWidth={2.5}
//               />
//             }
//             label="Save"
//             green
//           />

//           {/* <ActionButton
//             type="button"
//             icon={
//               <Pencil
//                 size={14}
//                 strokeWidth={2.5}
//               />
//             }
//             label="Modify"
//           /> */}

//           <ActionButton
//             type="button"
//             icon={
//               <X
//                 size={14}
//                 strokeWidth={2.5}
//               />
//             }
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
//   name,
//   placeholder = "",
//   type = "text",
//   full = false,
//   className = "",
// }) {
//   return (
//     <div
//       className={`${full ? "w-full" : "min-w-0"} ${className}`}
//     >
//       <label className={labelClass}>
//         {label}
//       </label>

//       <input
//         name={name}
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

// function SelectField({
//   label,
//   name,
//   options = [],
// }) {
//   return (
//     <div className="min-w-0">
//       <label className={labelClass}>
//         {label}
//       </label>

//       <select
//         name={name}
//         className={inputClass}
//       >
//         {options.map((option) => (
//           <option
//             key={option}
//             value={option}
//           >
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

// function AddressSection({
//   title,
//   prefix = "present",
// }) {
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
//         <Field
//           label="Address"
//           name={`${prefix}Address`}
//           placeholder="Enter address"
//           full
//         />

//         <div className="grid grid-cols-3 gap-1.5">
//           <Field
//             label="City"
//             name={`${prefix}City`}
//             placeholder="City"
//           />

//           <Field
//             label="District"
//             name={`${prefix}District`}
//             placeholder="District"
//           />

//           <Field
//             label="State"
//             name={`${prefix}State`}
//             placeholder="State"
//           />
//         </div>

//         <div className="grid grid-cols-3 gap-1.5">
//           <Field
//             label="Contact No"
//             name={`${prefix}ContactNo`}
//             placeholder="Contact"
//           />

//           <Field
//             label="PIN CODE"
//             name={`${prefix}PinCode`}
//             placeholder="PIN"
//           />

//           <SelectField
//             label="Zone"
//             name={`${prefix}Zone`}
//             options={[
//               "Zone",
//               "North",
//               "South",
//               "East",
//               "West",
//             ]}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// /* =========================================================
//    RADIO
// ========================================================= */

// function RadioOption({
//   label,
//   name,
//     value,
//   defaultChecked = false,
//   onChange,
// }) {
//   return (
//     <label className="flex items-center gap-1.5">
//       <input
//         type="radio"
//         name={name}
//         value={value}
//         defaultChecked={defaultChecked}
//         onChange={onChange}
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

// function SmallTab({
//   children,
//   active = false,
// }) {
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
//    LIVE STUDENT SEARCH (runs 0.35s after typing stops)
// ========================================================= */

// // search box values that must not be saved with the student
// const SEARCH_KEYS = [
//   "studentStatus",
//   "studentSearch",
//   "studentSearchValue",
// ];

// function useRecordSearch(type, by, value, status) {
//   const [results, setResults] = useState([]);
//   const [state, setState] = useState("idle"); // idle | loading | done | empty | error

//   useEffect(() => {
//     const term = value.trim();

//     if (!term) {
//       setResults([]);
//       setState("idle");
//       return undefined;
//     }

//     let cancelled = false;
//     setState("loading");

//     const timer = setTimeout(async () => {
//       try {
//         const result = await searchRecords(type, by, term, status);
//         if (cancelled) return;

//         const rows = result?.data || [];
//         setResults(rows);
//         setState(rows.length ? "done" : "empty");
//       } catch {
//         if (!cancelled) {
//           setResults([]);
//           setState("error");
//         }
//       }
//     }, 350);

//     return () => {
//       cancelled = true;
//       clearTimeout(timer);
//     };
//   }, [type, by, value, status]);

//   return { results, state };
// }

// /* =========================================================
//    SEARCH RESULT LIST
// ========================================================= */

// function SearchList({ search, onPick }) {
//   if (search.state !== "done") {
//     const text =
//       search.state === "loading"
//         ? "Searching..."
//         : search.state === "empty"
//         ? "No student found."
//         : search.state === "error"
//         ? "Unable to search."
//         : "Type a name or contact no. to search";

//     return (
//       <p className="px-1 py-1 text-[9px] font-semibold text-[#173b5c]/70">
//         {text}
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-1">
//       {search.results.map((row) => (
//         <button
//           type="button"
//           key={row.id}
//           onClick={() => onPick(row)}
//           className="w-full rounded-md border border-[#79a9c9] bg-white px-2 py-1 text-left transition-all hover:border-[#0b5fa5] hover:bg-[#eef6fb]"
//         >
//           <div className="flex items-center justify-between gap-2">
//             <span className="truncate text-[10px] font-bold text-[#173b5c]">
//               {row.name || row.form_data?.name || "-"}
//             </span>

//             <span className="shrink-0 rounded-md bg-[#174f7b] px-1.5 py-0.5 text-[8px] font-bold text-[#ffd75a]">
//               {row.admission_no || row.record_no}
//             </span>
//           </div>

//           <div className="mt-0.5 truncate text-[9px] text-[#173b5c]/70">
//             {`Class: ${row.class_name || "-"}  |  Contact: ${
//               row.phone ||
//               row.form_data?.presentContactNo ||
//               row.form_data?.permanentContactNo ||
//               "-"
//             }`}
//           </div>
//         </button>
//       ))}
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


import {
  saveForm,
  uploadStudentPhoto,
  searchRecords,
  getAdmissionByFormNo,
} from "../../api/formApi";

import { useEffect, useRef, useState } from "react";
import { notify } from "../../components/Toast";
import { printAdmissionSlip } from "../../utils/admissionSlip";

import {
  UserPlus, Search, Save, Printer, X, Upload, RefreshCw, Camera,
} from "lucide-react";

const SEARCH_KEYS = ["studentStatus", "studentSearch", "studentSearchValue"];

export default function StudentAdmissionForm({ onClose }) {
  const [uploadStatus, setUploadStatus] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [admissionFormNo, setAdmissionFormNo] = useState("");
  const [loadedId, setLoadedId] = useState(null);

  const [studentFilter, setStudentFilter] = useState("Active");
  const [studentBy, setStudentBy] = useState("name");
  const [studentValue, setStudentValue] = useState("");

  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const loadedFormNoRef = useRef("");

  const studentSearch = useRecordSearch(
    "admission", studentBy, studentValue, studentFilter
  );

  const collectValues = () => {
    const data = Object.fromEntries(new FormData(formRef.current).entries());
    SEARCH_KEYS.forEach((key) => delete data[key]);
    data.admissionFormNo = String(
      data.admissionFormNo || admissionFormNo || ""
    ).trim();
    return data;
  };

  const fillForm = (values) => {
    const formEl = formRef.current;
    if (!formEl) return;

    Object.entries(values).forEach(([name, value]) => {
      if (SEARCH_KEYS.includes(name)) return;
      const element = formEl.elements.namedItem(name);
      if (!element || value === undefined || value === null) return;
      if (element instanceof RadioNodeList) return;
      if (element.type === "file") return;

      if (element.type === "checkbox") {
        element.checked =
          value === true ||
          String(value).toLowerCase() === "true" ||
          String(value) === "1";
      } else {
        element.value = String(value);
      }
    });
  };

  const pickStudent = (row) => {
    const data = { ...(row.form_data || {}) };

    formRef.current?.reset(); // clear the previous student first

    fillForm({
      ...data,
      name: data.name || row.name || "",
      admissionNo: data.admissionNo || row.admission_no || "",
      className: data.className || row.class_name || "",
      section: data.section || row.section || "",
      session: data.session || row.session || "",
    });

    const formNo = String(data.admissionFormNo || "").trim();
    setAdmissionFormNo(formNo);
    loadedFormNoRef.current = formNo.toLowerCase();

    if (photo?.startsWith("blob:")) URL.revokeObjectURL(photo);
    setPhoto(row.photo_path || data.photoUrl || null);
    setPhotoFile(null);
    setUploadStatus(Boolean(row.photo_path || data.photoUrl));

    setLoadedId(row.id || null);
    setStudentValue("");
  };

  const fetchByFormNo = async (value, { quiet = false } = {}) => {
    const term = String(value || "").trim();
    if (!term || fetching) return;
    if (quiet && term.toLowerCase() === loadedFormNoRef.current) return;

    setFetching(true);
    try {
      const student = await getAdmissionByFormNo(term);

      if (!student) {
        if (!quiet) {
          notify.info(
            `No saved admission found for Form No. "${term}". You can fill a new admission.`
          );
        }
        return;
      }

      pickStudent(student);
      notify.success(`Student details loaded: ${student.name || term}`);
    } catch (error) {
      console.error("Fetch admission error:", error);
      notify.error(error.message || "Unable to fetch student details.");
    } finally {
      setFetching(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (saving) return;

    const data = collectValues();

    if (!String(data.name || "").trim()) {
      notify.error("Student name is required.");
      return;
    }

    setSaving(true);
    try {
      const result = await saveForm("admission", data, { silent: true });
      const saved = result?.data || result;
      const studentId = saved?.id;

      if (!studentId) {
        throw new Error("Student was saved, but the server did not return a student ID.");
      }

      const formNo = saved?.form_data?.admissionFormNo || data.admissionFormNo;
      setAdmissionFormNo(formNo);
      loadedFormNoRef.current = String(formNo).toLowerCase();
      setLoadedId(studentId);

      let photoFailed = "";

      if (photoFile) {
        setUploadStatus(false);
        try {
          const uploadResult = await uploadStudentPhoto(studentId, photoFile);
          const uploaded = uploadResult?.data || uploadResult;
          const url = uploaded?.photo_path;

          if (url) {
            if (photo?.startsWith("blob:")) URL.revokeObjectURL(photo);
            setPhoto(url);
            setPhotoFile(null);
            setUploadStatus(true);
          }
        } catch (uploadError) {
          console.error("Photo upload error:", uploadError);
          photoFailed = uploadError.message || "Photo upload failed.";
        }
      }

      notify.success(
        saved?.updated
          ? `Admission updated successfully! Form No. ${formNo}`
          : `Admission saved successfully! Form No. ${formNo}`
      );

      if (photoFailed) {
        notify.error(`Student saved, but the photo was not uploaded: ${photoFailed}`);
      }
    } catch (error) {
      console.error("Admission save error:", error);
      notify.error(error.message || "Unable to save student data.");
    } finally {
      setSaving(false);
    }
  };

  const printSlip = () => {
    const values = collectValues();

    if (!String(values.name || "").trim()) {
      notify.info("Fetch a student by Form No. (or fill the form) before printing the slip.");
      return;
    }

    printAdmissionSlip({ ...values, photoUrl: photo || "" });
  };

  const clearAdmissionForm = () => {
    formRef.current?.reset();
    if (photo?.startsWith("blob:")) URL.revokeObjectURL(photo);

    setPhoto(null);
    setPhotoFile(null);
    setStudentValue("");
    setAdmissionFormNo("");
    setLoadedId(null);
    setUploadStatus(false);
    loadedFormNoRef.current = "";

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify.error("Please select an image file.");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      notify.error("Photo size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    if (photo?.startsWith("blob:")) URL.revokeObjectURL(photo);
    setPhoto(URL.createObjectURL(file));
    setPhotoFile(file);
    setUploadStatus(false);
  };

  const openPhotoPicker = () => fileInputRef.current?.click();

  const clearPhotoSelection = () => {
    if (photo?.startsWith("blob:")) URL.revokeObjectURL(photo);
    setPhoto(null);
    setPhotoFile(null);
    setUploadStatus(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const photoRef = useRef(null);
  photoRef.current = photo;

  useEffect(() => {
    return () => {
      if (photoRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(photoRef.current);
      }
    };
  }, []);

  /* ============ RENDER ============ */
  return (
    
      <form
        ref={formRef}
        onSubmit={submit}
        className="flex h-auto max-h-[calc(100vh-72px)] w-full max-w-[1180px] flex-col overflow-hidden rounded-[22px] border-2 border-[#0b2a52] bg-[#dbe9f4] p-2.5 shadow-[0_0_18px_rgba(11,42,82,0.30)]"
      >
        {/* HEADER */}
        <div className="flex min-h-[38px] shrink-0 items-center justify-between gap-2 rounded-lg border border-[#5d91b2] bg-gradient-to-r from-[#174f7b] via-[#216994] to-[#174f7b] px-3 py-1.5 text-white">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#d8a928] text-[#102f4b]">
              <UserPlus size={15} strokeWidth={2.8} />
            </div>

            <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
              Student Admission Form
            </h2>
            {loadedId && (
  <span className="shrink-0 rounded-md border border-amber-300 bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-100">
    Saved record - Save will update it
  </span>
)}
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Close"
            className="flex h-7 w-8 shrink-0 items-center justify-center rounded-md border border-red-300 bg-red-600 text-white transition-all hover:bg-red-700"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain p-1.5 pb-2 scrollbar-thin">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1fr)_230px]">

            {/* LEFT SIDE */}
            <div className="min-w-0">

              {/* PRIMARY INFORMATION */}
              <section className="rounded-lg border border-[#79a9c9] bg-[#e6f0f7] p-2 shadow-sm">
                <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1.5 border-b border-[#c3d8e7] pb-1.5">
                  <div className="flex h-7 items-center rounded-md border border-[#7ca7c2] bg-[#c8dce9] px-2 text-[10px] font-black uppercase tracking-wide text-[#163d5c]">
                    Primary Information
                  </div>

                  <div className="hidden gap-1 xl:flex">
                    <SmallTab active>Primary Information</SmallTab>
                    <SmallTab>Parents Information</SmallTab>
                    <SmallTab>Other Information</SmallTab>
                    <SmallTab>Scanned Document</SmallTab>
                  </div>
                </div>

                {/* GENERAL */}
                <div className="rounded-md border border-[#567b94] bg-[#e3edf5] p-1.5">
                  <SectionTitle title="General" />

                  <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">

                    <div className="min-w-0">
  <label className={labelClass}>Adm. Form No (Enter to Fetch)</label>

  <div className="flex gap-1">
    <input
      name="admissionFormNo"
      value={admissionFormNo}
      onChange={(e) => setAdmissionFormNo(e.target.value)}
      onBlur={(e) => fetchByFormNo(e.target.value, { quiet: true })}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          fetchByFormNo(e.currentTarget.value);
        }
      }}
      placeholder="Form no. + Enter"
      autoComplete="off"
      className={inputClass}
    />

    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => fetchByFormNo(admissionFormNo)}
      disabled={fetching}
      title="Fetch student by form no."
      className="flex h-7 w-8 shrink-0 items-center justify-center rounded-md border border-[#5d91b2] bg-[#174f7b] text-white hover:bg-[#216994] disabled:opacity-60"
    >
      <Search size={13} strokeWidth={2.6} />
    </button>
  </div>
</div>

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
                      options={["Select Section", "A", "B", "C", "D"]}
                    />

                    <SelectField
                      label="Adm. Type"
                      name="admissionType"
                      options={["New", "Old", "Transfer"]}
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
                      options={["General", "OBC", "SC", "ST", "Other"]}
                    />

                    <SelectField
                      label="Caste"
                      name="caste"
                      options={["Select Caste", "Other"]}
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
                      options={["NO", "YES"]}
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

              {/* LOWER INFORMATION */}
              <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-3">

                {/* PARENTS */}
                <section className="rounded-lg border border-[#547c98] bg-[#d9e7f2] p-1.5">
                  <SectionTitle title="Parents" />

                  <div className="space-y-1.5">
                    <Field label="Father's Name" name="fatherName" placeholder="Father's name" full />
                    <Field label="Father's Aadhar No" name="fatherAadharNo" placeholder="Aadhar no." full />
                    <Field label="Mother's Name" name="motherName" placeholder="Mother's name" full />
                    <Field label="Mother's Aadhar No" name="motherAadharNo" placeholder="Aadhar no." full />
                    <Field label="Guardian's Name" name="guardianName" placeholder="Guardian name" full />
                  </div>
                </section>

                {/* DATE */}
                <section className="rounded-lg border border-[#547c98] bg-[#d9e7f2] p-1.5">
                  <SectionTitle title="Date" />

                  <div className="space-y-1.5">
                    <Field label="Date Of Birth" name="dateOfBirth" type="date" full />
                    <Field label="Date Of Admission" name="dateOfAdmission" type="date" full />

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

                    <label className="flex items-center gap-1.5 pt-0.5 text-[10px] font-semibold text-[#173b5c]">
                      <input
                        type="checkbox"
                        name="isSingleChild"
                        value="true"
                        className="h-3.5 w-3.5 accent-[#174f7b]"
                      />
                      If Single Child
                    </label>

                    <div className="grid grid-cols-2 gap-1.5">
                      <Field label="Height in Cm" name="heightCm" placeholder="Height" />
                      <Field label="Weight in Kg" name="weightKg" placeholder="Weight" />
                    </div>
                  </div>
                </section>

                {/* DOCUMENTS */}
                <section className="rounded-lg border border-[#547c98] bg-[#d9e7f2] p-1.5">
                  <SectionTitle title="Document Submitted" />

                  <div className="space-y-1.5">
                    <Field label="Date Of Birth Certificate" name="dobCertificateDate" type="date" full />
                    <Field label="DOB Document" name="dobDocument" placeholder="DOB document" full />

                    <div className="grid grid-cols-2 gap-1.5">
                      <SelectField label="TC" name="tc" options={["Select", "Yes", "No"]} />
                      <SelectField label="TC Type" name="tcType" options={["Select", "Original", "Duplicate"]} />
                    </div>

                    <Field label="Document No." name="documentNo" placeholder="Document no." full />
                    <Field label="Remarks" name="remarks" placeholder="Remarks" full />
                  </div>
                </section>
              </div>

              {/* ADDRESS */}
              <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-2">
                <AddressSection title="Present Address" prefix="present" />

                <section className="rounded-lg border border-[#547c98] bg-[#d9e7f2] p-1.5">
                  <SectionTitle title="Permanent Address" />

                  <div className="space-y-1.5">
                    <Field label="Address" name="permanentAddress" placeholder="Permanent address" full />

                    <div className="grid grid-cols-3 gap-1.5">
                      <Field label="City" name="permanentCity" placeholder="City" />
                      <Field label="District" name="permanentDistrict" placeholder="District" />
                      <Field label="State" name="permanentState" placeholder="State" />
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <Field label="Contact No" name="permanentContactNo" placeholder="Contact" />
                      <Field label="PIN CODE" name="permanentPinCode" placeholder="PIN" />
                      <SelectField
                        label="Zone"
                        name="permanentZone"
                        options={["Zone", "North", "South", "East", "West"]}
                      />
                    </div>

                    <label className="flex items-center gap-1.5 text-[10px] font-semibold text-[#173b5c]">
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

            {/* RIGHT SIDE */}
            <div className="flex min-w-0 flex-col gap-2">

              {/* SEARCH STUDENT */}
              <section className="rounded-lg border border-[#547c98] bg-[#d3e2ed] p-1.5">
                <SectionTitle title="Search Student" />

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    name="studentStatus"
                    value={studentFilter}
                    onChange={(e) => setStudentFilter(e.target.value)}
                    className={inputClass}
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
                    onChange={() => setStudentBy("name")}
                  />

                  <RadioOption
                    label="By Contact"
                    name="studentSearch"
                    value="contact"
                    onChange={() => setStudentBy("contact")}
                  />

                  <RadioOption
                    label="By Computer ID"
                    name="studentSearch"
                    value="computerId"
                    onChange={() => setStudentBy("computerId")}
                  />

                  <RadioOption
                    label="By Form No"
                    name="studentSearch"
                    value="admissionFormNo"
                    onChange={() => setStudentBy("admissionFormNo")}
                  />
                </div>

                <div className="relative mt-1.5">
                  <Search
                    size={12}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    name="studentSearchValue"
                    type="text"
                    value={studentValue}
                    onChange={(e) => setStudentValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.preventDefault();
                    }}
                    placeholder="Search student..."
                    className={`${inputClass} pl-7`}
                  />
                </div>

                <div className="mt-1.5 h-[105px] overflow-y-auto rounded-md border border-[#a2b9c8] bg-[#edf4f8] p-1">
                  <SearchList
                    search={studentSearch}
                    onPick={pickStudent}
                  />
                </div>
              </section>

              {/* STUDENT PHOTO */}
              <section className="rounded-lg border border-[#547c98] bg-[#d3e2ed] p-1.5">
                <SectionTitle title="Student Photo" />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />

                <div className="flex h-[145px] items-center justify-center overflow-hidden rounded-md border border-[#567b94] bg-[#e3edf5]">
                  {photo ? (
                    <img
                      src={photo}
                      alt="Student"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#7ca7c2] bg-[#d8a928]/25">
                        <Camera size={24} className="text-[#173b5c]/70" />
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

                <button
                  type="button"
                  onClick={openPhotoPicker}
                  className="mt-1.5 flex h-8 w-full items-center justify-center gap-1.5 rounded-md border border-[#5d91b2] bg-gradient-to-r from-[#174f7b] via-[#216994] to-[#174f7b] text-[10px] font-black text-white hover:shadow-md"
                >
                  <Camera size={12} />
                  Take / Select Photo
                </button>

                <button
                  type="button"
                  onClick={openPhotoPicker}
                  className="mt-1.5 flex h-7 w-full items-center justify-center gap-1.5 rounded-md border border-[#5685a6] bg-[#e4eef6] text-[10px] font-bold text-[#153b5a] hover:bg-[#d3e6f3]"
                >
                  <Upload size={11} />
                  Browse
                </button>

                <button
  type="button"
  onClick={clearPhotoSelection}
  className="mt-1.5 flex h-7 w-full items-center justify-center gap-1.5 rounded-md border border-[#5685a6] bg-[#e4eef6] text-[10px] font-bold text-[#153b5a] hover:bg-[#d3e6f3]"
>
  <RefreshCw size={11} />
  Clear Photo
</button>
              </section>

              {/* UPLOAD STATUS */}
              <section className="rounded-lg border border-[#547c98] bg-[#d3e2ed] p-1.5">
                <SectionTitle title="Upload Status" />

                <p className="text-[10px] font-semibold text-[#173b5c]">
                  {uploadStatus
                    ? "Photo uploaded successfully."
                    : photo
                    ? "Photo selected. Save the form to upload."
                    : "No photo selected."}
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="mt-1.5 shrink-0 rounded-lg border border-[#5d8ba7] bg-[#c7dce9] p-2.5">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
            <ActionButton
  type="submit"
  icon={<Save size={14} strokeWidth={2.5} />}
  label={saving ? "Saving..." : "Save"}
  disabled={saving}
  green
/>

<ActionButton
  type="button"
  icon={<Printer size={14} strokeWidth={2.5} />}
  label="Print Slip"
  onClick={printSlip}
/>

            <ActionButton
              type="button"
              icon={<RefreshCw size={14} />}
              label="New / Clear"
              onClick={clearAdmissionForm}
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
   ADMISSION SLIP HTML
========================================================= */

// function buildAdmissionSlip(data) {
//   const escapeHtml = (value) =>
//     String(value ?? "").replace(/[&<>"']/g, (ch) => ({
//       "&": "&amp;",
//       "<": "&lt;",
//       ">": "&gt;",
//       '"': "&quot;",
//       "'": "&#39;",
//     }[ch]));

//   const ignored = new Set([
//     ...SEARCH_KEYS,
//     "photo",
//     "photoFile",
//     "studentStatus",
//   ]);

//   const labels = {
//     admissionFormNo: "Admission Form No",
//     computerId: "Computer ID",
//     admissionNo: "Admission No",
//     session: "Session",
//     className: "Class",
//     section: "Section",
//     classRollNo: "Class Roll No",
//     name: "Student Name",
//     firstName: "First Name",
//     middleName: "Middle Name",
//     lastName: "Last Name",
//     fatherName: "Father's Name",
//     motherName: "Mother's Name",
//     dateOfBirth: "Date of Birth",
//     gender: "Gender",
//     bloodGroup: "Blood Group",
//     religion: "Religion",
//     category: "Category",
//     presentAddress: "Present Address",
//     permanentAddress: "Permanent Address",
//     presentContactNo: "Contact No",
//     permanentContactNo: "Alternate Contact",
//     email: "Email",
//     dateOfAdmission: "Admission Date",
//     remarks: "Remarks",
//   };

//   const fields = Object.entries(data)
//     .filter(
//       ([key, value]) =>
//         !ignored.has(key) &&
//         key !== "photoUrl" &&
//         value !== "" &&
//         value != null
//     )
//     .map(([key, value]) => {
//       const label =
//         labels[key] ||
//         key
//           .replace(/([A-Z])/g, " $1")
//           .replace(/^./, (c) => c.toUpperCase());

//       return `
//         <div class="field">
//           <b>${escapeHtml(label)}:</b>
//           ${escapeHtml(value)}
//         </div>
//       `;
//     })
//     .join("");

//   const photoHtml = data.photoUrl
//     ? `<img class="student-photo" src="${escapeHtml(data.photoUrl)}" alt="Student photo" />`
//     : `<div class="student-photo empty">Student Photo</div>`;

//   const schoolLogo = SCHOOL_INFO.logo
//     ? `<img class="school-logo" src="${escapeHtml(
//         new URL(SCHOOL_INFO.logo, window.location.origin).href
//       )}" alt="School logo" />`
//     : "";

//   return `
//     <!doctype html>
//     <html>
//       <head>
//         <meta charset="utf-8">
//         <title>Student Admission Slip</title>

//         <style>
//           @page {
//             size: A4 portrait;
//             margin: 8mm;
//           }

//           * {
//             box-sizing: border-box;
//           }

//           html, body {
//             margin: 0;
//             padding: 0;
//             font-family: Arial, sans-serif;
//             color: #172b3a;
//             -webkit-print-color-adjust: exact;
//             print-color-adjust: exact;
//           }

//           .page {
//             width: 100%;
//             min-height: 280mm;
//             border: 1.5px solid #173b5c;
//             padding: 8mm;
//           }

//           .school-head {
//             text-align: center;
//             border-bottom: 2px solid #173b5c;
//             padding: 0 0 5mm;
//             margin-bottom: 5mm;
//           }

//           .school-logo {
//             height: 18mm;
//             max-width: 28mm;
//             object-fit: contain;
//             display: block;
//             margin: 0 auto 2mm;
//           }

//           .school-head h1 {
//             font-size: 23px;
//             margin: 0 0 2mm;
//           }

//           .school-head p {
//             font-size: 11px;
//             margin: 1mm 0;
//           }

//           .title {
//             text-align: center;
//             font-size: 18px;
//             font-weight: 800;
//             letter-spacing: 1px;
//             background: #e8f0f6;
//             border: 1px solid #7896aa;
//             padding: 3mm;
//             margin-bottom: 5mm;
//           }

//           .top {
//             display: flex;
//             justify-content: space-between;
//             align-items: flex-start;
//             gap: 8mm;
//             margin-bottom: 5mm;
//           }

//           .student-photo {
//             width: 34mm;
//             height: 42mm;
//             object-fit: cover;
//             border: 1px solid #173b5c;
//             padding: 1mm;
//           }

//           .student-photo.empty {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 10px;
//             color: #667;
//             background: #f1f5f8;
//           }

//           .ids {
//             flex: 1;
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             gap: 3mm;
//             font-size: 12px;
//           }

//           .idbox {
//             border: 1px solid #b4c5d1;
//             padding: 3mm;
//           }

//           .details {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             gap: 3mm 6mm;
//             font-size: 11px;
//             line-height: 1.45;
//           }

//           .field {
//             border-bottom: 1px dotted #aab7c2;
//             padding: 2mm 0;
//             overflow-wrap: anywhere;
//           }

//           .field b {
//             color: #173b5c;
//           }

//           .signature {
//             display: flex;
//             justify-content: space-between;
//             margin-top: 35mm;
//             font-size: 11px;
//           }

//           .signature div {
//             width: 55mm;
//             text-align: center;
//             border-top: 1px solid #333;
//             padding-top: 2mm;
//           }

//           @media print {
//             .page {
//               min-height: 280mm;
//               break-inside: avoid;
//             }
//           }
//         </style>
//       </head>

//       <body>
//         <main class="page">
//           <header class="school-head">
//             ${schoolLogo}
//             <h1>${escapeHtml(SCHOOL_INFO.name || "School")}</h1>
//             <p>${escapeHtml(SCHOOL_INFO.address || "")}</p>
//             <p>${escapeHtml(SCHOOL_INFO.phone || "")}</p>
//           </header>

//           <div class="title">STUDENT ADMISSION FORM</div>

//           <div class="top">
//             ${photoHtml}

//             <div class="ids">
//               <div class="idbox">
//                 <b>Admission Form No:</b><br>
//                 ${escapeHtml(data.admissionFormNo || "-")}
//               </div>

//               <div class="idbox">
//                 <b>Computer ID:</b><br>
//                 ${escapeHtml(data.computerId || "-")}
//               </div>

//               <div class="idbox">
//                 <b>Admission No:</b><br>
//                 ${escapeHtml(data.admissionNo || "-")}
//               </div>

//               <div class="idbox">
//                 <b>Session:</b><br>
//                 ${escapeHtml(data.session || "-")}
//               </div>
//             </div>
//           </div>

//           <section class="details">
//             ${fields}
//           </section>

//           <footer class="signature">
//             <div>Parent / Guardian Signature</div>
//             <div>Authorized Signatory</div>
//           </footer>
//         </main>
//       </body>
//     </html>
//   `;
// }

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
    <div className={`${full ? "w-full" : "min-w-0"} ${className}`}>
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

function SelectField({ label, name, options = [] }) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>
        {label}
      </label>

      <select name={name} className={inputClass}>
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
   SECTION TITLE
========================================================= */

function SectionTitle({ title }) {
  return (
    <div className="mb-1.5 flex h-7 items-center rounded-md border border-[#7ca7c2] bg-[#c8dce9] px-2 text-[10px] font-black uppercase tracking-wide text-[#163d5c]">
      {title}
    </div>
  );
}

/* =========================================================
   ADDRESS
========================================================= */

function AddressSection({ title, prefix = "present" }) {
  return (
    <section className="rounded-lg border border-[#547c98] bg-[#d9e7f2] p-1.5">
      <SectionTitle title={title} />

      <div className="space-y-1.5">
        <Field
          label="Address"
          name={`${prefix}Address`}
          placeholder="Enter address"
          full
        />

        <div className="grid grid-cols-3 gap-1.5">
          <Field label="City" name={`${prefix}City`} placeholder="City" />
          <Field label="District" name={`${prefix}District`} placeholder="District" />
          <Field label="State" name={`${prefix}State`} placeholder="State" />
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
            options={["Zone", "North", "South", "East", "West"]}
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
  onChange,
}) {
  return (
    <label className="flex items-center gap-1.5">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
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

function SmallTab({ children, active = false }) {
  return (
    <button
      type="button"
      className={`
        rounded-md border px-2 py-1 text-[9px] font-bold transition-all
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
   LIVE STUDENT SEARCH
========================================================= */

function useRecordSearch(type, by, value, status) {
  const [results, setResults] = useState([]);
  const [state, setState] = useState("idle");

  useEffect(() => {
    const term = value.trim();

    if (!term) {
      setResults([]);
      setState("idle");
      return undefined;
    }

    let cancelled = false;

    setState("loading");

    const timer = setTimeout(async () => {
      try {
        const result = await searchRecords(
          type,
          by,
          term,
          status
        );

        if (cancelled) return;

        const rows = result?.data || [];

        setResults(rows);
        setState(rows.length ? "done" : "empty");
      } catch (error) {
        console.error("Student search error:", error);

        if (!cancelled) {
          setResults([]);
          setState("error");
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [type, by, value, status]);

  return { results, state };
}

/* =========================================================
   SEARCH RESULT LIST
========================================================= */

function SearchList({ search, onPick }) {
  if (search.state !== "done") {
    const message =
      search.state === "loading"
        ? "Searching..."
        : search.state === "empty"
        ? "No student found."
        : search.state === "error"
        ? "Unable to search."
        : "Type a name or contact no. to search";

    return (
      <p className="px-1 py-1 text-[9px] font-semibold text-[#173b5c]/70">
        {message}
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
              {row.form_data?.computerId ||
                row.form_data?.admissionFormNo ||
                row.admission_no ||
                row.record_no ||
                "-"}
            </span>
          </div>

          <div className="mt-0.5 truncate text-[9px] text-[#173b5c]/70">
            {`Class: ${row.class_name || row.form_data?.className || "-"} | Contact: ${
              row.phone ||
              row.form_data?.presentContactNo ||
              row.form_data?.permanentContactNo ||
              "-"
            }`}
          </div>
        </button>
      ))}
    </div>
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */
function ActionButton({
  type = "button", icon, label, green = false, red = false,
  disabled = false, onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex h-9 min-w-[90px] items-center justify-center gap-1.5
        rounded-md border px-4 text-[11px] font-extrabold
        transition-all active:scale-[0.97] disabled:cursor-wait disabled:opacity-60
        ${
          red
            ? "border-red-500 bg-red-600 text-white hover:bg-red-700"
            : green
            ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
            : "border-[#5685a6] bg-[#e4eef6] text-[#153b5a] hover:border-[#0b5fa5] hover:bg-[#d3e6f3]"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}