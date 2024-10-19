import DashboardLayout from "@/Layout/layout";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const CreatePage = () => {
  const {  user } = useUser();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  if(!user?.id){
    return <Navigate to="/teacher/courses" replace />;
  }

  
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  
    
    try {
      const response = await fetch(`${import.meta.env.SERVER_URL}/api/v1/courses`, {  
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({values, userId : user?.id}),
      });
      const newcourse = await response.json();
      
     

      navigate(`/teacher/courses/${newcourse.id}`);
      toast.success("Course created");
     
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-screen p-6 ">
        <div>
          <h1 className="text-2xl font-medium "> Name your Course</h1>

          <p className="text-slate-600 text-sm ">
            What would you like to name your course? Don't worry, you can always
            change this later.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Advanced web development'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      what will you teach in this course?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Link to="/">
                  <Button variant="ghost" type="button">
                    Cancel
                  </Button>
                </Link>

                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default CreatePage;
