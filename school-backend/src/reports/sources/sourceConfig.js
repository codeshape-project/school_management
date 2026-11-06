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
];

export const SOURCE_CONFIG = Object.fromEntries(
  REPORT_GROUPS.flatMap((group) =>
    group.sources.map((source) => [
      source.key,
      { label: source.label, table: source.table, group: group.key },
    ])
  )
);

// legacy names that older screens might still send
SOURCE_CONFIG.admissions = SOURCE_CONFIG.students;

export const DEFAULT_SOURCES = ["students"];

