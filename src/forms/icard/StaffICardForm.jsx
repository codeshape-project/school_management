import { useEffect, useMemo, useRef, useState } from "react";
import { Users, Save, Printer, Upload, Camera, RotateCcw, User, Eye } from "lucide-react";
import { icardApi } from "../../api/icardApi";
import { notify } from "../../components/Toast";
import StaffSearch from "../staff/StaffSearch";
import {
  FormShell, Section, Field, SelectField, TextAreaField, ActionButton, useFlash, todayISO,
} from "../library/libraryUi";
import ICardFace, { ICardStyles } from "./ICardFace";
import { CardPrintWindow } from "./ICardPrint";
import { Chip, LayoutSelect, toOptions } from "./ICardParts";
import { useICardTemplates } from "./icardUtils";

const BLOOD_GROUPS = toOptions(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]);
const MAX_PHOTO = 5 * 1024 * 1024;

const blank = () => ({
  name: "", designation: "", department: "", fatherName: "",
  dob: "", mobile: "", address: "", bloodGroup: "",
});

/* =========================================================
   STAFF I-CARD

   1. search and pick a staff member - the details from the
      Staff Registration fill the card automatically
   2. upload the staff photo (the staff form has no photo,
      so it is asked here)
   3. Save I-Card -> stored in the database
      Print       -> prints the saved card
========================================================= */

