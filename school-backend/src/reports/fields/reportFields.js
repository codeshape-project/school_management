import { studentFields } from "./studentFields.js";
import { enquiryFields } from "./enquiryFields.js";
import { registrationFields } from "./registrationFields.js";
import { admissionFields } from "./admissionFields.js";
import { feeFields } from "./feeFields.js";
import { transportFields } from "./transportFields.js";

const COMMON_FIELDS = [
  {
    value: "record_no",
    label: "Record No",
  },
  {
    value: "name",
    label: "Student Name",
  },
  {
    value: "phone",
    label: "Phone",
  },
  {
    value: "admission_no",
    label: "Admission No",
  },
  {
    value: "session",
    label: "Session",
  },
  {
    value: "class_name",
    label: "Class",
  },
  {
    value: "section",
    label: "Section",
  },
  {
    value: "status",
    label: "Status",
  },
  {
    value: "event_date",
    label: "Date",
  },
  {
    value: "created_at",
    label: "Created At",
  },
];

const SOURCE_FIELDS = {
  students: studentFields,
  enquiries: enquiryFields,
  registrations: registrationFields,
  admissions: admissionFields,
  complaints: COMMON_FIELDS,
  transfer_certificates: COMMON_FIELDS,

  fee_formats: feeFields,
  fee_dues: feeFields,
  fee_receipts: feeFields,
  fee_payments: feeFields,
  fee_blank_receipts: feeFields,

  transport_allotments: transportFields,
  conveyance_students: transportFields,
  conveyance_amounts: transportFields,
};

export function getFieldCatalog() {
  return {
    common: COMMON_FIELDS,
    form_data: [
      ...new Map(
        Object.values(SOURCE_FIELDS)
          .flat()
          .map((field) => [field.value, field])
      ).values(),
    ],
    sources: Object.entries(SOURCE_FIELDS).map(
      ([value, fields]) => ({
        value,
        fields,
      })
    ),
  };
}

export function getFieldsForSource(source) {
  return SOURCE_FIELDS[source] || COMMON_FIELDS;
}