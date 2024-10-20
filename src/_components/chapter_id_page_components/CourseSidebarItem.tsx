import { cn } from '@/lib/utils';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

interface CourseSidebarItemPprops{
  label: string;
  id: number;
  chapterId: number;
  isLocked:boolean;
 
  purchased:boolean;
}

const  CourseSidebarItem =({label, id, chapterId, isLocked,   purchased}: CourseSidebarItemPprops)=> {

  const navigate = useNavigate();  
  const location = useLocation();
 const [isCompleted, setIsCompleted] = useState(false)
  const { user} = useUser()



let Icon;

if(purchased){
   Icon = purchased? (isCompleted? CheckCircle: PlayCircle): Lock;
}else{
   Icon = isLocked? Lock : (isCompleted? CheckCircle: PlayCircle);
}
   
   

  const isActive =location.pathname?.includes(`${chapterId}`);
  

  const onClick =()=>{
    navigate(`/courses/${id}/chapters/${chapterId}`);
    
  
    
  }

  useEffect(()=>{ 
    console.log('useffect run')
    if (!user?.id) return; // Wait until user is available

    try {
      (async()=>{
        const chapterCompleted = await fetch( 
          `${import.meta.env.VITE_SERVER_URL}/api/v1/getprogress/chapterCompleted?chapterId=${chapterId}&userId=${user?.id}`
        );
        const completeChapter = await chapterCompleted.json();
       
        setIsCompleted(completeChapter?.iscompleted);
      })()
    } catch (error) {
      console.log(error)
    }
   
  }) 

  return (
  

  
    <button onClick={onClick} type='button' className={cn('flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',
 
   
     isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700 ",
       isCompleted && "text-emerald-700 hover:text-emerald-700",
       isCompleted && isActive && 'bg-emerald-200/20',

     )}>
      <div className='flex items-center gap-x-2 py-4'>
         <Icon   className={cn("text-slate-500", isActive && 'text-slate-700', isCompleted && "text-emerald-700")}/> 
      
{label}

      </div>

     <div className={cn('ml-auto opacity-0 border-2 border-slate-700 h-full transition-all', isActive && "opacity-100", isCompleted && "border-emerald-700")}/> 
    </button>

  

    

  )
}

export default CourseSidebarItem