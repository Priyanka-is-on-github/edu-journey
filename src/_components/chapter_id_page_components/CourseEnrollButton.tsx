import { Button } from '@/components/ui/button'
import formatPrice from '@/lib/format'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';



interface CourseEnrollButtonProps{
    price:number;
    courseId:string;
}


function CourseEnrollButton({price, courseId}:CourseEnrollButtonProps) {
  
    const [isLoading, setIsLoading]= useState(false);
    const { getToken } = useAuth();
    const params = useParams()
    
    

    const onClick = async ()=>{
     
        try {
            setIsLoading(true)

            const token = await getToken();
            console.log('Access Token:', token);

            const response = await fetch(`http://localhost:3001/api/v1/courses/checkout/${courseId}`,{ 
              method:'POST',
              headers:{
                 'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}` 
              },
              body:JSON.stringify({chapterId:params.chapterId})
              
            }) 
            const data = await response.json();
         
            if (response.ok) {
              console.log("stripe generated url",data.url)
                window.location.assign(data.url); 
              } else {
                toast.error(data.message || 'Something went wrong'); 
              }

    //           const queryParams = new URLSearchParams(location.search);
    // const success = queryParams.get('success');
    // const courseId = queryParams.get('courseId');
    // const chapterId = queryParams.get('chapterId');

    // if (success) {
    //   // Payment was successful, navigate to the desired page
    //   toast.success('Payment successful!');
    //   if (courseId && chapterId) {
    //     navigate(`/courses/${courseId}/chapters/${chapterId}`);
    //   }
    // }


        } catch (error) {
            toast.error('Somethig went wrong');
        }finally{
            setIsLoading(false)
        }
    }
  return (

  <Button size='sm' className='w-full md:w-auto' onClick={onClick} disabled={isLoading}> 
    Enroll for {formatPrice(price)}
  </Button>
  )
}

export default CourseEnrollButton