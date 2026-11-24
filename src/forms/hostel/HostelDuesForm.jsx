import { useEffect, useState } from "react";
import { AlertCircle, Search, RotateCcw, X } from "lucide-react";
import { hostelApi } from "../../api/hostelApi";
import { notify } from "../../components/Toast";
import { formatMoney } from "../../utils/feeReceipt";
import {
  FormShell, Section, SelectField, ActionButton, SearchButton, DataTable, StatusBadge, inputClass, labelClass,
} from "./hostelUi";

const n = (v) => {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
};

export default function HostelDuesForm({ onClose }) {
  const [filters, setFilters] = useState({ q: "", hostelId: "", status: "all", onlyDue: true });
  const [hostels, setHostels] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load(f = filters) {
    setLoading(true);
    try {
      const res = await hostelApi.dues({
        q: f.q, hostelId: f.hostelId, status: f.status, onlyDue: f.onlyDue ? "true" : "false",
      });
      setRows(res.data || []);
    } catch (err) {
      notify.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setHostels((await hostelApi.hostels("", "all")).data || []);
      } catch (err) {
        notify.error(err.message);
      }
    })();
    load(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (key) => (value) => setFilters((f) => ({ ...f, [key]: value }));
  const totals = rows.reduce(
    (t, r) => ({ charged: t.charged + n(r.charged), paid: t.paid + n(r.paid) + n(r.discount), due: t.due + n(r.due) }),
    { charged: 0, paid: 0, due: 0 }
  );

  return (
    <FormShell
      icon={<AlertCircle size={15} strokeWidth={2.8} />}
      title="Hostel Dues"
      onClose={onClose}
      onSubmit={(e) => e.preventDefault()}
      width="1150px"
      footer={
        <>
          <ActionButton icon={<RotateCcw size={14} strokeWidth={2.5} />} text="Refresh" onClick={() => load()} />
          <ActionButton icon={<X size={14} strokeWidth={2.5} />} text="Exit" danger onClick={onClose} />
        </>
      }
    >
      <Section title="Filter" icon={<Search size={13} />} tone="b">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[1fr_200px_150px_150px_110px] lg:items-end">
          <div>
            <label className={labelClass}>Search</label>
            <input
              value={filters.q}
              onChange={(e) => set("q")(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  load();
                }
              }}
              placeholder="Student, admission no, allotment no or hostel"
              className={inputClass}
            />
          </div>
          <SelectField
            label="Hostel"
            value={filters.hostelId}
            onChange={set("hostelId")}
            placeholder="All hostels"
            options={hostels.map((h) => ({ value: h.id, label: h.name }))}
          />
          <SelectField
            label="Student Status"
            value={filters.status}
            onChange={set("status")}
            placeholder="All"
            options={[{ value: "all", label: "All" }, { value: "active", label: "In hostel" }, { value: "vacated", label: "Vacated" }]}
          />
          <label className="flex h-7 items-center gap-2 text-[11px] font-bold text-[#173b5c]">
            <input type="checkbox" checked={filters.onlyDue} onChange={(e) => set("onlyDue")(e.target.checked)} />
            Only students with dues
          </label>
          <SearchButton onClick={() => load()} text={loading ? "Loading..." : "Show"} icon={<Search size={14} strokeWidth={2.5} />} />
        </div>
      </Section>

      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ["Students", rows.length],
          ["Total Charged", formatMoney(totals.charged)],
          ["Total Received", formatMoney(totals.paid)],
          ["Total Due", formatMoney(totals.due)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-[#547c98] bg-[#e6f0f7] p-2 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#163d5c]">{label}</p>
            <p className="text-lg font-black text-[#0b2a52]">{value}</p>
          </div>
        ))}
      </div>

      <Section title={`Dues List (${rows.length})`} icon={<AlertCircle size={13} />} className="mt-2">
        <DataTable
          maxHeight="360px"
          heads={["Allot. No", "Student", "Class", "Hostel / Room", "Months", "Charged", "Paid + Disc.", "Due", "Status"]}
          rows={rows.map((r) => [
            <b key="n">{r.allotment_no}</b>, r.student_name, `${r.class_name || "-"} ${r.section || ""}`,
            `${r.hostel_name} / ${r.room_no}`, r.months, formatMoney(r.charged),
            formatMoney(n(r.paid) + n(r.discount)),
            <span key="d" className={n(r.due) > 0 ? "font-extrabold text-red-600" : ""}>{formatMoney(r.due)}</span>,
            <StatusBadge key="s" value={r.status === "active" ? "active" : "vacated"} />,
          ])}
        />
      </Section>
    </FormShell>
  );
}
