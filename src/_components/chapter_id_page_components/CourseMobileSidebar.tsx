import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from './CourseSidebar'
import { Menu } from 'lucide-react'
import React from 'react'


interface Chapters{

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
interface CourseTitle{
  title : string;
  chapters:Chapters[];
  progressCount: number;
}


function CourseMobileSidebar({title, chapters, progressCount} : CourseTitle) {
   
  return (
  <Sheet>
    <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
        <Menu/>
    </SheetTrigger>

    <SheetContent side='left' className='p-0 bg-white w-72'>
        <CourseSidebar  courseTitle={title} chapters={chapters}  progressCount={progressCount}/>
    </SheetContent>
  </Sheet>
  )
}

export default CourseMobileSidebar