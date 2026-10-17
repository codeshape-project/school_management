import { useEffect, useState } from "react";
import MainDashboard from "../dashboards/MainDashboard";
import StudentDashboard from "../dashboards/StudentDashboard";
import FeeDashboard from "../dashboards/FeeDashboard";
import TransportDashboard from "../dashboards/TransportDashboard";
import LibraryDashboard from "../dashboards/LibraryDashboard";
import SMSDashboard from "../dashboards/SMSDashboard";
import HostelDashboard from "../dashboards/HostelDashboard";
import StoreDashboard from "../dashboards/StoreDashboard";
import SalaryDashboard from "../dashboards/SalaryDashboard";
import VisitorDashboard from "../dashboards/VisitorDashboard";
import HealthDashboard from "../dashboards/HealthDashboard";
import AccountDashboard from "../dashboards/AccountDashboard";
import ICardDashboard from "../dashboards/ICardDashboard";
import ReportDashboard from "../dashboards/ReportDashboard";

const modules = {
  Reports: ReportDashboard,  Student: StudentDashboard, Fee: FeeDashboard, Transport: TransportDashboard,
  Library: LibraryDashboard, SMS: SMSDashboard, Hostel: HostelDashboard,
  Store: StoreDashboard, "Staff & Salary": SalaryDashboard, Visitor: VisitorDashboard,
  Health: HealthDashboard, Account: AccountDashboard, "I-Card": ICardDashboard
};

export default function Dashboard({ onLogout }) {
  const [module, setModule] = useState("Main");
  const [toast, setToast] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setToast(false), 2800);
    return () => clearTimeout(t);
  }, []);

  const openModule = name => setModule(name);
  let content = <MainDashboard onOpenModule={openModule} onLogout={onLogout} />;

  if (module !== "Main" && modules[module]) {
    const Component = modules[module];
    content = <Component onBack={() => setModule("Main")} onLogout={onLogout} />;
  }

  return (
    <>
      {content}
      {toast && (
        <div className="fixed right-4 top-4 z-[100] rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-2xl">
          <p className="text-sm font-bold text-emerald-700">✓ Login successful</p>
          <p className="text-xs text-slate-500">Welcome to the school dashboard.</p>
        </div>
      )}
    </>
  );
}