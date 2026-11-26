import { useCallback, useEffect, useMemo, useState } from "react";
import { SCHOOL_INFO } from "../../config/schoolInfo";
import { icardApi } from "../../api/icardApi";

/* =========================================================
   COLOUR THEMES  (pick one in Templates)
========================================================= */

export const THEMES = {
  maroon: { label: "Maroon", p: "#8f1d33", pd: "#6b1224", accent: "#f2b632", title: "#a31c33", name: "#1d5fa9", soft: "#f7e3dc", navy: "#16315f" },
  navy:   { label: "Navy",   p: "#17387a", pd: "#0f2755", accent: "#f2b632", title: "#17387a", name: "#b3202f", soft: "#dde7f6", navy: "#0f2755" },
  green:  { label: "Green",  p: "#146b45", pd: "#0d4d31", accent: "#f2b632", title: "#146b45", name: "#1d5fa9", soft: "#dcf0e4", navy: "#10305a" },
  purple: { label: "Purple", p: "#5b2a86", pd: "#3f1b63", accent: "#f2b632", title: "#5b2a86", name: "#1d5fa9", soft: "#eadff5", navy: "#16315f" },
  orange: { label: "Orange", p: "#d8590f", pd: "#a8430a", accent: "#ffd23f", title: "#b94a0a", name: "#16315f", soft: "#fde7d5", navy: "#16315f" },
};

/* =========================================================
   SMALL FORMATTERS
========================================================= */

const text = (v) => String(v ?? "").trim();

export const ordinal = (value) => {
  const n = Number(value);
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  return `${n}${{ 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th"}`;
};

// "Class 9" -> "CLASS - 9th"     "Nursery" -> "NURSERY"
export function classLabel(className, section, showSection) {
  const s = text(className);
  if (!s) return "";
  const m = s.match(/(\d+)/);
  let label = m ? `CLASS - ${ordinal(m[1])}` : s.toUpperCase();
  if (showSection && text(section)) label += ` (${text(section).toUpperCase()})`;
  return label;
}

// 2011-01-15 | 15-01-2011 | 15/01/2011  ->  15/01/2011
export function fmtDate(value) {
  const s = text(value);
  if (!s) return "";
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  m = s.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
  if (m) return `${m[1]}/${m[2]}/${m[3]}`;
  return s;
}

// "2026 - 27" -> "2026-27"
export const sessionShort = (value) => text(value).replace(/\s*-\s*/g, "-");

// academic year runs April - March:  Nov 2026 -> "2026-27"
export function currentSession(date = new Date()) {
  const month = date.getMonth() + 1;
  const start = month >= 4 ? date.getFullYear() : date.getFullYear() - 1;
  return `${start}-${String((start + 1) % 100).padStart(2, "0")}`;
}

// shrink long text so it still fits on one line (u = card units, 1u = 1mm when printed)
export const fitFont = (value, maxWidthU, baseU, minU, charWidth = 0.6) =>
  Math.max(minU, Math.min(baseU, maxWidthU / (Math.max(text(value).length, 1) * charWidth)));

// Cloudinary: ask for a square, face-centred crop so every student photo fits the circle.
export function photoSrc(url, size = 400) {
  if (!url) return "";
  if (/res\.cloudinary\.com\/[^/]+\/image\/upload\//.test(url) && !/\/upload\/[^/]*c_fill/.test(url)) {
    return url.replace("/image/upload/", `/image/upload/c_fill,g_face,w_${size},h_${size},q_auto/`);
  }
  return url;
}

// the print window is a separate document, so image paths must be absolute
export const absUrl = (url) =>
  url && url.startsWith("/") && typeof window !== "undefined" ? `${window.location.origin}${url}` : url || "";

export const chunk = (list, size) => {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
};

/* =========================================================
   WHAT IS PRINTED ON THE CARD
   key   = on/off switch saved in the template
========================================================= */

export const FIELD_DEFS = {
  student: [
    { key: "father", label: "Father Name", get: (c) => c.fatherName },
    { key: "mother", label: "Mother Name", get: (c) => c.motherName },
    { key: "dob", label: "Date of Birth", get: (c) => fmtDate(c.dob) },
    { key: "mobile", label: "Mobile No.", get: (c) => c.mobile },
    { key: "address", label: "Address", get: (c) => c.address, long: true },
    { key: "rollNo", label: "Roll No.", get: (c) => c.rollNo },
    { key: "admNo", label: "Admission No.", get: (c) => c.admissionNo },
    { key: "blood", label: "Blood Group", get: (c) => c.bloodGroup },
  ],
  staff: [
    { key: "idNo", label: "Staff ID", get: (c) => c.idNo },
    { key: "department", label: "Department", get: (c) => c.department },
    { key: "father", label: "Father Name", get: (c) => c.fatherName },
    { key: "dob", label: "Date of Birth", get: (c) => fmtDate(c.dob) },
    { key: "mobile", label: "Mobile No.", get: (c) => c.mobile },
    { key: "address", label: "Address", get: (c) => c.address, long: true },
    { key: "blood", label: "Blood Group", get: (c) => c.bloodGroup },
  ],
};

// rows that are switched on in the template and have a value
export function cardRows(card, template, type) {
  return FIELD_DEFS[type]
    .filter((d) => template.fields?.[d.key])
    .map((d) => ({ key: d.key, label: d.label, value: text(d.get(card || {})), long: d.long }))
    .filter((r) => r.value);
}

/* =========================================================
   DEFAULT TEMPLATE  (until one is saved in Templates)
========================================================= */

export function defaultTemplate(type) {
  const student = type === "student";
  return {
    schoolName: SCHOOL_INFO.name || "School Name",
    subtitle: SCHOOL_INFO.address || "",
    sessionLabel: "",                     // empty = use the student's own session
    phone: String(SCHOOL_INFO.phone || "").replace(/^\s*ph\.?\s*:?\s*/i, ""),
    theme: student ? "maroon" : "navy",
    logoUrl: SCHOOL_INFO.logo || "/images/logo.png",
    signatureUrl: "",
    signatureLabel: "Principal",
    showSection: false,
    fields: student
      ? { father: true, mother: true, dob: true, mobile: true, address: true, rollNo: false, admNo: false, blood: false }
      : { idNo: true, department: false, father: true, dob: true, mobile: true, address: true, blood: false },
  };
}

export function mergeTemplate(type, saved) {
  const base = defaultTemplate(type);
  if (!saved) return base;
  return { ...base, ...saved, fields: { ...base.fields, ...(saved.fields || {}) } };
}

/* loads both templates once; every I-Card form uses it */
export function useICardTemplates() {
  const [saved, setSaved] = useState({ student: null, staff: null });
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const res = await icardApi.templates();
      setSaved({ student: res?.data?.student || null, staff: res?.data?.staff || null });
    } catch {
      /* the default design is used */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const templates = useMemo(
    () => ({ student: mergeTemplate("student", saved.student), staff: mergeTemplate("staff", saved.staff) }),
    [saved]
  );

  return { templates, loading, reload };
}

export const PRINT_LAYOUTS = [
  { value: "a4", label: "A4 sheet - 9 cards per page" },
  { value: "card", label: "Single card - 54 x 86 mm" },
];
