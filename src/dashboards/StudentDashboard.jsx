// // // import { useState } from "react";
// // // import { Menu, X, ChevronRight, LogOut, Bell } from "lucide-react";
// // // import { studentSidebar, studentNavbar } from "../data/menuData";

// // // import EnquiryForm from "../forms/student/EnquiryForm";
// // // import RegistrationForm from "../forms/student/RegistrationForm";
// // // import StudentAdmissionForm from "../forms/student/StudentAdmissionForm";
// // // import StudentReport from "../forms/student/StudentReport";
// // // import TransferCertificateForm from "../forms/student/TransferCertificateForm";
// // // import StudentComplaintForm from "../forms/student/StudentComplaintForm";
// // // import StudentFeeFormat from "../forms/student/StudentFeeFormat";
// // // import StudentFeeDues from "../forms/student/StudentFeeDues";
// // // import StudentLedger from "../forms/student/StudentLedger";


// // // const forms = {

// // //   Enquiry: EnquiryForm,
// // //   Registration: RegistrationForm,
// // //   "Student Admission": StudentAdmissionForm,
// // //   "Student's Report": StudentReport,
// // //   TC: TransferCertificateForm,
// // //   Complain: StudentComplaintForm,
// // //   "Fee Format": StudentFeeFormat,
// // //   "Fee Dues": StudentFeeDues,
// // //   "Student Ledger": StudentLedger

// // // };

// // // export default function StudentDashboard({ onBack }) {
// // //   const [active, setActive] = useState(studentSidebar[0]);
// // //   const [open, setOpen] = useState(false);
// // //   const Form = forms[active];

// // //   return (
// // //     <div className="min-h-screen bg-slate-100">
// // //       <aside className={`fixed inset-y-0 left-0 z-50 w-[245px] bg-schoolBlue text-white shadow-2xl transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
// // //         <div className="flex h-full flex-col">
// // //           <div className="flex h-[110px] shrink-0 flex-col items-center justify-center border-b border-white/10">
// // //             <div className="h-12 w-12 overflow-hidden rounded-xl bg-white/10 p-1"><img src="/images/logo.png" alt="School logo" className="h-full w-full object-contain"/></div>
// // //             <p className="mt-1.5 text-sm font-black">School Name</p>
// // //           </div>
// // //           <p className="px-4 pb-2 pt-4 text-[10px] font-bold uppercase tracking-[.2em] text-blue-200">Student Module</p>
// // //           <nav className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
// // //             {studentSidebar.map(item => <button key={item} onClick={() => {setActive(item);setOpen(false)}} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${active === item ? "bg-schoolCream text-schoolBlue" : "text-blue-50 hover:bg-schoolCream hover:text-schoolBlue"}`}>
// // //               <span className="flex-1">{item}</span><ChevronRight size={14}/>
// // //             </button>)}
// // //             <button onClick={onBack} className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-blue-50 hover:bg-schoolCream hover:text-schoolBlue"><LogOut size={17}/> Back to Main</button>
// // //           </nav>
// // //         </div>
// // //       </aside>

// // //       <div className="lg:pl-[245px]">
// // //         <header className="fixed left-0 right-0 top-0 z-40 h-[68px] bg-schoolBlue shadow-lg lg:left-[245px]">
// // //           <div className="flex h-full items-center gap-2 px-3 sm:px-5">
// // //             <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-white lg:hidden">{open ? <X size={21}/> : <Menu size={21}/>}</button>
// // //             <nav className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
// // //               {studentNavbar.map(item => <button key={item} className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-blue-50 hover:bg-schoolCream hover:text-schoolBlue">{item}</button>)}
// // //             </nav>
// // //             <Bell className="shrink-0 text-white" size={18}/>
// // //           </div>
// // //         </header>
// // //         {open && <button onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/40 lg:hidden"/>}

// // //         <main className="min-h-screen bg-cover bg-center bg-fixed px-2 pb-5 pt-[68px] sm:px-4" style={{backgroundImage:"linear-gradient(rgba(239,246,250,.72),rgba(239,246,250,.91)),url('/images/student-dashboard.jpg')"}}>
// // //           <div className="min-h-[calc(100vh-68px)]">
// // //             <div className="border-x border-b border-white/80 bg-white/95 px-3 py-3 shadow-lg sm:px-5">
// // //               <div className="flex flex-wrap items-center justify-between gap-2">
// // //                 <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-schoolBlue">Student Module</p><h1 className="text-xl font-black text-slate-800 sm:text-2xl">{active}</h1></div>
// // //                 <button onClick={onBack} className="secondary-btn text-xs">Back to Main</button>
// // //               </div>
// // //             </div>
// // //             <div className="p-2 sm:p-4"><Form /></div>
// // //           </div>
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // import { useState } from "react";

// // // import {
// // //   ClipboardList,
// // //   FilePenLine,
// // //   UserPlus,
// // //   FileText,
// // //   FileCheck,
// // //   MessageSquareWarning,
// // //   IndianRupee,
// // //   WalletCards,
// // //   BookOpen,
// // //   Menu,
// // //   X,
// // //   ChevronRight,
// // //   LogOut,
// // // } from "lucide-react";

// // // import {
// // //   studentSidebar,
// // //   studentNavbar,
// // // } from "../data/menuData";

// // // import EnquiryForm from "../forms/student/EnquiryForm";
// // // import RegistrationForm from "../forms/student/RegistrationForm";
// // // import StudentAdmissionForm from "../forms/student/StudentAdmissionForm";
// // // import StudentReport from "../forms/student/StudentReport";
// // // import TransferCertificateForm from "../forms/student/TransferCertificateForm";
// // // import StudentComplaintForm from "../forms/student/StudentComplaintForm";
// // // import StudentFeeFormat from "../forms/student/StudentFeeFormat";
// // // import StudentFeeDues from "../forms/student/StudentFeeDues";
// // // import StudentLedger from "../forms/student/StudentLedger";


// // // /* =========================
// // //    SIDEBAR ICONS
// // // ========================= */

// // // const icons = {
// // //   Enquiry: ClipboardList,
// // //   Registration: FilePenLine,
// // //   "Student Admission": UserPlus,
// // //   "Student's Report": FileText,
// // //   TC: FileCheck,
// // //   Complain: MessageSquareWarning,
// // //   "Fee Format": IndianRupee,
// // //   "Fee Dues": WalletCards,
// // //   "Student Ledger": BookOpen,
// // // };


