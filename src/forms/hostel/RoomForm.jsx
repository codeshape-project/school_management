import { useEffect, useState } from "react";
import { DoorOpen, Search, Save, Plus, Pencil, X } from "lucide-react";
import { hostelApi } from "../../api/hostelApi";
import { notify } from "../../components/Toast";
import {
  FormShell, Section, Field, SelectField, ActionButton, SearchButton,
  DataTable, StatusBadge, useFlash, inputClass,
} from "./hostelUi";

const blank = { hostelId: "", roomNo: "", floorNo: "", roomType: "", capacity: "2", monthlyFee: "", status: "active" };

const ROOM_TYPES = ["Single Bed", "Double Bed", "Triple Bed", "Four Bed", "Dormitory"].map((t) => ({ value: t, label: t }));

export default function RoomForm({ onClose }) {
  const [form, setForm] = useState(blank);
  const [selected, setSelected] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [q, setQ] = useState("");
  const [filterHostel, setFilterHostel] = useState("");
  const [busy, setBusy] = useState(false);
  const [flash, showFlash] = useFlash();

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function load(search = q, hostelId = filterHostel) {
    try {
      setRooms((await hostelApi.rooms({ q: search, hostelId })).data || []);
    } catch (err) {
      notify.error(err.message);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setHostels((await hostelApi.hostels("", "active")).data || []);
      } catch (err) {
        notify.error(err.message);
      }
    })();
    load("", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reset() {
    setForm(blank);
    setSelected(null);
  }

  function validate() {
    if (!form.hostelId) return "Select a hostel.";
    if (!form.roomNo.trim()) return "Room number is required.";
    const cap = Number(form.capacity);
    if (!Number.isInteger(cap) || cap < 1) return "Enter a valid number of beds (capacity).";
    const fee = Number(form.monthlyFee || 0);
    if (!Number.isFinite(fee) || fee < 0) return "Enter a valid monthly fee.";
    return "";
  }

  async function save(e) {
    e.preventDefault();
    if (selected) {
      notify.info("A room is loaded. Use Modify to update it, or New to add another room.");
      return;
    }
    const problem = validate();
    if (problem) return notify.error(problem);

    setBusy(true);
    try {
      await hostelApi.saveRoom(form);
      notify.success("Room saved successfully.");
      showFlash("Saved Successfully");
      setForm((f) => ({ ...blank, hostelId: f.hostelId, floorNo: f.floorNo, roomType: f.roomType, capacity: f.capacity, monthlyFee: f.monthlyFee }));
      await load();
    } catch (err) {
      notify.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function modify() {
    if (!selected) return notify.info("Select a room from the list first, then click Modify.");
    const problem = validate();
    if (problem) return notify.error(problem);

    setBusy(true);
    try {
      await hostelApi.saveRoom(form, selected.id);
      notify.success("Room updated successfully.");
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
    const r = rooms[i];
    setSelected(r);
    setForm({
      hostelId: String(r.hostel_id),
      roomNo: r.room_no || "",
      floorNo: r.floor_no || "",
      roomType: r.room_type || "",
      capacity: String(r.capacity),
      monthlyFee: String(Number(r.monthly_fee)),
      status: r.status,
    });
  }

  const selectedIndex = selected ? rooms.findIndex((r) => r.id === selected.id) : -1;

  return (
    <FormShell
      icon={<DoorOpen size={15} strokeWidth={2.8} />}
      title="Room Management"
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
      <Section title="Room Details" icon={<DoorOpen size={13} />}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          <SelectField
            label="Hostel *"
            value={form.hostelId}
            onChange={set("hostelId")}
            placeholder={hostels.length ? "Select hostel" : "No hostel - add one in Hostel Master"}
            options={hostels.map((h) => ({ value: h.id, label: `${h.hostel_no} - ${h.name}` }))}
          />
          <Field label="Room No *" value={form.roomNo} onChange={set("roomNo")} placeholder="e.g. 101" />
          <Field label="Floor" value={form.floorNo} onChange={set("floorNo")} placeholder="e.g. Ground / 1st" />
          <SelectField label="Room Type" value={form.roomType} onChange={set("roomType")} placeholder="Select type" options={ROOM_TYPES} />
          <Field label="No. of Beds (Capacity) *" type="number" min="1" value={form.capacity} onChange={set("capacity")} />
          <Field label="Monthly Fee (per bed) *" type="number" min="0" step="0.01" value={form.monthlyFee} onChange={set("monthlyFee")} placeholder="0.00" />
          <SelectField
            label="Status"
            value={form.status}
            onChange={set("status")}
            placeholder="Status"
            options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
          />
          <Field label="Occupied / Vacant" value={selected ? `${selected.occupied} / ${selected.vacant}` : ""} disabled />
        </div>
      </Section>

      <Section title="Search Room" icon={<Search size={13} />} tone="b" className="mt-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[220px_1fr_120px] sm:items-center">
          <select
            value={filterHostel}
            onChange={(e) => {
              setFilterHostel(e.target.value);
              load(q, e.target.value);
            }}
            className={inputClass}
          >
            <option value="">All hostels</option>
            {hostels.map((h) => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                load(q);
              }
            }}
            placeholder="Search by room no, floor, type or hostel"
            className={inputClass}
          />
          <SearchButton onClick={() => load(q)} icon={<Search size={14} strokeWidth={2.5} />} />
        </div>
      </Section>

      <Section title={`Room List (${rooms.length}) - click a row to modify`} icon={<DoorOpen size={13} />} className="mt-2">
        <DataTable
          heads={["Hostel", "Room No", "Floor", "Type", "Beds", "Occupied", "Vacant", "Monthly Fee", "Status"]}
          selectedIndex={selectedIndex}
          onRowClick={pick}
          rows={rooms.map((r) => [
            r.hostel_name, <b key="n">{r.room_no}</b>, r.floor_no || "-", r.room_type || "-", r.capacity,
            r.occupied, r.vacant, Number(r.monthly_fee).toFixed(2), <StatusBadge key="s" value={r.status} />,
          ])}
        />
      </Section>
    </FormShell>
  );
}
