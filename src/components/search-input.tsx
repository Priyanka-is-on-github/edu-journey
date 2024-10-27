import  { useEffect, useState } from 'react'
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'query-string';



interface Course {
    categoryid: string;
    createdat: string;
    description: string;
    id: string;
    imageurl: string;
    ispublished: boolean;
    price: number;
    title: string;
    updatedat: string;
    userid: null | string;
    progress_percentage: number;
 


    
  };

  interface CourseProps{
    items:Course[];
  }
function SearchInput( {items}: CourseProps) {
    const [searchCourse, setSearchCourse] = useState("");
    const [debouncedValue] = useDebounce(searchCourse);

    // console.log('db=',debouncedValue)

    const [params] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    const currentCategoryId = params.get("categoryId");

    const SearchCourses =(text: string)=>{

        console.log('text=', text)

     const filterCourse =   items.filter((item)=>{

            return item?.title?.toLowerCase()?.includes(text?.toLowerCase())
        })

        console.log(filterCourse)
    }


    useEffect(()=>{

        const query = {
            categoryId: currentCategoryId,
            title: debouncedValue,
        };

        const url = qs.stringifyUrl({
            url:location.pathname,
            query
        }, {skipEmptyString: true , skipNull: true});

        navigate(url)
    },[debouncedValue, currentCategoryId, navigate, location.pathname])
    
  return (
   <div className='relative'>
<Search className='h-4 w-4 absolute top-3 left-3 text-slate-600'/>
<Input  onChange={(e)=>setSearchCourse(e.target.value)} value={searchCourse} className='w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200' placeholder='search for course'/>
   </div>
  )
}

export default SearchInput;