import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
  
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import * as z from "zod";
  
  import { UploadDropzone } from "@uploadthing/react";
  
  import { Button } from "@/components/ui/button";
  import { File, ImageDown, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
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
import Uploader from "@/components/uploader";

  interface AttachmentFormProps {
    attachments: {id:string; name:string; url:string; createdat:string; updatedat:string}[];
    setAttachments: any;
  }
  
  const formSchema = z.object({  
    url: z.custom<File[]>(), 
  });
  
  const AttachmentForm = ({attachments, setAttachments}:AttachmentFormProps) => { 
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId]= useState<string| null>(null)
    const params = useParams();
 
   
    const form = useForm<z.infer<typeof formSchema>>({ 
      resolver: zodResolver(formSchema),
  
      
    });
  
    const { isSubmitting, isValid } = form.formState;
  
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
     
    const formData = new FormData();
formData.append(`url`, values.url[0]);
 
       try {
        const response = await fetch(
          `http://localhost:3001/api/v1/fileupload/courseAttachment?courseId=${params.id}`, 
          {
            method: "POST", 
           
            body:formData, 
          }
        );
        const updatedAttachment= await response.json();
 
        setAttachments(updatedAttachment); 
  
        toast.success("Course updated"); 
        toggleEdit();
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
  
    const toggleEdit = () => {
      setIsEditing((prevState) => !prevState);
    };
  
  
   
    const handleDeleteId =async(id: string)=>{
   
    try {
      setDeletingId(id)
      const response=await fetch(`http://localhost:3001/api/v1/fileupload/courseAttachmentDelete?courseId=${params.id}&attachmentId=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

     
      const updatedAttachment= await response.json();
      setAttachments(updatedAttachment)  
      
      toast.success("Course Updated")
    } catch (error) {
      toast.error('Something went wrong')
    }finally{
      setDeletingId(null)
    }
    }
    return (
      <div className="mt-6 border p-4 bg-slate-100">
        <div className="flex justify-between">
          <span>Course attachments </span>
          <Button variant="ghost" onClick={toggleEdit}>
            {isEditing && <> cancel</>}
  
            {!isEditing && attachments && (
              <>
                {" "}
                <PlusCircle className="h-4 w-4 mr-2 " /> Add a file
              </>
            )}
  
            
          </Button>
        </div>
  
        {!isEditing && 
        <>
        {
            attachments.length === 0 && (<p className="text-sm italic text-slate-500 mt-2"> No attachments yet</p>)
        }
        {
          attachments.length> 0 && (<div className="space-y-2">
            {attachments.map((attachment) => (
              <div key={attachment?.id} className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"> 
                 <File className="h-4 w-4 flex-shrink-0 mr-2"/>
                
                 <a href={attachment.url} download className="text-xs line-clamp-1"> {attachment.name} </a>

                 {deletingId === attachment.id && (
                  <div className="ml-auto">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                  </div>
                 )}
                 {deletingId !== attachment.id && (
                  <button className=" ml-auto hover:opacity-75 bg-sky-200 transition " onClick={()=>{handleDeleteId(attachment.id)}}>
                    <X className="h-4 w-4 "/>
                  </button>
                 )}

              </div>
            ))}
          </div>
          )
        }
        
        </>
        }
        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    
                    <FormControl>
                      <Uploader
                        fieldChange={field.onChange}
                       mediaUrl = {(attachments.length>0) ?attachments : ""}
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
  export default AttachmentForm;
  