// // // /* =========================
// // //    FORM MAPPING
// // // ========================= */

// // // const forms = {
// // //   Enquiry: EnquiryForm,
// // //   Registration: RegistrationForm,
// // //   "Student Admission": StudentAdmissionForm,
// // //   "Student's Report": StudentReport,
// // //   TC: TransferCertificateForm,
// // //   Complain: StudentComplaintForm,
// // //   "Fee Format": StudentFeeFormat,
// // //   "Fee Dues": StudentFeeDues,
// // //   "Student Ledger": StudentLedger,
// // // };


// // // export default function StudentDashboard({ onBack }) {

// // //   const [active, setActive] = useState(null);
// // //   const [open, setOpen] = useState(false);


// // //   /* =========================
// // //      OPEN FORM
// // //   ========================= */

// // //   const handleOpenForm = (item) => {
// // //     setActive(item);
// // //     setOpen(false);
// // //   };


// // //   /* =========================
// // //      CLOSE FORM
// // //   ========================= */

// // //   const handleCloseForm = () => {
// // //     setActive(null);
// // //   };


// // //   const Form = active ? forms[active] : null;


// // //   return (
// // //     <div className="min-h-screen bg-slate-100">


// // //       {/* =========================================
// // //           SIDEBAR
// // //       ========================================= */}

// // //       <aside
// // //         className={`
// // //           fixed inset-y-0 left-0 z-50
// // //           w-[220px]
// // //           bg-schoolBlue
// // //           text-white
// // //           shadow-2xl
// // //           transition-transform
// // //           lg:translate-x-0
// // //           ${
// // //             open
// // //               ? "translate-x-0"
// // //               : "-translate-x-full"
// // //           }
// // //         `}
// // //       >

// // //         <div className="flex h-full flex-col">


// // //           {/* SIDEBAR HEADER */}

// // //           <div className="flex h-[100px] shrink-0 flex-col items-center justify-center border-b border-white/10">

// // //             <div className="h-11 w-11 overflow-hidden rounded-xl bg-white/10 p-1">

// // //               <img
// // //                 src="/images/logo.png"
// // //                 alt="School logo"
// // //                 className="h-full w-full object-contain"
// // //               />

// // //             </div>

// // //             <p className="mt-1.5 text-sm font-black">
// // //               CodeShape Academy
// // //             </p>

// // //           </div>


// // //           {/* MODULE TITLE */}

// // //           <div className="px-4 pb-2 pt-4">

// // //             <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200">
// // //               Student Module
// // //             </p>

// // //           </div>


// // //           {/* SIDEBAR MENU */}

// // //           <nav className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">

// // //             {studentSidebar.map((item) => {

// // //               const Icon = icons[item];

// // //               return (
// // //                 <button
// // //                   key={item}
// // //                   onClick={() => handleOpenForm(item)}
// // //                   className={`
// // //                     group
// // //                     flex
// // //                     w-full
// // //                     items-center
// // //                     gap-3
// // //                     rounded-lg
// // //                     px-3
// // //                     py-2.5
// // //                     text-left
// // //                     text-sm
// // //                     font-semibold
// // //                     transition

// // //                     ${
// // //                       active === item
// // //                         ? "bg-schoolCream text-schoolBlue"
// // //                         : "text-blue-50 hover:bg-schoolCream hover:text-schoolBlue"
// // //                     }
// // //                   `}
// // //                 >

// // //                   {Icon && (
// // //                     <Icon
// // //                       size={17}
// // //                       className={`
// // //                         shrink-0
// // //                         ${
// // //                           active === item
// // //                             ? "text-schoolBlue"
// // //                             : "text-schoolGold"
// // //                         }
// // //                       `}
// // //                     />
// // //                   )}

// // //                   <span className="flex-1">
// // //                     {item}
// // //                   </span>

// // //                   <ChevronRight
// // //                     size={14}
// // //                     className={`
// // //                       transition
// // //                       ${
// // //                         active === item
// // //                           ? "opacity-100"
// // //                           : "opacity-0 group-hover:opacity-100"
// // //                       }
// // //                     `}
// // //                   />

// // //                 </button>
// // //               );

// // //             })}


// // //             {/* BACK TO MAIN */}

// // //             <button
// // //               onClick={onBack}
// // //               className="
// // //                 mt-3
// // //                 flex
// // //                 w-full
// // //                 items-center
// // //                 gap-3
// // //                 rounded-lg
// // //                 px-3
// // //                 py-2.5
// // //                 text-sm
// // //                 font-semibold
// // //                 text-red-400
// // //                 transition
// // //                 hover:bg-schoolCream
// // //                 hover:text-red-600
// // //               "
// // //             >

// // //               <LogOut size={17} />

// // //               <span className="flex-1 text-left">
// // //                 Back to Main
// // //               </span>

// // //             </button>

// // //           </nav>

// // //         </div>

// // //       </aside>


// // //       {/* =========================================
// // //           MAIN AREA
// // //       ========================================= */}

// // //       <div className="lg:pl-[220px]">


// // //         {/* =========================================
// // //             THIN NAVBAR
// // //         ========================================= */}

// // //         <header
// // //           className="
// // //             fixed
// // //             left-0
// // //             right-0
// // //             top-0
// // //             z-40
// // //             h-[54px]
// // //             bg-schoolBlue
// // //             shadow-lg
// // //             lg:left-[220px]
// // //           "
// // //         >

// // //           <div className="flex h-full items-center gap-2 px-3 sm:px-5">


// // //             {/* MOBILE MENU */}

// // //             <button
// // //               onClick={() => setOpen(!open)}
// // //               className="
// // //                 rounded-lg
// // //                 p-1.5
// // //                 text-white
// // //                 lg:hidden
// // //               "
// // //             >

// // //               {open ? (
// // //                 <X size={20} />
// // //               ) : (
// // //                 <Menu size={20} />
// // //               )}

// // //             </button>


// // //             {/* NAVBAR ITEMS */}

// // //             <nav
// // //               className="
// // //                 flex
// // //                 min-w-0
// // //                 flex-1
// // //                 gap-1
// // //                 overflow-x-auto
// // //                 scrollbar-hide
// // //               "
// // //             >

// // //               {studentNavbar.map((item) => (

// // //                 <button
// // //                   key={item}
// // //                   onClick={() => handleOpenForm(item)}
// // //                   className={`
// // //                     shrink-0
// // //                     rounded-lg
// // //                     px-3
// // //                     py-1.5
// // //                     text-xs
// // //                     font-semibold
// // //                     transition

