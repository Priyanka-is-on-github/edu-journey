import DashboardLayout from "@/Layout/layout";
import Categories from "@/_components/browsepage_components/categories";
import CoursesList from "@/components/course-list";
import SearchInput from "@/components/search-input";
import { useEffect, useState } from "react";
import { createContext } from "react";


type Course = {
  categoryid: string;
  createdat: string;
  description: string;
  id: string;
  imageurl: string;
  ispublished: boolean;
  price: number;
  title: string;
  updatedat: string;
  userid: string | null;
  progress_percentage: number;
};


export const setCoursesContext = createContext<{setCourses: React.Dispatch<React.SetStateAction<Course[]>>;}>({setCourses : ()=>{}})
// interface SearchPageProps {
//   searchParams: {
//     title: string;
//     categoryId: string;
//   };
// }
const SearchPage = () => {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [courses, setCourses] = useState<
  Course[]
  >([]);

 

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/category`);

      const category = await response.json();

      setCategories(category);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/getcourses/publishedcourses`
        );
        const publishedCourses = await response.json();

        setCourses(publishedCourses);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <DashboardLayout>
      <setCoursesContext.Provider value={{setCourses}}>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput courses={courses} setCourses={setCourses}/>
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
      </div>

       <CoursesList items={courses} loading={loading}/>
      
    
      </setCoursesContext.Provider>
    </DashboardLayout>
  );
};

export default SearchPage;
