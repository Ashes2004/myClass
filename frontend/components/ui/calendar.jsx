"use client";
import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-lg font-bold text-purple-600", // Vibrant caption
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-purple-100 text-purple-700 hover:bg-purple-200 p-0 rounded-full opacity-90 hover:opacity-100" // Vibrant navigation buttons
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-blue-500 font-bold rounded-md w-8 text-[0.9rem] dark:text-blue-400", // Bold and colorful day headers
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-blue-200 [&:has([aria-selected].day-outside)]:bg-blue-200/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-purple-800 dark:[&:has([aria-selected].day-outside)]:bg-purple-800/50",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-300 hover:text-blue-900 transition-colors duration-200 ease-in-out" // Colorful day selection with smooth transition
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-purple-300 text-white hover:bg-purple-700 focus:bg-purple-700 dark:bg-purple-400 dark:text-white dark:hover:bg-purple-500 dark:focus:bg-purple-500", // Vibrant selected day style
        day_today:
          "bg-yellow-300 text-black font-bold dark:bg-yellow-600 dark:text-yellow-200", // Highlight for today's date
        day_outside:
          "day-outside text-gray-400 opacity-50  aria-selected:bg-gray-200/50 aria-selected:text-gray-500 aria-selected:opacity-30 dark:text-gray-400 dark:aria-selected:bg-gray-800/50 dark:aria-selected:text-gray-400", // Softer outside days
        day_disabled: "text-gray-400 opacity-50 dark:text-gray-500",
        day_range_middle:
          "aria-selected:bg-blue-100 aria-selected:text-blue-900 dark:aria-selected:bg-purple-800 dark:aria-selected:text-purple-200", // Middle of range styling
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeftIcon className="h-4 w-4 text-purple-600" />
        ), // Vibrant icons
        IconRight: ({ ...props }) => (
          <ChevronRightIcon className="h-4 w-4 text-purple-600" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
