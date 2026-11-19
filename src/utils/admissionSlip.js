import { SCHOOL_INFO } from "../config/schoolInfo";

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[ch]));

function val(value) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  if (/^select\b/i.test(text)) return "";
  if (text === "Zone" || text === "None") return "";
  return text;
}

function slashDate(value) {
  const text = val(value);
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : text;
}

const absoluteUrl = (path) => {
  try { return new URL(path, window.location.origin).href; }
  catch { return path; }
};

const pair = (label, value, valueSpan = 1) =>
  `<th>${escapeHtml(label)}</th><td${
    valueSpan > 1 ? ` colspan="${valueSpan}"` : ""
  }>${escapeHtml(value)}</td>`;

const section = (title) => `<div class="section">${escapeHtml(title)}</div>`;

function addressBlock(title, d, prefix) {
  const line = (key) => val(d[`${prefix}${key}`]);
  const cityLine = [line("City"), line("District"), line("State")]
    .filter(Boolean).join(", ");

  return `
    <div class="addr">
      <div class="addr-title">${escapeHtml(title)}</div>
      <table>
        <tr>${pair("Address", line("Address"), 3)}</tr>
        <tr>${pair("City / Dist. / State", cityLine, 3)}</tr>
        <tr>
          ${pair("PIN Code", line("PinCode"))}
          ${pair("Contact No.", line("ContactNo"))}
        </tr>
      </table>
    </div>`;
}

