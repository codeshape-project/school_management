

// import { useState } from "react";

// import {
//   GraduationCap,
//   IndianRupee,
//   BusFront,
//   Library,
//   MessageSquare,
//   Hotel,
//   Package,
//   UsersRound,
//   UserRoundSearch,
//   HeartPulse,
//   WalletCards,
//   BadgeCheck,
//   LogOut,
//   Menu,
//   X,
//   ChevronRight,
//   FileBarChart2,
// } from "lucide-react";

// import { mainSidebar, mainNavbar } from "../data/menuData";

// const icons = {
//   Reports: FileBarChart2,
//   Student: GraduationCap,
//   Fee: IndianRupee,
//   Transport: BusFront,
//   Library,
//   SMS: MessageSquare,
//   Hostel: Hotel,
//   Store: Package,
//   "Staff & Salary": UsersRound,
//   Visitor: UserRoundSearch,
//   Health: HeartPulse,
//   Account: WalletCards,
//   "I-Card": BadgeCheck,
// };

// /* =========================================
//    SIDEBAR MODULE → NAVBAR MODULE
// ========================================= */

// const moduleMap = {
//   Reports: "Reports",
//   Student: "Student Management",
//   Fee: "Fee Management",
//   Transport: "Transport Management",
//   Library: "Library Mgt",
//   SMS: "PTM",
//   Hostel: "Hostel Mgt",
//   Store: "Store Mgt",
//   "Staff & Salary": "Salary",
//   Visitor: "HR",
//   Health: "Health",
//   Account: "Account",
//   "I-Card": "I-Card",
// };

// export default function MainDashboard({ onOpenModule, onLogout }) {
//   const [open, setOpen] = useState(false);
//   const [active, setActive] = useState(null);

//   /* =========================================
//      OPEN MODULE
//   ========================================= */

//   const handleModuleOpen = (item) => {
//     setActive(item);

//     const sidebarModule = mainSidebar.includes(item)
//       ? item
//       : Object.keys(moduleMap).find(
//           (key) => moduleMap[key] === item
//         );

//     onOpenModule(sidebarModule || item);
//     setOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-slate-100">

//       {/* ==================================================
//           SIDEBAR
//       ================================================== */}

//       <aside
//         className={`
//           fixed
//           inset-y-0
//           left-0
//           z-50
//           w-[220px]

//           bg-[#061a3a]
//           text-white

//           border-r
//           border-[#58bdf5]/20

//           shadow-[8px_0_30px_rgba(0,0,0,0.28)]

//           transition-transform
//           duration-300

//           lg:translate-x-0

//           ${
//             open
//               ? "translate-x-0"
//               : "-translate-x-full"
//           }
//         `}
//       >

//         <div className="flex h-full flex-col">

//           {/* ==================================================
//               SIDEBAR HEADER
//           ================================================== */}

//           <div
//             className="
//               flex
//               h-[100px]
//               shrink-0
//               flex-col
//               items-center
//               justify-center

//               border-b
//               border-[#58bdf5]/15

//               bg-gradient-to-b
//               from-[#08234d]
//               to-[#061a3a]
//             "
//           >

//             {/* LOGO */}

//             <div className="
//   h-16
//   w-16
//   overflow-hidden
//   rounded-full
  
//   border-[#f5d76e]/40
//   bg-white/10
//   p-1
//   shadow-[0_0_15px_rgba(245,215,110,0.18)]
// ">
//   <img
//     src="/images/logo.png"
//     alt="School logo"
//     className="h-full w-full rounded-full object-contain"
//   />
// </div>

//             {/* SCHOOL NAME */}

//             <p
//               className="
//                 mt-1.5
//                 text-sm
//                 font-black
//                 tracking-wide
//                 text-white
//               "
//             >
//               CodeShape Academy
//             </p>

//           </div>


//           {/* ==================================================
//               SIDEBAR MENU
//           ================================================== */}

//           <nav
//             className="
//               flex-1
//               space-y-1
//               overflow-y-auto

//               px-2
//               pb-4
//               pt-2

//               scrollbar-hide
//             "
//           >

//             {mainSidebar.map((item) => {

//               const Icon = icons[item];

