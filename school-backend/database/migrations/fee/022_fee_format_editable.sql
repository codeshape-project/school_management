-- Fee formats can now be edited by authorized administrators.
-- Keep the one-format-per-session-and-class unique index, but remove the
-- database trigger that previously blocked UPDATE and DELETE operations.
DROP TRIGGER IF EXISTS trg_fee_formats_lock ON fee_formats;
DROP FUNCTION IF EXISTS block_fee_format_change();

CREATE UNIQUE INDEX IF NOT EXISTS uq_fee_formats_session_class
  ON fee_formats (session, class_name)
  WHERE form_data->>'schemaVersion' = '2';
