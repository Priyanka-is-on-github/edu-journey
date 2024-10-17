import DashboardLayout from "@/Layout/layout";
import ChapterAccessForm from "@/_components/chapterid_components/chapter-access-form";
import ChapterActions from "@/_components/chapterid_components/chapter-actions";
import ChapterDescriptionForm from "@/_components/chapterid_components/chapter-description-form";
import ChapterTitleForm from "@/_components/chapterid_components/chapter-title-form";
import VideoForm from "@/_components/chapterid_components/chapter-video-form";
import Banner from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ChapterIdPage = () => {
  const params = useParams()
  const [chapterDetail, setChapterDetail] =useState({
   
    title:'',
    description:'',
    videourl:'',
    isfree:'',
    ispublished:false,
    
  })

  const requiredFields = [
    chapterDetail?.title,
    chapterDetail?.description,
    chapterDetail?.videourl,
  ]

  const totalfields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalfields})`


  const isComplete = requiredFields.every(Boolean)

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
      {!chapterDetail?.ispublished && (
        <Banner variant='warning' label='This chapter is unpublished. It will not be visible in the course'/>
      )}
      <div className="p-6 ">
        <div className="flex items-center justify-between ">
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
                  complete all fields {completionText}
                </span>
              </div>

              <ChapterActions disabled={!isComplete} ispublished={Boolean(chapterDetail?.ispublished)} setChapterDetail={setChapterDetail}/>
              
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

              <ChapterTitleForm title={chapterDetail?.title} setChapterDetail={setChapterDetail} />
              <ChapterDescriptionForm description={chapterDetail?.description}  setChapterDetail={setChapterDetail}/>
            </div>

            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h2 className="text-xl">Access Settings</h2>
            </div>

            <ChapterAccessForm isfree={Boolean(chapterDetail?.isfree)} setChapterDetail={setChapterDetail} />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl"> Add a video</h2>
            </div>

            <VideoForm videourl={chapterDetail?.videourl} setChapterDetail={setChapterDetail} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default ChapterIdPage;