//               /* ==================================================
//                   EXIT
//               ================================================== */

//               if (item === "Exit") {
//                 return (
//                   <button
//                     key={item}
//                     onClick={onLogout}
//                     className="
//                       group

//                       mt-3

//                       flex
//                       w-full
//                       items-center
//                       gap-3

//                       rounded-xl

//                       border
//                       border-[#ff1744]/35

//                       bg-[#ff1744]/5

//                       px-3
//                       py-2.5

//                       text-sm
//                       font-semibold

//                       text-[#ff1744]

//                       transition-all
//                       duration-200

//                       hover:border-[#ff1744]
//                       hover:bg-[#ff1744]
//                       hover:text-white

//                       hover:shadow-[0_0_20px_rgba(255,23,68,0.65)]

//                       hover:scale-[1.02]

//                       active:scale-[0.98]
//                     "
//                   >

//                     <LogOut
//                       size={18}
//                       strokeWidth={2.3}
//                       className="
//                         transition-transform
//                         duration-200
//                         group-hover:-translate-x-0.5
//                       "
//                     />

//                     <span className="flex-1 text-left">
//                       {item}
//                     </span>

//                   </button>
//                 );
//               }


//               /* ==================================================
//                   NORMAL MODULE
//               ================================================== */

//               return (
//                 <button
//                   key={item}
//                   onClick={() => handleModuleOpen(item)}
//                   className={`
//                     group

//                     flex
//                     w-full
//                     items-center
//                     gap-3

//                     rounded-xl

//                     border

//                     px-3
//                     py-2.5

//                     text-left
//                     text-sm
//                     font-semibold

//                     transition-all
//                     duration-200

//                     ${
//                       active === item
//                         ? `
//                           border-[#f5d76e]

//                           bg-gradient-to-r
//                           from-[#f8e8a8]
//                           to-[#f3d978]

//                           text-[#061a3a]

//                           shadow-[0_0_16px_rgba(245,215,110,0.32)]

//                           scale-[1.01]
//                         `
//                         : `
//                           border-transparent

//                           text-blue-50

//                           hover:border-[#58bdf5]/40

//                           hover:bg-[#102f59]

//                           hover:text-white

//                           hover:shadow-[0_0_14px_rgba(88,189,245,0.12)]

//                           hover:translate-x-[2px]
//                         `
//                     }
//                   `}
//                 >

//                   {/* ICON */}

//                   {Icon && (
//                     <Icon
//                       size={18}
//                       strokeWidth={2.2}
//                       className={`
//                         shrink-0

//                         transition-all
//                         duration-200

//                         ${
//                           active === item
//                             ? `
//                               text-[#0b2b55]

//                               drop-shadow-[0_0_4px_rgba(11,43,85,0.25)]
//                             `
//                             : `
//                               text-[#ffd75a]

//                               drop-shadow-[0_0_7px_rgba(255,215,90,0.65)]

//                               group-hover:text-[#ffe58a]

//                               group-hover:drop-shadow-[0_0_10px_rgba(255,215,90,0.9)]
//                             `
//                         }
//                       `}
//                     />
//                   )}

//                   {/* TEXT */}

//                   <span className="flex-1">
//                     {item}
//                   </span>

//                   {/* ARROW */}

//                   <ChevronRight
//                     size={15}
//                     strokeWidth={2.2}
//                     className={`
//                       transition-all
//                       duration-200

//                       ${
//                         active === item
//                           ? `
//                             translate-x-0
//                             opacity-100
//                           `
//                           : `
//                             translate-x-[-4px]
//                             opacity-0

//                             group-hover:translate-x-0
//                             group-hover:opacity-100
//                           `
//                       }
//                     `}
//                   />

//                 </button>
//               );
//             })}

//           </nav>

//         </div>
//       </aside>


//       {/* ==================================================
//           MAIN AREA
//       ================================================== */}

//       <div className="lg:pl-[220px]">


//         {/* ==================================================
//             PREMIUM NAVBAR
//         ================================================== */}

//         <header
//           className="
//             fixed
//             left-0
//             right-0
//             top-0
//             z-40

//             h-[54px]

//             bg-[#071d42]

//             border-b
//             border-[#58bdf5]/20

