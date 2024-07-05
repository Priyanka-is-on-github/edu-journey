import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import ConfirmModal from "@/components/modals/confirm-modal";
import toast from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useState, Dispatch, SetStateAction } from 'react';


type NewCourseField = {
    id: string;
    userid: string;
    title: string;
    description: string;
    imageurl: string;
    price: string;
    ispublished: boolean; 
    categoryid: string;
    createdat: string;
    updatedat: string;
    // chapters?: string; // Uncomment if you need the chapters field
  };
interface CourseActionProps{
    disabled: boolean;
    ispublished: boolean;
    setNewCourseField:Dispatch<SetStateAction<NewCourseField>>
}



const CourseActions =({disabled,ispublished, setNewCourseField}:CourseActionProps)=>{
    const navigate = useNavigate();
    const confetti = useConfettiStore();
    const params = useParams();

    

     const [isLoading, setIsLoading] = useState(false);

    const onClick = async()=>{
        try {
            setIsLoading(true)
           if(ispublished)
            {
                ispublished=false;
                await fetch(`http://localhost:3001/api/v1/courses?Id=${params.id}&ispublish=${ispublished}`,{
                    method:'PUT',
                    headers:{
                        "Content-type":"application/json"
                    }
                }) 
                toast.success('Course unpublished')

                setNewCourseField((prevstate)=>{
                    return ({ ...prevstate, ispublished: false });
                })
                
        
            }
            else{
               ispublished=true;
                await fetch(`http://localhost:3001/api/v1/courses?Id=${params.id}&ispublish=${ispublished}`,{
                    method:'PUT',
                    headers:{
                        "Content-type":"application/json"
                    }
                })
                toast.success('Course published')
                confetti.onOpen();
                
                setNewCourseField((prevstate)=>{
                    return ({ ...prevstate, ispublished: true});
                })
              
            }

        } catch (error) { 
            toast.error('Something went wrong')
        }finally{
            setIsLoading(false)
        }
    }

    const  onDelete =async()=>{
        try {
            setIsLoading(true);
             await fetch(`http://localhost:3001/api/v1/courses/${params.id}`,{
                method: 'DELETE'
                
            })

            toast.success('Course deleted');
            navigate(`/teacher/courses`);
        } catch (error) {
            toast.error('Something went wrong');
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <div className="flex items-center gap-x-2">
            <Button onClick={onClick} disabled={disabled || isLoading} variant='outline' size='sm'>
                {ispublished ? "Unpublish" : "Publish"}  
            </Button>

        <ConfirmModal onConfirm={onDelete}>
                    <Button size='sm' disabled={isLoading}>
                        <Trash className='h-4 w-4'/>
                    </Button>
        </ConfirmModal>
            
        </div> 
    )
}
export default CourseActions