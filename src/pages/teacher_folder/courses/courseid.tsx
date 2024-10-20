/* eslint-disable react-hooks/exhaustive-deps */
import DashboardLayout from "@/Layout/layout";
import DescriptionForm from "@/_components/couseid_components/description-form";
import TitleForm from "@/_components/couseid_components/title-form";
import { IconBadge } from "@/components/icon-badge";
import {
  LayoutDashboard,
  ListChecks,
  CircleDollarSign,
  File,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryForm from "@/_components/couseid_components/category-form";
import PriceForm from "@/_components/couseid_components/price-form";
import ChaptersForm from "@/_components/couseid_components/chapter-form";
import ImageForm from "@/_components/couseid_components/image-form";
import AttachmentForm from "@/_components/couseid_components/attachment-form";
import Banner from "@/components/banner";
import CourseActions from "@/_components/couseid_components/course-actions";



const CourseIdPage = () => {
  const params = useParams();
  const [count, setCount] =useState(0);
  const [newCourseFields, setNewCourseField] = useState({  
    id: "",
    teacherid: "",
    title: "",
    description: "", 
    imageurl: "",
    price: "",
    ispublished: false, 
    categoryid: "", 
    createdat: "",
    updatedat: "", 
    // chapters: "",
  });

  const [attachments, setAttachments]= useState([]);
  const [categories, setCategories] = useState([]);  
  const [chapters, setChapters] =useState<{id:string, title:string,courseid: string,createdat: string,description: string,isfree:string,ispublished: boolean,muxdata: string,position: string,updatedat:string,videourl:string}[]>([]); 

  useEffect(() => {
   

    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/courses/${params.id}`
        );

        const course = await response.json();
        
        setNewCourseField(course); 

        const categoryResponse = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/category`
        );
        const category = await categoryResponse.json();
        console.log("caterory=", category);
        if (!category) {
          throw new Error("error while fetching category");
        }
        setCategories(category);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params]);

  useEffect(()=>{
    (async()=>{

      try {
        const response = await fetch( `${import.meta.env.VITE_SERVER_URL}/api/v1/fileupload/courseAttachment?courseId=${params.id}`,
         )

         const updatedAttachment= await response.json();
         
         setAttachments(updatedAttachment); 
        
      } catch (error) {
        console.log(error)
      }

    })()
  },[params])

  useEffect(()=>{ 
    (async()=>{
try {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/courses/chapter/${params.id}`)
  const updatedChapter = await response.json();
 
  setCount(updatedChapter.length)
 
  setChapters(updatedChapter)
} catch (error) {
  console.log(error)
}
    })()
  },[params])



  const requiredFields = [
    newCourseFields.title,
    newCourseFields.description,
    newCourseFields.imageurl,
    newCourseFields.price,
    newCourseFields.categoryid,
    chapters[0]?.ispublished,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean)

  return (
    <DashboardLayout>
       {!newCourseFields.ispublished && (
        <Banner variant='warning' label='This course is unpublished. It will not be visible to the students'/>
      )}
      <div className="p-6   ">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2 ">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              {" "}
              Complete all fields {completionText}
            </span>
          </div>

          <CourseActions disabled={!isComplete} ispublished={Boolean(newCourseFields.ispublished)} setNewCourseField={setNewCourseField}/>  

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16  ">
          <div>
            <div className="flex items-center gap-x-2 ">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl ">Customize your course</h2>
            </div>
            <TitleForm
              title={newCourseFields.title} 
              setnewcoursefield={setNewCourseField}
            />

            <DescriptionForm
              description={newCourseFields.description}
              setnewcoursefield={setNewCourseField}
            />

            <ImageForm imageurl={newCourseFields.imageurl}  setnewcoursefield={setNewCourseField}/>

            <CategoryForm
              categoryid={newCourseFields?.categoryid} 
              options={categories?.map(
                (category: { id: string; name: string }) => {
                  return {
                    value: category.id,
                    label: category.name,
                  };
                }
              )}
              setnewcoursefield={setNewCourseField} 
            />
          </div>

          <div className="space-y-6 relative ">
            <div>
              <div className="flex items-center gap-x-2 ">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Chapter</h2>
              </div>

              <ChaptersForm
              chapters={chapters}
              setChapters={setChapters}
              count={count}
              />

             
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>

              <PriceForm
                price={parseInt(newCourseFields.price)}
                setnewcoursefield={setNewCourseField}
              />
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & attachments</h2>
              </div>

              <AttachmentForm attachments={attachments} setAttachments={setAttachments}/> 

            </div> 
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default CourseIdPage;
