-- Hostel management: hostels, rooms, allotments, fee receipts

CREATE TABLE IF NOT EXISTS hostel_counters (
  key TEXT PRIMARY KEY,
  value BIGINT NOT NULL DEFAULT 0
);

CREATE OR REPLACE FUNCTION hostel_next_no(counter_key TEXT, prefix TEXT)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE n BIGINT;
BEGIN
  INSERT INTO hostel_counters(key, value) VALUES (counter_key, 1)
  ON CONFLICT (key) DO UPDATE SET value = hostel_counters.value + 1
  RETURNING value INTO n;
  RETURN prefix || LPAD(n::TEXT, 6, '0');
END; $$;

CREATE TABLE IF NOT EXISTS hostels (
  id BIGSERIAL PRIMARY KEY,
  hostel_no VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(160) NOT NULL UNIQUE,
  hostel_type VARCHAR(20) NOT NULL DEFAULT 'boys' CHECK (hostel_type IN ('boys','girls','mixed')),
  warden_name VARCHAR(160),
  warden_phone VARCHAR(40),
  address TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive')),
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hostel_rooms (
  id BIGSERIAL PRIMARY KEY,
  hostel_id BIGINT NOT NULL REFERENCES hostels(id),
  room_no VARCHAR(40) NOT NULL,
  floor_no VARCHAR(40),
  room_type VARCHAR(60),
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  monthly_fee NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (monthly_fee >= 0),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive')),
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (hostel_id, room_no)
);

CREATE TABLE IF NOT EXISTS hostel_allotments (
  id BIGSERIAL PRIMARY KEY,
  allotment_no VARCHAR(20) UNIQUE NOT NULL,
  student_id BIGINT NOT NULL REFERENCES students(id),
  student_name VARCHAR(200) NOT NULL,
  student_record_no VARCHAR(80),
  admission_no VARCHAR(100),
  class_name VARCHAR(100),
  section VARCHAR(50),
  session VARCHAR(50),
  father_name VARCHAR(200),
  category VARCHAR(80),
  roll_no VARCHAR(60),
  computer_id VARCHAR(80),
  hostel_id BIGINT NOT NULL REFERENCES hostels(id),
  room_id BIGINT NOT NULL REFERENCES hostel_rooms(id),
  bed_no VARCHAR(40),
  join_date DATE NOT NULL DEFAULT CURRENT_DATE,
  monthly_fee NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (monthly_fee >= 0),
  security_deposit NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (security_deposit >= 0),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active','vacated')),
  vacate_date DATE,
  vacate_remarks TEXT,
  remarks TEXT,
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (vacate_date IS NULL OR vacate_date >= join_date)
);

-- one active hostel seat per student, one active student per bed
CREATE UNIQUE INDEX IF NOT EXISTS uq_hostel_active_student
  ON hostel_allotments (student_id) WHERE status = 'active';
CREATE UNIQUE INDEX IF NOT EXISTS uq_hostel_active_bed
  ON hostel_allotments (room_id, LOWER(bed_no)) WHERE status = 'active' AND bed_no IS NOT NULL;
CREATE INDEX IF NOT EXISTS ix_hostel_allot_room ON hostel_allotments (room_id);
CREATE INDEX IF NOT EXISTS ix_hostel_allot_hostel ON hostel_allotments (hostel_id);

CREATE TABLE IF NOT EXISTS hostel_receipts (
  id BIGSERIAL PRIMARY KEY,
  receipt_no VARCHAR(20) UNIQUE NOT NULL,
  allotment_id BIGINT NOT NULL REFERENCES hostel_allotments(id),
  receipt_date DATE NOT NULL DEFAULT CURRENT_DATE,
  pay_for VARCHAR(120) NOT NULL DEFAULT 'Hostel Fee',
  paid_months TEXT,
  amount_paid NUMERIC(12,2) NOT NULL CHECK (amount_paid > 0),
  cash_discount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (cash_discount >= 0),
  payment_mode VARCHAR(40) NOT NULL DEFAULT 'Cash',
  payment_ref VARCHAR(120),
  remarks TEXT,
  hostel_name VARCHAR(160),
  room_no VARCHAR(40),
  balance_after NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ix_hostel_receipts_allot ON hostel_receipts (allotment_id);
CREATE INDEX IF NOT EXISTS ix_hostel_receipts_date ON hostel_receipts (receipt_date);
