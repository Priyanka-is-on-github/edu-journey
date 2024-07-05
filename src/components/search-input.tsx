import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'query-string';

function SearchInput() {
    const [value, setValue] = useState("");
    const [debouncedValue] = useDebounce(value);

    // console.log('db=',debouncedValue)

    const [params] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    const currentCategoryId = params.get("categoryId");

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
<Input  onChange={(e)=>setValue(e.target.value)}value={value} className='w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200' placeholder='search for course'/>
   </div>
  )
}

export default SearchInput;