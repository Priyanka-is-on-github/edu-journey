import CourseCard from "./course-card";

import Shimmer from './Shimmer';

// type CourseWithProgressWithCategory = Course & {
//   category: Category | null;
//   chapters: { id: string }[];
//   progress: number | null;
// };

// interface CoursesListProps {
//   items: CourseWithProgressWithCategory[];
// }




interface Course {
    categoryid: string;
    createdat: string;
    description: string;
    id: string;
    imageurl: string;
    ispublished: boolean;
    price: number;
    title: string;
    updatedat: string;
    userid: null | string;
    progress_percentage: number;
 


    
  }

  interface CoursesListProps{
    items:Course[];
    loading: boolean;
  }

const CoursesList = ({ items, loading }: CoursesListProps) => {

 
  
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 16 }).map((_, index) => (
              <Shimmer key={index} width="w-full" height="h-80" />
            ))
          : items.map((item) => (
              <CourseCard
                key={item.id}
                id={item.id}
                title={item.title}
                imageUrl={item.imageurl}
                price={item.price}
                progress_percentage={item.progress_percentage}
                category={item.categoryid}
              />
            ))}
      </div>


      {items.length === 0 && !loading && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          <p>No courses available</p>
        </div>
      )}
   
    </div>
  );
};

export default CoursesList;
