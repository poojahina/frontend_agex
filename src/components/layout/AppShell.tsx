import { Bell, Bot, ChevronLeft, ChevronRight, Globe2, LogOut, Menu, User } from "lucide-react";
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
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy text-white shadow-lg">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 15% 30%, #2588D8 0, transparent 26%), radial-gradient(circle at 80% 0%, #36B4DD 0, transparent 18%)" }} />
        <div className="relative flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button className="btn h-10 w-10 px-0 text-white md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10"><Bot size={22} /></div>
            <div>
              <div className="text-sm font-bold">Amplifier for Agentic AI</div>
              <div className="text-xs text-white/70">{current}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn h-10 w-10 px-0 text-white" aria-label="Language"><Globe2 size={18} /></button>
            <button className="btn h-10 w-10 px-0 text-white" aria-label="Notifications"><Bell size={18} /></button>
            <button className="btn btn-secondary hidden border-white/20 bg-white/10 text-white hover:text-white sm:inline-flex"><User size={16} /> Hina saxena</button>
            <button className="btn h-10 w-10 px-0 text-white" aria-label="Logout"><LogOut size={18} /></button>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className={cn("sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 border-r border-border bg-white transition-all md:block", collapsed ? "w-20" : "w-72")}>
          <SidebarContent collapsed={collapsed} onToggle={toggle} />
        </aside>
        {mobileOpen ? <div className="fixed inset-0 z-50 bg-navy/45 md:hidden" onClick={() => setMobileOpen(false)}><aside className="h-full w-80 bg-white" onClick={(e) => e.stopPropagation()}><SidebarContent collapsed={false} onToggle={() => setMobileOpen(false)} /></aside></div> : null}
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
      <button className="btn btn-secondary mb-3 hidden justify-center md:flex" onClick={onToggle}>
        {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /> Collapse</>}
      </button>
      <nav className="space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => cn("flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-muted transition hover:bg-blue-50 hover:text-enterprise", isActive && "bg-blue-50 text-enterprise shadow-sm")}>
            <Icon size={19} className="shrink-0" />
            {!collapsed ? <span>{label}</span> : null}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto rounded-lg border border-border bg-page p-3 text-xs text-muted">
        {!collapsed ? "Demo mode: mock services only. No production credentials stored." : "Demo"}
      </div>
    </div>
  );
}
