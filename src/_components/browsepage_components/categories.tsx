import React from 'react'
import {FcEngineering, FcFilmReel, FcMultipleDevices, FcMusic, FcOldTimeCamera, FcSalesPerformance, FcSportsMode} from 'react-icons/fc'
import {IconType} from 'react-icons'
import CategoryItem from './category-item';

interface CategoriesProps{
    items: {id:string; name:string}[];
}

const iconMap: Record<string, IconType>={
// "Music": FcMusic,
"Photography": FcOldTimeCamera,
"Fitnes":FcSportsMode,
// "Accounting" : FcSalesPerformance,
"Computer Science" : FcMultipleDevices,
"Filming": FcFilmReel,
"Engineering":FcEngineering,


}

function Categories({items}:CategoriesProps) {

  return (
    <div className='flex items-center gap-x-2 averflow-x-auto pb-2'>
        {items.map((item)=>{

            return ( <CategoryItem
                key={item.id}
                value={item.id}
                icon={iconMap[item.name]}
                label={item.name}
                />)
           
        })}
    </div>
  )
}

export default Categories