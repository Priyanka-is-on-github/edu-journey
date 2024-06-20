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
import FormatPrice from "@/lib/format";
import formatPrice from "@/lib/format";

interface PriceFormProps {
  price: number;
  setnewcoursefield: any;
}

const formSchema = z.object({
  price:z.coerce.number(),
});

const PriceForm = ({
  price,
  setnewcoursefield,
}: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      price:price || undefined
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    

     const request = {  
    userid: null,
    title: null,
    description: null,
    imageurl: null,
    price: values.price,
    ispublished: null,
    categoryid: null,
    createdat: null,
    updatedat: null,}

    
    
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
      const updatedPrice = await response.json();

      setnewcoursefield(updatedPrice);

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
    if (!price) {
      return;
    }

    form.reset({ price: price});
  }, [form, price]);

  return (
    <div className="mt-6 border p-4 bg-slate-100"> 
      <div className=" flex justify-between ">
       <span> Course Price</span> 
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-4 mr-2 " />
              Edit Price
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
            !price && "text-slate-500 italic"
          )}
        >
          {price? formatPrice(price): 'No price'}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                    type='number'
                    step='0.01'
                      disabled={isSubmitting}
                      placeholder="Set a price for your course"
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
export default PriceForm;
