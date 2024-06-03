/* eslint-disable react-hooks/exhaustive-deps */

import DashboardLayout from "@/Layout/layout";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface Course {
  id: string | null;
  userid: string | null;
  title: string | null;
  description: string | null;
  imageurl: string | null;
  price: string | null;
  ispublished: string | null;
  categoryid: string | null;
  createdat: string | null;
  updatedat: string | null;
}
const CourseIdPage = () => {
  const params = useParams();
  let newCourseFields: Course = {
    id: "",
    userid: "",
    title: "",
    description: "",
    imageurl: "",
    price: "",
    ispublished: "",
    categoryid: "",
    createdat: "",
    updatedat: "",
  };

  useEffect(() => {
    (async () => {
      try {
        const response: Response = await fetch(
          `http://localhost:3000/api/v1/courses/${params.id}`
        );
        newCourseFields = await response.json();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params]);

  const requiredFields = [
    newCourseFields.title,
    newCourseFields.description,
    newCourseFields.imageurl,
    newCourseFields.price,
    newCourseFields.categoryid,
  ];

  const totalFields: number = requiredFields.length;
  const completedFields: number = requiredFields.filter(Boolean).length;

  const completionText: string = `(${completedFields}/${totalFields})`;

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              {" "}
              Complete all fields {completionText}
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default CourseIdPage;
