const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("school_token");
  const headers = new Headers(options.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (options.body) headers.set("Content-Type", "application/json");

  let response;
  try {
    response = await fetch(`${BASE}/hostel${path}`, { ...options, headers });
  } catch {
    throw new Error("Cannot reach the server. Please check that the backend is running.");
  }

  if (!response.ok) {
    if (response.status === 401 && token) {
      window.dispatchEvent(new Event("school:unauthorized"));
    }
    let message = `Request failed (${response.status}).`;
    try {
      message = (await response.json()).message || message;
    } catch {
      /* not json */
    }
    throw new Error(message);
  }

  const type = response.headers.get("content-type") || "";
  return type.includes("application/json") ? response.json() : response.blob();
}

const send = (method, data) => ({ method, body: JSON.stringify(data ?? {}) });
const qs = (obj) => {
  const p = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") p.set(k, v);
  });
  const s = p.toString();
  return s ? `?${s}` : "";
};

export const hostelApi = {
  hostels: (q = "", status = "all") => request(`/hostels${qs({ q, status })}`),
  saveHostel: (data, id) => request(id ? `/hostels/${id}` : "/hostels", send(id ? "PUT" : "POST", data)),

  rooms: (params = {}) => request(`/rooms${qs({ status: "all", ...params })}`),
  saveRoom: (data, id) => request(id ? `/rooms/${id}` : "/rooms", send(id ? "PUT" : "POST", data)),

  students: (q) => request(`/students/search${qs({ q })}`),

  allotments: (params = {}) => request(`/allotments${qs({ status: "all", ...params })}`),
  allot: (data) => request("/allotments", send("POST", data)),
  updateAllotment: (id, data) => request(`/allotments/${id}`, send("PUT", data)),
  vacate: (id, data) => request(`/allotments/${id}/vacate`, send("POST", data)),

  feeSummary: (allotmentId) => request(`/fees/summary/${allotmentId}`),
  collectFee: (data) => request("/fees/receipts", send("POST", data)),
  receipts: (params = {}) => request(`/fees/receipts${qs(params)}`),

  dues: (params = {}) => request(`/dues${qs(params)}`),

  reportData: (range = {}) => request(`/reports/data${qs(range)}`),
  download: async (type, range = {}) => {
    const blob = await request(`/reports/${type}${qs(range)}`);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hostel-report.${type === "excel" ? "xlsx" : "pdf"}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },
};
