import { useEffect, useState } from "react";
import { RotateCcw, Search, Save, Plus, X, BookOpen } from "lucide-react";
import { libraryApi } from "../../api/libraryApi";
import { notify } from "../../components/Toast";
import {
  FormShell, Section, Field, SelectField, TextAreaField, ActionButton, SearchButton,
  DataTable, useFlash, todayISO, day, inputClass,
} from "./libraryUi";

export default function ReturnBookForm({ onClose }) {
  const [q, setQ] = useState("");
  const [issues, setIssues] = useState([]);
  const [selected, setSelected] = useState(null);
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ memberId: "", quantity: "", remarks: "" });
  const [busy, setBusy] = useState(false);
  const [flash, showFlash] = useFlash();

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function load(search = q) {
    try {
      setIssues((await libraryApi.activeIssues(search)).data || []);
    } catch (err) {
      notify.error(err.message);
    }
  }

  useEffect(() => {
    load("");
    (async () => {
      try {
        setMembers((await libraryApi.members("", "active")).data || []);
      } catch (err) {
        notify.error(err.message);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reset() {
    setSelected(null);
    setForm({ memberId: "", quantity: "", remarks: "" });
  }

  function pick(i) {
    const row = issues[i];
    setSelected(row);
    setForm((f) => ({ ...f, quantity: String(row.outstanding) }));
  }

  async function save(e) {
    e.preventDefault();
    if (!selected) return notify.error("Select an issued book from the list first.");
    const qty = Number(form.quantity);
    if (!form.memberId) return notify.error("Select the member receiving the book.");
    if (!Number.isInteger(qty) || qty < 1) return notify.error("Enter a valid return quantity.");
    if (qty > selected.outstanding) return notify.error(`Only ${selected.outstanding} book(s) are outstanding.`);

    setBusy(true);
    try {
      await libraryApi.returnBook({
        issueId: selected.id,
        memberId: form.memberId,
        quantity: qty,
        remarks: form.remarks,
      });
      notify.success("Book returned successfully.");
      showFlash("Returned Successfully");
      reset();
      await load();
    } catch (err) {
      notify.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  const selectedIndex = selected ? issues.findIndex((i) => i.id === selected.id) : -1;

  return (
    <FormShell
      icon={<RotateCcw size={15} strokeWidth={2.8} />}
      title="Return Book"
      onClose={onClose}
      onSubmit={save}
      flash={flash}
      width="1100px"
      footer={
        <>
          <ActionButton icon={<Plus size={14} strokeWidth={2.5} />} text="New" onClick={reset} />
          <ActionButton icon={<Save size={14} strokeWidth={2.5} />} text={busy ? "Saving..." : "Save"} submit green disabled={busy} />
          <ActionButton icon={<X size={14} strokeWidth={2.5} />} text="Exit" danger onClick={onClose} />
        </>
      }
    >
      <Section title="Search Issued Book" icon={<Search size={13} />} tone="b">
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
            placeholder="Search by issue no, student name / admission no, book no or title"
            className={inputClass}
          />
          <SearchButton onClick={() => load(q)} icon={<Search size={14} strokeWidth={2.5} />} />
        </div>
      </Section>

      <Section title={`Pending Returns (${issues.length}) - click a row to select`} icon={<BookOpen size={13} />} className="mt-2">
        <DataTable
          maxHeight="230px"
          selectedIndex={selectedIndex}
          onRowClick={pick}
          heads={["Issue No", "Book", "Student", "Class", "Issue Date", "Due Date", "Issued", "Outstanding"]}
          empty="No pending returns."
          rows={issues.map((i) => [
            <b key="n">{i.issue_no}</b>,
            `${i.book_no} - ${i.title}`,
            i.student_name,
            `${i.class_name || "-"} ${i.section || ""}`,
            day(i.issue_date),
            <span key="d" className={i.overdue ? "font-extrabold text-red-600" : ""}>{day(i.due_date)}</span>,
            i.issued_quantity,
            i.outstanding,
          ])}
        />
      </Section>

      <Section title="Return Details" icon={<RotateCcw size={13} />} className="mt-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          <Field label="Selected Book" value={selected ? `${selected.book_no} - ${selected.title}` : ""} disabled placeholder="Select from list" />
          <Field label="Student" value={selected?.student_name || ""} disabled />
          <Field label="Outstanding" value={selected ? selected.outstanding : ""} disabled />
          <Field label="Return Date" type="date" value={todayISO()} disabled />
          <SelectField
            label="Received By (Library Member) *"
            value={form.memberId}
            onChange={set("memberId")}
            placeholder={members.length ? "Select member" : "No members - register one first"}
            options={members.map((m) => ({ value: m.id, label: `${m.member_no} - ${m.name}` }))}
          />
          <Field
            label="Return Quantity *"
            type="number"
            min="1"
            max={selected?.outstanding}
            value={form.quantity}
            onChange={set("quantity")}
          />
        </div>
        <div className="mt-2">
          <TextAreaField label="Remarks" value={form.remarks} onChange={set("remarks")} placeholder="Optional remarks (damage, late fine note, etc.)" />
        </div>
      </Section>
    </FormShell>
  );
}
