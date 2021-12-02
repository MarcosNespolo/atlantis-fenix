import React, { useState } from "react"

export type SelectOptionProps = {
  selected: string;
  list: string[];
}

export default function SelectOption(props: SelectOptionProps) {
  const [selected, setSelected] = useState<string>(props.selected);
  const [list, setList] = useState<string[]>(props.list);

  return (
    <div className="relative w-full">
      <select
        id="text"
        name="text"
        className="w-full px-3 py-2 mb-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-500 focus:text-gray-900 focus:outline-none focus:ring-0 focus:border-primary text-sm"
        defaultValue={selected}
      >
        {list.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </div>
  )
}