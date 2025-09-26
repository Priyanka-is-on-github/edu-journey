import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import CourseSidebar from "../_components/chapter_id_page_components/CourseSidebar.js";
import CourseNavbar from "@/_components/chapter_id_page_components/course-navbar.js";
import { useUser } from "@clerk/clerk-react";
import { createContext } from "react";

export const ProgressCountContext  = createContext<
{setProgressCount: React.Dispatch<React.SetStateAction<number>>;}
>({
  setProgressCount: ()=>{}
});

function CourseLayout({ children }: { children: React.ReactNode }) {
 
  const {user} = useUser()
  const { id} = useParams();
  const [publishedChapter, setPublishedChapter] = useState<
    {
      courseid: number;
      createdat: string;
      description: string;
      id: number;
      isfree: boolean;
      ispublished: boolean;
      muxdata: null;
      position: number;
      title: string;
      updatedat: string;
      videourl: string;
    }[]
  >([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [progressCount, setProgressCount] = useState(0.0);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/getcourses/publishedchapters/${id}`
        );

        const publishedChapters = await response.json();
        setPublishedChapter(publishedChapters);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);


  useEffect(() => {
    // if (!user?.id) return; // Wait until user is available

    (async () => {
      try {


        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/getcourses/coursetitle/${id}`
        );
        const title = await response.json();

        setCourseTitle(title.title);

        const progressPercentage = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/getprogress/progressPercentage?courseId=${id}&userId=${user?.id}`
        );

        const progressPercentageCount = await progressPercentage.json();
        const progressPercentageValue =progressPercentageCount.progressPercentage;
      

        setProgressCount(progressPercentageValue);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user, id]);

  
  return (
    <ProgressCountContext.Provider value={{setProgressCount}}>
    <div className="h-full"> 
      <div className="h-[80px] md:pl:80 fixed inset-y-0 w-full z-50">
        <CourseNavbar
          title={courseTitle}
          chapters={publishedChapter}
          progressCount={progressCount}
        />

      </div>

      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 bg-white ">
        <CourseSidebar  
          courseTitle={courseTitle} 
          chapters={publishedChapter}
          progressCount={progressCount}
        />
      </div>

      <main className="md:pl-80 pt-[80px] h-full">{children}</main> 
    </div>
    </ProgressCountContext.Provider>
  );
}

export default CourseLayout;
