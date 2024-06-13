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
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

import Combobox from "@/components/combobox";

interface CategoryFormProps {
  categoryid: string;
  setnewcoursefield: any;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryname: z.string().min(1),
});

const CategoryForm = ({
  categoryid,
  options,
  setnewcoursefield,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  console.log(options);

  // console.log('categoryid=', categoryid)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    // defaultValues: {
    //   categoryid: categoryid || ""
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
      updatedat: null,
    };

    console.log("request=", request);

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
      const updatedCategory = await response.json();

      setnewcoursefield(updatedCategory);

      toast.success("Course updated");
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  // const selectedOption = options.find((option)=>{
  //   option.value === categoryid
  // })

  return (
    <div className="mt-6 border p-4 bg-slate-100">
      <div className="flex justify-between">
        <span>Course category</span>
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-4 mr-2 " />
              Edit category
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className={cn("text-sm mt-2", !false && "text-slate-500 italic")}>
          {false || "No category"}
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
              name="categoryname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
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
export default CategoryForm;
