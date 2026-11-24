import { Router } from 'express';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import path from 'node:path';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';
import { ok } from '../utils/response.js';
import * as svc from './libraryService.js';

const router = Router();
router.use(authMiddleware, adminOnly);

const wrap = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    next(e);
  }
};

const SCHOOL_NAME = 'CodeShape Academy';
const SCHOOL_ADDRESS = 'BHU, Lanka Varanasi, 221005';
const day = (v) => (v ? String(v instanceof Date ? v.toISOString() : v).slice(0, 10) : '');
const findLogo = () =>
  [
    path.resolve(process.cwd(), '../public/images/logo.png'),
    path.resolve(process.cwd(), 'public/images/logo.png'),
  ].find((p) => fs.existsSync(p));

/* ---- books ---- */
router.get('/books', wrap(async (req, res) => ok(res, await svc.listBooks(req.query))));
router.get('/books/lookup/:bookNo', wrap(async (req, res) => ok(res, await svc.getBookByNo(req.params.bookNo))));
router.post('/books', wrap(async (req, res) => ok(res, await svc.saveBook(req.body, req.user.id), 'Book saved successfully.', 201)));
router.put('/books/:id', wrap(async (req, res) => ok(res, await svc.saveBook(req.body, req.user.id, req.params.id), 'Book updated successfully.')));

/* ---- members ---- */
router.get('/members', wrap(async (req, res) => ok(res, await svc.listMembers(req.query))));
router.post('/members', wrap(async (req, res) => ok(res, await svc.saveMember(req.body, req.user.id), 'Library member saved successfully.', 201)));
router.put('/members/:id', wrap(async (req, res) => ok(res, await svc.saveMember(req.body, req.user.id, req.params.id), 'Library member updated successfully.')));

/* ---- students / issue / return ---- */
router.get('/students/search', wrap(async (req, res) => ok(res, await svc.findStudents(req.query.q || ''))));
router.post('/issues', wrap(async (req, res) => ok(res, await svc.issueBook(req.body, req.user.id), 'Book issued successfully.', 201)));
router.get('/issues/active', wrap(async (req, res) => ok(res, await svc.activeIssues(req.query.q || ''))));
router.post('/returns', wrap(async (req, res) => ok(res, await svc.returnBook(req.body, req.user.id), 'Book returned successfully.', 201)));

/* ---- reports ---- */
router.get('/reports/data', wrap(async (req, res) => ok(res, await svc.reportData(req.query))));

router.get('/reports/excel', wrap(async (req, res) => {
  const d = await svc.reportData(req.query);
  const wb = new ExcelJS.Workbook();
  wb.creator = 'School Management';

  const addSheet = (name, heads, rows) => {
    const ws = wb.addWorksheet(name);
    const last = heads.length;
    ws.mergeCells(1, 2, 1, last);
    ws.getCell(1, 2).value = SCHOOL_NAME;
    ws.getCell(1, 2).font = { bold: true, size: 16 };
    ws.mergeCells(2, 2, 2, last);
    ws.getCell(2, 2).value = SCHOOL_ADDRESS;
    ws.mergeCells(3, 2, 3, last);
    ws.getCell(3, 2).value = `LIBRARY - ${name.toUpperCase()}`;
    ws.getCell(3, 2).font = { bold: true, size: 13 };
    const logo = findLogo();
    if (logo) {
      const imageId = wb.addImage({ filename: logo, extension: 'png' });
      ws.addImage(imageId, { tl: { col: 0, row: 0 }, ext: { width: 60, height: 60 } });
    }
    ws.getRow(5).values = heads;
    ws.getRow(5).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    ws.getRow(5).eachCell((c) => {
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF174F7B' } };
    });
    rows.forEach((r) => ws.addRow(r));
    ws.columns.forEach((c) => (c.width = 20));
  };

  addSheet('Book Stock',
    ['Book No', 'Title', 'Author', 'Category', 'Total Qty', 'Available Qty', 'Issued Qty', 'Status'],
    d.books.map((b) => [b.book_no, b.title, b.author, b.category, b.total_quantity, b.available_quantity, b.total_quantity - b.available_quantity, b.status]));
  addSheet('Issue Register',
    ['Issue No', 'Book No', 'Book', 'Student', 'Class', 'Issue Date', 'Due Date', 'Issued', 'Returned', 'Status'],
    d.issues.map((i) => [i.issue_no, i.book_no, i.title, i.student_name, `${i.class_name || ''} ${i.section || ''}`.trim(), day(i.issue_date), day(i.due_date), i.issued_quantity, i.returned_quantity, i.status]));
  addSheet('Return Register',
    ['Issue No', 'Book No', 'Book', 'Student', 'Returned Qty', 'Return Date', 'Received By'],
    d.returns.map((r) => [r.issue_no, r.book_no, r.title, r.student_name, r.returned_quantity, day(r.return_date), r.member_name]));
  addSheet('Overdue',
    ['Issue No', 'Book No', 'Book', 'Student', 'Due Date', 'Outstanding'],
    d.overdue.map((i) => [i.issue_no, i.book_no, i.title, i.student_name, day(i.due_date), i.outstanding]));

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="library-report.xlsx"');
  await wb.xlsx.write(res);
  res.end();
}));

