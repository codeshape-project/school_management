import { useState } from "react";
import { UserPlus, Save, Plus, Pencil, X, Phone, Briefcase, CreditCard, Wallet, User } from "lucide-react";
import { staffApi } from "../../api/staffApi";
import { notify } from "../../components/Toast";
import StaffSearch from "./StaffSearch";
import {
  FormShell, Section, Field, SelectField, TextAreaField, ActionButton, AmountCard,
  DEPARTMENTS, DESIGNATIONS, useFlash, todayISO, toNum, round2,
} from "./staffUi";

const blank = () => ({
  staffType: "Teaching", joiningDate: todayISO(), status: "active",
  name: "", fatherName: "", gender: "", dateOfBirth: "", maritalStatus: "", bloodGroup: "", category: "",
  mobile: "", alternateMobile: "", email: "", address: "", city: "", state: "", pincode: "",
  department: "", designation: "", qualification: "", experience: "",
  aadhaarNo: "", panNo: "", pfNo: "", bankName: "", accountNo: "", ifscCode: "",
  basicSalary: "", hra: "", da: "", ta: "", otherAllowance: "",
  pf: "", esi: "", professionalTax: "", tds: "", otherDeduction: "",
  remarks: "",
});

const FIELD_KEYS = Object.keys(blank());
const opts = (list) => list.map((v) => ({ value: v, label: v }));

