import { Router } from "express";

import {
  authMiddleware,
} from "../../middleware/authMiddleware.js";

import {
  adminOnly,
} from "../../middleware/roleMiddleware.js";

import {
  ok,
} from "../../utils/response.js";

import {
  previewReport,
  getReportFields,
  REPORT_FILTERS,
} from "./universalReport.js";

import {
  createPdfReport,
} from "../../pdf/pdfService.js";

const router = Router();

router.use(
  authMiddleware,
  adminOnly
);

/* =========================================
   GET REPORT FIELDS
========================================= */

router.get(
  "/fields",
  (_req, res) => {
    return ok(
      res,
      getReportFields()
    );
  }
);

/* =========================================
   GET AVAILABLE FILTERS
========================================= */

router.get(
  "/filters",
  (_req, res) => {
    return ok(
      res,
      {
        filters: REPORT_FILTERS,
      }
    );
  }
);

/* =========================================
   PREVIEW REPORT
========================================= */

router.post(
  "/preview",
  async (req, res, next) => {
    try {
      const report =
        await previewReport(
          req.body || {}
        );

      return ok(
        res,
        report,
        "Report generated."
      );
    } catch (error) {
      next(error);
    }
  }
);

/* =========================================
   VIEW PDF
========================================= */

router.post(
  "/pdf",
  async (req, res, next) => {
    try {
      const report =
        await previewReport(
          req.body || {}
        );

      const pdf =
        await createPdfReport(
          report,
          req.body?.title ||
            "School Management Report",
          req.body?.filters || {}
        );

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `inline; filename="school-report-${Date.now()}.pdf"`
      );

      return res.send(pdf);
    } catch (error) {
      next(error);
    }
  }
);

/* =========================================
   DOWNLOAD PDF
========================================= */

router.post(
  "/pdf/download",
  async (req, res, next) => {
    try {
      const report =
        await previewReport(
          req.body || {}
        );

      const pdf =
        await createPdfReport(
          report,
          req.body?.title ||
            "School Management Report",
          req.body?.filters || {}
        );

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="school-report-${Date.now()}.pdf"`
      );

      return res.send(pdf);
    } catch (error) {
      next(error);
    }
  }
);

export default router;