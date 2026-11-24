import { amountInWords, slashDate, feeTypeFromSession } from "./feeReceipt";

/*
  Hostel fee slip = the SAME slip as the fee receipt (feeReceipt.js / FeeReceiptPreview),
  only the banner says "HOSTEL FEE RECEIPT".
  receipt = one row returned by the hostel receipt API.
*/
const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export function buildHostelReceiptData(receipt) {
  const paid = num(receipt.amount_paid);
  const discount = num(receipt.cash_discount);
  const balance = num(receipt.balance_after);

  const items = [
    {
      label: String(receipt.pay_for || "").trim() || "Hostel Fee",
      amount: paid + discount,
    },
  ];
  if (discount > 0) items.push({ label: "Less: Cash Discount", amount: -discount });

  const details = [];

  const hostelLine = [
    receipt.hostel_name ? `Hostel : ${receipt.hostel_name}` : "",
    receipt.room_no ? `Room : ${receipt.room_no}` : "",
    receipt.bed_no ? `Bed : ${receipt.bed_no}` : "",
  ]
    .filter(Boolean)
    .join(", ");
  if (hostelLine) details.push(hostelLine);

  if (String(receipt.paid_months || "").trim()) {
    details.push(`Paid Months : ${String(receipt.paid_months).trim()}`);
  }

  const mode = String(receipt.payment_mode || "").trim() || "Cash";
  const payParts = [`${mode} Amount : ${paid.toFixed(2)}`];
  if (String(receipt.payment_ref || "").trim()) {
    payParts.push(`Transaction ID : ${String(receipt.payment_ref).trim()}`);
  }
  details.push(payParts.join(", "));

  const noteParts = [];
  if (String(receipt.remarks || "").trim()) noteParts.push(`Remarks : ${String(receipt.remarks).trim()}`);
  if (balance > 0) noteParts.push(`Outstanding Fees : ${balance.toFixed(2)}`);
  if (noteParts.length) details.push(noteParts.join(", "));

  const feeType = feeTypeFromSession(receipt.session);

  return {
    title: "HOSTEL FEE RECEIPT",
    docTitle: "Hostel Fee Receipt",
    recNo: receipt.receipt_no || "-",
    admNo: receipt.admission_no || receipt.student_record_no || "-",
    date: slashDate(String(receipt.receipt_date || "").slice(0, 10)),
    className: receipt.class_name || "-",
    section: receipt.section || "-",
    studentId: receipt.computer_id || receipt.student_record_no || "-",
    category: receipt.category || "-",
    rollNo: receipt.roll_no || "-",
    feeType: feeType === "-" ? "HOSTEL" : feeType.replace("FEE", "HOSTEL"),
    fatherName: receipt.father_name || "-",
    name: receipt.student_name || "-",
    items,
    total: paid,
    inWords: amountInWords(paid),
    details,
  };
}
