import { cn } from '@/lib/utils';
import React from 'react'

import {IconType} from 'react-icons'

interface CategoryItemProps{
    label:string;
    value?:string;
    icon?:IconType;
}
function CategoryItem({label, value, icon:Icon}:CategoryItemProps) {
  return (
       <button className={cn("py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition" ) } type='button'>
        {Icon && <Icon size={20}/>}
        <div className='truncate'>
            {label}
        </div> 
       </button>
  )
}

export default CategoryItem;