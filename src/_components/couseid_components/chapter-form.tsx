// /* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Link,  useNavigate } from "react-router-dom";

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

import { Pencil, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import ChapterList from "@/components/chapter-list";

interface ChapterFormProps {
  chapters: {
    id: string;
    title: string;
    description: string;
    videourl: string;
    position: string;
    ispublished: string;
    isfree: string;
    courseid: string;
    createdat: string;
    updatedat: string;
  }[];
  setChapters: any;
}

const formSchema = z.object({
  title: z.string().min(1),
});

const ChaptersForm = ( {chapters, setChapters }: ChapterFormProps) => {

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    // defaultValues: {
    //   title: "",
    // },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    console.log('first=', values)
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/courses/chapter/${params.id}`, 
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const updatedChapter = await response.json();
      

      setChapters(updatedChapter);

      toast.success("Chapter created");
      toggleCreating();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleCreating = () => {
    setIsCreating((prevState) => !prevState);
  };

  // const onReorder = async (updateData:{id:string; position:string}[])=>{
  //   try {
  //     setIsUpdating(true)
  //     toast.success('chapters reordered')
  //   } catch (error) {
  //     toast.error('Something went wrong')
  //   }finally{
  //     setIsUpdating(false)
  //   }

  // }

  const onEdit = async(id:string)=>{
    navigate(`/teacher/courses/${params.id}/chapters/${id}`) 


  }

  

  return (
    <div className="mt-6 border p-4 bg-slate-100  ">
      <div className=" flex justify-between ">
        <span>Course Chapters</span>
        <Button variant="ghost" onClick={toggleCreating}>
          {!isCreating ? (
            <>
              <PlusCircle className="h-4 w-4 mr-2 " />
              Add a chapter
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Introduction"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !chapters.length && "text-slate-500 italic"
          )}
        >
          {" "}
          {!chapters.length && " No chapters"}

          <ChapterList onEdit={onEdit}
          onReorder={()=>{}}
          items={chapters || []}/>

        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorders the chapter
        </p>
      )}
    </div>
  );
};
export default ChaptersForm;


