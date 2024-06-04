import DashboardLayout from "@/Layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CoursesPage = () => {
  return (
    <DashboardLayout>
      <Link to="/teacher/create">
        <Button>New course</Button>
      </Link>
    </DashboardLayout>
  );
};

export default CoursesPage;