// // //                     ${
// // //                       active === item
// // //                         ? "bg-schoolCream text-schoolBlue"
// // //                         : "text-blue-50 hover:bg-schoolCream hover:text-schoolBlue"
// // //                     }
// // //                   `}
// // //                 >
// // //                   {item}
// // //                 </button>

// // //               ))}

// // //             </nav>


// // //             {/* EXIT */}

// // //             <button
// // //               onClick={onBack}
// // //               className="
// // //                 shrink-0
// // //                 rounded-lg
// // //                 p-2
// // //                 text-red-400
// // //                 transition
// // //                 hover:bg-white/10
// // //                 hover:text-red-300
// // //               "
// // //               title="Exit"
// // //             >

// // //               <LogOut size={19} />

// // //             </button>

// // //           </div>

// // //         </header>


// // //         {/* =========================================
// // //             MOBILE OVERLAY
// // //         ========================================= */}

// // //         {open && (
// // //           <button
// // //             onClick={() => setOpen(false)}
// // //             className="
// // //               fixed
// // //               inset-0
// // //               z-40
// // //               bg-black/40
// // //               lg:hidden
// // //             "
// // //           />
// // //         )}


// // //         {/* =========================================
// // //             MAIN DASHBOARD BACKGROUND
// // //         ========================================= */}

// // //         <main
// // //           className="
// // //             fixed
// // //             bottom-0
// // //             left-0
// // //             right-0
// // //             top-[54px]
// // //             bg-cover
// // //             bg-center
// // //             bg-no-repeat
// // //             lg:left-[220px]
// // //           "
// // //           style={{
// // //             backgroundImage:
// // //               "url('/images/student-dashboard.jpg')",
// // //           }}
// // //         />



// // //         {/* =========================================
// // //             FORM WINDOW
// // //         ========================================= */}

// // //         {Form && (

// // //           <div
// // //             className="
// // //               fixed
// // //               left-0
// // //               top-0
// // //               z-[100]

// // //               h-[78vh]
// // //               w-[70vw]

// // //               min-h-[520px]
// // //               min-w-[700px]

// // //               overflow-hidden

// // //               border
// // //               border-slate-500
// // //               bg-[#eef3f4]

// // //               shadow-2xl

// // //               lg:left-0
// // //               lg:top-0

// // //               max-lg:h-[calc(100vh-20px)]
// // //               max-lg:w-[calc(100vw-20px)]
// // //               max-lg:min-h-0
// // //               max-lg:min-w-0
// // //               max-lg:left-[10px]
// // //               max-lg:top-[10px]
// // //             "
// // //           >


// // //             {/* =================================
// // //                 FORM WINDOW HEADER
// // //             ================================= */}

// // //             <div
// // //               className="
// // //                 flex
// // //                 h-[36px]
// // //                 items-center
// // //                 justify-between

// // //                 border-b
// // //                 border-slate-500

// // //                 bg-[#e7eeee]

// // //                 px-3
// // //               "
// // //             >

// // //               <div className="flex items-center gap-2">

// // //                 <span className="text-xs font-semibold text-slate-700">
// // //                   {active}
// // //                 </span>

// // //               </div>


// // //               {/* CLOSE */}

// // //               <button
// // //                 onClick={handleCloseForm}
// // //                 className="
// // //                   flex
// // //                   h-6
// // //                   w-6
// // //                   items-center
// // //                   justify-center
// // //                   rounded
// // //                   text-slate-600
// // //                   transition
// // //                   hover:bg-red-500
// // //                   hover:text-white
// // //                 "
// // //                 title="Close"
// // //               >

// // //                 <X size={15} />

// // //               </button>

// // //             </div>


// // //             {/* =================================
// // //                 FORM CONTENT
// // //             ================================= */}

// // //             <div
// // //               className="
// // //                 h-[calc(100%-36px)]
// // //                 overflow-auto
// // //                 bg-[#eef3f4]
// // //                 p-2
// // //               "
// // //             >

// // //               <Form />

// // //             </div>

// // //           </div>

// // //         )}

// // //       </div>

// // //     </div>
// // //   );
// // // }

// // import { useState } from "react";

// // import {
// //   ClipboardList,
// //   FilePenLine,
// //   UserPlus,
// //   FileText,
// //   FileCheck,
// //   MessageSquareWarning,
// //   IndianRupee,
// //   WalletCards,
// //   BookOpen,
// //   Menu,
// //   X,
// //   ChevronRight,
// //   LogOut,
// // } from "lucide-react";

// // import {
// //   studentSidebar,
// //   studentNavbar,
// // } from "../data/menuData";

// // import EnquiryForm from "../forms/student/EnquiryForm";
// // import RegistrationForm from "../forms/student/RegistrationForm";
// // import StudentAdmissionForm from "../forms/student/StudentAdmissionForm";
// // import StudentReport from "../forms/student/StudentReport";
// // import TransferCertificateForm from "../forms/student/TransferCertificateForm";
// // import StudentComplaintForm from "../forms/student/StudentComplaintForm";
// // import StudentFeeFormat from "../forms/student/StudentFeeFormat";
// // import StudentFeeDues from "../forms/student/StudentFeeDues";
// // import StudentLedger from "../forms/student/StudentLedger";


// // /* =========================================
// //    STUDENT SIDEBAR ICONS
// // ========================================= */

// // const icons = {
// //   Enquiry: ClipboardList,
// //   Registration: FilePenLine,
// //   "Student Admission": UserPlus,
// //   "Student's Report": FileText,
// //   TC: FileCheck,
// //   Complain: MessageSquareWarning,
// //   "Fee Format": IndianRupee,
// //   "Fee Dues": WalletCards,
// //   "Student Ledger": BookOpen,
// // };


// // /* =========================================
// //    FORM MAPPING
// // ========================================= */

// // const forms = {
// //   Enquiry: EnquiryForm,
// //   Registration: RegistrationForm,
// //   "Student Admission": StudentAdmissionForm,
// //   "Student's Report": StudentReport,
// //   TC: TransferCertificateForm,
// //   Complain: StudentComplaintForm,
// //   "Fee Format": StudentFeeFormat,
// //   "Fee Dues": StudentFeeDues,
// //   "Student Ledger": StudentLedger,
// // };


// // export default function StudentDashboard({ onBack }) {

// //   const [active, setActive] = useState(null);
// //   const [open, setOpen] = useState(false);


