import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "../../lib/utils"; // Utility function for class names
import { buttonVariants } from "./button"; // Custom button variants

type CalendarProps = {
  setCurrentMonth?: (month: Date) => void; // Function to set the current month
  availableDates: Date[]; // Available dates as Date objects
  className:any;
  selected:any;
};

function Calendar({
  className,
  setCurrentMonth,
  availableDates,
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set today to midnight for accurate comparison

  // State to keep track of the selected date
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(today);
  // const [currentMonth, setCurrentMonthState] = React.useState<Date>(today); // State for the current month

  // Modifiers: Disable all days before today, Saturdays, and Sundays
  const modifiers = {
    disabled: [
      (date: Date) => date < today, // Disable all previous days
      (date: Date) => date.getDay() === 0 || date.getDay() === 6, // Disable Sundays and Saturdays
      (date: Date) =>
        !availableDates.some(
          (availableDate) =>
            availableDate.getDate() === date.getDate() &&
            availableDate.getMonth() === date.getMonth() &&
            availableDate.getFullYear() === date.getFullYear()
        ), // Disable dates that are NOT in availableDates
    ],
  };

  const handleMonthChange = (newMonth: Date) => {
    // setCurrentMonthState(newMonth);
    setCurrentMonth?.(newMonth); // Update the parent state if needed
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date); // Set the selected date
  };

  return (
    <DayPicker
      mode="single" // Set mode to single
      className={cn("p-3",className)}
      selected={selectedDate} // Single date selection
      onDayClick={handleDayClick}
      onMonthChange={handleMonthChange}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-8 w-full",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex justify-between w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-normal aria-selected:opacity-100 bg-blue-100 hover:bg-button-clr-700/50 hover:text-white rounded-full p-3"
        ),
        day_selected: "!bg-button-clr-700 text-white hover:bg-button-clr-700 hover:text-white focus:bg-button-clr-700 focus:text-white",
        day_today: cn(
          "bg-accent text-accent-foreground relative",
          "after:content-[''] after:absolute after:bottom-[2px] after:left-1/2 after:transform after:-translate-x-1/2 after:h-1.5 after:w-1.5 after:rounded-full",
          selectedDate?.getTime() === today.getTime()
            ? "after:bg-white"
            : "after:bg-black"
        ),
        day_outside: "day-outside opacity-0",
        day_disabled: "text-muted-foreground opacity-50 bg-opacity-0",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...className,
      }}
      modifiers={modifiers}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
