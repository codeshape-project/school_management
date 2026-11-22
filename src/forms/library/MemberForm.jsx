import { useEffect, useState } from "react";
import { Users, Search, Save, Plus, Pencil, X } from "lucide-react";
import { libraryApi } from "../../api/libraryApi";
import { notify } from "../../components/Toast";
import {
  FormShell, Section, Field, SelectField, ActionButton, SearchButton,
  DataTable, StatusBadge, useFlash,
} from "./libraryUi";

const blank = { name: "", phone: "", email: "", designation: "", status: "active" };

export default function MemberForm({ onClose }) {
  const [form, setForm] = useState(blank);
  const [selected, setSelected] = useState(null);
  const [members, setMembers] = useState([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [flash, showFlash] = useFlash();

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function load(search = q) {
    try {
      const res = await libraryApi.members(search, "all");
      setMembers(res.data || []);
    } catch (err) {
      notify.error(err.message);
    }
  }

  useEffect(() => {
    load("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reset() {
    setForm(blank);
    setSelected(null);
  }

  function validate() {
    if (!form.name.trim()) return "Member name is required.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Enter a valid email address.";
    return "";
  }

  async function save(e) {
    e.preventDefault();
    if (selected) {
      notify.info("A member is loaded. Use Modify to update, or New to add another member.");
      return;
    }
    const problem = validate();
    if (problem) return notify.error(problem);

    setBusy(true);
    try {
      const res = await libraryApi.saveMember(form);
      notify.success(`Library member saved successfully. Member No: ${res.data.member_no}`);
      showFlash("Saved Successfully");
      reset();
      await load();
    } catch (err) {
      notify.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function modify() {
    if (!selected) return notify.info("Select a member from the list first, then click Modify.");
    const problem = validate();
    if (problem) return notify.error(problem);

    setBusy(true);
    try {
      await libraryApi.saveMember(form, selected.id);
      notify.success("Library member updated successfully.");
      showFlash("Updated Successfully");
      reset();
      await load();
    } catch (err) {
      notify.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  function pick(i) {
    const m = members[i];
    setSelected(m);
    setForm({
      name: m.name || "",
      phone: m.phone || "",
      email: m.email || "",
      designation: m.designation || "",
      status: m.status,
    });
  }

  const selectedIndex = selected ? members.findIndex((m) => m.id === selected.id) : -1;

  return (
    <FormShell
      icon={<Users size={15} strokeWidth={2.8} />}
      title="Library Member Registration"
      onClose={onClose}
      onSubmit={save}
      flash={flash}
      width="1000px"
      footer={
        <>
          <ActionButton icon={<Plus size={14} strokeWidth={2.5} />} text="New" onClick={reset} />
          <ActionButton icon={<Save size={14} strokeWidth={2.5} />} text={busy ? "Saving..." : "Save"} submit green disabled={busy} />
          <ActionButton icon={<Pencil size={14} strokeWidth={2.5} />} text="Modify" onClick={modify} disabled={busy} />
          <ActionButton icon={<X size={14} strokeWidth={2.5} />} text="Exit" danger onClick={onClose} />
        </>
      }
    >
      <Section title={selected ? `Member Details - ${selected.member_no}` : "Member Details"} icon={<Users size={13} />}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:items-end">
          <Field label="Member No" value={selected ? selected.member_no : ""} placeholder="Auto generated" disabled />
          <Field label="Member Name *" value={form.name} onChange={set("name")} placeholder="Full name" />
          <Field label="Designation" value={form.designation} onChange={set("designation")} placeholder="Librarian / Teacher / Staff" />
          <Field label="Phone" value={form.phone} onChange={set("phone")} placeholder="Phone number" />
          <Field label="Email" type="email" value={form.email} onChange={set("email")} placeholder="Email address" />
          <SelectField
            label="Status"
            value={form.status}
            onChange={set("status")}
            placeholder="Status"
            options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
          />
        </div>
      </Section>

      <Section title="Search Member" icon={<Search size={13} />} tone="b" className="mt-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_120px] sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                load(q);
              }
            }}
            placeholder="Search by member no, name, phone or email"
            className="h-7 w-full rounded-md border border-[#0b2a52] bg-white px-2 text-[11px] font-semibold text-slate-800 outline-none focus:border-[#061a3a] focus:ring-1 focus:ring-[#0b2a52]/30"
          />
          <SearchButton onClick={() => load(q)} icon={<Search size={14} strokeWidth={2.5} />} />
        </div>
      </Section>

      <Section title={`Member List (${members.length}) - click a row to modify`} icon={<Users size={13} />} className="mt-2">
        <DataTable
          heads={["Member No", "Name", "Designation", "Phone", "Email", "Status"]}
          selectedIndex={selectedIndex}
          onRowClick={pick}
          rows={members.map((m) => [
            <b key="n">{m.member_no}</b>, m.name, m.designation || "-", m.phone || "-", m.email || "-",
            <StatusBadge key="s" value={m.status} />,
          ])}
        />
      </Section>
    </FormShell>
  );
}
