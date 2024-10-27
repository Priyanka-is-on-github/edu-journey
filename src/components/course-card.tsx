import { Link } from "react-router-dom";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import "../index.css";
import formatPrice from "@/lib/format";
import { useEffect, useState } from "react";
import CourseProgress from "./course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
    progress_percentage: number;
    category: string;
}

const CourseCard = ({
  id,
  title,
  imageUrl,
  price,
  progress_percentage,
  category,
}: 

CourseCardProps) => {


  const [publishedChapter, setPublishedChapter] = useState<
    {
      courseid: number;
      createdat: string;
      description: string;
      id: number;
      isfree: boolean;
      ispublished: boolean;
      muxdata: null;
      position: number;
      title: string;
      updatedat: string;
      videourl: string;
    }[]
  >([]);

  const [purchase, setPurchase] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/getcourses/publishedchapters/${id}`
        );

        const publishedChapters = await response.json();
        setPublishedChapter(publishedChapters);

       
        const purchase_response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/getpurchase/coursePurchase?courseId=${id}`
        );

        const purchase = await purchase_response.json();
        setPurchase(purchase);

      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Link to={`/courses/${id}/chapters/${publishedChapter[0]?.id}`}>
      <div className="group  transition overflow-hidden border rounded-lg p-3 h-full hover:shadow-lg ">
        <div className="relative w-full  aspect-video rounded-md overflow-hidden">
          <img className="object-cover" alt={title} src={imageUrl} />
        </div>

        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>

          <p className="text-xs text-muted-foreground">{category}</p>

          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {publishedChapter.length} {publishedChapter.length === 1 ? "Chapter" : "Chapters"}
               
              </span>
            </div>
          </div>

          {purchase? (
             <div className="  w-[100%]"> 

              <CourseProgress size='sm' variant='success' value={progress_percentage}/>   
            

           </div>
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
export default CourseCard;
// variant={progress_percentage === 100 ? 'success' : 'default'}