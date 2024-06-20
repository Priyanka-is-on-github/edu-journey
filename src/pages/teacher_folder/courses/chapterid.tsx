import DashboardLayout from "@/Layout/layout";
import ChapterAccessForm from "@/_components/chapterid_components/chapter-access-form";
import ChapterDescriptionForm from "@/_components/chapterid_components/chapter-description-form";
import ChapterTitleForm from "@/_components/chapterid_components/chapter-title-form";
import VideoForm from "@/_components/chapterid_components/chapter-video-form";
import { IconBadge } from "@/components/icon-badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ChapterIdPage = () => {
  const params = useParams()
  const [chapterDetail, setChapterDetail] =useState({
    id: '',
    title:'',
    description:'',
    videourl:'',
    position:'',
    ispublished:'',
    isfree:'',
    courseid:'',
    createdat:'',
    updatedat:'',
  })

  // const requiredFields = [
  //   chapters.title,
  //   chapters.description,
  //   chapters.videoUrl,
  // ]

  useEffect(()=>{
    (async()=>{

      try {
        const response = await fetch( `http://localhost:3001/api/v1/courses/chapterdetail/${params.chapterid}`)
      const chapterDetail = await response.json();

      
      setChapterDetail(chapterDetail)
      } catch (error) {
        console.log(error)
      }
      


    })()
  },[params])


  return (
    <DashboardLayout>
      <div className="p-6 ">
        <div className="flex items-center justify-between">
          <div className="w-full ">
            <Link
              to={`/teacher/courses/${params.id}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>

            <div className="flex items-center justify-between w-full ">
              <div className="flex flex-col gap-y-2 ">
                <h1 className="text-2xl font-medium ">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  complete all fields
                </span>
              </div>

              <div>
                <Button variant="ghost">Publish</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your chapter</h2>
              </div>

              <ChapterTitleForm title={chapterDetail.title} setnewcoursefield={''} />
              <ChapterDescriptionForm description={""} setnewcoursefield={""} />
            </div>

            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h2 className="text-xl">Access Settings</h2>
            </div>

            <ChapterAccessForm description={""} setnewcoursefield={""} />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl"> Add a video</h2>
            </div>

            <VideoForm imageurl={""} setnewcoursefield={""} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default ChapterIdPage;
