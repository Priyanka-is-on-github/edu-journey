import NavbarRoutes from '@/components/navbar-routes'
import CourseMobileSidebar from './CourseMobileSidebar'



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


function CourseNavbar({title  , chapters, progressCount} : CourseTitle) {

  
  return (

    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>

        <CourseMobileSidebar title={title} chapters={chapters} progressCount={progressCount}/>
        <NavbarRoutes/>
    </div>
  )
}

export default CourseNavbar