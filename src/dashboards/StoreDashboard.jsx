import { useState } from "react";
import { Menu, X, ChevronRight, LogOut } from "lucide-react";

const items = ["Purchase", "Stock", "Issue", "Reports"];

export default function StoreDashboard({ onBack }) {
  const [active, setActive] = useState(items[0]);
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-100">
      <aside className={`fixed inset-y-0 left-0 z-50 w-[245px] bg-schoolBlue text-white shadow-2xl transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex h-[110px] shrink-0 flex-col items-center justify-center border-b border-white/10">
            <div className="h-12 w-12 overflow-hidden rounded-xl bg-white/10 p-1"><img src="/images/logo.png" alt="School logo" className="h-full w-full object-contain"/></div>
            <p className="mt-1.5 text-sm font-black">School Name</p>
          </div>
          <p className="px-4 pb-2 pt-4 text-[10px] font-bold uppercase tracking-[.2em] text-blue-200">Store Management</p>
          <nav className="flex-1 space-y-1 px-2">
            {items.map(item => <button key={item} onClick={() => {setActive(item);setOpen(false)}} className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-semibold ${active === item ? "bg-schoolCream text-schoolBlue" : "text-blue-50 hover:bg-schoolCream hover:text-schoolBlue"}`}><span className="flex-1 text-left">{item}</span><ChevronRight size={14}/></button>)}
            <button onClick={onBack} className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-blue-50 hover:bg-schoolCream hover:text-schoolBlue"><LogOut size={17}/> Back to Main</button>
          </nav>
        </div>
      </aside>
      <div className="lg:pl-[245px]">
        <header className="fixed left-0 right-0 top-0 z-40 h-[68px] bg-schoolBlue shadow-lg lg:left-[245px]">
          <div className="flex h-full items-center gap-2 px-3 sm:px-5">
            <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-white lg:hidden">{open ? <X size={21}/> : <Menu size={21}/>}</button>
            <nav className="flex flex-1 gap-1 overflow-x-auto">
              {["Master","Entry","Reports","Setup","User","Exit"].map(x => <button key={x} className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-blue-50 hover:bg-schoolCream hover:text-schoolBlue">{x}</button>)}
            </nav>
          </div>
        </header>
        {open && <button onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/40 lg:hidden"/>}
        <main className="min-h-screen bg-cover bg-center bg-fixed px-2 pb-5 pt-[68px] sm:px-4" style={{backgroundImage:"linear-gradient(rgba(239,246,250,.72),rgba(239,246,250,.91)),url('/images/store-dashboard.jpg')"}}>
          <div className="border-x border-b border-white/80 bg-white/95 px-4 py-5 shadow-lg">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-schoolBlue">Store Management</p>
            <h1 className="mt-1 text-2xl font-black text-slate-800">{active}</h1>
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">This module is ready for its detailed forms. Select a section from the sidebar.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}