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
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox} from "@/components/ui/checkbox"


interface ChapterAccessFormProps {
  description: string;
  setnewcoursefield: any;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

const ChapterAccessForm = ({
  description,
  setnewcoursefield,
}: ChapterAccessFormProps) => {
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
    console.log(values);

     const request = {  
    userid: null,
    title: null,
    description: null,
    imageurl: null,
    price: null,
    ispublished: null,
    categoryid: null,
    createdat: null,
    updatedat: null,}

    console.log('request=', request)
    
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/courses/${params.id}`, 
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
            !description && "text-slate-500 italic"
          )}
        >
          {description || "No description"}
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
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start spaxe-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription> Check this box if you want to make this chapter free for preview</FormDescription>
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
