// // export const SOURCE_CONFIG = {
// //   enquiries: { table:'enquiries', label:'Enquiries' }, registrations:{table:'registrations',label:'Registrations'},
// //   students:{table:'students',label:'Students'}, complaints:{table:'complaints',label:'Complaints'},
// //   transfer_certificates:{table:'transfer_certificates',label:'Transfer Certificates'}, fee_formats:{table:'fee_formats',label:'Fee Formats'},
// //   fee_dues:{table:'fee_dues',label:'Fee Dues'}, fee_receipts:{table:'fee_receipts',label:'Fee Receipts'},
// //   fee_payments:{table:'fee_payments',label:'Fee Payments'}, fee_blank_receipts:{table:'fee_blank_receipts',label:'Blank Receipts'},
// //   transport_allotments:{table:'transport_allotments',label:'Transport Allotments'}, conveyance_students:{table:'conveyance_students',label:'Conveyance Students'},
// //   conveyance_amounts:{table:'conveyance_amounts',label:'Conveyance Amounts'}
// // };
// // export const DEFAULT_SOURCES=Object.keys(SOURCE_CONFIG);

// export const SOURCE_CONFIG = {
//   enquiries: {
//     label: "Enquiries",
//     table: "enquiries",
//   },

//   registrations: {
//     label: "Registrations",
//     table: "registrations",
//   },

//   students: {
//     label: "Students",
//     table: "students",
//   },

//   complaints: {
//     label: "Complaints",
//     table: "complaints",
//   },

//   transfer_certificates: {
//     label: "Transfer Certificates",
//     table: "transfer_certificates",
//   },

//   fee_formats: {
//     label: "Fee Formats",
//     table: "fee_formats",
//   },

//   fee_dues: {
//     label: "Fee Dues",
//     table: "fee_dues",
//   },

//   fee_receipts: {
//     label: "Fee Receipts",
//     table: "fee_receipts",
//   },

//   fee_payments: {
//     label: "Fee Payments",
//     table: "fee_payments",
//   },

//   fee_blank_receipts: {
//     label: "Blank Receipts",
//     table: "fee_blank_receipts",
//   },

//   transport_allotments: {
//     label: "Transport Allotments",
//     table: "transport_allotments",
//   },

//   conveyance_students: {
//     label: "Conveyance Students",
//     table: "conveyance_students",
//   },

//   conveyance_amounts: {
//     label: "Conveyance Amounts",
//     table: "conveyance_amounts",
//   },
// };

// export const DEFAULT_SOURCES = [
//   "students",
// ];

// Report sections (group) -> report types (source) -> DB table

/* =========================================================
   STAFF & SALARY report settings
   These tables use the same columns as every other module, so the
   common report (filters, selected columns, print, PDF, Excel) works.
   class_name = Department, section = Designation
========================================================= */

const DEPARTMENTS = [
  "Teaching", "Administration", "Accounts", "Library", "Transport", "Hostel",
  "Laboratory", "Sports", "Computer / IT", "Housekeeping", "Security",
];

const DESIGNATIONS = [
  "Principal", "Vice Principal", "Coordinator", "PGT Teacher", "TGT Teacher",
  "PRT Teacher", "Nursery Teacher", "Clerk", "Accountant", "Librarian",
  "Lab Assistant", "Computer Operator", "Driver", "Conductor", "Warden",
  "Nurse", "Peon", "Guard", "Cook", "Sweeper",
];

const STAFF_FIELD_LABELS = {
  staffId: "Staff ID", staffType: "Staff Type", fatherName: "Father / Husband Name",
  dateOfBirth: "Date Of Birth", joiningDate: "Joining Date", alternateMobile: "Alternate Mobile",
  aadhaarNo: "Aadhaar No", panNo: "PAN No", pfNo: "PF / UAN No", ifscCode: "IFSC Code",
  accountNo: "Account No", bankName: "Bank Name",
  basicSalary: "Basic Salary", hra: "HRA", da: "DA", ta: "TA",
  otherAllowance: "Other Allowance", grossSalary: "Gross Salary",
  pf: "PF", esi: "ESI", tds: "TDS", professionalTax: "Professional Tax",
  otherDeduction: "Other Deduction", advance: "Advance Recovery",
  lopDays: "LOP Days", lopDeduction: "LOP Deduction",
  totalDeductions: "Total Deductions", netSalary: "Net Salary",
  month: "Month No", monthName: "Month", paymentDate: "Payment Date", paymentRef: "Payment Reference",
  workingDays: "Working Days", presentDays: "Present Days", halfDays: "Half Days",
  paidLeaveDays: "Paid Leave Days", paidDays: "Paid Days", absentDays: "Absent Days",
};

const STAFF_FIELDS = [
  "staffType", "fatherName", "gender", "dateOfBirth", "maritalStatus", "bloodGroup", "category",
  "qualification", "experience", "email", "alternateMobile", "address", "city", "state", "pincode",
  "aadhaarNo", "panNo", "pfNo", "bankName", "accountNo", "ifscCode", "joiningDate",
  "basicSalary", "hra", "da", "ta", "otherAllowance", "grossSalary",
  "pf", "esi", "professionalTax", "tds", "otherDeduction", "totalDeductions", "netSalary", "remarks",
];

