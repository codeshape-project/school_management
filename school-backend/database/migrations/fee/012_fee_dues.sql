CREATE TABLE IF NOT EXISTS fee_dues (
  id BIGSERIAL PRIMARY KEY,
  record_no VARCHAR(80) UNIQUE NOT NULL,
  session VARCHAR(50), class_name VARCHAR(100), section VARCHAR(50),
  name VARCHAR(200), phone VARCHAR(50), admission_no VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active', event_date DATE, payment_mode VARCHAR(80),
  vehicle_no VARCHAR(100), route_name VARCHAR(150), form_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by BIGINT REFERENCES users(id), created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()

);
