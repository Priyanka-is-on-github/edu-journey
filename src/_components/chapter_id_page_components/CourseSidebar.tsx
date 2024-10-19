import  { useEffect, useState } from "react";
import CourseSidebarItem from "./CourseSidebarItem";
import CourseProgress from "@/components/course-progress";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";




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

interface ChapterListProps {
  chapters: Chapter[];
  courseTitle: string;
  progressCount: number;
}

function CourseSidebar({
  courseTitle,
  chapters,
  progressCount,
}: ChapterListProps) {
  
  const { chapterId, id } = useParams();
  const { user} = useUser();

  const [purchase, setPurchase] = useState(false);
 
  
  // const {userId} = auth();
  // if(!userId)
  // {
  //     Navigate('/')
  // }
 
  useEffect(() => {
    if (!user?.id) return; // Wait until user is available
      
    
        
      
    (async () => {
      try {
        const purchase_response = await fetch( 
          `${import.meta.env.SERVER_URL}/api/v1/getpurchase/coursePurchase?courseId=${id}`
        );

        const purchase = await purchase_response.json();
        setPurchase(purchase);

      
       
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user, chapterId]);

  return (
  
    <div className="h-full  flex flex-col overflow-y-auto shadow-sm border-r  ">
      <div className=" flex flex-col border-b items-center p-7 ">
        <h1 className="font-semibold ">{courseTitle}</h1>

        {purchase && (
          <div className="mt-10   w-[100%]">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>

      <div className="flex flex-col w-full ">
        {chapters?.map((chapter) => (  
          <CourseSidebarItem   
            key={chapter.id}
            chapterId={chapter.id}
            label={chapter.title}
            id={chapter.courseid}
            isLocked={!chapter.isfree}
        
            purchased={purchase}
          />
        ))}
      </div>
    </div>
    
  );
}

export default CourseSidebar;
