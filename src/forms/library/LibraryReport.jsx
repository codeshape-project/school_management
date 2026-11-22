import { useEffect, useState } from "react";
import { FileText, Download, RotateCcw, Search, X } from "lucide-react";
import { libraryApi } from "../../api/libraryApi";
import { notify } from "../../components/Toast";
import { FormShell, Section, Field, ActionButton, DataTable, StatusBadge, day } from "./libraryUi";

const TABS = ["Book Stock", "Issue Register", "Return Register", "Overdue"];

export default function LibraryReport({ onClose }) {
  const [range, setRange] = useState({ from: "", to: "" });
  const [data, setData] = useState({ books: [], issues: [], returns: [], overdue: [] });
  const [tab, setTab] = useState(TABS[0]);
  const [loading, setLoading] = useState(false);

  async function load(r = range) {
    if (r.from && r.to && r.from > r.to) return notify.error("'From' date cannot be after 'To' date.");
    setLoading(true);
    try {
      const res = await libraryApi.reportData(r);
      setData({ books: [], issues: [], returns: [], overdue: [], ...(res.data || {}) });
    } catch (err) {
      notify.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load({ from: "", to: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function download(type) {
    try {
      await libraryApi.download(type, range);
      notify.success(`${type === "excel" ? "Excel" : "PDF"} report downloaded.`);
    } catch (err) {
      notify.error(err.message);
    }
  }

  const issuedNow = data.books.reduce((s, b) => s + (b.total_quantity - b.available_quantity), 0);
  const cards = [
    ["Book Titles", data.books.length],
    ["Copies Issued Now", issuedNow],
    ["Issue Records", data.issues.length],
    ["Return Records", data.returns.length],
    ["Overdue", data.overdue.length],
  ];

  const tables = {
    "Book Stock": {
      heads: ["Book No", "Title", "Author", "Category", "Total", "Available", "Issued", "Status"],
      rows: data.books.map((b) => [
        <b key="n">{b.book_no}</b>, b.title, b.author || "-", b.category || "-",
        b.total_quantity, b.available_quantity, b.total_quantity - b.available_quantity,
        <StatusBadge key="s" value={b.status} />,
      ]),
    },
    "Issue Register": {
      heads: ["Issue No", "Book", "Student", "Class", "Issue Date", "Due Date", "Issued", "Returned", "Status"],
      rows: data.issues.map((i) => [
        <b key="n">{i.issue_no}</b>, `${i.book_no} - ${i.title}`, i.student_name,
        `${i.class_name || "-"} ${i.section || ""}`, day(i.issue_date), day(i.due_date),
        i.issued_quantity, i.returned_quantity, <StatusBadge key="s" value={i.status} />,
      ]),
    },
    "Return Register": {
      heads: ["Issue No", "Book", "Student", "Returned Qty", "Return Date", "Received By"],
      rows: data.returns.map((r) => [
        <b key="n">{r.issue_no}</b>, `${r.book_no} - ${r.title}`, r.student_name,
        r.returned_quantity, day(r.return_date), r.member_name,
      ]),
    },
    Overdue: {
      heads: ["Issue No", "Book", "Student", "Class", "Due Date", "Outstanding"],
      rows: data.overdue.map((i) => [
        <b key="n">{i.issue_no}</b>, `${i.book_no} - ${i.title}`, i.student_name,
        `${i.class_name || "-"} ${i.section || ""}`,
        <span key="d" className="font-extrabold text-red-600">{day(i.due_date)}</span>, i.outstanding,
      ]),
    },
  };

  const current = tables[tab];

  return (
    <FormShell
      icon={<FileText size={15} strokeWidth={2.8} />}
      title="Library Report"
      onClose={onClose}
      onSubmit={(e) => e.preventDefault()}
      width="1180px"
      footer={
        <>
          <ActionButton icon={<RotateCcw size={14} strokeWidth={2.5} />} text="Refresh" onClick={() => load()} />
          <ActionButton icon={<Download size={14} strokeWidth={2.5} />} text="Export PDF" green onClick={() => download("pdf")} />
          <ActionButton icon={<Download size={14} strokeWidth={2.5} />} text="Export Excel" green onClick={() => download("excel")} />
          <ActionButton icon={<X size={14} strokeWidth={2.5} />} text="Exit" danger onClick={onClose} />
        </>
      }
    >
      <Section title="Date Filter (issue / return register)" icon={<Search size={13} />} tone="b">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:items-end">
          <Field label="From Date" type="date" value={range.from} onChange={(v) => setRange((r) => ({ ...r, from: v }))} />
          <Field label="To Date" type="date" value={range.to} onChange={(v) => setRange((r) => ({ ...r, to: v }))} />
          <div className="flex gap-2">
            <ActionButton icon={<Search size={14} strokeWidth={2.5} />} text={loading ? "Loading..." : "Show"} onClick={() => load()} />
            <ActionButton
              text="Clear"
              onClick={() => {
                const cleared = { from: "", to: "" };
                setRange(cleared);
                load(cleared);
              }}
            />
          </div>
        </div>
      </Section>

      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-[#547c98] bg-[#e6f0f7] p-2 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#163d5c]">{label}</p>
            <p className="text-xl font-black text-[#0b2a52]">{value}</p>
          </div>
        ))}
      </div>

      <Section title="Report" icon={<FileText size={13} />} className="mt-2">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-md border px-3 py-1 text-[11px] font-extrabold transition-all ${
                tab === t
                  ? "border-[#f5d76e] bg-gradient-to-r from-[#f8e8a8] to-[#f3d978] text-[#061a3a]"
                  : "border-[#5685a6] bg-[#e4eef6] text-[#153b5a] hover:bg-[#d3e6f3]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <DataTable heads={current.heads} rows={current.rows} maxHeight="300px" />
      </Section>
    </FormShell>
  );
}
