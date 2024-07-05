import React from 'react'
import { Navigate } from 'react-router-dom';
import CourseSidebar from '../_components/course_id_page_components'

function CourseLayout({children}: { children: React.ReactNode }) {

    // const {userId} = auth();
    // if(!userId)
    // {
    //     Navigate('/')
    // }
  return (
    <div className='h-full'>
        <div className='hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50'>
            
<CourseSidebar course={course} progressCount={progressCount}/>
            
        </div>
        <main className='md:pl-80 h-full'> 
                {children}
            </main>

    </div>
  )
}

export default CourseLayout