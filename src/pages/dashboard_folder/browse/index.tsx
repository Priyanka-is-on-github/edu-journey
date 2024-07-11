import DashboardLayout from "@/Layout/layout";
import Categories from "@/_components/browsepage_components/categories";
import CoursesList from "@/components/course-list";
import SearchInput from "@/components/search-input";
import { useEffect, useState } from "react";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const SearchPage = ({ searchParams }: SearchPageProps) => {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [courses, setCourses] = useState<
    {
      categoryid: string;
      createdat: string;
      description: string;
      id: string;
      imageurl: string;
      ispublished: boolean;
      price: number;
      title: string;
      updatedat: string;
      userid: null;
    }[]
  >([]);

  
 

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3001/api/v1/category");

      const category = await response.json();

      setCategories(category);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/getcourses/publishedcourses"
        );
        const publishedCourses = await response.json();

        setCourses(publishedCourses);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <DashboardLayout>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
      </div>
      <CoursesList items={courses} />
    </DashboardLayout>
  );
};

export default SearchPage;
