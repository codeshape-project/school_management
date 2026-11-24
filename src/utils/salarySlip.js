import { SCHOOL_INFO } from "../config/schoolInfo";
import { amountInWords, formatMoney, slashDate } from "./feeReceipt";

/*
  Salary slip = the same slip style as the fee receipt / hostel receipt
  (A5 standing slip, logo + school name, blue banner, signature at the bottom).
  row = one saved salary record returned by the staff API.
*/

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const maskAccount = (value) => {
  const s = String(value || "").trim();
  return s.length > 4 ? `${"X".repeat(s.length - 4)}${s.slice(-4)}` : s;
};

export function buildSalarySlipData(row) {
  const f = row.form_data || {};
  const month = num(f.month);
  const monthName = f.monthName || MONTHS[month - 1] || "";

  const earningRows = [
    ["Basic Salary", f.basicSalary],
    ["HRA", f.hra],
    ["DA", f.da],
    ["TA", f.ta],
    ["Other Allowance", f.otherAllowance],
  ];
  const deductionRows = [
    ["PF", f.pf],
    ["ESI", f.esi],
    ["Professional Tax", f.professionalTax],
    ["TDS", f.tds],
    ["Advance Recovery", f.advance],
    ["Other Deduction", f.otherDeduction],
    ["Loss Of Pay", f.lopDeduction],
  ];

  // basic is always shown, the rest only when they have an amount
  const earnings = earningRows
    .filter(([label, value]) => label === "Basic Salary" || num(value) > 0)
    .map(([label, value]) => ({ label, amount: num(value) }));
  const deductions = deductionRows
    .filter(([, value]) => num(value) > 0)
    .map(([label, value]) => ({ label, amount: num(value) }));

  const net = num(f.netSalary);
  const details = [];

  if (row.status === "paid") {
    const parts = [`Paid by ${row.payment_mode || "-"}`];
    if (f.paymentDate) parts.push(`on ${slashDate(String(f.paymentDate).slice(0, 10))}`);
    if (f.paymentRef) parts.push(`Ref : ${f.paymentRef}`);
    details.push(parts.join(", "));
  } else {
    details.push("Payment status : Pending");
  }
  if (f.remarks) details.push(`Remarks : ${f.remarks}`);

  return {
    docTitle: "Salary Slip",
    title: `SALARY SLIP - ${monthName} ${f.year || ""}`.toUpperCase().trim(),
    slipNo: row.record_no || "-",
    staffId: row.admission_no || f.staffId || "-",
    name: row.name || "-",
    fatherName: f.fatherName || "-",
    department: row.class_name || "-",
    designation: row.section || "-",
    joiningDate: f.joiningDate ? slashDate(String(f.joiningDate).slice(0, 10)) : "-",
    period: `${monthName} ${f.year || ""}`.trim(),
    bank: f.bankName || "-",
    account: maskAccount(f.accountNo) || "-",
    pan: f.panNo || "-",
    pfNo: f.pfNo || "-",
    workingDays: num(f.workingDays),
    paidDays: num(f.paidDays),
    lopDays: num(f.lopDays),
    earnings,
    deductions,
    gross: num(f.grossSalary),
    totalDeductions: num(f.totalDeductions),
    net,
    inWords: amountInWords(net),
    details,
  };
}

