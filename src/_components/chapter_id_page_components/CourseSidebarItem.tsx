import { cn } from '@/lib/utils';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface CourseSidebarItemPprops{
  label: string;
  id: number;
  chapterId: number;
  isLocked:boolean;
}

const  CourseSidebarItem =({label, id, chapterId, isLocked}: CourseSidebarItemPprops)=> {
  

  // const {id} = useParams();
  const navigate = useNavigate();
  const location = useLocation();


  // const Icon = isLocked? Lock : (isCompleted? CheckCircle: PlayCircle);

  const isActive =location.pathname?.includes(`${chapterId}`);
  

  const onClick =()=>{
    navigate(`/courses/${id}/chapters/${chapterId}`);
  }

  return (
    <button onClick={onClick} type='button' className={cn('flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',

   
     isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700 border-r-4  border-slate-700"
      // isCompleted && "text-emerald-700 hover:text-emerald-700",
      // isCompleted && isActive && 'bg-emerald-200/20'

     )}>
      <div className='flex items-center gap-x-2 py-4'>
        {/* <Icon size={22}  className={cn("text-slate-500", isActive && 'text-slate-700', isCompleted && "text-emerald-700")}/> */}
       < Lock/>
{label}

      </div>

      {/* <div className={cn('ml-auto opacity-0 border-2 border-slate-700 h-full transition-all', isActive && "opacity-100", isCompleted && "border-emerald-700")}/> */}
    </button>



  )
}

export default CourseSidebarItem