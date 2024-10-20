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
  FormMessage,
} from "@/components/ui/form";


import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Checkbox} from "@/components/ui/checkbox"


interface ChapterAccessFormProps {
  isfree: boolean;
  setChapterDetail: any;
}

const formSchema = z.object({
  isfree: z.boolean().default(false),
});

const ChapterAccessForm = ({
  isfree,
  setChapterDetail,
}: ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();


  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      isfree: !!isfree,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  

     const request = {  
      title: null,
    description: null,
   videourl: null,
   isfree:values.isfree,
  }

  try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/courses/chapterdetail/${params.chapterid}`, 
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );
      const updatedAccess = await response.json();

      setChapterDetail(updatedAccess);

      toast.success("Chapter updated");
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
        <span>Chapter access setting </span>
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-4 mr-2 " />
              Edit access
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !isfree && "text-slate-500 italic"
          )}
        >
          {isfree?(<>This chapter is free for preview.</>): (<>This chapter is not free</>)}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isfree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center spaxe-x-3 space-y-0 rounded-md border p-4 ">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                  </FormControl>
                  <div className="pl-2 leading-none">
                    <FormDescription> Check this box if you want to make this chapter free for preview.</FormDescription>
                  </div>
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
export default ChapterAccessForm;
