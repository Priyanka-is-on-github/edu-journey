

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageDown, ImageIcon, Pencil, PlusCircle, Video } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import VideoUploader from "@/components/video-upload";

interface VideoFormProps {
  videourl: string;
  setChapterDetail: any;
}

const formSchema = z.object({
  videourl: z.custom<File[]>(), 
});

const VideoForm = ({
  videourl,
  setChapterDetail,
}:VideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    // defaultValues: {
    //   videourl: videourl,
    // },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);

    const formData = new FormData();
    formData.append(`file`, values.videourl[0]);


   


    
    
    try {
      const response = await fetch(
       `http://localhost:3001/api/v1/videoupload/chapterVideo/${params.chapterid}`, 
        {
          method: "POST",
          
          body: JSON.stringify(formData)
        }
      );
      const updatedVideo= await response.json();

      // setChapterDetail(updatedVideo);

      toast.success("Chapter updated");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

//   useEffect(() => {
//     if (!description) {
//       return;
//     }

//     form.reset({ description: description });
//   }, [form, description]);

  return (
    <div className="mt-6 border p-4 bg-slate-100"> 
      <div className="flex justify-between">
        <span>Chapter video </span>
        <Button variant="ghost" onClick={toggleEdit}>

            {isEditing && (<> cancel</>)}

            {!isEditing && !videourl && (<> <PlusCircle className="h-4 w-4 mr-2 "/> Add a video</>)}

          {!isEditing && videourl && (
            <>
              <Pencil className="h-4 w-4 mr-2 " />
              Edit video
            </>
          ) }
        </Button>
      </div>

      {!isEditing && (
        !videourl ? (
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500"/>
        </div>):(
            <div className="relative aspect-video mt-2">
             {/* <MuxPlayer
              playbackId={muxdata.playbackid || ''}  
              
    /> */}
        </div>)

        
      )}
      {isEditing && (
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <FormField
              control={form.control}
              name="videourl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload this chapter's video</FormLabel>
                  <FormControl>
                    <VideoUploader 
                      fieldChange={field.onChange}
                      mediaUrl={videourl} 
                    />
                  </FormControl>
                 
                </FormItem>
              )}
            />
            <div className="flex item-center gap-x-2">
              <Button  disabled={!isValid || isSubmitting} type="submit">save</Button>
            </div>
          </form>
        </Form>
      )}

      {
        videourl && !isEditing && (
          <div className="text-xs text-muted-foreground mt-2">
            Videos can take a few minutes to process. Refresh the page if video does not appear.
          </div>
        )
      }
    </div>
  );
};
export default VideoForm;
