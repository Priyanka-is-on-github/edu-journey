

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";


import { Button } from "@/components/ui/button";
import { Loader2, Pencil, PlusCircle, Video } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import VideoUploader from "@/components/video-upload";
import MuxPlayer from '@mux/mux-player-react';

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
  const [updatedVideo, setUpdatedVideo] = useState({ videoUrl: '', playbackId: '' }); 


  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    // defaultValues: {
    //   videourl: videourl,
    // },
  });

  console.log('upv=',updatedVideo.playbackId)

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    

    const formData = new FormData();
    formData.append(`videourl`, values.videourl[0]);
    
    setIsUpdating(true)
     try {
      const response = await fetch(
       `${import.meta.env.SERVER_URL}/api/v1/videoupload/chapterVideo/${params.chapterid}`, 
        {
          method: "POST",
          
          body: formData,
        }
      );
     const updatedVideoData= await response.json();
     console.log(updatedVideoData)
     
     setChapterDetail(updatedVideoData.videoUrl);

      setUpdatedVideo(updatedVideoData)

     

      toast.success("Chapter updated");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }finally{
      setIsUpdating(false)
    }
  };

  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

useEffect(()=>{

  (async()=>{
    try {
      const response = await fetch(`${import.meta.env.SERVER_URL}/api/v1/videoupload/chapterVideo/${params.chapterid}`)
      const updatedvideo = await response.json();
      console.log('upv=',updatedvideo)

      setUpdatedVideo(updatedvideo)
    } catch (error) {
      console.log(error)
    }
  

  })()
  
    
},[])


  return (
    <div className="mt-6 border p-4 bg-slate-100 relative"> 

{isUpdating && (<div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
      <Loader2 className='animate-spin h-6 w-6 text-sky-700'/> 
    </div>)}

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

               <MuxPlayer
              playbackId={updatedVideo?.playbackId || ''}   
              
    />  
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
          <div className="text-sm text-muted-foreground mt-2">
            Videos can take a few minutes to process. Refresh the page if video does not appear.
          </div>
        )
      }
    </div>
  );
};
export default VideoForm;
