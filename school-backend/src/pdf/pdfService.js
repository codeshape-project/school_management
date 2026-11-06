// import PDFDocument from 'pdfkit';

// function value(row,col){
//   if(row[col] !== undefined && row[col] !== null) return String(row[col]);
//   if(row.form_data && row.form_data[col] !== undefined && row.form_data[col] !== null) return String(row.form_data[col]);
//   return '';
// }

// export function createPdfReport(report, title, filters={}) {
//   return new Promise((resolve,reject)=>{
//     const doc=new PDFDocument({size:'A4',margin:28}); const chunks=[];
//     doc.on('data',c=>chunks.push(c)); doc.on('end',()=>resolve(Buffer.concat(chunks))); doc.on('error',reject);
//     doc.fontSize(16).font('Helvetica-Bold').text('SCHOOL MANAGEMENT SYSTEM');
//     doc.moveDown(0.25).fontSize(13).text(title);
//     doc.moveDown(0.2).fontSize(8).font('Helvetica').text(`Generated: ${new Date().toLocaleString('en-IN')}`);
//     const filterText=Object.entries(filters||{}).filter(([,v])=>v!==undefined&&v!==''&&(!Array.isArray(v)||v.length)).map(([k,v])=>`${k}: ${Array.isArray(v)?v.join(', '):v}`).join(' | ');
//     if(filterText) doc.moveDown(0.25).fontSize(8).text(`Filters: ${filterText}`);
//     doc.moveDown(0.5);
//     const cols=report.columns||[]; const rows=report.rows||[];
//     const pageWidth=doc.page.width-doc.page.margins.left-doc.page.margins.right;
//     const widths=cols.map(()=>Math.max(35,Math.floor(pageWidth/Math.max(cols.length,1))));
//     const drawHeader=()=>{doc.font('Helvetica-Bold').fontSize(7); let x=doc.page.margins.left; cols.forEach((c,i)=>{doc.text(c,x,doc.y,{width:widths[i],ellipsis:true});x+=widths[i];});doc.moveDown(0.7);doc.font('Helvetica').fontSize(6.5)};
//     drawHeader();
//     for(const row of rows){
//       if(doc.y>doc.page.height-45){doc.addPage();drawHeader();}
//       let x=doc.page.margins.left; const y=doc.y;
//       cols.forEach((c,i)=>{doc.text(value(row,c),x,y,{width:widths[i],height:22,ellipsis:true});x+=widths[i];});
//       doc.y=y+24; doc.moveTo(doc.page.margins.left,doc.y-4).lineTo(doc.page.width-doc.page.margins.right,doc.y-4).strokeOpacity(0.15).stroke();
//     }
//     doc.moveDown(0.5).fontSize(9).font('Helvetica-Bold').text(`Total records: ${rows.length}`);
//     doc.end();
//   });
// }

import PDFDocument from "pdfkit";

const NAVY = "#0b2a52";
const HEAD_BG = "#c8dce9";
const ZEBRA = "#f1f6fa";

const fmtNum = (n) =>
  Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 });

