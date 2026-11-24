import { useEffect, useState } from "react";
import { CalendarCheck, Save, Plus, Pencil, X, User } from "lucide-react";
import { staffApi } from "../../api/staffApi";
import { notify } from "../../components/Toast";
import StaffSearch from "./StaffSearch";
import {
  FormShell, Section, Field, SelectField, TextAreaField, ActionButton,
  monthOptions, yearOptions, currentPeriod, daysInMonth, isFutureMonth, toNum, round2, useFlash, MONTHS,
} from "./staffUi";

const emptyDays = (month, year) => ({
  workingDays: String(daysInMonth(month, year)),
  presentDays: "", halfDays: "", paidLeaveDays: "", remarks: "",
});

export default function StaffAttendanceForm({ onClose }) {
  const now = currentPeriod();
  const [staff, setStaff] = useState(null);
  const [month, setMonth] = useState(String(now.month));
  const [year, setYear] = useState(String(now.year));
  const [days, setDays] = useState(() => emptyDays(now.month, now.year));
  const [loaded, setLoaded] = useState(null); // attendance already saved for this staff + month
  const [busy, setBusy] = useState(false);
  const [flash, showFlash] = useFlash();

  const setDay = (key) => (value) => setDays((d) => ({ ...d, [key]: value }));

  // whenever the staff or month changes, load what is already saved (if anything)
  useEffect(() => {
    if (!staff) return undefined;
    if (isFutureMonth(month, year)) {
      setLoaded(null);
      setDays(emptyDays(month, year));
      return undefined;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await staffApi.attendance(staff.id, month, year);
        if (cancelled) return;
        const row = res.data;
        if (row) {
          const f = row.form_data || {};
          setLoaded(row);
          setDays({
            workingDays: String(f.workingDays ?? daysInMonth(month, year)),
            presentDays: String(f.presentDays ?? ""),
            halfDays: String(f.halfDays ?? ""),
            paidLeaveDays: String(f.paidLeaveDays ?? ""),
            remarks: f.remarks || "",
          });
        } else {
          setLoaded(null);
          setDays(emptyDays(month, year));
        }
      } catch (err) {
        if (!cancelled) notify.error(err.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [staff, month, year]);

  const working = toNum(days.workingDays);
  const paid = round2(toNum(days.presentDays) + toNum(days.halfDays) * 0.5 + toNum(days.paidLeaveDays));
  const absent = round2(working - paid);

  function reset() {
    const p = currentPeriod();
    setStaff(null);
    setLoaded(null);
    setMonth(String(p.month));
    setYear(String(p.year));
    setDays(emptyDays(p.month, p.year));
  }

  function validate() {
    if (!staff) return "Search and select a staff member.";
    if (isFutureMonth(month, year)) return "This month has not started yet. Choose the current or an earlier month.";
    const maxDays = daysInMonth(month, year);
    if (working < 1 || working > maxDays) return `Working days must be between 1 and ${maxDays}.`;
    if (toNum(days.presentDays) < 0 || toNum(days.halfDays) < 0 || toNum(days.paidLeaveDays) < 0) {
      return "Days cannot be negative.";
    }
    if (toNum(days.presentDays) + toNum(days.halfDays) + toNum(days.paidLeaveDays) > working) {
      return "Present + half days + paid leave cannot be more than the working days.";
    }
    return "";
  }

  async function persist() {
    const problem = validate();
    if (problem) return notify.error(problem);

    setBusy(true);
    try {
      const res = await staffApi.saveAttendance({ ...days, staffId: staff.id, month, year });
      setLoaded(res.data);
      notify.success(`Attendance ${res.data.updated ? "updated" : "saved"} for ${staff.name} - ${MONTHS[month - 1]} ${year}.`);
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
    if (!loaded) return notify.info("No saved attendance for this staff and month yet. Click Save to add it.");
    persist();
  }

  return (
    <FormShell
      icon={<CalendarCheck size={15} strokeWidth={2.8} />}
      title="Staff Attendance"
      onClose={onClose}
      onSubmit={save}
      flash={flash}
      width="1100px"
      footer={
        <>
          <ActionButton icon={<Plus size={14} strokeWidth={2.5} />} text="New" onClick={reset} />
          <ActionButton icon={<Save size={14} strokeWidth={2.5} />} text={busy ? "Saving..." : "Save"} submit green disabled={busy} />
          <ActionButton icon={<Pencil size={14} strokeWidth={2.5} />} text="Modify" onClick={modify} disabled={busy} />
          <ActionButton icon={<X size={14} strokeWidth={2.5} />} text="Exit" danger onClick={onClose} />
        </>
      }
    >
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_330px]">
        <div className="space-y-2">
          <Section title="Staff & Month" icon={<User size={13} />}>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:items-end">
              <SelectField label="Month *" value={month} onChange={setMonth} placeholder="Month" options={monthOptions} />
              <SelectField label="Year *" value={year} onChange={setYear} placeholder="Year" options={yearOptions()} />
              <Field label="Staff ID" value={staff?.record_no || ""} placeholder="Search staff" disabled />
              <Field label="Staff Name" value={staff?.name || ""} disabled />
              <Field label="Department" value={staff?.class_name || ""} disabled />
              <Field label="Designation" value={staff?.section || ""} disabled />
              <Field label="Mobile" value={staff?.phone || ""} disabled />
              <Field label="Month Days" value={daysInMonth(month, year)} disabled />
            </div>
            {staff && loaded && (
              <p className="mt-1.5 rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-800">
                Attendance for {MONTHS[month - 1]} {year} is already saved ({loaded.record_no}). Change the days and click Save or Modify to update it.
              </p>
            )}
          </Section>

          <Section title="Attendance Details" icon={<CalendarCheck size={13} />}>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:items-end">
              <Field label="Working Days *" type="number" min="1" max="31" value={days.workingDays} onChange={setDay("workingDays")} />
              <Field label="Present Days" type="number" min="0" step="1" value={days.presentDays} onChange={setDay("presentDays")} placeholder="0" />
              <Field label="Half Days" type="number" min="0" step="1" value={days.halfDays} onChange={setDay("halfDays")} placeholder="0" />
              <Field label="Paid Leave Days" type="number" min="0" step="1" value={days.paidLeaveDays} onChange={setDay("paidLeaveDays")} placeholder="0" />
              <Field label="Paid Days (auto)" value={paid} disabled />
              <Field label="Absent / LOP Days (auto)" value={absent < 0 ? 0 : absent} disabled />
            </div>
            <div className="mt-2">
              <TextAreaField label="Remarks" value={days.remarks} onChange={setDay("remarks")} placeholder="Optional remarks" />
            </div>
            <p className="mt-1 text-[10px] font-semibold text-[#173b5c]/80">
              Paid days = present days + half days x 0.5 + paid leave. Absent days are deducted as loss of pay in Salary Entry.
            </p>
          </Section>
        </div>

        <div className="space-y-2">
          <StaffSearch onPick={setStaff} />
        </div>
      </div>
    </FormShell>
  );
}
