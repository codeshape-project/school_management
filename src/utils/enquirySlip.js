import { SCHOOL_INFO } from "../config/schoolInfo";

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const clean = (v) => String(v ?? "").trim();

// "2026-06-29" -> "29/06/2026"
function slashDate(value) {
  const raw = clean(value);
  const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : raw;
}

/* =========================================================
   ENQUIRY (form values or a saved record)  ->  SLIP DATA
========================================================= */

export function buildEnquirySlipData(d, enquiryNo = "") {
  const isAdmission = clean(d.purposeType || "For Admission") !== "Other";

  const about =
    clean(d.enquiryAbout) === "Other"
      ? clean(d.enquiryAboutOther) || "Other"
      : clean(d.enquiryAbout);

  // [label, value] rows shown in the slip (empty values are skipped)
  const details = isAdmission
    ? [
        ["Student Name", d.name],
        ["Class", d.className],
        ["Gender", d.gender],
        ["Date of Birth", slashDate(d.dateOfBirth)],
        ["Previous School", d.previousSchool],
        ["Father's Name", d.fatherName],
        ["Mother's Name", d.motherName],
        ["Relation", d.relation],
        ["Occupation", d.occupation],
        ["Mobile No.", d.mobile],
        ["Address", d.address],
      ]
    : [
        ["Name", d.name],
        ["Enquiry About", about],
        ["Details", d.purposeDetail],
        ["Mobile No.", d.mobile],
        ["Address", d.address],
      ];

  return {
    enquiryNo: clean(enquiryNo) || "-",
    date: slashDate(d.date),
    session: clean(d.session),
    mode: clean(d.enquiryMode),
    enquiredBy: clean(d.enquiredBy),
    type: isAdmission ? "For Admission" : "Other",
    sectionTitle: isAdmission ? "Student Details" : "Enquiry Details",
    details: details
      .map(([label, value]) => [label, clean(value)])
      .filter(([, value]) => value),
    remark: clean(d.remark),
  };
}

/* =========================================================
   SLIP HTML  (A5, standing)
========================================================= */

export function buildEnquirySlipHtml(data) {
  const e = escapeHtml;
  const logoUrl = `${window.location.origin}${SCHOOL_INFO.logo}`;

  const contactLine = [SCHOOL_INFO.address, SCHOOL_INFO.phone]
    .filter(Boolean)
    .join("  |  ");

  const pair = (label, value) =>
    `<td class="l"><div><span>${label}</span><span>:</span></div></td><td class="v">${e(value || "-")}</td>`;

  const detailRows = data.details
    .map(
      ([label, value]) => `
      <tr>
        <td class="l"><div><span>${e(label)}</span><span>:</span></div></td>
        <td class="v" colspan="3">${e(value)}</td>
      </tr>`
    )
    .join("");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Enquiry Slip ${e(data.enquiryNo)}</title>
<style>
  @page { size: 148mm 210mm; margin: 6mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #111;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page { width: 100%; max-width: 136mm; margin: 0 auto; }

  .head { display: flex; align-items: center; gap: 8px; }
  .logo-box, .logo-space { width: 52px; flex: 0 0 52px; }
  .logo-box img { width: 52px; height: 52px; object-fit: contain; display: block; }
  .titles { flex: 1; text-align: center; }
  .titles h1 {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 23px;
    line-height: 1.15;
    font-weight: 700;
    color: #0b2a5b;
  }
  .titles p { margin: 3px 0 0; font-size: 10px; line-height: 1.3; font-weight: 600; color: #0b2a5b; }

  .rule { border: 0; border-top: 2px solid #0b2a5b; margin: 7px 0 8px; }

  .banner {
    width: 70%;
    margin: 0 auto 10px;
    padding: 6px 0;
    text-align: center;
    background: #0b2a5b;
    color: #fff;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.4px;
    border-radius: 6px;
  }

  table { width: 100%; border-collapse: collapse; }
  td, th { border: 1px solid #0b2a5b; }
  table.info { table-layout: fixed; }
  table.info td { padding: 5px 6px; font-size: 10.5px; word-break: break-word; }
  table.info td.l { font-weight: 700; color: #0b2a5b; }
  table.info td.l div { display: flex; justify-content: space-between; gap: 3px; white-space: nowrap; }
  table.info td.big { font-size: 13px; font-weight: 800; color: #0b2a5b; }
  table.info td.sec {
    background: #0b2a5b;
    color: #fff;
    font-weight: 700;
    font-size: 11px;
    padding: 6px 8px;
  }

  .note {
    margin-top: 10px;
    border: 1px dashed #0b2a5b;
    border-radius: 6px;
    padding: 7px 9px;
    font-size: 10px;
    line-height: 1.5;
    color: #0b2a5b;
  }

  .foot { margin-top: 38px; display: flex; justify-content: space-between; align-items: flex-end; gap: 8px; }
  .thanks .t1 { font-family: Georgia, "Times New Roman", serif; font-style: italic; font-weight: 700; font-size: 13px; color: #0b2a5b; }
  .thanks .t2 { font-family: Georgia, "Times New Roman", serif; font-style: italic; font-size: 9.5px; line-height: 1.3; color: #0b2a5b; margin-top: 1px; max-width: 62mm; }
  .sign { width: 38mm; flex: 0 0 38mm; text-align: center; }
  .sign .line { border-top: 1.5px solid #0b2a5b; padding-top: 3px; font-weight: 700; font-size: 10px; color: #0b2a5b; }
  tr { page-break-inside: avoid; }
</style>
</head>
<body>
<div class="page">

  <div class="head">
    <div class="logo-box"><img src="${logoUrl}" alt="" onerror="this.style.visibility='hidden'" /></div>
    <div class="titles">
      <h1>${e(SCHOOL_INFO.name)}</h1>
      ${contactLine ? `<p>${e(contactLine)}</p>` : ""}
    </div>
    <div class="logo-space"></div>
  </div>

  <hr class="rule" />

  <div class="banner">ENQUIRY SLIP</div>

  <table class="info">
    <colgroup>
      <col style="width:23%" /><col style="width:27%" />
      <col style="width:20%" /><col style="width:30%" />
    </colgroup>
    <tr>
      <td class="l"><div><span>Enquiry No.</span><span>:</span></div></td>
      <td class="v big" colspan="3">${e(data.enquiryNo)}</td>
    </tr>
    <tr>${pair("Date", data.date)}${pair("Session", data.session)}</tr>
    <tr>${pair("Enquiry Mode", data.mode)}${pair("Enquiry Type", data.type)}</tr>
    <tr>
      <td class="l"><div><span>Enquired By</span><span>:</span></div></td>
      <td class="v" colspan="3">${e(data.enquiredBy || "-")}</td>
    </tr>
    <tr><td class="sec" colspan="4">${e(data.sectionTitle)}</td></tr>
    ${detailRows}
    ${
      data.remark
        ? `<tr>
        <td class="l"><div><span>Remark</span><span>:</span></div></td>
        <td class="v" colspan="3">${e(data.remark)}</td>
      </tr>`
        : ""
    }
  </table>

  <div class="note">
    Please keep this slip safe and quote the <b>Enquiry No. ${e(data.enquiryNo)}</b>
    when you visit the school for registration / further enquiry.
  </div>

  <div class="foot">
    <div class="thanks">
      <div class="t1">Thank you for your enquiry!</div>
      <div class="t2">We will contact you soon.</div>
    </div>
    <div class="sign"><div class="line">Authorized Signatory</div></div>
  </div>

</div>
</body>
</html>`;
}