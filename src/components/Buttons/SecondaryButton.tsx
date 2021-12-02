import { PencilAltIcon, MailIcon, PlusIcon, TrashIcon, XIcon } from "@heroicons/react/solid"
import React from "react"

export type SecondaryButtonProps = {
  label: string;
  icon?: string;
  width?: string;
  red?: boolean;
}

export default function SecondaryButton(props: SecondaryButtonProps) {
  return (
    <div className={`h-9 flex flex-wrap content-end ${props.width ? 'col-span-' + props.width : 'col-span-1'} mt-1`}>
      <button
        type="button"
        className={`h-9 w-full mt-2 bg-white rounded-md shadow-md text-sm font-semibold border ${props.red ? 'border-red-700 text-red-700' : 'border-primary text-primary'} transition duration-200 ease-in-out transform hover:shadow-sm hover:bg-gray-50`}
      >
        <div
          className="inline-flex items-center">
          {props.icon === 'cancel' ?
            <XIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            : props.icon === 'trash' ?
              <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              : props.icon === 'mail' ?
                <MailIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                : props.icon === 'plus' ?
                  <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                  : props.icon === 'edit' &&
                  <PencilAltIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          }
          {props.label}
        </div>
      </button>
    </div>
  )
}