const ATTENDANCE_FIELDS = [
  "staffId", "month", "monthName", "year", "workingDays", "presentDays", "halfDays",
  "paidLeaveDays", "paidDays", "absentDays", "remarks",
];

const SALARY_FIELDS = [
  "staffId", "month", "monthName", "year", "fatherName", "joiningDate", "bankName", "accountNo",
  "panNo", "pfNo", "workingDays", "paidDays", "lopDays",
  "basicSalary", "hra", "da", "ta", "otherAllowance", "grossSalary",
  "pf", "esi", "professionalTax", "tds", "advance", "otherDeduction", "lopDeduction",
  "totalDeductions", "netSalary", "paymentDate", "paymentRef", "remarks",
];

const STAFF_COMMON = {
  fieldLabels: STAFF_FIELD_LABELS,
  masterLists: false, // do not mix in the student class / section lists
  defaultClasses: DEPARTMENTS,
  defaultSections: DESIGNATIONS,
};

const STAFF_MASTER_UI = {
  ...STAFF_COMMON,
  labels: {
    record_no: "Staff ID", class_name: "Department", section: "Designation",
    phone: "Mobile", event_date: "Joining Date",
  },
  hidden: ["admission_no", "payment_mode", "vehicle_no", "route_name"],
  knownFields: STAFF_FIELDS,
  defaultColumns: ["record_no", "name", "class_name", "section", "phone", "event_date", "status", "f:staffType"],
  dateLabel: "Joining date",
  filters: { labels: { className: "Department", section: "Designation" }, hide: ["paymentMode"] },
};

const STAFF_ATTENDANCE_UI = {
  ...STAFF_COMMON,
  labels: {
    record_no: "Record No", admission_no: "Staff ID", class_name: "Department",
    section: "Designation", phone: "Mobile", event_date: "Month Start",
  },
  hidden: ["payment_mode", "vehicle_no", "route_name", "status"],
  knownFields: ATTENDANCE_FIELDS,
  defaultColumns: [
    "admission_no", "name", "class_name", "section", "f:monthName", "f:year",
    "f:workingDays", "f:paidDays", "f:absentDays",
  ],
  dateLabel: "Month start date",
  filters: { labels: { className: "Department", section: "Designation" }, hide: ["paymentMode", "status"] },
};

const STAFF_SALARY_UI = {
  ...STAFF_COMMON,
  labels: {
    record_no: "Slip No", admission_no: "Staff ID", class_name: "Department",
    section: "Designation", phone: "Mobile", event_date: "Payment Date",
  },
  hidden: ["vehicle_no", "route_name"],
  knownFields: SALARY_FIELDS,
  defaultColumns: [
    "record_no", "admission_no", "name", "class_name", "section", "f:monthName", "f:year",
    "f:grossSalary", "f:totalDeductions", "f:netSalary", "payment_mode", "status",
  ],
  dateLabel: "Payment date",
  filters: { labels: { className: "Department", section: "Designation" }, hide: [] },
};

export const REPORT_GROUPS = [
  {
    key: "student",
    label: "Student",
    sources: [
      { key: "enquiries", label: "Student Enquiry", table: "enquiries" },
      { key: "registrations", label: "Registration", table: "registrations" },
      { key: "students", label: "Admission / Students", table: "students" },
      { key: "complaints", label: "Complaints", table: "complaints" },
      { key: "transfer_certificates", label: "Transfer Certificate", table: "transfer_certificates" },
    ],
  },
  {
    key: "fee",
    label: "Fee",
    sources: [
      { key: "fee_formats", label: "Fee Format", table: "fee_formats" },
      { key: "fee_dues", label: "Fee Dues", table: "fee_dues" },
      { key: "fee_receipts", label: "Fee Receipts / Collection", table: "fee_receipts" },
      { key: "fee_payments", label: "Fee Payments / Ledger", table: "fee_payments" },
      { key: "fee_blank_receipts", label: "Blank Receipts", table: "fee_blank_receipts" },
    ],
  },
  {
    key: "transport",
    label: "Transport",
    sources: [
      { key: "transport_allotments", label: "Transport Allotment", table: "transport_allotments" },
      { key: "conveyance_students", label: "Conveyance Students", table: "conveyance_students" },
      { key: "conveyance_amounts", label: "Conveyance Amounts", table: "conveyance_amounts" },
    ],
  },
  {
    key: "staff",
    label: "Staff & Salary",
    sources: [
      { key: "staff_master", label: "Staff Master", table: "staff", ...STAFF_MASTER_UI },
      { key: "staff_attendance", label: "Staff Attendance", table: "staff_attendance", ...STAFF_ATTENDANCE_UI },
      { key: "staff_salary", label: "Salary", table: "staff_salary", ...STAFF_SALARY_UI },
    ],
  },
];

export const SOURCE_CONFIG = Object.fromEntries(
  REPORT_GROUPS.flatMap((group) =>
    group.sources.map((source) => [
      source.key,
      { ...source, group: group.key },
    ])
  )
);

// legacy names that older screens might still send
SOURCE_CONFIG.admissions = SOURCE_CONFIG.students;

export const DEFAULT_SOURCES = ["students"];

