import React from "react"

export default function IconCard({ children, image, title }:any) {
  return (
    <div className="flex justify-center flex-col w-20 md:w-24 mx-2">
      <div className="bg-white w-16 h-16 md:w-20 md:h-20 p-4 m-2 rounded-md shadow flex justify-center">
        <img
          src={image}
          alt={title}
        />
      </div>
      <span className="block font-semibold text-xs md:text-sm w-20 md:w-24 text-center text-primary">
        {children}
      </span>
    </div>
  )
}