export function buildAdmissionSlipHtml(d = {}) {
  const today = new Date().toLocaleDateString("en-GB");

  const photo = d.photoUrl
    ? `<img class="photo" src="${escapeHtml(d.photoUrl)}" alt="Student photo" />`
    : `<div class="photo empty">Paste<br>Passport Size<br>Photo</div>`;

  const logo = SCHOOL_INFO.logo
    ? `<img class="logo" src="${escapeHtml(absoluteUrl(SCHOOL_INFO.logo))}" alt="" />`
    : `<div class="logo"></div>`;

  const className = val(d.className) || val(d.admissionInClass);

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Admission Slip - ${escapeHtml(val(d.name) || "Student")}</title>
<style>
  @page { size: A4 portrait; margin: 0; }
  :root { --k: 1; }
  * { box-sizing: border-box; }

  html, body {
    margin: 0; padding: 0; width: 210mm; height: 297mm; overflow: hidden;
    background: #fff; font-family: Arial, Helvetica, sans-serif; color: #111d2b;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .sheet {
    width: 210mm; height: 297mm; padding: 8mm; overflow: hidden;
    page-break-after: avoid; break-after: avoid;
  }
  .frame {
    height: 100%; display: flex; flex-direction: column;
    border: 1.6px solid #0b2a52; padding: 5mm 6mm 4mm;
  }
  .head { display: flex; align-items: center; gap: 5mm; padding-bottom: 3mm; border-bottom: 2px solid #0b2a52; }
  .logo { width: 22mm; height: 22mm; object-fit: contain; flex: none; }
  .head-text { flex: 1; text-align: center; }
  .head-text h1 { margin: 0 0 1mm; font-size: 23px; letter-spacing: 0.5px; color: #0b2a52; }
  .head-text p { margin: 0.5mm 0; font-size: 10.5px; color: #35485c; }
  .head-spacer { width: 22mm; flex: none; }
  .title {
    margin: 3mm 0; padding: 2mm; text-align: center; font-size: 15px;
    font-weight: 800; letter-spacing: 2px; color: #fff; background: #0b2a52;
  }
  .top { display: flex; gap: 4mm; align-items: stretch; }
  .top table { flex: 1; }
  .photo { flex: none; width: 36mm; height: 45mm; object-fit: cover; border: 1.2px solid #0b2a52; background: #f1f5f9; }
  .photo.empty { display: flex; align-items: center; justify-content: center; text-align: center; font-size: 9px; line-height: 1.5; color: #66788a; }

  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  th, td {
    border: 1px solid #7d93a8;
    padding: calc(1.5mm * var(--k)) calc(2mm * var(--k));
    font-size: calc(10.5px * var(--k)); line-height: 1.25; text-align: left;
    vertical-align: middle; height: calc(7.6mm * var(--k)); overflow-wrap: anywhere;
  }
  th { width: 19%; font-weight: 700; color: #0b2a52; background: #e9f0f7; }
  td { font-weight: 600; }

  .section {
    margin: calc(3.6mm * var(--k)) 0 calc(1.4mm * var(--k)); padding: 1mm 2.5mm;
    font-size: calc(11px * var(--k)); font-weight: 800; letter-spacing: 1px;
    text-transform: uppercase; color: #0b2a52; background: #dbe7f2; border-left: 3px solid #0b2a52;
  }
  .two { display: flex; gap: 4mm; }
  .two > div { flex: 1; min-width: 0; }
  .addr-title { margin-bottom: 1mm; font-size: 10px; font-weight: 800; color: #0b2a52; }
  .addr th { width: 30%; }
  .declaration { margin: calc(4mm * var(--k)) 0 0; font-size: calc(10px * var(--k)); line-height: 1.5; color: #2a3b4d; text-align: justify; }
  .spacer { flex: 1; min-height: 6mm; }
  .signs { display: flex; justify-content: space-between; gap: 6mm; }
  .signs div { flex: 1; padding-top: 1.5mm; text-align: center; font-size: 10px; font-weight: 700; border-top: 1px solid #222; }
  .foot { margin-top: 3mm; display: flex; justify-content: space-between; font-size: 8.5px; color: #66788a; }
</style>
</head>
<body>
<div class="sheet"><div class="frame">

  <div class="head">
    ${logo}
    <div class="head-text">
      <h1>${escapeHtml(SCHOOL_INFO.name || "School")}</h1>
      <p>${escapeHtml(SCHOOL_INFO.address || "")}</p>
      ${SCHOOL_INFO.phone ? `<p>${escapeHtml(SCHOOL_INFO.phone)}</p>` : ""}
    </div>
    <div class="head-spacer"></div>
  </div>

  <div class="title">STUDENT ADMISSION FORM${
    val(d.session) ? ` &nbsp;|&nbsp; SESSION ${escapeHtml(val(d.session))}` : ""
  }</div>

  <div class="top">
    <table>
      <tr>${pair("Adm. Form No.", val(d.admissionFormNo))}${pair("Date of Admission", slashDate(d.dateOfAdmission))}</tr>
      <tr>${pair("Computer ID", val(d.computerId))}${pair("Adm. No.", val(d.admissionNo))}</tr>
      <tr>${pair("Class", className)}${pair("Section", val(d.section))}</tr>
      <tr>${pair("Class Roll No.", val(d.classRollNo))}${pair("Sr. No.", val(d.serialNo))}</tr>
      <tr>${pair("Adm. Type", val(d.admissionType))}${pair("Adm. Category", val(d.admissionCategory))}</tr>
      <tr>${pair("Admission In Class", val(d.admissionInClass))}${pair("House", val(d.house))}</tr>
    </table>
    ${photo}
  </div>

  ${section("Student Details")}
  <table>
    <tr>${pair("Student Name", val(d.name).toUpperCase(), 3)}</tr>
    <tr>${pair("Gender", val(d.gender))}${pair("Date of Birth", slashDate(d.dateOfBirth))}</tr>
    <tr>${pair("Blood Group", val(d.bloodGroup))}${pair("Religion", val(d.religion))}</tr>
    <tr>${pair("Category", val(d.category))}${pair("Caste", val(d.caste))}</tr>
    <tr>${pair("Aadhar No.", val(d.aadharNo))}${pair("P.E.N.", val(d.pen))}</tr>
    <tr>
      ${pair("E-Mail ID", val(d.email))}
      ${pair("Height / Weight", [
        val(d.heightCm) && `${val(d.heightCm)} cm`,
        val(d.weightKg) && `${val(d.weightKg)} kg`,
      ].filter(Boolean).join(" / "))}
    </tr>
    <tr>${pair("Handicapped", val(d.isHandicapped))}${pair("Describe", val(d.describe))}</tr>
  </table>

  ${section("Parents / Guardian Details")}
  <table>
    <tr>${pair("Father's Name", val(d.fatherName))}${pair("Father's Aadhar", val(d.fatherAadharNo))}</tr>
    <tr>${pair("Mother's Name", val(d.motherName))}${pair("Mother's Aadhar", val(d.motherAadharNo))}</tr>
    <tr>${pair("Guardian's Name", val(d.guardianName))}${pair("Single Child", d.isSingleChild === "true" ? "Yes" : "No")}</tr>
  </table>

  ${section("Address")}
  <div class="two">
    ${addressBlock("Present Address", d, "present")}
    ${addressBlock("Permanent Address", d, "permanent")}
  </div>

  ${section("Documents Submitted")}
  <table>
    <tr>${pair("DOB Certificate Date", slashDate(d.dobCertificateDate))}${pair("DOB Document", val(d.dobDocument))}</tr>
    <tr>${pair("TC Submitted", val(d.tc))}${pair("TC Type", val(d.tcType))}</tr>
    <tr>${pair("Document No.", val(d.documentNo))}${pair("Remarks", val(d.remarks))}</tr>
  </table>

  <p class="declaration">
    I hereby declare that the information given above is true and correct to
    the best of my knowledge. I agree to abide by the rules and regulations of
    the school and to pay all fees and dues on time.
  </p>

  <div class="spacer"></div>

  <div class="signs">
    <div>Parent / Guardian</div><div>Class Teacher</div>
    <div>Office In-charge</div><div>Principal</div>
  </div>

  <div class="foot">
    <span>Printed on ${today}</span>
    <span>${escapeHtml(SCHOOL_INFO.name || "")}</span>
  </div>

</div></div>

<script>
  (function () {
    var frame = document.querySelector(".frame");
    var k = 1;
    function tooTall() { return frame.scrollHeight > frame.clientHeight + 1; }
    function fit() {
      while (tooTall() && k > 0.6) {
        k = Math.round((k - 0.02) * 100) / 100;
        document.documentElement.style.setProperty("--k", k);
      }
    }
    fit();
    window.addEventListener("load", fit);
  })();
</script>
</body>
</html>`;
}

export function printAdmissionSlip(values) {
  const html = buildAdmissionSlipHtml(values);

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText =
    "position:fixed;left:-10000px;top:0;width:210mm;height:297mm;border:0;";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();

  const imagesReady = Promise.all(
    Array.from(doc.images).map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((resolve) => { img.onload = resolve; img.onerror = resolve; })
    )
  );
  const timeout = new Promise((resolve) => setTimeout(resolve, 5000));

  Promise.race([imagesReady, timeout]).then(() => {
    const win = iframe.contentWindow;
    if (!win) return;
    win.onafterprint = () => setTimeout(() => iframe.remove(), 300);
    win.focus();
    win.print();
    setTimeout(() => iframe.remove(), 5 * 60 * 1000);
  });
}