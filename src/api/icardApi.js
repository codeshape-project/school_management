const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("school_token");
  const headers = new Headers(options.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  // JSON bodies only - a FormData body needs the browser to set its own multipart header
  if (typeof options.body === "string") headers.set("Content-Type", "application/json");

  let response;
  try {
    response = await fetch(`${BASE}/icard${path}`, { ...options, headers });
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
const qs = (obj = {}) => {
  const p = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") p.set(k, v);
  });
  const s = p.toString();
  return s ? `?${s}` : "";
};

export const icardApi = {
  // session / class / section dropdown values
  filters: (source = "students", type = "student") => request(`/filters${qs({ source, type })}`),

  // students - live list from the admission data
  students: (params = {}) => request(`/students${qs(params)}`),
  generateStudents: (ids) => request("/students/generate", send("POST", { ids })),

  // staff - one card per staff member, photo is uploaded with the form
  staffCard: (staffId) => request(`/staff/${staffId}/card`),
  saveStaffCard: (staffId, fields, photoFile) => {
    const body = new FormData();
    Object.entries(fields).forEach(([key, value]) => body.append(key, value ?? ""));
    if (photoFile) body.append("photo", photoFile);
    return request(`/staff/${staffId}/card`, { method: "POST", body });
  },

  // saved cards
  records: (params = {}) => request(`/records${qs(params)}`),
  deleteRecord: (id) => request(`/records/${id}`, { method: "DELETE" }),

  // templates
  templates: () => request("/templates"),
  saveTemplate: (type, config) => request(`/templates/${type}`, send("PUT", { config })),

  // logo / signature
  upload: (file) => {
    const body = new FormData();
    body.append("image", file);
    return request("/upload", { method: "POST", body });
  },
};
