-- Fee format rules (new-style rows only: form_data->>'schemaVersion' = '2'):
--   1. only ONE fee format per session + class
--   2. once saved, it can never be edited or deleted (enforced here, in the database,
--      so it holds even if someone calls the API directly or runs SQL by mistake)
-- Older rows saved by the previous blank form are left untouched.

CREATE UNIQUE INDEX IF NOT EXISTS uq_fee_formats_session_class
  ON fee_formats (session, class_name)
  WHERE form_data->>'schemaVersion' = '2';

CREATE OR REPLACE FUNCTION block_fee_format_change() RETURNS trigger AS $$
BEGIN
  IF OLD.form_data->>'schemaVersion' = '2' THEN
    RAISE EXCEPTION 'Fee format for % / % is locked and cannot be edited or deleted.',
      OLD.session, OLD.class_name
      USING ERRCODE = 'P0001';
  END IF;
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_fee_formats_lock ON fee_formats;
CREATE TRIGGER trg_fee_formats_lock
  BEFORE UPDATE OR DELETE ON fee_formats
  FOR EACH ROW EXECUTE FUNCTION block_fee_format_change();
