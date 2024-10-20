import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


interface ComboboxProps {
  options: { label: string; value: string }[];
 
  onChange: (value: string) => void;
}



const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(

  ({ options, onChange }, ref) => {  
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    console.log('value1=', value)

    return ( 
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            ref={ref}
          >
            {value
              ? options.find(
                  (option) => option.label.toLowerCase() === value.toLowerCase() 
                )?.label
              : "Select option..."}

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search option..." />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  
                  return (
                    <CommandItem
                      key={option.label}
                      value={option.label}
                      onSelect={(currentValue) => { 
                       
                        console.log('cv=',currentValue, option) 

                        onChange(
                          option.label.toLowerCase() === value.toLowerCase()
                            ? ""
                            : option.label
                        );
                        setValue(
                          currentValue.toLowerCase() === value.toLowerCase() 
                            ? ""
                            : currentValue
                        );
                        setOpen(false);
                      }} 
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value.toLowerCase() === option.label.toLowerCase()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
export default Combobox;
