import { useEffect, useState } from "react";
import { Wallet, Search, Save, Plus, Printer, X } from "lucide-react";
import { hostelApi } from "../../api/hostelApi";
import { notify } from "../../components/Toast";
import FeeReceiptPreview from "../../components/FeeReceiptPreview";
import { buildHostelReceiptData } from "../../utils/hostelReceipt";
import { formatMoney } from "../../utils/feeReceipt";
import {
  FormShell, Section, Field, SelectField, TextAreaField, ActionButton, SearchButton,
  DataTable, useFlash, todayISO, day, inputClass,
} from "./hostelUi";

const PAY_FOR = ["Hostel Fee", "Security Deposit", "Late Fine", "Other"].map((v) => ({ value: v, label: v }));
const MODES = ["Cash", "Cheque", "Online", "UPI", "Card", "DD"].map((v) => ({ value: v, label: v }));

const blankPay = () => ({
  receiptDate: todayISO(), payFor: "Hostel Fee", paidMonths: "", amountPaid: "",
  cashDiscount: "", paymentMode: "Cash", paymentRef: "", remarks: "",
});

const n = (v) => {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
};

export default function HostelFeeForm({ onClose }) {
  const [q, setQ] = useState("");
  const [list, setList] = useState([]);
  const [summary, setSummary] = useState(null); // { allotment, receipts }
  const [pay, setPay] = useState(blankPay);
  const [busy, setBusy] = useState(false);
  const [slip, setSlip] = useState(null);
  const [lastSlip, setLastSlip] = useState(null);
  const [flash, showFlash] = useFlash();

  const set = (key) => (value) => setPay((p) => ({ ...p, [key]: value }));
  const allot = summary?.allotment;

  async function loadList(search = q) {
    try {
      setList((await hostelApi.allotments({ q: search, status: "all" })).data || []);
    } catch (err) {
      notify.error(err.message);
    }
  }

  async function loadSummary(id, prefill = true) {
    try {
      const res = await hostelApi.feeSummary(id);
      setSummary(res.data);
      if (prefill) {
        const due = n(res.data.allotment.due);
        setPay((p) => ({ ...p, amountPaid: due > 0 ? String(due) : "" }));
      }
    } catch (err) {
      notify.error(err.message);
    }
  }

  useEffect(() => {
    loadList("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reset() {
    setSummary(null);
    setPay(blankPay());
  }

  function pick(i) {
    setPay(blankPay());
    loadSummary(list[i].id);
  }

  const paid = n(pay.amountPaid);
  const discount = n(pay.cashDiscount);
  const balanceAfter = allot ? n(allot.balance) - paid - discount : 0;

  async function save(e) {
    e.preventDefault();
    if (!allot) return notify.error("Select a hostel student from the list first.");
    if (!(paid > 0)) return notify.error("Enter a valid amount to be paid.");
    if (discount < 0) return notify.error("Discount cannot be negative.");
    if (pay.receiptDate > todayISO()) return notify.error("Receipt date cannot be in the future.");

    setBusy(true);
    try {
      const res = await hostelApi.collectFee({ ...pay, allotmentId: allot.id });
      const data = buildHostelReceiptData(res.data);
      setLastSlip(data);
      setSlip(data);
      notify.success(`Hostel fee received. Receipt No: ${res.data.receipt_no}`);
      showFlash("Saved Successfully");
      setPay(blankPay());
      await loadSummary(allot.id, false);
      await loadList();
    } catch (err) {
      notify.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  function printLast() {
    if (!lastSlip) return notify.info("Save a payment first, or click a receipt in the history to print it.");
    setSlip(lastSlip);
  }

  const selectedIndex = allot ? list.findIndex((a) => a.id === allot.id) : -1;

  return (
    <FormShell
      icon={<Wallet size={15} strokeWidth={2.8} />}
      title="Hostel Fees"
      onClose={onClose}
      onSubmit={save}
      flash={flash}
      width="1150px"
      footer={
        <>
          <ActionButton icon={<Plus size={14} strokeWidth={2.5} />} text="New" onClick={reset} />
          <ActionButton icon={<Save size={14} strokeWidth={2.5} />} text={busy ? "Saving..." : "Save And Print"} submit green disabled={busy} />
          <ActionButton icon={<Printer size={14} strokeWidth={2.5} />} text="Print" onClick={printLast} />
          <ActionButton icon={<X size={14} strokeWidth={2.5} />} text="Exit" danger onClick={onClose} />
        </>
      }
    >
      <Section title="Search Hostel Student" icon={<Search size={13} />} tone="b">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_120px] sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                loadList(q);
              }
            }}
            placeholder="Search by student name, admission no, allotment no, hostel or room"
            className={inputClass}
          />
          <SearchButton onClick={() => loadList(q)} icon={<Search size={14} strokeWidth={2.5} />} />
        </div>
      </Section>

      <Section title={`Hostel Students (${list.length}) - click a row to select`} icon={<Wallet size={13} />} className="mt-2">
        <DataTable
          maxHeight="190px"
          selectedIndex={selectedIndex}
          onRowClick={pick}
          heads={["Allot. No", "Student", "Class", "Hostel / Room", "Status", "Charged", "Paid", "Due"]}
          rows={list.map((a) => [
            <b key="n">{a.allotment_no}</b>, a.student_name, `${a.class_name || "-"} ${a.section || ""}`,
            `${a.hostel_name} / ${a.room_no}`, a.status, formatMoney(a.charged),
            formatMoney(n(a.paid) + n(a.discount)),
            <span key="d" className={n(a.due) > 0 ? "font-extrabold text-red-600" : ""}>{formatMoney(a.due)}</span>,
          ])}
        />
      </Section>

      <Section title={allot ? `Fee Position - ${allot.student_name} (${allot.allotment_no})` : "Fee Position"} icon={<Wallet size={13} />} className="mt-2">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 lg:items-end">
          <Field label="Hostel / Room" value={allot ? `${allot.hostel_name} / ${allot.room_no}` : ""} disabled />
          <Field label="Monthly Fee" value={allot ? formatMoney(allot.monthly_fee) : ""} disabled />
          <Field label="Months Charged" value={allot ? allot.months : ""} disabled />
          <Field label="Total Charged" value={allot ? formatMoney(allot.charged) : ""} disabled />
          <Field label="Paid + Discount" value={allot ? formatMoney(n(allot.paid) + n(allot.discount)) : ""} disabled />
          <Field
            label={allot && n(allot.balance) < 0 ? "Advance" : "Balance Due"}
            value={allot ? formatMoney(Math.abs(n(allot.balance))) : ""}
            disabled
          />
        </div>
      </Section>

      <Section title="Payment Details" icon={<Wallet size={13} />} className="mt-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          <Field label="Receipt Date" type="date" max={todayISO()} value={pay.receiptDate} onChange={set("receiptDate")} />
          <SelectField label="Pay For" value={pay.payFor} onChange={set("payFor")} placeholder="Pay for" options={PAY_FOR} />
          <Field label="Paid Months" value={pay.paidMonths} onChange={set("paidMonths")} placeholder="e.g. Apr, May 2026" />
          <SelectField label="Payment Mode" value={pay.paymentMode} onChange={set("paymentMode")} placeholder="Mode" options={MODES} />
          <Field label="Amount Paid *" type="number" min="0" step="0.01" value={pay.amountPaid} onChange={set("amountPaid")} placeholder="0.00" />
          <Field label="Cash Discount" type="number" min="0" step="0.01" value={pay.cashDiscount} onChange={set("cashDiscount")} placeholder="0.00" />
          <Field label="Balance After Payment" value={allot ? formatMoney(Math.max(0, balanceAfter)) : ""} disabled />
          <Field
            label="Transaction ID / Cheque No"
            value={pay.paymentRef}
            onChange={set("paymentRef")}
            disabled={pay.paymentMode === "Cash"}
            placeholder={pay.paymentMode === "Cash" ? "Not needed for cash" : "Reference"}
          />
        </div>
        <div className="mt-2">
          <TextAreaField label="Remarks" value={pay.remarks} onChange={set("remarks")} placeholder="Optional remarks" />
        </div>
      </Section>

      <Section title={`Receipt History (${summary?.receipts.length || 0}) - click a row to print again`} icon={<Printer size={13} />} className="mt-2">
        <DataTable
          maxHeight="170px"
          empty={allot ? "No receipts for this student yet." : "Select a student to see receipts."}
          heads={["Receipt No", "Date", "Pay For", "Months", "Mode", "Amount", "Discount"]}
          onRowClick={(i) => setSlip(buildHostelReceiptData(summary.receipts[i]))}
          rows={(summary?.receipts || []).map((r) => [
            <b key="n">{r.receipt_no}</b>, day(r.receipt_date), r.pay_for, r.paid_months || "-",
            r.payment_mode, formatMoney(r.amount_paid), formatMoney(r.cash_discount),
          ])}
        />
      </Section>

      {slip && <FeeReceiptPreview data={slip} onClose={() => setSlip(null)} />}
    </FormShell>
  );
}
