import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import ConfirmModal from "@/components/modals/confirm-modal";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type NewChapterDetail = {
  title: string;
  description: string;
  videourl: string;
  isfree: string;
  ispublished: boolean;
};
interface ChapterActionProps {
  disabled: boolean;
  ispublished: boolean;
  setChapterDetail: Dispatch<SetStateAction<NewChapterDetail>>;
}

const ChapterActions = ({
  disabled,
  ispublished,
  setChapterDetail,
}: ChapterActionProps) => {
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      if (ispublished) {
        ispublished = false;
        await fetch(
          `${import.meta.env.SERVER_URL}/api/v1/courses/chapterdetail?chapterId=${params.chapterid}&ispublish=${ispublished}&courseId=${params.id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        toast.success("Chapter unpublished");

        setChapterDetail((prevState) => {
          return { ...prevState, ispublished: false };
        });
      } else {
        ispublished = true;
        await fetch(
          `${import.meta.env.SERVER_URL}/api/v1/courses/chapterdetail?chapterId=${params.chapterid}&ispublish=${ispublished}&courseId=${params.id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        toast.success("Chapter published");

        setChapterDetail((prevState) => {
          return { ...prevState, ispublished: true };
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await fetch(
        `${import.meta.env.SERVER_URL}/api/v1/courses/chapterdelete/${params.chapterid}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ courseid: params.id }),
        }
      );

      toast.success("Chapter deleted");
      navigate(`/teacher/courses/${params.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {ispublished ? "Unpublish" : "Publish"}
      </Button>

      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
export default ChapterActions;
