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


import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFormProps {
  description: string;
  setnewcoursefield: any;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

const DescriptionForm = ({
  description,
  setnewcoursefield,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      description: description,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

     const request = {  
    userid: null,
    title: null,
    description: values.description,
    imageurl: null,
    price: null,
    ispublished: null,
    categoryid: null,
    createdat: null,
    updatedat: null,}

    console.log('request=', request)
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/courses/${params.id}`, 
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

  useEffect(() => {
    if (!description) {
      return;
    }

    form.reset({ description: description });
  }, [form, description]);

  return (
    <div className="mt-6 border p-4 bg-slate-100"> 
      <div className="flex justify-between">
        <span>Course description </span>
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-4 mr-2 " />
              Edit description
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. This course is about..."
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
export default DescriptionForm;
