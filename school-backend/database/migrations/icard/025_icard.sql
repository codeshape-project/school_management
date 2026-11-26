-- I-Card module: card templates + generated (saved) I-Cards for students and staff.
-- Same column layout as the other modules (record_no, session, class_name, section, name,
-- phone, admission_no, status, form_data ...) so the common report engine can read it later.
--   student card : class_name = Class, section = Section
--   staff card   : class_name = Department, section = Designation

CREATE TABLE IF NOT EXISTS icard_counters (
  key TEXT PRIMARY KEY,
  value BIGINT NOT NULL DEFAULT 0
);

CREATE OR REPLACE FUNCTION icard_next_no(counter_key TEXT, prefix TEXT)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE n BIGINT;
BEGIN
  INSERT INTO icard_counters(key, value) VALUES (counter_key, 1)
  ON CONFLICT (key) DO UPDATE SET value = icard_counters.value + 1
  RETURNING value INTO n;
  RETURN prefix || LPAD(n::TEXT, 6, '0');
END; $$;

-- One saved design per card type (student / staff). Colours, school name, logo, phone,
-- which rows to print ... are all kept in "config".
CREATE TABLE IF NOT EXISTS icard_templates (
  id BIGSERIAL PRIMARY KEY,
  card_type VARCHAR(20) NOT NULL UNIQUE CHECK (card_type IN ('student', 'staff')),
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_by BIGINT REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- One saved card per student and one per staff member.
-- Generating again simply refreshes the same row (new photo, new class ...).
CREATE TABLE IF NOT EXISTS icard_records (
  id BIGSERIAL PRIMARY KEY,
  record_no VARCHAR(80) UNIQUE NOT NULL,
  card_type VARCHAR(20) NOT NULL CHECK (card_type IN ('student', 'staff')),
  student_id BIGINT REFERENCES students(id) ON DELETE CASCADE,
  staff_id BIGINT REFERENCES staff(id) ON DELETE CASCADE,
  session VARCHAR(50), class_name VARCHAR(100), section VARCHAR(100),
  name VARCHAR(200), phone VARCHAR(50), admission_no VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  photo_url TEXT,                                   -- student: copied from the admission photo
  form_data JSONB NOT NULL DEFAULT '{}'::jsonb,     -- everything printed on the card
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (
    (card_type = 'student' AND student_id IS NOT NULL AND staff_id IS NULL) OR
    (card_type = 'staff'   AND staff_id   IS NOT NULL AND student_id IS NULL)
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_icard_student ON icard_records (student_id) WHERE student_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_icard_staff   ON icard_records (staff_id)   WHERE staff_id   IS NOT NULL;
CREATE INDEX IF NOT EXISTS ix_icard_type_class ON icard_records (card_type, class_name, section);
CREATE INDEX IF NOT EXISTS ix_icard_name ON icard_records (LOWER(name));
