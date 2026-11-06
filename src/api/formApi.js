// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// async function parseResponse(response) {
//   const type = response.headers.get("content-type") || "";
//   if (type.includes("application/json")) return response.json();
//   return response;
// }

// export async function apiFetch(path, options = {}) {
//   const token = localStorage.getItem("school_token");
//   const headers = new Headers(options.headers || {});

//   if (token) headers.set("Authorization", `Bearer ${token}`);

//   if (!(options.body instanceof FormData) && options.body && !headers.has("Content-Type")) {
//     headers.set("Content-Type", "application/json");
//   }

//   const response = await fetch(`${API_BASE}${path}`, {
//     ...options,
//     headers,
//   });

//   const data = await parseResponse(response);

//   if (!response.ok) {
//     throw new Error(data?.message || data?.error || "Request failed.");
//   }

//   return data;
// }

// // export async function saveForm(type, formElement) {
// //   const formData = new FormData(formElement);
// //   const data = {};

// //   for (const [key, value] of formData.entries()) {
// //     if (value instanceof File) continue;
// //     if (data[key] !== undefined) {
// //       data[key] = Array.isArray(data[key]) ? [...data[key], value] : [data[key], value];
// //     } else {
// //       data[key] = value;
// //     }
// //   }

// //   return apiFetch(getFormEndpoint(type), {
// //     method: "POST",
// //     body: JSON.stringify({ data }),
// //   });
// // }
// export async function saveForm(type, formDataOrObject) {
//   let data = {};

//   if (formDataOrObject instanceof HTMLFormElement) {
//     const formData = new FormData(formDataOrObject);

//     for (const [key, value] of formData.entries()) {
//       if (value instanceof File) continue;

//       if (data[key] !== undefined) {
//         data[key] = Array.isArray(data[key])
//           ? [...data[key], value]
//           : [data[key], value];
//       } else {
//         data[key] = value;
//       }
//     }
//   } else if (
//     formDataOrObject &&
//     typeof formDataOrObject === "object"
//   ) {
//     data = formDataOrObject;
//   } else {
//     throw new Error("Invalid form data.");
//   }

//   return apiFetch(getFormEndpoint(type), {
//     method: "POST",
//     body: JSON.stringify({ data }),
//   });
// }

// export async function uploadStudentPhoto(studentId, file) {
//   const formData = new FormData();
//   formData.append("photo", file);
//   return apiFetch(`/student/${studentId}/photo`, {
//     method: "POST",
//     body: formData,
//   });
// }

// export async function previewReport(body) {
//   return apiFetch("/reports/preview", {
//     method: "POST",
//     body: JSON.stringify(body),
//   });
// }

// export async function getReportFields() {
//   return apiFetch("/reports/fields");
// }
// export async function downloadReportPdf(body) { 
//   const token = localStorage.getItem("school_token");
//    const headers = { "Content-Type": "application/json", };
//     if (token) { headers.Authorization = `Bearer ${token}`; } 
//     const response = await fetch( `${API_BASE}/reports/pdf/download`,
//    { method: "POST", headers, body: JSON.stringify(body), } );

//   if (!response.ok) { let message = "Unable to download PDF.";
//      try { const data = await response.json();
//        message = data?.message || data?.error || message;
//        }
//         catch { 

//    } throw new Error(message); } 
//    return response.blob(); 
//   }

// export function getFormEndpoint(type) {
//   const endpoints = {
//     enquiry: "/enquiries",
//     registration: "/registrations",
//     admission: "/student",
//     student: "/student",
//     studentReport: "/student-report",
//     transferCertificate: "/transfer-certificates",
//     complaint: "/complaints",
//     feeFormat: "/fee-format",
//     feeDues: "/fee-dues",
//     receipt: "/fee-receipts",
//     collection: "/fee-collections",
//     blankReceipt: "/blank-receipts",
//     studentLedger: "/student-ledger",
//     transportAllotment: "/transport-allotments",
//     conveyanceStudent: "/conveyance-students",
//     conveyanceAmount: "/conveyance-amounts",
//     vehiclewiseStudent: "/vehiclewise-students",
//   };

//   const endpoint = endpoints[type];
//   if (!endpoint) throw new Error(`Unknown form type: ${type}`);
//   return endpoint;
// }

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

async function parseResponse(response) {
  const type =
    response.headers.get("content-type") || "";

  if (type.includes("application/json")) {
    return response.json();
  }

  return response;
}

