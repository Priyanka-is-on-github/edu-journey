import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";

import { UploadDropzone } from "@uploadthing/react";

import { Button } from "@/components/ui/button";
import { ImageDown, ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import FileUpload from "@/components/file-upload";
import { OurFileRouter } from "../../../../server/uploadthing";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FileUploader from "@/components/file-uploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
interface ImageFormProps {
  imageurl: string;
  setnewcoursefield: any;
}

const formSchema = z.object({
  file: z.custom<File[]>(), 
});

const ImageForm = ({ imageurl, setnewcoursefield }: ImageFormProps) => { 
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    // defaultValues: {
    //   description: description,
    // },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
   
    const formData = new FormData();
formData.append(`file`, values.file[0]);

     try {
      const response = await fetch(
        `http://localhost:3001/api/v1/fileupload/courseImage?courseId=${params.id}`,
        {
          method: "POST",
         
          body:formData,
        }
      );
      const updatedImage= await response.json();

      

      setnewcoursefield(updatedImage);

      toast.success("Course updated");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  

  return (
    <div className="mt-6 border p-4 bg-slate-100">
      <div className="flex justify-between">
        <span>Course image </span>
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <> cancel</>}

          {!isEditing && !imageurl && (
            <>
              {" "}
              <PlusCircle className="h-4 w-4 mr-2 " /> Add an image
            </>
          )}

          {!isEditing && imageurl && (
            <>
              <Pencil className="h-4 w-4 mr-2 " />
              Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!imageurl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md  ">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="  flex items-center justify-center  mt-2 relative aspect-video  ">
            <img
              alt="upload"
              className="object-cover rounded-md h-[100%] w-[100%]"
              src={imageurl}   

            />
          </div>
        ))}
      {isEditing && (
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Photos</FormLabel>
                  <FormControl>
                    <FileUploader 
                      fieldChange={field.onChange}
                      mediaUrl={imageurl} 
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
    </div>
  );
};
export default ImageForm;