export default function StaffICardForm({ onClose }) {
  const { templates } = useICardTemplates();
  const template = templates.staff;

  const [staff, setStaff] = useState(null);      // staff row picked from the search
  const [form, setForm] = useState(blank);
  const [saved, setSaved] = useState(null);      // I-Card already saved for this staff
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");  // what the card shows (new file or saved photo)
  const [busy, setBusy] = useState(false);
  const [layout, setLayout] = useState("a4");
  const [printItems, setPrintItems] = useState(null);
  const [flash, showFlash] = useFlash();
  const fileRef = useRef(null);

  const bind = (key) => ({
    value: form[key],
    onChange: (v) => setForm((f) => ({ ...f, [key]: v })),
  });

  // free the temporary preview address of a chosen file
  const releasePreview = (url) => {
    if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
  };
  useEffect(() => () => releasePreview(photoUrl), [photoUrl]);

  /* ---------- pick a staff member ---------- */
  async function handlePick(row) {
    const fd = row.form_data || {};
    const fromMaster = {
      name: row.name || "",
      designation: row.section || "",
      department: row.class_name || "",
      fatherName: fd.fatherName || "",
      dob: fd.dateOfBirth || "",
      mobile: row.phone || "",
      address: [fd.address, fd.city].filter(Boolean).join(", "),
      bloodGroup: fd.bloodGroup || "",
    };

    setStaff(row);
    setForm(fromMaster);
    setSaved(null);
    setPhotoFile(null);
    setPhotoUrl("");
    if (fileRef.current) fileRef.current.value = "";

    try {
      const res = await icardApi.staffCard(row.id);
      const rec = res?.data;
      if (rec) {
        // this staff already has a card: show what was saved (photo + any edits)
        const c = rec.card || {};
        setSaved(rec);
        setPhotoUrl(c.photoUrl || "");
        setForm({
          name: c.name ?? fromMaster.name,
          designation: c.designation ?? fromMaster.designation,
          department: c.department ?? fromMaster.department,
          fatherName: c.fatherName ?? fromMaster.fatherName,
          dob: c.dob ?? fromMaster.dob,
          mobile: c.mobile ?? fromMaster.mobile,
          address: c.address ?? fromMaster.address,
          bloodGroup: c.bloodGroup ?? fromMaster.bloodGroup,
        });
        notify.info("An I-Card is already saved for this staff. You can update and save it again.");
      }
    } catch (err) {
      notify.error(err.message);
    }
  }

  /* ---------- photo ---------- */
  function handlePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      notify.error("Only JPG, PNG or WEBP photos are allowed.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_PHOTO) {
      notify.error("Photo size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setPhotoFile(file);
    setPhotoUrl(URL.createObjectURL(file));
  }

  /* ---------- the card shown on the right ---------- */
  const card = useMemo(
    () => ({
      type: "staff",
      name: form.name,
      designation: form.designation,
      department: form.department,
      idNo: staff?.record_no || "",
      fatherName: form.fatherName,
      dob: form.dob,
      mobile: form.mobile,
      address: form.address,
      bloodGroup: form.bloodGroup,
      session: staff?.session || "",
      photoUrl,
    }),
    [form, staff, photoUrl]
  );

  /* ---------- save ---------- */
  function problem() {
    if (!staff) return "Search and select a staff member first.";
    if (!form.name.trim()) return "Staff name is required.";
    if (!form.designation.trim()) return "Designation is required.";
    if (!photoFile && !saved?.card?.photoUrl) return "Upload the staff photo to create the I-Card.";
    return "";
  }

  async function persist() {
    const msg = problem();
    if (msg) {
      notify.error(msg);
      return null;
    }

    setBusy(true);
    try {
      const res = await icardApi.saveStaffCard(staff.id, form, photoFile);
      const rec = res.data;
      setSaved(rec);
      setPhotoFile(null);
      if (fileRef.current) fileRef.current.value = "";
      setPhotoUrl(rec.card?.photoUrl || "");
      notify.success(res.message || "Staff I-Card saved successfully.");
      showFlash("Saved Successfully");
      return rec;
    } catch (err) {
      notify.error(err.message);
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function handlePrint() {
    const rec = await persist(); // print always prints the saved card
    if (rec) setPrintItems([{ card: rec.card, template, type: "staff" }]);
  }

  function handleReset() {
    setStaff(null);
    setForm(blank());
    setSaved(null);
    setPhotoFile(null);
    setPhotoUrl("");
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <>
      <ICardStyles />

      <FormShell
        icon={<Users size={16} strokeWidth={2.6} />}
        title="Staff I-Card"
        onClose={onClose}
        onSubmit={(e) => e.preventDefault()}
        flash={flash}
        width="1100px"
        footer={
          <>
            <ActionButton
              green
              icon={<Save size={14} />}
              text={busy ? "Saving..." : saved ? "Update I-Card" : "Save I-Card"}
              onClick={persist}
              disabled={busy}
            />
            <ActionButton
              icon={<Printer size={14} />}
              text="Print"
              onClick={handlePrint}
              disabled={busy}
            />
            <ActionButton icon={<RotateCcw size={14} />} text="Reset" onClick={handleReset} />
            <LayoutSelect value={layout} onChange={setLayout} />
            <ActionButton danger text="Close" onClick={onClose} />
          </>
        }
      >
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* ---------------- left: search + details + photo ---------------- */}
          <div className="min-w-0 space-y-2">
            <StaffSearch onPick={handlePick} title="Search Staff" />

            <Section title="Staff Details" icon={<User size={13} />}>
              <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                {staff ? (
                  <>
                    <Chip tone="gold">Staff ID: {staff.record_no}</Chip>
                    {saved ? <Chip tone="green">I-Card saved</Chip> : <Chip>New I-Card</Chip>}
                  </>
                ) : (
                  <Chip tone="red">No staff selected</Chip>
                )}
              </div>

              <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 xl:grid-cols-3">
                <div className="sm:col-span-2 xl:col-span-1">
                  <Field label="Staff Name *" {...bind("name")} placeholder="Full name" />
                </div>
                <Field label="Designation *" {...bind("designation")} placeholder="e.g. PGT Teacher" />
                <Field label="Department" {...bind("department")} placeholder="e.g. Teaching" />
                <Field label="Father / Husband Name" {...bind("fatherName")} placeholder="Father / husband name" />
                <Field label="Date Of Birth" type="date" max={todayISO()} {...bind("dob")} />
                <Field label="Mobile" {...bind("mobile")} placeholder="Mobile number" />
                <SelectField label="Blood Group" {...bind("bloodGroup")} options={BLOOD_GROUPS} placeholder="Select" />
                <div className="sm:col-span-2 xl:col-span-2">
                  <TextAreaField label="Address" {...bind("address")} placeholder="Address printed on the card" rows={2} />
                </div>
              </div>
              <p className="mt-1 text-[9px] font-semibold text-[#173b5c]/70">
                These details come from Staff Registration. Changing them here only changes the I-Card.
              </p>
            </Section>

            <Section title="Staff Photo" icon={<Camera size={13} />} tone="b">
              <div className="flex flex-wrap items-center gap-3">
                <div className="h-[84px] w-[84px] shrink-0 overflow-hidden rounded-full border-[3px] border-[#174f7b] bg-white">
                  {photoUrl ? (
                    <img src={photoUrl} alt="" className="h-full w-full object-cover object-top" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#79a9c9]">
                      <User size={38} />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhoto}
                    className="hidden"
                  />
                  <ActionButton
                    icon={<Upload size={14} />}
                    text={photoUrl ? "Change Photo" : "Upload Photo"}
                    onClick={() => fileRef.current?.click()}
                  />
                  <p className="mt-1 text-[10px] font-semibold text-[#173b5c]/80">
                    JPG, PNG or WEBP, up to 5 MB. Use a clear, front-facing photo - it is cropped into a circle.
                  </p>
                  {photoFile && (
                    <p className="mt-0.5 flex items-center gap-1 text-[10px] font-bold text-amber-700">
                      <Eye size={11} /> New photo selected - click Save I-Card to store it.
                    </p>
                  )}
                </div>
              </div>
            </Section>
          </div>

          {/* ---------------- right: live card ---------------- */}
          <Section title="I-Card Preview" icon={<Eye size={13} />} tone="b" className="h-fit">
            <div className="mx-auto w-fit" style={{ borderRadius: 14, boxShadow: "0 3px 12px rgba(11,42,82,.35)" }}>
              <ICardFace card={card} template={template} type="staff" size="5px" />
            </div>
            <p className="mt-1.5 text-center text-[9px] font-semibold text-[#173b5c]/70">
              Staff design can be changed in Templates.
            </p>
          </Section>
        </div>
      </FormShell>

      {printItems && (
        <CardPrintWindow
          items={printItems}
          layout={layout}
          title="Staff I-Card"
          onClose={() => setPrintItems(null)}
        />
      )}
    </>
  );
}