// //   /* =========================================
// //      OPEN SAME FORM FROM SIDEBAR / NAVBAR
// //   ========================================= */

// //   const handleOpenForm = (item) => {
// //     setActive(item);
// //     setOpen(false);
// //   };


// //   /* =========================================
// //      CLOSE FORM
// //   ========================================= */

// //   const handleCloseForm = () => {
// //     setActive(null);
// //   };


// //   const Form = active ? forms[active] : null;


// //   return (
// //     <div className="min-h-screen bg-slate-100">


// //       {/* ==================================================
// //           SIDEBAR
// //       ================================================== */}

// //       <aside
// //         className={`
// //           fixed
// //           inset-y-0
// //           left-0
// //           z-50
// //           w-[220px]
// //           bg-schoolBlue
// //           text-white
// //           shadow-2xl
// //           transition-transform
// //           lg:translate-x-0
// //           ${
// //             open
// //               ? "translate-x-0"
// //               : "-translate-x-full"
// //           }
// //         `}
// //       >

// //         <div className="flex h-full flex-col">


// //           {/* SIDEBAR HEADER */}

// //           <div
// //             className="
// //               flex
// //               h-[100px]
// //               shrink-0
// //               flex-col
// //               items-center
// //               justify-center
// //               border-b
// //               border-white/10
// //             "
// //           >

// //             <div
// //               className="
// //                 h-11
// //                 w-11
// //                 overflow-hidden
// //                 rounded-xl
// //                 bg-white/10
// //                 p-1
// //               "
// //             >

// //               <img
// //                 src="/images/logo.png"
// //                 alt="School logo"
// //                 className="h-full w-full object-contain"
// //               />

// //             </div>

// //             <p className="mt-1.5 text-sm font-black">
// //               CodeShape Academy
// //             </p>

// //           </div>



// //           {/* STUDENT MENU */}

// //           <nav
// //             className="
// //               flex-1
// //               space-y-1
// //               overflow-y-auto
// //               px-2
// //               pb-4
// //             "
// //           >

// //             {studentSidebar.map((item) => {

// //               const Icon = icons[item];

// //               return (
// //                 <button
// //                   key={item}
// //                   onClick={() => handleOpenForm(item)}
// //                   className={`
// //                     group
// //                     flex
// //                     w-full
// //                     items-center
// //                     gap-3
// //                     rounded-lg
// //                     px-3
// //                     py-2.5
// //                     text-left
// //                     text-sm
// //                     font-semibold
// //                     transition

// //                     ${
// //                       active === item
// //                         ? "bg-schoolCream text-schoolBlue"
// //                         : "text-blue-50 hover:bg-schoolCream hover:text-schoolBlue"
// //                     }
// //                   `}
// //                 >

// //                   {/* ICON */}

// //                   {Icon && (
// //                     <Icon
// //                       size={17}
// //                       className={`
// //                         shrink-0
// //                         ${
// //                           active === item
// //                             ? "text-schoolBlue"
// //                             : "text-schoolGold"
// //                         }
// //                       `}
// //                     />
// //                   )}


// //                   {/* TEXT */}

// //                   <span className="flex-1">
// //                     {item}
// //                   </span>


// //                   {/* ARROW */}

// //                   <ChevronRight
// //                     size={14}
// //                     className={`
// //                       transition
// //                       ${
// //                         active === item
// //                           ? "opacity-100"
// //                           : "opacity-0 group-hover:opacity-100"
// //                       }
// //                     `}
// //                   />
 

// import { useState } from "react";
// import {
//   ClipboardList,
//   FilePenLine,
//   UserPlus,
//   FileText,
//   FileCheck,
//   MessageSquareWarning,
//   IndianRupee,
//   WalletCards,
//   BookOpen,
//   Menu,
//   X,
//   ChevronRight,

//   LogOut,



// } from "lucide-react";



// import {
//   studentSidebar,
//   studentNavbar,
// } from "../data/menuData";
// import EnquiryForm from "../forms/student/EnquiryForm";
// import RegistrationForm from "../forms/student/RegistrationForm";
// import StudentAdmissionForm from "../forms/student/StudentAdmissionForm";
// import StudentReport from "../forms/student/StudentReport";
// import TransferCertificateForm from "../forms/student/TransferCertificateForm";
// import StudentComplaintForm from "../forms/student/StudentComplaintForm";
// import StudentFeeFormat from "../forms/student/StudentFeeFormat";
// import StudentFeeDues from "../forms/student/StudentFeeDues";
// import StudentLedger from "../forms/student/StudentLedger";
// /* =========================================



//    STUDENT SIDEBAR ICONS



// ========================================= */

// // ============================================================
// // FORM SIZE CONFIGURATION
// // Same position for every form, different size according to
// // the amount of content inside each form.
// // ============================================================

// const formSizes = {
//   Enquiry: {
//     width: "lg:w-[70vw]",
//     height: "lg:h-[78vh]",
//   },

//   Registration: {
//     width: "lg:w-[68vw]",
//     height: "lg:h-[74vh]",
//   },

//   "Student Admission": {
//     width: "lg:w-[72vw]",
//     height: "lg:h-[80vh]",
//   },

//   "Student's Report": {
//     width: "lg:w-[68vw]",
//     height: "lg:h-[72vh]",
//   },

//   TC: {
//     width: "lg:w-[62vw]",
//     height: "lg:h-[68vh]",
//   },

//   Complain: {
//     width: "lg:w-[60vw]",
//     height: "lg:h-[62vh]",
//   },

//   "Fee Format": {
//     width: "lg:w-[65vw]",
//     height: "lg:h-[70vh]",
//   },

//   "Fee Dues": {
//     width: "lg:w-[65vw]",
//     height: "lg:h-[65vh]",
//   },

//   "Student Ledger": {
//     width: "lg:w-[72vw]",
//     height: "lg:h-[76vh]",
//   },
// };

// const icons = {



//   Enquiry: ClipboardList,



//   Registration: FilePenLine,



//   "Student Admission": UserPlus,



//   "Student's Report": FileText,



//   TC: FileCheck,



//   Complain: MessageSquareWarning,



//   "Fee Format": IndianRupee,



//   "Fee Dues": WalletCards,



//   "Student Ledger": BookOpen,



// };



// /* =========================================



//    FORM MAPPING



// ========================================= */



// const forms = {



//   Enquiry: EnquiryForm,



//   Registration: RegistrationForm,



//   "Student Admission": StudentAdmissionForm,



//   "Student's Report": StudentReport,



