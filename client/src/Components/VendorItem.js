import React from 'react'

const VendorItem = ({ vendorDetails: { vendorType, vendor } }) => {
  return (
    <tr>
      <td className="h-px w-px whitespace-nowrap">
        <div className="px-6 py-4">
          <div className="flex items-center gap-x-2">
            <div className="grow">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {vendorType}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td className="h-px w-px whitespace-nowrap">
        <div className="px-6 py-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {vendor.name}
          </span>
        </div>
      </td>
      <td className="h-px w-px whitespace-nowrap">
        <div className="px-6 py-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {vendor.instagram}
          </span>
        </div>
      </td>
      <td className="h-px w-px whitespace-nowrap">
        <div className="px-6 py-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {vendor.email}
          </span>
        </div>
      </td>
      <td className="h-px w-px whitespace-nowrap">
        <div className="px-6 py-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {vendor.website}
          </span>
        </div>
      </td>
    </tr>
  )
}

export default VendorItem
