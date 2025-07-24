import * as React from "react";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

export interface DateInputProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

function DateInput({ value, onChange, placeholder = "dd/mm/aaaa", className }: DateInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Remove all non-numeric characters except /
    const cleaned = inputValue.replace(/[^\d/]/g, '');
    
    // Auto-format as user types
    let formatted = cleaned;
    if (cleaned.length >= 2 && cleaned[2] !== '/') {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (formatted.length >= 5 && formatted[5] !== '/') {
      formatted = formatted.slice(0, 5) + '/' + formatted.slice(5);
    }
    if (formatted.length > 10) {
      formatted = formatted.slice(0, 10);
    }
    
    // Update the input value
    e.target.value = formatted;
    
    // Parse and validate the date
    if (formatted.length === 10) {
      const [day, month, year] = formatted.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      
      // Check if the date is valid
      if (date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year) {
        onChange?.(date);
        return;
      }
    }
    
    // If date is incomplete or invalid, set to undefined
    onChange?.(undefined);
  };

  const displayValue = value ? format(value, "dd/MM/yyyy", { locale: ptBR }) : "";

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={displayValue}
        onChange={handleInputChange}
        className={cn("pr-10", className)}
        maxLength={10}
      />
      <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

DateInput.displayName = "DateInput";

export { DateInput };