//   TC: TransferCertificateForm,



//   Complain: StudentComplaintForm,



//   "Fee Format": StudentFeeFormat,



//   "Fee Dues": StudentFeeDues,



//   "Student Ledger": StudentLedger,



// };



// export default function StudentDashboard({ onBack }) {



//   const [active, setActive] = useState(null);



//   const [open, setOpen] = useState(false);



//   /* =========================================



//      OPEN SAME FORM FROM SIDEBAR / NAVBAR



//   ========================================= */



//   const handleOpenForm = (item) => {



//     setActive(item);



//     setOpen(false);



//   };



//   /* =========================================



//      CLOSE FORM



//   ========================================= */



//   const handleCloseForm = () => {



//     setActive(null);



//   };



//   const Form = active ? forms[active] : null;



//   return (



//     <div className="min-h-screen bg-slate-100">



//       {/* ==================================================



//           SIDEBAR



//       ================================================== */}



//       <aside



//         className={`



//           fixed



//           inset-y-0



//           left-0



//           z-50



//           w-[220px]



//           bg-[#061a3a]



//           text-white



//           border-r



//           border-[#58bdf5]/20



//           shadow-[8px_0_30px_rgba(0,0,0,0.28)]



//           transition-transform



//           duration-300



//           lg:translate-x-0



//           ${



//             open



//               ? "translate-x-0"



//               : "-translate-x-full"



//           }



//         `}



//       >



//         <div className="flex h-full flex-col">



//           {/* ==================================================



//               SIDEBAR HEADER



//           ================================================== */}



//           <div



//             className="



//               flex



//               h-[100px]



//               shrink-0



//               flex-col



//               items-center



//               justify-center



//               border-b



//               border-[#58bdf5]/15



//               bg-gradient-to-b



//               from-[#08234d]



//               to-[#061a3a]



//             "



//           >



//             <div



//               className="



//                 h-11



//                 w-11



//                 overflow-hidden



//                 rounded-xl



//                 border



//                 border-[#f5d76e]/40



//                 bg-white/10



//                 p-1



//                 shadow-[0_0_15px_rgba(245,215,110,0.18)]



//               "



//             >



//               <img



//                 src="/images/logo.png"



//                 alt="School logo"



//                 className="h-full w-full object-contain"



//               />



//             </div>



//             <p



//               className="



//                 mt-1.5



//                 text-sm



//                 font-black



//                 tracking-wide



//                 text-white



//               "



//             >



//               CodeShape Academy



//             </p>



//           </div>





//           {/* ==================================================



//               STUDENT MENU



//           ================================================== */}



//           <nav



//             className="



//               flex-1



//               space-y-1



//               overflow-y-auto



//               px-2



//               pb-4



//               pt-2



//               scrollbar-hide



//             "



//           >



//             {studentSidebar.map((item) => {



//               const Icon = icons[item];



//               return (



//                 <button



//                   key={item}



//                   onClick={() => handleOpenForm(item)}



//                   className={`



//                     group



//                     flex



//                     w-full



//                     items-center



//                     gap-3



//                     rounded-xl



//                     border



//                     px-3



//                     py-2.5



//                     text-left



//                     text-sm



//                     font-semibold



//                     transition-all



//                     duration-200



//                     ${



//                       active === item



//                         ? `



//                           border-[#f5d76e]



//                           bg-gradient-to-r



//                           from-[#f8e8a8]



//                           to-[#f3d978]



//                           text-[#061a3a]



//                           shadow-[0_0_16px_rgba(245,215,110,0.32)]



//                           scale-[1.01]



//                         `



//                         : `



//                           border-transparent



//                           text-blue-50



//                           hover:border-[#58bdf5]/40



//                           hover:bg-[#102f59]



//                           hover:text-white



//                           hover:shadow-[0_0_14px_rgba(88,189,245,0.12)]



//                           hover:translate-x-[2px]



//                         `



//                     }



//                   `}



//                 >



//                   {/* ICON */}



//                   {Icon && (



//                     <Icon



//                       size={18}



//                       strokeWidth={2.2}



//                       className={`



//                         shrink-0



//                         transition-all



//                         duration-200



//                         ${



//                           active === item



//                             ? `



//                               text-[#0b2b55]



//                               drop-shadow-[0_0_4px_rgba(11,43,85,0.25)]



//                             `



//                             : `



//                               text-[#ffd75a]



//                               drop-shadow-[0_0_7px_rgba(255,215,90,0.65)]



//                               group-hover:text-[#ffe58a]



//                               group-hover:drop-shadow-[0_0_10px_rgba(255,215,90,0.9)]



//                             `



//                         }



//                       `}



//                     />



//                   )}





//                   {/* TEXT */}



//                   <span className="flex-1">



//                     {item}



//                   </span>





//                   {/* ARROW */}



//                   <ChevronRight



//                     size={15}



//                     strokeWidth={2.2}



//                     className={`



//                       transition-all



//                       duration-200



//                       ${



//                         active === item



//                           ? `



//                             translate-x-0



//                             opacity-100



//                           `



//                           : `



//                             translate-x-[-4px]



//                             opacity-0



//                             group-hover:translate-x-0



//                             group-hover:opacity-100



//                           `



//                       }



//                     `}



//                   />



//                 </button>



//               );



//             })}





//             {/* ==================================================



//                 BACK TO MAIN



//             ================================================== */}



//             <button



//               onClick={onBack}



//               className="



//                 group



//                 mt-3



//                 flex



//                 w-full



//                 items-center



//                 gap-3



//                 rounded-xl



//                 border



//                 border-[#ff1744]/35



//                 bg-[#ff1744]/5



//                 px-3



//                 py-2.5



//                 text-sm



//                 font-semibold



//                 text-[#ff1744]



//                 transition-all



//                 duration-200



//                 hover:border-[#ff1744]



//                 hover:bg-[#ff1744]



//                 hover:text-white



//                 hover:shadow-[0_0_20px_rgba(255,23,68,0.65)]



//                 hover:scale-[1.02]



//                 active:scale-[0.98]



//               "



//             >



//               <LogOut



//                 size={18}



//                 strokeWidth={2.3}



//                 className="



//                   transition-transform



//                   duration-200



//                   group-hover:-translate-x-0.5



//                 "



//               />



//               <span className="flex-1 text-left">



//                 Back to Home



//               </span>



//             </button>



//           </nav>



//         </div>



//       </aside>





//       {/* ==================================================



//           MAIN AREA



//       ================================================== */}



