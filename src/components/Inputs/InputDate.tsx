import { CalendarIcon } from "@heroicons/react/solid"
import React, { useState } from "react"

export type InputDateProps = {
  date: string;
}

export default function InputDate(props: InputDateProps) {

  const [date, setDate] = useState<string>(props.date);
  const today = new Date();

  return (
    <div className="w-full relative mb-1 rounded-md shadow-sm text-gray-500 focus-within:text-primary">
      <input
        type="date"
        min={today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()}
        max={(today.getFullYear() + 100) + '-' + (today.getMonth() + 1) + '-' + today.getDate()}
        name="date"
        id="date"
        className="appearance-none block w-full h-9 pr-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-500 focus:text-gray-900 focus:outline-none focus:ring-0 focus:border-primary text-sm"
        value={date ? date : ''}
        onChange={(e) => { setDate(e.target.value) }}
      />
      <div className="absolute inset-y-0 right-0 pr-3 pt-0 flex items-center pointer-events-none">
        <CalendarIcon className="h-4 w-4 text-current hover:text-primary" aria-hidden="true" />
      </div>
      <span className="validity"></span>
    </div>
  )
}