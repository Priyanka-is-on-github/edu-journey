import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import  { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import {  useNavigate } from "react-router-dom";
import { ProgressCountContext } from "@/Layout/layout2";

interface VideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId: string;
  playbackId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  userid: string;
}

function VideoPlayer({
  chapterId,
  userid,
  title,
  courseId,
  nextChapterId,
  playbackId,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) {
  const [isReady, setIsReady] = useState(false);
  const { setProgressCount } = useContext(ProgressCountContext);
  const navigate = useNavigate();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    if (!userid) return;
    try {
      if (completeOnEnd) {
      await fetch(
          `http://localhost:3001/api/v1/getprogress/courseprogress?chapterId=${chapterId}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              userId: userid,
            },
            body: JSON.stringify({ isCompleted: true }),
          }
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }

        if (completeOnEnd && nextChapterId) {
          const progressPercentage = await fetch(
            `http://localhost:3001/api/v1/getprogress/progressPercentage?courseId=${courseId}&userId=${userid}`
          );

          const progressPercentageCount = await progressPercentage.json();
          const progressPercentageValue =
            progressPercentageCount.progressPercentage;
          setProgressCount(progressPercentageValue);
          navigate(`/courses/${courseId}/chapters/${nextChapterId}`);
        }

        toast.success("Progress Updated");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}

      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}

      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
}

export default VideoPlayer;
