import React from 'react'
import { Navigate } from 'react-router-dom';

function CourseLayout({children}: { children: React.ReactNode }) {

    // const {userId} = auth();
    // if(!userId)
    // {
    //     Navigate('/')
    // }
  return (
    <>
    {children}
    
    </>
  )
}

export default CourseLayout