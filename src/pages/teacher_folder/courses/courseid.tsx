/* eslint-disable react-hooks/exhaustive-deps */
import DashboardLayout from "@/Layout/layout";
import DescriptionForm from "@/_components/couseid_components/description-form";
import TitleForm from "@/_components/couseid_components/title-form";
import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryForm from "@/_components/couseid_components/category-form";

// interface Course ={
//   id: string | null,
//   userid: string | null,
//   title: string | null,
//   description: string | null,
//   imageurl: string | null,
//   price: string | null,
//   ispublished: string | null,
//   categoryid: string | null,
//   createdat: string | null,
//   updatedat: string | null,
// }

const CourseIdPage = () => {
  const params = useParams();
  const [newCourseFields, setNewCourseField] = useState({
    id: "",
    userid: "",
    title: "",
    description: "",
    imageurl: "",
    price: "",
    ispublished: "",
    categoryid: "",
    createdat: "",
    updatedat: "",
  });

const [categories , setCategories]= useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/courses/${params.id}`
        );

       
        const course = await response.json();
        setNewCourseField(course);

         const categoryResponse = await fetch("http://localhost:3000/api/v1/category")
        const category = await categoryResponse.json();
        console.log('caterory=',category)
        setCategories( category);
      
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params]);

  const requiredFields = [
    newCourseFields.title,
    newCourseFields.description,
    newCourseFields.imageurl,
    newCourseFields.price,
    newCourseFields.categoryid,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  // if(!userid)
  //   {
  //     return Navigate('/')
  //   }

  //   if(!course)
  //     {
  //       return navigete('/')
  //     }

  

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between"> 
          <div className="flex flex-col gap-y-2 ">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              {" "}
              Complete all fields {completionText}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 ">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl ">Customize your course</h2>
            </div>
            <TitleForm
              initialData={newCourseFields.title}  
              setnewcoursefield={setNewCourseField}
            />

             <DescriptionForm
              description={newCourseFields.description} 
              setnewcoursefield={setNewCourseField}
            /> 

             <CategoryForm
              categoryid={newCourseFields.categoryid} 
              options={categories.map((category)=>{
                return(
                  {
                 label:category.name,
                  value:category.id,
                  }
               
                )
               
              })}
              setnewcoursefield={setNewCourseField}
            /> 
            
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default CourseIdPage;
