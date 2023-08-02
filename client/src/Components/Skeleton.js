import React from 'react'

const Skeleton = ({width}) => {
  return (
    <div className={`max-w-${'3xl'} mx-auto pt-48`}>
      <h3
        className="h-4 bg-gray-100 rounded-md"
      />
      <ul className="mt-5 space-y-5">
        <li className="w-full h-8 bg-gray-100 rounded-md " />
        <li className="w-full h-8 bg-gray-100 rounded-md " />
        <li className="w-full h-8 bg-gray-100 rounded-md " />
        <li className="w-full h-8 bg-gray-100 rounded-md " />
        <li className="w-full h-8 bg-gray-100 rounded-md " />
        <li className="w-full h-8 bg-gray-100 rounded-md " />
        <li className="w-full h-8 bg-gray-100 rounded-md " />
      </ul>
    </div>
  )
}

export default Skeleton
