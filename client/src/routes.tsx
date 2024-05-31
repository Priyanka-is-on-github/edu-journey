import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard_folder/dashboard";
import Error from "./pages/error";
import SearchPage from "./pages/dashboard_folder/browse";
import CoursesPage from "./pages/teacher_folder/courses";
import Analytics from "./pages/teacher_folder/analytics";
import CreatePage from "./pages/teacher_folder/create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <Error />,
  },

  {
    path: "/search",
    element: <SearchPage />,
    errorElement: <Error />,
  },

  {
    path: "/teacher/courses",
    element: <CoursesPage />,
    errorElement: <Error />,
  },
  {
    path: "/teacher/analytics",
    element: <Analytics />,
    errorElement: <Error />,
  },

  {
    path: "teacher/create",
    element: <CreatePage />,
    errorElement: <Error />,
  },
]);
export default router;
