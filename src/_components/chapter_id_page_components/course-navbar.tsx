import NavbarRoutes from '@/components/navbar-routes'
import React from 'react'
import CourseMobileSidebar from './CourseMobileSidebar'

function CourseNavbar({courseTitle, chapters}) {

  
  return (

    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>

        <CourseMobileSidebar courseTitle={courseTitle} chapters={chapters}/>
        <NavbarRoutes/>
    </div>
  )
}

export default CourseNavbar