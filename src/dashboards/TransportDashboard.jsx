// import { useState } from "react";
// import { Menu, X, ChevronRight, LogOut, Bell } from "lucide-react";
// import { transportSidebar, transportNavbar } from "../data/menuData";

// import TransportAllotment from "../forms/transport/TransportAllotment";
// import ConveyanceStudent from "../forms/transport/ConveyanceStudent";
// import ConveyanceAmount from "../forms/transport/ConveyanceAmount";
// import VehiclewiseStudentChart from "../forms/transport/VehiclewiseStudentChart";


// const forms = {

//   "Transport Allotment": TransportAllotment,
//   "Conveyance Student": ConveyanceStudent,
//   "Conveyance Amount": ConveyanceAmount,
//   "Vehiclewise Student Chart": VehiclewiseStudentChart

// };

// export default function TransportDashboard({ onBack }) {
//   const [active, setActive] = useState(transportSidebar[0]);
//   const [open, setOpen] = useState(false);
//   const Form = forms[active];

//   return (
//     <div className="min-h-screen bg-slate-100">
//       <aside className={`fixed inset-y-0 left-0 z-50 w-[245px] bg-schoolBlue text-white shadow-2xl transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
//         <div className="flex h-full flex-col">
//           <div className="flex h-[110px] shrink-0 flex-col items-center justify-center border-b border-white/10">
//             <div className="h-12 w-12 overflow-hidden rounded-xl bg-white/10 p-1"><img src="/images/logo.png" alt="School logo" className="h-full w-full object-contain"/></div>
//             <p className="mt-1.5 text-sm font-black">School Name</p>
//           </div>
//           <p className="px-4 pb-2 pt-4 text-[10px] font-bold uppercase tracking-[.2em] text-blue-200">Transport Module</p>
//           <nav className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
//             {transportSidebar.map(item => <button key={item} onClick={() => {setActive(item);setOpen(false)}} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${active === item ? "bg-schoolCream text-schoolBlue" : "text-blue-50 hover:bg-schoolCream hover:text-schoolBlue"}`}>
//               <span className="flex-1">{item}</span><ChevronRight size={14}/>
//             </button>)}
//             <button onClick={onBack} className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-blue-50 hover:bg-schoolCream hover:text-schoolBlue"><LogOut size={17}/> Back to Main</button>
//           </nav>
//         </div>
//       </aside>

//       <div className="lg:pl-[245px]">
//         <header className="fixed left-0 right-0 top-0 z-40 h-[68px] bg-schoolBlue shadow-lg lg:left-[245px]">
//           <div className="flex h-full items-center gap-2 px-3 sm:px-5">
//             <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-white lg:hidden">{open ? <X size={21}/> : <Menu size={21}/>}</button>
//             <nav className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
//               {transportNavbar.map(item => <button key={item} className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-blue-50 hover:bg-schoolCream hover:text-schoolBlue">{item}</button>)}
//             </nav>
//             <Bell className="shrink-0 text-white" size={18}/>
//           </div>
//         </header>
//         {open && <button onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/40 lg:hidden"/>}

//         <main className="min-h-screen bg-cover bg-center bg-fixed px-2 pb-5 pt-[68px] sm:px-4" style={{backgroundImage:"linear-gradient(rgba(239,246,250,.72),rgba(239,246,250,.91)),url('/images/transport-dashboard.jpg')"}}>
//           <div className="min-h-[calc(100vh-68px)]">
//             <div className="border-x border-b border-white/80 bg-white/95 px-3 py-3 shadow-lg sm:px-5">
//               <div className="flex flex-wrap items-center justify-between gap-2">
//                 <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-schoolBlue">Transport Module</p><h1 className="text-xl font-black text-slate-800 sm:text-2xl">{active}</h1></div>
//                 <button onClick={onBack} className="secondary-btn text-xs">Back to Main</button>
//               </div>
//             </div>
//             <div className="p-2 sm:p-4"><Form /></div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Menu, X, ChevronRight, LogOut } from "lucide-react";
import { transportSidebar, transportNavbar } from "../data/menuData";

import TransportAllotment from "../forms/transport/TransportAllotment";
import ConveyanceStudent from "../forms/transport/ConveyanceStudent";
import ConveyanceAmount from "../forms/transport/ConveyanceAmount";
import VehiclewiseStudentChart from "../forms/transport/VehiclewiseStudentChart";

const forms = {
  "Transport Allotment": TransportAllotment,
  "Conveyance Student": ConveyanceStudent,
  "Conveyance Amount": ConveyanceAmount,
  "Vehiclewise Student Chart": VehiclewiseStudentChart,
};

export default function TransportDashboard({ onBack }) {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenForm = (item) => {
  if (item === "Master") {
    onBack();
    return;
  }
  setActive(item);
  setOpen(false);
};
  const handleCloseForm = () => {
    setActive(null);
  };

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
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* SIDEBAR HEADER */}
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
        <div className="
  h-16
  w-16
  overflow-hidden
  rounded-full
  
  border-[#f5d76e]/40
  bg-white/10
  p-1
  shadow-[0_0_15px_rgba(245,215,110,0.18)]
">
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

            
          </div>



          {/* SIDEBAR MENU */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-2 pb-4 pt-1 scrollbar-hide">
            {transportSidebar.map((item) => (
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
                <span className="flex-1">{item}</span>

                <ChevronRight
                  size={15}
                  strokeWidth={2.2}
                  className={`
                    transition-all
                    duration-200
                    ${
                      active === item
                        ? "translate-x-0 opacity-100"
                        : "translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }
                  `}
                />
              </button>
            ))}

            {/* BACK TO MAIN */}
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
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              <span className="flex-1 text-left">Back to Main</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="lg:pl-[220px]">
        {/* NAVBAR */}
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
          <div className="flex h-full items-center gap-2 px-3 sm:px-5">
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
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* NAVBAR ITEMS */}
            <nav className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto scrollbar-hide">
              {transportNavbar.map((item) => (
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
              <LogOut size={19} strokeWidth={2.3} />
            </button>
          </div>
        </header>

        {/* MOBILE OVERLAY */}
        {open && (
          <button
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] lg:hidden"
            aria-label="Close menu"
          />
        )}

        {/* =================================================
            MAIN DASHBOARD BACKGROUND
            (full-bleed, fixed to content area, visible when no form is open)
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
            backgroundImage: "url('/images/transport-dashboard.jpg')",
          }}
        />

        {/* =====================================================
            FORM WINDOW
            Only appears once a sidebar/navbar item is clicked
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