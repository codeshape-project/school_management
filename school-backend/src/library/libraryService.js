import { pool, query } from '../config/db.js';

const bad = (message, status = 400) => Object.assign(new Error(message), { status });
const toInt = (v) => Number.parseInt(v, 10);
const clean = (v) => {
  const s = String(v ?? '').trim();
  return s === '' ? null : s;
};
const isDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(String(v || ''));
const statusFilter = (s) => (s === 'all' ? '' : s === 'inactive' ? 'inactive' : 'active');

/* ---------------- BOOKS ---------------- */

export async function listBooks({ q = '', status = 'active' } = {}) {
  const r = await query(
    `SELECT * FROM library_books
      WHERE ($1 = '' OR status = $1)
        AND ($2 = '' OR book_no ILIKE '%' || $2 || '%'
                     OR title   ILIKE '%' || $2 || '%'
                     OR author  ILIKE '%' || $2 || '%'
                     OR category ILIKE '%' || $2 || '%'
                     OR isbn    ILIKE '%' || $2 || '%')
      ORDER BY book_no`,
    [statusFilter(status), String(q || '').trim()]
  );
  return r.rows;
}

export async function getBookByNo(bookNo) {
  const r = await query(
    `SELECT * FROM library_books WHERE UPPER(book_no) = UPPER($1)`,
    [String(bookNo || '').trim()]
  );
  if (!r.rowCount) throw bad('Book number not found.', 404);
  return r.rows[0];
}

export async function saveBook(data, userId, id = null) {
  const title = String(data.title || '').trim();
  const qty = toInt(data.totalQuantity);
  if (!title) throw bad('Book title is required.');
  if (!Number.isInteger(qty) || qty < 0) throw bad('Enter a valid total quantity.');
  const status = data.status === 'inactive' ? 'inactive' : 'active';

  if (id) {
    // new total replaces old total; available stock moves by the same difference
    const r = await query(
      `UPDATE library_books
          SET title=$2, author=$3, category=$4, publisher=$5, isbn=$6, shelf_no=$7,
              status=$9,
              available_quantity = available_quantity + ($8::int - total_quantity),
              total_quantity = $8::int,
              updated_at = NOW()
        WHERE id=$1
          AND available_quantity + ($8::int - total_quantity) >= 0
        RETURNING *`,
      [id, title, clean(data.author), clean(data.category), clean(data.publisher),
       clean(data.isbn), clean(data.shelfNo), qty, status]
    );
    if (!r.rowCount) {
      throw bad('Book not found, or the new total is lower than the copies currently issued.', 409);
    }
    return r.rows[0];
  }

  const c = await query(`SELECT library_next_no('book','BK') AS no`);
  const r = await query(
    `INSERT INTO library_books
       (book_no,title,author,category,publisher,isbn,shelf_no,total_quantity,available_quantity,created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$8,$9) RETURNING *`,
    [c.rows[0].no, title, clean(data.author), clean(data.category), clean(data.publisher),
     clean(data.isbn), clean(data.shelfNo), qty, userId]
  );
  return r.rows[0];
}

/* ---------------- MEMBERS ---------------- */

export async function listMembers({ q = '', status = 'active' } = {}) {
  const r = await query(
    `SELECT * FROM library_members
      WHERE ($1 = '' OR status = $1)
        AND ($2 = '' OR member_no ILIKE '%' || $2 || '%'
                     OR name  ILIKE '%' || $2 || '%'
                     OR phone ILIKE '%' || $2 || '%'
                     OR email ILIKE '%' || $2 || '%')
      ORDER BY member_no`,
    [statusFilter(status), String(q || '').trim()]
  );
  return r.rows;
}

