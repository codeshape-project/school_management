
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  ArrowLeft,
  FileBarChart2,
  FileDown,
  FileSpreadsheet,
  Printer,
  RefreshCw,
  X,
} from "lucide-react";

import {
  downloadReportExcel,
  downloadReportPdf,
  getReportMeta,
  getReportSources,
  previewReport,
} from "../api/formApi";

const PERIODS = [
  ["all", "All"],
  ["today", "Today"],
  ["week", "This Week"],
  ["month", "This Month"],
  ["custom", "Date Range"],
];

const SORTS = [
  ["created_at:desc", "Newest first"],
  ["created_at:asc", "Oldest first"],
  ["name:asc", "Name (A-Z)"],
  ["class_name:asc", "Class / Section"],
  ["event_date:desc", "Form date (latest)"],
];

const DEFAULT_COLUMN_KEYS = [
  "record_no",
  "name",
  "class_name",
  "section",
  "phone",
  "event_date",
];

// extra columns picked automatically when the data has them
const PREFERRED_FORM_FIELDS = [
  "address",
  "fatherName",
  "motherName",
  "mobile",
];

const EMPTY_FILTERS = {
  session: "",
  className: "",
  section: "",
  status: "",
  paymentMode: "",
  search: "",
};

const EMPTY_OPTIONS = {
  sessions: [],
  classes: [],
  sections: [],
  statuses: [],
  paymentModes: [],
};

