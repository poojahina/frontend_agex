import { Bell, Bot, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Globe2, LogOut, Menu, Search, User } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { cn } from "../../utils/cn";
import { navItems } from "./navItems";

export function AppShell() {
  const collapsed = useAppStore((state) => state.sidebarCollapsed);
  const toggle = useAppStore((state) => state.toggleSidebar);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const current = navItems.find((item) => item.to === location.pathname || (item.to !== "/" && location.pathname.startsWith(item.to)))?.label ?? "Home";

  return (
    <div className="min-h-screen bg-page">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-deep text-white shadow-lg">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button className="btn h-9 w-9 px-0 text-white md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-electric text-deep"><Bot size={18} /></div>
            <div>
              <div className="text-sm font-bold tracking-wide">AMPLIFIER</div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-white/60">Agent operations</div>
            </div>
          </div>
          <div className="hidden max-w-md flex-1 px-8 lg:block">
            <label className="flex h-9 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 text-white/70 focus-within:border-white/40" aria-label="Search">
              <Search size={16} /><input className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50" placeholder="Search workflows, agents, runs" />
            </label>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn h-9 w-9 px-0 text-white/80 hover:bg-white/10 hover:text-white" aria-label="Help"><CircleHelp size={17} /></button>
            <button className="btn relative h-9 w-9 px-0 text-white/80 hover:bg-white/10 hover:text-white" aria-label="Notifications"><Bell size={17} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-zest-green" /></button>
            <button className="btn hidden border-white/15 bg-white/10 text-white hover:bg-white/15 hover:text-white sm:inline-flex"><User size={15} /> Hina Saxena <ChevronDown size={14} /></button>
            <button className="btn h-9 w-9 px-0 text-white/80 hover:bg-white/10 hover:text-white" aria-label="Logout"><LogOut size={17} /></button>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className={cn("sticky top-14 hidden h-[calc(100vh-3.5rem)] shrink-0 border-r border-deep bg-deep text-white transition-all md:block", collapsed ? "w-16" : "w-64")}>
          <SidebarContent collapsed={collapsed} onToggle={toggle} />
        </aside>
        {mobileOpen ? <div className="fixed inset-0 z-50 bg-navy/45 md:hidden" onClick={() => setMobileOpen(false)}><aside className="h-full w-80 bg-deep text-white" onClick={(e) => e.stopPropagation()}><SidebarContent collapsed={false} onToggle={() => setMobileOpen(false)} /></aside></div> : null}
        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <div className="flex h-full flex-col p-3">
      <button className="btn mb-3 hidden justify-center border-b border-white/10 text-white/75 hover:bg-white/10 hover:text-white md:flex" onClick={onToggle}>
        {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /> Collapse</>}
      </button>
      <nav className="space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => cn("flex min-h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white", isActive && "bg-electric font-semibold text-deep shadow-sm")}>
            <Icon size={19} className="shrink-0" />
            {!collapsed ? <span>{label}</span> : null}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto rounded-md border border-white/10 bg-white/10 p-3 text-xs text-white/70">
        {!collapsed ? <><span className="mb-1 flex items-center gap-2 font-semibold text-brand-zest-green"><span className="h-2 w-2 rounded-full bg-brand-zest-green" /> Platform healthy</span><span>US East / Production</span></> : <span className="mx-auto block h-2 w-2 rounded-full bg-brand-zest-green" />}
      </div>
    </div>
  );
}
