import Navbar from "@/_components/navbar.tsx";
import Sidebar from "../_components/sidebar_components/sidebar.tsx";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full">
        <Navbar />
      </div>

      <div className="h-full hidden md:flex w-56 flex-col fixed inset-y-0 z-50 ">
        <Sidebar />
      </div>

      <main className="md:pl-56 pt-[80px] h-full ">{children}</main>
    </div>
  );
};

export default DashboardLayout;
