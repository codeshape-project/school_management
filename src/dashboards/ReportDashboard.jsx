
import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  FileBarChart2,
  FileDown,
  RefreshCw,
  X,
} from "lucide-react";

import {
  downloadReportPdf,
  getReportFields,
  previewReport,
} from "../api/formApi";

const SOURCES = [
  ["enquiries", "Enquiries"],
  ["registrations", "Registrations"],
  ["students", "Students"],
  ["complaints", "Complaints"],
  ["transfer_certificates", "Transfer Certificates"],
  ["fee_formats", "Fee Formats"],
  ["fee_dues", "Fee Dues"],
  ["fee_receipts", "Fee Receipts"],
  ["fee_payments", "Fee Payments"],
  ["fee_blank_receipts", "Blank Receipts"],
  ["transport_allotments", "Transport Allotments"],
  ["conveyance_students", "Conveyance Students"],
  ["conveyance_amounts", "Conveyance Amounts"],
];

const COMMON = [
  ["record_no", "Record No"],
  ["name", "Student Name"],
  ["phone", "Phone"],
  ["admission_no", "Admission No"],
  ["session", "Session"],
  ["class_name", "Class"],
  ["section", "Section"],
  ["status", "Status"],
  ["event_date", "Date"],
  ["payment_mode", "Payment Mode"],
  ["vehicle_no", "Vehicle No"],
  ["route_name", "Route"],
  ["created_at", "Created At"],
];

const INITIAL_FILTERS = {
  fromDate: "",
  toDate: "",
  session: "",
  className: "",
  section: "",
  name: "",
  phone: "",
  admissionNo: "",
  status: "",
  paymentMode: "",
  vehicleNo: "",
  routeName: "",
  search: "",
};