//             shadow-[0_5px_20px_rgba(0,0,0,0.25)]

//             lg:left-[220px]
//           "
//         >

//           <div
//             className="
//               flex
//               h-full
//               items-center
//               gap-2

//               px-3
//               sm:px-5
//             "
//           >

//             {/* ==================================================
//                 MOBILE MENU
//             ================================================== */}

//             <button
//               onClick={() => setOpen(!open)}
//               className="
//                 rounded-xl

//                 border
//                 border-[#58bdf5]/20

//                 bg-white/5

//                 p-1.5

//                 text-white

//                 transition-all
//                 duration-200

//                 hover:border-[#58bdf5]/60

//                 hover:bg-[#12315c]

//                 hover:shadow-[0_0_12px_rgba(88,189,245,0.25)]

//                 lg:hidden
//               "
//             >
//               {open ? (
//                 <X size={20} />
//               ) : (
//                 <Menu size={20} />
//               )}
//             </button>


//             {/* ==================================================
//                 NAVBAR ITEMS
//             ================================================== */}

//             <nav
//               className="
//                 flex
//                 min-w-0
//                 flex-1
//                 gap-1.5

//                 overflow-x-auto

//                 scrollbar-hide
//               "
//             >

//               {mainNavbar.map((item) => (

//                 <button
//                   key={item}
//                   onClick={() => handleModuleOpen(item)}
//                   className={`
//                     group

//                     shrink-0

//                     rounded-lg

//                     border

//                     px-3
//                     py-1.5

//                     text-xs
//                     font-semibold

//                     transition-all
//                     duration-200

//                     ${
//                       active === item
//                         ? `
//                           border-[#f5d76e]

//                           bg-gradient-to-r
//                           from-[#f8e8a8]
//                           to-[#f3d978]

//                           text-[#061a3a]

//                           shadow-[0_0_14px_rgba(245,215,110,0.35)]
//                         `
//                         : `
//                           border-transparent

//                           text-blue-50

//                           hover:border-[#58bdf5]/50

//                           hover:bg-[#12315c]

//                           hover:text-[#ffd75a]

//                           hover:shadow-[0_0_12px_rgba(88,189,245,0.16)]
//                         `
//                     }
//                   `}
//                 >

//                   {item}

//                 </button>

//               ))}

//             </nav>


//             {/* ==================================================
//                 EXIT BUTTON
//             ================================================== */}

//             <button
//               onClick={onLogout}
//               className="
//                 group

//                 shrink-0

//                 rounded-xl

//                 border
//                 border-[#ff1744]/35

//                 bg-[#ff1744]/5

//                 p-2

//                 text-[#ff1744]

//                 transition-all
//                 duration-200

//                 hover:border-[#ff1744]

//                 hover:bg-[#ff1744]

//                 hover:text-white

//                 hover:shadow-[0_0_18px_rgba(255,23,68,0.75)]

//                 hover:scale-105

//                 active:scale-95
//               "
//               title="Exit"
//             >

//               <LogOut
//                 size={19}
//                 strokeWidth={2.3}
//               />

//             </button>

//           </div>

//         </header>


//         {/* ==================================================
//             MOBILE OVERLAY
//         ================================================== */}

//         {open && (
//           <button
//             onClick={() => setOpen(false)}
//             className="
//               fixed
//               inset-0
//               z-40

//               bg-black/45

//               backdrop-blur-[2px]

//               lg:hidden
//             "
//             aria-label="Close menu"
//           />
//         )}


//         {/* ==================================================
//             MAIN CONTENT
//         ================================================== */}

//         <main
//           className="
//             fixed

//             bottom-0
//             left-0
//             right-0
//             top-[54px]

//             overflow-hidden

//             bg-cover
//             bg-center
//             bg-no-repeat

//             lg:left-[220px]
//           "
//           style={{
//             backgroundImage:
//               "url('/images/main-dashboard.jpg')",
//           }}
//         >

//           {/* SUBTLE OVERLAY */}

//           <div
//             className="
//               absolute
//               inset-0

//               bg-[#061a3a]/5

//               pointer-events-none
//             "
//           />

//         </main>

//       </div>

