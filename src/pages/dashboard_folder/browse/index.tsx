import DashboardLayout from "@/Layout/layout";
import Categories from "@/_components/browsepage_components/categories";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [categories, setCategories] =useState<{ id: string; name: string }[]>([])

  useEffect(()=>{
    (async()=>{
const response = await fetch('http://localhost:3001/api/v1/category')

const category= await response.json();

setCategories(category)
    })()
  }, [])

  return (
    <DashboardLayout>
      <div className="p-6">
        <Categories items={categories}/>
      </div>
    </DashboardLayout>
  );
};

export default SearchPage;
