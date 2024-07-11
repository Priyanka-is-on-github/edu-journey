import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from './CourseSidebar'
import { Menu } from 'lucide-react'
import React from 'react'

function CourseMobileSidebar({courseTitle, chapters}) {
    console.log(courseTitle)
  return (
  <Sheet>
    <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
        <Menu/>
    </SheetTrigger>

    <SheetContent side='left' className='p-0 bg-white w-72'>
        <CourseSidebar  courseTitle={courseTitle} chapters={chapters}/>
    </SheetContent>
  </Sheet>
  )
}

export default CourseMobileSidebar