export default function ReportPanel({
  onBack,
  onClose,
  group: lockedGroup = "",
  defaultSource = "",
  title = "Reports",
  embedded = false,
}) {
  const closeReport = onClose || onBack;
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");
  const [source, setSource] = useState("");

  const [fields, setFields] = useState({ base: [], form: [] });
  const [options, setOptions] = useState(EMPTY_OPTIONS);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const [period, setPeriod] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateBasis, setDateBasis] = useState("created");
  const [sort, setSort] = useState("created_at:desc");
  const [filters, setFilters] = useState({ ...EMPTY_FILTERS });

  const [report, setReport] = useState(null);

  // optional per-report screen settings from the server (labels, hidden filters, default columns)
  const [ui, setUi] = useState({});

  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const requestId = useRef(0);

  const activeGroup = groups.find((g) => g.key === group);
  const activeSource = activeGroup?.sources.find((s) => s.key === source);

  const allFields = useMemo(
    () => [...fields.base, ...fields.form],
    [fields]
  );

  const labelOf = useCallback(
    (key) => allFields.find((f) => f.key === key)?.label || key,
    [allFields]
  );

  /* ---------- request body ---------- */

  const buildBody = useCallback(
    (columns = selectedColumns) => {
      const [sortBy, sortOrder] = sort.split(":");

      return {
        sources: [source],
        title: `${activeSource?.label || "School"} Report`,
        columns,
        period,
        fromDate: period === "custom" ? fromDate : "",
        toDate: period === "custom" ? toDate : "",
        dateBasis,
        sortBy,
        sortOrder,
        filters,
        limit: 5000,
      };
    },
    [
      selectedColumns,
      source,
      activeSource,
      period,
      fromDate,
      toDate,
      dateBasis,
      sort,
      filters,
    ]
  );

  /* ---------- generate ---------- */

  async function fetchReport(body) {
    const result = await previewReport(body);
    return result?.data || result;
  }

  function validate() {
    if (!source) return "Select a report type.";
    if (!selectedColumns.length) return "Select at least one column.";

    if (period === "custom") {
      if (!fromDate && !toDate) return "Select From Date and/or To Date.";
      if (fromDate && toDate && fromDate > toDate) {
        return "From Date cannot be after To Date.";
      }
    }

    return "";
  }

  async function generate() {
    const problem = validate();

    if (problem) {
      setError(problem);
      return null;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await fetchReport(buildBody());
      setReport(data);
      setSuccess(`${data.total} record(s) found`);
      return data;
    } catch (err) {
      setReport(null);
      setError(err.message || "Unable to generate report.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  /* ---------- load sections ---------- */

  useEffect(() => {
    (async () => {
      try {
        const result = await getReportSources();
                const all = result?.data || result || [];
        const list = lockedGroup
          ? all.filter((g) => g.key === lockedGroup)
          : all;

        setGroups(list);

        if (list.length) {
          const first = list[0];
          const preferred = first.sources.find(
            (s) => s.key === defaultSource
          );

          setGroup(first.key);
          setSource((preferred || first.sources[0])?.key || "");
        }
      } catch (err) {
        setError(err.message || "Unable to load report sections.");
      }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockedGroup, defaultSource]);

  /* ---------- load columns + dropdowns when report type changes ---------- */

  /* ---------- load columns + dropdowns when report type changes ---------- */

  useEffect(() => {
    if (!source) return undefined;

    const id = ++requestId.current;

    (async () => {
      setLoading(true);
      setError("");
      setSuccess("");
      setReport(null);

      try {
        const result = await getReportMeta(source);
        const meta = result?.data || result;

        if (id !== requestId.current) return;

        const nextFields = meta.fields || { base: [], form: [] };
        const nextOptions = { ...EMPTY_OPTIONS, ...(meta.options || {}) };

        setFields(nextFields);
        setOptions(nextOptions);
        setFilters({ ...EMPTY_FILTERS });

        const formKeys = nextFields.form.map((f) => f.key);

        const nextUi = meta.ui || {};
        setUi(nextUi);

        const defaults = nextUi.defaultColumns?.length ? nextUi.defaultColumns : [
          ...DEFAULT_COLUMN_KEYS,
          ...PREFERRED_FORM_FIELDS.map((k) => `f:${k}`).filter((k) =>
            formKeys.includes(k)
          ),
        ];

        setSelectedColumns(defaults);

        // show data straight away
        const data = await fetchReport({
          sources: [source],
          columns: defaults,
          period: "all",
          dateBasis: "created",
          sortBy: "created_at",
          sortOrder: "desc",
          limit: 5000,
        });

        if (id !== requestId.current) return;

        setPeriod("all");
        setFromDate("");
        setToDate("");
        setReport(data);
        setSuccess(`${data.total} record(s) found`);
      } catch (err) {
        if (id === requestId.current) {
          setError(err.message || "Unable to load report data.");
        }
      } finally {
        if (id === requestId.current) setLoading(false);
      }
    })();

    return undefined;
  }, [source]);

  /* ---------- handlers ---------- */

  function handleGroupChange(event) {
    const key = event.target.value;
    const next = groups.find((g) => g.key === key);

    setGroup(key);
    setSource(next?.sources[0]?.key || "");
  }

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters((previous) => ({ ...previous, [name]: value }));
    setSuccess("");
  }

  function toggleColumn(key) {
    setSelectedColumns((previous) =>
      previous.includes(key)
        ? previous.filter((item) => item !== key)
        : [...previous, key]
    );
  }

  function selectAllColumns() {
    setSelectedColumns(allFields.map((f) => f.key));
  }

  function selectDefaultColumns() {
    if (ui.defaultColumns?.length) {
      setSelectedColumns(ui.defaultColumns);
      return;
    }

    const formKeys = fields.form.map((f) => f.key);

    setSelectedColumns([
      ...DEFAULT_COLUMN_KEYS,
      ...PREFERRED_FORM_FIELDS.map((k) => `f:${k}`).filter((k) =>
        formKeys.includes(k)
      ),
    ]);
  }

  function resetAll() {
    setPeriod("all");
    setFromDate("");
    setToDate("");
    setDateBasis("created");
    setSort("created_at:desc");
    setFilters({ ...EMPTY_FILTERS });
    selectDefaultColumns();
    setReport(null);
    setError("");
    setSuccess("");
  }

  /* ---------- exports ---------- */

  function saveBlob(blob, name) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = name;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function fileBase() {
    const name = (activeSource?.label || "report")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    return `${name}-report-${new Date().toISOString().slice(0, 10)}`;
  }

  async function exportFile(kind) {
    const problem = validate();

    if (problem) {
      setError(problem);
      return;
    }

    setBusy(kind);
    setError("");
    setSuccess("");

    try {
      const body = buildBody();

      if (kind === "pdf") {
        saveBlob(await downloadReportPdf(body), `${fileBase()}.pdf`);
        setSuccess("PDF downloaded");
      } else {
        saveBlob(await downloadReportExcel(body), `${fileBase()}.xlsx`);
        setSuccess("Excel downloaded");
      }
    } catch (err) {
      setError(err.message || "Download failed.");
    } finally {
      setBusy("");
    }
  }

  async function printReport() {
    const problem = validate();

    if (problem) {
      setError(problem);
      return;
    }

    setBusy("print");
    setError("");
    setSuccess("");

    try {
      const data = await fetchReport(buildBody());
      setReport(data);

      printHtml(
        buildPrintHtml(data, `${activeSource?.label || "School"} Report`)
      );
    } catch (err) {
      setError(err.message || "Unable to print report.");
    } finally {
      setBusy("");
    }
  }

  // sort / filter wording for this report type (e.g. Department / Designation for staff)
  const sortOptions = SORTS.map(([value, label]) => {
    if (value === "class_name:asc" && ui.filterLabels?.className) {
      return [value, `${ui.filterLabels.className} / ${ui.filterLabels.section || "Section"}`];
    }
    if (value === "event_date:desc" && ui.dateLabel) {
      return [value, `${ui.dateLabel} (latest)`];
    }
    return [value, label];
  });
  const filterName = (key, fallback) => ui.filterLabels?.[key] || fallback;
  const showFilter = (key) => !(ui.hiddenFilters || []).includes(key);

  const columns = report?.columns || [];
  const rows = report?.rows || [];
  const totalKeys = Object.keys(report?.totals || {});

  /* ---------- UI ---------- */

  return (
        <div
      className={`
        flex flex-col overflow-hidden ${
          embedded
            ? "h-[calc(100vh-72px)] w-[calc(100vw-16px)] lg:w-[calc(100vw-245px)]"
            : "h-full max-h-[calc(100vh-72px)] w-full"
        }
        rounded-[22px] border-2 border-[#0b2a52] bg-[#dbe9f4] p-2.5
        shadow-[0_0_18px_rgba(11,42,82,0.30)]
      `}
    >
      {/* HEADER */}
      <div
        className="
          flex min-h-[42px] shrink-0 items-center justify-between gap-2
          rounded-lg border border-[#5d91b2]
          bg-gradient-to-r from-[#174f7b] via-[#216994] to-[#174f7b]
          px-3 py-1.5 text-white
        "
      >
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#d8a928] text-[#102f4b]">
            <FileBarChart2 size={15} strokeWidth={2.8} />
          </div>

          <h2 className="truncate text-sm font-black tracking-wide sm:text-base">
           {title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {success && (
            <span className="rounded-md border border-emerald-300 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-100">
              {success}
            </span>
          )}

          <button
            type="button"
            onClick={closeReport}
            title="Close"
            className="flex h-7 w-8 shrink-0 items-center justify-center rounded-md border border-red-300 bg-red-600 text-white transition-all hover:bg-red-700"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-1.5">
        {/* REPORT TYPE + PERIOD */}
        <Panel title="Select Report">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {!lockedGroup && (
              <SelectField
                label="Section"
                value={group}
                onChange={handleGroupChange}
                options={groups.map((g) => [g.key, g.label])}
              />
            )}

            <SelectField
              label={lockedGroup ? `${activeGroup?.label || ""} Report` : "Report"}
              value={source}
              onChange={(e) => setSource(e.target.value)}
              options={(activeGroup?.sources || []).map((s) => [
                s.key,
                s.label,
              ])}
            />

            <SelectField
              label="Sort By"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              options={sortOptions}
            />

            <SelectField
              label="Date Based On"
              value={dateBasis}
              onChange={(e) => setDateBasis(e.target.value)}
              options={[
                ["created", "Entry date (saved on)"],
                ["event", ui.dateLabel || "Form date"],
              ]}
            />
          </div>

          <div className="mt-2 flex flex-wrap items-end gap-2">
            <div>
              <label className={labelClass}>Period</label>

              <div className="flex flex-wrap gap-1">
                {PERIODS.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setPeriod(value);
                      setSuccess("");
                    }}
                    className={`h-8 rounded-md border px-3 text-[11px] font-extrabold transition ${
                      period === value
                        ? "border-[#174f7b] bg-[#174f7b] text-white"
                        : "border-[#0b2a52] bg-white text-[#173b5c] hover:bg-[#edf4f8]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {period === "custom" && (
              <>
                <div>
                  <label className={labelClass}>From Date</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>To Date</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </>
            )}
          </div>
        </Panel>

        {/* FILTERS */}
        <Panel title="Filters" className="mt-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <SelectField
              label="Session"
              name="session"
              value={filters.session}
              onChange={handleFilterChange}
              options={options.sessions.map((v) => [v, v])}
              allLabel="All"
            />

            <SelectField
              label={filterName("className", "Class")}
              name="className"
              value={filters.className}
              onChange={handleFilterChange}
              options={options.classes.map((v) => [v, v])}
              allLabel="All"
            />

            <SelectField
              label={filterName("section", "Section")}
              name="section"
              value={filters.section}
              onChange={handleFilterChange}
              options={options.sections.map((v) => [v, v])}
              allLabel="All"
            />

            {showFilter("status") && (
              <SelectField
                label="Status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                options={options.statuses.map((v) => [v, v])}
                allLabel="All"
              />
            )}

            {showFilter("paymentMode") && (
              <SelectField
                label="Payment Mode"
                name="paymentMode"
                value={filters.paymentMode}
                onChange={handleFilterChange}
                options={options.paymentModes.map((v) => [v, v])}
                allLabel="All"
              />
            )}

            <div>
              <label className={labelClass}>Search</label>
              <input
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                onKeyDown={(e) => e.key === "Enter" && generate()}
                placeholder="Name, phone, address..."
                className={inputClass}
              />
            </div>
          </div>
        </Panel>

        {/* COLUMNS */}
        <Panel
          title="Columns To Show"
          className="mt-2"
          right={
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-[#315f8c]">
                {selectedColumns.length} selected
              </span>

              <MiniButton onClick={selectDefaultColumns}>Default</MiniButton>
              <MiniButton onClick={selectAllColumns}>All</MiniButton>
              <MiniButton onClick={() => setSelectedColumns([])}>
                Clear
              </MiniButton>
            </div>
          }
        >
          <ColumnGroup
            title="Basic details"
            items={fields.base}
            selected={selectedColumns}
            onToggle={toggleColumn}
          />

          {fields.form.length > 0 && (
            <ColumnGroup
              title="Form details (address, parents, fees...)"
              items={fields.form}
              selected={selectedColumns}
              onToggle={toggleColumn}
            />
          )}
        </Panel>

        {/* ACTIONS */}
        <section className="mt-2 rounded-lg border border-[#5d8ba7] bg-[#c7dce9] p-2">
          <div className="flex flex-wrap gap-2">
            <ActionButton
              onClick={generate}
              disabled={loading}
              className="border-[#174f7b] bg-[#174f7b] text-white hover:bg-[#123d60]"
              icon={
                loading ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <FileBarChart2 size={14} />
                )
              }
            >
              {loading ? "Loading..." : "Generate Report"}
            </ActionButton>

            <ActionButton
              onClick={printReport}
              disabled={busy !== ""}
              className="border-[#0b2a52] bg-white text-[#102f4b] hover:bg-[#edf4f8]"
              icon={
                busy === "print" ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <Printer size={14} />
                )
              }
            >
              Print
            </ActionButton>

            <ActionButton
              onClick={() => exportFile("pdf")}
              disabled={busy !== ""}
              className="border-[#d8a928] bg-[#f3d978] text-[#102f4b] hover:bg-[#e8ca5e]"
              icon={
                busy === "pdf" ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <FileDown size={14} />
                )
              }
            >
              PDF
            </ActionButton>

            <ActionButton
              onClick={() => exportFile("excel")}
              disabled={busy !== ""}
              className="border-emerald-700 bg-emerald-600 text-white hover:bg-emerald-700"
              icon={
                busy === "excel" ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <FileSpreadsheet size={14} />
                )
              }
            >
              Excel
            </ActionButton>

            <ActionButton
              onClick={resetAll}
              className="border-[#5685a6] bg-[#e4eef6] text-[#153b5a] hover:bg-[#d3e6f3]"
              icon={<RefreshCw size={14} />}
            >
              Reset
            </ActionButton>

            <ActionButton
              onClick={closeReport}
              className="border-red-500 bg-red-600 text-white hover:bg-red-700"
              icon={<ArrowLeft size={14} />}
            >
              Back
            </ActionButton>
          </div>
        </section>

        {error && (
          <div className="mt-2 rounded-md border border-red-400 bg-red-500/10 px-3 py-2 text-[11px] font-bold text-red-600">
            {error}
          </div>
        )}

        {/* RESULT */}
        {report && (
          <section className="mt-2 overflow-hidden rounded-lg border border-[#547c98] bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#547c98] bg-[#071d42] px-3 py-2 text-white">
              <div className="flex min-w-0 items-center gap-2">
                <FileBarChart2 size={15} className="text-[#f5d76e]" />

                <span className="truncate text-[11px] font-black">
                  {report.sourceLabel} Report
                </span>
              </div>

              <span className="text-[10px] font-bold text-[#f5d76e]">
                {report.truncated
                  ? `Showing ${report.returned} of ${report.total} record(s)`
                  : `${report.total} record(s)`}
              </span>
            </div>

            {report.filterSummary?.length > 0 && (
              <div className="border-b border-slate-200 bg-[#f3f8fb] px-3 py-1.5 text-[10px] font-semibold text-[#315f8c]">
                {report.filterSummary.join("  |  ")}
              </div>
            )}

            <div className="max-h-[420px] overflow-auto">
              <table className="min-w-full text-left text-[10px]">
                <thead className="sticky top-0 z-10">
                  <tr className="border-b bg-[#c8dce9] text-[#173b5c]">
                    <th className="whitespace-nowrap border-r border-[#9db8c9] px-3 py-2 font-black">
                      S.No
                    </th>

                    {columns.map((c) => (
                      <th
                        key={c.key}
                        className="whitespace-nowrap border-r border-[#9db8c9] px-3 py-2 font-black"
                      >
                        {c.label || labelOf(c.key)}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.length > 0 ? (
                    rows.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-200 hover:bg-[#edf4f8]"
                      >
                        <td className="border-r border-slate-200 px-3 py-2 font-bold text-slate-500">
                          {index + 1}
                        </td>

                        {columns.map((c) => (
                          <td
                            key={c.key}
                            className="max-w-[260px] border-r border-slate-200 px-3 py-2 font-medium text-slate-700"
                          >
                            {row[c.key]}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length + 1}
                        className="px-3 py-10 text-center font-semibold text-slate-500"
                      >
                        No records found for the selected filters.
                      </td>
                    </tr>
                  )}

                  {totalKeys.length > 0 && rows.length > 0 && (
                    <tr className="sticky bottom-0 bg-[#f3d978] font-black text-[#102f4b]">
                      <td className="px-3 py-2">Total</td>

                      {columns.map((c) => (
                        <td key={c.key} className="px-3 py-2">
                          {report.totals[c.key] !== undefined
                            ? formatNumber(report.totals[c.key])
                            : ""}
                        </td>
                      ))}
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

/* ---------- small UI pieces ---------- */

const labelClass = "mb-0.5 block text-[10px] font-bold text-[#173b5c]";

const inputClass =
  "h-8 w-full rounded-md border border-[#0b2a52] bg-white px-2 text-[11px] font-semibold text-slate-800 outline-none focus:border-[#174f7b] focus:ring-1 focus:ring-[#174f7b]/30";

function Panel({ title, right, className = "", children }) {
  return (
    <section
      className={`rounded-lg border border-[#79a9c9] bg-[#e6f0f7] p-2 ${className}`}
    >
      <div className="mb-2 flex h-7 items-center justify-between rounded-md border border-[#7ca7c2] bg-[#c8dce9] px-2">
        <span className="text-[10px] font-black uppercase tracking-wide text-[#163d5c]">
          {title}
        </span>

        {right}
      </div>

      {children}
    </section>
  );
}

function SelectField({ label, name, value, onChange, options, allLabel }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={inputClass}
      >
        {allLabel !== undefined && <option value="">{allLabel}</option>}

        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}

function MiniButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded border border-[#5685a6] bg-white px-2 py-0.5 text-[9px] font-extrabold text-[#153b5a] hover:bg-[#d3e6f3]"
    >
      {children}
    </button>
  );
}

function ActionButton({ onClick, disabled, className, icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-9 items-center justify-center gap-1.5 rounded-md border px-4 text-[11px] font-extrabold transition disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

function ColumnGroup({ title, items, selected, onToggle }) {
  return (
    <div className="mb-2 last:mb-0">
      <div className="mb-1 text-[9px] font-black uppercase tracking-wide text-[#315f8c]">
        {title}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {items.map(({ key, label }) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-1.5 rounded-md border border-[#9db8c9] bg-white px-2 py-1.5 text-[10px] font-semibold text-[#173b5c] transition hover:bg-[#edf4f8]"
          >
            <input
              type="checkbox"
              checked={selected.includes(key)}
              onChange={() => onToggle(key)}
              className="accent-[#174f7b]"
            />

            {label}
          </label>
        ))}
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function formatNumber(value) {
  return Number(value).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildPrintHtml(report, title) {
  const columns = report.columns || [];
  const rows = report.rows || [];
  const totals = report.totals || {};
  const landscape = columns.length > 6;

  const head = columns
    .map((c) => `<th>${escapeHtml(c.label)}</th>`)
    .join("");

  const body = rows
    .map(
      (row, i) =>
        `<tr><td>${i + 1}</td>${columns
          .map((c) => `<td>${escapeHtml(row[c.key])}</td>`)
          .join("")}</tr>`
    )
    .join("");

  const totalRow = Object.keys(totals).length
    ? `<tr class="total"><td></td>${columns
        .map(
          (c, i) =>
            `<td>${
              totals[c.key] !== undefined
                ? formatNumber(totals[c.key])
                : i === 0
                ? "TOTAL"
                : ""
            }</td>`
        )
        .join("")}</tr>`
    : "";

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<style>
  @page { size: A4 ${landscape ? "landscape" : "portrait"}; margin: 10mm; }
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; color: #111; margin: 0; }
  h1 { font-size: 18px; margin: 0; text-align: center; color: #0b2a52; }
  h2 { font-size: 14px; margin: 4px 0; text-align: center; }
  .meta { font-size: 10px; text-align: center; color: #444; margin: 2px 0; }
  table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 10px; }
  th, td { border: 1px solid #7a95a8; padding: 4px 5px; text-align: left; vertical-align: top; word-break: break-word; }
  th { background: #c8dce9; color: #0b2a52; }
  thead { display: table-header-group; }
  tr { page-break-inside: avoid; }
  tr:nth-child(even) td { background: #f4f8fb; }
  tr.total td { background: #f3d978; font-weight: bold; }
</style>
</head>
<body>
  <h1>SCHOOL MANAGEMENT SYSTEM</h1>
  <h2>${escapeHtml(title)}</h2>
  <div class="meta">${escapeHtml((report.filterSummary || []).join("  |  "))}</div>
  <div class="meta">Generated: ${escapeHtml(new Date().toLocaleString("en-IN"))}  |  Records: ${report.total}${
    report.truncated ? ` (showing first ${report.returned})` : ""
  }</div>
  <table>
    <thead><tr><th>S.No</th>${head}</tr></thead>
    <tbody>${body || `<tr><td colspan="${columns.length + 1}" style="text-align:center">No records found.</td></tr>`}${totalRow}</tbody>
  </table>
</body>
</html>`;
}

function printHtml(html) {
  const frame = document.createElement("iframe");

  frame.style.position = "fixed";
  frame.style.right = "0";
  frame.style.bottom = "0";
  frame.style.width = "0";
  frame.style.height = "0";
  frame.style.border = "0";

  document.body.appendChild(frame);

  const doc = frame.contentWindow.document;

  doc.open();
  doc.write(html);
  doc.close();

  setTimeout(() => {
    frame.contentWindow.focus();
    frame.contentWindow.print();

    setTimeout(() => frame.remove(), 1500);
  }, 300);
}