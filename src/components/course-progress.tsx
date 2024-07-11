import React from 'react'
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CourseProgressProps{
    value:number;
    variant?: "dafault" | "success";
    size?: "default"|"sm";
};


const colorByVariant = {
    default: "text-sky-700",
    success: "text-emerald-700",
}

const sizeByvariant ={
    default: "text-sm",
    sm:'text-xs',
}

function CourseProgress( {value, variant, size}: CourseProgressProps) {
  return (
    <div>

        <Progress className='h-2 ' value={value}  variant={variant}/>

        <p className={cn(
            'font-medium mt-2 text-sky-700',
            sizeByVariant[size || 'default'],
            colorByVariant[variant || 'default'],
        )}>
            {Math.round(value)}% Complete
        </p>
    </div>
  )
}

export default CourseProgress