export function createPdfReport(report, title = "School Report") {
  return new Promise((resolve, reject) => {
    const cols = report.columns || [];
    const rows = report.rows || [];
    const landscape = cols.length > 6;

    const doc = new PDFDocument({
      size: "A4",
      layout: landscape ? "landscape" : "portrait",
      margin: 28,
      bufferPages: true,
    });

    const chunks = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const left = doc.page.margins.left;
    const pageWidth = doc.page.width - left - doc.page.margins.right;
    const bottomLimit = doc.page.height - 42;
    const PAD = 3;
    const FONT = 7.5;

    /* column widths: S.No fixed, others by content length */
    const snoWidth = 26;
    const weights = cols.map((c) => {
      const sample = rows.slice(0, 60).map((r) => String(r[c.key] ?? "").length);
      const avg = sample.length ? sample.reduce((a, b) => a + b, 0) / sample.length : 0;
      return Math.min(Math.max(c.label.length, avg, 6), 30);
    });
    const weightSum = weights.reduce((a, b) => a + b, 0) || 1;
    const widths = weights.map((w) => ((pageWidth - snoWidth) * w) / weightSum);

    /* ---- heading ---- */
    doc.font("Helvetica-Bold").fontSize(15).fillColor(NAVY).text("SCHOOL MANAGEMENT SYSTEM", { align: "center" });
    doc.moveDown(0.2).fontSize(12).text(title, { align: "center" });
    doc.moveDown(0.3).font("Helvetica").fontSize(8).fillColor("#333");
    doc.text(
      `Generated: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}   |   Records: ${report.total}${
        report.truncated ? ` (showing first ${report.returned})` : ""
      }`,
      { align: "center" }
    );
    if (report.filterSummary?.length) {
      doc.moveDown(0.15).text(report.filterSummary.join("   |   "), { align: "center" });
    }
    doc.moveDown(0.6);

    let y = doc.y;

    const drawHeader = () => {
      doc.font("Helvetica-Bold").fontSize(FONT);
      const h = Math.max(
        ...cols.map((c, i) => doc.heightOfString(c.label, { width: widths[i] - PAD * 2 })),
        10
      ) + PAD * 2;

      doc.rect(left, y, pageWidth, h).fill(HEAD_BG);
      doc.fillColor(NAVY);
      doc.text("S.No", left + PAD, y + PAD, { width: snoWidth - PAD * 2 });

      let x = left + snoWidth;
      cols.forEach((c, i) => {
        doc.text(c.label, x + PAD, y + PAD, { width: widths[i] - PAD * 2 });
        x += widths[i];
      });
      doc.rect(left, y, pageWidth, h).strokeColor("#7ca7c2").lineWidth(0.5).stroke();
      y += h;
    };

    drawHeader();
    doc.font("Helvetica").fontSize(FONT);

    rows.forEach((row, index) => {
      doc.font("Helvetica").fontSize(FONT);
      const texts = cols.map((c) => String(row[c.key] ?? ""));
      const h =
        Math.max(
          ...texts.map((t, i) => doc.heightOfString(t, { width: widths[i] - PAD * 2 })),
          10
        ) + PAD * 2;

      if (y + h > bottomLimit) {
        doc.addPage();
        y = doc.page.margins.top;
        drawHeader();
        doc.font("Helvetica").fontSize(FONT);
      }

      if (index % 2 === 1) doc.rect(left, y, pageWidth, h).fill(ZEBRA);

      doc.fillColor("#111");
      doc.text(String(index + 1), left + PAD, y + PAD, { width: snoWidth - PAD * 2 });

      let x = left + snoWidth;
      texts.forEach((t, i) => {
        doc.text(t, x + PAD, y + PAD, { width: widths[i] - PAD * 2 });
        x += widths[i];
      });

      doc.moveTo(left, y + h).lineTo(left + pageWidth, y + h).strokeColor("#d5e0e8").lineWidth(0.4).stroke();
      y += h;
    });

    if (!rows.length) {
      doc.fillColor("#555").font("Helvetica-Oblique").fontSize(9)
        .text("No records found for the selected filters.", left, y + 10, { width: pageWidth, align: "center" });
      y += 30;
    }

    /* totals */
    const totalKeys = Object.keys(report.totals || {});
    if (totalKeys.length) {
      if (y + 30 > bottomLimit) {
        doc.addPage();
        y = doc.page.margins.top;
      }
      doc.font("Helvetica-Bold").fontSize(8.5).fillColor(NAVY);
      const line = totalKeys
        .map((k) => `${cols.find((c) => c.key === k)?.label || k}: ${fmtNum(report.totals[k])}`)
        .join("     ");
      doc.text(`Totals  -  ${line}`, left, y + 8, { width: pageWidth });
    }

    /* page numbers */
    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(range.start + i);
      const page = doc.page;
      const savedBottom = page.margins.bottom;
      page.margins.bottom = 0; // allow writing in the footer area without a new page
      doc.font("Helvetica").fontSize(7).fillColor("#666")
        .text(`Page ${i + 1} of ${range.count}`, left, page.height - 26, { width: pageWidth, align: "right" });
      page.margins.bottom = savedBottom;
    }

    doc.end();
  });
}