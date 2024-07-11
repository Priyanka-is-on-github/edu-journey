import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseSidebar from '../_components/chapter_id_page_components/CourseSidebar.js' 
import CourseNavbar from "@/_components/chapter_id_page_components/course-navbar.js";

function CourseLayout({ children }: { children: React.ReactNode }) {
  // const {userId} = auth();
  // if(!userId)
  // {
  //     Navigate('/')
  // }
  
  const params= useParams()
  const [publishedChapter, setPublishedChapter ]= useState<{
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
  }[]>([])
  const [courseTitle, setCourseTitle] = useState<{title:string}>({title:''})

console.log('params=',params)

  useEffect(()=>{
    (async()=>{
      try {
        const response = await fetch(`http://localhost:3001/api/v1/getcourses/publishedchapters/${params.id}`)


        const publishedChapters = await response.json();
        setPublishedChapter(publishedChapters)

      } catch (error) {

        console.log(error)
      }

    })()
  },[])

  useEffect(()=>{
  (async()=>{

    try {
      const response = await fetch(`http://localhost:3001/api/v1/getcourses/coursetitle/${params.id}`)
      const title = await response.json()

      setCourseTitle(title)

    } catch (error) {
      console.log(error)
    }
   

  })()
  },[])


  return (
    <div className="h-full">
    

      <div className="h-[80px] md:pl:80 fixed inset-y-0 w-full z-50">
    <CourseNavbar courseTitle ={courseTitle} chapters={publishedChapter}/>
      </div>

      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 bg-white ">
        {/* <CourseSidebar course={course} progressCount={progressCount}/> */}

        <CourseSidebar courseTitle ={courseTitle} chapters={publishedChapter}/>
  
      </div>

      <main className="md:pl-80 pt-[80px] h-full">{children}</main>

    </div>
  );
}

export default CourseLayout;
