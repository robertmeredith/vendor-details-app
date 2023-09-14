import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className="container  m-auto border-t-2 py-8 flex justify-between items-center mt-24">
        <div className="flex gap-6 items-center">
          <p className="font-semibold text-2xl text-slate-700">Vendor Love</p>
          <p className="text-slate-600 ">Copyright © 2023 Robert Meredith.</p>
        </div>
        <ul className="text-slate-600 flex flex-row divide-x-2">
          <li className="px-4">All Rights Reserved</li>
          <li className="px-4">Terms & Conditions</li>
          <li className="px-4">Privacy Policy</li>
          <li className="px-4">Cookie Policy</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
