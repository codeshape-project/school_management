import { SCHOOL_INFO } from "../config/schoolInfo";

/* =========================================================
   AMOUNT IN WORDS (Indian system: Thousand, Lakh, Crore)
========================================================= */

const ONES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
  "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
  "Sixteen", "Seventeen", "Eighteen", "Nineteen",
];

const TENS = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
  "Eighty", "Ninety",
];

function twoDigits(n) {
  if (n < 20) return ONES[n];
  return TENS[Math.floor(n / 10)] + (n % 10 ? ` ${ONES[n % 10]}` : "");
}

function threeDigits(n) {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;

  return [
    hundreds ? `${ONES[hundreds]} Hundred` : "",
    rest ? twoDigits(rest) : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function amountInWords(amount) {
  const value = Math.round(Math.abs(Number(amount) || 0) * 100) / 100;

  let rupees = Math.floor(value);
  const paise = Math.round((value - rupees) * 100);

  if (!rupees && !paise) return "Zero Only";

  const crore = Math.floor(rupees / 10000000);
  rupees %= 10000000;
  const lakh = Math.floor(rupees / 100000);
  rupees %= 100000;
  const thousand = Math.floor(rupees / 1000);
  rupees %= 1000;

  const parts = [];

  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${twoDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${twoDigits(thousand)} Thousand`);
  if (rupees) parts.push(threeDigits(rupees));

  let words = parts.join(" ");

  if (paise) {
    words += `${words ? " and " : ""}${twoDigits(paise)} Paise`;
  }

  return `${words} Only`;
}

/* =========================================================
   HELPERS
========================================================= */

const toNumber = (v) => {
  const n = Number(String(v ?? "").replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : 0;
};

export const formatMoney = (n) =>
  Number(n).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function todayText() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

// "12-09-2026" or "2026-09-12" -> "12/09/2026"
export function slashDate(value) {
  const text = String(value || "").trim();
  if (!text) return todayText();

  const parts = text.split("-");

  if (parts.length === 3) {
    return parts[0].length === 4
      ? `${parts[2]}/${parts[1]}/${parts[0]}`
      : `${parts[0]}/${parts[1]}/${parts[2]}`;
  }

  return text;
}

// "2026 - 27" -> "FEE-26-27"
export function feeTypeFromSession(session) {
  const m = String(session || "").match(/(\d{4})\s*-\s*(\d{2,4})/);
  if (!m) return "-";
  return `FEE-${m[1].slice(2)}-${m[2].slice(-2)}`;
}

/* =========================================================
   FORM DATA  ->  RECEIPT DATA
========================================================= */

export function buildReceiptData(form, recordNo = "") {
  const paid = toNumber(form.totalPaidAmt);
  const discount = toNumber(form.cashDiscount);
  const balance = toNumber(form.balanceAmt);

  const items = [
    {
      label: String(form.payFor || "").trim() || "Fee Payment",
      amount: paid + discount,
    },
  ];

  if (discount > 0) {
    items.push({ label: "Less: Cash Discount", amount: -discount });
  }

  const details = [];

  if (String(form.paidMonths || "").trim()) {
    details.push(`Paid Months : ${String(form.paidMonths).trim()}`);
  }

   // payment mode as saved in the database (same value as the form)
  const payMode =
    String(form.mode || "").trim() ||
    String(form.paymentType || "").trim() ||
    "Cash";

  const payParts = [`${payMode} Amount : ${paid.toFixed(2)}`];

  if (
    String(form.paymentType || "").trim() &&
    String(form.paymentType).trim() !== payMode
  ) {
    payParts.push(`Payment Type : ${String(form.paymentType).trim()}`);
  }
  if (String(form.paymentRef || "").trim()) {
    payParts.push(`Transaction ID : ${String(form.paymentRef).trim()}`);
  }
  details.push(payParts.join(", "));

  const noteParts = [];
  if (String(form.remarks || "").trim()) {
    noteParts.push(`Remarks : ${String(form.remarks).trim()}`);
  }
  if (balance > 0) noteParts.push(`Outstanding Fees : ${balance}`);
  if (noteParts.length) details.push(noteParts.join(", "));

  return {
    recNo: recordNo || "-",
    admNo: form.admissionNo || "-",
    date: slashDate(form.recDate),
    className: form.className || "-",
    section: form.section || "-",
    studentId: form.computerId || "-",
    category: form.category || "-",
    rollNo: form.rollNo || "-",
    feeType: feeTypeFromSession(form.session),
    fatherName: form.fatherName || "-",
    name: form.name || "-",
    items,
    total: paid,
    inWords: amountInWords(paid),
    details,
  };
}

/* =========================================================
   RECEIPT HTML  (used for preview and printing)
========================================================= */

export function buildReceiptHtml(data) {
  const e = escapeHtml;
  const logoUrl = `${window.location.origin}${SCHOOL_INFO.logo}`;

  const itemRows = data.items
    .map(
      (item) => `
        <tr>
          <td class="item">${e(item.label)}</td>
          <td class="amt">${
            item.amount < 0 ? "-" : ""
          }${formatMoney(Math.abs(item.amount))}</td>
        </tr>`
    )
    .join("");

  const detailLines = data.details
    .map((line) => `<div>${e(line)}</div>`)
    .join("");

  const contactLine = [SCHOOL_INFO.address, SCHOOL_INFO.phone]
    .filter(Boolean)
    .join("  |  ");

  // one label + value cell pair
  const pair = (label, value) =>
    `<td class="l"><div><span>${label}</span><span>:</span></div></td><td class="v">${e(value)}</td>`;

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${e(data.docTitle || "Fee Receipt")} ${e(data.recNo)}</title>
<style>
  /* slip size = half of A4 (A5), standing / vertical */
  @page { size: 148mm 210mm; margin: 6mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #111;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page { width: 100%; max-width: 136mm; margin: 0 auto; padding: 0; }

  /* header: logo on the left, school name beside it */
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
  .titles p {
    margin: 3px 0 0;
    font-size: 10px;
    line-height: 1.3;
    font-weight: 600;
    color: #0b2a5b;
  }

  .rule { border: 0; border-top: 2px solid #0b2a5b; margin: 7px 0 8px; }

  .banner {
    width: 76%;
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
  table.info td { padding: 4.5px 6px; font-size: 10.5px; word-break: break-word; }
  table.info td.l { font-weight: 700; color: #0b2a5b; }
  table.info td.l div { display: flex; justify-content: space-between; gap: 3px; white-space: nowrap; }
  table.info td.v { color: #111; }

  table.items { margin-top: 9px; }
  table.items th {
    background: #0b2a5b;
    color: #fff;
    text-align: left;
    padding: 6px 8px;
    font-size: 11.5px;
    font-weight: 700;
  }
  table.items th.amt { text-align: right; width: 32%; }
  table.items td { padding: 5px 8px; font-size: 11.5px; }
  table.items td.amt { text-align: right; }
  table.items tr.fill td { height: 215px; }
  table.items tr.total td {
    background: #d6e6f7;
    font-weight: 800;
    color: #0b2a5b;
    font-size: 12.5px;
  }

  .box {
    border: 1px solid #0b2a5b;
    border-top: 0;
    padding: 6px 8px;
    font-size: 10.5px;
    line-height: 1.5;
  }

  .foot {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 8px;
  }
  .thanks .t1 {
    font-family: Georgia, "Times New Roman", serif;
    font-style: italic;
    font-weight: 700;
    font-size: 13px;
    color: #0b2a5b;
  }
  .thanks .t2 {
    font-family: Georgia, "Times New Roman", serif;
    font-style: italic;
    font-size: 9.5px;
    line-height: 1.3;
    color: #0b2a5b;
    margin-top: 1px;
    max-width: 62mm;
  }
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

  <div class="banner">${e(data.title || "FEE PAYMENT RECEIPT")}</div>

  <table class="info">
    <colgroup>
      <col style="width:21%" /><col style="width:29%" />
      <col style="width:20%" /><col style="width:30%" />
    </colgroup>
    <tr>
      <td class="l"><div><span>Rec. No.</span><span>:</span></div></td>
      <td class="v" colspan="3">${e(data.recNo)}</td>
    </tr>
    <tr>${pair("Adm. No.", data.admNo)}${pair("Date", data.date)}</tr>
    <tr>${pair("Class", data.className)}${pair("Section", data.section)}</tr>
    <tr>${pair("Student Id", data.studentId)}${pair("Fee Type", data.feeType)}</tr>
    <tr>${pair("Category", data.category)}${pair("Roll No", data.rollNo)}</tr>
    <tr>
      <td class="l"><div><span>Father Name</span><span>:</span></div></td>
      <td class="v" colspan="3">${e(data.fatherName)}</td>
    </tr>
    <tr>
      <td class="l"><div><span>Name</span><span>:</span></div></td>
      <td class="v" colspan="3">${e(data.name)}</td>
    </tr>
  </table>

  <table class="items">
    <thead>
      <tr><th>Received the following</th><th class="amt">(&#8377;) Amount</th></tr>
    </thead>
    <tbody>
      ${itemRows}
      <tr class="fill"><td></td><td></td></tr>
      <tr class="total">
        <td>Total :</td>
        <td class="amt">&#8377; ${formatMoney(data.total)}</td>
      </tr>
    </tbody>
  </table>

  <div class="box">In words : ${e(data.inWords)}</div>
  ${detailLines ? `<div class="box">${detailLines}</div>` : ""}

  <div class="foot">
    <div class="thanks">
      <div class="t1">Thank you for your payment!</div>
      <div class="t2">Your support helps us build a better future for our students.</div>
    </div>
    <div class="sign"><div class="line">Authorized Signatory</div></div>
  </div>

</div>
</body>
</html>`;
}