import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Printer, Filter, Search, CheckSquare, Square } from "lucide-react";
import { icardApi } from "../../api/icardApi";
import { notify } from "../../components/Toast";
import { FormShell, Section, Field, SelectField, ActionButton } from "../library/libraryUi";
import { ICardStyles } from "./ICardFace";
import { CardPrintWindow } from "./ICardPrint";
import { CardGrid, Chip, LayoutSelect, toOptions } from "./ICardParts";
import { useICardTemplates } from "./icardUtils";

const TYPES = [
  { value: "student", label: "Student I-Cards" },
  { value: "staff", label: "Staff I-Cards" },
];

/* =========================================================
   PRINT
   Every I-Card saved in the database. Filter, then print one
   card, the ticked cards, or all of them at once.
========================================================= */

export default function PrintICardForm({ onClose }) {
  const { templates } = useICardTemplates();

  const [type, setType] = useState("student");
  const [options, setOptions] = useState({ sessions: [], classes: [], sections: [] });
  const [filter, setFilter] = useState({ session: "", className: "", section: "", q: "" });
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(() => new Set());
  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState("a4");
  const [printItems, setPrintItems] = useState(null);

  const set = (key) => (value) => setFilter((f) => ({ ...f, [key]: value }));
  const isStudent = type === "student";

  const changeType = (value) => {
    setType(value);
    setFilter({ session: "", className: "", section: "", q: "" });
  };

  useEffect(() => {
    let cancelled = false;
    icardApi
      .filters("records", type)
      .then((res) => !cancelled && setOptions(res?.data || { sessions: [], classes: [], sections: [] }))
      .catch((err) => notify.error(err.message));
    return () => {
      cancelled = true;
    };
  }, [type]);

  const requestId = useRef(0);
  const load = useCallback(async () => {
    const id = ++requestId.current;
    setLoading(true);
    try {
      const res = await icardApi.records({ type, ...filter, q: filter.q.trim() });
      if (id !== requestId.current) return;
      const list = res?.data || [];
      setRows(list);
      setSelected(new Set(list.map((r) => r.id)));
    } catch (err) {
      if (id !== requestId.current) return;
      setRows([]);
      notify.error(err.message);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [type, filter]);

  useEffect(() => {
    const timer = setTimeout(load, filter.q ? 400 : 0);
    return () => clearTimeout(timer);
  }, [load, filter.q]);

  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const items = useMemo(
    () => rows.map((r) => ({ id: r.id, card: r.card, saved: true, missingPhoto: !r.card.photoUrl })),
    [rows]
  );
  const chosen = rows.filter((r) => selected.has(r.id));
  const template = templates[type];

  const print = (list) => {
    if (!list.length) return notify.info("Select at least one I-Card to print.");
    setPrintItems(list.map((r) => ({ card: r.card, template, type })));
  };

  async function remove(it) {
    if (!window.confirm("Remove this saved I-Card? You can generate it again later.")) return;
    try {
      await icardApi.deleteRecord(it.id);
      setRows((prev) => prev.filter((r) => r.id !== it.id));
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(it.id);
        return next;
      });
      notify.success("Saved I-Card removed.");
    } catch (err) {
      notify.error(err.message);
    }
  }

  return (
    <>
      <ICardStyles />

      <FormShell
        icon={<Printer size={16} strokeWidth={2.6} />}
        title="Print I-Cards"
        onClose={onClose}
        onSubmit={(e) => e.preventDefault()}
        width="1180px"
        footer={
          <>
            <ActionButton green icon={<Printer size={14} />} text={`Print Selected (${chosen.length})`} onClick={() => print(chosen)} disabled={!chosen.length} />
            <ActionButton icon={<Printer size={14} />} text={`Print All (${rows.length})`} onClick={() => print(rows)} disabled={!rows.length} />
            <ActionButton icon={<CheckSquare size={14} />} text="Select All" onClick={() => setSelected(new Set(rows.map((r) => r.id)))} disabled={!rows.length} />
            <ActionButton icon={<Square size={14} />} text="Clear" onClick={() => setSelected(new Set())} disabled={!selected.size} />
            <LayoutSelect value={layout} onChange={setLayout} />
            <ActionButton danger text="Close" onClick={onClose} />
          </>
        }
      >
        <div className="space-y-2">
          <Section title="Saved I-Cards" icon={<Filter size={13} />}>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 md:grid-cols-3 xl:grid-cols-6">
              <SelectField label="Card Type" value={type} onChange={changeType} options={TYPES} placeholder="Student I-Cards" />
              {isStudent && (
                <SelectField label="Session" value={filter.session} onChange={set("session")} options={toOptions(options.sessions)} placeholder="All Sessions" />
              )}
              <SelectField
                label={isStudent ? "Class" : "Department"}
                value={filter.className}
                onChange={set("className")}
                options={toOptions(options.classes)}
                placeholder={isStudent ? "All Classes" : "All Departments"}
              />
              <SelectField
                label={isStudent ? "Section" : "Designation"}
                value={filter.section}
                onChange={set("section")}
                options={toOptions(options.sections)}
                placeholder={isStudent ? "All Sections" : "All Designations"}
              />
              <div className="col-span-2 min-w-0">
                <Field
                  label="Search (name / ID / mobile)"
                  value={filter.q}
                  onChange={set("q")}
                  placeholder="Type to search"
                  onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                />
              </div>
            </div>
          </Section>

          <Section title={`I-Card Preview${rows.length ? ` - ${rows.length} saved` : ""}`} icon={<Search size={13} />} tone="b">
            {rows.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                <Chip>{rows.length} saved</Chip>
                <Chip tone="gold">{chosen.length} selected</Chip>
              </div>
            )}
            <CardGrid
              items={items}
              template={template}
              type={type}
              selected={selected}
              onToggle={toggle}
              onPrint={(it) => print(rows.filter((r) => r.id === it.id))}
              onRemove={remove}
              emptyText={
                loading
                  ? "Loading I-Cards..."
                  : "No saved I-Cards found. Create them in Student I-Card or Staff I-Card first."
              }
            />
          </Section>
        </div>
      </FormShell>

      {printItems && (
        <CardPrintWindow items={printItems} layout={layout} title="I-Cards" onClose={() => setPrintItems(null)} />
      )}
    </>
  );
}