//       <div className="lg:pl-[220px]">





//         {/* ==================================================



//             THIN NAVBAR



//         ================================================== */}



//         <header



//           className="



//             fixed



//             left-0



//             right-0



//             top-0



//             z-40



//             h-[54px]



//             bg-[#071d42]



//             border-b



//             border-[#58bdf5]/20



//             shadow-[0_5px_20px_rgba(0,0,0,0.25)]



//             lg:left-[220px]



//           "



//         >



//           <div



//             className="



//               flex



//               h-full



//               items-center



//               gap-2



//               px-3



//               sm:px-5



//             "



//           >



//             {/* ==================================================



//                 MOBILE MENU



//             ================================================== */}



//             <button



//               onClick={() => setOpen(!open)}



//               className="



//                 rounded-xl



//                 border



//                 border-[#58bdf5]/20



//                 bg-white/5



//                 p-1.5



//                 text-white



//                 transition-all



//                 duration-200



//                 hover:border-[#58bdf5]/60



//                 hover:bg-[#12315c]



//                 hover:shadow-[0_0_12px_rgba(88,189,245,0.25)]



//                 lg:hidden



//               "



//             >



//               {open ? (



//                 <X size={20} />



//               ) : (



//                 <Menu size={20} />



//               )}



//             </button>





//             {/* ==================================================



//                 NAVBAR



//             ================================================== */}



//             <nav



//               className="



//                 flex



//                 min-w-0



//                 flex-1



//                 gap-1.5



//                 overflow-x-auto



//                 scrollbar-hide



//               "



//             >



//               {studentNavbar.map((item) => (



//                 <button



//                   key={item}



//                   onClick={() => handleOpenForm(item)}



//                   className={`



//                     group



//                     shrink-0



//                     rounded-lg



//                     border



//                     px-3



//                     py-1.5



//                     text-xs



//                     font-semibold



//                     transition-all



//                     duration-200



//                     ${



//                       active === item



//                         ? `



//                           border-[#f5d76e]



//                           bg-gradient-to-r



//                           from-[#f8e8a8]



//                           to-[#f3d978]



//                           text-[#061a3a]



//                           shadow-[0_0_14px_rgba(245,215,110,0.35)]



//                         `



//                         : `



//                           border-transparent



//                           text-blue-50



//                           hover:border-[#58bdf5]/50



//                           hover:bg-[#12315c]



//                           hover:text-[#ffd75a]



//                           hover:shadow-[0_0_12px_rgba(88,189,245,0.16)]



//                         `



//                     }



//                   `}



//                 >



//                   {item}



//                 </button>



//               ))}



//             </nav>





//             {/* ==================================================



//                 EXIT



//             ================================================== */}



//             <button



//               onClick={onBack}



//               className="



//                 group



//                 shrink-0



//                 rounded-xl



//                 border



//                 border-[#ff1744]/35



//                 bg-[#ff1744]/5



//                 p-2



//                 text-[#ff1744]



//                 transition-all



//                 duration-200



//                 hover:border-[#ff1744]



//                 hover:bg-[#ff1744]



//                 hover:text-white



//                 hover:shadow-[0_0_18px_rgba(255,23,68,0.75)]



//                 hover:scale-105



//                 active:scale-95



//               "



//               title="Back to Main"



//             >



//               <LogOut



//                 size={19}



//                 strokeWidth={2.3}



//               />



//             </button>



//           </div>



//         </header>





//         {/* ==================================================



//             MOBILE OVERLAY



//         ================================================== */}



//         {open && (



//           <button



//             onClick={() => setOpen(false)}



//             className="



//               fixed



//               inset-0



//               z-40



//               bg-black/45



//               backdrop-blur-[2px]



//               lg:hidden



//             "



//             aria-label="Close menu"



//           />



//         )}





//         {/* ==================================================



//             MAIN CONTENT BACKGROUND



//         ================================================== */}



//         <main



//           className="



//             fixed



//             bottom-0



//             left-0



//             right-0



//             top-[54px]



//             overflow-hidden



//             bg-cover



//             bg-center



//             bg-no-repeat



//             lg:left-[220px]



//           "



//           style={{



//             backgroundImage:



//               "url('/images/student-dashboard.jpg')",



//           }}



//         >



//           {/* FORM IS RENDERED BELOW */}



//         </main>





//         {/* ==================================================



//             PREMIUM FORM WINDOW



//             IMPORTANT:



//             SAME SIZE + SAME POSITION



//             ONLY PREMIUM STYLING UPDATED



//         ================================================== */}



//         {Form && (



//           <div



//             className="



//               fixed



//               z-30



//               /* space from navbar + sidebar */



//               top-[62px]



//               left-[8px]



//               /* SAME SIZE */



//               h-[calc(100vh-70px)]



//               w-[calc(100vw-16px)]



//               /* PREMIUM ROUNDED BORDER */



//               rounded-2xl



//               border-2



//               border-[#58bdf5]



//               bg-[#eef5f8]



//               /* PREMIUM BLUE GLOW */



//               shadow-[0_0_0_1px_rgba(88,189,245,0.18),0_0_22px_rgba(88,189,245,0.28),0_18px_45px_rgba(15,23,42,0.30)]



//               overflow-hidden



//               lg:top-[62px]



//               lg:left-[228px]



//               lg:h-[78vh]



//               lg:w-[70vw]



//               lg:rounded-2xl



//             "



//           >



//             {/* ==================================================



//                 FORM TITLE BAR



//             ================================================== */}



//             <div



//               className="



//                 flex



//                 h-[44px]



//                 shrink-0



//                 items-center



//                 justify-between



//                 border-b-2



//                 border-[#58bdf5]/45



//                 bg-gradient-to-r



//                 from-[#dff5ff]



//                 via-[#c8edff]



//                 to-[#b7e7ff]



//                 px-4



//                 shadow-[0_3px_12px_rgba(51,133,177,0.18)]



//                 lg:rounded-t-2xl



//               "



//             >



//               {/* ==================================================



//                   FORM NAME + ICON ONLY



//               ================================================== */}



//               <div className="flex items-center gap-2.5">



//                 <div



//                   className="



//                     flex



//                     h-8



//                     w-8



//                     items-center



//                     justify-center



//                     rounded-xl



//                     border



//                     border-[#f5d76e]



//                     bg-[#061a3a]



//                     text-[#ffd75a]



//                     shadow-[0_0_10px_rgba(245,215,110,0.5)]



//                   "



//                 >



