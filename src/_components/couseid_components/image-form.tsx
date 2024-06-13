import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";



// const ImageForm =()=>{

//    const  UploadButton = generateUploadButton({
//         url: "https://localhost:3000/api/uploadthing",
         
//       })

//     return(
// <div>
// <UploadButton  endpoint ="courseImage"/>
// </div>
        
//     )
// }

// export default ImageForm;

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { UploadDropzone } from "@uploadthing/react";
 



import { Button } from "@/components/ui/button";
import { ImageDown, ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import FileUpload from "@/components/file-upload";
import {OurFileRouter} from  '../../../../server/uploadthing'


interface ImageFormProps {
  imageurl: string;
  setnewcoursefield: any;
}

const formSchema = z.object({
  imageurl: z.string().min(1, {
    message: "Image is required",
  }),
});

const ImageForm = ({
  imageurl,
  setnewcoursefield,
}: ImageFormProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

     const request = {  
    userid: null,
    title: null,
    description: null,
    imageurl: values.imageurl,
    price: null,
    ispublished: null,
    categoryid: null,
    createdat: null,
    updatedat: null,}

    console.log('request=', request)
    
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/courses/${params.id}`, 
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );
      const updatedDescription = await response.json();

      setnewcoursefield(updatedDescription);

      toast.success("Course updated");
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


     const UploadDropzone = generateUploadDropzone<OurFileRouter>({
  url: "http://localhost:3000/api/uploadthing",
   
 })
  return (
    <div className="mt-6 border p-4 bg-slate-100"> 
      <div className="flex justify-between">
        <span>Course image </span>
        <Button variant="ghost" onClick={toggleEdit}>

            {isEditing && (<> cancel</>)}

            {!isEditing && !imageurl && (<> <PlusCircle className="h-4 w-4 mr-2 "/> Add an image</>)}

          {!isEditing && imageurl && (
            <>
              <Pencil className="h-4 w-4 mr-2 " />
              Edit image
            </>
          ) }
        </Button>
      </div>

      {!isEditing && (
        !imageurl ? (
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500"/>
        </div>):(
            <div className="relative aspect-video mt-2">
               <img alt='upload'  className="object-cover rounded-md" src={imageurl}/>
        </div>)

        
      )}
      {isEditing && (
        <div>

            {/* <FileUpload endpoint="courseImage" onChange={(url)=>{
                if(url){
                    onSubmit({imageurl: url})
                }
            }}/> */}

   
            
            <UploadDropzone  endpoint ="courseImage"  />
    
 

            <div className="text-xs text-muted-forground mt-4">
                16:9 aspect ratio recommended
            </div>
        </div>
      )}
    </div>
  );
};
export default ImageForm;
