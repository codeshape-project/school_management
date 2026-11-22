import { useEffect, useState } from "react";
import { BookOpen, Search, Save, Plus, Pencil, X } from "lucide-react";
import { libraryApi } from "../../api/libraryApi";
import { notify } from "../../components/Toast";
import {
  FormShell, Section, Field, SelectField, ActionButton, SearchButton,
  DataTable, StatusBadge, useFlash,
} from "./libraryUi";

const blank = {
  title: "", author: "", category: "", publisher: "",
  isbn: "", shelfNo: "", totalQuantity: "1", status: "active",
};

export default function BookEntryForm({ onClose }) {
  const [form, setForm] = useState(blank);
  const [selected, setSelected] = useState(null);
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [flash, showFlash] = useFlash();

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function load(search = q) {
    try {
      const res = await libraryApi.books(search, "all");
      setBooks(res.data || []);
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
    if (!form.title.trim()) return "Book title is required.";
    const qty = Number(form.totalQuantity);
    if (!Number.isInteger(qty) || qty < 0) return "Enter a valid total quantity.";
    return "";
  }

  async function save(e) {
    e.preventDefault();
    if (selected) {
      notify.info("A book is loaded. Use Modify to update it, or New to add another book.");
      return;
    }
    const problem = validate();
    if (problem) return notify.error(problem);

    setBusy(true);
    try {
      const res = await libraryApi.saveBook(form);
      notify.success(`Book saved successfully. Book No: ${res.data.book_no}`);
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
    if (!selected) return notify.info("Select a book from the list first, then click Modify.");
    const problem = validate();
    if (problem) return notify.error(problem);

    setBusy(true);
    try {
      await libraryApi.saveBook(form, selected.id);
      notify.success("Book updated successfully.");
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
    const b = books[i];
    setSelected(b);
    setForm({
      title: b.title || "",
      author: b.author || "",
      category: b.category || "",
      publisher: b.publisher || "",
      isbn: b.isbn || "",
      shelfNo: b.shelf_no || "",
      totalQuantity: String(b.total_quantity),
      status: b.status,
    });
  }

  const selectedIndex = selected ? books.findIndex((b) => b.id === selected.id) : -1;

  return (
    <FormShell
      icon={<BookOpen size={15} strokeWidth={2.8} />}
      title="Book Entry"
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
      <Section title={selected ? `Book Details - ${selected.book_no}` : "Book Details"} icon={<BookOpen size={13} />}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          <Field label="Book No" value={selected ? selected.book_no : ""} placeholder="Auto generated" disabled />
          <Field label="Book Title *" value={form.title} onChange={set("title")} placeholder="Book title" />
          <Field label="Author" value={form.author} onChange={set("author")} placeholder="Author" />
          <Field label="Category" value={form.category} onChange={set("category")} placeholder="Category" />
          <Field label="Publisher" value={form.publisher} onChange={set("publisher")} placeholder="Publisher" />
          <Field label="ISBN" value={form.isbn} onChange={set("isbn")} placeholder="ISBN" />
          <Field label="Shelf / Rack No" value={form.shelfNo} onChange={set("shelfNo")} placeholder="Shelf / Rack" />
          <Field label="Total Quantity *" type="number" min="0" value={form.totalQuantity} onChange={set("totalQuantity")} />
          <Field label="Available Quantity" value={selected ? selected.available_quantity : form.totalQuantity} disabled />
          <SelectField
            label="Status"
            value={form.status}
            onChange={set("status")}
            placeholder="Status"
            options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
          />
        </div>
      </Section>

      <Section title="Search Book" icon={<Search size={13} />} tone="b" className="mt-2">
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
            placeholder="Search by book no, title, author, category or ISBN"
            className="h-7 w-full rounded-md border border-[#0b2a52] bg-white px-2 text-[11px] font-semibold text-slate-800 outline-none focus:border-[#061a3a] focus:ring-1 focus:ring-[#0b2a52]/30"
          />
          <SearchButton onClick={() => load(q)} icon={<Search size={14} strokeWidth={2.5} />} />
        </div>
      </Section>

      <Section title={`Book List (${books.length}) - click a row to modify`} icon={<BookOpen size={13} />} className="mt-2">
        <DataTable
          heads={["Book No", "Title", "Author", "Category", "Shelf", "Total", "Available", "Status"]}
          selectedIndex={selectedIndex}
          onRowClick={pick}
          rows={books.map((b) => [
            <b key="n">{b.book_no}</b>, b.title, b.author || "-", b.category || "-", b.shelf_no || "-",
            b.total_quantity, b.available_quantity, <StatusBadge key="s" value={b.status} />,
          ])}
        />
      </Section>
    </FormShell>
  );
}
