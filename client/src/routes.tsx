import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Error from "./pages/error";
import SearchPage from "./pages/browse";
import CoursePage from "./pages/courses";
import Analytics from "./pages/analytics";

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
    element: <CoursePage />,
    errorElement: <Error />,
  },
  {
    path: "/teacher/analytics",
    element: <Analytics />,
    errorElement: <Error />,
  },
]);
export default router;