export async function saveMember(d, userId, id = null) {
  const name = String(d.name || '').trim();
  if (!name) throw bad('Member name is required.');
  const status = d.status === 'inactive' ? 'inactive' : 'active';

  if (id) {
    const r = await query(
      `UPDATE library_members
          SET name=$2, phone=$3, email=$4, designation=$5, status=$6, updated_at=NOW()
        WHERE id=$1 RETURNING *`,
      [id, name, clean(d.phone), clean(d.email), clean(d.designation), status]
    );
    if (!r.rowCount) throw bad('Library member not found.', 404);
    return r.rows[0];
  }

  const c = await query(`SELECT library_next_no('member','LM') AS no`);
  const r = await query(
    `INSERT INTO library_members (member_no,name,phone,email,designation,created_by)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [c.rows[0].no, name, clean(d.phone), clean(d.email), clean(d.designation), userId]
  );
  return r.rows[0];
}

/* ---------------- STUDENTS ---------------- */

export async function findStudents(q = '') {
  const term = String(q).trim();
  if (!term) return [];
  const r = await query(
    `SELECT id, record_no, name, admission_no, class_name, section
       FROM students
      WHERE name ILIKE '%' || $1 || '%'
         OR record_no ILIKE '%' || $1 || '%'
         OR admission_no ILIKE '%' || $1 || '%'
      ORDER BY name LIMIT 20`,
    [term]
  );
  return r.rows;
}

/* ---------------- ISSUE ---------------- */

export async function issueBook(d, userId) {
  const bookNo = String(d.bookNo || '').trim();
  const studentId = toInt(d.studentId);
  const memberId = toInt(d.memberId);
  const qty = toInt(d.quantity);
  const dueDate = d.dueDate;

  if (!bookNo || !studentId || !memberId || !Number.isInteger(qty) || qty < 1 || !dueDate) {
    throw bad('Book number, student, library member, quantity and due date are required.');
  }
  if (!isDate(dueDate)) throw bad('Enter a valid due date.');

  const c = await pool.connect();
  try {
    await c.query('BEGIN');

    const b = await c.query(
      `SELECT * FROM library_books WHERE UPPER(book_no)=UPPER($1) AND status='active' FOR UPDATE`,
      [bookNo]
    );
    if (!b.rowCount) throw bad('Book number not found or inactive.', 404);
    const book = b.rows[0];
    if (book.available_quantity < qty) {
      throw bad(`Only ${book.available_quantity} copies are available.`, 409);
    }

    const s = await c.query(
      `SELECT id, record_no, name, class_name, section FROM students WHERE id=$1`,
      [studentId]
    );
    if (!s.rowCount) throw bad('Student not found.', 404);

    const m = await c.query(
      `SELECT id FROM library_members WHERE id=$1 AND status='active'`,
      [memberId]
    );
    if (!m.rowCount) throw bad('Select an active library member.');

    const dueCheck = await c.query(`SELECT ($1::date >= CURRENT_DATE) AS ok`, [dueDate]);
    if (!dueCheck.rows[0].ok) throw bad('Due date cannot be before today.');

    const num = await c.query(`SELECT library_next_no('issue','LI') AS no`);
    const st = s.rows[0];
    const i = await c.query(
      `INSERT INTO library_issues
         (issue_no,book_id,student_id,student_name,student_record_no,class_name,section,
          member_id,issued_quantity,due_date,remarks,created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [num.rows[0].no, book.id, st.id, st.name, st.record_no, st.class_name, st.section,
       memberId, qty, dueDate, clean(d.remarks), userId]
    );
    await c.query(
      `UPDATE library_books SET available_quantity = available_quantity - $1, updated_at = NOW() WHERE id = $2`,
      [qty, book.id]
    );
    await c.query('COMMIT');
    return { ...i.rows[0], book_no: book.book_no, title: book.title };
  } catch (e) {
    await c.query('ROLLBACK');
    throw e;
  } finally {
    c.release();
  }
}

export async function activeIssues(q = '') {
  const r = await query(
    `SELECT i.*, b.book_no, b.title, m.name AS member_name,
            (i.issued_quantity - i.returned_quantity) AS outstanding,
            (i.due_date < CURRENT_DATE) AS overdue
       FROM library_issues i
       JOIN library_books b ON b.id = i.book_id
       JOIN library_members m ON m.id = i.member_id
      WHERE i.status <> 'returned'
        AND ($1 = '' OR i.issue_no ILIKE '%' || $1 || '%'
                     OR i.student_name ILIKE '%' || $1 || '%'
                     OR i.student_record_no ILIKE '%' || $1 || '%'
                     OR b.book_no ILIKE '%' || $1 || '%'
                     OR b.title ILIKE '%' || $1 || '%')
      ORDER BY i.due_date, i.id`,
    [String(q).trim()]
  );
  return r.rows;
}

