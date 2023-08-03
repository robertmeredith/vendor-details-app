import VendorItem from './VendorItem'
import { toast } from 'react-toastify'
import { useState } from 'react'

const SubmissionItem = ({ submission }) => {
  const [includeVendorType, setIncludeVendorType] = useState(true)

  const copyForEmail = () => {
    const textToCopy = submission.vendors
      .map(({ vendor }) => vendor.email)
      .join(', ')
    navigator.clipboard.writeText(textToCopy)
    console.log(textToCopy)
    toast.success('Emails copied to clipboard')
  }

  // COPY TO INSTAGRAM
  const copyForInstagram = () => {
    const textToCopy = includeVendorType
      ? submission.vendors
          .map(
            ({ vendor, vendorType }) => `${vendorType} - ${vendor.instagram}`
          )
          .join('\n')
      : submission.vendors.map(({ vendor }) => vendor.instagram).join('\n')
    navigator.clipboard.writeText(textToCopy)
    console.log(textToCopy)
    toast.success('Copied for Instagram')
  }

  return (
    <>
      {/* Table Section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-1 mx-auto">
        {/* Card */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-hidden">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-neutral-100/80 border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                {/* Header */}
                <div className="px-6 py-4 md:flex xl:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                  {/* Div containg instagram copy button and switch */}
                  <div className="inline-flex gap-x-4">
                    {/* Instagram copy button */}
                    <button
                      onClick={() => copyForInstagram()}
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-pink-100 border border-transparent font-semibold text-pink-500 hover:text-white hover:bg-pink-100 focus:outline-none focus:ring-2 ring-offset-white focus:ring-pink-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                      href="#"
                    >
                      Copy for Instagram
                    </button>
                    <button className="btn btn-primary">Button</button>

                    {/* Include Vendor type switch */}
                    <div className="hs-small hs-tooltip flex items-center">
                      <input
                        type="checkbox"
                        id="hs-tooltip-example"
                        className=" hs-tooltip-toggle relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-pink-400 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-pink-400 focus:ring-pink-400 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-pink-400 dark:focus:ring-offset-gray-800

                         before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-pink-100 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
                      />
                      <label
                        htmlFor="hs-tooltip-example"
                        className="text-sm text-gray-500 ml-3 dark:text-gray-400"
                      >
                        Include vendor type
                      </label>
                      <div
                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
                        role="tooltip"
                      >
                        e.g. Photographer - @joephotographer
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={copyForEmail}
                    className="m-1 ml-4 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-green-100 border border-transparent font-semibold text-green-500 hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 ring-offset-white focus:ring-green-100 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Copy Email List
                  </button>
                </div>
                {/* End Header */}
                {/* Table */}
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-slate-900">
                    {/* Table Row */}
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Vendor
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Name
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Instagram
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Email
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Website
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {submission.vendors.map((vendor) => {
                      return <VendorItem vendorDetails={vendor} />
                    })}
                  </tbody>
                </table>
                {/* End Table */}
                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="inline-flex items-center gap-x-2">
                    <p className="text-s font-semibold text-gray-600 dark:text-gray-400">
                      {submission.vendors.length} vendors
                    </p>
                  </div>
                </div>
                {/* End Footer */}
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
      {/* End Table Section */}
    </>
  )
}

export default SubmissionItem
