// Reserved for the next phase. PDF reporting is implemented first.\nexport function createExcelReport(){ throw new Error('Excel report generation is not enabled in this version.'); }\n// Requires:  npm install exceljs   (inside school-backend)

export async function createExcelReport(report, title = "School Report") {
  let ExcelJS;
  try {
    ExcelJS = (await import("exceljs")).default;
  } catch {
    throw Object.assign(
      new Error("Excel export needs the 'exceljs' package. Run: npm install exceljs"),
      { status: 500 }
    );
  }

  const cols = report.columns || [];
  const rows = report.rows || [];
  const totalCols = cols.length + 1; // + S.No

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "School Management System";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet(String(report.sourceLabel || "Report").slice(0, 30), {
    views: [{ state: "frozen", ySplit: 5 }],
    pageSetup: {
      orientation: totalCols > 7 ? "landscape" : "portrait",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
    },
  });

  const lastCol = Math.max(totalCols, 2);

  const addMerged = (text, size, bold, color) => {
    const row = sheet.addRow([text]);
    sheet.mergeCells(row.number, 1, row.number, lastCol);
    row.getCell(1).font = { size, bold, color: { argb: color } };
    row.getCell(1).alignment = { horizontal: "center", vertical: "middle" };
    return row;
  };

  addMerged("SCHOOL MANAGEMENT SYSTEM", 15, true, "FF0B2A52").height = 24;
  addMerged(title, 12, true, "FF0B2A52").height = 20;
  addMerged(
    `Generated: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}   |   Records: ${report.total}`,
    9, false, "FF444444"
  );
  addMerged((report.filterSummary || []).join("   |   "), 9, false, "FF444444");

  /* header row (row 5) */
  const header = sheet.addRow(["S.No", ...cols.map((c) => c.label)]);
  header.height = 20;
  header.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FF0B2A52" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFC8DCE9" } };
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    cell.border = {
      top: { style: "thin" }, left: { style: "thin" },
      bottom: { style: "thin" }, right: { style: "thin" },
    };
  });

  /* data */
  rows.forEach((r, i) => {
    const row = sheet.addRow([i + 1, ...cols.map((c) => r[c.key] ?? "")]);
    row.eachCell((cell) => {
      cell.alignment = { vertical: "top", wrapText: true };
      cell.border = {
        top: { style: "hair" }, left: { style: "hair" },
        bottom: { style: "hair" }, right: { style: "hair" },
      };
    });
    if (i % 2 === 1) {
      row.eachCell((cell) => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF1F6FA" } };
      });
    }
  });

  /* totals */
  const totalKeys = Object.keys(report.totals || {});
  if (totalKeys.length) {
    const totalRow = sheet.addRow([
      "",
      ...cols.map((c, i) =>
        i === 0 ? "TOTAL" : report.totals[c.key] !== undefined ? report.totals[c.key] : ""
      ),
    ]);
    totalRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF3D978" } };
    });
  }

  /* widths */
  sheet.getColumn(1).width = 7;
  cols.forEach((c, i) => {
    const longest = rows
      .slice(0, 200)
      .reduce((m, r) => Math.max(m, String(r[c.key] ?? "").length), c.label.length);
    sheet.getColumn(i + 2).width = Math.min(Math.max(longest + 3, 10), 45);
  });

  if (rows.length) {
    sheet.autoFilter = {
      from: { row: 5, column: 1 },
      to: { row: 5 + rows.length, column: totalCols },
    };
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}