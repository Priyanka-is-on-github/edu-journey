import Logo from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

// Sidebar.tsx with conditional prop
interface SidebarProps {
  isMobile?: boolean;
}

const Sidebar = ({ isMobile = false }: SidebarProps) => {
  return (
    <div className={`border-r overflow-y-auto bg-white h-full w-56 flex-col fixed inset-y-0 z-50  ${isMobile ? 'flex' : 'hidden md:flex'}`}>
      <div className="p-6">
        <Logo />
      </div>

      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar