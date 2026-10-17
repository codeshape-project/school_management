INSERT INTO academic_sessions(name,start_date,end_date,is_active) VALUES ('2026 - 27','2026-04-01','2027-03-31',TRUE) ON CONFLICT (name) DO NOTHING;
