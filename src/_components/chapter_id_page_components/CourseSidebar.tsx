import React from "react";
import CourseSidebarItem from './CourseSidebarItem'
import CourseProgress from "@/components/course-progress";


interface Chapter {

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
}

interface ChapterListProps{
  chapters:Chapter[];
  courseTitle: {title: string}
}




function CourseSidebar({ chapters, courseTitle } : ChapterListProps) {
  // const {userId} = auth();
  // if(!userId)
  // {
  //     Navigate('/')
  // }


  return (
    <div className="h-full  flex flex-col overflow-y-auto shadow-sm border-r  ">

      <div className=" flex flex-col border-b items-center p-7">

        <h1 className="font-semibold">{courseTitle.title}</h1>

        {/* {
          purchase && (
            <div className="mt-10"> 

              <CourseProgress variant='success' value={progressCount}/>

            </div>
          )
        } */}

      </div>

      <div className="flex flex-col w-full ">

        {chapters?.map((chapter) => (
          <CourseSidebarItem   
            key={chapter.id}
            chapterId={chapter.id}
            label={chapter.title}
           id={chapter.courseid}
            isLocked={!chapter.isfree}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseSidebar;