export async function apiFetch(
  path,
  options = {}
) {
  const token =
    localStorage.getItem("school_token");

  const headers = new Headers(
    options.headers || {}
  );

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  if (
    !(options.body instanceof FormData) &&
    options.body &&
    !headers.has("Content-Type")
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  const response = await fetch(
    `${API_BASE}${path}`,
    {
      ...options,
      headers,
    }
  );

  const data =
    await parseResponse(response);

//   if (!response.ok) {
//     throw new Error(
//       data?.message ||
//         data?.error ||
//         "Request failed."
//     );
//   }

//   return data;
// }
  if (!response.ok) {
    if (response.status === 401 && token) {
      window.dispatchEvent(new Event("school:unauthorized"));
    }

    const error = new Error(
      data?.message ||
        data?.error ||
        "Request failed."
    );
    error.status = response.status;
    throw error;
  }

  return data;
}

/* =====================================================
   SAVE FORM
===================================================== */

export async function saveForm(
  type,
  formDataOrObject
) {
  let data = {};

  if (
    typeof HTMLFormElement !==
      "undefined" &&
    formDataOrObject instanceof
      HTMLFormElement
  ) {
    const formData =
      new FormData(
        formDataOrObject
      );

    for (const [
      key,
      value,
    ] of formData.entries()) {
      if (value instanceof File) {
        continue;
      }

      if (data[key] !== undefined) {
        data[key] = Array.isArray(
          data[key]
        )
          ? [...data[key], value]
          : [data[key], value];
      } else {
        data[key] = value;
      }
    }
  } else if (
    formDataOrObject &&
    typeof formDataOrObject ===
      "object"
  ) {
    data = formDataOrObject;
  } else {
    throw new Error(
      "Invalid form data."
    );
  }

  return apiFetch(
    getFormEndpoint(type),
    {
      method: "POST",
      body: JSON.stringify({
        data,
      }),
    }
  );
}

/* =====================================================
   STUDENT PHOTO
===================================================== */

export async function uploadStudentPhoto(
  studentId,
  file
) {
  const formData =
    new FormData();

  formData.append(
    "photo",
    file
  );

  return apiFetch(
    `/student/${studentId}/photo`,
    {
      method: "POST",
      body: formData,
    }
  );
}

/* =====================================================
   REPORTS
===================================================== */

export async function previewReport(body) {
  return apiFetch("/reports/preview", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// Student / Fee / Transport -> report types
export async function getReportSources() {
  return apiFetch("/reports/sources");
}

// columns + dropdown values for one report type
export async function getReportMeta(source) {
  return apiFetch(
    `/reports/meta?source=${encodeURIComponent(source)}`
  );
}

export async function getReportFields(source) {
  return apiFetch(
    `/reports/fields?source=${encodeURIComponent(source || "students")}`
  );
}

async function downloadReportFile(path, body, fallbackMessage) {
  const token = localStorage.getItem("school_token");

  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let message = fallbackMessage;

    try {
      const data = await response.json();
      message = data?.message || data?.error || message;
    } catch {
      // not a JSON error response
    }

    throw new Error(message);
  }

  return response.blob();
}

export function downloadReportPdf(body) {
  return downloadReportFile(
    "/reports/pdf/download",
    body,
    "Unable to download PDF."
  );
}

export function downloadReportExcel(body) {
  return downloadReportFile(
    "/reports/excel/download",
    body,
    "Unable to download Excel file."
  );
}
 /* =====================================================
   SEARCH SAVED RECORDS
   by: name | mobile | fatherName | enquiredBy | admissionNo ...
===================================================== */

export async function searchRecords(type, by, q) {
  const params = new URLSearchParams({ by: by || "", q: q || "" });

  return apiFetch(
    `${getFormEndpoint(type)}/search?${params.toString()}`
  );
}
/* =====================================================
   FORM ENDPOINTS
===================================================== */

export function getFormEndpoint(
  type
) {
  const endpoints = {
    enquiry: "/enquiries",

    registration:
      "/registrations",

    admission:
      "/student",

    student:
      "/student",

    studentReport:
      "/student-report",

    transferCertificate:
      "/transfer-certificates",

    complaint:
      "/complaints",

    feeFormat:
      "/fee-format",

    feeDues:
      "/fee-dues",

    receipt:
      "/fee-receipts",

    collection:
      "/fee-collections",

    blankReceipt:
      "/blank-receipts",

    studentLedger:
      "/student-ledger",

    transportAllotment:
      "/transport-allotments",

    conveyanceStudent:
      "/conveyance-students",

    conveyanceAmount:
      "/conveyance-amounts",

    vehiclewiseStudent:
      "/vehiclewise-students",
  };

  const endpoint =
    endpoints[type];

  if (!endpoint) {
    throw new Error(
      `Unknown form type: ${type}`
    );
  }

  return endpoint;
}

/* =====================================================
   SUMMARY
===================================================== */

export function calculateSummary(
  rows
) {
  return {
    totalRows:
      rows.length,

    totalPaid:
      rows.reduce(
        (sum, row) =>
          sum +
          (Number(
            row.total_paid
          ) ||
            Number(
              row.totalPaid
            ) ||
            0),
        0
      ),

    totalDue:
      rows.reduce(
        (sum, row) =>
          sum +
          (Number(
            row.total_due
          ) ||
            Number(
              row.totalDue
            ) ||
            0),
        0
      ),
  };
}
