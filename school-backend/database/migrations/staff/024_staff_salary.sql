-- Staff & Salary: staff master, monthly attendance, monthly salary.
-- All three tables use the same column layout as the other modules
-- (record_no, name, class_name, section, session, status, event_date, form_data ...)
-- so the common report engine (filters, selected columns, print, PDF, Excel) works on them.
--   class_name = Department, section = Designation

CREATE TABLE IF NOT EXISTS staff_counters (
  key TEXT PRIMARY KEY,
  value BIGINT NOT NULL DEFAULT 0
);

CREATE OR REPLACE FUNCTION staff_next_no(counter_key TEXT, prefix TEXT)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE n BIGINT;
BEGIN
  INSERT INTO staff_counters(key, value) VALUES (counter_key, 1)
  ON CONFLICT (key) DO UPDATE SET value = staff_counters.value + 1
  RETURNING value INTO n;
  RETURN prefix || LPAD(n::TEXT, 6, '0');
END; $$;

CREATE TABLE IF NOT EXISTS staff (
  id BIGSERIAL PRIMARY KEY,
  record_no VARCHAR(80) UNIQUE NOT NULL,
  session VARCHAR(50), class_name VARCHAR(100), section VARCHAR(100),
  name VARCHAR(200), phone VARCHAR(50), admission_no VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active', event_date DATE, payment_mode VARCHAR(80),
  vehicle_no VARCHAR(100), route_name VARCHAR(150),
  form_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_staff_name ON staff (LOWER(name));
CREATE INDEX IF NOT EXISTS ix_staff_status ON staff (status);

CREATE TABLE IF NOT EXISTS staff_attendance (
  id BIGSERIAL PRIMARY KEY,
  record_no VARCHAR(80) UNIQUE NOT NULL,
  staff_id BIGINT NOT NULL REFERENCES staff(id),
  att_month SMALLINT NOT NULL CHECK (att_month BETWEEN 1 AND 12),
  att_year SMALLINT NOT NULL CHECK (att_year BETWEEN 2000 AND 2100),
  session VARCHAR(50), class_name VARCHAR(100), section VARCHAR(100),
  name VARCHAR(200), phone VARCHAR(50), admission_no VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active', event_date DATE, payment_mode VARCHAR(80),
  vehicle_no VARCHAR(100), route_name VARCHAR(150),
  form_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (staff_id, att_year, att_month)
);

CREATE TABLE IF NOT EXISTS staff_salary (
  id BIGSERIAL PRIMARY KEY,
  record_no VARCHAR(80) UNIQUE NOT NULL,
  staff_id BIGINT NOT NULL REFERENCES staff(id),
  salary_month SMALLINT NOT NULL CHECK (salary_month BETWEEN 1 AND 12),
  salary_year SMALLINT NOT NULL CHECK (salary_year BETWEEN 2000 AND 2100),
  session VARCHAR(50), class_name VARCHAR(100), section VARCHAR(100),
  name VARCHAR(200), phone VARCHAR(50), admission_no VARCHAR(100),
  status VARCHAR(50) DEFAULT 'paid', event_date DATE, payment_mode VARCHAR(80),
  vehicle_no VARCHAR(100), route_name VARCHAR(150),
  form_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (staff_id, salary_year, salary_month)
);
