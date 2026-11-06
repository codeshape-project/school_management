// import { Router } from "express";

// import {
//   authMiddleware,
// } from "../../middleware/authMiddleware.js";

// import {
//   adminOnly,
// } from "../../middleware/roleMiddleware.js";

// import {
//   ok,
// } from "../../utils/response.js";

// import {
//   previewReport,
//   getReportFields,
//   REPORT_FILTERS,
// } from "./universalReport.js";

// import {
//   createPdfReport,
// } from "../../pdf/pdfService.js";

// const router = Router();

// router.use(
//   authMiddleware,
//   adminOnly
// );

// /* =========================================
//    GET REPORT FIELDS
// ========================================= */

// router.get(
//   "/fields",
//   (_req, res) => {
//     return ok(
//       res,
//       getReportFields()
//     );
//   }
// );

// /* =========================================
//    GET AVAILABLE FILTERS
// ========================================= */

// router.get(
//   "/filters",
//   (_req, res) => {
//     return ok(
//       res,
//       {
//         filters: REPORT_FILTERS,
//       }
//     );
//   }
// );

// /* =========================================
//    PREVIEW REPORT
// ========================================= */

// router.post(
//   "/preview",
//   async (req, res, next) => {
//     try {
//       const report =
//         await previewReport(
//           req.body || {}
//         );

//       return ok(
//         res,
//         report,
//         "Report generated."
//       );
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// /* =========================================
//    VIEW PDF
// ========================================= */

// router.post(
//   "/pdf",
//   async (req, res, next) => {
//     try {
//       const report =
//         await previewReport(
//           req.body || {}
//         );

//       const pdf =
//         await createPdfReport(
//           report,
//           req.body?.title ||
//             "School Management Report",
//           req.body?.filters || {}
//         );

//       res.setHeader(
//         "Content-Type",
//         "application/pdf"
//       );

//       res.setHeader(
//         "Content-Disposition",
//         `inline; filename="school-report-${Date.now()}.pdf"`
//       );

//       return res.send(pdf);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// /* =========================================
//    DOWNLOAD PDF
// ========================================= */

// router.post(
//   "/pdf/download",
//   async (req, res, next) => {
//     try {
//       const report =
//         await previewReport(
//           req.body || {}
//         );

//       const pdf =
//         await createPdfReport(
//           report,
//           req.body?.title ||
//             "School Management Report",
//           req.body?.filters || {}
//         );

//       res.setHeader(
//         "Content-Type",
//         "application/pdf"
//       );

//       res.setHeader(
//         "Content-Disposition",
//         `attachment; filename="school-report-${Date.now()}.pdf"`
//       );

//       return res.send(pdf);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// export default router;

import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { adminOnly } from "../../middleware/roleMiddleware.js";
import { ok } from "../../utils/response.js";
import {
  previewReport,
  getReportSources,
  getReportFields,
  getReportMeta,
  REPORT_FILTERS,
} from "./universalReport.js";
import { createPdfReport } from "../../pdf/pdfService.js";
import { createExcelReport } from "../../excel/excelService.js";

const router = Router();

router.use(authMiddleware, adminOnly);

const wrap = (fn) => async (req, res, next) => {
  try {
    await fn(req, res);
  } catch (error) {
    next(error);
  }
};

const fileName = (report, ext) => {
  const base = String(report.sourceLabel || "report")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base}-report-${new Date().toISOString().slice(0, 10)}.${ext}`;
};

/* Sections + report types (Student > Enquiry, Registration ...) */
router.get("/sources", (_req, res) => ok(res, getReportSources()));

router.get("/filters", (_req, res) => ok(res, { filters: REPORT_FILTERS }));

/* Columns + dropdown values for one report type */
router.get(
  "/meta",
  wrap(async (req, res) => ok(res, await getReportMeta(req.query.source)))
);

router.get(
  "/fields",
  wrap(async (req, res) => ok(res, await getReportFields(req.query.source)))
);

router.post(
  "/preview",
  wrap(async (req, res) => ok(res, await previewReport(req.body || {}), "Report generated."))
);

async function sendPdf(req, res, disposition) {
  const report = await previewReport(req.body || {});
  const pdf = await createPdfReport(
    report,
    req.body?.title || `${report.sourceLabel} Report`
  );
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `${disposition}; filename="${fileName(report, "pdf")}"`);
  res.send(pdf);
}

router.post("/pdf", wrap((req, res) => sendPdf(req, res, "inline")));
router.post("/pdf/download", wrap((req, res) => sendPdf(req, res, "attachment")));

router.post(
  "/excel/download",
  wrap(async (req, res) => {
    const report = await previewReport(req.body || {});
    const buffer = await createExcelReport(
      report,
      req.body?.title || `${report.sourceLabel} Report`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${fileName(report, "xlsx")}"`);
    res.send(buffer);
  })
);

export default router;