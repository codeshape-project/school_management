import { useEffect, useRef, useState } from "react";
import { LayoutTemplate, Save, RotateCcw, Upload, Palette, ListChecks, Eye, School } from "lucide-react";
import { icardApi } from "../../api/icardApi";
import { notify } from "../../components/Toast";
import { FormShell, Section, Field, ActionButton, useFlash } from "../library/libraryUi";
import ICardFace, { ICardStyles } from "./ICardFace";
import { FIELD_DEFS, THEMES, defaultTemplate, useICardTemplates } from "./icardUtils";

const SAMPLE = {
  student: {
    type: "student", name: "Radhika Shriwastav", fatherName: "Mr. Shivram Shriwastav",
    motherName: "Mrs. Basanti Shriwastav", dob: "2011-01-15", mobile: "1234567890",
    address: "Kevra, Kuagaon (Balod)", className: "Class 9", section: "A", session: "2026 - 27",
    rollNo: "12", admissionNo: "ADM-2026-0012", bloodGroup: "B+", photoUrl: "",
  },
  staff: {
    type: "staff", name: "Sunita Verma", designation: "PGT Teacher", department: "Teaching",
    idNo: "STF000012", fatherName: "Mr. Ramesh Verma", dob: "1985-06-02", mobile: "9876543210",
    address: "Ward 4, Balod", bloodGroup: "O+", photoUrl: "",
  },
};

const MAX_IMAGE = 5 * 1024 * 1024;

/* =========================================================
   TEMPLATES
   One design for Student cards and one for Staff cards.
   Saved in the database - every I-Card uses it.
========================================================= */

