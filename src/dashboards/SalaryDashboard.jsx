import { useEffect, useState } from "react";

import {
  UserPlus,
  CalendarCheck,
  Wallet,
  FileBarChart,
  FileText,
  Menu,
  X,
  ChevronRight,
  LogOut,
} from "lucide-react";

import {
  salarySidebar,
  salaryNavbar,
} from "../data/menuData";

import StaffForm from "../forms/staff/StaffForm";
import StaffAttendanceForm from "../forms/staff/StaffAttendanceForm";
import SalaryEntryForm from "../forms/staff/SalaryEntryForm";
import SalaryReport from "../forms/staff/SalaryReport";
import StaffReport from "../forms/staff/StaffReport";

/* =========================================================
   SALARY SIDEBAR ICONS
========================================================= */

const icons = {
  "Staff Registration": UserPlus,
  "Staff Attendance": CalendarCheck,
  "Salary Entry": Wallet,
  "Salary Report": FileBarChart,
  "Staff Report": FileText,
};

/* =========================================================
   FORM MAPPING
========================================================= */

const forms = {
  "Staff Registration": StaffForm,
  "Staff Attendance": StaffAttendanceForm,
  "Salary Entry": SalaryEntryForm,
  "Salary Report": SalaryReport,
  "Staff Report": StaffReport,
};

