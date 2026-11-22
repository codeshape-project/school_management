import { useEffect, useRef, useState } from "react";
import { Repeat, Search, Save, Plus, X, BookOpen, Users } from "lucide-react";
import { libraryApi } from "../../api/libraryApi";
import { notify } from "../../components/Toast";
import {
  FormShell, Section, Field, SelectField, TextAreaField, ActionButton, SearchButton,
  DataTable, useFlash, todayISO, addDaysISO, day, inputClass, labelClass,
} from "./libraryUi";

const blank = () => ({ bookNo: "", quantity: "1", dueDate: addDaysISO(14), memberId: "", remarks: "" });

export default function IssueBookForm({ onClose }) {
  const [form, setForm] = useState(blank);
  const [book, setBook] = useState(null);
  const [studentQ, setStudentQ] = useState("");
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);
  const [members, setMembers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [busy, setBusy] = useState(false);
  const [flash, showFlash] = useFlash();
  const searchTimer = useRef(null);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function loadIssues() {
    try {
      setIssues((await libraryApi.activeIssues("")).data || []);
    } catch (err) {
      notify.error(err.message);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setMembers((await libraryApi.members("", "active")).data || []);
      } catch (err) {
        notify.error(err.message);
      }
    })();
    loadIssues();
    return () => clearTimeout(searchTimer.current);
  }, []);

  async function findBook() {
    const no = form.bookNo.trim();
    if (!no) return notify.error("Enter a book number first.");
    try {
      const res = await libraryApi.lookupBook(no);
      if (res.data.status !== "active") {
        setBook(null);
        return notify.error("This book is inactive and cannot be issued.");
      }
      setBook(res.data);
      setForm((f) => ({ ...f, bookNo: res.data.book_no }));
    } catch (err) {
      setBook(null);
      notify.error(err.message);
    }
  }

  function onStudentType(value) {
    setStudentQ(value);
    setStudent(null);
    clearTimeout(searchTimer.current);
    if (value.trim().length < 2) {
      setStudents([]);
      return;
    }
    searchTimer.current = setTimeout(async () => {
      try {
        setStudents((await libraryApi.students(value.trim())).data || []);
      } catch (err) {
        notify.error(err.message);
      }
    }, 300);
  }

  function pickStudent(s) {
    setStudent(s);
    setStudentQ(`${s.name} (${s.record_no})`);
    setStudents([]);
  }

  function reset() {
    setForm(blank());
    setBook(null);
    setStudent(null);
    setStudentQ("");
    setStudents([]);
  }

  async function save(e) {
    e.preventDefault();
    const qty = Number(form.quantity);
    if (!form.bookNo.trim()) return notify.error("Enter the book number.");
    if (!student) return notify.error("Search and select a student.");
    if (!form.memberId) return notify.error("Select the library member issuing the book.");
    if (!Number.isInteger(qty) || qty < 1) return notify.error("Enter a valid quantity.");
    if (!form.dueDate) return notify.error("Select the due date.");
    if (form.dueDate < todayISO()) return notify.error("Due date cannot be before today.");
    if (book && qty > book.available_quantity) {
      return notify.error(`Only ${book.available_quantity} copies are available.`);
    }

    setBusy(true);
    try {
      const res = await libraryApi.issue({
        bookNo: form.bookNo.trim(),
        studentId: student.id,
        memberId: form.memberId,
        quantity: qty,
        dueDate: form.dueDate,
        remarks: form.remarks,
      });
      notify.success(`Book issued successfully. Issue No: ${res.data.issue_no}`);
      showFlash("Issued Successfully");
      reset();
      await loadIssues();
    } catch (err) {
      notify.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <FormShell
      icon={<Repeat size={15} strokeWidth={2.8} />}
      title="Issue Book"
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
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {/* BOOK */}
        <Section title="Book Information" icon={<BookOpen size={13} />}>
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_100px] items-end gap-2">
              <Field
                label="Book No *"
                value={form.bookNo}
                onChange={set("bookNo")}
                placeholder="e.g. BK000001"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    findBook();
                  }
                }}
              />
              <SearchButton onClick={findBook} text="Find" icon={<Search size={14} strokeWidth={2.5} />} />
            </div>
            <Field label="Book Title" value={book?.title || ""} disabled placeholder="Click Find to load book" />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Author" value={book?.author || ""} disabled />
              <Field label="Available Copies" value={book ? book.available_quantity : ""} disabled />
            </div>
          </div>
        </Section>

        {/* STUDENT */}
        <Section title="Student Information" icon={<Users size={13} />}>
          <div className="space-y-2">
            <div className="relative">
              <label className={labelClass}>Search Student (name / admission no.) *</label>
              <input
                value={studentQ}
                onChange={(e) => onStudentType(e.target.value)}
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
                      className="block w-full border-b border-[#e0ebf2] px-2 py-1.5 text-left text-[11px] font-semibold text-slate-800 hover:bg-[#e6f0f7]"
                    >
                      {s.name} · {s.record_no} · {s.class_name || "-"} {s.section || ""}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Field label="Admission No" value={student?.admission_no || student?.record_no || ""} disabled />
              <Field label="Class" value={student?.class_name || ""} disabled />
              <Field label="Section" value={student?.section || ""} disabled />
            </div>
          </div>
        </Section>
      </div>

      {/* ISSUE DETAILS */}
      <Section title="Issue Details" icon={<Repeat size={13} />} className="mt-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          <Field label="Issue Date" type="date" value={todayISO()} disabled />
          <Field label="Due Date *" type="date" min={todayISO()} value={form.dueDate} onChange={set("dueDate")} />
          <Field label="Quantity *" type="number" min="1" value={form.quantity} onChange={set("quantity")} />
          <SelectField
            label="Issued By (Library Member) *"
            value={form.memberId}
            onChange={set("memberId")}
            placeholder={members.length ? "Select member" : "No members - register one first"}
            options={members.map((m) => ({ value: m.id, label: `${m.member_no} - ${m.name}` }))}
          />
        </div>
        <div className="mt-2">
          <TextAreaField label="Remarks" value={form.remarks} onChange={set("remarks")} placeholder="Optional remarks" />
        </div>
      </Section>

      {/* ACTIVE ISSUES */}
      <Section title={`Currently Issued Books (${issues.length})`} icon={<BookOpen size={13} />} className="mt-2">
        <DataTable
          maxHeight="200px"
          heads={["Issue No", "Book", "Student", "Class", "Issue Date", "Due Date", "Issued", "Outstanding"]}
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
    </FormShell>
  );
}
