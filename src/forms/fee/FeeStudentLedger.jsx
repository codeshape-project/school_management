import { previewReport } from "../../api/formApi";
import { useState } from "react";
import {
  Printer,
  X,
  BookOpen,
  Bus,
  Percent,
} from "lucide-react";

export default function FeeStudentLedger({ onClose }) {
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    session: "2024 - 25",
    computerId: "",
    admissionNo: "",
    name: "",
    asOnDate: "09-12-2026",
    fatherName: "",
    className: "",
    section: "",
    siblings: "",
    expectedDue: "",
    concession: "0",
    totalDue: "",
    totalPaid: "",
    totalDiscount: "",
    balance: "",
    lateFine: "",
    lateFineTotal: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleShow(e) {
    e.preventDefault();

    try {
      await previewReport({
        sources: ["fee_payments"],
        filters: Object.fromEntries(new FormData(e.currentTarget).entries()),
        columns: ["record_no","name","admission_no","session","class_name","section","event_date"],
        limit: 500,
      });
      setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2200);
    } catch (err) {
      alert(err.message || "Unable to save data.");
    }
  }

  const inputClass = `
  h-7
  w-full
  rounded-md
  border
  border-[#0b2a52]
  bg-white
  px-2
  text-[11px]
  font-semibold
  text-slate-800
  outline-none
  transition
  focus:border-[#061a3a]
  focus:ring-1
  focus:ring-[#0b2a52]/30
`;

  const selectClass = inputClass;

  const labelClass = `
    mb-0.5
    block
    whitespace-nowrap
    text-[10px]
    font-semibold
    text-[#173b5c]
  `;

  const Button = ({
    type = "button",
    onClick,
    icon: Icon,
    children,
    red = false,
    green = false,
  }) => (
    <button
      type={type}
      onClick={onClick}
      className={`
        flex
        h-9
        min-w-[90px]
        items-center
        justify-center
        gap-1.5
        rounded-md
        border
        px-4
        text-[11px]
        font-extrabold
        transition-all
        active:scale-[0.97]
        ${
          red
            ? `
              border-red-500
              bg-red-600
              text-white
              shadow-[0_0_8px_rgba(239,68,68,0.25)]
              hover:bg-red-700
              hover:shadow-[0_0_14px_rgba(239,68,68,0.5)]
            `
            : green
            ? `
              border-emerald-600
              bg-emerald-600
              text-white
              hover:bg-emerald-700
              hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]
            `
            : `
              border-[#5685a6]
              bg-[#e4eef6]
              text-[#153b5a]
              hover:border-[#0b5fa5]
              hover:bg-[#d3e6f3]
              hover:shadow-[0_0_10px_rgba(11,95,165,0.18)]
            `
        }
      `}
    >
      {Icon && <Icon size={14} strokeWidth={2.5} />}
      <span>{children}</span>
    </button>
  );

  return (
    <form
      onSubmit={handleShow}
      className="
  flex
  h-auto
  max-h-[calc(100vh-72px)]
  w-full
  max-w-[1180px]
  flex-col
  overflow-hidden
  rounded-[22px]
  border-2
  border-[#0b2a52]
  bg-[#dbe9f4]
  p-2.5
  shadow-[0_0_18px_rgba(11,42,82,0.30)]
"
    >
      {/* HEADER - icon, title, cut button only */}
      <div
        className="
          flex
          min-h-[38px]
          shrink-0
          items-center
          justify-between
          gap-2
          rounded-lg
          border
          border-[#5d91b2]
          bg-gradient-to-r
          from-[#174f7b]
          via-[#216994]
          to-[#174f7b]
          px-3
          py-1.5
          text-white
        "
      >
        <div className="flex min-w-0 items-center gap-2">
          <div
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-md
              bg-[#d8a928]
              text-[#102f4b]
            "
          >
            <BookOpen size={15} strokeWidth={2.8} />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
            Student Ledger
          </h2>
        </div>

        {saved && (
          <span
            className="
              rounded-md
              border
              border-emerald-300
              bg-emerald-500/20
              px-2.5
              py-1
              text-[10px]
              font-bold
              text-emerald-100
            "
          >
            Showing Ledger
          </span>
        )}

        {/* TOP-RIGHT CUT BUTTON */}
        <button
          type="button"
          onClick={onClose}
          title="Close"
          className="
            flex
            h-7
            w-8
            shrink-0
            items-center
            justify-center
            rounded-md
            border
            border-red-300
            bg-red-600
            text-white
            transition-all
            hover:bg-red-700
            hover:shadow-[0_0_14px_rgba(239,68,68,0.55)]
          "
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>

      {/* SCROLLABLE FORM CONTENT */}
      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          overflow-x-hidden
          overscroll-contain
          touch-pan-y
          p-1.5
          pb-2
          scrollbar-thin
          lg:overflow-y-auto
        "
      >
        {/* TOP SEARCH INFORMATION */}
        <section
          className="
            rounded-lg
            border
            border-[#79a9c9]
            bg-[#e6f0f7]
            p-2
            shadow-sm
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-5
            "
          >
            <div>
              <label className={labelClass}>Session</label>

              <select
                name="session"
                value={form.session}
                onChange={handleChange}
                className={selectClass}
              >
                <option>2024 - 25</option>
                <option>2025 - 26</option>
                <option>2026 - 27</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Comp ID</label>

              <input
                name="computerId"
                value={form.computerId}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Adm No</label>

              <input
                name="admissionNo"
                value={form.admissionNo}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Name</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>As On Date</label>

              <input
                type="date"
                className={inputClass}
                value={
                  form.asOnDate
                    ? form.asOnDate.split("-").reverse().join("-")
                    : ""
                }
                onChange={(e) => {
                  const parts = e.target.value.split("-");

                  if (parts.length === 3) {
                    setForm((prev) => ({
                      ...prev,
                      asOnDate: `${parts[2]}-${parts[1]}-${parts[0]}`,
                    }));
                  }
                }}
              />
            </div>
          </div>

          <div
            className="
              mt-2
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <div>
              <label className={labelClass}>Father's Name</label>

              <input
                name="fatherName"
                value={form.fatherName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Class</label>

              <select
                name="className"
                value={form.className}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select Class</option>
                <option>Nursery</option>
                <option>LKG</option>
                <option>UKG</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Sec</label>

              <select
                name="section"
                value={form.section}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Select</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Siblings</label>

              <input
                name="siblings"
                value={form.siblings}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* LEDGER CONTENT */}
        <div
          className="
            mt-2
            grid
            grid-cols-1
            gap-2
            lg:grid-cols-[minmax(0,1fr)_270px]
          "
        >
          {/* LEFT LEDGER TABLE */}
          <section
            className="
              flex
              min-h-[260px]
              flex-col
              rounded-lg
              border
              border-[#547c98]
              bg-[#d9e7f2]
              p-1.5
            "
          >
            <div
              className="
                mb-1.5
                flex
                h-7
                shrink-0
                items-center
                rounded-md
                border
                border-[#7ca7c2]
                bg-[#c8dce9]
                px-2
                text-[10px]
                font-black
                uppercase
                tracking-wide
                text-[#163d5c]
              "
            >
              Ledger Details
            </div>

            <div
              className="
                min-h-[210px]
                flex-1
                overflow-x-auto
                rounded-md
                border
                border-[#567b94]
                bg-[#e3edf5]
                p-1
              "
            >
              <div className="min-w-[500px]">
                <div
                  className="
                    grid
                    grid-cols-[75px_minmax(130px,1fr)_90px_90px_90px]
                    overflow-hidden
                    rounded-md
                    border
                    border-[#7698ad]
                    bg-[#c7dce9]
                    text-[9px]
                    font-black
                    text-[#173b5c]
                  "
                >
                  <div className="border-r border-[#7698ad] px-1.5 py-1">
                    Date
                  </div>

                  <div className="border-r border-[#7698ad] px-1.5 py-1">
                    Particular
                  </div>

                  <div className="border-r border-[#7698ad] px-1.5 py-1">
                    Debit
                  </div>

                  <div className="border-r border-[#7698ad] px-1.5 py-1">
                    Credit
                  </div>

                  <div className="px-1.5 py-1">Balance</div>
                </div>

                <div
                  className="
                    mt-1
                    h-[190px]
                    rounded-md
                    border
                    border-[#a2b9c8]
                    bg-[#edf4f8]
                  "
                />
              </div>
            </div>
          </section>

          {/* RIGHT: DUES CHART */}
          <section
            className="
              flex
              min-h-[260px]
              flex-col
              rounded-lg
              border
              border-[#547c98]
              bg-[#d3e2ed]
              p-1.5
            "
          >
            <div
              className="
                mb-1.5
                rounded-md
                border
                border-[#7ca7c2]
                bg-[#c7dce9]
                px-2
                py-1.5
                text-[10px]
                font-black
                text-[#173b5c]
              "
            >
              Dues Chart
            </div>

            <div
              className="
                flex-1
                rounded-md
                border
                border-[#a2b9c8]
                bg-white
              "
            />
          </section>
        </div>

        {/* AMOUNT DETAILS */}
        <section
          className="
            mt-2
            rounded-lg
            border
            border-[#7195aa]
            bg-[#d9e7f1]
            p-2
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-6
            "
          >
            <div>
              <label className={labelClass}>Expected Due.</label>

              <input
                name="expectedDue"
                value={form.expectedDue}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Concession Amt.</label>

              <input
                name="concession"
                value={form.concession}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Total Due Amt.</label>

              <input
                name="totalDue"
                value={form.totalDue}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Total Paid Amt.</label>

              <input
                name="totalPaid"
                value={form.totalPaid}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Total Cash Discount.</label>

              <input
                name="totalDiscount"
                value={form.totalDiscount}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Balance Amt.</label>

              <input
                name="balance"
                value={form.balance}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div
            className="
              mt-2
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <div>
              <label className={labelClass}>Paid Late Fine :</label>

              <input
                name="lateFine"
                value={form.lateFine}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                With Late Fine Total Paid Amt.
              </label>

              <input
                name="lateFineTotal"
                value={form.lateFineTotal}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </section>
      </div>

      {/* ALL ACTION BUTTONS AT BOTTOM */}
      <div
        className="
          mt-1.5
          shrink-0
          rounded-lg
          border
          border-[#5d8ba7]
          bg-[#c7dce9]
          p-2.5
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-2.5
            sm:justify-start
          "
        >
          <Button
            type="submit"
            icon={BookOpen}
            green
          >
            Show
          </Button>

          <Button
            type="button"
            onClick={() => window.print()}
            icon={Printer}
          >
            Print
          </Button>

          <Button
            type="button"
            onClick={() => alert("Transport Details")}
            icon={Bus}
          >
            Transport Details
          </Button>

          <Button
            type="button"
            onClick={() => alert("Concession Details")}
            icon={Percent}
          >
            Concession Details
          </Button>

          <Button
            type="button"
            onClick={onClose}
            icon={X}
            red
          >
            Exit
          </Button>
        </div>
      </div>
    </form>
  );
}