router.get('/reports/pdf', wrap(async (req, res) => {
  const d = await svc.reportData(req.query);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="library-report.pdf"');

  const pdf = new PDFDocument({ margin: 40, size: 'A4' });
  pdf.pipe(res);

  const logo = findLogo();
  if (logo) pdf.image(logo, 40, 35, { fit: [60, 60] });
  pdf.fontSize(16).font('Helvetica-Bold').text(SCHOOL_NAME, 115, 42, { width: 420 });
  pdf.fontSize(9).font('Helvetica').text(SCHOOL_ADDRESS, 115, 64, { width: 420 });
  pdf.fontSize(13).font('Helvetica-Bold').text('LIBRARY REPORT', 40, 110, { width: 515, align: 'center' });

  const table = (title, cols, rows) => {
    if (pdf.y > 690) pdf.addPage();
    pdf.moveDown(1).fontSize(11).font('Helvetica-Bold').text(title, 40, pdf.y);
    pdf.moveDown(0.4);
    const header = () => {
      const y = pdf.y;
      pdf.rect(40, y - 2, 515, 15).fill('#174f7b');
      pdf.fillColor('#ffffff').fontSize(8).font('Helvetica-Bold');
      let x = 44;
      cols.forEach((c) => { pdf.text(c.h, x, y + 1, { width: c.w - 4, lineBreak: false }); x += c.w; });
      pdf.fillColor('#000000');
      pdf.y = y + 17;
    };
    header();
    pdf.font('Helvetica').fontSize(8);
    if (!rows.length) pdf.text('No records.', 44, pdf.y);
    rows.forEach((r) => {
      if (pdf.y > 780) { pdf.addPage(); header(); pdf.font('Helvetica').fontSize(8); }
      const y = pdf.y;
      let x = 44;
      r.forEach((v, idx) => {
        pdf.text(String(v ?? ''), x, y, { width: cols[idx].w - 4, height: 10, ellipsis: true, lineBreak: false });
        x += cols[idx].w;
      });
      pdf.y = y + 13;
    });
  };

  table('Book Stock', [{ h: 'Book No', w: 70 }, { h: 'Title', w: 230 }, { h: 'Total', w: 70 }, { h: 'Available', w: 75 }, { h: 'Issued', w: 70 }],
    d.books.map((b) => [b.book_no, b.title, b.total_quantity, b.available_quantity, b.total_quantity - b.available_quantity]));
  table('Overdue Books', [{ h: 'Issue No', w: 70 }, { h: 'Book', w: 190 }, { h: 'Student', w: 120 }, { h: 'Due Date', w: 75 }, { h: 'Out.', w: 60 }],
    d.overdue.map((i) => [i.issue_no, `${i.book_no} ${i.title}`, i.student_name, day(i.due_date), i.outstanding]));
  table('Issue Register', [{ h: 'Issue No', w: 65 }, { h: 'Book', w: 150 }, { h: 'Student', w: 105 }, { h: 'Issued', w: 70 }, { h: 'Due', w: 70 }, { h: 'Qty', w: 25 }, { h: 'Status', w: 30 }],
    d.issues.map((i) => [i.issue_no, `${i.book_no} ${i.title}`, i.student_name, day(i.issue_date), day(i.due_date), i.issued_quantity, i.status]));

  pdf.end();
}));

export default router;
