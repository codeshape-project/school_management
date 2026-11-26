import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IdCard, Search, Save, Printer, CheckSquare, Square, Filter } from "lucide-react";
import { icardApi } from "../../api/icardApi";
import { notify } from "../../components/Toast";
import {
  FormShell, Section, Field, SelectField, ActionButton, useFlash,
} from "../library/libraryUi";
import { ICardStyles } from "./ICardFace";
import { CardPrintWindow } from "./ICardPrint";
import { CardGrid, Chip, LayoutSelect, toOptions } from "./ICardParts";
import { useICardTemplates, currentSession } from "./icardUtils";

// empty value = Active (the server default)
const STATUS = [
  { value: "inactive", label: "Inactive" },
  { value: "all", label: "All" },
];

/* =========================================================
   STUDENT I-CARD

   1. choose Session / Class / Section
   2. every student of that class gets a ready I-Card
      (photo = the photo uploaded in the Admission form)
   3. Save I-Cards  -> stored in the database
      Print         -> one card (button under it) or all selected
========================================================= */

export default function StudentICardForm({ onClose }) {
  const { templates } = useICardTemplates();
  const template = templates.student;

  const [options, setOptions] = useState({ sessions: [], classes: [], sections: [] });
  const [filter, setFilter] = useState({ session: "", className: "", section: "", status: "", q: "" });
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(() => new Set());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [layout, setLayout] = useState("a4");
  const [printItems, setPrintItems] = useState(null);
  const [flash, showFlash] = useFlash();

  const set = (key) => (value) => setFilter((f) => ({ ...f, [key]: value }));

  /* ---------- dropdown values ---------- */
  useEffect(() => {
    let cancelled = false;
    icardApi
      .filters("students", "student")
      .then((res) => {
        if (cancelled) return;
        const data = res?.data || { sessions: [], classes: [], sections: [] };
        setOptions(data);
        // start on the running session when students exist in it ("2026 - 27" -> 2026)
        const startYear = currentSession().slice(0, 4);
        const running = data.sessions.find((s) => s.replace(/\s/g, "").startsWith(startYear));
        if (running) setFilter((f) => ({ ...f, session: running }));
      })
      .catch((err) => notify.error(err.message));
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------- load students (class or a search word is required) ---------- */
  const requestId = useRef(0);

  const load = useCallback(async () => {
    const id = ++requestId.current;

    if (!filter.className && !filter.q.trim()) {
      setRows([]);
      setSelected(new Set());
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await icardApi.students({
        session: filter.session,
        className: filter.className,
        section: filter.section,
        status: filter.status,
        q: filter.q.trim(),
      });
      if (id !== requestId.current) return;
      const list = res?.data || [];
      setRows(list);
      setSelected(new Set(list.map((r) => r.id))); // everyone is ready and ticked
    } catch (err) {
      if (id !== requestId.current) return;
      setRows([]);
      setSelected(new Set());
      notify.error(err.message);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    const timer = setTimeout(load, filter.q ? 400 : 0);
    return () => clearTimeout(timer);
  }, [load, filter.q]);

  /* ---------- selection ---------- */
  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const selectAll = () => setSelected(new Set(rows.map((r) => r.id)));
  const clearAll = () => setSelected(new Set());

  const items = useMemo(
    () => rows.map((r) => ({ id: r.id, card: r.card, saved: Boolean(r.saved), missingPhoto: !r.hasPhoto })),
    [rows]
  );
  const chosen = useMemo(() => rows.filter((r) => selected.has(r.id)), [rows, selected]);
  const withoutPhoto = rows.filter((r) => !r.hasPhoto).length;

  /* ---------- save to database ---------- */
  async function persist(list) {
    setSaving(true);
    try {
      const res = await icardApi.generateStudents(list.map((r) => r.id));
      const byStudent = new Map((res?.data || []).map((rec) => [rec.studentId, rec]));
      setRows((prev) =>
        prev.map((r) => {
          const rec = byStudent.get(r.id);
          return rec ? { ...r, saved: { id: rec.id, updatedAt: rec.updatedAt } } : r;
        })
      );
      return res?.message || "I-Cards saved successfully.";
    } catch (err) {
      notify.error(err.message);
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function handleSave() {
    if (!chosen.length) return notify.info("Select at least one student I-Card.");
    const message = await persist(chosen);
    if (message) {
      notify.success(message);
      showFlash("Saved Successfully");
    }
  }

  // printing always saves first, so the database holds exactly what was printed
  async function printCards(list) {
    if (!list.length) return notify.info("Select at least one student I-Card.");
    const message = await persist(list);
    if (!message) return;
    showFlash("Saved Successfully");
    setPrintItems(list.map((r) => ({ card: r.card, template, type: "student" })));
  }

  function handleReset() {
    setFilter((f) => ({ ...f, className: "", section: "", q: "", status: "" }));
  }

  const hint = loading
    ? "Loading students..."
    : "Select a class (and section) above to get the I-Card of every student, or type a student name to search.";

  return (
    <>
      <ICardStyles />

      <FormShell
        icon={<IdCard size={16} strokeWidth={2.6} />}
        title="Student I-Card"
        onClose={onClose}
        onSubmit={(e) => e.preventDefault()}
        flash={flash}
        width="1180px"
        footer={
          <>
            <ActionButton
              green
              icon={<Save size={14} />}
              text={saving ? "Saving..." : `Save I-Cards (${chosen.length})`}
              onClick={handleSave}
              disabled={saving || !chosen.length}
            />
            <ActionButton
              icon={<Printer size={14} />}
              text={`Print Selected (${chosen.length})`}
              onClick={() => printCards(chosen)}
              disabled={saving || !chosen.length}
            />
            <ActionButton icon={<CheckSquare size={14} />} text="Select All" onClick={selectAll} disabled={!rows.length} />
            <ActionButton icon={<Square size={14} />} text="Clear" onClick={clearAll} disabled={!selected.size} />
            <ActionButton text="Reset" onClick={handleReset} />
            <LayoutSelect value={layout} onChange={setLayout} />
            <ActionButton danger text="Close" onClick={onClose} />
          </>
        }
      >
        <div className="space-y-2">
          <Section title="Select Students" icon={<Filter size={13} />}>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 md:grid-cols-3 xl:grid-cols-6">
              <SelectField
                label="Session"
                value={filter.session}
                onChange={set("session")}
                options={toOptions(options.sessions)}
                placeholder="All Sessions"
              />
              <SelectField
                label="Class"
                value={filter.className}
                onChange={set("className")}
                options={toOptions(options.classes)}
                placeholder="Select Class"
              />
              <SelectField
                label="Section"
                value={filter.section}
                onChange={set("section")}
                options={toOptions(options.sections)}
                placeholder="All Sections"
              />
              <SelectField label="Status" value={filter.status} onChange={set("status")} options={STATUS} placeholder="Active" />
              <div className="col-span-2 min-w-0">
                <Field
                  label="Search (name / admission no / mobile / father)"
                  value={filter.q}
                  onChange={set("q")}
                  placeholder="Type to search a single student"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                />
              </div>
            </div>
          </Section>

          <Section
            title={`I-Card Preview${rows.length ? ` - ${rows.length} student${rows.length === 1 ? "" : "s"}` : ""}`}
            icon={<Search size={13} />}
            tone="b"
          >
            {rows.length > 0 && (
              <div className="mb-2 flex flex-wrap items-center gap-1.5">
                <Chip>{rows.length} loaded</Chip>
                <Chip tone="gold">{chosen.length} selected</Chip>
                <Chip tone="green">{rows.filter((r) => r.saved).length} already saved</Chip>
                {withoutPhoto > 0 && (
                  <Chip tone="red">
                    {withoutPhoto} without photo - upload it in Student Admission
                  </Chip>
                )}
              </div>
            )}

            <CardGrid
              items={items}
              template={template}
              type="student"
              selected={selected}
              onToggle={toggle}
              onPrint={(it) => printCards(rows.filter((r) => r.id === it.id))}
              emptyText={rows.length === 0 && !loading && (filter.className || filter.q) ? "No students found." : hint}
            />
          </Section>
        </div>
      </FormShell>

      {printItems && (
        <CardPrintWindow
          items={printItems}
          layout={layout}
          title="Student I-Cards"
          onClose={() => setPrintItems(null)}
        />
      )}
    </>
  );
}
