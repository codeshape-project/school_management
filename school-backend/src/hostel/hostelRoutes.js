import { Router } from 'express';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import path from 'node:path';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';
import { ok } from '../utils/response.js';
import * as svc from './hostelService.js';

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
const amt = (v) => Number(v || 0).toFixed(2);
const findLogo = () =>
  [
    path.resolve(process.cwd(), '../public/images/logo.png'),
    path.resolve(process.cwd(), 'public/images/logo.png'),
  ].find((p) => fs.existsSync(p));

/* ---- hostels ---- */
router.get('/hostels', wrap(async (req, res) => ok(res, await svc.listHostels(req.query))));
router.post('/hostels', wrap(async (req, res) => ok(res, await svc.saveHostel(req.body, req.user.id), 'Hostel saved successfully.', 201)));
router.put('/hostels/:id', wrap(async (req, res) => ok(res, await svc.saveHostel(req.body, req.user.id, req.params.id), 'Hostel updated successfully.')));

/* ---- rooms ---- */
router.get('/rooms', wrap(async (req, res) => ok(res, await svc.listRooms(req.query))));
router.post('/rooms', wrap(async (req, res) => ok(res, await svc.saveRoom(req.body, req.user.id), 'Room saved successfully.', 201)));
router.put('/rooms/:id', wrap(async (req, res) => ok(res, await svc.saveRoom(req.body, req.user.id, req.params.id), 'Room updated successfully.')));

/* ---- students ---- */
router.get('/students/search', wrap(async (req, res) => ok(res, await svc.findStudents(req.query.q || ''))));

/* ---- allotments ---- */
router.get('/allotments', wrap(async (req, res) => ok(res, await svc.listAllotments(req.query))));
router.post('/allotments', wrap(async (req, res) => ok(res, await svc.createAllotment(req.body, req.user.id), 'Hostel allotted successfully.', 201)));
router.put('/allotments/:id', wrap(async (req, res) => ok(res, await svc.updateAllotment(req.params.id, req.body), 'Allotment updated successfully.')));
router.post('/allotments/:id/vacate', wrap(async (req, res) => ok(res, await svc.vacateAllotment(req.params.id, req.body), 'Student vacated successfully.')));

/* ---- fees ---- */
router.get('/fees/summary/:allotmentId', wrap(async (req, res) => ok(res, await svc.getFeeSummary(req.params.allotmentId))));
router.post('/fees/receipts', wrap(async (req, res) => ok(res, await svc.collectFee(req.body, req.user.id), 'Hostel fee received successfully.', 201)));
router.get('/fees/receipts', wrap(async (req, res) => ok(res, await svc.listReceipts(req.query))));
router.get('/fees/receipts/:id', wrap(async (req, res) => ok(res, await svc.getReceipt(req.params.id))));

