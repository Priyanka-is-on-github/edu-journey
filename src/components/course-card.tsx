
import { Link } from "react-router-dom";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import '../index.css'
import formatPrice from "@/lib/format";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
//   chaptersLength: number;
  price: number;
//   progress: number | null;
//   category: string;
}

const CourseCard = ({
  id,
  title,
  imageUrl,
//   chaptersLength,
  price,
//   progress,
//   category,
}: CourseCardProps) => {

  return (
    <Link to={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden borser rounded-lg p-3 h-full">
        <div className="relative w-full  aspect-video rounded-md overflow-hidden">
          <img   className="object-cover" alt={title} src={imageUrl} />
        </div>

        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>

          <p className="text-xs text-muted-foreground">Computer science</p>
          

          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {/* {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"} */}
                4 chapters
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
