import React from "react"

export type CardProps = {
  children?: object
  className?: string
  title?: string
  subtitle?: string
  noRounded?: boolean
}
export default function Card({ title, subtitle, children, className, noRounded }: CardProps) {

  return (
    <div className="flex flex-col">
      {(title || subtitle) &&
        <div className="flex flex-col text-center p-3 bg-primary text-white rounded-t-md shadow z-1">
          <span className="font-medium">{title}</span>
          <span className="text-xs mt-0.5 font-regular uppercase">{subtitle}</span>
        </div>}
      <div className={`${!noRounded && 'rounded-md'} bg-white shadow overflow-hidden p-8 ${className}`}>
        {children}
      </div>
    </div>
  )
}