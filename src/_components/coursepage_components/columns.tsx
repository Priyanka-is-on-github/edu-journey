

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Badge, MoreHorizontal, Pencil } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export type Course = {

  title:string,
  price:string,
  ispublished: "pending" | "processing" | "success" | "failed",
  id:string,
  
}


export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({row})=>{
      const price = parseFloat(row.getValue('price')|| "0")
      const formatted = new Intl.NumberFormat("en-US", {
        style:"currency",
        currency:'USD'
      }).format(price);

      return(
        <div>{formatted}</div>
      )
    }
  },
  {
    accessorKey: "ispublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({row})=>{
      const isPublished = row.getValue('ispublished')|| false;

      return(
        <div className={cn("bg-slate-500 text-white px-3 py-1 w-20 rounded-xl text-sm", isPublished && "bg-sky-700 text-white px-2 py-1 w-20 rounded-xl")}>
          {isPublished? 'Published' : 'Draft'}
       </div>

      )
    }
  },
  {
    id:'action',
    cell:({row})=>{
      const {id} = row.original;

      return(
        <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className="h-4 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mr-20">
          <Link to={`/teacher/courses/${id}`}>
          <DropdownMenuItem className="flex items-center px-5 py-2 bg-slate-100 shadow-lg rounded-sm hover:bg-white">
            <Pencil className='h-3 w-3 mr-2'/>
            Edit
          </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
         </DropdownMenu>
      )
    }
  }
]
