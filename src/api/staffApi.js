const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("school_token");
  const headers = new Headers(options.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (options.body) headers.set("Content-Type", "application/json");

  let response;
  try {
    response = await fetch(`${BASE}/staff${path}`, { ...options, headers });
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

  return response.json();
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

export const staffApi = {
  // live search - the server returns nothing until something is typed
  search: (q, by = "name", status = "active") => request(`/search${qs({ q, by, status })}`),

  saveStaff: (data, id) => request(id ? `/${id}` : "", send(id ? "PUT" : "POST", data)),

  attendance: (staffId, month, year) => request(`/attendance/lookup${qs({ staffId, month, year })}`),
  saveAttendance: (data) => request("/attendance", send("POST", data)),

  prepareSalary: (staffId, month, year) => request(`/salary/prepare${qs({ staffId, month, year })}`),
  saveSalary: (data) => request("/salary", send("POST", data)),
};
