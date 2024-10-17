
import { Progress } from '@/components/ui/progress';  
import { cn } from '@/lib/utils';

type CourseProgressProps={
    value:number;
    variant?:  'success'  ;
    size?: "default"|"sm";
};


const colorByVariant = {
    default: "text-sky-700",
    success: "text-emerald-700",
}

const sizeByvariant ={
    default: "text-sm",
    sm:'text-sm',
}

function CourseProgress( {value, variant, size}: CourseProgressProps) {

    if(!variant) return;

  return (
    <div>

        <Progress className="w-[100%] h-2" value={value}  variant={variant}/>

        <p className={cn(
            'font-medium mt-2 text-sky-700',
            sizeByvariant[size || 'default'],
            colorByVariant[variant || 'default'],
        )}>
            {Math.round(value)}% complete
        </p>
    </div>
  )
}

export default CourseProgress