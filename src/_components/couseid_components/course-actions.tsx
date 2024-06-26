import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import ConfirmModal from "@/components/modals/confirm-modal";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface CourseActionProps{
    disabled: boolean;
    ispublished: boolean;
}


const CourseActions =({disabled,ispublished}:CourseActionProps)=>{
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
                
            window.location.reload();
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
                
            // window.location.reload(); 
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
                method: 'DELETE',
                headers:{
                    'Content-type' : 'application/json',
                },
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
                {ispublished? "Unpublish" : "Publish"}  
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