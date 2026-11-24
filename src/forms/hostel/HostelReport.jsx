import { useEffect, useState } from "react";
import { FileText, Download, RotateCcw, Search, X } from "lucide-react";
import { hostelApi } from "../../api/hostelApi";
import { notify } from "../../components/Toast";
import { formatMoney } from "../../utils/feeReceipt";
import { FormShell, Section, Field, ActionButton, DataTable, StatusBadge, day } from "./hostelUi";

const TABS = ["Occupancy", "Rooms", "Allotments", "Fee Collection", "Dues"];
const n = (v) => {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
};

export default function HostelReport({ onClose }) {
  const [range, setRange] = useState({ from: "", to: "" });
  const [data, setData] = useState({ hostels: [], rooms: [], allotments: [], receipts: [], dues: [] });
  const [tab, setTab] = useState(TABS[0]);
  const [loading, setLoading] = useState(false);

  async function load(r = range) {
    if (r.from && r.to && r.from > r.to) return notify.error("'From' date cannot be after 'To' date.");
    setLoading(true);
    try {
      const res = await hostelApi.reportData(r);
      setData({ hostels: [], rooms: [], allotments: [], receipts: [], dues: [], ...(res.data || {}) });
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
      await hostelApi.download(type, range);
      notify.success(`${type === "excel" ? "Excel" : "PDF"} report downloaded.`);
    } catch (err) {
      notify.error(err.message);
    }
  }

  const beds = data.hostels.reduce((s, h) => s + h.capacity, 0);
  const occupied = data.hostels.reduce((s, h) => s + h.occupied, 0);
  const collection = data.receipts.reduce((s, r) => s + n(r.amount_paid), 0);
  const totalDue = data.dues.reduce((s, r) => s + n(r.due), 0);

  const cards = [
    ["Hostels", data.hostels.length],
    ["Total Beds", beds],
    ["Occupied", occupied],
    ["Vacant", beds - occupied],
    ["Collection", formatMoney(collection)],
    ["Total Due", formatMoney(totalDue)],
  ];

  const tables = {
    Occupancy: {
      heads: ["Hostel No", "Hostel", "Type", "Warden", "Rooms", "Beds", "Occupied", "Vacant", "Status"],
      rows: data.hostels.map((h) => [
        <b key="n">{h.hostel_no}</b>, h.name, h.hostel_type, h.warden_name || "-", h.room_count,
        h.capacity, h.occupied, h.vacant, <StatusBadge key="s" value={h.status} />,
      ]),
    },
    Rooms: {
      heads: ["Hostel", "Room No", "Floor", "Type", "Beds", "Occupied", "Vacant", "Monthly Fee", "Status"],
      rows: data.rooms.map((r) => [
        r.hostel_name, <b key="n">{r.room_no}</b>, r.floor_no || "-", r.room_type || "-", r.capacity,
        r.occupied, r.vacant, formatMoney(r.monthly_fee), <StatusBadge key="s" value={r.status} />,
      ]),
    },
    Allotments: {
      heads: ["Allot. No", "Student", "Adm. No", "Class", "Hostel", "Room", "Joined", "Vacated", "Monthly Fee", "Status"],
      rows: data.allotments.map((a) => [
        <b key="n">{a.allotment_no}</b>, a.student_name, a.admission_no || "-",
        `${a.class_name || "-"} ${a.section || ""}`, a.hostel_name, a.room_no, day(a.join_date),
        day(a.vacate_date), formatMoney(a.monthly_fee), <StatusBadge key="s" value={a.status} />,
      ]),
    },
    "Fee Collection": {
      heads: ["Receipt No", "Date", "Student", "Hostel / Room", "Pay For", "Mode", "Amount", "Discount"],
      rows: data.receipts.map((r) => [
        <b key="n">{r.receipt_no}</b>, day(r.receipt_date), r.student_name, `${r.hostel_name || "-"} / ${r.room_no || "-"}`,
        r.pay_for, r.payment_mode, formatMoney(r.amount_paid), formatMoney(r.cash_discount),
      ]),
    },
    Dues: {
      heads: ["Allot. No", "Student", "Hostel / Room", "Months", "Charged", "Paid + Disc.", "Due", "Status"],
      rows: data.dues.map((r) => [
        <b key="n">{r.allotment_no}</b>, r.student_name, `${r.hostel_name} / ${r.room_no}`, r.months,
        formatMoney(r.charged), formatMoney(n(r.paid) + n(r.discount)),
        <span key="d" className="font-extrabold text-red-600">{formatMoney(r.due)}</span>,
        <StatusBadge key="s" value={r.status === "active" ? "active" : "vacated"} />,
      ]),
    },
  };

  const current = tables[tab];

  return (
    <FormShell
      icon={<FileText size={15} strokeWidth={2.8} />}
      title="Hostel Report"
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
      <Section title="Date Filter (fee collection)" icon={<Search size={13} />} tone="b">
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

      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-[#547c98] bg-[#e6f0f7] p-2 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#163d5c]">{label}</p>
            <p className="text-lg font-black text-[#0b2a52]">{value}</p>
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
