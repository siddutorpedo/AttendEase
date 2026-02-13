import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { SidebarProvider, useSidebar } from "../contexts/SidebarContext";

function MainLayoutContent() {
  const { isCollapsed, toggleCollapse } = useSidebar();
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`flex-shrink-0 border-r bg-white ${isCollapsed ? "w-[72px]" : "w-[260px]"}`}>
        <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default function MainLayout() {
  return (
    <SidebarProvider>
      <MainLayoutContent />
    </SidebarProvider>
  );
}