//                   <FileText



//                     size={16}



//                     strokeWidth={2.3}



//                   />



//                 </div>





//                 <h2



//                   className="



//                     text-sm



//                     font-extrabold



//                     tracking-wide



//                     text-[#061a3a]



//                   "



//                 >



//                   {active}



//                 </h2>



//               </div>





//               {/* ==================================================



//                   BRIGHT RED CLOSE BUTTON



//               ================================================== */}



//               <button



//                 onClick={handleCloseForm}



//                 className="



//                   group



//                   flex



//                   h-8



//                   w-8



//                   items-center



//                   justify-center



//                   rounded-full



//                   border



//                   border-[#ff1744]



//                   bg-[#ff1744]



//                   text-white



//                   shadow-[0_0_12px_rgba(255,23,68,0.55)]



//                   transition-all



//                   duration-200



//                   hover:bg-[#ff0033]



//                   hover:border-[#ff0033]



//                   hover:scale-110



//                   hover:shadow-[0_0_22px_rgba(255,23,68,0.9)]



//                   active:scale-95



//                 "



//                 title="Close"



//                 aria-label="Close form"



//               >



//                 <X



//                   size={17}



//                   strokeWidth={2.8}



//                 />



//               </button>



//             </div>





//             {/* ==================================================



//                 FORM BODY



//             ================================================== */}



//             <div



//               className="



//                 h-[calc(100%-44px)]



//                 overflow-auto



//                 bg-[#f5fafc]



//                 p-2



//                 sm:p-3



//                 lg:p-4



//                 lg:rounded-b-2xl



//               "



//             >



//               {/* ==================================================



//                   INNER FORM



//               ================================================== */}



//               <div



//                 className="



//                   min-h-full



//                   overflow-hidden



//                   rounded-2xl



//                   border



//                   border-[#c5dce7]



//                   bg-white



//                   shadow-[0_6px_25px_rgba(30,80,100,0.10)]



//                 "



//               >



//                 <Form />



//               </div>



//             </div>



//           </div>



//         )}



//       </div>



//     </div>



//   );



// } 


import { useState } from "react";

import {
  ClipboardList,
  FilePenLine,
  UserPlus,
  FileText,
  FileCheck,
  MessageSquareWarning,
  IndianRupee,
  WalletCards,
  BookOpen,
  Menu,
  X,
  ChevronRight,
  LogOut,
} from "lucide-react";

import {
  studentSidebar,
  studentNavbar,
} from "../data/menuData";

import EnquiryForm from "../forms/student/EnquiryForm";
import RegistrationForm from "../forms/student/RegistrationForm";
import StudentAdmissionForm from "../forms/student/StudentAdmissionForm";
import StudentReport from "../forms/student/StudentReport";
import TransferCertificateForm from "../forms/student/TransferCertificateForm";
import StudentComplaintForm from "../forms/student/StudentComplaintForm";
import StudentFeeFormat from "../forms/student/StudentFeeFormat";
import StudentFeeDues from "../forms/student/StudentFeeDues";
import StudentLedger from "../forms/student/StudentLedger";

/* =========================================================
   STUDENT SIDEBAR ICONS
========================================================= */

const icons = {
  Enquiry: ClipboardList,
  Registration: FilePenLine,
  "Student Admission": UserPlus,
  "Student's Report": FileText,
  TC: FileCheck,
  Complain: MessageSquareWarning,
  "Fee Format": IndianRupee,
  "Fee Dues": WalletCards,
  "Student Ledger": BookOpen,
};

/* =========================================================
   FORM MAPPING
========================================================= */

const forms = {
  Enquiry: EnquiryForm,
  Registration: RegistrationForm,
  "Student Admission": StudentAdmissionForm,
  "Student's Report": StudentReport,
  TC: TransferCertificateForm,
  Complain: StudentComplaintForm,
  "Fee Format": StudentFeeFormat,
  "Fee Dues": StudentFeeDues,
  "Student Ledger": StudentLedger,
};