export function buildSalarySlipHtml(data) {
  const e = escapeHtml;
  const logoUrl = `${window.location.origin}${SCHOOL_INFO.logo}`;
  const contactLine = [SCHOOL_INFO.address, SCHOOL_INFO.phone].filter(Boolean).join("  |  ");

  const pair = (label, value) =>
    `<td class="l"><div><span>${label}</span><span>:</span></div></td><td class="v">${e(value)}</td>`;

  // earnings and deductions side by side, row by row
  const count = Math.max(data.earnings.length, data.deductions.length);
  let rows = "";
  for (let i = 0; i < count; i += 1) {
    const earn = data.earnings[i];
    const ded = data.deductions[i];
    rows += `<tr>
      <td class="item">${earn ? e(earn.label) : ""}</td>
      <td class="amt">${earn ? formatMoney(earn.amount) : ""}</td>
      <td class="item">${ded ? e(ded.label) : ""}</td>
      <td class="amt">${ded ? formatMoney(ded.amount) : ""}</td>
    </tr>`;
  }

  const detailLines = data.details.map((line) => `<div>${e(line)}</div>`).join("");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${e(data.docTitle)} ${e(data.slipNo)}</title>
<style>
  /* slip size = half of A4 (A5), standing / vertical - same as the fee receipt */
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

  table.items { margin-top: 9px; table-layout: fixed; }
  table.items th {
    background: #0b2a5b;
    color: #fff;
    text-align: left;
    padding: 6px 8px;
    font-size: 11.5px;
    font-weight: 700;
  }
  table.items th.amt { text-align: right; width: 17%; }
  table.items td { padding: 5px 8px; font-size: 11px; }
  table.items td.amt { text-align: right; }
  table.items tr.fill td { height: 70px; }
  table.items tr.total td {
    background: #d6e6f7;
    font-weight: 800;
    color: #0b2a5b;
    font-size: 11.5px;
  }
  table.items tr.net td {
    background: #0b2a5b;
    color: #fff;
    font-weight: 800;
    font-size: 13px;
  }

  .box {
    border: 1px solid #0b2a5b;
    border-top: 0;
    padding: 6px 8px;
    font-size: 10.5px;
    line-height: 1.5;
  }

  .foot { margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end; gap: 8px; }
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

  <div class="banner">${e(data.title)}</div>

  <table class="info">
    <colgroup>
      <col style="width:21%" /><col style="width:29%" />
      <col style="width:20%" /><col style="width:30%" />
    </colgroup>
    <tr>${pair("Slip No.", data.slipNo)}${pair("Staff ID", data.staffId)}</tr>
    <tr>
      <td class="l"><div><span>Name</span><span>:</span></div></td>
      <td class="v" colspan="3">${e(data.name)}</td>
    </tr>
    <tr>
      <td class="l"><div><span>Father Name</span><span>:</span></div></td>
      <td class="v" colspan="3">${e(data.fatherName)}</td>
    </tr>
    <tr>${pair("Department", data.department)}${pair("Designation", data.designation)}</tr>
    <tr>${pair("Join Date", data.joiningDate)}${pair("Pay Month", data.period)}</tr>
    <tr>${pair("Work Days", data.workingDays)}${pair("Paid Days", data.paidDays)}</tr>
    <tr>${pair("Bank", data.bank)}${pair("Account", data.account)}</tr>
    <tr>${pair("PAN", data.pan)}${pair("PF / UAN", data.pfNo)}</tr>
  </table>

  <table class="items">
    <thead>
      <tr>
        <th>Earnings</th><th class="amt">(&#8377;)</th>
        <th>Deductions</th><th class="amt">(&#8377;)</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
      <tr class="fill"><td></td><td></td><td></td><td></td></tr>
      <tr class="total">
        <td>Gross Earnings</td><td class="amt">${formatMoney(data.gross)}</td>
        <td>Total Deductions</td><td class="amt">${formatMoney(data.totalDeductions)}</td>
      </tr>
      <tr class="net">
        <td colspan="2">Net Salary Payable</td>
        <td colspan="2" class="amt">&#8377; ${formatMoney(data.net)}</td>
      </tr>
    </tbody>
  </table>

  <div class="box">In words : ${e(data.inWords)}</div>
  ${detailLines ? `<div class="box">${detailLines}</div>` : ""}

  <div class="foot">
    <div class="sign"><div class="line">Employee Signature</div></div>
    <div class="sign"><div class="line">Authorized Signatory</div></div>
  </div>

</div>
</body>
</html>`;
}
