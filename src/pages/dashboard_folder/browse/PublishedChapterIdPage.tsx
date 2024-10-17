import CourseEnrollButton from "@/_components/chapter_id_page_components/CourseEnrollButton";
import CourseProgressButton from "@/_components/chapter_id_page_components/CourseProgressButton";
import VideoPlayer from "@/_components/chapter_id_page_components/VideoPlayer";
import Banner from "@/components/banner";
import Preview from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import CourseLayout from "@/Layout/layout2";
import { CloudFog, File } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { createContext } from 'react';

export const IsCompletedContext = createContext<{
 
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  
  setIsCompleted: () => {},
});

function PublishedChapterIdPage() {
  // const {userId} = auth();
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const { chapterId, id } = useParams();
  const [nextchapterid, setNextchapterid] = useState(null);

 

  const [attachment, setAttachment] = useState<
    {
      id: number;
      name: string;
      url: string;
      courseid: number;
      createdat: string;
      updatedat: string;
    }[]
  >([]);

  const [playbackId, setPlaybackId] = useState("");

  const [course, setCourse] = useState({
    categoryid: "",
    createdat: "",
    description: "",
    id: "",
    imageurl: "",
    ispublished: false,
    price: 1,
    title: "",
    updatedat: "",
    userid: "",
  });

  const [chapter, setChapter] = useState<{
    courseid: string;
    createdat: string;
    description: string;
    id: string;
    isfree: boolean;
    ispublished: boolean;
    muxdata: null;
    position: number;
    title: string;
    updatedat: string;
    videourl: string;
  }>({
    courseid: "",
    createdat: "",
    description: "",
    id: "",
    isfree: false,
    ispublished: false,
    muxdata: null,
    position: 0,
    title: "",
    updatedat: "",
    videourl: "",
  });

  const [purchase, setPurchase] = useState(false);

  if (!chapter || !course) {
    navigate("/");
  }

  const isLocked = !chapter?.isfree && !purchase;
  const completeOnEnd = purchase && !isCompleted;

  useEffect(() => {
    if (!user?.id) 
      {
    
        return; // Wait until user is available
      }
      


    (async () => {
    
      try {
        const response1 = await fetch(
          `http://localhost:3001/api/v1/getcourses/chapter/${chapterId}`
        );

        const chapter = await response1.json();

        setChapter(chapter);

        const response2 = await fetch(
          `http://localhost:3001/api/v1/fileupload/courseAttachment?courseId=${id}`
        );

        const attachmentResponse = await response2.json();
        setAttachment(attachmentResponse);

        const response3 = await fetch(
          `http://localhost:3001/api/v1/videoupload/chapterVideo/${chapterId}`
        );

        const playbackid = await response3.json();
        setPlaybackId(playbackid.playbackId);

        const response4 = await fetch(
          `http://localhost:3001/api/v1/courses/${id}`
        );

        const course = await response4.json();
        setCourse(course);

        const purchase_response = await fetch(
          `http://localhost:3001/api/v1/getpurchase/coursePurchase?courseId=${id}`
        );

        const purchase = await purchase_response.json();

        setPurchase(purchase);

        const nextChapterId = await fetch(
          `http://localhost:3001/api/v1/courses/next-chapter/${chapterId}/${id}`
        );
        const nextChapterIdjson = await nextChapterId.json();

         console.log('nextcidjson=', nextChapterIdjson)

        setNextchapterid(nextChapterIdjson);

        const IscompletedResponse = await fetch(
          `http://localhost:3001/api/v1/getprogress/chapterCompleted?chapterId=${chapterId}&userId=${user?.id}`
        );

        const chapterCompleted = await IscompletedResponse.json();
       
        setIsCompleted(chapterCompleted?.iscompleted);

      } catch (error) {
        console.log(error);
      }
    })();
  }, [chapterId, id, user]);

  return (
    <CourseLayout> 
 <IsCompletedContext.Provider value={{setIsCompleted}}>
      <div>
        {isCompleted && (
          <Banner
            variant="success"
            label="You already completed this chapter."
          />
        )}

        {isLocked && (
          <Banner
            variant="success"
            label="You need to purchase this course to watch this chapter."
          />
        )}

        <div className="flex flex-col max-w-4xl mx-auto pb-20">
          <div className="p-4">
            <VideoPlayer
              chapterId={chapterId || ""}
              title={chapter?.title}
              courseId={id || ""}
              nextChapterId={nextchapterid|| ""}
              playbackId={playbackId}
              isLocked={isLocked}
              completeOnEnd={completeOnEnd}
              userid={user?.id || ''}
            />
          </div>

          <div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">{chapter?.title}</h2>

              {purchase ? (
                <CourseProgressButton  
                  chapterId={chapterId}
                  courseId={id}
                  nextChapterId={nextchapterid}
                  isCompleted={!!isCompleted}
                />
              ) : (
                <CourseEnrollButton
                  price={course?.price!}
                  courseId={id || ""}
                />
              )}
            </div>

            <Separator />
            <div>
              <Preview value={chapter?.description || ""} />
            </div>

            {purchase && (
              <>
                <Separator />

                <div className="p-4">
                  {attachment.map((attachment) => (
                    <a
                      href={attachment?.url}
                      target="_blank"
                      key={attachment?.id}
                      className="flex items-center p-3 m-2 w-full bg-sky-200  border text-sky-700 rounded-md hover:underline"
                    >
                      <File />
                      <p className="line-clamp-1">{attachment?.name}</p>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      </IsCompletedContext.Provider>
    </CourseLayout>
  );
}

export default PublishedChapterIdPage;