export default function StudentDashboard({ onBack }) {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  /* =========================================================
     OPEN FORM
     Same form can be opened from sidebar or navbar
  ========================================================= */

 const handleOpenForm = (item) => {
  if (item === "Master") {
    onBack();
    return;
  }
  setActive(item);
  setOpen(false);
};

  /* =========================================================
     CLOSE FORM
  ========================================================= */

  const handleCloseForm = () => {
    setActive(null);
  };

  const Form = active ? forms[active] : null;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          w-[220px]
          bg-[#061a3a]
          text-white
          border-r
          border-[#58bdf5]/20
          shadow-[8px_0_30px_rgba(0,0,0,0.28)]
          transition-transform
          duration-300
          lg:translate-x-0
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex h-full flex-col">
          {/* =================================================
              SIDEBAR HEADER
          ================================================= */}

          <div
            className="
              flex
              h-[100px]
              shrink-0
              flex-col
              items-center
              justify-center
              border-b
              border-[#58bdf5]/15
              bg-gradient-to-b
              from-[#08234d]
              to-[#061a3a]
            "
          >
         <div 
  className=" 
    h-16
    w-16
    overflow-hidden 
    rounded-full 
    
    border-[#f5d76e]/40 
    bg-white/10 
    p-1 
    shadow-[0_0_15px_rgba(245,215,110,0.18)] 
  " 
>
  <img 
    src="/images/logo.png" 
    alt="School logo" 
    className="h-full w-full rounded-full object-contain" 
  />
</div>

            <p
              className="
                mt-1.5
                text-sm
                font-black
                tracking-wide
                text-white
              "
            >
              CodeShape Academy
            </p>
          </div>

          {/* =================================================
              STUDENT MENU
          ================================================= */}

          <nav
            className="
              flex-1
              space-y-1
              overflow-y-auto
              px-2
              pb-4
              pt-2
              scrollbar-hide
            "
          >
            {studentSidebar.map((item) => {
              const Icon = icons[item];

              return (
                <button
                  key={item}
                  onClick={() => handleOpenForm(item)}
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    font-semibold
                    transition-all
                    duration-200

                    ${
                      active === item
                        ? `
                          border-[#f5d76e]
                          bg-gradient-to-r
                          from-[#f8e8a8]
                          to-[#f3d978]
                          text-[#061a3a]
                          shadow-[0_0_16px_rgba(245,215,110,0.32)]
                          scale-[1.01]
                        `
                        : `
                          border-transparent
                          text-blue-50
                          hover:border-[#58bdf5]/40
                          hover:bg-[#102f59]
                          hover:text-white
                          hover:shadow-[0_0_14px_rgba(88,189,245,0.12)]
                          hover:translate-x-[2px]
                        `
                    }
                  `}
                >
                  {/* ICON */}

                  {Icon && (
                    <Icon
                      size={18}
                      strokeWidth={2.2}
                      className={`
                        shrink-0
                        transition-all
                        duration-200

                        ${
                          active === item
                            ? `
                              text-[#0b2b55]
                              drop-shadow-[0_0_4px_rgba(11,43,85,0.25)]
                            `
                            : `
                              text-[#ffd75a]
                              drop-shadow-[0_0_7px_rgba(255,215,90,0.65)]
                              group-hover:text-[#ffe58a]
                              group-hover:drop-shadow-[0_0_10px_rgba(255,215,90,0.9)]
                            `
                        }
                      `}
                    />
                  )}

                  {/* TEXT */}

                  <span className="flex-1">
                    {item}
                  </span>

                  {/* ARROW */}

                  <ChevronRight
                    size={15}
                    strokeWidth={2.2}
                    className={`
                      transition-all
                      duration-200

                      ${
                        active === item
                          ? `
                            translate-x-0
                            opacity-100
                          `
                          : `
                            translate-x-[-4px]
                            opacity-0
                            group-hover:translate-x-0
                            group-hover:opacity-100
                          `
                      }
                    `}
                  />
                </button>
              );
            })}

            {/* =================================================
                BACK TO MAIN
            ================================================= */}

            <button
              onClick={onBack}
              className="
                group
                mt-3
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                border
                border-[#ff1744]/35
                bg-[#ff1744]/5
                px-3
                py-2.5
                text-sm
                font-semibold
                text-[#ff1744]
                transition-all
                duration-200
                hover:border-[#ff1744]
                hover:bg-[#ff1744]
                hover:text-white
                hover:shadow-[0_0_20px_rgba(255,23,68,0.65)]
                hover:scale-[1.02]
                active:scale-[0.98]
              "
            >
              <LogOut
                size={18}
                strokeWidth={2.3}
                className="
                  transition-transform
                  duration-200
                  group-hover:-translate-x-0.5
                "
              />

              <span className="flex-1 text-left">
                Back to Home
              </span>
            </button>
          </nav>
        </div>
      </aside>

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="lg:pl-[220px]">
        {/* =================================================
            NAVBAR
        ================================================= */}

        <header
          className="
            fixed
            left-0
            right-0
            top-0
            z-40
            h-[54px]
            bg-[#071d42]
            border-b
            border-[#58bdf5]/20
            shadow-[0_5px_20px_rgba(0,0,0,0.25)]
            lg:left-[220px]
          "
        >
          <div
            className="
              flex
              h-full
              items-center
              gap-2
              px-3
              sm:px-5
            "
          >
            {/* MOBILE MENU */}

            <button
              onClick={() => setOpen(!open)}
              className="
                rounded-xl
                border
                border-[#58bdf5]/20
                bg-white/5
                p-1.5
                text-white
                transition-all
                duration-200
                hover:border-[#58bdf5]/60
                hover:bg-[#12315c]
                hover:shadow-[0_0_12px_rgba(88,189,245,0.25)]
                lg:hidden
              "
            >
              {open ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>

            {/* NAVBAR ITEMS */}

            <nav
              className="
                flex
                min-w-0
                flex-1
                gap-1.5
                overflow-x-auto
                scrollbar-hide
              "
            >
              {studentNavbar.map((item) => (
                <button
                  key={item}
                  onClick={() => handleOpenForm(item)}
                  className={`
                    group
                    shrink-0
                    rounded-lg
                    border
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    transition-all
                    duration-200

                    ${
                      active === item
                        ? `
                          border-[#f5d76e]
                          bg-gradient-to-r
                          from-[#f8e8a8]
                          to-[#f3d978]
                          text-[#061a3a]
                          shadow-[0_0_14px_rgba(245,215,110,0.35)]
                        `
                        : `
                          border-transparent
                          text-blue-50
                          hover:border-[#58bdf5]/50
                          hover:bg-[#12315c]
                          hover:text-[#ffd75a]
                          hover:shadow-[0_0_12px_rgba(88,189,245,0.16)]
                        `
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* EXIT */}

            <button
              onClick={onBack}
              className="
                group
                shrink-0
                rounded-xl
                border
                border-[#ff1744]/35
                bg-[#ff1744]/5
                p-2
                text-[#ff1744]
                transition-all
                duration-200
                hover:border-[#ff1744]
                hover:bg-[#ff1744]
                hover:text-white
                hover:shadow-[0_0_18px_rgba(255,23,68,0.75)]
                hover:scale-105
                active:scale-95
              "
              title="Back to Main"
            >
              <LogOut
                size={19}
                strokeWidth={2.3}
              />
            </button>
          </div>
        </header>

        {/* =================================================
            MOBILE OVERLAY
        ================================================= */}

        {open && (
          <button
            onClick={() => setOpen(false)}
            className="
              fixed
              inset-0
              z-40
              bg-black/45
              backdrop-blur-[2px]
              lg:hidden
            "
            aria-label="Close menu"
          />
        )}

        {/* =================================================
            MAIN DASHBOARD BACKGROUND
        ================================================= */}

        <main
          className="
            fixed
            bottom-0
            left-0
            right-0
            top-[54px]
            overflow-hidden
            bg-cover
            bg-center
            bg-no-repeat
            lg:left-[220px]
          "
          style={{
            backgroundImage:
              "url('/images/student-dashboard.jpg')",
          }}
        />

        {/* =====================================================
            FORM WINDOW

            IMPORTANT:
            This container ONLY controls the position and size.

            The actual form controls:
            - Header
            - Sections
            - Inputs
            - Buttons
            - Layout
            - Colors

            This allows every form to look different.
        ===================================================== */}

       {Form && (
  <div
    className="
      fixed
      z-30
      left-[8px]
      top-[62px]

      max-w-[calc(100vw-16px)]
      max-h-[calc(100vh-70px)]

      lg:left-[228px]
      lg:top-[62px]
      lg:max-w-[calc(100vw-245px)]
      lg:max-h-[calc(100vh-72px)]

      overflow-hidden
      rounded-2xl
    "
  >
    <div className="relative h-auto w-auto">
      <Form onClose={handleCloseForm} />
    </div>
  </div>
)}
      </div>
    </div>
  );
}