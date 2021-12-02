import React, { useState } from "react"

export type InputTextProps = {
  text: string;
  className?: string;
  disabled?: boolean;
  lines?: number;
  action?: (text: string) => void;
}

export default function InputText(props: InputTextProps) {
  const [text, setText] = useState<string>(props.text);

  function handleChange(text: string) {
    if (props.action) {
      props.action(text)
    }
    setText(text)
  }
  return (
    <>
      {props.lines && props.lines > 1 ?
        <textarea
          rows={props.lines}
          disabled={props.disabled}
          onChange={(e) => handleChange(e.target.value)}
          defaultValue={text}
          className={`${props.disabled ? 'bg-gray-100 ' : 'hover:border-action-light hover:text-gray-900'} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-500 focus:text-gray-900 focus:outline-none focus:ring-0 focus:border-action text-sm ${props.className}`}
        />
        :
        <input
          type="text"
          name="text"
          id="text"
          disabled={props.disabled}
          onChange={(e) => handleChange(e.target.value)}
          defaultValue={text}
          className={`${props.disabled ? 'bg-gray-100 ' : 'hover:border-action-light hover:text-gray-900'} appearance-none block w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-500 focus:text-gray-900 focus:outline-none focus:ring-0 focus:border-action text-sm ${props.className}`}
        />
      }
    </>
  )
}