import {
  buildReport,
} from "../builder/reportBuilder.js";

import {
  getFieldCatalog,
} from "../fields/reportFields.js";

export async function previewReport(body = {}) {
  return buildReport(body);
}

export function getReportFields() {
  return getFieldCatalog();
}

export const REPORT_FILTERS = [
  "fromDate",
  "toDate",
  "session",
  "className",
  "section",
  "name",
  "phone",
  "admissionNo",
  "status",
  "paymentMode",
  "vehicleNo",
  "routeName",
  "search",
  "columns",
  "sortBy",
  "sortOrder",
  "groupBy",
  "limit",
];