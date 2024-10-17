import CoursesList from "@/components/course-list";
import { IconBadge } from "@/components/icon-badge";
import DashboardLayout from "@/Layout/layout";
import { useUser } from "@clerk/clerk-react";
import { CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isSignedIn, user} = useUser();

  const [CoursesInProgress, setCoursesInProgress] = useState(0);
  const [ completedCourses, setCompletedCourses] = useState(0)

const [purchasedCourses, setPurchasedCourses] = useState<
{
  categoryid: string;
  createdat: string;
  description: string;
  id: string;
  imageurl: string;
  ispublished: boolean;
  price: number;
  title: string;
  updatedat: string;
  userid: null | string;
  progress_percentage: number;

}[]

>([])

  useEffect(() => {
    if (!isSignedIn) {
      return navigate("/search");
    }
    (
      async () => {
      try {
        const purchasedCourses = await fetch(
          "http://localhost:3001/api/v1/getpurchase/getpurchased",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              userId: `${user?.id}`,
            },
          }
        );

        const Courses = await purchasedCourses.json();
        setCompletedCourses(Courses.completedCount)
        setCoursesInProgress(Courses.progress)
      console.log('course=', Courses)
       setPurchasedCourses(Courses.courses)
       
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

 

  return (
    <DashboardLayout>
      <div className="p-6 space-y-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="border rounded-md flex items-center gap-x-2 p-3">
           
            <IconBadge icon={Clock} />
            <div>
            <p className="font-medium">In Progress</p>
           
           
           <p className="text-gray-500 text-sm">{CoursesInProgress} {CoursesInProgress ===1 ? " Course" : "Courses"}</p> 
            </div>
            
          </div>

          <div className="border rounded-md flex items-center gap-x-2 p-3">
            <IconBadge variant="success" icon={CheckCircle} />
            <div>
            <p className="font-medium"> Completed</p>
            <p className="text-gray-500 text-sm">{completedCourses} {completedCourses ===1 ? " Chapter" : "Chapters"}</p> 
            </div>
            
          </div>

        </div>


        <CoursesList items={purchasedCourses}/>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
