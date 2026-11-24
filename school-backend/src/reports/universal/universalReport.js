// import {
//   buildReport,
// } from "../builder/reportBuilder.js";

// import {
//   getFieldCatalog,
// } from "../fields/reportFields.js";

// export async function previewReport(body = {}) {
//   return buildReport(body);
// }

// export function getReportFields() {
//   return getFieldCatalog();
// }

// export const REPORT_FILTERS = [
//   "fromDate",
//   "toDate",
//   "session",
//   "className",
//   "section",
//   "name",
//   "phone",
//   "admissionNo",
//   "status",
//   "paymentMode",
//   "vehicleNo",
//   "routeName",
//   "search",
//   "columns",
//   "sortBy",
//   "sortOrder",
//   "groupBy",
//   "limit",
// ];

import { buildReport } from "../builder/reportBuilder.js";
import { getFieldCatalog, getFilterOptions } from "../fields/reportFields.js";
import { REPORT_GROUPS, SOURCE_CONFIG } from "../sources/sourceConfig.js";

export async function previewReport(body = {}) {
  return buildReport(body);
}

export function getReportSources() {
  return REPORT_GROUPS.map((group) => ({
    key: group.key,
    label: group.label,
    sources: group.sources.map(({ key, label }) => ({ key, label })),
  }));
}

export async function getReportFields(source) {
  return getFieldCatalog(source);
}

export async function getReportMeta(source) {
  const [fields, options] = await Promise.all([
    getFieldCatalog(source),
    getFilterOptions(source),
  ]);
  // optional screen settings (labels, hidden filters, default columns) for this report type
  const cfg = SOURCE_CONFIG[source] || {};
  const ui = {
    filterLabels: cfg.filters?.labels || {},
    hiddenFilters: cfg.filters?.hide || [],
    defaultColumns: cfg.defaultColumns || null,
    dateLabel: cfg.dateLabel || "",
  };

  return { source, fields, options, ui };
}

export const REPORT_FILTERS = [
  "period", "fromDate", "toDate", "dateBasis", "session", "className", "section",
  "status", "paymentMode", "search", "columns", "sortBy", "sortOrder", "limit",
];