export default function SalaryDashboard({ onBack }) {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  /* =========================================================
     OPEN FORM
     Same form can be opened from sidebar or navbar
  ========================================================= */

 const handleOpenForm = (item) => {
  if (item === "Master" || item === "Exit") {
    onBack();
    return;
  }
  setActive(item);
  setOpen(false);
};

  /* =========================================================
     CLOSE FORM
  ========================================================= */

  const handleCloseForm = () => {
    setActive(null);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Form = active ? forms[active] : null;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          w-[220px]
          bg-[#061a3a]
          text-white
          border-r
          border-[#58bdf5]/20
          shadow-[8px_0_30px_rgba(0,0,0,0.28)]
          transition-transform
          duration-300
          lg:translate-x-0
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex h-full flex-col">
          {/* =================================================
              SIDEBAR HEADER
          ================================================= */}

          <div
            className="
              flex
              h-[100px]
              shrink-0
              flex-col
              items-center
              justify-center
              border-b
              border-[#58bdf5]/15
              bg-gradient-to-b
              from-[#08234d]
              to-[#061a3a]
            "
          >
         <div 
  className=" 
    h-16
    w-16
    overflow-hidden 
    rounded-full 
    
    border-[#f5d76e]/40 
    bg-white/10 
    p-1 
    shadow-[0_0_15px_rgba(245,215,110,0.18)] 
  " 
>
  <img 
    src="/images/logo.png" 
    alt="School logo" 
    className="h-full w-full rounded-full object-contain" 
  />
</div>

            <p
              className="
                mt-1.5
                text-sm
                font-black
                tracking-wide
                text-white
              "
            >
              CodeShape Academy
            </p>
          </div>

          {/* =================================================
              SALARY MENU
          ================================================= */}

          <nav
            className="
              flex-1
              space-y-1
              overflow-y-auto
              px-2
              pb-4
              pt-2
              scrollbar-hide
            "
          >
            {salarySidebar.map((item) => {
              const Icon = icons[item];

              return (
                <button
                  key={item}
                  onClick={() => handleOpenForm(item)}
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    font-semibold
                    transition-all
                    duration-200

                    ${
                      active === item
                        ? `
                          border-[#f5d76e]
                          bg-gradient-to-r
                          from-[#f8e8a8]
                          to-[#f3d978]
                          text-[#061a3a]
                          shadow-[0_0_16px_rgba(245,215,110,0.32)]
                          scale-[1.01]
                        `
                        : `
                          border-transparent
                          text-blue-50
                          hover:border-[#58bdf5]/40
                          hover:bg-[#102f59]
                          hover:text-white
                          hover:shadow-[0_0_14px_rgba(88,189,245,0.12)]
                          hover:translate-x-[2px]
                        `
                    }
                  `}
                >
                  {/* ICON */}

                  {Icon && (
                    <Icon
                      size={18}
                      strokeWidth={2.2}
                      className={`
                        shrink-0
                        transition-all
                        duration-200

                        ${
                          active === item
                            ? `
                              text-[#0b2b55]
                              drop-shadow-[0_0_4px_rgba(11,43,85,0.25)]
                            `
                            : `
                              text-[#ffd75a]
                              drop-shadow-[0_0_7px_rgba(255,215,90,0.65)]
                              group-hover:text-[#ffe58a]
                              group-hover:drop-shadow-[0_0_10px_rgba(255,215,90,0.9)]
                            `
                        }
                      `}
                    />
                  )}

                  {/* TEXT */}

                  <span className="flex-1">
                    {item}
                  </span>

                  {/* ARROW */}

                  <ChevronRight
                    size={15}
                    strokeWidth={2.2}
                    className={`
                      transition-all
                      duration-200

                      ${
                        active === item
                          ? `
                            translate-x-0
                            opacity-100
                          `
                          : `
                            translate-x-[-4px]
                            opacity-0
                            group-hover:translate-x-0
                            group-hover:opacity-100
                          `
                      }
                    `}
                  />
                </button>
              );
            })}

            {/* =================================================
                BACK TO MAIN
            ================================================= */}

            <button
              onClick={onBack}
              className="
                group
                mt-3
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                border
                border-[#ff1744]/35
                bg-[#ff1744]/5
                px-3
                py-2.5
                text-sm
                font-semibold
                text-[#ff1744]
                transition-all
                duration-200
                hover:border-[#ff1744]
                hover:bg-[#ff1744]
                hover:text-white
                hover:shadow-[0_0_20px_rgba(255,23,68,0.65)]
                hover:scale-[1.02]
                active:scale-[0.98]
              "
            >
              <LogOut
                size={18}
                strokeWidth={2.3}
                className="
                  transition-transform
                  duration-200
                  group-hover:-translate-x-0.5
                "
              />

              <span className="flex-1 text-left">
                Back to Home
              </span>
            </button>
          </nav>
        </div>
      </aside>

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="lg:pl-[220px]">
        {/* =================================================
            NAVBAR
        ================================================= */}

        <header
          className="
            fixed
            left-0
            right-0
            top-0
            z-40
            h-[54px]
            bg-[#071d42]
            border-b
            border-[#58bdf5]/20
            shadow-[0_5px_20px_rgba(0,0,0,0.25)]
            lg:left-[220px]
          "
        >
          <div
            className="
              flex
              h-full
              items-center
              gap-2
              px-3
              sm:px-5
            "
          >
            {/* MOBILE MENU */}

            <button
              onClick={() => setOpen(!open)}
              className="
                rounded-xl
                border
                border-[#58bdf5]/20
                bg-white/5
                p-1.5
                text-white
                transition-all
                duration-200
                hover:border-[#58bdf5]/60
                hover:bg-[#12315c]
                hover:shadow-[0_0_12px_rgba(88,189,245,0.25)]
                lg:hidden
              "
            >
              {open ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>

            {/* NAVBAR ITEMS */}

            <nav
              className="
                flex
                min-w-0
                flex-1
                gap-1.5
                overflow-x-auto
                scrollbar-hide
              "
            >
              {salaryNavbar.map((item) => (
                <button
                  key={item}
                  onClick={() => handleOpenForm(item)}
                  className={`
                    group
                    shrink-0
                    rounded-lg
                    border
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    transition-all
                    duration-200

                    ${
                      active === item
                        ? `
                          border-[#f5d76e]
                          bg-gradient-to-r
                          from-[#f8e8a8]
                          to-[#f3d978]
                          text-[#061a3a]
                          shadow-[0_0_14px_rgba(245,215,110,0.35)]
                        `
                        : `
                          border-transparent
                          text-blue-50
                          hover:border-[#58bdf5]/50
                          hover:bg-[#12315c]
                          hover:text-[#ffd75a]
                          hover:shadow-[0_0_12px_rgba(88,189,245,0.16)]
                        `
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* EXIT */}

            <button
              onClick={onBack}
              className="
                group
                shrink-0
                rounded-xl
                border
                border-[#ff1744]/35
                bg-[#ff1744]/5
                p-2
                text-[#ff1744]
                transition-all
                duration-200
                hover:border-[#ff1744]
                hover:bg-[#ff1744]
                hover:text-white
                hover:shadow-[0_0_18px_rgba(255,23,68,0.75)]
                hover:scale-105
                active:scale-95
              "
              title="Back to Main"
            >
              <LogOut
                size={19}
                strokeWidth={2.3}
              />
            </button>
          </div>
        </header>

        {/* =================================================
            MOBILE OVERLAY
        ================================================= */}

        {open && (
          <button
            onClick={() => setOpen(false)}
            className="
              fixed
              inset-0
              z-40
              bg-black/45
              backdrop-blur-[2px]
              lg:hidden
            "
            aria-label="Close menu"
          />
        )}

        {/* =================================================
            MAIN DASHBOARD BACKGROUND
        ================================================= */}

        <main
          className="
            fixed
            bottom-0
            left-0
            right-0
            top-[54px]
            overflow-hidden
            bg-cover
            bg-center
            bg-no-repeat
            lg:left-[220px]
          "
          style={{
            backgroundImage:
              "url('/images/salary-dashboard.jpg')",
          }}
        />

        {/* =====================================================
            FORM WINDOW

            IMPORTANT:
            This container ONLY controls the position and size.

            The actual form controls:
            - Header
            - Sections
            - Inputs
            - Buttons
            - Layout
            - Colors

            This allows every form to look different.
        ===================================================== */}

       {Form && (
  <div
    className="
      fixed
      z-30
      left-[8px]
      top-[62px]

      max-w-[calc(100vw-16px)]
      max-h-[calc(100vh-70px)]

      lg:left-[228px]
      lg:top-[62px]
      lg:max-w-[calc(100vw-245px)]
      lg:max-h-[calc(100vh-72px)]

      overflow-hidden
      rounded-2xl
    "
  >
    <div className="relative h-auto w-auto">
      <Form onClose={handleCloseForm} />
    </div>
  </div>
)}
      </div>
    </div>
  );
}