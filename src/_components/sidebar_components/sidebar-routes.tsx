

import { BarChart, Compass, Layout, List } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const guestRoutes = [
  {
    label: "Dashboard",
    icon: <Layout />,
    link: "/",
  },

  {
    icon: <Compass />,
    label: "Browse",
    link: "/search",
  },
];

const teacherRoutes = [
  {
    icon: <List />,
    label: "Courses",
    link: "/teacher/courses",
  },

  {
    icon: <BarChart />,
    label: "Analytics",
    link: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  // const routes = guestRoutes;
  const { pathname } = useLocation();
  console.log("pathname=", pathname);
  const routes =
    pathname === "/" || pathname === "/search" ? guestRoutes : teacherRoutes;

  // const isActiveRoute = (routeLink) => {
  //   return pathname.startsWith(routeLink);
  // };

  return (
    <>
      <div className="flex flex-col w-full ">
        {routes.map((route) => (
          <Link key={route.label} to={route.link}>
            <div
              key={route.label}
              className={`flex item-center gap-x-2 text-slate-500 text-smfont-[500] pl-6 transition-all 
               hover:text-slate-600 hover:bg-slate-300/20  ${
                 pathname === route.link
                   ? "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700 border-r-4  border-sky-700"
                   : ""
               }`}
            >
              <div
                className={`flex items-center gap-x-2 py-4 ${
                  pathname === route.link ? "text-sky-700" : ""
                }`}
              >
                {route.icon} {route.label}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
