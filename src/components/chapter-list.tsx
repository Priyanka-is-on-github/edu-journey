import {DragDropContext, Droppable,Draggable, DropResult,} from '@hello-pangea/dnd'
import {cn} from '@/lib/utils'
import { useEffect, useState } from 'react';
import {  Grip, Pencil } from 'lucide-react';


interface ChapterListProps{
    items: {
        id: string;
        title: string;
        description: string;
        videourl: string;
        position: string;
        ispublished: boolean;
        isfree: string;
        courseid: string;
        createdat: string;
        updatedat: string;
      }[];
    onReorder: (updateData:{id:string; position:number}[])=>void;
    onEdit: (id:string)=>void;
}


const ChapterList =({onEdit, onReorder, items}: ChapterListProps)=>{
  
    const [isMounted, setIsMounted] = useState(false)
    const [chapters, setChapters]=useState(items)

    

    useEffect(()=>{
        setChapters(items);
    },[items]);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    const onDragEnd =(result: DropResult)=>{
 
        if(!result.destination) return;

        const items = Array.from(chapters);
        const [reorderedItem] = items.splice(result.source.index,1);
        items.splice(result.destination.index,0,reorderedItem);

        const startIndex= Math.min(result.source.index, result.destination.index)
        const endIndex= Math.max(result.source.index, result.destination.index)

        const updatedChapters = items.slice(startIndex, endIndex+1)
        setChapters(items)

        const bulkUpdateData = updatedChapters.map((chapter)=>({
            id: chapter.id,
            position: items.findIndex((item)=>item.id === chapter.id)

          
    })) 

    // console.log('bl=',bulkUpdateData) 

    onReorder(bulkUpdateData)
    }
    
    if(!isMounted){
        return null;
    }

    return(
  
       <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='chapters'>
            {
                (provided)=>{
                    return ( <div {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                chapters.map((chapter, index)=>(
                                  
                                    <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                        {
                                            (provided)=>{
                                                return(
                                                    <div className={cn('flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm')} ref={provided.innerRef}{...provided.draggableProps}>
                                                        <div className={cn('px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition', chapter?.ispublished && "border-r-sky-200  hover:bg-sky-200")} {...provided.dragHandleProps}>
                                                            <Grip className='h-5 w-5'/>

                                                        </div>
                                                         {chapter.title}

                                                        <div className='ml-auto pr-2 flex items-center gap-x-2 '>
                                                            {chapter.isfree && (
                                                           <div className='text-white bg-black px-3  py-1 rounded-xl text-sm'>
                                                                Free
                                                           </div>
                                                                
                                                           
                                                             )}

                                                             <div className={cn("bg-slate-500 text-white px-3  py-1 rounded-xl text-sm", chapter.ispublished && "bg-sky-700 text-white px-2 py-1 rounded-xl")}>
                                                                {chapter?.ispublished ?'Published' : 'Draft'}
                                                             </div>

                                                             
                                                             <Pencil className='h-4 w-4 cursor-pointer hover:opacity-75 transition' onClick={()=> onEdit(chapter.id)}/>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }
                                    </Draggable>
                                 
                                ))
                            }

                            {provided.placeholder}

                        </div>)
                   
                }
            } 
        </Droppable>
       </DragDropContext>

    )
}
export default ChapterList;


                        



