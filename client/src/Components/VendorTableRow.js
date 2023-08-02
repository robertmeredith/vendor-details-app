import { Link } from "react-router-dom"

const VendorTableRow = ({ vendor }) => {
  return (
    <tr className="hover:shadow-sm hover:bg-slate-50">
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {vendor.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {vendor.instagram}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {vendor.email}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {vendor.website}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link
          to={`/vendors/${vendor._id}`}
          className="text-emerald-600 hover:text-emerald-900"
        >
          View
          {/* <span className="sr-only">, {person.name}</span> */}
        </Link>
      </td>
    </tr>
  )
}

export default VendorTableRow
