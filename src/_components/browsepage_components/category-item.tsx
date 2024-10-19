import { cn } from "@/lib/utils";
import qs from "query-string";
import { IconType } from "react-icons";
import { useSearchParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { setCoursesContext } from "@/pages/dashboard_folder/browse";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}
function CategoryItem({ label, value, icon: Icon }: CategoryItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { setCourses } = useContext(setCoursesContext);

  const currentCategoryId = params.get("categoryId");

  const currentTitle = params.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = async () => {
    const newParams = {
      title: currentTitle,
      categoryId: isSelected ? undefined : value,
    };

    const url = qs.stringifyUrl(
      {
        url: location.pathname,
        query: newParams,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    navigate(url);

    try {
      const courses = await fetch(
        `${import.meta.env.SERVER_URL}/api/v1/getCourses?categoryTitle=${label}`
      );
      const Courses = await courses.json();

      setCourses(Courses);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
}

export default CategoryItem;