export default function ReportDashboard({ onBack, onClose }) {
  const closeReport = onClose || onBack;

  const [source, setSource] = useState("students");

  const [selectedColumns, setSelectedColumns] = useState(
    COMMON.slice(0, 8).map(([value]) => value)
  );

  const [fields, setFields] = useState(null);

  const [filters, setFilters] = useState({
    ...INITIAL_FILTERS,
  });

  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadFields();
  }, []);

  async function loadFields() {
    try {
      const result = await getReportFields();

      setFields(result?.data || result);
    } catch (err) {
      console.error(
        "Unable to load report fields:",
        err
      );
    }
  }

  const formFields = useMemo(
    () => fields?.form_data || [],
    [fields]
  );

  const allColumns = useMemo(
    () => [...COMMON, ...formFields],
    [formFields]
  );

  function toggleColumn(value) {
    setSelectedColumns((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value]
    );

    setSuccess("");
  }

  function handleFilterChange(event) {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccess("");
  }

  function handleSourceChange(event) {
    setSource(event.target.value);

    setRows([]);
    setShowPreview(false);
    setError("");
    setSuccess("");
  }

  function getColumns() {
    return selectedColumns.length
      ? selectedColumns
      : [
          "record_no",
          "name",
          "phone",
          "admission_no",
          "created_at",
        ];
  }

  function getReportBody() {
    return {
      sources: [source],
      filters,
      columns: getColumns(),
      limit: 500,
    };
  }

  async function runPreview() {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await previewReport(
        getReportBody()
      );

      const data = result?.data || result;

      const reportRows = Array.isArray(data?.rows)
        ? data.rows
        : [];

      setRows(reportRows);
      setShowPreview(true);

      setSuccess(
        `${reportRows.length} record(s) found`
      );
    } catch (err) {
      setRows([]);
      setShowPreview(false);

      setError(
        err.message ||
          "Unable to generate report."
      );
    } finally {
      setLoading(false);
    }
  }

  async function downloadPdf() {
    setPdfLoading(true);
    setError("");
    setSuccess("");

    try {
      const reportTitle =
        SOURCES.find(
          ([value]) => value === source
        )?.[1] || "School";

      const blob = await downloadReportPdf({
        ...getReportBody(),
        title: `${reportTitle} Report`,
      });

      if (!(blob instanceof Blob)) {
        throw new Error(
          "PDF file was not received."
        );
      }

      const url =
        URL.createObjectURL(blob);

      const anchor =
        document.createElement("a");

      anchor.href = url;
      anchor.download =
        `school-report-${Date.now()}.pdf`;

      document.body.appendChild(anchor);

      anchor.click();

      anchor.remove();

      URL.revokeObjectURL(url);

      setSuccess(
        "PDF downloaded successfully"
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to download PDF."
      );
    } finally {
      setPdfLoading(false);
    }
  }

  function resetFilters() {
    setFilters({
      ...INITIAL_FILTERS,
    });

    setRows([]);

    setShowPreview(false);

    setError("");

    setSuccess("");
  }

  return (
    <div
      className="
        flex
        h-full
        max-h-[calc(100vh-72px)]
        w-full
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
      {/* HEADER */}

      <div
        className="
          flex
          min-h-[42px]
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
            <FileBarChart2
              size={15}
              strokeWidth={2.8}
            />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
            Reports
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {success && (
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
              {success}
            </span>
          )}

          <button
            type="button"
            onClick={closeReport}
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
            <X
              size={16}
              strokeWidth={3}
            />
          </button>
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          overflow-x-hidden
          p-1.5
        "
      >
        {/* FILTERS */}

        <section
          className="
            rounded-lg
            border
            border-[#79a9c9]
            bg-[#e6f0f7]
            p-2
          "
        >
          <div
            className="
              mb-2
              flex
              h-7
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
            Report Filters
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
            "
          >
            <div>
              <label className="mb-0.5 block text-[10px] font-bold text-[#173b5c]">
                Report Source
              </label>

              <select
                value={source}
                onChange={handleSourceChange}
                className="
                  h-8
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
                "
              >
                {SOURCES.map(
                  ([value, label]) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>

            <FilterInput
              label="From Date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleFilterChange}
              type="date"
            />

            <FilterInput
              label="To Date"
              name="toDate"
              value={filters.toDate}
              onChange={handleFilterChange}
              type="date"
            />

            <FilterInput
              label="Session"
              name="session"
              value={filters.session}
              onChange={handleFilterChange}
              placeholder="2026 - 27"
            />

            <FilterInput
              label="Class"
              name="className"
              value={filters.className}
              onChange={handleFilterChange}
              placeholder="Class"
            />

            <FilterInput
              label="Section"
              name="section"
              value={filters.section}
              onChange={handleFilterChange}
              placeholder="Section"
            />

            <FilterInput
              label="Student Name"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Student name"
            />

            <FilterInput
              label="Phone"
              name="phone"
              value={filters.phone}
              onChange={handleFilterChange}
              placeholder="Phone number"
            />

            <FilterInput
              label="Admission No"
              name="admissionNo"
              value={filters.admissionNo}
              onChange={handleFilterChange}
              placeholder="Admission number"
            />

            <FilterInput
              label="Status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              placeholder="Active / Inactive"
            />

            <FilterInput
              label="Payment Mode"
              name="paymentMode"
              value={filters.paymentMode}
              onChange={handleFilterChange}
              placeholder="Cash / Online"
            />

            <FilterInput
              label="Vehicle No"
              name="vehicleNo"
              value={filters.vehicleNo}
              onChange={handleFilterChange}
              placeholder="Vehicle number"
            />

            <FilterInput
              label="Route"
              name="routeName"
              value={filters.routeName}
              onChange={handleFilterChange}
              placeholder="Route"
            />

            <FilterInput
              label="Search"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search anything"
            />
          </div>
        </section>

        {/* COLUMNS */}

        <section
          className="
            mt-2
            rounded-lg
            border
            border-[#79a9c9]
            bg-[#e6f0f7]
            p-2
          "
        >
          <div
            className="
              mb-2
              flex
              h-7
              items-center
              justify-between
              rounded-md
              border
              border-[#7ca7c2]
              bg-[#c8dce9]
              px-2
            "
          >
            <span className="text-[10px] font-black uppercase tracking-wide text-[#163d5c]">
              Report Columns
            </span>

            <span className="text-[9px] font-bold text-[#315f8c]">
              {selectedColumns.length} selected
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {allColumns.map(
              ([value, label]) => (
                <label
                  key={value}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-1.5
                    rounded-md
                    border
                    border-[#9db8c9]
                    bg-white
                    px-2
                    py-1.5
                    text-[10px]
                    font-semibold
                    text-[#173b5c]
                    transition
                    hover:bg-[#edf4f8]
                  "
                >
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(
                      value
                    )}
                    onChange={() =>
                      toggleColumn(value)
                    }
                    className="accent-[#174f7b]"
                  />

                  {label}
                </label>
              )
            )}
          </div>
        </section>

        {/* ACTIONS */}

        <section
          className="
            mt-2
            rounded-lg
            border
            border-[#5d8ba7]
            bg-[#c7dce9]
            p-2
          "
        >
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={runPreview}
              disabled={loading}
              className="
                flex
                h-9
                items-center
                justify-center
                gap-1.5
                rounded-md
                border
                border-[#174f7b]
                bg-[#174f7b]
                px-4
                text-[11px]
                font-extrabold
                text-white
                transition
                hover:bg-[#123d60]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? (
                <RefreshCw
                  size={14}
                  className="animate-spin"
                />
              ) : (
                <FileBarChart2 size={14} />
              )}

              {loading
                ? "Generating..."
                : "Preview Report"}
            </button>

            <button
              type="button"
              onClick={downloadPdf}
              disabled={pdfLoading}
              className="
                flex
                h-9
                items-center
                justify-center
                gap-1.5
                rounded-md
                border
                border-[#d8a928]
                bg-[#f3d978]
                px-4
                text-[11px]
                font-extrabold
                text-[#102f4b]
                transition
                hover:bg-[#e8ca5e]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {pdfLoading ? (
                <RefreshCw
                  size={14}
                  className="animate-spin"
                />
              ) : (
                <FileDown size={14} />
              )}

              {pdfLoading
                ? "Downloading..."
                : "Download PDF"}
            </button>

            <button
              type="button"
              onClick={resetFilters}
              className="
                flex
                h-9
                items-center
                justify-center
                gap-1.5
                rounded-md
                border
                border-[#5685a6]
                bg-[#e4eef6]
                px-4
                text-[11px]
                font-extrabold
                text-[#153b5a]
                transition
                hover:bg-[#d3e6f3]
              "
            >
              <RefreshCw size={14} />
              Reset
            </button>

            <button
              type="button"
              onClick={closeReport}
              className="
                flex
                h-9
                items-center
                justify-center
                gap-1.5
                rounded-md
                border
                border-red-500
                bg-red-600
                px-4
                text-[11px]
                font-extrabold
                text-white
                transition
                hover:bg-red-700
              "
            >
              <ArrowLeft size={14} />
              Back
            </button>
          </div>
        </section>

        {/* ERROR */}

        {error && (
          <div
            className="
              mt-2
              rounded-md
              border
              border-red-400
              bg-red-500/10
              px-3
              py-2
              text-[11px]
              font-bold
              text-red-600
            "
          >
            {error}
          </div>
        )}

        {/* PREVIEW */}

        {showPreview && (
          <section
            className="
              mt-2
              overflow-hidden
              rounded-lg
              border
              border-[#547c98]
              bg-white
              shadow-sm
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[#547c98]
                bg-[#071d42]
                px-3
                py-2
                text-white
              "
            >
              <div className="flex items-center gap-2">
                <FileBarChart2
                  size={15}
                  className="text-[#f5d76e]"
                />

                <span className="text-[11px] font-black">
                  Report Preview
                </span>
              </div>

              <span className="text-[10px] font-bold text-[#f5d76e]">
                {rows.length} record(s)
              </span>
            </div>

            <div className="max-h-[360px] overflow-auto">
              <table className="min-w-full text-left text-[10px]">
                <thead className="sticky top-0 z-10">
                  <tr className="border-b bg-[#c8dce9] text-[#173b5c]">
                    {getColumns().map(
                      (column) => (
                        <th
                          key={column}
                          className="
                            whitespace-nowrap
                            border-r
                            border-[#9db8c9]
                            px-3
                            py-2
                            font-black
                          "
                        >
                          {allColumns.find(
                            ([value]) =>
                              value === column
                          )?.[1] || column}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {rows.length > 0 ? (
                    rows.map(
                      (row, index) => (
                        <tr
                          key={
                            row.record_no ||
                            row.id ||
                            index
                          }
                          className="
                            border-b
                            border-slate-200
                            hover:bg-[#edf4f8]
                          "
                        >
                          {getColumns().map(
                            (column) => (
                              <td
                                key={column}
                                className="
                                  whitespace-nowrap
                                  border-r
                                  border-slate-200
                                  px-3
                                  py-2
                                  font-medium
                                  text-slate-700
                                "
                              >
                                {getCellValue(
                                  row,
                                  column
                                )}
                              </td>
                            )
                          )}
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan={Math.max(
                          getColumns().length,
                          1
                        )}
                        className="
                          px-3
                          py-10
                          text-center
                          font-semibold
                          text-slate-500
                        "
                      >
                        No records found for
                        the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function FilterInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <label className="mb-0.5 block text-[10px] font-bold text-[#173b5c]">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="
          h-8
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
          focus:border-[#174f7b]
          focus:ring-1
          focus:ring-[#174f7b]/30
        "
      />
    </div>
  );
}

function getCellValue(row, column) {
  if (
    row[column] !== undefined &&
    row[column] !== null
  ) {
    return formatValue(row[column]);
  }

  if (
    row.form_data &&
    row.form_data[column] !== undefined &&
    row.form_data[column] !== null
  ) {
    return formatValue(
      row.form_data[column]
    );
  }

  return "";
}

function formatValue(value) {
  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