/* ---------------- RETURN ---------------- */

export async function returnBook(d, userId) {
  const issueId = toInt(d.issueId);
  const memberId = toInt(d.memberId);
  const qty = toInt(d.quantity);
  if (!issueId || !memberId || !Number.isInteger(qty) || qty < 1) {
    throw bad('Select issue, receiving member and valid return quantity.');
  }

  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const i = await c.query(`SELECT * FROM library_issues WHERE id=$1 FOR UPDATE`, [issueId]);
    if (!i.rowCount) throw bad('Issue record not found.', 404);
    const row = i.rows[0];
    const out = row.issued_quantity - row.returned_quantity;
    if (out <= 0) throw bad('This issue is already fully returned.', 409);
    if (qty > out) throw bad(`Only ${out} book(s) are outstanding.`, 409);

    const m = await c.query(
      `SELECT id FROM library_members WHERE id=$1 AND status='active'`,
      [memberId]
    );
    if (!m.rowCount) throw bad('Select an active library member.');

    await c.query(
      `INSERT INTO library_returns (issue_id,member_id,returned_quantity,remarks,created_by)
       VALUES ($1,$2,$3,$4,$5)`,
      [issueId, memberId, qty, clean(d.remarks), userId]
    );
    const returned = row.returned_quantity + qty;
    const status = returned === row.issued_quantity ? 'returned' : 'partial';
    await c.query(
      `UPDATE library_issues SET returned_quantity=$1, status=$2 WHERE id=$3`,
      [returned, status, issueId]
    );
    await c.query(
      `UPDATE library_books SET available_quantity = available_quantity + $1, updated_at = NOW() WHERE id = $2`,
      [qty, row.book_id]
    );
    await c.query('COMMIT');
    return { issueId, returnedQuantity: qty, outstanding: out - qty, status };
  } catch (e) {
    await c.query('ROLLBACK');
    throw e;
  } finally {
    c.release();
  }
}

/* ---------------- REPORTS ---------------- */

export async function reportData({ from = '', to = '' } = {}) {
  const params = [isDate(from) ? from : null, isDate(to) ? to : null];
  const [books, issues, returns, overdue] = await Promise.all([
    query(`SELECT * FROM library_books ORDER BY book_no`),
    query(
      `SELECT i.*, b.book_no, b.title, m.name AS member_name
         FROM library_issues i
         JOIN library_books b ON b.id = i.book_id
         JOIN library_members m ON m.id = i.member_id
        WHERE ($1::date IS NULL OR i.issue_date >= $1::date)
          AND ($2::date IS NULL OR i.issue_date <= $2::date)
        ORDER BY i.issue_date DESC, i.id DESC`,
      params
    ),
    query(
      `SELECT r.*, i.issue_no, i.student_name, b.book_no, b.title, m.name AS member_name
         FROM library_returns r
         JOIN library_issues i ON i.id = r.issue_id
         JOIN library_books b ON b.id = i.book_id
         JOIN library_members m ON m.id = r.member_id
        WHERE ($1::date IS NULL OR r.return_date >= $1::date)
          AND ($2::date IS NULL OR r.return_date <= $2::date)
        ORDER BY r.return_date DESC, r.id DESC`,
      params
    ),
    query(
      `SELECT i.*, b.book_no, b.title, m.name AS member_name,
              (i.issued_quantity - i.returned_quantity) AS outstanding
         FROM library_issues i
         JOIN library_books b ON b.id = i.book_id
         JOIN library_members m ON m.id = i.member_id
        WHERE i.status <> 'returned' AND i.due_date < CURRENT_DATE
        ORDER BY i.due_date`
    ),
  ]);
  return { books: books.rows, issues: issues.rows, returns: returns.rows, overdue: overdue.rows };
}
