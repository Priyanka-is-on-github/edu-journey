// /* eslint-disable @typescript-eslint/no-explicit-any */
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Pencil, PlusCircle } from "lucide-react";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import { cn } from "@/lib/utils";
// import { Textarea } from "@/components/ui/textarea";

// interface ChapterFormProps {
//   chapters: string;
//   setnewcoursefield: any;
// }

// const formSchema = z.object({
//   title: z.string().min(1),
// });

// const ChaptersForm = ({ chapters, setnewcoursefield }: ChapterFormProps) => {
//   const [isCreating, setIsCreating] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const params = useParams();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),

//     defaultValues: {
//       title: "",
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     console.log(values);

//     const request = {
//       userid: null,
//       title: null,
//       description: null,
//       imageurl: null,
//       price: null,
//       ispublished: null,
//       categoryid: null,
//       createdat: null,
//       updatedat: null,
//     };

//     console.log("request=", request);

//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/v1/courses/${params.id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json",
//           },
//           body: JSON.stringify(request),
//         }
//       );
//       const updatedDescription = await response.json();

//       setnewcoursefield(updatedDescription);

//       toast.success("Chapter updated");
//       toggleCreating();
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   const toggleCreating = () => {
//     setIsCreating((prevState) => !prevState);
//   };

//   // useEffect(() => {
//   //   if (!description) {
//   //     return;
//   //   }

//   //   form.reset({ description: description });
//   // }, [form, description]);

//   return (
//     <div className="mt-6 border p-4 bg-slate-100  ">
//       <div className=" flex justify-between ">
//         <span>Course Chapters</span>
//         <Button variant="ghost" onClick={toggleCreating}>
//           {!isCreating ? (
//             <>
//               <PlusCircle className="h-4 w-4 mr-2 " />
//               Add a chapter
//             </>
//           ) : (
//             <>Cancel</>
//           )}
//         </Button>
//       </div>

     
//       {isCreating && (
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-4 mt-4"
//           >
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       disabled={isSubmitting}
//                       placeholder="e.g. Introduction"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button disabled={!isValid || isSubmitting} type="submit">
//               Create
//             </Button>
//           </form>
//         </Form>
//       )}
//       {!isCreating && (<div className={cn('text-sm mt-2' , !chapters.length && 'text-slate-500 italic')}> {!chapters && ' No chapters'}</div>)}
//       {!isCreating && (<p className="text-xs text-muted-foreground mt-4">Drag and drop to reorders the chapter</p>)}
//     </div>
//   );
// };
// export default ChaptersForm;


const ChapterForm =()=>{
  return(
   < Link to='/teacher/courses/chapterid'>
   <Button variant='ghost'>chapterid page</Button> 
   </Link>
      
    
  )
}
export default ChapterForm;