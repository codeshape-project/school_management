import ReportPanel from "../../components/ReportPanel";

// Same report screen as the Student report: report type, period, filters,
// "Columns To Show" tick boxes, then Generate / Print / PDF / Excel.
// Print and export contain only the ticked columns and the filtered rows.
export default function StaffReport({ onClose }) {
  return (
    <ReportPanel
      embedded
      group="staff"
      defaultSource="staff_master"
      title="Staff Reports"
      onClose={onClose}
    />
  );
}
