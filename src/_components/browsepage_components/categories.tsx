import {FcEngineering, FcFilmReel, FcGallery, FcMoneyTransfer, FcMultipleDevices, FcMusic, FcOldTimeCamera, FcReadingEbook, FcSalesPerformance, FcSettings, FcSportsMode} from 'react-icons/fc'
import { MdFunctions } from 'react-icons/md';
import {IconType} from 'react-icons'
import CategoryItem from './category-item';

interface CategoriesProps{
    items: {id:string; name:string}[];
}

const iconMap: Record<string, IconType>={
"Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  "Filming": FcFilmReel,
  "Engineering": FcEngineering,
  "Mathematics": MdFunctions,
  "Business & Finance": FcMoneyTransfer,
  "Art & Design": FcGallery,
  "Technology": FcSettings,
  "Language & Linguistics": FcReadingEbook,


}

function Categories({items}:CategoriesProps) {

  return (
    <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
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