/* ---- dues ---- */
router.get('/dues', wrap(async (req, res) => ok(res, await svc.duesList(req.query))));

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
    ws.getCell(3, 2).value = `HOSTEL - ${name.toUpperCase()}`;
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

  addSheet('Occupancy',
    ['Hostel No', 'Hostel', 'Type', 'Warden', 'Rooms', 'Beds', 'Occupied', 'Vacant', 'Status'],
    d.hostels.map((h) => [h.hostel_no, h.name, h.hostel_type, h.warden_name, h.room_count, h.capacity, h.occupied, h.vacant, h.status]));
  addSheet('Rooms',
    ['Hostel', 'Room No', 'Floor', 'Type', 'Beds', 'Occupied', 'Vacant', 'Monthly Fee', 'Status'],
    d.rooms.map((r) => [r.hostel_name, r.room_no, r.floor_no, r.room_type, r.capacity, r.occupied, r.vacant, Number(r.monthly_fee), r.status]));
  addSheet('Allotments',
    ['Allot. No', 'Student', 'Adm. No', 'Class', 'Hostel', 'Room', 'Bed', 'Join Date', 'Monthly Fee', 'Security', 'Status', 'Vacate Date'],
    d.allotments.map((a) => [a.allotment_no, a.student_name, a.admission_no, `${a.class_name || ''} ${a.section || ''}`.trim(), a.hostel_name, a.room_no, a.bed_no, day(a.join_date), Number(a.monthly_fee), Number(a.security_deposit), a.status, day(a.vacate_date)]));
  addSheet('Fee Collection',
    ['Receipt No', 'Date', 'Student', 'Adm. No', 'Hostel', 'Room', 'Pay For', 'Mode', 'Amount', 'Discount'],
    d.receipts.map((r) => [r.receipt_no, day(r.receipt_date), r.student_name, r.admission_no, r.hostel_name, r.room_no, r.pay_for, r.payment_mode, Number(r.amount_paid), Number(r.cash_discount)]));
  addSheet('Dues',
    ['Allot. No', 'Student', 'Adm. No', 'Hostel', 'Room', 'Months', 'Charged', 'Paid', 'Discount', 'Due', 'Status'],
    d.dues.map((a) => [a.allotment_no, a.student_name, a.admission_no, a.hostel_name, a.room_no, a.months, Number(a.charged), Number(a.paid), Number(a.discount), Number(a.due), a.status]));

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="hostel-report.xlsx"');
  await wb.xlsx.write(res);
  res.end();
}));

router.get('/reports/pdf', wrap(async (req, res) => {
  const d = await svc.reportData(req.query);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="hostel-report.pdf"');

  const pdf = new PDFDocument({ margin: 40, size: 'A4' });
  pdf.pipe(res);

  const logo = findLogo();
  if (logo) pdf.image(logo, 40, 35, { fit: [60, 60] });
  pdf.fontSize(16).font('Helvetica-Bold').text(SCHOOL_NAME, 115, 42, { width: 420 });
  pdf.fontSize(9).font('Helvetica').text(SCHOOL_ADDRESS, 115, 64, { width: 420 });
  pdf.fontSize(13).font('Helvetica-Bold').text('HOSTEL REPORT', 40, 110, { width: 515, align: 'center' });

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

  table('Hostel Occupancy',
    [{ h: 'Hostel', w: 170 }, { h: 'Type', w: 60 }, { h: 'Rooms', w: 60 }, { h: 'Beds', w: 60 }, { h: 'Occupied', w: 85 }, { h: 'Vacant', w: 80 }],
    d.hostels.map((h) => [h.name, h.hostel_type, h.room_count, h.capacity, h.occupied, h.vacant]));
  table('Current Allotments',
    [{ h: 'Allot. No', w: 65 }, { h: 'Student', w: 140 }, { h: 'Class', w: 70 }, { h: 'Hostel', w: 110 }, { h: 'Room', w: 50 }, { h: 'Joined', w: 80 }],
    d.allotments.filter((a) => a.status === 'active').map((a) => [a.allotment_no, a.student_name, `${a.class_name || ''} ${a.section || ''}`.trim(), a.hostel_name, a.room_no, day(a.join_date)]));
  table('Fee Collection',
    [{ h: 'Receipt', w: 65 }, { h: 'Date', w: 65 }, { h: 'Student', w: 150 }, { h: 'Hostel', w: 110 }, { h: 'Mode', w: 55 }, { h: 'Amount', w: 70 }],
    d.receipts.map((r) => [r.receipt_no, day(r.receipt_date), r.student_name, r.hostel_name, r.payment_mode, amt(r.amount_paid)]));
  table('Outstanding Dues',
    [{ h: 'Allot. No', w: 65 }, { h: 'Student', w: 150 }, { h: 'Hostel', w: 110 }, { h: 'Charged', w: 65 }, { h: 'Paid', w: 60 }, { h: 'Due', w: 65 }],
    d.dues.map((a) => [a.allotment_no, a.student_name, a.hostel_name, amt(a.charged), amt(Number(a.paid) + Number(a.discount)), amt(a.due)]));

  pdf.end();
}));

export default router;