//     </div>
//   );
// }



import { useState } from "react";

import {
  GraduationCap,
  IndianRupee,
  BusFront,
  Library,
  MessageSquare,
  Hotel,
  Package,
  UsersRound,
  UserRoundSearch,
  HeartPulse,
  WalletCards,
  BadgeCheck,
  LogOut,
  Menu,
  X,
  ChevronRight,
  FileBarChart2,
} from "lucide-react";

import { mainSidebar, mainNavbar } from "../data/menuData";
import ReportDashboard from "./ReportDashboard";

const icons = {
  Reports: FileBarChart2,
  Student: GraduationCap,
  Fee: IndianRupee,
  Transport: BusFront,
  Library,
  SMS: MessageSquare,
  Hostel: Hotel,
  Store: Package,
  "Staff & Salary": UsersRound,
  Visitor: UserRoundSearch,
  Health: HeartPulse,
  Account: WalletCards,
  "I-Card": BadgeCheck,
};

/* =========================================
   SIDEBAR MODULE → NAVBAR MODULE
========================================= */

const moduleMap = {
  Reports: "Reports",
  Student: "Student Management",
  Fee: "Fee Management",
  Transport: "Transport Management",
  Library: "Library Mgt",
  SMS: "PTM",
  Hostel: "Hostel Mgt",
  Store: "Store Mgt",
  "Staff & Salary": "Salary",
  Visitor: "HR",
  Health: "Health",
  Account: "Account",
  "I-Card": "I-Card",
};

export default function MainDashboard({ onOpenModule, onLogout }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  /* =========================================
     OPEN MODULE
  ========================================= */

  const handleModuleOpen = (item) => {
    setActive(item);

    const sidebarModule = mainSidebar.includes(item)
      ? item
      : Object.keys(moduleMap).find(
          (key) => moduleMap[key] === item
        );

    onOpenModule(sidebarModule || item);
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ==================================================
          SIDEBAR
      ================================================== */}

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

          {/* ==================================================
              SIDEBAR HEADER
          ================================================== */}

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

            {/* LOGO */}

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

            {/* SCHOOL NAME */}

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


          {/* ==================================================
              SIDEBAR MENU
          ================================================== */}

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

            {mainSidebar.map((item) => {

              const Icon = icons[item];

              /* ==================================================
                  EXIT
              ================================================== */

              if (item === "Exit") {
                return (
                  <button
                    key={item}
                    onClick={onLogout}
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
                      {item}
                    </span>

                  </button>
                );
              }


              /* ==================================================
                  NORMAL MODULE
              ================================================== */

              return (
                <button
                  key={item}
                  onClick={() => handleModuleOpen(item)}
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

          </nav>

        </div>
      </aside>


      {/* ==================================================
          MAIN AREA
      ================================================== */}

      <div className="lg:pl-[220px]">


        {/* ==================================================
            PREMIUM NAVBAR
        ================================================== */}

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

            {/* ==================================================
                MOBILE MENU
            ================================================== */}

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


            {/* ==================================================
                NAVBAR ITEMS
            ================================================== */}

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

              {mainNavbar.map((item) => (

                <button
                  key={item}
                  onClick={() => handleModuleOpen(item)}
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


            {/* ==================================================
                EXIT BUTTON
            ================================================== */}

            <button
              onClick={onLogout}
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
              title="Exit"
            >

              <LogOut
                size={19}
                strokeWidth={2.3}
              />

            </button>

          </div>

        </header>


        {/* ==================================================
            MOBILE OVERLAY
        ================================================== */}

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


        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

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
              "url('/images/main-dashboard.jpg')",
          }}
        >

          {/* SUBTLE OVERLAY */}

          <div
            className="
              absolute
              inset-0

              bg-[#061a3a]/5

              pointer-events-none
            "
          />

          {/* ==================================================
              REPORT MODULE
              Opens inside the same MainDashboard content area.
          ================================================== */}

          <div className="relative z-10 h-full w-full p-2 sm:p-3">
            {active === "Reports" && (
              <ReportDashboard
                onBack={() => setActive(null)}
                onClose={() => setActive(null)}
              />
            )}
          </div>

        </main>

      </div>

    </div>
  );
}