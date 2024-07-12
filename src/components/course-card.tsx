import { Link } from "react-router-dom";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import "../index.css";
import formatPrice from "@/lib/format";
import { useEffect, useState } from "react";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  //   progress: number | null;
    category: string;
}

const CourseCard = ({
  id,
  title,
  imageUrl,
  price,
  //   progress,
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

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/getcourses/publishedchapters/${id}`
        );

        const publishedChapters = await response.json();
        setPublishedChapter(publishedChapters);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Link to={`/courses/${id}/chapters/${publishedChapter[0]?.id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden borser rounded-lg p-3 h-full hover:shadow-lg ">
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

          {null !== null ? (
            <div>TODO</div>
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
