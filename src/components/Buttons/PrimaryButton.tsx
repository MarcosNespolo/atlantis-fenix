import { CheckIcon, RefreshIcon } from "@heroicons/react/solid"
import React from "react"

export type PrimaryButtonProps = {
  label: string
  className?: string
  loading?: boolean
  noIcon?: boolean
  disabled?: boolean
  onClick?: () => void
  roundedB?: boolean
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <div className={`h-10 flex flex-wrap content-end col-span-1 mt-1 lg:col-span-1 ${props.className}`}>
      <button
        type="button"
        className={`h-full w-full bg-action-light ${props.roundedB ? 'rounded-b-md' : 'rounded-md'} shadow-md text-sm font-medium text-white transition duration-200 ease-in-out transform hover:shadow-sm hover:bg-action`}
        onClick={!props.disabled && !props.loading ? props.onClick : () => {}}
        >
        <div className="inline-flex items-center">
          {!props.noIcon ?
            (props.loading ?
              <RefreshIcon className="animate-spin -ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              :
              <CheckIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            ) : (
              props.loading &&
              <RefreshIcon className="animate-spin -ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            )
          }
          {props.label}
        </div>
      </button>
    </div>
  )
}
