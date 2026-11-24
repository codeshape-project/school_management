import ReportPanel from "../../components/ReportPanel";

// Same report screen as the Student report, opened on the Salary report.
export default function SalaryReport({ onClose }) {
  return (
    <ReportPanel
      embedded
      group="staff"
      defaultSource="staff_salary"
      title="Salary Reports"
      onClose={onClose}
    />
  );
}
