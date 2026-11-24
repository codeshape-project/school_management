import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { staffApi } from "../../api/staffApi";
import { Section, inputClass } from "./staffUi";
import { RadioOption } from "./staffUi";

/*
  Live staff search - same behaviour as "Search Student" in the student forms:
  nothing is listed until you type, then only the few matching staff appear.
  Clicking one calls onPick(row).
*/
export default function StaffSearch({ onPick, title = "Search Staff" }) {
  const [status, setStatus] = useState("active");
  const [by, setBy] = useState("name");
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [state, setState] = useState("idle");

  useEffect(() => {
    const term = value.trim();

    if (!term) {
      setResults([]);
      setState("idle");
      return undefined;
    }

    let cancelled = false;
    setState("loading");

    const timer = setTimeout(async () => {
      try {
        const res = await staffApi.search(term, by, status);
        if (cancelled) return;
        const rows = res?.data || [];
        setResults(rows);
        setState(rows.length ? "done" : "empty");
      } catch {
        if (!cancelled) {
          setResults([]);
          setState("error");
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [value, by, status]);

  function pick(row) {
    onPick(row);
    setValue("");
    setResults([]);
    setState("idle");
  }

  const message =
    state === "loading"
      ? "Searching..."
      : state === "empty"
      ? "No staff found."
      : state === "error"
      ? "Unable to search."
      : "Type a name, contact no. or staff ID to search";

  return (
    <Section title={title} icon={<Search size={13} />} tone="b">
      <div className="flex flex-wrap items-center gap-2">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${inputClass} !w-auto`}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="all">All</option>
        </select>

        <RadioOption label="By Name" checked={by === "name"} onChange={() => setBy("name")} />
        <RadioOption label="By Contact" checked={by === "contact"} onChange={() => setBy("contact")} />
        <RadioOption label="By Staff ID" checked={by === "staffId"} onChange={() => setBy("staffId")} />
      </div>

      <div className="relative mt-1.5">
        <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          placeholder="Search staff..."
          className={`${inputClass} pl-7`}
        />
      </div>

      <div className="mt-1.5 h-[105px] overflow-y-auto rounded-md border border-[#a2b9c8] bg-[#edf4f8] p-1">
        {state !== "done" ? (
          <p className="px-1 py-1 text-[9px] font-semibold text-[#173b5c]/70">{message}</p>
        ) : (
          <div className="space-y-1">
            {results.map((row) => (
              <button
                type="button"
                key={row.id}
                onClick={() => pick(row)}
                className="w-full rounded-md border border-[#79a9c9] bg-white px-2 py-1 text-left transition-all hover:border-[#0b5fa5] hover:bg-[#eef6fb]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[10px] font-bold text-[#173b5c]">{row.name || "-"}</span>
                  <span className="shrink-0 rounded-md bg-[#174f7b] px-1.5 py-0.5 text-[8px] font-bold text-[#ffd75a]">
                    {row.record_no}
                  </span>
                </div>
                <div className="mt-0.5 truncate text-[9px] text-[#173b5c]/70">
                  {`${row.class_name || "-"} | ${row.section || "-"} | Mobile: ${row.phone || "-"}`}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
