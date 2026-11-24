import { useEffect, useState } from "react";
import { Wallet, Save, Plus, Pencil, Printer, X, User, CalendarCheck, CreditCard } from "lucide-react";
import { staffApi } from "../../api/staffApi";
import { notify } from "../../components/Toast";
import FeeReceiptPreview from "../../components/FeeReceiptPreview";
import { buildSalarySlipData, buildSalarySlipHtml } from "../../utils/salarySlip";
import StaffSearch from "./StaffSearch";
import {
  FormShell, Section, Field, SelectField, TextAreaField, ActionButton, AmountCard, MiniButton,
  monthOptions, yearOptions, currentPeriod, daysInMonth, isFutureMonth, toNum, round2, useFlash,
  todayISO, PAY_MODES, MONTHS,
} from "./staffUi";

const blankPay = () => ({
  status: "paid", paymentDate: todayISO(), paymentMode: "Bank Transfer", paymentRef: "", remarks: "",
});

const blankAmounts = () => ({
  basicSalary: "", hra: "", da: "", ta: "", otherAllowance: "",
  pf: "", esi: "", professionalTax: "", tds: "", advance: "", otherDeduction: "",
});

export default function SalaryEntryForm({ onClose }) {
  const now = currentPeriod();
  const [staff, setStaff] = useState(null);
  const [month, setMonth] = useState(String(now.month));
  const [year, setYear] = useState(String(now.year));
  const [amounts, setAmounts] = useState(blankAmounts);
  const [workingDays, setWorkingDays] = useState(String(daysInMonth(now.month, now.year)));
  const [paidDays, setPaidDays] = useState(String(daysInMonth(now.month, now.year)));
  const [lop, setLop] = useState({ manual: false, value: "" });
  const [pay, setPay] = useState(blankPay);
  const [loaded, setLoaded] = useState(null); // salary already saved for this staff + month
  const [note, setNote] = useState("");
  const [slip, setSlip] = useState(null);
  const [busy, setBusy] = useState(false);
  const [flash, showFlash] = useFlash();

  const setAmt = (key) => (value) => setAmounts((a) => ({ ...a, [key]: value }));
  const setPayField = (key) => (value) => setPay((p) => ({ ...p, [key]: value }));

  // load structure + attendance (or the saved salary) for the chosen staff and month
  useEffect(() => {
    if (!staff) return undefined;
    if (isFutureMonth(month, year)) {
      setLoaded(null);
      setNote("This month has not started yet. Choose the current or an earlier month.");
      return undefined;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await staffApi.prepareSalary(staff.id, month, year);
        if (cancelled) return;
        const { staff: fresh, attendance, existing, daysInMonth: dim } = res.data;
        const sf = fresh.form_data || {};
        const str = (v) => (v === undefined || v === null ? "" : String(v));

        if (existing) {
          const f = existing.form_data || {};
          setLoaded(existing);
          setAmounts({
            basicSalary: str(f.basicSalary), hra: str(f.hra), da: str(f.da), ta: str(f.ta),
            otherAllowance: str(f.otherAllowance), pf: str(f.pf), esi: str(f.esi),
            professionalTax: str(f.professionalTax), tds: str(f.tds), advance: str(f.advance),
            otherDeduction: str(f.otherDeduction),
          });
          setWorkingDays(str(f.workingDays));
          setPaidDays(str(f.paidDays));
          setLop({ manual: true, value: str(f.lopDeduction) });
          setPay({
            status: existing.status === "pending" ? "pending" : "paid",
            paymentDate: f.paymentDate || todayISO(),
            paymentMode: existing.payment_mode || "Bank Transfer",
            paymentRef: str(f.paymentRef),
            remarks: str(f.remarks),
          });
          setNote(`Salary for this month is already saved (${existing.record_no}). Change it and click Save or Modify to update.`);
        } else {
          const af = attendance?.form_data;
          const working = af ? str(af.workingDays) : String(dim);
          setLoaded(null);
          setAmounts({
            basicSalary: str(sf.basicSalary), hra: str(sf.hra), da: str(sf.da), ta: str(sf.ta),
            otherAllowance: str(sf.otherAllowance), pf: str(sf.pf), esi: str(sf.esi),
            professionalTax: str(sf.professionalTax), tds: str(sf.tds), advance: "",
            otherDeduction: str(sf.otherDeduction),
          });
          setWorkingDays(working);
          setPaidDays(af ? str(af.paidDays) : working);
          setLop({ manual: false, value: "" });
          setPay(blankPay());
          setNote(
            af
              ? "Working days and paid days were taken from the saved attendance."
              : "No attendance saved for this month - full month is assumed. Edit the paid days if needed."
          );
        }
      } catch (err) {
        if (!cancelled) notify.error(err.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [staff, month, year]);

  /* ---------- calculations ---------- */
  const gross = round2(
    toNum(amounts.basicSalary) + toNum(amounts.hra) + toNum(amounts.da) + toNum(amounts.ta) + toNum(amounts.otherAllowance)
  );
  const working = toNum(workingDays);
  const lopDays = round2(working - toNum(paidDays));
  const autoLop = working > 0 && lopDays > 0 ? round2((gross / working) * lopDays) : 0;
  const lopValue = lop.manual ? toNum(lop.value) : autoLop;

  const totalDeductions = round2(
    toNum(amounts.pf) + toNum(amounts.esi) + toNum(amounts.professionalTax) + toNum(amounts.tds) +
      toNum(amounts.advance) + toNum(amounts.otherDeduction) + lopValue
  );
  const net = round2(gross - totalDeductions);

  function reset() {
    const p = currentPeriod();
    setStaff(null);
    setLoaded(null);
    setMonth(String(p.month));
    setYear(String(p.year));
    setAmounts(blankAmounts());
    setWorkingDays(String(daysInMonth(p.month, p.year)));
    setPaidDays(String(daysInMonth(p.month, p.year)));
    setLop({ manual: false, value: "" });
    setPay(blankPay());
    setNote("");
    setSlip(null);
  }

  function validate() {
    if (!staff) return "Search and select a staff member.";
    if (isFutureMonth(month, year)) return "This month has not started yet. Choose the current or an earlier month.";
    const maxDays = daysInMonth(month, year);
    if (working < 1 || working > maxDays) return `Working days must be between 1 and ${maxDays}.`;
    if (toNum(paidDays) < 0 || toNum(paidDays) > working) return "Paid days must be between 0 and the working days.";
    if (gross <= 0) return "Gross salary must be more than zero. Enter the earnings.";
    if (net < 0) return "Deductions cannot be more than the gross salary.";
    if (pay.status === "paid") {
      if (!pay.paymentDate) return "Select the payment date.";
      if (pay.paymentDate > todayISO()) return "Payment date cannot be in the future.";
      if (!pay.paymentMode) return "Select the payment mode.";
    }
    return "";
  }

  async function persist() {
    const problem = validate();
    if (problem) return notify.error(problem);

    setBusy(true);
    try {
      const res = await staffApi.saveSalary({
        staffId: staff.id, month, year, workingDays, paidDays, ...amounts,
        ...(lop.manual ? { lopDeduction: lop.value || "0" } : {}),
        status: pay.status, paymentDate: pay.paymentDate, paymentMode: pay.paymentMode,
        paymentRef: pay.paymentRef, remarks: pay.remarks,
      });
      setLoaded(res.data);
      setNote(`Salary saved (${res.data.record_no}). You can print the slip now.`);
      notify.success(`Salary ${res.data.updated ? "updated" : "saved"} for ${staff.name} - ${MONTHS[month - 1]} ${year}. Slip No: ${res.data.record_no}`);
      showFlash(res.data.updated ? "Updated Successfully" : "Saved Successfully");
    } catch (err) {
      notify.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  function save(e) {
    e.preventDefault();
    persist();
  }

  function modify() {
    if (!loaded) return notify.info("No saved salary for this staff and month yet. Click Save to add it.");
    persist();
  }

  function printSlip() {
    if (!loaded) return notify.info("Save the salary first, then print the slip.");
    setSlip(buildSalarySlipData(loaded));
  }

  return (
    <FormShell
      icon={<Wallet size={15} strokeWidth={2.8} />}
      title="Salary Entry"
      onClose={onClose}
      onSubmit={save}
      flash={flash}
      width="1200px"
      footer={
        <>
          <ActionButton icon={<Plus size={14} strokeWidth={2.5} />} text="New" onClick={reset} />
          <ActionButton icon={<Save size={14} strokeWidth={2.5} />} text={busy ? "Saving..." : "Save"} submit green disabled={busy} />
          <ActionButton icon={<Pencil size={14} strokeWidth={2.5} />} text="Modify" onClick={modify} disabled={busy} />
          <ActionButton icon={<Printer size={14} strokeWidth={2.5} />} text="Print Slip" onClick={printSlip} />
          <ActionButton icon={<X size={14} strokeWidth={2.5} />} text="Exit" danger onClick={onClose} />
        </>
      }
    >
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_330px]">
        {/* ============ LEFT ============ */}
        <div className="space-y-2">
          <Section title="Staff & Salary Month" icon={<User size={13} />}>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:items-end">
              <SelectField label="Month *" value={month} onChange={setMonth} placeholder="Month" options={monthOptions} />
              <SelectField label="Year *" value={year} onChange={setYear} placeholder="Year" options={yearOptions()} />
              <Field label="Staff ID" value={staff?.record_no || ""} placeholder="Search staff" disabled />
              <Field label="Staff Name" value={staff?.name || ""} disabled />
              <Field label="Department" value={staff?.class_name || ""} disabled />
              <Field label="Designation" value={staff?.section || ""} disabled />
              <Field label="Bank" value={staff?.form_data?.bankName || ""} disabled />
              <Field label="Account No" value={staff?.form_data?.accountNo || ""} disabled />
            </div>
            {note && (
              <p className="mt-1.5 rounded-md border border-sky-300 bg-sky-50 px-2 py-1 text-[10px] font-bold text-sky-900">
                {note}
              </p>
            )}
          </Section>

          <Section title="Attendance" icon={<CalendarCheck size={13} />}>
            <div className="grid grid-cols-3 gap-2 lg:items-end">
              <Field label="Working Days *" type="number" min="1" max="31" value={workingDays} onChange={setWorkingDays} />
              <Field label="Paid Days *" type="number" min="0" step="0.5" value={paidDays} onChange={setPaidDays} />
              <Field label="LOP Days (auto)" value={lopDays < 0 ? 0 : lopDays} disabled />
            </div>
          </Section>

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <Section title="Earnings" icon={<Wallet size={13} />}>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Basic Salary" type="number" min="0" step="0.01" value={amounts.basicSalary} onChange={setAmt("basicSalary")} placeholder="0.00" />
                <Field label="HRA" type="number" min="0" step="0.01" value={amounts.hra} onChange={setAmt("hra")} placeholder="0.00" />
                <Field label="DA" type="number" min="0" step="0.01" value={amounts.da} onChange={setAmt("da")} placeholder="0.00" />
                <Field label="TA" type="number" min="0" step="0.01" value={amounts.ta} onChange={setAmt("ta")} placeholder="0.00" />
                <Field label="Other Allowance" type="number" min="0" step="0.01" value={amounts.otherAllowance} onChange={setAmt("otherAllowance")} placeholder="0.00" />
                <Field label="Gross Salary" value={gross.toFixed(2)} disabled />
              </div>
            </Section>

            <Section title="Deductions" icon={<Wallet size={13} />}>
              <div className="grid grid-cols-2 gap-2">
                <Field label="PF" type="number" min="0" step="0.01" value={amounts.pf} onChange={setAmt("pf")} placeholder="0.00" />
                <Field label="ESI" type="number" min="0" step="0.01" value={amounts.esi} onChange={setAmt("esi")} placeholder="0.00" />
                <Field label="Professional Tax" type="number" min="0" step="0.01" value={amounts.professionalTax} onChange={setAmt("professionalTax")} placeholder="0.00" />
                <Field label="TDS" type="number" min="0" step="0.01" value={amounts.tds} onChange={setAmt("tds")} placeholder="0.00" />
                <Field label="Advance Recovery" type="number" min="0" step="0.01" value={amounts.advance} onChange={setAmt("advance")} placeholder="0.00" />
                <Field label="Other Deduction" type="number" min="0" step="0.01" value={amounts.otherDeduction} onChange={setAmt("otherDeduction")} placeholder="0.00" />
                <div className="min-w-0">
                  <div className="mb-0.5 flex items-center justify-between">
                    <label className="block truncate text-[10px] font-semibold text-[#173b5c]">Loss Of Pay</label>
                    {lop.manual && <MiniButton onClick={() => setLop({ manual: false, value: "" })}>Auto</MiniButton>}
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={lop.manual ? lop.value : autoLop.toFixed(2)}
                    onChange={(e) => setLop({ manual: true, value: e.target.value })}
                    className="h-7 w-full rounded-md border border-[#0b2a52] bg-white px-2 text-[11px] font-semibold text-slate-800 outline-none focus:border-[#061a3a] focus:ring-1 focus:ring-[#0b2a52]/30"
                  />
                </div>
                <Field label="Total Deductions" value={totalDeductions.toFixed(2)} disabled />
              </div>
            </Section>
          </div>

          <Section title="Payment Details" icon={<CreditCard size={13} />}>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:items-end">
              <SelectField
                label="Payment Status"
                value={pay.status}
                onChange={setPayField("status")}
                placeholder="Status"
                options={[{ value: "paid", label: "Paid" }, { value: "pending", label: "Pending" }]}
              />
              <Field label="Payment Date" type="date" max={todayISO()} value={pay.paymentDate} onChange={setPayField("paymentDate")} disabled={pay.status === "pending"} />
              <SelectField
                label="Payment Mode"
                value={pay.paymentMode}
                onChange={setPayField("paymentMode")}
                placeholder="Mode"
                options={PAY_MODES.map((m) => ({ value: m, label: m }))}
                disabled={pay.status === "pending"}
              />
              <Field
                label="Reference / Cheque No"
                value={pay.paymentRef}
                onChange={setPayField("paymentRef")}
                disabled={pay.status === "pending" || pay.paymentMode === "Cash"}
                placeholder={pay.paymentMode === "Cash" ? "Not needed for cash" : "Reference"}
              />
            </div>
            <div className="mt-2">
              <TextAreaField label="Remarks" value={pay.remarks} onChange={setPayField("remarks")} placeholder="Optional remarks" />
            </div>
          </Section>
        </div>

        {/* ============ RIGHT ============ */}
        <div className="space-y-2">
          <StaffSearch onPick={setStaff} />

          <Section title="Salary Summary" icon={<Wallet size={13} />}>
            <div className="grid grid-cols-1 gap-2">
              <AmountCard label="Gross Salary" value={gross} />
              <AmountCard label="Total Deductions" value={totalDeductions} />
              <AmountCard label="Net Salary" value={net} strong />
            </div>
          </Section>
        </div>
      </div>

      {slip && (
        <FeeReceiptPreview data={slip} buildHtml={buildSalarySlipHtml} printLabel="Print Slip" onClose={() => setSlip(null)} />
      )}
    </FormShell>
  );
}
