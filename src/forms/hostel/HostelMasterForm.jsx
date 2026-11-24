import { useEffect, useState } from "react";
import { Building2, Search, Save, Plus, Pencil, X } from "lucide-react";
import { hostelApi } from "../../api/hostelApi";
import { notify } from "../../components/Toast";
import {
  FormShell, Section, Field, SelectField, TextAreaField, ActionButton, SearchButton,
  DataTable, StatusBadge, useFlash, inputClass,
} from "./hostelUi";

const blank = { name: "", hostelType: "boys", wardenName: "", wardenPhone: "", address: "", status: "active" };

const TYPE_OPTIONS = [
  { value: "boys", label: "Boys Hostel" },
  { value: "girls", label: "Girls Hostel" },
  { value: "mixed", label: "Mixed" },
];

export default function HostelMasterForm({ onClose }) {
  const [form, setForm] = useState(blank);
  const [selected, setSelected] = useState(null);
  const [hostels, setHostels] = useState([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [flash, showFlash] = useFlash();

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function load(search = q) {
    try {
      setHostels((await hostelApi.hostels(search, "all")).data || []);
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

  const validate = () => (form.name.trim() ? "" : "Hostel name is required.");

  async function save(e) {
    e.preventDefault();
    if (selected) {
      notify.info("A hostel is loaded. Use Modify to update it, or New to add another hostel.");
      return;
    }
    const problem = validate();
    if (problem) return notify.error(problem);

    setBusy(true);
    try {
      const res = await hostelApi.saveHostel(form);
      notify.success(`Hostel saved successfully. Hostel No: ${res.data.hostel_no}`);
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
    if (!selected) return notify.info("Select a hostel from the list first, then click Modify.");
    const problem = validate();
    if (problem) return notify.error(problem);

    setBusy(true);
    try {
      await hostelApi.saveHostel(form, selected.id);
      notify.success("Hostel updated successfully.");
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
    const h = hostels[i];
    setSelected(h);
    setForm({
      name: h.name || "",
      hostelType: h.hostel_type || "boys",
      wardenName: h.warden_name || "",
      wardenPhone: h.warden_phone || "",
      address: h.address || "",
      status: h.status,
    });
  }

  const selectedIndex = selected ? hostels.findIndex((h) => h.id === selected.id) : -1;

  return (
    <FormShell
      icon={<Building2 size={15} strokeWidth={2.8} />}
      title="Hostel Master"
      onClose={onClose}
      onSubmit={save}
      flash={flash}
      width="1050px"
      footer={
        <>
          <ActionButton icon={<Plus size={14} strokeWidth={2.5} />} text="New" onClick={reset} />
          <ActionButton icon={<Save size={14} strokeWidth={2.5} />} text={busy ? "Saving..." : "Save"} submit green disabled={busy} />
          <ActionButton icon={<Pencil size={14} strokeWidth={2.5} />} text="Modify" onClick={modify} disabled={busy} />
          <ActionButton icon={<X size={14} strokeWidth={2.5} />} text="Exit" danger onClick={onClose} />
        </>
      }
    >
      <Section title={selected ? `Hostel Details - ${selected.hostel_no}` : "Hostel Details"} icon={<Building2 size={13} />}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:items-end">
          <Field label="Hostel No" value={selected ? selected.hostel_no : ""} placeholder="Auto generated" disabled />
          <Field label="Hostel Name *" value={form.name} onChange={set("name")} placeholder="e.g. Aryabhatta Boys Hostel" />
          <SelectField label="Hostel Type" value={form.hostelType} onChange={set("hostelType")} placeholder="Type" options={TYPE_OPTIONS} />
          <Field label="Warden Name" value={form.wardenName} onChange={set("wardenName")} placeholder="Warden name" />
          <Field label="Warden Phone" value={form.wardenPhone} onChange={set("wardenPhone")} placeholder="Phone number" />
          <SelectField
            label="Status"
            value={form.status}
            onChange={set("status")}
            placeholder="Status"
            options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
          />
        </div>
        <div className="mt-2">
          <TextAreaField label="Address" value={form.address} onChange={set("address")} placeholder="Hostel address / location" />
        </div>
      </Section>

      <Section title="Search Hostel" icon={<Search size={13} />} tone="b" className="mt-2">
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
            placeholder="Search by hostel no, name or warden"
            className={inputClass}
          />
          <SearchButton onClick={() => load(q)} icon={<Search size={14} strokeWidth={2.5} />} />
        </div>
      </Section>

      <Section title={`Hostel List (${hostels.length}) - click a row to modify`} icon={<Building2 size={13} />} className="mt-2">
        <DataTable
          heads={["Hostel No", "Name", "Type", "Warden", "Phone", "Rooms", "Beds", "Occupied", "Vacant", "Status"]}
          selectedIndex={selectedIndex}
          onRowClick={pick}
          rows={hostels.map((h) => [
            <b key="n">{h.hostel_no}</b>, h.name, h.hostel_type, h.warden_name || "-", h.warden_phone || "-",
            h.room_count, h.capacity, h.occupied, h.vacant, <StatusBadge key="s" value={h.status} />,
          ])}
        />
      </Section>
    </FormShell>
  );
}
