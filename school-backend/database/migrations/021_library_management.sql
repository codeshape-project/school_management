CREATE TABLE IF NOT EXISTS library_counters (
  key TEXT PRIMARY KEY,
  value BIGINT NOT NULL DEFAULT 0
);
CREATE OR REPLACE FUNCTION library_next_no(counter_key TEXT, prefix TEXT)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE n BIGINT;
BEGIN
  INSERT INTO library_counters(key,value) VALUES(counter_key,1)
  ON CONFLICT(key) DO UPDATE SET value=library_counters.value+1
  RETURNING value INTO n;
  RETURN prefix || LPAD(n::TEXT,6,'0');
END; $$;
CREATE TABLE IF NOT EXISTS library_members (
 id BIGSERIAL PRIMARY KEY, member_no VARCHAR(20) UNIQUE NOT NULL,
 name VARCHAR(180) NOT NULL, phone VARCHAR(40), email VARCHAR(180), designation VARCHAR(100),
 status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK(status IN ('active','inactive')),
 created_by BIGINT REFERENCES users(id), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS library_books (
 id BIGSERIAL PRIMARY KEY, book_no VARCHAR(20) UNIQUE NOT NULL,
 title VARCHAR(240) NOT NULL, author VARCHAR(180), category VARCHAR(120), publisher VARCHAR(180), isbn VARCHAR(40), shelf_no VARCHAR(60),
 total_quantity INTEGER NOT NULL CHECK(total_quantity >= 0), available_quantity INTEGER NOT NULL CHECK(available_quantity >= 0),
 status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK(status IN ('active','inactive')),
 created_by BIGINT REFERENCES users(id), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 CHECK(available_quantity <= total_quantity)
);
CREATE TABLE IF NOT EXISTS library_issues (
 id BIGSERIAL PRIMARY KEY, issue_no VARCHAR(20) UNIQUE NOT NULL,
 book_id BIGINT NOT NULL REFERENCES library_books(id), student_id BIGINT NOT NULL REFERENCES students(id),
 student_name VARCHAR(200) NOT NULL, student_record_no VARCHAR(80), class_name VARCHAR(100), section VARCHAR(50),
 member_id BIGINT NOT NULL REFERENCES library_members(id), issued_quantity INTEGER NOT NULL CHECK(issued_quantity > 0),
 returned_quantity INTEGER NOT NULL DEFAULT 0 CHECK(returned_quantity >= 0 AND returned_quantity <= issued_quantity),
 issue_date DATE NOT NULL DEFAULT CURRENT_DATE, due_date DATE NOT NULL,
 status VARCHAR(20) NOT NULL DEFAULT 'issued' CHECK(status IN ('issued','partial','returned')),
 remarks TEXT, created_by BIGINT REFERENCES users(id), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 CHECK(due_date >= issue_date)
);
CREATE TABLE IF NOT EXISTS library_returns (
 id BIGSERIAL PRIMARY KEY, issue_id BIGINT NOT NULL REFERENCES library_issues(id),
 member_id BIGINT NOT NULL REFERENCES library_members(id), returned_quantity INTEGER NOT NULL CHECK(returned_quantity > 0),
 return_date DATE NOT NULL DEFAULT CURRENT_DATE, remarks TEXT, created_by BIGINT REFERENCES users(id), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_library_books_title ON library_books USING gin(to_tsvector('simple', title));
CREATE INDEX IF NOT EXISTS idx_library_issues_student ON library_issues(student_id,status);
CREATE INDEX IF NOT EXISTS idx_library_issues_due ON library_issues(due_date) WHERE status <> 'returned';
CREATE INDEX IF NOT EXISTS idx_library_returns_date ON library_returns(return_date);