export default function TemplateForm({ onClose }) {
  const { templates, loading, reload } = useICardTemplates();
  const [type, setType] = useState("student");
  const [drafts, setDrafts] = useState(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState("");
  const [flash, showFlash] = useFlash();
  const logoRef = useRef(null);
  const signRef = useRef(null);

  // copy the saved templates into editable drafts once they are loaded
  useEffect(() => {
    if (!loading && !drafts) setDrafts(templates);
  }, [loading, templates, drafts]);

  const draft = drafts?.[type];
  const update = (patch) => setDrafts((d) => ({ ...d, [type]: { ...d[type], ...patch } }));
  const toggleField = (key) =>
    update({ fields: { ...draft.fields, [key]: !draft.fields[key] } });

  async function handleUpload(e, field) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return notify.error("Only JPG, PNG or WEBP images are allowed.");
    if (file.size > MAX_IMAGE) return notify.error("Image size must be less than 5 MB.");

    setUploading(field);
    try {
      const res = await icardApi.upload(file);
      update({ [field]: res.data.url });
      notify.success("Image uploaded. Click Save Template to keep it.");
    } catch (err) {
      notify.error(err.message);
    } finally {
      setUploading("");
    }
  }

  async function handleSave() {
    if (!draft.schoolName.trim()) return notify.error("School name is required.");
    setBusy(true);
    try {
      const res = await icardApi.saveTemplate(type, draft);
      await reload();
      notify.success(res.message || "Template saved successfully.");
      showFlash("Saved Successfully");
    } catch (err) {
      notify.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  function handleDefault() {
    update(defaultTemplate(type));
    notify.info("Default design loaded. Click Save Template to keep it.");
  }

  if (!draft) {
    return (
      <FormShell icon={<LayoutTemplate size={16} />} title="I-Card Templates" onClose={onClose} onSubmit={(e) => e.preventDefault()} width="900px" footer={<ActionButton danger text="Close" onClick={onClose} />}>
        <p className="p-4 text-center text-[11px] font-semibold text-[#173b5c]">Loading templates...</p>
      </FormShell>
    );
  }

  return (
    <>
      <ICardStyles />

      <FormShell
        icon={<LayoutTemplate size={16} strokeWidth={2.6} />}
        title="I-Card Templates"
        onClose={onClose}
        onSubmit={(e) => e.preventDefault()}
        flash={flash}
        width="1100px"
        footer={
          <>
            <ActionButton green icon={<Save size={14} />} text={busy ? "Saving..." : "Save Template"} onClick={handleSave} disabled={busy} />
            <ActionButton icon={<RotateCcw size={14} />} text="Default Design" onClick={handleDefault} />
            <ActionButton danger text="Close" onClick={onClose} />
          </>
        }
      >
        {/* student / staff tabs */}
        <div className="mb-2 flex gap-1.5">
          {[["student", "Student Template"], ["staff", "Staff Template"]].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setType(key)}
              className={`h-8 rounded-md border px-4 text-[11px] font-extrabold transition ${
                type === key
                  ? "border-[#0b2a52] bg-[#174f7b] text-[#ffd75a]"
                  : "border-[#5685a6] bg-[#e4eef6] text-[#153b5a] hover:bg-[#d3e6f3]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 space-y-2">
            <Section title="School Details" icon={<School size={13} />}>
              <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2">
                <Field label="School Name *" value={draft.schoolName} onChange={(v) => update({ schoolName: v })} placeholder="Printed in big letters" maxLength={60} />
                <Field label="Address line / tagline" value={draft.subtitle} onChange={(v) => update({ subtitle: v })} placeholder="e.g. GUNDERDEHI, BALOD (C.G.)" maxLength={80} />
                <Field
                  label={type === "student" ? "Session text (blank = student's session)" : "Session text (blank = current session)"}
                  value={draft.sessionLabel}
                  onChange={(v) => update({ sessionLabel: v })}
                  placeholder="e.g. 2026-27"
                  maxLength={20}
                />
                <Field label="Phone (footer)" value={draft.phone} onChange={(v) => update({ phone: v })} placeholder="Leave blank to hide" maxLength={30} />
                <Field label="Signature title" value={draft.signatureLabel} onChange={(v) => update({ signatureLabel: v })} placeholder="e.g. Principal" maxLength={30} />
              </div>

              <div className="mt-2 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-[#d8a928] bg-white">
                    {draft.logoUrl ? <img src={draft.logoUrl} alt="" className="h-full w-full object-contain p-0.5" /> : null}
                  </div>
                  <input ref={logoRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => handleUpload(e, "logoUrl")} />
                  <ActionButton icon={<Upload size={14} />} text={uploading === "logoUrl" ? "Uploading..." : "School Logo"} onClick={() => logoRef.current?.click()} disabled={Boolean(uploading)} />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-12 w-24 items-center justify-center overflow-hidden rounded-md border border-[#79a9c9] bg-white">
                    {draft.signatureUrl ? <img src={draft.signatureUrl} alt="" className="h-full w-full object-contain" /> : <span className="text-[9px] font-bold text-slate-400">No signature</span>}
                  </div>
                  <input ref={signRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => handleUpload(e, "signatureUrl")} />
                  <ActionButton icon={<Upload size={14} />} text={uploading === "signatureUrl" ? "Uploading..." : "Signature"} onClick={() => signRef.current?.click()} disabled={Boolean(uploading)} />
                  {draft.signatureUrl && (
                    <button type="button" onClick={() => update({ signatureUrl: "" })} className="text-[10px] font-bold text-red-600 hover:underline">
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </Section>

            <Section title="Colour Theme" icon={<Palette size={13} />} tone="b">
              <div className="flex flex-wrap gap-2">
                {Object.entries(THEMES).map(([key, t]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => update({ theme: key })}
                    className={`flex h-9 items-center gap-2 rounded-md border px-3 text-[11px] font-extrabold transition ${
                      draft.theme === key ? "border-[#0b2a52] bg-[#f8e8a8] ring-2 ring-[#d8a928]" : "border-[#79a9c9] bg-white hover:bg-[#eef6fb]"
                    }`}
                  >
                    <span className="h-4 w-4 rounded-full border border-white shadow" style={{ background: t.p }} />
                    {t.label}
                  </button>
                ))}
              </div>
            </Section>

            <Section title="Details Printed On The Card" icon={<ListChecks size={13} />}>
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {FIELD_DEFS[type].map((d) => (
                  <label key={d.key} className="flex cursor-pointer items-center gap-1.5 rounded-md border border-[#79a9c9] bg-white px-2 py-1.5 text-[11px] font-bold text-[#173b5c]">
                    <input type="checkbox" checked={Boolean(draft.fields[d.key])} onChange={() => toggleField(d.key)} className="accent-[#174f7b]" />
                    {d.label}
                  </label>
                ))}
                {type === "student" && (
                  <label className="flex cursor-pointer items-center gap-1.5 rounded-md border border-[#79a9c9] bg-white px-2 py-1.5 text-[11px] font-bold text-[#173b5c]">
                    <input type="checkbox" checked={Boolean(draft.showSection)} onChange={() => update({ showSection: !draft.showSection })} className="accent-[#174f7b]" />
                    Section after class
                  </label>
                )}
              </div>
              <p className="mt-1 text-[9px] font-semibold text-[#173b5c]/70">
                Up to 5-6 rows fit best. Empty values are skipped automatically.
              </p>
            </Section>
          </div>

          <Section title="Live Preview" icon={<Eye size={13} />} tone="b" className="h-fit">
            <div className="mx-auto w-fit" style={{ borderRadius: 14, boxShadow: "0 3px 12px rgba(11,42,82,.35)" }}>
              <ICardFace card={SAMPLE[type]} template={draft} type={type} size="5px" />
            </div>
          </Section>
        </div>
      </FormShell>
    </>
  );
}
