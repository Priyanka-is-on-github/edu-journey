import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import ConfirmModal from "@/components/modals/confirm-modal";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ChapterActionProps{
    disabled: boolean;
    ispublished: boolean;
}


const ChapterActions =({disabled,ispublished}:ChapterActionProps)=>{
    const navigate = useNavigate();
    const params = useParams();


  

    const [isLoading, setIsLoading] = useState(false);
    // const onClick = async()=>{
    //     try {
    //         setIsLoading(true)
    //        if(ispublished)
    //         {
    //             await fetch(`http://localhost:3001/api/v1/courses/chapterdetail/${params.chapterid}`)
    //             toast.success('Chapter unpublished')
    //         }
    //         else{
    //             await fetch(`http://localhost:3001/api/v1/courses/chapterdetail/${params.chapterid}`)
    //             toast.success('Chapter published')
    //         }
    //     } catch (error) {
    //         toast.error('Something went wrong')
    //     }finally{
    //         setIsLoading(false)
    //     }
    // }

    const  onDelete =async()=>{
        try {
            setIsLoading(true);
             await fetch(`http://localhost:3001/api/v1/courses/chapterdetail/${params.chapterid}`,{
                method: 'DELETE',
                headers:{
                    'Content-type' : 'application/json',
                },
            })

            toast.success('Chapter deleted');
            navigate(`/teacher/courses/${params.id}`);
        } catch (error) {
            toast.error('Something went wrong');
        }finally{
            setIsLoading(false);
        }
    }
    return(
        <div className="flex items-center gap-x-2">
            <Button onClick={()=>{}} disabled={disabled || isLoading} variant='outline' size='sm'>
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
export default ChapterActions