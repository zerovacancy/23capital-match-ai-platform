import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type { DateRange };

interface DateRangePickerProps {
  value?: DateRange;
  onChange: (value: DateRange) => void;
  className?: string;
  align?: "start" | "center" | "end";
}

export function DateRangePicker({
  value,
  onChange,
  className,
  align = "start",
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value);

  // Update internal state when props change
  React.useEffect(() => {
    setDate(value);
  }, [value]);

  // Update parent component when internal state changes
  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (range) {
      onChange(range);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Calendar
        mode="range"
        selected={date}
        onSelect={handleSelect}
        numberOfMonths={2}
        initialFocus
      />
    </div>
  );
}

interface DatePickerWithRangeProps {
  className?: string;
  align?: "start" | "center" | "end";
  value?: DateRange;
  onChange: (value: DateRange) => void;
}

export function DatePickerWithRange({
  className,
  value,
  onChange,
  align = "start",
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);

  // Update internal state when props change
  React.useEffect(() => {
    setDate(value);
  }, [value]);

  // Handle date selection and close popover
  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
      onChange(newDate);
      setIsOpen(false);
    } else if (newDate?.from) {
      onChange({ ...newDate, to: newDate.from });
    }
  };

  // Format date range for display
  const formatDateRange = (range: DateRange | undefined) => {
    if (!range) {
      return "Select date range";
    }

    if (range.from && range.to) {
      if (format(range.from, "LLL dd, y") === format(range.to, "LLL dd, y")) {
        return format(range.from, "LLL dd, y");
      }
      return `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`;
    }

    if (range.from) {
      return `From ${format(range.from, "LLL dd, y")}`;
    }

    return "Select date range";
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}