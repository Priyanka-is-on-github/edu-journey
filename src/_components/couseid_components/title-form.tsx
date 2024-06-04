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

interface TitleFormProps {
  initialData: string;
  setnewcoursefield: any;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const TitleForm = ({ initialData, setnewcoursefield }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      title: initialData,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/courses/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const updatedCourse = await response.json();

      setnewcoursefield(updatedCourse);

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
    if (!initialData) {
      return;
    }

    form.reset({ title: initialData });
  }, [form, initialData]);

  return (
    <div className="mt-6 border p-4 bg-slate-100">
      <div>
        Course title{" "}
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

      {!isEditing && <p className="text-sm mt-2">{initialData}</p>}
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
                      placeholder="e.g. Advanced web development"
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
export default TitleForm;
