"use client";

import * as React from "react";
import { Calendar } from "../ui/calendar";

export function CalendarDemo() {
  const [date, setDate] = React.useState(new Date());

  const handleSelect = (selectedDate) => {
    if (selectedDate && !isNaN(selectedDate.getTime())) {
      setDate(selectedDate);
    } else {
      setDate(undefined);
    }
  };

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleSelect}
      className="rounded-md border"
    />
  );
}
