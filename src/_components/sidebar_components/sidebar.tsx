import Logo from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className=" border-r overflow-y-auto bg-white h-full hidden md:flex w-56 flex-col fixed inset-y-0 z-50">
      <div className="p-6">
        <Logo />
      </div>

      <div className="flex flex-col w-full ">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
