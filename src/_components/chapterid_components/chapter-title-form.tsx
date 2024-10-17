/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
// import {Course} form ''

type ChapterTitleFormProps= { 
  title:string;
  setChapterDetail: any,
}

const formSchema = z.object({
  title: z.string().min(1),
});

const ChapterTitleForm = ({ title, setChapterDetail }: ChapterTitleFormProps) => {  

  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({  
    resolver: zodResolver(formSchema),

    defaultValues: {
      title: title,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
   
   

    const request = {  
    
    title: values.title,
    description: null,
   videourl: null,
   
  }

    try {
      const response = await fetch(
       `http://localhost:3001/api/v1/courses/chapterdetail/${params.chapterid}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );
      const updatedChapterTitle = await response.json();
     

      setChapterDetail(updatedChapterTitle);

      toast.success("Chapter updated");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  useEffect(() => {
    if (!title) {
      return;
    }

    form.reset({ title: title });
  }, [form, title]);

  return (
    <div className="mt-6 border p-4 bg-slate-100">
      <div className=" flex justify-between ">
      <span>Chapter Title</span>
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>

      {!isEditing && <p className="text-sm mt-2">{title}</p>}
      
      {isEditing && (
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
                      placeholder="e.g. Introduction of the course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex item-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
export default ChapterTitleForm;