export default function StaffForm({ onClose }) {
  const [form, setForm] = useState(blank);
  const [loaded, setLoaded] = useState(null); // saved staff row that is open for Modify
  const [busy, setBusy] = useState(false);
  const [flash, showFlash] = useFlash();

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
  const bind = (key) => ({ value: form[key], onChange: set(key) });

  const gross = round2(
    toNum(form.basicSalary) + toNum(form.hra) + toNum(form.da) + toNum(form.ta) + toNum(form.otherAllowance)
  );
  const deductions = round2(
    toNum(form.pf) + toNum(form.esi) + toNum(form.professionalTax) + toNum(form.tds) + toNum(form.otherDeduction)
  );
  const net = round2(gross - deductions);

  function reset() {
    setForm(blank());
    setLoaded(null);
  }

  // fill the form from a saved staff row (picked from the search box)
  function pick(row) {
    const f = row.form_data || {};
    const next = blank();
    FIELD_KEYS.forEach((k) => {
      if (f[k] !== undefined && f[k] !== null) next[k] = String(f[k]);
    });
    next.name = row.name || f.name || "";
    next.mobile = row.phone || "";
    next.department = row.class_name || f.department || "";
    next.designation = row.section || f.designation || "";
    next.status = row.status || "active";
    next.joiningDate = f.joiningDate || (row.event_date ? String(row.event_date).slice(0, 10) : "");
    setForm(next);
    setLoaded(row);
  }

  function validate() {
    if (!form.name.trim()) return "Staff name is required.";
    if (!form.department.trim()) return "Select or enter the department.";
    if (!form.designation.trim()) return "Select or enter the designation.";
    if (form.mobile.trim() && !/^[0-9+\-\s]{7,15}$/.test(form.mobile.trim())) return "Enter a valid mobile number.";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Enter a valid email address.";
    if (form.aadhaarNo.trim() && !/^[0-9\s]{12,14}$/.test(form.aadhaarNo.trim())) return "Aadhaar number must be 12 digits.";
    if (net < 0) return "Deductions cannot be more than the gross salary.";
    return "";
  }

  async function persist() {
    const problem = validate();
    if (problem) return notify.error(problem);

    setBusy(true);
    try {
      const res = await staffApi.saveStaff(form, loaded?.id);
      if (loaded) {
        notify.success("Staff updated successfully.");
        showFlash("Updated Successfully");
      } else {
        notify.success(`Staff saved successfully. Staff ID: ${res.data.record_no}`);
        showFlash("Saved Successfully");
      }
      reset();
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
    if (!loaded) return notify.info("Search and select a staff member first, then click Modify.");
    persist();
  }

  return (
    <FormShell
      icon={<UserPlus size={15} strokeWidth={2.8} />}
      title="Staff Registration"
      onClose={onClose}
      onSubmit={save}
      flash={flash}
      width="1200px"
      footer={
        <>
          <ActionButton icon={<Plus size={14} strokeWidth={2.5} />} text="New" onClick={reset} />
          <ActionButton icon={<Save size={14} strokeWidth={2.5} />} text={busy ? "Saving..." : "Save"} submit green disabled={busy} />
          <ActionButton icon={<Pencil size={14} strokeWidth={2.5} />} text="Modify" onClick={modify} disabled={busy} />
          <ActionButton icon={<X size={14} strokeWidth={2.5} />} text="Exit" danger onClick={onClose} />
        </>
      }
    >
      <datalist id="staff-dept-list">{DEPARTMENTS.map((d) => <option key={d} value={d} />)}</datalist>
      <datalist id="staff-desg-list">{DESIGNATIONS.map((d) => <option key={d} value={d} />)}</datalist>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_330px]">
        {/* ============ LEFT ============ */}
        <div className="space-y-2">
          <Section title={loaded ? `Staff - ${loaded.record_no}` : "Staff Information"} icon={<User size={13} />}>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:items-end">
              <Field label="Staff ID" value={loaded ? loaded.record_no : ""} placeholder="Auto generated" disabled />
              <SelectField label="Staff Type" {...bind("staffType")} placeholder="Type" options={opts(["Teaching", "Non-Teaching"])} />
              <Field label="Joining Date" type="date" {...bind("joiningDate")} />
              <SelectField
                label="Status"
                {...bind("status")}
                placeholder="Status"
                options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
              />
            </div>
          </Section>

          <Section title="Personal Details" icon={<User size={13} />}>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:items-end">
              <div className="col-span-2">
                <Field label="Staff Name *" {...bind("name")} placeholder="Full name" />
              </div>
              <div className="col-span-2">
                <Field label="Father / Husband Name" {...bind("fatherName")} placeholder="Father / husband name" />
              </div>
              <SelectField label="Gender" {...bind("gender")} options={opts(["Male", "Female", "Other"])} />
              <Field label="Date Of Birth" type="date" max={todayISO()} {...bind("dateOfBirth")} />
              <SelectField label="Marital Status" {...bind("maritalStatus")} options={opts(["Single", "Married", "Divorced", "Widowed"])} />
              <SelectField label="Blood Group" {...bind("bloodGroup")} options={opts(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])} />
              <SelectField label="Category" {...bind("category")} options={opts(["General", "OBC", "SC", "ST", "EWS"])} />
            </div>
          </Section>

          <Section title="Contact Details" icon={<Phone size={13} />}>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:items-end">
              <Field label="Mobile" {...bind("mobile")} placeholder="Mobile number" />
              <Field label="Alternate Mobile" {...bind("alternateMobile")} placeholder="Alternate number" />
              <div className="col-span-2">
                <Field label="Email" type="email" {...bind("email")} placeholder="Email address" />
              </div>
              <div className="col-span-2">
                <Field label="Address" {...bind("address")} placeholder="Address" />
              </div>
              <Field label="City" {...bind("city")} placeholder="City" />
              <Field label="State" {...bind("state")} placeholder="State" />
              <Field label="Pincode" {...bind("pincode")} placeholder="Pincode" />
            </div>
          </Section>

          <Section title="Job & Qualification" icon={<Briefcase size={13} />}>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:items-end">
              <Field label="Department *" list="staff-dept-list" {...bind("department")} placeholder="Select / type" />
              <Field label="Designation *" list="staff-desg-list" {...bind("designation")} placeholder="Select / type" />
              <Field label="Qualification" {...bind("qualification")} placeholder="e.g. M.A., B.Ed." />
              <Field label="Experience (years)" type="number" min="0" step="0.5" {...bind("experience")} placeholder="0" />
            </div>
          </Section>

          <Section title="Identity & Bank Details" icon={<CreditCard size={13} />}>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:items-end">
              <Field label="Aadhaar No" {...bind("aadhaarNo")} placeholder="12 digit number" />
              <Field label="PAN No" {...bind("panNo")} placeholder="PAN" />
              <Field label="PF / UAN No" {...bind("pfNo")} placeholder="PF / UAN" />
              <Field label="Bank Name" {...bind("bankName")} placeholder="Bank" />
              <Field label="Account No" {...bind("accountNo")} placeholder="Account number" />
              <Field label="IFSC Code" {...bind("ifscCode")} placeholder="IFSC" />
            </div>
          </Section>

          <Section title="Salary Structure (monthly)" icon={<Wallet size={13} />}>
            <p className="mb-1 text-[10px] font-extrabold text-[#173b5c]">Earnings</p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-5 lg:items-end">
              <Field label="Basic Salary" type="number" min="0" step="0.01" {...bind("basicSalary")} placeholder="0.00" />
              <Field label="HRA" type="number" min="0" step="0.01" {...bind("hra")} placeholder="0.00" />
              <Field label="DA" type="number" min="0" step="0.01" {...bind("da")} placeholder="0.00" />
              <Field label="TA" type="number" min="0" step="0.01" {...bind("ta")} placeholder="0.00" />
              <Field label="Other Allowance" type="number" min="0" step="0.01" {...bind("otherAllowance")} placeholder="0.00" />
            </div>
            <p className="mb-1 mt-2 text-[10px] font-extrabold text-[#173b5c]">Deductions</p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-5 lg:items-end">
              <Field label="PF" type="number" min="0" step="0.01" {...bind("pf")} placeholder="0.00" />
              <Field label="ESI" type="number" min="0" step="0.01" {...bind("esi")} placeholder="0.00" />
              <Field label="Professional Tax" type="number" min="0" step="0.01" {...bind("professionalTax")} placeholder="0.00" />
              <Field label="TDS" type="number" min="0" step="0.01" {...bind("tds")} placeholder="0.00" />
              <Field label="Other Deduction" type="number" min="0" step="0.01" {...bind("otherDeduction")} placeholder="0.00" />
            </div>
          </Section>
        </div>

        {/* ============ RIGHT ============ */}
        <div className="space-y-2">
          <StaffSearch onPick={pick} />

          <Section title="Salary Summary" icon={<Wallet size={13} />}>
            <div className="grid grid-cols-1 gap-2">
              <AmountCard label="Gross Salary" value={gross} />
              <AmountCard label="Total Deductions" value={deductions} />
              <AmountCard label="Net Salary" value={net} strong />
            </div>
          </Section>

          <Section title="Remarks" icon={<Pencil size={13} />}>
            <TextAreaField label="" {...bind("remarks")} placeholder="Optional remarks" rows={3} />
          </Section>
        </div>
      </div>
    </FormShell>
  );
}
