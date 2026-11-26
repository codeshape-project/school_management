const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("school_token");
  const headers = new Headers(options.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (options.body) headers.set("Content-Type", "application/json");

  let response;
  try {
    response = await fetch(`${BASE}/library${path}`, { ...options, headers });
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

const send = (method, data) => ({ method, body: JSON.stringify(data) });
const qs = (obj) => {
  const p = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") p.set(k, v);
  });
  const s = p.toString();
  return s ? `?${s}` : "";
};

export const libraryApi = {
  books: (q = "", status = "all") =>
    request(`/books${qs({ q, status })}`),

  lookupBook: (bookNo) =>
    request(`/books/lookup/${encodeURIComponent(bookNo)}`),

  saveBook: (data, id) =>
    request(id ? `/books/${id}` : "/books",
      send(id ? "PUT" : "POST", data)),

  members: (q = "", status = "all") =>
    request(`/members${qs({ q, status })}`),

  saveMember: (data, id) =>
    request(id ? `/members/${id}` : "/members",
      send(id ? "PUT" : "POST", data)),

  students: (q) =>
    request(`/students/search${qs({ q })}`),

  issue: (data) => request("/issues", send("POST", data)),

  activeIssues: (q = "") =>
    request(`/issues/active${qs({ q })}`),

  returnBook: (data) => request("/returns", send("POST", data)),

  reportData: (range = {}) =>
    request(`/reports/data${qs(range)}`),
};
