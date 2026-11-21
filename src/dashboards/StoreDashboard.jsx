
import { useState } from "react";
import {
  Menu,
  X,
  ChevronRight,
  LogOut,
  ShoppingCart,
  Package,
  PackageCheck,
  FileBarChart,
} from "lucide-react";

const items = ["Purchase", "Stock", "Issue", "Reports"];

const itemIcons = {
  Purchase: ShoppingCart,
  Stock: Package,
  Issue: PackageCheck,
  Reports: FileBarChart,
};

export default function StoreDashboard({ onBack }) {
  const [active, setActive] = useState(items[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[220px] bg-[#061a3a] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">

          {/* Logo and School Name */}
          <div className="flex h-[100px] shrink-0 flex-col items-center justify-center border-b border-[#58bdf5]/30 bg-gradient-to-b from-[#08234d] to-[#061a3a]">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-white/10 p-1">
              <img
                src="/images/logo.png"
                alt="School logo"
                className="h-full w-full rounded-full object-contain"
              />
            </div>

            <p className="mt-1 text-sm font-black tracking-wide text-white">
              CodeShape Academy
            </p>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-5">
            {items.map((item) => {
              const Icon = itemIcons[item];

              return (
                <button
                  key={item}
                  onClick={() => {
                    setActive(item);
                    setOpen(false);
                  }}
                  className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                    active === item
                      ? "border-[#f8e8a8] bg-gradient-to-r from-[#f8e8a8] to-[#f3d978] text-[#061a3a] shadow-[0_3px_12px_rgba(248,232,168,0.25)]"
                      : "border-transparent text-blue-50 hover:border-[#58bdf5]/30 hover:bg-[#12345f]"
                  }`}
                >
                  <Icon
                    size={18}
                    className={
                      active === item
                        ? "text-[#061a3a]"
                        : "text-[#f3d978]"
                    }
                  />

                  <span className="flex-1 text-left">{item}</span>

                  <ChevronRight size={15} />
                </button>
              );
            })}

            {/* Back to Main */}
            <button
              onClick={onBack}
              className="
                group mt-3 flex w-full items-center gap-3
                rounded-xl border border-[#ff1744]/35
                bg-[#ff1744]/5 px-3 py-2.5
                text-sm font-semibold text-[#ff1744]
                transition-all duration-200
                hover:border-[#ff1744]
                hover:bg-[#ff1744]
                hover:text-white
                hover:shadow-[0_0_20px_rgba(255,23,68,0.45)]
                hover:scale-[1.02]
                active:scale-[0.98]
              "
            >
              <LogOut size={18} strokeWidth={2.3} />

              <span className="flex-1 text-left">
                Back to Home
              </span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Area */}
      <div className="lg:pl-[220px]">

        {/* Top Navbar */}
        <header className="fixed left-0 right-0 top-0 z-40 h-[54px] border-b border-[#58bdf5]/20 bg-[#071d42] shadow-lg lg:left-[220px]">
          <div className="flex h-full items-center gap-2 px-3 sm:px-5">

            {/* Mobile Menu */}
            <button
              onClick={() => setOpen(!open)}
              className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>

            <nav className="flex flex-1 gap-1 overflow-x-auto">
              {["Master", "Entry", "Reports", "Setup", "User"].map((x) => (
                <button
                  key={x}
                  className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-blue-50 transition hover:bg-[#f3d978] hover:text-[#061a3a]"
                >
                  {x}
                </button>
              ))}
            </nav>

            {/* Exit */}
            <button
              onClick={onBack}
              title="Exit"
              className="rounded-lg p-2 text-red-300 transition hover:bg-red-500/15 hover:text-red-200"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Mobile Overlay */}
        {open && (
          <button
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            aria-label="Close sidebar"
          />
        )}

        {/* Background and Content */}
        <main
          className="fixed bottom-0 left-0 right-0 top-[54px] overflow-y-auto bg-cover bg-center bg-no-repeat px-2 py-2 sm:px-4 lg:left-[220px]"
          style={{
            backgroundImage:
              "url('/images/store-dashboard.jpg')",
          }}
        >
        
        </main>
      </div>
    </div>
  );
}
