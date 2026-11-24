import { useEffect, useRef, useState } from "react";
import { BedDouble, Search, Save, Plus, Pencil, LogOut, X, Users } from "lucide-react";
import { hostelApi } from "../../api/hostelApi";
import { notify } from "../../components/Toast";
import {
  FormShell, Section, Field, SelectField, TextAreaField, ActionButton, SearchButton,
  DataTable, StatusBadge, useFlash, todayISO, day, inputClass, labelClass,
} from "./hostelUi";

const blank = () => ({
  hostelId: "", roomId: "", bedNo: "", joinDate: todayISO(),
  monthlyFee: "", securityDeposit: "0", remarks: "",
});

export default function AllotmentForm({ onClose }) {
  const [form, setForm] = useState(blank);
  const [selected, setSelected] = useState(null); // loaded allotment
  const [studentQ, setStudentQ] = useState("");
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);
  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [vacateDate, setVacateDate] = useState(todayISO());
  const [busy, setBusy] = useState(false);
  const [flash, showFlash] = useFlash();
  const timer = useRef(null);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
  const isVacated = selected?.status === "vacated";

  async function loadList(search = q, status = statusFilter) {
    try {
      setList((await hostelApi.allotments({ q: search, status })).data || []);
    } catch (err) {
      notify.error(err.message);
    }
  }

  async function loadRooms(hostelId) {
    if (!hostelId) {
      setRooms([]);
      return;
    }
    try {
      setRooms((await hostelApi.rooms({ hostelId, status: "active" })).data || []);
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
    loadList("", "all");
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onStudentType(value) {
    setStudentQ(value);
    setStudent(null);
    clearTimeout(timer.current);
    if (value.trim().length < 2) {
      setStudents([]);
      return;
    }
    timer.current = setTimeout(async () => {
      try {
        setStudents((await hostelApi.students(value.trim())).data || []);
      } catch (err) {
        notify.error(err.message);
      }
    }, 300);
  }

  function pickStudent(s) {
    if (s.allotted) {
      notify.error(`${s.name} already has an active hostel allotment.`);
      return;
    }
    setStudent(s);
    setStudentQ(`${s.name} (${s.record_no})`);
    setStudents([]);
  }

  function onHostel(value) {
    setForm((f) => ({ ...f, hostelId: value, roomId: "" }));
    loadRooms(value);
  }

  function onRoom(value) {
    const room = rooms.find((r) => String(r.id) === String(value));
    setForm((f) => ({
      ...f,
      roomId: value,
      // new allotment: take the room's monthly fee as the default
      monthlyFee: !selected && room ? String(Number(room.monthly_fee)) : f.monthlyFee,
    }));
  }

  function reset() {
    setForm(blank());
    setSelected(null);
    setStudent(null);
    setStudentQ("");
    setStudents([]);
    setRooms([]);
    setVacateDate(todayISO());
  }

  function validate() {
    if (!form.hostelId) return "Select a hostel.";
    if (!form.roomId) return "Select a room.";
    if (!form.joinDate) return "Select the joining date.";
    const fee = Number(form.monthlyFee || 0);
    const dep = Number(form.securityDeposit || 0);
    if (!Number.isFinite(fee) || fee < 0) return "Enter a valid monthly fee.";
    if (!Number.isFinite(dep) || dep < 0) return "Enter a valid security deposit.";
    return "";
  }

  async function save(e) {
    e.preventDefault();
    if (selected) {
      notify.info("An allotment is loaded. Use Modify to update it, or New to allot another student.");
      return;
    }
    if (!student) return notify.error("Search and select a student.");
    const problem = validate();
    if (problem) return notify.error(problem);

    setBusy(true);
    try {
      const res = await hostelApi.allot({ ...form, studentId: student.id });
      notify.success(`Hostel allotted successfully. Allotment No: ${res.data.allotment_no}`);
      showFlash("Saved Successfully");
      reset();
      await loadList();
    } catch (err) {
      notify.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function modify() {
    if (!selected) return notify.info("Select an allotment from the list first, then click Modify.");
    if (isVacated) return notify.error("A vacated allotment cannot be modified.");
    const problem = validate();
    if (problem) return notify.error(problem);

    setBusy(true);
    try {
      await hostelApi.updateAllotment(selected.id, form);
      notify.success("Allotment updated successfully.");
      showFlash("Updated Successfully");
      reset();
      await loadList();
    } catch (err) {
      notify.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function vacate() {
    if (!selected) return notify.info("Select an allotment from the list first, then click Vacate.");
    if (isVacated) return notify.error("This student has already vacated.");
    if (!vacateDate) return notify.error("Select the vacate date.");
    if (!window.confirm(`Vacate ${selected.student_name} from ${selected.hostel_name} / Room ${selected.room_no}?`)) return;

    setBusy(true);
    try {
      await hostelApi.vacate(selected.id, { vacateDate, remarks: form.remarks });
      notify.success("Student vacated successfully.");
      showFlash("Vacated Successfully");
      reset();
      await loadList();
    } catch (err) {
      notify.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  function pick(i) {
    const a = list[i];
    setSelected(a);
    setStudent(null);
    setStudentQ(`${a.student_name} (${a.student_record_no})`);
    setStudents([]);
    setForm({
      hostelId: String(a.hostel_id),
      roomId: String(a.room_id),
      bedNo: a.bed_no || "",
      joinDate: day(a.join_date),
      monthlyFee: String(Number(a.monthly_fee)),
      securityDeposit: String(Number(a.security_deposit)),
      remarks: a.remarks || "",
    });
    setVacateDate(todayISO());
    loadRooms(String(a.hostel_id));
  }

  const shown = selected
    ? { admission_no: selected.admission_no, class_name: selected.class_name, section: selected.section, father_name: selected.father_name }
    : student || {};
  const selectedIndex = selected ? list.findIndex((a) => a.id === selected.id) : -1;

  return (
    <FormShell
      icon={<BedDouble size={15} strokeWidth={2.8} />}
      title="Hostel Allotment"
      onClose={onClose}
      onSubmit={save}
      flash={flash}
      width="1150px"
      footer={
        <>
          <ActionButton icon={<Plus size={14} strokeWidth={2.5} />} text="New" onClick={reset} />
          <ActionButton icon={<Save size={14} strokeWidth={2.5} />} text={busy ? "Saving..." : "Save"} submit green disabled={busy} />
          <ActionButton icon={<Pencil size={14} strokeWidth={2.5} />} text="Modify" onClick={modify} disabled={busy} />
          <ActionButton icon={<LogOut size={14} strokeWidth={2.5} />} text="Vacate" onClick={vacate} disabled={busy} />
          <ActionButton icon={<X size={14} strokeWidth={2.5} />} text="Exit" danger onClick={onClose} />
        </>
      }
    >
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {/* STUDENT */}
        <Section title={selected ? `Student - ${selected.allotment_no}` : "Student Information"} icon={<Users size={13} />}>
          <div className="space-y-2">
            <div className="relative">
              <label className={labelClass}>Search Student (name / admission no.) *</label>
              <input
                value={studentQ}
                onChange={(e) => onStudentType(e.target.value)}
                disabled={!!selected}
                placeholder="Type at least 2 characters"
                className={inputClass}
              />
              {students.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-20 mt-0.5 max-h-40 overflow-auto rounded-md border border-[#0b2a52] bg-white shadow-lg">
                  {students.map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => pickStudent(s)}
                      className={`block w-full border-b border-[#e0ebf2] px-2 py-1.5 text-left text-[11px] font-semibold hover:bg-[#e6f0f7] ${
                        s.allotted ? "text-slate-400" : "text-slate-800"
                      }`}
                    >
                      {s.name} · {s.record_no} · {s.class_name || "-"} {s.section || ""}
                      {s.allotted ? "  (already in hostel)" : ""}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Field label="Admission No" value={shown.admission_no || ""} disabled />
              <Field label="Class" value={shown.class_name || ""} disabled />
              <Field label="Section" value={shown.section || ""} disabled />
              <Field label="Father Name" value={shown.father_name || ""} disabled />
            </div>
          </div>
        </Section>

        {/* ROOM */}
        <Section title="Hostel & Room" icon={<BedDouble size={13} />}>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <SelectField
              label="Hostel *"
              value={form.hostelId}
              onChange={onHostel}
              disabled={isVacated}
              placeholder={hostels.length ? "Select hostel" : "No hostel - add one first"}
              options={hostels.map((h) => ({ value: h.id, label: h.name }))}
            />
            <SelectField
              label="Room *"
              value={form.roomId}
              onChange={onRoom}
              disabled={isVacated}
              placeholder={form.hostelId ? (rooms.length ? "Select room" : "No rooms in this hostel") : "Select hostel first"}
              options={rooms.map((r) => ({
                value: r.id,
                label: `${r.room_no} - ${r.vacant} vacant of ${r.capacity}`,
              }))}
            />
            <Field label="Bed No" value={form.bedNo} onChange={set("bedNo")} disabled={isVacated} placeholder="e.g. B1 (optional)" />
            <Field label="Joining Date *" type="date" value={form.joinDate} onChange={set("joinDate")} disabled={isVacated} />
          </div>
        </Section>
      </div>

      <Section title="Fee Terms" icon={<BedDouble size={13} />} className="mt-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:items-end">
          <Field label="Monthly Fee *" type="number" min="0" step="0.01" value={form.monthlyFee} onChange={set("monthlyFee")} disabled={isVacated} placeholder="Taken from room" />
          <Field label="Security Deposit" type="number" min="0" step="0.01" value={form.securityDeposit} onChange={set("securityDeposit")} disabled={isVacated} />
          <Field
            label={isVacated ? "Vacated On" : "Vacate Date (used by Vacate button)"}
            type="date"
            value={isVacated ? day(selected.vacate_date) : vacateDate}
            onChange={setVacateDate}
            max={todayISO()}
            disabled={isVacated || !selected}
          />
        </div>
        <div className="mt-2">
          <TextAreaField label="Remarks" value={form.remarks} onChange={set("remarks")} placeholder="Optional remarks" />
        </div>
      </Section>

      <Section title="Search Allotment" icon={<Search size={13} />} tone="b" className="mt-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[160px_1fr_120px] sm:items-center">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              loadList(q, e.target.value);
            }}
            className={inputClass}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="vacated">Vacated</option>
          </select>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                loadList(q);
              }
            }}
            placeholder="Search by allotment no, student, admission no, hostel or room"
            className={inputClass}
          />
          <SearchButton onClick={() => loadList(q)} icon={<Search size={14} strokeWidth={2.5} />} />
        </div>
      </Section>

      <Section title={`Allotment List (${list.length}) - click a row to modify / vacate`} icon={<BedDouble size={13} />} className="mt-2">
        <DataTable
          maxHeight="230px"
          selectedIndex={selectedIndex}
          onRowClick={pick}
          heads={["Allot. No", "Student", "Class", "Hostel", "Room", "Bed", "Joined", "Monthly Fee", "Status"]}
          rows={list.map((a) => [
            <b key="n">{a.allotment_no}</b>, a.student_name, `${a.class_name || "-"} ${a.section || ""}`,
            a.hostel_name, a.room_no, a.bed_no || "-", day(a.join_date), Number(a.monthly_fee).toFixed(2),
            <StatusBadge key="s" value={a.status} />,
          ])}
        />
      </Section>
    </FormShell>
  );
}
