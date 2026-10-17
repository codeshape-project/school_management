# School Management Backend

Node.js + Express + PostgreSQL backend for the supplied React School Management frontend.

## What is included

- Admin-only login. There is **no registration endpoint**.
- Admin is created/updated automatically from `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`).
- JWT authentication.
- PostgreSQL migrations for student, fee and transport data.
- Form records are stored in normalized common columns plus `form_data JSONB`, so the complete frontend payload is retained even when a form has many fields.
- Universal report preview with date/session/class/section/name/phone/admission/payment/status/vehicle/route/search filters.
- Selected columns, sorting, grouping and PDF generation.
- Dashboard summary.

## 1. PostgreSQL

Create the database:

```sql
CREATE DATABASE school_management;
```

## 2. Install

```bash
cd backend
npm install
```

## 3. Environment

Copy `.env.example` to `.env` and set your PostgreSQL password plus the admin email/password you want.

```env
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-admin-password
```

## 4. Setup database

```bash
npm run db:setup
```

This creates tables, starter academic session/classes/sections, and the single admin account.

## 5. Start

```bash
npm run dev
```

API: `http://localhost:5000`

## Login

`POST /api/auth/login`

```json
{
  "email": "your-admin-email@example.com",
  "password": "your-admin-password"
}
```

Use the returned token on protected requests:

`Authorization: Bearer YOUR_TOKEN`

## Save a form

Every protected form endpoint accepts either the raw object or `{ "data": {...} }`.

Example:

`POST /api/enquiries`

```json
{
  "data": {
    "session": "2026 - 27",
    "date": "2026-09-22",
    "name": "Rahul Kumar",
    "className": "Class 5",
    "mobile": "9876543210",
    "fatherName": "Raj Kumar",
    "address": "Varanasi",
    "remark": "Interested in admission"
  }
}
```

The entire object is saved in `form_data`, while common report fields are also copied to indexed columns.

## Report preview

`POST /api/reports/preview`

```json
{
  "title": "Student + Enquiry Report",
  "sources": ["enquiries", "students"],
  "filters": {
    "fromDate": "2026-04-01",
    "toDate": "2026-09-22",
    "session": "2026 - 27",
    "className": "Class 5",
    "section": "A",
    "name": "Rahul",
    "phone": "9876"
  },
  "columns": ["record_no", "name", "phone", "admission_no", "session", "class_name", "section", "event_date"],
  "sortBy": "created_at",
  "sortOrder": "DESC",
  "limit": 1000
}
```

## PDF

`POST /api/reports/pdf` returns an inline PDF. Use `/api/reports/pdf/download` for download disposition.

## Important frontend note

The uploaded frontend currently shows `Saved Successfully` in many forms but does not send the form data to an API. The backend cannot receive values that React never sends. Each real Save/Submit handler must call the corresponding endpoint with the complete form object. The backend is deliberately ready to accept the whole object and keep it in JSONB, including nested fee/transport rows.
