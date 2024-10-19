import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { CheckCircle, XCircle } from "lucide-react";
import  { useContext,  useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { IsCompletedContext } from "@/pages/dashboard_folder/browse/PublishedChapterIdPage";
import { ProgressCountContext } from "@/Layout/layout2";

interface CourseProgressButtonProps {
  courseId: string | undefined;
  chapterId: string | undefined;
  isCompleted?: boolean | undefined;
  nextChapterId?: null;
}
function CourseProgressButton({
  courseId,
  chapterId,
  isCompleted,
  nextChapterId,
}: CourseProgressButtonProps) {
  const navigate = useNavigate();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const {  user } = useUser();

  const { setIsCompleted } = useContext(IsCompletedContext);
  const { setProgressCount } = useContext(ProgressCountContext); 

 
 
  const onClick = async () => {
    try {
      setIsLoading(true);
        await fetch(   
        `${import.meta.env.SERVER_URL}/api/v1/getprogress/courseprogress?chapterId=${chapterId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            userId: user?.id || "",
          },
          body: JSON.stringify({ isCompleted: !isCompleted }),
        }
      );

      if (isCompleted === true) {
        setIsCompleted(false);
      }

      if (!isCompleted && !nextChapterId) {
        
        const progressPercentage = await fetch(
          `${import.meta.env.SERVER_URL}/api/v1/getprogress/progressPercentage?courseId=${courseId}&userId=${user?.id}`
        );

        const progressPercentageCount = await progressPercentage.json();
        const progressPercentageValue =
          progressPercentageCount.progressPercentage;
          setProgressCount(progressPercentageValue);  

        confetti.onOpen();

      }

      if (!isCompleted && nextChapterId) {
        const progressPercentage = await fetch(
          `${import.meta.env.SERVER_URL}/api/v1/getprogress/progressPercentage?courseId=${courseId}&userId=${user?.id}`
        );

        const progressPercentageCount = await progressPercentage.json();
        const progressPercentageValue =
          progressPercentageCount.progressPercentage;
          setProgressCount(progressPercentageValue);  
          

        navigate(`/courses/${courseId}/chapters/${nextChapterId}`);  
    
      }

      if(isCompleted === true){
        const progressPercentage = await fetch(
            `${import.meta.env.SERVER_URL}/api/v1/getprogress/progressPercentage?courseId=${courseId}&userId=${user?.id}`
          );
  
          const progressPercentageCount = await progressPercentage.json();
          const progressPercentageValue =
            progressPercentageCount.progressPercentage;
  
     
          setProgressCount(progressPercentageValue);
      }

      toast.success("Progress updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  console.log('nextcid=', nextChapterId)

  const Icon = isCompleted ? XCircle : CheckCircle;

 

  return (
    <Button
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
      onClick={onClick}
      disabled={isLoading}
    >
      {isCompleted ? "Not completed" : "Mark as complete"} 
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
}

export default CourseProgressButton;
